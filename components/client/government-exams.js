"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then(mod => mod.Player), { ssr: false });
import {
  FaLaptopCode,
  FaRegNewspaper,
  FaClipboardCheck,
  FaListAlt,
  FaChevronRight,
  FaSearchLocation,
} from "react-icons/fa";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";

export default function GovernmentExamsMainPage() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // Quick Links (Same as Competitive Exams)
  const quickLinks = [
    {
      title: "Blog",
      subtitle: "Read Our Latest Blogs",
      icon: <FaRegNewspaper className="text-2xl text-orange-500" />,
      link: "/Blogs",
    },
    {
      title: "Home-tuition",
      subtitle: "explore home-tuition",
      icon: <FaSearchLocation className="text-2xl text-orange-500" />,
      link: "/home-tuition",
    },
    {
      title: "Online-Quiz",
      subtitle: "Explore Test Series",
      icon: <FaClipboardCheck className="text-2xl text-orange-500" />,
      link: "/Online-Quiz",
    },
    {
      title: "Syllabus",
      subtitle: "Find Exam Syllabus",
      icon: <FaListAlt className="text-2xl text-orange-500" />,
      link: "/CBSE_Syllabus",
    },
  ];

  // Dummy Data for Exams (Replace with API call later if needed)
  const displayExams = [
    {
      id: 1,
      title: "SSC Exams",
      slug: "ssc",
      description: "CGL, CHSL, MTS, GD Constable",
      badge: "Trending",
    },
    {
      id: 2,
      title: "Railway Exams",
      slug: "railway",
      description: "RRB NTPC, Group D, ALP",
      badge: "Popular",
    },
    {
      id: 3,
      title: "Banking Exams",
      slug: "banking",
      description: "IBPS PO, SBI Clerk, RBI",
      badge: "Upcoming",
    },
    {
      id: 4,
      title: "UPSC Exams",
      slug: "upsc",
      description: "Civil Services, CDS, NDA",
      badge: "Premium",
    },
    {
      id: 5,
      title: "State PSC",
      slug: "state-psc",
      description: "UPPSC, BPSC, MPSC",
      badge: "New",
    },
  ];

  useEffect(() => {
    // Simulating loading state
    setTimeout(() => {
      setExams(displayExams);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="bg-white min-h-screen font-Poppins flex flex-col pt-[70px] md:pt-[80px]">
      <Navbar />

      {/* ================= HERO SECTION (Matched exactly with Competitive Exams) ================= */}
      <div
        className="pt-16 md:pt-24 pb-20 px-6 relative overflow-hidden bg-orange-50/80"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ea580c' fill-opacity='0.06' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <nav className="text-sm mb-6 font-medium" aria-label="Breadcrumb">
            <ol className="list-none p-0 inline-flex items-center text-gray-500">
              <li className="flex items-center">
                <Link
                  href="/"
                  className="hover:text-orange-600 transition-colors"
                >
                  Home
                </Link>
                <span className="mx-3">/</span>
              </li>
              <li className="flex items-center text-gray-900 font-bold tracking-wide">
                Government Exams
              </li>
            </ol>
          </nav>

          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 space-y-5 text-center md:text-left">
              <span className="inline-block bg-orange-100 text-orange-600 py-1.5 px-4 rounded-full text-sm font-bold tracking-wider uppercase shadow-sm border border-orange-200">
                YOUR GATEWAY TO SUCCESS
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-snug tracking-tight pb-2">
                Master the <br className="hidden md:block" />
                <span className="text-orange-600">Government</span> Exams
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto md:mx-0">
                Comprehensive preparation, expert guidance, and top-tier study
                materials to help you conquer your Govt Exam target.
              </p>
            </div>

            <div className="flex-1 w-full flex justify-center items-center">
              <div className="w-full max-w-[400px] md:max-w-[500px]">
                {/* 🚀 CORRECT SVG APPLIED: Single person on screen with bubbles */}
                <Player
                  autoplay
                  loop
                  src="https://assets3.lottiefiles.com/packages/lf20_z01bika0.json"
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= QUICK LINKS (Floating Cards) ================= */}
      <div className="container mx-auto max-w-6xl px-6 md:px-12 -mt-10 relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {quickLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.link}
              className="bg-white rounded-2xl p-6 flex items-center justify-between border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 transition-all duration-300 group cursor-pointer"
            >
              <div>
                <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-1">
                  {link.title}
                </h3>
                <p className="text-gray-500 text-sm font-medium">
                  {link.subtitle}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                <FaChevronRight className="text-orange-500 text-sm opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ================= CHOOSE EXAM CATEGORY ================= */}
      <div className="container mx-auto max-w-6xl p-6 md:p-12 mt-4 relative z-10 flex-grow">
        <div className="mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
            <FaLaptopCode className="text-orange-500" />
            Explore Top Categories
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {exams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:border-orange-100 transition-all duration-300 transform hover:-translate-y-1 group flex flex-col h-full"
                >
                  <div className="h-32 bg-gradient-to-br from-orange-50 to-white border-b border-orange-50 relative p-6 flex flex-col justify-end shrink-0">
                    {exam.badge && (
                      <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-semibold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                        {exam.badge}
                      </div>
                    )}
                    <h3 className="text-gray-900 text-2xl font-black leading-snug group-hover:text-orange-600 transition-colors">
                      {exam.title.toUpperCase()}
                    </h3>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-600 text-sm font-medium mb-6 flex-grow">
                      Includes: {exam.description}
                    </p>
                    <Link
                      href={`/government-exams/${exam.slug}`}
                      className="mt-auto w-full"
                    >
                      <button className="w-full bg-orange-50 text-orange-600 font-bold px-5 py-3 rounded-xl hover:bg-orange-500 hover:text-white transition-colors text-sm uppercase tracking-wide">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer1 />
      <Footer />
    </div>
  );
}
