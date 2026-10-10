"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the CBSE syllabus for Class 12 Chemistry for 2024–25?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It includes Physical, Organic, and Inorganic Chemistry topics like Solutions, Electrochemistry, p-block elements, Organic reactions, Biomolecules, and more."
      }
    },
    {
      "@type": "Question",
      "name": " Is the Class 12 Chemistry syllabus reduced this year?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "CBSE has not introduced major reductions for 2024–25. The syllabus follows the updated NCERT pattern with minor revisions."
      }
    },
    {
      "@type": "Question",
      "name": "How many marks are assigned to the Chemistry practical exam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": " The Chemistry practical exam carries 30 marks, which include experiments, analysis, record work, and viva."
      }
    },
    {
      "@type": "Question",
      "name": " Which chapters are most important for Class 12 Chemistry?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Electrochemistry, Aldehydes & Ketones, p-block elements, Coordination compounds, Chemical kinetics, and Organic reactions carry high weightage."
      }
    },
    {
      "@type": "Question",
      "name": " Is NCERT enough for the Class 12 Chemistry board exam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. NCERT is the primary source for CBSE boards. Practicing NCERT questions, examples, and exercises is essential for scoring high."
      }
    },
    {
      "@type": "Question",
      "name": " Does the Chemistry syllabus help in NEET and JEE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most Physical, Organic, and Inorganic Chemistry topics from the CBSE syllabus overlap with JEE and NEET, making it extremely important for aspirants."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I download the Class 12 Chemistry syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can download the updated syllabus for Class 12 and other classes on Learnosphere, where CBSE Class 1–12 resources are available."
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
        <span className="text-[.8em] md:text-lg font-semibold font-Poppins">
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
        <p className="mt-2 px-4 py-3 text-gray-900 bg-gray-100 rounded-lg font-Poppins shadow-md">
          {answer}
        </p>
      )}
    </div>
  );
};

