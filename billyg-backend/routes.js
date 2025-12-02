import express from "express";
import { supabase } from "./supabase.js"; // Supabase client instance

const router = express.Router(); // Create Express router

// ---------------------------
// Constants for reservations
// ---------------------------
const AVAILABLE_TIMES = ["17:00", "18:00", "19:00"]; // Allowed booking times
const SEATING_AREAS = ["Patio", "Restaurant Left", "Restaurant Right", "Couches", "Buffet"];
const SEATING_CAPACITY = {
  Patio: 20,
  "Restaurant Left": 30,
  "Restaurant Right": 30,
  Couches: 15,
  Buffet: 25,
};

// ---------------------------
// Helper functions
// ---------------------------

// Extract number of guests from string like "2 people"
function extractGuestCount(guestsString) {
  const match = guestsString.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

// Check if a date is valid for booking
function isDateAvailable(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time

  if (date < today) return { available: false, reason: "Date is in the past" };

  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6)
    return { available: false, reason: "Restaurant closed on weekends" };

  const fullyBookedDates = ["Thu Nov 28 2025"];
  if (fullyBookedDates.includes(date.toDateString()))
    return { available: false, reason: "Fully booked" };

  return { available: true };
}

// ---------------------------
// Routes
// ---------------------------

// GET /slots - check available times for a seating area
router.get("/slots", async (req, res) => {
  try {
    const { date, seatingArea } = req.query;
    if (!date || !seatingArea) return res.status(400).json({ error: "Missing required parameters" });
    if (!SEATING_AREAS.includes(seatingArea)) return res.status(400).json({ error: "Invalid seating area" });

    const dateCheck = isDateAvailable(date);
    if (!dateCheck.available)
      return res.status(400).json({ error: dateCheck.reason, availableSlots: [] });

    // Fetch confirmed bookings from Supabase
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("booking_time, number_of_guests")
      .eq("booking_date", date)
      .eq("seating_preference", seatingArea)
      .eq("status", "confirmed");

    if (error) return res.status(500).json({ error: "Failed to fetch bookings" });

    // Calculate remaining capacity for each time slot
    const availableSlots = AVAILABLE_TIMES.map((time) => {
      const timeBookings = bookings.filter((b) => b.booking_time === time);
      const bookedGuests = timeBookings.reduce(
        (sum, booking) => sum + extractGuestCount(booking.number_of_guests),
        0
      );
      const maxCapacity = SEATING_CAPACITY[seatingArea];
      const remainingCapacity = Math.max(0, maxCapacity - bookedGuests);
      return { time, available: remainingCapacity > 0, remainingCapacity, maxCapacity };
    });

    res.json({ date, seatingArea, slots: availableSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /bookings - create a new booking
router.post("/bookings", async (req, res) => {
  try {
    const {
      booking_date,
      booking_time,
      number_of_guests,
      seating_preference,
      customer_name,
      customer_email,
      customer_phone,
      special_requests,
    } = req.body;

    // Validate required fields
    if (
      !booking_date ||
      !booking_time ||
      !number_of_guests ||
      !seating_preference ||
      !customer_name ||
      !customer_email ||
      !customer_phone
    )
      return res.status(400).json({ error: "Missing required fields" });

    // Validate time & seating
    if (!AVAILABLE_TIMES.includes(booking_time)) return res.status(400).json({ error: "Invalid time slot" });
    if (!SEATING_AREAS.includes(seating_preference)) return res.status(400).json({ error: "Invalid seating area" });

    // Validate date
    const dateCheck = isDateAvailable(booking_date);
    if (!dateCheck.available) return res.status(400).json({ error: dateCheck.reason });

    // Check existing bookings for this time & seating
    const { data: existingBookings, error: fetchError } = await supabase
      .from("bookings")
      .select("number_of_guests")
      .eq("booking_date", booking_date)
      .eq("booking_time", booking_time)
      .eq("seating_preference", seating_preference)
      .eq("status", "confirmed");

    if (fetchError) return res.status(500).json({ error: "Failed to check availability" });

    const currentGuests = existingBookings.reduce(
      (sum, b) => sum + extractGuestCount(b.number_of_guests),
      0
    );
    const requestedGuests = extractGuestCount(number_of_guests);
    const maxCapacity = SEATING_CAPACITY[seating_preference];

    if (currentGuests + requestedGuests > maxCapacity)
      return res.status(409).json({ error: "Not enough capacity", available: maxCapacity - currentGuests });

    // Insert new booking
    const { data: newBooking, error: insertError } = await supabase
      .from("bookings")
      .insert([
        {
          booking_date,
          booking_time,
          number_of_guests,
          seating_preference,
          customer_name,
          customer_email,
          customer_phone,
          special_requests: special_requests || "",
          status: "confirmed",
        },
      ])
      .select()
      .single();

    if (insertError) return res.status(500).json({ error: "Failed to create booking" });

    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /bookings/:id - cancel a booking
router.delete("/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) return res.status(400).json({ error: "Invalid booking ID" });

    const { data: existingBooking, error: fetchError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (fetchError) return res.status(500).json({ error: "Failed to fetch booking" });
    if (!existingBooking) return res.status(404).json({ error: "Booking not found" });
    if (existingBooking.status === "cancelled") return res.status(400).json({ error: "Booking already cancelled" });

    const { data: updatedBooking, error: updateError } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("id", id)
      .select()
      .single();

    if (updateError) return res.status(500).json({ error: "Failed to cancel booking" });

    res.json({ message: "Booking cancelled", booking: updatedBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /health - simple server health check
router.get("/health", (req, res) => {
  res.json({ status: "OK", message: "Server running", timestamp: new Date() });
});

export default router;
