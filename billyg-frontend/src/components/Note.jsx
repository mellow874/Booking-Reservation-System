import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CallIcon from '@mui/icons-material/Call';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function Note() {
  return (
    <div className='grid grid-cols-3 gap-6 bg-rose-700 p-6 text-white'>

      {/* Location */}
      <div className='flex flex-col items-center justify-center text-center space-y-2 mb-70'>
        <LocationOnIcon className='text-white' style={{ fontSize: "6rem" }} />
        <p>Shop 56, Montecasino</p>
      </div>

      {/* Time Slots */}
      <div className='flex flex-col items-center justify-center text-center space-y-2 border-l-2'>
        <AccessTimeIcon className='text-white' style={{ fontSize: "6rem" }} />

        <ul className='space-y-1'>
          <li>Monday & Tuesday: Closed</li>
          <li>Wednesday to Friday</li>
          <li>12H00 to 16H00</li>
          <li>18H00 to 22H00</li>
          <li>Saturday</li>
          <li>11H00 - 14H00</li>
          <li>15H00 - 18H00</li>
          <li>19H00 - 22H00</li>
          <li>Sunday</li>
          <li>12H00 to 16H00</li>
          <li>18H00 to 22H00</li>
        </ul>
      </div>

      {/* Contact */}
      <div className='flex flex-col items-center justify-center text-center space-y-2 border-l-2'>
        <div className='mb-70'>
            <CallIcon className='text-white' style={{ fontSize: "6rem" }} />
            <p>+27 11 510 7924</p>
            <a className='underline'>Montecasino.billyg@tsogosun.com</a>
        </div>
        
      </div>

    </div>
  );
}
