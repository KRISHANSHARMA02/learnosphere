"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function Eaightthclass() {
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
      <title>Class 8th Syllabus - Learnosphere</title>
      <meta
        name="description"
        content="Download the complete Class 8th CBSE syllabus in PDF format for subjects like Mathematics, Science, Social Science, and more. Learnosphere offers comprehensive study materials, detailed syllabus, and exam preparation resources to help students excel in their studies."
      />
      <meta
        name="keywords"
        content="Class 8th syllabus, CBSE Class 8th syllabus, Class 8 CBSE syllabus PDF, Class 8 syllabus 2024, 8th class syllabus Mathematics, 8th class Science syllabus, Class 8th Social Science, NCERT Class 8 syllabus, 8th class CBSE study materials, Class 8th subjects, 8th class syllabus 2024-25, 8th grade syllabus, 8th class exam preparation"
      />

      <Navbar />
      <div className="p-0 md:p-12  flex flex-col font-Poppins justify-center mt-12">
        <div className="">
          <h1 className=" p-4  text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            Class 8th Syllabus
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full  flex flex-col gap-6 mt-8   text-center  pt-6">
            <p className=" font-Poppins">
              The CBSE Class 8 curriculum is designed to ensure a well-rounded
              educational experience for students. It covers essential subjects
              like Mathematics, Science, Social Science, Hindi, and English,
              focusing on both foundational knowledge and advanced concepts. The
              curriculum emphasizes critical thinking, problem-solving, and
              hands-on learning through interactive activities. Additionally, it
              includes Art, Physical Education, and Work Education to enhance
              creativity, physical fitness, and practical skills. This balanced
              approach aims to prepare students for future academic challenges
              and personal growth.
            </p>
            <p>
              {" "}
              The CBSE Class 8 curriculum is thoughtfully structured to support
              the holistic development of students, combining rigorous academic
              instruction with opportunities for personal and social growth. The
              curriculum covers core subjects such as Mathematics, Science,
              Social Science, Hindi, and English, each designed to build on
              prior knowledge while introducing more complex concepts. In
              Mathematics, students engage with topics like algebra, geometry,
              and data handling to develop problem-solving and analytical
              skills. Science delves into advanced topics in physics, chemistry,
              and biology, encouraging inquiry and hands-on experimentation.
              Social Science offers insights into history, geography, and
              civics, helping students understand historical events,
              geographical phenomena, and societal structures. Hindi and English
              literature components enhance language proficiency through diverse
              prose and poetry. Beyond academics, the curriculum includes Art,
              Physical Education, and Work Education to foster creativity,
              physical fitness, and practical skills. This comprehensive
              approach ensures that students are not only academically prepared
              but also equipped with the skills and knowledge necessary for
              future academic challenges and life experiences, promoting
              well-rounded development and readiness for the next stage of their
              education.
            </p>
            <p>
              The CBSE Eight-grade curriculum is crafted to support the holistic
              development of students by balancing academic learning with the
              enhancement of social, emotional, and physical skills. It provides
              a solid foundation in core subjects while fostering creativity,
              critical thinking, and practical skills. The goal is to equip
              students with the confidence and competence needed to tackle
              future academic and life challenges effectively.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg  text-center  w-full md:w-[40%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 8{" "}
          </p>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 8 English
          </p>
          <p className="text-center">
            The English curriculum covers literature and language. It includes a
            range of prose, poetry, and plays to develop reading and
            comprehension skills. Language components focus on grammar,
            composition, and writing skills, aiming to improve overall
            communication abilities.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className="list-disc text-[.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
                <ImBook className="text-orange-600" />
                Honeydew Book
              </p>

              <p className="font-bold  ml-6">[Prose]</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/Best Christmas Present in the World And Ant and the Cricket.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> The
                Best Christmas Present in the World
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/The Tsunami And Geography Lesson.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>The
                Tsunami
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/Glimpses of the Past.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Glimpses of the Past{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/Choudhury’s Lapse of Memory And The Last Bargain.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>Bepin
                Choudhury’s Lapse of Memory{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/The Summit Within And The School Boy.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span> The
                Summit Within{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/This is Jody’s Fawn.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span> This
                is Jody’s Fawn
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/A Visit to Cambridge.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span> A
                Visit to Cambridge{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/A Short Monsoon Diary And On The Grasshopper and Cricket.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span> A
                Short Monsoon Diary
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
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/Best Christmas Present in the World And Ant and the Cricket.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Ant and the Cricket
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/The Tsunami And Geography Lesson.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2:</span>
                Geography Lesson
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/Choudhury’s Lapse of Memory And The Last Bargain.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>The
                Last Bargain
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/The Summit Within And The School Boy.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>The
                School Boy
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-1/A Short Monsoon Diary And On The Grasshopper and Cricket.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>On
                The Grasshopper and Cricket
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
                <ImBook className="text-orange-600" />
                It So Happened
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-2/How the Camel got his hump.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>How
                the Camel got his hump
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-2/Children at work.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Children at work
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-2/The Selfish Giant.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> The
                Selfish Giant
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-2/The treasure within.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>The
                treasure within
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-2/Princess September.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
                Princess September
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 English/Part-2/The fight.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>The
                fight
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 English/Part-2/Jalebis.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Jalebis
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 English/Part-2/Ancient Education System of India.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                Ancient Education System of India
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold  ml-6 text-orange-500  ">
                English grammer
              </p>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-center ">
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
                Verbs
              </p>
              <li className="ml-14 t">
                Forms of verbs (base form, past, past participle)
              </li>
              <li className="ml-14 t">
                Tenses (present, past, future) and their usage
              </li>
              <li className="ml-14 t">
                Modal verbs (can, could, may, might, will, would, shall, should)
              </li>
              <li className="ml-14 t">Active and passive voice</li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Adjectives
              </p>
              <li className="ml-14 t">
                Types of adjectives (descriptive, quantitative, demonstrative,
                possessive)
              </li>
              <li className="ml-14 t">
                Comparison of adjectives (positive, comparative, superlative)
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Adverbs
              </p>
              <li className="ml-14 t">
                Types of adverbs (manner, place, time, frequency, degree)
              </li>
              <li className="ml-14 t">Position of adverbs in sentences</li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-center  ">
                Prepositions
              </p>
              <li className="ml-14 t">
                Usage of prepositions of time, place, and direction
              </li>
              <li className="ml-14 t">Prepositional phrases</li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Conjunctions
              </p>
              <li className="ml-14 t">
                Types of conjunctions (coordinating, subordinating, correlative)
              </li>
              <li className="ml-14 t">
                Usage in connecting words, phrases, and clauses
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Interjections
              </p>
              <li className="ml-14 t">
                Usage of interjections to express emotions or exclamations
              </li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Sentence Structure
              </p>
              <li className="ml-14 t">
                Sentence types (declarative, interrogative, imperative,
                exclamatory)
              </li>
              <li className="ml-14 t">
                Simple, compound, and complex sentences
              </li>
              <li className="ml-14 t">Direct and indirect speech</li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6  text-center  ">
                Punctuation
              </p>
              <li className="ml-14 t">
                Usage of commas, full stops, question marks, exclamation marks,
                colons, and semicolons
              </li>
              <li className="ml-14 t">Quotation marks and their correct use</li>
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6    ">
                Sentence Formation
              </p>
              <li className="ml-14 t">Subject-verb agreement</li>
              <li className="ml-14 t">Correct formation of sentences</li>
              <li className="ml-14 t">Error correction in sentences</li>
            </ol>
          </div>

          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 8 Hindi
          </p>
          <p className="text-center">
            The Hindi curriculum includes literature and language components.
            Students study various prose, poetry, and drama to enhance their
            literary appreciation and language skills. The focus is on reading
            comprehension, vocabulary building, and understanding cultural
            contexts.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Vasant
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/लाख की चूड़ियाँ.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> लाख
                की चूड़ियाँ (कहानी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/बस की यात्रा.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>बस की
                यात्रा (व्यंग)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/दीवानों की हस्ती.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                दीवानों की हस्ती (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/भगवान के डाकिए.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                भगवान के डाकिए (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/निराश हुआ जाए.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span> क्या
                निराश हुआ जाए (निबंध)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/यह सबसे कठिन समय। नहीं.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span> यह
                सबसे कठिन समय। नहीं (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/कबीर की साखियॉं.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>कबीर
                की साखियॉं
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/सूरदास चरित.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                सूरदास चरित (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/जहाँ पहिया है.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>जहाँ
                पहिया है (रिपोर्ताज)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/अकबरी लोटा.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                अकबरी लोटा (कहानी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/सूर के पद.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>सूर
                के पद (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/पानी की कहानी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>पानी
                की कहानी (निबंध)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-1/बाज और साँप.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span> बाज
                और साँप (कहानी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Durva
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/गुड़िया.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                गुड़िया (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/दो गौरैया.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>दो
                गौरैया (कहानी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/चिठ्ठियों में यूरोप.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                चिठ्ठियों में यूरोप (पत्र)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/ओस.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>ओस
                (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/नाटक में नाटक.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>नाटक
                में नाटक (कहानी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/सागर यात्रा.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>सागर
                यात्रा (यात्रा वृत्तांत)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/उठ किसान ओ.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>उठ
                किसान ओ (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/सस्ते का चक्कर.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>सस्ते
                का चक्कर (एकांकी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/एक खिलाड़ी की कुछ यादें.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>एक
                खिलाड़ी की कुछ यादें (संस्मरण)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/बस की सैर.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span> बस
                की सैर (कहानी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/हिंदी ने जिनकी जिंदगी बदल दी – मारिया नेज्यैशी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                हिंदी ने जिनकी जिंदगी बदल दी – मारिया नेज्यैशी (भेंटवार्ता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/आषाढ़ का पहला दिन.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>आषाढ़
                का पहला दिन (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/अन्याय के खिलाफ.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>
                अन्याय के खिलाफ (कहानी)(आदिवासी स्वतंत्रता संघर्ष कथा)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/बच्चों के प्रिय श्री केशव शंकर पिल्लै.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>
                बच्चों के प्रिय श्री केशव शंकर पिल्लै (व्यक्तित्व)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/फ़र्श पर.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span>फ़र्श
                पर (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/बूढी अम्मा की बात.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 16 :</span>बूढी
                अम्मा की बात (लोककथा)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/वह सुबह कभी तो आएगी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 17 :</span>वह
                सुबह कभी तो आएगी (निबंध)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/आओ पत्रिका निकालें.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 18 :</span>आओ
                पत्रिका निकालें (अतिरिक्त पठन के लिए)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-2/आहवान.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 19 :</span>
                आहवान (अतिरिक्त पठन के लिए)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Bharat Ki Khoj
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-3/अहमदनगर का किला.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                अहमदनगर का किला
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-3/तलाश.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>तलाश
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-3/सिंधु घाटी सभ्यता.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                सिंधु घाटी सभ्यता
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-3/युगों का दौर.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>युगों
                का दौर
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-3/नयी समस्याएँ.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>नयी
                समस्याएँ
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-3/अंतिम दौर – एक.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>अंतिम
                दौर – एक
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
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-3/अंतिम दौर – दो.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>अंतिम
                दौर – दो
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Hindi/Part-3/तनाव.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>तनाव
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Hindi/Part-3/दो पृष्ठभूमियाँ – भारतीय और अंग्रेजी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>दो
                पृष्ठभूमियाँ – भारतीय और अंग्रेजी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="ml-6 font-bold ">संज्ञा (Nouns)</p>
              <li className="ml-14 ">
                प्रकार (Types): व्यक्तिवाचक, जातिवाचक, सम्मुहवाचक, अमूर्त
              </li>
              <li className="ml-14 ">
                एकवचन और बहुवचन (Singular and Plural forms)
              </li>
              <li className="ml-14 ">
                संज्ञा की लिंग और वचन (Gender and Number)
              </li>
              <p className="ml-6 font-bold ">सर्वनाम (Pronouns)</p>
              <li className="ml-14 ">व्यक्तिगत सर्वनाम (Personal Pronouns)</li>
              <li className="ml-14 ">
                possessive सर्वनाम (Possessive Pronouns)
              </li>
              <li className="ml-14 ">आत्मवाचक सर्वनाम (Reflexive Pronouns)</li>
              <li className="ml-14 ">
                प्रश्नवाचक सर्वनाम (Interrogative Pronouns)
              </li>
              <p className="ml-6 font-bold ">क्रिया (Verbs)</p>
              <li className="ml-14 ">
                क्रियाओं के प्रकार (Types of Verbs): क्रियाएँ (Action Verbs),
                क्रियाविशेषण (Auxiliary Verbs)
              </li>
              <li className="ml-14 ">
                काल (Tenses): वर्तमान काल, भूतकाल, भविष्यत काल
              </li>
              <li className="ml-14 ">
                क्रिया का रूप (Forms of Verbs): मूल क्रिया, भूतकाल और भविष्यकाल
              </li>
              <p className="ml-6 font-bold ">विशेषण (Adjectives)</p>
              <li className="ml-14 ">
                विशेषण के प्रकार (Types of Adjectives): गुणवाचक, संख्या वाचक,
                संकेतवाचक
              </li>
              <li className="ml-14 ">
                विशेषण की विभक्ति (Degrees of Comparison): Positive,
                Comparative, Superlative
              </li>
              <p className="ml-6 font-bold ">क्रियाविशेषण (Adverbs)</p>
              <li className="ml-14 ">
                प्रकार (Types): क्रिया का प्रकार (Manner), स्थान (Place), समय
                (Time), मात्रा (Degree)
              </li>
              <li className="ml-14 ">
                क्रियाविशेषण की स्थिति (Position in sentences)
              </li>
              <p className="ml-6 font-bold ">अव्यय (Conjunctions)</p>
              <li className="ml-14 ">संयोजक (Coordinating): और, लेकिन, या</li>
              <li className="ml-14 ">
                उपसर्ग (Subordinating): क्योंकि, यदि, ताकि
              </li>
              <li className="ml-14 ">
                यथार्थ संयोजक (Correlative): जैसे ही, न तो, न ही
              </li>
              <p className="ml-6 font-bold ">
                संबंधसूचक शब्द (Relative Pronouns)
              </p>
              <li className="ml-14 ">जो, जिसकी, जिनकी</li>
              <p className="ml-6 font-bold ">
                उपसर्ग और प्रत्यय (Prefixes and Suffixes)
              </p>
              <li className="ml-14 ">शब्दों की संरचना और अर्थ बदलना</li>
              <p className="ml-6 font-bold ">वाक्य रचना (Sentence Structure)</p>
              <li className="ml-14 ">
                वाक्य के प्रकार (Types of Sentences): सामान्य, प्रश्नवाचक, आशय
                वाचक
              </li>
              <li className="ml-14 ">
                वाक्य की त्रुटियाँ और सुधार (Errors in Sentences and
                Corrections)
              </li>
              <p className="ml-6 font-bold ">
                वर्णमाला और स्वर-व्यंजन (Alphabet and Vowels/Consonants)
              </p>
              <li className="ml-14 ">
                स्वर और व्यंजन का परिचय (Introduction to Vowels and Consonants)
              </li>
              <li className="ml-14 ">
                सही उच्चारण और लिपि (Correct Pronunciation and Script)
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[60%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 8 Mathematics
          </p>
          <p className="text-center">
            Mathematics for Class 8 builds on previous knowledge and introduces
            more complex concepts. Topics include algebra (linear equations,
            polynomials), geometry (triangles, circles, and quadrilaterals),
            data handling (statistics and probability), and mensuration (area
            and volume of shapes). The focus is on developing problem-solving
            skills and a deeper understanding of mathematical principles.
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
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Mathematics/Rational Numbers.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
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
                    "https://learnosphere.in/public_pdf/Class-8 Mathematics/Linear Equations in One Variable.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Linear Equations in One Variable
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Mathematics/Understanding Quadrilaterals.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Understanding Quadrilaterals
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Mathematics/Handling.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>Data
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
                    "https://learnosphere.in/public_pdf/Class-8 Mathematics/Squares and Square Root.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
                Squares and Square Roots
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Mathematics/Cubes and Cube Roots.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>Cubes
                and Cube Roots
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
                    "https://learnosphere.in/public_pdf/Class-8 Mathematics/Comparing Quantities.pdf"
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
                    "https://learnosphere.in/public_pdf/Class-8 Mathematics/Algebraic Expressions and Identities.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                Algebraic Expressions and Identities
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Mathematics/Mensuration.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
                Mensuration
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Mathematics/Exponents and Powers.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Exponents and Powers
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Mathematics/Direct and Indirect proportions.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Direct and Indirect proportions
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Mathematics/Factorisation.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>
                Factorisation
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Mathematics/Introduction to Graphs.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>
                Introduction to Graphs
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[80%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 8 Science
          </p>
          <p className="text-center">
            The Science curriculum covers fundamental concepts in physics,
            chemistry, and biology. Key topics include forces and motion, matter
            and its properties, chemical reactions, and the human body. Students
            engage in experiments and practical activities to understand
            scientific principles and develop observational and analytical
            skills.
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
                    "https://learnosphere.in/public_pdf/Class-8 Science/Production and Management.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>Crop
                Production and Management
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Science/Microorganisms Friend and Foe.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Microorganisms: Friend and Foe
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Science/Coal and Petroleum.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Coal
                and Petroleum
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Science/Combustion and Flame.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Combustion and Flame
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Science/Conservation of Plants and Animals.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Conservation of Plants and Animals
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Science/Reproduction in Animals.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Reproduction in Animals
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
                    "https://learnosphere.in/public_pdf/Class-8 Science/Reaching the Age of Adolescence.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Reaching the Age of Adolescence
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Science/Force and Pressure.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
                Force and Pressure
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Science/Friction.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
                Friction
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Science/Sound.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Sound
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Science/Chemical Effects of Electric Current.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Chemical Effects of Electric Current
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Science/Some Natural Phenomena.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>Some
                Natural Phenomena
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Science/Light.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>
                Light
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[80%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 8 Social Science{" "}
          </p>
          <p className="text-center">
            Social Science includes history, geography, and civics. History
            covers significant historical events and movements, geography
            explores physical and human geography, and civics focuses on the
            understanding of civic responsibilities and governance. This subject
            helps students gain insights into the world and their place in it.
          </p>
          <div className="flex flex-wrap gap-8 px-7 mb-10  md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Our Past - III
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-1/How,When and Where.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>How,
                When and Where
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-1/From Trade to Territory.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>From
                Trade to Territory
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-1/Ruling the Countryside.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Ruling the Countryside
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-1/Tribals, Dikus and the Vision of a Golden Age.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Tribals, Dikus and the Vision of a Golden Age
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-1/When People Rebel.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>When
                People Rebel
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-1/Civilising the “Native”, Educating the Nation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Civilising the “Native”, Educating the Nation
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-1/Women, Caste, and Reform.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Women, Caste, and Reform
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-1/The Making of the National Movement.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>The
                Making of the National Movement
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
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-2/The Indian Constitution.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Indian Constitution
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-2/Understanding Secularism.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Understanding Secularism
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-2/Why Do We Need a Parliament.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> Why
                Do We Need a Parliament?
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
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Sst/Part-2/Judiciary.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                Judiciary
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-2/Understanding Marginalisation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Understanding Marginalisation
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-2/Confronting Marginalisation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
                Confronting Marginalisation
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-2/Public Facilities.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Public Facilities
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-2/Law and Social Justice.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span> Law
                and Social Justice
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} /> Resources and
                Development-Geography
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Sst/Part-3/Resources.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                Resources
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-8 Sst/Part-3/Land,Soil, Water, Natural Vegetation and Wildlife Resources.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>Land,
                Soil, Water, Natural Vegetation and Wildlife Resources
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Sst/Part-3/Agriculture.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Agriculture
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Sst/Part-3/Industries.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Industries
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-8 Sst/Part-3/Human Resource.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Human
                Resource
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
