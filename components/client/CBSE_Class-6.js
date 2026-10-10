"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function Sixthclass() {
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
            Class 6th{" "}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full  flex flex-col gap-6 mt-8   text-center  pt-6">
            <p className=" font-Poppins">
              The Central Board of Secondary Education (CBSE) offers a
              well-rounded and comprehensive curriculum for sixth-grade
              students. The curriculum is designed to nurture the holistic
              development of students through a diverse range of subjects and
              activities
            </p>
            <p>
              The 6th class curriculum introduces students to a comprehensive
              range of subjects, including Mathematics, Science, Social Studies,
              and Languages, fostering critical thinking and analytical skills.
              In Mathematics, topics like fractions, decimals, basic algebra,
              and geometry are covered, providing a solid foundation for
              advanced concepts. Science explores the fundamentals of Physics,
              Chemistry, and Biology, with a focus on practical applications and
              experiments. Social Studies delve into history, geography, and
              civics, encouraging an understanding of the world and its diverse
              cultures. Language studies emphasize grammar, composition, and
              literature, enhancing communication skills and appreciation for
              different literary genres. Additionally, the curriculum includes
              subjects like Computer Science, Art, and Physical Education,
              promoting holistic development and creative expression. Overall,
              the 6th class aims to broaden students' knowledge and skills,
              preparing them for the complexities of higher education and life.
            </p>

            <p>
              The CBSE sixth-grade curriculum is crafted to ensure the holistic
              development of students. It emphasizes not only academic
              excellence but also the enhancement of social, emotional, and
              physical skills. The goal is to nurture well-rounded individuals
              who are well-prepared for future academic challenges and life
              experiences.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg  text-center  w-full md:w-[40%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 6{" "}
          </p>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 6 English
          </p>
          <p className="text-center">
            Class 6 English introduces students to a diverse range of literary
            genres, including prose, poetry, and drama. The curriculum is
            designed to improve reading comprehension, vocabulary, and grammar.
            It covers topics like sentence structure, tenses, parts of speech,
            and punctuation. Students engage in creative writing, essay writing,
            and debates, fostering effective communication skills. The syllabus
            also includes activities that enhance listening and speaking
            abilities, encouraging fluency and confidence in English.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Poorvi English
              </p>
              <p className="font-bold text-orange-600 p-2 text-md ">
                Unit-1 : Fables and Folk Tales
              </p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/A Bottle of Dew And The Unlikely Best Friends And Rama to the Rescue.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>A
                Bottle of Dew
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/A Bottle of Dew And The Unlikely Best Friends And Rama to the Rescue.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>The
                Raven and the Fox
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/A Bottle of Dew And The Unlikely Best Friends And Rama to the Rescue.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Rama
                to the Rescue
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">
                Unit-2 : Friendship
              </p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/The Unlikely Best Friends And A Friend’s Prayer And The Chair.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>The
                Unlikely Best Friends
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/The Unlikely Best Friends And A Friend’s Prayer And The Chair.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>A
                Friend’s Prayer
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/The Unlikely Best Friends And A Friend’s Prayer And The Chair.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>The
                Chair
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">
                Unit-3 : Nurturing Nature
              </p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/Neem Baba And What a Bird Thought And Spices That Heal Us.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>Neem
                Baba
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/Neem Baba And What a Bird Thought And Spices That Heal Us.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>What
                a Bird Thought
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/Neem Baba And What a Bird Thought And Spices That Heal Us.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
                Spices That Heal Us
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">
                Unit-4 :{" "}
              </p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/Change of Heart And The Winner And Yoga – A Way of Life.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>{" "}
                Change of Heart
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/Change of Heart And The Winner And Yoga – A Way of Life.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>The
                Winner
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/Change of Heart And The Winner And Yoga – A Way of Life.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>Yoga
                – A Way of Life
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-5</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/Hamara Bharat-Incredible India And The Kites And Ila Sachani Embroidering Dreams With Her Feet And National War Memorial.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>
                Hamara Bharat-Incredible India!
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/Hamara Bharat-Incredible India And The Kites And Ila Sachani Embroidering Dreams With Her Feet And National War Memorial.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>The
                Kites
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/Hamara Bharat-Incredible India And The Kites And Ila Sachani Embroidering Dreams With Her Feet And National War Memorial.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span>Ila
                Sachani: Embroidering Dreams With Her Feet
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 English/Hamara Bharat-Incredible India And The Kites And Ila Sachani Embroidering Dreams With Her Feet And National War Memorial.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 16 :</span>
                National War Memorial
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <ol className="list-disc text-[0.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold  ml-6 text-orange-500  ">
                English grammer
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Nouns</span> Different types of
                nouns including common, proper, collective, and abstract, along
                with singular and plural forms
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Pronouns:</span>Usage of
                personal, possessive, reflexive, demonstrative, interrogative,
                relative, and indefinite pronouns.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Verbs:</span>Understanding main
                and auxiliary verbs, transitive and intransitive verbs, and
                different tenses (present, past, future).
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Adjectives:</span> Types of
                adjectives such as descriptive, quantitative, demonstrative, and
                comparative and superlative degrees.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Adverbs:</span> Types of
                adverbs like manner, place, time, frequency, and degree, and
                their usage.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Prepositions:</span>Usage of
                prepositions of time, place, direction, agent, and instrument.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Conjunctions:</span>{" "}
                Coordinating, subordinating, and correlative conjunctions, and
                their role in connecting clauses.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Articles:</span>Use of definite
                (the) and indefinite articles (a, an).
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Punctuation:</span>Correct use
                of periods, commas, question marks, exclamation marks, quotation
                marks, apostrophes, colons, and semicolons.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Sentence Structure:</span>Types
                of sentences (declarative, interrogative, imperative,
                exclamatory) and basic sentence components (subject and
                predicate).
              </li>
              <li className="ml-14">
                <span className="font-semibold ">
                  Direct and Indirect Speech:{" "}
                </span>{" "}
                Rules for converting direct speech to indirect speech and vice
                versa.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">
                  Active and Passive Voice:{" "}
                </span>
                Converting sentences from active to passive voice and vice
                versa.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Synonyms and Antonyms: </span>{" "}
                Understanding and using words with similar and opposite
                meanings.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Idioms and Phrases:</span>{" "}
                Common idioms and phrases and their meanings.
              </li>
            </ol>
          </div>

          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 6 Hindi
          </p>
          <p className="text-center">
            The Hindi curriculum for Class 6 focuses on enhancing students'
            language skills through literature and grammar. The syllabus
            includes stories, poems, and plays that offer cultural insights and
            moral lessons. Grammar lessons cover essential aspects such as
            nouns, pronouns, verbs, adjectives, and sentence construction,
            aiming to develop a strong foundation in the language. The
            curriculum also emphasizes creative writing, comprehension, and the
            appreciation of Hindi literature
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Malhar{" "}
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Hindi/मातृभूमि.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                मातृभूमि (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Hindi/गोल.pdf")}
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>गोल
                (संस्मरण)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Hindi/पहली बूँद.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>पहली
                बूँद (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Hindi/हार की जीत.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>हार
                की जीत (कहानी)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Hindi/रहीम के दोहे.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>रहीम
                के दोहे (दोहे)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Hindi/मेरी माँ.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>मेरी
                माँ (आत्मकथा)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Hindi/जलाते चलो.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>जलाते
                चलो (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Hindi/सत्रिया और बिहू नृत्य.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                सत्रिया और बिहू नृत्य (निबंध)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Hindi/मैया मैं नहिं माखन खायो.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>मैया
                मैं नहिं माखन खायो (पद)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Hindi/परीक्षा.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>{" "}
                परीक्षा (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Hindi/चेतक की वीरता.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>चेतक
                की वीरता (कविता)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Hindi/हिंद महासागर में छोटा-सा हिंदुस्तान.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>हिंद
                महासागर में छोटा-सा हिंदुस्तान (यात्रा वृतांत)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Hindi/पेड़ की बात.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>पेड़
                की बात (निबंध)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold  ml-6 text-orange-500  ">Reading:</p>
              <li className="ml-14">
                <span className="font-semibold ">वर्णमाला (Varnamala) :</span>
                Understanding the Hindi alphabet: vowels (स्वर) and consonants
                (व्यंजन).
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">संज्ञा (Noun):</span>Types of
                nouns: Proper, Common, Collective, Abstract. Singular and plural
                forms.
              </li>

              <li className="ml-14">
                <span className="font-semibold ">सर्वनाम (Pronoun) : </span>
                Types of pronouns: Personal, Possessive, Demonstrative,
                Interrogative, Relative.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">क्रिया (Verb)</span> Types of
                verbs: Main verbs and auxiliary verbs.Conjugation in different
                tenses: Present, Past, Future.
              </li>
            </div>
            <ol className="list-disc  text-[0.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <li className="ml-14">
                <span className="font-semibold ">विशेषण (Adjective)</span> Types
                of adjectives: Descriptive, Quantitative,
                Demonstrative.Comparatives and superlatives.
              </li>

              <li className="ml-14">
                <span className="font-semibold ">क्रिया विशेषण (Adverb): </span>
                Types of adverbs: Manner, Place, Time, Frequency, Degree.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">संबंधसूचक (Preposition):</span>
                Usage of prepositions indicating time, place, direction, and
                manner.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">संयोजक (Conjunction):</span>
                Types of conjunctions: Coordinating, Subordinating, Correlative.
              </li>

              <li className="ml-14">
                <span className="font-semibold ">विलंब (Article): </span>Usage
                of articles: Definite (the) and indefinite (a, an).
              </li>
              <li className="ml-14">
                <span className="font-semibold ">
                  विस्मयादिबोधक चिन्ह (Punctuation):
                </span>
                Correct use of punctuation marks: Period, Comma, Question Mark,
                Exclamation Mark, Quotation Marks, Apostrophe, Colon, Semicolon.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">
                  वाक्य रचना (Sentence Structure):
                </span>{" "}
                Types of sentences: Declarative, Interrogative, Imperative,
                Exclamatory.Basic components: Subject and Predicate.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">अनुवाद (Translation):</span>
                Translating sentences and passages between Hindi and English.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">
                  प्रतिवाद (Direct and Indirect Speech):
                </span>
                Rules for converting direct speech to indirect speech and vice
                versa.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">
                  सक्रिय और आश्रित वाक्य (Active and Passive Voice):
                </span>
                onverting sentences from active voice to passive voice and vice
                versa.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">
                  समानार्थक और विपरीतार्थक शब्द (Synonyms and Antonyms):
                </span>
                Understanding and using words with similar and opposite
                meanings.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">
                  मुहावरे और लोकोक्तियाँ (Idioms and Phrases):
                </span>
                Common idioms and phrases and their meanings.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[60%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 6 Mathematics
          </p>
          <p className="text-center">
            Class 6 Mathematics covers fundamental concepts that are crucial for
            higher studies. The syllabus includes topics like number systems,
            whole numbers, integers, fractions, decimals, basic geometry,
            algebra, ratio and proportion, and data handling. It emphasizes
            problem-solving skills and logical reasoning. Through a variety of
            exercises and real-life examples, students learn to apply
            mathematical concepts in everyday situations, fostering analytical
            thinking and precision.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Ganita Prakash
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Mathematics/Patterns in Mathematics.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                Patterns in Mathematics
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Mathematics/Lines and Angles.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>Lines
                and Angles
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Mathematics/Number Play.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Number Play
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Mathematics/Data Handling and Presentation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>Data
                Handling and Presentation
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Mathematics/Prime Time.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Prime
                Time
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
                    "https://learnosphere.in/public_pdf/Class-6 Mathematics/Perimeter and Area.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Perimeter and Area
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Mathematics/Fractions.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Fractions
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Mathematics/Playing with Constructions.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                Playing with Constructions
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Mathematics/Symmetry.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
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
                    "https://learnosphere.in/public_pdf/Class-6 Mathematics/The Other Side of Zero.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>The
                Other Side of Zero
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[80%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 6 Science
          </p>
          <p className="text-center">
            The Science curriculum for Class 6 provides a foundational
            understanding of various scientific concepts across disciplines like
            Physics, Chemistry, Biology, and Environmental Science. Students
            explore topics such as food and nutrition, materials, living
            organisms, motion, light, and electricity. The curriculum emphasizes
            hands-on activities, experiments, and observations, encouraging a
            practical approach to learning. It aims to develop critical
            thinking, scientific temper, and a curiosity for the natural world.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} /> Curiosity{" "}
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Science/The Wonderful World of Science.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Wonderful World of Science
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Science/Diversity in the Living World.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Diversity in the Living World
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Science/Mindful Eating A Path to a Healthy Body.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Mindful Eating: A Path to a Healthy Body
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Science/Exploring Magnets.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                Exploring Magnets
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Science/Measurement of Length and Motion.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Measurement of Length and Motion
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Science/Materials Around Us.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Materials Around Us
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
                    "https://learnosphere.in/public_pdf/Class-6 Science/Temperature and its Measurement.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Temperature and its Measurement
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Science/A Journey through States of Water.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>A
                Journey through States of Water
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Science/Methods of Separation in Everyday Life.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
                Methods of Separation in Everyday Life
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Science/Living Creatures Exploring their Characteristics.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Living Creatures: Exploring their Characteristics
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Science/Nature’s Treasures.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Nature’s Treasures
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Science/Beyond Earth.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>
                Beyond Earth
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[80%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 6 Social Science{" "}
          </p>
          <p className="text-center">
            The Social Science curriculum for Class 6 encompasses History,
            Geography, and Civics. In History, students learn about ancient
            civilizations, cultural heritage, and significant historical events.
            Geography covers physical features of the Earth, resources, and
            environmental conservation. Civics introduces the basics of
            democracy, government, and citizenship. The syllabus aims to develop
            a comprehensive understanding of human society, its development, and
            the functioning of social and political institutions, encouraging
            responsible citizenship.
          </p>
          <div className="flex flex-wrap gap-8 px-7 mb-10  md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Exploring Society India and Beyond
              </p>
              <p className="font-bold text-orange-600 p-2 text-md ">Theme-A</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Sst/Locating Places on the Earth.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Locating Places on the Earth
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Sst/Oceans and Continents.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                Oceans and Continents
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Sst/Landforms and Life.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Landforms and Life
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Theme-B</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Sst/Timeline and Sources of History.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                Timeline and Sources of History
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Sst/India, That is Bharat.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                India, That is Bharat
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Sst/The Beginnings of Indian Civilisation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span> The
                Beginnings of Indian Civilisation
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Theme-C</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Sst/India’s Cultural Roots.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                India’s Cultural Roots
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
                    "https://learnosphere.in/public_pdf/Class-6 Sst/Unity in Diversity, or ‘Many in the One’.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>Unity
                in Diversity, or ‘Many in the One’
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Theme-D</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Sst/Family and Community.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
                Family and Community
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Sst/Grassroots Democracy Part 1 Governance.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Grassroots Democracy Part 1 Governance
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Sst/Grassroots Democracy Part 2 Local Government in Rural Areas.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Grassroots Democracy Part 2 Local Government in Rural Areas
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Sst/Grassroots Democracy Part 3 Local Government in Urban Areas.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>
                Grassroots Democracy Part 3 Local Government in Urban Areas
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Theme-E</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-6 Sst/The Value of Work.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>The
                Value of Work
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-6 Sst/Economic Activities Around Us.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter -14 :</span>
                Economic Activities Around Us
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
