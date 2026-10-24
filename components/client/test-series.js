"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Link from "next/link";
import axios from "axios";
import { FaLaptopCode, FaClock, FaListOl } from "react-icons/fa";

export default function TestSeriesDashboard() {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🚀 NAYA STATE: Active Category Track karne ke liye
  const [activeCategory, setActiveCategory] = useState("All");

  // 🚀 NAYA: Categories ki List
  const categories = [
    "All",
    "JEE Main",
    "JEE Advanced",
    "NEET",
    "Government Exams",
  ];

  useEffect(() => {
    axios
      .get(`${WEB_BACKEND_URL}/api/route/exams-list`)
      .then((res) => {
        setExams(res.data.exams);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching exams:", err);
        setLoading(false);
      });
  }, []);

  // 🚀 SMART FILTER LOGIC: Yeh exams ke naam padh kar unko filter karega
  const filteredExams = exams.filter((exam) => {
    if (activeCategory === "All") return true;

    const examName = exam.examName?.toLowerCase() || "";
    const cat = activeCategory.toLowerCase();

    // Check karega ki exam ke naam mein category ka naam hai ya nahi
    if (cat === "jee main" && examName.includes("main")) return true;
    if (cat === "jee advanced" && examName.includes("advanced")) return true;
    if (cat === "neet" && examName.includes("neet")) return true;
    if (
      cat === "government exams" &&
      (examName.includes("ssc") || examName.includes("upsc"))
    )
      return true;

    // Agar future mein DB mein category field add ki, toh uspe bhi chalega
    return exam.category === activeCategory;
  });

  return (
    <div className="bg-[#FBFCFE] min-h-screen font-Poppins flex flex-col pt-[70px] md:pt-[80px]">
      <Navbar />

      {/* ================= HERO SECTION ================= */}
      <div
        className="pt-16 pb-16 px-6 relative overflow-hidden bg-orange-50/80 border-b border-orange-100"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ea580c' fill-opacity='0.06' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1.5'/%3E%3Ccircle cx='13' cy='13' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Premium <span className="text-orange-600">Test Series</span>
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Select your exam category below to start your real-time practice and
            check your all-India ranking.
          </p>
        </div>
      </div>

      {/* ================= MAIN CONTENT AREA ================= */}
      <div className="flex-grow container mx-auto max-w-6xl p-6 md:p-12 relative z-10">
        {/* 👇 YAHAN HAIN TERE NAYE TABS / FILTERS 👇 */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 shadow-sm ${
                activeCategory === cat
                  ? "bg-orange-500 text-white shadow-md scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ================= EXAMS LIST (CARDS) ================= */}
        {loading ? (
          <div className="text-center text-xl font-bold text-orange-500 py-20">
            Fetching Tests... 🚀
          </div>
        ) : filteredExams.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              No {activeCategory} Tests Available!
            </h2>
            <p className="text-gray-500">
              We are currently uploading tests for this category. Please check
              back later.
            </p>
            <button
              onClick={() => setActiveCategory("All")}
              className="mt-6 text-orange-500 font-bold hover:underline"
            >
              View All Tests
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredExams.map((exam) => (
              <div
                key={exam._id}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 flex flex-col relative group"
              >
                <div className="inline-block bg-orange-50 text-orange-600 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider w-max mb-4 border border-orange-100">
                  {exam.institute || "Mock Test"}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {exam.examName}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center gap-2 text-gray-600 font-medium bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <FaListOl className="text-orange-500" />
                    <span className="text-sm">
                      {exam.maxMarks || "N/A"} Marks
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 font-medium bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                    <FaClock className="text-orange-500" />
                    <span className="text-sm">
                      {exam.timeDuration || "180 mins"}
                    </span>
                  </div>
                </div>

                <div className="mt-auto pt-5 border-t border-gray-100 text-center">
                  {/* Ab yeh seedha live exam pe nahi, balki instructions page par bhejega */}
                  <Link href={`/test-series/instructions?id=${exam._id}`}>
                    <button className="w-full font-bold py-3 px-5 rounded-lg transition-all duration-300 shadow-sm bg-gray-800 hover:bg-black text-white hover:shadow-md">
                      Explore & Instructions
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Footer1 />
        <Footer />
      </div>
    </div>
  );
}
