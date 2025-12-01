import React from 'react';
import Topbar from './components/Topbar';
import Mainbar from './components/Mainbar';
import Hero from './components/Hero';
import billyg from './assets/billyg.jpeg';
import Info from './components/Info';
import Note from './components/Note';
import Rewards from './assets/Rewards.png';
import TsnCs from './components/TsnCs';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

function Home() {
  return (
    <>
      
        <Topbar/>
        <Mainbar/>
         <img src={billyg} className='w-full'/>
        <div className='mt-10'>
          <Hero/>
        </div>
       
       <div className='mt-10'>
          <Info/>
        </div>
        <Note/>
        <div className='flex justify-center p-10'>
          <img src={Rewards} className='w-auto h-80'/>
        </div>
        <TsnCs/>
        <Carousel/>
        <Footer/>
    </>
  )
}

export default Home
