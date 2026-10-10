"use client";
import DownloadFormModal from "@/components/DownloadFormModal";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { ImBook } from "react-icons/im";
import { MdDownload } from "react-icons/md";

export default function Seventhclass() {
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
    <div className="font-Poppins">
      <Navbar />
      <div className="p-0 md:p-12  flex flex-col font-Poppins justify-center mt-12">
        <div className="">
          <h1 className=" p-4  text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            Class 7th Syllabus{" "}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full  flex flex-col gap-6 mt-8   text-center  pt-6">
            <p className=" font-Poppins">
              The Central Board of Secondary Education (CBSE) provides a
              comprehensive curriculum for seventh-grade students, designed to
              foster holistic development. The curriculum covers essential
              subjects such as Mathematics, Science, Social Science, Hindi, and
              English, aiming to build strong foundational knowledge and
              critical thinking skills. It includes engaging content in
              literature and interactive learning in scientific principles.
              Additionally, students participate in Art, Physical Education, and
              Work Education to enhance creativity, fitness, and practical
              skills. This well-rounded approach supports academic and personal
              growth.
            </p>
            <p>
              The CBSE Class 7 curriculum offers a comprehensive educational
              experience designed to build on foundational knowledge and develop
              a broad range of skills. The curriculum includes subjects such as
              Mathematics, Science, Social Science, Hindi, and English. In
              Mathematics, students explore topics like integers, fractions,
              geometry, and algebra to strengthen their problem-solving skills.
              Science introduces concepts in physical, chemical, and biological
              sciences, encouraging hands-on experiments and observations.
              Social Science covers history, geography, and political science,
              helping students understand past events, cultural contexts, and
              governance structures. In Hindi, the syllabus includes a variety
              of prose and poetry to enhance literary appreciation and language
              skills, while English focuses on reading comprehension, writing,
              and grammar to improve communication abilities. Additionally,
              students engage in subjects like Art and Craft, Physical
              Education, and Work Education, which aim to foster creativity,
              physical fitness, and practical skills. The curriculum emphasizes
              holistic development, including critical thinking,
              problem-solving, and emotional intelligence, preparing students
              for future academic challenges and real-world applications.
            </p>

            <p>
              The CBSE seventh-grade curriculum is designed to promote the
              holistic development of students, focusing on academic growth as
              well as social, emotional, and physical skills. It aims to build a
              strong foundation across various subjects while encouraging
              creativity, critical thinking, and practical abilities. The
              objective is to prepare students to handle future academic
              challenges and life experiences with confidence and competence.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg  text-center  w-full md:w-[40%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 7{" "}
          </p>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 7 English
          </p>
          <p className="text-center">
            Class 7 English expands students' proficiency in the language
            through a diverse selection of literary works, including stories,
            poems, and dramas. The curriculum emphasizes grammar, including
            clauses, phrases, active and passive voice, and direct and indirect
            speech. Vocabulary development and writing skills are further
            enhanced through essays, reports, and creative writing tasks.
            Listening and speaking activities are integrated to build confidence
            and fluency, preparing students for more advanced communication.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className="list-disc text-[.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
                <ImBook className="text-orange-600" />
                Honeycomb Book
              </p>

              <p className="font-bold  ml-6">[Prose]</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/Three Questions And The Squirrel.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>Three
                Questions
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/A Gift of Chappals And The Rebel.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>A
                Gift of Chappals
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/Gopal and the Hilsa-Fish And The Shed.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Gopal
                and the Hilsa-Fish
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/The Ashes That Made Trees Bloom And Chivvy.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>The
                Ashes That Made Trees Bloom
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/Quality And Trees.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Quality
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/Expert Detectives And Mystery of the Talking Fan.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Expert Detectives
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/The Invention of Vita-Wonk And Garden Snake.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>The
                Invention of Vita-Wonk
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/A Homeage to our Brave Soldiers And Meadow Surprise.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>A
                Homeage to our Brave Soldiers
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
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/Three Questions And The Squirrel.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Squirrel
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/A Gift of Chappals And The Rebel.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>The
                Rebel
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/Gopal and the Hilsa-Fish And The Shed.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>The
                Shed
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/The Ashes That Made Trees Bloom And Chivvy.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Chivvy
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/Quality And Trees.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Trees
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/Expert Detectives And Mystery of the Talking Fan.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Mystery of the Talking Fan
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/The Invention of Vita-Wonk And Garden Snake.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Garden Snake
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-1/A Homeage to our Brave Soldiers And Meadow Surprise.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                Meadow Surprise
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
                <ImBook className="text-orange-600" />
                An Alien Hand Book
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-2/The Tiny Teacher.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> The
                Tiny Teacher
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-2/Bringing Up Kari.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Bringing Up Kari
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-2/Golu Grows A Nose.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Golu
                Grows A Nose
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 English/Part-2/Chandni.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                Chandni
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-2/The Bear Story.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>The
                Bear Story
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-2/A Tiger In The House.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>A
                Tiger In The House
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 English/Part-2/An Alien Hand.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>An
                Alien Hand
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold  ml-6 text-orange-500  ">
                English grammer
              </p>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-center  ">
                Parts of Speech
              </p>
              <li className="ml-14 t">
                Nouns (including types: proper, common, collective, abstract)
              </li>
              <li className="ml-14 t">
                Pronouns (personal, possessive, reflexive, relative,
                interrogative, demonstrative, etc.)
              </li>
              <li className="ml-14 t">
                Verbs (main and auxiliary verbs; transitive and intransitive
                verbs)
              </li>
              <li className="ml-14 t">
                Adjectives (types and degrees of comparison)
              </li>
              <li className="ml-14 t">Adverbs (types and comparison)</li>
              <li className="ml-14 t">Prepositions</li>
              <li className="ml-14 t">
                Conjunctions (coordinating, subordinating, and correlative)
              </li>
              <li className="ml-14 t">Interjections</li>
            </div>

            <ol className="list-disc text-[0.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Tenses
              </p>
              <li className="ml-14 t">
                Present tense (simple, continuous, perfect, perfect continuous)
              </li>
              <li className="ml-14 t">
                Past tense (simple, continuous, perfect, perfect continuous)
              </li>
              <li className="ml-14 t">
                Future tense (simple, continuous, perfect, perfect continuous)
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Sentences
              </p>
              <li className="ml-14 t">
                Types of sentences (declarative, interrogative, imperative,
                exclamatory)
              </li>
              <li className="ml-14 t">
                Sentence structure (simple, compound, complex)
              </li>
              <li className="ml-14 t">Subject-verb agreement</li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Clauses and Phrases
              </p>
              <li className="ml-14 t">Main and subordinate clauses</li>
              <li className="ml-14 t">
                Types of clauses (noun, adjective, adverbial)
              </li>
              <li className="ml-14 t">
                Phrases (noun, verb, adjective, adverb, prepositional)
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Direct and Indirect Speech
              </p>
              <li className="ml-14 t">
                Rules of changing direct speech to indirect speech and vice
                versa
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Active and Passive Voice
              </p>
              <li className="ml-14 t">
                Conversion of sentences from active to passive voice and vice
                versa
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-center  ">
                Modals
              </p>
              <li className="ml-14 t">
                Use of modals (can, could, may, might, will, would, shall,
                should, must, ought to, etc.)
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Articles
              </p>
              <li className="ml-14 t">
                Definite and indefinite articles (a, an, the) and their correct
                usage
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Prepositions
              </p>
              <li className="ml-14 t">
                Types and correct usage of prepositions
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Conjunctions
              </p>
              <li className="ml-14 t">
                Types of conjunctions and their uses in sentences
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Punctuation
              </p>
              <li className="ml-14 t">
                Proper use of punctuation marks (periods, commas, semicolons,
                colons, quotation marks, etc.)
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6    ">
                Vocabulary and Word Formation
              </p>
              <li className="ml-14 t">Prefixes and suffixes</li>
              <li className="ml-14 t">Synonyms and antonyms</li>
              <li className="ml-14 t">Homophones and homonyms</li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Figures of Speech
              </p>
              <li className="ml-14 t">
                Simile, metaphor, personification, hyperbole, onomatopoeia, etc.
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Editing and Proofreading
              </p>
              <li className="ml-14 t">
                Identifying and correcting grammatical errors in sentences and
                passages
              </li>
            </ol>
          </div>

          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 7 Hindi
          </p>
          <p className="text-center">
            The Class 7 Hindi curriculum focuses on further developing students'
            linguistic abilities and literary appreciation. It includes a rich
            collection of prose, poetry, and plays, highlighting cultural
            narratives and moral values. The grammar component delves deeper
            into complex concepts such as compound sentences, idioms, and
            proverbs. Students are encouraged to engage in creative writing,
            letter writing, and comprehension exercises, enhancing their ability
            to express themselves clearly and effectively in Hindi.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} /> Durva Hindi
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/चिड़िया और चुरुंगुन.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                चिड़िया और चुरुंगुन (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/सबसे सुंदर लड़की.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>सबसे
                सुंदर लड़की (कहानी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/मैं हूँ रोबोट.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>मैं
                हूँ रोबोट (निबंध)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/गुब्बारे पर चिता.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                गुब्बारे पर चिता (कहानी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/थोड़ी धरती पाऊँ.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>थोड़ी
                धरती पाऊँ (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/गारो.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>गारो
                (लोककथा)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/पुस्तकें जो अमर हैं.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
                पुस्तकें जो अमर हैं (निबंध)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/काबुलीवाला.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                काबुलीवाला (कहानी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/विश्वेश्वरैया.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
                विश्वेश्वरैया (व्यक्तित्व)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/हम धरती के लाल.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>हम
                धरती के लाल (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/पोंगल.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                पोंगल (निबंध)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/शहीद झलकारीबाई.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>शहीद
                झलकारीबाई (एकांकी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/नृत्यांगना सुधा चंद्रन.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>
                नृत्यांगना सुधा चंद्रन (जीवनी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/पानी और धूप.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>पानी
                और धूप (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/गीत.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span> गीत
                (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/मिटटी की मूर्तियाँ.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 16 :</span>
                मिटटी की मूर्तियाँ (निबंध-अतिरिक्त पठन हेतु)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/मौत का पहाड़.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 17 :</span>मौत
                का पहाड़ (चित्रकथा)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-2/हम होंगे कामयाब एक दिन.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 18 :</span> हम
                होंगे कामयाब एक दिन (गीत-अतिरिक्त पठन हेतु)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} /> Bal Mahabharat
                Katha Hindi
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-3/Mahabharat Story.pdf"
                  )
                }
              >
                Mahabharat Story
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} /> Vasant Hindi
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/हम पंछी उन्मुक्त गगन के.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>हम
                पंछी उन्मुक्त गगन के
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/हिमालय की बेटियां.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                हिमालय की बेटियां
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/कठपुतली.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                कठपुतली
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <ol className="list-disc text-[0.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/मीठाईवाला.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                मीठाईवाला
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/पापा खो गए.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>पापा
                खो गए
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/शाम एक किशान.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span> शाम
                एक किशान
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/अपूर्व अनुभव.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                अपूर्व अनुभव
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/रहीम की दोहे.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>रहीम
                की दोहे
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/एक तिनका.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>एक
                तिनका
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/खानपान की बदलती तस्वीर.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                खानपान की बदलती तस्वीर
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/नीलकंठ.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                नीलकंठ
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/भोर और बरखा.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>भोर
                और बरखा
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/वीर कुवर सिंह.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>वीर
                कुवर सिंह
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/संघर्ष के कराण मैं तुनुकमिजाज हो गया धनराज.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>
                संघर्ष के कराण मैं तुनुकमिजाज हो गया धनराज
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Hindi/Part-1/आश्रम का अनुमानित व्यय.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span>{" "}
                आश्रम का अनुमानित व्यय
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold  ml-6 text-orange-500  ">Reading:</p>
              <li className="ml-14">
                <span className="font-semibold ">
                  भाषा और व्याकरण (Language and Grammar):
                </span>
                Understanding the basics of Hindi grammar.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">वर्ण विचार (Phonetics):</span>
                Study of sounds in the Hindi language.
              </li>

              <li className="ml-14">
                <span className="font-semibold ">
                  शब्द विचार (Lexical Studies) :{" "}
                </span>{" "}
                Analysis of words, their formation, and usage.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">संज्ञा (Noun)</span> Types and
                usage of nouns.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">लिंग (Gender)</span>Masculine
                and feminine gender in nouns.
              </li>

              <li className="ml-14">
                <span className="font-semibold ">वचन (Number) </span>Singular
                and plural forms of nouns.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">कारक (Cases):</span> Different
                cases in Hindi grammar.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">सर्वनाम (Pronoun):</span>Types
                and uses of pronouns.
              </li>

              <li className="ml-14">
                <span className="font-semibold ">विशेषण (Adjectives): </span>{" "}
                Describing words and their uses.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">क्रिया (Verb): :</span>Types of
                verbs and their conjugations.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">काल (Tense):</span>{" "}
                Understanding past, present, and future tenses.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[60%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 7 Mathematics
          </p>
          <p className="text-center">
            In Class 7 Mathematics, students explore advanced topics such as
            integers, fractions, decimals, rational numbers, algebraic
            expressions, and linear equations. Geometry topics include
            congruence, symmetry, and constructions. The syllabus also covers
            the concept of simple and compound interest, and data handling.
            Through problem-solving exercises, students strengthen their logical
            reasoning and analytical skills, learning to approach mathematical
            challenges methodically and confidently.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Mathematic
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Mathematics/Integers.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                Integers
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Mathematics/Fractions and Decimals.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Fractions and Decimals
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Mathematics/Data Handling.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> Data
                Handling
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Mathematics/Simple Equations.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                Simple Equations
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Mathematics/Lines and Angles.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Lines
                and Angles
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Mathematics/The Triangles and its Properties.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>The
                Triangles and its Properties
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Mathematics/Comparing Quantities.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Comparing Quantities
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Mathematics/Rational Numbers.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
                Rational Numbers
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Mathematics/Perimeter and Area.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>{" "}
                Perimeter and Area
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Mathematics/Algebraic Expressions.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>{" "}
                Algebraic Expressions
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Mathematics/Exponents and Powers.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Exponents and Powers
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Mathematics/Symmetry.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>
                Symmetry
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Mathematics/Visualising Solid Shapes.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>
                Visualising Solid Shapes
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[80%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 7 Science
          </p>
          <p className="text-center">
            The Science syllabus for Class 7 introduces students to more complex
            concepts in Physics, Chemistry, Biology, and Environmental Science.
            Topics include the structure of matter, reproduction in plants and
            animals, heat, light, and physical and chemical changes. The
            curriculum encourages inquiry-based learning through experiments,
            observations, and projects. Students develop analytical skills and a
            deeper understanding of the scientific principles governing the
            natural world, fostering a sense of curiosity and exploration.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Science
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Science/Nutrition in Plants.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Nutrition in Plants
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Science/Nutrition in Animals.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Nutrition in Animals
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Science/Heat.pdf")}
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Heat
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Science/Acids, Bases and Salts.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Acids, Bases and Salts
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Science/Physical and Chemical Changes.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Physical and Chemical Changes
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Science/Respiration in Organisms.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
                Respiration in Organisms
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Science/Transportation in Animals and Plants.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Transportation in Animals and Plants
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Science/Reproduction in Plants.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
                Reproduction in Plants
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Science/Motion and Time.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>{" "}
                Motion and Time
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Science/Electric Current and Its Effects.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>{" "}
                Electric Current and Its Effects
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Science/Light.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Light
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Science/Forests Our Lifeline.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>
                Forests: Our Lifeline
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Science/Wastewater Story.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>
                Wastewater Story
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[80%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 7 Social Science{" "}
          </p>
          <p className="text-center">
            The Social Science curriculum for Class 7 integrates History,
            Geography, and Civics. In History, students delve into medieval
            India, exploring dynasties, cultures, and important events.
            Geography covers physical features of the Earth, weather and
            climate, and the environment. Civics focuses on the functioning of
            the democratic government, fundamental rights, and duties. The
            curriculum aims to build a comprehensive understanding of social
            structures, governance, and the physical environment, promoting
            informed and active citizenship.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} /> Our Past- II
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-1/Tracing Changes Through A Thousand Years.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Tracing Changes Through A Thousand Years
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-1/New Kings and Kingdoms.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>New
                Kings and Kingdoms{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-1/The Delhi Sultans.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>The
                Delhi Sultans{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-1/The Mughal Empire.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>The
                Mughal Empire{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-1/Tribes, Nomads and Settled Communities.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Tribes, Nomads and Settled Communities{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-1/Devotional Paths to the Divine.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Devotional Paths to the Divine{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-1/The Making of Regional Cultures.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>The
                Making of Regional Cultures{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-1/Eighteenth-Century Political Formations.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                Eighteenth-Century Political Formations{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Our Environment - Geography
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Sst/Part-2/Environment.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                Environment
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-2/Inside Our Earth.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Inside Our Earth
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-2/Our Changing Earth.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Our
                Changing Earth
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Sst/Part-2/Air.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>Air
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Sst/Part-2/Water.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Water
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-2/Human Environment Interactions The Tropical abd the Subtropical Region.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>Human
                Environment Interactions The Tropical abd the Subtropical Region
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-2/Life in the Deserts.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>Life
                in the Deserts
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} /> Social and
                Political Life – II
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-7 Sst/Part-3/On Equality.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>On
                Equality
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-3/Role of the Government in Health.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>Role
                of the Government in Health
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-3/How the State Government Works.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>How
                the State Government Works
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-3/Growing Up as Boys and Girls.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Growing Up as Boys and Girls
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-3/Women Change The World.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
                Women Change The World
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-3/Understanding Media.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Understanding Media
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-3/Markets Around Us.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Markets Around Us
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-7 Sst/Part-3/A Shirt in the Market.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>A
                Shirt in the Market
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
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
