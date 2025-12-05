import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { Link } from 'react-router-dom';
import { useBooking } from './Booking';

/* Reservation component, first step of the booking process, 
-Allows users to select the date via the calendar, 
-Number of guests,
-Time slot, and 
-Seating preferences.
-All fields must be filled up to move on to the next page*/

export default function Reservationdate() {

  // Get global booking state and setter
  const { setReservationData } = useBooking();

  const [date, setDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  // State for each dropdown
  const [peopleOpen, setPeopleOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [seatOpen, setSeatOpen] = useState(false);

  const [people, setPeople] = useState("");
  const [time, setTime] = useState("");
  const [seat, setSeat] = useState("");

  // Store available slots fetched from backend
  const [availableSlots, setAvailableSlots] = useState([]);

  // 28 Nov 2025 not available, fully booked date
  const fullyBookedDates = [new Date(2025, 10, 28).toDateString()];

  /* Fetch available time slots from backend whenever date or seat changes */
  useEffect(() => {
    if (!seat) return;

    const fetchSlots = async () => {
      try {
        const res = await fetch(`https://booking-reservation-system.onrender.com/api/slots?date=${date.toISOString().split("T")[0]}&seatingArea=${seat}`);
        const data = await res.json();
        if (!res.ok) {
          console.error(data.error);
          setAvailableSlots([]);
          return;
        }
        setAvailableSlots(data.slots); // Save available slots for time dropdown
      } catch (err) {
        console.error(err);
        setAvailableSlots([]);
      }
    };

    fetchSlots();
  }, [date, seat]);

  /* Validates all fields before moving to the next page and saves data to global context */
  function onNext() {
    //Check if all required fields are filled
    if (!date || !people || !time || !seat) {
      alert("Please complete all fields before continuing.");
      return;
    }

    // Save selected values to global state for use in next steps
    setReservationData(prev =>({
      ...prev,
      date: date.toDateString(),
      people,
      time,
      seat
    }));
  }

  return (
    // Main container
    <div className='w-full max-w-4xl p-6 rounded-2xl grid grid-cols-1 justify-center items-center shadow-lg md:grid-cols-2 gap-6 bg-gray-50'>

      {/* Left section: Calendar */}
      <div className='flex flex-col gap-4'>
        <div className='text-xl font-semibold'>Select Date</div>

        {/* Calendar placeholder box */}
        <div className='p-4 bg-white shadow-sm h-[360px] flex items-center justify-center'>
          <div className='text-gray-500'>
            <Calendar
              onChange={setDate}
              value={date}
              tileDisabled={({ date }) => {
                const isPast = date < today;
                const isFullyBooked = fullyBookedDates.includes(date.toDateString());
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                return isPast || isFullyBooked || isWeekend; // disables clicks
              }}
              tileClassName={({ date }) => {
                const isPast = date < today;
                const isFullyBooked = fullyBookedDates.includes(date.toDateString());
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                if (isPast || isFullyBooked || isWeekend) {
                  return 'opacity-40 pointer-events-none'; // gray overlay + no click
                }
                return "";
              }}
            />

            {/* Selected date appears below the calendar */}
            <div id='date' className='mt-4 text-gray-700 font-medium'>
              You selected:{' '}
              <span className='text-sky-600'>
                {date.toDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Questions with dropdowns */}
      <div className='flex flex-col gap-4'>

        {/* Guests Dropdown */}
        <div id='guests'
          onClick={() => setPeopleOpen(!peopleOpen)}
          className='rounded-2xl p-4 bg-gray-50 shadow-sm cursor-pointer'
        >
          <div className='flex justify-between items-center text-gray-700 font-medium'>
            {people || 'How many guests?'}<ChevronDown />
          </div>

          {/* Dropdown content, with options for number of guests */}
          {peopleOpen && (
            <div className='mt-3 p-3 bg-white rounded-xl' required>
              {[...Array(10)].map((_, i) => (
                <div key={i} className='p-2 hover:bg-gray-200 rounded' onClick={() => { 
                  setPeople(`${i+1} ${i === 0 ? 'person' : 'people'}`);
                  setPeopleOpen(false);
                }}>
                  {i+1} {i === 0 ? 'person' : 'people'}
                </div>
              ))}
              <div className='p-2 hover:bg-gray-200 rounded text-sm'>Please phone for larger bookings</div>
            </div>
          )}
        </div>

        {/* Time Dropdown */}
        <div 
          id='time'
          onClick={() => setTimeOpen(!timeOpen)}
          className='rounded-2xl p-4 bg-gray-50 shadow-sm cursor-pointer'
        >
          <div className='flex justify-between items-center text-gray-700 font-medium'>
            {time || 'What time?'}<ChevronDown />
          </div>

          {timeOpen && (
            <div className='mt-3 p-3 bg-white rounded-xl' required>
              {/* Populate times dynamically based on availableSlots */}
              {availableSlots.length > 0 ? availableSlots.map((slot, index) => (
                <div
                  key={index}
                  className={`p-2 hover:bg-gray-200 rounded ${!slot.available ? 'opacity-40 pointer-events-none' : ''}`}
                  onClick={() => {
                    if (slot.available) {
                      setTime(slot.time);
                      setTimeOpen(false);
                    }
                  }}
                >
                  {slot.time} {slot.available ? '' : '(Full)'}
                </div>
              )) : (
                <>
                  <div className='p-2'>Select a seating area to see available times</div>
                </>
              )}
            </div>
          )}
        </div>

        {/* SEATING DROPDOWN */}
        <div
          id='seat'
          onClick={() => setSeatOpen(!seatOpen)}
          className='rounded-2xl p-4 bg-gray-50 shadow-sm cursor-pointer'
        >
          <div className='flex justify-between items-center text-gray-700 font-medium'>
            {seat || 'Seating preference...'}<ChevronDown />
          </div>

          {seatOpen && (
            <div className='mt-3 p-3 bg-white rounded-xl'>
              {['Patio', 'Restaurant Left', 'Restaurant Right', 'Couches', 'Buffet'].map((s, idx) => (
                <div
                  key={idx}
                  className='p-2 hover:bg-gray-200 rounded'
                  onClick={() => { setSeat(s); setSeatOpen(false); }}
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <Link to='/details'>
          <div
            onClick={onNext}
            className='w-100 mt-4 rounded-2xl py-4 text-lg text-center bg-sky-500 hover:bg-sky-600 text-white cursor-pointer'
          >
            Enter your details →
          </div>
        </Link>
        <Link to='/'>
          <div className='w-100 mt-4 rounded-2xl py-4 text-lg text-center bg-sky-500 hover:bg-sky-600 text-white cursor-pointer'>
            Back
          </div>
        </Link>
      </div>
    </div>
  );
}
