"use client";
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Teacherloginextra from "@/components/Teacherloginextra";
import Picture from "@/public/JobsForHomeTutors.png";

import {
  FaUserPlus,
  FaIdBadge,
  FaVideo,
  FaCheckCircle,
  FaWallet,
  FaTachometerAlt,
} from "react-icons/fa";
import { BsArrowRightCircle } from "react-icons/bs";
import {
  FaClock,
  FaCloudUploadAlt,
  FaThumbsUp,
  FaLightbulb,
  FaHandshake,
  FaTrophy,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";
import AOS from "aos";
import Image from "next/image";

const TeacherPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <head>
        <title>
          Home tutor jobs in Jaipur - Find the Best Tuition Teachers Nearby!
        </title>
        <meta
          name="keywords"
          content="home tuition,tutor jobs, teacher jobs ,jaipur teacher,tutor"
        />
        <link rel="canonical" href="https://learnosphere.in/jobs-for-home-tutors" />
      </head>

      <div className="bg-orange-50 text-gray-800 font-Poppins mt-16">
        <div className=" flex flex-col-reverse sm:flex-row  gap-0 md:gap-2 justify-betwen items-center bg-gradient-to-r  mt-20 from-orange-200 p-4  md:h-[55vh] w-[98vw] m-auto rounded-br-2xl rounded-bl-2xl to-yellow-200">
          <div className="px-2 sm:px-10 flex flex-col text-center sm:text-left  mb-4 sm:mb-0  gap-3 w-full sm:w-[75%]">
            <h1 className="font-bold text-[1em] md:text-[1.3em] lg:text-[1.6em] text-black">
              Join Learnosphere as an Educator
            </h1>
            <p className="text-[.7em] md:text-[.9em] text-gray-800 lg:text-[1em]">
              Empower students and grow your teaching career with us!
            </p>

            <h2 className="font-bold text-[.9em] md:text-[1.1em] text-black lg:text-[1.4em]">
              Ready to Start Your Journey?
            </h2>
            <p className="text-[.6em] md:text-[.8em] text-gray-800 lg:text-[.9em]">
              {" "}
              Click the button below to begin your journey as an educator on
              Learnosphere!
            </p>
            <Link href="/Signin">
              <button
                href="Signin"
                className="bg-white mt-3 border text-[1em] border-orange-600 text-orange-600 px-8 py-2 sm:py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-500 hover:text-white hover:scale-110 transition duration-300"
              >
                Start Now <BsArrowRightCircle size={25} className="inline" />
              </button>
            </Link>
          </div>
          <div className="   hidden sm:block rounded-2xl">
            <Image
              className="h-60 w-60 "
              src={Picture}
              alt="Teachers Picture"
            />
          </div>
        </div>
        {/* Header Section */}

        {/* Steps Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8">
              Follow These Simple Steps
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <FaUserPlus className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Step 1: Register",
                  description:
                    "Create an account by signing up with your Google account or manually filling out the registration form.",
                },
                {
                  icon: (
                    <FaIdBadge className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Step 2: Complete Your Profile",
                  description:
                    "Fill in your personal information, teaching qualifications, and previous experience.",
                },
                {
                  icon: (
                    <FaVideo className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Step 3: Submit a Demo Video",
                  description:
                    "Upload a short video showcasing your teaching skills and subject expertise.",
                },
                {
                  icon: (
                    <FaCheckCircle className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Step 4: Verification",
                  description:
                    "Our team will review your profile, documents, and demo video for approval.",
                },
                {
                  icon: (
                    <FaTachometerAlt className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Step 5: Access Your Dashboard",
                  description:
                    "Explore your educator dashboard and set up your teaching preferences while waiting for verification.",
                },
                {
                  icon: (
                    <FaWallet className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Step 6: Start Earning",
                  description:
                    "Once approved, start teaching and earning on Learnosphere.",
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                  className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105"
                >
                  {step.icon}
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p>{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
      </div>

      {/* Learnosphere Highlights Section with Custom Slider */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-6">
            Why Choose Learnosphere?
          </h2>
          <p className="text-lg text-center mb-8">
            At Learnosphere, we’re committed to empowering educators by
            providing unparalleled flexibility and tools to grow their teaching
            careers.
          </p>

          <div className="relative">
            <div className="flex overflow-x-auto gap-8 snap-x snap-mandatory p-3">
              {[
                {
                  icon: (
                    <FaClock className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Flexible Opportunities",
                  description:
                    "Work on your own schedule. Teach full-time or part-time while making a meaningful impact.",
                },
                {
                  icon: (
                    <FaCloudUploadAlt className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Seamless Content Upload",
                  description:
                    "Use our user-friendly dashboard to upload useful educational content for students worldwide.",
                },
                {
                  icon: (
                    <FaThumbsUp className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Earnings Based on Quality",
                  description:
                    "Earn rewards for high-quality content. Approved materials will earn you bonuses and recognition.",
                },
                {
                  icon: (
                    <FaLightbulb className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Innovative Teaching Tools",
                  description:
                    "Access advanced tools to enhance your teaching methods and engage students more effectively.",
                },
                {
                  icon: (
                    <FaHandshake className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Collaborative Community",
                  description:
                    "Join a vibrant community of educators sharing ideas, best practices, and teaching strategies.",
                },
                {
                  icon: (
                    <FaTrophy className="text-orange-600 text-5xl mx-auto mb-4" />
                  ),
                  title: "Recognition & Growth",
                  description:
                    "Achieve recognition for your efforts and grow your reputation as an expert educator.",
                },
              ].map((highlight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.3 }}
                  className="bg-white shadow-lg rounded-lg p-6 w-72 flex-shrink-0 text-center transform hover:scale-105 snap-center"
                >
                  {highlight.icon}
                  <h3 className="text-xl font-semibold mb-2">
                    {highlight.title}
                  </h3>
                  <p>{highlight.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Teacherloginextra />
      <Footer1 />
      <Footer />
    </>
  );
};

export default TeacherPage;
