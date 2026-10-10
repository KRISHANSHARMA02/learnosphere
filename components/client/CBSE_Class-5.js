"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function Fivethclass() {
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
            Class 5th{" "}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[45%]  flex flex-col gap-6 mt-8  md:text-start text-center  pt-6">
            <p className=" font-Poppins">
              CBSE (Central Board of Secondary Education) Class 5 is an
              essential stage in a student's academic journey, focusing on
              building foundational knowledge and skills.
            </p>
            <p>
              The CBSE Class 5 curriculum provides a comprehensive educational
              experience across various subjects. English focuses on enhancing
              language skills through diverse texts, including stories, poems,
              and essays, with an emphasis on grammar, vocabulary, and
              comprehension. Hindi aims to build proficiency through engaging
              literary forms, fostering creative writing and grammatical
              accuracy. Mathematics covers fundamental concepts like arithmetic
              operations, geometry, and data handling, promoting problem-solving
              and logical thinking. Environmental Studies (EVS) integrates
              science and social studies, teaching students about ecosystems,
              natural resources, and environmental conservation. General
              Knowledge (GK) broadens students' awareness of current affairs,
              geography, history, and cultural topics, aiming to develop a
              well-rounded understanding of the world.
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
                    Reading comprehension through stories and poems, exploration
                    of different literary genres, grammar and vocabulary
                    enhancement, and creative writing activities including
                    letters and compositions, aiming to develop interpretive
                    skills and encourage creativity.
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Mathematics
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    Understanding numbers, operations, and place value, basic
                    geometry concepts, measurements including length, weight,
                    capacity, time, and money, introduction to data handling,
                    and developing logical reasoning and problem-solving skills
                    through engaging activities.
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Hindi
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    Reading comprehension of stories, poems, and essays,
                    introduction to various literary forms, reinforcement of
                    basic grammar concepts and vocabulary building, and creative
                    writing exercises to develop interpretive skills and
                    expressiveness.
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Environmental Studies
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    Understanding natural and human-made environments, study of
                    plants, animals, and their habitats, basic human body
                    knowledge and personal hygiene, introduction to community
                    helpers, transport, communication, and basic earth and solar
                    system concepts.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg  text-center  w-full md:w-[40%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 5{" "}
          </p>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 5 English
          </p>
          <p className="text-center">
            {" "}
            English in Class 5 focuses on improving reading, writing, grammar,
            and comprehension skills. Students engage with diverse texts,
            including stories, poems, and essays, to enhance their vocabulary
            and understanding. Activities include reading comprehension,
            creative writing, and interactive language exercises to build
            effective communication skills.
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
                    "https://learnosphere.in/public_pdf/Class-5 English/Ice-Cream Man And Wonderful Waste.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                Ice-Cream Man
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 English/Ice-Cream Man And Wonderful Waste.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                Wonderful Waste!{" "}
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
                    "https://learnosphere.in/public_pdf/Class-5 English/Teamwork And Flying Together.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Teamwork
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 English/Teamwork And Flying Together.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Flying Together{" "}
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
                    "https://learnosphere.in/public_pdf/Class-5 English/My Shadow And Robinson Crusoe.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span> My
                Shadow
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 English/My Shadow And Robinson Crusoe.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Robinson Crusoe{" "}
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
                    "https://learnosphere.in/public_pdf/Class-5 English/Crying And My Elder Brother.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
                Crying
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 English/Crying And My Elder Brother.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span> My
                Elder Brother
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-5</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 English/Rip Van Winkle.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>Rip
                Van Winkle
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
                    "https://learnosphere.in/public_pdf/Class-5 English/Class Discussion And The Talkative Barber.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Class Discussion
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 English/Class Discussion And The Talkative Barber.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>The
                Talkative Barber{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">Unit-7</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 English/Topsy-Turvy Land And Gulliver’s Travels.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>
                Topsy-Turvy Land
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 English/Topsy-Turvy Land And Gulliver’s Travels.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>{" "}
                Gulliver’s Travels{" "}
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
                    "https://learnosphere.in/public_pdf/Class-5 English/Nobody’s Friend AndThe Little Bully.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>{" "}
                Nobody’s Friend
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 English/Nobody’s Friend AndThe Little Bully.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span> The
                Little Bully{" "}
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
                    "https://learnosphere.in/public_pdf/Class-5 English/Sing A Song of People.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 16 :</span>Sing
                A Song of People
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-orange-600 p-2 text-md ">Unit-10</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 English/Mallu Bhalu And Who Will be Ningthou.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 17 :</span>
                Mallu Bhalu
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 English/Mallu Bhalu And Who Will be Ningthou.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 18 :</span>Who
                Will be Ningthou?{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold  ml-6 text-orange-500  ">Reading:</p>
              <li className="ml-14">
                <span className="font-semibold ">Comprehension:</span>Emphasis
                on understanding and analyzing passages, stories, and poems.
                Students answer questions to enhance comprehension and critical
                thinking skills
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Literature:</span>Exposure to
                different literary genres such as fables, fairy tales, and short
                stories to build literary appreciation.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Grammar:</p>
              <li className="ml-14">
                <span className="font-semibold ">Nouns: </span>Types of nouns,
                including proper, common, and collective nouns.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Pronouns:</span> Different
                types of pronouns and their usage.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Verbs:</span> Understanding
                different forms of verbs and their usage in sentences.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Adjectives: </span> Usage of
                descriptive words to modify nouns.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Adverbs:</span>Words that
                modify verbs, adjectives, or other adverbs.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Prepositions: </span> Words
                that indicate relationships between other words in sentences.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Conjunctions:</span> Words that
                connect clauses and sentences.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Sentence Formation:</span>{" "}
                Construction of various types of sentences.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Punctuation: </span> Usage of
                punctuation marks such as commas, periods, and exclamation
                points.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Composition:</p>
              <li className="ml-14">
                <span className="font-semibold ">Paragraph Writing: </span>{" "}
                Creating structured and coherent paragraphs.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Letter Writing:</span> Writing
                formal and informal letters.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Essay Writing: </span>{" "}
                Developing essays on diverse topics to enhance writing skills.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 5 Hindi
          </p>
          <p className="text-center">
            {" "}
            The Hindi curriculum for Class 5 aims to develop language
            proficiency through engaging stories, poems, and dialogues. It
            emphasizes vocabulary building, sentence formation, and
            comprehension. Students learn to write creatively and grammatically
            correct, and understand cultural context through various literary
            forms, enhancing their linguistic and cognitive abilities.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Rimjhim{" "}
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/राख की रस्सी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>राख
                की रस्सी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/फसलें का त्योहार.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>फसलें
                का त्योहार
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/खिलौनेवाला.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                खिलौनेवाला
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/नन्हा फनकार.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>नन्हा
                फनकार
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/जहाँ चाह वहाँ राह.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>जहाँ
                चाह वहाँ राह
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/चिटठी का सफर.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
                चिटठी का सफर
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Hindi/डाकिए की कहानी ,कंवरसिंह की जुबानी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>डाकिए
                की कहानी ,कंवरसिंह की जुबानी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Hindi/वे दिन भी क्या दिन थे.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>वे
                दिन भी क्या दिन थे
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/एक माँ की बेबसी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>एक
                माँ की बेबसी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/एक दिन की बादशाहत.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span> एक
                दिन की बादशाहत
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/चावल की रोटियां.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>चावल
                की रोटियां
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/गुरु और चेला.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>गुरु
                और चेला
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/स्वामी की दादी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>
                स्वामी की दादी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/बाघ आया उस रात.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>बाघ
                आया उस रात
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/बिशन की दिलेरी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span>बिशन
                की दिलेरी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/पानी रे पानी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 16 :</span>{" "}
                पानी रे पानी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/छोटी-सी हमारी नदी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 17 :</span>
                छोटी-सी हमारी नदी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Hindi/चुनौती हिमालय की.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 18 :</span>
                चुनौती हिमालय की
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold  ml-6 text-orange-500  ">Reading:</p>
              <li className="ml-14">
                <span className="font-semibold ">Comprehension:</span> Focus on
                understanding and interpreting passages, stories, and poems.
                Students practice answering questions based on the text to
                develop analytical skills.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Literature:</span> Exposure to
                various literary forms including fables, folktales, and short
                stories. This helps in appreciating different writing styles and
                themes.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Grammar:</p>
              <li className="ml-14">
                <span className="font-semibold ">Nouns: </span> Study of
                different types of nouns, including singular and plural forms.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Pronouns:</span>Usage of
                pronouns and their different types.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Verbs:</span>Understanding
                action words and their usage in sentences
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Adjectives:</span> Describing
                nouns with appropriate adjectives.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Adverbs: </span> Modifying
                verbs with adverbs and understanding their usage.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Prepositions: </span> Words
                that show relationships between other words in a sentence.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Conjunctions: </span>{" "}
                Connecting words and clauses to form complex sentences.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Sentence Formation: </span>{" "}
                Structuring sentences including affirmative, negative, and
                interrogative sentences.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Punctuation: </span> Proper use
                of punctuation marks such as full stops, commas, and question
                marks.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Composition:</p>
              <li className="ml-14">
                <span className="font-semibold ">Paragraph Writing:</span>
                Writing coherent paragraphs on given topics.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Letter Writing:</span>Crafting
                formal and informal letters.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Essay Writing:</span> Composing
                essays on a variety of topics.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[60%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 5 Mathematics
          </p>
          <p className="text-center">
            Class 5 Mathematics covers fundamental concepts such as basic
            arithmetic operations, geometry, measurement, and data handling.
            Students explore patterns, problem-solving techniques, and
            mathematical reasoning. The curriculum aims to build a strong
            foundation in numbers, shapes, and logical thinking, preparing
            students for more advanced mathematical concepts.
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
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Mathematics/The Fish Tale.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Fish Tale{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/Shapes And Angles.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Shapes And Angles{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/How Many Squares.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> How
                Many Squares?{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/Parts And Wholes.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>Parts
                And Wholes{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/Does it Look The Same.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Does
                it Look The Same?{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/Be My Multiple, I’ll Be Your Factor.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span> Be
                My Multiple, I’ll Be Your Factor{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/Can You See The Pattern.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span> Can
                You See The Pattern?{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/Mapping Your Way.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
                Mapping Your Way
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/Boxes And Sketches.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>{" "}
                Boxes And Sketches{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/Tenths And Hundredths.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Tenths And Hundredths{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/Area and Its Boundary.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>Area
                and Its Boundary{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Mathematics/Smart Charts.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>
                Smart Charts{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/Ways To Multiply And Divide.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>Ways
                To Multiply And Divide{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Mathematics/How Big And How Heavy.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span> How
                Big? How Heavy?{" "}
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
                <span className="font-semibold ">Place Value:</span>{" "}
                Understanding the place value of digits in large numbers.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">
                  Comparing and Ordering Numbers:
                </span>{" "}
                Comparing and arranging numbers in ascending or descending
                order.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Operations:</span> Basic
                arithmetic operations including addition, subtraction,
                multiplication, and division.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Geometry:</p>
              <li className="ml-14">
                <span className="font-semibold ">Shapes: </span> Identifying and
                describing 2D and 3D shapes.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Symmetry:</span> Understanding
                symmetry and identifying lines of symmetry.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Patterns:</span>Recognizing and
                creating patterns using shapes and numbers.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Measurement:</p>
              <li className="ml-14">
                <span className="font-semibold ">Length: </span> Measuring and
                comparing lengths using units like centimeters and meters.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Weight:</span> Measuring weight
                using grams and kilograms.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Volume:</span> Understanding
                volume and measuring liquids and solids.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Time:</span> Reading clocks,
                understanding time intervals, and using calendars.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">
                Data Handling:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">
                  Pictographs and Bar Graphs:{" "}
                </span>{" "}
                Interpreting and creating pictographs and bar graphs.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[80%] md:w-[23%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 5 Environmental Studies
          </p>
          <p className="text-center">
            The EVS curriculum in Class 5 integrates basic science and social
            studies concepts. Students learn about their environment, natural
            resources, and the importance of conservation. Topics include
            ecosystems, weather, community life, and human impact on nature,
            fostering awareness and responsibility towards environmental
            preservation and social development.
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
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Super Senses.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>Super
                Senses{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Evs/A Snake Charmer’s Story.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span> A
                Snake Charmer’s Story{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Evs/From Tasting To Digesting.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> From
                Tasting To Digesting{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Mangoes Round The Year.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Mangoes Round The Year{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Seeds And Seeds.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Seeds
                And Seeds{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Every Drop Counts.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>Every
                Drop Counts
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Experiments With Water.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Experiments With Water{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/A Treat For Mosquitoes.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>A
                Treat For Mosquitoes{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Up You Go.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>Up
                You Go!
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Walls Tell Stories.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Walls Tell Stories{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Sunita In Space.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>{" "}
                Sunita In Space{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/What If It Finishes.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>What
                If It Finishes?{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/A Shelter So High.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span> A
                Shelter So High!{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/When The Earth Shook.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>{" "}
                When The Earth Shook!{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Blow Hot, Blow Cold.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span>Blow
                Hot, Blow Cold{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Who Will Do This Work.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 16 :</span>Who
                Will Do This Work?{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Across The Wall.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 17 :</span>{" "}
                Across The Wall{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/No Place For Us.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 18 :</span> No
                Place For Us?
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Evs/A Seed Tells A Farmers Story.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 19 :</span>A
                Seed Tells A Farmers Story{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/Whose Forests.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter -20 :</span>Whose
                Forests?{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-5 Evs/Like Father, Like Daughter.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 21 :</span>Like
                Father, Like Daughter{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-5 Evs/On The Move Again.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 22 :</span>On
                The Move Again{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold  ml-6 text-orange-500  ">
                Nature and Environment:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Plants: </span>Study of
                different parts of plants, their functions, and types.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Animals:</span> Understanding
                different types of animals, their habitats, and their needs.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Ecosystems:</span> Basics of
                ecosystems and the interdependence of living organisms.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Conservation:</p>
              <li className="ml-14">
                <span className="font-semibold ">Natural Resources: </span>{" "}
                Types of natural resources and methods for their conservation.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Pollution: </span>{" "}
                Understanding pollution, its causes, effects, and prevention
                strategies.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">
                Human Activities:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Impact on Environment: </span>{" "}
                Exploring how human activities affect the environment and ways
                to mitigate negative impacts.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Sustainable Practices:</span>{" "}
                Learning about sustainable practices and their importance in
                environmental conservation.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">
                Weather and Climate:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Weather Conditions: </span>{" "}
                Understanding different weather conditions and their
                characteristics.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Water Cycle: </span>Learning
                about the water cycle, including evaporation, condensation, and
                precipitation.
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
