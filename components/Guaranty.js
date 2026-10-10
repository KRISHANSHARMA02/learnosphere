"use client"
import React from 'react'
import Image from 'next/image'
import money from '@/public/money.png'

const Guaranty = () => {
  return (
    
    <div className='flex justify-center md:shadow-lg bg-[#fff] px-5 md:m-10 lg:m-16 rounded-xl'>
        <div className='flex  flex-col md:flex-row justify-center items-center w-full md:w-9/12'>
        <div className='flex flex-col gap-2 p-4'> 
            <h2 className='text-xl md:text-4xl font-Poppins font-extrabold w-max'>Money-back guaranteed</h2> 
            <p className='text-sm md:text-lg text-gray-700 font-semibold font-Poppins text-balance'>Our money-back guarantee eliminates any risk of starting with Learnosphere. If you are not satisfied after the first tutorial, we will provide you with a full refund.</p>

        </div>
        <div className='rounded-xl m-5'>
            <Image src={money} alt='money' className='rounded-xl h-auto w-auto'/>


        </div>
        </div>
      
    </div>
  )
}

export default Guaranty
