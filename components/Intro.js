import React from 'react'
import Image from 'next/image';
import { LiaCheckDoubleSolid } from "react-icons/lia";
import Link from 'next/link';

const Intro = () => {
  return (
    <div  className='flex justify-center m-5 md:m-12 sm:m-10'>
        <div className='flex p-3 sm:p-5 gap-10 justify-center border flex-col sm:flex-row md:flex-row shadow-md rounded-xl w-4/5'>
        <div className='flex justify-center items-center border rounded-xl m-3 bg-slate-900 text-white'>
            <h1 className=' text-lg sm:text-3xl font-bold p-12  '>Learn<b className='text-orange-600'>O</b>sphere.in</h1>
        </div>
        <div>
            <div><h5 className='text-l font-semibold p-3 text-orange-500 '>INTRODUCING</h5></div>
            <h1 className='text-3xl font-bold p-2 '>Book teachers at home only in just one click </h1>
            <h3 className='text-3xl p-3 font-semibold text-gray-600'>Services available in jaipur, Jodhpur, Delhi and more cities!</h3>
            <div className=' '>
                <h4 className='p-2 flex gap-2'><LiaCheckDoubleSolid  size={30}/>Learn from top educators in your city</h4>
                <h4 className='p-2 flex gap-2'><LiaCheckDoubleSolid  size={30}/>Students can learn at home</h4>
                <h4 className='p-2 flex gap-2'><LiaCheckDoubleSolid size={30} />Bonus access on your appointment</h4>
            </div>
            <div className='my-3 ml-3  sm:ml-0'> <Link href="/Signin" className='p-3 bg-orange-400 hover:bg-orange-200 my-3 ml-3  sm:ml-0 cursor-pointer text-l font-bold border-none rounded-lg'>Book Your Class</Link></div>
           
        </div>
      </div>
    </div>
  )
}

export default Intro
