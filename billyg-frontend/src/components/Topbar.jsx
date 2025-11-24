import react from 'react';
import { ChevronRight } from 'lucide-react';

export default function Topbar() {
    return (
        //Navlinks move to the end of the page
        <div className='bg-neutral-700 p-2 text-white flex justify-end '>
            {/*Navlinks position horizontal*/}
            <ul className='flex flex-wrap justify-between gap-4'>
                {/*Each navlink leads to its designated page*/}
                <li className=''><a href='https://www.montecasino.co.za/entertainment/whatson/#'>CASINOS</a></li>
                <li className=''>BOOK <ChevronRight /> </li>
                <li className='border-2 px-2 py-0.5'><a href='https://www.tsogosun.com/hotel/' target='_blank'>HOTELS</a></li>
                <li className='border-2 px-2 py-0.5'><a href='https://movietickets.tsogosun.com/' target='_blank'>MOVIES</a></li>
                <li className=' border-2 px-2 py-0.5'><a href='https://www.montecasino.co.za/entertainment/whatson/' target='_blank'>EVENTS</a></li>
            </ul>
        </div>
    );
}