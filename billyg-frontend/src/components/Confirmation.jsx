import { useEffect, useState } from "react";
import { Watch } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "./Booking";

// Material UI Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import ChairIcon from "@mui/icons-material/Chair";

/*
Custom hook that:

* Pre-checks slot availability before submitting the booking
* Sends booking data to the backend
* Handles loading state and error alerts
  */
function useBookingSubmit() {
  const { reservationData } = useBooking();
  const [loading, setLoading] = useState(false);

  // Function that sends a POST request to the backend
  async function submitBooking() {
    setLoading(true);

    try {
      /* 
    STEP 1: CHECK IF THE SELECTED TIME SLOT IS STILL AVAILABLE
    This prevents double-booking if two users book at the same time.
  */
      const slotResponse = await fetch(
        `https://booking-reservation-system.onrender.com/api/slots?date=${
          new Date(reservationData.date).toISOString().split("T")[0]
        }&seatingArea=${reservationData.seat}`
      );

      const slotData = await slotResponse.json();

      // Find matching time slot from backend response
      const selectedSlot = slotData.slots?.find(
        (s) => s.time === reservationData.time
      );

      if (!selectedSlot || !selectedSlot.available) {
        alert(
          `The selected time slot (${reservationData.time}) is no longer available. Please choose another time.`
        );
        setLoading(false);
        return null;
      }

      /*
    STEP 2: SUBMIT BOOKING TO BACKEND
    Sends all captured details to the Node.js API.
  */
      const response = await fetch(
        "https://booking-reservation-system.onrender.com/api/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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

      const data = await response.json();

      // If backend rejects booking
      if (!response.ok) {
        alert("Booking failed: " + data.error);
        setLoading(false);
        return null;
      }

      // Return saved booking for frontend use
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

/*
Confirmation Page:

* Displays all reservation details for final review
* Allows user to submit booking
* Redirects to success page after booking is saved
  */
export default function Confirmation() {
  const { reservationData } = useBooking();
  const { submitBooking, loading } = useBookingSubmit();
  const navigate = useNavigate();

  const [savedBooking, setSavedBooking] = useState(null);

  // Handles the Confirm & Save button click
  async function handleConfirm() {
    const booking = await submitBooking();

    if (booking) {
      setSavedBooking(booking);
      alert("Booking successfully saved!");

      // Redirect to success screen
      navigate("/success");
    }
  }

  return (
    <div className="p-5 max-w-2xl mx-auto text-white">
      {/* Title & Intro */}{" "}
      <h1 className="text-3xl font-semibold mb-4">Confirm Your Reservation</h1>{" "}
      <p className="text-neutral-300 mb-6">
        Review your details below and click <strong>Confirm & Save</strong> to
        finalize your booking.{" "}
      </p>
      {/* Details Card */}
      <div className="bg-neutral-700 p-5 rounded-xl space-y-4 shadow-lg">
        {/* Date */}
        <div className="flex items-center gap-3">
          <CalendarMonthIcon />
          <span>Date: {reservationData.date}</span>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3">
          <Watch />
          <span>Time: {reservationData.time}</span>
        </div>

        {/* Guests */}
        <div className="flex items-center gap-3">
          <Diversity3Icon />
          <span>Guests: {reservationData.people}</span>
        </div>

        {/* Seating Area */}
        <div className="flex items-center gap-3">
          <ChairIcon />
          <span>Seating Area: {reservationData.seat}</span>
        </div>

        {/* Name */}
        <div className="flex items-center gap-3">
          <PersonIcon />
          <span>Name: {reservationData.fullname}</span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-3">
          <EmailIcon />
          <span>Email: {reservationData.email}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3">
          <CallIcon />
          <span>Phone: {reservationData.phone}</span>
        </div>

        {/* Optional Notes */}
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
