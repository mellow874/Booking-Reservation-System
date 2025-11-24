import React from 'react'

export default function Info() {
  return (
    <div className='flex flex-col items-center text-center'>
            <h1>Billy G Buffet</h1>
            <h1>Family Friendly</h1>
            <h1>Johannesburg Buffet</h1>
            <p>This upmarket, family buffet restaurant in Johannesburg offers an extensive selection of dishes. Enjoy a variety of starters, 
                main courses, and desserts. From succulent cuts of meat to a variety of casseroles, curries, and vegetarian offerings, pasta 
                dishes, salads, and tantalising desserts – there is something to suit every palate.
                </p>
                <h1>Buffet Prices:</h1>
                <p>Standard: R295 *Reward member discount applicable at all properties for Rewards members plus one guest</p>
                <ul>
                    <li><span>Children 0 – 1:</span>Free * One free child per one standard buffet adult.</li>
                    <li><span>Children 2-6:</span>R90 * Rewards member discount not applicable.</li>
                    <li><span>Children 7-12:</span>R175 * Rewards member discount not applicable.</li>
                    <li><span>Pensioners:</span>R200 * Rewards member discount not applicable.</li>
                </ul>
                <p>ID required.</p>
                <h1>Celebrating your birthday with us: R150</h1>
                <p>50% discount on Standard Buffet price applicable to Rewards members only and must be taken up on the day of their birthday.</p>
                <p>ID required.</p>
                <div>
                    <button>CORKAGE: R120</button>
                    <p>For the safety of all guests, alcohol is not permitted to be brought onto property unless prior arrangements have been made directly with the restaurant.</p>
                    <p>Please inform the restaurant upon booking your table or at least 12hrs prior to your arrival should you be bringing your own alcohol, in order for the security team to be notified timeously.</p>
                    <hr/>
                </div>
                <button>BOOK NOW</button>
                <a href='https://www.dineplan.com/restaurants/billy-g-at-montecasino'>Powered by Dineplan</a>
        </div>
  );
}

