import React from 'react'
import { IoRemoveOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { HiOutlineLocationMarker } from "react-icons/hi";

const Footer1 = () => {
    
  return (
    <div className='z-0'>
       <div className="flex justify-center items-center sticky bottom-0 flex-col bg-slate-100">
        <h1 className="text-4xl font-bold pt-8 ">Get in Touch</h1>
        <p className="text-xl pt-1 pl-[68px] md:pl-1">
        Know how we can help transform learning in your Success.
        </p>
        <IoRemoveOutline size={70} />
        <div className='flex flex-col md:flex-row justify-center gap-2 m-5'>
          <div className=' h-full w-full md:h-2/6 md:w-2/6 md:m-3 m-5 '>
            <h1 className='text-3xl font-extrabold p-3 pl-4 md:pl-1'>Learn<b className='text-orange-600 '>O</b>sphere.in</h1>
            <p className='text-lg text-slate-700 p-2 font-semibold text-balance'>revolutionizes the way students access education by bringing qualified educators directly to their homes with just one click</p>
          </div>
          <div className='flex flex-col md:flex-row gap-20 md:gap-36 items-center'>
            <div className='flex flex-col justify-center items-center gap-4'><IoCall size={50} /><h1 className='text-2xl font-bold underline '> +91&nbsp;&nbsp;7221041071</h1></div>
            <div className='flex flex-col justify-center items-center gap-4 m-4' ><HiOutlineLocationMarker size={50}/><h1 className='text-2xl font-bold '>
              Office address:
            </h1>
            <p className='text-lg text-balance pl-14 md:pl-1'>22, Ajay Marg, Sector 10, Sector 6, </p>
            <p className='text-lg text-balance pl-14 md:pl-1 '>Pratap Nagar, Jaipur, Rajasthan 302033</p>

            </div>
            
          </div>
          
        </div>
       
      </div>
     
    </div>
  )
}

export default Footer1
