import React, { useState } from "react";
import { ChevronRight, ChevronDown, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

export default function Info() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 py-6 max-w-[900px] mx-auto space-y-5 sm:space-y-6">

      {/* Page Title */}
      <h1 className="text-rose-700 text-2xl sm:text-[32px] font-bold">
        Billy G Buffet
      </h1>

      {/* Main Headings */}
      <h1 className="text-rose-700 text-4xl sm:text-6xl lg:text-[78px] font-extrabold leading-tight">
        FAMILY FRIENDLY
      </h1>

      <h1 className="text-rose-700 text-3xl sm:text-5xl lg:text-[58px] font-extrabold leading-tight">
        JOHANNESBURG BUFFET
      </h1>

      {/* Description */}
      <p className="max-w-[750px] text-neutral-600 leading-relaxed text-sm sm:text-base">
        This upmarket, family buffet restaurant in Johannesburg offers an extensive
        selection of dishes. Enjoy a variety of starters, main courses, and desserts.
        From succulent cuts of meat to casseroles, curries, vegetarian offerings,
        pasta dishes, salads, and tantalising desserts – there is something to suit
        every palate.
      </p>

      {/* Buffet Prices */}
      <h1 className="text-rose-700 text-xl sm:text-2xl lg:text-[36px] font-extrabold">
        BUFFET PRICES:
      </h1>

      <p className="font-semibold text-neutral-600 text-sm sm:text-base max-w-[800px]">
        Standard: R295 *Reward member discount applicable at all properties for Rewards
        members plus one guest
      </p>

      {/* Pricing list */}
      <ul className="space-y-1 text-sm sm:text-base max-w-[800px]">
        <li className="text-neutral-600">
          <span className="font-bold">Children 0 – 1:</span> Free * One free child per one standard buffet adult.
        </li>
        <li className="text-neutral-600">
          <span className="font-bold">Children 2–6:</span> R90 * Rewards member discount not applicable.
        </li>
        <li className="text-neutral-600">
          <span className="font-bold">Children 7–12:</span> R175 * Rewards member discount not applicable.
        </li>
        <li className="text-neutral-600">
          <span className="font-bold">Pensioners:</span> R200 * Rewards member discount not applicable.
        </li>
      </ul>

      <p className="text-xs sm:text-sm text-neutral-600">ID required.</p>

      {/* Birthday */}
      <h1 className="text-rose-700 font-extrabold text-lg sm:text-[22px]">
        CELEBRATING YOUR BIRTHDAY WITH US: R150
      </h1>

      <p className="max-w-[700px] text-neutral-600 text-sm sm:text-base">
        50% discount on Standard Buffet price applicable to Rewards members only and
        must be taken up on the day of their birthday.
      </p>

      <p className="text-xs sm:text-sm text-neutral-600">ID required.</p>

      {/* Corkage Section */}
      <div className="w-full max-w-[900px] flex flex-col items-center mt-4">

        <div
          onClick={() => setExpanded((curr) => !curr)}
          className="bg-rose-700 text-white font-bold px-4 sm:px-6 py-3 sm:py-4 cursor-pointer w-full flex items-center justify-between"
        >
          <div className="w-6"></div>

          <span className="text-center w-full tracking-wide text-sm sm:text-base">
            CORKAGE: R120
          </span>

          <span>
            {expanded ? <ChevronDown size={22} /> : <ChevronRight size={22} />}
          </span>
        </div>

        {expanded && (
          <div className="text-black px-4 sm:px-8 py-6 w-full text-center space-y-4">
            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base max-w-[800px] mx-auto">
              For the safety of all guests, alcohol is not permitted to be brought
              onto property unless prior arrangements have been made directly with
              the restaurant.
            </p>

            <p className="text-neutral-600 leading-relaxed text-sm sm:text-base max-w-[800px] mx-auto">
              Please inform the restaurant upon booking or at least 12hrs prior to
              arrival if you will be bringing your own alcohol.
            </p>

            <hr className="border-gray-300 w-full" />
          </div>
        )}
      </div>

      {/* Book Now */}
      <Link to="/reservation-date">
        <button className="bg-rose-700 text-white px-5 sm:px-6 py-3 mt-4 rounded-lg font-bold shadow flex gap-2 items-center text-sm sm:text-base">
          <CalendarDays size={18} />
          BOOK NOW
        </button>
      </Link>

      {/* Powered by */}
      <a
        href="https://www.dineplan.com/restaurants/billy-g-at-montecasino"
        className="text-gray-500 text-xs sm:text-sm underline mt-2"
      >
        Powered by Dineplan
      </a>
    </div>
  );
}
