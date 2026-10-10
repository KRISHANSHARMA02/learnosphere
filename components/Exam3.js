import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SSC from '@/public/SSC.png';
import { FcManager } from "react-icons/fc";

const Exam3 = () => {
  return (
    <div className="m-3 flex bg-white items-center lg:m-4">
      <div className="bg-slate-50 w-full h-auto lg:h-[24rem] relative flex flex-col md:flex-row items-center border-2 rounded-xl gap-10 md:gap-0 shadow-lg my-5 m-5 md:m-10 lg:m-0">
        <div className="bg-slate-900 rounded-br-xl rounded-bl-xl absolute top-0 left-auto md:left-[41%] ">
          <h2 className="text-white text-lg font-Poppins font-bold px-8 py-2">
            Govt Job Exams
          </h2>
        </div>
        <div className="flex flex-col md:flex-col lg:flex-row w-full lg:w-[50%] mt-10 items-center pl-0 lg:pl-2 gap-4">
          <div className="w-[125px] md:w-2/5">
            <Image
              src={SSC || '/PlaceholderImage.png'}
             
              alt="SSC exam coaching online"
              width={500}
              height={500}
              className="mx-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col justify-center items-center md:items-start p-3 w-full">
            <h2 className="text-xl md:text-2xl font-bold font-poppins">
              Learn<b className="text-orange-600">O</b>sphere.in
            </h2>
            <p className="text-base md:text-lg font-semibold font-Poppins text-balance text-slate-700 p-2 text-center md:text-left">
              You can select and book your personal educator for SSC, RRB, Banking, and other Govt Job Exams
            </p>
            <Link
              href="/government-exams"
              className="bg-orange-600 text-white py-2 px-3 md:px-4 font-Poppins font-bold hover:bg-orange-500 rounded-md w-full md:w-auto text-center md:text-left"
            >
              Explore More Exams
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-col lg:flex-row w-full lg:w-[50%] mt-10 items-center pl-0 lg:pl-2 gap-4">
          <div className="w-[100px] t-auto md:w-2/5 flex justify-center items-center">
          <FcManager  size={170} />
          </div>
          <div className="flex flex-col justify-center items-center md:items-start p-3 w-full">
            <h2 className="text-xl md:text-2xl font-bold font-poppins">
              Learn<b className="text-orange-600">O</b>sphere.in
            </h2>
            <p className="text-base md:text-lg font-semibold text-balance font-Poppins text-slate-700 p-2 text-center md:text-left">
               Book your personal educator to succeed in your dream IAS and other UPSC exams
            </p>
            <Link
              href="/government-exams/upsc/study-notes"
              className="bg-orange-600 text-white py-2 px-3 md:px-4 font-Poppins font-bold hover:bg-orange-500 rounded-md w-full md:w-auto text-center md:text-left"
            >
              Explore UPSC
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam3;
