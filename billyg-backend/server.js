// server.js
import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS configuration
// Allows frontend apps to communicate with this backend
app.use(cors({
  origin: [
    "https://booking-reservation-system.vercel.app", // ✅ FIXED typo
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

// ✅ Parses incoming JSON request bodies
// REQUIRED for req.body to work
app.use(express.json());

// --- API Routes ---
app.use('/api', routes);

// ✅ Root health/info endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Booking & Reservation API',
    endpoints: {
      slots: 'GET /api/slots?date=YYYY-MM-DD&seatingArea=AreaName',
      createBooking: 'POST /api/bookings',
      cancelBooking: 'DELETE /api/bookings/:id',
      health: 'GET /api/health'
    }
  });
});

// ✅ Start server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
