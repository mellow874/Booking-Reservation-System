import { useEffect, useState } from "react";
import { Watch } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "./Booking";

// Icons (Material UI)
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import ChairIcon from "@mui/icons-material/Chair";

/* Handles submissioon of the booking to the backend Api */
function useBookingSubmit() {
  const { reservationData } = useBooking(); // Access global booking data context
  const [loading, setLoading] = useState(false); // Loading state for button

  // Function to POST booking data to your backend
  async function submitBooking() {
    setLoading(true); // Start loading animation

    try {
      // --- Check availability before submitting ---
      const slotResponse = await fetch(
        `https://booking-reservation-system.onrender.com/api/slots?date=${new Date(reservationData.date).toISOString().split("T")[0]}&seatingArea=${reservationData.seat}`
      );
      const slotData = await slotResponse.json();

      // Find the selected time slot
      const selectedSlot = slotData.slots?.find(s => s.time === reservationData.time);

      // If the slot is unavailable, alert and stop submission
      if (!selectedSlot || !selectedSlot.available) {
        alert(`The selected time slot (${reservationData.time}) is no longer available. Please choose another time.`);
        setLoading(false);
        return null;
      }

      // --- Proceed with actual booking POST ---
      const response = await fetch(
        "https://booking-reservation-system.onrender.com/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          // Attach all booking fields entered by user
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
        }
      );

      // Convert backend response to JSON
      const data = await response.json();

      // If backend returns an error
      if (!response.ok) {
        alert("Booking failed: " + data.error);
        setLoading(false);
        return null;
      }

      // Return the saved booking object from backend
      return data.booking;
    } catch (err) {
      // If server is down or request fails
      console.error(err);
      alert("Failed to connect to server.");
      return null;
    } finally {
      setLoading(false); // Stop loading animation
    }
  }

  return { submitBooking, loading };
}

/* Summary of booking details and submission to backend */
export default function Confirmation() {
  const { reservationData } = useBooking(); // Get booking information
  const { submitBooking, loading } = useBookingSubmit(); // Submit handler
  const navigate = useNavigate(); // Used to redirect user

  const [savedBooking, setSavedBooking] = useState(null); // Store backend response

  // Triggered when user clicks "Confirm & Save Booking"
  async function handleConfirm() {
    const booking = await submitBooking(); // Send data to backend

    // If booking is successfully saved
    if (booking) {
      setSavedBooking(booking);
      alert("Booking successfully saved!");

      // Redirect user to success page
      navigate("/success");
    }
  }

  return (
    <div className="p-5 max-w-2xl mx-auto text-white">
      {/* Page Heading */}
      <h1 className="text-3xl font-semibold mb-4">Confirm Your Reservation</h1>
      <p className="text-neutral-300 mb-6">
        Review your details below and click <strong>Confirm & Save</strong> to
        finalize your booking.
      </p>

      {/* Booking Details Card */}
      <div className="bg-neutral-700 p-5 rounded-xl space-y-4 shadow-lg">
        {/* Selected Date */}
        <div className="flex items-center gap-3">
          <CalendarMonthIcon />
          <span>Date: {reservationData.date}</span>
        </div>

        {/* Selected Time */}
        <div className="flex items-center gap-3">
          <Watch />
          <span>Time: {reservationData.time}</span>
        </div>

        {/* Number of Guests */}
        <div className="flex items-center gap-3">
          <Diversity3Icon />
          <span>Guests: {reservationData.people}</span>
        </div>

        {/* Seating Area */}
        <div className="flex items-center gap-3">
          <ChairIcon />
          <span>Seating Area: {reservationData.seat}</span>
        </div>

        {/* Customer Name */}
        <div className="flex items-center gap-3">
          <PersonIcon />
          <span>Name: {reservationData.fullname}</span>
        </div>

        {/* Email Address */}
        <div className="flex items-center gap-3">
          <EmailIcon />
          <span>Email: {reservationData.email}</span>
        </div>

        {/* Phone Number */}
        <div className="flex items-center gap-3">
          <CallIcon />
          <span>Phone: {reservationData.phone}</span>
        </div>

        {/* Optional Special Requests */}
        {reservationData.notes && (
          <div className="mt-4">
            <p className="text-neutral-300">Special Requests:</p>
            <p className="italic">{reservationData.notes}</p>
          </div>
        )}
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={loading}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-neutral-500 
    text-white py-3 rounded-xl font-semibold transition-all"
      >
        {loading ? "Saving..." : "Confirm & Save Booking"}
      </button>

      {/* Edit Button */}
      <Link
        to="/details"
        className="block mt-3 text-center text-neutral-300 hover:underline"
      >
        Go Back & Edit
      </Link>
    </div>
  );
}
