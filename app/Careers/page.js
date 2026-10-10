"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Careerimg from "@/public/Dark Green and Yellow Illustrative Recruitment Poster.png";
import Navbar from "@/components/Navbar";
import Websiteimg from "@/public/image for website (1).png";
import { IoRemoveOutline } from "react-icons/io5";
import Reactimg from "@/public/react-svgrepo-com.svg";
import Tailwindimg from "@/public/tailwindcss-svgrepo-com.svg";
import Mysqlimg from "@/public/mysql-logo-svgrepo-com.svg";
import Nodeimg from "@/public/node-js-svgrepo-com.svg";
import Nextimg from "@/public/nextjs-svgrepo-com.svg";
import Jsimg from "@/public/js-svgrepo-com.svg";
import { BsFillRouterFill } from "react-icons/bs";
import { GoStopwatch } from "react-icons/go";
import { SiStudyverse } from "react-icons/si";
import Dreamimg from "@/public/studenthome.jpg";
import Successimg from "@/public/Success.jpg";
import Deliverimg from "@/public/Deliver.jpg";
import Learnerimg from "@/public/School.jpg";
import { FaUserGraduate } from "react-icons/fa6";
import { MdDeveloperMode } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";
import Link from "next/link";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Uparrow from "@/components/Uparrow";

