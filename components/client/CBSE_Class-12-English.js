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
      name: "1. What is the CBSE Class 12 English syllabus for 2026-27?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The English Core syllabus consists of Reading Skills, Creative Writing Skills and Literature. The literature section covers the prescribed Flamingo and Vistas textbooks.",
      },
    },
    {
      "@type": "Question",
      name: "2. How many chapters are there in Class 12 English?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Flamingo includes eight prose chapters and five poems. Vistas contains six listed chapters, with Memories of Childhood including two autobiographical pieces.",
      },
    },
    {
      "@type": "Question",
      name: "3. How many marks is the CBSE Class 12 English paper worth?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The written English Core examination carries 80 marks, while internal assessment carries 20 marks, making a total of 100 marks.",
      },
    },
    {
      "@type": "Question",
      name: "4. What is the marks distribution for Class 12 English Core?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Reading Skills carries 22 marks, Creative Writing Skills carries 18 marks and Literature carries 40 marks in the theory examination.",
      },
    },
    {
      "@type": "Question",
      name: "5. What are the writing topics in the Class 12 English syllabus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Creative Writing Skills includes notice writing, formal or informal invitations and replies, letter writing, and article or report writing.",
      },
    },
    {
      "@type": "Question",
      name: "6. Which books are prescribed for CBSE Class 12 English Core?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The prescribed textbooks are Flamingo, which contains prose and poetry, and Vistas, the supplementary reader.",
      },
    },
    {
      "@type": "Question",
      name: "7. Where can I find the official CBSE Class 12 English syllabus?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Students can download the official English Core curriculum from the CBSE Academic website. It includes the prescribed books, examination structure, section-wise marks distribution and internal assessment guidelines.",
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

export default function English12() {
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
            CBSE Class 12 English Core Syllabus
          </h1>
        </div>

        {/* Intro Paragraphs */}
        <div className="space-y-4 text-base md:text-lg leading-relaxed text-gray-700">
          <p>
            The CBSE Class 12 English Core syllabus for the academic session
            focuses on reading comprehension, creative writing, and literature.
            The theory examination carries 80 marks, while internal assessment
            accounts for another 20 marks. The prescribed textbooks are Flamingo
            and Vistas, which include prose, poetry, and supplementary reading.
          </p>
          <p>
            Students looking for the CBSE Class 12 English syllabus can use this
            guide to check the complete chapter list, examination pattern,
            section-wise marks distribution and internal assessment
            requirements. It also explains the writing formats and question
            types included in the examination. Use the chapter lists to organise
            literature revision and the section-wise details to plan preparation
            for Reading Skills and Creative Writing Skills.
          </p>
          <p>
            For syllabuses of other classes and subjects,{" "}
            <Link
              href="/CBSE_Syllabus"
              className="text-orange-600 font-semibold hover:underline"
            >
              explore the CBSE syllabus for Classes 1 to 12
            </Link>
            . You can also consult the{" "}
            <a
              href="https://cbseacademic.nic.in/web_material/CurriculumMain27/SecPart2/English_core_SecP2_2026-27.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-600 font-semibold hover:underline"
            >
              official CBSE Class 12 English Core curriculum 2026-27 (PDF)
            </a>
            .
          </p>
        </div>

        {/* Section: Overview */}
        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            CBSE Class 12 English Syllabus Overview
          </h2>
          <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
            The CBSE Class 12 English Core examination is organised into three
            theory sections. Each section assesses a different set of language
            and literary skills.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="table-auto w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="border border-gray-400 p-3 text-center w-24 font-semibold">
                    Section
                  </th>
                  <th className="border border-gray-400 p-3 text-left font-semibold">
                    Subject area
                  </th>
                  <th className="border border-gray-400 p-3 text-center font-semibold">
                    Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 text-center font-medium">
                    A
                  </td>
                  <td className="border border-gray-400 p-3">Reading Skills</td>
                  <td className="border border-gray-400 p-3 text-center">22</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 text-center font-medium">
                    B
                  </td>
                  <td className="border border-gray-400 p-3">
                    Creative Writing Skills
                  </td>
                  <td className="border border-gray-400 p-3 text-center">18</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 text-center font-medium">
                    C
                  </td>
                  <td className="border border-gray-400 p-3">
                    Literature Textbook and Supplementary Reading Text
                  </td>
                  <td className="border border-gray-400 p-3 text-center">40</td>
                </tr>
                <tr className="bg-orange-100 font-bold">
                  <td className="border border-gray-400 p-3 text-center" colSpan={2}>
                    Total theory marks
                  </td>
                  <td className="border border-gray-400 p-3 text-center">80</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 text-center font-medium" colSpan={2}>
                    Internal Assessment: Listening, Speaking and Project Work
                  </td>
                  <td className="border border-gray-400 p-3 text-center">20</td>
                </tr>
                <tr className="bg-orange-200 font-bold">
                  <td className="border border-gray-400 p-3 text-center" colSpan={2}>
                    Grand total
                  </td>
                  <td className="border border-gray-400 p-3 text-center">100</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            The written examination has a duration of three hours. Students are
            assessed on comprehension, interpretation, analysis, writing,
            critical thinking and understanding of literary texts.
          </p>
        </div>

        {/* Section: All Chapter Names */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            Class 12 English All Chapter Names: Flamingo and Vistas
          </h2>
          <p className="mb-6 text-base md:text-lg text-gray-700 leading-relaxed">
            The prescribed English Core textbooks for Class 12 are Flamingo and
            Vistas. Flamingo contains prose and poetry, while Vistas is the
            supplementary reader. The following is the CBSE Class 12 English
            chapter list for 2026-27.
          </p>

          {/* 1. Flamingo: Prose */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              1. Flamingo: Prose Chapters
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="table-auto w-full md:w-3/4 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-2 text-center w-28 font-semibold">
                      Chapter No.
                    </th>
                    <th className="border border-gray-400 p-2 text-left font-semibold">
                      Chapter name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">1</td>
                    <td className="border border-gray-400 p-2">The Last Lesson</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">2</td>
                    <td className="border border-gray-400 p-2">Lost Spring</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">3</td>
                    <td className="border border-gray-400 p-2">Deep Water</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">4</td>
                    <td className="border border-gray-400 p-2">The Rattrap</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">5</td>
                    <td className="border border-gray-400 p-2">Indigo</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">6</td>
                    <td className="border border-gray-400 p-2">Poets and Pancakes</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">7</td>
                    <td className="border border-gray-400 p-2">The Interview</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">8</td>
                    <td className="border border-gray-400 p-2">Going Places</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              These prose chapters explore different experiences, social
              conditions, personal struggles and perspectives. While preparing,
              students should understand the central idea, important events,
              characters and themes of each chapter. They should also practise
              answering questions that require interpretation rather than simply
              recalling the story.
            </p>
          </div>

          {/* 2. Flamingo: Poetry */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              2. Flamingo: Poetry Chapters
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="table-auto w-full md:w-3/4 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-2 text-center w-28 font-semibold">
                      Poem No.
                    </th>
                    <th className="border border-gray-400 p-2 text-left font-semibold">
                      Poem name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">1</td>
                    <td className="border border-gray-400 p-2">
                      My Mother at Sixty-Six
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">2</td>
                    <td className="border border-gray-400 p-2">Keeping Quiet</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">3</td>
                    <td className="border border-gray-400 p-2">
                      A Thing of Beauty
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">4</td>
                    <td className="border border-gray-400 p-2">A Roadside Stand</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">5</td>
                    <td className="border border-gray-400 p-2">
                      Aunt Jennifer&apos;s Tigers
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              The poetry section focuses on understanding themes, imagery,
              poetic expression and the ideas presented by the poets. Students
              should pay attention to the central message, tone, symbols and
              literary devices used in each poem.
            </p>
          </div>

          {/* 3. Vistas */}
          <div className="mb-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              3. Vistas: Supplementary Reader Chapters
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="table-auto w-full md:w-3/4 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-2 text-center w-28 font-semibold">
                      Chapter No.
                    </th>
                    <th className="border border-gray-400 p-2 text-left font-semibold">
                      Chapter name
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">1</td>
                    <td className="border border-gray-400 p-2">The Third Level</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">2</td>
                    <td className="border border-gray-400 p-2">The Tiger King</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">3</td>
                    <td className="border border-gray-400 p-2">
                      Journey to the End of the Earth
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">4</td>
                    <td className="border border-gray-400 p-2">The Enemy</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">5</td>
                    <td className="border border-gray-400 p-2">On the Face of It</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-2 text-center">6</td>
                    <td className="border border-gray-400 p-2">
                      Memories of Childhood
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-orange-400 text-sm md:text-base space-y-2 mb-4">
              <p className="font-semibold text-gray-900">
                Memories of Childhood includes two autobiographical pieces:
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>The Cutting of My Long Hair</li>
                <li>We Too are Human Beings</li>
              </ul>
            </div>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Vistas develops students&apos; understanding of different
              characters, situations, social experiences and themes. Pay
              attention to the connection between events and the larger ideas
              presented in each story.
            </p>
          </div>
        </div>

        {/* Existing PDF Download Cards */}
        <div className="my-14">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-6">
            Download Class 12 English Chapter PDFs
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {/* Flamingo Prose & Poems */}
            <div className="flex flex-col gap-4 w-full md:w-[48%] p-6 border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
              <p className="font-bold text-black flex items-center gap-2 text-[1.1em]">
                <FaBook className="text-orange-500" size={20} />
                Flamingo [Prose]
              </p>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/The Last Lesson.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 1 :</strong> The
                  Last Lesson
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/Lost Spring.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 2 :</strong> Lost
                  Spring
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/Deep Water.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 3 :</strong> Deep
                  Water
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/The Rattrap.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 4 :</strong> The
                  Rattrap
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/Indigo.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 5 :</strong> Indigo
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/Poets and Pancakes.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 6 :</strong> Poets
                  and Pancakes
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/The Interview.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 7 :</strong> The
                  Interview
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/Going Places.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 8 :</strong> Going
                  Places
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <p className="font-bold text-black flex items-center gap-2 text-[1.1em] mt-4 pt-4 border-t border-gray-200">
                <FaBook className="text-orange-500" size={20} />
                Flamingo [Poem]
              </p>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/My Mother at Sixty-six.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 1 :</strong> My
                  Mother at Sixty-six
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/Keeping Quiet.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 2 :</strong>{" "}
                  Keeping Quiet
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/A Thing of Beauty.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 3 :</strong> A
                  Thing of Beauty
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/A Roadside Stand.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 4 :</strong> A
                  Roadside Stand
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-1/Aunt Jennifer’s Tigers.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 5 :</strong> Aunt
                  Jennifer&apos;s Tigers
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>
            </div>

            {/* Vistas */}
            <div className="flex flex-col gap-4 w-full md:w-[48%] p-6 border-2 border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-shadow bg-white">
              <p className="font-bold text-black flex items-center gap-2 text-[1.1em]">
                <FaBook className="text-orange-500" size={20} />
                Vistas
              </p>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-2/Third Level.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 1 :</strong> Third
                  Level
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-2/The Tiger King.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 2 :</strong> The
                  Tiger King
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-2/Journey to the End of the Earth.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 3 :</strong>{" "}
                  Journey to the End of the Earth
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-2/The Enemy.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 4 :</strong> The
                  Enemy
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-2/On the Face of It.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 5 :</strong> On the
                  Face of It
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>

              <a
                className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer text-gray-700 hover:text-orange-600"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-12 English/Part-2/Memories of Childhood.pdf"
                  )
                }
              >
                <span>
                  <strong className="text-gray-900">Chapter - 6 :</strong>{" "}
                  Memories of Childhood
                </span>
                <MdDownload className="text-orange-600 hover:scale-110 duration-200" size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Section: Marks Distribution */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            CBSE Class 12 English Marks Distribution
          </h2>
          <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
            The Class 12 English Core theory paper carries 80 marks. These marks
            are divided across reading comprehension, creative writing and
            literature.
          </p>

          {/* Section A */}
          <div className="my-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              Section A: Reading Skills (22 Marks)
            </h3>
            <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
              This section assesses how well students understand and interpret
              unseen passages. It includes two reading comprehension passages:
            </p>

            <div className="overflow-x-auto my-4">
              <table className="table-auto w-full md:w-4/5 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-3 text-left font-semibold">
                      Reading passage
                    </th>
                    <th className="border border-gray-400 p-3 text-center font-semibold w-28">
                      Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      One unseen passage: factual, descriptive or literary
                    </td>
                    <td className="border border-gray-400 p-3 text-center">12</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      One unseen case-based factual passage with verbal or
                      visual inputs, such as charts or statistical data
                    </td>
                    <td className="border border-gray-400 p-3 text-center">10</td>
                  </tr>
                  <tr className="bg-orange-100 font-bold">
                    <td className="border border-gray-400 p-3">Total</td>
                    <td className="border border-gray-400 p-3 text-center">22</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              The combined word limit for both passages is 700–750 words.
            </p>
            <p className="mt-2 text-base md:text-lg text-gray-700 leading-relaxed">
              Questions may include multiple-choice questions, objective-type
              questions and short-answer questions of approximately 40–50 words.
              Students are expected to identify key information, understand the
              writer&apos;s message, draw inferences and interpret information
              presented through text or data.
            </p>
          </div>

          {/* Section B */}
          <div className="my-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              Section B: Creative Writing Skills (18 Marks)
            </h3>
            <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
              The Creative Writing Skills section evaluates a student&apos;s
              ability to communicate information and ideas in appropriate
              formats.
            </p>

            <div className="overflow-x-auto my-4">
              <table className="table-auto w-full md:w-4/5 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-3 text-left font-semibold">
                      Writing task
                    </th>
                    <th className="border border-gray-400 p-3 text-center font-semibold w-28">
                      Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      Notice writing, up to 50 words
                    </td>
                    <td className="border border-gray-400 p-3 text-center">4</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      Formal or informal invitation and reply, up to 50 words
                    </td>
                    <td className="border border-gray-400 p-3 text-center">4</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      Letter writing, approximately 120–150 words
                    </td>
                    <td className="border border-gray-400 p-3 text-center">5</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      Article or report writing, 120–150 words
                    </td>
                    <td className="border border-gray-400 p-3 text-center">5</td>
                  </tr>
                  <tr className="bg-orange-100 font-bold">
                    <td className="border border-gray-400 p-3">Total</td>
                    <td className="border border-gray-400 p-3 text-center">18</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-3 text-base md:text-lg text-gray-700 leading-relaxed">
              The prescribed writing tasks include:
            </p>
            <div className="space-y-3 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                <strong className="text-gray-900">Notice writing:</strong>{" "}
                Students may need to prepare a notice containing relevant
                information about a school event, activity or announcement.
                Correct format, content and language accuracy are important.
              </p>
              <p>
                <strong className="text-gray-900">
                  Formal or informal invitation and reply:
                </strong>{" "}
                This task tests the ability to prepare invitations and
                appropriate replies according to the given situation.
              </p>
              <p>
                <strong className="text-gray-900">Letter writing:</strong>{" "}
                Questions may involve an application for a job with a bio-data
                or resume, or a letter to the editor expressing suggestions or
                opinions on issues of public interest.
              </p>
              <p>
                <strong className="text-gray-900">
                  Article and report writing:
                </strong>{" "}
                Students are expected to develop a descriptive or analytical
                response based on the verbal inputs provided in the question.
              </p>
              <p className="pt-2">
                For these tasks, understand the required format and follow the
                specified word limit. Organise the information logically and use
                clear, grammatically accurate language.
              </p>
            </div>
          </div>

          {/* Section C */}
          <div className="my-8">
            <h3 className="text-lg md:text-xl font-bold text-orange-600 mb-3">
              Section C: Literature Textbook and Supplementary Reading (40 Marks)
            </h3>
            <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
              This section is based on the prescribed Flamingo and Vistas
              textbooks. It assesses comprehension, interpretation, analysis,
              inference and critical thinking.
            </p>

            <div className="overflow-x-auto my-4">
              <table className="table-auto w-full md:w-4/5 border-collapse border border-gray-400">
                <thead>
                  <tr className="bg-orange-500 text-white">
                    <th className="border border-gray-400 p-3 text-left font-semibold">
                      Question type
                    </th>
                    <th className="border border-gray-400 p-3 text-center font-semibold w-28">
                      Marks
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      Poetry extract from Flamingo
                    </td>
                    <td className="border border-gray-400 p-3 text-center">6</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      Prose extract from Vistas
                    </td>
                    <td className="border border-gray-400 p-3 text-center">4</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      Prose extract from Flamingo
                    </td>
                    <td className="border border-gray-400 p-3 text-center">6</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      Five short-answer questions from Flamingo
                    </td>
                    <td className="border border-gray-400 p-3 text-center">10</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      Two short-answer questions from Vistas
                    </td>
                    <td className="border border-gray-400 p-3 text-center">4</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      One long-answer question from Flamingo
                    </td>
                    <td className="border border-gray-400 p-3 text-center">5</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-400 p-3">
                      One long-answer question from Vistas
                    </td>
                    <td className="border border-gray-400 p-3 text-center">5</td>
                  </tr>
                  <tr className="bg-orange-100 font-bold">
                    <td className="border border-gray-400 p-3">Total</td>
                    <td className="border border-gray-400 p-3 text-center">40</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              Short-answer questions from the literature section generally
              require responses of 40–50 words. Long-answer questions require
              approximately 120–150 words.
            </p>
            <p className="mt-2 text-base md:text-lg text-gray-700 leading-relaxed">
              Students should prepare the main ideas, character development,
              themes and important events in the prescribed chapters. For
              poetry, focus on interpretation, imagery, tone and literary
              expression. For prose, understand how the characters and events
              contribute to the central theme of the text.
            </p>
          </div>
        </div>

        {/* Section: Internal Assessment */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            CBSE Class 12 English Internal Assessment: 20 Marks
          </h2>
          <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
            In addition to the 80-mark written examination, CBSE includes 20 marks
            for internal assessment.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="table-auto w-full md:w-3/4 border-collapse border border-gray-400">
              <thead>
                <tr className="bg-orange-500 text-white">
                  <th className="border border-gray-400 p-3 text-left font-semibold">
                    Internal assessment component
                  </th>
                  <th className="border border-gray-400 p-3 text-center font-semibold w-28">
                    Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">
                    Listening Skills
                  </td>
                  <td className="border border-gray-400 p-3 text-center">5</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">
                    Speaking Skills
                  </td>
                  <td className="border border-gray-400 p-3 text-center">5</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-3 font-medium">
                    Project Work
                  </td>
                  <td className="border border-gray-400 p-3 text-center">10</td>
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
              <strong className="text-gray-900">Listening Skills:</strong> This
              component assesses the ability to understand spoken information,
              identify important details and interpret what is heard.
            </p>
            <p>
              <strong className="text-gray-900">Speaking Skills:</strong>{" "}
              Students are assessed on spoken communication, fluency,
              pronunciation, interaction and the ability to express ideas
              clearly.
            </p>
            <p>
              <strong className="text-gray-900">Project Work:</strong> Students
              complete a project based on the school&apos;s prescribed
              instructions. Project assessment includes the submitted work and
              its evaluation according to CBSE guidelines.
            </p>
            <p className="pt-2">
              Students should follow their school&apos;s assessment schedule and
              instructions for completing listening, speaking and project
              activities.
            </p>
          </div>
        </div>

        {/* Section: How to Prepare */}
        <div className="mt-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 border-l-4 border-orange-500 pl-3 mb-4">
            How to Prepare for the CBSE Class 12 English Examination
          </h2>
          <p className="mb-4 text-base md:text-lg text-gray-700 leading-relaxed">
            A useful preparation plan should cover all three sections of the
            English Core syllabus instead of focusing only on literature.
          </p>

          <ol className="list-decimal list-outside ml-6 space-y-3 text-base md:text-lg text-gray-700 leading-relaxed">
            <li>
              <strong className="text-gray-900">
                Complete the Flamingo and Vistas chapters:
              </strong>{" "}
              Read the prescribed prose, poetry and supplementary stories. Make
              revision notes covering central themes, characters, important
              events and interpretations.
            </li>
            <li>
              <strong className="text-gray-900">Practise unseen passages:</strong>{" "}
              Solve factual and case-based passages regularly. Work on
              identifying relevant details, understanding the main idea and
              drawing conclusions from written or visual information.
            </li>
            <li>
              <strong className="text-gray-900">
                Revise creative writing formats:
              </strong>{" "}
              Practise notices, invitations, replies, letters, articles and
              reports. Follow the prescribed formats and word limits while
              writing.
            </li>
            <li>
              <strong className="text-gray-900">
                Practise literature-based questions:
              </strong>{" "}
              Prepare short and long answers from both Flamingo and Vistas.
              Support your explanations with relevant details from the prescribed
              texts.
            </li>
            <li>
              <strong className="text-gray-900">
                Prepare for listening and speaking assessments:
              </strong>{" "}
              Take part in discussions, presentations and listening activities
              to develop clear communication and comprehension.
            </li>
            <li>
              <strong className="text-gray-900">
                Complete project work on time:
              </strong>{" "}
              Follow your school&apos;s project instructions and maintain the
              required records or submissions for internal assessment.
            </li>
            <li>
              <strong className="text-gray-900">
                Use the current examination structure for revision:
              </strong>{" "}
              Practise questions based on the 2026-27 syllabus instead of relying
              on older paper patterns that may contain different formats or
              deleted content.
            </li>
          </ol>
        </div>

        {/* Section: Official PDF */}
        <div className="mt-12 bg-orange-50 p-6 rounded-xl border border-orange-200">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Official CBSE Class 12 English Core Syllabus PDF 2026-27
          </h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-3">
            For the complete prescribed curriculum, students should refer to the
            official CBSE document for English Core, Subject Code 301. It
            provides details about the reading and writing sections, prescribed
            Flamingo and Vistas chapters, question-paper design and internal
            assessment guidelines.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            For other subjects and classes, visit the{" "}
            <Link
              href="/CBSE_Syllabus"
              className="text-orange-600 font-semibold hover:underline"
            >
              Learnosphere CBSE syllabus section
            </Link>
            .
          </p>
        </div>

        {/* Section: FAQ */}
        <div className="mt-14 mb-16">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions about CBSE Class 12 English Syllabus
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
