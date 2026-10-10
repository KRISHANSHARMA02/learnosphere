// "use client"
// import React from 'react'
// import { IoRemoveOutline } from 'react-icons/io5';
// import { IoCallOutline } from "react-icons/io5";
// import { IoIosSearch } from "react-icons/io";
// import { SlCalender } from "react-icons/sl";

// const Whyus = () => {
//   return (
//     <div className='bg-[#fff] m-5 md:m-4 mt-[5rem]'>
//       <div className='flex items-center flex-col justify-center '>
//         <h2 className='text-xl sm:text-[1.5em] md:text-3xl font-Poppins font-bold pt-5'>Learning has never been this easy!</h2>
//         <IoRemoveOutline size={70} />
//       </div>
//       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full'>
//         <div className='flex flex-col justify-start rounded-lg bg-gradient-to-l from-orange-50 to-white p-2 w-full 2xl:h-[32vh] 2xl:w-96 mb-10 shadow-lg'>
//           <IoCallOutline size={40} className='text-orange-500 ml-4 animate-bounce' />
//           <h3 className='text-sm md:text-xl font-Poppins text-left font-bold pt-4 px-3'>Find your perfect Educator match</h3>
//           <p className='text-base md:text-lg font-Poppins text-gray-700 text-left text-balance pt-3 px-3'>
//           Search the profile of educators in all subject areas. Everything you need to find a perfect teacher is at your fingertips – subjects, grades, prices, reviews, bios, and more. They’ve all been checked and verified for your peace of mind.
//           </p>
//         </div>
//         <div className='flex flex-col justify-start rounded-lg bg-gradient-to-l from-orange-50 p-2 to-white w-full  2xl:h-[32vh] 2xl:w-96   mb-10 shadow-lg'>
//           <IoIosSearch size={40} className='text-orange-500 ml-4 animate-bounce' />
//           <h3 className='text-sm md:text-xl font-Poppins text-left font-bold pt-2 px-3'>Meet your perfect educator</h3>
//           <p className='text-base md:text-lg font-Poppins text-gray-700 text-left text-balance pt-3 px-3'>
//             Shortlist your perfectly matched educators then connect directly via the Learnosphere app or website. Booking your tutorial is easy, convenient and secure. Connect in person from anywhere in your nearby area!
//           </p>
//         </div>
//         <div className='flex flex-col justify-start bg-gradient-to-l from-orange-50 p-2 to-white rounded-lg w-full  2xl:h-[32vh] 2xl:w-96 mb-10 shadow-lg'>
//           <SlCalender size={40} className='text-orange-500 ml-4 animate-bounce' />
//           <h3 className='text-sm md:text-xl font-Poppins text-left font-bold pt-2 px-3'>Know you’re safeguarded</h3>
//           <p className='text-base md:text-lg font-Poppins text-gray-700 text-left text-balance px-3 pt-3'>
//             Rest assured that you’re covered by the protections and safeguards of the Learnosphere platform. All tutorials are backed by our 100% money back satisfaction guarantee. You focus on finding your perfect educator, we’ll do the rest!
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Whyus

"use client";
import React from "react";
import { IoRemoveOutline, IoCallOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { SlCalender } from "react-icons/sl";

const Whyus = () => {
  return (
    <div className="bg-white px-4 sm:px-6 lg:px-12 xl:px-20 mt-20 mb-16">
      {/* Header */}
      <div className="flex flex-col items-center justify-center text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-Poppins font-bold pt-5">
          Learning has never been this easy!
        </h2>
        <IoRemoveOutline size={60} className="text-orange-500 mt-2" />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {/* Card 1 */}
        <div className="flex flex-col justify-start bg-gradient-to-l from-orange-50 to-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300">
          <IoCallOutline size={40} className="text-orange-500 mb-4 animate-bounce" />
          <h3 className="text-base sm:text-lg md:text-xl font-Poppins font-bold mb-2">
            Find your perfect Educator match
          </h3>
          <p className="text-sm sm:text-base text-gray-700 font-Poppins">
            Search profiles of educators across all subjects. Everything from grades, prices, reviews, and more—checked and verified for your peace of mind.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col justify-start bg-gradient-to-l from-orange-50 to-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300">
          <IoIosSearch size={40} className="text-orange-500 mb-4 animate-bounce" />
          <h3 className="text-base sm:text-lg md:text-xl font-Poppins font-bold mb-2">
            Meet your perfect educator
          </h3>
          <p className="text-sm sm:text-base text-gray-700 font-Poppins">
            Shortlist your perfect match, then connect via the Learnosphere app or site. Booking is simple, secure, and convenient—online or in person!
          </p>
        </div>

        {/* Card 3 */}
        <div className="flex flex-col justify-start bg-gradient-to-l from-orange-50 to-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all duration-300">
          <SlCalender size={40} className="text-orange-500 mb-4 animate-bounce" />
          <h3 className="text-base sm:text-lg md:text-xl font-Poppins font-bold mb-2">
            Know you’re safeguarded
          </h3>
          <p className="text-sm sm:text-base text-gray-700 font-Poppins">
            You're backed by Learnosphere’s 100% money-back guarantee and platform protections. We focus on your safety, so you can focus on learning!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Whyus;
