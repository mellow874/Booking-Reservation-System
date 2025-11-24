import react from 'react';
import logo from '../assets/logo.jpeg';


export default function Mainbar() {
    return (
        //Navlinks align horizontal and are centered
      
            <div className='flex justify-center space-x-6 bg-rose-700 p-2 text-white'>
                {/*Logo image with a link that leads to the homepage */}            
                <a href='https://www.montecasino.co.za/' className='w-30'><img src={logo} /></a>              
                {/*Each navlink leads to a different page */}
                <a href='https://www.montecasino.co.za/gaming/' className='font-bold'>GAMING</a>
                <a href='https://www.tsogosun.com/rewards/' target='_blank' className='font-bold'>REWARDS</a>
                <a href='https://www.montecasino.co.za/entertainment/' className='font-bold'>ENTERTAINMENT</a>
                <a href='https://www.montecasino.co.za/dining/' className='font-bold'>DINING</a>
                <a href='https://www.montecasino.co.za/offers/' className='font-bold'>OFFERS</a>
                <a href='https://www.montecasino.co.za/hotels/' className='font-bold'>HOTELS</a>
                <a href='https://www.montecasino.co.za/more-at-montecasino/' className='font-bold'>MORE</a>
            </div>
                   
           
      
               
    );
    
}