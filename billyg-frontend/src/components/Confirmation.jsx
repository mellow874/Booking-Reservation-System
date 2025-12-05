import { useEffect, useState } from "react";
import { Watch } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "./Booking";

// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import ChairIcon from "@mui/icons-material/Chair";

/* Sumbits booking to backend */
function useBookingSubmit() {
  const { reservationData } = useBooking();
  const [loading, setLoading] = useState(false);

  // Submit booking to backend API
  async function submitBooking() {
    setLoading(true);

    try {
      const response = await fetch("https://booking-reservation-system.onrender.com/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        // Attach all user booking details to request body
        body: JSON.stringify({
          booking_date: reservationData.date,
          booking_time: reservationData.time,
          number_of_guests: reservationData.people,
          seating_preference: reservationData.seat,
          customer_name: reservationData.fullname,
          customer_email: reservationData.email,
          customer_phone: reservationData.phone,
          special_requests: reservationData.notes,
        }),
      });

      const data = await response.json();

      // Handle backend validation errors
      if (!response.ok) {
        alert("Booking failed: " + data.error);
        setLoading(false);
        return null;
      }

      // Return new booking object from backend
      return data.booking;
    } catch (err) {
      console.error(err);
      alert("Failed to connect to server.");
      return null;
    } finally {
      setLoading(false);
    }
  }

  return { submitBooking, loading };
}

/* Displays bookign details, confirmation and save button */
export default function Confirmation() {
  const { reservationData } = useBooking();
  const { submitBooking, loading } = useBookingSubmit();
  const navigate = useNavigate();

  // Stores backend response booking object
  const [savedBooking, setSavedBooking] = useState(null);

  /*Handle booking confirm button  */
  async function handleConfirm() {
    const booking = await submitBooking();

    if (booking) {
      setSavedBooking(booking);
      alert("Booking successfully saved!");

      // Redirect to final success screen or homepage
      navigate("/success");
    }
  }

  return (
    <div className="p-5 max-w-2xl mx-auto text-white">
      {/* PAGE HEADING */}
      <h1 className="text-3xl font-semibold mb-4">Confirm Your Reservation</h1>
      <p className="text-neutral-300 mb-6">
        Review your details below and click <strong>Confirm & Save</strong> to
        finalize your booking.
      </p>

      {/* BOOKING DETAILS CARD */}
      <div className="bg-neutral-700 p-5 rounded-xl space-y-4 shadow-lg">
        {/* DATE */}
        <div className="flex items-center gap-3">
          <CalendarMonthIcon />
          <span>Date: {reservationData.date}</span>
        </div>

        {/* TIME */}
        <div className="flex items-center gap-3">
          <Watch />
          <span>Time: {reservationData.time}</span>
        </div>

        {/* GUEST COUNT */}
        <div className="flex items-center gap-3">
          <Diversity3Icon />
          <span>Guests: {reservationData.people}</span>
        </div>

        {/* SEATING AREA */}
        <div className="flex items-center gap-3">
          <ChairIcon />
          <span>Seating Area: {reservationData.seat}</span>
        </div>

        {/* FULL NAME */}
        <div className="flex items-center gap-3">
          <PersonIcon />
          <span>Name: {reservationData.fullname}</span>
        </div>

        {/* EMAIL */}
        <div className="flex items-center gap-3">
          <EmailIcon />
          <span>Email: {reservationData.email}</span>
        </div>

        {/* PHONE */}
        <div className="flex items-center gap-3">
          <CallIcon />
          <span>Phone: {reservationData.phone}</span>
        </div>

        {/* NOTES / SPECIAL REQUESTS */}
        {reservationData.notes && (
          <div className="mt-4">
            <p className="text-neutral-300">Special Requests:</p>
            <p className="italic">{reservationData.notes}</p>
          </div>
        )}
      </div>

      {/* CONFIRM BUTTON */}
      <button
        onClick={handleConfirm}
        disabled={loading}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-neutral-500 
    text-white py-3 rounded-xl font-semibold transition-all"
      >
        {loading ? "Saving..." : "Confirm & Save Booking"}
      </button>

      {/* GO BACK BUTTON */}
      <Link
        to="/details"
        className="block mt-3 text-center text-neutral-300 hover:underline"
      >
        Go Back & Edit
      </Link>
    </div>
  );
}
