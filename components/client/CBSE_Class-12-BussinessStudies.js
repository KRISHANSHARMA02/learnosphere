"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook, FaCheckCircle, FaGraduationCap } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";
import DownloadFormModal from "@/components/DownloadFormModal";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "1. How many units are there in the CBSE Class 12 Business Studies syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The theory syllabus contains 12 units. Eight units are included in Part A, Principles and Functions of Management, and four units are included in Part B, Business Finance and Marketing."
      }
    },
    {
      "@type": "Question",
      "name": "2. How many marks are assigned to Business Studies in Class 12?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Business Studies carries 100 marks in total. The theory examination is worth 80 marks, while project work carries 20 marks."
      }
    },
    {
      "@type": "Question",
      "name": "3. What is the subject code for CBSE Class 12 Business Studies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CBSE subject code for Business Studies is 054."
      }
    },
    {
      "@type": "Question",
      "name": "4. How are the theory marks distributed in Business Studies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The 80 theory marks are distributed across five groups of units: 16 marks for Units 1 to 3, 14 marks for Units 4 and 5, 20 marks for Units 6 to 8, 15 marks for Units 9 and 10, and 15 marks for Units 11 and 12."
      }
    },
    {
      "@type": "Question",
      "name": "5. Which part carries more marks in Business Studies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Part A, Principles and Functions of Management, carries 50 marks. Part B, Business Finance and Marketing, carries 30 marks."
      }
    },
    {
      "@type": "Question",
      "name": "6. Is Financial Markets included in the Class 12 Business Studies syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Financial Markets is Unit 10 under Part B. It covers financial markets, money and capital markets, primary and secondary markets, stock exchanges, trading procedures, depository services and SEBI."
      }
    }
  ]
};

