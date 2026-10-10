"use client";
import React from "react";
import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Link from "next/link";
import { HiArrowRightCircle } from "react-icons/hi2";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const CbseBoardExams2025 = () => {
  return (
    <>
      <Head>
        <title>
          CBSE Board Exams 2025–26: Updated Pattern & Preparation Tips |
          LearnOsphere
        </title>
        <meta
          name="description"
          content="Explore the latest CBSE Board Exam 2025–26 updates, new exam patterns, and smart preparation strategies using previous year papers, sample papers, and more. Learn effectively with LearnOsphere."
        />
        <meta
          name="keywords"
          content="CBSE board exam 2025, CBSE exam pattern 2025-26, CBSE Class 12 preparation, CBSE previous year question papers, CBSE sample papers, LearnOsphere, CBSE study materials, board exam tips"
        />
      </Head>

      <Navbar />

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/sampleppr12.jpg"
          alt="CBSE Board Exam Preparation 2025–26"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-3xl md:text-5xl font-extrabold mb-3"
          >
            CBSE Board Exams 2025–26
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-orange-400 text-lg md:text-2xl font-semibold"
          >
            Updated Patterns & Smart Preparation
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800 font-Poppins leading-relaxed">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-6 text-center text-orange-600"
        >
          Everything You Need to Know About CBSE 2025–26 Exam Pattern
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-5"
        >
          The Central Board of Secondary Education (CBSE) has announced{" "}
          <strong>new exam formats</strong> for the{" "}
          <strong>2025–26 board exams</strong>, focusing more on{" "}
          <strong>competency-based and objective questions</strong>. These
          changes aim to enhance students’ problem-solving skills and conceptual
          understanding.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-5"
        >
          Despite the updated structure,{" "}
          <strong>CBSE previous year papers</strong> remain one of the most
          powerful tools for effective preparation. They help you understand
          question trends, identify high-weightage topics, and improve time
          management during exams.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-5"
        >
          To prepare fully, experts recommend practicing the{" "}
          <strong>past 12 years’ question papers</strong> along with official
          sample papers and model sets that follow the 2025–26 format. This
          blended study method ensures you’re not just memorizing but learning
          smartly.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="my-8 flex justify-center  "
          style={{ height: "596px" }}
        >
          <Image
            src="https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/sampleppr12.jpg"
            alt="Students preparing for CBSE board exams"
            width={800}
            height={500}
            className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300 object-cover object-top "
          />
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-5"
        >
          Integrating <strong>CBSE previous year question papers</strong> into
          your daily or weekly study plan will give you a major advantage. These
          papers closely align with the official CBSE syllabus and help
          strengthen conceptual clarity.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-5"
        >
          Regular practice not only helps you revise effectively but also boosts
          your confidence before the exams. Whether you’re preparing for{" "}
          <strong>Class 10</strong> or <strong>Class 12</strong>, solving old
          papers consistently ensures better retention and exam readiness.
        </motion.p>

        <div className="bg-red-50 p-2 rounded-xl shadow-sm my-2">
          <div className="mt-4 text-gray-900">
            <h3 className="text-[1.1em] md:text-[1.4em] font-semibold">
              CBSE Class-12 Sample Papers For all Subjects
            </h3>
          </div>
          <div>
            <ol className="px-1 md:px-4 mt-4 list-disc">
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Accountancy"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Accountancy
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Biology"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Biology
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Business-Study"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Business Studies
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Chemistry"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Chemistry
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Economics"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Economics
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-English"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 English
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Hindi"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Hindi
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Maths"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Mathematics
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Class-12-Maths-Sample-Papers"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Mathematics 2023-24
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Physics"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Physics
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Physical-Health-Education"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Physical Health Education
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
              <Link
                href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-12-Political-Science"
                className="text-orange-600 border-b border-gray-300  p-4 font-semibold flex justify-between"
              >
                CBSE Sample Papers For Class 12 Political Science
                <HiArrowRightCircle size={27} className="text-orange-600" />
              </Link>
            </ol>
          </div>
        </div>
        <motion.h3
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-semibold mt-10 mb-4 text-orange-700"
        >
          Learn Smarter with LearnOsphere
        </motion.h3>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          At <strong>LearnOsphere</strong>, you don’t have to waste time
          searching multiple platforms. We bring together organized, updated,
          and high-quality CBSE materials — all in one place. Access curated{" "}
          <strong>previous year papers, mock tests, and sample papers</strong>{" "}
          that follow the latest CBSE guidelines.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-4"
        >
          Empower your <strong>CBSE 2025–26 preparation</strong> today with
          LearnOsphere — where <em>learning meets excellence</em>.
        </motion.p>
      </div>

      <Footer1 />
      <Footer />
    </>
  );
};

export default CbseBoardExams2025;
