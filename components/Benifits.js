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
     },
     {
      id: 2,
      src: simple,
      heading: "Intuitive to Operate",
     },
     {
      id: 3,
      src: flex,
      heading: "Flexible to Administer",
     },
     {
      id: 4,
      src: friendly,
      heading: "Friendly to Manage",
     },
     {
      id: 5,
      src: scale,
      heading: "Powerful to Scale",
     },
     {
      id: 6,
      src: money,
      heading: "Affordable to Own",
     },



]

  return (

    <div className='bg-slate-100 md:m-7'>

  

        <div className="flex justify-center p-5 sm:p-0 md:p-0 items-center flex-col ">
        <h1 className="text-4xl font-bold pt-8 ">BENEFITS AT A GLANCE</h1>
        <p className="text-xl pt-1">
        All that Learn<b className='text-orange-600'>O</b>sphere.in can help you with.
        </p>
        <IoRemoveOutline size={70} />
      </div>
      <div className='grid gap-13 grid-cols-2 grid-rows-3 sm:grid-cols-3 sm:grid-rows-2 '>
        {Benifits.map(({id,src,heading}) => (
        <div key={id} className='m-10 flex flex-col bg-white rounded-xl justify-center items-center'>
          <Image src={src} alt='one' />
          <h1 className='text-2xl font-bold py-3'>{heading}</h1>
        </div>
        ))}
      </div>
      
    </div>
  )
}

export default Benifits
