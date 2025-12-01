import React, { useState } from "react";
import { ChevronRight, ChevronDown, CalendarDays } from "lucide-react";
import {Link} from 'react-router-dom'

export default function Info() {
  const [expanded, setExpanded] = useState(false);

  return (
    // Main wrapper: centers everything and adds horizontal 
    <div className='flex flex-col items-center text-center p-8 max-w-[900px] mx-auto space-y-6'>

      {/* Page Title */}
      <h1 className='text-rose-700 text-[32px] font-bold'>
        Billy G Buffet
      </h1>

      {/* Main Headings */}
      <h1 className='text-rose-700 text-[78px] font-extrabold leading-tight'>
        FAMILY FRIENDLY
      </h1>

      <h1 className='text-rose-700 text-[58px] font-extrabold leading-tight'>
        JOHANNESBURG BUFFET
      </h1>

      {/* Description paragraph */}
      <p className='max-w-[750px] text-neutral-600 leading-relaxed text-[16px]'>
        This upmarket, family buffet restaurant in Johannesburg offers an extensive selection of dishes.
        Enjoy a variety of starters, main courses, and desserts. From succulent cuts of meat to a variety
        of casseroles, curries, and vegetarian offerings, pasta dishes, salads, and tantalising desserts –
        there is something to suit every palate.
      </p>

      {/* Buffet Prices */}
      <h1 className='text-rose-700 text-[36px] font-extrabold'>
        BUFFET PRICES:
      </h1>

      {/* Standard Price Line */}
      <p className='font-semibold text-neutral-600'>
        Standard: R295 *Reward member discount applicable at all properties for Rewards members plus one guest
      </p>

      {/* Pricing list */}
      <ul className='space-y-1'>
        <li className='text-neutral-600'><span className='font-bold text-neutral-600'>Children 0 – 1:</span> Free * One free child per one standard buffet adult.</li>
        <li className='text-neutral-600'><span className='font-bold text-neutral-600'>Children 2-6:</span> R90 * Rewards member discount not applicable.</li>
        <li className='text-neutral-600'><span className='font-bold text-neutral-600'>Children 7-12:</span> R175 * Rewards member discount not applicable.</li>
        <li className='text-neutral-600'><span className='font-bold text-neutral-600'>Pensioners:</span> R200 * Rewards member discount not applicable.</li>
      </ul>

      <p className='text-sm text-neutral-600'>ID required.</p>

      {/* Birthday Section */}
      <h1 className='text-rose-700 font-extrabold text-[22px]'>
        CELEBRATING YOUR BIRTHDAY WITH US: R150
      </h1>

      <p className='max-w-[700px] text-neutral-600'>
        50% discount on Standard Buffet price applicable to Rewards members only and must be taken up on the
        day of their birthday.
      </p>

      <p className='text-sm text-neutral-600'>ID required.</p>

      {/* Corkage Section */}
<div className='w-full max-w-[900px] flex flex-col items-center mt-6'>

  {/* Top Bar (full width + centered text + right icon) */}
  <div
    onClick={() => setExpanded((curr) => !curr)}
    className='bg-rose-700 text-white font-bold px-6 py-4 cursor-pointer w-full flex items-center justify-between'
  >
    {/* Left spacer (keeps text centered even with icon) */}
    <div className='w-6'></div>

    {/* Center text */}
    <span className='text-center w-full tracking-wide'>
      CORKAGE: R120
    </span>

    {/* Right icon */}
    <span>
      {expanded ? <ChevronDown size={26} /> : <ChevronRight size={26} />}
    </span>
  </div>

  {/* DROPDOWN CONTENT */}
  {expanded && (
    <div className=' text-black p-8 mt-2 w-full text-center space-y-6'>

      {/* Paragraph 1 */}
      <p className='text-neutral-600 leading-relaxed max-w-[800px] mx-auto'>
        For the safety of all guests, alcohol is not permitted to be brought onto property
        unless prior arrangements have been made directly with the restaurant.
      </p>

      {/* Paragraph 2 */}
      <p className='text-neutral-600 leading-relaxed max-w-[800px] mx-auto'>
        Please inform the restaurant upon booking your table or at least 12hrs prior to your arrival
        should you be bringing your own alcohol, in order for the security team to be notified timeously.
      </p>

      {/* Divider */}
      <hr className='border-gray-300 w-full' />
    </div>
  )}

</div>


      {/* BOOK NOW Button */}
      <Link to='/reservation-date'>
      <button className='bg-rose-700 text-white px-6 py-3 mt-6 rounded-lg font-bold shadow flex gap-2'>
        <CalendarDays />
        BOOK NOW
      </button>
      </Link>

      {/* Powered by link */}
      <a
        href="https://www.dineplan.com/restaurants/billy-g-at-montecasino"
        className="text-gray-500 text-sm underline mt-2"
      >
        Powered by Dineplan
      </a>
    </div>
  );
}
