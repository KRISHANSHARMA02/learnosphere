"use client";

import { useUser } from "@/src/context/userContext";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  FaCrown,
  FaRocket,
  FaBookOpen,
  FaStar,
  FaArrowRight,
  FaMobileAlt,
  FaGooglePlay,
  FaAppStore,
  FaCheckCircle,
  FaLayerGroup,
  FaPlayCircle,
  FaUserGraduate,
} from "react-icons/fa";
import StudentAppImg from "@/public/studentApp.png";
// import { encryptData } from "@/src/utils/crypto";

const HorizontalSlider = ({ children }) => (
  <div className="overflow-x-auto scrollbar-hide py-2">
    <div className="flex gap-5 w-max px-1">{children}</div>
  </div>
);

// ==========================================
// UI COMPONENTS
// ==========================================

const Loader = () => (
  <div className="h-96 flex flex-col justify-center items-center">
    <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-orange-600 mb-3"></div>
    <p className="text-slate-500 font-medium text-sm animate-pulse">
      Loading Courses...
    </p>
  </div>
);

// 1. Enrolled Card
const EnrolledCourseCard = ({ course, user }) => {
  const router = useRouter();

  const handleNavigate = (e) => {
    e.stopPropagation();

    const userId = user?.registrationNumber;
    if (!userId) {
      console.error("❌ User not loaded");
      return;
    }

    router.push(
      `/Userdashboard/MyCourses/course?id=${course.id}&token=${
        userId
      }`
    );
  };

  return (
    <div
      onClick={handleNavigate}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-orange-100/50 transition-all duration-300 group cursor-pointer flex flex-col h-full relative"
    >
      <div className="h-40 bg-slate-200 relative overflow-hidden w-full">
        {/* PREMIUM BADGE */}
        <div className="absolute top-2 right-2 z-20 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1 border border-white/20">
          <FaCrown className="text-yellow-100 mb-0.5" size={10} />
          <span className="tracking-wide">PREMIUM</span>
        </div>

        {/* SHINE ANIMATION */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10 ease-in-out pointer-events-none" />

        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-lg mb-3 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
            {course.title}
          </h3>

          <div className="flex justify-between items-center text-xs text-slate-500 mb-1.5">
            <span>Course Progress</span>
            <span className="font-bold text-orange-600">
              {course.progress}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(234,88,12,0.3)]"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={handleNavigate}
          className="w-full py-2.5 bg-orange-50 text-orange-700 font-bold text-sm rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-all flex items-center justify-center gap-2 mt-auto"
        >
          <FaPlayCircle /> Resume Learning
        </button>
      </div>
    </div>
  );
};