export default function Chemistry12() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [hasDownloaded, setHasDownloaded] = useState(false); // Track if a PDF has been downloaded

  useEffect(() => {
    // Check session storage to see if the form has been filled
    const hasFilledForm = sessionStorage.getItem("hasFilledForm") === "true";
    setHasDownloaded(hasFilledForm);
  }, []);

  const handleDownloadClick = async (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    if (!hasDownloaded) {
      setIsModalOpen(true);
    } else {
      await downloadPdf(pdfUrl); // Download directly
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
    setHasDownloaded(true); // Update state

    // Set session storage to indicate form has been filled
    sessionStorage.setItem("hasFilledForm", "true");

    // Trigger PDF download
    downloadPdf(selectedPdf);
  };

  return (
    <div>
      <Navbar />
      <div className="p-0 md:p-12  flex flex-col font-Poppins justify-center mt-12">
        <div className="">
          <h1 className="p-4  text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Class 12 Chemistry Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className=" text-center md:text-start pt-6">
            <p className="p-4">
              The NCERT Chemistry Class 12 Syllabus is an essential resource for
              students aiming to excel in their academic pursuits. Chemistry
              plays a vital role in various career paths, especially in the
              fields of medicine and engineering. Therefore, it is crucial to
              pay special attention to this subject for a promising future. The
              Central Board of Secondary Education (CBSE) has recently released
              the revised syllabus for Class 12 Chemistry, applicable for the
              academic session 2024-25. This updated syllabus closely resembles
              the Class 12 Chemistry syllabus NCERT for the previous academic
              year, 2024-25, with no new chapters added or excluded.
            </p>

            <p className="p-4">
              {" "}
              The revised Chemistry Class 12 Syllabus adheres to the evaluation
              scheme wherein the theoretical portion carries a weightage of 70
              marks, while the remaining 30 marks are allocated for assessment
              purposes. Students preparing for the CBSE Board Examination can
              refer to this page for detailed information on the Class 12
              Chemistry syllabus NCERT for the academic year 2024-25.{" "}
              <br />

            </p>

          </div>
        </div>
        <div className="mt-8 px-4 md:px-20 text-[1em] md:text-[1.05em]">
          <p className="mb-4">
            Understanding the Class 12 Chemistry syllabus helps students:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Identify high-weightage chapters</li>
            <li>Build an organised study plan</li>
            <li>Focus on exam-relevant concepts</li>
            <li>Improve board exam and competitive exam preparation</li>
            <li>Reduce stress and avoid learning irrelevant topics</li>
          </ul>
          <p className="mt-4">
            Chemistry becomes easier when students know what topics to cover, what experiments to perform, and what type of questions are expected in the final board exam.
          </p>
        </div>
        <div className="mt-8 px-4 md:px-20 flex flex-wrap gap-6 justify-center">
          <div className="mt-12 px-4 md:px-20 text-center md:text-start">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
              Detailed Breakdown of Chemistry Syllabus Class 12 CBSE 2024–25
            </h2>
            <p className="text-[1em] md:text-[1.05em] mb-2">
              The CBSE Chemistry syllabus is structured into three broad sections – Physical Chemistry, Organic Chemistry, and Inorganic Chemistry.
            </p>
            <p className="text-[1em] md:text-[1.05em] mb-4">
              The theory exam is for 70 marks and practicals carry 30 marks. Below is a clear and student-friendly breakdown.
            </p>
          </div>
          {/* Example card for Unit I */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit I: Solutions</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Types of solutions</li>
              <li>Concentration of solutions</li>
              <li>Raoult’s law</li>
              <li>Colligative properties</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              This is one of the most conceptual and scoring chapters in Physical Chemistry.
            </p>
          </div>

          {/* Unit II */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit II: Electrochemistry</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Redox reactions</li>
              <li>Nernst equation</li>
              <li>Conductance and electrolytic cells</li>
              <li>Fuel cells</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              A key chapter for numerical-based questions in the board exam.
            </p>
          </div>

          {/* Unit III */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit III: Chemical Kinetics</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Rate of reaction</li>
              <li>Order and molecularity</li>
              <li>Arrhenius equation</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              Highly relevant for competitive exams as well.
            </p>
          </div>

          {/* Unit IV */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit IV: Surface Chemistry</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Adsorption</li>
              <li>Catalysis</li>
              <li>Colloids and emulsions</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              Short and easy-to-score chapter.
            </p>
          </div>

          {/* Unit V */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit V: General Principles and Processes of Isolation of Elements</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Extraction of metals</li>
              <li>Thermodynamic principles</li>
              <li>Refining methods</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              Important for understanding metallurgy.
            </p>
          </div>

          {/* Unit VI */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit VI: p-Block Elements</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Group 15 to Group 18 elements</li>
              <li>Properties, uses, and compounds</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              A detailed but high-scoring part of Inorganic Chemistry.
            </p>
          </div>

          {/* Unit VII */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit VII: d and f-Block Elements</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Transition metals</li>
              <li>Lanthanides and actinides</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              Questions from this chapter are often direct and predictable.
            </p>
          </div>

          {/* Unit VIII */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit VIII: Coordination Compounds</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Ligands</li>
              <li>Bonding</li>
              <li>Isomerism</li>
              <li>Nomenclature</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              One of the most important chapters for both boards and entrance exams.
            </p>
          </div>

          {/* Unit IX */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit IX: Haloalkanes and Haloarenes</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Nomenclature</li>
              <li>Substitution and elimination reactions</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              Simple reactions that are easy to revise and solve.
            </p>
          </div>

          {/* Unit X */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit X: Alcohols, Phenols, and Ethers</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Properties</li>
              <li>Preparation methods</li>
              <li>Reaction mechanisms</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              An essential part of Organic Chemistry.
            </p>
          </div>

          {/* Unit XI */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit XI: Aldehydes, Ketones, and Carboxylic Acids</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Nucleophilic addition</li>
              <li>Oxidation and reduction reactions</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              Questions often come from reaction mechanisms.
            </p>
          </div>

          {/* Unit XII */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit XII: Amines</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Classification</li>
              <li>Basicity</li>
              <li>Important reactions</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              A scoring and student-friendly chapter.
            </p>
          </div>

          {/* Unit XIII */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit XIII: Biomolecules</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Carbohydrates</li>
              <li>Proteins</li>
              <li>Vitamins and nucleic acids</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              Short, theoretical, and important for boards.
            </p>
          </div>

          {/* Unit XIV */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit XIV: Polymers</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Types of polymers</li>
              <li>Natural and synthetic polymers</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              Scoring chapter with direct questions.
            </p>
          </div>

          {/* Unit XV */}
          <div className="w-[300px] md:w-[400px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-orange-500 text-lg mb-2">Unit XV: Chemistry in Everyday Life</p>
            <ul className="list-disc list-inside space-y-1 text-[.95em]">
              <li>Drugs and their classifications</li>
              <li>Cleansing agents</li>
            </ul>
            <p className="mt-2 text-[.9em] text-gray-700">
              Easy theoretical questions appear from this section.
            </p>
          </div>
        </div>
        <p className=" p-4">
          CBSE syllabus for Class 12 Chemistry for 2024–25 is
          designed to give students a strong foundation in theoretical concepts,
          practical applications, and analytical skills. Chemistry is one of the
          most important subjects for Class 12 students, especially for those
          preparing for NEET, JEE, CUET, and other entrance examinations. If
          you have just begun exploring the Chemistry syllabus Class 12 CBSE 2024–25,
          this detailed guide will help you clearly understand what the curriculum includes,
          how marks are distributed, and how to prepare effectively using the latest CBSE guidelines.<br /><br />
          The CBSE (Central Board of Secondary Education) Class 12 Chemistry
          syllabus is divided into various units and sections. Here's an
          overview of the units and their key topics:
        </p>
        <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Chemistry Part -I
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Chemistry/Part-1/Solutions.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>
              Solutions
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Chemistry/Part-1/Electro chemistry.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>Electro
              chemistry{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Chemistry/Part-1/Chemical Kinetics.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              Chemical Kinetics{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Chemistry/Part-1/The d and f Block Elements.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>The d
              and f Block Elements{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Chemistry/Part-1/Coordination Compounds.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
              Coordination Compounds
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Chemistry Part -II
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Chemistry/Part-2/Haloalkanes and Haloarenes.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>
              Haloalkanes and Haloarenes{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Chemistry/Part-2/Alcohols Phenols and Ethers.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>
              Alcohols Phenols and Ethers{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Chemistry/Part-2/Aldehydes Ketones and Carboxylic Acids.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
              Aldehydes Ketones and Carboxylic Acids{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Chemistry/Part-2/Amines.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>Amines{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Chemistry/Part-2/Biomolecules.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Biomolecules{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="mt-14 flex flex-col gap-3  ">
            <p className=" text-start p-4 font-bold  text-[1.1em]">
              Practical skills and experiments are an essential part of the
              Chemistry syllabus, and the practical exam carries 30 marks.
            </p>
            <p className=" text-start px-4 font-semibold  text-[1.1em]  text-orange-500">
              Practical (30 Marks)
            </p>
            <ol className=" list-disc text-start px-4 font-semibold  text-[1em]">
              <li className="text-start mt-2  text-[.9em]">
                Volumetric Analysis - 8 Marks
              </li>
              <li className="text-start mt-2  text-[.9em]">
                Salt Analysis - 8 Marks
              </li>
              <li className="text-start mt-2   text-[.9em]">
                Content-Based Experiment - 6 Marks
              </li>
              <li className="text-start mt-2  text-[.9em]">
                Project Work - 4 Marks
              </li>
              <li className="text-start mt-2  text-[.9em]">
                Viva Voce (Based on Project Work and Experiments) - 4 Marks
              </li>
            </ol>
            <p className=" text-start p-4 font-bold  text-[1.1em]">
              Here's the CBSE Class 12 Chemistry syllabus with the marks
              distribution divided based on the different parts of Chemistry:
            </p>
            <ol className=" list-disc text-start px-4 font-semibold  text-[1em]">
              <li className="text-start mt-2  text-[.9em]">
                {" "}
                Physical Chemistry (23 Marks)
              </li>
              <li className="text-start mt-2  text-[.9em]">
                {" "}
                Inorganic Chemistry (19 Marks)
              </li>
              <li className="text-start mt-2   text-[.9em]">
                Organic Chemistry (28 Marks)
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-14 px-4 md:px-0">
        <h2 className="mb-8 text-[1.2em] md:text-3xl font-semibold font-Poppins text-center text-gray-800">
          Frequently Asked Questions
        </h2>
        <div>
          {faqSchema.mainEntity.map((item, index) => (
            <FaqItem
              key={index}
              question={item.name}
              answer={item.acceptedAnswer.text}
            />
          ))}
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
