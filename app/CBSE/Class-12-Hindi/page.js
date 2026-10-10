"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { PiCloudSlash } from "react-icons/pi";
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
      "name": " What is included in the CBSE Class 12 Hindi syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": " It includes reading, writing skills, grammar, and NCERT literature for Core and Elective Hindi."
      }
    },
    {
      "@type": "Question",
      "name": " Where can I download the Class 12 Hindi syllabus PDF for 2025?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can get the updated 2025 Hindi syllabus PDF from CBSE’s website or Learnosphere’s study resources page"
      }
    },
    {
      "@type": "Question",
      "name": " How many marks is the Class 12 Hindi paper?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Hindi exam is usually 80 marks theory and 20 marks internal, based on CBSE’s assessment pattern."
      }
    },
    {
      "@type": "Question",
      "name": " Is the Class 12 Hindi syllabus difficult?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, it’s manageable with regular reading, writing practice, and understanding NCERT chapters well."
      }
    },
    {
      "@type": "Question",
      "name": "How can Learnosphere help me with Class 12 Hindi preparation?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Learnosphere offers notes, quizzes, and sample papers that match the CBSE Hindi syllabus for easier study."
      }
    },
    {
      "@type": "Question",
      "name": "Which books are used for Class 12 Hindi Core?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NCERT books—Aaroh Part 2 and Vitan Part 2—are used for Hindi Core."
      }
    },
    {
      "@type": "Question",
      "name": "What is the best way to score high in Class 12 Hindi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Focus on writing practice, literature summaries, grammar, and solving sample papers regularly."
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

export default function Hindi12() {
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
            CBSE Class 12 Hindi Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-6">
          <div className="w-full md:w-2/5  text-center md:text-start pt-6">
            <p className="text-start p-4 ">
              The NCERT Class 12 Hindi core syllabus has been revised for the
              academic year 2024-25, as per the guidelines set by the Central
              Board of Secondary Education (CBSE). The syllabus includes a total
              of 10 units, covering topics such as अपठित बोध (Unseen
              Comprehension), अभिव्यक्ति और माध्यम (Expression and Medium),
              साहित्य (Literature), and रचनात्मक लेखन (Creative Writing).{" "}
            </p>
            <ul className="p-4 m-4 list-disc flex flex-col gap-3 font-semibold">
              <li>
                Increased focus on critical thinking and analytical skills
              </li>
              <li>
                Addition of new topics, such as पत्रकारिता और जनसंचार
                (Journalism and Mass Communication)
              </li>
              <li>
                Removal of some topics, such as भाषा-विज्ञान (Linguistics)
              </li>
              <li>A greater emphasis on Hindi as a medium of communication</li>
            </ul>
            <p className="text-start p-4">
              The CBSE Class 12 Hindi Syllabus plays a crucial role in helping students build
              strong language skills, improve comprehension, and prepare effectively for board exams.
              Whether you are a student planning your study strategy, a teacher designing lesson plans,
              or a parent trying to guide your child, understanding the Hindi syllabus class 12 CBSE in
              a clear and simplified manner is essential. This comprehensive guide explains the syllabus,
              its structure, important chapters, marking scheme, and how to study smarter for better
              results—without confusion or unnecessary technical jargon.

            </p>
          </div>
          <div className="pt-8 overflow-x-auto w-full md:w-3/5">
            <table className="min-w-full border-collapse font-Poppins border border-gray-600">
              <thead>
                <tr className="bg-orange-500">
                  <th className="border border-gray-600 px-2 py-2 text-left">
                    Section
                  </th>
                  <th className="border border-gray-600 px-2 py-2 text-left">
                    Content
                  </th>
                  <th className="border border-gray-600 px-2 py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-500 text-center "> A</td>
                  <td className="border border-gray-500 px-2 ">
                    {" "}
                    Reading Comprehension
                  </td>
                  <td className="border border-gray-500 p-2 ">
                    <p className="font-bold">Unseen Passage:</p>
                    <ol className="list-disc ml-4 md:ml-5 ">
                      <li>One passage of approximately 500-600 words</li>
                      <li> Comprehension questions based on the passage</li>
                    </ol>
                    <p className="font-bold">Poetry:</p>
                    <ol className="list-disc ml-4 md:ml-5">
                      <li>
                        One unseen poem with questions to test comprehension,
                        interpretation, and appreciation
                      </li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 text-center p-2 "> B</td>
                  <td className="border border-gray-500 ">
                    <p>Creative Writing Skills </p>
                  </td>
                  <td className="border border-gray-500 p-2 ">
                    <p className="font-bold">Short Writing Tasks</p>
                    <ol className="list-disc ml-4 md:ml-5">
                      <li>Notice, Advertisement </li>
                    </ol>
                    <p className="font-bold">Formal Letters</p>
                    <ol className="list-disc ml-4 md:ml-5">
                      <li>Application for a job or letter to the editor</li>
                    </ol>
                    <p className="font-bold">Long Writing Tasks</p>
                    <ol className="list-disc ml-4 md:ml-5">
                      <li>Article, Report Writing </li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500  text-center"> C</td>
                  <td className="border border-gray-500 ">
                    <p>Literature Textbooks </p>
                  </td>
                  <td className="border border-gray-500 p-2 ">
                    <p className="font-bold"> Aroh Prose</p>
                    <ol className="list-disc ml-4 md:ml-5">
                      <li> Includes stories, essays, and articles</li>
                    </ol>
                    <p className="font-bold">Aroh Poetry</p>
                    <ol className="list-disc ml-4 md:ml-5">
                      <li>
                        Poems from various poets, analyzing themes and styles
                      </li>
                    </ol>
                    <p className="font-bold">Vitan</p>
                    <ol className="list-disc ml-4 md:ml-5">
                      <li>Drama: Study of significant plays</li>
                      <li>Novel: Analysis of a prescribed novel</li>
                      <li>
                        Essays: Understanding and critique of selected essays
                      </li>
                    </ol>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-12 px-4 md:px-20">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4 text-center md:text-start">
            Why Understanding the Class 12 CBSE Hindi Syllabus Matters
          </h2>

          {/* Intro Paragraph */}
          <p className="text-[1em] md:text-[1.05em] mb-6">
            Class 12 is one of the most defining stages of a student’s academic life. Subjects like Hindi improve expression, cultural understanding, analytical thinking, and communication—skills that are useful in every stream.
          </p>

          {/* Card with List */}
          <div className="p-6 border-2 border-gray-200 rounded-xl shadow-lg shadow-orange-200">
            <p className="text-[1em] md:text-[1.05em] mb-4">
              A well-structured look at the CBSE Hindi Class 12 syllabus helps in:
            </p>

            <ul className="list-disc list-inside space-y-2 mb-4 text-[.95em]">
              <li>Planning chapters month-wise</li>
              <li>Understanding weightage for exams</li>
              <li>Knowing which sections require more writing practice</li>
              <li>Preparing for board paper patterns</li>
              <li>Reducing last-minute confusion</li>
            </ul>

            <p className="text-gray-700 text-[.95em]">
              Teachers get clarity to design lesson plans, parents can monitor progress better, and students can prepare more confidently.
            </p>
          </div>
        </div>
        <div className="mt-12 px-4 md:px-20">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-4 text-center md:text-start">
            Overview of the CBSE Class 12 Hindi Syllabus
          </h2>

          {/* Intro Paragraph */}
          <p className="text-[1em] md:text-[1.05em] mb-6">
            The Hindi syllabus for Class 12 CBSE mainly consists of two parts depending on the course type:
          </p>

          {/* Course Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Hindi Core */}
            <div className="p-6 border-2 border-gray-200 rounded-xl shadow-lg shadow-orange-200">
              <p className="font-bold text-orange-500 text-lg mb-2">1. Hindi Core (Hindi A)</p>
              <p className="text-[.95em]">
                This version emphasizes comprehension, writing skills, and modern literature.
              </p>
            </div>

            {/* Hindi Elective */}
            <div className="p-6 border-2 border-gray-200 rounded-xl shadow-lg shadow-orange-200">
              <p className="font-bold text-orange-500 text-lg mb-2">2. Hindi Elective (Hindi B)</p>
              <p className="text-[.95em]">
                This version provides a deeper, more detailed study of Hindi language, grammar, and extended literature.
              </p>
            </div>
          </div>

          <p className="text-[1em] md:text-[1.05em] mb-6">
            Both versions on CBSE’s official curriculum ensure that students develop reading, analytical, creative, and communication skills across prose, poetry, functional grammar, and writing.
          </p>

          {/* Detailed Structure Heading */}
          <h3 className="text-xl md:text-2xl font-bold text-orange-500 mb-4">
            Detailed Structure of the Hindi Syllabus Class 12 CBSE
          </h3>

          {/* Detailed Syllabus Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {/* Reading & Comprehension */}
            <div className="p-6 border-2 border-gray-200 rounded-xl shadow-lg shadow-orange-200">
              <p className="font-bold text-orange-500 text-lg mb-2">✓ Reading & Comprehension</p>
              <ul className="list-disc list-inside space-y-1 mb-2 text-[.95em]">
                <li>Unseen passages</li>
                <li>Extract-based questions</li>
                <li>Analytical interpretation</li>
              </ul>
              <p className="text-gray-700 text-[.95em]">
                This section tests a student’s ability to understand tone, theme, and context—skills highly relevant in real life.
              </p>
            </div>

            {/* Writing Skills */}
            <div className="p-6 border-2 border-gray-200 rounded-xl shadow-lg shadow-orange-200">
              <p className="font-bold text-orange-500 text-lg mb-2">✓ Writing Skills</p>
              <ul className="list-disc list-inside space-y-1 mb-2 text-[.95em]">
                <li>Letter writing (formal/informal)</li>
                <li>Article writing</li>
                <li>Report writing</li>
                <li>Advertisements & notices</li>
              </ul>
              <p className="text-gray-700 text-[.95em]">
                This part of the CBSE Hindi Class 12 syllabus focuses on creativity and clarity, helping students express ideas effectively.
              </p>
            </div>

            {/* Literature Section */}
            <div className="p-6 border-2 border-gray-200 rounded-xl shadow-lg shadow-orange-200">
              <p className="font-bold text-orange-500 text-lg mb-2">✓ Literature Section (गद्य – पद्य)</p>
              <ul className="list-disc list-inside space-y-1 mb-2 text-[.95em]">
                <li>आरोह भाग – 2</li>
                <li>वितान भाग – 2</li>
              </ul>
              <p className="text-gray-700 text-[.95em]">
                These include powerful stories, poems, biographies, and essays that strengthen language understanding and literary appreciation.
              </p>
            </div>

            {/* Functional Grammar */}
            <div className="p-6 border-2 border-gray-200 rounded-xl shadow-lg shadow-orange-200">
              <p className="font-bold text-orange-500 text-lg mb-2">✓ Functional Grammar (व्यावहारिक व्याकरण)</p>
              <ul className="list-disc list-inside space-y-1 mb-2 text-[.95em]">
                <li>Sandhi</li>
                <li>Samas</li>
                <li>Muhavare</li>
                <li>Vakya Shuddhi</li>
                <li>Bhasheey Prayog</li>
              </ul>
              <p className="text-gray-700 text-[.95em]">
                A strong grip on grammar is essential for scoring high marks and improving written communication.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 mb-10 md:mb-0 px-7 md:px-20 mt-8">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Aroh Part -II
            </p>
            <p className="font-bold  ml-6">[ काव्य भाग]</p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/आत्म-परिचय, एक गीत.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>
              आत्म-परिचय, एक गीत
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/पतंग.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>पतंग
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/कविता के बहाने, बात सीधी थी पर.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>कविता
              के बहाने, बात सीधी थी पर
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/कैमरे में बंद अपाहिज.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>कैमरे
              में बंद अपाहिज
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/उषा.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>उषा
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/बादल राग.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>बादल
              राग
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/कवितावली (उत्तर कांड से), लक्ष्मण-मूच्छ और राम का विलाप.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
              कवितावली (उत्तर कांड से), लक्ष्मण-मूच्छ और राम का विलाप
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/रुबाइयाँ, गज़ल.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>
              रुबाइयाँ, गज़ल
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/छोटा मेरा खेत, बगुलों के पंख.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 9 :</span>छोटा
              मेरा खेत, बगुलों के पंख
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <p className="font-bold  ml-6">[गद्य भाग]</p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/भक्तिन.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 10 :</span>भक्तिन
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/बाजार दर्शन.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 11 :</span>बाजार
              दर्शन
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/काले मेघा पानी दे.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 12 :</span>काले
              मेघा पानी दे
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/पहलवान की ढोलक.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 13 :</span>{" "}
              पहलवान की ढोलक
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/शिरीष के फूल.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 14 :</span>शिरीष
              के फूल
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Hindi/Part-1/श्रम-विभाजन और जाति-प्रथा, मेरी कल्पना का आदर्श समाज<.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 15:</span>
              श्रम-विभाजन और जाति-प्रथा, मेरी कल्पना का आदर्श समाज
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Vitan Part -II
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Hindi/Part-2/सिल्वर वैडिंग.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>सिल्वर
              वैडिंग
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Hindi/Part-2/जूझ.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>जूझ
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Hindi/Part-2/अतीत में दबे पाँव.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>अतीत
              में दबे पाँव
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <p className="ml-6 font-bold text-orange-600">हिंदी व्याकरण</p>
            <li className="ml-14 ">
              <span className="font-semibold ">समास (Compound Words): </span>
              Study of different types of compound words in Hindi, such as
              द्वंद्व समास, तत्पुरुष समास, बहुव्रीहि समास, and कर्मधारय समास.
            </li>
          </div>
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <li className="ml-14 ">
              <span className="font-semibold ">
                उपसर्ग और प्रत्यय (Prefixes and Suffixes):{" "}
              </span>
              Understanding the use and function of prefixes and suffixes in
              word formation.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">संधि (Sandhi): </span>Study of
              vowel and consonant combinations, including स्वर संधि, व्यंजन
              संधि, and विसर्ग संधि.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">
                रचना के आधार पर वाक्य भेद (Sentence Structure):{" "}
              </span>
              Types of sentences based on their structure like सरल, संयुक्त, और
              मिश्र वाक्य.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">क्रिया (Verb): </span>{" "}
              Understanding various forms and uses of verbs, including सकर्मक और
              अकर्मक क्रिया, मुख्य क्रिया और सहायक क्रिया.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">काल (Tense): </span>Study of the
              three types of tenses - वर्तमान, भूत, and भविष्यत काल, along with
              their subtypes.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">वाच्य (Voice): </span>Active and
              passive voice, with emphasis on प्रयोग में अंतर.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">
                वाच्य परिवर्तन (Voice Change):{" "}
              </span>
              Conversion of sentences from active to passive voice and vice
              versa.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">
                अलंकार (Figures of Speech):{" "}
              </span>
              Study of various figures of speech like अनुप्रास, यमक, उपमा, रूपक,
              and अन्योक्ति.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">
                मुहावरे और लोकोक्तियाँ (Idioms and Proverbs):{" "}
              </span>
              Learning common Hindi idioms and proverbs and their appropriate
              usage.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">
                {" "}
                पर्यायवाची और विलोम शब्द (Synonyms and Antonyms):
              </span>
              Understanding words with similar meanings (synonyms) and opposite
              meanings (antonyms).
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">
                शुद्ध वर्तनी (Correct Spelling):{" "}
              </span>
              Focus on correct spelling and proper use of punctuation marks in
              Hindi.
            </li>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/5 pt-12 flex flex-col gap-4">
            <p className="font-bold">
              Here is the CBSE Class 12th Hindi Core syllabus for the 2024-2025
              academic year, organized in a table with the subtopics listed
              under each main section
            </p>
            <p className="font-semibold">internal Assessment(20)</p>
            <p className="text-orange-500 font-bold">
              Listening Skills, Speaking Skills, Project Work
            </p>
            <ol className="list-disc font-semibold">
              <li>Listening Skills-5 Marks</li>
              <li>Speaking Skills-5 Marks</li>
              <li>Project Work-10 Marks</li>
            </ol>
            <p className="font-bold text-orange-500">Summary of Differences</p>
            <ol className="font-semibold list-disc">
              <li>
                Hindi Core covers a broad range of texts and topics, providing a
                balanced approach to different literary forms and writing skills
              </li>
              <li>
                Hindi Elective focuses on a more detailed and in-depth study of
                fewer texts, offering a specialized analysis of literature
              </li>
            </ol>
          </div>

          <div className="pt-8 overflow-x-auto w-full md:w-3/5">
            <table className="min-w-full border-collapse font-Poppins border border-gray-600">
              <thead>
                <tr className="bg-orange-500">
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    Section
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    Content
                  </th>
                  <th className="border border-gray-600 px-4 py-2 text-left">
                    Marks
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-500 p-2 text-center"> A</td>
                  <td className="border border-gray-500 p-2">
                    <p className="font-bold">Reading Comprehension</p>
                    <p className="">Unseen Passage</p>
                    <ol className="list-disc ml-5">
                      <li>
                        One passage of approximately 500-600 words (10 marks)
                      </li>
                      <li>Comprehension questions based on the passage</li>
                    </ol>
                    <p> Poetry</p>
                    <ol className="list-disc ml-5">
                      <li>
                        One unseen poem with questions to test comprehension,
                        interpretation, and appreciation (10 marks
                      </li>
                    </ol>
                  </td>
                  <td className="border border-gray-500 p-2 text-center">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2 text-center"> B</td>
                  <td className="border border-gray-500 p-2">
                    <p className="font-bold">Creative Writing Skills </p>
                    <ol className="list-disc ml-5">
                      <li>Short Writing Tasks(4)</li>
                      <li>Formal Letters(6)</li>
                      <li>Long Writing Tasks(10)</li>
                    </ol>
                  </td>
                  <td className="border border-gray-500 p-2 text-center">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2 text-center"> C</td>
                  <td className="border border-gray-500 p-2">
                    <p className="font-bold">Literature Textbooks</p>
                    <ol className="list-disc ml-5">
                      <li>Aroh(20)</li>
                      <li>Vitan(20)</li>
                    </ol>
                  </td>
                  <td className="border border-gray-500 p-2 text-center ">
                    40
                  </td>
                </tr>
              </tbody>
            </table>
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
