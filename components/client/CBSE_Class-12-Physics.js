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
      "name": "What is the CBSE Class 12 Physics syllabus for 2024–25?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It includes Electrostatics, Current Electricity, Optics, EM waves, Dual Nature, Atoms, Nuclei, and Electronic Devices."
      }
    },
    {
      "@type": "Question",
      "name": "Has CBSE reduced the Physics syllabus for 2024–25?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No major reduction. The syllabus follows the standard 9-unit structure as per the latest CBSE curriculum."
      }
    },
    {
      "@type": "Question",
      "name": "How many practicals are in Class 12 Physics?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": " The Class 12 Physics practical exam is 30 marks, covering experiments, records, activities, and viva."
      }
    },
    {
      "@type": "Question",
      "name": "Which chapters carry the highest weightage?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": " Optics, Current Electricity, Electrostatics, and Electronic Devices often carry the highest marks."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I download the Class 12 Physics syllabus PDF?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can download the latest Class 12 Physics syllabus directly from Learnosphere’s CBSE syllabus section."
      }
    },
    {
      "@type": "Question",
      "name": "Is Class 12 Physics difficult?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Physics becomes easier with clear concepts, regular practice, and understanding the syllabus structure."
      }
    },
    {
      "@type": "Question",
      "name": "Where can I download the Class 12 Chemistry syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, most Class 12 Physics chapters overlap with JEE and NEET topics, making this syllabus very important."
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


export default function Physics12() {
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
      <div className=" p-0 md:p-12  flex flex-col  font-Poppins justify-center mt-12">
        <div className="">
          <h1 className="p-4  text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Class 12 Physics Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-8 ">
          <div className=" w-full  mt-12">
            <p className="  text-center md:text-start p-4">
              The CBSE Class 12 Physics syllabus 2024-25 prescribed by NCERT for
              the academic year 2024-25 has been meticulously prepared by
              Learnosphere, ensuring alignment with the latest guidelines. This
              syllabus offers students a comprehensive understanding of various
              physics concepts and topics, emphasizing the significance of a
              systematic approach to studying physics effectively.
              <br />
            </p>

            <p className=" text-center md:text-start p-4">
              {" "}
              The Class 12 Physics syllabus NCERT covers a wide range of
              essential areas, including electrostatics, electromagnetism,
              optics, modern physics, and more. It provides a balanced
              combination of theoretical knowledge and practical applications.
              Practical sessions are incorporated into the syllabus to enable
              students to gain hands-on experience and develop crucial
              laboratory skills. The practical syllabus emphasizes conducting
              experiments, analyzing data, and interpreting results, enabling a
              holistic learning experience.
              <br />  <br />{" "}The CBSE Class 12 Physics syllabus for the academic year
              2024–25 plays a crucial role in helping students prepare for their board exams
              and competitive exams such as JEE Main, JEE Advanced, and NEET. If you already
              know the basics of what this subject includes but want a clearer, more detailed,
              and student-friendly explanation, this article will guide you through everything.
              It covers the syllabus of Physics Class 12 CBSE 2024–25, chapter-wise topics, practical
              evaluation, marking scheme, and how to study effectively. The goal is to not only explain
              the syllabus but also help students understand how to use it for smarter preparation.
              <br />  <br />Learnosphere provides the complete CBSE syllabus for Class 1 to 12, including
              Class 12 Physics, in an easy-to-navigate format. Students can directly download, read, and
              follow the syllabus for all subjects without confusion. If you're searching for accurate,
              updated, and student-friendly content, Learnosphere ensures everything is aligned with
              the latest CBSE curriculum.

            </p>
            <p className=" text-center md:text-start p-4">
              The CBSE (Central Board of Secondary Education) Class 12 Physics
              syllabus is divided into various units and sections. Here's an
              overview of the units and their key topics:
            </p>
          </div>
        </div>
        <section className="mt-20 px-4 md:px-12 font-Poppins">

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-center text-orange-600">
            Why Understanding the CBSE Class 12 Physics Syllabus Matters
          </h2>

          {/* Intro paragraph */}
          <p className="mt-6 text-gray-700 text-center md:w-[75%] mx-auto leading-7">
            Physics in Class 12 is not just another subject; it is the foundation of engineering, medical,
            architecture, and research careers. A large number of students feel overwhelmed not because
            Physics is difficult, but because they do not fully understand what the syllabus demands.
          </p>

          {/* Subheading */}
          <p className="mt-10 text-xl font-semibold text-gray-900 text-center">
            Knowing the CBSE Class 12 Physics syllabus helps students:
          </p>

          {/* Beautified List */}
          <ul className="mt-8 space-y-4 md:w-[70%] mx-auto text-gray-700 text-md leading-7">

            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-2xl font-bold">•</span>
              <span>Plan a clear chapter-wise study strategy</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-2xl font-bold">•</span>
              <span>Understand weightage and scoring areas</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-2xl font-bold">•</span>
              <span>Prioritize JEE/NEET-oriented topics</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-2xl font-bold">•</span>
              <span>Manage revision and practice effectively</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-2xl font-bold">•</span>
              <span>Reduce exam stress and confusion</span>
            </li>

          </ul>



        </section>
        <section className="mt-20 px-4 md:px-12 font-Poppins">

          {/* Title */}
          <h2 className="text-center text-2xl md:text-3xl font-bold text-orange-600 mb-12">
            Detailed Overview of the Syllabus of Physics Class 12 CBSE 2024–25
          </h2>

          {/* Grid for Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Unit I Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Unit I: Electrostatics</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Electric charges and fields</li>
                <li>Gauss’s theorem</li>
                <li>Electric potential and capacitance</li>
              </ul>
              <p className="text-gray-600 text-sm">
                This unit strengthens the basics of force, charge, and electric fields—highly important for JEE aspirants.
              </p>
            </div>

            {/* Unit II Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Unit II: Current Electricity</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Electric current and resistance</li>
                <li>Drift velocity</li>
                <li>Internal resistance and EMF</li>
                <li>Electrical networks and Kirchhoff's rules</li>
              </ul>
              <p className="text-gray-600 text-sm">
                A scoring unit with predictable numerical problems.
              </p>
            </div>

            {/* Unit III Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Unit III: Magnetic Effects of Current & Magnetism</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Biot-Savart law, Ampere's law</li>
                <li>Moving coil galvanometer</li>
                <li>Bar magnet and magnetic field</li>
                <li>Earth’s magnetism</li>
              </ul>
              <p className="text-gray-600 text-sm">
                This unit requires conceptual clarity but offers good scoring opportunities.
              </p>
            </div>

            {/* Unit IV Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Unit IV: Electromagnetic Induction and Alternating Current</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Faraday’s laws</li>
                <li>Lenz’s law</li>
                <li>Eddy currents</li>
                <li>AC circuits, transformers</li>
              </ul>
              <p className="text-gray-600 text-sm">
                One of the most interesting and logical units in the CBSE Class 12 Physics syllabus.
              </p>
            </div>

            {/* Unit V Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Unit V: Electromagnetic Waves</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Properties</li>
                <li>Electromagnetic spectrum</li>
              </ul>
              <p className="text-gray-600 text-sm">
                A short, easy, and highly scoring unit.
              </p>
            </div>

            {/* Unit VI Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Unit VI: Optics</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Reflection and refraction</li>
                <li>Ray optics</li>
                <li>Wave optics</li>
                <li>Interference, diffraction, polarization</li>
              </ul>
              <p className="text-gray-600 text-sm">
                One of the most important units, carrying significant exam weightage.
              </p>
            </div>

            {/* Unit VII Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Unit VII: Dual Nature of Radiation and Matter</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Photoelectric effect</li>
                <li>Particle nature of light</li>
                <li>de Broglie waves</li>
              </ul>
              <p className="text-gray-600 text-sm">
                Critical for both board exams and competitive exams.
              </p>
            </div>

            {/* Unit VIII Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Unit VIII: Atoms and Nuclei</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Bohr model</li>
                <li>Radioactivity</li>
                <li>Nuclear fission and fusion</li>
              </ul>
              <p className="text-gray-600 text-sm">
                A mix of conceptual theory and factual learning.
              </p>
            </div>

            {/* Unit IX Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 mb-4">Unit IX: Electronic Devices</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                <li>Semiconductors</li>
                <li>Junction diodes</li>
                <li>Logic gates</li>
              </ul>
              <p className="text-gray-600 text-sm">
                Students often find this easy and high-scoring.
              </p>
            </div>

          </div>
        </section>
        {/* Closing paragraph */}
        <p className="mt-10 text-gray-700 text-center md:w-[75%] mx-auto leading-7">
          The curriculum is structured to help students build conceptual knowledge and apply it in numerical
          and real-life situations. With proper understanding, Physics becomes far more manageable.
        </p>
        <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Physics Part - I
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-1/Electric Charges And Fields.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>
              Electric Charges And Fields{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-1/Electrostatic Potential And Capacitance.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
              Electrostatic Potential And Capacitance{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-1/Current Electricity.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>Current
              Electricity{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-1/Moving Charges And Magnetism.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>Moving
              Charges And Magnetism{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-1/Magnetism And Matter.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Magnetism And Matter{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-1/Electromagnetic Induction.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>
              Electromagnetic Induction{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-1/Alternating Current.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>
              Alternating Current{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-1/Electromagnetic Waves.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>
              Electromagnetic Waves{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Physics Part - II
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-2/Ray Optics and Optical Instruments.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>Ray
              Optics and Optical Instruments{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Physics/Part-2/Wave Optics.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>Wave
              Optics{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-2/Dual Nature Of Radiation And Matter.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>Dual
              Nature Of Radiation And Matter{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Physics/Part-2/Atoms.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span> Atoms{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Physics/Part-2/Nuclei.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>Nuclei{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Physics/Part-2/Semiconductor Electronics Materials Devices And Simple Circuits.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
              Semiconductor Electronics Materials Devices And Simple Circuits{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 ">
          <p className=" text-start p-4 font-bold  text-[1.1em]">
            Practical skills and experiments are an essential part of the
            Physics syllabus, and the practical exam carries 30 marks.
          </p>
          <p className=" text-start px-4 font-semibold  text-[1.1em]">
            Practical (30 Marks)
          </p>
          <ol className=" list-disc text-start px-4 font-semibold  text-[1em]">
            Two experiments
            <li className="text-start mt-2 text-orange-500  text-[.9em]">
              One from each section (8 + 8) Marks
            </li>
          </ol>
          <ol
            className=" list-disc text-start px-4 font-semibold   text-[1em]"
            l
          >
            Practical record (experiment and activities)
            <li className="text-start mt-2 text-orange-500  text-[.9em]">
              5 Marks
            </li>
          </ol>
          <ol className=" list-disc text-start px-4 font-semibold  text-[1em]">
            Investigatory project
            <li className="text-start mt-2 text-orange-500  text-[.9em]">
              3 Marks
            </li>
          </ol>
          <ol className=" list-disc text-start px-4 font-semibold  text-[1em]">
            Viva on experiments, activities, and project
            <li className="text-start mt-2  text-orange-500 text-[.9em]">
              6 Marks
            </li>
          </ol>
        </div>
        <div className="flex flex-col md:flex-row gap-8"></div>
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
