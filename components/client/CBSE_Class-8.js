"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { ImBook } from "react-icons/im";
import { FaBook, FaGraduationCap, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is included in the CBSE Class 8 syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Class 8 learning programme includes English, Mathematics, Science, Social Science and language learning, along with vocational, artistic and physical education resources. The exact subject combination depends on the school's academic plan and language options."
      }
    },
    {
      "@type": "Question",
      "name": "Which books are used for CBSE Class 8?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The NCERT textbook references include Poorvi for English, Ganita Prakash for Mathematics, Curiosity for Science, Malhar for Hindi, Deepakam for Sanskrit and Exploring Society: India and Beyond for Social Science. Additional learning resources include Kaushal Bodh, Kriti and Khel Yatra."
      }
    },
    {
      "@type": "Question",
      "name": "Which English book is prescribed for Class 8?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Poorvi is the NCERT English textbook for Grade 8. It develops reading, comprehension, writing, listening and speaking skills through different literary and informative selections."
      }
    },
    {
      "@type": "Question",
      "name": "Which Mathematics book is used in Class 8?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ganita Prakash is the NCERT Mathematics textbook for Grade 8. Students should refer to the prescribed volumes and complete the chapters and exercises included in their school's course plan."
      }
    },
    {
      "@type": "Question",
      "name": "Which Science book is used in Class 8?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Curiosity is the NCERT Science textbook for Grade 8. It develops scientific understanding through investigation, observation, experiments and the study of natural and physical phenomena."
      }
    },
    {
      "@type": "Question",
      "name": "Which Hindi book is used in Class 8?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Malhar (मल्हार) is the NCERT Hindi textbook for Grade 8. It includes literary selections and language-learning activities."
      }
    },
    {
      "@type": "Question",
      "name": "Which Social Science book is used in Class 8?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Exploring Society: India and Beyond is the NCERT Social Science textbook. It connects history, geography, governance and economic life."
      }
    },
    {
      "@type": "Question",
      "name": "How many subjects are there in Class 8?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "There is no single subject count that applies to every school. The subject combination may include core academic subjects, language options, vocational education, art and physical education. Students should check their school's subject list."
      }
    },
    {
      "@type": "Question",
      "name": "Do all CBSE schools follow exactly the same Class 8 subject combination?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Schools follow the applicable CBSE curriculum and NCERT textbook guidance, but language choices, supplementary materials and some school-level learning arrangements may differ. Students should refer to their school's official textbook and subject list."
      }
    },
    {
      "@type": "Question",
      "name": "Where can students find the official Class 8 NCERT textbooks?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Students can visit the NCERT Online Textbooks Portal, select Class 8 and choose the relevant subject and language to access available textbooks and chapters."
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

export default function CBSEClass8Client() {
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />

      <div className="p-0 md:p-12 flex flex-col font-Poppins justify-center mt-12">
        {/* Hero Section */}
        <div>
          <h1 className="p-4 text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl w-full md:w-[65%] rounded-lg text-center m-auto">
            CBSE Class 8 Syllabus: Subjects, Books and Learning Areas
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full flex flex-col gap-4 mt-8 text-center pt-6 max-w-5xl mx-auto">
            <p className="leading-relaxed text-gray-700">
              The CBSE Class 8 syllabus helps students develop a deeper understanding of languages, Mathematics, Science, Social Science and other learning areas. At this stage, students move beyond basic concepts and begin developing stronger analytical thinking, problem-solving, communication and practical learning skills.
            </p>
            <p className="leading-relaxed text-gray-700">
              NCERT provides textbooks and learning resources for Grade 8, including English, Mathematics, Hindi, Science, Social Science and other curricular areas. These resources help students understand concepts through explanations, examples, activities, experiments, reading exercises and practical applications.
            </p>
            <p className="leading-relaxed text-gray-700">
              This guide provides an overview of the CBSE Class 8 syllabus, NCERT textbook names, subject-wise learning areas and useful study guidance for students and parents.
            </p>
          </div>
        </div>

        {/* Subjects List and NCERT Books Table */}
        <div className="mt-10 max-w-4xl mx-auto px-4 w-full">
          <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-2">
            CBSE Class 8 Subjects List and NCERT Books
          </h2>
          <p className="text-center text-gray-600 text-sm mb-4">
            CBSE's textbook guidance for Grade 8 includes the following NCERT books and learning resources.
          </p>
          <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-orange-500 text-white uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Subject or learning area</th>
                  <th className="px-6 py-3">NCERT textbook</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">English</td>
                  <td className="px-6 py-3">Poorvi</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Mathematics</td>
                  <td className="px-6 py-3">Ganita Prakash</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Science</td>
                  <td className="px-6 py-3">Curiosity</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Social Science</td>
                  <td className="px-6 py-3">Exploring Society: India and Beyond</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Hindi</td>
                  <td className="px-6 py-3">Malhar</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Sanskrit</td>
                  <td className="px-6 py-3">Deepakam</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Vocational Education</td>
                  <td className="px-6 py-3">Kaushal Bodh</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Art Education</td>
                  <td className="px-6 py-3">Kriti</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Physical Education and Well-being</td>
                  <td className="px-6 py-3">Khel Yatra</td>
                </tr>
                <tr className="hover:bg-orange-50">
                  <td className="px-6 py-3 font-semibold text-gray-900">Urdu</td>
                  <td className="px-6 py-3">Khayal</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs md:text-sm text-gray-500 text-center mt-3 italic">
            The exact subject combination, language choices and additional learning materials may vary between schools. Students should follow the textbook list and academic instructions provided by their school.
          </p>
        </div>

        {/* Detailed Syllabus Sections */}
        <div className="flex flex-col gap-8 mt-12">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-6 rounded-lg text-center w-full md:w-[45%] m-auto text-2xl bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent from-orange-500 to-red-600">
            A Comprehensive Guide for Class 8
          </p>

          {/* 1. English Section */}
          <div className="mt-4 px-4 md:px-12 max-w-6xl mx-auto w-full">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-orange-600 mb-3">
                CBSE Class 8 English Syllabus
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Class 8 English syllabus focuses on improving students' reading, writing, listening and speaking abilities. Students explore stories, poems, informative texts and different forms of written expression. The NCERT English textbook for Grade 8 is <strong>Poorvi</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">1. Reading and Comprehension</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Reading stories, poems and informative passages.</li>
                    <li>Understanding the central idea of a text.</li>
                    <li>Identifying important details and supporting information.</li>
                    <li>Interpreting meaning through context.</li>
                    <li>Developing reading comprehension and vocabulary.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">2. Writing Skills</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Writing organised paragraphs.</li>
                    <li>Describing people, places and experiences.</li>
                    <li>Developing creative and informative writing.</li>
                    <li>Expressing opinions with supporting ideas.</li>
                    <li>Improving sentence construction and written communication.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">3. Grammar and Vocabulary</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding grammatical structures.</li>
                    <li>Using appropriate vocabulary.</li>
                    <li>Improving sentence formation.</li>
                    <li>Recognising and correcting common language errors.</li>
                    <li>Applying grammar through reading and writing activities.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">4. Listening and Speaking</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding spoken information.</li>
                    <li>Participating in discussions and conversations.</li>
                    <li>Expressing ideas clearly.</li>
                    <li>Developing pronunciation and presentation skills.</li>
                  </ul>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white rounded-xl border border-orange-200">
                <h4 className="font-bold text-gray-900 text-sm mb-1">Themes Covered in Poorvi</h4>
                <p className="text-xs text-gray-600 mb-2">The Poorvi textbook organises its English learning selections around themes such as:</p>
                <div className="flex flex-wrap gap-2">
                  {["Wit and Wisdom", "Values and Dispositions", "Mystery and Magic", "Environment", "Science and Curiosity"].map((theme, i) => (
                    <span key={i} className="bg-orange-100 text-orange-800 text-xs px-3 py-1 rounded-full font-medium">
                      {theme}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-gray-500 mt-2 italic">Students should refer to the NCERT textbook contents for the complete selection and reading material.</p>
              </div>
            </div>

            {/* English Chapter PDF Downloads */}
            <div className="flex flex-wrap gap-8 justify-center mt-6">
              {/* Honeydew */}
              <div className="flex flex-col gap-3 w-full md:w-[480px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-[1.1em] flex items-center gap-2 border-b pb-2 text-slate-800">
                  <ImBook className="text-orange-600" />
                  Honeydew Book (Prose & Poetry)
                </p>

                <p className="font-bold text-xs text-orange-600 uppercase">[Prose]</p>
                {[
                  { ch: "1", title: "The Best Christmas Present in the World", file: "Best Christmas Present in the World And Ant and the Cricket.pdf" },
                  { ch: "2", title: "The Tsunami", file: "The Tsunami And Geography Lesson.pdf" },
                  { ch: "3", title: "Glimpses of the Past", file: "Glimpses of the Past.pdf" },
                  { ch: "4", title: "Bepin Choudhury’s Lapse of Memory", file: "Choudhury’s Lapse of Memory And The Last Bargain.pdf" },
                  { ch: "5", title: "The Summit Within", file: "The Summit Within And The School Boy.pdf" },
                  { ch: "6", title: "This is Jody’s Fawn", file: "This is Jody’s Fawn.pdf" },
                  { ch: "7", title: "A Visit to Cambridge", file: "A Visit to Cambridge.pdf" },
                  { ch: "8", title: "A Short Monsoon Diary", file: "A Short Monsoon Diary And On The Grasshopper and Cricket.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 English/Part-1/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}

                <p className="font-bold text-xs text-orange-600 uppercase mt-2">[Poem]</p>
                {[
                  { ch: "1", title: "The Ant and the Cricket", file: "Best Christmas Present in the World And Ant and the Cricket.pdf" },
                  { ch: "2", title: "Geography Lesson", file: "The Tsunami And Geography Lesson.pdf" },
                  { ch: "3", title: "The Last Bargain", file: "Choudhury’s Lapse of Memory And The Last Bargain.pdf" },
                  { ch: "4", title: "The School Boy", file: "The Summit Within And The School Boy.pdf" },
                  { ch: "5", title: "On The Grasshopper and Cricket", file: "A Short Monsoon Diary And On The Grasshopper and Cricket.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 English/Part-1/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>

              {/* It So Happened */}
              <div className="flex flex-col gap-3 w-full md:w-[480px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-[1.1em] flex items-center gap-2 border-b pb-2 text-slate-800">
                  <ImBook className="text-orange-600" />
                  It So Happened (Supplementary)
                </p>

                {[
                  { ch: "1", title: "How the Camel got his hump", file: "How the Camel got his hump.pdf" },
                  { ch: "2", title: "Children at work", file: "Children at work.pdf" },
                  { ch: "3", title: "The Selfish Giant", file: "The Selfish Giant.pdf" },
                  { ch: "4", title: "The treasure within", file: "The treasure within.pdf" },
                  { ch: "5", title: "Princess September", file: "Princess September.pdf" },
                  { ch: "6", title: "The fight", file: "The fight.pdf" },
                  { ch: "7", title: "The Open Window", file: "The Open Window.pdf" },
                  { ch: "8", title: "Jalebis", file: "Jalebis.pdf" },
                  { ch: "9", title: "The Comet - I", file: "The Comet - I.pdf" },
                  { ch: "10", title: "The Comet - II", file: "The Comet - II.pdf" },
                  { ch: "11", title: "Ancient Education System of India", file: "Ancient Education System of India.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 English/Part-2/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Mathematics Section */}
          <div className="mt-8 px-4 md:px-12 max-w-6xl mx-auto w-full">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-orange-600 mb-3">
                CBSE Class 8 Mathematics Syllabus
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Class 8 Mathematics syllabus develops students' numerical understanding, logical reasoning and ability to solve mathematical problems. The NCERT Mathematics textbook is <strong>Ganita Prakash</strong>, which provides opportunities to explore mathematical ideas through activities, examples, investigations and problem-solving exercises.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">1. Numbers and Arithmetic</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding large numbers.</li>
                    <li>Working with numerical expressions.</li>
                    <li>Developing calculation skills.</li>
                    <li>Exploring fractions and their applications.</li>
                    <li>Understanding mathematical relationships.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">2. Algebraic Thinking</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Using letters and numbers in mathematical expressions.</li>
                    <li>Recognising patterns and relationships.</li>
                    <li>Understanding algebraic reasoning.</li>
                    <li>Applying mathematical expressions to solve problems.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">3. Geometry</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding lines and angles.</li>
                    <li>Exploring quadrilaterals and their properties.</li>
                    <li>Investigating geometric relationships.</li>
                    <li>Understanding geometrical constructions and reasoning.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">4. Fractions & Proportions</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding different representations of fractions.</li>
                    <li>Comparing quantities.</li>
                    <li>Working with proportional relationships.</li>
                    <li>Solving practical mathematical problems.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm md:col-span-2 lg:col-span-2">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">5. Measurement and Area</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding area and its applications.</li>
                    <li>Exploring geometric measurements.</li>
                    <li>Applying mathematical methods to everyday situations.</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">Students should study the chapters in the prescribed Ganita Prakash volumes and practise the corresponding NCERT exercises.</p>
            </div>

            {/* Mathematics Chapter PDF Downloads */}
            <div className="flex flex-wrap gap-8 justify-center mt-6">
              <div className="flex flex-col gap-3 w-full md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-black flex items-center gap-1 text-[1.1em] border-b pb-2">
                  <FaBook className="text-orange-500" size={20} />
                  Mathematics (Part 1)
                </p>
                {[
                  { ch: "1", title: "Rational Numbers", file: "Rational Numbers.pdf" },
                  { ch: "2", title: "Linear Equations in One Variable", file: "Linear Equations in One Variable.pdf" },
                  { ch: "3", title: "Understanding Quadrilaterals", file: "Understanding Quadrilaterals.pdf" },
                  { ch: "4", title: "Data Handling", file: "Handling.pdf" },
                  { ch: "5", title: "Square and Square Roots", file: "Square and Square Roots.pdf" },
                  { ch: "6", title: "Cube and Cube Roots", file: "Cube and Cube Roots.pdf" },
                  { ch: "7", title: "Comparing Quantities", file: "Comparing Quantities.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 Mathematics/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3 w-full md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-black flex items-center gap-1 text-[1.1em] border-b pb-2">
                  <FaBook className="text-orange-500" size={20} />
                  Mathematics (Part 2)
                </p>
                {[
                  { ch: "8", title: "Algebraic Expressions and Identities", file: "Algebraic Expressions and Identities.pdf" },
                  { ch: "9", title: "Mensuration", file: "Mensuration.pdf" },
                  { ch: "10", title: "Exponents and Powers", file: "Exponents and Powers.pdf" },
                  { ch: "11", title: "Direct and Inverse Proportions", file: "Direct and Inverse Proportions.pdf" },
                  { ch: "12", title: "Factorisation", file: "Factorisation.pdf" },
                  { ch: "13", title: "Introduction to Graphs", file: "Introduction to Graphs.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 Mathematics/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Science Section */}
          <div className="mt-8 px-4 md:px-12 max-w-6xl mx-auto w-full">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-orange-600 mb-3">
                CBSE Class 8 Science Syllabus
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Class 8 Science syllabus encourages students to understand the natural and physical world through observation, experimentation, investigation and logical reasoning. The NCERT Science textbook is <strong>Curiosity</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">1. Scientific Investigation</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Developing scientific curiosity.</li>
                    <li>Observing and recording information.</li>
                    <li>Understanding how investigations are conducted.</li>
                    <li>Drawing conclusions from observations.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">2. Living World and Health</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Exploring living organisms.</li>
                    <li>Understanding biological processes.</li>
                    <li>Learning about health and well-being.</li>
                    <li>Observing relationships between organisms and surroundings.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">3. Electricity and Forces</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding electrical effects.</li>
                    <li>Exploring magnetic and heating effects of current.</li>
                    <li>Studying different types of forces.</li>
                    <li>Understanding pressure and its applications.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">4. Matter and Materials</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding the particulate nature of matter.</li>
                    <li>Studying elements, compounds and mixtures.</li>
                    <li>Exploring solutes, solvents and solutions.</li>
                    <li>Observing changes in materials.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm md:col-span-2 lg:col-span-2">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">5. Light and Natural Phenomena</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding light, mirrors and lenses.</li>
                    <li>Exploring natural phenomena and storms.</li>
                    <li>Understanding the relationship between Earth and environment.</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">Science preparation should include textbook reading, experiments, diagrams, practical activities and questions that require students to explain scientific ideas.</p>
            </div>

            {/* Science Chapter PDF Downloads */}
            <div className="flex flex-wrap gap-8 justify-center mt-6">
              <div className="flex flex-col gap-3 w-full md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-black flex items-center gap-1 text-[1.1em] border-b pb-2">
                  <FaBook className="text-orange-500" size={20} />
                  Science (Part 1)
                </p>
                {[
                  { ch: "1", title: "Crop Production and Management", file: "Crop Production and Management.pdf" },
                  { ch: "2", title: "Microorganisms : Friend and Foe", file: "Microorganisms Friend and Foe.pdf" },
                  { ch: "3", title: "Coal and Petroleum", file: "Coal and Petroleum.pdf" },
                  { ch: "4", title: "Combustion and Flame", file: "Combustion and Flame.pdf" },
                  { ch: "5", title: "Conservation of Plants and Animals", file: "Conservation of Plants and Animals.pdf" },
                  { ch: "6", title: "Reproduction in Animals", file: "Reproduction in Animals.pdf" },
                  { ch: "7", title: "Reaching the Age of Adolescence", file: "Reaching the Age of Adolescence.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 Science/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>

              <div className="flex flex-col gap-3 w-full md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-black flex items-center gap-1 text-[1.1em] border-b pb-2">
                  <FaBook className="text-orange-500" size={20} />
                  Science (Part 2)
                </p>
                {[
                  { ch: "8", title: "Force and Pressure", file: "Force and Pressure.pdf" },
                  { ch: "9", title: "Friction", file: "Friction.pdf" },
                  { ch: "10", title: "Sound", file: "Sound.pdf" },
                  { ch: "11", title: "Chemical Effects of Electric Current", file: "Chemical Effects of Electric Current.pdf" },
                  { ch: "12", title: "Some Natural Phenomena", file: "Some Natural Phenomena.pdf" },
                  { ch: "13", title: "Light", file: "Light.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 Science/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Social Science Section */}
          <div className="mt-8 px-4 md:px-12 max-w-6xl mx-auto w-full">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-orange-600 mb-3">
                CBSE Class 8 Social Science Syllabus
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Class 8 Social Science syllabus develops students' understanding of history, geography, governance and economic life. The NCERT textbook is <strong>Exploring Society: India and Beyond</strong>, providing an integrated study of India's geography, history, economic life and governance.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">1. History</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding important historical developments.</li>
                    <li>Studying different periods in Indian history.</li>
                    <li>Exploring political and social changes.</li>
                    <li>Understanding how historical events influenced society.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">2. Geography</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding natural resources and their uses.</li>
                    <li>Exploring geographical features and environments.</li>
                    <li>Developing map-reading and observation skills.</li>
                    <li>Understanding the relationship between people and surroundings.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">3. Civics and Governance</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding democratic institutions.</li>
                    <li>Learning about elections and representation.</li>
                    <li>Exploring the role of Parliament and government.</li>
                    <li>Understanding citizens' responsibilities and participation.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">4. Economics</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding production and resources.</li>
                    <li>Learning about economic activities.</li>
                    <li>Exploring how resources contribute to goods and services.</li>
                    <li>Understanding basic economic relationships.</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">Students should use the latest authorised NCERT textbook and follow their school's prescribed chapters and assessment instructions.</p>
            </div>

            {/* Social Science Chapter PDF Downloads */}
            <div className="flex flex-wrap gap-8 justify-center mt-6">
              {/* History */}
              <div className="flex flex-col gap-3 w-full md:w-[350px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-black flex items-center gap-1 text-[1.1em] border-b pb-2">
                  <FaBook className="text-orange-500" size={20} />
                  Our Pasts - III (History)
                </p>
                {[
                  { ch: "1", title: "Introduction : How, When and Where", file: "How, When and Where.pdf" },
                  { ch: "2", title: "From Trade to Territory", file: "From Trade to Territory The Company Establishes Power.pdf" },
                  { ch: "3", title: "Ruling the Countryside", file: "Ruling the Countryside.pdf" },
                  { ch: "4", title: "Tribals, Dikus and the Vision", file: "Tribals, Dikus and the Vision of a Golden Age.pdf" },
                  { ch: "5", title: "When People Rebel 1857", file: "When People Rebel 1857 and After.pdf" },
                  { ch: "6", title: "Civilising the Native", file: "Civilising the Native, Educating the Nation.pdf" },
                  { ch: "7", title: "Women, Caste and Reform", file: "Women, Caste and Reform.pdf" },
                  { ch: "8", title: "The Making of the National Movement", file: "The Making of the National Movement 1870s – 1947.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 Sst/Part-1/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>

              {/* Civics */}
              <div className="flex flex-col gap-3 w-full md:w-[350px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-black flex items-center gap-1 text-[1.1em] border-b pb-2">
                  <FaBook className="text-orange-500" size={20} />
                  Social & Political Life - III (Civics)
                </p>
                {[
                  { ch: "1", title: "The Indian Constitution", file: "The Indian Constitution.pdf" },
                  { ch: "2", title: "Understanding Secularism", file: "Understanding Secularism.pdf" },
                  { ch: "3", title: "Parliament and Making of Laws", file: "Parliament and the Making of Laws.pdf" },
                  { ch: "4", title: "Judiciary", file: "Judiciary.pdf" },
                  { ch: "5", title: "Understanding Marginalisation", file: "Understanding Marginalisation.pdf" },
                  { ch: "6", title: "Confronting Marginalisation", file: "Confronting Marginalisation.pdf" },
                  { ch: "7", title: "Public Facilities", file: "Public Facilities.pdf" },
                  { ch: "8", title: "Law and Social Justice", file: "Law and Social Justice.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 Sst/Part-2/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>

              {/* Geography */}
              <div className="flex flex-col gap-3 w-full md:w-[350px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-black flex items-center gap-1 text-[1.1em] border-b pb-2">
                  <FaBook className="text-orange-500" size={20} />
                  Resources & Development (Geography)
                </p>
                {[
                  { ch: "1", title: "Resources", file: "Resources.pdf" },
                  { ch: "2", title: "Land, Soil, Water Resources", file: "Land,Soil, Water, Natural Vegetation and Wildlife Resources.pdf" },
                  { ch: "3", title: "Agriculture", file: "Agriculture.pdf" },
                  { ch: "4", title: "Industries", file: "Industries.pdf" },
                  { ch: "5", title: "Human Resource", file: "Human Resource.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 Sst/Part-3/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Hindi Section */}
          <div className="mt-8 px-4 md:px-12 max-w-6xl mx-auto w-full">
            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 md:p-8 shadow-sm">
              <h2 className="text-xl md:text-2xl font-bold text-orange-600 mb-3">
                CBSE Class 8 Hindi Syllabus
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Class 8 Hindi syllabus develops reading comprehension, vocabulary, language expression and understanding of Hindi literature. The NCERT Hindi textbook is <strong>Malhar (मल्हार)</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">1. Reading Skills</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Reading Hindi stories and poems.</li>
                    <li>Understanding the meaning of passages.</li>
                    <li>Identifying important ideas and details.</li>
                    <li>Improving reading fluency.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">2. Writing Skills</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Writing clear and meaningful sentences.</li>
                    <li>Organising ideas into paragraphs.</li>
                    <li>Developing descriptive and creative writing.</li>
                    <li>Improving spelling and written expression.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">3. Grammar & Language Understanding</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding word forms and sentence structures.</li>
                    <li>Developing vocabulary.</li>
                    <li>Improving grammatical accuracy.</li>
                    <li>Using appropriate language in written communication.</li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <h3 className="font-bold text-gray-900 text-sm mb-2">4. Literature and Expression</h3>
                  <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                    <li>Understanding the meaning of poems and prose.</li>
                    <li>Identifying themes and central ideas.</li>
                    <li>Discussing characters and events.</li>
                    <li>Expressing personal understanding of literary texts.</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">Students should prepare the prescribed chapters in Malhar and complete the language and writing exercises recommended by their school.</p>
            </div>

            {/* Hindi Chapter PDF Downloads */}
            <div className="flex flex-wrap gap-8 justify-center mt-6">
              {/* Vasant */}
              <div className="flex flex-col gap-3 w-full md:w-[350px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-black flex items-center gap-1 text-[1.1em] border-b pb-2">
                  <FaBook className="text-orange-500" size={20} />
                  Vasant (वसंत)
                </p>
                {[
                  { ch: "1", title: "लाख की चूड़ियाँ (कहानी)", file: "लाख की चूड़ियाँ.pdf" },
                  { ch: "2", title: "बस की यात्रा (व्यंग)", file: "बस की यात्रा.pdf" },
                  { ch: "3", title: "दीवानों की हस्ती (कविता)", file: "दीवानों की हस्ती.pdf" },
                  { ch: "4", title: "भगवान के डाकिए (कविता)", file: "भगवान के डाकिए.pdf" },
                  { ch: "5", title: "क्या निराश हुआ जाए (निबंध)", file: "निराश हुआ जाए.pdf" },
                  { ch: "6", title: "यह सबसे कठिन समय नहीं (कविता)", file: "सूरदास चरित.pdf" },
                  { ch: "7", title: "कबीर की साखियाँ", file: "कबीर की साखियाँ.pdf" },
                  { ch: "8", title: "सुदामा चरित (कविता)", file: "सुदामा चरित.pdf" },
                  { ch: "9", title: "जहाँ पहिया है (रिपोर्ताज)", file: "जहाँ पहिया है.pdf" },
                  { ch: "10", title: "अकबरी लोटा (कहानी)", file: "अकबरी लोटा.pdf" },
                  { ch: "11", title: "सूर के पद (कविता)", file: "सूर के पद.pdf" },
                  { ch: "12", title: "पानी की कहानी (निबंध)", file: "पानी की कहानी.pdf" },
                  { ch: "13", title: "बाज और साँप (कहानी)", file: "बाज और साँप.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>

              {/* Durva */}
              <div className="flex flex-col gap-3 w-full md:w-[350px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-black flex items-center gap-1 text-[1.1em] border-b pb-2">
                  <FaBook className="text-orange-500" size={20} />
                  Durva (दूर्वा)
                </p>
                {[
                  { ch: "1", title: "गुड़िया (कविता)", file: "गुड़िया.pdf" },
                  { ch: "2", title: "दो गौरैया (कहानी)", file: "दो गौरैया.pdf" },
                  { ch: "3", title: "चिट्ठियों में यूरोप (पत्र)", file: "चिट्ठियों में यूरोप.pdf" },
                  { ch: "4", title: "ओस (कविता)", file: "ओस.pdf" },
                  { ch: "5", title: "नाटक में नाटक (कहानी)", file: "नाटक में नाटक.pdf" },
                  { ch: "6", title: "साइकिल (कहानी)", file: "साइकिल.pdf" },
                  { ch: "7", title: "पुस्तकालय (निबंध)", file: "पुस्तकालय.pdf" },
                  { ch: "8", title: "हिंदी ने जिनकी जिंदगी बदल दी", file: "हिंदी ने जिनकी जिंदगी बदल दी.pdf" },
                  { ch: "9", title: "कदम मिलकर चलना होगा", file: "कदम मिलकर चलना होगा.pdf" },
                  { ch: "10", title: "पहाड़ से ऊंचा आदमी", file: "पहाड़ से ऊंचा आदमी.pdf" },
                  { ch: "11", title: "सागर यात्रा (यात्रा वृतांत)", file: "सागर यात्रा.pdf" },
                  { ch: "12", title: "उठ किसान ओ (कविता)", file: "उठ किसान ओ.pdf" },
                  { ch: "13", title: "सस्ते का चक्कर (एकांकी)", file: "सस्ते का चक्कर.pdf" },
                  { ch: "14", title: "एक खिलाड़ी की कुछ यादें", file: "एक खिलाड़ी की कुछ यादें.pdf" },
                  { ch: "15", title: "बस की सैर (कहानी)", file: "बस की सैर.pdf" },
                  { ch: "16", title: "फ़र्श पर (कविता)", file: "फ़र्श पर.pdf" },
                  { ch: "17", title: "बूढ़ी अम्मा को बात (लोककथा)", file: "बूढ़ी अम्मा को बात.pdf" },
                  { ch: "18", title: "धूल (कविता)", file: "धूल.pdf" },
                  { ch: "19", title: "आहवान (कविता)", file: "आहवान.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>

              {/* Bharat Ki Khoj */}
              <div className="flex flex-col gap-3 w-full md:w-[350px] p-6 border-2 border-gray-200 rounded-xl shadow-xl shadow-orange-100 bg-white">
                <p className="font-bold text-black flex items-center gap-1 text-[1.1em] border-b pb-2">
                  <FaBook className="text-orange-500" size={20} />
                  Bharat Ki Khoj (भारत की खोज)
                </p>
                {[
                  { ch: "1", title: "अहमदनगर का किला", file: "अहमदनगर का किला.pdf" },
                  { ch: "2", title: "तलाश", file: "तलाश.pdf" },
                  { ch: "3", title: "सिंधु घाटी सभ्यता", file: "सिंधु घाटी सभ्यता.pdf" },
                  { ch: "4", title: "युगों का दौर", file: "युगों का दौर.pdf" },
                  { ch: "5", title: "नयी समस्याएँ", file: "नयी समस्याएँ.pdf" },
                  { ch: "6", title: "अंतिम दौर - एक", file: "अंतिम दौर - एक.pdf" },
                  { ch: "7", title: "अंतिम दौर - दो", file: "अंतिम दौर - दो.pdf" },
                  { ch: "8", title: "तनाव", file: "तनाव.pdf" },
                  { ch: "9", title: "दो पृष्ठभूमियाँ - भारतीय और अंग्रेजी", file: "दो पृष्ठभूमियाँ - भारतीय और अंग्रेजी.pdf" }
                ].map((item, idx) => (
                  <a
                    key={idx}
                    className="text-[.9em] flex items-center justify-between hover:underline cursor-pointer py-1"
                    onClick={() => handleDownloadClick(`https://learnosphere.in/public_pdf/Class-8 Hindi/Part-3/${item.file}`)}
                  >
                    <span><strong className="text-black">Chapter - {item.ch}:</strong> {item.title}</span>
                    <MdDownload className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300" size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Languages & Other Co-Curricular Learning Areas */}
          <div className="mt-8 px-4 md:px-12 max-w-6xl mx-auto w-full">
            <h2 className="text-xl md:text-2xl font-bold text-center text-gray-900 mb-6">
              Languages & Additional Learning Areas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sanskrit */}
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-orange-600 mb-2">CBSE Class 8 Sanskrit Syllabus</h3>
                <p className="text-xs text-gray-500 mb-3">Prescribed NCERT textbook: <strong>Deepakam (दीपकम्)</strong></p>
                <p className="text-gray-700 text-xs mb-3">Sanskrit is available as a language-learning option in schools that offer it. Important learning areas include:</p>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  <li>Reading and understanding simple Sanskrit passages.</li>
                  <li>Developing Sanskrit vocabulary.</li>
                  <li>Understanding basic grammatical structures.</li>
                  <li>Learning word forms and verb forms.</li>
                  <li>Reading verses and prose passages.</li>
                  <li>Developing translation and language-comprehension skills.</li>
                </ul>
              </div>

              {/* Vocational Education */}
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-orange-600 mb-2">Vocational Education: Kaushal Bodh</h3>
                <p className="text-xs text-gray-500 mb-3">Prescribed NCERT textbook: <strong>Kaushal Bodh</strong></p>
                <p className="text-gray-700 text-xs mb-3">Introduces students to practical skills, activities and experiential learning:</p>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  <li>Participating in practical activities.</li>
                  <li>Understanding the application of skills in everyday situations.</li>
                  <li>Developing creativity and problem-solving abilities.</li>
                  <li>Working on activities and projects.</li>
                  <li>Understanding the relationship between learning and real-life work.</li>
                </ul>
              </div>

              {/* Art Education */}
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-orange-600 mb-2">Art Education: Kriti</h3>
                <p className="text-xs text-gray-500 mb-3">Prescribed NCERT resource: <strong>Kriti</strong></p>
                <p className="text-gray-700 text-xs mb-3">Encourages creative thinking and artistic expression through:</p>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  <li>Drawing and visual expression.</li>
                  <li>Artistic activities and projects.</li>
                  <li>Exploring colours, shapes and patterns.</li>
                  <li>Creative work using different materials.</li>
                  <li>Observing and interpreting visual information.</li>
                </ul>
              </div>

              {/* Physical Education & Urdu */}
              <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-orange-500">
                <h3 className="text-lg font-bold text-orange-600 mb-2">Physical Education & Urdu</h3>
                <p className="text-xs text-gray-500 mb-2">
                  Physical Education & Well-being: <strong>Khel Yatra</strong><br />
                  Urdu language option: <strong>Khayal</strong>
                </p>
                <ul className="list-disc list-inside text-xs text-gray-600 space-y-1">
                  <li>Games, sports and movement coordination.</li>
                  <li>Fitness, health awareness and teamwork.</li>
                  <li>Urdu reading, writing, vocabulary and comprehension.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How to Prepare for Class 8 */}
        <div className="mt-16 px-4 md:px-12 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            How to Prepare for Class 8
          </h2>
          <p className="text-center text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            A planned study routine helps students understand concepts, complete textbook exercises and revise important topics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                step: "1",
                title: "Understand the prescribed textbooks",
                desc: "Check the books and chapters recommended by your school before starting preparation."
              },
              {
                step: "2",
                title: "Read every subject regularly",
                desc: "Study languages, Mathematics, Science and Social Science consistently instead of leaving them until examinations."
              },
              {
                step: "3",
                title: "Practise Mathematics",
                desc: "Solve textbook examples and exercises to strengthen calculation and problem-solving skills."
              },
              {
                step: "4",
                title: "Understand Science concepts",
                desc: "Use diagrams, experiments and practical examples to understand scientific principles."
              },
              {
                step: "5",
                title: "Improve reading and writing",
                desc: "Practise comprehension, vocabulary, grammar and written expression in your language subjects."
              },
              {
                step: "6",
                title: "Revise Social Science",
                desc: "Prepare short notes, understand important events and concepts, and use maps where relevant."
              },
              {
                step: "7",
                title: "Complete activities and projects",
                desc: "Give attention to vocational, art and physical education activities prescribed by your school."
              },
              {
                step: "8",
                title: "Use practice resources",
                desc: "Attempt relevant questions and sample papers to identify topics that need more attention."
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
          <p className="text-center text-xs text-gray-500 mt-4 italic">Regular practice and conceptual understanding are more useful than memorising information without understanding it.</p>
        </div>

        {/* Study Resources */}
        <div className="mt-14 px-4 md:px-12 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            Class 8 Study Resources
          </h2>
          <p className="text-center text-gray-700 leading-relaxed mb-8">
            Students can use additional learning resources to support their preparation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start gap-3">
              <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
              <div>
                <strong className="text-gray-900">NCERT textbooks:</strong>
                <p className="text-gray-600 text-sm mt-1">Read the prescribed books and complete the exercises.</p>
              </div>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start gap-3">
              <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
              <div>
                <strong className="text-gray-900">Class 8 Mathematics sample papers:</strong>
                <p className="text-gray-600 text-sm mt-1">Practise mathematical questions and review your solutions.</p>
              </div>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start gap-3">
              <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
              <div>
                <strong className="text-gray-900">Subject-wise study material:</strong>
                <p className="text-gray-600 text-sm mt-1">Use relevant notes and explanations to strengthen difficult concepts.</p>
              </div>
            </div>
            <div className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm flex items-start gap-3">
              <FaCheckCircle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
              <div>
                <strong className="text-gray-900">Practice quizzes:</strong>
                <p className="text-gray-600 text-sm mt-1">Test your understanding of topics and identify areas for revision.</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl text-center text-sm text-gray-700">
            For official textbooks, visit the <strong>NCERT Online Textbooks Portal</strong>. Select the appropriate class, subject and language to find the available textbook and chapter resources.
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-16 px-4 md:px-12 max-w-5xl mx-auto w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Frequently Asked Questions About the CBSE Class 8 Syllabus
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
              The CBSE Class 8 syllabus develops students' knowledge across languages, Mathematics, Science, Social Science and other learning areas. Understanding the prescribed textbooks and following a consistent study routine helps students build stronger academic foundations.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-3">
              Students should refer to the latest NCERT textbook resources and their school's academic instructions when checking chapter coverage, language options and assessment requirements.
            </p>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
              Learnosphere provides class-wise and subject-wise educational information to help students and parents explore relevant learning resources.
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
