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
      "name": "1. How many chapters are there in CBSE Class 12 Maths?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CBSE Class 12 Mathematics syllabus contains 13 chapters divided into six units: Relations and Functions, Algebra, Calculus, Vectors and Three-Dimensional Geometry, Linear Programming, and Probability."
      }
    },
    {
      "@type": "Question",
      "name": "2. How many marks is the Class 12 Maths board examination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Mathematics theory examination carries 80 marks, and internal assessment carries 20 marks. The total subject score is 100 marks."
      }
    },
    {
      "@type": "Question",
      "name": "3. Which unit has the highest weightage in Class 12 Maths?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Calculus has the highest unit-wise weightage, carrying 35 marks out of the 80-mark theory paper."
      }
    },
    {
      "@type": "Question",
      "name": "4. Does CBSE provide fixed chapter-wise weightage for Class 12 Maths?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. CBSE provides unit-wise marks distribution but does not prescribe fixed marks for individual chapters. Students should prepare all chapters rather than depend on chapter-wise predictions."
      }
    },
    {
      "@type": "Question",
      "name": "5. What is the duration of the Class 12 Maths examination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Mathematics theory examination is three hours long."
      }
    },
    {
      "@type": "Question",
      "name": "6. How can I prepare for Class 12 Maths effectively?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Start by understanding the complete syllabus, build concepts chapter by chapter, practise questions independently, maintain a formula notebook, review mistakes and solve sample papers under timed conditions."
      }
    },
    {
      "@type": "Question",
      "name": "7. Are sample papers useful for Class 12 Maths preparation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Sample papers help students understand the examination format, practise different question types and improve time management. Checking answers against the marking scheme also helps identify mistakes."
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

export default function Math12() {
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
    { label: "Board", value: "Central Board of Secondary Education (CBSE)" },
    { label: "Class", value: "12" },
    { label: "Subject", value: "Mathematics" },
    { label: "Subject code", value: "041" },
    { label: "Total chapters", value: "13" },
    { label: "Total units", value: "6" },
    { label: "Theory examination", value: "80 marks" },
    { label: "Internal assessment", value: "20 marks" },
    { label: "Total marks", value: "100" },
    { label: "Examination duration", value: "3 hours" }
  ];

  const unitWeightage = [
    { unit: "Unit I", name: "Relations and Functions", marks: 8 },
    { unit: "Unit II", name: "Algebra", marks: 10 },
    { unit: "Unit III", name: "Calculus", marks: 35 },
    { unit: "Unit IV", name: "Vectors and Three-Dimensional Geometry", marks: 14 },
    { unit: "Unit V", name: "Linear Programming", marks: 5 },
    { unit: "Unit VI", name: "Probability", marks: 8 }
  ];

  const questionCategoryData = [
    { category: "Remembering and Understanding", marks: 44, weightage: "55%" },
    { category: "Applying", marks: 20, weightage: "25%" },
    { category: "Analysing, Evaluating and Creating", marks: 16, weightage: "20%" }
  ];

  const internalAssessmentData = [
    { component: "Periodic tests", marks: 10 },
    { component: "Mathematics activities", marks: 10 }
  ];

  const activityAssessmentData = [
    { item: "Activities performed and record keeping", marks: 5 },
    { item: "Year-end activity test", marks: 3 },
    { item: "Viva-voce", marks: 2 }
  ];

  const progressTrackerData = [
    { chapter: "Matrices", level: "Good", action: "Practise mixed questions" },
    { chapter: "Continuity and Differentiability", level: "Needs revision", action: "Review concepts and examples" },
    { chapter: "Integrals", level: "Difficult", action: "Practise standard methods" },
    { chapter: "Probability", level: "Good", action: "Solve application-based questions" }
  ];

  const errorLogData = [
    { type: "Concept gap", meaning: "The underlying concept is unclear", action: "Review the topic" },
    { type: "Method confusion", meaning: "You do not know which method to apply", action: "Practise similar questions" },
    { type: "Calculation error", meaning: "An algebraic or arithmetic step is incorrect", action: "Check calculations carefully" },
    { type: "Reading error", meaning: "You misunderstood the question", action: "Read the question again before solving" },
    { type: "Time pressure", meaning: "You could not complete the question in time", action: "Practise timed exercises" }
  ];

  const studyRoutineData = [
    { activity: "Recall previously studied formulas and concepts", time: "15 minutes" },
    { activity: "Learn or revise a topic", time: "40 minutes" },
    { activity: "Solve questions independently", time: "45 minutes" },
    { activity: "Review mistakes and update the error log", time: "20 minutes" }
  ];

  const faqs = [
    {
      question: "1. How many chapters are there in CBSE Class 12 Maths?",
      answer: "The CBSE Class 12 Mathematics syllabus contains 13 chapters divided into six units: Relations and Functions, Algebra, Calculus, Vectors and Three-Dimensional Geometry, Linear Programming, and Probability."
    },
    {
      question: "2. How many marks is the Class 12 Maths board examination?",
      answer: "The Mathematics theory examination carries 80 marks, and internal assessment carries 20 marks. The total subject score is 100 marks."
    },
    {
      question: "3. Which unit has the highest weightage in Class 12 Maths?",
      answer: "Calculus has the highest unit-wise weightage, carrying 35 marks out of the 80-mark theory paper."
    },
    {
      question: "4. Does CBSE provide fixed chapter-wise weightage for Class 12 Maths?",
      answer: "No. CBSE provides unit-wise marks distribution but does not prescribe fixed marks for individual chapters. Students should prepare all chapters rather than depend on chapter-wise predictions."
    },
    {
      question: "5. What is the duration of the Class 12 Maths examination?",
      answer: "The Mathematics theory examination is three hours long."
    },
    {
      question: "6. How can I prepare for Class 12 Maths effectively?",
      answer: "Start by understanding the complete syllabus, build concepts chapter by chapter, practise questions independently, maintain a formula notebook, review mistakes and solve sample papers under timed conditions."
    },
    {
      question: "7. Are sample papers useful for Class 12 Maths preparation?",
      answer: "Yes. Sample papers help students understand the examination format, practise different question types and improve time management. Checking answers against the marking scheme also helps identify mistakes."
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
            CBSE Class 12 Maths Syllabus: Chapters, Topics and Marks Distribution
          </h1>
        </div>

        {/* Intro Paragraphs */}
        <div className="flex flex-col gap-4 text-gray-800 leading-relaxed text-base md:text-lg mb-10">
          <p>
            The CBSE Class 12 Mathematics syllabus covers six units: Relations and Functions, Algebra, Calculus, Vectors and Three-Dimensional Geometry, Linear Programming, and Probability. Understanding the syllabus helps students identify the topics they need to study, organise their revision and prepare for the board examination.
          </p>
          <p>
            The Mathematics subject (Code 041) includes 13 chapters. The theory examination carries 80 marks, while internal assessment contributes 20 marks. This guide explains the complete chapter-wise syllabus, unit-wise marks distribution, examination pattern and practical ways to prepare for Class 12 Maths.
          </p>
          <p>
            Students can also explore the{" "}
            <Link href="/CBSE" className="text-orange-600 font-semibold underline hover:text-orange-700">
              CBSE syllabus and study resources
            </Link>{" "}
            for other subjects and classes.
          </p>
        </div>

        {/* Table 1: Course Overview */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Maths Syllabus: Overview
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
          <p className="mt-4 text-gray-700 text-sm md:text-base leading-relaxed">
            The syllabus includes algebraic concepts, functions, calculus, vectors, three-dimensional geometry, optimisation and probability. Students should study every prescribed chapter because CBSE does not specify a fixed chapter-wise marks distribution.
          </p>
        </div>

        {/* Table 2: Unit-Wise Marks Distribution */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Maths Unit-Wise Marks Distribution
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            The theory paper carries 80 marks, divided across six units. The following table shows the official unit-wise weightage.
          </p>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Unit</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Topics</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {unitWeightage.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                    <td className="px-6 py-3.5 font-semibold text-gray-900">{row.unit}</td>
                    <td className="px-6 py-3.5 text-gray-700">{row.name}</td>
                    <td className="px-6 py-3.5 text-right font-medium text-gray-900">{row.marks}</td>
                  </tr>
                ))}
                <tr className="bg-orange-50/80 font-bold text-gray-900">
                  <td className="px-6 py-3.5" colSpan={2}>Total</td>
                  <td className="px-6 py-3.5 text-right text-orange-600">80</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
            <p>
              Calculus has the highest unit-wise weightage, followed by Vectors and Three-Dimensional Geometry. However, students should not prepare only the units with higher marks. All six units are part of the prescribed syllabus, and the examination can include questions from different chapters.
            </p>
            <p className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg text-amber-900 font-medium">
              Important: CBSE provides unit-wise weightage, not guaranteed marks for individual chapters. The marks assigned to a particular chapter may vary across question paper sets.
            </p>
          </div>
        </div>

        {/* Complete CBSE Class 12 Maths Chapter-Wise Syllabus */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            Complete CBSE Class 12 Maths Chapter-Wise Syllabus
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-8 leading-relaxed">
            The Class 12 Mathematics syllabus contains 13 chapters. Below is a chapter-wise overview of the main concepts students need to study.
          </p>

          {/* Unit I */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit I
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit I: Relations and Functions
            </h3>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 1: Relations and Functions
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter introduces different types of relations and functions and explains how they are classified.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Types of relations: reflexive, symmetric, transitive and equivalence relations</li>
                  <li>One-to-one functions</li>
                  <li>Onto functions</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 2: Inverse Trigonometric Functions
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter focuses on inverse trigonometric functions, their properties and graphical representation.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Definition of inverse trigonometric functions</li>
                  <li>Domain and range</li>
                  <li>Principal value branches</li>
                  <li>Graphs of inverse trigonometric functions</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Unit II */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit II
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit II: Algebra
            </h3>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 3: Matrices
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  Matrices are rectangular arrangements of numbers used in mathematical operations and solving systems of linear equations.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Concept, notation and order of matrices</li>
                  <li>Equality of matrices</li>
                  <li>Types of matrices</li>
                  <li>Zero and identity matrices</li>
                  <li>Transpose of a matrix</li>
                  <li>Symmetric and skew-symmetric matrices</li>
                  <li>Addition and multiplication of matrices</li>
                  <li>Scalar multiplication</li>
                  <li>Properties of matrix operations</li>
                  <li>Invertible matrices and uniqueness of the inverse</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 4: Determinants
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter covers determinants and their applications in solving mathematical problems.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Determinants of square matrices up to order 3 × 3</li>
                  <li>Minors and cofactors</li>
                  <li>Applications of determinants in finding the area of a triangle</li>
                  <li>Adjoint and inverse of a square matrix</li>
                  <li>Consistency and inconsistency of systems of linear equations</li>
                  <li>Solving systems of linear equations in two or three variables using the inverse of a matrix</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Unit III */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit III
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
              Unit III: Calculus
            </h3>
            <p className="text-gray-700 text-sm md:text-base mb-6 leading-relaxed">
              Calculus carries the highest unit-wise weightage in the Class 12 Mathematics theory paper. It includes five chapters covering differentiation, integration and differential equations.
            </p>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 5: Continuity and Differentiability
                </h4>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Continuity and differentiability</li>
                  <li>Chain rule and derivatives of composite functions</li>
                  <li>Derivatives of inverse trigonometric functions</li>
                  <li>Derivatives of implicit functions</li>
                  <li>Exponential and logarithmic functions</li>
                  <li>Logarithmic differentiation</li>
                  <li>Derivatives of functions in parametric form</li>
                  <li>Second-order derivatives</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 6: Applications of Derivatives
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter explains how derivatives are used to study the behaviour and changes of functions.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Rate of change of quantities</li>
                  <li>Increasing and decreasing functions</li>
                  <li>Maxima and minima</li>
                  <li>First derivative test</li>
                  <li>Second derivative test</li>
                  <li>Problems based on real-life applications</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 7: Integrals
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  Integration is introduced as the inverse process of differentiation. Students learn different integration techniques and their applications.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Integration by substitution</li>
                  <li>Integration using partial fractions</li>
                  <li>Integration by parts</li>
                  <li>Integration of standard algebraic and trigonometric forms</li>
                  <li>Definite integrals</li>
                  <li>Fundamental Theorem of Calculus</li>
                  <li>Properties of definite integrals</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 8: Applications of Integrals
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter focuses on using integration to calculate areas under curves.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Area under simple curves</li>
                  <li>Area bounded by lines</li>
                  <li>Area involving circles</li>
                  <li>Area involving parabolas and ellipses in standard form</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 9: Differential Equations
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  Differential equations describe relationships involving a function and its derivatives.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Definition of differential equations</li>
                  <li>Order and degree</li>
                  <li>General and particular solutions</li>
                  <li>Differential equations by separation of variables</li>
                  <li>Homogeneous differential equations of first order and first degree</li>
                  <li>Linear differential equations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Unit IV */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit IV
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit IV: Vectors and Three-Dimensional Geometry
            </h3>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 10: Vector Algebra
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter introduces vectors, their properties and mathematical operations.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Scalars and vectors</li>
                  <li>Magnitude and direction of a vector</li>
                  <li>Direction ratios and direction cosines</li>
                  <li>Types of vectors</li>
                  <li>Position vectors</li>
                  <li>Addition and subtraction of vectors</li>
                  <li>Multiplication of a vector by a scalar</li>
                  <li>Section formula for vectors</li>
                  <li>Scalar (dot) product</li>
                  <li>Vector (cross) product</li>
                  <li>Properties and applications of vector products</li>
                </ul>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 11: Three-Dimensional Geometry
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter covers the position and direction of lines in three-dimensional space.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                  <li>Direction cosines and direction ratios of a line</li>
                  <li>Cartesian equation of a line</li>
                  <li>Vector equation of a line</li>
                  <li>Angle between two lines</li>
                  <li>Skew lines</li>
                  <li>Shortest distance between two lines</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Unit V */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit V
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit V: Linear Programming
            </h3>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                Chapter 12: Linear Programming
              </h4>
              <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                Linear programming deals with finding the best possible outcome under a given set of constraints.
              </p>
              <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                <li>Introduction to linear programming</li>
                <li>Constraints and objective functions</li>
                <li>Optimisation</li>
                <li>Graphical method of solving problems in two variables</li>
                <li>Feasible and infeasible regions</li>
                <li>Bounded and unbounded regions</li>
                <li>Feasible and infeasible solutions</li>
                <li>Optimal feasible solutions</li>
              </ul>
            </div>
          </div>

          {/* Unit VI */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit VI
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit VI: Probability
            </h3>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                Chapter 13: Probability
              </h4>
              <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                This chapter develops an understanding of conditional probability and the relationships between different events.
              </p>
              <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2">
                <li>Conditional probability</li>
                <li>Multiplication theorem of probability</li>
                <li>Independent events</li>
                <li>Total probability</li>
                <li>Bayes' theorem</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Table 3: Exam Pattern */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Maths Exam Pattern
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
            The Mathematics theory examination is conducted for 80 marks and has a duration of three hours. The question paper assesses conceptual understanding, application of mathematical methods and problem-solving skills.
          </p>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            The official question-paper design distributes marks across three broad categories.
          </p>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200">
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
          <div className="mt-4 space-y-3 text-gray-700 text-sm md:text-base leading-relaxed">
            <p>
              The paper does not have an overall choice. However, internal choices are provided in the sections, amounting to 33% as specified by CBSE.
            </p>
            <p>
              Students should practise different types of questions rather than preparing only direct formula-based problems. Understanding the method behind a solution is important for handling application-based and analytical questions.
            </p>
          </div>
        </div>

        {/* Table 4: Internal Assessment */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Maths Internal Assessment
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            Internal assessment contributes 20 marks to the total Mathematics score.
          </p>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-6">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Assessment component</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {internalAssessmentData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                    <td className="px-6 py-3.5 text-gray-900 font-medium">{row.component}</td>
                    <td className="px-6 py-3.5 text-right font-medium text-gray-700">{row.marks}</td>
                  </tr>
                ))}
                <tr className="bg-orange-50/80 font-bold text-gray-900">
                  <td className="px-6 py-3.5">Total</td>
                  <td className="px-6 py-3.5 text-right text-orange-600">20</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Periodic Tests</h3>
              <p>
                Schools conduct three periodic tests during the academic year. The best two tests are considered, and their average contributes to the 10 marks allocated to periodic tests.
              </p>
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Mathematics Activities</h3>
              <p className="mb-4">
                Students complete mathematics activities throughout the year. The assessment includes:
              </p>
              <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4 max-w-xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                  <thead className="bg-orange-500 text-white">
                    <tr>
                      <th className="px-6 py-3.5 text-left font-semibold">Activity assessment</th>
                      <th className="px-6 py-3.5 text-right font-semibold">Marks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {activityAssessmentData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                        <td className="px-6 py-3 font-medium text-gray-900">{row.item}</td>
                        <td className="px-6 py-3 text-right text-gray-700">{row.marks}</td>
                      </tr>
                    ))}
                    <tr className="bg-orange-50/80 font-bold text-gray-900">
                      <td className="px-6 py-3">Total</td>
                      <td className="px-6 py-3 text-right text-orange-600">10</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Students should complete their assigned activities and maintain the required records instead of leaving internal assessment work until the end of the academic year.
              </p>
            </div>
          </div>
        </div>

        {/* How to Prepare for CBSE Class 12 Maths */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            How to Prepare for CBSE Class 12 Maths
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            Preparing for Class 12 Mathematics requires more than memorising formulas. Students need to understand concepts, practise different question types and review their mistakes regularly.
          </p>
          <p className="text-gray-700 text-sm md:text-base mb-8 leading-relaxed">
            The following methods can help organise preparation.
          </p>

          <div className="space-y-8 text-gray-800 leading-relaxed text-sm md:text-base">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                1. Understand the Syllabus Before Starting
              </h3>
              <p className="mb-3">
                Start by reviewing all six units and 13 chapters. Identify the topics you already understand and the areas that need more practice.
              </p>
              <p className="mb-4">You can create a simple progress tracker:</p>
              <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4 max-w-2xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                  <thead className="bg-orange-500 text-white">
                    <tr>
                      <th className="px-6 py-3.5 text-left font-semibold">Chapter or topic</th>
                      <th className="px-6 py-3.5 text-left font-semibold">Current level</th>
                      <th className="px-6 py-3.5 text-left font-semibold">Next action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {progressTrackerData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                        <td className="px-6 py-3 font-medium text-gray-900">{row.chapter}</td>
                        <td className="px-6 py-3 text-gray-700">{row.level}</td>
                        <td className="px-6 py-3 text-gray-700">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Update the tracker as you complete chapters. This makes it easier to identify unfinished topics and plan revision.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                2. Understand Concepts Before Solving Difficult Questions
              </h3>
              <p className="mb-2">
                Do not start with difficult questions before understanding the underlying concept.
              </p>
              <p className="mb-2">For each topic:</p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-gray-700">
                <li>Read the concept and understand the definitions.</li>
                <li>Study the relevant formulas and conditions.</li>
                <li>Work through solved examples.</li>
                <li>Try similar questions without looking at the solutions.</li>
                <li>Move to more challenging problems once the basic method is clear.</li>
              </ol>
              <p className="mt-2 text-gray-700">
                For example, before solving application-based questions on maxima and minima, understand the relationship between derivatives, increasing and decreasing functions, and turning points.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                3. Practise Questions Independently
              </h3>
              <p className="mb-3">
                Reading a solved example does not mean you can solve the question independently.
              </p>
              <p className="mb-3">
                After studying an example, close the solution and attempt the same question yourself. If you get stuck, identify the exact step you do not understand instead of immediately checking the complete answer.
              </p>
              <p className="mb-2">Practise a mixture of:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
                <li>Basic questions to strengthen concepts</li>
                <li>Standard textbook exercises</li>
                <li>Application-based questions</li>
                <li>Higher-order thinking questions</li>
                <li>Questions from previous board examinations</li>
              </ul>
              <p className="mt-2 text-gray-700">
                Regular independent practice helps improve accuracy and reduces dependence on memorised solutions.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                4. Maintain a Maths Formula Notebook
              </h3>
              <p className="mb-3">
                Create a separate notebook for important formulas, identities, properties and mathematical conditions.
              </p>
              <p className="mb-3">
                Organise it chapter-wise so that you can find formulas quickly during revision.
              </p>
              <p className="mb-2">For each formula, record:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
                <li>The formula itself</li>
                <li>The conditions under which it applies</li>
                <li>A short example showing how to use it</li>
                <li>Common mistakes to avoid</li>
              </ul>
              <p className="mt-3 text-gray-700">
                For example, while recording integration formulas, also note the conditions and substitutions needed to apply them correctly.
              </p>
              <p className="mt-2 text-gray-700">
                Revise this notebook regularly. Writing a formula once and never revisiting it will not improve recall.
              </p>
              <p className="mt-2 text-gray-700">
                Students can also use{" "}
                <Link href="/MathsFormula" className="text-orange-600 font-semibold underline hover:text-orange-700">
                  Maths formulas for Classes 6 to 12
                </Link>{" "}
                as an additional revision resource.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                5. Maintain an Error Log
              </h3>
              <p className="mb-3">
                An error log helps you understand why you lose marks and which concepts require more attention.
              </p>
              <p className="mb-4">Whenever you make a mistake, record the question and classify the error.</p>
              <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4">
                <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                  <thead className="bg-orange-500 text-white">
                    <tr>
                      <th className="px-6 py-3.5 text-left font-semibold">Error type</th>
                      <th className="px-6 py-3.5 text-left font-semibold">What it means</th>
                      <th className="px-6 py-3.5 text-left font-semibold">What to do</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {errorLogData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                        <td className="px-6 py-3 font-semibold text-gray-900">{row.type}</td>
                        <td className="px-6 py-3 text-gray-700">{row.meaning}</td>
                        <td className="px-6 py-3 text-gray-700">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Revisit your error log during revision. Re-solving questions you previously got wrong is more useful than repeatedly attempting only the questions you already know.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                6. Follow a Balanced Study Routine
              </h3>
              <p className="mb-3">
                A useful study routine should include learning, practice and revision. Spending the entire study session reading solutions is not sufficient.
              </p>
              <p className="mb-4">You can organise a study session into these activities:</p>
              <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4 max-w-2xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                  <thead className="bg-orange-500 text-white">
                    <tr>
                      <th className="px-6 py-3.5 text-left font-semibold">Activity</th>
                      <th className="px-6 py-3.5 text-right font-semibold">Suggested time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {studyRoutineData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                        <td className="px-6 py-3 font-medium text-gray-900">{row.activity}</td>
                        <td className="px-6 py-3 text-right text-gray-700">{row.time}</td>
                      </tr>
                    ))}
                    <tr className="bg-orange-50/80 font-bold text-gray-900">
                      <td className="px-6 py-3">Total</td>
                      <td className="px-6 py-3 text-right text-orange-600">2 hours</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Adjust the time according to the difficulty of the chapter and your current level. The purpose is to maintain regular practice rather than follow an inflexible timetable.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                7. Solve Sample Papers and Previous Question Papers
              </h3>
              <p className="mb-2">
                Once you have covered the syllabus, start solving complete question papers under timed conditions.
              </p>
              <p className="mb-2">
                Use official CBSE sample question papers and marking schemes to understand the question format and how answers are evaluated.
              </p>
              <p className="mb-2">Follow this process:</p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-gray-700">
                <li>Download the relevant sample paper.</li>
                <li>Attempt the paper within the examination time.</li>
                <li>Avoid checking solutions while solving.</li>
                <li>Compare your answers with the official marking scheme.</li>
                <li>Identify questions where you lost marks.</li>
                <li>Revise the concepts behind those mistakes.</li>
              </ol>
              <p className="mt-2 text-gray-700">
                Do not rely on unofficial chapter-wise marks predictions or assume that a question from a previous paper will necessarily appear again.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                8. Prepare for the Examination
              </h3>
              <p className="mb-2">During the examination:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
                <li>Read the instructions carefully before starting.</li>
                <li>Check the marks assigned to each question.</li>
                <li>Choose questions carefully wherever internal choices are available.</li>
                <li>Show the important steps in mathematical solutions.</li>
                <li>Use correct mathematical notation.</li>
                <li>Keep track of the time available.</li>
                <li>Reserve time at the end to review calculations and incomplete answers.</li>
              </ul>
              <p className="mt-2 text-gray-700">
                A correct final answer is important, but clearly written working steps also help communicate the method used to solve a problem.
              </p>
            </div>
          </div>
        </div>

        {/* Download Section */}
        <div className="mb-14 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 md:p-8 rounded-2xl border border-orange-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Maths Syllabus PDF
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            Students should refer to the official CBSE Mathematics syllabus for the complete prescribed topics and assessment details.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-orange-200 shadow-sm mb-4">
            <div>
              <h4 className="font-bold text-gray-900 text-base md:text-lg">
                Download the official CBSE Class 12 Mathematics syllabus (Subject Code 041):
              </h4>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Official CBSE Curriculum Document (PDF)
              </p>
            </div>
            <button
              onClick={() => handleDownloadClick("/path/to/cbse-class-12-maths-syllabus.pdf")}
              className="inline-flex items-center gap-2 bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-700 transition shadow-sm shrink-0"
            >
              <MdDownload className="text-xl" />
              Download Syllabus PDF
            </button>
          </div>
          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
            The PDF contains the course structure, chapter-wise topics, unit-wise marks distribution, question-paper design and internal assessment details. Check the official CBSE curriculum portal for the syllabus applicable to your academic session.
          </p>
        </div>

        {/* Sample Papers Section */}
        <div className="mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Maths Sample Papers and Marking Schemes
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            Sample papers help students understand the structure of the examination and practise solving questions within the available time.
          </p>
          <p className="text-gray-800 font-semibold text-sm md:text-base mb-3">
            Use the official CBSE resources:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm md:text-base text-gray-700 pl-2 mb-4">
            <li>Class XII sample question papers and marking schemes</li>
            <li>CBSE Mathematics curriculum and syllabus</li>
          </ul>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            When practising a sample paper, use its corresponding marking scheme to check your answers and understand how marks are awarded.
          </p>
        </div>

        {/* Explore More Maths and CBSE Study Resources */}
        <div className="mb-14 bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
            Explore More Maths and CBSE Study Resources
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            Students preparing for board examinations can use additional resources to revise concepts and organise their studies.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-gray-700 pl-2 mb-4">
            <li>
              <Link href="/CBSE" className="text-orange-600 font-semibold underline hover:text-orange-700">
                CBSE syllabus and study resources
              </Link>
            </li>
            <li>
              <Link href="/MathsFormula" className="text-orange-600 font-semibold underline hover:text-orange-700">
                Maths formulas for Classes 6 to 12
              </Link>
            </li>
          </ul>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Learnosphere provides online learning resources and access to educators for students who need additional academic support. Students can explore the available learning options to find support suited to their subjects and learning requirements.
          </p>
        </div>

        {/* FAQs */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-6 text-center">
            Frequently Asked Questions About CBSE Class 12 Maths
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
