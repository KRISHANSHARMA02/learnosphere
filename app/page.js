'use client'
import React from 'react';
// import Navbar from '@/components/Navbar';
import Home from '@/components/Home';
import About from '@/components/About';
import Sociallinks from '@/components/Sociallinks';
import Services from '@/components/Services';
import Benifits from '@/components/Benifits';
import Intro from '@/components/Intro';

import Exams from '@/components/Exams';
import Footer1 from '@/components/Footer1';
import Sociallinks2 from '@/components/Sociallinks2';
import Uparrow from '@/components/Uparrow';
// import Footer from '@/components/Footer';




const page = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Sociallinks />
      <Home />
      <About />
     <Intro />
      <Services />
      <Benifits />  
     <Exams />
     <Sociallinks2 />
     <Footer1 />  
     <Uparrow />
      {/* <Footer /> */}


      
      
      
    </div>
  )
}

export default page
