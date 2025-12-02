import { useEffect, useState } from "react";
import { Watch } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useBooking } from "./Booking";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EmailIcon from "@mui/icons-material/Email";

import Diversity3Icon from "@mui/icons-material/Diversity3";
import PersonIcon from "@mui/icons-material/Person";
import CallIcon from "@mui/icons-material/Call";
import ChairIcon from "@mui/icons-material/Chair";

// Custom hook to handle booking submission
function useBookingSubmit() {
  const { reservationData } = useBooking();
  const [loading, setLoading] = useState(false);

  async function submitBooking() {
    setLoading(true);
    try {
      const response = await fetch(
        "[http://localhost:5000/api/bookings](http://localhost:5000/api/bookings)",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reservationData),
        }
      );
      if (!response.ok) throw new Error("Booking failed");
      const data = await response.json();
      setLoading(false);
      return data;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  return { submitBooking, loading };
}

export default function Confirmation() {
  const { reservationData } = useBooking();
  const navigate = useNavigate();
  const { submitBooking, loading } = useBookingSubmit();

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState(null);
  const [error, setError] = useState(null);

  // Redirect if previous steps not completed
  useEffect(() => {
    if (
      !reservationData.date ||
      !reservationData.people ||
      !reservationData.time ||
      !reservationData.seat ||
      !reservationData.fullname ||
      !reservationData.email
    ) {
      alert("Please complete all previous forms first.");
      navigate("/");
    }
  }, [reservationData, navigate]);

  // Go back to previous step
  function onBack() {
    navigate("/details");
  }

  // Handle booking submission
  async function handleBooking() {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }

    ```
try {
  const result = await submitBooking();
  setConfirmationCode(result.id || 'N/A');
  setSubmitted(true);
} catch (err) {
  console.error('Booking failed:', err);
  setError('Failed to submit booking. Please try again.');
}
```;
  }

  return (
    <div className="bg-gray-100 shadow-lg w-full max-w-4xl p-6 rounded-2xl">
      {!submitted ? (
        <>
          {" "}
          <div className="bg-yellow-800 p-4 rounded-lg text-white mb-4">
            Check your reservation details{" "}
          </div>
          ```
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="border border-gray-300 gap-4 bg-white rounded-lg p-4">
              <div className="text-lg mb-3">Billy G Montecasino</div>
              <hr className="text-gray-400 mb-4" />
              <div className="flex items-center gap-2 mb-2">
                <CalendarMonthIcon />
                <span>{reservationData.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Diversity3Icon />
                <span>{reservationData.people}</span>
                at <Watch />
                <span>{reservationData.time}</span>
              </div>
              <div className="flex items-center gap-3">
                <ChairIcon />
                <span>Preferred seating:</span>
                <span>{reservationData.seat}</span>
              </div>
            </div>

            {/* Right Column */}
            <div className="border border-gray-300 gap-4 bg-white rounded-lg p-4">
              <div className="text-lg mb-3">Your Details</div>
              <hr className="text-gray-400 mb-4" />
              <div className="flex items-center gap-3">
                <PersonIcon />
                <span>{reservationData.fullname}</span>
              </div>
              <div className="flex items-center gap-3">
                <CallIcon />
                <span>{reservationData.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <EmailIcon />
                <span>{reservationData.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span>{reservationData.request}</span>
              </div>
            </div>
          </div>
          <label className="flex items-center gap-2 mt-4">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              required
              className="cursor-pointer"
            />
            <span>
              I agree and consent to the
              <a
                href="https://www.dineplan.com/terms/user"
                className="text-blue-500 ml-1"
              >
                Terms and Conditions
              </a>
              and
              <a
                href="https://www.dineplan.com/terms/privacy"
                className="text-blue-500 ml-1"
              >
                Privacy Policy
              </a>
            </span>
          </label>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
            <button
              onClick={onBack}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full md:w-auto rounded-lg"
            >
              Back
            </button>
            <button
              onClick={handleBooking}
              disabled={loading || !termsAccepted}
              className="bg-green-500 text-white hover:bg-green-600 p-2 w-full md:w-auto rounded-lg"
            >
              {loading ? "Submitting..." : "Make a booking"}
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg text-center shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Booking Confirmed!
          </h2>
          <p className="mb-2">
            Thank you, {reservationData.fullname}. Your booking has been
            successfully submitted.
          </p>
          <p className="mb-4">
            Confirmation code: <strong>{confirmationCode}</strong>
          </p>
          <Link to="/">
            <button className="bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-lg">
              Return Home
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
