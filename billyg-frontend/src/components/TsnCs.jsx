import react from "react";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function TsnCs() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className='w-full max-w-xl mx-auto flex items-center justify-between'>
      {/* Trigger Bar */}
      <div
        onClick={() => setExpanded((curr) => !curr)}
        className='flex items-center justify-between bg-rose-700 text-white font-bold px-4 py-3 cursor-pointer rounded-md'
      >
        <span>TERMS AND CONDITIONS</span>
        {expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
      </div>

      {/* Content */}
      {expanded && (
        <div className='bg-white text-black p-4 mt-2 rounded-md shadow-md border border-gray-200'>
          <ol className='list-decimal ml-6 space-y-1'>
            <li>Rewards card discount applicable to the cardholder plus one guest.</li>
            <li>One free child only per one standard adult buffet.</li>
            <li>Rewards discounts are not applicable to Children’s & Pensioners already discounted rates.</li>
            <li>Rewards card discount applicable to all beverages</li>
            <li>A booking of 10 pax and more will only be confirmed once a signed quotation and proof of payment with 50%
deposit of the full invoice amount has been paid and received by the Billy G reservation office, prior to the stipulated date of the booking.</li>
            <li>Failing to provide the stipulations above, the booking will lapse automatically.</li>
            <li>A full payment of the balance of total invoice must be paid on arrival on the day of the booking before guests may be allowed in and seated.
              The total number of pax must therefore be confirmed and finalised prior to arriving at the restaurant to avoid any payment delays at the entrance.
            </li>
            <li>In the event of any cancellation of bookings within 24hours of the booking date, a 10% cancellation fee is applicable to the latest signed quotation.</li>
            <li>The Buffet amount is excluding drinks/bar refreshments which will be ordered and paid for with the Waitron.</li>
            <li>A non-refundable venue hire of R2 000.00 is payable upfront for exclusive bookings of our Private Room for bookings less than 40 pax.</li>
            <li>Pensioners discount will only be granted when the Cashier is provided with Proof of Identity(ID).</li>
            <li>Birthday promo/discount will only be granted when the Cashier is provided with Proof of Identity(ID) and a valid Gold Reef City Rewards card.</li>
            <li>The seating arrangement and preference is subjected to availability of space.</li>
            <li>The restaurant will only be able to accommodate Walk- In Guests should there be cancellations of confirmed bookings or restaurant seating availability upon arrival.</li>
            <li>It is your choice as a valued guest to remain on the waiting list for a possible opening. The restaurant cannot be held liable if there is no availability, or no cancellations.</li>
            <li>The waiting list will be accommodated on a first come, first served basis, provided there is availability.</li>
            {/* Add more as needed */}
          </ol>
        </div>
      )}
    </div>
  );
}
