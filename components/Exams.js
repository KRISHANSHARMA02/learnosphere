import React from 'react'
import { IoRemoveOutline } from 'react-icons/io5';
import Image from 'next/image';
import upsc from '@/public/upsc.svg';
import IIT from '@/public/IIT.svg';
import NEET from '@/public/Neet.svg';
import Bank from '@/public/Bank.svg';
import SSC from '@/public/ssc.svg';
import CA   from '@/public/CA.svg';
import cat from '@/public/cat.svg';
import class12 from '@/public/class12.svg';
import class10 from '@/public/class10.svg';
import class9 from '@/public/class9.svg';


const Exams = () => {
    const Exams = [
    {
      id: 1,
      src: class10,
      heading: "CBSE Class 10",
    },
    {
      id: 2,
      src: class12,
      heading: "CBSE Class 12",
    },
    {
      id: 3,
      src: class9,
      heading: "All classes from 1st to 9th",
    },
    {
      id: 4,
      src: Bank,
      heading: "BANK Exams",
    },
    {
      id: 5,
      src: SSC,
      heading: "SSC and other state exams",
    },
    {
      id: 6,
      src: CA, 
      heading: "CA Intermediate ",
    },
    {
      id: 7,
      src: cat,
      heading: "CAT",
    },
    {
      id: 8,
      src: NEET,
      heading: "NEET-UG",
      
    },
    {
      id: 9,
      src: upsc,
      heading: "UPSC-CS ",
    },




    ]
  return (
    <div className='bg-white'>
        <div className="flex justify-center items-center flex-col">
        <h1 className="text-4xl font-bold pt-8 ">Achieve your Goals</h1>
        <p className="text-xl pt-1 pl-[23px] sm:pl-0 md:pl-0">
        So many preprations at Home in just one click
        </p>
        <IoRemoveOutline size={70} />
      </div>
       
        <div className='grid gap-13 grid-cols-2 grid-rows-4 sm:grid-cols-3 sm:grid-rows-2 md:grid-cols-3 md:grid-rows-2 bg-white '>
            {Exams.map(({id,src,heading}) => (
            <div key={id} className='flex justify-center items-center cursor-pointer border rounded-xl m-4 hover:bg-gray-100 flex-col '>
                <Image src={src} 
                alt='learn' 
                className='cursor-pointer'
                />
                <h1 className='text-xl font-bold p-3'>{heading}</h1>
             </div>
            ))}
        </div>
      
    </div>
  )
}

export default Exams