const Careers = () => {
  const jobRef = useRef(null);
  const scrollToJob = () => {
    jobRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <title>Careers - Teacher Jobs in Jaipur | Learnosphere </title>
      <meta
        name="description"
        content="Teacher Jobs in Jaipur Freshers welcome, start your teaching career, are you a tutor/educator or student we are hiring vacancy open for freshers & experiences"
      />
      <meta
        name="keywords"
        content="Teacher Jobs in Jaipur, Teaching jobs in Jaipur for freshers, Teacher Jobs in Jaipur for experienced,Teacher Jobs in Jaipur for educators,Teacher Jobs in Jaipur for professionals, Teacher Jobs in Jaipur for graduates, Teacher Jobs in Jaipur for postgraduates, Teacher Jobs in Jaipur for undergraduates, Teacher vacancy, educator jobs in jaipur, teacher job near me, online teacher job, teacher job for students, tutor jobs in jaipur, teaching job part time, teaching jobs for freshers, online tutor jobs in jaipur"
      />
      <Navbar />


      <div className="flex flex-col-reverse sm:flex-row  md:flex-row gap-2 md:gap-24 px-4 lg:px-28 xl:px-20   mt-20">
        <div className="pt-32 font-bold  ">
          <h1 className="text-[1em] md:text-[1.5em] lg:text-[1.8em] w-full lg:w-[34vw]">
            Step into the Learning Trib,Where Educator Growth Fuels Your Drive!
          </h1>
          <button
            className="mt-2 bg-orange-600 p-3 w-40 rounded-full text-[1.2em] text-white "
            onClick={scrollToJob}
          >
            Join Us
          </button>
        </div>
        <div className="w-full lg:w-[55vw] xl:w-[40vw] 2xl:w-[45vw]">
          <Image src={Careerimg} alt="Career Image" />
        </div>
      </div>
      <div className="flex flex-col items-center mt-10 px-4 font-bold">
        <h2 className="text-[1em] md:text-[1.4em]">
          Fueling Curiosity, Inspiring Growth — Our Mission: Keep Learning, Keep
          Thriving!
        </h2>
        <IoRemoveOutline className=" text-orange-600 " size={80} />
      </div>
      <div className="flex flex-col-reverse sm:flex-row md:flex-row gap-4 ">
        <div className="flex flex-col gap-2 px-8 lg:px-24 mt-6 2xl:px-40 2xl:mt-20 ">
          <h2 className="font-bold text-[1.1em] md:text-[1.7em]">About Us</h2>

          <ol className="font-semibold list-decimal text-[.7em] md:text-[1.1em]   text-gray-950 flex gap-2 flex-col ">
            <li>Dive into Learnosphere — Unlock a World of Knowledge!</li>
            <li>At Learnosphere, Learning Never Stops — Neither Should You!</li>
            <li>
              Empower Your Mind, Elevate Your Future — Only at Learnosphere!
            </li>
            <li>Learnosphere: Your Study Hub, Your Success Path!</li>
            <li>
              Master New Skills, Achieve Your Dreams — Welcome to Learnosphere!
            </li>
          </ol>
        </div>
        <div className="  w-full  lg:w-[50vw]">
          <Image
            className=" px-0 sm:px-16 md:px-2  lg:px-2 xl:px-40 2xl:px-48 pt-8"
            src={Websiteimg}
            alt="Image Web"
          />
        </div>
      </div>
      <div>
        <div className="mt-10 px-6 md:px-20 font-bold text-[1.4em] font-serif">
          <h2>#Technologies We Use</h2>
        </div>
        <div className="overflow-hidden w-[85%] m-auto ">
          <div className="flex gap-8 mt-4 animate-marquee">
            <Image className="h-24" src={Reactimg} alt="React" />
            <Image className="h-24" src={Nextimg} alt="Next.js" />
            <Image className="h-24" src={Tailwindimg} alt="Tailwind CSS" />
            <Image className="h-24" src={Jsimg} alt="JavaScript" />
            <Image className="h-24" src={Nodeimg} alt="Node.js" />
            <Image className="h-24" src={Mysqlimg} alt="MySQL" />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center mt-4 w-full md:w-[95%] shadow-lg m-auto rounded-lg  p-5  ">
        <h2 className="text-[.8em] md:text-[1.4em] text-center font-bold">
          Teach, Earn, and Inspire with Learnosphere
        </h2>
        <p className=" flex flex-col gap-3 text-[.6em] md:text-[1em] p-6 ">
          Learnosphere is your gateway to a fulfilling and flexible teaching
          career. As a leading platform for online education, we connect
          passionate educators with eager learners worldwide. Whether an
          experienced teacher or budding tutor in Jaipur, Learnosphere empowers
          you to share your knowledge and skills, anytime, anywhere.
          <br />
          <br />
          With Learnosphere, you can explore various teaching opportunities,
          from creating engaging online courses to providing personalized home
          tuition. Our platform offers a user-friendly interface and robust
          tools to help you deliver exceptional educational experiences.
          <br />
          <br />
          As a tutor on Learnosphere, you'll be free to set your schedule,
          choose your preferred teaching methods, and earn a competitive income.
          You'll have the chance to connect with students from diverse
          backgrounds, expand your professional network, and make a lasting
          impact on their academic journey.
          <br />
          <br />
          Join us today and unlock a world of possibilities. Whether you're
          looking for tutor jobs in India, online tutoring opportunities, or
          home tuition assignments in Jaipur, Learnosphere has you covered.
          Start your teaching adventure and become a part of our thriving
          community of educators.
          <br />
        </p>
      </div>
      <div className="font-bold text-[1.1em] md:text-[1.5em] px-4 md:px-20 items-center flex flex-col mt-12">
        <h2>Work Environment and Rewards</h2>
        <IoRemoveOutline className=" text-orange-600 " size={80} />
      </div>
      <div className="flex flex-col sm:flex-row md:flex-row gap-8 w-full p-3  lg:w-[85%] m-auto">
        <div className="flex gap-6  border p-4 shadow-2xl ">
          <div>
            <BsFillRouterFill size={30} className="text-orange-600" />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-[1.5em]">Communicate</h3>
            <p className="font-semibold text-gray-950 text-[.8em] md:text-[1em]">
              At Learnosphere, communication is smooth and engaging, ensuring
              you’re always connected and supported. Dive into a community where
              your questions and ideas drive your learning journey forward!
            </p>
          </div>
        </div>
        <div className="flex gap-6  border  p-4 shadow-2xl">
          <div>
            <GoStopwatch size={30} className="text-orange-600" />
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="font-bold text-[1.5em]">Flexible office timings</h3>
            <p className="font-semibold text-gray-950 text-[.8em] md:text-[1em]">
              Enjoy the freedom of flexible office timings at Learnosphere,
              where you can balance work and life seamlessly. Tailor your
              schedule to fit your needs and boost your productivity!
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-col mt-12">
        <h2 className="font-bold text-[1em] md:text-[1.5em]">Our Key Values</h2>
        <IoRemoveOutline className=" text-orange-600 " size={80} />
      </div>
      <div className="px-4 sm:px-4 md:px-4 lg:px-10  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10 2xl:gap-0">
        <div className=" shadow-2xl shadow-orange-300 flex flex-col justify-between h-auto  gap-2 w-full lg:w-60  border border-gray-300 p-4 rounded-tl-xl rounded-br-xl">
          <div>
            <Image className="rounded-lg" src={Dreamimg} alt="Image dream" />
          </div>
          <div className="flex flex-col gap-1 ">
            <h3 className="font-bold">Dream Big and Learning Everyday</h3>
            <p className="text-gray-950 text-[.9em]">
              Big Dreams, Daily Learning — Unlock Your Full Potential!
            </p>
          </div>
        </div>
        <div className=" shadow-2xl shadow-orange-300 flex flex-col justify-between h-auto  gap-2 w-full lg:w-60 border border-gray-300 p-4 rounded-tl-xl rounded-br-xl">
          <div>
            <Image className="rounded-lg" src={Deliverimg} alt="Image111" />
          </div>
          <div className="flex flex-col gap-1 ">
            <h3 className="font-bold">
              Delivering the best and building trust
            </h3>
            <p className="text-gray-950 text-[.9em]">
              Delivering Excellence, Building Trust Every Step of the Way
            </p>
          </div>
        </div>
        <div className=" shadow-2xl shadow-orange-300 flex flex-col justify-between h-auto  gap-2 w-full lg:w-60 border border-gray-300 p-4 rounded-tl-xl rounded-br-xl">
          <div>
            <Image
              className="rounded-lg"
              src={Successimg}
              alt="Image success"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <h3 className="font-bold">Celebrating everyone</h3>
            <p className="text-gray-950 text-[.9em]">
              Recognizing and Celebrating Everyone’s Unique Contributions.
            </p>
          </div>
        </div>
        <div className=" shadow-2xl shadow-orange-300 flex flex-col justify-between h-auto  gap-2 w-full lg:w-60 border border-gray-300 p-4 rounded-tl-xl rounded-br-xl">
          <div>
            <Image
              className="rounded-lg"
              src={Learnerimg}
              alt="Image loading"
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <h3 className="font-bold">Nurturing active learners</h3>
            <p className="text-gray-950 text-[.9em]">
              Empowering and Nurturing Active Learners for Lifelong Success.
            </p>
          </div>
        </div>
      </div>
      <div
        ref={jobRef}
        className="flex justify-center flex-col mt-10 items-center"
      >
        <h2 className="font-bold text-[1.2em] md:text-[1.6em]">
          Join Our Team
        </h2>
        <IoRemoveOutline className=" text-orange-600 " size={80} />
        <span>
          <p className="font-semibold  w-full md:w-[95%] m-auto text-[.8em] md:text-[1em] text-center">
            Join Learnosphere to unlock your potential with cutting-edge
            resources and a supportive community. Benefit from personalized
            learning paths, expert guidance, and a culture that celebrates every
            achievement. Immerse yourself in an environment where growth and
            success are our top priorities. Connect with like-minded peers,
            access exclusive tools and content, and experience a learning
            journey tailored just for you. Transform your educational experience
            and reach new heights with Learnosphere!
          </p>
        </span>
      </div>
      <div>
        <div className="px-4 md:px-16 grid gid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 mb-8 md:mb-0 ">
          <div className="w-full flex gap-2 flex-col border border-gray-300 rounded-lg shadow-2xl p-4  ">
            <FaUserGraduate size={30} className="text-orange-600" />
            <p className="border-b-2 border-orange-600 h-8 w-48 font-bold text-[1.2em]">
              Academics
            </p>
            <p className="text-[.9em] text-gray-800">
              Elevate your career with Learnosphere’s tailored academic
              resources and expert support
            </p>
            <Link href="/Jobs/Academics">
              {" "}
              <button className="text-start font-bold text-orange-600">
                View Jobs
              </button>
            </Link>
          </div>
          <div className="w-full flex gap-2 flex-col border border-gray-300 rounded-lg shadow-2xl p-4  ">
            <MdDeveloperMode size={30} className="text-orange-600" />
            <p className="border-b-2 border-orange-600 h-8 w-48 font-bold text-[1.2em]">
              App Development
            </p>
            <p className="text-[.9em] text-gray-800">
              Accelerate your app development with Learnosphere’s cutting-edge
              tools and expert insights.
            </p>
            <Link
              href="/Jobs/Appdevelopment"
              className="text-start font-bold text-orange-600"
            >
              View Jobs
            </Link>
          </div>
          <div className="w-full flex gap-2 flex-col border border-gray-300 rounded-lg shadow-2xl p-4  ">
            <FaFolderOpen size={30} className="text-orange-600" />
            <p className="border-b-2 border-orange-600 h-8 w-48 font-bold text-[1.2em]">
              Others
            </p>
            <p className="text-[.9em] text-gray-800">
              Master any skill with Learnosphere’s comprehensive resources and
              expert guidance
            </p>
            <Link
              href="/Jobs/Others"
              className="text-start font-bold text-orange-600"
            >
              View Jobs
            </Link>
          </div>
        </div>
      </div>
      <Uparrow />
      <Footer1 />
      <Footer />
    </div>
  );
};

export default Careers;
