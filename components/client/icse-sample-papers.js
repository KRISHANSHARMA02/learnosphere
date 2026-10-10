"use client";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GrNotes } from "react-icons/gr";
import { HiArrowRightCircle } from "react-icons/hi2";
import { CgNotes } from "react-icons/cg";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaNoteSticky } from "react-icons/fa6";

import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";

const ICSESamplePapers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 10000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
  }, []);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Trigger the redirect when the Enter key is pressed
    if (e.key === "Enter" && searchQuery) {
      // Redirect to ContentFound with the search query as a URL parameter
      window.location.href = `/SearchResult?query=${searchQuery}`;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4 mt-24 px-4 md:px-8 xl:px-20">
        <div className=" font-Poppins w-full md:w-[75%]">
          <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4"></div>
          <div>
            <h1 className="text-[1.2em] md:text-[1.6em] font-bold ">
              ICSE Sample Papers For Class 8th to 12th
            </h1>
          </div>
          <div className="flex flex-col gap-4 text-gray-950 mt-4 ">
            <p>
              ICSE Sample Papers for Class 8th to 12th are an excellent resource
              for students preparing for their exams. These papers are designed
              to reflect the exact format and style of questions that appear in
              the actual exams, helping students get familiar with the exam
              pattern. By practicing these sample papers, students can assess
              their preparation level, identify weak areas, and work on them
              before the final exams. With LearnOsphere, students can access a
              wide variety of sample papers for all subjects, allowing them to
              practice regularly and improve their problem-solving skills.
            </p>
            <p>
              These sample papers also provide students with a chance to
              practice time management, a crucial skill during exams. Students
              can attempt each paper within the allotted time frame, ensuring
              they can complete the exam on time. LearnOsphere’s platform also
              offers detailed solutions and explanations, which help students
              understand the correct approach to answering questions. This
              holistic preparation strategy boosts confidence, enhances academic
              performance, and ensures that students are well-prepared for their
              ICSE exams.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-[1.1em] md:text-[1.4em] mt-5">
              Advantages of ICSE Sample Papers for Class 8 to 12
            </h2>
          </div>
          <div className="mt-2">
            <ol className="text-orange-600 flex flex-col gap-2 list-decimal px-8">
              <li>
                Helps students understand the exam structure and question types.
              </li>
              <li>
                Promotes solving papers within the allotted time for enhanced
                speed.
              </li>
              <li>
                Builds confidence and reduces exam stress through practice.
              </li>
              <li>
                Strengthens problem-solving and critical thinking abilities.
              </li>
              <li>Highlights important topics for focused revision.</li>
              <li>
                Acts as a useful resource for reinforcing concepts and boosting
                readiness.
              </li>
            </ol>
          </div>
          <div className="bg-gray-50 p-2">
            <div className="mt-4 text-gray-900">
              <h3 className="text-[1.1em] md:text-[1.4em] font-semibold"></h3>
            </div>
            <div>
              <ol className="px-1 md:px-4 mt-4 list-disc">
                <Link
                  href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-8-Maths"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  ICSE Sample Papers For Class 8th
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-9-Maths"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  ICSE Sample Papers For Class 9th
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-10-Maths"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  ICSE Sample Papers For Class 10th
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/icse-sample-papers/ISC-Sample-Papers-for-Class-11-Maths"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  ISC Sample Papers For Class 11th
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
                <Link
                  href="/icse-sample-papers/ISC-Sample-Papers-for-Class-12-Maths"
                  className="text-blue-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
                >
                  ISC Sample Papers For Class 12th
                  <HiArrowRightCircle size={27} className="text-orange-600" />
                </Link>
              </ol>
            </div>
          </div>
          <div>
            <h3 className="text-[1.4em] font-semibold mt-4 p-2">
              CBSE & ICSE Sample Papers and Previous Year Question Papers
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[.7em] md:text-[1em] mt-4">
            <Link
              href="/CBSE-Sample-Papers"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-purple-400 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <GrNotes size={25} />
              CBSE Sample Papers
            </Link>
            <Link
              href="/MathsFormula"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <CgNotes size={25} />
              Math Formula
            </Link>
            <Link
              href="/Cbse-Previosyear-Questions"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <IoNewspaperSharp size={25} />
              CBSE Previous Year Question
            </Link>
            <Link
              href="/ICSE-Previousyear-Questions"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-cyan-500 to-purple-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <FaNoteSticky size={25} />
              ICSE Previous Year Question
            </Link>
          </div>
          <div className="mt-4 flex flex-col gap-4">
            <p></p>
            <p></p>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-full md:w-[25%] font-Poppins">
          <div className="w-full bg-white p-8 ">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Type To Search"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400"
            />
          </div>
          <div className=" bg-white p-5  rounded-lg">
            <FormSection />
          </div>
        </div>
      </div>
      <Sociallinks2 />
      <Footer1 />
      <Footer />
    </div>
  );
};

export default ICSESamplePapers;
