"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is included in the CBSE Class 2 syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Class 2 learning programme develops foundational skills in languages, mathematics, communication and understanding the surrounding world. The NCERT Grade 2 textbook list includes English, Hindi, Mathematics and Urdu, where applicable. Schools may include additional learning areas."
      }
    },
    {
      "@type": "Question",
      "name": "Which English book is used in Class 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Mridang is the NCERT English textbook for Class 2. It includes stories, poems, picture reading and activities that help develop reading, writing, listening and speaking skills."
      }
    },
    {
      "@type": "Question",
      "name": "Which Hindi book is used in Class 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sarangi (सारंगी) is the NCERT Hindi textbook for Class 2. It contains stories and poems that help children improve reading comprehension, vocabulary and language expression."
      }
    },
    {
      "@type": "Question",
      "name": "Which Mathematics book is used in Class 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Joyful Mathematics is the NCERT Mathematics textbook for Class 2. It covers numbers, shapes, patterns, addition, subtraction, measurement, sharing, money and data handling."
      }
    },
    {
      "@type": "Question",
      "name": "How many chapters are there in Class 2 Maths?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NCERT Joyful Mathematics textbook listed by NCERT's educational resource portal contains 11 chapters."
      }
    },
    {
      "@type": "Question",
      "name": "How many chapters are there in Class 2 English?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NCERT Mridang textbook contains 13 lessons arranged across five units."
      }
    },
    {
      "@type": "Question",
      "name": "How many chapters are there in Class 2 Hindi?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NCERT Sarangi textbook lists 26 chapters."
      }
    },
    {
      "@type": "Question",
      "name": "Is EVS a separate NCERT subject in Class 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NCERT Grade 2 textbook list in its school advisory does not include a separate EVS textbook. Environmental awareness may be addressed through activities and school-specific learning plans. Parents should confirm the subject structure with their child's school."
      }
    },
    {
      "@type": "Question",
      "name": "Do all CBSE schools follow the same Class 2 subject list?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schools affiliated with CBSE work within the relevant educational framework, but their additional learning areas, supplementary books, teaching schedules and assessment arrangements can differ. Parents should check their school's official academic plan."
      }
    },
    {
      "@type": "Question",
      "name": "How can parents help children understand the Class 2 syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Parents can support learning through regular reading, basic mathematics activities, writing practice, textbook revision and real-life examples. Children should be encouraged to understand concepts rather than rely only on memorisation."
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

export default function Secondclass() {
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
    <div className="font-Poppins">
      <Navbar />
      <div className="p-0 md:p-12 flex flex-col font-Poppins justify-center mt-12">
        <div>
          <h1 className="p-4 text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl w-full md:w-[70%] rounded-lg text-center m-auto leading-tight">
            CBSE Class 2 Syllabus: Subjects and Learning Areas
          </h1>
        </div>

        {/* Overview & NCERT Textbooks Table */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[45%] flex flex-col gap-6 mt-8 md:text-start text-center pt-6">
            <p className="font-Poppins text-gray-800 leading-relaxed">
              The CBSE Class 2 syllabus helps children develop foundational skills in reading, writing, mathematics, communication and understanding their surroundings. At this stage, learning focuses on building basic concepts through stories, poems, activities, examples and practical experiences.
            </p>
            <p className="font-Poppins text-gray-800 leading-relaxed">
              NCERT has developed textbooks for Grade 2 in English, Hindi, Mathematics and Urdu. These include Mridang, Sarangi, Joyful Mathematics and Shehnai, respectively. Schools may also include additional subjects and learning activities according to their academic plans.
            </p>
            <p className="font-Poppins text-gray-800 leading-relaxed">
              This guide provides an overview of the NCERT textbooks, subject-wise learning areas, chapter names and useful preparation guidance for parents.
            </p>
          </div>

          <div className="w-full md:w-[55%] mt-8 md:mt-14 rounded-lg">
            <h3 className="text-xl font-bold text-orange-600 mb-2 font-Poppins">
              NCERT Textbooks for Class 2
            </h3>
            <p className="text-gray-700 text-sm mb-4 font-Poppins">
              NCERT has published textbooks for different learning areas at the foundational stage. The following books are listed for Grade 2:
            </p>
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-orange-500">
                <tr>
                  <th className="border border-gray-300 p-2 font-Poppins text-white">Subject</th>
                  <th className="border border-gray-300 p-2 font-Poppins text-white">NCERT textbook</th>
                  <th className="border border-gray-300 p-2 font-Poppins text-white">Main learning focus</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr>
                  <td className="border bg-amber-600 border-gray-300 p-2 font-Poppins text-sm md:text-md text-center font-semibold">
                    English
                  </td>
                  <td className="border bg-amber-600 border-gray-300 p-2 font-Poppins text-sm md:text-md text-center font-medium">
                    Mridang
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-4 font-Poppins font-light text-xs md:text-sm">
                    Reading, speaking, listening, vocabulary and writing
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600 border-gray-300 p-2 font-Poppins text-sm md:text-md text-center font-semibold">
                    Hindi
                  </td>
                  <td className="border bg-amber-600 border-gray-300 p-2 font-Poppins text-sm md:text-md text-center font-medium">
                    Sarangi
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-4 font-Poppins font-light text-xs md:text-sm">
                    Hindi reading, comprehension, vocabulary and expression
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600 border-gray-300 p-2 font-Poppins text-sm md:text-md text-center font-semibold">
                    Mathematics
                  </td>
                  <td className="border bg-amber-600 border-gray-300 p-2 font-Poppins text-sm md:text-md text-center font-medium">
                    Joyful Mathematics
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-4 font-Poppins font-light text-xs md:text-sm">
                    Numbers, shapes, patterns, measurement and data
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600 border-gray-300 p-2 font-Poppins text-sm md:text-md text-center font-semibold">
                    Urdu
                  </td>
                  <td className="border bg-amber-600 border-gray-300 p-2 font-Poppins text-sm md:text-md text-center font-medium">
                    Shehnai
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-4 font-Poppins font-light text-xs md:text-sm">
                    Urdu language learning, where applicable
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="mt-3 text-xs md:text-sm text-gray-600 italic font-Poppins">
              Schools may recommend additional books, workbooks and learning materials. Parents should check the book list provided by their child's school.
            </p>
          </div>
        </div>

        {/* Subjects Included in CBSE Class 2 Syllabus */}
        <section className="mt-16 px-4 md:px-12 font-Poppins">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-orange-500 bg-white border border-black py-4 rounded-lg shadow-xl w-full md:w-[70%] mx-auto">
            Subjects Included in the CBSE Class 2 Syllabus
          </h2>

          <p className="mt-6 text-gray-700 text-center md:w-[80%] mx-auto leading-7">
            The CBSE Class 2 syllabus encompasses essential learning areas designed to support balanced academic, emotional and physical development. Each subject introduces core skills through interactive stories, poems, and practical problem-solving.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-2">1. English</h3>
              <p className="text-gray-700 text-sm leading-6">
                Prescribed book: <strong>Mridang</strong>. Focuses on developing reading, writing, listening, speaking and vocabulary through engaging units and stories.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-2">2. Hindi</h3>
              <p className="text-gray-700 text-sm leading-6">
                Prescribed book: <strong>Sarangi (सारंगी)</strong>. Strengthens Hindi reading, comprehension, expression and moral values through 26 vibrant chapters.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-2">3. Mathematics</h3>
              <p className="text-gray-700 text-sm leading-6">
                Prescribed book: <strong>Joyful Mathematics</strong>. Introduces numbers, shapes, addition, subtraction, measurement, sharing, money and data handling.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-2">4. Urdu / Other Subjects</h3>
              <p className="text-gray-700 text-sm leading-6">
                Prescribed book: <strong>Shehnai</strong> (for Urdu). Along with school-level Environmental Awareness, Creative Arts and Physical Health activities.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Syllabus Sections */}
        <div className="flex flex-col gap-5 mt-8">
          <p className="font-bold border-2 border-orange-500 p-4 mt-8 rounded-lg text-center w-full md:w-[45%] m-auto text-2xl bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent from-orange-500 to-red-600">
            A Comprehensive Guide for Class 2
          </p>

          {/* 1. English Section */}
          <p className="font-bold text-md shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500 w-[60%] md:w-[15%] p-4 rounded-tl-lg rounded-tr-lg border-b-2 border-orange-800">
            Class 2 English Syllabus
          </p>
          <p className="font-medium text-center text-gray-700 max-w-4xl mx-auto leading-relaxed">
            The Class 2 English syllabus focuses on developing reading, writing, listening and speaking skills. Children learn through stories, poems, picture-reading exercises and classroom activities. The NCERT English textbook for Grade 2 is <strong>Mridang</strong>.
          </p>

          <div className="flex flex-col md:flex-row p-7 md:p-0 mt-5 mx-0 md:mx-40 gap-5 rounded-2xl">
            {/* Chapters Column */}
            <div className="flex flex-col gap-4 w-full md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200 bg-white">
              <p className="font-bold text-black flex items-center gap-1 text-[1.1em]">
                <FaBook className="text-orange-500" size={20} />
                Mridang: Chapter and Unit List
              </p>

              <p className="font-bold text-orange-600 p-1 text-md">Unit 1: Fun with Friends</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/My Bicycle.pdf")}
              >
                <span className="font-bold text-[1em]">1.</span> My Bicycle
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/Picture Reading.pdf")}
              >
                <span className="font-bold text-[1em]">2.</span> Picture Reading
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <p className="font-bold text-orange-600 p-1 text-md mt-2">Unit 2: Welcome to My World</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/It Is Fun.pdf")}
              >
                <span className="font-bold text-[1em]">3.</span> It Is Fun
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/Seeing  Without Seeing.pdf")}
              >
                <span className="font-bold text-[1em]">4.</span> Seeing without Seeing
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <p className="font-bold text-orange-600 p-1 text-md mt-2">Unit 3: Going Places</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/Come Back Soon.pdf")}
              >
                <span className="font-bold text-[1em]">5.</span> Come Back Soon
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/Between Home And School.pdf")}
              >
                <span className="font-bold text-[1em]">6.</span> Between Home and School
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/This Is My Town.pdf")}
              >
                <span className="font-bold text-[1em]">7.</span> This Is My Town
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <p className="font-bold text-orange-600 p-1 text-md mt-2">Unit 4: Life Around Us</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/A Show Of Clouds.pdf")}
              >
                <span className="font-bold text-[1em]">8.</span> A Show of Clouds
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/My Name.pdf")}
              >
                <span className="font-bold text-[1em]">9.</span> My Name
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/The Crow.pdf")}
              >
                <span className="font-bold text-[1em]">10.</span> The Crow
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/The Smart Monkey.pdf")}
              >
                <span className="font-bold text-[1em]">11.</span> The Smart Monkey
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <p className="font-bold text-orange-600 p-1 text-md mt-2">Unit 5: Harmony</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/Little Drops Of Water.pdf")}
              >
                <span className="font-bold text-[1em]">12.</span> Little Drops of Water
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 English/We Are All Indians.pdf")}
              >
                <span className="font-bold text-[1em]">13.</span> We Are All Indians
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
            </div>

            {/* Learning Areas Column */}
            <div className="flex flex-col gap-4 w-full md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200 bg-white">
              <h4 className="font-bold text-gray-800 text-[1.1em] border-b pb-2">
                Important English Learning Areas
              </h4>
              <p className="text-xs text-gray-600 italic">
                Students develop different language skills through their textbook and classroom activities.
              </p>

              <p className="font-bold text-orange-600">1. Reading Skills</p>
              <ul className="list-disc px-5 flex flex-col gap-2 text-[.9em] text-gray-700">
                <li>Reading short stories, poems and simple passages.</li>
                <li>Recognising familiar words and understanding their meanings.</li>
                <li>Picture reading and identifying objects or activities.</li>
                <li>Answering simple questions based on what they read.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-2">2. Writing Skills</p>
              <ul className="list-disc px-5 flex flex-col gap-2 text-[.9em] text-gray-700">
                <li>Forming simple and meaningful sentences.</li>
                <li>Writing short descriptions and paragraphs.</li>
                <li>Developing spelling and handwriting skills.</li>
                <li>Describing people, objects and everyday activities.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-2">3. Vocabulary and Grammar</p>
              <ul className="list-disc px-5 flex flex-col gap-2 text-[.9em] text-gray-700">
                <li>Learning new words through stories and pictures.</li>
                <li>Understanding common nouns, pronouns, verbs and describing words.</li>
                <li>Using words appropriately in simple sentences.</li>
                <li>Developing basic understanding of sentence structure.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-2">4. Listening and Speaking</p>
              <ul className="list-disc px-5 flex flex-col gap-2 text-[.9em] text-gray-700">
                <li>Listening to stories and instructions.</li>
                <li>Reciting poems with suitable pronunciation.</li>
                <li>Participating in simple conversations.</li>
                <li>Describing pictures and sharing ideas.</li>
              </ul>
            </div>
          </div>

          {/* 2. Hindi Section */}
          <p className="font-bold text-md text-white bg-gradient-to-r from-orange-600 to-orange-500 shadow-2xl w-[60%] md:w-[15%] p-4 rounded-tl-lg rounded-tr-lg border-b-2 border-orange-800 mt-10">
            Class 2 Hindi Syllabus
          </p>
          <p className="font-medium text-center text-gray-700 max-w-4xl mx-auto leading-relaxed">
            The Class 2 Hindi syllabus develops children's ability to read, understand and express ideas in Hindi. Students engage with stories, poems, vocabulary and activities through the prescribed textbook. The NCERT Hindi textbook for Grade 2 is <strong>Sarangi (सारंगी)</strong>.
          </p>

          <div className="flex flex-col md:flex-row p-7 md:p-0 mt-5 mx-0 md:mx-40 gap-10 rounded-2xl">
            {/* Chapters Column */}
            <div className="flex flex-col gap-3 w-full md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200 bg-white">
              <p className="font-bold text-black flex items-center gap-1 text-[1.1em]">
                <FaBook className="text-orange-500" size={20} />
                Sarangi: Chapter List (26 Chapters)
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/नीम की दादी.pdf")}
              >
                <span className="font-bold text-[1em]">1.</span> नीमा की दादी
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/घर.pdf")}
              >
                <span className="font-bold text-[1em]">2.</span> घर
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/माला की चाँदी की पुतली.pdf")}
              >
                <span className="font-bold text-[1em]">3.</span> माला की चाँदी की पायल
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/माँ.pdf")}
              >
                <span className="font-bold text-[1em]">4.</span> माँ
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/थथू और मैं.pdf")}
              >
                <span className="font-bold text-[1em]">5.</span> थाथू और मैं
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/चिंता.pdf")}
              >
                <span className="font-bold text-[1em]">6.</span> चींटा
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/टिल्लू जी.pdf")}
              >
                <span className="font-bold text-[1em]">7.</span> टिल्लू जी
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/तीन दोस्त.pdf")}
              >
                <span className="font-bold text-[1em]">8.</span> तीन दोस्त
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/दुनिया रंग-बिरंगी.pdf")}
              >
                <span className="font-bold text-[1em]">9.</span> दुनिया रंग-बिरंगी
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/कौन.pdf")}
              >
                <span className="font-bold text-[1em]">10.</span> कौन
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/बेरहम जोजो.pdf")}
              >
                <span className="font-bold text-[1em]">11.</span> बैंगनी जोजो
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/तोसिया का संदेह.pdf")}
              >
                <span className="font-bold text-[1em]">12.</span> तोसिया का सपना
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/आलू की सड़क.pdf")}
              >
                <span className="font-bold text-[1em]">13.</span> तालाब
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/बीज.pdf")}
              >
                <span className="font-bold text-[1em]">14.</span> बीज
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/किसान.pdf")}
              >
                <span className="font-bold text-[1em]">15.</span> किसान
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/मूली.pdf")}
              >
                <span className="font-bold text-[1em]">16.</span> मूली
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/जूते और दुकानें.pdf")}
              >
                <span className="font-bold text-[1em]">17.</span> बरसात और मेंढक
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/शेर और चूहों की दोस्ती.pdf")}
              >
                <span className="font-bold text-[1em]">18.</span> शेर और चूहे की दोस्ती
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/बाहर.pdf")}
              >
                <span className="font-bold text-[1em]">19.</span> आउट
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/छुप-छुपाई.pdf")}
              >
                <span className="font-bold text-[1em]">20.</span> छुपन-छुपाई
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/हाथी साइकल चल रहा था.pdf")}
              >
                <span className="font-bold text-[1em]">21.</span> हाथी साईकिल चला रहा है
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/चार दिशाएँ.pdf")}
              >
                <span className="font-bold text-[1em]">22.</span> चार दिशाएँ
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/चंदा माँ.pdf")}
              >
                <span className="font-bold text-[1em]">23.</span> चंदा मामा
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/मोती ताल में चंदा मामा.pdf")}
              >
                <span className="font-bold text-[1em]">24.</span> गिरे ताल में चंदा मामा
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/सबसे बड़ी छटा.pdf")}
              >
                <span className="font-bold text-[1em]">25.</span> सबसे बड़ा छाता
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Hindi/बादल.pdf")}
              >
                <span className="font-bold text-[1em]">26.</span> बादल
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
            </div>

            {/* Learning Areas Column */}
            <div className="flex flex-col gap-4 w-full md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200 bg-white">
              <h4 className="font-bold text-gray-800 text-[1.1em] border-b pb-2">
                Important Hindi Learning Areas
              </h4>

              <p className="font-bold text-orange-600">1. Reading Skills</p>
              <ul className="list-disc px-5 flex flex-col gap-2 text-[.9em] text-gray-700">
                <li>Reading simple Hindi stories and poems.</li>
                <li>Recognising familiar words and understanding their meanings.</li>
                <li>Reading sentences with appropriate pronunciation.</li>
                <li>Understanding the main ideas of short passages.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-2">2. Writing Skills</p>
              <ul className="list-disc px-5 flex flex-col gap-2 text-[.9em] text-gray-700">
                <li>Writing Hindi letters and words correctly.</li>
                <li>Forming simple sentences.</li>
                <li>Practising spelling and handwriting.</li>
                <li>Describing familiar objects, people and activities.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-2">3. Vocabulary and Language Understanding</p>
              <ul className="list-disc px-5 flex flex-col gap-2 text-[.9em] text-gray-700">
                <li>Learning new words from stories and poems.</li>
                <li>Understanding the meaning of simple sentences.</li>
                <li>Developing the ability to express ideas in Hindi.</li>
                <li>Participating in storytelling and recitation activities.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-2">4. Listening and Speaking</p>
              <ul className="list-disc px-5 flex flex-col gap-2 text-[.9em] text-gray-700">
                <li>Listening to Hindi stories and poems.</li>
                <li>Reciting poems and responding to questions.</li>
                <li>Describing pictures and everyday experiences.</li>
                <li>Developing confidence in spoken Hindi.</li>
              </ul>
            </div>
          </div>

          {/* 3. Mathematics Section */}
          <p className="font-bold text-md text-white bg-gradient-to-r from-orange-600 to-orange-500 shadow-2xl w-[65%] md:w-[20%] p-4 rounded-tl-lg rounded-tr-lg border-b-2 border-orange-800 mt-10">
            Class 2 Mathematics Syllabus
          </p>
          <p className="font-medium text-center text-gray-700 max-w-4xl mx-auto leading-relaxed">
            The Class 2 Maths syllabus builds numerical understanding and introduces children to practical mathematical concepts. Students learn through counting, grouping, shapes, patterns, measurement, sharing and everyday problem-solving activities. The NCERT Mathematics textbook for Grade 2 is <strong>Joyful Mathematics</strong>.
          </p>

          <div className="flex flex-col md:flex-row p-7 md:p-0 mt-5 mx-0 md:mx-40 gap-5 rounded-2xl">
            {/* Chapters Column */}
            <div className="flex flex-col gap-3 w-full md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200 bg-white">
              <p className="font-bold text-black flex items-center gap-1 text-[1.1em]">
                <FaBook className="text-orange-500" size={20} />
                Joyful Mathematics: Chapter List
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/A Day At The Beach.pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">1. A Day at the Beach</span>
                  <p className="text-xs text-gray-500 font-normal">Counting in groups</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/Shapes Around Us.pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">2. Shapes Around Us</span>
                  <p className="text-xs text-gray-500 font-normal">Understanding three-dimensional shapes</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/Fun With Numbers.pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">3. Fun with Numbers</span>
                  <p className="text-xs text-gray-500 font-normal">Numbers and counting</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/Shadow Story(Togalu).pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">4. Shadow Story (Togalu)</span>
                  <p className="text-xs text-gray-500 font-normal">Understanding two-dimensional shapes</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/Playing With Lines.pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">5. Playing with Lines</span>
                  <p className="text-xs text-gray-500 font-normal">Different directions and orientations of lines</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/Decoration For Festival.pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">6. Decoration for Festival</span>
                  <p className="text-xs text-gray-500 font-normal">Addition and subtraction</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/Rani's Gift.pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">7. Rani's Gift</span>
                  <p className="text-xs text-gray-500 font-normal">Measurement</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/Grouping And Sharing.pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">8. Grouping and Sharing</span>
                  <p className="text-xs text-gray-500 font-normal">Multiplication and division concepts</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/Which Season Is It.pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">9. Which Season Is It?</span>
                  <p className="text-xs text-gray-500 font-normal">Understanding and measuring time</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/Fun At The Fair.pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">10. Fun at the Fair</span>
                  <p className="text-xs text-gray-500 font-normal">Money and everyday transactions</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer items-center"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-2 Mathematics/Data Handling.pdf")}
              >
                <div>
                  <span className="font-bold text-[1em]">11. Data Handling</span>
                  <p className="text-xs text-gray-500 font-normal">Organising and understanding simple data</p>
                </div>
                <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300 ml-auto" size={22} />
              </a>
            </div>

            {/* Learning Areas Column */}
            <div className="flex flex-col gap-3 w-full md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200 bg-white">
              <h4 className="font-bold text-gray-800 text-[1.1em] border-b pb-2">
                Important Mathematics Learning Areas
              </h4>

              <p className="font-bold text-orange-600">1. Numbers and Counting</p>
              <ul className="list-disc px-5 flex flex-col gap-1 text-[.85em] text-gray-700">
                <li>Reading and writing numbers.</li>
                <li>Counting objects individually and in groups.</li>
                <li>Understanding number sequences.</li>
                <li>Comparing quantities.</li>
                <li>Developing an understanding of place value through activities.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-1">2. Basic Mathematical Operations</p>
              <ul className="list-disc px-5 flex flex-col gap-1 text-[.85em] text-gray-700">
                <li>Addition and subtraction.</li>
                <li>Solving simple mathematical problems.</li>
                <li>Understanding multiplication through equal groups.</li>
                <li>Exploring sharing and division through practical examples.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-1">3. Shapes and Patterns</p>
              <ul className="list-disc px-5 flex flex-col gap-1 text-[.85em] text-gray-700">
                <li>Identifying familiar shapes.</li>
                <li>Exploring two-dimensional and three-dimensional shapes.</li>
                <li>Recognising patterns in objects and designs.</li>
                <li>Understanding lines, directions and shapes in everyday surroundings.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-1">4. Measurement</p>
              <ul className="list-disc px-5 flex flex-col gap-1 text-[.85em] text-gray-700">
                <li>Comparing lengths and sizes.</li>
                <li>Understanding measurement through familiar objects.</li>
                <li>Comparing quantities and measurements.</li>
                <li>Exploring weight and capacity through practical activities.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-1">5. Time and Money</p>
              <ul className="list-disc px-5 flex flex-col gap-1 text-[.85em] text-gray-700">
                <li>Recognising days, months and seasons.</li>
                <li>Understanding clocks and everyday time.</li>
                <li>Identifying currency.</li>
                <li>Solving simple money-related problems.</li>
              </ul>

              <p className="font-bold text-orange-600 mt-1">6. Data Handling</p>
              <ul className="list-disc px-5 flex flex-col gap-1 text-[.85em] text-gray-700">
                <li>Collecting and organising simple information.</li>
                <li>Reading basic tables and picture-based representations.</li>
                <li>Comparing quantities.</li>
                <li>Answering questions using simple data.</li>
              </ul>
            </div>
          </div>

          {/* 4. Environmental Awareness and Other Learning Areas */}
          <p className="font-bold text-md text-white bg-gradient-to-r from-orange-600 to-orange-500 shadow-2xl w-[85%] md:w-[32%] p-4 rounded-tl-lg rounded-tr-lg border-b-2 border-orange-800 mt-10">
            Environmental Awareness and Other Learning Areas
          </p>
          <div className="max-w-4xl mx-auto text-center space-y-3 px-4">
            <p className="font-medium text-gray-700 leading-relaxed">
              Children in Class 2 also learn about their surroundings, everyday experiences, health, relationships and the natural environment.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              NCERT's listed Grade 2 textbook set includes English, Hindi, Mathematics and Urdu. It does not list a separate Grade 2 EVS textbook in the advisory. However, schools can organise environmental awareness and other related learning through classroom discussions, activities and their own academic plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-7 md:p-0 mt-5 mx-0 md:mx-40">
            <div className="flex flex-col border border-orange-300 p-5 shadow-xl rounded-xl gap-3 bg-white">
              <p className="font-bold text-orange-600 text-lg border-b pb-1">Environmental Awareness</p>
              <ul className="list-disc px-4 flex flex-col gap-2 text-sm text-gray-700">
                <li>Understanding plants and animals.</li>
                <li>Learning about family and community.</li>
                <li>Recognising different types of food and clothing.</li>
                <li>Understanding water, cleanliness and personal hygiene.</li>
                <li>Observing nature and the surrounding environment.</li>
              </ul>
            </div>

            <div className="flex flex-col border border-orange-300 p-5 shadow-xl rounded-xl gap-3 bg-white">
              <p className="font-bold text-orange-600 text-lg border-b pb-1">Art & Creative Activities</p>
              <ul className="list-disc px-4 flex flex-col gap-2 text-sm text-gray-700">
                <li>Drawing and colouring.</li>
                <li>Creating pictures and patterns.</li>
                <li>Paper-based craft activities.</li>
                <li>Expressing ideas through creative work.</li>
              </ul>
            </div>

            <div className="flex flex-col border border-orange-300 p-5 shadow-xl rounded-xl gap-3 bg-white">
              <p className="font-bold text-orange-600 text-lg border-b pb-1">Physical Activities & Health</p>
              <ul className="list-disc px-4 flex flex-col gap-2 text-sm text-gray-700">
                <li>Participating in age-appropriate physical activities.</li>
                <li>Developing coordination and movement skills.</li>
                <li>Learning about cleanliness and healthy habits.</li>
                <li>Participating in games and group activities.</li>
              </ul>
            </div>

            <div className="flex flex-col border border-orange-300 p-5 shadow-xl rounded-xl gap-3 bg-white">
              <p className="font-bold text-orange-600 text-lg border-b pb-1">Values & Social Development</p>
              <ul className="list-disc px-4 flex flex-col gap-2 text-sm text-gray-700">
                <li>Understanding sharing and cooperation.</li>
                <li>Developing respectful behaviour.</li>
                <li>Learning to work with others.</li>
                <li>Building confidence and responsibility.</li>
              </ul>
            </div>
          </div>
          <p className="mt-2 text-xs md:text-sm text-gray-600 italic text-center max-w-4xl mx-auto px-4">
            The exact subject names, textbooks and assessment arrangements may differ between schools. Parents should consult their school's official book list and academic plan for the complete subject requirements.
          </p>

          {/* 5. How Parents Can Help Children Prepare for Class 2 */}
          <section className="mt-16 px-4 md:px-12 font-Poppins">
            <h2 className="text-center text-2xl md:text-3xl font-semibold text-orange-500 border border-black py-4 rounded-lg shadow-xl w-full md:w-[75%] mx-auto bg-white">
              How Parents Can Help Children Prepare for Class 2
            </h2>

            <p className="mt-6 text-gray-700 text-center md:w-[80%] mx-auto leading-7">
              Children learn more effectively when basic concepts are connected with everyday experiences. Parents can support their learning through regular reading, practical activities and simple revision.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-lg font-bold text-orange-600 mb-2">1. Encourage Daily Reading</h3>
                <p className="text-gray-700 text-sm leading-6">
                  Help children read short stories, poems and simple passages in English and Hindi.
                </p>
              </div>

              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-lg font-bold text-orange-600 mb-2">2. Practise Basic Mathematics</h3>
                <p className="text-gray-700 text-sm leading-6">
                  Use objects, toys and everyday examples to practise counting, addition, subtraction and grouping.
                </p>
              </div>

              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-lg font-bold text-orange-600 mb-2">3. Use Practical Activities</h3>
                <p className="text-gray-700 text-sm leading-6">
                  Introduce shapes, measurements, time and money through familiar situations.
                </p>
              </div>

              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-lg font-bold text-orange-600 mb-2">4. Build Vocabulary</h3>
                <p className="text-gray-700 text-sm leading-6">
                  Encourage children to learn new words and use them in simple sentences.
                </p>
              </div>

              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-lg font-bold text-orange-600 mb-2">5. Encourage Writing</h3>
                <p className="text-gray-700 text-sm leading-6">
                  Give children opportunities to write short sentences, descriptions and answers.
                </p>
              </div>

              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
                <h3 className="text-lg font-bold text-orange-600 mb-2">6. Revise Textbook Lessons</h3>
                <p className="text-gray-700 text-sm leading-6">
                  Review the chapters taught at school and help children understand concepts they find difficult.
                </p>
              </div>

              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all md:col-span-2 lg:col-span-3">
                <h3 className="text-lg font-bold text-orange-600 mb-2">7. Encourage Curiosity</h3>
                <p className="text-gray-700 text-sm leading-6">
                  Let children observe their surroundings, ask questions and learn through activities.
                </p>
              </div>
            </div>

            <p className="mt-8 text-gray-800 text-center md:w-[80%] mx-auto leading-7 font-medium bg-orange-50 p-4 rounded-lg border border-orange-200">
              Building a consistent learning routine around a structured CBSE syllabus is far more useful than pressuring young children to memorise large amounts of information.
            </p>
          </section>

          {/* Conclusion */}
          <h3 className="mt-14 text-xl md:text-2xl font-bold text-orange-600 text-center">
            Conclusion
          </h3>

          <p className="mt-4 text-gray-700 text-center md:w-[85%] mx-auto leading-7">
            The CBSE Class 2 syllabus establishes a crucial foundational stepping stone in language literacy, numeracy, environmental observation, and creative expression. By utilizing the updated NCERT textbooks (Mridang, Sarangi, Joyful Mathematics, and Shehnai) alongside hands-on daily experiences, parents and educators can help young learners build enduring confidence and a lifelong curiosity for knowledge.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-5xl mx-auto mt-14 px-4 md:px-0">
        <h2 className="mb-8 text-[1.2em] md:text-3xl font-semibold font-Poppins text-center text-gray-800">
          Frequently Asked Questions About the CBSE Class 2 Syllabus
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
