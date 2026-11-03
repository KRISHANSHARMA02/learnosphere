"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";
import Link from "next/link";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "1. What are the four subjects in Class 10 SST?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "CBSE Class 10 Social Science consists of History, Geography, Political Science and Economics. Each subject carries 20 marks in the theory assessment.",
      },
    },
    {
      "@type": "Question",
      name: "2. How many chapters are there in Class 10 Social Science?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The 2026-27 CBSE curriculum lists five History chapters, seven Geography chapters, five Political Science chapters and five Economics chapters. Some specified chapters or topics are assigned to project work, periodic assessment or map-pointing rather than full written board examination coverage.",
      },
    },
    {
      "@type": "Question",
      name: "3. How many marks is the Class 10 SST board paper worth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The CBSE Class 10 Social Science theory examination carries 80 marks. Internal assessment accounts for another 20 marks, making a total of 100 marks.",
      },
    },
    {
      "@type": "Question",
      name: "4. How many marks are allocated to map work in Class 10 SST?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Map pointing accounts for five marks in the theory examination: two marks in History and three marks in Geography.",
      },
    },
    {
      "@type": "Question",
      name: "5. Is The Age of Industrialisation included in the Class 10 SST board examination?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "In the CBSE 2026-27 curriculum, The Age of Industrialisation is assessed as part of periodic assessment only.",
      },
    },
    {
      "@type": "Question",
      name: "6. Is Consumer Rights included in the Class 10 Economics board examination?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Consumer Rights is designated as project work in the 2026-27 curriculum rather than a regular written board examination chapter.",
      },
    },
    {
      "@type": "Question",
      name: "7. Where can I check the official CBSE Class 10 Social Science syllabus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Students can refer to the official CBSE Academic website and download the Class 10 Social Science curriculum for 2026-27. The syllabus includes chapter details, assessment requirements, map work and examination structure.",
      },
    },
  ],
};

export const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        className="flex items-center justify-between w-full px-4 py-3 bg-white rounded-lg shadow-md hover:shadow-lg focus:outline-none transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[0.9em] md:text-lg font-semibold font-Poppins text-left text-gray-800">
          {question}
        </span>
        <span className="ml-2 flex-shrink-0">
          {isOpen ? (
            <FiMinus className="text-orange-600 text-2xl" />
          ) : (
            <FiPlus className="text-gray-600 text-2xl" />
          )}
        </span>
      </button>
      {isOpen && (
        <p className="mt-2 px-4 py-3 text-gray-800 bg-gray-50 border-l-4 border-orange-500 rounded-r-lg font-Poppins shadow-inner leading-relaxed text-sm md:text-base">
          {answer}
        </p>
      )}
    </div>
  );
};

