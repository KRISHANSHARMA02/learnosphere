import React from "react";
import { IoRemoveOutline } from "react-icons/io5";
import Image from "next/image";
import trophy from "@/public/trophy.svg";
import tech from "@/public/tech.svg";
import growth from "@/public/growth.svg";
import navigation from "@/public/navigation.svg";

const About = () => {
  const Success = [
    {
      id: 1,
      src: trophy,
      heading: "Our Educational Excellence in Personalized Learning",
      paragraph:
        "Discover our commitment to top-notch solutions for learners and educators.",
    },
    {
      id: 2,
      src: tech,
      heading: "Building Bridges Through Personalized Learning",
      paragraph:
        " Empowering students from all backgrounds with one-on-one guidance, Learnosphere connects knowledge, confidence, and academic growth, right from the comfort of your home.",
    },
    {
      id: 3,
      src: growth,
      heading: "Innovating Home Tuition for Tomorrow",
      paragraph:
        "From Class 1 to 12, our expert tutors use modern teaching tools, custom learning plans, and real-time feedback to make learning personal, effective, and future-ready.",
    },
    {
      id: 4,
      src: navigation,
      heading: "Navigating the Future of Education",
      paragraph: "We are leading the way in shaping personalized education.",
    },
  ];

  return (
       <div name="about" className="px-6 lg:px-0 py-12 bg-[#fff] w-full font-Poppins lg:m-4">
      <div className="flex flex-col bg-transparent justify-center items-center text-center">
        <p className="text-sm md:text-lg leading-relaxed">
          Learnosphere is a leading home tuition and online education platform in India,
          <span className="block md:inline">
            offering personalized one-on-one academic tutoring
          </span>
          either at home or online, delivered by expert and verified educators.
        </p>

        <p className="text-sm md:text-lg leading-relaxed mt-3">
          With experienced tutors, customized lesson plans, and coverage across major Indian boards
          (CBSE, ICSE, State Boards),
          <span className="block md:inline">
            we help students excel academically through both in-home and virtual classes on this Student Learning Platform.
          </span>
        </p>

        <p className="text-sm md:text-lg leading-relaxed mt-3">
          Whether you're a student seeking private guidance or a teacher eager to share knowledge,
          we’ve got you covered!
        </p>
      </div>
      <div className="flex justify-center items-center text-center flex-col py-7">
        <h1 className="text-xl md:text-4xl font-extrabold">
          Learn<b className="text-orange-600">O</b>sphere.in - Your Personalized
          Home Tuition Hub
        </h1>
        <IoRemoveOutline size={50} className="mt-2 md:mt-4" />
      </div>
      <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
        {Success.map(({ id, src, heading, paragraph }) => (
          <div
            key={id}
            className="flex justify-center items-center flex-col p-3 shadow-lg w-full rounded-xl"
          >
            <Image
              src={src || '/PlaceholderImage.png'}
              height={80}
              width={80}
              alt={`${heading} in personalized tutoring`}
              className="h-20 w-20 sm:h-24 sm:w-24 object-contain"
              priority
              sizes="(max-width: 768px) 60px, 80px"
            />
            <h2 className="text-lg md:text-xl text-left font-bold pt-3 px-3 text-orange-600">
              {heading}
            </h2>
            <p className="font-semibold text-left text-slate-600 px-3">
              {paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
