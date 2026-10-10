import React from 'react'
import { IoRemoveOutline } from 'react-icons/io5';
import Image from 'next/image';

import easy from '@/public/easy.svg';
import simple from '@/public/simple.svg';
import flex from '@/public/flex.svg';
import friendly from '@/public/friendly.svg';
import scale from '@/public/scale.svg';
import money from '@/public/money.svg';



const Benifits = () => {
const Benifits = [
     {
      id: 1,
      src: easy ,
      heading: "Easy to Use",
      alt: "Easy-to-use platform"
     },
     {
      id: 2,
      src: simple,
      heading: "Intuitive to Operate",
      alt: "Simple and intuitive interface"
     },
     {
      id: 3,
      src: flex,
      heading: "Flexible to Administer",
      alt: "Flexible admin tools"
     },
     {
      id: 4,
      src: friendly,
      heading: "Friendly to Manage",
      alt: "User-friendly management system"
     },
     {
      id: 5,
      src: scale,
      heading: "Powerful to Scale",
      alt: "Scalable platform for growth"
     },
     {
      id: 6,
      src: money,
      heading: "Affordable to Own",
      alt: "Affordable pricing for users"
     },



]

  return (


    <div className='bg-[#fff]  md:m-7'>

  


        <div className="flex justify-center p-5 sm:p-0 md:p-0 items-center flex-col ">
        <h2 className="text-xl sm:text-[1.5em] md:text-3xl font-Poppins font-bold pt-8">BENEFITS AT A GLANCE</h2>
        <p className="text-lg text-center md:text-xl font-Poppins pt-1">
        All that Learn<b className='text-orange-600 font-Poppins'>O</b>sphere.in can help you with.
        </p>
        <IoRemoveOutline size={70} />
      </div>
      <div className='grid gap-13 grid-cols-2 w-full grid-rows-3 sm:grid-cols-3 sm:grid-rows-2'>
        {Benifits.map(({id,src,heading,alt}) => (
        <div key={id} className='m-5 md:m-10 flex flex-col bg-white rounded-xl justify-center shadow-md items-center'>
          <Image src={src || '/PlaceholderImage.png'} alt={alt} className="items-center p1r1 md:pl-0" priority/>
          <h2 className='text-[11px] pl-1 text-center md:pl-0 md:text-lg font-semibold font-Poppins py-3'>{heading}</h2>
        </div>
        ))}
      </div>
      
    </div>
  )
}

export default Benifits
