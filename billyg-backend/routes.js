// routes.js
import express from "express";

const router = express.Router();

/*
 * Static booking rules
 * (No database, no Supabase)
 */
const AVAILABLE_TIMES = ["17:00", "18:00", "19:00"];

const SEATING_AREAS = [
  "Patio",
  "Restaurant Left",
  "Restaurant Right",
  "Couches",
  "Buffet",
];

const SEATING_CAPACITY = {
  Patio: 20,
  "Restaurant Left": 30,
  "Restaurant Right": 30,
  Couches: 15,
  Buffet: 25,
};

/*
 * Utility to extract number from "2guests"
 */
function extractGuestCount(guestsString) {
  const match = guestsString?.match(/(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

/*
 * Simple date validation
 * (No DB checks)
 */
function isDateAvailable(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (date < today)
    return { available: false, reason: "Date is in the past" };

  const day = date.getDay();
  if (day === 0 || day === 6)
    return { available: false, reason: "Closed on weekends" };

  return { available: true };
}

/*
 * GET /api/slots
 * Returns static availability (always available)
 */
router.get("/slots", (req, res) => {
  const { date, seatingArea } = req.query;

  if (!date || !seatingArea)
    return res.status(400).json({ error: "Missing required parameters" });

  if (!SEATING_AREAS.includes(seatingArea))
    return res.status(400).json({ error: "Invalid seating area" });

  const dateCheck = isDateAvailable(date);
  if (!dateCheck.available)
    return res.status(400).json({ error: dateCheck.reason });

  const maxCapacity = SEATING_CAPACITY[seatingArea];

  const slots = AVAILABLE_TIMES.map((time) => ({
    time,
    available: true,
    remainingCapacity: maxCapacity,
    maxCapacity,
  }));

  res.json({
    date,
    seatingArea,
    slots,
  });
});

/*
 * POST /api/bookings
 * Mock booking creation
 */
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

    // Basic validation
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

    // Validate seating and time (optional, keeps your rules)
    if (!AVAILABLE_TIMES.includes(booking_time))
      return res.status(400).json({ error: "Invalid time slot" });

    if (!SEATING_AREAS.includes(seating_preference))
      return res.status(400).json({ error: "Invalid seating area" });

    // Mock booking ID
    const bookingId = "mock-" + Date.now();

    // Return mocked booking object
    const newBooking = {
      id: bookingId,
      booking_date,
      booking_time,
      number_of_guests,
      seating_preference,
      customer_name,
      customer_email,
      customer_phone,
      special_requests: special_requests || "",
      status: "confirmed",
    };

    console.log("📩 MOCK BOOKING RECEIVED:", newBooking);

    res.status(201).json({ message: "Booking created", booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


/*
 * DELETE /api/bookings/:id
 * Mock cancellation
 */
router.delete("/bookings/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    message: "Booking cancelled (mock)",
    booking: {
      id,
      status: "cancelled",
    },
  });
});

/*
 * Health check
 */
router.get("/health", (req, res) => {
  res.json({
    status: "OK",
    mode: "NO DATABASE",
    timestamp: new Date(),
  });
});

export default router;