// 2. Recommended Card
const RecommendedCourseCard = ({ course, user }) => {
  const router = useRouter();

  const handleNavigate = () => {
    const tokenParam = user?.registrationNumber ? `&token=${user.registrationNumber}` : "";
    router.push(`/Userdashboard/MyCourses/course?id=${course.id}${tokenParam}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-full"
    >
      <div className="h-44 bg-slate-200 relative w-full">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <span className="absolute top-3 left-3 bg-white/90 text-slate-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm uppercase tracking-wide">
          {course.category}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold mb-2">
            <FaStar /> <span>{course.rating}</span>
            <span className="text-slate-400 font-normal ml-1">
              ({course.students} reviews)
            </span>
          </div>
          <h3 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 h-14 group-hover:text-orange-600 transition-colors leading-tight">
            {course.title}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <span className="text-xl font-bold text-slate-900">
            {course.currency}
            {course.price}
          </span>
          <button
            onClick={handleNavigate}
            className="px-4 py-2 bg-orange-600 text-white text-sm font-bold rounded-lg hover:bg-slate-900 transition-colors flex items-center gap-2 shadow-lg shadow-orange-200"
          >
            Enroll <FaArrowRight size={10} />
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. Premium App Card
const AppDownloadCard = () => (
  <div className="mt-12 w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl">
    {/* Glow Effects */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full blur-[80px] opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
    <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-500 rounded-full blur-[60px] opacity-10 -ml-10 -mb-10 pointer-events-none"></div>

    <div className="relative z-10 flex flex-col lg:flex-row items-center p-8 lg:p-12 gap-10">
      {/* Left Content */}
      <div className="flex-1 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-4">
          <FaMobileAlt /> Premium Feature
        </div>

        <h2 className="text-3xl font-bold mb-3 leading-tight">
          Unlock <span className="text-orange-400">Online Learning</span> with
          our App
        </h2>

        <p className="text-slate-400 mb-8 text-sm leading-relaxed max-w-lg mx-auto lg:mx-0">
          Get access to exclusive study materials, offline video downloads, and
          real-time practice tests. Scan QR or download below.
        </p>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          <a
            href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white text-slate-900 px-5 py-2.5 rounded-xl hover:bg-orange-50 transition-colors w-full sm:w-auto justify-center group"
          >
            <FaGooglePlay
              size={20}
              className="text-green-600 group-hover:scale-110 transition-transform"
            />
            <div className="text-left leading-tight">
              <div className="text-[9px] font-bold text-slate-500 uppercase">
                Get it on
              </div>
              <div className="text-xs font-bold">Google Play</div>
            </div>
          </a>

          <a
            href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 text-white px-5 py-2.5 rounded-xl hover:bg-white/20 transition-colors w-full sm:w-auto justify-center group"
          >
            <FaAppStore
              size={22}
              className="group-hover:scale-110 transition-transform"
            />
            <div className="text-left leading-tight">
              <div className="text-[9px] font-bold text-slate-300 uppercase">
                Download on
              </div>
              <div className="text-xs font-bold">App Store</div>
            </div>
          </a>
        </div>
      </div>

      {/* App Image Mockup */}
      <div className="hidden xl:flex shrink-0 justify-center">
        <Image
          src={StudentAppImg}
          alt="Learnosphere App Mockup"
          width={180}
          height={180}
          className="object-contain drop-shadow-2xl"
        />
      </div>

      {/* Right Feature List */}
      <div className="flex-1 w-full max-w-sm bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
        <h4 className="text-sm font-bold mb-4 flex items-center gap-2 text-white border-b border-white/10 pb-3">
          <FaLayerGroup className="text-orange-400" /> Why download?
        </h4>

        <ul className="space-y-3">
          {[
            "Download videos & notes for Offline Access",
            "Attempt Premium Quizzes with instant results",
            "Join the Student Community chat groups",
            "Daily Current Affairs & Flashcards",
          ].map((item, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-xs text-slate-300"
            >
              <FaCheckCircle className="text-green-400 mt-0.5 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

// ==========================================
// 4. MAIN PAGE CONTENT
// ==========================================

export default function EnrollmentCheckPage({ serverData }) {
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const [studentData, setStudentData] = useState(null);

  // ✅ When serverData becomes available, set loading false
  useEffect(() => {
    if (serverData) {
      setStudentData(serverData);
      setLoading(false);
    }
  }, [serverData]);

  if (loading) return <Loader />;

  if (!studentData)
    return (
      <div className="p-8 text-center text-slate-500">
        Loading your content...
      </div>
    );

  return (
    <div className="w-full h-full bg-slate-50 p-6 md:p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Welcome back, {user?.studentName || "Student"}!
          </h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2 text-sm">
            {studentData.hasEnrollment ? (
              <>
                <FaRocket className="text-orange-500" /> You have pending
                lessons to complete today.
              </>
            ) : (
              "Ready to start your learning journey? Explore our top courses."
            )}
          </p>
        </div>
      </div>

      {/* Main Content */}
      {studentData.hasEnrollment ? (
        // A: STUDENT HAS ENROLLMENTS
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FaBookOpen className="text-orange-600" /> Your Enrolled Courses
            </h2>
            <button className="text-sm font-semibold text-slate-500 hover:text-orange-600 transition-colors flex items-center gap-1">
              View All <FaArrowRight size={10} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studentData.myCourses.map((course) => (
              <EnrolledCourseCard key={course.id} course={course} user={user} />
            ))}
          </div>
        </section>
      ) : (
        <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FaStar className="text-orange-600" /> Recommended For Your Grade
            </h2>
          </div>

          {studentData.recommendedCourses.length > 0 ? (
            studentData.recommendedCourses.length > 3 ? (
              // ➤ Slider mode
              <HorizontalSlider>
                {studentData.recommendedCourses.map((course) => (
                  <div key={course.id} className="min-w-[280px] max-w-[280px]">
                    <RecommendedCourseCard course={course} user={user} />
                  </div>
                ))}
              </HorizontalSlider>
            ) : (
              // ➤ Normal grid mode
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {studentData.recommendedCourses.map((course) => (
                  <RecommendedCourseCard key={course.id} course={course} user={user} />
                ))}
              </div>
            )
          ) : (
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg mb-4">
              <div className="space-y-3 text-center md:text-left flex-1">
                <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Interactive Learning Modules
                </span>
                <h3 className="text-2xl font-bold text-white">Explore Full Courses on the Learnosphere App</h3>
                <p className="text-white/90 text-sm max-w-lg">
                  Full-syllabus animated courses, recorded chapter lectures, and live revision masterclasses for your grade are ready on the mobile app.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-gray-900 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-orange-50 transition-colors shadow"
                  >
                    Open in Mobile App
                  </a>
                </div>
              </div>
              <div className="w-36 md:w-44 shrink-0 flex justify-center">
                <Image
                  src={StudentAppImg}
                  alt="Courses App Preview"
                  width={160}
                  height={160}
                  className="object-contain drop-shadow-xl"
                />
              </div>
            </div>
          )}
        </section>
      )}

      {/* App Download Section */}
      <AppDownloadCard />
    </div>
  );
}
