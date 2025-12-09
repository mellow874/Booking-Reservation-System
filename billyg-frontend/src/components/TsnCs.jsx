import React, { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function TsnCs() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Trigger Bar */}
      <div
        onClick={() => setExpanded((curr) => !curr)}
        className="
          w-full bg-rose-700 text-white font-bold
          px-3 sm:px-4 py-3
          cursor-pointer
        "
      >
        <span className="flex items-center justify-center gap-2 text-sm sm:text-base">
          TERMS AND CONDITIONS
          {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </span>
      </div>

      {/* Content */}
      {expanded && (
        <div className="text-black px-3 sm:px-6 py-4 w-full">
          <ol
            className="
              list-decimal list-inside
              mx-auto text-center
              space-y-2
              max-w-[95%] sm:max-w-[90%] md:max-w-4xl
              text-xs sm:text-sm md:text-base
            "
          >
            <li>Rewards card discount applicable to the cardholder plus one guest.</li>
            <li>One free child only per one standard adult buffet.</li>
            <li>Rewards discounts are not applicable to Children’s & Pensioners already discounted rates.</li>
            <li>Rewards card discount applicable to all beverages</li>
            <li>
              A booking of 10 pax and more will only be confirmed once a signed
              quotation and proof of payment with 50% deposit of the full invoice
              amount has been paid and received by the Billy G reservation office.
            </li>
            <li>Failing to provide the stipulations above, the booking will lapse automatically.</li>
            <li>
              A full payment of the balance of total invoice must be paid on
              arrival before guests may be allowed in and seated.
            </li>
            <li>
              In the event of any cancellation of bookings within 24 hours of the
              booking date, a 10% cancellation fee is applicable.
            </li>
            <li>The Buffet amount excludes drinks/bar refreshments.</li>
            <li>
              A non-refundable venue hire of R2 000.00 is payable upfront for
              exclusive bookings of our Private Room for bookings under 40 pax.
            </li>
            <li>Pensioners discount requires valid Proof of Identity (ID).</li>
            <li>
              Birthday promo requires Proof of Identity (ID) and a valid Gold
              Reef City Rewards card.
            </li>
            <li>The seating arrangement and preference is subject to availability.</li>
            <li>
              Walk-in guests will be accommodated only if seating becomes
              available.
            </li>
            <li>
              Guests may remain on the waiting list at their own discretion.
            </li>
            <li>The waiting list is served on a first-come, first-served basis.</li>
          </ol>
        </div>
      )}
    </div>
  );
}
