"use client";

import React  from "react";
import { useRouter, useSearchParams } from "next/navigation"; // ✅ Next.js ke liye router use kiya
import Image from "next/image";
import Picture from "@/public/rewind-svgrepo-com (1).svg";

const Page = () => {

  const router = useRouter();

  // ✅ URL se subject aur level fetch kiya
  const searchParams = useSearchParams(); // ✅ Use Next.js hook for query params
  // ✅ Fetch parameters safely
  const selectedSubject = searchParams.get("selectedSubject") || "Default Subject";
  const selectedLevel = searchParams.get("level") || "Default Level";

  const handleShowContent = () => {
    router.push(
      `/Userdashboard/chaptertest/Subjectwise_content?selectedSubject=${selectedSubject}`
    );
  }


  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="font-poppins">
      <div onClick={handleGoBack} className="absolute top-28 cursor-pointer">
        <Image
          height={80}
          width={80}
          src={Picture}
          alt="Back Picture"
          className="relative h-10 w-10"
        />
      </div>
      <div>
        <h1 className="font-extrabold text-[1.3em] md:text-[1.7em] text-center w-full mt-4">
          Instructions for Students
        </h1>
        <p className="font-semibold mt-4 text-[.9em] sm:text-[1em] text-center">
          Welcome to the Learn
          <b className="font-bold text-orange-600">O</b>sphere! Here, you will
          find all the necessary guidelines to help you navigate and utilize the
          study material efficiently. Whether you are looking for compact study
          notes, question-answer formats, or chapter-wise content based on the
          CBSE syllabus, this guide will help you make the most of your learning
          experience.
        </p>

        <h2 className="text-[1em] sm:text-[1.2em] font-bold text-orange-600 p-4 mt-6">
          1. Compact-Wise Content:
        </h2>
        <ul className="flex flex-col text-[.8em] sm:text-[1em] gap-4 px-14 list-disc text-gray-900 font-semibold">
          <li>
            The study materials are structured in a compact manner, making it
            easy to grasp key concepts quickly.
          </li>
          <li>
            Information is concise yet covers all important points needed for
            exams.
          </li>
        </ul>

        <h2 className="text-[1em] sm:text-[1.2em] font-bold text-orange-600 p-4 mt-6">
          2. Question and Answer Format:
        </h2>
        <ul className="flex flex-col text-[.8em] sm:text-[1em] gap-4 px-14 list-disc text-gray-900 font-semibold">
          <li>
            Each chapter contains a set of important questions along with
            detailed answers.
          </li>
          <li>
            These Q&A sections help in quick revision and understanding of key
            topics.
          </li>
        </ul>

        <h2 className="text-[1em] sm:text-[1.2em] font-bold text-orange-600 p-4 mt-6">
          3. Chapter-Wise Content (CBSE Curriculum):
        </h2>
        <ul className="flex flex-col text-[.8em] sm:text-[1em] gap-4 px-14 list-disc text-gray-900 font-semibold">
          <li>
            Study material is divided chapter-wise as per the CBSE syllabus.
          </li>
          <li>
            Every chapter includes explanations, key points, and solved examples
            to enhance understanding.
          </li>
        </ul>

        <h2 className="text-[1em] sm:text-[1.2em] font-bold text-orange-600 p-4 mt-6">
          4. Topic-Wise Explanation:
        </h2>
        <ul className="flex flex-col text-[.8em] sm:text-[1em] gap-4 px-14 list-disc text-gray-900 font-semibold">
          <li>
            The content is categorized based on specific topics within each
            chapter.
          </li>
          <li>
            Each topic is explained in detail with examples to ensure better
            understanding.
          </li>
          <li>
            This approach helps in focused learning and makes it easier to
            revise particular topics.
          </li>
        </ul>
      </div>

      {/* ✅ Button to Fetch Books */}
      <div
        className="bg-orange-500 text-white text-center flex justify-center items-center mt-8 hover:bg-orange-600 transition-all ease-in-out scale-105 p-3 rounded-xl w-80 m-auto font-bold cursor-pointer"
        onClick={handleShowContent}
      >
        Get Your Content
      </div>

      {/* ✅ Books List Display */}
    </div>
  );
};

export default Page;
