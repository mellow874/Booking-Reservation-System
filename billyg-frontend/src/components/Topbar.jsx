import React, { useState } from 'react';
import { ChevronRight, Menu, X } from 'lucide-react';

export default function Topbar() {
const [isOpen, setIsOpen] = useState(false);

return (  
    <div className='bg-neutral-700 p-2 text-white'>  
        <div className='flex justify-between items-center md:justify-end'>  
            {/* Hamburger icon for mobile */}  
            <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>  
                {isOpen ? <X size={24} /> : <Menu size={24} />}  
            </button>  

            <ul className={`flex flex-col md:flex-row md:items-center md:gap-6 gap-2 absolute md:static bg-neutral-700 w-full md:w-auto left-0 md:left-auto p-2 md:p-0 transition-all ${isOpen ? 'top-12' : '-top-96'}`}>  
                <li><a href='https://www.montecasino.co.za/entertainment/whatson/#'>CASINOS</a></li>  
                <li className='flex items-center'>BOOK <ChevronRight className='ml-1' /></li>  
                <li className='border-2 px-2 py-0.5'><a href='https://www.tsogosun.com/hotel/' target='_blank'>HOTELS</a></li>  
                <li className='border-2 px-2 py-0.5'><a href='https://movietickets.tsogosun.com/' target='_blank'>MOVIES</a></li>  
                <li className='border-2 px-2 py-0.5'><a href='https://www.montecasino.co.za/entertainment/whatson/' target='_blank'>EVENTS</a></li>  
            </ul>  
        </div>  
    </div>  
);  

}
