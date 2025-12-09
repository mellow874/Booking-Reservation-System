import React, { useState } from 'react';
import logo from '../assets/logo.jpeg';
import { Menu, X } from 'lucide-react';

export default function Mainbar() {
const [isOpen, setIsOpen] = useState(false);

return (  
    <div className='bg-rose-700 text-white p-2'>  
        <div className='flex justify-between items-center'>  
            {/* Logo */}  
            <a href='https://www.montecasino.co.za/' className='w-24'>
            <img src={logo} alt='Montecasino Logo' className='md:cover' />
            </a>  

            {/* Hamburger button for mobile */}  
            <button className='md:hidden' onClick={() => setIsOpen(!isOpen)}>  
                {isOpen ? <X size={24} /> : <Menu size={24} />}  
            </button>  

            {/* Nav links */}  
            <div className={`flex flex-col md:flex-row md:items-center md:gap-6 gap-3 absolute md:static w-full md:w-auto left-0 md:left-auto bg-rose-700 p-2 md:p-0 transition-all ${isOpen ? 'top-14' : '-top-96'}`}>  
                <a href='https://www.montecasino.co.za/gaming/' className='font-bold'>GAMING</a>  
                <a href='https://www.tsogosun.com/rewards/' target='_blank' className='font-bold'>REWARDS</a>  
                <a href='https://www.montecasino.co.za/entertainment/' className='font-bold'>ENTERTAINMENT</a>  
                <a href='https://www.montecasino.co.za/dining/' className='font-bold'>DINING</a>  
                <a href='https://www.montecasino.co.za/offers/' className='font-bold'>OFFERS</a>  
                <a href='https://www.montecasino.co.za/hotels/' className='font-bold'>HOTELS</a>  
                <a href='https://www.montecasino.co.za/more-at-montecasino/' className='font-bold'>MORE</a>  
            </div>  
        </div>  
    </div>  
);  

}
