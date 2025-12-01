import react from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';


export default function Footer() {
    return(
        <div className='grid grid-cols-3 bg-black text-white py-20 px-15'>
            <div className='flex flex-col items-center justify-center text-center text-[16px]'>
                <p>Montecasino Boulevard,</p>
                <p>Fourways, 2055, South Africa</p>
                <a>+27 11 510 7000</a>
                <p>Private Bag X118, Bryanston, 2021</p>         
            </div>

            {/*Links to know more info */}
            <div className='flex flex-col items-center justify-center text-center'> 
                <a href='https://www.tsogosun.com/about-us/' target='_blank' className='cursor-pointer'>About Tsogo Sun</a>
                <a href='https://www.tsogosun.com/investors/' target='_blank' className='cursor-pointer'>Investors</a>
                <a href='https://www.tsogosun.com/media/' target='_blank' className='cursor-pointer'>Media</a>
                <a href='https://www.tsogosun.com/careers/' target='_blank' className='cursor-pointer'>Careers</a>
            </div>

            <div className='flex flex-col items-center justify-center text-center'>
                <a href='https://www.tsogosun.com/security/' target='_blank'>Security</a>
                <a href='https://www.tsogosun.com/paia/' target='_blank'>PAIA</a>
                <a href='https://www.tsogosun.com/disclaimer/' target='_blank'>Disclaimer</a>
                <a href='https://www.montecasino.co.za/contact-us/' target='_blank'>Contact Montecasino</a>
                <a href='https://rewardsdetails.tsogosun.com/' target='_blank'>Update Rewards Details</a>
            </div>
             <hr className='border-gray-300 w-auto' />
             
             <div>
                <a href='https://www.ngb.org.za/' target='_blank'>National Gambling Board</a>
             </div>
             <div>
                <a href='https://www.ggb.org.za/' target='_blank'>Gauteng Gambling Board</a>
             </div>
             <div>
                <a href='https://responsiblegambling.org.za/' target='_blank'>National Responsible Gambling Programme</a>
             </div>
             <hr className='border-gray-300 w-auto' />
             {/*Social Links */}
             <div className='flex flex-row items-center justify-center text-center gap-4'>
                <a href='https://www.facebook.com/montecasino/' target='blank' className='bg-white rounded p-2 text-black'><FacebookIcon/></a>
                <a href='https://x.com/montecasinoza' target='blank'></a>
                <a href='https://www.youtube.com/channel/UCQs-WnXvDZ0MlzeqAB0QaRA' target='blank'></a>
                <a href='https://www.instagram.com/montecasino_za/' target='blank'></a>
             </div>

             {/*Map */}
             <div className='flex flex-col items-center justify-center text-center'>
                <a href='https://www.montecasino.co.za/sitemap/' target='_blank'>Site Map</a>
             </div>
             {/*Policy */}
             <div className='flex flex-col items-center justify-center text-center'>
                <a href='https://www.tsogosun.com/privacy-policy/' target='_blank'>Privacy Policy</a>
             </div>

             {/*Ts and Cs */}
             <div className='flex flex-col items-center justify-center text-center'>
                <a href='https://www.tsogosun.com/general-terms-conditions/' target='_blank'>Terms & Conditions </a>
             </div>

             {/*Wifi Ts and Cs */}
             <div className='flex flex-col items-center justify-center text-center'>
                <a href='https://www.montecasino.co.za/wifi-terms-and-conditions/' target='_blank'>Wifi Terms and Conditions</a>
             </div>
        </div>
    );
}