export const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full px-5 py-4 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-base md:text-lg font-semibold font-Poppins text-gray-900 pr-4">
          {question}
        </span>
        <span className="shrink-0">
          {isOpen ? (
            <FiMinus className="text-orange-600 text-2xl" />
          ) : (
            <FiPlus className="text-gray-500 text-2xl" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 px-5 py-4 text-gray-700 bg-orange-50/40 rounded-xl font-Poppins border border-orange-100 text-left leading-relaxed text-sm md:text-base">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function BusinessStudies12() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [hasDownloaded, setHasDownloaded] = useState(false);

  useEffect(() => {
    const hasFilledForm = sessionStorage.getItem("hasFilledForm") === "true";
    setHasDownloaded(hasFilledForm);
  }, []);

  const handleDownloadClick = async (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    if (!hasDownloaded) {
      setIsModalOpen(true);
    } else {
      await downloadPdf(pdfUrl);
    }
  };

  const downloadPdf = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleFormSubmit = () => {
    setIsModalOpen(false);
    setHasDownloaded(true);
    sessionStorage.setItem("hasFilledForm", "true");
    downloadPdf(selectedPdf);
  };

  const overviewData = [
    { label: "Class", value: "12" },
    { label: "Subject", value: "Business Studies" },
    { label: "Subject code", value: "054" },
    { label: "Total theory units", value: "12" },
    { label: "Total parts", value: "2 (Part A and Part B)" },
    { label: "Theory examination", value: "80 marks" },
    { label: "Project work", value: "20 marks" },
    { label: "Total marks", value: "100" },
    { label: "Theory examination duration", value: "3 hours" }
  ];

  const partAWeightage = [
    { units: "Units 1, 2, 3", name: "Nature and Significance of Management, Principles of Management, Business Environment", marks: 16 },
    { units: "Units 4, 5", name: "Planning, Organising", marks: 14 },
    { units: "Units 6, 7, 8", name: "Staffing, Directing, Controlling", marks: 20 }
  ];

  const partBWeightage = [
    { units: "Units 9, 10", name: "Financial Management, Financial Markets", marks: 15 },
    { units: "Units 11, 12", name: "Marketing Management, Consumer Protection", marks: 15 }
  ];

  const questionCategoryData = [
    { category: "Remembering and Understanding", marks: 32, weightage: "40%" },
    { category: "Applying", marks: 24, weightage: "30%" },
    { category: "Analysing, Evaluating and Creating", marks: 24, weightage: "30%" }
  ];

  const projectMarksData = [
    { item: "Initiative, cooperativeness and participation", marks: 2 },
    { item: "Creativity in presentation", marks: 2 },
    { item: "Content, observation and research work", marks: 4 },
    { item: "Analysis of situations", marks: 4 },
    { item: "Viva", marks: 8 }
  ];

  const checklistData = [
    { unit: "Nature and Significance of Management", understood: "Yes / No", practised: "Yes / No", revision: "Yes / No" },
    { unit: "Principles of Management", understood: "Yes / No", practised: "Yes / No", revision: "Yes / No" },
    { unit: "Business Environment", understood: "Yes / No", practised: "Yes / No", revision: "Yes / No" },
    { unit: "Planning", understood: "Yes / No", practised: "Yes / No", revision: "Yes / No" },
    { unit: "Financial Management", understood: "Yes / No", practised: "Yes / No", revision: "Yes / No" },
    { unit: "Marketing Management", understood: "Yes / No", practised: "Yes / No", revision: "Yes / No" }
  ];

  const faqs = [
    {
      question: "1. How many units are there in the CBSE Class 12 Business Studies syllabus?",
      answer: "The theory syllabus contains 12 units. Eight units are included in Part A, Principles and Functions of Management, and four units are included in Part B, Business Finance and Marketing."
    },
    {
      question: "2. How many marks are assigned to Business Studies in Class 12?",
      answer: "Business Studies carries 100 marks in total. The theory examination is worth 80 marks, while project work carries 20 marks."
    },
    {
      question: "3. What is the subject code for CBSE Class 12 Business Studies?",
      answer: "The CBSE subject code for Business Studies is 054."
    },
    {
      question: "4. How are the theory marks distributed in Business Studies?",
      answer: "The 80 theory marks are distributed across five groups of units: 16 marks for Units 1 to 3, 14 marks for Units 4 and 5, 20 marks for Units 6 to 8, 15 marks for Units 9 and 10, and 15 marks for Units 11 and 12."
    },
    {
      question: "5. Which part carries more marks in Business Studies?",
      answer: "Part A, Principles and Functions of Management, carries 50 marks. Part B, Business Finance and Marketing, carries 30 marks."
    },
    {
      question: "6. Is Financial Markets included in the Class 12 Business Studies syllabus?",
      answer: "Yes. Financial Markets is Unit 10 under Part B. It covers financial markets, money and capital markets, primary and secondary markets, stock exchanges, trading procedures, depository services and SEBI."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-Poppins mt-16 md:mt-20">
        
        {/* Title Header */}
        <div className="text-center mb-8">
          <span className="inline-block px-6 py-2 text-xl md:text-2xl font-extrabold bg-black text-orange-500 rounded-lg shadow-xl shadow-orange-950/20 mb-4">
            Class 12th
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            CBSE Class 12 Business Studies Syllabus: Units, Topics and Marks Distribution
          </h1>
        </div>

        {/* Intro Paragraphs */}
        <div className="flex flex-col gap-4 text-gray-800 leading-relaxed text-base md:text-lg mb-10">
          <p>
            The CBSE Class 12 Business Studies syllabus covers management principles, business operations, financial management, financial markets, marketing and consumer protection. It consists of 12 theory units, divided into two parts, along with one project.
          </p>
          <p>
            Business Studies carries 80 marks for the theory examination and 20 marks for project work, making the total assessment 100 marks. This guide explains the complete unit-wise syllabus, marks distribution, project assessment and preparation methods to help students organise their studies.
          </p>
          <p>
            Students can also explore the{" "}
            <Link href="/CBSE" className="text-orange-600 font-semibold underline hover:text-orange-700">
              CBSE syllabus and study resources on Learnosphere
            </Link>{" "}
            for information about other subjects and classes.
          </p>
          <p className="text-sm md:text-base text-gray-700 italic">
            Use these allocations to organise revision time, but study all prescribed units. The marks assigned to a group do not guarantee that a particular chapter will carry the same number of marks in every examination.
          </p>
        </div>

        {/* Overview Table */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Business Studies Syllabus: Overview
          </h2>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Particular</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {overviewData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                    <td className="px-6 py-3.5 font-medium text-gray-900">{row.label}</td>
                    <td className="px-6 py-3.5 text-gray-700">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Unit-Wise Marks Distribution */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Business Studies Unit-Wise Marks Distribution
          </h2>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Part / Grouped Units</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Units Included</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="bg-orange-100/60 font-bold text-gray-900">
                  <td className="px-6 py-3" colSpan={3}>Part A: Principles and Functions of Management</td>
                </tr>
                {partAWeightage.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                    <td className="px-6 py-3 font-semibold text-gray-900">{row.units}</td>
                    <td className="px-6 py-3 text-gray-700">{row.name}</td>
                    <td className="px-6 py-3 text-right font-medium text-gray-900">{row.marks}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold text-gray-900">
                  <td className="px-6 py-3" colSpan={2}>Total Part A</td>
                  <td className="px-6 py-3 text-right text-gray-900">50</td>
                </tr>
                <tr className="bg-orange-100/60 font-bold text-gray-900">
                  <td className="px-6 py-3" colSpan={3}>Part B: Business Finance and Marketing</td>
                </tr>
                {partBWeightage.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                    <td className="px-6 py-3 font-semibold text-gray-900">{row.units}</td>
                    <td className="px-6 py-3 text-gray-700">{row.name}</td>
                    <td className="px-6 py-3 text-right font-medium text-gray-900">{row.marks}</td>
                  </tr>
                ))}
                <tr className="bg-gray-100 font-semibold text-gray-900">
                  <td className="px-6 py-3" colSpan={2}>Total Part B</td>
                  <td className="px-6 py-3 text-right text-gray-900">30</td>
                </tr>
                <tr className="bg-orange-50/80 font-bold text-gray-900">
                  <td className="px-6 py-3.5" colSpan={2}>Total Theory Marks</td>
                  <td className="px-6 py-3.5 text-right text-orange-600">80</td>
                </tr>
                <tr className="bg-white font-semibold text-gray-900">
                  <td className="px-6 py-3" colSpan={2}>Project Work</td>
                  <td className="px-6 py-3 text-right text-gray-900">20</td>
                </tr>
                <tr className="bg-orange-100 font-bold text-gray-900">
                  <td className="px-6 py-3.5" colSpan={2}>Total Marks</td>
                  <td className="px-6 py-3.5 text-right text-orange-600">100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Complete CBSE Class 12 Business Studies Unit-Wise Syllabus */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            Complete CBSE Class 12 Business Studies Unit-Wise Syllabus
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-8 leading-relaxed">
            The following sections explain all 12 theory units, their main topics and useful ways to approach them during revision.
          </p>

          {/* Part A Header */}
          <div className="mb-10 bg-gradient-to-r from-orange-50 to-amber-50 p-6 md:p-8 rounded-2xl border border-orange-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Part A: Principles and Functions of Management
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Part A introduces the principles of management and explains how businesses plan, organise, staff, direct and control their activities.
            </p>
          </div>

          {/* Unit 1 */}
          <div className="mb-8 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 1: Nature and Significance of Management
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              This unit introduces management, its objectives, importance and role in achieving organisational goals.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Meaning, concept, objectives and importance of management</li>
              <li>Effectiveness and efficiency</li>
              <li>Management as a science, art and profession</li>
              <li>Levels of management: top, middle and lower</li>
              <li>Functions of management: planning, organising, staffing, directing and controlling</li>
              <li>Coordination: concept, characteristics and importance</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Start by understanding the difference between effectiveness and efficiency. For example, effectiveness is about achieving the desired objective, while efficiency focuses on achieving it with the best possible use of resources.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Prepare a comparison table for these concepts and add simple workplace examples. Also understand the responsibilities of different management levels and how the five functions of management work together.
            </p>
          </div>

          {/* Unit 2 */}
          <div className="mb-8 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 2: Principles of Management
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              This unit explains the principles that guide managerial decisions and business activities. It covers the contributions of Henri Fayol and F. W. Taylor.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Principles of management: concept and significance</li>
              <li>Fayol's principles of management</li>
              <li>Taylor's Scientific Management</li>
              <li>Principles of Scientific Management</li>
              <li>Techniques of Scientific Management</li>
              <li>Comparison of the contributions of Fayol and Taylor</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Create a three-column revision table containing the name of each principle or technique, its meaning and a practical example.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              When answering case-based questions, identify the situation or clue first. Then connect it with the relevant principle. Do not select a principle simply because its name appears familiar.
            </p>
          </div>

          {/* Unit 3 */}
          <div className="mb-8 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 3: Business Environment
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              Business Environment explains the external conditions that influence business decisions, opportunities and performance.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Business environment: concept and importance</li>
              <li>Dimensions of business environment:</li>
              <li className="pl-4">Economic environment</li>
              <li className="pl-4">Social environment</li>
              <li className="pl-4">Technological environment</li>
              <li className="pl-4">Political environment</li>
              <li className="pl-4">Legal environment</li>
              <li>Demonetisation: concept and features</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Organise examples under the five dimensions of business environment. For each example, explain how the change could affect a business.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              For case-based questions, identify the external factor described in the situation and connect it with the correct dimension. Practise explaining why that factor affects business decisions.
            </p>
          </div>

          {/* Unit 4 */}
          <div className="mb-8 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 4: Planning
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              Planning involves deciding organisational objectives and selecting the actions required to achieve them.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Planning: concept, importance and limitations</li>
              <li>Steps in the planning process</li>
              <li>Single-use plans and standing plans</li>
              <li>Types of plans:</li>
              <li className="pl-4">Objectives</li>
              <li className="pl-4">Strategy</li>
              <li className="pl-4">Policy</li>
              <li className="pl-4">Procedure</li>
              <li className="pl-4">Method</li>
              <li className="pl-4">Rule</li>
              <li className="pl-4">Budget</li>
              <li className="pl-4">Programme</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Learn the steps of the planning process in their correct sequence. Prepare separate notes for single-use and standing plans.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Use a practical example, such as organising a school event, to understand how objectives, strategies, policies, procedures, methods, rules, budgets and programmes differ from one another.
            </p>
          </div>

          {/* Unit 5 */}
          <div className="mb-8 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 5: Organising
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              Organising explains how work is divided, responsibilities are assigned and authority is established within an organisation.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Organising: concept and importance</li>
              <li>Organising as a structure and as a process</li>
              <li>Steps in the organising process</li>
              <li>Functional and divisional organisational structures</li>
              <li>Advantages, disadvantages and suitability of functional and divisional structures</li>
              <li>Formal and informal organisations</li>
              <li>Advantages and disadvantages of formal and informal organisations</li>
              <li>Delegation: concept, elements and importance</li>
              <li>Decentralisation: concept and importance</li>
              <li>Difference between delegation and decentralisation</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Practise drawing functional and divisional organisational charts. Understand how departments and reporting relationships differ in each structure.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Prepare comparison tables for formal and informal organisations, delegation and decentralisation. Pay attention to authority, responsibility and accountability when studying delegation.
            </p>
          </div>

          {/* Unit 6 */}
          <div className="mb-8 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 6: Staffing
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              Staffing deals with finding, selecting, placing and developing suitable employees for organisational roles.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Staffing: concept and importance</li>
              <li>Staffing as a part of Human Resource Management</li>
              <li>Specialised activities of Human Resource Management</li>
              <li>Staffing process</li>
              <li>Recruitment: meaning and sources</li>
              <li>Internal and external sources of recruitment</li>
              <li>Merits and limitations of internal and external recruitment</li>
              <li>Selection: meaning and process</li>
              <li>Training and development: concept and importance</li>
              <li>On-the-job and off-the-job training</li>
              <li>Induction training</li>
              <li>Vestibule training</li>
              <li>Apprenticeship training</li>
              <li>Internship training</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Learn the staffing process as a sequence and understand the purpose of each stage.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Create separate comparison notes for recruitment and selection, and training and development. Use a hypothetical hiring example to understand how an organisation identifies a vacancy, attracts candidates, selects employees and provides training.
            </p>
          </div>

          {/* Unit 7 */}
          <div className="mb-8 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 7: Directing
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              Directing explains how managers guide, motivate and communicate with employees to achieve organisational objectives.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Directing: concept and importance</li>
              <li>Elements of directing</li>
              <li>Motivation: concept</li>
              <li>Maslow's hierarchy of needs</li>
              <li>Financial and non-financial incentives</li>
              <li>Leadership: concept and styles</li>
              <li>Authoritative, democratic and laissez-faire leadership styles</li>
              <li>Communication: concept and elements</li>
              <li>Formal and informal communication</li>
              <li>Barriers to effective communication</li>
              <li>Measures to overcome communication barriers</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Prepare examples of financial and non-financial incentives. Compare the three leadership styles and understand how they influence employee behaviour.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              For communication, create a table of common barriers and suitable solutions. For example, if employees receive unclear instructions, the solution should address the clarity of the message rather than simply suggesting more communication.
            </p>
          </div>

          {/* Unit 8 */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 8: Controlling
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              Controlling involves measuring actual performance, comparing it with established standards and taking corrective action when necessary.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Controlling: concept and importance</li>
              <li>Relationship between planning and controlling</li>
              <li>Steps in the process of controlling</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Understand the steps of controlling in the correct sequence.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Use a practical example such as a production target. Compare planned production with actual output, identify the deviation, consider its possible causes and suggest corrective action.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Also understand the relationship between planning and controlling. Planning establishes the standards, while controlling checks performance against those standards.
            </p>
          </div>

          {/* Part B Header */}
          <div className="mb-10 bg-gradient-to-r from-orange-50 to-amber-50 p-6 md:p-8 rounded-2xl border border-orange-200">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              Part B: Business Finance and Marketing
            </h3>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Part B covers the financial decisions businesses make, the role of financial markets, marketing activities and consumer protection.
            </p>
          </div>

          {/* Unit 9 */}
          <div className="mb-8 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 9: Financial Management
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              Financial Management explains how businesses plan, arrange and use financial resources to achieve their objectives.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Financial management: concept, role and objectives</li>
              <li>Financial decisions:</li>
              <li className="pl-4">Investment decision</li>
              <li className="pl-4">Financing decision</li>
              <li className="pl-4">Dividend decision</li>
              <li>Factors affecting financial decisions</li>
              <li>Financial planning: concept and importance</li>
              <li>Capital structure: concept and factors affecting capital structure</li>
              <li>Fixed capital: concept and factors affecting fixed capital requirements</li>
              <li>Working capital: concept and factors affecting working capital requirements</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Organise your notes around the three financial decisions: investment, financing and dividend decisions.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              For questions about factors affecting financial decisions, explain how each factor influences the decision. For example, understand how the nature of a business, its scale of operations and its growth plans can influence its financial requirements.
            </p>
          </div>

          {/* Unit 10 */}
          <div className="mb-8 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 10: Financial Markets
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              Financial Markets explains how funds move through financial markets and institutions, connecting investors with organisations that need finance.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Financial markets: concept</li>
              <li>Money market: concept</li>
              <li>Capital market</li>
              <li>Primary and secondary markets</li>
              <li>Differences between money market and capital market</li>
              <li>Differences between primary and secondary markets</li>
              <li>Stock exchange: meaning and functions</li>
              <li>Trading procedure in a stock exchange</li>
              <li>Depository services and demat accounts</li>
              <li>Securities and Exchange Board of India (SEBI): objectives and functions</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Keep financial institutions, market types and trading procedures in separate notes.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Prepare comparison tables for money and capital markets and primary and secondary markets. Draw a simple flow diagram of the trading procedure to understand the sequence of activities involved in buying and selling securities.
            </p>
          </div>

          {/* Unit 11 */}
          <div className="mb-8 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 11: Marketing Management
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              Marketing Management explains how businesses identify customer needs and plan activities to create, price, promote and distribute products and services.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Marketing: concept and features</li>
              <li>Functions of marketing</li>
              <li>Marketing philosophies</li>
              <li>Marketing mix: concept and elements</li>
              <li>Product as an element of the marketing mix</li>
              <li>Branding, labelling and packaging</li>
              <li>Price as an element of the marketing mix</li>
              <li>Factors determining the price of a product</li>
              <li>Physical distribution: concept and components</li>
              <li>Channels of distribution</li>
              <li>Promotion: concept and elements</li>
              <li>Advertising</li>
              <li>Personal selling</li>
              <li>Sales promotion</li>
              <li>Public relations</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Choose a familiar product and use it to understand the marketing mix.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              For example, study how a company decides its product features, packaging, price, distribution channels and promotional activities. Prepare comparison tables for branding, labelling and packaging, as well as the different elements of promotion.
            </p>
          </div>

          {/* Unit 12 */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
              Unit 12: Consumer Protection
            </h4>
            <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
              Consumer Protection explains why consumers need protection and how they can exercise their rights and seek remedies when problems arise.
            </p>
            <div className="font-semibold text-gray-800 text-sm mb-2">Topics covered:</div>
            <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
              <li>Consumer protection: concept and importance</li>
              <li>Consumer Protection Act, 2019</li>
              <li>Meaning of consumer</li>
              <li>Consumer rights</li>
              <li>Consumer responsibilities</li>
              <li>Who can file a consumer complaint?</li>
              <li>Consumer redressal machinery</li>
              <li>Remedies available to consumers</li>
              <li>Consumer awareness</li>
              <li>Role of consumer organisations and Non-Governmental Organisations (NGOs)</li>
            </ul>
            <div className="font-semibold text-gray-900 text-sm mb-1">How to prepare:</div>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Prepare separate notes for consumer rights, responsibilities and remedies.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-2">
              Use hypothetical purchase situations to understand how consumer protection works. For example, consider a defective product or misleading product information and identify the consumer issue, relevant right and possible remedy.
            </p>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Check the prescribed syllabus when using older study materials so that you do not spend time on topics outside the required course.
            </p>
          </div>
        </div>

        {/* Question Paper Design */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Business Studies Question Paper Design
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
            The Business Studies theory examination carries 80 marks and has a duration of three hours.
          </p>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            The question-paper design assesses students across three broad learning categories.
          </p>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Question category</th>
                  <th className="px-6 py-3.5 text-center font-semibold">Marks</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Weightage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {questionCategoryData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                    <td className="px-6 py-3.5 text-gray-900 font-medium">{row.category}</td>
                    <td className="px-6 py-3.5 text-center text-gray-700">{row.marks}</td>
                    <td className="px-6 py-3.5 text-right text-gray-700">{row.weightage}</td>
                  </tr>
                ))}
                <tr className="bg-orange-50/80 font-bold text-gray-900">
                  <td className="px-6 py-3.5">Total</td>
                  <td className="px-6 py-3.5 text-center text-orange-600">80</td>
                  <td className="px-6 py-3.5 text-right text-orange-600">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            This distribution shows that students need more than memorised definitions and textbook explanations. They must also understand business situations, apply management concepts and analyse information.
          </p>
        </div>

        {/* Project Work */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Business Studies Project Work
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
            Project work carries 20 marks and requires students to complete one project from the four prescribed project areas.
          </p>
          <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
            The purpose of project work is to help students connect Business Studies concepts with real business situations. It also develops research, observation, presentation and analytical skills.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
            Project areas
          </h3>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-orange-600 text-base md:text-lg mb-2">
                1. Elements of Business Environment
              </h4>
              <p className="text-gray-700 text-sm md:text-base mb-2">
                This project focuses on changes in the business environment and their effects on business activities.
              </p>
              <p className="text-gray-700 text-sm mb-1 font-medium">Students may study topics such as:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
                <li>Changes in packaging and their economic impact</li>
                <li>Changes in consumer preferences</li>
                <li>The effect of technological developments on business</li>
                <li>Changes in business practices and their reasons</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-orange-600 text-base md:text-lg mb-2">
                2. Principles of Management
              </h4>
              <p className="text-gray-700 text-sm md:text-base mb-2">
                This project involves observing how management principles are applied in an organisation.
              </p>
              <p className="text-gray-700 text-sm mb-1 font-medium">Students may study:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
                <li>Application of Fayol's principles of management</li>
                <li>Application of Taylor's Scientific Management techniques</li>
                <li>Management practices in a department store, industrial unit or other business organisation</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-orange-600 text-base md:text-lg mb-2">
                3. Stock Exchange
              </h4>
              <p className="text-gray-700 text-sm md:text-base mb-2">
                This project helps students understand stock market operations and the factors that influence share prices.
              </p>
              <p className="text-gray-700 text-sm mb-1 font-medium">Students may:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
                <li>Study the role and history of stock exchanges</li>
                <li>Select listed companies for an imaginary investment portfolio</li>
                <li>Record changes in share prices</li>
                <li>Present price movements through graphs</li>
                <li>Analyse possible reasons for changes in market value</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <h4 className="font-bold text-orange-600 text-base md:text-lg mb-2">
                4. Marketing
              </h4>
              <p className="text-gray-700 text-sm md:text-base mb-2">
                This project involves selecting a product and studying how it is marketed.
              </p>
              <p className="text-gray-700 text-sm mb-1 font-medium">Students may examine:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
                <li>Product features and competing brands</li>
                <li>Branding, packaging and labelling</li>
                <li>Pricing decisions</li>
                <li>Distribution channels</li>
                <li>Advertising and other promotional activities</li>
                <li>Target customers and product positioning</li>
              </ul>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
            Project assessment and marks distribution
          </h3>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4 max-w-xl">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Assessment component</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {projectMarksData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                    <td className="px-6 py-3 font-medium text-gray-900">{row.item}</td>
                    <td className="px-6 py-3 text-right font-medium text-gray-700">{row.marks}</td>
                  </tr>
                ))}
                <tr className="bg-orange-50/80 font-bold text-gray-900">
                  <td className="px-6 py-3">Total</td>
                  <td className="px-6 py-3 text-right text-orange-600">20</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
            <p>
              Students should select their project topic with their teacher, collect relevant information, organise their observations and prepare their own analysis. They should also be ready to explain their findings during the viva.
            </p>
            <p>
              A project should demonstrate the student's understanding and research. Copying ready-made material without understanding it does not fulfil the purpose of the assignment.
            </p>
          </div>
        </div>

        {/* How to Prepare */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            How to Prepare for CBSE Class 12 Business Studies
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-8 leading-relaxed">
            Business Studies requires students to understand concepts, remember important terms and apply knowledge to practical business situations. A structured preparation method helps students cover the syllabus and identify topics that need more attention.
          </p>

          <div className="space-y-8 text-gray-800 leading-relaxed text-sm md:text-base">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                1. Divide the syllabus into manageable topics
              </h3>
              <p className="mb-3">
                Start by creating a checklist of all 12 units. Divide each unit into smaller topics and track your progress.
              </p>
              <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4 max-w-2xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                  <thead className="bg-orange-500 text-white">
                    <tr>
                      <th className="px-6 py-3.5 text-left font-semibold">Unit</th>
                      <th className="px-6 py-3.5 text-center font-semibold">Concept understood</th>
                      <th className="px-6 py-3.5 text-center font-semibold">Questions practised</th>
                      <th className="px-6 py-3.5 text-center font-semibold">Needs revision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {checklistData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                        <td className="px-6 py-3 font-medium text-gray-900">{row.unit}</td>
                        <td className="px-6 py-3 text-center text-gray-700">{row.understood}</td>
                        <td className="px-6 py-3 text-center text-gray-700">{row.practised}</td>
                        <td className="px-6 py-3 text-center text-gray-700">{row.revision}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Mark a topic as complete only when you can explain it and answer related questions independently.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                2. Understand concepts instead of memorising entire paragraphs
              </h3>
              <p className="mb-2">
                Begin each topic by understanding its meaning, purpose and practical application.
              </p>
              <p className="mb-2">Follow this process:</p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-gray-700">
                <li>Read the concept carefully.</li>
                <li>Identify its important features, objectives or functions.</li>
                <li>Study the relevant textbook examples.</li>
                <li>Explain the concept without looking at your notes.</li>
                <li>Attempt questions based on the concept.</li>
                <li>Review the points you could not explain correctly.</li>
              </ol>
              <p className="mt-2 text-gray-700">
                For example, while studying Fayol's principles, understand what each principle means and how it can be applied in an organisation. Memorising only the names will not prepare you adequately for application-based questions.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                3. Prepare comparison tables
              </h3>
              <p className="mb-3">
                Several Business Studies concepts are closely related. Comparison tables help you understand their differences and prepare structured answers.
              </p>
              <p className="mb-2">Create separate notes for:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700 mb-3">
                <li>Effectiveness and efficiency</li>
                <li>Formal and informal organisation</li>
                <li>Functional and divisional structures</li>
                <li>Delegation and decentralisation</li>
                <li>Recruitment and selection</li>
                <li>Training and development</li>
                <li>Investment, financing and dividend decisions</li>
                <li>Money market and capital market</li>
                <li>Primary and secondary markets</li>
                <li>Branding, packaging and labelling</li>
                <li>Advertising and personal selling</li>
              </ul>
              <p className="text-gray-700">
                For each comparison, use the same basis of distinction on both sides. Avoid writing two unrelated definitions and calling them a comparison.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                4. Practise case-based questions
              </h3>
              <p className="mb-2">
                Case-based questions require students to identify a Business Studies concept from a practical situation.
              </p>
              <p className="mb-2">Use this approach:</p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-gray-700">
                <li>Read the entire case carefully.</li>
                <li>Identify the important words, actions or problems described.</li>
                <li>Connect the clues with the relevant unit.</li>
                <li>State the correct concept or principle.</li>
                <li>Explain why it applies to the situation.</li>
              </ol>
              <p className="mt-2 text-gray-700">
                For example, if a case describes an employee receiving instructions from two different supervisors, it may relate to Fayol's principle of unity of command. Identify the principle and explain its relevance to the case.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                5. Revise definitions and important terms regularly
              </h3>
              <p className="mb-2">
                Maintain a separate notebook for definitions, principles, features, objectives, functions and processes.
              </p>
              <p className="text-gray-700">
                Organise the notes unit-wise. Use short explanations and clear headings so that you can revise them efficiently. Test yourself by recalling the meaning of each term without looking at the notebook.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                6. Practise writing structured answers
              </h3>
              <p className="mb-2">
                Business Studies answers should directly address the question and follow the marks assigned to it.
              </p>
              <p className="mb-2">For longer answers:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
                <li>Begin with the relevant meaning or concept when required.</li>
                <li>Use separate headings for different points.</li>
                <li>Explain each point clearly.</li>
                <li>Include relevant examples where they improve the explanation.</li>
                <li>Avoid unrelated information and unnecessary repetition.</li>
              </ul>
              <p className="mt-2 text-gray-700">
                A well-organised answer is more useful than a long answer that does not address the question.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                7. Prepare for project work alongside theory
              </h3>
              <p className="mb-2">
                Do not leave project work until the final stage of preparation.
              </p>
              <p className="text-gray-700">
                Discuss the topic with your teacher, plan the research and collect relevant information. Organise your observations and prepare to explain the purpose, findings and conclusions of your project during the viva.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                8. Solve sample papers and review your mistakes
              </h3>
              <p className="mb-2">
                Once you have covered the syllabus, practise complete question papers under timed conditions.
              </p>
              <p className="mb-2">After attempting a paper:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
                <li>Check your answers against the marking scheme.</li>
                <li>Identify concepts you misunderstood.</li>
                <li>Review incomplete explanations.</li>
                <li>Practise questions where you struggled to apply a concept.</li>
                <li>Reattempt incorrect questions after revising the relevant unit.</li>
              </ul>
              <p className="mt-2 text-gray-700">
                Use official sample papers to understand the examination format. Do not assume that questions from previous papers or predicted question lists will necessarily appear again.
              </p>
            </div>
          </div>
        </div>

        {/* Official Syllabus and Sample Papers */}
        <div className="mb-14 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 md:p-8 rounded-2xl border border-orange-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
            Official CBSE Class 12 Business Studies Syllabus and Sample Papers
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            Students should refer to the official CBSE Academic website for the prescribed syllabus, course structure, project instructions and examination resources.
          </p>
          <div className="bg-white p-5 rounded-xl border border-orange-200 shadow-sm mb-4">
            <h4 className="font-bold text-gray-900 text-base md:text-lg mb-2">
              Useful resources include:
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-sm md:text-base text-gray-700 pl-2">
              <li>CBSE Academic curriculum portal</li>
              <li>CBSE Academic website</li>
              <li>CBSE sample question papers and marking schemes</li>
            </ul>
          </div>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Use the official curriculum document as the final reference for the prescribed topics. If CBSE revises the syllabus, compare the updated document with your study material before beginning or continuing revision.
          </p>
        </div>

        {/* Explore More CBSE Study Resources */}
        <div className="mb-14 bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
            Explore More CBSE Study Resources
          </h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Students preparing for board examinations can explore the{" "}
            <Link href="/CBSE" className="text-orange-600 font-semibold underline hover:text-orange-700">
              CBSE syllabus and study resources on Learnosphere
            </Link>{" "}
            to find syllabus information for other classes and subjects.
          </p>
        </div>

        {/* FAQs */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Frequently Asked Questions About CBSE Class 12 Business Studies
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>

      </div>

      <DownloadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />

      <Footer1 />
      <Footer />
    </div>
  );
}
