"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook, FaChevronDown, FaChevronUp, FaGraduationCap, FaPenNib, FaCheckCircle, FaBookOpen } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import DownloadFormModal from "@/components/DownloadFormModal";

export default function English11th() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showElective, setShowElective] = useState(false);

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
      link.download = url.split("/").pop().split("?")[0];
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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Hornbill Prose Chapters (Verified S3 URLs)
  const hornbillProse = [
    { num: 1, title: "The Portrait of a Lady", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/1f8fe483-f7d8-4ee3-9cbd-902d91344083-chapter-1-The%20Portrait%20of%20a%20Lady.pdf" },
    { num: 2, title: "We're Not Afraid to Die... if We Can All Be Together", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/c595f680-c813-4024-bfd2-203e8d70aeaa-chapter-2-We%E2%80%99re%20Not%20Afraid%20to%20Die%E2%80%A6if%20We%20Can%20All%20Be%20Together.pdf" },
    { num: 3, title: "Discovering Tut: The Saga Continues", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/a4f77651-7029-45ce-9833-7e8ba62b043a-chapter-3-Discovering%20Tut%20the%20Saga%20Continues.pdf" },
    { num: 4, title: "The Adventure", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/1903403f-5b69-4017-aeff-0e722273d869-chapter-5-The%20Adventure.pdf" },
    { num: 5, title: "Silk Road", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/3b8e5b18-f762-419c-bdb6-f8369854b897-chapter-6-Silk%20Road.pdf" },
  ];

  // Hornbill Poetry Chapters (Verified S3 URLs)
  const hornbillPoetry = [
    { num: 1, title: "A Photograph", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/a8075623-eb4e-4d75-b8f3-e4df600d548f-chapter-1-A%20Photograph.pdf" },
    { num: 2, title: "The Laburnum Top", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/9238ceb8-769e-4001-b1da-220cad0f14ca-chapter-2-Lubrnum%20Top.pdf" },
    { num: 3, title: "The Voice of the Rain", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/20f19ebf-cee3-4f62-8c2b-ffb06bf471db-chapter-3-The%20Voice%20of%20the%20Rain.pdf" },
    { num: 4, title: "Childhood", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/3b8960bf-2596-4cc5-852a-ef798c122cd3-chapter-4-Childhood.pdf" },
    { num: 5, title: "Father to Son", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/5dc776df-ab61-4922-8a62-06f5d686c66e-chapter-5-Father%20to%20Son.pdf" },
  ];

  // Snapshots Supplementary Reader (Verified S3 URLs)
  const snapshotsChapters = [
    { num: 1, title: "The Summer of the Beautiful White Horse", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/68e0a3b3-a19d-42e5-958a-9744b8b3860e-chapter-1-The%20Summer%20of%20the%20Beautiful%20White%20Horse.pdf" },
    { num: 2, title: "The Address", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/b423ce6e-502c-472c-8bb3-4aa0ccc0e632-chapter-2-The%20Address.pdf" },
    { num: 3, title: "Mother's Day", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/da250b4e-5522-4766-99a4-16fefb453563-chapter-3-Mother%E2%80%99s%20Day.pdf" },
    { num: 4, title: "Birth", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/ef6b103f-3199-40db-84ac-1f367f8b7d09-chapter-4-Birth.pdf" },
    { num: 5, title: "The Tale of Melon City", url: "https://learnosphere.s3.ap-south-1.amazonaws.com/pdfs/e6fe90db-c88b-4804-9e22-6d6465781012-chapter-5-The%20Tale%20of%20Melon%20City.pdf" },
  ];

  // Woven Words (English Elective) - Preserved for elective students
  const wovenStories = [
    { num: 1, title: "The Lament", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Lament.pdf" },
    { num: 2, title: "A Pair of Mustachios", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/A Pair of Mustachios.pdf" },
    { num: 3, title: "The Rocking-horse Winner", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Rocking-horse Winner.pdf" },
    { num: 4, title: "The Adventure of the Three Garridebs", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Adventure of the Three Garridebs.pdf" },
    { num: 5, title: "Pappachi’s Moth", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Pappachi’s Moth.pdf" },
    { num: 6, title: "The Third and Final Continent", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Third and Final Continent.pdf" },
    { num: 7, title: "Glory at Twilight", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Glory at Twilight.pdf" },
    { num: 8, title: "The Luncheon", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Luncheon.pdf" },
  ];

  const wovenPoetry = [
    { num: 1, title: "The Peacock", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Peacock.pdf" },
    { num: 2, title: "Let Me Not to the Marriage of True Minds", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Let Me Not to the Marriage of True Minds.pdf" },
    { num: 3, title: "Coming", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Coming.pdf" },
    { num: 4, title: "Telephone Conversation", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Telephone Conversation.pdf" },
    { num: 5, title: "The World is too Much With Us", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The World is too Much With Us.pdf" },
    { num: 6, title: "Mother Tounge", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Mother Tounge.pdf" },
    { num: 7, title: "Hawk Roosting", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Hawk Roosting.pdf" },
    { num: 8, title: "For Elkana", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/For Elkana.pdf" },
    { num: 9, title: "Refugee Blues", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Refugee Blues.pdf" },
    { num: 10, title: "Felling of the Banyan Tree", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Felling of the Banyan Tree.pdf" },
    { num: 11, title: "Ode to a Nightingale", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Ode to a Nightingale.pdf" },
    { num: 12, title: "Ajamil and the Tigers", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Ajamil and the Tigers.pdf" },
  ];

  const wovenEssays = [
    { num: 1, title: "My Watch", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/My Watch.pdf" },
    { num: 2, title: "My Three Passions", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/My Three Passions.pdf" },
    { num: 3, title: "Patterns of Creativity", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Patterns of Creativity.pdf" },
    { num: 4, title: "Tribal Verse", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Tribal Verse.pdf" },
    { num: 5, title: "What is a Good Book?", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/What is a Good Book.pdf" },
    { num: 6, title: "The Story", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/The Story.pdf" },
    { num: 7, title: "Bridges", url: "https://learnosphere.in/public_pdf/Class-11 English/Part-1/Bridges.pdf" },
  ];

  const faqs = [
    {
      q: "1. What is the subject code for Class 11 English Core?",
      a: "The CBSE subject code for Class 11 English Core is 301."
    },
    {
      q: "2. Which books are prescribed for Class 11 English Core?",
      a: "The prescribed NCERT books are Hornbill, the main English reader, and Snapshots, the supplementary reader."
    },
    {
      q: "3. How many marks is the Class 11 English Core examination?",
      a: "The assessment carries 100 marks, including an 80-mark theory examination and 20 marks of internal assessment."
    },
    {
      q: "4. How long is the Class 11 English Core examination?",
      a: "The written theory examination is three hours long."
    },
    {
      q: "5. What are the main sections of the Class 11 English syllabus?",
      a: "The three main sections are Reading Skills, Grammar and Creative Writing Skills, and Literature."
    },
    {
      q: "6. Which grammar topics are included in Class 11 English?",
      a: "The prescribed grammar areas include tenses, clauses, sentence reordering and sentence transformation."
    },
    {
      q: "7. What writing tasks are included in Class 11 English?",
      a: "The prescribed writing tasks include classified advertisements, poster writing, speech writing and debate writing."
    },
    {
      q: "8. Is English Core the same as English Elective?",
      a: "No. English Core and English Elective are separate CBSE courses. English Core has subject code 301. Students should follow the syllabus for the course selected by their school."
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <main className="p-4 md:p-12 font-Poppins max-w-6xl mx-auto mt-12">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="p-4 text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl w-full md:w-[75%] rounded-lg text-center mx-auto leading-tight">
            CBSE Class 11 English Core Syllabus: Chapters, Grammar and Exam Pattern
          </h1>
        </div>

        {/* Introduction */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8 space-y-4 text-gray-700 leading-relaxed">
          <p>
            The CBSE Class 11 English Core syllabus focuses on developing students' reading, writing, listening and speaking abilities, along with their understanding of prose and poetry. It includes reading comprehension, grammar, creative writing and prescribed literature from NCERT textbooks.
          </p>
          <p>
            English Core is offered under subject code 301. Students should check their subject selection with their school because English Core and English Elective are separate CBSE courses.
          </p>
        </div>

        {/* Syllabus at a Glance Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4 border-l-4 border-orange-500 pl-3">
            CBSE Class 11 English Core Syllabus: Overview
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left w-1/3">Detail</th>
                  <th className="border border-orange-700 py-3 px-4 text-left">Information</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Class</td><td className="border border-gray-300 py-2.5 px-4">11</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Board</td><td className="border border-gray-300 py-2.5 px-4">Central Board of Secondary Education (CBSE)</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Subject</td><td className="border border-gray-300 py-2.5 px-4">English Core</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Subject code</td><td className="border border-gray-300 py-2.5 px-4">301</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Theory examination</td><td className="border border-gray-300 py-2.5 px-4 font-bold text-orange-600">80 marks</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Internal assessment</td><td className="border border-gray-300 py-2.5 px-4">20 marks</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Total assessment</td><td className="border border-gray-300 py-2.5 px-4 font-bold text-orange-600">100 marks</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Theory examination duration</td><td className="border border-gray-300 py-2.5 px-4">3 hours</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Prescribed textbooks</td><td className="border border-gray-300 py-2.5 px-4">Hornbill and Snapshots</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-4 leading-relaxed">
            The syllabus is divided into three main sections: Reading Skills, Grammar and Creative Writing Skills, and Literature. The assessment also includes listening, speaking and project work.
          </p>
        </div>

        {/* Prescribed NCERT Books */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            Prescribed NCERT Books for Class 11 English Core
          </h2>
          <p className="text-gray-700 mb-4 text-sm">
            CBSE prescribes two NCERT textbooks for English Core.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left w-1/3">Book</th>
                  <th className="border border-orange-700 py-3 px-4 text-left">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                <tr className="bg-white">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold text-orange-700">Hornbill</td>
                  <td className="border border-gray-300 py-2.5 px-4">Main English reader containing prose and poetry</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold text-orange-700">Snapshots</td>
                  <td className="border border-gray-300 py-2.5 px-4">Supplementary reader containing prose and dramatic texts</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 italic mt-3 bg-amber-50 border-l-4 border-amber-400 p-2.5 rounded-r">
            Students should prepare the chapters prescribed for their examination rather than relying on older chapter lists or textbook editions.
          </p>
        </div>

        {/* Chapter-wise Chapter PDF Links Section */}
        <div className="mb-10">
          <p className="font-extrabold border-2 border-orange-500 p-4 mb-8 rounded-lg text-center w-full md:w-[70%] mx-auto text-xl md:text-2xl bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            A Comprehensive Guide for Class 11th English Core
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Hornbill Card */}
            <div className="bg-white p-6 border-2 border-gray-200 rounded-xl shadow-lg flex flex-col gap-4">
              <div className="border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <FaBook className="text-orange-500" size={22} />
                  <h3 className="font-bold text-slate-800 text-lg">Class 11 English Hornbill Chapters</h3>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Hornbill is the main English reader. It includes prose and poetry that develop reading comprehension, literary appreciation and critical thinking.
                </p>
              </div>

              {/* Prose Section */}
              <div className="mb-2">
                <p className="font-bold text-orange-600 text-sm mb-2 bg-orange-50 px-3 py-1.5 rounded inline-block">
                  [Hornbill: Prose]
                </p>
                <div className="space-y-1.5">
                  {hornbillProse.map((ch) => (
                    <a
                      key={ch.num}
                      onClick={() => handleDownloadClick(ch.url)}
                      className="text-sm flex items-center justify-between p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition border-b border-gray-100 last:border-0"
                    >
                      <span>
                        <span className="font-bold text-slate-700">Chapter - {ch.num} : </span>
                        {ch.title}
                      </span>
                      <MdDownload className="text-orange-600 hover:scale-110 transition shrink-0 ml-2" size={20} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Poetry Section */}
              <div>
                <p className="font-bold text-orange-600 text-sm mb-2 bg-orange-50 px-3 py-1.5 rounded inline-block">
                  [Hornbill: Poetry]
                </p>
                <div className="space-y-1.5">
                  {hornbillPoetry.map((ch) => (
                    <a
                      key={ch.num}
                      onClick={() => handleDownloadClick(ch.url)}
                      className="text-sm flex items-center justify-between p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition border-b border-gray-100 last:border-0"
                    >
                      <span>
                        <span className="font-bold text-slate-700">Chapter - {ch.num} : </span>
                        {ch.title}
                      </span>
                      <MdDownload className="text-orange-600 hover:scale-110 transition shrink-0 ml-2" size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Snapshots Card */}
            <div className="bg-white p-6 border-2 border-gray-200 rounded-xl shadow-lg flex flex-col gap-4">
              <div className="border-b border-gray-200 pb-3">
                <div className="flex items-center gap-2">
                  <FaBook className="text-orange-500" size={22} />
                  <h3 className="font-bold text-slate-800 text-lg">Class 11 English Snapshots Chapters</h3>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Snapshots is the supplementary reader. It includes stories and a play that help students understand different literary themes, characters and situations.
                </p>
              </div>

              <div className="space-y-1.5">
                {snapshotsChapters.map((ch) => (
                  <a
                    key={ch.num}
                    onClick={() => handleDownloadClick(ch.url)}
                    className="text-sm flex items-center justify-between p-2 rounded hover:bg-orange-50 hover:text-orange-600 cursor-pointer transition border-b border-gray-100 last:border-0"
                  >
                    <span>
                      <span className="font-bold text-slate-700">Chapter - {ch.num} : </span>
                      {ch.title}
                    </span>
                    <MdDownload className="text-orange-600 hover:scale-110 transition shrink-0 ml-2" size={20} />
                  </a>
                ))}
              </div>

              {/* Curriculum Advisory Callout */}
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-xs text-gray-700 leading-relaxed">
                  <span className="font-bold text-orange-700">Curriculum Advisory:</span> Check the prescribed chapter list against the official CBSE syllabus before each examination session. Textbook editions and examination prescriptions may not always include identical content.
                </p>
              </div>

              {/* Grammar quick preview badge */}
              <div className="mt-2 pt-3 border-t border-gray-200">
                <h4 className="font-semibold text-slate-800 text-sm mb-2 flex items-center gap-1.5">
                  <FaGraduationCap className="text-orange-500" /> Prescribed Grammar Key Areas
                </h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-gray-100 px-2.5 py-1 rounded text-gray-700 font-medium">Tenses</span>
                  <span className="bg-gray-100 px-2.5 py-1 rounded text-gray-700 font-medium">Clauses</span>
                  <span className="bg-gray-100 px-2.5 py-1 rounded text-gray-700 font-medium">Reordering of Sentences</span>
                  <span className="bg-gray-100 px-2.5 py-1 rounded text-gray-700 font-medium">Transformation of Sentences</span>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle for English Elective (Woven Words) */}
          <div className="mt-8 bg-white border border-gray-200 rounded-xl p-4 shadow-sm text-center">
            <button
              onClick={() => setShowElective(!showElective)}
              className="text-sm font-semibold text-orange-600 hover:text-orange-700 flex items-center justify-center gap-2 mx-auto"
            >
              <FaBookOpen />
              {showElective ? "Hide English Elective (Woven Words) Chapters" : "Looking for English Elective (Woven Words)? Click to view chapter PDFs"}
              {showElective ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
            </button>

            {showElective && (
              <div className="mt-6 text-left grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-3 text-orange-700">Woven Words: Short Stories</h4>
                  <div className="space-y-1">
                    {wovenStories.map((ch) => (
                      <a
                        key={ch.num}
                        onClick={() => handleDownloadClick(ch.url)}
                        className="text-xs flex items-center justify-between p-1.5 rounded hover:bg-orange-50 cursor-pointer transition border-b border-gray-100"
                      >
                        <span>{ch.num}. {ch.title}</span>
                        <MdDownload className="text-orange-600 hover:scale-110 ml-1 shrink-0" size={14} />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-3 text-orange-700">Woven Words: Poetry</h4>
                  <div className="space-y-1">
                    {wovenPoetry.map((ch) => (
                      <a
                        key={ch.num}
                        onClick={() => handleDownloadClick(ch.url)}
                        className="text-xs flex items-center justify-between p-1.5 rounded hover:bg-orange-50 cursor-pointer transition border-b border-gray-100"
                      >
                        <span>{ch.num}. {ch.title}</span>
                        <MdDownload className="text-orange-600 hover:scale-110 ml-1 shrink-0" size={14} />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 text-sm mb-3 text-orange-700">Woven Words: Essays</h4>
                  <div className="space-y-1">
                    {wovenEssays.map((ch) => (
                      <a
                        key={ch.num}
                        onClick={() => handleDownloadClick(ch.url)}
                        className="text-xs flex items-center justify-between p-1.5 rounded hover:bg-orange-50 cursor-pointer transition border-b border-gray-100"
                      >
                        <span>{ch.num}. {ch.title}</span>
                        <MdDownload className="text-orange-600 hover:scale-110 ml-1 shrink-0" size={14} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Grammar Syllabus Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            Class 11 English Grammar Syllabus
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            Grammar is included in the Grammar and Creative Writing Skills section of the English Core examination. The prescribed grammar areas include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-bold text-slate-800 mb-1 text-orange-600">1. Tenses</h3>
              <p className="text-gray-600">Students should understand the correct use of tenses and apply them in sentences and contextual exercises.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-bold text-slate-800 mb-1 text-orange-600">2. Clauses</h3>
              <p className="text-gray-600">Students should understand clauses and use them correctly when completing or constructing sentences.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-bold text-slate-800 mb-1 text-orange-600">3. Reordering of Sentences</h3>
              <p className="text-gray-600">This tests the ability to arrange words or sentences in a logical sequence to create meaningful expressions.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-bold text-slate-800 mb-1 text-orange-600">4. Transformation of Sentences</h3>
              <p className="text-gray-600">Students are assessed on their ability to transform sentence structures while maintaining the intended meaning.</p>
            </div>
          </div>
          <p className="text-sm text-gray-700 mt-4 leading-relaxed">
            The prescribed grammar assessment includes gap-filling questions based on tenses and clauses, along with sentence reordering and transformation.
          </p>
        </div>

        {/* Writing Skills Syllabus Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            Class 11 English Writing Skills Syllabus
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            Creative writing is an important part of the English Core syllabus. Students are assessed on format, content, organisation of ideas and expression.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left w-1/3">Writing task</th>
                  <th className="border border-orange-700 py-3 px-4 text-left">Expected format</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Classified advertisements</td><td className="border border-gray-300 py-2.5 px-4">Short writing task, up to 50 words</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Poster writing</td><td className="border border-gray-300 py-2.5 px-4">Short writing task, up to 50 words</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Speech writing</td><td className="border border-gray-300 py-2.5 px-4">Long writing task, 120-150 words</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Debate writing</td><td className="border border-gray-300 py-2.5 px-4">Long writing task, 120-150 words</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3 leading-relaxed">
            Students should practise the appropriate format, clear expression and logical presentation of ideas.
          </p>
        </div>

        {/* Reading Skills Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            Class 11 English Reading Skills
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            The Reading Skills section tests how well students understand, interpret and analyse written information. It includes:
          </p>
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-slate-800 mb-1 text-orange-600">Unseen Comprehension Passages</h3>
              <p className="text-gray-700 leading-relaxed">
                Students are given unseen passages that may be factual, descriptive or literary. They are expected to identify the main ideas, interpret information, understand vocabulary in context and answer comprehension questions.
              </p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-slate-800 mb-1 text-orange-600">Case-Based Factual Passage</h3>
              <p className="text-gray-700 leading-relaxed">
                This passage may include verbal or visual information such as charts, tables or statistical data. Students need to interpret the information and answer questions based on it.
              </p>
            </div>
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-slate-800 mb-1 text-orange-600">Note Making and Summary Writing</h3>
              <p className="text-gray-700 leading-relaxed">
                Students are assessed on their ability to identify important information, organise notes using suitable headings and prepare a concise summary.
              </p>
            </div>
          </div>
        </div>

        {/* Examination Pattern Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            CBSE Class 11 English Core Examination Pattern
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            The English Core theory examination carries 80 marks. Internal assessment carries another 20 marks.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left">Section</th>
                  <th className="border border-orange-700 py-3 px-4 text-left">Topics</th>
                  <th className="border border-orange-700 py-3 px-4 text-center">Marks</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                <tr className="bg-white">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold">Section A</td>
                  <td className="border border-gray-300 py-2.5 px-4">Reading Skills</td>
                  <td className="border border-gray-300 py-2.5 px-4 text-center font-bold">26</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold">Section B</td>
                  <td className="border border-gray-300 py-2.5 px-4">Grammar and Creative Writing Skills</td>
                  <td className="border border-gray-300 py-2.5 px-4 text-center font-bold">23</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold">Section C</td>
                  <td className="border border-gray-300 py-2.5 px-4">Literature</td>
                  <td className="border border-gray-300 py-2.5 px-4 text-center font-bold">31</td>
                </tr>
                <tr className="bg-orange-50">
                  <td className="border border-gray-300 py-2.5 px-4 font-bold text-orange-700">Theory examination</td>
                  <td className="border border-gray-300 py-2.5 px-4 font-bold text-orange-700">Total</td>
                  <td className="border border-gray-300 py-2.5 px-4 text-center font-extrabold text-orange-700">80</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold">Listening Skills</td>
                  <td className="border border-gray-300 py-2.5 px-4">Internal assessment</td>
                  <td className="border border-gray-300 py-2.5 px-4 text-center font-bold">5</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold">Speaking Skills</td>
                  <td className="border border-gray-300 py-2.5 px-4">Internal assessment</td>
                  <td className="border border-gray-300 py-2.5 px-4 text-center font-bold">5</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 py-2.5 px-4 font-semibold">Project Work</td>
                  <td className="border border-gray-300 py-2.5 px-4">Internal assessment</td>
                  <td className="border border-gray-300 py-2.5 px-4 text-center font-bold">10</td>
                </tr>
                <tr className="bg-orange-100">
                  <td className="border border-orange-300 py-2.5 px-4 font-extrabold text-orange-800">Overall assessment</td>
                  <td className="border border-orange-300 py-2.5 px-4 font-extrabold text-orange-800">Total</td>
                  <td className="border border-orange-300 py-2.5 px-4 text-center font-extrabold text-orange-800">100</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 italic mt-3">The written examination lasts three hours.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-bold text-slate-800 mb-1 text-orange-600">Section A: Reading Skills (26 Marks)</h3>
              <p className="text-gray-600">This section includes unseen comprehension passages, a case-based factual passage, note making and summary writing.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-bold text-slate-800 mb-1 text-orange-600">Section B: Grammar & Writing (23 Marks)</h3>
              <p className="text-gray-600">Includes grammar questions based on tenses, clauses, sentence reordering and transformation, as well as classified advertisements, poster writing, speech writing and debate writing.</p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-bold text-slate-800 mb-1 text-orange-600">Section C: Literature (31 Marks)</h3>
              <p className="text-gray-600">Based on Hornbill and Snapshots. Questions assess comprehension, interpretation, analysis and critical thinking through extracts, short answers and long answers.</p>
            </div>
          </div>
        </div>

        {/* Internal Assessment Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            Internal Assessment for Class 11 English
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            Internal assessment carries 20 marks and consists of three components.
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-orange-600 text-white font-bold text-sm">
                  <th className="border border-orange-700 py-3 px-4 text-left w-2/3">Component</th>
                  <th className="border border-orange-700 py-3 px-4 text-center">Marks</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-800">
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Listening Skills</td><td className="border border-gray-300 py-2.5 px-4 text-center font-bold">5</td></tr>
                <tr className="bg-gray-50"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Speaking Skills</td><td className="border border-gray-300 py-2.5 px-4 text-center font-bold">5</td></tr>
                <tr className="bg-white"><td className="border border-gray-300 py-2.5 px-4 font-semibold">Project Work</td><td className="border border-gray-300 py-2.5 px-4 text-center font-bold">10</td></tr>
                <tr className="bg-orange-50"><td className="border border-gray-300 py-2.5 px-4 font-bold text-orange-700">Total</td><td className="border border-gray-300 py-2.5 px-4 text-center font-extrabold text-orange-700">20</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 space-y-2 text-sm text-gray-700 leading-relaxed">
            <p>
              Listening and speaking activities help students develop communication skills, fluency, pronunciation and the ability to express ideas clearly.
            </p>
            <p>
              Project work may involve research, interviews, reports, presentations or other language-based activities. Schools conduct these assessments according to the prescribed CBSE guidelines.
            </p>
          </div>
        </div>

        {/* How to Prepare */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-2 border-l-4 border-orange-500 pl-3">
            How to Prepare for the Class 11 English Examination
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            Students can follow a structured preparation plan to cover all parts of the syllabus:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">1. Understand the syllabus:</strong> Identify the prescribed chapters, grammar topics, writing tasks and examination weightage.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">2. Read Hornbill:</strong> Study the prose and poetry carefully. Understand the themes, characters, central ideas and important literary details.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">3. Read Snapshots:</strong> Focus on the storylines, characters, themes and important events in each prescribed text.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">4. Practise grammar:</strong> Work on tenses, clauses, sentence reordering and transformation.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">5. Improve writing skills:</strong> Practise classified advertisements, posters, speeches and debates using the prescribed formats.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">6. Practise comprehension:</strong> Solve unseen passages, case-based questions, note-making and summary-writing exercises.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">7. Prepare for internal assessment:</strong> Participate in listening and speaking activities and complete project work on time.</span>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-gray-50 border border-gray-200">
              <FaCheckCircle className="text-orange-600 mt-1 shrink-0" />
              <span><strong className="text-slate-800">8. Solve practice papers:</strong> Use sample papers and timed exercises to understand question formats and improve time management.</span>
            </div>
          </div>

          {/* Promotional Banner linking to CBSE 11th Syllabus */}
          <div className="mt-6 p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-white text-center shadow-md">
            <p className="text-sm md:text-base font-semibold">
              Balancing literature and grammar with other major subjects becomes much easier when you track your progress against the updated{" "}
              <Link href="/CBSE-11thsyllabus" className="underline font-bold hover:text-orange-200 transition">
                CBSE 11th syllabus
              </Link>
              .
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6 border-l-4 border-orange-500 pl-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-800 hover:bg-orange-50 transition"
                >
                  <span className="pr-4 text-sm md:text-base">{faq.q}</span>
                  {openFaq === index ? (
                    <FaChevronUp className="text-orange-600 shrink-0" size={16} />
                  ) : (
                    <FaChevronDown className="text-gray-400 shrink-0" size={16} />
                  )}
                </button>
                {openFaq === index && (
                  <div className="p-4 bg-orange-50/50 border-t border-gray-100 text-sm text-gray-700 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

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
