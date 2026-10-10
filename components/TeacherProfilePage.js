"use client";

import React from "react";
import Link from "next/link"; // 🚀 Added Link import

import {
  MapPin,
  ShieldCheck,
  Star,
  Users,
  Globe,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import VerifiedBadge from "./VerifiedBadge";
import { useSession } from "next-auth/react";

export default function TeacherProfilePage({ teacher, similarTeachers = [], subject = "" }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const similarTeachersRef = React.useRef(null);
  const visibleTeachers = similarTeachers.slice(currentSlide, currentSlide + 4);
  
  const router = useRouter();
  // 🚀 Initialize hooks for dynamic URLs
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const { data: session, status } = useSession(); 

  const nextSlide = () => {
    if (!similarTeachers.length) return;
    setCurrentSlide((prev) => (prev + 1) % similarTeachers.length);
  };

  const handleContact = () => {
    const teachersPath = "/Userdashboard/Availableteacher";
    const currentPath = window.location.href;

    if (session) {
      const teacherData = JSON.stringify(teacher);
      const subjectToPass = subject || teacher.subjects?.[0] || "tuition";
      router.push(`${teachersPath}?data=${encodeURIComponent(teacherData)}&subject=${encodeURIComponent(subjectToPass)}`);
    } else {
      router.push(`/Student?callbackUrl=${encodeURIComponent(currentPath)}`);
    }
  };

  const prevSlide = () => {
    if (!similarTeachers.length) return;
    setCurrentSlide(
      (prev) => (prev - 1 + similarTeachers.length) % similarTeachers.length,
    );
  };

  const displayExperience =
    teacher.experience && teacher.experience !== "N/A"
      ? teacher.experience
      : "0";
  const displayResponseTime = teacher.responseTime || "2hr";
  const displayStudents = teacher.studentsCount || "0";

  return (
    <div className="bg-white min-h-screen font-sans text-black">
      <div className="mt-28 max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-12">
          {/* Tags & Bio */}
          {teacher.bio && (
            <section>
              <div className="flex gap-2 mb-4">
                {["Expert", "Verified", "Top Rated"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase font-bold text-orange-400 bg-orange-50 px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-extrabold leading-tight mb-6">
                {teacher.bio.split("\n")[0]}
              </h1>
              <div className="flex items-center gap-4 mb-8">
                {(teacher.city || teacher.state) && (
                  <div className="flex items-center gap-1 text-orange-400  bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                    <MapPin size={14} /> {teacher.city}, {teacher.state}
                  </div>
                )}
                {teacher.language && (
                  <div className=" text-orange-400 flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                    <Globe size={14} /> {teacher.language}
                  </div>
                )}
              </div>
              {/* --- START: STATIC POSITION BANNER (ALWAYS VISIBLE) --- */}
              {teacher.position && (
                <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-6 flex gap-4 items-start shadow-sm">
                  <div className="bg-orange-100 p-3 rounded-full shrink-0">
                    <Sparkles className="w-6 h-6 text-orange-400 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-400 text-lg mb-2">
                      {teacher.position}
                    </h3>
                    <p className="text-orange-400 text-sm leading-relaxed mb-3">
                      One of our best tutors. Quality profile, experience in
                      their field, verified qualifications and a great response
                      time.
                    </p>
                    <p className="text-xs font-bold text-orange-400 tracking-wide">
                      {teacher.name} will be happy to arrange your first{" "}
                      {teacher.subjects?.[0]
                        ? `${teacher.subjects[0]} class`
                        : "class"}
                      .
                    </p>
                  </div>
                </div>
              )}
              {/* --- END: STATIC POSITION BANNER --- */}
            </section>
          )}

          {/* Full Bio */}
          {teacher.bio && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold border-b-2 border-orange-400 inline-block pb-1">
                About {teacher.name}
              </h2>
              <p className="text-gray-900 leading-relaxed">{teacher.bio}</p>
            </section>
          )}

          {/* Education */}
          {teacher.education?.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold border-b-2 border-orange-400 inline-block pb-1">
                Education
              </h2>
              <ul className="list-disc pl-6">
                {teacher.education.map((edu, idx) => (
                  <li key={idx} className="text-gray-900">
                    {edu.degreeType} in {edu.degree} from {edu.university} (
                    {edu.startYear} - {edu.endYear})
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Rates (Left Column) */}
          {teacher.baseRate && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold">Rates</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-orange-50 border border-orange-100 rounded-2xl shadow-sm">
                <div>
                  <p className="text-[10px] text-orange-400 font-bold uppercase mb-1">
                    Base Rate
                  </p>
                  <p className="font-bold text-black">
                    {teacher.currency?.symbol || ""}
                    {teacher.baseRate}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-orange-400 font-bold uppercase mb-1">
                    Experience
                  </p>
                  <p className="font-bold text-black">{displayExperience}</p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: PROFILE CARD */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-28 bg-white rounded-[40px] shadow-2xl border border-gray-100 p-8 text-center space-y-6">
            {/* --- START: PROFILE IMAGE WITH ICON-ONLY HOVER --- */}
            {teacher.profileImage && (
              <div className="relative inline-block">
                {/* 1. Main Profile Image */}
                <img
                  src={teacher.profileImage || "DefaultAvtar.jpg"}
                  className="w-40 h-40 rounded-[40px] object-cover mx-auto shadow-md"
                  alt={teacher.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/DefaultAvtar.jpg";
                  }}
                />

                {/* 2. The Sparkle Icon (The Trigger) */}

                <div className="peer hidden lg:block absolute -bottom-2 -right-2 bg-orange-500 text-white p-2 rounded-full border-4 border-white z-20 cursor-pointer transition-transform hover:scale-110">
                  <Sparkles
                    size={24}
                    className="text-yellow-400 fill-current"
                  />
                </div>

                {/* 3. The Hover Tooltip (The Target) */}
                <div className="absolute top-full right-0 mt-4 w-72 p-5 bg-orange-500 text-white text-left text-sm rounded-2xl shadow-2xl opacity-0 translate-y-4 invisible peer-hover:opacity-100 peer-hover:translate-y-0 peer-hover:visible transition-all duration-300 z-50 pointer-events-none">
                  {/* Arrow pointing UP to the icon */}

                  <div className="absolute -top-2 right-6 w-4 h-4 bg-orange-500 rotate-45"></div>

                  {/* Tooltip Content */}
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-bold text-yellow-400 uppercase tracking-wider text-xs">
                      {teacher.position || "Verified"} Teacher
                    </span>
                  </div>

                  <p className="leading-relaxed opacity-95 mb-3 text-xs">
                    One of our best teachers. Quality profile, experience in
                    their field, verified qualifications and a great response
                    time.
                  </p>

                  <div className="pt-3 border-t border-orange-500 font-semibold text-xs text-indigo-100">
                    {teacher.name} will be happy to arrange your first{" "}
                    {subject
                      ? `${subject} class`
                      : teacher.subjects?.[0]
                        ? `${teacher.subjects[0]} class`
                        : "class"}
                    .
                  </div>
                </div>
              </div>
            )}
            {/* --- END: PROFILE IMAGE WITH ICON-ONLY HOVER --- */}

            {teacher.name && (
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-black capitalize leading-none">
                  {teacher.name}
                </h2>
                <VerifiedBadge isApproved={teacher.isApproved} />
              </div>
            )}

            <div className="grid grid-cols-3 border-y border-gray-100 py-4 text-[15px] font-bold text-gray-400 lowercase">
              {teacher.baseRate && (
                <div className="border-r">
                  <p>Rate/hr</p>
                  <p className="text-gray-900 text-xs">
                    {teacher.currency?.symbol || ""}
                    {teacher.baseRate}
                  </p>
                </div>
              )}
              <div className="border-r">
                <p>Response</p>
                <p className="text-gray-900 text-xs">{displayResponseTime}</p>
              </div>
              <div>
                <p>Students</p>
                <p className="text-gray-900 text-xs">{displayStudents}</p>
              </div>
            </div>

            <button
              onClick={handleContact}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-3xl font-black text-lg shadow-lg flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle size={20} /> Contact
            </button>
          </div>
        </div>
      </div>

      {/* SIMILAR TEACHERS */}
      <section ref={similarTeachersRef} className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-black">
              Similar teachers {teacher.city ? `in ${teacher.city}` : ""}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {currentSlide + 1}/{similarTeachers.length}
              </span>
              <button
                onClick={prevSlide}
                className="p-2 rounded-full hover:bg-white"
              >
                <ChevronLeft size={20} className="text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full hover:bg-white"
              >
                <ChevronRight size={20} className="text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleTeachers.map((t) => {
              // Safely get image URL with fallback to default avatar
              const getImageSrc = (imageUrl) => {
                if (!imageUrl || imageUrl.trim() === "") {
                  return "/DefaultAvtar.jpg";
                }
                return imageUrl;
              };

              // 🚀 DYNAMIC URL LOGIC 
              const targetId = t.id || t.tutorId || t.registrationNumber;
              const pathSegments = pathname.split('/');
              pathSegments.pop(); // Remove current teacher ID
              pathSegments.push(targetId); // Add clicked teacher ID
              const newPath = pathSegments.join('/');
              
              const currentQuery = searchParams.toString();
              const finalUrl = currentQuery ? `${newPath}?${currentQuery}` : newPath;

              return (
                // 🚀 USING Link COMPONENT INSTEAD OF div
                <Link
                  key={t.id || Math.random()}
                  href={finalUrl}
                  className="bg-white rounded-3xl overflow-hidden border border-orange-100 shadow-sm hover:shadow-xl transition-all cursor-pointer block"
                >
                  <img
                    src={getImageSrc(t.image)}
                    alt={t.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/DefaultAvtar.jpg";
                    }}
                    className="w-full h-72 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <h3 className="font-bold capitalize truncate">
                        {t.name}
                      </h3>
                      {/* 🚀 BUG FIX: Swapped teacher.isApproved with t.isApproved */}
                      <VerifiedBadge isApproved={t.isApproved} />
                    </div>

                    <p className="text-xs text-gray-500">
                      {t.city} {t.language ? `• ${t.language}` : ""}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}