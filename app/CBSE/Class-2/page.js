"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What subjects are included in the CBSE syllabus for Class 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The main subjects are English, Hindi, Mathematics, Environmental Studies (General Awareness), Art and Craft, Moral Science, and Physical Education."
      }
    },
    {
      "@type": "Question",
      "name": " Is the Class 2 CBSE syllabus based on NCERT books?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Regular practice,Yes. CBSE schools follow NCERT textbooks such as Marigold for English, Rimjhim for Hindi, and Math-Magic for Mathematics."
      }
    },
    {
      "@type": "Question",
      "name": "How can I download the CBSE syllabus for Class 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can download the latest and updated syllabus for all subjects from Learnosphere.in, which provides CBSE syllabi from Class 1 to Class 12."
      }
    },
    {
      "@type": "Question",
      "name": "What topics are included in Class 2 English?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The English syllabus includes stories, poems, basic grammar rules, vocabulary building, sentence formation, and simple comprehension exercises."
      }
    },
    {
      "@type": "Question",
      "name": "Is the CBSE Class 2 Maths syllabus difficult for students?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. The Maths syllabus is designed using pictures, activities, and real-life examples to make mathematical concepts simple and engaging."
      }
    },
    {
      "@type": "Question",
      "name": "Does Learnosphere provide CBSE syllabus for all classes?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Learnosphere offers complete CBSE syllabus details for Class 1 to Class 12, including subject-wise and chapter-wise curriculum."
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


export default function Secondclass() {
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
            Class 2nd{" "}
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[45%]  flex flex-col gap-6 mt-8  md:text-start text-center  pt-6">
            <p className=" font-Poppins">
              The Central Board of Secondary Education holds the title of
              India’s most prominent national educational board and has
              successfully generated syllabi that guarantee a bright future. The
              CBSE class 2 syllabus 2024-25 has been modified, keeping in mind
              the learning capability of a 2nd grader
            </p>
            <p className=" font-Poppins">
              After Class 1, Class 2 is the second most crucial grade where
              students start using and questioning their minds. The acceleration
              happens on a second level. A prestigious educational body, CBSE
              has made sure to formulate a syllabus that brings growth,
              development, interest, fun, and joy to the second graders.{" "}
            </p>
            <p>
              CBSE Class 2nd focuses on expanding foundational knowledge and
              skills in a variety of subjects. In English, students enhance
              their reading and writing abilities through engaging stories,
              poems, and simple grammar concepts. Mathematics introduces more
              complex operations like addition, subtraction, and basic
              multiplication and division, along with concepts of shapes,
              measurement, time, and money. Environmental Studies (EVS) helps
              children understand their environment better, covering topics such
              as personal hygiene, family roles, community helpers, food, water,
              plants, animals, and safety rules. Hindi instruction continues to
              build language skills through reading, writing, and simple
              grammar. The curriculum is designed to be interactive and
              engaging, promoting curiosity and a love for learning while laying
              a strong foundation for future academic growth.
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
                    The NCERT books that are followed by every school affiliated
                    with CBSE provide the latest English syllabus for class 2,
                    sectioned under two books: Marigold and Raindrops. The two
                    textbooks consist of creative stories and poems that enthral
                    the children when learning. The books are made attractive by
                    adding beautiful pictures, and there are fun activities
                    in-between that aim to keep the students engaged with
                    learning.
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Mathematics
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    It is that subject that requires a lot of practice. CBSE,
                    being the biggest national educational board, has ensured to
                    effectively get the students to practice mathematics
                    questions through its comprehensive syllabus. The most
                    fun-loving aspect of the Mathematics syllabus provided by
                    CBSE is the NCERT book and its chapters.
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Hindi
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    The Hindi syllabus of class 2 provided by the CBSE board
                    includes 15 chapters that comprise poetry and stories that
                    are both exciting and valuable. The syllabus has been
                    designed to teach the Hindi language, but the chapters also
                    consist of moral values that help the students become more
                    aware. The motto of the CBSE board is to make learning easy
                    no matter what the subject is and CBSE has been rightfully
                    proving it as well.
                  </td>
                </tr>
                <tr>
                  <td className="border bg-amber-600  border-gray-300 p-2 text-md text-center font-Poppins">
                    Environmental Studies
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 font-Poppins font-light text-xs md:text-[1em]">
                    In Class 2 Environmental Science (EVS), kids get to study
                    about themselves as well as their environment. They learn
                    about various natural processes, animals, plants, water,
                    air, soil, etc. We provide worksheets EVS for Class 2, which
                    have proven to be very helpful for young minds to retain
                    what they learn in their schools.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <section className="mt-20 px-4 md:px-12 font-Poppins">

          {/* Title */}
          <h2 className="text-center text-2xl md:text-3xl font-bold text-orange-500 bg-white border border-black py-4 rounded-lg shadow-xl w-full md:w-[65%] mx-auto">
            Why Understanding the Class 2 Syllabus is Important
          </h2>

          {/* Intro Paragraph */}
          <p className="mt-6 text-gray-700 text-center md:w-[80%] mx-auto leading-7">
            Parents often search for the exact syllabus to understand what their child will learn throughout the academic year.
            Knowing the syllabus helps plan studies, monitor progress, and support learning at home. Teachers also follow the syllabus
            to ensure classroom lessons align with CBSE’s academic standards.
          </p>

          {/* Subheading */}
          <p className="mt-8 text-gray-700 text-center md:w-[80%] mx-auto leading-7 font-medium">
            Understanding the CBSE syllabus for Class 2 ensures:
          </p>

          {/* Beautified List */}
          <ul className="mt-8 space-y-4 md:w-[70%] mx-auto text-gray-700 text-md leading-7">

            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-2xl font-bold">•</span>
              <span>A clear roadmap for academic growth</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-2xl font-bold">•</span>
              <span>Better understanding of learning outcomes</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-2xl font-bold">•</span>
              <span>Proper support for home revision</span>
            </li>

            <li className="flex items-start gap-3">
              <span className="text-orange-500 text-2xl font-bold">•</span>
              <span>Awareness of CBSE’s latest academic framework</span>
            </li>

          </ul>

        </section>
        <section className="mt-20 px-4 md:px-12 font-Poppins">

          {/* Title */}
          <h2 className="text-center text-2xl md:text-3xl font-bold text-orange-500 bg-white border border-black py-4 rounded-lg shadow-xl w-full md:w-[70%] mx-auto">
            Subjects Included in the CBSE Class 2 Syllabus
          </h2>

          {/* Intro Paragraph */}
          <p className="mt-6 text-gray-700 text-center md:w-[80%] mx-auto leading-7">
            The CBSE Class 2 syllabus includes several subjects designed to support overall development.
            Each subject focuses on building foundational literacy, numeracy, and general awareness.
          </p>

          {/* GRID START */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

            {/* 1 — English */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-3">1. English</h3>
              <p className="text-gray-700 leading-7">
                The Class 2 English syllabus aims to strengthen reading, writing, and communication skills. It covers:
              </p>

              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li>Simple sentence formation</li>
                <li>Reading short stories and poems</li>
                <li>Basic grammar such as nouns, pronouns, verbs, and describing words</li>
                <li>Vocabulary building</li>
                <li>Picture reading and comprehension</li>
              </ul>

              <p className="mt-4 text-gray-700 leading-7 text-sm">
                The NCERT textbook Marigold Class 2 is used to enhance language fluency through stories, activities, and exercises.
              </p>
            </div>

            {/* 2 — Hindi */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-3">2. Hindi</h3>

              <p className="text-gray-700 leading-7">The Hindi syllabus for Class 2 includes:</p>

              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li>Revision of varnamala</li>
                <li>Word and sentence formation</li>
                <li>Poems and stories from Rimjhim Class 2</li>
                <li>Basic grammar concepts including sangya, kriya, ling, and vachan</li>
                <li>Vocabulary development through pictures and activities</li>
              </ul>

              <p className="mt-4 text-gray-700 leading-7 text-sm">
                The aim is to improve reading fluency and strengthen a child’s understanding of the language.
              </p>
            </div>

            {/* 3 — Mathematics */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-3">3. Mathematics</h3>

              <p className="text-gray-700 leading-7">
                The CBSE Class 2 Maths syllabus includes essential concepts such as:
              </p>

              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li>Numbers up to 1000</li>
                <li>Addition and subtraction</li>
                <li>Introduction to multiplication</li>
                <li>Time, length, weight, and money</li>
                <li>Patterns, shapes, and spatial understanding</li>
                <li>Calendar reading</li>
                <li>Basic problem-solving</li>
              </ul>

              <p className="mt-4 text-gray-700 leading-7 text-sm">
                NCERT’s Math-Magic Class 2 presents maths in a fun, visual, and practical way.
              </p>
            </div>

            {/* 4 — EVS */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-3">
                4. EVS / Environmental Studies (General Awareness)
              </h3>

              <p className="text-gray-700 leading-7">
                Although EVS does not have a separate book in Class 2, schools follow a structured general awareness curriculum that includes:
              </p>

              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li>Family and relationships</li>
                <li>Neighbourhood and community helpers</li>
                <li>Plants and animals</li>
                <li>Festivals and seasons</li>
                <li>Good habits and hygiene</li>
                <li>Safety rules</li>
                <li>Food, clothes, and shelter</li>
                <li>Understanding surroundings and nature</li>
              </ul>

              <p className="mt-4 text-gray-700 leading-7 text-sm">
                This helps children observe, understand, and connect with the world around them.
              </p>
            </div>

            {/* 5 — Moral Science */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-3">5. Moral Science / Value Education</h3>

              <p className="text-gray-700 leading-7">Value education helps build good character and basic ethics. Students learn:</p>

              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li>Good manners</li>
                <li>Sharing and caring</li>
                <li>Respect for elders</li>
                <li>Honesty and empathy</li>
                <li>Importance of discipline</li>
              </ul>
            </div>

            {/* 6 — Art & Craft */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-3">6. Art and Craft</h3>

              <p className="text-gray-700 leading-7">
                Art and craft activities focus on creativity and imagination. Children learn:
              </p>

              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li>Drawing and coloring</li>
                <li>Paper craft</li>
                <li>Patterns and shapes</li>
                <li>Picture composition</li>
                <li>Basic design concepts</li>
              </ul>
            </div>

            {/* 7 — Physical Education */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500 hover:shadow-2xl transition-all">
              <h3 className="text-xl font-bold text-orange-600 mb-3">
                7. Physical Education / Yoga / Health and Wellness
              </h3>

              <p className="text-gray-700 leading-7">This includes:</p>

              <ul className="mt-4 space-y-2 text-gray-700 text-sm">
                <li>Light exercises</li>
                <li>Basic yoga for children</li>
                <li>Simple sports activities</li>
                <li>Body movement and coordination</li>
                <li>Awareness about health and hygiene</li>
              </ul>
            </div>
          </div>
        </section>
        <div className="flex flex-col gap-5">
          <p className="font-bold border-2 border-orange-500 p-4 mt-14 rounded-lg  text-center  w-full md:w-[40%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 2{" "}
          </p>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg border-b-2 border-orange-800">
            Class 2 English
          </p>
          <p className=" font-medium text-center">
            Class 2 English focuses on building reading, writing, and
            comprehension skills. Students read simple stories and poems to
            enhance vocabulary and understanding. They practice writing
            sentences and short paragraphs with correct punctuation and
            spelling. Basic grammar concepts, including nouns, verbs, and
            adjectives, are introduced, along with simple tenses and articles.
            Activities like storytelling and recitation help improve speaking
            and listening skills, making language learning engaging and fun.
          </p>

          <div className=" flex flex-col md:flex-row p-7 md:p-0 mt-5 mx-0 md:mx-40 gap-5 rounded-2xl">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Mridang English
              </p>
              <p className="font-bold text-orange-600 p-2 text-md ">
                Unit-1 : Fun With Friends
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/My Bicycle.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> My
                Bicycle
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/Picture Reading.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                Picture Reading
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">
                Unit-2 : Welcome To My Worls
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/It Is Fun.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>It
                Is Fun
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/Seeing  Without Seeing.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>
                Seeing Without Seeing
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className=" text-orange-600 p-2 text-md font-bold">
                Unit-3 : Going Places
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/Come Back Soon.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>Come
                Back Soon
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/Between Home And School.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>
                Between Home And School
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/This Is My Town.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 : </span>This
                Is My Town
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600  p-2 text-md ">
                Unit-4 : Life Around Us
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/A Show Of Clouds.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>A
                Show Of Clouds
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/My Name.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2: </span>My
                Name
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/The Crow.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3: </span>The
                Crow
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/The Smart Monkey.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4: </span>The
                Smart Monkey
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600  p-2 text-md ">
                Unit-5 : Harmony
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/Little Drops Of Water.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>
                Little Drops Of Water
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 English/We Are All Indians.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2: </span>We
                Are All Indians
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-orange-600  ">1. Reading Skills</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Reading simple stories, passages, and poems</li>
                <li>
                  Developing vocabulary through picture reading and
                  comprehension exercises
                </li>
              </ol>

              <p className="font-bold text-orange-600  ">2. Writing Skills</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Writing sentences and short paragraphs</li>
                <li>Developing neat handwriting</li>
                <li>Introduction to cursive writing</li>
              </ol>

              <p className="font-bold text-orange-600  ">3.Grammar</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Nouns, pronouns, verbs, adjectives</li>
                <li>Simple tenses (present, past)</li>
                <li>Use of articles (a, an, the)</li>
              </ol>

              <p className="font-bold text-orange-600  ">4.Comprehension</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Reading comprehension exercises with simple questions</li>
                <li>
                  Understanding and answering questions based on short passages
                </li>
              </ol>

              <p className="font-bold text-orange-600  ">
                5.Speaking and Listening
              </p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Recitation of poems and rhymes</li>
                <li>Storytelling and role-playing</li>
                <li>Engaging in basic conversations and discussions</li>
              </ol>
            </div>
          </div>
          <p
            className="font-bold text-md text-white bg-gradient-to-r from-orange-600 to-orange-500 shadow-2xl    w-[60%] md:w-[17%]
 p-4 rounded-tl-lg rounded-tr-lg border-b-2 border-orange-800"
          >
            Class 2 Mathematics
          </p>
          <p className=" font-medium text-center">
            Class 2 Mathematics extends foundational math skills with a focus on
            more advanced addition, subtraction, multiplication, and division.
            Students learn to work with numbers up to 999, understand place
            value, and identify and describe basic geometric shapes. Concepts of
            measurement, including length, weight, and capacity, are introduced.
            Time and money concepts are taught through practical examples,
            helping students grasp the basics of reading clocks and handling
            currency.
          </p>
          <div className=" flex flex-col md:flex-row p-7 md:p-0 mt-5 mx-0 md:mx-40 gap-5 rounded-2xl">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Joyful Mathematics
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/A Day At The Beach.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> A
                Day At The Beach
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/Shapes Around Us.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Shapes Around Us{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/Fun With Numbers.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Fun
                With Numbers{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/Shadow Story(Togalu).pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Shadow Story(Togalu){" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/Playing With Lines.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Playing With Lines{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/Decoration For Festival .pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Decoration For Festival{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/Rani's Gift.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Rani's Gift{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/Grouping And Sharing .pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                Grouping And Sharing{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/Which Season Is It?.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>Which
                Season Is It?{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/Fun At The Fair.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>Fun
                At The Fair{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Mathematics/Data Handling .pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>Data
                Handling{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-orange-500  ">1. Numbers</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Reading and writing numbers up to 999</li>
                <li>Number names and numerals</li>
                <li>Place value and face value</li>
              </ol>
              <p className="font-bold text-orange-500  ">2. Basic Operations</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>
                  Addition and subtraction with carrying and borrowing
                  (two-digit and three-digit numbers)
                </li>
                <li>
                  Introduction to multiplication (single-digit multiplication)
                </li>
                <li>Basic division concepts</li>
              </ol>
              <p className="font-bold text-orange-500  ">
                3.Shapes and Patterns
              </p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>
                  Identification and properties of 2D shapes (circle, square,
                  triangle, rectangle, oval)
                </li>
                <li>
                  Introduction to 3D shapes (cube, cylinder, sphere, cone)
                </li>
                <li>Recognizing and creating patterns</li>
              </ol>
              <p className="font-bold text-orange-500  ">4.Measurement</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Length (measuring with non-standard and standard units)</li>
                <li>Weight (comparing weights using balance)</li>
                <li>
                  Capacity (using standard units like liters and milliliters)
                </li>
              </ol>
              <p className="font-bold text-orange-500  ">5.Time And Money</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Reading the clock (hours and minutes)</li>
                <li>Understanding days of the week and months of the year</li>
                <li>Simple transactions and calculations involving money</li>
              </ol>
            </div>
          </div>
          <p className="font-bold text-md text-white bg-gradient-to-r from-orange-600 to-orange-500 shadow-2xl    w-[80%] md:w-[23%] p-4 rounded-tl-lg rounded-tr-lg border-b-2 border-orange-800">
            Class 1 Environmental Studies
          </p>
          <p className=" font-medium text-center">
            Class 2 EVS explores the world around students, covering topics like
            personal hygiene, family roles, and community helpers. Children
            learn about the importance of food, water, and shelter, and gain an
            understanding of plants, animals, and transportation. Safety rules
            are also emphasized to help students stay safe at home, school, and
            in their community. The curriculum encourages curiosity and
            awareness about their environment and daily life.
          </p>
          <div className="  flex gap-5  md:flex flex-wrap p-7 md:p-0 mt-5  rounded-2xl">
            <div className="flex flex-col border  border-orange-300 p-4 shadow-2xl rounded-xl  gap-4  w-full md:w-[230px] ">
              <p className="font-bold text-orange-500  ">
                1. Myself And My Body
              </p>
              <ol className="list-disc px-3 flex flex-col gap-4">
                <li>
                  Identifying body parts and understanding their functions
                </li>
                <li>Importance of personal hygiene and health</li>
              </ol>
            </div>
            <div className="flex flex-col border border-orange-300 shadow-2xl p-4 rounded-xl    gap-4  w-full md:w-[230px]  ">
              <p className="font-bold text-orange-500  ">
                2. Family and Friends
              </p>
              <ol className="list-disc px-3 flex flex-col gap-4">
                <li>Types of families (nuclear, joint)</li>
                <li>Roles and responsibilities of family members</li>
                <li>Importance of friends</li>
              </ol>
            </div>
            <div className="flex flex-col border border-orange-300 shadow-2xl  p-4 rounded-xl  w-full md:w-[230px]   gap-4 ">
              <p className="font-bold text-orange-500  ">
                3.Neighborhood and Community
              </p>
              <ol className="list-disc px-5 flex flex-col gap-4">
                <li>
                  Important places in the neighborhood (school, market, park,
                  hospital)
                </li>
                <li>Community helpers and their roles</li>
              </ol>
            </div>
            <div className="flex flex-col border border-orange-300 shadow-2xl p-4 rounded-xl   w-full md:w-[230px]   gap-4 ">
              <p className="font-bold text-orange-500  ">4.Food</p>
              <ol className="list-disc px-5 flex flex-col gap-4">
                <li>Different types of food (healthy and unhealthy)</li>
                <li>Sources of food (plants and animals)</li>
                <li>Importance of a balanced diet</li>
              </ol>
            </div>
            <div className="flex flex-col border border-orange-300 shadow-2xl p-4 rounded-xl   w-full md:w-[230px]  gap-4 ">
              <p className="font-bold text-orange-500  ">5.Water</p>
              <ol className="list-disc px-5 flex flex-col gap-4">
                <li>Sources of water (rain, rivers, lakes)</li>
                <li>Uses of water in daily life</li>
                <li>Importance of water conservation</li>
              </ol>
            </div>
            <div className="flex flex-col border border-orange-300 shadow-2xl p-4 rounded-xl  gap-4  w-full md:w-[230px] ">
              <p className="font-bold text-orange-500  ">6.Shelter</p>
              <ol className="list-disc px-5 flex flex-col gap-4">
                <li>Types of houses</li>
                <li>Importance of keeping the house clean and tidy</li>
              </ol>
            </div>
            <div className="flex flex-col border border-orange-300 shadow-2xl p-4 rounded-xl  gap-4  w-full md:w-[230px] ">
              <p className="font-bold text-orange-500  ">
                7. Plants and Animals
              </p>
              <ol className="list-disc px-5 flex flex-col gap-4">
                <li>Different types of plants and their uses</li>
                <li>Different types of animals (domestic, wild)</li>
                <li>Importance of plants and animals in our lives</li>
              </ol>
            </div>
            <div className="flex flex-col border border-orange-300 shadow-2xl p-4 rounded-xl  gap-4  w-full md:w-[230px] ">
              <p className="font-bold text-orange-500  ">
                8.Transport and Communication
              </p>
              <ol className="list-disc px-5 flex flex-col gap-4">
                <li>Different modes of transport (land, water, air)</li>
                <li>Basic means of communication (letters, phone, email)</li>
              </ol>
            </div>
            <div className="flex flex-col border border-orange-300 shadow-2xl p-4 rounded-xl  gap-4  w-full md:w-[230px] ">
              <p className="font-bold text-orange-500  ">9.Safety Rules</p>
              <ol className="list-disc px-5 flex flex-col gap-4">
                <li>Road safety rules (zebra crossing, traffic lights)</li>
                <li>Safety at home, school, and playground</li>
              </ol>
            </div>
          </div>
          <p className="font-bold text-md text-white bg-gradient-to-r from-orange-600 to-orange-500 shadow-2xl    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg border-b-2 border-orange-800">
            Class 1 Hindi
          </p>
          <p className=" font-medium text-center">
            Class 2 Hindi focuses on developing reading and writing skills in
            the language. Students read simple stories and poems, improving
            their comprehension and vocabulary. They practice writing sentences
            and short paragraphs while learning basic grammar concepts like
            nouns, verbs, and adjectives. Activities such as recitation and
            storytelling enhance their speaking and listening skills, making
            Hindi language learning both interactive and enjoyable.
          </p>

          <div className=" flex flex-col md:flex-row p-7 md:p-0 mt-5 mx-0 md:mx-40 gap-10 rounded-2xl">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Sarangi Hindi
              </p>
              <p className="font-bold text-orange-600 p-2 text-md ">
                {" "}
                इकाई 1 : परिवार
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/नीम की दादी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> नीम
                की दादी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/घर.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span> घर
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/ माला की चाँदी की पुतली.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> माला
                की चाँदी की पुतली
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/माँ.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span> माँ
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/थथू और मैं.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>थथू
                और मैं
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/चिंता.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>चिंता
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/टिल्लू जी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                टिल्लू जी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">
                इकाई 2: रंग ही रंग
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/तीन दोस्त.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span> तीन
                दोस्त
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/दुनिया रंग-बिरंगी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>
                दुनिया रंग-बिरंगी
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/कौन.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> कौन
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/बेरहम जोजो.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                बेरहम जोजो
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/तोसिया का संदेह.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
                तोसिया का संदेह
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className=" text-orange-600 p-2 text-md font-bold">
                इकाई 3: हरी-भरी धरती
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/आलू की सड़क.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>आलू
                की सड़क
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/बीज.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>बीज
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/किसान.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 : </span>
                किसान
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/मूली.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 : </span>मूली
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/जूते और दुकानें.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 : </span>जूते
                और दुकानें
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600  p-2 text-md ">
                इकाई 4: मित्रता
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/शेर और चूहों की दोस्ती.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>शेर
                और चूहों की दोस्ती
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/बाहर.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>बाहर
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/छुप-छुपाई.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3: </span>
                छुप-छुपाई
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/हाथी साइकल चल रहा था.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4: </span> हाथी
                साइकल चल रहा था
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600  p-2 text-md ">
                इकाई 5:आकाश
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/चार दिशाएँ.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>चार
                दिशाएँ
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/चंदा माँ.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>चंदा
                माँ
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/मोती ताल में चंदा मामा.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3: </span>मोती
                ताल में चंदा मामा
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/सबसे बड़ी छटा.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4: </span>सबसे
                बड़ी छटा
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-2 Hindi/बादल.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter -5: </span>बादल
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-orange-600  ">1. Reading Skills</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em">
                <li>Reading simple stories, poems, and rhymes</li>
                <li>Picture reading to build vocabulary</li>
              </ol>

              <p className="font-bold text-orange-600  ">2. Writing Skills</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em">
                <li>Writing sentences and short paragraphs</li>
                <li>Practicing neat handwriting</li>
                <li>Introduction to cursive writing</li>
              </ol>

              <p className="font-bold text-orange-600  ">3.Grammar</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em">
                <li>
                  Nouns (संज्ञा), pronouns (सर्वनाम), verbs (क्रिया), adjectives
                  (विशेषण)
                </li>
                <li>Simple tenses (वर्तमान, भूत))</li>
                <li>Use of articles (एक, एक, यह, वह)</li>
                <li>Prepositions (में, पर, के नीचे, के पीछे, आदि)</li>
              </ol>

              <p className="font-bold text-orange-600  ">4.Comprehension</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em">
                <li>
                  Understanding and answering questions based on short passages
                </li>
              </ol>

              <p className="font-bold text-orange-600  ">
                5.Speaking and Listening
              </p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Recitation of poems and rhymes</li>
                <li>Storytelling and role-playing</li>
                <li>Basic conversation skills</li>
              </ol>
            </div>
          </div>

          <section className="mt-20 px-4 md:px-12 font-Poppins">

            {/* Title */}
            <h2 className="text-center text-2xl md:text-3xl font-semibold text-orange-500 border border-black py-4 rounded-lg shadow-xl w-full md:w-[75%] mx-auto">
              Learnosphere – Your One-Stop Solution for CBSE Syllabus from Class 1 to 12
            </h2>

            {/* Intro Paragraph */}
            <p className="mt-6 text-gray-700 text-center md:w-[80%] mx-auto leading-7">
              Parents and teachers often struggle to find accurate, updated syllabus information. Learnosphere simplifies this by offering:
            </p>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

              {/* Card 1 */}
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-orange-600 text-center">📚 Complete Syllabus</h3>
                <p className="mt-4 text-gray-700 text-sm leading-6 text-center">
                  Complete CBSE syllabus for Classes 1 to 12
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-orange-600 text-center">📑 Subject-Wise Breakdown</h3>
                <p className="mt-4 text-gray-700 text-sm leading-6 text-center">
                  Subject-wise and class-wise syllabus breakdown
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-orange-600 text-center">📘 NCERT Aligned</h3>
                <p className="mt-4 text-gray-700 text-sm leading-6 text-center">
                  Content aligned with NCERT and CBSE updates
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-orange-600 text-center">📝 Practice Material</h3>
                <p className="mt-4 text-gray-700 text-sm leading-6 text-center">
                  Additional learning support such as quizzes, sample papers, and practice materials
                </p>
              </div>

            </div>

            {/* Supporting Paragraph */}
            <p className="mt-8 text-gray-700 text-center md:w-[80%] mx-auto leading-7">
              Learnosphere ensures that you always have access to reliable and structured educational content.
            </p>

            {/* Highlights Title */}
            <h3 className="mt-16 text-center text-2xl md:text-3xl font-bold text-orange-600">
              Key Highlights of CBSE Class 2 Curriculum
            </h3>

            {/* Highlights Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

              {/* Card 1 */}
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-orange-600 text-center">🎯 Activity-Based Learning</h3>
                <p className="mt-4 text-gray-700 text-sm text-center">
                  Activity-based and experiential learning
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-orange-600 text-center">✏️ Literacy Skills</h3>
                <p className="mt-4 text-gray-700 text-sm text-center">
                  Strong emphasis on reading and writing skills
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-orange-600 text-center">➗ Step-by-Step Learning</h3>
                <p className="mt-4 text-gray-700 text-sm text-center">
                  Step-by-step mathematical learning
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-orange-600 text-center">🌏 Real-Life Awareness</h3>
                <p className="mt-4 text-gray-700 text-sm text-center">
                  Real-life understanding through general awareness
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-orange-600 text-center">🎨 Creative Expression</h3>
                <p className="mt-4 text-gray-700 text-sm text-center">
                  Creative expression through art
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-orange-600 text-center">🧘 Values & Discipline</h3>
                <p className="mt-4 text-gray-700 text-sm text-center">
                  Focus on discipline, values, and balanced learning
                </p>
              </div>

            </div>

            {/* Footer */}
            <p className="mt-10 text-gray-700 text-center md:w-[80%] mx-auto leading-7">
              The curriculum ensures a smooth transition from Class 1 to a more structured learning environment.
            </p>

          </section>
          <h3 className="mt-14 text-xl md:text-2xl font-bold text-orange-600 text-center">
            Conclusion
          </h3>

          <p className="mt-6 text-gray-700 text-center md:w-[85%] mx-auto leading-7">
            The CBSE syllabus for Class 2 helps build a strong academic foundation for young learners. With thoughtfully designed lessons in English, Hindi, Maths, EVS, and other subjects, the curriculum promotes curiosity, learning readiness, and overall development.
            <br /><br />
            With Learnosphere, you can easily access authentic CBSE syllabus details for Class 1 to Class 12, ensuring that your child’s learning path remains clear, structured, and aligned with the latest guidelines.
          </p>

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

      {/* <div className=" m-14 mx-[13rem] p-14 flex items-center rounded-sm justify-center shadow-2xl bg-gray-200">
        <Image src={lkg} width={600} className='shadow-2xl'></Image>
      </div> */}
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
