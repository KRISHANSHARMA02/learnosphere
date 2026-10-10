"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function English12() {
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
            CBSE Class 12 English Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/5 flex flex-col gap-4 text-center md:text-start pt-9 ">
            <p className=" p-4">
              When it comes to tde language subject, there is no doubt that
              students often tend to ignore these and always have more focus on
              the core subjects when they are doing their preparation for the
              examinations that they are going to give. However, there is a
              certain importance to the language subjects as well that shouldn’t
              be ignored. these subjects tend to have a lot of weight when it
              comes to marks. With the help of the CBSE Class 12 English
              syllabus, we are going to make the students understand exactly how
              important these language subjects are in the best way.
            </p>
            <p className=" p-4">
              The CBSE Class 12th English syllabus includes a mix of prose,
              poetry, and drama. Key themes explore human emotions, social
              issues, and cultural values. Notable works include "The Last
              Lesson," "Lost Spring," and poems like "My Mother at Sixty-Six"
              and "An Elementary School Classroom in a Slum
            </p>
            <p className=" p-4">
              CBSE (Central Board of Secondary Education) Class 12 English
              syllabus is divided into various units and sections. Here's an
              overview of the units and their key topics:
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
                  <td className="border border-gray-500 ">
                    Reading Comprehension
                  </td>
                  <td className="border border-gray-500 ">
                    <p className="font-bold">Two Passages:</p>
                    <ol className="list-disc ml-5">
                      <li>One passage of 500-600 words</li>
                      <li> One passage of 400-500 words</li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 text-center "> B</td>
                  <td className="border border-gray-500 ">
                    <p>Creative Writing Skills </p>
                  </td>
                  <td className="border border-gray-500  ">
                    <p className="font-bold">Short Writing Tasks</p>
                    <ol className="list-disc ml-5">
                      <li>Notice, Advertisement </li>
                    </ol>
                    <p className="font-bold">Letters</p>
                    <ol className="list-disc ml-5">
                      <li>Formal letters based on a given situation</li>
                      <li>
                        Letter to the editor (giving suggestions or opinion on
                        issues of public interest)
                      </li>
                      <li>Application for a job</li>
                    </ol>
                    <p className="font-bold">Long Writing Tasks</p>
                    <ol className="list-disc ml-5">
                      <li>Formal letters based on a given situation</li>
                    </ol>
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 text-center "> C</td>
                  <td className="border border-gray-500 ">
                    <p>Literature Textbooks and Supplementary Reading Text </p>
                  </td>
                  <td className="border border-gray-500  ">
                    <p className="font-bold"> Flamingo Prose</p>
                    <ol className="list-disc ml-5">
                      <li>
                        The Last Lesson, Lost Spring, Deep Water, The Rattrap,
                        Indigo, Poets and Pancakes, The Interview, Going Places
                      </li>
                    </ol>
                    <p className="font-bold">Flamingo Poetry</p>
                    <ol className="list-disc ml-5">
                      <li>
                        My Mother at Sixty-Six, An Elementary School Classroom
                        in a Slum, Keeping Quiet, A Thing of Beauty, A Roadside
                        Stand, Aunt Jennifer’s Tigers
                      </li>
                    </ol>
                    <p className="font-bold">Vistas</p>
                    <ol className="list-disc ml-5">
                      <li>
                        The Third Level, The Tiger King, Journey to the End of
                        the Earth, The Enemy, Should Wizard Hit Mommy?, On the
                        Face of It, Evans Tries an O-Level, Memories of
                        Childhood
                      </li>
                    </ol>
                    <p className="font-bold">Supplementary Reader</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 mb-10 md:mb-0 px-7 md:px-20 mt-8">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Flamingo
            </p>
            <p className="font-bold  ml-6">[Prose]</p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-1/The Last Lesson.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>The
              Last Lesson
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 English/Part-1/Lost Spring.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>Lost
              Spring
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 English/Part-1/Deep Water.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>Deep
              Water
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 English/Part-1/The Rattrap.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>The
              Rattrap
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 English/Part-1/Indigo.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>Indigo
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-1/Poets and Pancakes.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>Poets
              and Pancakes
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-1/The Interview.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>The
              Interview
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 English/Part-1/Going Places.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>Going
              Places
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
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-1/My Mother at Sixty-six.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>My
              Mother at Sixty-six
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-1/Keeping Quiet.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>Keeping
              Quiet
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-1/A Thing of Beauty.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span> A
              Thing of Beauty
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-1/A Roadside Stand.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>A
              Roadside Stand
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-1/Aunt Jennifer’s Tigers.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>Aunt
              Jennifer’s Tigers
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>

            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Vistas
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 English/Part-2/Third Level.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>Third
              Level
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-2/The Tiger King.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>The
              Tiger King
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-2/Journey to the End of the Earth.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>Journey
              to the End of the Earth
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 English/Part-2/The Enemy.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>The
              Enemy
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-2/On the Face of It.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>On the
              Face of It
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 English/Part-2/Memories of Childhood.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>
              Memories of Childhood
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>

            <p className="ml-6 font-bold text-orange-600">English Grammer</p>
            <li className="ml-14 text-[.9em] ">
              <span className="font-semibold ">Tenses: </span>Study of different
              tenses (Present, Past, Future) and their subtypes (Simple,
              Continuous, Perfect, Perfect Continuous) along with their correct
              usage.
            </li>

            <li className="ml-14 text-[.9em] ">
              <span className="font-semibold ">Modals: </span>Understanding and
              using modal verbs (can, could, may, might, must, shall, should,
              will, would, etc.) in sentences to express ability, permission,
              obligation, etc.
            </li>
          </div>

          <div className=" flex flex-col gap-4 text-[.9em]  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <li className="ml-14 ">
              <span className="font-semibold ">Clauses: </span>Study of
              different types of clauses including noun clauses, adjective
              clauses, and adverb clauses, and their functions in a sentence.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">Active and Passive Voice: </span>
              Conversion of sentences from active voice to passive voice and
              vice versa, understanding their structures and usage.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">
                Direct and Indirect Speech:{" "}
              </span>
              Rules for converting direct speech into indirect speech and vice
              versa, including changes in tense, pronouns, and time expressions.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">Subject-Verb Agreement: </span>{" "}
              Understanding the agreement between the subject and verb in a
              sentence based on number and person.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">Articles: </span> Usage of
              definite (the) and indefinite articles (a, an), and understanding
              when to use or omit them.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold "> Prepositions: </span>Study of
              various prepositions and their correct usage in sentences.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">Determiners: </span>Understanding
              and using determiners like all, some, many, few, each, every,
              either, neither, and others in sentences.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">Conjunctions: </span>Study of
              coordinating, subordinating, and correlative conjunctions and
              their use in connecting words, phrases, or clauses.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">Sentence Transformation: </span>{" "}
              Practice in transforming sentences, such as converting simple
              sentences to complex or compound sentences, and vice versa.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">
                Error Detection and Correction:{" "}
              </span>
              Identifying and correcting grammatical errors in sentences related
              to various grammatical rules.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">Editing and Omission: </span>
              Exercises in identifying and correcting errors or omitting
              unnecessary words from passages.
            </li>
            <li className="ml-14 ">
              <span className="font-semibold ">Sentence Reordering: </span>
              Rearranging jumbled sentences to form coherent and grammatically
              correct sentences.
            </li>
          </div>
        </div>

        <div className="flex flex-col  md:flex-row gap-6">
          <div className="w-full md:w-2/5 pt-12 flex flex-col gap-4">
            <p className="font-bold">
              Here is the CBSE Class 12th English Core syllabus for the
              2024-2025 academic year, organized in a table with the subtopics
              listed under each main section
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
                    <p className="">Two Passages</p>
                    <p>One passage of 500-600 words(12)</p>
                    <p> One passage of 400-500 words(8)</p>
                  </td>
                  <td className="border border-gray-500 p-2 text-center">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2 text-center"> B</td>
                  <td className="border border-gray-500 p-2">
                    <p className="font-bold">Creative Writing Skills </p>
                    <p>Short Writing Tasks(4)</p>
                    <p>Letters(6)</p>
                    <p>Long Writing Tasks(10)</p>
                  </td>
                  <td className="border border-gray-500 p-2 text-center">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2 text-center"> C</td>
                  <td className="border border-gray-500 p-2">
                    <p className="font-bold">
                      Literature Textbooks and Supplementary Reading Text{" "}
                    </p>
                    <p>Flamingo(16)</p>
                    <p>Vistas(14)</p>
                    <p>Supplementary Reader(10)</p>
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
