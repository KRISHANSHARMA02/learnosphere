"use client";
import DownloadFormModal from "@/components/DownloadFormModal";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";

import { FaBook } from "react-icons/fa";

import { ImBook } from "react-icons/im";
import { MdDownload } from "react-icons/md";

export default function ThirdClassSyllabus() {
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
            Class 3rd{" "}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[45%]  flex flex-col gap-6 mt-8  md:text-start text-center  pt-6">
            <p className=" font-Poppins">
              The Central Board of Secondary Education (CBSE) provides a
              well-rounded and comprehensive curriculum for third-grade
              students. The curriculum is designed to foster the overall
              development of students through a variety of subjects and
              activities
            </p>
            <p>
              The Central Board of Secondary Education (CBSE) provides a
              balanced and comprehensive curriculum for third-grade students.
              This curriculum includes essential subjects such as English,
              Hindi, Mathematics, Science, Social Science, and Environmental
              Studies. It emphasizes interactive and activity-based learning
              methods, aiming to develop reading, writing, and arithmetic
              skills. The curriculum also incorporates arts, crafts, and
              physical education to ensure the holistic development of students,
              fostering creativity, physical fitness, and moral values. Overall,
              CBSE's third-grade curriculum is designed to nurture well-rounded
              individuals prepared for future academic and life challenges.
            </p>

            <p>
              The CBSE third-grade curriculum is designed to ensure the holistic
              development of students. It focuses not only on academic
              excellence but also on the development of social, emotional, and
              physical skills. The aim is to nurture well-rounded individuals
              who are prepared for future academic challenges and life
              experiences.
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
                    The English syllabus focuses on reading comprehension, basic
                    grammar, and writing skills. Students engage with simple
                    stories and poems, practice forming sentences and
                    paragraphs, and learn fundamental grammar concepts such as
                    nouns, verbs, and adjectives. The curriculum also emphasizes
                    speaking and listening skills through conversations and
                    listening to stories.
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Mathematics
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    The Math syllabus covers number concepts, addition,
                    subtraction, multiplication, and division. Students learn
                    about basic geometric shapes, measurement of length, weight,
                    and volume, and are introduced to simple data handling
                    techniques such as interpreting graphs
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Hindi
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    In Hindi, students read stories and poems to build
                    comprehension and language skills. They learn basic grammar,
                    including nouns, pronouns, and verbs, and practice writing
                    simple sentences and paragraphs. The curriculum includes
                    understanding and describing pictures and engaging in
                    dialogues
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Environmental Studies
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    The EVS curriculum introduces students to their
                    surroundings, including different types of houses, community
                    helpers, and basic plant and animal life. It covers human
                    body basics, health and hygiene, and the importance of
                    various modes of transport and communication
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    General Knowledge
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    The General Knowledge syllabus for Class 3 includes current
                    affairs, awareness of famous personalities, and cultural
                    knowledge. It aims to enhance students' understanding of the
                    world around them and develop their problem-solving and
                    social skills.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg  text-center  w-full md:w-[40%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 3{" "}
          </p>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 3 English
          </p>
          <p className="text-center">
            The English syllabus for Class 3 focuses on enhancing reading and
            comprehension skills through stories and poems. It includes basic
            grammar lessons such as nouns, verbs, and adjectives, and encourages
            creative writing through sentence and paragraph formation. Students
            also practice speaking and listening skills through simple dialogues
            and instructions.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Santoor English
              </p>
              <p className="font-bold text-orange-600 p-2 text-md ">
                Unit-1 : Fun With Friends
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/Colours.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Colours
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/Badal and Moti.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                Badal and Moti
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/Best Friends.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> Best
                Friends
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">
                Unit-2 : Toys and Games
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/Out in the Garden.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span> Out
                in the Garden
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/Talking Toys.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>
                Talking Toys
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/Paper Boats.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3: </span>Paper
                Boats
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className=" text-orange-600 p-2 text-md font-bold">
                Unit-3 : Good Food
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/The Big Laddoo.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>The
                Big Laddoo
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/Thank God.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>{" "}
                Thank God
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/Madhu’s Wish.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 : </span>
                Madhu’s Wish
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600  p-2 text-md ">
                Unit-4 : The Sky
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/Night.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>{" "}
                Night
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 English/Chanda Mama Counts the Stars.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2: </span>{" "}
                Chanda Mama Counts the Stars
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 English/Chandrayaan.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3: </span>{" "}
                Chandrayaan
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
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
              <p className="font-bold  ml-6 text-orange-500  ">
                Speaking and Listening:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Dialogue Practice: </span>
                Engaging in simple conversations.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Listening Comprehension:</span>{" "}
                Following instructions and understanding spoken narratives.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Writing:</p>
              <li className="ml-14">
                <span className="font-semibold ">Sentence Formation: </span>
                Constructing sentences with proper grammar and punctuation.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Paragraph Writing:</span>{" "}
                Writing short, coherent paragraphs on familiar topics.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Picture Composition:</span>{" "}
                Creating stories or descriptions based on visual prompts.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Grammar:</p>
              <li className="ml-14">
                <span className="font-semibold ">Nouns and Pronouns: </span>
                Identifying and using different types of nouns and pronouns.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Verbs and Adjectives:</span>{" "}
                Understanding and applying verbs and adjectives in sentences.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Articles:</span> Proper usage
                of 'a', 'an', and 'the'
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Tenses:</span>Basic present,
                past, and future tense structures.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">
                  Prepositions and Conjunctions:
                </span>{" "}
                Usage in context.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 3 Hindi
          </p>
          <p className="text-center">
            Class 3 Hindi curriculum emphasizes reading and understanding simple
            texts and poems. It covers basic grammar topics like nouns,
            pronouns, and verbs, and encourages students to write short
            paragraphs and sentences. Speaking and listening exercises are
            integrated to improve conversational skills and comprehension
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Sarangi Hindi
              </p>
              <p className="font-bold text-orange-600 p-2 text-md ">
                {" "}
                इकाई 1 : हमारा पर्यावरण
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/सीखो.pdf")}
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> सीखो
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/चींटी.pdf")}
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                चींटी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/कितने पैर.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                कितने पैर?
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Hindi/बया हमारी चिड़िया रानी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span> बया
                हमारी चिड़िया रानी!
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/आम का पेड़.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>आम का
                पेड़
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-orange-600 p-2 text-md ">
                इकाई 2: हमारे मित्र
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/बीरबल की खिचड़ी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>{" "}
                बीरबल की खिचड़ी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/मित्र को पत्र.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>
                मित्र को पत्र
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/चतुर गीदड़.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> चतुर
                गीदड़
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Hindi/प्रकृति पर्व – फूलदेई.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                प्रकृति पर्व – फूलदेई
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className=" text-orange-600 p-2 text-md font-bold">
                इकाई 3: आओ खेलें
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/रस्साकशी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>
                रस्साकशी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/एक जादुई पिटारा.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span> एक
                जादुई पिटारा
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600  p-2 text-md ">
                इकाई 4: अपना-अपना काम
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/अपना-अपना काम.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>
                अपना-अपना काम
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Hindi/पेड़ों की अम्मा ‘थिमक्का’.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>
                पेड़ों की अम्मा ‘थिमक्का’
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/किसान की होशियारी.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3: </span>किसान
                की होशियारी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-orange-600  p-2 text-md ">
                इकाई 5:हमारा देश
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() => handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/भारत.pdf")}
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>भारत
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/चंद्रयान.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>
                चंद्रयान (संवाद)
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/बोलने वाली माँद.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3: </span>बोलने
                वाली माँद
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Hindi/हम अनेक किंतु एक.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4: </span>हम
                अनेक किंतु एक
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold  ml-6 text-orange-500  ">Reading:</p>
              <li className="ml-14">
                <span className="font-semibold ">Comprehension:</span>Stories,
                poems, and simple texts.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Literature:</span> Familiar
                stories and rhymes.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">
                Speaking and Listening:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Conversations : </span>Engaging
                in simple dialogues.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Listening:</span> Following and
                understanding spoken instructions and stories.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Writing:</p>
              <li className="ml-14">
                <span className="font-semibold ">Sentence Construction: </span>
                Formulating basic sentences.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Paragraph Writing:</span>{" "}
                Writing short paragraphs on known topics.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Picture Descriptions:</span>{" "}
                Writing based on images.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Grammar:</p>
              <li className="ml-14">
                <span className="font-semibold ">Nouns and Pronouns: </span>{" "}
                Basic understanding and use.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Verbs and Adjectives:</span>{" "}
                Introduction and application.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Articles:</span> Basic usage in
                sentences.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Tenses:</span> Present, past,
                and future tenses.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">
                  Prepositions and Conjunctions:
                </span>{" "}
                Basic understanding.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[60%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 3 Mathematics
          </p>
          <p className="text-center">
            The Mathematics syllabus for Class 3 includes number concepts, basic
            arithmetic operations (addition, subtraction, multiplication, and
            division), and an introduction to geometry with shapes and patterns.
            Measurement of length, weight, and volume, as well as basic data
            handling with graphs and charts, are also covered
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Maths Mela
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Mathematics/What's In A Name.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                What's In A Name
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Mathematics/Toy Joy.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>Toy
                Joy{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Mathematics/Double Century.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Double Century{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Mathematics/Vacation With My Nani Maa.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Vacation With My Nani Maa{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Mathematics/Fun With Shapes.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Fun
                With Shapes{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Mathematics/House Of Hundreds-1.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>House
                Of Hundreds-1{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Mathematics/Raksha Bandhan.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Raksha Bandhan
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Mathematics/Fair Share.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>Fair
                Share{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Mathematics/House Of Hundreds-2.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>House
                Of Hundreds-2{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Mathematics/Fun At Class Party.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>Fun
                At Class Party{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Mathematics/Filling And Lifting.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Filling And Lifting{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Mathematics/Give And Take.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>Give
                And Take{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-3 Mathematics/Time Goes On.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>Time
                Goes On
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-3 Mathematics/The SurajKund Fair.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>The
                SurajKund Fair
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
                <span className="font-semibold ">Counting:</span> Numbers up to
                1000.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Place Value:</span>{" "}
                Understanding ones, tens, hundreds.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Operations:</p>
              <li className="ml-14">
                <span className="font-semibold ">
                  Addition and Subtraction:{" "}
                </span>
                Up to three-digit numbers.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">
                  Multiplication and Division:
                </span>{" "}
                Basic facts and simple problems.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Geometry:</p>
              <li className="ml-14">
                <span className="font-semibold ">Shapes: </span> Identifying and
                drawing basic shapes (circle, square, triangle, rectangle).
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Patterns:</span> Recognizing
                and creating patterns.
              </li>

              <p className="font-bold  ml-6 text-orange-500  ">
                Measurement and Data Handling:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Length: </span> Measuring using
                standard units.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Weight:</span> Understanding
                weight measurements.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Volume:</span> Basic concepts
                of volume and capacity.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Graphs:</span>Reading and
                interpreting simple bar graphs and pictograms.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[80%] md:w-[23%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 3 Environmental Studies
          </p>
          <p className="text-center">
            Class 3 EVS focuses on understanding the environment, including
            topics like types of houses, community helpers, plant and animal
            life, and basic human anatomy. It also covers health and hygiene,
            transport, and communication, aiming to build awareness about the
            world and personal well-being.
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20">
            <ol className="list-decimal text-[.9em]  flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
                <ImBook className="text-orange-600" />
                Looking Around
              </p>
              <p className="font-bold   ml-6 text-orange-500  ">
                Chapter Names
              </p>
              <li className="ml-14">Poonam’s Day Out</li>
              <li className="ml-14">The Plant Fairy</li>
              <li className="ml-14">Water O’ Water!</li>
              <li className="ml-14">Our First School</li>
              <li className="ml-14">Chhotu’s House</li>
              <li className="ml-14">Foods We Eat</li>
              <li className="ml-14">Saying Without Speaking</li>
              <li className="ml-14">Flying High</li>
              <li className="ml-14">It’s Raining</li>
              <li className="ml-14">What is Cooking</li>
              <li className="ml-14">From Here to There</li>
              <li className="ml-14">Work We Do</li>
              <li className="ml-14">Sharing Our Feelings</li>
              <li className="ml-14">The Story of Food</li>
              <li className="ml-14">Making Pots</li>
              <li className="ml-14">Games We Play</li>
              <li className="ml-14">Here Comes a Letter</li>
              <li className="ml-14">A House Like This</li>
              <li className="ml-14">Our Friends - Animals</li>
              <li className="ml-14">Drop by Drop</li>
              <li className="ml-14">Families can be Different</li>
              <li className="ml-14">Left-Right</li>
              <li className="ml-14">A Beautiful Cloth</li>
              <li className="ml-14">Web of Life</li>
            </ol>
            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold  ml-6 text-orange-500  ">
                Our Environment:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Types of Homes:</span>{" "}
                Understanding different types of homes and their features.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Community Helpers:</span>
                Learning about various roles in the community.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">
                Plants and Animals:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Plant Life: </span>Parts of
                plants and their functions.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Animals:</span> Types of
                animals and their habitats.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">
                Human Body and General Awareness:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Basic Anatomy: </span>Knowledge
                of body parts and their functions.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Health and Hygiene:</span>
                Importance of cleanliness and personal hygiene.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Seasons and Weather:</span>
                Understanding different seasons and weather patterns.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">
                Transport and Communication:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Modes of Transport: </span>
                Various means of transportation.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Communication:</span> Basic
                modes of communication.
              </li>
            </ol>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500   w-[80%] md:w-[30%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 3 General Knowledge and Life Skills
          </p>
          <p className="text-center">
            The General Knowledge syllabus for Class 3 includes current affairs,
            awareness of famous personalities, and cultural knowledge. It aims
            to enhance students' understanding of the world around them and
            develop their problem-solving and social skills.
          </p>
          <div className="flex flex-wrap gap-8 px-7 mb-10  md:px-20">
            <ol className="list-decimal text-[.9em]   flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800text-center ">
                <ImBook className="text-orange-600" />
                General Knowledge{" "}
              </p>
              <p className="font-bold   ml-6 text-orange-500  ">
                Chapter Names
              </p>
              <li className="ml-14">My India</li>
              <li className="ml-14">The World Around Us</li>
              <li className="ml-14">Sports and Games</li>
              <li className="ml-14">Our Environment</li>
              <li className="ml-14">Science and Technology</li>
              <li className="ml-14">Plants and Animals</li>
              <li className="ml-14">Great Personalities</li>
              <li className="ml-14">Books and Authors</li>
              <li className="ml-14">Art and Culture</li>
              <li className="ml-14">Famous Places</li>
            </ol>
            <ol className="list-disc flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold  ml-6 text-orange-500  ">
                General Knowledge:
              </p>
              <li className="ml-14">
                <span className="font-semibold ">Current Affairs:</span> Basic
                awareness of events and notable personalities
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">Cultural Awareness:</span>
                Introduction to important cultural figures and events.
              </li>
              <p className="font-bold  ml-6 text-orange-500  ">Life Skills:</p>
              <li className="ml-14">
                <span className="font-semibold ">Problem Solving: </span>
                Activities that promote problem-solving skills.
              </li>
              <li className="ml-14">
                <span className="font-semibold ">Social Skills:</span> Basic
                manners, etiquette, and interpersonal skills.
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
