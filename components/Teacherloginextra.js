"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

import tutor from "@/public/tutor1.png";
import { GiTeacher } from "react-icons/gi";
import { IoMdTimer } from "react-icons/io";
import { PiBagSimpleLight } from "react-icons/pi";
import { FaPeopleLine } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import hometutor from "@/public/hometutor.jpg";
import { IoIosArrowForward } from "react-icons/io";

import appbrand from "@/public/appbrand.png";

import playstore from "@/public/playstore.svg";
import { TbPlus } from "react-icons/tb";
import { FiMinus } from "react-icons/fi";
import AOS from "aos";
import Image from "next/image";

const Teacherloginextra = () => {
  const [showState, setshowState] = useState(false);
  const [showSubject, setshowSubject] = useState(false);
  const [showJob, setshowJob] = useState(false);
  const [showClass, setshowClass] = useState(false);
  const [isPlus, setisPlus] = useState(true);
  const [isPluss, setisPluss] = useState(true);
  const [isPlusc, setisPlusc] = useState(true);
  const [isPlusj, setisPlusj] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const clickState = (event) => {
    event.preventDefault();
    setshowState(!showState);
    setisPlusc(true);
    setisPlusj(true);
    setisPlus(!isPlus);
    setisPluss(true);
    setshowSubject(false);
    setshowClass(false);
    setshowJob(false);
  };

  const clickSubject = (event) => {
    event.preventDefault();
    // setisPluss(true);
    setisPlusj(true);
    setisPlusc(true);
    setisPlus(true);
    setisPluss(!isPluss);
    setshowSubject(!showSubject);
    setshowState(false);
    setshowClass(false);
    setshowJob(false);
  };
  const clickClass = (event) => {
    event.preventDefault();
    setisPluss(true);
    setisPlusj(true);
    setisPlus(true);
    setisPlusc(!isPlusc);
    setshowClass(!showClass);
    setshowSubject(false);
    setshowState(false);
    setshowJob(false);
  };
  const clickJob = (event) => {
    event.preventDefault();
    setisPlusj(!isPlusj);
    setisPlus(true);
    setisPlusc(true);
    setisPluss(true);

    setshowJob(!showJob);
    setshowSubject(false);
    setshowState(false);
    setshowClass(false);
  };

  return (
    <div>
      <div
        data-aos="fade-up"
        className="flex flex-col items-start justify-center p-14"
      >
        <h2 className="text-xl md:text-2xl font-bold font-Poppins p-2 m-1">
          How <span>Learnosphere</span> Works for Tutors?
        </h2>
        <p className="font-normal text-lg md:text-xl font-Poppins pt-2 m-1">
         Learnosphere is a leading platform that connects home tutors with
          students and parents across cities. We provide Home tutoring jobs with flexible job opportunities tailored to their expertise and preferences. Our
          platform empowers educators to shape their careers while making a
          meaningful impact on students' learning journeys. Join Learnosphere to
          discover rewarding teaching jobs and unlock your full potential as an
          academic instructor!
        </p>
      </div>

      <div data-aos="fade-up" className="flex flex-col p-14">
        <div className="">
          <h2 className="text-2xl md:text-4xl font-semibold text-center font-Poppins">
            Benefits of Becoming an{" "}
            <span className="font-bold">Learnosphere</span> Tutor
          </h2>
        </div>
        <div className="w-16 mt-4 h-1 mx-auto bg-orange-500 rounded-full"></div>
        <div className="">
          <p className="font-normal text-lg md:text-xl text-center font-Poppins p-8">
            Become an <span>Learnosphere</span> Tutor and discover the multifold
            benefits of joining the largest community of experienced and
            professional tutors online.
          </p>
        </div>
      </div>

      <div data-aos="fade-up" className="block md:flex justify-center m-3">
        <div className="flex flex-col">
          <div className="flex items-center bg-[#e1e6ef] rounded-full p-5 m-3 font-Poppins">
            <GiTeacher className="text-4xl mr-[15px] text-orange-500" />
            Verified Leads for Home Tutor Jobs
          </div>

          <div className="flex items-center bg-[#e1e6ef] rounded-full p-5 m-3 font-Poppins">
            <IoMdTimer className="text-4xl mr-[15px] text-orange-500" />
            Flexible Part-Time/ Full-Time Tutor Jobs
          </div>

          <div className="flex items-center bg-[#e1e6ef] rounded-full font-Poppins p-5 m-3">
            <PiBagSimpleLight className="text-4xl mr-[15px] text-orange-500" />
            Find Jobs Based on Your Location
          </div>
        </div>
        <div className="hidden md:flex item-center ">
          <Image
            src={tutor}
            className="bg-white"
            width={300}
            height={300}
            alt="tutorimg"
          ></Image>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center bg-[#e1e6ef] font-Poppins rounded-full p-5 m-3">
            <FaPeopleLine className="text-4xl mr-[15px] text-orange-500" />
            Recruitment Assistance
          </div>

          <div className="flex items-center bg-[#e1e6ef] font-Poppins rounded-full p-5 m-3">
            <GiMoneyStack className="text-4xl mr-[15px] text-orange-500" />
            No Registration / Hidden Charges
          </div>

          <div className="flex items-center bg-[#e1e6ef] font-Poppins rounded-full p-5 m-3">
            <GiTakeMyMoney className="text-4xl mr-[15px] text-orange-500" />
            Get Competitive Pay
          </div>
        </div>
      </div>

      <div
        data-aos="fade-up"
        className=" flex justify-center item-center flex-col p-4 md:p-14"
      >
        <div className="flex justify-center items-center mt-12 gap-16 flex-col md:flex-row">
          <div className="flex flex-col">
            <div className="">
              <p className="text-2xl font-Poppins p-2 pl-5 md:pl-0 md:text-4xl font-bold ">
                Leanr<b className="text-orange-600">O</b>phere.in
              </p>
            </div>
            <div className="">
              <p className="text-xl md:text-4xl font-Poppins font-semibold uppercase pt-6">
                download the tutors app now
              </p>
            </div>

            <div className="flex gap-2 md:gap-0  justify-between  pt-10 flex-start">
              <div className="flex justify-center md:justify-start pt-10">
                <div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app" // replace with your actual link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mr-4 gap-2 bg-[#000000] hover:bg-[#1a1a1a] transition-all duration-200 rounded-lg px-5 py-2 text-white"
                  >
                    <Image
                      src={playstore || "/PlaceholderImage.png"} // your playstore icon image
                      alt="Playstore"
                      width={24}
                      height={24}
                      quality={100}
                      priority
                    />
                    <div className="leading-tight ">
                      <p className="text-[10px] font-medium font-sans">
                        GET IT ON
                      </p>
                      <p className="text-sm font-bold font-sans">Google Play</p>
                    </div>
                  </a>
                </div>
                <div>
                  <a
                    href="https://apps.apple.com/in/app/learnosphere/id6744967495" // replace with your actual link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center ml-4 gap-2 bg-[#000000] hover:bg-[#1a1a1a] transition-all duration-200 rounded-lg px-5 py-2 text-white"
                  >
                    <Image
                      src={"/Apple_Store_logo.png"} // your playstore icon image
                      alt="Applestore"
                      width={30}
                      height={30}
                      quality={100}
                      priority
                    />
                    <div className="leading-tight">
                      <p className="text-[10px] font-medium font-sans">
                        GET IT ON
                      </p>
                      <p className="text-sm font-bold font-sans">App Store</p>
                    </div>
                  </a>
                </div>
              </div>

              {
                // <div className="flex flex-col item-center justify-center cursor-pointer bg-black p-3 rounded-xl text-white">
                //   <div>
                //     <p className="text-xs font-Poppins md:pl-1">Available on </p>
                //   </div>
                //   <div className="flex  text-center flext-start">
                //     <FaApple className="text-2xl" />
                //     <p className="text-sm md:text-lg p-1 md:p-0">App Store</p>
                //   </div>
                // </div>
              }
            </div>
          </div>

          <div className="item-center">
            <Image src={appbrand} height={300} width={300} alt="appimg" />
          </div>
        </div>
      </div>

      {/* <div className="p-4 md:p-14">
<div className="flex flex-col justify-center p-4 md:p-14">
  <h3 className="text-xl md:text-2xl font-bold text-center font-Poppins">
    Start Your Journey as Tutor
  </h3>
  <p className="font-normal text-lg md:text-xl text-center font-Poppins p-2">
    Fill in the details below and take the first step toward your
    academic journey.
  </p>
</div>

</div> */}

      <div data-aos="fade-up" className="flex flex-col p-4 md:p-14">
        <div className="flex flex-col">
          <div className="">
            <h2 className="text-2xl md:text-4xl font-semibold text-center font-Poppins">
              {" "}
              <span className="font-bold">Learnosphere</span> Services
            </h2>
          </div>
          <div className="w-8 md:w-16 mt-4 h-1 mx-auto bg-orange-500 rounded-full"></div>
          <p className="font-normal text-lg md:text-xl text-center font-Poppins p-2">
            Enjoy the exclusive advantage of becoming a Learnosphere tutor and
            escalate your career.
          </p>
        </div>

        <div className="flex flex-col md:flex-row my-4 mx-4 md:mx-[7rem] justify-around shadow-xl bg-gray-50 rounded-sm">
          <div className="flex w-full md:w-1/2 p-4 md:p-9 item-center justify-center">
            <Image src={hometutor} width={300} height={400} alt="IMAGE"></Image>
          </div>
          <div className="flex flex-col w-full md:w-1/2 p-4 md:p-9">
            <h3 className="text-lg md:text-2xl font-bold text-center font-Poppins">
              Jobs for Home Tutors
            </h3>
            <p className="font-normal text-md md:text-lg text-center font-Poppins p-2">
              Browse{" "}
              <a
                href="/become-a-tutor"
                className="hover:text-blue-600 hover:underline text-orange-600"
              >
                home tuition jobs
              </a>{" "}
              near me on the Learnosphere app and access thousands of verified
              leads for different cities. Get competitive pay and upsurge your
              income.
            </p>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center p-14">
<button className="px-6 py-3 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300">
  Become a <span>Learnosphere</span> Tutor
</button>
</div> */}

      <div data-aos="fade-up" className="flex flex-col p-6 sm:p-10 md:p-14">
        <div className="flex flex-col">
          <div className="px-6 sm:px-10 md:px-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
              {" "}
              Become an <span>Learnosphere</span> Tutor and Enjoy Flexible
              Teaching Methods
            </h2>
          </div>
          <div className="w-16 mt-4 h-1 mx-auto bg-orange-500 rounded-full"></div>
          <p className="font-normal text-lg sm:text-xl text-center p-2 font-Poppins">
            Enjoy the exclusive advantage of becoming an{" "}
            <span>Learnosphere</span> tutor and escalate your career.
          </p>
        </div>
        <div className="px-6  sm:p-10 md:px-14 flex flex-col m-6 sm:mx-10 md:mx-[7rem] shadow-xl bg-gray-50 rounded-sm">
          <h3 className="pt-2 md:pt-0 text-xl sm:text-2xl md:text-2xl font-bold text-center font-Poppins text-orange-500">
            Offline
          </h3>
          <p className="font-normal text-lg sm:text-xl text-center font-Poppins p-2">
            Find tutor jobs nearby your location and get recruitment assistance
            for teaching at institutions. <span>Learnosphere</span> is a
            one-stop solution that connects you with different institutions as
            per your locality and chosen work locations so that you can start
            your academic journey at competitive pay. Say goodbye to the hassle
            of searching “tutor jobs near me” and get leads for all top-tier
            cities like Delhi, Bangalore, Jaipur, Ahmedabad, etc.
          </p>
          <div className="flex flex-col">
            <div className="flex items-center font-Poppins font-normal text-lg sm:text-xl text-start p-2">
              <IoIosArrowForward className="text-xl sm:text-2xl mr-[10px] sm:mr-[15px] border rounded-sm" />
              Access top-notch institutions nearby and find your dream job
              instantly.
            </div>
            <div className="flex font-normal font-Poppins items-center text-lg sm:text-xl text-start p-2">
              <IoIosArrowForward className="text-xl sm:text-2xl mr-[10px] sm:mr-[15px] border rounded-sm" />
              Accelerate your academic career as a tutor 10X faster with{" "}
              <span> Learnosphere</span>.
            </div>
            <div className="flex font-normal font-Poppins items-center text-lg sm:text-xl text-start p-2">
              <IoIosArrowForward className="text-xl sm:text-2xl mr-[10px] sm:mr-[15px] border rounded-sm" />
              Save up your time on endless job searching and get recruitment
              assistance from our side.
            </div>
            <div className="flex font-normal font-Poppins items-center text-lg sm:text-xl text-start p-2">
              <IoIosArrowForward className="text-xl sm:text-2xl mr-[10px] sm:mr-[15px] border rounded-sm" />
              Get priority support and guidance from a team of experts at{" "}
              <span> Learnosphere</span>.
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-center p-14">
<button className="px-6 py-3 uppercase font-Poppins bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300">
  Register Now
</button>
</div> */}

      <div data-aos="fade-up" className="p-6 sm:p-10 md:p-14">
        <div className="flex flex-col">
          <div className="px-6 sm:px-10 md:px-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center font-Poppins">
              The Journey of Your Growth Begins with <span>Learnosphere</span>
            </h2>
          </div>
          <div className="w-16 mt-4 h-1 mx-auto bg-orange-500 rounded-full"></div>
          <p className="font-normal text-lg sm:text-xl text-center p-2 font-Poppins">
            Join a dynamic community of educators. Apply to become a{" "}
            <span>Learnosphere</span> Tutor today!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center p-6 sm:p-10 md:p-14 space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex justify-center p-5 sm:p-0">
            <Link
              href="mailto:info@learnosphere.in"
              className="px-6 py-3 font-Poppins bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
              target="_blank"
            >
              Send us a Message
            </Link>
          </div>
          {/* <div className="flex justify-center">
    <button className="px-20 py-3 font-Poppins bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300">
      Call us
    </button>
  </div> */}
        </div>
      </div>

      <div data-aos="fade-up" className="flex flex-col p-14">
        {/* Tutor Job By State Section */}
        <div className="flex flex-col p-2">
          <div className="flex flex-col w-full bg-gray-100">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg md:text-2xl w-full font-semibold font-Poppins">
                <Link
                  href=""
                  className="w-full flex items-center justify-between"
                  onClick={clickState}
                >
                  Tutor Job By State
                  {isPlus ? (
                    <TbPlus className="plus text-2xl" />
                  ) : (
                    <FiMinus className="plus text-2xl" />
                  )}
                </Link>
              </h3>
            </div>
            <div
              className={`flex flex-col ${
                showState ? "block" : "hidden"
              } p-4 space-y-4`}
            >
              {["Rajasthan"].map((state) => (
                <Link
                  key={state}
                  href=""
                  className="flex items-center justify-between"
                >
                  {state}
                  <IoIosArrowForward className="text-2xl ml-[15px]" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Tutor Job By Subject Section */}
        <div className="flex flex-col p-2">
          <div className="flex flex-col w-full bg-gray-100">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg md:text-2xl w-full font-semibold">
                <Link
                  href=""
                  className="w-full flex items-center justify-between"
                  onClick={clickSubject}
                >
                  Tutor Job By Subject
                  {isPluss ? (
                    <TbPlus className="plus text-2xl" />
                  ) : (
                    <FiMinus className="plus text-2xl" />
                  )}
                </Link>
              </h3>
            </div>
            <div
              className={`flex flex-col ${
                showSubject ? "block" : "hidden"
              } p-4 space-y-4`}
            >
              {[
                "Hindi",
                "English",
                "Biology",
                "Mathematics",
                "Physics",
                "Social Science",
                "Science",
                "Computer Science",
                "Chemistry",
                "Accounts",
                "Economics",
                "Sanskrit",
                "Geography",
                "Environmental Science",
                "History",
                "Arts",
                "Commerce",
              ].map((subject) => (
                <Link
                  key={subject}
                  href=""
                  className="flex items-center justify-between"
                >
                  {subject}
                  <IoIosArrowForward className="text-2xl ml-[15px]" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Tutor Job By Class Section */}
        <div className="flex flex-col p-2">
          <div className="flex flex-col w-full bg-gray-100">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-lg md:text-2xl w-full font-semibold font-Poppins">
                <Link
                  href=""
                  className="w-full flex items-center justify-between"
                  onClick={clickClass}
                >
                  Tutor Job By Class
                  {isPlusc ? (
                    <TbPlus className="plus text-2xl" />
                  ) : (
                    <FiMinus className="plus text-2xl" />
                  )}
                </Link>
              </h3>
            </div>
            <div
              className={`flex flex-col ${
                showClass ? "block" : "hidden"
              } p-4 space-y-4`}
            >
              {[
                "Primary Class",
                "Class 1",
                "Class 2",
                "Class 3",
                "Class 4",
                "Class 5",
                "Class 6",
                "Class 7",
                "Class 8",
                "Class 9",
                "Class 10",
                "Class 11",
                "Class 12",
              ].map((classLevel) => (
                <Link
                  key={classLevel}
                  href=""
                  className="flex items-center justify-between"
                >
                  {classLevel}
                  <IoIosArrowForward className="text-2xl ml-[15px]" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Tutor Job By Job Section */}
        <div className="flex flex-col p-2">
          <div className="flex flex-col w-full bg-gray-100">
            <div className="flex items-center justify-between p-4">
              <h3 className="text-xl md:text-2xl w-full font-semibold font-Poppins">
                <Link
                  href=""
                  className="w-full flex items-center justify-between"
                  onClick={clickJob}
                >
                  Tutor Job By Job
                  {isPlusj ? (
                    <TbPlus className="plus text-2xl" />
                  ) : (
                    <FiMinus className="plus text-2xl" />
                  )}
                </Link>
              </h3>
            </div>
            <div
              className={`flex flex-col ${
                showJob ? "block" : "hidden"
              } p-4 space-y-4`}
            >
              {["Part Time", "Full Time"].map((jobType) => (
                <Link
                  key={jobType}
                  href=""
                  className="flex items-center justify-between"
                >
                  {jobType}
                  <IoIosArrowForward className="text-2xl ml-[15px]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacherloginextra;
