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
import FAQAccordion from "@/components/FAQAccordion";

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

  const faqs = [
    {
      question: "Where can I find ICSE sample papers?",
      answer: "You can explore the class-wise links on this page to access the available ICSE Maths sample papers for Classes 8, 9 and 10."
    },
    {
      question: "Are ICSE sample papers available for Class 8?",
      answer: "Yes. The ICSE Class 8 section provides links to the available Maths sample paper sets."
    },
    {
      question: "Where can I find ICSE Class 9 sample papers?",
      answer: "Visit the ICSE Class 9 Maths section on this page to access the available question papers and practice resources."
    },
    {
      question: "Where can I find ICSE Class 10 sample papers?",
      answer: "You can use the Class 10 link to explore the available ICSE Maths sample papers and practice material."
    },
    {
      question: "Do sample papers help with ICSE exam preparation?",
      answer: "Sample papers provide question-solving practice and help students assess their understanding, identify weak topics and improve time management."
    },
    {
      question: "What is the difference between an ICSE sample paper and a previous-year question paper?",
      answer: "A sample paper is created for practice, whereas a previous-year question paper comes from an examination conducted in an earlier year. Check the document's source and description to identify its type."
    }
  ];

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-4 mt-24 px-4 md:px-8 xl:px-20">
        <div className="font-Poppins w-full md:w-[75%]">
          <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4"></div>
          
          <div>
            <h1 className="text-[1.2em] md:text-[1.6em] font-bold text-gray-900">
              ICSE Sample Papers for Classes 8 to 10
            </h1>
          </div>

          <div className="flex flex-col gap-4 text-gray-950 mt-4 leading-relaxed">
            <p>
              Preparing for ICSE examinations requires regular practice, a clear understanding of concepts and familiarity with different question types. Sample papers help students apply what they have learned, assess their preparation and identify topics that need more attention.
            </p>
            <p>
              Learnosphere provides class-wise ICSE Maths sample papers for Classes 8, 9 and 10. Students can select their class to explore the available question papers and practice sets.
            </p>
          </div>

          {/* Class 8 */}
          <div className="mt-8">
            <h2 className="font-semibold text-[1.1em] md:text-[1.4em] text-gray-900">
              ICSE Sample Papers for Class 8
            </h2>
            <div className="flex flex-col gap-4 text-gray-950 mt-3 leading-relaxed">
              <p>
                ICSE Class 8 students can use Maths sample papers to practise calculations, understand question patterns and strengthen their understanding of mathematical concepts.
              </p>
              <p>
                Attempt the available practice sets independently before checking any provided solutions. Reviewing incorrect answers can help identify topics that require additional revision.
              </p>
              <div className="mt-1">
                <Link
                  href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-8-Maths"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-[0.95em] md:text-[1.05em] transition-colors"
                >
                  <span>Explore: ICSE Class 8 Maths Sample Papers</span>
                  <HiArrowRightCircle size={22} className="text-orange-600" />
                </Link>
              </div>
            </div>
          </div>

          {/* Class 9 */}
          <div className="mt-8">
            <h2 className="font-semibold text-[1.1em] md:text-[1.4em] text-gray-900">
              ICSE Sample Papers for Class 9
            </h2>
            <div className="flex flex-col gap-4 text-gray-950 mt-3 leading-relaxed">
              <p>
                Class 9 is an important stage for developing a strong understanding of concepts that students will continue using in higher classes. Practising Maths sample papers can help students improve accuracy and become more comfortable solving different types of questions.
              </p>
              <p>
                Use the available question papers to practise independently, manage your time and review mistakes. Check the paper&apos;s year and description before using it for examination preparation.
              </p>
              <div className="mt-1">
                <Link
                  href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-9-Maths"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-[0.95em] md:text-[1.05em] transition-colors"
                >
                  <span>Explore: ICSE Class 9 Maths Sample Papers</span>
                  <HiArrowRightCircle size={22} className="text-orange-600" />
                </Link>
              </div>
            </div>
          </div>

          {/* Class 10 */}
          <div className="mt-8">
            <h2 className="font-semibold text-[1.1em] md:text-[1.4em] text-gray-900">
              ICSE Sample Papers for Class 10
            </h2>
            <div className="flex flex-col gap-4 text-gray-950 mt-3 leading-relaxed">
              <p>
                ICSE Class 10 students can use sample papers to assess their preparation and practise solving questions within a set time. Regular practice also helps students identify weak areas before their board examinations.
              </p>
              <p>
                Try to complete each paper without referring to notes. After finishing, review your answers and revisit the topics where you made mistakes.
              </p>
              <div className="mt-1">
                <Link
                  href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-10-Maths"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-[0.95em] md:text-[1.05em] transition-colors"
                >
                  <span>Explore: ICSE Class 10 Maths Sample Papers</span>
                  <HiArrowRightCircle size={22} className="text-orange-600" />
                </Link>
              </div>
            </div>
          </div>

          {/* Class-wise Quick Links Container */}
          <div className="bg-gray-50 p-4 rounded-lg mt-8 border border-gray-200">
            <h3 className="text-[1.1em] md:text-[1.2em] font-semibold text-gray-800 mb-2">
              Class-wise ICSE Maths Sample Papers
            </h3>
            <div className="flex flex-col">
              <Link
                href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-8-Maths"
                className="text-blue-600 border-b border-gray-200 py-3 font-semibold flex justify-between items-center hover:text-blue-800 transition-colors"
              >
                <span>ICSE Sample Papers For Class 8th Maths</span>
                <HiArrowRightCircle size={24} className="text-orange-600" />
              </Link>
              <Link
                href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-9-Maths"
                className="text-blue-600 border-b border-gray-200 py-3 font-semibold flex justify-between items-center hover:text-blue-800 transition-colors"
              >
                <span>ICSE Sample Papers For Class 9th Maths</span>
                <HiArrowRightCircle size={24} className="text-orange-600" />
              </Link>
              <Link
                href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-10-Maths"
                className="text-blue-600 py-3 font-semibold flex justify-between items-center hover:text-blue-800 transition-colors"
              >
                <span>ICSE Sample Papers For Class 10th Maths</span>
                <HiArrowRightCircle size={24} className="text-orange-600" />
              </Link>
            </div>
          </div>

          {/* How to Prepare */}
          <div className="mt-8">
            <h2 className="font-semibold text-[1.1em] md:text-[1.4em] text-gray-900">
              How to Prepare for ICSE Examinations Using Sample Papers
            </h2>
            <p className="text-gray-950 mt-3 leading-relaxed">
              Solving sample papers without reviewing your mistakes is not an effective preparation strategy. Follow a structured approach:
            </p>
            <div className="mt-3">
              <ol className="text-gray-800 flex flex-col gap-2 list-decimal px-6 md:px-8 leading-relaxed">
                <li>
                  <span className="font-semibold">Revise the syllabus:</span> Understand the topics covered in your class before attempting a complete paper.
                </li>
                <li>
                  <span className="font-semibold">Practise regularly:</span> Set aside time to solve questions and improve your understanding.
                </li>
                <li>
                  <span className="font-semibold">Follow the time limit:</span> Attempt full-length papers under timed conditions when the paper is designed for that purpose.
                </li>
                <li>
                  <span className="font-semibold">Check your answers:</span> Use available solutions to identify incorrect answers and understand the correct approach.
                </li>
                <li>
                  <span className="font-semibold">Identify weak topics:</span> Make a list of topics where you repeatedly make mistakes.
                </li>
                <li>
                  <span className="font-semibold">Practise again:</span> Revise those topics and solve additional questions to improve accuracy.
                </li>
              </ol>
            </div>
          </div>

          {/* Sample Papers, Model Papers and Previous-Year Question Papers */}
          <div className="mt-8">
            <h2 className="font-semibold text-[1.1em] md:text-[1.4em] text-gray-900">
              Sample Papers, Model Papers and Previous-Year Question Papers
            </h2>
            <p className="text-gray-950 mt-3 leading-relaxed">
              Students may come across different types of question papers while preparing for ICSE examinations. Understanding the difference helps them choose the right practice material.
            </p>
            <div className="mt-3">
              <ul className="text-gray-800 flex flex-col gap-2 list-disc px-6 md:px-8 leading-relaxed">
                <li>
                  <span className="font-semibold">Sample papers:</span> Practice papers designed to help students prepare for examinations.
                </li>
                <li>
                  <span className="font-semibold">Model papers:</span> Practice papers created to provide additional question-solving experience.
                </li>
                <li>
                  <span className="font-semibold">Previous-year question papers:</span> Papers from examinations conducted in earlier years.
                </li>
                <li>
                  <span className="font-semibold">Specimen papers:</span> Examination-format papers published by the examination board. Always check the issuing authority and examination year.
                </li>
              </ul>
            </div>
            <p className="text-gray-950 mt-4 leading-relaxed font-medium">
              Check the title and source of each document before treating it as an official ICSE examination paper.
            </p>
          </div>

          {/* Frequently Asked Questions */}
          <div className="mt-8">
            <FAQAccordion faqs={faqs} title="Frequently Asked Questions" />
          </div>

          {/* Related Links */}
          <div className="mt-8">
            <h3 className="text-[1.2em] md:text-[1.4em] font-semibold text-gray-900">
              CBSE & ICSE Sample Papers and Previous Year Question Papers
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[.7em] md:text-[1em] mt-4 mb-8">
            <Link
              href="/CBSE-Sample-Papers"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-purple-400 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center shadow hover:opacity-95 transition-opacity"
            >
              <GrNotes size={25} />
              CBSE Sample Papers
            </Link>
            <Link
              href="/MathsFormula"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 gap-4 font-bold rounded-lg text-center shadow hover:opacity-95 transition-opacity"
            >
              <CgNotes size={25} />
              Math Formula
            </Link>
            <Link
              href="/Cbse-Previosyear-Questions"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center shadow hover:opacity-95 transition-opacity"
            >
              <IoNewspaperSharp size={25} />
              CBSE Previous Year Question
            </Link>
            <Link
              href="/ICSE-Previousyear-Questions"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-cyan-500 to-purple-400 text-white p-4 gap-4 font-bold rounded-lg text-center shadow hover:opacity-95 transition-opacity"
            >
              <FaNoteSticky size={25} />
              ICSE Previous Year Question
            </Link>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-5 w-full md:w-[25%] font-Poppins">
          <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Type To Search"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="placeholder:text-gray-500 p-3 w-full rounded-md border border-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
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
