// server.js
import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["htps://booking-reservation-system.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// --- Routes ---
app.use('/api', routes);

app.get('/', (req,res)=>{
  res.json({
    message:'Booking & Reservation API',
    endpoints:{
      slots:'GET /api/slots?date=YYYY-MM-DD&seatingArea=AreaName',
      createBooking:'POST /api/bookings',
      cancelBooking:'DELETE /api/bookings/:id',
      health:'GET /api/health'
    }
  });
});

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));
