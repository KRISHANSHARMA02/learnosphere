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
      "name": "1. How many chapters are there in the CBSE Class 12 Physics syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CBSE Class 12 Physics syllabus contains 14 chapters divided into nine theory units."
      }
    },
    {
      "@type": "Question",
      "name": "2. How many marks is the Class 12 Physics examination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Physics carries 100 marks in total: 70 marks for the theory examination and 30 marks for practical assessment."
      }
    },
    {
      "@type": "Question",
      "name": "3. How many marks are assigned to each unit in Class 12 Physics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The CBSE course structure provides grouped marks distribution. The five groups carry 16, 17, 18, 12 and 7 marks respectively. These are not fixed marks for individual chapters."
      }
    },
    {
      "@type": "Question",
      "name": "4. Which unit has the highest combined weightage in Class 12 Physics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The combined group covering Electromagnetic Waves and Optics carries 18 marks, the highest allocation among the five groups in the course structure. This does not mean that the Optics unit alone carries 18 marks."
      }
    },
    {
      "@type": "Question",
      "name": "5. Is Earth's magnetism included in the Class 12 Physics syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Earth's magnetism is not listed as a separate prescribed theory topic in the current CBSE Class 12 Physics syllabus. The chapter Magnetism and Matter covers bar magnets, magnetic dipoles, magnetic field lines and the magnetic properties of materials."
      }
    },
    {
      "@type": "Question",
      "name": "6. How many marks are assigned to Physics practicals?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Physics practical assessment carries 30 marks. It includes two experiments, a practical record, one activity, an investigatory project and viva."
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

export default function Physics12() {
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
    { label: "Subject", value: "Physics" },
    { label: "Subject code", value: "043" },
    { label: "Total chapters", value: "14" },
    { label: "Total units", value: "9" },
    { label: "Theory examination", value: "70 marks" },
    { label: "Practical assessment", value: "30 marks" },
    { label: "Total marks", value: "100" },
    { label: "Theory examination duration", value: "3 hours" }
  ];

  const unitWeightage = [
    { unit: "Unit I & Unit II", name: "Electrostatics & Current Electricity", marks: 16 },
    { unit: "Unit III & Unit IV", name: "Magnetic Effects of Current and Magnetism & Electromagnetic Induction and Alternating Currents", marks: 17 },
    { unit: "Unit V & Unit VI", name: "Electromagnetic Waves & Optics", marks: 18 },
    { unit: "Unit VII & Unit VIII", name: "Dual Nature of Radiation and Matter & Atoms and Nuclei", marks: 12 },
    { unit: "Unit IX", name: "Electronic Devices", marks: 7 }
  ];

  const questionCategoryData = [
    { category: "Remembering and Understanding", marks: 27, weightage: "38%" },
    { category: "Applying", marks: 22, weightage: "32%" },
    { category: "Analysing, Evaluating and Creating", marks: 21, weightage: "30%" }
  ];

  const questionPaperStructureData = [
    { section: "A", format: "12 multiple-choice questions and 4 assertion-reason questions", marks: 16 },
    { section: "B", format: "5 questions of 2 marks each", marks: 10 },
    { section: "C", format: "7 questions of 3 marks each", marks: 21 },
    { section: "D", format: "2 case-study-based questions of 4 marks each", marks: 8 },
    { section: "E", format: "3 long-answer questions of 5 marks each", marks: 15 }
  ];

  const practicalMarksData = [
    { component: "Two experiments, one from each section (7 + 7)", marks: 14 },
    { component: "Practical record: experiments and activities", marks: 5 },
    { component: "One activity from any section", marks: 3 },
    { component: "Investigatory project", marks: 3 },
    { component: "Viva on experiments, activities and project", marks: 5 }
  ];

  const progressTrackerData = [
    { chapter: "Electric Charges and Fields", understood: "Yes / No", practised: "Yes / No", revision: "Yes / No" },
    { chapter: "Current Electricity", understood: "Yes / No", practised: "Yes / No", revision: "Yes / No" },
    { chapter: "Moving Charges and Magnetism", understood: "Yes / No", practised: "Yes / No", revision: "Yes / No" },
    { chapter: "Ray Optics and Optical Instruments", understood: "Yes / No", practised: "Yes / No", revision: "Yes / No" }
  ];

  const errorLogData = [
    { type: "Conceptual error", example: "Applying an incorrect physical principle", action: "Revisit the concept" },
    { type: "Formula error", example: "Selecting the wrong equation", action: "Review formula conditions" },
    { type: "Calculation error", example: "Incorrect substitution or arithmetic", action: "Recheck working steps" },
    { type: "Unit error", example: "Missing or incorrect SI unit", action: "Practise unit conversions" },
    { type: "Diagram error", example: "Incorrect circuit or ray diagram", action: "Redraw and label the diagram" },
    { type: "Question-reading error", example: "Missing a condition in the question", action: "Read the question carefully" }
  ];

  const faqs = [
    {
      question: "1. How many chapters are there in the CBSE Class 12 Physics syllabus?",
      answer: "The CBSE Class 12 Physics syllabus contains 14 chapters divided into nine theory units."
    },
    {
      question: "2. How many marks is the Class 12 Physics examination?",
      answer: "Physics carries 100 marks in total: 70 marks for the theory examination and 30 marks for practical assessment."
    },
    {
      question: "3. How many marks are assigned to each unit in Class 12 Physics?",
      answer: "The CBSE course structure provides grouped marks distribution. The five groups carry 16, 17, 18, 12 and 7 marks respectively. These are not fixed marks for individual chapters."
    },
    {
      question: "4. Which unit has the highest combined weightage in Class 12 Physics?",
      answer: "The combined group covering Electromagnetic Waves and Optics carries 18 marks, the highest allocation among the five groups in the course structure. This does not mean that the Optics unit alone carries 18 marks."
    },
    {
      question: "5. Is Earth's magnetism included in the Class 12 Physics syllabus?",
      answer: "Earth's magnetism is not listed as a separate prescribed theory topic in the current CBSE Class 12 Physics syllabus. The chapter Magnetism and Matter covers bar magnets, magnetic dipoles, magnetic field lines and the magnetic properties of materials."
    },
    {
      question: "6. How many marks are assigned to Physics practicals?",
      answer: "Physics practical assessment carries 30 marks. It includes two experiments, a practical record, one activity, an investigatory project and viva."
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
            CBSE Class 12 Physics Syllabus: Chapters, Topics and Marks Distribution
          </h1>
        </div>

        {/* Intro Paragraphs */}
        <div className="flex flex-col gap-4 text-gray-800 leading-relaxed text-base md:text-lg mb-10">
          <p>
            The CBSE Class 12 Physics syllabus includes 14 chapters across nine units, covering electrostatics, current electricity, magnetism, optics, modern physics and electronic devices. The subject has a 70-mark theory examination and 30-mark practical assessment. The theory paper is three hours long.
          </p>
          <p>
            This guide explains the complete chapter-wise syllabus, grouped unit-wise marks distribution, practical assessment, examination pattern and preparation methods. Students can use it to identify the topics they need to study and organise their revision.
          </p>
          <p>
            For other subjects and classes, explore the{" "}
            <Link href="/CBSE" className="text-orange-600 font-semibold underline hover:text-orange-700">
              CBSE syllabus and study resources
            </Link>.
          </p>
        </div>

        {/* Overview Table */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Physics Syllabus: Overview
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

        {/* Grouped Unit-Wise Marks Distribution */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Physics Unit-Wise Marks Distribution
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            The CBSE course structure provides grouped marks distribution across the nine units.
          </p>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Grouped Units</th>
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
                  <td className="px-6 py-3.5" colSpan={2}>Total Theory Marks</td>
                  <td className="px-6 py-3.5 text-right text-orange-600">70</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Complete CBSE Class 12 Physics Chapter-Wise Syllabus */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            Complete CBSE Class 12 Physics Chapter-Wise Syllabus
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-8 leading-relaxed">
            The following sections explain all 14 chapters and their prescribed topics.
          </p>

          {/* Unit I */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit I
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit I: Electrostatics
            </h3>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 1: Electric Charges and Fields
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter introduces electric charges, the forces between charges and the concept of an electric field.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                  <li>Electric charges and conservation of charge</li>
                  <li>Coulomb's law and the force between two point charges</li>
                  <li>Forces between multiple charges</li>
                  <li>Principle of superposition</li>
                  <li>Continuous charge distribution</li>
                  <li>Electric field and electric field due to a point charge</li>
                  <li>Electric field lines</li>
                  <li>Electric dipole and electric field due to a dipole</li>
                  <li>Torque on an electric dipole in a uniform electric field</li>
                  <li>Electric flux</li>
                  <li>Gauss's theorem and its applications to an infinitely long straight wire, a uniformly charged infinite plane sheet and a uniformly charged thin spherical shell</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                  Students should understand how the direction and magnitude of electric fields depend on the arrangement of charges. Practise drawing charge distributions and field diagrams before solving numerical questions.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 2: Electrostatic Potential and Capacitance
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter explains electric potential, potential energy and the working principles of capacitors.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                  <li>Electric potential and potential difference</li>
                  <li>Electric potential due to a point charge, a dipole and a system of charges</li>
                  <li>Equipotential surfaces</li>
                  <li>Electrical potential energy of a system of two point charges</li>
                  <li>Potential energy of an electric dipole in an electrostatic field</li>
                  <li>Conductors and insulators</li>
                  <li>Free and bound charges inside a conductor</li>
                  <li>Dielectrics and electric polarisation</li>
                  <li>Capacitors and capacitance</li>
                  <li>Combination of capacitors in series and parallel</li>
                  <li>Capacitance of a parallel-plate capacitor with and without a dielectric medium</li>
                  <li>Energy stored in a capacitor (formulae only, without derivation)</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                  Pay attention to the difference between electric field, potential and potential energy. Practise capacitor combinations and learn how changing the plate area, separation or dielectric medium affects capacitance.
                </p>
              </div>
            </div>
          </div>

          {/* Unit II */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit II
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit II: Current Electricity
            </h3>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                Chapter 3: Current Electricity
              </h4>
              <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                Current Electricity deals with the flow of electric charge through conductors and the behaviour of electrical circuits.
              </p>
              <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                <li>Electric current and the flow of charges in a metallic conductor</li>
                <li>Drift velocity and mobility</li>
                <li>Relation between drift velocity, mobility and electric current</li>
                <li>Ohm's law</li>
                <li>Linear and non-linear voltage-current characteristics</li>
                <li>Electrical energy and power</li>
                <li>Electrical resistivity and conductivity</li>
                <li>Temperature dependence of resistance</li>
                <li>Internal resistance of a cell</li>
                <li>Potential difference and electromotive force (EMF) of a cell</li>
                <li>Combination of cells in series and parallel</li>
                <li>Kirchhoff's rules</li>
                <li>Wheatstone bridge</li>
              </ul>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                Practise circuit-based numerical problems by drawing the circuit first and labelling the current and potential differences. Pay particular attention to Kirchhoff's rules, internal resistance and the difference between EMF and terminal potential difference.
              </p>
            </div>
          </div>

          {/* Unit III */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit III
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit III: Magnetic Effects of Current and Magnetism
            </h3>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 4: Moving Charges and Magnetism
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter explains how moving charges and electric currents produce magnetic fields and experience magnetic forces.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                  <li>Concept of magnetic field</li>
                  <li>Oersted's experiment</li>
                  <li>Biot-Savart law and its application to a current-carrying circular loop</li>
                  <li>Ampere's law and its application to an infinitely long straight wire</li>
                  <li>Straight solenoid (qualitative treatment only)</li>
                  <li>Force on a moving charge in uniform electric and magnetic fields</li>
                  <li>Force on a current-carrying conductor in a uniform magnetic field</li>
                  <li>Force between two parallel current-carrying conductors and definition of ampere</li>
                  <li>Torque on a current loop in a uniform magnetic field</li>
                  <li>Current loop as a magnetic dipole and its magnetic dipole moment</li>
                  <li>Moving-coil galvanometer, current sensitivity and conversion into an ammeter and voltmeter</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                  Practise questions involving the direction of magnetic force and magnetic field. Draw clear diagrams and identify the direction of current, magnetic field and force before applying the relevant rule.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 5: Magnetism and Matter
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter focuses on bar magnets, magnetic dipoles and the magnetic properties of different materials.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                  <li>Bar magnet as an equivalent solenoid (qualitative treatment)</li>
                  <li>Magnetic field intensity due to a magnetic dipole along its axis and perpendicular to its axis (qualitative treatment)</li>
                  <li>Torque on a magnetic dipole in a uniform magnetic field (qualitative treatment)</li>
                  <li>Magnetic field lines</li>
                  <li>Diamagnetic, paramagnetic and ferromagnetic substances with examples</li>
                  <li>Magnetisation of materials</li>
                  <li>Effect of temperature on magnetic properties</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                  Understand the differences between diamagnetic, paramagnetic and ferromagnetic materials. A comparison table with their properties and examples can make revision easier.
                </p>
              </div>
            </div>
          </div>

          {/* Unit IV */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit IV
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit IV: Electromagnetic Induction and Alternating Currents
            </h3>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 6: Electromagnetic Induction
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  Electromagnetic induction explains how a changing magnetic environment produces an induced electromotive force and current.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                  <li>Electromagnetic induction</li>
                  <li>Faraday's laws of electromagnetic induction</li>
                  <li>Induced EMF and induced current</li>
                  <li>Lenz's law</li>
                  <li>Self-induction</li>
                  <li>Mutual induction</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                  Focus on understanding what causes the magnetic flux linked with a circuit to change. Practise applying Faraday's laws and Lenz's law to different situations instead of memorising their statements alone.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 7: Alternating Current
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter covers alternating current, AC circuits and the working principles of electrical devices such as generators and transformers.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                  <li>Alternating current and voltage</li>
                  <li>Peak and RMS values of alternating current and voltage</li>
                  <li>Reactance and impedance</li>
                  <li>Series LCR circuit (phasor diagrams only)</li>
                  <li>Resonance</li>
                  <li>Power in AC circuits</li>
                  <li>Power factor</li>
                  <li>Wattless current</li>
                  <li>AC generator</li>
                  <li>Transformer</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                  Practise reading phasor diagrams and identifying the relationship between current and voltage. Keep a separate formula sheet for reactance, impedance, RMS values and power calculations.
                </p>
              </div>
            </div>
          </div>

          {/* Unit V */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit V
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit V: Electromagnetic Waves
            </h3>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                Chapter 8: Electromagnetic Waves
              </h4>
              <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                This chapter introduces electromagnetic waves, their characteristics and their place in the electromagnetic spectrum.
              </p>
              <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                <li>Basic idea of displacement current</li>
                <li>Electromagnetic waves and their characteristics</li>
                <li>Transverse nature of electromagnetic waves (qualitative treatment)</li>
                <li>Electromagnetic spectrum</li>
                <li>Radio waves, microwaves, infrared, visible light, ultraviolet rays, X-rays and gamma rays</li>
                <li>Elementary facts about the uses of different electromagnetic waves</li>
              </ul>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                Create a spectrum chart showing the order of electromagnetic waves and one or two uses of each region. Test yourself by recalling the sequence and applications without looking at your notes.
              </p>
            </div>
          </div>

          {/* Unit VI */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit VI
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit VI: Optics
            </h3>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 9: Ray Optics and Optical Instruments
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  Ray Optics explains the behaviour of light during reflection and refraction and how optical instruments form images.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                  <li>Ray optics</li>
                  <li>Reflection of light</li>
                  <li>Spherical mirrors and mirror formula</li>
                  <li>Refraction of light</li>
                  <li>Total internal reflection and optical fibres</li>
                  <li>Refraction at spherical surfaces</li>
                  <li>Lenses and thin lens formula</li>
                  <li>Lens maker's formula</li>
                  <li>Magnification and power of a lens</li>
                  <li>Combination of thin lenses in contact</li>
                  <li>Refraction of light through a prism</li>
                  <li>Optical instruments</li>
                  <li>Microscopes and their magnifying powers</li>
                  <li>Astronomical telescopes, including reflecting and refracting telescopes, and their magnifying powers</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                  Practise ray diagrams for mirrors and lenses. Label the object, image, principal axis, focal points and relevant distances. Apply the appropriate sign convention before using the mirror or lens formula.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 10: Wave Optics
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  Wave Optics explains the wave nature of light and phenomena such as interference and diffraction.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                  <li>Wavefront and Huygens' principle</li>
                  <li>Reflection and refraction of plane waves at a plane surface using wavefronts</li>
                  <li>Proof of the laws of reflection and refraction using Huygens' principle</li>
                  <li>Interference of light</li>
                  <li>Young's double-slit experiment</li>
                  <li>Expression for fringe width (final expression only, without derivation)</li>
                  <li>Coherent sources and sustained interference of light</li>
                  <li>Diffraction due to a single slit</li>
                  <li>Width of the central maximum (qualitative treatment only)</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                  Understand the difference between interference and diffraction. Draw the experimental arrangement for Young's double-slit experiment and practise using the fringe-width expression in numerical problems.
                </p>
              </div>
            </div>
          </div>

          {/* Unit VII */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit VII
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit VII: Dual Nature of Radiation and Matter
            </h3>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                Chapter 11: Dual Nature of Radiation and Matter
              </h4>
              <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                This chapter explains the particle nature of light, the photoelectric effect and the wave nature of matter.
              </p>
              <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                <li>Dual nature of radiation</li>
                <li>Photoelectric effect</li>
                <li>Hertz's and Lenard's observations</li>
                <li>Einstein's photoelectric equation and the particle nature of light</li>
                <li>Experimental study of the photoelectric effect</li>
                <li>Matter waves and the wave nature of particles</li>
                <li>de Broglie relation</li>
              </ul>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                Focus on the observations of the photoelectric effect and how they support the particle nature of light. Practise numerical questions involving Einstein's photoelectric equation and the de Broglie relation.
              </p>
            </div>
          </div>

          {/* Unit VIII */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit VIII
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit VIII: Atoms and Nuclei
            </h3>

            <div className="space-y-6">
              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 12: Atoms
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter explains the structure of atoms through important atomic models and the Bohr model of the hydrogen atom.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                  <li>Alpha-particle scattering experiment</li>
                  <li>Rutherford's model of the atom</li>
                  <li>Bohr model of the hydrogen atom</li>
                  <li>Expression for the radius of the nth possible orbit</li>
                  <li>Velocity and energy of an electron in the nth orbit</li>
                  <li>Hydrogen line spectra (qualitative treatment only)</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                  Understand the main observations of Rutherford's experiment and how the Bohr model explains the hydrogen atom. Keep the expressions for the radius, velocity and energy of an electron organised for revision.
                </p>
              </div>

              <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                  Chapter 13: Nuclei
                </h4>
                <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                  This chapter covers the structure of the nucleus and the energy associated with nuclear reactions.
                </p>
                <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                  <li>Composition and size of the nucleus</li>
                  <li>Nuclear force</li>
                  <li>Mass-energy relation</li>
                  <li>Mass defect</li>
                  <li>Binding energy per nucleon and its variation with mass number</li>
                  <li>Nuclear fission</li>
                  <li>Nuclear fusion</li>
                </ul>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                  Practise numerical questions involving mass defect and binding energy. Also understand how the binding energy per nucleon relates to nuclear stability, fission and fusion.
                </p>
              </div>
            </div>
          </div>

          {/* Unit IX */}
          <div className="mb-10 bg-gray-50/60 p-6 md:p-8 rounded-2xl border border-gray-200">
            <span className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-700 rounded-full mb-3">
              Unit IX
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
              Unit IX: Electronic Devices
            </h3>

            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
              <h4 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                Chapter 14: Semiconductor Electronics: Materials, Devices and Simple Circuits
              </h4>
              <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
                This chapter introduces semiconductors and the operation of semiconductor diodes.
              </p>
              <div className="font-semibold text-gray-800 text-sm mb-2">Topics include:</div>
              <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-700 pl-2 mb-4">
                <li>Energy bands in conductors, semiconductors and insulators (qualitative ideas only)</li>
                <li>Intrinsic and extrinsic semiconductors</li>
                <li>p-type and n-type semiconductors</li>
                <li>p-n junction</li>
                <li>Semiconductor diode</li>
                <li>Current-voltage characteristics of a diode in forward and reverse bias</li>
                <li>Application of a junction diode as a rectifier</li>
              </ul>
              <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-orange-50/40 p-3 rounded-lg border border-orange-100">
                Practise drawing the p-n junction diode circuit and its current-voltage characteristics. Understand the difference between forward bias and reverse bias, and explain how a diode is used for rectification.
              </p>
            </div>
          </div>
        </div>

        {/* Theory Exam Pattern */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Physics Theory Exam Pattern
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-3 leading-relaxed">
            The Physics theory paper carries 70 marks and has a duration of three hours.
          </p>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            The official question-paper design distributes marks across three broad learning categories.
          </p>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Question category</th>
                  <th className="px-6 py-3.5 text-center font-semibold">Marks</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Approximate weightage</th>
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
                  <td className="px-6 py-3.5 text-center text-orange-600">70</td>
                  <td className="px-6 py-3.5 text-right text-orange-600">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
            This distribution shows that the examination assesses more than memory and formula recall. Students also need to apply concepts, interpret information and solve unfamiliar problems.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
            Question paper structure
          </h3>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            The CBSE sample paper currently available for Class 12 Physics contains 33 compulsory questions across five sections.
          </p>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Section</th>
                  <th className="px-6 py-3.5 text-left font-semibold">Question format</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {questionPaperStructureData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                    <td className="px-6 py-3.5 font-bold text-gray-900">{row.section}</td>
                    <td className="px-6 py-3.5 text-gray-700">{row.format}</td>
                    <td className="px-6 py-3.5 text-right font-medium text-gray-900">{row.marks}</td>
                  </tr>
                ))}
                <tr className="bg-orange-50/80 font-bold text-gray-900">
                  <td className="px-6 py-3.5" colSpan={2}>Total</td>
                  <td className="px-6 py-3.5 text-right text-orange-600">70</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            There is no overall choice. Internal choices are available in selected questions. Refer to the official sample paper for the exact question-wise instructions and choices.
          </p>
        </div>

        {/* Practical Assessment */}
        <div className="mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Physics Practical Syllabus and Marks Distribution
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            Practical assessment carries 30 marks and has a separate evaluation scheme. It tests students' ability to perform experiments, record observations, understand laboratory procedures and explain experimental results.
          </p>

          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
            Practical marks distribution
          </h3>
          <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-6">
            <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
              <thead className="bg-orange-500 text-white">
                <tr>
                  <th className="px-6 py-3.5 text-left font-semibold">Practical assessment component</th>
                  <th className="px-6 py-3.5 text-right font-semibold">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {practicalMarksData.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                    <td className="px-6 py-3.5 text-gray-900 font-medium">{row.component}</td>
                    <td className="px-6 py-3.5 text-right font-medium text-gray-700">{row.marks}</td>
                  </tr>
                ))}
                <tr className="bg-orange-50/80 font-bold text-gray-900">
                  <td className="px-6 py-3.5">Total</td>
                  <td className="px-6 py-3.5 text-right text-orange-600">30</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-6 text-gray-700 text-sm md:text-base leading-relaxed">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Practical record requirements</h3>
              <p className="mb-2">The practical record submitted for the annual examination must include:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>At least eight experiments, with four from each section.</li>
                <li>At least six activities, with three from each section.</li>
                <li>A report of the investigatory project.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">Examples of prescribed Physics practicals</h3>
              <p className="mb-3">The official practical list includes experiments such as:</p>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Section A</h4>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>Determining the resistivity of wires using a graph between potential difference and current.</li>
                    <li>Finding the resistance of a wire or standard resistor using a metre bridge.</li>
                    <li>Verifying the laws of combination of resistances.</li>
                    <li>Determining the resistance of a galvanometer by the half-deflection method.</li>
                    <li>Converting a galvanometer into an ammeter or voltmeter.</li>
                    <li>Finding the frequency of AC mains using a sonometer.</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="font-bold text-gray-900 mb-2">Section B</h4>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>Finding the focal length of a concave mirror.</li>
                    <li>Finding the focal length of a convex or concave lens.</li>
                    <li>Determining the angle of minimum deviation for a prism.</li>
                    <li>Finding the refractive index of a glass slab.</li>
                    <li>Drawing the current-voltage characteristic curve of a p-n junction diode.</li>
                  </ul>
                </div>
              </div>

              <p className="mt-4">
                Students should refer to the official practical list for the complete set of experiments and activities. They should also practise explaining the aim, apparatus, procedure, observations, calculations and precautions for their assigned experiments.
              </p>
            </div>
          </div>
        </div>

        {/* How to Prepare */}
        <div className="mb-14">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 border-l-4 border-orange-500 pl-3">
            How to Prepare for CBSE Class 12 Physics
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-8 leading-relaxed">
            Effective Physics preparation requires conceptual understanding, numerical practice, diagrams, revision and practical work. Reading a chapter or memorising its formulas is not enough. Students should be able to apply what they have studied to different types of questions.
          </p>

          <div className="space-y-8 text-gray-800 leading-relaxed text-sm md:text-base">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                1. Divide the syllabus into manageable topics
              </h3>
              <p className="mb-3">
                Start by making a checklist of all 14 chapters. Divide each chapter into smaller topics and record your progress.
              </p>
              <p className="mb-4">A simple tracker can help:</p>
              <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4 max-w-2xl">
                <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                  <thead className="bg-orange-500 text-white">
                    <tr>
                      <th className="px-6 py-3.5 text-left font-semibold">Chapter</th>
                      <th className="px-6 py-3.5 text-center font-semibold">Concept understood</th>
                      <th className="px-6 py-3.5 text-center font-semibold">Questions practised</th>
                      <th className="px-6 py-3.5 text-center font-semibold">Needs revision</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {progressTrackerData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                        <td className="px-6 py-3 font-medium text-gray-900">{row.chapter}</td>
                        <td className="px-6 py-3 text-center text-gray-700">{row.understood}</td>
                        <td className="px-6 py-3 text-center text-gray-700">{row.practised}</td>
                        <td className="px-6 py-3 text-center text-gray-700">{row.revision}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Update the tracker after studying and practising each topic. Mark a topic as complete only when you can explain the concept and solve questions independently.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                2. Understand the concept before memorising formulas
              </h3>
              <p className="mb-2">For every new topic, follow a consistent process:</p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-gray-700">
                <li>Read the concept and understand the physical meaning.</li>
                <li>Identify the quantities, symbols and SI units involved.</li>
                <li>Study the relevant formula and the conditions under which it applies.</li>
                <li>Work through a solved example.</li>
                <li>Close the solution and solve a similar question independently.</li>
                <li>Review the step where you made a mistake, if the answer is incorrect.</li>
              </ol>
              <p className="mt-2 text-gray-700">
                For example, before solving a question using Kirchhoff's rules, understand current conservation at a junction and the voltage changes around a closed loop.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                3. Practise numerical questions systematically
              </h3>
              <p className="mb-3">
                Numerical problems require both formula knowledge and correct application.
              </p>
              <p className="mb-2">Use this sequence while solving:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
                <li><strong>Given:</strong> Write the values provided in the question.</li>
                <li><strong>Find:</strong> Identify the quantity that needs to be calculated.</li>
                <li><strong>Concept:</strong> Identify the relevant Physics principle.</li>
                <li><strong>Formula:</strong> Write the appropriate equation.</li>
                <li><strong>Calculation:</strong> Substitute the values and show the steps.</li>
                <li><strong>Answer:</strong> Include the correct unit and check whether the result is reasonable.</li>
              </ul>
              <p className="mt-2 text-gray-700">
                Practise questions with different values and arrangements. Do not rely on remembering the steps of one solved example.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                4. Make a formula and units notebook
              </h3>
              <p className="mb-3">
                Maintain a separate notebook for important formulas, symbols, SI units and conditions of application.
              </p>
              <p className="mb-2">Organise it chapter-wise. For each formula, record:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
                <li>The formula and meaning of each symbol</li>
                <li>SI units of the quantities involved</li>
                <li>Conditions under which the formula is used</li>
                <li>A short example</li>
                <li>Common calculation or substitution mistakes</li>
              </ul>
              <p className="mt-3 text-gray-700">
                Revise the notebook regularly and test yourself by recalling formulas without looking at the page.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                5. Practise diagrams, graphs and circuit representations
              </h3>
              <p className="mb-3">
                Diagrams are an important part of Physics because they help explain physical arrangements and show how different quantities are related.
              </p>
              <p className="mb-2">Practise drawing and labelling:</p>
              <ul className="list-disc list-inside space-y-1 pl-2 text-gray-700">
                <li>Electric field lines and charge arrangements</li>
                <li>Magnetic field and force diagrams</li>
                <li>Electrical circuits and galvanometer conversions</li>
                <li>AC phasor diagrams</li>
                <li>Ray diagrams for mirrors, lenses and optical instruments</li>
                <li>Young's double-slit experiment arrangement</li>
                <li>Photoelectric-effect graphs</li>
                <li>Diode circuits and current-voltage characteristics</li>
              </ul>
              <p className="mt-3 text-gray-700">
                Do not simply copy diagrams from a textbook. Draw them from memory, label them correctly and explain what they represent.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                6. Maintain an error log
              </h3>
              <p className="mb-4">
                Record mistakes made during practice so that you can identify recurring problems.
              </p>
              <div className="overflow-x-auto shadow-sm rounded-xl border border-gray-200 mb-4">
                <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
                  <thead className="bg-orange-500 text-white">
                    <tr>
                      <th className="px-6 py-3.5 text-left font-semibold">Type of mistake</th>
                      <th className="px-6 py-3.5 text-left font-semibold">Example</th>
                      <th className="px-6 py-3.5 text-left font-semibold">What to review</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {errorLogData.map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50/70"}>
                        <td className="px-6 py-3 font-semibold text-gray-900">{row.type}</td>
                        <td className="px-6 py-3 text-gray-700">{row.example}</td>
                        <td className="px-6 py-3 text-gray-700">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                Reattempt these questions after a gap. A topic should not be considered fully revised until you can solve previously incorrect questions without relying on the solution.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                7. Prepare for practical assessment throughout the year
              </h3>
              <p className="mb-2">
                Do not leave practical preparation until the end of the course.
              </p>
              <p className="mb-2">
                Read the aim and principle of each experiment, understand the apparatus, practise the procedure and learn how to record observations. Review graphs, calculations, sources of error and precautions where relevant.
              </p>
              <p className="text-gray-700">
                You should also be able to explain why a particular apparatus is used and how the result relates to the underlying Physics concept.
              </p>
            </div>

            <div>
              <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-2">
                8. Solve official sample papers and marking schemes
              </h3>
              <p className="mb-2">
                After covering the syllabus, practise complete question papers under timed conditions.
              </p>
              <p className="mb-2">A useful process is:</p>
              <ol className="list-decimal list-inside space-y-1 pl-2 text-gray-700">
                <li>Download the official CBSE Physics sample paper.</li>
                <li>Attempt all questions within the examination time.</li>
                <li>Avoid checking answers while solving.</li>
                <li>Compare your responses with the official marking scheme.</li>
                <li>Identify questions where you lost marks.</li>
                <li>Revisit the concepts and solve similar questions again.</li>
              </ol>
              <p className="mt-2 text-gray-700">
                Use the marking scheme to understand the expected steps and explanation. Do not treat sample-paper questions as guaranteed questions for the board examination.
              </p>
            </div>
          </div>
        </div>

        {/* PDF Download Section */}
        <div className="mb-14 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 md:p-8 rounded-2xl border border-orange-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Physics Syllabus PDF
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            Students should refer to the official CBSE curriculum to check the prescribed chapter topics, course structure, practical requirements and question-paper design.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-orange-200 shadow-sm">
            <div>
              <h4 className="font-bold text-gray-900 text-base md:text-lg">
                CBSE Class 12 Physics Syllabus (Subject Code 043)
              </h4>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                Official CBSE Curriculum Document (PDF)
              </p>
            </div>
            <button
              onClick={() => handleDownloadClick("/path/to/cbse-class-12-physics-syllabus.pdf")}
              className="inline-flex items-center gap-2 bg-orange-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-orange-700 transition shadow-sm shrink-0"
            >
              <MdDownload className="text-xl" />
              Download Syllabus PDF
            </button>
          </div>
        </div>

        {/* Sample Papers Section */}
        <div className="mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 border-l-4 border-orange-500 pl-3">
            CBSE Class 12 Physics Sample Paper and Marking Scheme
          </h2>
          <p className="text-gray-700 text-sm md:text-base mb-4 leading-relaxed">
            Sample papers help students understand the question format, practise time management and assess their preparation.
          </p>
          <p className="text-gray-800 font-semibold text-sm md:text-base mb-3">
            Use the official CBSE resources:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm md:text-base text-gray-700 pl-2 mb-4">
            <li>Physics sample question paper</li>
            <li>Physics sample paper marking scheme</li>
            <li>CBSE Class XII sample papers and marking schemes</li>
            <li>CBSE curriculum and syllabus portal</li>
          </ul>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            Attempt the sample paper before checking its marking scheme. This gives you a clearer picture of the topics you understand and the areas that require further revision.
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
            Frequently Asked Questions About CBSE Class 12 Physics
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
