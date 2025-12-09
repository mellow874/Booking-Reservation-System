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
// GET /api/slots
router.get("/slots", (req, res) => {
  try {
    const { date, seatingArea } = req.query;

    if (!date || !seatingArea) {
      return res.status(400).json({
        error: "date and seatingArea are required"
      });
    }

    const day = new Date(date).getDay();

    // Sunday (0) or Saturday (6)
    if (day === 0 || day === 6) {
      return res.json({
        error: "Restaurant closed on weekends",
        availableSlots: []
      });
    }

    // ✅ PURE MOCK SLOTS
    return res.json({
      date,
      seatingArea,
      slots: [
        { time: "17:00", available: true },
        { time: "18:00", available: true },
        { time: "19:00", available: true }
      ]
    });
  } catch (err) {
    console.error("GET /slots error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/*
 * POST /api/bookings
 * Mock booking creation
 */
// POST /api/bookings
router.post("/bookings", (req, res) => {
  console.log("✅ POST /bookings hit");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);

  // ✅ HARD SAFETY CHECK
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      error: "Request body is missing or empty. Send JSON with Content-Type: application/json"
    });
  }

  // ✅ SAFE destructuring
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

  // ✅ Mock response (no DB)
  return res.status(201).json({
    message: "Booking created (mock)",
    booking: {
      booking_date,
      booking_time,
      number_of_guests,
      seating_preference,
      customer_name,
      customer_email,
      customer_phone,
      special_requests,
      status: "confirmed"
    }
  });
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
