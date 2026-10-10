"use client";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GrNotes } from "react-icons/gr";
import { CgNotes } from "react-icons/cg";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaNoteSticky } from "react-icons/fa6";
import Image from "next/image";
import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";
import FormSection from "@/components/FormGeneral";



const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: " Why is online maths tuition helpful for CBSE students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: " Online maths tuition helps students learn concepts clearly, ask doubts instantly, and score better with flexible, expert-led guidance.",
      },
    },
    {
      "@type": "Question",
      name: "How can I improve my marks in CBSE Math?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Regular practice, concept clarity, solving NCERT + sample papers, and expert guidance help boost maths marks effectively.",
      },
    },
    {
      "@type": "Question",
      name: "Is CBSE Math tough for Class 10 students?",
      acceptedAnswer: {
        "@type": "Answer",
        text: " Math becomes easy with proper understanding, step-by-step solutions, formula revision, and continuous practice.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I find free CBSE Maths study materials?",
      acceptedAnswer: {
        "@type": "Answer",
        text: " You can access NCERT solutions, sample papers, formulas, and worksheets for free on Learnosphere’s Maths section.",
      },
    },
    {
      "@type": "Question",
      name: "Do you provide one-to-one Maths tuition online?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, Learnosphere offers personalized one-to-one online maths tuition for CBSE students with flexible timings.",
      },
    },
    {
      "@type": "Question",
      name: " Are sample papers important for CBSE Maths exam?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, sample papers help students understand exam patterns, improve problem-solving speed, and score higher in exams.",
      },
    },
  ],
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

