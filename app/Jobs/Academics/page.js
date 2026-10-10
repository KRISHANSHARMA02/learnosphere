import Navbar from "@/components/Navbar";
import Link from "next/link";
import React from "react";

const Academics = () => {
  return (
    <div>
      <Navbar />
      <div className=" px-2 md:px-20 flex justify-between  mt-28 ">
        <h2 className="text-[.9em] md:text-[1.1em] text-gray-900 w-full border-b-2 h-16 border-orange-600  ">
          <span className=" text-[1em] md:text-[1.3em] font-bold text-black">
            Job Category :
          </span>{" "}
          Academics
        </h2>
      </div>
      <div className="px-2 md:px-20 flex flex-col gap-6  mt-4">
        <p>
          At Learnosphere, we believe in nurturing talent and providing
          opportunities for academic professionals to excel in their careers.
          Our platform is designed for those passionate about education,
          research, and the development of future leaders. With a focus on
          innovation and continuous learning, we offer a wide range of roles
          that allow educators and academic professionals to thrive in a dynamic
          and collaborative environment. At Learnosphere, you'll have the chance
          to work alongside experts in various fields, exchange ideas, and
          contribute to the ever-evolving landscape of education
        </p>
        <p>
          Whether you're looking to enhance your teaching skills, dive deeper
          into research, or take on leadership roles, Learnosphere provides the
          tools, resources, and support needed to achieve your career goals. We
          value creativity, dedication, and the desire to make a lasting impact
          on students' lives and the academic community. Our inclusive culture
          celebrates achievements and fosters personal and professional growth,
          ensuring that every team member feels empowered to contribute their
          best work.
        </p>
        <p>
          In addition to offering competitive benefits, Learnosphere prioritizes
          work-life balance with flexible office hours, a supportive work
          environment, and opportunities for career advancement. We are
          committed to helping you grow both as an individual and as a
          professional, providing mentorship and continuous learning
          opportunities along the way. Join us at Learnosphere and be part of a
          team that’s dedicated to shaping the future of education, while also
          advancing your own career in a meaningful and impactful way
        </p>
      </div>

      <div className="flex flex-col mt-8 px-2 md:px-20">
        <p className="font-bold text-[1.1em]">Roles And Responsbilities</p>
        <ol className="flex flex-col gap-3 list-disc text-[.9em] mt-4 ">
          <li>
            Conduct engaging lessons for students from Class 1 to 12, ensuring
            concepts are explained clearly and effectively.
          </li>
          <li>
            Design and implement lesson plans aligned with curriculum standards
            to meet the diverse learning needs of students.
          </li>
          <li>
            Monitor student progress through assessments, providing feedback,
            and identifying areas for improvement.
          </li>
          <li>
            Collaborate with fellow faculty members to develop teaching
            strategies and improve classroom outcomes.
          </li>
          <li>
            Foster a positive learning environment that encourages student
            participation, curiosity, and critical thinking.
          </li>
        </ol>
      </div>
      <div className="flex flex-col mt-8 px-2 md:px-20">
        <h2 className="font-bold text-[1.1em]">Qualification And Experience</h2>
        <ol className="flex flex-col gap-3 list-disc text-[.9em] mt-4 ">
          <li>
            Educational Qualification: Bachelor’s or Master’s degree in
            Education or relevant subject areas (Class 1-12 curriculum).
          </li>
          <li>
            Experience: Minimum 1-3 years of teaching experience, preferably in
            a classroom or tutoring environment.
          </li>
          <li>
            Strong subject knowledge across Class 1-12 levels, with the ability
            to simplify complex concepts.
          </li>
          <li>
            Excellent communication skills and a passion for teaching and
            mentoring students.
          </li>
          <li>
            Experience with digital teaching tools and online education
            platforms is a plus.
          </li>
        </ol>
      </div>
      <div className="flex flex-col mt-8 px-2 md:px-20">
        <h2 className="font-bold text-[1.1em]">Experience And Skills</h2>
        <ol className="flex flex-col gap-3 list-disc text-[.9em] mt-4 ">
          <li>
            Experience: 1-3 years of teaching or tutoring experience, with a
            proven track record of improving student performance.
          </li>
          <li>
            Subject Expertise: In-depth knowledge of the subjects taught, with
            the ability to teach concepts effectively from Class 1 to 12.
          </li>
          <li>
            Classroom Management: Strong skills in managing diverse classroom
            environments, maintaining discipline, and engaging students.
          </li>
          <li>
            Communication Skills: Excellent verbal and written communication
            skills, with the ability to explain concepts clearly and interact
            effectively with students and parents.
          </li>
          <li>
            Adaptability: Ability to adapt teaching methods to suit different
            learning styles and needs, including the use of digital tools and
            resources.
          </li>
          <li>
            Assessment and Evaluation: Proficient in designing and conducting
            assessments, providing constructive feedback, and tracking student
            progress.
          </li>
        </ol>
      </div>
      <div className="px-20 mt-8 ">
        <Link
          href="/Signin"
          className="bg-orange-600 rounded-md p-4 text-white font-bold w-52 text-center"
        >
          Apply For Job
        </Link>
      </div>
    </div>
  );
};

export default Academics;
