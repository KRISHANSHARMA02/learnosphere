import Brandapp from "@/components/Brandapp";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { FaChalkboardTeacher, FaBook, FaHome, FaGlobe } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";

import AboutFaqs from "@/components/AboutFaqs";

export const generateMetadata = () => {
  return {
    title:
      "About Learnosphere - India’s Leading Online Learning Platform for Students",
    description:
      "Learnosphere offers the best home tuition, online earning opportunities for tutors, and comprehensive exam preparation for UPSC, SSC, NEET, IIT, CBSE, and more. Find tuition near you and learn how to prepare for exams effectively.",
    keywords:
      "best home tuition, earn online, tuition near me, how to prepare for exam, UPSC, SSC, NEET, IIT, CBSE, Learnosphere, personalized education, online learning, quality education, educators, students, Jaipur, offline tuitions",
  };
};

const About = () => {
  const metadata = generateMetadata();

  return (
    <>
      <Navbar />
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
      </Head>

      <div className="bg-[#fff] py-12 md:py-24 mt-[50px]">
        <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row gap-12 items-center">
            
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 font-Poppins underline justify-center mb-4 flex items-center">
                <FaGlobe className="mr-2 text-orange-500 text-2xl md:text-2xl lg:text-3xl" /> About Learnosphere
              </h1>
              <p className="text-lg text-gray-700 font-Poppins mb-6">


                Learnosphere is your go-to platform for The 
                 <Link href="/" className="hover:text-blue-700 hover:underline">
                <strong> best home tuition</strong>

                </Link>
                , connecting students with
                experienced tutors for personalized learning experiences.
                Whether you're searching for <strong>tuition near me</strong> or
                want to <strong>earn online</strong> by sharing your knowledge,
                Learnosphere offers the perfect solution.
              </p>
              <p className="text-lg text-gray-700 font-Poppins mb-6">
                Our platform is designed to help students excel in competitive
                exams such as <strong>UPSC</strong>, <strong>SSC</strong>,{" "}
                <strong>NEET</strong>, <strong>IIT</strong>, and{" "}
                <strong>CBSE</strong>. We provide access to specialized tutors
                who offer tailored classes to meet the unique needs of each
                student.
              </p>
              <p className="text-lg text-gray-700 font-Poppins mb-6">
                At Learnosphere, we believe that quality education should be
                accessible to everyone. That's why we offer a range of{" "}
                <strong>offline tuitions</strong> in <strong>Jaipur</strong> and
                beyond, ensuring that students have the resources they need to
                succeed, no matter where they are.
              </p>
              <p className="text-lg text-gray-700 font-Poppins mb-6">
                For those aspiring to crack tough exams like{" "}
                <strong>UPSC</strong>, <strong>SSC</strong>,{" "}
                <strong>NEET</strong>, and <strong>IIT</strong>, our platform
                connects you with educators who specialize in these fields.
                Learn how to prepare for these exams with expert guidance,
                comprehensive study materials, and a structured approach that
                maximizes your chances of success.
              </p>
              <div className="flex justify-center items-center flex-col px-2 md:px-4 lg:px-0">
        <Brandapp />
      </div>
            </div>
          </div>
            <div className="mt-5">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-Poppins mb-4 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-orange-500 text-xl md:text-2xl lg:text-3xl" /> Why
                Choose Learnosphere for Home Tuition?
              </h3>
              <p className="text-lg text-gray-700 font-Poppins mb-6">
                Learnosphere is recognized as one of the{" "}
                <strong>best home tuition</strong> platforms due to its
                personalized approach to learning. We understand that each
                student has unique needs, and our platform is designed to cater
                to these individual requirements.
              </p>
              <p className="text-lg text-gray-700 font-Poppins mb-6">
                Parents and students trust Learnosphere because we offer more
                than just tuition; we offer a path to success. Our{" "}
                <strong>offline tuitions</strong> in <strong>Jaipur</strong> and
                other cities provide face-to-face learning opportunities that
                ensure students receive the attention they need to excel.
              </p>
              </div>
              <div className="mt-5">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-Poppins mb-4 flex items-center">
                <FaBook className="mr-2 text-orange-500 text-xl md:text-2xl lg:text-3xl" /> How to Prepare for
                Exams with Learnosphere
              </h3>
              <p className="text-lg text-gray-700 font-Poppins mb-6">
                Preparing for exams like <strong>UPSC</strong>,{" "}
                <strong>SSC</strong>, <strong>NEET</strong>, and{" "}
                <strong>IIT</strong> can be daunting, but with Learnosphere,
                you're never alone. Our platform provides access to expert
                educators who offer <strong>specialized classes</strong>{" "}
                tailored to these exams.
              </p>
              <p className="text-lg text-gray-700 font-Poppins mb-6">
                We also offer tips and strategies on{" "}
                <strong>how to prepare for exams</strong> effectively, including
                time management techniques, study schedules, and personalized
                coaching sessions that focus on the areas you need to improve.
              </p>
              </div>
              <div className="mt-5">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-Poppins mb-4 flex items-center">
                <FaHome className="mr-2 text-orange-500 text-xl md:text-2xl lg:text-3xl" /> Join Learnosphere
                and Start Earning with Home Tuitions
              </h3>
              <p className="text-lg text-gray-700 font-Poppins mb-6">
                Are you an educator looking to{" "}
                <strong>earn by providing home tuitions</strong>? Learnosphere
                is the perfect platform for you to share your knowledge and earn
                by offering personalized, face-to-face learning experiences in
                the comfort of students' homes. Our platform connects you with
                students who are eager to learn, giving you the opportunity to
                make a difference in their lives while building your own career.
              </p>
              <p className="text-lg text-gray-700 font-Poppins mb-6">
                With Learnosphere, you can offer{" "}
                <strong>offline home tuitions</strong>, focusing on providing
                quality education in a one-on-one setting. Whether you
                specialize in exam preparation, language learning, or any other
                subject, there are students out there who need your expertise.
                Join us today and start making a difference in students' lives
                with your knowledge and skills!
              </p>
              </div>
            </div>
            
          </div>
        
      
      <AboutFaqs />
      <Footer1 />
      <Footer />
    </>
  );
};

export default About;