export default function Socialscience() {
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
    <div className="font-Poppins text-gray-800 bg-white">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-24">
        {/* H1 Heading */}
        <div className="my-8 text-center">
          <h1 className="p-4 text-2xl md:text-4xl font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl w-full md:w-[70%] rounded-lg mx-auto">
            CBSE Class 10 Social Science Syllabus and Chapters
          </h1>
        </div>

        {/* Intro Paragraphs */}
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700">
          <p>
            The CBSE Class 10 Social Science syllabus for the academic session is
            divided into four subjects: History, Geography, Political Science and
            Economics. Each subject covers different areas of social, political,
            geographical and economic knowledge. The curriculum includes 20
            marks for each subject, making a total of 80 marks for the theory
            examination, along with 20 marks for internal assessment.
          </p>
          <p>
            Students looking for the CBSE Class 10 SST syllabus can use this page
            to check the complete subject-wise chapter list, marks distribution,
            map work requirements and assessment details. The chapter-wise
            information also explains which topics are included in the written
            board examination and which are assigned to periodic assessment or
            project work.
          </p>
          <p>
            For students checking syllabuses across different classes and
            subjects,{" "}
            <Link
              href="/CBSE_Syllabus"
              className="text-orange-600 font-semibold hover:underline"
            >
              explore the CBSE syllabus for Classes 1 to 12
            </Link>
            .
          </p>
        </div>

        {/* Section: Subject-wise Structure */}
        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            CBSE Class 10 SST Syllabus 2026-27: Subject-wise Structure
          </h2>
          <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
            The Class 10 Social Science syllabus follows four main subject areas.
            Each carries 20 marks in the theory examination, including the
            allocated map-work marks for History and Geography.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="border border-gray-400 p-3 text-left font-semibold">
                    Subject
                  </th>
                  <th className="border border-gray-400 p-3 text-left font-semibold">
                    Textbook
                  </th>
                  <th className="border border-gray-400 p-3 text-center font-semibold">
                    Theory marks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">History</td>
                  <td className="border border-gray-400 p-3">
                    India and the Contemporary World-II
                  </td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">Geography</td>
                  <td className="border border-gray-400 p-3">Contemporary India-II</td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">
                    Political Science
                  </td>
                  <td className="border border-gray-400 p-3">
                    Democratic Politics-II
                  </td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">Economics</td>
                  <td className="border border-gray-400 p-3">
                    Understanding Economic Development
                  </td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                </tr>
                <tr className="bg-orange-100 font-bold">
                  <td className="border border-gray-400 p-3" colSpan={2}>
                    Total
                  </td>
                  <td className="border border-gray-400 p-3 text-center">80</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            The written examination includes questions based on the prescribed
            curriculum, with map-pointing questions forming part of the History
            and Geography assessment. Students should check the assessment
            scope of individual chapters instead of assuming that every textbook
            topic is evaluated in the same way.
          </p>
        </div>

        {/* Section: Chapter Names List */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            Class 10 SST All Chapter Names: Subject-wise List
          </h2>
          <p className="mb-6 text-base md:text-lg text-gray-700 leading-relaxed">
            The CBSE Class 10 Social Science curriculum lists chapters under four
            subject areas. The following chapter list follows the official
            2026-27 curriculum.
          </p>

          {/* 1. History */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              1. History: India and the Contemporary World-II
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="table-auto w-full md:w-3/4 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-2 text-center w-28 font-semibold">
                      Chapter No.
                    </th>
                    <th className="border border-gray-400 p-2 text-left font-semibold">
                      Class 10 History chapter names
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">1</td>
                    <td className="border border-gray-400 p-2">
                      The Rise of Nationalism in Europe
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">2</td>
                    <td className="border border-gray-400 p-2">Nationalism in India</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">3</td>
                    <td className="border border-gray-400 p-2">
                      The Making of a Global World
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">4</td>
                    <td className="border border-gray-400 p-2">
                      The Age of Industrialisation
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">5</td>
                    <td className="border border-gray-400 p-2">
                      Print Culture and the Modern World
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-400 text-sm md:text-base space-y-2">
              <p className="font-semibold text-gray-900">
                Important examination information:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  <span className="font-semibold">The Making of a Global World:</span>{" "}
                  Subtopics 1 to 1.3, covering the pre-modern world through
                  conquest, disease and trade, are evaluated in the board
                  examination. The specified remaining portions are included in
                  the interdisciplinary project.
                </li>
                <li>
                  <span className="font-semibold">The Age of Industrialisation</span>{" "}
                  is assessed as part of periodic assessment only.
                </li>
                <li>
                  Students should prepare the prescribed map work under{" "}
                  <span className="font-semibold">Nationalism in India</span>.
                </li>
              </ul>
            </div>
          </div>

          {/* 2. Geography */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              2. Geography: Contemporary India-II
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="table-auto w-full md:w-3/4 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-2 text-center w-28 font-semibold">
                      Chapter No.
                    </th>
                    <th className="border border-gray-400 p-2 text-left font-semibold">
                      Class 10 Geography chapter names
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">1</td>
                    <td className="border border-gray-400 p-2">
                      Resources and Development
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">2</td>
                    <td className="border border-gray-400 p-2">
                      Forest and Wildlife Resources
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">3</td>
                    <td className="border border-gray-400 p-2">Water Resources</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">4</td>
                    <td className="border border-gray-400 p-2">Agriculture</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">5</td>
                    <td className="border border-gray-400 p-2">
                      Minerals and Energy Resources
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">6</td>
                    <td className="border border-gray-400 p-2">
                      Manufacturing Industries
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">7</td>
                    <td className="border border-gray-400 p-2">
                      Lifelines of National Economy
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-400 text-sm md:text-base space-y-2">
              <p className="font-semibold text-gray-900">
                Important examination information:
              </p>
              <p className="text-gray-700">
                The seven chapters are listed in the Geography curriculum.
                However, for Lifelines of National Economy, only map-pointing is
                evaluated in the board examination. The curriculum also
                identifies interdisciplinary project work connected with the
                chapter.
              </p>
              <p className="text-gray-700">
                Map work is an important part of Geography preparation. Students
                should practise identifying and locating the prescribed
                geographical features, resources, agricultural areas, industries
                and other relevant locations.
              </p>
            </div>
          </div>

          {/* 3. Political Science */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              3. Political Science: Democratic Politics-II
            </h3>
            <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
              Political Science, also known as Civics, covers democratic
              institutions, political processes and the functioning of democracy
              in India.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="table-auto w-full md:w-3/4 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-2 text-center w-28 font-semibold">
                      Chapter No.
                    </th>
                    <th className="border border-gray-400 p-2 text-left font-semibold">
                      Class 10 Political Science chapter names
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">1</td>
                    <td className="border border-gray-400 p-2">Power-sharing</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">2</td>
                    <td className="border border-gray-400 p-2">Federalism</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">3</td>
                    <td className="border border-gray-400 p-2">
                      Gender, Religion and Caste
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">4</td>
                    <td className="border border-gray-400 p-2">Political Parties</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">5</td>
                    <td className="border border-gray-400 p-2">
                      Outcomes of Democracy
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              These chapters help students understand how power is distributed,
              how different levels of government function, how social diversity
              influences politics and how democratic institutions are evaluated.
            </p>
          </div>

          {/* 4. Economics */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              4. Economics: Understanding Economic Development
            </h3>
            <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
              Economics focuses on development, economic activities, financial
              systems and the effects of globalisation.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="table-auto w-full md:w-3/4 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-2 text-center w-28 font-semibold">
                      Chapter No.
                    </th>
                    <th className="border border-gray-400 p-2 text-left font-semibold">
                      Class 10 Economics chapter names
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">1</td>
                    <td className="border border-gray-400 p-2">Development</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">2</td>
                    <td className="border border-gray-400 p-2">
                      Sectors of the Indian Economy
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">3</td>
                    <td className="border border-gray-400 p-2">Money and Credit</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">4</td>
                    <td className="border border-gray-400 p-2">
                      Globalisation and the Indian Economy
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">5</td>
                    <td className="border border-gray-400 p-2">Consumer Rights</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-400 text-sm md:text-base space-y-2 mb-4">
              <p className="font-semibold text-gray-900">
                Important examination information:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>
                  <span className="font-semibold">
                    Globalisation and the Indian Economy:
                  </span>{" "}
                  The topics What is Globalisation? and Factors that have enabled
                  Globalisation are evaluated in the board examination. Other
                  specified topics, including production across countries,
                  Chinese toys in India, the World Trade Organisation and the
                  struggle for a fair globalisation, are included in
                  interdisciplinary project work.
                </li>
                <li>
                  <span className="font-semibold">Consumer Rights</span> is
                  designated as project work.
                </li>
              </ul>
            </div>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              The chapter list contains 22 entries across the four subject areas.
              However, students should distinguish between chapters and topics
              assessed in the written board examination, periodic assessments
              and project work.
            </p>
          </div>
        </div>

        {/* Existing PDF Download Cards */}
        <div className="my-14">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-6">
            Download Class 10 Social Science Chapter PDFs
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {/* Geography Card */}
            <div className="flex flex-col gap-4 w-full md:w-[48%] p-6 border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
              <p className="font-bold text-black flex items-center gap-2 text-[1.1em]">
                <FaBook className="text-orange-500" size={20} />
                Geography – Contemporary India - II
              </p>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Resource and Development.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 1 :</strong>{" "}
                  Resource and Development
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Forest and Wildlife Resources.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 2 :</strong> Forest
                  and Wildlife Resources
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Water Resources.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 3 :</strong> Water
                  Resources
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Agriculture.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 4 :</strong> Agriculture
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Minerals and Energy Resources.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 5 :</strong> Minerals
                  and Energy Resources
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Manufacturing Industries.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 6 :</strong>{" "}
                  Manufacturing Industries
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Lifelines of National Economy.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 7 :</strong> Lifelines
                  of National Economy
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>
            </div>

            {/* Economics Card */}
            <div className="flex flex-col gap-4 w-full md:w-[48%] p-6 border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
              <p className="font-bold text-black flex items-center gap-2 text-[1.1em]">
                <FaBook className="text-orange-500" size={20} />
                Understanding Economic Development – II
              </p>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-2/Understanding Economic Development.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 1 :</strong>{" "}
                  Understanding Economic Development
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-2/Sectors of Indian Economy.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 2 :</strong> Sectors
                  of Indian Economy
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-2/Money and Credit.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 3 :</strong> Money
                  and Credit
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-2/Globalisation and the Indian Economy.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 4 :</strong>{" "}
                  Globalisation and the Indian Economy
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-2/Consumer Rights.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 5 :</strong> Consumer
                  Rights
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>
            </div>

            {/* History Card */}
            <div className="flex flex-col gap-4 w-full md:w-[48%] p-6 border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
              <p className="font-bold text-black flex items-center gap-2 text-[1.1em]">
                <FaBook className="text-orange-500" size={20} />
                India and the Contemporary World - II
              </p>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-3/The Rise of Nationalism in Europe.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 1 :</strong> The
                  Rise of Nationalism in Europe
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-3/Nationalism in India.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 2 :</strong>{" "}
                  Nationalism in India
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-3/The Making of Global World.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 3 :</strong> The
                  Making of Global World
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-3/The Age of Industrialisation.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 4 :</strong> The Age
                  of Industrialisation
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-3/Print Culture and the Modern World.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 5 :</strong> Print
                  Culture and the Modern World
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>
            </div>

            {/* Civics Card */}
            <div className="flex flex-col gap-4 w-full md:w-[48%] p-6 border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
              <p className="font-bold text-black flex items-center gap-2 text-[1.1em]">
                <FaBook className="text-orange-500" size={20} />
                Civics – Democratic Politics - II
              </p>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-4/Power Sharing.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 1 :</strong> Power
                  Sharing
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-4/Federalism.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 2 :</strong> Federalism
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-4/Democracy and Diversity.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 3 :</strong>{" "}
                  Democracy and Diversity
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-4/Gender Religion and Caste.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 4 :</strong> Gender
                  Religion and Caste
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-10 Sst/Part-4/Popular Struggles and Movements.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 5 :</strong> Popular
                  Struggles and Movements
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Section: Marks Distribution */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            CBSE Class 10 Social Science Marks Distribution 2026-27
          </h2>
          <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
            The CBSE Class 10 SST theory examination carries 80 marks. Each of
            the four subjects has a total allocation of 20 marks.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="table-auto w-full md:w-4/5 border-collapse border border-gray-400">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="border border-gray-400 p-3 text-left font-semibold">
                    Subject
                  </th>
                  <th className="border border-gray-400 p-3 text-center font-semibold">
                    Written theory marks
                  </th>
                  <th className="border border-gray-400 p-3 text-center font-semibold">
                    Map marks
                  </th>
                  <th className="border border-gray-400 p-3 text-center font-semibold">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">History</td>
                  <td className="border border-gray-400 p-3 text-center">18</td>
                  <td className="border border-gray-400 p-3 text-center">2</td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">Geography</td>
                  <td className="border border-gray-400 p-3 text-center">17</td>
                  <td className="border border-gray-400 p-3 text-center">3</td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">
                    Political Science
                  </td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                  <td className="border border-gray-400 p-3 text-center">—</td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">Economics</td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                  <td className="border border-gray-400 p-3 text-center">—</td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                </tr>
                <tr className="bg-orange-100 font-bold">
                  <td className="border border-gray-400 p-3">Total</td>
                  <td className="border border-gray-400 p-3 text-center">75</td>
                  <td className="border border-gray-400 p-3 text-center">5</td>
                  <td className="border border-gray-400 p-3 text-center">80</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Map pointing accounts for five marks in the Social Science theory
            paper. Two marks are allocated to History map work and three marks
            to Geography map work.
          </p>

          {/* Sub-heading: Question Paper Pattern */}
          <div className="mt-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              Class 10 SST Question Paper Pattern
            </h3>
            <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
              The official 2026-27 curriculum provides the following
              distribution of question types for the 80-mark theory paper.
            </p>

            <div className="overflow-x-auto my-6">
              <table className="table-auto w-full md:w-3/4 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-3 text-left font-semibold">
                      Question type
                    </th>
                    <th className="border border-gray-400 p-3 text-center font-semibold">
                      Number of questions
                    </th>
                    <th className="border border-gray-400 p-3 text-center font-semibold">
                      Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3 font-medium">
                      1-mark MCQs
                    </td>
                    <td className="border border-gray-400 p-3 text-center">20</td>
                    <td className="border border-gray-400 p-3 text-center">20</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3 font-medium">
                      2-mark questions
                    </td>
                    <td className="border border-gray-400 p-3 text-center">4</td>
                    <td className="border border-gray-400 p-3 text-center">8</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3 font-medium">
                      3-mark questions
                    </td>
                    <td className="border border-gray-400 p-3 text-center">5</td>
                    <td className="border border-gray-400 p-3 text-center">15</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3 font-medium">
                      4-mark case-based questions
                    </td>
                    <td className="border border-gray-400 p-3 text-center">3</td>
                    <td className="border border-gray-400 p-3 text-center">12</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3 font-medium">
                      5-mark questions
                    </td>
                    <td className="border border-gray-400 p-3 text-center">4</td>
                    <td className="border border-gray-400 p-3 text-center">20</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3 font-medium">
                      Map pointing
                    </td>
                    <td className="border border-gray-400 p-3 text-center">
                      As prescribed
                    </td>
                    <td className="border border-gray-400 p-3 text-center">5</td>
                  </tr>
                  <tr className="bg-orange-100 font-bold">
                    <td className="border border-gray-400 p-3" colSpan={2}>
                      Total
                    </td>
                    <td className="border border-gray-400 p-3 text-center">80</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Students should practise different question formats, including
              objective questions, descriptive answers, case-based questions and
              map work. The curriculum also gives considerable weight to
              analysing, evaluating and creating, so preparation should go
              beyond memorising textbook definitions.
            </p>
          </div>
        </div>

        {/* Section: Internal Assessment */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            CBSE Class 10 Social Science Internal Assessment: 20 Marks
          </h2>
          <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
            Along with the 80-mark theory examination, CBSE provides 20 marks for
            internal assessment. These marks are divided into four components.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="table-auto w-full md:w-3/4 border-collapse border border-gray-400">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="border border-gray-400 p-3 text-left font-semibold">
                    Assessment component
                  </th>
                  <th className="border border-gray-400 p-3 text-center font-semibold">
                    Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">
                    Periodic Assessment
                  </td>
                  <td className="border border-gray-400 p-3 text-center">5</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">
                    Multiple Assessment
                  </td>
                  <td className="border border-gray-400 p-3 text-center">5</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">
                    Subject Enrichment Activity
                  </td>
                  <td className="border border-gray-400 p-3 text-center">5</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">
                    Portfolio
                  </td>
                  <td className="border border-gray-400 p-3 text-center">5</td>
                </tr>
                <tr className="bg-orange-100 font-bold">
                  <td className="border border-gray-400 p-3">Total</td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-3 text-base md:text-lg text-gray-700 leading-relaxed">
            <p>
              <strong className="text-gray-900">Periodic Assessment:</strong>{" "}
              This includes pen-and-paper tests conducted during the academic
              session.
            </p>
            <p>
              <strong className="text-gray-900">Multiple Assessment:</strong>{" "}
              Schools may use quizzes, debates, role plays, viva, group
              discussions, concept maps, peer assessments and other activities.
              Interdisciplinary project work is also included in this assessment.
            </p>
            <p>
              <strong className="text-gray-900">Subject Enrichment Activity:</strong>{" "}
              This includes project work based on Consumer Rights, Social Issues
              or Sustainable Development, as prescribed in the curriculum.
            </p>
            <p>
              <strong className="text-gray-900">Portfolio:</strong> This includes
              classwork, assignments, activities, reflections, journals and
              other evidence of a student&apos;s participation and progress
              throughout the academic year.
            </p>
            <p className="pt-2">
              Students should follow their school&apos;s instructions and
              assessment schedule for completing these activities.
            </p>
          </div>
        </div>

        {/* Section: How to Prepare */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            How to Prepare for the CBSE Class 10 SST Examination
          </h2>
          <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
            A structured approach can make the Class 10 Social Science syllabus
            easier to revise. Students should organise their preparation by
            subject and pay attention to the different assessment requirements.
          </p>

          <ol className="list-decimal list-outside ml-6 space-y-3 text-base md:text-lg text-gray-700 leading-relaxed">
            <li>
              <strong className="text-gray-900">Follow the chapter-wise syllabus:</strong>{" "}
              Start with the History, Geography, Political Science and Economics
              chapter lists. Identify the topics prescribed for the board
              examination and those assigned to project or periodic assessment.
            </li>
            <li>
              <strong className="text-gray-900">Study the prescribed textbooks:</strong>{" "}
              Use the NCERT textbooks listed for each subject. Read the relevant
              chapters and understand the concepts, examples and important
              events instead of relying only on short summaries.
            </li>
            <li>
              <strong className="text-gray-900">Practise map work regularly:</strong>{" "}
              History and Geography together account for five map-pointing
              marks. Revise the locations and features specified by CBSE and
              practise locating them on maps.
            </li>
            <li>
              <strong className="text-gray-900">Practise different question formats:</strong>{" "}
              Solve MCQs, short-answer questions, long-answer questions and
              case-based questions. Pay attention to how answers are structured
              according to the marks allotted.
            </li>
            <li>
              <strong className="text-gray-900">Revise project and internal assessment requirements:</strong>{" "}
              Keep track of school assignments, interdisciplinary projects,
              portfolio work and other assessment activities.
            </li>
            <li>
              <strong className="text-gray-900">Check the latest curriculum:</strong>{" "}
              Compare your study materials with the current CBSE syllabus so that
              you do not spend unnecessary time on topics outside the relevant
              examination scope.
            </li>
          </ol>
        </div>

        {/* Section: Official PDF */}
        <div className="mt-12 bg-orange-50 p-6 rounded-xl border border-orange-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Official CBSE Class 10 Social Science Syllabus PDF
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-3">
            Students can refer to the official CBSE Social Science curriculum for
            the 2026-27 academic session to verify the prescribed chapters,
            learning outcomes, map-work requirements, question-paper structure
            and internal assessment guidelines.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            For syllabuses of other classes and subjects, visit the{" "}
            <Link
              href="/CBSE_Syllabus"
              className="text-orange-600 font-semibold hover:underline"
            >
              CBSE syllabus section on Learnosphere
            </Link>
            .
          </p>
        </div>

        {/* Section: FAQ */}
        <div className="mt-14 mb-16">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions about CBSE Class 10 SST Syllabus
          </h2>
          <div className="space-y-4">
            {faqSchema.mainEntity.map((item, index) => (
              <FaqItem
                key={index}
                question={item.name}
                answer={item.acceptedAnswer.text}
              />
            ))}
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
