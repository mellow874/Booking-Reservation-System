import React from 'react'
import { MapPin } from 'lucide-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function Note() {
  return (
    // Everything stays in a grid with three columns
    <div className='grid grid-cols-3 gap-6 bg-rose-700 p-6 text-white'>
      {/*Location */}
      <div>
         <MapPin className='text-white' />
        <p>Shop 56, Montecasino</p>
      </div>

      {/*Time Slots */}
      <div className='border-l-2 pl-4'>
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

      {/*Contact */}
      <div className='border-l-2 pl-4'>
        <p>+27 11 510 7924</p>
        <a>Montecasino.billyg@tsogosun.com</a>
      </div>

    </div>
  );
}
