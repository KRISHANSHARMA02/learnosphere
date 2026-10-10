"use client";
import React, { useState, useEffect } from "react";
import { FaClock, FaGraduationCap } from "react-icons/fa";
import Image from "next/image";
import axios from "axios";
import { SiStudyverse } from "react-icons/si";
import { TbUserQuestion } from "react-icons/tb";
import { RiParentFill } from "react-icons/ri";
import { MdLibraryBooks } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import School from "@/public/Classes Img.jpg";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/navigation";

// 🚀 NEW: Status Helper Function for Dynamic Colors
const getStatusStyles = (status) => {
  if (!status) return "bg-gray-50 text-gray-500 border-gray-200";
  
  switch (status.toUpperCase()) {
    case "PENDING":
      return "bg-yellow-50 text-yellow-600 border-yellow-200";
    case "CONFIRMED":
      return "bg-orange-50 text-orange-600 border-orange-200";
    case "COMPLETED":
      return "bg-emerald-50 text-emerald-600 border-emerald-200";
    case "REJECTED":
    case "CANCELLED":
      return "bg-red-50 text-red-600 border-red-200";
    default:
      return "bg-gray-50 text-gray-500 border-gray-200";
  }
};

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());
  const { data: session, status: sessionStatus } = useSession();
  const [visibleCount, setVisibleCount] = useState(5);
  const router = useRouter();

  // --- Fetch API Data ---
  useEffect(() => {
    const fetchClasses = async () => {
      if (sessionStatus !== "authenticated" || !session?.user?.email) return;

      try {
        // 1. Fetch the Student ID first
        const userRes = await fetch("/api/getUser", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: session.user.email, gmail: session.user.email })
        });
        
        const userData = await userRes.json();
        const fetchedStudentId = userData?.user?.registrationNumber;

        // Stop if we don't have the student ID yet
        if (!fetchedStudentId) {
          console.log("Waiting for Student ID...");
          return;
        }

        const response = await axios.get("https://mobileapp.backend.learnosphere.in/api/session/v1/get_bookings_students", {
          params: { 
            student_id: fetchedStudentId 
          }
        });
   
        if (response.data && response.data.success && response.data.data) {
           setClasses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    
    fetchClasses();
    
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [session, sessionStatus]);

  const handleCardClick = (sessionId) => {
    if(sessionId) {
      router.push(`/Userdashboard/classess/${sessionId}`);
    }
  };

  return (
    <>
      <div className="min-h-screen p-6 bg-slate-50">
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between w-full mb-8 gap-4 px-2 lg:px-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Your Classes Schedule
            </h1>
            <p className="text-sm text-gray-500 mt-1 font-medium">
              View and manage your daily learning sessions
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white border border-orange-200 shadow-sm px-6 py-3 rounded-full w-fit">
            <FaClock className="text-orange-500 text-lg animate-pulse" />
            <span className="text-gray-800 font-bold text-sm md:text-base">
              {dateTime.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 lg:p-10 mt-6 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="w-full lg:w-2/3">
            <span className="text-orange-500 font-bold tracking-wider text-xs md:text-sm uppercase mb-2 block">
              Latest Updates
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-3">
              What's New in Learnosphere
            </h2>
            <p className="text-gray-500 text-sm md:text-base mb-8 max-w-2xl leading-relaxed">
              New teaching methods, updated educational resources, and recent topics introduced in coursework to accelerate your mastery.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><FaGraduationCap size={18} /></div>
                <span className="font-semibold text-gray-700 text-sm">Tuition classes with expert teachers</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><RiParentFill size={18} /></div>
                <span className="font-semibold text-gray-700 text-sm">All-Round Learning Approach</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><SiStudyverse size={18} /></div>
                <span className="font-semibold text-gray-700 text-sm">Expert teachers explain concepts</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><MdLibraryBooks size={18} /></div>
                <span className="font-semibold text-gray-700 text-sm">Well-Designed Classes for Mastery</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><TbUserQuestion size={18} /></div>
                <span className="font-semibold text-gray-700 text-sm">Teachers solve your doubts instantly</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500"><PiStudentBold size={18} /></div>
                <span className="font-semibold text-gray-700 text-sm">Supplementary Classes for gaps</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-end mt-6 lg:mt-0">
            <Image src={School} alt="Classes Image" className="w-64 md:w-72 lg:w-80 object-contain drop-shadow-md" />
          </div>
        </div>

        {/* Dynamic Session Cards Section */}
        <div className="mt-12">
          {classes.length === 0 ? (
            <div className="text-center mt-6 text-gray-700 font-semibold text-lg bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <p>No classes found. You haven't booked any sessions yet!</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-Poppins">
                {classes.slice(0, visibleCount).map((session, index) => {
                  
                  // Calculate Progress Safely
                  const total = session.totalSessions || 1;
                  const completed = session.completedSessions || 0;
                  const progressPercent = Math.round((completed / total) * 100);
                  const displayStatus = session.status ? session.status.toUpperCase() : "ACTIVE";

                  return (
                    <div
                      key={session.bookingId || session._id || index}
                      onClick={() => handleCardClick(session.bookingId || session._id)}
                      className="border border-orange-200 rounded-3xl p-5 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{session.packageName || "Session"}</h3>
                          {/* 🚀 CHANGED: Applied the helper function here */}
                          <span className={`inline-block mt-2 px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full border ${getStatusStyles(displayStatus)}`}>
                            {displayStatus}
                          </span>
                        </div>
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `conic-gradient(#f97316 ${progressPercent}%, #fff7ed ${progressPercent}%)` }}
                        >
                          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-inner">
                            <span className="text-sm font-bold text-gray-800">{progressPercent}%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-6 pt-4 border-t border-gray-50">
                        <div className="flex flex-col items-center">
                          <MdLibraryBooks className="text-gray-400 mb-1 text-2xl" />
                          <span className="font-bold text-gray-900">{completed}/{total}</span>
                          <span className="text-xs text-gray-400">Sessions</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-gray-400 mb-1 text-2xl font-serif">{session.currencySymbol || "₹"}</span>
                          <span className="font-bold text-gray-900">{session.currencySymbol || "₹"}{session.amount || 0}</span>
                          <span className="text-xs text-gray-400">Total Paid</span>
                        </div>
                        <div className="flex flex-col items-center">
                          <FaGraduationCap className="text-gray-400 mb-1 text-2xl" />
                          <span className="font-bold text-gray-900 capitalize">{session.subject || "General"}</span>
                          <span className="text-xs text-gray-400">Subject</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Load More Button */}
              {classes.length > visibleCount && (
                <div className="flex justify-center mt-8 mb-4">
                  <button
                    onClick={() => setVisibleCount(classes.length)}
                    className="px-8 py-2 bg-white border border-orange-500 text-orange-500 font-semibold rounded-full hover:bg-orange-50 transition-colors shadow-sm"
                  >
                    View All Classes
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Classes;