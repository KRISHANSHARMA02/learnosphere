import React from "react";
import Image from "next/image";
import { IoRemoveOutline } from "react-icons/io5";
import child_6 from "@/public/child_6.svg";
import teacher_1 from "@/public/teacher_1.svg";

const ParaCards = () => {
  return (
    <div className="bg-white py-12 md:py-20 px-4 md:px-16">
      {/* Heading Section */}
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-Poppins text-gray-800">
          Learnosphere – Personalized Home Tutoring
        </h2>
        <IoRemoveOutline size={70} className="text-orange-600" />
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1 */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-white to-orange-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] p-8 border border-gray-100">
          <Image
            src={child_6}
            alt="Learnosphere Home Tutoring"
            width={400}
            height={300}
            className="object-contain h-[220px] md:h-[260px] mb-6"
            priority
            quality={100}
          />
          <h3 className="text-xl md:text-2xl font-semibold text-orange-700 mb-4 text-center">
            The Best Platform For Students
          </h3>
          <p className="text-gray-700 text-center leading-relaxed">
            Learnosphere is designed to support students by bringing
            high-quality education directly to their homes. We believe every
            learner deserves personalized attention, and that’s why we offer
            expert home tutoring tailored to each child’s pace and style.
          </p>
          <p className="text-gray-700 text-center leading-relaxed">
            {" "}
            As the Best Platform For Students, our mission is to make learning
            simple, engaging, and result-oriented. Parents and learners call us
            the Best Learning Platform because we focus on real
            improvement—strong basics, better scores, and growing confidence.
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex flex-col justify-center items-center bg-gradient-to-b from-white to-orange-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] p-8 border border-gray-100">
          <Image
            src={teacher_1}
            alt="Expert CBSE Tutors"
            width={400}
            height={300}
            className="object-contain h-[220px] md:h-[260px] mb-6"
            priority
            quality={100}
          />
          <h3 className="text-xl md:text-2xl  font-semibold text-orange-700 mb-4 text-center">
            Expert Home Tutors for CBSE Classes
          </h3>
          <p className="text-gray-700 text-center leading-relaxed">
            Our highly qualified Home Tutors for CBSE classes understand the
            curriculum well and help students stay prepared for school exams,
            competitive goals, and future studies. We provide flexible
            scheduling, one-to-one interaction, doubt-clearing sessions, and a
            learning plan crafted for each student’s needs.
          </p>
          <p className="text-gray-700 text-center leading-relaxed">
            {" "}
            At Learnosphere, education isn’t just about marks—it’s about
            progress, curiosity, and academic success. We are here to guide
            students step-by-step, making sure they enjoy learning and achieve
            their full potential.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ParaCards;
