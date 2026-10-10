"use client";
import React from "react";
import { trackEvent, EVENT_NAMES } from '../src/lib/eventTracker';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FcReading } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { IoRemoveOutline } from 'react-icons/io5';

const Buttoncard = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const handleBookEducator = (e) => {
    trackEvent(EVENT_NAMES.BOOK_EDUCATOR_CLICK, { source: 'buttoncard' });
    e.preventDefault();
    const token = typeof window !== 'undefined' ? (sessionStorage.getItem('token') || localStorage.getItem('token')) : null;
    if (status === "authenticated" || token) {
      router.push("/Userdashboard/Availableteacher/Teachers");
    } else {
      router.push("/Student");
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-3xl font-bold pt-8  font-Poppins ">Join Us As </h2>
       
        <IoRemoveOutline size={70} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:flex-row gap-8 md:gap-10 lg:gap-12">
        <button
          onClick={handleBookEducator}
          className="flex sm:flex-col md:flex-row items-center justify-center text-xl text-slate-900 sm:w-72 w-80 md:w-80 h-40 lg:w-96 md:h-40 font-bold bg-orange-200 shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl gap-5"
        >
          <FcReading size={80} className="bg-slate-800 mr-3 rounded-full" />
          Book Educator
        </button>
        <Link
          href="/jobs-for-home-tutors"
          onClick={() => trackEvent(EVENT_NAMES.BECOME_EDUCATOR_CLICKED, { source: 'buttoncard' })}
          className="flex sm:flex-col md:flex-row items-center justify-center text-xl   sm:w-72 w-80 h-40 md:w-80  lg:w-96 md:h-40 font-bold text-orange-600 bg-slate-200 shadow-lg rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-xl gap-5 "
        >
          <FcBusinessman size={80} className="bg-slate-800 mr-3 rounded-full" />
          Become Educator
        </Link>
      </div>
    </div>
  );
};

export default Buttoncard;
