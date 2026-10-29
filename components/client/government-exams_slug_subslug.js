"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import {
  FaCheckCircle,
  FaStar,
  FaUsers,
  FaChevronDown,
  FaRegHandPointRight,
} from "react-icons/fa";

// 👉 TERA STUDY NOTES COMPONENT
import StudyNotes from "@/components/StudyNotes";
import DynamicFAQSection from "@/components/DynamicFAQSection";

export default function SubExamPage({ params }) {
  const unwrappedParams = React.use(params);
  const slug = unwrappedParams.slug;
  const subslug = unwrappedParams.subslug;

  const examName = subslug.replace(/-/g, " ").toUpperCase();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  // 👉 NAYA LOGIC: Check karo ki kya yeh special tab hai?
  const specialTabs = ["study-notes", "mock-tests", "pyq", "syllabus"];
  const isSpecialTab = specialTabs.includes(subslug);

  // ==========================================
  // 🚀 1. TERA NAYA DYNAMIC USE-EFFECT
  // ==========================================
  useEffect(() => {
    setLoading(true);

    // Dynamic URL Logic:
    // Agar 'study-notes' hai, toh main exam (slug) ki details laao
    const fetchUrl = isSpecialTab
      ? `${WEB_BACKEND_URL}/api/route/get-exam-details/${slug}`
      : `${WEB_BACKEND_URL}/api/route/get-sub-details/${slug}/${subslug}`;

    fetch(fetchUrl)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, [slug, subslug, isSpecialTab]);

  const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // ==============================================================
  // 🎯 SPECIAL TABS RENDERING (STUDY NOTES YAHAN RENDER HOGA)
  // ==============================================================

  if (subslug === "study-notes") {
    return (
      <div className="bg-[#FBFCFE] font-Poppins min-h-screen flex flex-col pt-[70px] md:pt-[80px]">
        <Navbar />

        {/* ================= PREMIUM HEADER ================= */}
        <div
          className="pt-16 pb-16 px-6 relative overflow-hidden bg-orange-50/80 border-b border-orange-100"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ea580c' fill-opacity='0.06' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"></div>

          <div className="max-w-7xl mx-auto relative z-10 text-left">
            <nav
              className="text-sm mb-6 font-medium flex justify-start"
              aria-label="Breadcrumb"
            >
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
                    href={`/government-exams`}
                    className="hover:text-orange-600 transition-colors"
                  >
                    Govt Exams
                  </Link>
                  <span className="mx-3">/</span>
                </li>
                <li className="flex items-center">
                  <Link
                    href={`/government-exams/${slug}`}
                    className="hover:text-orange-600 transition-colors uppercase"
                  >
                    {slug.replace(/-/g, " ")}
                  </Link>
                  <span className="mx-3">/</span>
                </li>
                <li className="flex items-center text-orange-600 font-bold tracking-wide uppercase">
                  Study Notes
                </li>
              </ol>
            </nav>

            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4 uppercase">
              {slug.replace(/-/g, " ")} Study Notes
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl">
              Access premium PDF notes, chapter-wise materials, and
              comprehensive study guides to boost your preparation.
            </p>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="flex-grow container mx-auto max-w-6xl p-6 md:p-12 relative z-10">
          {/* 🚀 2. YAHAN TERA COMPONENT AB DYNAMIC HO GAYA */}
          <StudyNotes slug={slug} sessionId={data?.id || data?._id} />
        </div>

        <DynamicFAQSection slug={`${slug}-${subslug}`} />

        <div className="mt-auto">
          <Footer1 />
          <Footer />
        </div>
      </div>
    );
  }

  // ==============================================================
  // 📌 NORMAL EXAM PAGE RENDERING
  // ==============================================================

  if (!data || data.error) {
    return (
      <div className="bg-gray-50 min-h-screen flex flex-col items-center">
        <Navbar />
        <div className="mt-40 text-center p-10 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-md">
          <h2 className="text-2xl text-red-600 font-black mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-500">
            We couldn't find the page you're looking for. Please go back and try
            again or contact our support team for assistance.
          </p>
        </div>
      </div>
    );
  }

  let cardsList = [];
  if (data.page_type === "cards" && data.cards_data) {
    cardsList =
      typeof data.cards_data === "string"
        ? JSON.parse(data.cards_data)
        : data.cards_data;
  }

  const faqs = data?.faqs || [];

  const contentSections = data?.content_sections || [];

  const getSectionByType = (type) => {
    return contentSections.find((section) => section.type === type);
  };

  const selectionProcess = getSectionByType("selection_process");

  const howToApply = getSectionByType("how_to_apply");

  const preparationTips = getSectionByType("preparation_tips");

  return (
    <div className="bg-[#FBFCFE] font-Poppins min-h-screen flex flex-col pt-[70px] md:pt-[80px]">
      <Navbar />

      {/* ================= PREMIUM HEADER ================= */}
      <div
        className="pt-16 pb-16 px-6 relative overflow-hidden bg-orange-50/80 border-b border-orange-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ea580c' fill-opacity='0.06' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-left">
          <nav
            className="text-sm mb-6 font-medium flex justify-start"
            aria-label="Breadcrumb"
          >
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
                  href={`/government-exams/${slug}`}
                  className="hover:text-orange-600 transition-colors uppercase"
                >
                  {slug.replace(/-/g, " ")}
                </Link>
                <span className="mx-3">/</span>
              </li>
              <li className="flex items-center text-orange-600 font-bold tracking-wide uppercase">
                {examName}
              </li>
            </ol>
          </nav>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            {data.page_title ||
              data.title ||
              `${examName} 2026 Preparation & Notification`}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl">
            {data?.hero_section?.description ||
              `Everything you need to know about ${examName}`}
          </p>
        </div>
      </div>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="py-12 px-4 md:px-8 flex-grow">
        <div className="max-w-7xl mx-auto">
          {/* COURSE CARDS SECTION */}
          {data.page_type === "cards" && cardsList.length > 0 && (
            <div className="mb-20">
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <span className="w-2 h-8 bg-orange-500 rounded-full inline-block"></span>
                Premium {examName} Courses
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cardsList.map((card) => (
                  <div
                    key={card.id}
                    className="bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-orange-200 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                  >
                    {card.badge && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        <FaStar size={10} /> {card.badge}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-4 mt-2 group-hover:text-orange-600 transition-colors">
                      {card.title}
                    </h3>
                    <div className="space-y-3 mb-8 flex-grow">
                      {card.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <FaCheckCircle
                            className="text-orange-500 mt-1 flex-shrink-0"
                            size={14}
                          />
                          <span className="text-sm text-gray-600 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-5 border-t border-gray-100 mt-auto">
                      <div className="flex justify-between items-end mb-5">
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-400 line-through font-semibold">
                            {card.originalPrice}
                          </span>
                          <span className="text-3xl font-black text-gray-900 flex items-center tracking-tight">
                            {card.price}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
                          <FaUsers size={12} /> 10k+ Enrolled
                        </div>
                      </div>
                      <button className="w-full bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-500 hover:text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-sm uppercase tracking-wide text-sm">
                        {card.buttonText || "View Details"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================= DETAILED INFORMATION SECTION ================= */}
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-5xl mx-auto">
            <h2 className="text-3xl font-black text-gray-900 mb-8 border-b border-gray-100 pb-6">
              Complete Guide: {examName} 2026
            </h2>

            {/* Selection Process */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaRegHandPointRight className="text-orange-500" /> Selection
                Process & Exam Pattern
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                The {examName} examination is typically conducted in multiple
                tiers to ensure a rigorous selection of candidates.
                Understanding these stages is crucial for effective preparation.
              </p>
              <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100 space-y-4">
                {selectionProcess?.content?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100"
                  >
                    <h4 className="font-bold text-gray-900 text-lg">
                      {item.heading}
                    </h4>

                    <p className="text-gray-600 mt-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Apply */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaRegHandPointRight className="text-orange-500" /> How to Apply
                for {examName}?
              </h3>
              <p className="text-gray-600 mb-5 leading-relaxed">
                Applying for the exam is a completely online process. Follow
                these simplified steps to ensure your application is submitted
                without any errors:
              </p>
              <ol className="relative border-l border-gray-200 ml-3 space-y-6">
                <ol className="relative border-l border-gray-200 ml-3 space-y-6">
                  {howToApply?.steps?.map((step, index) => (
                    <li key={index} className="ml-6">
                      <span className="absolute flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full -left-4 ring-4 ring-white text-orange-600 font-bold text-sm">
                        {index + 1}
                      </span>

                      <h4 className="font-bold text-gray-900 text-lg mb-1">
                        {step.title}
                      </h4>

                      <p className="text-gray-600">{step.description}</p>
                    </li>
                  ))}
                </ol>
              </ol>
            </div>

            {/* Preparation Tips */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaRegHandPointRight className="text-orange-500" /> Expert
                Preparation Strategy
              </h3>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <ul className="space-y-4 text-gray-700">
                  {preparationTips?.tips?.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0"></div>

                      <p>{tip}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* FAQs */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <FaRegHandPointRight className="text-orange-500" /> Frequently
                Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl overflow-hidden bg-white border border-gray-200 transition-all duration-300 shadow-sm hover:border-orange-200"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex justify-between items-center p-5 text-left transition-colors focus:outline-none"
                      >
                        <span className="font-semibold text-gray-800 pr-4">
                          {faq.question}
                        </span>
                        <FaChevronDown
                          className={`text-gray-400 transition-transform duration-300 flex-shrink-0 ${isOpen ? "rotate-180 text-orange-500" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out bg-gray-50 ${isOpen ? "max-h-[500px] opacity-100 border-t border-gray-100" : "max-h-0 opacity-0"}`}
                      >
                        <div className="p-5 text-gray-600 font-medium leading-relaxed">
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer1 />
        <Footer />
      </div>
    </div>
  );
}
