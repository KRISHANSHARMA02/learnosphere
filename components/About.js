import React from 'react'
import { IoRemoveOutline } from "react-icons/io5";

import Image from 'next/image';
import trophy from '@/public/trophy.svg';
import tech from '@/public/tech.svg';
import growth from '@/public/growth.svg';
import navigation from '@/public/navigation.svg';



const About = () => {
  return (
    <div name="about" className="p-12 bg-slate-100 w-full font-raleway">
      <div className='flex flex-col bg-transparent justify-center items-center '><p className='text-xl font-sans '>We understand the importance of personalized learning, and our platform is designed to facilitate one-on-one </p>
      <p className='text-xl font-sans'>interactions between students and teachers. Whether you're a student looking for extra help or a teacher seeking to share </p>
      <p></p>
      <p className='text-xl font-sans'>your expertise,  our platform offers the tools and support you need to succeed.</p>

      </div>
      <div className='flex justify-center items-center text-center flex-col py-7'><h1 className='text-[2rem]  md:text-5xl font-extrabold '>Learn<b className='text-orange-600 '>O</b>sphere.in</h1>
      
      <IoRemoveOutline size={70}/>
      
      </div>
      <div className='flex items-center bg-white border rounded-lg justify-center flex-col sm:flex-row md:flex-row gap-8'>
       
          <div className='flex justify-center items-center flex-col h-[300px] m-3 border-l border-r w-[350px]'>
            <Image src={trophy} height={80} width={80} alt='success' />
            <h1 className=' text-[1rem] md:text-2xl font-bold pt-3 text-orange-600'>Our Educational Excellence</h1>
            <p className=' font-semibold text-balance pl-16 md:pl-4'>Discover our commitment to top-notch educational solutions for learners and educators</p>
          </div>
          <div className='flex justify-center items-center flex-col h-[300px] m-3 border-l border-r w-[400px]'>
            <Image src={tech} height={80} width={80} alt='success' />
            <h1 className=' text-[1rem] md:text-2xl font-bold pt-2 text-orange-600'>Building Bridges in Education</h1>
            <p className=' font-semibold text-balance pl-20 md:pl-7'>Explore our platform that how we connect educators and learners</p>
          </div>
          <div className='flex justify-center items-center flex-col h-[300px] m-3 border-l border-r w-[300px]'>
            <Image src={growth} height={80} width={80} alt='success' />
            <h1 className=' text-[1rem] md:text-2xl font-bold pt-2 text-orange-600'>Innovating Education</h1>
            <p className=' font-semibold pl-16 md:pl-6 text-balance'> Explore our innovative strategies and technologies shaping the future of learning</p>
          </div>
          <div className='flex justify-center items-center flex-col h-[300px] m-3 mt-7 border-l border-r w-[300px]'>
            <Image src={navigation} height={80} width={80} alt='success' />
            <h1 className=' text-[1rem] md:text-2xl font-bold pt-2 pl-5 text-orange-600'>Navigating the Future of Learning</h1>
            <p className=' font-semibold pl-8 md:pl-6 text-balance'> Explore our innovative strategies and technologies shaping the future of learning</p>
          </div>
        </div>
        
  </div>
  
  )
}

export default About