const Maths = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Trigger the redirect when the Enter key is pressed
    if (e.key === "Enter" && searchQuery) {
      // Redirect to ContentFound with the search query as a URL parameter
      window.location.href = `/SearchResult?query=${searchQuery}`;
    }
  };


  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 10000000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
  }, []);
  return (
    <div>
      <Navbar />
      <head>
        <title> Complete Mathematics Guide for CBSE & ICSE – Formulas, Concepts & Easy Explanations</title>
        <meta
          name="description"
          content="Get answers to common questions about Learnosphere's tutoring, home tuition, and more."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
        <link rel="canonical" href="https://learnosphere.in/Maths" />
      </head>

      <div className="flex flex-col md:flex-row gap-4 mt-24 px-4 md:px-8 xl:px-20 relative">
        <div className=" font-Poppins w-full md:w-[75%]">
          <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4"></div>

          <div>
            <h1 className="text-2xl md:text-4xl font-bold ">
              Complete Mathematics Guide for CBSE & ICSE – Formulas, Concepts & Easy Explanations
            </h1>
          </div>
          <div className="flex flex-col gap-4 text-gray-950 mt-4 ">
            <p>
              {" "}
              We recognize that mathematics is not just a subject—it’s a
              powerful tool that builds logical reasoning, problem-solving
              skills, and analytical thinking. Our dedicated Maths page is
              designed to be the ultimate resource for students and educators
              who focus on CBSE Maths, offering a comprehensive suite of content
              that makes learning and teaching maths engaging and effective.
            </p>
            <p>
              At Learnosphere, our Maths page is your ultimate destination for
              mastering CBSE Maths and excelling in online CBSE Maths Tuition
              math tutoring. Our content is meticulously designed to cover every
              aspect of the CBSE Maths syllabus—from Algebra and Geometry to
              Calculus and Statistics—ensuring students have access to
              comprehensive study material that’s aligned with today’s
              educational standards. With an emphasis on keywords like "online
              math tutoring", "CBSE maths study material", and "interactive math
              lessons", our platform serves as a one-stop resource for both exam
              preparation and conceptual clarity.
            </p>
            <p>
              Our dynamic learning environment features interactive video
              tutorials, detailed lesson plans, and practice questions that
              cater to diverse learning styles. Whether you’re searching for
              "math exam preparation" resources, "free math resources online",
              or targeted "math practice questions", our regularly updated
              content is designed to boost understanding and build confidence.
              In addition to self-paced learning modules, we offer live webinars
              and doubt-clearing sessions that provide personalized guidance,
              ensuring that every student is well-equipped to tackle board exams
              and competitive tests.
            </p>
            <p>
              By integrating state-of-the-art digital tools with expert-curated
              content, Learnosphere not only enhances academic performance but
              also ignites a passion for learning. Join our community and
              experience how our innovative approach to online math tutoring
              transforms challenging subjects into engaging learning adventures,
              preparing you for success in every mathematical endeavor.
            </p>
          </div>
          <div>
            <h2 className="font-semibold text-[1.1em] md:text-[1.4em] mt-5">
              Why Explore the World of Mathematics?
            </h2>
          </div>
          <div className="mt-2">
            <ol className="text-orange-600 flex flex-col gap-2 list-decimal px-8">
              <li>
                {" "}
                Mathematics sharpens logical thinking and analytical abilities.
              </li>
              <li>
                {" "}
                It helps in making reasoned decisions and understanding complex
                concepts.
              </li>
              <li>
                From budgeting to measurements, math is essential in daily
                activities.
              </li>
              <li>
                Fields like engineering, physics, and AI rely on mathematical
                principles.
              </li>
              <li>
                Strong math skills open doors to high-paying careers in finance,
                data science, and research.
              </li>
              <li>
                Engaging with math enhances memory, concentration, and mental
                agility.
              </li>
            </ol>
          </div>
          {/* <div className="bg-gray-50 p-2">
            <div className="mt-4 text-gray-900">
              <h3 className="text-[1.1em] md:text-[1.4em] font-semibold">

              </h3>
            </div>

          </div> */}

          <div>
            <h3 className="text-[1.4em] font-semibold mt-4 p-2">
              CBSE & ICSE Sample Papers and Maths Formulas
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-[.7em] md:text-[1em] mt-4">
            <Link
              href="/CBSE-Sample-Papers"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-purple-400 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <GrNotes size={25} />
              CBSE Sample Papers
            </Link>
            <Link
              href="/icse-sample-papers"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <CgNotes size={25} />
              ICSE Sample Papers
            </Link>
            <Link
              href="/MathsFormula"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-blue-500 to-red-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <IoNewspaperSharp size={25} />
              Maths Formula
            </Link>
            <Link
              href="/Mathematicstopic"
              className="flex flex-col justify-between items-center bg-gradient-to-r from-cyan-500 to-purple-400 text-white p-4 gap-4 font-bold rounded-lg text-center"
            >
              <FaNoteSticky size={25} />
              Mathematics Topics
            </Link>
          </div>
          <section className="bg-gradient-to-b from-white to-orange-50 py-16 px-6 md:px-12 lg:px-24">
            <div className="max-w-6xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
              >
                Mathematics Made Simple with Learnosphere
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12"
              >
                Mathematics becomes simpler when students get the right guidance
                at the right time. At{" "}
                <span className="font-semibold text-orange-600">
                  Learnosphere
                </span>
                , we bring expert learning directly to students through
                well-structured study materials, chapter-wise resources, and
                personalised support. Whether it’s{" "}
                <strong>online maths tuition for CBSE syllabus</strong> or
                complete{" "}
                <strong>CBSE math tuition for board exam preparation</strong>,
                our platform ensures every learner understands concepts clearly
                and solves problems confidently.
              </motion.p>
            </div>

            {/* Cute image section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-wrap justify-center gap-6 mb-16"
            >
              <Image
                src="https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/mathsimg1.png"
                alt="student learning"
                height={500}
                width={500}
                className="w-32 h-32 object-contain"
              />
              <Image
                src="https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/mathsimg2.png"
                alt="math concept"
                  height={500}
                width={500}
                className="w-32 h-32 object-contain"
              />
              <Image
                src="https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/mathsimg3.png"
                alt="online study"
                  height={500}
                width={500}
                className="w-32 h-32 object-contain"
              />
            </motion.div>

            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto"
            >
              <h3 className="text-2xl font-semibold text-orange-700 mb-4">
                🔹 Learn with Proven & Engaging Methods
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Every student learns differently — that’s why we focus on
                building conceptual understanding first and then move towards
                detailed practice. Step-by-step solutions, visual explanations,
                and exam-oriented approaches help students overcome fear of
                mathematics and improve their accuracy.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-orange-100 shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto"
            >
              <h3 className="text-2xl font-semibold text-orange-800 mb-4">
                🔹 Complete Support for CBSE & ICSE Mathematics
              </h3>
              <ul className="text-gray-800 list-disc list-inside space-y-2">
                <li>
                  Textbook solutions (NCERT, RS Aggarwal, RD Sharma, and more)
                </li>
                <li>CBSE and ICSE Sample Papers</li>
                <li>Topic-wise important questions</li>
                <li>Maths formula lists & revision notes</li>
                <li>Practice worksheets and MCQs</li>
                <li>Board exam preparation guidance</li>
              </ul>
              <p className="text-gray-700 mt-3">
                Our platform is continuously updated as per the latest exam
                patterns and syllabus released by the boards.
              </p>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-white shadow-lg rounded-2xl p-8 mb-12 max-w-5xl mx-auto"
            >
              <h3 className="text-2xl font-semibold text-orange-700 mb-4">
                🔹 Designed for Better Scores & Concept Clarity
              </h3>
              <ul className="text-gray-800 list-disc list-inside space-y-2">
                <li>Strengthen basics and tackle higher-level questions</li>
                <li>Develop logical and analytical thinking</li>
                <li>Improve speed and problem-solving skills</li>
                <li>Track progress and fix weak areas</li>
              </ul>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-orange-50 shadow-lg rounded-2xl p-8 max-w-5xl mx-auto"
            >
              <h3 className="text-2xl font-semibold text-orange-800 mb-4">
                🔹 Personalised Online Maths Tuition for CBSE Students
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                For learners needing extra support, Learnosphere also provides
                one-to-one online maths tuition. Our experienced tutors explain
                concepts in the simplest way and give personal attention —
                helping students score higher in school tests and board exams.
              </p>
              <p className="text-orange-600 font-medium text-center text-lg">
                We make mathematics easier, accessible, and more exciting for
                every student!
              </p>
              <div className="flex justify-center mt-6">
                <Image
                  src="https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/mathsimg4.png"
                  alt="happy student"
                    height={500}
                width={500}
                  className="w-40 h-40 object-contain"
                />
              </div>
            </motion.div>

            <div className="mt-4 flex flex-col gap-4">
              <p>
                At Learnosphere, we’re committed to transforming the way you
                experience mathematics. Explore our extensive library of
                lessons, interactive modules, and expert-curated content to
                unlock your full potential in CBSE Maths. Start your journey to
                mathematical excellence today and discover how learning can be
                both engaging and effective.
              </p>
            </div>
          </section>
        </div>
        <div className="flex flex-col gap-5 w-full md:w-[25%] font-Poppins">
          <div className="w-full bg-white p-8 ">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Type To Search"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400"
            />
          </div>
          <div className=" ">
       <FormSection />
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
      <Sociallinks2 />
      <Footer1 />
      <Footer />
    </div>
  );
};

export default Maths;
