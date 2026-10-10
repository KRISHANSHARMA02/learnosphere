import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import JEE from '@/public/JEE.svg';
import NEET from '@/public/Neet.svg';

const Exam2 = () => {
  return (
    <div className="m-3 flex bg-white items-center lg:m-4">
      <div className="bg-slate-50 w-auto md:w-full h-auto lg:h-[24rem] relative flex flex-col md:flex-row items-center border-2 rounded-xl gap-10 md:gap-0 shadow-lg m-5 md:m-10 lg:m-0">
        <div className="bg-slate-900 rounded-br-xl rounded-bl-xl absolute top-0 left-auto md:left-[43%] ">
          <h2 className="text-white text-lg font-Poppins font-bold px-8 py-2">
            IIT-JEE/NEET
          </h2>
        </div>
        <div className="flex flex-col md:flex-col lg:flex-row w-full lg:w-[50%] mt-10 items-center pl-0 lg:pl-2 gap-4">
          <Image
            src={JEE || '/PlaceholderImage.png'}
            height={300}
            width={300}
            alt="IIT-JEE exam preparation platform"
            className="h-44 w-44 object-contain"
            priority
          />
          <div className="flex flex-col justify-center items-center md:items-start p-3 w-full md:w-[50%]">
            <h2 className="text-xl md:text-2xl font-bold font-poppins">
              Learn<b className="text-orange-600">O</b>sphere.in
            </h2>
            <p className="text-base md:text-lg font-Poppins font-semibold text-balance text-slate-700 p-2 text-center md:text-left">
              You can select and book your personal educator for JEE Exam
            </p>
            <Link
              href="/competitive-exams/iitjee/study-notes"
              className="bg-orange-600 text-white py-2 px-3 md:px-4 font-Poppins font-bold hover:bg-orange-500 rounded-md w-full md:w-auto text-center md:text-left"
            >
              Explore JEE
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-col lg:flex-row w-full lg:w-[50%] mt-10 items-center pl-0 lg:pl-2 gap-4">
          <Image
            src={NEET || '/PlaceholderImage.png'}
            height={300}
            width={300}
            alt="NEET exam preparation with verified tutors"
            priority
            className="h-44 w-44 object-contain"
          />
          <div className="flex flex-col justify-center items-center md:items-start p-3 w-full md:w-[50%]">
            <h2 className="text-xl md:text-2xl font-bold font-poppins">
              Learn<b className="text-orange-600">O</b>sphere.in
            </h2>
            <p className="text-base md:text-lg font-semibold font-Poppins text-balance text-slate-700 p-2 text-center md:text-left">
              You can select and book your personal educator for NEET Exam
            </p>
            <Link
              href="/competitive-exams/neet/study-notes"
              className="bg-orange-600 text-white py-2 px-3 md:px-4 font-Poppins font-bold hover:bg-orange-500 rounded-md w-full md:w-auto text-center md:text-left"
            >
              Explore NEET
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam2;
