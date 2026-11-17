"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook, FaGraduationCap, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";
import DownloadFormModal from "@/components/DownloadFormModal";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the CBSE Class 11 Maths syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CBSE Class 11 Mathematics syllabus covers five units: Sets and Functions, Algebra, Coordinate Geometry, Calculus, and Statistics and Probability."
      }
    },
    {
      "@type": "Question",
      "name": "How many chapters are there in Class 11 Maths?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NCERT Class 11 Mathematics textbook and the corresponding chapter structure contain 14 chapters, covering topics from Sets to Probability."
      }
    },
    {
      "@type": "Question",
      "name": "What is the subject code for CBSE Class 11 Mathematics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CBSE subject code for Mathematics is 041."
      }
    },
    {
      "@type": "Question",
      "name": "What are the five units in Class 11 Mathematics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The five units are Sets and Functions, Algebra, Coordinate Geometry, Calculus, and Statistics and Probability."
      }
    },
    {
      "@type": "Question",
      "name": "Is Class 11 Mathematics difficult?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Class 11 Mathematics introduces more advanced concepts than earlier classes. Students may find topics such as Trigonometric Functions, Complex Numbers, Permutations and Combinations, and Limits challenging. Regular practice and a strong understanding of fundamental concepts make these topics easier to study."
      }
    },
    {
      "@type": "Question",
      "name": "How many marks is the Class 11 Maths theory examination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The current CBSE course structure lists 80 marks for the theory examination and 20 marks for internal assessment. Students should consult the latest official curriculum for the applicable assessment requirements."
      }
    },
    {
      "@type": "Question",
      "name": "What is the duration of the Class 11 Maths examination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The current CBSE Mathematics course structure specifies a three-hour theory examination."
      }
    },
    {
      "@type": "Question",
      "name": "Is Class 11 Mathematics useful for JEE preparation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Many concepts introduced in Class 11 Mathematics, including Sets, Trigonometry, Algebra, Coordinate Geometry and Calculus, are also important for engineering entrance examination preparation. However, JEE preparation requires additional practice and coverage of the relevant entrance-examination syllabus."
      }
    },
    {
      "@type": "Question",
      "name": "Where can students find the official Class 11 Maths syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students can visit the CBSE Academic website and select Mathematics under the Senior Secondary Curriculum. They should check the subject code 041 before downloading the syllabus."
      }
    },
    {
      "@type": "Question",
      "name": "How should students complete the Class 11 Maths syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students should follow the chapter sequence, understand the concepts, solve NCERT exercises, revise important formulae and practise different question formats. Regular preparation is more effective than studying all chapters shortly before the examination."
      }
    }
  ]
};

export const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6">
      <button
        className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[.8em] md:text-lg font-semibold font-Poppins text-left">
          {question}
        </span>
        <span>
          {isOpen ? (
            <FiMinus className="text-gray-600 text-2xl" />
          ) : (
            <FiPlus className="text-gray-600 text-2xl" />
          )}
        </span>
      </button>
      {isOpen && (
        <p className="mt-2 px-4 py-3 text-gray-900 bg-gray-100 rounded-lg font-Poppins shadow-md text-left leading-relaxed">
          {answer}
        </p>
      )}
    </div>
  );
};

