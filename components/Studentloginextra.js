"use client"
import React, {useState} from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { GiBookAura } from "react-icons/gi";
import { GiTeacher } from "react-icons/gi";
import { FaArrowLeftLong, FaArrowRightLong, FaMoneyBillTransfer } from "react-icons/fa6";
import { IoMdStopwatch } from "react-icons/io";
import { ImHome } from "react-icons/im";
import { FaPeopleLine } from "react-icons/fa6";
import { TbReplaceFilled } from "react-icons/tb";
import { BiMaleFemale } from "react-icons/bi";
import OneToOne from '@/public/OneToOne.svg'
import Payment from '@/public/Payment.svg'
import Affordable from '@/public/Affordable.svg'
import Demo from '@/public/Affordable.svg'
import Learning from '@/public/Learning.svg'
import Teacher from '@/public/teachers.svg'


import { TbPlus } from "react-icons/tb";
import { FiMinus } from "react-icons/fi";

import { VscFeedback } from "react-icons/vsc";

import { Link } from 'react-scroll';
import Image from 'next/image';
import { Teachers } from 'next/font/google';

const Studentloginextra = () => {
    const [showState, setshowState] = useState(false);
    const [showSubject, setshowSubject] = useState(false);
    const [showJob, setshowJob] = useState(false);
    const [showClass, setshowClass] = useState(false);
    const [isPlus, setisPlus] = useState(true);
    const [isPluss, setisPluss] = useState(true);
    const [isPlusc, setisPlusc] = useState(true);
    const [isPlusj, setisPlusj] = useState(true);
   

    // Handle Previous button click
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleScroll = (direction) => {
      setCurrentIndex((prevIndex) =>
        direction === 'next'
          ? Math.min(prevIndex + 1, cards.length - 3) // Go to next index, but prevent overflow
          : Math.max(prevIndex - 1, 0) // Go to previous index, but prevent going below 0
      );
    };
  

    const cards = [
      { heading: 'One-to-One Learning',para:'We understand that every student is unique and thus requires a personalized teaching method. At Learnosphere, we ensure that every student receives personal attention through our one-to-one learning classes. We offer flexibility in scheduling and provide tutors for all subjects, exam preparations, boards, and non-academic classes.',image:OneToOne },
      { heading: 'Affordability',para:'We make high-quality tutoring services accessible for everyone with affordable pricing. Our flexible tutoring plans ensure you only pay for what you need—no hidden costs, just transparent and budget-friendly rates for all subjects and levels. Quality home tutoring doesn’t have to break the bank.',image:Affordable },
      { heading: 'Transparent Payment System',para:'Say goodbye to confusion! Our transparent payment system ensures clear pricing from the start. You’ll always know exactly what you’re paying for, and secure transactions guarantee a smooth, worry-free experience. No surprises, just simple, reliable payment methods for all our tutoring services.',image:Payment },
      { heading: 'Experienced Tutors',para:'Our experienced tutors are experts in their fields, passionate about helping you succeed. With years of academic tutoring experience and proven success, they bring valuable insights and personalized support to every lesson. Whether it’s subject-specific tutoring or skill development, our tutors are here to guide you every step of the way.',image:Teacher },
      { heading: 'Personalized Learning & Skill Development',para:'Your learning journey is unique, and so are your lessons. We provide personalized tutoring that focuses on your individual needs, with one-on-one sessions targeting areas where you need the most improvement. With customized lesson plans and ongoing progress tracking',image:Learning },
      { heading: 'Free Demo at Your Pace',para:'Experience the tutor’s teaching style before committing! Our free demo class lets you explore the tutor’s approach, with no pressure to sign up until you’re ready. Learn at your own pace, ensuring the perfect fit for your learning goals before starting regular tutoring sessions',image:Demo },
    ];
  
    
  
  


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
      const sendmail = ()=>{
        const customMessage = encodeURIComponent("Hi, I would like to know more about Learnosphere!");
        window.open(`https://wa.me/918769600449?text=${customMessage}`, "_blank", "noopener,noreferrer");
      }
  return (
    <div>
    
    <div className="flex flex-col items-start justify-center p-14">
          <h3 className="text-xl md:text-2xl font-bold font-Poppins p-2 m-1">
          Find Expert Tutors for Academic Excellence?
          </h3>
          <p className="font-normal text-lg md:text-xl font-Poppins pt-2 m-1">
          <span>Learnosphere</span>
          Learnosphere connects you with expert tutors to help you achieve your academic goals. Whether you need support in Math, Science, English, or want to explore non-academic areas like music and languages, our tutoring services have the perfect fit for you. With flexible, one-on-one lessons tailored to your needs, you can enhance your academics at your own pace. Contact us today to find the ideal tutor and begin your learning journey at home! 
          </p>
        </div>



        <div className="flex flex-col p-6 sm:p-10 md:p-14">
          <div className="flex flex-col">
            <div className="px-6 sm:px-10 md:px-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
                {" "}
                Experienced Tutors for Personalized Learning
              </h2>
            </div>
            <div className="w-16 mt-4 h-1 mx-auto bg-orange-500 rounded-full"></div>
            <p className="font-normal text-lg sm:text-xl text-center p-2 font-Poppins">
            Revolutionize the way of finding the best home tutors with Learnosphere and hire the ideal tutor in minutes for home tutoring.
            </p>
          </div>
        </div>
        <div className="relative">
        <div
          className="flex overflow-x-auto gap-4 p-4 scrollbar-hide transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-white to-gray-100  border border-gray-200 xl:h-[50vh] w-[80vw] sm:w-[60vw] md:w-[30vw] p-4 shadow-2xl rounded-xl flex-shrink-0"
            >
              <Image className="h-4 w-16" src={card.image} alt="" />
              <h3 className="text-[1.2em] md:text-[1.5em] font-bold font-Poppins text-amber-500">
                {card.heading}
              </h3>
              <p className="text-[.8em] md:text-[1em] text-gray-700 mt-2">{card.para}</p>
            </div>
          ))}
        </div>
      </div>
      
        <div className="flex flex-col p-6 sm:p-10 md:p-14">
          <div className="flex flex-col">
            <div className="px-6 sm:px-10 md:px-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center">
              The One-To-One Advantage

              </h2>
            </div>
            <div className="w-16 mt-4 h-1 mx-auto bg-orange-500 rounded-full"></div>
            <p className="font-normal text-lg sm:text-xl text-center font-Poppins p-2">
              Join our team of expert tutors today and enjoy exclusive{" "}
              <span>Learnosphere</span> advantages.
            </p>
          </div>
          <div className="flex flex-col md:flex-row p-6 sm:p-10 md:p-14 space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              <GiBookAura  className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center font-Poppins">
              Affordable
              </h3>
              
            </div>

            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              <GiTeacher className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center">
              Experienced Tutors
              </h3>
              
            </div>

            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              <FaMoneyBillTransfer className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center font-Poppins">
              Transparent Payment System
              </h3>
              
            </div>
          </div>


          <div className="flex flex-col md:flex-row p-6 sm:p-10 md:p-14 space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              <IoMdStopwatch  className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center font-Poppins">
              Connect to Tutor in 24hrs
              </h3>
              
            </div>

            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              <ImHome className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center">
              Free Demo at Home
              </h3>
              
            </div>

            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              <FaPeopleLine className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center font-Poppins">
              Personalized Learning and Attention 
              </h3>
              
            </div>
          </div>

          <div className="flex flex-col md:flex-row p-6 sm:p-10 md:p-14 space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              < VscFeedback  className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center font-Poppins">
              Monthly Feedback System
              </h3>
              
            </div>

            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              <TbReplaceFilled className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center">
              Teacher Replacement Facility
              </h3>
              
            </div>

            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              <BiMaleFemale className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center font-Poppins">
              Male & Female Tutors
              </h3>
              
            </div>
          </div>



          {/* <div className="flex flex-col md:flex-row p-6 sm:p-10 md:p-14 space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              < FaRupeeSign  className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center font-Poppins">
              Competitive Pay

              </h3>
              <p className="font-normal text-lg md:text-xl text-center font-Poppins p-2">
              We provide experienced tutors at competitive pay so that you can focus on learning.
            </p>
            </div>

            <div className="flex-1 flex flex-col items-center rounded-sm shadow-xl bg-gray-50 p-4">
              <AiOutlineFileSearch className="text-4xl sm:text-5xl text-center text-orange-500" />
              <h3 className="text-lg sm:text-xl font-bold text-center">
              Easy Hiring Process
              </h3>
              <p className="font-normal text-lg md:text-xl text-center font-Poppins p-2">
              <span>Learnosphere</span> simplifies the tedious task of hiring the right tutor near your location by providing relative leads.
            </p>
              
            </div>
          </div> */}

        </div>


        <div className="flex flex-col sm:flex-row items-center justify-center p-6 sm:p-10 md:p-14 space-y-4 sm:space-y-0 sm:space-x-4">

            <div className="flex justify-center">
              <button onClick={sendmail} className="px-20 py-3 font-Poppins bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 capitalize focus:outline-none focus:ring focus:ring-orange-300">              
                Contact us                
              </button>
            </div>
          </div>


          <div className="p-6 sm:p-10 md:p-14">
          <div className="flex flex-col">
            <div className="px-6 sm:px-10 md:px-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center font-Poppins">
              How <span>Learnosphere</span> Works?

              </h2>
            </div>
            <div className="w-16 mt-4 h-1 mx-auto bg-orange-500 rounded-full"></div>
            <p className="font-normal text-lg sm:text-xl text-center p-2 font-Poppins">
            Begin your journey on Learnosphere in 3 simple steps and eliminate the hassle of finding the best home tutors with a convenient hiring process, available to you from anywhere
            </p>
          </div>

          <div className="flex flex-col md:flex-row p-6 sm:p-10 md:p-14 justify-evenly space-y-6 md:space-y-0 md:space-x-6">
            <div className="flex flex-col p-4 mx-3 shadow-xl bg-gray-50 rounded-md">
              <span className="w-6 sm:w-8 md:w-10 text-center items-start border border-black rounded-full ">
                1
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-start font-Poppins">
              Login on <span>Learnosphere</span> App or Contact Us
              </h3>
              <p className="font-normal text-base sm:text-lg text-start font-Poppins">
              Quickly fill in your requirements and other requisite details and let our team connect with you for further discussion.
              </p>
            </div>
            <div className="flex flex-col p-4 mx-3 shadow-xl bg-gray-50 rounded-md">
              <span className="w-6 sm:w-8 md:w-10 text-center items-start border border-black rounded-full ">
                2
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-start font-Poppins">
              Explore Tutors and Book Your Free Demo Class
              </h3>
              <p className="font-normal text-base sm:text-lg text-start font-Poppins">
              Explore professional tutors and book free demo: Once the registration is completed, start finding home tutors avaliable on the Learnosphere app and book your free demo class
              </p>
            </div>
          </div>

          <div className="flex flex-col p-6 sm:p-10 md:px-14 justify-center">
            <div className="flex flex-col p-4 mx-3 shadow-xl bg-gray-50 rounded-md">
              <span className="w-6 sm:w-8 md:w-10 text-center items-start border border-black rounded-full ">
                3
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-start font-Poppins">
              Start Learning with <span>Learnosphere</span>

              </h3>
              <p className="font-normal text-base sm:text-lg text-start font-Poppins">
              Hire the best tutor at home and start your learning journey immediately. Contact us for any further queries
              </p>
            </div>
          </div>
        </div>
         
      

            <div className="flex flex-col p-14">
          {/* Tutor Job By State Section */}
          <div className="flex flex-col p-2">
            <div className="flex flex-col w-full bg-gray-100">
              <div className="flex items-center justify-between p-4">
                <h3 className="text-xl md:text-2xl w-full font-semibold font-Poppins">
                  <Link
                    href=""
                    className="w-full flex items-center justify-between"
                    onClick={clickState}
                  >
                    Find Tutor By State
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
                <h3 className="text-xl md:text-2xl w-full font-semibold">
                  <Link
                    href=""
                    className="w-full flex items-center justify-between"
                    onClick={clickSubject}
                  >
                    Find Tutor By Subject
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
                <h3 className="text-xl md:text-2xl w-full font-semibold font-Poppins">
                  <Link
                    href=""
                    className="w-full flex items-center justify-between"
                    onClick={clickClass}
                  >
                    Find Tutor By Class
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
                    Find Tutor By Job
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
  )
}

export default Studentloginextra
