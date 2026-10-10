"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/src/context/userContext";
import Image from "next/image";

import {
  FaChevronRight,
  FaChevronDown,
  FaPlayCircle,
  FaFilePdf,
  FaLock,
  FaCalendarAlt,
  FaUsers,
  FaHome,
  FaCheckCircle,
  FaQuestionCircle,
} from "react-icons/fa";
// import { encryptData } from "@/src/utils/crypto";

// ==========================================
// 2. SUB-COMPONENT: FAQ ACCORDION
// ==========================================

const FAQSection = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-10 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2 mb-6">
        <FaQuestionCircle className="text-orange-600 text-xl" />
        <h3 className="text-xl font-bold text-slate-900">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={faq._id || index}
            className={`border border-slate-200 rounded-xl bg-white transition-all duration-300 ${
              openIndex === index
                ? "shadow-md border-orange-200 ring-1 ring-orange-100"
                : "hover:border-orange-200"
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-start p-5 text-left"
            >
              <span
                className={`font-semibold text-sm md:text-base pr-4 ${
                  openIndex === index ? "text-orange-700" : "text-slate-800"
                }`}
              >
                {faq.question}
              </span>
              <FaChevronDown
                className={`text-slate-400 mt-1 transition-transform duration-300 flex-shrink-0 ${
                  openIndex === index ? "rotate-180 text-orange-500" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-5 pb-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-transparent">
                <div className="w-full h-px bg-slate-50 mb-3"></div>
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function CourseDetails({ initialCourse, initialSubjects }) {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.registrationNumber;
  const [loading, setLoading] = useState(false);

  // Render-ready data
  const [course] = useState(initialCourse);
  const [subjects] = useState(initialSubjects);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!course) return <div className="p-10 text-center">Course not found</div>;

  return (
    <div className="flex flex-col w-full h-full bg-slate-50 font-sans text-slate-800 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex-shrink-0 z-20">
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-3">
          <button
            onClick={() => router.back()}
            className="hover:text-orange-600 flex items-center gap-1 transition-colors"
          >
            <FaHome /> Dashboard
          </button>
          <FaChevronRight size={10} />
          <span className="text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
            Course Details
          </span>
        </nav>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900 truncate max-w-lg">
            {course.title}
          </h1>
        </div>
      </header>

      {/* Scrollable Body */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-7xl mx-auto pb-10">
          {/* 1. Info Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row mb-8">
            <div className="md:w-1/3 h-52 md:h-auto bg-slate-200 relative">
              <Image
                src={course.thumbnail}
                alt="Course"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {!course.isPurchased && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <FaLock size={48} className="text-white/80" />
                </div>
              )}
            </div>
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
                <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                  <FaCalendarAlt /> {course.lastUpdated}
                </span>
                <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded">
                  <FaUsers /> {course.students} Enrolled
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 leading-tight">
                {course.title}
              </h2>
              <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                {course.description}
              </p>

              {course.isPurchased ? (
                <div className="bg-green-50 p-4 rounded-xl border border-green-100 flex items-center gap-2 text-green-700 font-bold text-sm w-fit">
                  <FaCheckCircle /> Purchased - Full Access Active
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold shadow-lg shadow-orange-600/20 transition-all">
                    Buy Now {course.currency}
                    {course.price}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 2. Subjects List (Clickable Cards) */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Course Curriculum & Syllabus
            </h3>
            {subjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    onClick={() =>
                      router.push(
                        `/Userdashboard/MyCourses/course/content?id=${
                          course.id
                        }&subject=${subject.title}&client=${
                          userId
                        }`
                      )
                    }
                    className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-orange-300 hover:-translate-y-1 cursor-pointer transition-all group flex justify-between items-center relative overflow-hidden"
                  >
                    {/* Hover Effect Background */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"></div>

                    <div className="relative z-10">
                      <h4 className="font-bold text-lg text-slate-800 group-hover:text-orange-700 transition-colors">
                        {subject.title}
                      </h4>
                      <div className="flex gap-4 mt-3 text-sm text-slate-500 font-medium">
                        <span className="flex items-center gap-1.5">
                          <FaPlayCircle className="text-orange-500" />{" "}
                          {subject.videoCount} Videos
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaFilePdf className="text-red-500" />{" "}
                          {subject.noteCount} Notes
                        </span>
                      </div>
                    </div>
                    <div className="relative z-10 w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm">
                      <FaChevronRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-white rounded-xl border border-dashed border-slate-300 text-slate-500">
                No subjects found for this course.
              </div>
            )}
          </div>

          {/* 3. FAQ Section */}
          <FAQSection faqs={course.faqs} />
        </div>
      </div>
    </div>
  );
}
