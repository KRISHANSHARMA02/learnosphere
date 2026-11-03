"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function FourthClass() {
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
            Class 4th{" "}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[45%]  flex flex-col gap-6 mt-8  md:text-start text-center  pt-6">
            <p className=" font-Poppins">
              CBSE (Central Board of Secondary Education) Class 4 is an
              essential stage in a student's academic journey, focusing on
              building foundational knowledge and skills.
            </p>
            <p>
              CBSE Class 4 includes a range of subjects designed to build
              foundational knowledge. Mathematics covers basic arithmetic,
              geometry, and introductory measurement concepts. Science
              introduces students to the basics of plants, animals, the human
              body, and simple machines. English focuses on enhancing reading,
              writing, grammar, and comprehension skills. Hindi aims to improve
              vocabulary, grammar, and writing abilities through various prose
              and poetry. Social Studies includes topics on community helpers,
              festivals, and early history to give students a basic
              understanding of society. Environmental Studies (EVS) integrates
              basic science and social studies to help students understand their
              surroundings and the importance of environmental conservation.
              This well-rounded curriculum aims at the holistic development of
              young learners
            </p>
            <p>
              The CBSE Class 4 curriculum also includes co-curricular
              activities, sports, and arts to ensure holistic development.
              Emphasis is placed on interactive learning, with activities and
              projects designed to make education enjoyable and meaningful for
              young learners
            </p>
          </div>

          <div className="w-full md:w-[55%]   mt-14  rounded-lg">
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-orange-500 ">
                <tr>
                  <th className="border border-gray-300 p-2 font-Poppins">
                    Subject
                  </th>
                  <th className="border border-gray-300 p-2 font-Poppins">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className=" text-white">
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2  font-Poppins text-md text-center">
                    English
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    {" "}
                    Class 4 English develops reading and comprehension through
                    stories, poems, and literary forms like fables and fairy
                    tales. Grammar basics include parts of speech and sentence
                    structure, while vocabulary is expanded with new words and
                    their meanings to enhance language skills.
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Mathematics
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    {" "}
                    Class 4 Mathematics includes arithmetic operations
                    (addition, subtraction, multiplication, division), basic
                    geometry (shapes and symmetry), measurement (length, weight,
                    volume, time), and data handling (charts and graphs). These
                    topics build a foundation in problem-solving and analytical
                    skills.
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Hindi
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    Class 4 Hindi focuses on reading diverse texts, including
                    stories and poems, and writing essays and letters. Grammar
                    covers essential elements such as nouns, verbs, and sentence
                    formation. Vocabulary development includes learning new
                    words and their usage in sentences.
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Environmental Studies
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    {" "}
                    Class 4 EVS explores plants, animals, human body systems,
                    and natural resources like water and soil. It emphasizes
                    environmental conservation and community roles, along with
                    understanding local festivals and cultural practices to
                    foster environmental awareness.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg  text-center  w-full md:w-[40%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 4{" "}
          </p>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 4 English
          </p>
          <p className="text-center">
            {" "}
            In Class 4, English focuses on developing reading and comprehension
            skills through engaging stories, poems, and passages suited for
            their age. Students are introduced to various literary forms such as
            fables, fairy tales, and simple poetry. Grammar instruction includes
            fundamental concepts like parts of speech (nouns, verbs,
            adjectives), basic sentence structure, and punctuation. Vocabulary
            is expanded by learning new words, their meanings, and using them in
            context to enhance language skills.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Marigold English
              </p>
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-1</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Wake Up And Neha Alarm Clock.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>Wake
                Up{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Wake Up And Neha Alarm Clock.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>Neha
                Alarm Clock{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-2</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Noses And The Little Fir Tree.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Noses{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Noses And The Little Fir Tree.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>The
                Little Fir Tree{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-3</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Run And Nasruddin’s Aim.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Run{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Run And Nasruddin’s Aim.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Nasruddin’s Aim{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-4</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Why And Alice In Wonderland.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>Why{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Why And Alice In Wonderland.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
                Alice In Wonderland
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
                    "https://learnosphere.in/public_pdf/Class-4 English/Don’t Be Afraid Of The Dark And Helen Keller.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>Don’t
                Be Afraid Of The Dark{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Don’t Be Afraid Of The Dark And Helen Keller.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Helen Keller{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-6</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Hiawatha and Chapter And The Scholars Mother Tongue.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Hiawatha and Chapter{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Hiawatha and Chapter And The Scholars Mother Tongue.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter -12 :</span>The
                Scholars Mother Tongue{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-7</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/A Watering Rhyme The Giving Tree.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>A
                Watering Rhyme{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/A Watering Rhyme The Giving Tree.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>The
                Giving Tree{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-8</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Books And Going To Buy A Book.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span>{" "}
                Books{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/Books And Going To Buy A Book.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 16 :</span>
                Going To Buy A Book{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-9</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/The Naughty Boy And Pinocchio.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 17 :</span>The
                Naughty Boy{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 English/The Naughty Boy And Pinocchio.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 18 :</span>
                Pinocchio{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold  ml-6 text-orange-500  ">Reading:</p>
              <li className="ml-14">
                <span className="font-semibold ">Comprehension:</span> Stories
                and poems designed to improve understanding and interpretive
                skills.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Literature:</span> Introduction
                to various literary forms, including fables, fairy tales, and
                poems.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Grammar:</p>
              <li className="ml-14">
                <span className="font-semibold ">Parts of Speech: </span>
                Fundamentals of nouns, verbs, adjectives, and adverbs.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Sentence Structure:</span>{" "}
                Basics of sentence formation, punctuation, and tenses.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Vocabulary:</p>
              <li className="ml-14">
                <span className="font-semibold ">Word Meanings: </span> Learning
                new words and their meanings.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Synonyms and Antonyms:</span>{" "}
                Expanding vocabulary through similar and opposite words.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 4 Hindi
          </p>
          <p className="text-center">
            {" "}
            For Class 4, Hindi aims to improve reading skills with diverse texts
            including stories, folk tales, and poems. Writing practice involves
            creating essays, letters, and simple creative pieces, emphasizing
            clarity and structure. Grammar lessons cover essential elements such
            as nouns, pronouns, verbs, and sentence formation. Vocabulary
            development includes understanding new words, their meanings, and
            effective usage in both written and spoken Hindi.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Rimjhim
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Hindi/मन के भोले -भाले बादल.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> मन
                के भोले -भाले बादल
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/जैसा सवाल वैसा जवाब.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span> जैसा
                सवाल वैसा जवाब
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/किरमिच की गेंद.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                किरमिच की गेंद
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/पापा जब बच्चे थे.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>पापा
                जब बच्चे थे
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/दोस्त की पोशाक.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>दोस्त
                की पोशाक
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/नाव बनाओ नाव बनाओ.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>नाव
                बनाओ नाव बनाओ
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/दान का हिसाब.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>दान
                का हिसाब
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/कौन.pdf")}
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span> कौन
                ?
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/स्वतंत्रता की ओर.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>{" "}
                स्वतंत्रता की ओर
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/थप्प रोटी थप्प दाल.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>थप्प
                रोटी थप्प दाल
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/पढ़क्कू की सूझ.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>{" "}
                पढ़क्कू की सूझ
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Hindi/सुनीता की पहिया कुर्सी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>
                सुनीता की पहिया कुर्सी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/हुदहुद.pdf")}
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>{" "}
                हुदहुद
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Hindi/मुफ्त ही मुफ्त.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>
                मुफ्त ही मुफ्त (गुजराती लोककथा)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold  ml-6 text-orange-500  ">Reading:</p>
              <li className="ml-14">
                <span className="font-semibold ">Comprehension:</span>Stories
                and passages to enhance reading and understanding abilities.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Literature:</span> Exposure to
                folk tales, poems, and simple literary texts in Hindi.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Grammar:</p>
              <li className="ml-14">
                <span className="font-semibold ">Parts of Speech: </span>Study
                of nouns, pronouns, verbs, and their uses.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Sentence Structure:</span>{" "}
                Basics of sentence formation and punctuation.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Vocabulary:</p>
              <li className="ml-14">
                <span className="font-semibold ">New Words: </span>Study of
                nouns, pronouns, verbs, and their uses.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Usage:</span> Basics of
                sentence formation and punctuation.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[60%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 4 Mathematics
          </p>
          <p className="text-center">
            {" "}
            In Class 4 Mathematics, students learn fundamental arithmetic
            operations such as addition, subtraction, multiplication, and
            division. Geometry is introduced through basic shapes, their
            properties, and concepts of symmetry. Measurement topics include
            units of length, weight, volume, and time, with practical
            application of these concepts. Data handling involves simple methods
            for collecting, organizing, and representing data using charts and
            graphs to develop analytical skills.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Math Magic
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Mathematics/Building With Bricks.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Building With Bricks
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Mathematics/Long And Short.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>Long
                And Short{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Mathematics/A Trip To Bhopal.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>A
                Trip To Bhopal{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Mathematics/Tick-Tick-Tick.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Tick-Tick-Tick{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Mathematics/The Way The World Looks.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>The
                Way The World Looks
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Mathematics/The Junk Seller.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>The
                Junk Seller
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Mathematics/Jugs And Mugs.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>Jugs
                And Mugs
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Mathematics/Carts And Wheels.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>Carts
                And Wheels{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Mathematics/Halves And Quarters.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>{" "}
                Halves And Quarters{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Mathematics/Play With Patterns.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>Play
                With Patterns{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Mathematics/Tables And Shares.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Tables And Shares{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Mathematics/How Heavy And How Light.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span> How
                Heavy ? How Light ?{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Mathematics/Fields And Fences.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>{" "}
                Fields And Fences
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Mathematics/Smart Chartsr.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>
                Smart Chartsr
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold  ml-6 text-orange-500  ">
                Number Concepts:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Operations:</span>Addition,
                subtraction, multiplication, and division.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Patterns:</span> Understanding
                ones, tens, hundreds.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Geometry:</p>
              <li className="ml-14">
                <span className="font-semibold ">Shapes: </span> Understanding
                properties of basic shapes like circles, squares, and triangles.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Symmetry:</span> Exploring
                symmetrical shapes and patterns.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Measurement:</p>
              <li className="ml-14">
                <span className="font-semibold ">Units: </span> Learning units
                of length, weight, volume, and time.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Practical Measurement:</span>{" "}
                Using measurement tools and solving related problems.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">
                Data Handling:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Charts and Graphs: </span>{" "}
                Representing and interpreting data using bar graphs and
                pictograms.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[80%] md:w-[23%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 4 Environmental Studies
          </p>
          <p className="text-center">
            {" "}
            For Class 4, EVS provides an understanding of the natural world by
            studying various plants and animals, their characteristics, and
            their habitats. The curriculum includes basic human body systems,
            focusing on health, hygiene, and well-being. Students learn about
            natural resources like water, air, and soil, and the importance of
            conserving these resources. The subject also covers community roles,
            environmental conservation practices, and cultural aspects such as
            local festivals and traditions.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Looking Around
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Going To School.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>Going
                To School{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Ear To Ear.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span> Ear
                To Ear{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/A Day With Nandu.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>A Day
                With Nandu{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/The Story of Amrita.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span> The
                Story of Amrita{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Evs/Anita  And The Honeybees.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Anita
                And The Honeybees{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Omana’s Journey.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Omana’s Journey{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/From The Window.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>From
                The Window{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Evs/Reaching Grand Mother’s House.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
                Reaching Grand Mother’s House
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Changing Families.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>{" "}
                Changing Families
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Hu Tu Tu Hu Tu Tu.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span> Hu
                Tu Tu Hu Tu Tu{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Valley Of Flowers.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Valley Of Flowers{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Changing Times.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>{" "}
                Changing Times{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/A River’s Tale.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>A
                River’s Tale{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Basva’s Farm.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>
                Basva’s Farm{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/From Market To Home.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span>{" "}
                From Market To Home{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/A Busy Month.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 16 :</span>A
                Busy Month{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Nandita In Mumbai.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 17 :</span>
                Nandita In Mumbai{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-4 Evs/Too Much Water Too Little Water.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 18 :</span> Too
                Much Water Too Little Water{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Abdul In The Garden.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 19 :</span>
                Abdul In The Garden{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Eating Together.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 20 :</span>{" "}
                Eating Together{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Food And Fun.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 21 :</span>Food
                And Fun{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/The World In My Home.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 22 :</span>The
                World In My Home{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Pochampalli.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 23 :</span>
                Pochampalli{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Home And Abroad.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 24 :</span>Home
                And Abroad{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Spicy Riddles.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 25 :</span>
                Spicy Riddles{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Defence Officer Wahida.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 26 :</span>
                Defence Officer: Wahida{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-4 Evs/Chuskit Goes To School.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 27 :</span>{" "}
                Chuskit Goes To School{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold  ml-6 text-orange-500  ">
                Plants and Animals:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Classification: </span> Types
                of plants and animals, their characteristics, and habitats.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Adaptations:</span>{" "}
                Understanding how different species adapt to their environments.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Human Body:</p>
              <li className="ml-14">
                <span className="font-semibold ">Systems: </span> Basic overview
                of body systems like digestive and respiratory.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Health:</span> Importance of
                hygiene and maintaining a healthy lifestyle.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">
                Natural Resources:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Types: </span> Water, air, and
                soil, and their significance.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Conservation::</span>Methods to
                conserve natural resources and protect the environment.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">
                Community and Environment:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Roles: </span>Functions of
                community helpers and their impact.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Festivals:</span>Learning about
                major festivals and their cultural significance.
              </li>
            </ol>
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
