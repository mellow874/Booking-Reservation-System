import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Calendar from 'react-calendar'
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

   // state for each dropdown
    const [peopleOpen, setPeopleOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false);
    const [seatOpen, setSeatOpen] = useState(false);

    const [people, setPeople] = useState("");
    const [time, setTime] = useState("");
    const [seat, setSeat] = useState("");

    // 28 Nov 2025 not available, fully booked date
    const fullyBookedDates = [new Date(2025, 10, 28).toDateString(),];

    /* Validates all fields before moving to the next page and saves data to global context */
    function onNext() {
      //Check if all required fields are filled
      if (!date || !people || !time || !seat) {
        alert("Please complete all fields before continuing.");
      return;
      }

      //Saves selected values to global state for use in next steps
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
          <div className='text-gray-500'><Calendar onChange={setDate} value={date} tileDisabled={({ date }) => {
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
            
            {/*Selected date appears below the calendar */}
             <div id='date' className='mt-4 text-gray-700 font-medium'>
            You selected:{''}
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

          {/* Dropdown content, with options for number of guests*/}
          {peopleOpen && (
            <div className='mt-3 p-3 bg-white rounded-xl' required>
              
              <div className='p-2 hover:bg-gray-200 rounded' onClick={() => { 
                setPeople('1 person');
                setPeopleOpen(false);
              }} >1 person</div>
              <div className='p-2 hover:bg-gray-200 rounded'onClick={() => { 
                setPeople('2 people'); 
                setPeopleOpen(false); 
                }}>2 people</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { 
                setPeople('3 people'); 
                setPeopleOpen(false); 
                }}>3 people</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { 
                setPeople('4 people'); 
                setPeopleOpen(false); 
                }}>4 people</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { 
                setPeople('5 people'); 
                setPeopleOpen(false); 
                }}>5 people</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { 
                setPeople('6 people'); 
                setPeopleOpen(false); 
                }}>6 people</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { 
                setPeople('7 people'); 
                setPeopleOpen(false); 
                }}>7 people</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { 
                setPeople('8 people'); 
                setPeopleOpen(false); 
                }}>8 people</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { 
                setPeople('9 people'); 
                setPeopleOpen(false); 
                }}>9 people</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { 
                setPeople('10 people'); 
                setPeopleOpen(false); 
                }}>10 people</div>
              <div className='p-2 hover:bg-gray-200 rounded test-sm'>Please phone for larger bookings</div>
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
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { setTime('17:00'); setTimeOpen(false); }}>17:00</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { setTime('18:00'); setTimeOpen(false); }}>18:00</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { setTime('19:00'); setTimeOpen(false); }}>19:00</div>
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
              <div className='p-2 hover:bg-gray-200 rounded' required
              onClick={() => { setSeat('Patio'); setSeatOpen(false); }}>Patio</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { setSeat('Restaurant Left'); setSeatOpen(false); }}>Restaurant Left</div>
              <div className='p-2 hover:bg-gray-200 rounded' required
              onClick={() => { setSeat('Restaurant Right'); setSeatOpen(false); }}>Restaurant Right</div>
              <div className='p-2 hover:bg-gray-200 rounded' required
              onClick={() => { setSeat('Coaches'); setSeatOpen(false); }}>Couches</div>
              <div className='p-2 hover:bg-gray-200 rounded'
              onClick={() => { setSeat('Buffet'); setSeatOpen(false); }}>Buffet</div>
            </div>
          )}
        </div>

        <Link to='/details'>
        <div
          onClick={onNext}
          className='w-100 mt-4 rounded-2xl py-4 text-lg text-center bg-sky-500 hover:bg-sky-600 text-white cursor-pointer'
        >
          Enter your details →
        </div>
        </Link>
        </div>

      </div>
   
  );
}
