"use client"
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Trends = () => {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <div className="px-6 lg:px-0 py-12 bg-[#fff] w-full font-Poppins lg:m-8 mb-20">
      <div
        data-aos=" fade-up"
        className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6  m-5 "
      >
        <div className="flex justify-center items-center flex-col p-8 shadow-lg w-full rounded-xl bg-gradient-to-l from-orange-50 to-white ">
          <h2 className="text-2xl font-bold mb-5">
            Cutting-Edge Personalization
          </h2>
          <p className="text-gray-600">
            Adaptive systems adjust pace according to each student’s grasp—part
            of global AI/ML tutoring trends
          </p>
        </div>
        <div className="flex justify-center mm items-center flex-col p-8 shadow-lg w-full rounded-xl bg-gradient-to-l from-orange-50 to-white">
          <h2 className="text-2xl font-bold mb-5">Time & Cost-Efficient</h2>
          <p className="text-gray-600">
            No travel time, flexible slots, and bite-size modules make learning
            efficient and cost-effective
          </p>
        </div>
        <div className="flex justify-center items-center flex-col p-8 shadow-lg w-full rounded-xl bg-gradient-to-l from-orange-50 to-white">
          <h2 className="text-2xl font-bold mb-5">Trends-Driven Approach</h2>
          <p className="text-gray-600">
            Leading the wave in micro‑learning, AI-integrated tutoring, and
            gamified lessons
          </p>
        </div>
      </div>
      <div
        data-aos="fade-up"
        className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-12 m-5 "
      >
        <div className="flex justify-center items-center flex-col p-8 shadow-lg  max-w-fit mx-auto rounded-xl bg-gradient-to-l from-orange-50 to-white">
          <h2 className="text-2xl font-bold mb-5">One-on-One, Real Results</h2>
          <p className="text-gray-600">
            Comfortable, distraction-free home environment improves learning
            focus
          </p>
          <p className="text-gray-600">
            Proven advantages: custom attention, academic confidence, and faster
            concept mastery
          </p>
        </div>
        <div className="flex justify-center items-center flex-col p-8 shadow-lg  max-w-fit mx-auto rounded-xl bg-gradient-to-l from-orange-50 to-white">
          <h2 className="text-2xl font-bold mb-5">
            Why Learn<b className="text-orange-600">O</b>sphere Home Tuition
            Works Better
          </h2>
          <p className="text-gray-600">
            “Learnosphere Home tuition provides personalized learning, real-time
            feedback, and fewer distractions, leading to faster academic growth
            and confidence.”
          </p>
        </div>
      </div>
      <div data-aos="fade-up" className="  m-15  ">
        <div className="absolute z-0 bottom-20 left-20 w-60 h-60 rounded-full border-2 border-orange-300 opacity-40" />
        <div className="absolute z-0 top-1/2 right-1/4 w-32 h-32 rounded-full border-2 border-orange-200 opacity-35" />
        <div className="absolute z-0 top-[70%] left-[40%] w-20 h-20 rounded-full border-2 border-orange-400 opacity-20" />
        <div className="absolute z-0 top-[20%] left-[80%] w-10 h-20 rounded-full border-2 border-orange-300 opacity-20" />

        <div className="flex justify-center items-center flex-col p-6  ">
          <h2 className="text-4xl font-bold text-black m-4 ">
            How Learn<b className="text-orange-600">O</b>sphere Work ?
          </h2>
          <div className="m-4">
            <div>
              <h4 className="text-l font-bold"> Expert Tutor Selection </h4>
              <p className="text-gray-600 mb-5 ">
                We match you with 2–3 vetted tutors for trial sessions.
              </p>
            </div>
            <h4 className="font-bold">Personalized Teaching Plan</h4>
            <p className="text-gray-600 mb-5">
              Includes structured modules, performance tracking dashboards, and
              “smart suggestions”.
            </p>

            <h4 className="font-bold">Continuous Improvement</h4>
            <p className="text-gray-600 mb-5">
              Weekly progress reports, parent–tutor feedback reviews, and live
              chat support.
            </p>
            <h4 className="font-bold"> Celebrate Milestones </h4>
            <p className="text-gray-600 mb-5">
              Report cards, confidence check-ins, and customized awards help
              maintain high motivation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trends;
