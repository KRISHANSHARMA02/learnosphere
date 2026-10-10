import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import defence from '@/public/defence.svg';
import Sainik from '@/public/Sainik.svg';

const Exam4 = () => {
  return (
    <div className="m-3 flex items-center bg-white lg:m-4">
      <div className="bg-slate-50 w-full h-auto lg:h-[24rem] relative flex flex-col md:flex-row items-center border-2 rounded-xl gap-10 md:gap-0 shadow-lg my-5 mx-5 md:mx-10 lg:mx-0">
        <div className="bg-slate-900 rounded-br-xl rounded-bl-xl absolute top-0 left-auto md:left-[41%]">
          <h2 className="text-white text-lg font-Poppins font-bold px-8 py-2">
            Defence Exams
          </h2>
        </div>
        <div className="flex flex-col md:flex-col lg:flex-row w-full lg:w-[50%] mt-10 items-center pl-0 lg:pl-2 gap-4">
          <div className="w-[60%] md:w-[40%]">
            <Image
              src={defence || '/PlaceholderImage.png'}
             
              alt="Defence Exams"
              width={200}
              height={200}
              className="mx-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col justify-center  items-center md:items-start p-3 w-full">
            <h2 className="text-xl md:text-2xl font-bold font-poppins">
              Learn<b className="text-orange-600">O</b>sphere.in
            </h2>
            <p className="text-base md:text-lg font-semibold font-Poppins text-balance text-slate-700 p-2 text-center md:text-left">
              Book your personal educator for NDA, CDS, and other Defence Exams.
            </p>
            <Link
              href="/government-exams/upsc"
              className="bg-orange-600 text-white py-2 px-3 md:px-4 font-Poppins font-bold hover:bg-orange-500 rounded-md w-full md:w-auto text-center md:text-left"
            >
              Explore More Exams
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-col lg:flex-row w-full lg:w-[50%] mt-10 items-center pl-0 lg:pl-2 gap-4">
          <div className="w-[60%] md:w-[40%]">
            <Image
              src={Sainik || '/PlaceholderImage.png'}
          
              alt="Sainik school Exams"
              width={200}
              height={200}
              className="mx-auto pl-5 object-contain"
              priority
            />
          </div>
          <div className="flex flex-col justify-center items-center md:items-start p-3 w-full">
            <h2 className="text-xl md:text-2xl font-bold font-poppins">
              Learn<b className="text-orange-600">O</b>sphere.in
            </h2>
            <p className="text-base md:text-lg font-semibold font-Poppins text-balance text-slate-700 p-2 text-center md:text-left">
              Book your personal educator for Sainik School Entrance Exams.
            </p>
            <Link
              href="/pages/sainik"
              className="bg-orange-600 text-white py-2 px-3 md:px-4 font-Poppins font-bold hover:bg-orange-500 rounded-md w-full md:w-auto text-center md:text-left"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam4;