export default function Mathematics11th() {
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

  const handleFormSubmit = (formData) => {
    setIsModalOpen(false);
    setHasDownloaded(true);
    sessionStorage.setItem("hasFilledForm", "true");
    downloadPdf(selectedPdf);
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <div className="p-0 md:p-12 flex flex-col font-Poppins justify-center mt-12">
        {/* Hero Section */}
        <div>
          <h1 className="p-4 text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl w-full md:w-[65%] rounded-lg text-center m-auto">
            CBSE Class 11 Mathematics Syllabus: Chapters and Units
          </h1>
        </div>

        <div className="flex flex-col md:flex-row pt-2">
          <div className="w-full text-center pt-6 max-w-5xl mx-auto">
            <p className="p-4 leading-relaxed text-gray-700">
              The CBSE Class 11 Mathematics syllabus introduces students to important mathematical concepts that form the foundation for higher studies in mathematics, science, engineering, commerce and related fields. It covers sets, functions, algebra, trigonometry, coordinate geometry, calculus, statistics and probability.
            </p>
            <p className="p-2 leading-relaxed text-gray-700">
              The syllabus is organised into five major units and includes 14 chapters. Students can use this guide to understand the chapter list, explore the main topics covered in each unit and plan their Mathematics preparation.
            </p>
          </div>
        </div>

        {/* Course Details Summary Table */}
        <div className="mt-10 max-w-4xl mx-auto px-4 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-4">
            CBSE Class 11 Mathematics: Course Details
          </h2>
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-orange-500 text-white uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Course detail</th>
                  <th className="px-6 py-3">Information</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Class</td>
                  <td className="px-6 py-3">11</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Subject</td>
                  <td className="px-6 py-3">Mathematics</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">CBSE subject code</td>
                  <td className="px-6 py-3">041</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Total units</td>
                  <td className="px-6 py-3">5</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Chapters</td>
                  <td className="px-6 py-3">14</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Theory examination duration</td>
                  <td className="px-6 py-3">3 hours</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Theory examination marks</td>
                  <td className="px-6 py-3">80</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Internal assessment</td>
                  <td className="px-6 py-3">20</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs md:text-sm text-gray-500 text-center mt-3 italic">
            The examination structure and prescribed topics should be checked against the latest official CBSE curriculum because the board may revise syllabus and assessment requirements.
          </p>
        </div>

        {/* Quick Chapter-wise PDF Downloads */}
        <div className="flex flex-col gap-5 mt-14">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-4 rounded-lg text-center w-full md:w-[54%] m-auto text-2xl bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent from-orange-500 to-red-600">
            A Comprehensive Guide for Class 11th Mathematics
          </p>

          <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-6 justify-center">
            {/* Part 1: Chapters 1 to 7 */}
            <div className="flex flex-col gap-4 w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200 bg-white">
              <p className="font-bold text-black flex items-center gap-2 text-[1.1em] border-b pb-2">
                <FaBook className="text-orange-500" size={20} />
                Mathematics - Part 1 (Chapters 1 - 7)
              </p>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Sets.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 1:</strong> Sets</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Relations and Functions.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 2:</strong> Relations and Functions</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Trigonometric Functions.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 3:</strong> Trigonometric Functions</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Complex Numbers and Quadratic Equations.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 4:</strong> Complex Numbers and Quadratic Equations</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Linear Inequalities.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 5:</strong> Linear Inequalities</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Permutation and Combinations.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 6:</strong> Permutations and Combinations</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Binomial Theorem.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 7:</strong> Binomial Theorem</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>
            </div>

            {/* Part 2: Chapters 8 to 14 */}
            <div className="flex flex-col gap-4 w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200 bg-white">
              <p className="font-bold text-black flex items-center gap-2 text-[1.1em] border-b pb-2">
                <FaBook className="text-orange-500" size={20} />
                Mathematics - Part 2 (Chapters 8 - 14)
              </p>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Sequences and Series.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 8:</strong> Sequences and Series</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Straight Lines.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 9:</strong> Straight Lines</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Conic Sections.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 10:</strong> Conic Sections</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Introduction to Three Dimensional Geometry.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 11:</strong> Introduction to Three-Dimensional Geometry</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Limits and Derivatives.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 12:</strong> Limits and Derivatives</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Statistics.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 13:</strong> Statistics</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Probability.pdf")
                }
              >
                <span><strong className="text-black">Chapter - 14:</strong> Probability</span>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Unit-wise Chapter List & Topics */}
        <div className="mt-16 px-4 md:px-12 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-600 mb-4">
            CBSE Class 11 Maths Syllabus: Unit-wise Chapter List
          </h2>
          <p className="text-center text-gray-700 leading-relaxed mb-8">
            The Class 11 Mathematics syllabus is organised into five main units:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-10 text-center">
            {["1. Sets and Functions", "2. Algebra", "3. Coordinate Geometry", "4. Calculus", "5. Statistics and Probability"].map((unit, idx) => (
              <div key={idx} className="bg-orange-50 border border-orange-200 rounded-lg p-3 font-semibold text-orange-800 text-sm shadow-sm">
                {unit}
              </div>
            ))}
          </div>

          <p className="text-center text-gray-600 text-sm italic mb-10">
            Each unit contains important mathematical concepts that students need to understand and practise.
          </p>

          {/* Unit 1: Sets and Functions */}
          <div className="mb-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="border-b pb-4 mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600">Unit 1: Sets and Functions</h3>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                This unit introduces the basic language of mathematics and develops an understanding of relationships between different mathematical quantities.
              </p>
            </div>

            <div className="space-y-6">
              {/* Chapter 1 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 1: Sets</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Sets.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Students learn how to represent and work with collections of objects or numbers.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Sets and their representations.</li>
                    <li>Empty, finite and infinite sets.</li>
                    <li>Equal sets and subsets.</li>
                    <li>Universal sets.</li>
                    <li>Intervals and their notation.</li>
                    <li>Venn diagrams.</li>
                    <li>Union and intersection of sets.</li>
                    <li>Difference and complement of sets.</li>
                    <li>Properties of complements.</li>
                  </ul>
                </div>
              </div>

              {/* Chapter 2 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 2: Relations and Functions</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Relations and Functions.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  This chapter introduces the relationship between sets and functions and explains how mathematical inputs are connected to outputs.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Ordered pairs and Cartesian products.</li>
                    <li>Relations and their representations.</li>
                    <li>Domain, codomain and range.</li>
                    <li>Functions as special types of relations.</li>
                    <li>Real-valued functions.</li>
                    <li>Constant, identity and polynomial functions.</li>
                    <li>Rational and modulus functions.</li>
                    <li>Signum, exponential and logarithmic functions.</li>
                    <li>Greatest integer function and graphs.</li>
                    <li>Operations on functions.</li>
                  </ul>
                </div>
              </div>

              {/* Chapter 3 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 3: Trigonometric Functions</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Trigonometric Functions.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  This chapter develops the understanding of angles and the relationships between trigonometric functions.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Positive and negative angles.</li>
                    <li>Degree and radian measures.</li>
                    <li>Conversion between degrees and radians.</li>
                    <li>Trigonometric functions using the unit circle.</li>
                    <li>Signs and values of trigonometric functions.</li>
                    <li>Domains and ranges of trigonometric functions.</li>
                    <li>Graphs of trigonometric functions.</li>
                    <li>Trigonometric identities.</li>
                    <li>Sum and difference formulae.</li>
                    <li>Multiple-angle identities and their applications.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Unit 2: Algebra */}
          <div className="mb-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="border-b pb-4 mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600">Unit 2: Algebra</h3>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                The Algebra unit develops students' understanding of equations, inequalities, counting methods, algebraic expansion and numerical sequences.
              </p>
            </div>

            <div className="space-y-6">
              {/* Chapter 4 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 4: Complex Numbers and Quadratic Equations</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Complex Numbers and Quadratic Equations.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  This chapter introduces complex numbers and their role in solving equations that cannot be fully solved using real numbers alone.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Need for complex numbers.</li>
                    <li>Imaginary unit and the square root of negative numbers.</li>
                    <li>Algebraic properties of complex numbers.</li>
                    <li>Representation of complex numbers.</li>
                    <li>Argand plane.</li>
                    <li>Quadratic equations involving complex numbers.</li>
                  </ul>
                </div>
              </div>

              {/* Chapter 5 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 5: Linear Inequalities</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Linear Inequalities.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Students learn how to solve inequalities and represent their solutions.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Linear inequalities in one variable.</li>
                    <li>Algebraic methods of solving inequalities.</li>
                    <li>Representation of solutions on the number line.</li>
                    <li>Interval representation of solutions.</li>
                  </ul>
                </div>
              </div>

              {/* Chapter 6 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 6: Permutations and Combinations</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Permutation and Combinations.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  This chapter introduces the mathematical methods used to count possible arrangements and selections.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Fundamental principle of counting.</li>
                    <li>Factorial notation.</li>
                    <li>Permutations.</li>
                    <li>Combinations.</li>
                    <li>Formulae for permutations and combinations.</li>
                    <li>Relationship between permutations and combinations.</li>
                    <li>Simple applications.</li>
                  </ul>
                </div>
              </div>

              {/* Chapter 7 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 7: Binomial Theorem</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Binomial Theorem.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Students learn how to expand expressions involving powers of binomials.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Binomial theorem for positive integral indices.</li>
                    <li>General form of binomial expansion.</li>
                    <li>Binomial coefficients.</li>
                    <li>Pascal's triangle.</li>
                    <li>Applications of the theorem.</li>
                  </ul>
                </div>
              </div>

              {/* Chapter 8 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 8: Sequences and Series</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Sequences and Series.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  This chapter introduces ordered lists of numbers and methods for calculating their terms and sums.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Sequences and series.</li>
                    <li>Arithmetic mean.</li>
                    <li>Geometric progressions.</li>
                    <li>General term of a geometric progression.</li>
                    <li>Sum of a finite geometric progression.</li>
                    <li>Infinite geometric progressions and their sums.</li>
                    <li>Geometric mean.</li>
                    <li>Relationship between arithmetic mean and geometric mean.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Unit 3: Coordinate Geometry */}
          <div className="mb-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="border-b pb-4 mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600">Unit 3: Coordinate Geometry</h3>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                This unit develops students' understanding of geometrical figures using coordinates and algebraic equations.
              </p>
            </div>

            <div className="space-y-6">
              {/* Chapter 9 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 9: Straight Lines</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Straight Lines.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Students learn how to represent straight lines using mathematical equations.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Basic concepts of two-dimensional geometry.</li>
                    <li>Slope of a line.</li>
                    <li>Angle between two lines.</li>
                    <li>Different forms of equations of a line.</li>
                    <li>Point-slope form.</li>
                    <li>Slope-intercept form.</li>
                    <li>Two-point form.</li>
                    <li>Intercept form.</li>
                    <li>Distance of a point from a line.</li>
                  </ul>
                </div>
              </div>

              {/* Chapter 10 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 10: Conic Sections</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Conic Sections.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  This chapter studies curves obtained through sections of a cone and their mathematical properties.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Introduction to conic sections.</li>
                    <li>Circles.</li>
                    <li>Parabolas.</li>
                    <li>Ellipses.</li>
                    <li>Hyperbolas.</li>
                    <li>Standard equations of conic sections.</li>
                    <li>Basic properties and applications.</li>
                  </ul>
                </div>
              </div>

              {/* Chapter 11 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 11: Introduction to Three-Dimensional Geometry</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Introduction to Three Dimensional Geometry.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Students are introduced to coordinate geometry in three dimensions.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Coordinate axes in three-dimensional space.</li>
                    <li>Coordinate planes.</li>
                    <li>Coordinates of a point in three dimensions.</li>
                    <li>Distance between two points.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Unit 4: Calculus */}
          <div className="mb-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="border-b pb-4 mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600">Unit 4: Calculus</h3>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                This unit introduces the basic ideas of calculus and explains how mathematical quantities change, providing the foundation for advanced calculus in higher classes.
              </p>
            </div>

            <div className="space-y-6">
              {/* Chapter 12 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 12: Limits and Derivatives</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Limits and Derivatives.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  This chapter introduces the basic ideas of calculus and explains how mathematical quantities change.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Intuitive understanding of limits.</li>
                    <li>Limits of different functions.</li>
                    <li>Derivatives as rates of change.</li>
                    <li>Geometrical interpretation of derivatives.</li>
                    <li>Derivative of a function.</li>
                    <li>Derivatives of sums and differences.</li>
                    <li>Product and quotient rules.</li>
                    <li>Derivatives of polynomial and trigonometric functions.</li>
                  </ul>
                </div>
                <p className="text-xs text-gray-500 italic mt-3">
                  These concepts provide the foundation for more advanced calculus studied in higher classes.
                </p>
              </div>
            </div>
          </div>

          {/* Unit 5: Statistics and Probability */}
          <div className="mb-10 bg-white border border-gray-200 rounded-2xl shadow-lg p-6 md:p-8">
            <div className="border-b pb-4 mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-orange-600">Unit 5: Statistics and Probability</h3>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                This unit introduces methods for analysing numerical information and understanding the likelihood of events.
              </p>
            </div>

            <div className="space-y-6">
              {/* Chapter 13 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 13: Statistics</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Statistics.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  Students learn to organise and analyse data using statistical measures.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Measures of dispersion.</li>
                    <li>Range.</li>
                    <li>Mean deviation.</li>
                    <li>Variance.</li>
                    <li>Standard deviation.</li>
                    <li>Analysis of grouped and ungrouped data.</li>
                  </ul>
                </div>
              </div>

              {/* Chapter 14 */}
              <div className="bg-gray-50 p-5 rounded-xl border border-gray-100">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <h4 className="font-bold text-lg text-gray-900">Chapter 14: Probability</h4>
                  <button
                    onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Mathematics/Probability.pdf")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-600 hover:text-orange-700 bg-orange-100 hover:bg-orange-200 px-3 py-1.5 rounded-md transition-colors w-fit"
                  >
                    <MdDownload size={16} /> Download PDF
                  </button>
                </div>
                <p className="text-gray-700 text-sm mb-3">
                  This chapter introduces probability and the mathematical representation of uncertain events.
                </p>
                <div className="text-sm text-gray-600">
                  <strong className="text-gray-800">Important topics include:</strong>
                  <ul className="list-disc list-inside mt-2 space-y-1 pl-1">
                    <li>Random experiments and events.</li>
                    <li>Occurrence of events.</li>
                    <li>Complementary events.</li>
                    <li>Union and intersection of events.</li>
                    <li>Mutually exclusive events.</li>
                    <li>Exhaustive events.</li>
                    <li>Axiomatic approach to probability.</li>
                    <li>Probability of an event and related operations.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Examination Structure */}
        <div className="mt-12 px-4 md:px-12 max-w-5xl mx-auto w-full">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-6 md:p-8 shadow-md">
            <h2 className="text-xl md:text-2xl font-bold text-orange-600 mb-4 flex items-center gap-2">
              <FaGraduationCap size={24} />
              Class 11 Maths Examination Structure
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The CBSE Mathematics curriculum currently describes a three-hour theory examination carrying 80 marks, along with 20 marks for internal assessment.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The internal assessment includes periodic tests and Mathematics activities. The exact requirements should be checked in the applicable official CBSE curriculum.
            </p>
            <p className="text-gray-700 leading-relaxed font-medium">
              Students should not rely on assumed chapter-wise marks to prepare for the examination. A complete understanding of all prescribed chapters is important.
            </p>
          </div>
        </div>

        {/* How to Prepare for Class 11 Mathematics */}
        <div className="mt-14 px-4 md:px-12 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            How to Prepare for Class 11 Mathematics
          </h2>
          <p className="text-center text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            Class 11 Mathematics introduces concepts that require regular practice and a clear understanding of basic principles. Students can organise their preparation using the following approach:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                step: "1",
                title: "Understand the concepts",
                desc: "Study definitions, properties and mathematical methods before attempting difficult questions."
              },
              {
                step: "2",
                title: "Practise NCERT exercises",
                desc: "Solve textbook examples and exercises to strengthen understanding of each chapter."
              },
              {
                step: "3",
                title: "Maintain a formula notebook",
                desc: "Record important identities, properties and formulae for regular revision."
              },
              {
                step: "4",
                title: "Practise different question types",
                desc: "Solve basic, application-based and higher-order problems."
              },
              {
                step: "5",
                title: "Revise regularly",
                desc: "Review previously studied chapters rather than leaving all revision until the examination."
              },
              {
                step: "6",
                title: "Analyse mistakes",
                desc: "Identify errors in calculations, algebraic steps and mathematical reasoning."
              },
              {
                step: "7",
                title: "Solve sample papers",
                desc: "Practise question papers to understand the examination format and improve time management."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-sm">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Resources */}
        <div className="mt-14 px-4 md:px-12 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            Class 11 Mathematics Study Resources
          </h2>
          <p className="text-center text-gray-700 leading-relaxed mb-8">
            Students can use additional learning resources to strengthen their preparation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start gap-3">
              <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
              <div>
                <strong className="text-gray-900">Class 11 Maths formulas:</strong>
                <p className="text-gray-600 text-sm mt-1">Revise important mathematical formulas and identities.</p>
              </div>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start gap-3">
              <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
              <div>
                <strong className="text-gray-900">CBSE Class 11 Maths sample papers:</strong>
                <p className="text-gray-600 text-sm mt-1">Practise examination-style questions and assess preparation.</p>
              </div>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start gap-3">
              <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
              <div>
                <strong className="text-gray-900">NCERT Mathematics textbook:</strong>
                <p className="text-gray-600 text-sm mt-1">Study the prescribed chapters, worked examples and exercises.</p>
              </div>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start gap-3">
              <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
              <div>
                <strong className="text-gray-900">Official CBSE curriculum:</strong>
                <p className="text-gray-600 text-sm mt-1">Refer to the latest syllabus and assessment details published by CBSE.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl text-center text-sm text-gray-700">
            You can access the official curriculum through the CBSE Academic website. Open the Senior Secondary Curriculum section and select Mathematics, subject code <strong>041</strong>.
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16 px-4 md:px-12 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions About Class 11 Maths Syllabus
          </h2>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, index) => (
              <FaqItem
                key={index}
                question={faq.name}
                answer={faq.acceptedAnswer.text}
              />
            ))}
          </div>
        </div>

        {/* Conclusion */}
        <div className="mt-14 mb-8 px-4 md:px-12 max-w-5xl mx-auto w-full">
          <div className="bg-gray-100 rounded-2xl p-6 md:p-8 text-center border border-gray-200">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">Conclusion</h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-3">
              The Class 11 Mathematics syllabus builds a foundation in algebra, geometry, functions, calculus, statistics and probability. Understanding the purpose of each unit and practising its chapters regularly helps students develop mathematical reasoning and problem-solving skills.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
              Students should refer to the prescribed NCERT textbook and the latest official CBSE curriculum when preparing for their examinations.
            </p>
          </div>
        </div>
      </div>

      <Footer1 />
      <Footer />

      <DownloadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
