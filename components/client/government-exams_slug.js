"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic"; // DYNAMIC IMPORT ADDED
import {
  FaChevronLeft,
  FaChevronRight,
  FaGraduationCap,
  FaClipboardList,
  FaMoneyBillWave,
  FaChalkboardTeacher,
  FaStar,
  FaQuoteLeft,
  FaChevronDown,
} from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { useRouter } from "next/navigation";

// Lottie Player ko sirf Client-Side render karne ke liye (Error 1 Fix)
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  {
    ssr: false,
  },
);

export default function GovernmentExamPremiumPage({ params }) {
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams.slug;

  const formattedTitle = slug.replace("-", " ").toUpperCase();
  const scrollContainerRef = useRef(null);

  const [examData, setExamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    fetch(`${WEB_BACKEND_URL}/api/route/get-exam-details/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.message && !data.error) {
          setExamData(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, [slug]);

  const scrollLeft = () =>
    scrollContainerRef.current?.scrollBy({ left: -250, behavior: "smooth" });
  const scrollRight = () =>
    scrollContainerRef.current?.scrollBy({ left: 250, behavior: "smooth" });

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  // Backend se ab seedha array aa raha hai, toh split/trim ki zaroorat nahi hai (Error 2 Fix)
  const subNavItems = Array.isArray(examData?.nav_items)
    ? examData.nav_items
    : [];
  const subNavSubItems = Array.isArray(examData?.nav_subitems)
    ? examData.nav_subitems
    : [];

  const examName = examData?.title || formattedTitle;

  const heroSection = examData?.hero_section || {};

  const examInfoCards = examData?.exam_info_cards || [];

  const preparationStrategy = examData?.preparation_strategy || [];

  const successStories = examData?.success_stories || [];


  const counselingBanner = examData?.counseling_banner || {};


  const getCardByType = (type) => {
    return examInfoCards.find((card) => card.type === type);
  };

  const aboutCard = getCardByType("about");

  const salaryCard = getCardByType("salary");

  const datesCard = getCardByType("dates");

  // 3. Added handleBookCounseling function
  const handleBookCounseling = () => {
    // Check if user is logged in (Adjust this line to match your actual auth logic, e.g., using Context or Redux)
    const isUserRegistered = localStorage.getItem("token"); // Example: checking for a token in localStorage

    if (!isUserRegistered) {
      // Redirect to Student page if not registered
      router.push("/Student");
    } else {
      // Logic for when they ARE registered
      // e.g., open a modal, redirect to a booking form, or call an API
      console.log("User is registered. Open booking modal or route.");
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center">
        <Navbar />
        <div className="mt-40 text-center p-10 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-md">
          <h2 className="text-2xl text-red-600 font-black mb-2">
            Exam Not Found
          </h2>
          <p className="text-gray-500">
            We couldn't find details for {formattedTitle}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen font-Poppins flex flex-col relative pt-[70px] md:pt-[80px]">
      <Navbar />

      {subNavItems.length > 0 && (
        <div className="sticky top-[80px] z-40 w-full px-4 mt-4">
          <div className="max-w-7xl mx-auto relative flex items-center bg-white/70 backdrop-blur-md border border-orange-200 shadow-lg rounded-2xl px-2">
            {/* INDEX 0: Dropdown Trigger */}
            <div
              className="relative flex items-center group cursor-pointer z-50 shrink-0"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="px-4 md:px-6 py-4 text-sm font-semibold text-gray-800 hover:text-orange-600 transition-all flex items-center gap-2">
                {subNavItems[0]}
                <FaChevronDown
                  size={12}
                  className={`transition-transform duration-300 text-orange-500 ${isDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Animated Dropdown Menu */}
              <div
                className={`absolute top-[90%] left-0 w-64 bg-white border border-orange-100 shadow-2xl rounded-xl py-3 mt-1 transition-all duration-300 ${isDropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"}`}
              >
                {subNavSubItems.length > 0 ? (
                  subNavSubItems.map((sub, sIdx) => (
                    <Link
                      key={sIdx}
                      href={`/government-exams/${slug}/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                      className="block px-5 py-2.5 text-sm text-gray-600 hover:bg-orange-50 hover:text-orange-600 font-medium transition-colors"
                    >
                      {sub}
                    </Link>
                  ))
                ) : (
                  <div className="px-5 py-2 text-xs text-gray-400">
                    No sub-items found
                  </div>
                )}
              </div>

              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:w-full"></span>
            </div>

            <div
              ref={scrollContainerRef}
              className="flex-1 flex overflow-x-auto whitespace-nowrap items-center w-full scroll-smooth scrollbar-hide"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              {subNavItems.slice(1).map((item, index) => {
                const itemText = item; // Ab seedha item use kar sakte hain
                const itemSlug = itemText.toLowerCase().replace(/\s+/g, "-");

                const isMockTest = itemText === "Mock Tests";

                return (
                  <Link
                    key={index}
                    href={isMockTest ? `/test-series` : `/government-exams/${slug}/${itemSlug}`}
                    className="relative px-6 py-4 text-sm font-semibold text-gray-600 hover:text-orange-600 transition-all duration-300 group"
                  >
                    {itemText}
                    <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              })}
            </div>

            {/* Right Arrow */}
            <button
              onClick={scrollRight}
              className="z-20 h-full px-3 text-gray-400 hover:text-orange-600 hidden md:flex items-center bg-white/50"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* ================= HERO SECTION ================= */}
      <div
        className={`pt-20 md:pt-24 pb-20 px-6 relative overflow-hidden bg-orange-50/80 ${subNavItems.length > 0 ? "mt-0" : ""}`}
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
              <li className="flex items-center">
                <Link
                  href="/government-exams"
                  className="hover:text-orange-600 transition-colors"
                >
                  Govt Exams
                </Link>
                <span className="mx-3">/</span>
              </li>
              <li className="flex items-center text-gray-900 font-bold tracking-wide uppercase">
                {formattedTitle}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
            <div className="flex-1 space-y-5 text-center md:text-left">
              <span className="inline-block bg-orange-100 text-orange-600 py-1.5 px-4 rounded-full text-sm font-bold tracking-wider uppercase shadow-sm border border-orange-200">
                {heroSection?.badge || "GOVERNMENT JOBS 2026"}
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-snug tracking-tight pb-2">
                {heroSection?.title || `Master the ${examName} Exam`}
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mx-auto md:mx-0">
                {heroSection?.description || "Comprehensive preparation..."}
              </p>
            </div>

            <div className="flex-1 w-full flex justify-center items-center">
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[350px] relative">
                <Player
                  autoplay
                  loop
                  src={heroSection?.animation || "/olympiad-animation.json"}
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= EXAM INFO CARDS ================= */}
      <div className="container mx-auto max-w-6xl p-6 md:p-12 relative z-10">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center gap-3">
          <span className="w-2 h-8 bg-orange-500 rounded-full inline-block"></span>
          {examName} Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaGraduationCap className="text-3xl text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              About {examName}
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium line-clamp-6">
              {aboutCard?.description ||
                examData?.description ||
                "Information will be updated soon."}
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaClipboardList className="text-3xl text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Important Dates
            </h2>
            <ul className="space-y-4 text-gray-600 font-medium">
              {datesCard?.items?.map((item, index) => (
                <li
                  key={index}
                  className="flex flex-col bg-gray-50 p-3 rounded-lg border border-gray-100"
                >
                  <span className="text-xs text-orange-500 font-bold uppercase">
                    {item.label}
                  </span>

                  <span className="text-gray-800 font-bold">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaMoneyBillWave className="text-3xl text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Salary & Perks
            </h2>
            <div className="bg-green-50/50 p-4 rounded-xl border border-green-100">
              <p className="text-gray-600 mb-1 font-medium text-sm">
                Expected Salary Range:
              </p>
              <p className="text-2xl font-black text-gray-900">
                {salaryCard?.salary || examData?.salary || "As per Govt Norms"}
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-4 font-medium leading-relaxed">
              Includes Dearness Allowance (DA), House Rent Allowance (HRA),
              Transport Allowance, and other government perks.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all group">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <FaChalkboardTeacher className="text-3xl text-orange-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Preparation Strategy
            </h2>
            <ul className="space-y-3 text-gray-600 font-medium">
              {preparationStrategy.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>

                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ================= SUCCESS STORIES ================= */}
      <div className="bg-white py-16 border-t border-gray-100 relative z-10">
        <div className="container mx-auto max-w-6xl px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              Success Stories
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto font-medium">
              Hear directly from our top performers who conquered the {examName}{" "}
              exam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div
                key={index}
                className="bg-orange-50/30 p-8 rounded-2xl border border-orange-100 relative hover:shadow-md transition-shadow duration-300"
              >
                <FaQuoteLeft className="text-4xl text-orange-200 absolute top-6 right-6" />

                <div className="flex gap-1 mb-6 text-orange-400">
                  {[...Array(story.rating || 5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <p className="text-gray-700 italic mb-8 relative z-10 leading-relaxed min-h-[80px] font-medium">
                  "{story.review}"
                </p>

                <div className="flex items-center gap-4 border-t border-orange-100 pt-6">
                  <div className="w-12 h-12 bg-orange-500 text-white font-semibold rounded-full flex items-center justify-center text-xl shrink-0">
                    {story?.name?.charAt(0)}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {story.name}
                    </h4>

                    <p className="text-xs text-orange-600 font-semibold mt-1 uppercase tracking-wide">
                      {story.designation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= COUNSELING BANNER ================= */}
      <div
        className="py-20 relative overflow-hidden z-10 bg-orange-50/80 border-y border-orange-100 mt-auto"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ea580c' fill-opacity='0.06' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent"></div>

        <div className="container mx-auto max-w-4xl px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            {counselingBanner?.title || `Need help with ${examName} prep?`}
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto font-medium">
            {counselingBanner?.description ||
              "Talk to our academic counselors today."}
          </p>
          <button
            onClick={handleBookCounseling}
            className="bg-orange-500 text-white font-bold text-lg px-10 py-4 rounded-full shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:scale-105 transition-all duration-300"
          >
            {counselingBanner?.buttonText || "Book Free Counseling"}
          </button>
        </div>
      </div>

      {/* ================= FAQS ================= */}
      <div className="bg-white py-20 border-b border-gray-100 relative z-10">
        <div className="container mx-auto max-w-4xl px-6 md:px-12">
          <div className="flex flex-col items-center justify-center gap-3 mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              {examName} FAQs
            </h2>
            <p className="text-gray-500 mt-2 font-medium">
              Got questions? We've got answers.
            </p>
          </div>

          <div className="space-y-4">
            {examData?.faqs?.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden bg-slate-50 border border-slate-200 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex justify-between items-center p-5 text-left hover:bg-slate-100 transition-colors focus:outline-none"
                  >
                    <span className="font-semibold text-slate-800 text-lg pr-4">
                      {faq.question}
                    </span>
                    <FaChevronDown
                      className={`text-slate-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="p-5 pt-0 text-slate-600 font-medium leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer1 />
      <Footer />
    </div>
  );
}
