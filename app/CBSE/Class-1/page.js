"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaBook } from "react-icons/fa6";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": " What are the main subjects in the CBSE Class 1 syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The main subjects in CBSE Class 1 are English, Hindi, Mathematics, Environmental Studies (EVS), Moral Science, Art & Craft, and Physical Education. These subjects ensure a balanced learning experience for children."
      }
    },
    {
      "@type": "Question",
      "name": " Is the CBSE Class 1 syllabus based on NCERT books?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the CBSE Class 1 syllabus is completely based on NCERT textbooks such as Marigold for English, Rimjhim for Hindi, and Math-Magic for Mathematics. These books are designed as per CBSE’s academic standards."
      }
    },
    {
      "@type": "Question",
      "name": " How can I download the CBSE syllabus for Class 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can download the latest CBSE Class 1 syllabus 2025–26 directly from Learnosphere.in, where it’s available in a simple and organized format. The platform also provides syllabi for Classes 1 to 12."
      }
    },
    {
      "@type": "Question",
      "name": "What is the importance of the CBSE Class 1 syllabus?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The syllabus lays the foundation for literacy, numeracy, and environmental awareness. It helps children develop essential life skills, creativity, and problem-solving abilities at an early age."
      }
    },
    {
      "@type": "Question",
      "name": "Does Learnosphere provide CBSE syllabus for other classes too?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Learnosphere offers the complete CBSE syllabus for Classes 1 to 12, including all subjects like Science, Mathematics, Social Science, English, Accountancy, and more — all updated according to CBSE’s official curriculum"
      }
    },
    {
      "@type": "Question",
      "name": "Are there any changes in the CBSE Class 1 syllabus for 2025–26?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As per the latest CBSE updates and NEP 2020 guidelines, the Class 1 syllabus continues to emphasize foundational learning, with an enhanced focus on activity-based education, phonics, and experiential learning."
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



export default function Firstclass() {
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
          <h1 className="p-4  text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            {" "}
            Class 1st{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-[45%]  flex flex-col gap-6 mt-8  md:text-start text-center  pt-6">
            <p className="">
              Class 1, being the first stage to the beginning of official school
              life, plays a vital role in a student’s life. The CBSE class 1
              syllabus has been formulated keeping in mind the average learning
              capacity of Class 1 students, which will evoke interest in them
              and knock their curiosity level. The CBSE board class 1 syllabus
              has been designed to provide adequate language skills and doses of
              joy.
            </p>
            <p className="">
              Central Board of Secondary Education (CBSE) is one of India’s most
              authentic and prestigious educational bodies, focusing primarily
              on the syllabus for lower classes. The CBSE std 1 syllabus is
              developed to invoke the joy and desire of learning among the kids.
              The syllabus includes the foundation subjects like- Mathematics,
              English, Hindi, Environmental Studies, General Knowledge, Arts and
              Craft, Health, and Physical Education. Class 1 is that phase in a
              student’s life during which they learn essential things about
              their surroundings and themselves and start building their
              vocabulary. CBSE std 1 syllabus has been thus curated, keeping all
              these in mind.{" "}
            </p>
            <p className="">The Class 1 CBSE syllabus is designed to make the transition
              from preschool to formal schooling smooth and exciting. It emphasizes learning through play, storytelling,
              and practical activities rather than rote memorization. The aim is to build a strong base in language, mathematics,
              environmental awareness, and moral values while keeping the child’s natural curiosity alive.
            </p>
            <p className="">The NCERT books followed in CBSE schools ensure that
              the syllabus is well-structured and aligned with the National
              Education Policy (NEP) 2020, promoting foundational literacy and numeracy.
            </p>
          </div>

          <div className=" w-full md:w-[55%]   mt-14  rounded-lg">
            <table className="w-full border-collapse border border-gray-400">
              <thead className="bg-orange-500 ">
                <tr>
                  <th className="border border-gray-300 p-2">Subject</th>
                  <th className="border border-gray-300 p-2">Description</th>
                </tr>
              </thead>
              <tbody className="">
                <tr className=" text-white">
                  <td className="border   bg-amber-600  border-gray-300 p-2 text-md text-center">
                    English
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 text-xs md:text-[1em] font-light">
                    The CBSE syllabus of class 1 English covers essential
                    communication skills, focusing on vocabulary development. It
                    includes 10 comprehensive units from book 1 (Marigold) and 9
                    chapters from supplementary book 2 (Raindrops). The focus of
                    the English curriculum is the development of refined
                    language.
                  </td>
                </tr>
                <tr className=" text-white">
                  <td className="border bg-amber-600 border-gray-300 p-2 text-md text-center">
                    Mathematics
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 text-xs md:text-[1em] font-light">
                    The CBSE syllabus of class 1 Mathematics has been generated
                    to help the students build the capability to calculate
                    quickly. It includes addition, subtraction, understanding of
                    numbers, measurement, patterns, and many more.
                  </td>
                </tr>
                <tr className=" text-white">
                  <td className="border bg-amber-600 border-gray-300 p-2 text-md text-center">
                    Hindi
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 text-xs md:text-[1em] font-light">
                    The subject Hindi includes short and sweet stories and poems
                    under the CBSE curriculum that will help the students of
                    class 1 understand one of the most important languages of
                    India.
                  </td>
                </tr>
                <tr className=" text-white">
                  <td className="border bg-amber-600 border-gray-300 p-2 text-md text-center">
                    Environmental Studies
                  </td>
                  <td className="border bg-amber-500 border-gray-300 p-2 px-5 text-xs md:text-[1em] font-light">
                    CBSE has carefully selected EVS topics for class 1 children
                    that would assist them in gaining a basic social
                    understanding of their environment. It includes 8 chapters
                    dealing with plants, human beings, family, surroundings,
                    school, etc.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* CBSE Class 1 Subjects Section */}
        <section className="mt-16 px-4 md:px-20 font-Poppins">
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-orange-500 border border-black py-4 rounded-lg shadow-xl w-full md:w-[55%] mx-auto">
            CBSE Class 1 Subjects
          </h2>

          <p className="text-center mt-6 text-gray-700 md:w-[70%] mx-auto">
            The Class 1 CBSE curriculum is designed to make learning joyful, interactive,
            and foundational. The CBSE Class 1 subjects generally include:

          </p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

            {/* English Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 text-center">📘 English</h3>
              <ol className="space-y-2 mt-4 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg ">→</span>
                  <span>Focuses on basic reading, writing, and speaking skills.</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg">→</span>
                  <span>Includes storytelling, poems, short passages, and basic grammar.</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg">→</span>
                  <span>Encourages phonics-based learning to build vocabulary and pronunciation.</span>
                </li>
              </ol>
            </div>

            {/* Hindi Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 text-center">📗 Hindi</h3>
              <ol className="space-y-2 mt-4 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg ">→</span>
                  <span>Introduces the basics of the Hindi alphabet (Varnamala), simple words, and sentence formation</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg">→</span>
                  <span>Poems, short stories, and moral lessons are included to build comprehension and cultural connection.</span>
                </li>

              </ol>
            </div>

            {/* Mathematics Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 text-center">🧮 Mathematics</h3>
              <ol className="space-y-2 mt-4 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg ">→</span>
                  <span>Covers number counting, basic addition and subtraction, shapes, patterns, measurement, and time.</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg">→</span>
                  <span>Activities and visual learning tools are used to make math fun and relatable.</span>
                </li>
              </ol>
            </div>

            {/* EVS Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 text-center">🌿 EVS / General Awareness</h3>
              <ol className="space-y-2 mt-4 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg ">→</span>
                  <span>Helps students understand their surroundings, family, school, plants, animals, and basic hygiene.</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg">→</span>
                  <span>Encourages curiosity and awareness about nature and the world around them.</span>
                </li>
              </ol>
            </div>

            {/* Moral Science Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 text-center">🌟 Moral Science</h3>
              <ol className="space-y-2 mt-4 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg ">→</span>
                  <span>Focuses on teaching kindness, honesty, discipline, respect, and empathy.</span>
                </li>

                <li className="flex items-start gap-2">
                  <span className="text-orange-600 text-lg">→</span>
                  <span>Uses stories and real-life examples to help children learn life lessons early on.</span>
                </li>
              </ol>
            </div>

            {/* Art & Craft Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
              <h3 className="text-xl font-bold text-orange-600 text-center">🎨 Art & Craft</h3>
              <p className="text-sm text-gray-700 mt-3">
                Enhances creativity and imagination through coloring, craftwork, and basic drawing.
              </p>
            </div>

            {/* Physical Education Card */}
            <div className="bg-white border border-orange-300 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <h3 className="text-xl font-bold text-orange-600 text-center">⚽ Physical Education</h3>
              <p className="text-sm text-gray-700 mt-3">
                Promotes physical activity, motor skills, and healthy habits.
              </p>
            </div>

          </div>
        </section>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg  text-center  w-full md:w-[40%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 1{" "}
          </p>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 1 English
          </p>
          <p className=" font-medium text-center">
            Class 1 English lays the foundation for young learners, focusing on
            basic reading, writing, and comprehension skills. At this stage,
            children learn to recognize and write the alphabet in both capital
            and small letters, form simple words, and construct basic sentences.
            Emphasis is placed on building vocabulary through picture reading
            and interactive activities. Students are introduced to basic grammar
            concepts such as nouns, pronouns, and verbs. Rhymes, poems, and
            storytelling sessions enhance their listening and speaking
            abilities, fostering a love for the language from an early age.
          </p>
          <ol className="font-medium text-center">
            <li>

            </li>
          </ol>
          <div className=" flex flex-col md:flex-row p-7 md:p-0 mt-5 mx-0 md:mx-40 gap-10 rounded-2xl">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Mridang English
              </p>
              <p className="font-bold text-orange-600 p-2 text-md ">
                Unit-1 : My Family And Me{" "}
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 English/Two Little Hands.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span> Two
                Little Hands{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 English/Greetings.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                Greetings
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600 p-2 text-md ">
                Unit-2 : Life Around Us
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 English/Picture Time.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>
                Picture Time
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 English/The Cap-Seller And The Monkeys.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>The
                Cap-Seller And The Monkeys
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 English/A Farm.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> A
                Farm{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className=" text-orange-600 p-2 text-md font-bold">
                Unit-3 : Food
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 English/Fun With Pictures.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>Fun
                With Pictures{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 English/The Food We Eat.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 : </span>The
                Food We Eat{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold text-orange-600  p-2 text-md ">
                Unit-4 : Seasons
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 English/The Four Season.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 : </span>The
                Four Season
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 English/Anandi's Rainbow.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2: </span>
                Anandi's Rainbow
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>

            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-orange-600  ">1. Reading Skills</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Alphabet recognition (capital and small letters)</li>
                <li>Simple words and sentences</li>
                <li>Picture reading</li>
              </ol>

              <p className="font-bold text-orange-600  ">2. Writing Skills</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Writing capital and small letters</li>
                <li>Simple words and sentences</li>
                <li>Basic punctuation</li>
              </ol>

              <p className="font-bold text-orange-600  ">3.Grammar</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Nouns, pronouns, verbs, adjectives</li>
                <li>Simple tenses (present, past)</li>
                <li>Use of 'a' and 'an'</li>
              </ol>

              <p className="font-bold text-orange-600  ">4.Comprehension</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Simple passages</li>
                <li>Answering basic questions</li>
              </ol>

              <p className="font-bold text-orange-600  ">
                5.Speaking and Listening
              </p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
                <li>Rhymes and poems</li>
                <li>Storytelling</li>
                <li>Basic conversation skills</li>
              </ol>
            </div>
          </div>
          <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[60%] md:w-[17%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
            Class 1 Mathematics
          </p>
          <p className=" font-medium text-center">
            Class 1 Mathematics lays the foundation for basic numeracy skills.
            The curriculum introduces students to number recognition, counting,
            and writing numbers from 1 to 100. Children learn basic arithmetic
            operations like addition and subtraction using single-digit numbers.
            The syllabus also includes an introduction to basic geometric shapes
            such as circles, squares, triangles, and rectangles. Simple concepts
            of measurement, like length, weight, and capacity, are taught using
            comparisons. Students also learn about time, including days of the
            week, months of the year, and reading the clock. Basic money
            concepts, such as recognizing currency and understanding simple
            transactions, are introduced to help children grasp the value and
            use of money. Through engaging activities and practical examples,
            Class 1 Maths makes learning these fundamental concepts enjoyable
            and accessible.
          </p>

          <div className=" flex flex-col md:flex-row p-7 md:p-0 mx-0 md:mx-40 mt-5 gap-10 rounded-lg">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Joyful Mathematics
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/Finding The Furry Cat.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1:</span>{" "}
                Finding The Furry Cat
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/What is Long And What is Round.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2:</span> What
                is Long? What is Round?
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/Mango Treat.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3:</span> Mango
                Treat{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/Making 10.pdf"
                  )
                }
              >
                {" "}
                <span className="font-bold text-[1em]">Chapter - 4:</span>{" "}
                Making 10
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/How Many.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5:</span> How
                Many
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/Vegetable Farm.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6:</span>{" "}
                Vegetable Farm{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/Lina's Family.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7:</span>{" "}
                Lina's Family
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/Fun With Numbers.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8:</span> Fun
                With Numbers
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/Utsav.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]"> Chapter - 9:</span>{" "}
                Utsav
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/How Do I Spend My Day.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10:</span> How
                Do I Spend My Day?
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/How Many Times.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11:</span> How
                Many Times?
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/How Much Can We Spend.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12:</span> How
                Much Can We Spend?
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-1 Mathematic/So Many Toys.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13:</span> So
                Many Toys{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-orange-600  ">1. Numbers</p>
              <ol className="list-disc px-5 flex flex-col text-[0.9em] gap-4">
                <li>Number recognition (1-100)</li>
                <li>Counting and writing numbers</li>
                <li>Number names</li>
              </ol>

              <p className="font-bold text-orange-600   ">
                2. Basic Operations
              </p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[0.9em] ">
                <li>Addition and subtraction (single-digit)</li>
                <li>Concept of zero</li>
              </ol>
              <p className="font-bold text-orange-600  ">
                3.Shapes and Patterns
              </p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[0.9em] ">
                <li>
                  Basic geometric shapes (circle, square, triangle, rectangle)
                </li>
                <li>Simple patterns</li>
              </ol>
              <p className="font-bold text-orange-600  ">4.Measurement</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[0.9em] ">
                <li>Comparison (big-small, tall-short, heavy-light)</li>
                <li>Simple measurements (length, weight, capacity)</li>
              </ol>
              <p className="font-bold text-orange-600  ">5.Time And Money</p>
              <ol className="list-disc px-5 flex flex-col gap-4 text-[0.9em] ">
                <li>Days of the week</li>
                <li>Months of the year</li>
                <li>Reading the clock (hours and minutes)</li>
                <li>Basic currency notes and coins</li>
                <li>Simple transactions</li>
              </ol>
            </div>
          </div>
        </div>

        <p className="font-bold text-md  shadow-2xl text-white bg-gradient-to-r from-orange-600 to-orange-500    w-[55%] md:w-[13%] p-4 rounded-tl-lg rounded-tr-lg   mt-8 border-b-2 border-orange-800">
          Class 1 Hindi
        </p>
        <p className=" font-medium text-center">
          Class 1 Hindi aims to develop basic language skills in young learners.
          The curriculum introduces students to the Hindi alphabet, including
          स्वर (vowels) and व्यंजन (consonants). Children learn to recognize and
          write these letters, forming simple words and sentences. Basic grammar
          concepts like nouns, pronouns, and verbs are introduced, along with
          simple present tense usage. Reading skills are developed through
          picture reading and simple passages, enhancing comprehension. Writing
          exercises help improve handwriting and spelling. Speaking and
          listening skills are nurtured through rhymes, poems, and storytelling
          sessions, making learning interactive and enjoyable. Overall, Class 1
          Hindi builds a strong foundation in the language, preparing students
          for more advanced studies.
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
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/मीना का परिवार.pdf"
                )
              }
            >
              <span className="font-bold text-[1em] ">Chapter - 1 :</span> मीना
              का परिवार
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/दादा-दादी.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
              दादा-दादी{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/रीना का दिन.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span> रीना
              का दिन{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/रानी भी.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span> रानी
              भी{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <p className="font-bold text-orange-600 p-2 text-md ">
              इकाई 2: जीव-जगत
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/मिठाई.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 : </span>मिठाई{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/तीन साथी.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 : </span>तीन
              साथी{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/वाह, मेरे घोड़े.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span> वाह,
              मेरे घोड़े!{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/खतरे में साँप.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span> खतरे
              में साँप{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <p className=" text-orange-600 p-2 text-md font-bold">
              इकाई 3: हमारा खान-पान
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/आलू की सड़क.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 : </span>आलू की
              सड़क{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/झूम-झूली.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 : </span>
              झूम-झूली{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/भुट्टे.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 : </span>भुट्टे{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/फूली रोटी.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 : </span>फूली
              रोटी{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <p className="font-bold text-orange-600  p-2 text-md ">
              इकाई 4: त्योहार और मेले
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/मेला.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 : </span>मेला{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/बरखा और मेघा.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 : </span>बरखा
              और मेघा{" "}
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
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/होली.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3: </span>होली{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/जन्मदिवस पर पेड़ लगाओ.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4: </span>{" "}
              जन्मदिवस पर पेड़ लगाओ{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <p className="font-bold text-orange-600  p-2 text-md ">
              इकाई 5:हरी-भरी दुनिया
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/हवा.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 : </span>हवा{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/कितनी प्यारी है ये दुनिया.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 : </span>कितनी
              प्यारी है ये दुनिया{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-1 Hindi/चाँद का बच्चा.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3: </span>चाँद का
              बच्चा{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <p className="font-bold text-orange-600  ">1. Reading Skills</p>
            <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
              <li>Alphabet recognition (स्वर and व्यंजन)</li>
              <li>Simple words and sentences</li>
              <li>Picture reading</li>
            </ol>
            <p className="font-bold text-orange-600  ">2. Writing Skills</p>
            <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
              <li>Writing स्वर and व्यंजन</li>
              <li>Simple words and sentences</li>
            </ol>
            <p className="font-bold text-orange-600  ">3.Grammar</p>
            <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
              <li>Nouns, pronouns, verbs</li>
              <li>Simple tenses (present)</li>
            </ol>
            <p className="font-bold text-orange-600  ">4.Comprehension</p>
            <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]">
              <li>Simple passages</li>
              <li>Answering basic questions</li>
            </ol>
            <p className="font-bold text-orange-600  ">
              5.Speaking and Listening
            </p>
            <ol className="list-disc px-5 flex flex-col gap-4 text-[.9em]"></ol>
          </div>
        </div>
      </div>
      <section className="mt-16 px-4 md:px-12 font-Poppins">

        {/* Title */}
        <h2 className="text-center text-2xl md:text-3xl font-extrabold text-orange-500 border border-black py-4 rounded-lg shadow-xl w-full md:w-[65%] mx-auto">
          🎯 Importance of the CBSE Class 1 Syllabus
        </h2>

        {/* Intro Paragraph */}
        <p className="mt-6 text-gray-700 text-center md:w-[80%] mx-auto leading-7">
          The Class 1 syllabus CBSE is not just about academics; it’s about holistic development. The curriculum focuses on:
        </p>

        {/* Points List */}
        <div className="mt-8 space-y-6 md:w-[80%] mx-auto">

          <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow-md hover:shadow-lg transition-all">
            <p className="text-gray-700 font-medium">
              <span className="font-bold text-orange-600">Foundational Literacy and Numeracy Skills –</span>
              &nbsp;Building strong basics in reading, writing, and arithmetic.
            </p>
          </div>

          <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow-md hover:shadow-lg transition-all">
            <p className="text-gray-700 font-medium">
              <span className="font-bold text-orange-600">Cognitive Development –</span>
              &nbsp;Enhancing logical thinking, observation, and problem-solving abilities.
            </p>
          </div>

          <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow-md hover:shadow-lg transition-all">
            <p className="text-gray-700 font-medium">
              <span className="font-bold text-orange-600">Social and Emotional Learning –</span>
              &nbsp;Helping children adapt to the classroom environment, share, and cooperate.
            </p>
          </div>

          <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow-md hover:shadow-lg transition-all">
            <p className="text-gray-700 font-medium">
              <span className="font-bold text-orange-600">Creative Expression –</span>
              &nbsp;Encouraging imagination through art, music, and storytelling.
            </p>
          </div>

        </div>

        {/* Paragraph */}
        <p className="mt-6 text-gray-700 text-center md:w-[80%] mx-auto leading-7">
          By following the CBSE syllabus for Class 1, parents and teachers can ensure that children are learning in a joyful,
          stress-free, and structured way.
        </p>

        {/* Learnosphere Section */}
        <h3 className="mt-16 text-xl md:text-2xl font-extrabold text-orange-600 text-center">
          Learnosphere – Your One-Stop Solution for CBSE Syllabi
        </h3>

        <p className="mt-6 text-gray-700 text-center md:w-[85%] mx-auto leading-7">
          At Learnosphere, we understand that parents and students often struggle to find authentic and updated CBSE syllabi online.
          That’s why our platform provides complete and subject-wise CBSE syllabi from Class 1 to Class 12, all in one place.
        </p>

        {/* List of items */}
        <div className="mt-8 md:w-[70%] mx-auto space-y-4 text-gray-700 text-center">
          <p>CBSE Class 1 syllabus 2025–26</p>
          <p>CBSE Class 5 Mathematics syllabus</p>
          <p>CBSE Class 10 English or Science syllabus</p>
          <p>Or even CBSE Class 12 Accountancy and Physics syllabus,</p>
        </div>

        <p className="mt-4 text-gray-700 text-center md:w-[85%] mx-auto leading-7">
          you can find everything accurately structured and easy to download on Learnosphere.
          Our goal is to make learning transparent, simplified, and easily accessible for both students and educators.
        </p>

        {/* How Learnosphere Helps */}
        <h3 className="mt-14 text-xl md:text-2xl font-extrabold text-orange-600 text-center">
          💡 How Learnosphere Helps Parents and Students
        </h3>

        <div className="mt-6 space-y-5 md:w-[80%] mx-auto">

          <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow">
            <p className="text-gray-700 font-medium">Detailed Subject-Wise Syllabus – Each syllabus is organized according to the latest CBSE guidelines.</p>
          </div>

          <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow">
            <p className="text-gray-700 font-medium">Updated Academic Resources – Includes yearly updates as per CBSE circulars and NEP policies.</p>
          </div>

          <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow">
            <p className="text-gray-700 font-medium">Free and Easy Access – No login required; you can browse and read online instantly.</p>
          </div>

          <div className="p-5 bg-white border-l-4 border-orange-500 rounded-lg shadow">
            <p className="text-gray-700 font-medium">Interactive Learning Support – Learnosphere also provides quizzes, sample papers, and NCERT-based learning materials for practice.</p>
          </div>

        </div>

        {/* Final Paragraph */}
        <p className="mt-6 text-gray-700 text-center md:w-[85%] mx-auto leading-7">
          By using Learnosphere’s CBSE syllabus for Class 1, parents can easily monitor their child’s progress, plan lessons at home,
          and ensure that the academic foundation is strong.
        </p>

        {/* Conclusion */}
        <h3 className="mt-14 text-xl md:text-2xl font-extrabold text-orange-600 text-center">
          Conclusion
        </h3>

        <p className="mt-6 text-gray-700 text-center md:w-[85%] mx-auto leading-7">
          The CBSE syllabus for Class 1 is the perfect starting point for your child’s educational journey. It builds the stepping
          stones of literacy, numeracy, creativity, and life skills in a joyful learning environment.
          <br /><br />
          With Learnosphere, you can access the latest CBSE syllabus for Classes 1 to 12, along with interactive learning tools,
          chapter-wise quizzes, and study materials — all crafted to make learning simple and effective.
        </p>

      </section>
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
