import { useEffect, useState } from 'react'
import { Watch } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from './Booking';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmailIcon from '@mui/icons-material/Email';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import PersonIcon from '@mui/icons-material/Person';
import CallIcon from '@mui/icons-material/Call';
import ChairIcon from '@mui/icons-material/Chair';

/* Confirmation Component
-Displays all reservation and customer details
-All previous steps should be completed
-Terms and Conditions accepted
-Option to delete booking after confirmation */

export default function Confirmation() {
     // Get global booking data
  const { reservationData } = useBooking();
  const navigate = useNavigate();
  const { submitBooking, loading } = useBookingSubmit();
    
  // Local states
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  /* Validates that all previous steps are completed
  If user tries to access this page without completing previous steps, redirects to start */

  useEffect(() => {
    if (!reservationData.date || !reservationData.people || !reservationData.time ||
        !reservationData.seat || !reservationData.fullname || !reservationData.email) {
      alert('Please complete all previous forms first.');
      navigate("/");
    }
  }, [reservationData, navigate]);

  /* Returns user to the previous step */

  function onBack() {
    navigate('/details')
}

/*handleBooking Function 
-Submits the booking to the backend API
-Requires terms to be accepted first
-Shows success message with confirmation code on success
*/

async function handleBooking() {
    //Validate terms are accepted
    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }

    try {
      await submitBooking();
      setSubmitted(true);
    } catch (err) {
      console.error("Booking failed:", err);
    }
}
    
  return (
    <div className='bg-gray-100 shadow-lg w-full max-w-4xl p-6 rounded-2xl'>
        {/* Top Heading */}
        <div className='bg-yellow-800 p-4 rounded-lg text-white mb-4'>Check your reservation details</div>

        {/* Two Columns */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Left Column */}
            <div className='border border-gray-300 gap-4 bg-white rounded-lg p-4'>
                <div className=' text-lg mb-3'>Billy G Montecasino</div>
                <hr className='text-gray-400 mb-4'/>
            <div className='flex items-center gap-2 mb-2'>
                <CalendarMonthIcon/> 
                <span>{reservationData.date}</span>
            </div>
            <div className='flex items-center gap-3'>
                <Diversity3Icon/> 
                <span>{reservationData.people}</span>
                at <Watch/>
                <span>{reservationData.time }</span>
            </div>
            <div className='flex items-center gap-3'>
                <ChairIcon/>
                <span>Preferred seating:</span> 
                <span>{reservationData.seat}</span>
            </div>
            </div>

            {/* Right Column */}
            
            <div className='border border-gray-300 gap-4 bg-white rounded-lg p-4'>
                <div className=' text-lg mb-3'>Your Details</div>
                <hr className='text-gray-400 mb-4'/>
                
                <div className='flex items-center gap-3'>
                    <PersonIcon/>
                    <span>{reservationData.fullname}</span>
                </div>
            <div className='flex items-center gap-3'>
                <CallIcon/>
                <span>{reservationData.phone}</span>
            </div>
            <div className='flex items-center gap-3'>
                <EmailIcon/>
                <span>{reservationData.email}</span>
            </div>
            <div className='flex items-center gap-3'>
                
                <span>{reservationData.request}</span>
            </div>
        </div>
         
        </div>
        <label>
            <input type='checkbox' checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} required className='cursor-pointer'/>
            <span> I agree and consent to the
                <a href='https://www.dineplan.com/terms/user' className='text-blue-500'> Terms and Conditions </a>
                and
                <a href='https://www.dineplan.com/terms/privacy' className='text-blue-500'> Privacy Policy</a>
            </span>
        </label>
        <div className='flex flex-cols-1 justify-center gap-4 '>
            <Link to='/details/'>
            <button onClick={onBack} disabled={loading} className='bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded-lg'>Back</button>
            </Link>
            <Link>
            <button onClick={handleBooking} disabled={loading || !termsAccepted} className='bg-green-500 text-white hover:bg-green-600 p-2 w-full rounded-lg'>Make a booking</button>
            </Link>
        </div>
        
    </div>
  );
}

