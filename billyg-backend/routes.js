import express from "express"; // Import Express framework for routing
import { supabase } from "./supabase.js"; // Import our configured Supabase client

const router = express.Router(); // Create a new router instance for defining routes

// ----------------------------
// CONFIGURATION
// ----------------------------
const AVAILABLE_TIMES = ['17:00', '18:00', '19:00']; // Time slots restaurant accepts
const SEATING_AREAS = ['Patio', 'Restaurant Left', 'Restaurant Right', 'Couches', 'Buffet']; // Seating options
const SEATING_CAPACITY = {
'Patio': 20,
'Restaurant Left': 30,
'Restaurant Right': 30,
'Couches': 15,
'Buffet': 25
}; // Maximum number of guests allowed per seating area

// ----------------------------
// HELPER FUNCTIONS
// ----------------------------

/**

* Convert guest string like "2 people" into a number
  */
  function extractGuestCount(guestsString) {
  const match = guestsString.match(/(\d+)/); // Extract first number from string
  return match ? parseInt(match[1]) : 0; // Convert to integer, default 0 if not found
  }

/**

* Check if a booking date is valid
* * Not in the past
* * Not a weekend
* * Not fully booked (hardcoded for simplicity)
    */
    function isDateAvailable(dateString) {
    const date = new Date(dateString); // Convert string to Date object
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

// Past dates not allowed
if (date < today) return { available: false, reason: 'Date is in the past' };

// Weekends not allowed (Sunday = 0, Saturday = 6)
const dayOfWeek = date.getDay();
if (dayOfWeek === 0 || dayOfWeek === 6) return { available: false, reason: 'Restaurant closed on weekends' };

// Hardcoded fully booked dates
const fullyBookedDates = ['Thu Nov 28 2025'];
if (fullyBookedDates.includes(date.toDateString())) return { available: false, reason: 'Fully booked' };

return { available: true }; // Date is valid
}

// ----------------------------
// ROUTES
// ----------------------------

/**

* GET /slots
* Returns availability for a seating area on a specific date
  */
  router.get("/slots", async (req, res) => {
  try {
  const { date, seatingArea } = req.query; // Read query parameters from URL

  // Check if both required parameters are provided
  if (!date || !seatingArea) {
  return res.status(400).json({ error: 'Missing required parameters: date and seatingArea' });
  }

  // Validate seating area exists
  if (!SEATING_AREAS.includes(seatingArea)) {
  return res.status(400).json({ error: 'Invalid seating area' });
  }

  // Check date validity
  const dateCheck = isDateAvailable(date);
  if (!dateCheck.available) {
  return res.status(400).json({ error: dateCheck.reason, availableSlots: [] });
  }

  // Fetch confirmed bookings for the given date and seating
  const { data: bookings, error } = await supabase
  .from('bookings')
  .select('booking_time, number_of_guests')
  .eq('booking_date', date)
  .eq('seating_preference', seatingArea)
  .eq('status', 'confirmed');

  if (error) return res.status(500).json({ error: 'Failed to fetch bookings' });

  // Calculate available capacity for each time slot
  const availableSlots = AVAILABLE_TIMES.map(time => {
  const timeBookings = bookings.filter(b => b.booking_time === time); // Only bookings for this time
  const bookedGuests = timeBookings.reduce((sum, booking) => sum + extractGuestCount(booking.number_of_guests), 0);
  const maxCapacity = SEATING_CAPACITY[seatingArea];
  const remainingCapacity = Math.max(0, maxCapacity - bookedGuests);

  return { time, available: remainingCapacity > 0, remainingCapacity, maxCapacity };
  });

  res.json({ date, seatingArea, slots: availableSlots }); // Return available slots
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
  }
  });

/**

* POST /bookings
* Creates a new booking if capacity allows
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
  special_requests
  } = req.body; // Read data from request body

  // Validate required fields
  if (!booking_date || !booking_time || !number_of_guests ||
  !seating_preference || !customer_name || !customer_email || !customer_phone) {
  return res.status(400).json({ error: 'Missing required fields' });
  }

  // Validate time and seating
  if (!AVAILABLE_TIMES.includes(booking_time)) return res.status(400).json({ error: 'Invalid time slot' });
  if (!SEATING_AREAS.includes(seating_preference)) return res.status(400).json({ error: 'Invalid seating area' });

  // Check date availability
  const dateCheck = isDateAvailable(booking_date);
  if (!dateCheck.available) return res.status(400).json({ error: dateCheck.reason });

  // Check current bookings for this time & seating
  const { data: existingBookings, error: fetchError } = await supabase
  .from('bookings')
  .select('number_of_guests')
  .eq('booking_date', booking_date)
  .eq('booking_time', booking_time)
  .eq('seating_preference', seating_preference)
  .eq('status', 'confirmed');

  if (fetchError) return res.status(500).json({ error: 'Failed to check availability' });

  const currentGuests = existingBookings.reduce((sum, b) => sum + extractGuestCount(b.number_of_guests), 0);
  const requestedGuests = extractGuestCount(number_of_guests);
  const maxCapacity = SEATING_CAPACITY[seating_preference];

  if (currentGuests + requestedGuests > maxCapacity) {
  return res.status(409).json({ error: 'Not enough capacity', available: maxCapacity - currentGuests });
  }

  // Insert new booking
  const { data: newBooking, error: insertError } = await supabase
  .from('bookings')
  .insert([{
  booking_date,
  booking_time,
  number_of_guests,
  seating_preference,
  customer_name,
  customer_email,
  customer_phone,
  special_requests: special_requests || '',
  status: 'confirmed'
  }])
  .select()
  .single();

  if (insertError) return res.status(500).json({ error: 'Failed to create booking' });

  res.status(201).json({ message: 'Booking created', booking: newBooking });
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
  }
  });

/**

* DELETE /bookings/:id
* Cancels a booking by ID
  */
  router.delete("/bookings/:id", async (req, res) => {
  try {
  const { id } = req.params;

  // Validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) return res.status(400).json({ error: 'Invalid booking ID' });

  // Fetch booking
  const { data: existingBooking, error: fetchError } = await supabase
  .from('bookings')
  .select('*')
  .eq('id', id)
  .maybeSingle();

  if (fetchError) return res.status(500).json({ error: 'Failed to fetch booking' });
  if (!existingBooking) return res.status(404).json({ error: 'Booking not found' });

  // Already cancelled?
  if (existingBooking.status === 'cancelled') return res.status(400).json({ error: 'Booking already cancelled' });

  // Update status
  const { data: updatedBooking, error: updateError } = await supabase
  .from('bookings')
  .update({ status: 'cancelled' })
  .eq('id', id)
  .select()
  .single();

  if (updateError) return res.status(500).json({ error: 'Failed to cancel booking' });

  res.json({ message: 'Booking cancelled', booking: updatedBooking });
  } catch (error) {
  console.error(error);
  res.status(500).json({ error: 'Internal server error' });
  }
  });

/**

* GET /health
* Simple endpoint to check if server is running
  */
  router.get("/health", (req, res) => {
  res.json({ status: 'OK', message: 'Server running', timestamp: new Date() });
  });

export default router; // Export router to be imported in server.js
