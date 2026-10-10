"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { ImBook } from "react-icons/im";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": " What is included in the CBSE Class 10 English syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": " It covers reading comprehension, writing skills, grammar, and literature from First Flight and Footprints Without Feet."
      }
    },
    {
      "@type": "Question",
      "name": " How can I score well in Class 10 English?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": " Understand the syllabus, practice writing daily, revise grammar, and read all literature chapters with previous-year questions."
      }
    },
    {
      "@type": "Question",
      "name": " Is grammar important for the Class 10 English exam?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, grammar carries major weightage and strengthens writing skills, making it essential for scoring high."
      }
    },
    {
      "@type": "Question",
      "name": " Where can I get the complete CBSE syllabus from Class 1 to 12?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": " You can find structured, easy-to-read syllabus details for Classes 1–12 on Learnosphere."
      }
    },
    {
      "@type": "Question",
      "name": "Which books are used for Class 10 English?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": " CBSE uses two books: First Flight (main reader) and Footprints Without Feet (supplementary reader)."
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


export default function English() {
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
      <div className=" p-0 md:p-12 flex flex-col font-Poppins justify-center mt-12">
        <div className="">
          <h1 className="p-4 md:text-4xl font-bold mt-8 bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Syllabus for Class 10 English{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-ull gap-3">
          <div className=" pt-6 text-center md:text-start  w-full md:w-[50%]">
            <p className="p-4">
              English is one of the most scoring subjects to overall increase
              your percentage in Class 10th Boards. The CBSE Class 10 board exam
              is an easy subject and students can easily higher scores. They
              need to have a clear knowledge of the CBSE Class 10 English
              syllabus. The Class 10 English syllabus of the CBSE board is
              divided into two parts: Communicative English and Language and
              Literature. In this article, we will provide you with a detailed
              CBSE Class 10 syllabus for English. <br /> <br />Students must go through the
              entire syllabus to learn more about the chapters and topics to be
              prepared this year. In your first board exams, having a good
              understanding of the CBSE Curriculum will help you achieve success
              <br /> <br />
              Understanding the CBSE Class 10 syllabus for English is one of the
              most important steps for students preparing for the board exams. Since
              English is a high-scoring subject and forms the base of communication skills,
              many students and parents search for a clear, simplified breakdown of the chapters,
              grammar concepts, writing tasks, and marking scheme.
              <br /> <br /> If you also feel confused about what
              exactly is included in the Class 10 English curriculum, this guide will help you find
              every detail in an easy-to-understand way.
            </p>
          </div>
          {/* <p className='text-start p-4'>For those on the lookout for the Class 10 Science syllabus, it's readily available in a PDF format online. This document is not just a list of topics but a comprehensive guide that details the chapters, their weightage in the exam, and even includes the practicals, assignments, and projects that are part of the curriculum. Such detailed planning helps students understand what to expect and how to allocate their study time effectively.</p> */}

          <div className="pt-6 w-full md:w-[50%] ">
            <table className="table-auto  border-collapse border font-Poppins border-gray-500">
              <thead>
                <tr className="bg-orange-500">
                  <th className="border  border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    units
                  </th>
                  <th className="border  border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    units Name
                  </th>
                  <th className="border  border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    Chapter Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    I
                  </td>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    Reading Skills{" "}
                  </td>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    Two unseen passages with a maximum word limit of 750 words
                    <br />
                    Objective Type Questions (including Multiple Choice
                    Questions), Very Short Answer Type Questions (one word/ one
                    phrase / one sentence) and Short Answer Type Questions
                    (30-40 words each){" "}
                  </td>
                </tr>

                <tr>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    II
                  </td>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    {" "}
                    Writing Skills
                  </td>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    {" "}
                    Email to school authorities (Application for leave/ change
                    of subject /change of section/ bus-timings or similar
                    topics) in maximum 50 words.
                    <br />
                    Factual Description of a person/object in maximum 100 words
                    <br />
                    One out of two formal letters, in maximum 120 words,
                    thematically aligned to topics in MCB.
                    <br />
                    One out of two articles based on verbal cues, in maximum 150
                    words, thematically aligned to MCB topics.
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    III
                  </td>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    Grammar{" "}
                  </td>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    {" "}
                    Tenses Modals
                    <b />
                    Subject–verb concord
                    <b />
                    Reported speech
                    <b />
                    Clauses
                    <b />
                    Determiners
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    IV
                  </td>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    Literature Textbook{" "}
                  </td>
                  <td className="border border-gray-500 pt-2 mt-3  p-0 md:p-2">
                    {" "}
                    Two out of three extracts from prose/poetry for reference to
                    the context. Very Short Answer Questions will be asked to
                    assess global comprehension, interpretation, inference and
                    evaluation.
                    <br />
                    Five Short Answer type Questions out of six from the
                    Literature Reader to test local and global comprehension of
                    theme and ideas, analysis, evaluation and appreciation
                    (30-40 words each)
                    <br />
                    One out of two Long Answer type Questions to assess how the
                    values inherent in the text have been brought out.
                    Creativity, evaluation and extrapolation beyond the text and
                    across the texts will be assessed. This can also be a
                    passage-based question taken from a situation/plot from the
                    texts. (150 words).
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-12 px-4 md:px-20">
          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4 text-center md:text-start">
            What Does the CBSE Class 10 English Syllabus Include?
          </h2>

          {/* Intro Paragraph */}
          <p className="text-[1em] md:text-[1.05em] mb-6">
            The CBSE Class 10 syllabus for English mainly focuses on developing reading, grammar, writing, comprehension, and literature-based skills. It includes Reading Skills, Writing Skills, English Grammar concepts, and two literature books prescribed by the CBSE Board—<strong>First Flight</strong> and <strong>Footprints Without Feet</strong>. The board has specially designed the curriculum to improve accuracy, vocabulary, creativity, and real-life communication skills.
          </p>

          {/* Grid for cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {/* Card 1: Reading Section */}
            <div className="p-6 border-2 border-gray-200 rounded-xl shadow-lg shadow-orange-200">
              <p className="font-bold text-orange-500 text-lg mb-2">1. Reading Section</p>
              <p className="mb-2">
                The reading part tests a student’s ability to understand passages, extract key information, and answer questions logically. It includes:
              </p>
              <ul className="list-disc list-inside space-y-1 mb-2">
                <li>Unseen passage (factual or discursive)</li>
                <li>Discursive passage (analytical or opinion-based)</li>
              </ul>
              <p className="text-gray-700 text-[.95em]">
                This strengthens interpretation skills and builds confidence for board-level questions.
              </p>
            </div>

            {/* Card 2: Writing & Grammar */}
            <div className="p-6 border-2 border-gray-200 rounded-xl shadow-lg shadow-orange-200">
              <p className="font-bold text-orange-500 text-lg mb-2">2. Writing & Grammar Section</p>
              <p className="mb-2">
                The English grammar syllabus for Class 10 CBSE Board includes the most essential grammar rules and writing formats used in everyday communication:
              </p>

              <p className="font-semibold mb-1">Grammar Topics:</p>
              <ul className="list-disc list-inside space-y-1 mb-2">
                <li>Tenses</li>
                <li>Modals</li>
                <li>Determiners</li>
                <li>Subject–Verb Agreement</li>
                <li>Reported Speech</li>
                <li>Editing & Omission</li>
              </ul>

              <p className="font-semibold mb-1">Writing Tasks:</p>
              <ul className="list-disc list-inside space-y-1 mb-2">
                <li>Formal letter writing</li>
                <li>Analytical paragraph writing</li>
                <li>Descriptive writing based on clues or data</li>
              </ul>

              <p className="text-gray-700 text-[.95em]">
                These topics help students improve accuracy, presentation, vocabulary, and examination-style writing.
              </p>
            </div>

            {/* Card 3: Literature Section */}
            <div className="p-6 border-2 border-gray-200 rounded-xl shadow-lg shadow-orange-200">
              <p className="font-bold text-orange-500 text-lg mb-2">3. Literature Section</p>
              <p className="mb-2">
                CBSE Class 10 English uses two textbooks:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong>First Flight (Main Book)</strong> – Contains prose and poems focusing on themes like humanity, experiences, values, and real-life situations. Students learn narrative style, character understanding, and moral learning.
                </li>
                <li>
                  <strong>Footprints Without Feet (Supplementary Reader)</strong> – Focuses on simple but meaningful stories that teach imagination, reasoning, and ethics through engaging tales.
                </li>
              </ul>
              <p className="mt-2 text-gray-700 text-[.95em]">
                Together, these books help improve comprehension, critical thinking, and the ability to form well-structured answers.
              </p>
            </div>
          </div>
        </div>
        <div className=" pt-10 text-center md:text-start  max-w-7xl mx-auto ">
          <p className="mb-2 p-4 ">At Learnosphere, we provide the CBSE syllabus for Class 1 to 12 with complete clarity, helping students access the right structured content for exam preparation. So if you are looking for a reliable and updated breakdown of the Class 10 English syllabus, you are in the right place.
          </p></div>
        <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8">
          <div className="list-disc text-[.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
              <ImBook className="text-orange-600" /> First Flight
            </p>

            <p className="font-bold  ml-6">[Prose]</p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/A Letter to God And Dust of Snow And Fire and Ice.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span> A
              Letter to God
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Nelson Mandela Long Walk to Freedom And A Tiger in the Zoo.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>Nelson
              Mandela: Long Walk to Freedom
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Two Stories about Flying And How to Tell Wild Animals And The Ball Poem.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>Two
              Stories about Flying
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/From the Diary of Anne Frank And Amanda.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span> From
              the Diary of Anne Frank
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Glimpses of India And The Trees.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Glimpses of India
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Mijbil the Otter And Fog.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span> Mijbil
              the Otter
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Madam Rides the Bus And The Tale Of Custard The Dragon.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span> Madam
              Rides the Bus
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/The Sermon at Benares And For Anne Gregory.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span> The
              Sermon at Benares
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 English/Part-1/The Proposal.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 9 :</span>The
              Proposal
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>

            <p className="font-bold  ml-6">[Poem]</p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/A Letter to God And Dust of Snow And Fire and Ice.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span> Dust
              of Snow
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/A Letter to God And Dust of Snow And Fire and Ice.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>Fire
              and Ice
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Nelson Mandela Long Walk to Freedom And A Tiger in the Zoo.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>A Tiger
              in the Zoo
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Two Stories about Flying And How to Tell Wild Animals And The Ball Poem.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>How to
              Tell Wild Animals
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
          <div className="list-disc text-[.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Two Stories about Flying And How to Tell Wild Animals And The Ball Poem.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>The
              Ball Poem
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/From the Diary of Anne Frank And Amanda.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>Amanda
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Glimpses of India And The Trees.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>The
              Trees
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Mijbil the Otter And Fog.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>Fog
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/Madam Rides the Bus And The Tale Of Custard The Dragon.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 9 :</span>The
              Tale of Custard the Dragon
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-1/The Sermon at Benares And For Anne Gregory.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 10 :</span>For
              Anne Gregory
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>

            <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
              <ImBook className="text-orange-600" /> Reader Footprints without
              Feet
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-2/A Triumph of Surgery.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span> A
              Triumph of Surgery
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-2/The Thief’s Story.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>The
              Thief’s Story
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-2/The Midnight Visitor.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>The
              Midnight Visitor
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-2/A Question of Trust.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span> A
              Question of Trust
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-2/Footprints without Feet.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Footprints without Feet
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-2/The Making of a Scientist.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>The
              Making of a Scientist
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 English/Part-2/The Necklace.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>The
              Necklace
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 English/Part-2/Bholi.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>Bholi
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 English/Part-2/The Book that Saved the Earth.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 9 :</span>The
              Book that Saved the Earth
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row  gap-14 mt-10">
          <div className="pt-6 items-center justify-center md:ml-12">
            <table className="table-auto  border-collapse border border-gray-500">
              <thead>
                <tr className="bg-orange-500">
                  <th className="border border-gray-500 p-3">sl no.</th>
                  <th className="border border-gray-500 p-3">
                    Topics with Number of Periods{" "}
                  </th>
                  {/* <th className="border border-gray-500 p-3">No. of Periods	</th> */}
                  <th className="border border-gray-500 p-3">Weightage</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-500 p-3">I</td>
                  <td className="border border-gray-500 p-3">
                    Reading Skills (50 Periods){" "}
                  </td>
                  {/* <td className="border border-gray-500 p-3">60</td> */}
                  <td className="border border-gray-500 p-3">22</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">II</td>
                  <td className="border border-gray-500 p-3">
                    {" "}
                    Writing Skills and Grammar (50 Periods)
                  </td>
                  {/* <td className="border border-gray-500 p-3">55</td> */}
                  <td className="border border-gray-500 p-3">22</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">III</td>
                  <td className="border border-gray-500 p-3">
                    Grammar (50 Periods){" "}
                  </td>
                  {/* <td className="border border-gray-500 p-3">10</td> */}
                  <td className="border border-gray-500 p-3">10</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">IV</td>
                  <td className="border border-gray-500 p-3">
                    Literature Textbook (50 Periods){" "}
                  </td>
                  {/* <td className="border border-gray-500 p-3">50</td> */}
                  <td className="border border-gray-500 p-3">26</td>
                </tr>
                <tr>
                  <th className="border border-gray-500 p-3"></th>
                  <th className="border border-gray-500 p-3">
                    Internal Assessment
                  </th>
                  <th className="border border-gray-500 p-3">20</th>
                </tr>

                <tr>
                  <th className="border border-gray-500 p-3"></th>
                  <th className="border border-gray-500 p-3">Total</th>
                  {/* <td className="border border-gray-500 p-3">215</td> */}
                  <th className="border border-gray-500 p-3">80</th>
                </tr>
                {/* <tr>
                                <th className="border border-gray-500 p-3"></th>
                                <th className="border border-gray-500 p-3">Internal Assessment</th>
                                <th className="border border-gray-500 p-3">20</th>
                            </tr>
                            <tr>
                                <th className="border border-gray-500 p-3"></th>
                                <th className="border border-gray-500 p-3">Grand Total</th>
                                <th className="border border-gray-500 p-3">100</th>
                            </tr> */}
              </tbody>
            </table>
          </div>
          <div className=" w-[340px] md:w-[50%] text-center md:text-start mt-6">
            <p className="">
              In the CBSE (Central Board of Secondary Education) system, the
              evaluation process for Class 10 includes both formative and
              summative assessments to ensure a comprehensive assessment of the
              students' learning. Here’s an outline of the marks distribution
              for Class 10 subjects, including English:
            </p>
            <p className="font-bold mt-3 text-[1.2em]">
              Theory Examination (Board Exam)
            </p>
            <ol className=" flex flex-col gap-1  list-disc text-start px-12  mt-3 md:mt-1  ">
              <li>Total Marks: 80</li>
              <li>Duration: 3 hours</li>
            </ol>
            <p className="font-bold mt-3 text-[1.2em]">Internal Assessment</p>
            <ol className=" flex flex-col gap-1  list-disc text-start px-12  mt-3 md:mt-1 ">
              <li>Total Marks: 20</li>
            </ol>
            <p className="font-bold mt-3 text-[1.2em]">
              The internal assessment is further divided into:
            </p>
            <ol className=" flex flex-col gap-1  list-disc text-start px-12  mt-3 md:mt-1 ">
              <li>Periodic Tests: 10 marks</li>
              <li>Notebook Submission: 5 marks</li>
              <li>
                Subject Enrichment Activities (Practical
                Work/Experiments/Projects): 5 marks
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
