import react from 'react';
import logo from '../assets/logo.jpeg';

export default function Mainbar() {
    return (
        <div className='flex justify-center space-x-6 bg-rose-700 p-4 text-white'>
                <a href='https://www.montecasino.co.za/' className='w-30'><img src={logo} className='gap-4' /></a>
                <a href='https://www.montecasino.co.za/gaming/'>GAMING</a>
                <a href='https://www.tsogosun.com/rewards/' target='_blank'>REWARDS</a>
                <a href='https://www.montecasino.co.za/entertainment/'>ENTERTAINMENT</a>
                <a href='https://www.montecasino.co.za/dining/'>DINING</a>
                <a href='https://www.montecasino.co.za/offers/'>OFFERS</a>
                <a href='https://www.montecasino.co.za/hotels/'>HOTELS</a>
                <a href='https://www.montecasino.co.za/more-at-montecasino/'>MORE</a>
            
        </div>
    );
}