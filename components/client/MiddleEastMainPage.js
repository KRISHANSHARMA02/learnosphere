"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Sociallinks2 from "@/components/Sociallinks2";
import ContactForm from "@/components/ContactFormME";
import { useState } from "react";

export default function MiddleEastHomePage() {
  const [countries] = useState([
    // {
    //   slug: "united-arab-emirates",
    //   country_name: "United Arab Emirates (UAE)",
    //   short_intro:
    //     "The UAE hosts the largest number of CBSE schools outside India.",
    //   hero_image: "/dubai.jpg",
    // },
    {
      slug: "saudi-arabia-online-tuition",
      country_name: "Saudi Arabia",
      short_intro:
        "CBSE schools in Riyadh, Jeddah & Dammam offer high-quality Indian education.",
      hero_image: "/saudi-arabia.jpg",
    },
    {
      slug: "qatar-online-tuition",
      country_name: "Qatar",
      short_intro:
        "Qatar's CBSE schools are known for excellence & strong board exam results.",
      hero_image: "/qatar.jpg",
    },
    // {
    //   slug: "oman-online-tuition",
    //   country_name: "Oman",
    //   short_intro:
    //     "Indian schools in Muscat, Sohar & Salalah provide supportive CBSE learning.",
    //   hero_image: "/oman.jpg",
    // },
    // {
    //   slug: "bahrain-online-tuition",
    //   country_name: "Bahrain",
    //   short_intro:
    //     "Bahrain ensures a structured CBSE environment with strong discipline.",
    //   hero_image: "/bahrain.jpg",
    // },
    {
      slug: "kuwait-online-tuition",
      country_name: "Kuwait",
      short_intro:
        "Kuwait offers affordable CBSE education with strong academic outcomes.",
      hero_image: "/kuwait.jpg",
    },
  ]);

  // Reusable Checkmark Icon
  const CheckIcon = () => (
    <svg
      className="w-5 h-5 text-orange-600 mt-1 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );

  return (
    <>
      <div className="bg-gradient-to-b from-orange-50/50 via-white to-white min-h-screen pt-20 font-sans text-gray-800">
    
        <Navbar />
    
      

        {/* ================= HERO SECTION ================= */}
        <section className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 text-center overflow-hidden">
          {/* Decorative Blur Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-3xl -z-10" />

          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
              CBSE Education in the <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500">
                Middle East
              </span>{" "}
              – Complete Guide (2025)
            </h1>

            <p className="mt-6 text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              The Middle East has become one of the most preferred regions for
              Indian families seeking high-quality CBSE education. With
              thousands of Indian students across the UAE, Saudi Arabia, Qatar,
              Oman, Bahrain, and Kuwait, the region follows the CBSE curriculum
              closely. Learnosphere provides accurate, updated, and complete
              guidance for Middle East CBSE students, teachers, and parents to
              help them learn, prepare, and excel anytime, anywhere.
            </p>
          </div>
        </section>

        {/* ================= FULL CONTENT WRAPPER ================= */}
        <div className="max-w-6xl mx-auto px-6 pb-20 space-y-20">
          {/* 1. WHY CBSE IS POPULAR */}
          <section>
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-orange-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-0" />
              <h2 className="text-3xl font-bold text-gray-900 mb-6 relative z-10">
                Why CBSE Education is{" "}
                <span className="text-orange-600">Popular</span> in the Middle
                East
              </h2>
              <p className="text-gray-700 mb-8 text-lg">
                CBSE schools in the Middle East ensure consistency in academic
                standards while providing modern infrastructure, multicultural
                exposure, and global learning opportunities. Families prefer
                CBSE because:
              </p>

              <ul className="grid md:grid-cols-2 gap-4">
                {[
                  "It follows a uniform national curriculum aligned with Indian standards.",
                  "It supports smooth transitions for students moving between countries.",
                  "CBSE prepares students for JEE, NEET, CUET, and international higher education.",
                  "It encourages critical thinking, skill-based learning, and digital education.",
                  "Middle East CBSE schools have strong communities, trained teachers, and digital learning support like Learnosphere.",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-orange-50/50 rounded-xl border border-orange-100 hover:bg-orange-50 transition-colors"
                  >
                    <CheckIcon />
                    <span className="text-gray-800 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 2. MIDDLE EAST COUNTRIES GRID & PROFESSIONAL MAP */}
          <section className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Middle Eastern Countries Offering CBSE
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                The Middle East hosts major CBSE student populations outside
                India. Explore the countries below to learn about their
                schooling environment.
              </p>
            </div>

            {/* ================= PROFESSIONAL MAP SECTION ================= */}
            <div className="w-full mb-16">
              {/* Outer Glow Effect */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-300 to-orange-100 rounded-[2.5rem] blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>

                {/* Main Card Container */}
                <div className="relative bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-2 md:p-3">
                  {/* Inner Map Background (Grid Pattern) */}
                  <div className="relative w-full h-[300px] md:h-[450px] bg-slate-50 rounded-[1.5rem] overflow-hidden border border-gray-100">
                    {/* Subtle Grid Background */}
                    <div
                      className="absolute inset-0 opacity-[0.03]"
                      style={{
                        backgroundImage:
                          "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                      }}
                    ></div>

                    {/* The Map Image */}
                    <div className="relative h-full w-full p-6 md:p-10 flex items-center justify-center">
                      <Image
                        src="/map-of-the-middle-east.webp"
                        alt="Middle East CBSE Map"
                        fill
                        className="object-contain drop-shadow-xl"
                        priority
                      />

                      {/* Simulated "Pulsing" Hotspots (Decorative) */}
                      {/* You can adjust top/left % to position these over specific countries on your map image */}
                      <div className="absolute top-[40%] left-[55%]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 border-2 border-white"></span>
                      </div>
                      <div className="absolute top-[50%] left-[60%]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 delay-300"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 border-2 border-white"></span>
                      </div>
                      <div className="absolute top-[35%] left-[45%]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 delay-700"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 border-2 border-white"></span>
                      </div>
                    </div>

                    {/* Floating "Glass" Stats Card - Bottom Left */}
                    <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-white/90 backdrop-blur-sm border border-orange-100 shadow-lg rounded-xl p-4 flex items-center gap-4 z-10 max-w-[200px] md:max-w-xs">
                      <div className="bg-orange-100 p-3 rounded-full text-orange-600">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
                          Presence
                        </p>
                        <p className="text-gray-900 font-bold text-sm md:text-base">
                          6 Major Countries
                        </p>
                      </div>
                    </div>

                    {/* Floating "Curriculum" Badge - Top Right */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm border border-orange-100 shadow-md rounded-full px-4 py-1.5 flex items-center gap-2 z-10">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                      <span className="text-xs font-bold text-gray-700">
                        CBSE Curriculum Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ================= END MAP SECTION ================= */}

            {/* Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {countries.map((c) => (
                <Link
                  href={`/middle-east/${c.slug}`}
                  key={c.slug}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden flex flex-col h-full"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    {/* Image Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />

                    <Image
                      src={c.hero_image}
                      alt={c.country_name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Floating Country Name on Image (Modern Look) */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <h3 className="text-xl font-bold text-white shadow-sm drop-shadow-md">
                        {c.country_name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow bg-white relative">
                    {/* Decorative corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform origin-top-right"></div>

                    <p className="text-gray-600 text-sm leading-relaxed flex-grow relative z-10">
                      {c.short_intro}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                      <span className="text-xs font-medium text-gray-400">
                        View Details
                      </span>
                      <div className="flex items-center text-orange-600 font-bold text-sm group-hover:translate-x-1 transition-transform cursor-pointer">
                        Explore
                        <svg
                          className="w-4 h-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* 3. INFO GRIDS (WHAT WE OFFER & BENEFITS) */}
          <section className="grid md:grid-cols-2 gap-8">
            {/* Box 1: What Learnosphere Offers */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-3xl p-8 text-white shadow-lg">
              <h2 className="text-2xl font-bold mb-6 border-b border-orange-400 pb-2">
                What Learnosphere Offers
              </h2>
              <ul className="space-y-4">
                {[
                  "Chapter-wise CBSE Notes for Classes 6–12",
                  "Updated NCERT Solutions",
                  "CBSE Sample Papers & Previous Year Papers",
                  "Online Quizzes & Mock Tests",
                  "One-on-One Online Tuition with CBSE Teachers",
                  "Full CBSE Syllabus & Blueprint for All Subjects",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-white/20 p-1 rounded-full mt-0.5">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-orange-50 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Box 2: Benefits */}
            <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-orange-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-2">
                Benefits for Students
              </h2>
              <ul className="space-y-4">
                {[
                  "Global recognition and easy relocation between countries",
                  "Strong foundation for competitive exams like JEE & NEET",
                  "Smart classrooms, labs, and technology-driven teaching",
                  "Access to online learning platforms like Learnosphere",
                  "Structured curriculum strengthens reasoning, problem-solving & comprehension",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-orange-100 p-1 rounded-full mt-0.5">
                      <span className="text-orange-600 text-xs font-bold block w-4 text-center">
                        {idx + 1}
                      </span>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 4. HELPING & TRUST SECTIONS */}
          <section className="bg-orange-50 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              {/* How we help */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  How Learnosphere Helps Students Score Higher
                </h2>
                <ul className="space-y-3">
                  {[
                    "Real-time doubt solving",
                    "Board exam strategy & answer writing techniques",
                    "Progress tracking for parents",
                    "Personalized learning paths based on student performance",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
                    >
                      <span className="text-green-500 font-bold text-xl">
                        ✔
                      </span>
                      <span className="text-gray-800 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Why Teachers Trust Us */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Why Learnosphere is Trusted by Teachers
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Lesson plans",
                    "Teaching slides",
                    "Question banks",
                    "Worksheets & class tests",
                    "Digital learning tools",
                    "Homework assignment & tracking",
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-orange-500"
                    >
                      <span className="text-gray-800 font-medium text-sm">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* NEW: TUTOR APPLICATION SECTION (Modern & Attractive) */}
          {/* ========================================================= */}
          <section className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 px-6 py-12 md:px-16 md:py-20 shadow-2xl">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-orange-500 blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-500 blur-3xl opacity-20"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-6">
                  Are you a Qualified <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                    Tutor?
                  </span>
                </h2>
                <p className="text-slate-300 text-lg mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Join the Learnosphere network in the Middle East. Connect with
                  students in UAE, Saudi Arabia, Qatar, and more. Set your own
                  rates, teach online, and grow your career.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  {/* Primary CTA */}
                  <Link
                    href="/Signin"
                    className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold text-lg hover:bg-orange-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,165,0,0.5)] flex items-center gap-2"
                  >
                    Apply as a Tutor
                    <svg
                      className="w-5 h-5 text-orange-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>

                  {/* Secondary CTA */}
                  <Link
                    href="/contact"
                    className="px-8 py-4 rounded-full border border-slate-600 text-slate-300 font-medium hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    Contact Support
                  </Link>
                </div>
              </div>

              {/* Right Cards / Stats */}
              <div className="flex-1 w-full max-w-md lg:max-w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "High Earnings",
                      desc: "Competitive hourly rates & bonuses",
                      icon: "💰",
                    },
                    {
                      title: "Flexible Time",
                      desc: "Choose your own teaching slots",
                      icon: "⏳",
                    },
                    {
                      title: "Global Reach",
                      desc: "Teach students from 6+ countries",
                      icon: "🌍",
                    },
                    {
                      title: "Smart Tools",
                      desc: "LMS & digital whiteboard support",
                      icon: "💻",
                    },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition duration-300 group"
                    >
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                        {card.icon}
                      </div>
                      <h3 className="text-white font-bold text-lg mb-1">
                        {card.title}
                      </h3>
                      <p className="text-slate-400 text-sm">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 5. CONCLUSION */}
          <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Conclusion
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              CBSE education in the Middle East continues to grow rapidly with
              strong schools, qualified teachers, and advanced digital learning
              support. Learnosphere is dedicated to empowering every student
              with reliable notes, mock tests, solutions, and live tuition to
              help them score higher and learn smarter—anytime and anywhere.
            </p>
          </section>

          <ContactForm countryName={"Middle East"} />

          {/* 6. FAQ SECTION */}
          <section>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900">
                Frequently Asked Questions (FAQ)
              </h2>
              <div className="w-24 h-1 bg-orange-500 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  q: "What is CBSE education in the Middle East?",
                  a: "It follows India’s national curriculum for Indian students living in Gulf countries.",
                },
                {
                  q: "Which Middle East countries offer CBSE schools?",
                  a: "UAE, Saudi Arabia, Qatar, Oman, Bahrain & Kuwait.",
                },
                {
                  q: "Why do Indian families prefer CBSE schools in the Middle East?",
                  a: "They provide a uniform curriculum, easy relocation, and strong academic continuity.",
                },
                {
                  q: "Are CBSE schools good for board exam preparation?",
                  a: "Yes, they follow NCERT-based learning ideal for Class 10 & 12 exams.",
                },
                {
                  q: "Is CBSE valid in India & abroad?",
                  a: "Yes, CBSE is globally recognized for higher education admissions.",
                },
                {
                  q: "Can Middle East students access digital CBSE materials?",
                  a: "Yes, Learnosphere provides notes, solutions, quizzes & sample papers online.",
                },
                {
                  q: "Does CBSE help with JEE or NEET preparation?",
                  a: "Yes, CBSE builds strong conceptual foundations aligned with competitive exams.",
                },
                {
                  q: "How can students improve their CBSE exam scores?",
                  a: "Regular practice with quizzes, mock tests, and revision notes helps greatly.",
                },
                {
                  q: "Are CBSE teachers available for online classes in Gulf countries?",
                  a: "Yes, Learnosphere connects Middle East students with qualified CBSE teachers.",
                },
                {
                  q: "Where can I download CBSE sample papers and previous papers?",
                  a: "You can download updated sample papers and solutions directly from Learnosphere.",
                },
              ].map((item, index) => (
                <details
                  key={index}
                  className="group bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-5 bg-white group-hover:bg-orange-50/30 transition-colors">
                    <h3 className="text-lg font-semibold text-gray-900 group-open:text-orange-600 transition-colors">
                      {item.q}
                    </h3>
                    <span className="flex-shrink-0 ml-4 w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-600 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>

                  <div className="px-5 pb-5 pt-0 text-gray-700 leading-relaxed border-t border-gray-50/0 group-open:border-gray-100 group-open:mt-2 transition-all">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        </div>
        <Sociallinks2 />
        <Footer1 />
        <Footer />
      </div>
    </>
  );
}
