import { useState } from "react";
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

export default function Confirmation() {
  const { reservationData } = useBooking();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);

    try {
      // Step 1: Check slot availability from mock backend
      const dateStr = new Date(reservationData.date).toISOString().split("T")[0];
      const slotRes = await fetch(
        `https://booking-reservation-system.onrender.com/api/slots?date=${dateStr}&seatingArea=${reservationData.seat}`
      );
      const slotData = await slotRes.json();

      const selectedSlot = slotData.slots?.find(s => s.time === reservationData.time);

      if (!selectedSlot || !selectedSlot.available) {
        alert(`The selected time slot (${reservationData.time}) is no longer available.`);
        setLoading(false);
        return;
      }

      // Step 2: Submit booking to mock backend
      const response = await fetch(
        "https://booking-reservation-system.onrender.com/api/bookings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            booking_date: dateStr,
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

      if (!response.ok) {
        alert("Booking failed: " + data.error);
        setLoading(false);
        return;
      }

      alert("Booking successfully saved!");
      navigate("/success");

    } catch (err) {
      console.error(err);
      alert("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-5 max-w-2xl mx-auto text-white">
      <h1 className="text-3xl font-semibold mb-4">Confirm Your Reservation</h1>
      <p className="text-neutral-300 mb-6">
        Review your details below and click <strong>Confirm & Save</strong> to finalize your booking.
      </p>

      <div className="bg-neutral-700 p-5 rounded-xl space-y-4 shadow-lg">
        <div className="flex items-center gap-3">
          <CalendarMonthIcon /> <span>Date: {reservationData.date}</span>
        </div>
        <div className="flex items-center gap-3">
          <Watch /> <span>Time: {reservationData.time}</span>
        </div>
        <div className="flex items-center gap-3">
          <Diversity3Icon /> <span>Guests: {reservationData.people}</span>
        </div>
        <div className="flex items-center gap-3">
          <ChairIcon /> <span>Seating Area: {reservationData.seat}</span>
        </div>
        <div className="flex items-center gap-3">
          <PersonIcon /> <span>Name: {reservationData.fullname}</span>
        </div>
        <div className="flex items-center gap-3">
          <EmailIcon /> <span>Email: {reservationData.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <CallIcon /> <span>Phone: {reservationData.phone}</span>
        </div>
        {reservationData.notes && (
          <div className="mt-4">
            <p className="text-neutral-300">Special Requests:</p>
            <p className="italic">{reservationData.notes}</p>
          </div>
        )}
      </div>

      <button
        onClick={handleConfirm}
        disabled={loading}
        className="mt-6 w-full bg-green-600 hover:bg-green-700 disabled:bg-neutral-500 text-white py-3 rounded-xl font-semibold transition-all"
      >
        {loading ? "Saving..." : "Confirm & Save Booking"}
      </button>

      <Link
        to="/details"
        className="block mt-3 text-center text-neutral-300 hover:underline"
      >
        Go Back & Edit
      </Link>
    </div>
  );
}
