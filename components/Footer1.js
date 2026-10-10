"use client";
import React from "react";

import Link from "next/link";
import Image from "next/image";
import Istart from "@/public/iStart-Logo_black.png";
import naps from "@/public/naps_logo_final.png";
import skillindia from "@/public/png-clipart-ministry-of-skill-development-and-entrepreneurship-skill-india-government-of-india-logistics-sector-skill-council-skill-india-logo-text-logo-thumbnail-removebg-preview.png";
import playstore from "@/public/playstore.svg";
import Apple_Store_logo from "@/public/Apple_Store_logo.png";
import { trackEvent } from '../src/lib/eventTracker';
import { useSession } from 'next-auth/react';



const Footer1 = () => {
    const { data: session, status } = useSession();

  // Returns user fields if logged in, or marks event as guest
  const getUserData = () => {
    if (status === 'authenticated' && session?.user) {
      return {
        name:  session.user.name  || session.user.firstname || null,
        email: session.user.email || null,
      };
    }
    return { user_type: 'guest' };
  };

  // Single handler fired by every footer link / button
  const handleFooterClick = (label, href) => {
    const eventName = `FOOTER_${label.replace(/[^A-Za-z0-9]/g, '_').replace(/_+/g, '_').toUpperCase()}_CLICK`;
    
    trackEvent(eventName, {
      link_label:    label,
      link_href:     href,
      section:       'footer',
      ...getUserData(),
    });
  };
  const socialMediaLinks = [
    {
      platform: "Instagram",
      link: "https://www.instagram.com/learnosphere/",
      imageSrc: "/insta.webp",
    },
    {
      platform: "Facebook",
      link: "https://www.facebook.com/profile.php?id=61569139742328",
      imageSrc: "/facebook.svg",
    },
    {
      platform: "mail",
      link: "mailto:info@learnosphere.in",
      imageSrc: "/mail.svg",
    },
    {
      platform: "LinkedIn",
      link: "https://www.linkedin.com/company/learnosphere-in?trk=public_profile_topcard-current-company&originalSubdomain=in",
      imageSrc: "/linkedin.svg",
    },
  ];

  return (
    <div className="z-0 md:mt-5 relative sm:overflow-x-auto scrollbar-hide wrapper bg-stone-300 border-b-2 border-b-slate-700  position:fixed">
      <div className="flex flex-col items-start md:flex-row  flex-shrink-0 justify-around gap-6 p-3 md:p-10 pt-8">
        <div className="flex flex-col gap-2 w-full md:w-2/6 ">
          <div className=" h-full w-full md:h-2/6 md:my-2">
            <h2 className="text-2xl text-black font-extrabold font-Poppins">
              Learn<b className="text-orange-600  font-Poppins">O</b>sphere.in
            </h2>
            <p className="text-[.7em] md:text-[.8em]text-black py-4 font-light text-balance  font-Poppins">
              {" "}
              As a business part of:
            </p>
            <h2 className="text-lg text-slate-700 font-bold font-Poppins">
              KAROTARAJ&nbsp; EDU&nbsp; CONSULTANT&nbsp; PRIVATE&nbsp; LIMITED
            </h2>
            <p className="text-[.7em] md:text-[.8em] text-black py-2 font-light text-balance font-Poppins">
              revolutionizes the way students access education by bringing
              qualified educators directly to their homes with just one click
            </p>
            {/* <div>
              <h3 className="text-lg text-slate-700 pl-3 font-bold font-Poppins">
                Address of Head office:
              </h3>
              <p className="text-[.7em] md:text-[.8em]text-black p-2 pl-3 font-light text-balance  font-Poppins">
                22 b, Sachivalaya Vihar, Kalyanpura, vistar, Jaipur, Rajasthan
                302020
              </p>
            </div> */}
       
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pl-3 mt-3">
                {/* Play Store Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 rounded-md px-4 py-2 text-white shadow-lg"
                >
                  <Image
                    src={playstore}
                    alt="Get it on Google Play"
                    width={30}
                    height={30}
                  />
                  <div className="text-left">
                    <p className="text-[10px] uppercase opacity-80">
                      Get it on
                    </p>
                    <p className="text-base font-bold leading-none">
                      Google Play
                    </p>
                  </div>
                </a>

                {/* App Store Button */}
                <a
                  href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 rounded-md px-4 py-2 text-white shadow-lg"
                >
                  <Image
                    src={Apple_Store_logo}
                    alt="Download on the App Store"
                    width={30}
                    height={30}
                  />
                  <div className="text-left">
                    <p className="text-[10px] uppercase opacity-80">
                      Download on the
                    </p>
                    <p className="text-base font-bold leading-none">
                      App Store
                    </p>
                  </div>
                </a>
              </div>
        
            <div className="mt-5">
              <h2 className="text-slate-700  text-xl font-bold  font-Poppins">
                Let's get social:
              </h2>
              <div className="flex items-center justify-start gap-5 mt-3">
                {socialMediaLinks.map((socialMedia, index) => (
                  <div key={index} className="h-[40px] w-[40px]">
                    <a
                      href={socialMedia.link}
                      target="_blank"
                      rel="noreferrer"
                      className=""
                      onClick={(e) => { e.stopPropagation(); handleFooterClick(socialMedia.platform, socialMedia.link); }}
                    >
                      <Image
                        src={socialMedia.imageSrc}
                        alt={socialMedia.platform}
                        width={50}
                        height={50}
                      />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 md:gap-4 mt-6">
            <div className="flex flex-col md:m-2 w-full md:w-[40%]  gap-1  md:gap-3">
              <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
                Practice Quiz
              </h3>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-1"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-1 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-2"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-2 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-3"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-3 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-4"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-4 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-5"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-5 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-6"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-6 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-7"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-7 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-8"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-8 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-9"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-9 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-10"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-10 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-11"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-11 Quiz
              </Link>
              <Link
                href="/Online-Quiz/Certification-Quiz-For-Class-12"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                CBSE Class-12 Quiz
              </Link>
              <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
                Exam Preparation For Class 12
              </h3>
              <Link
                href="/CBSE/Class-12-Math"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Mathematics
              </Link>
              <Link
                href="/CBSE/Class-12-Physics"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Physics
              </Link>
              <Link
                href="/CBSE/Class-12-Chemistry"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Chemistry
              </Link>
              <Link
                href="/CBSE/Class-12-Biology"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Biology
              </Link>
              <Link
                href="/CBSE/Class-12-English"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                English
              </Link>
              <Link
                href="/CBSE/Class-12-Hindi"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Hindi
              </Link>
              <Link
                href="/CBSE/Class-12-BussinessStudies"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Bussiness Studies
              </Link>
              <Link
                href="/CBSE/Class-12-Accountancy"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Accountancy
              </Link>
              <Link
                href="/CBSE/Class-12-PoliticalScience"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Political Science
              </Link>
              <Link
                href="/CBSE/Class-12-Economics"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Economics
              </Link>
            </div>
            <div className="flex flex-col   w-full md:w-64 gap-1 md:gap-3">
              <Link href="/State_Board">
                <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
                  State Board
                </h3>
              </Link>
              <Link
                href="/State_Board/APBSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Andhra Pradesh Board (BSEAP)
              </Link>
              <Link
                href="/State_Board/DSEAP"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Arunachal Pradesh Board (DSEAP)
              </Link>
              <Link
                href="/State_Board/SEBA"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Assam Board (SEBA)
              </Link>
              <Link
                href="/State_Board/BSEB"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Bihar Board (BSEB)
              </Link>
              <Link
                href="/State_Board/CGBSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Chhattisgarh Board (CGBSE)
              </Link>
              <Link
                href="/State_Board/GBSHSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Goa Board (GBSHSE)
              </Link>
              <Link
                href="/State_Board/GSEB"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Gujarat Board (GSEB)
              </Link>
              <Link
                href="/State_Board/BSEH"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Haryana Board (BSEH)
              </Link>
              <Link
                href="/State_Board/HPBOSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Himachal Pradesh (HPBOSE)
              </Link>
              <Link
                href="/State_Board/JAC"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Jharkhand Board (JAC)
              </Link>
              <Link
                href="/State_Board/KSEEB"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Karnataka Board (KSEAB)
              </Link>
              <Link
                href="/State_Board/KBPE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Kerala Board (KBPE)
              </Link>
              <Link
                href="/State_Board/MPBSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Madhya Pradesh Board (MPBSE)
              </Link>
              <Link
                href="/State_Board/MSBSHSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Maharashtra State Board (MSBSHSE)
              </Link>
              <Link
                href="/State_Board/MANIPUR"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Manipur Board (BSEM)
              </Link>
              <Link
                href="/State_Board/MBOSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Meghalaya Board (MBOSE)
              </Link>
              <Link
                href="/State_Board/MBSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Mizoram Board (MBSE)
              </Link>
              <Link
                href="/State_Board/NBSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Nagaland Board (NBSE)
              </Link>
              <Link
                href="/State_Board/PSEB"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Punjab Board (PSEB)
              </Link>
              <Link
                href="/State_Board/RBSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Rajasthan Board (RBSE)
              </Link>
              <Link
                href="/State_Board/TNSB"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Tamil Nadu Board (TNBS)
              </Link>
              <Link
                href="/State_Board/BSE_Telangana"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Telangana Board (BSE Telangana)
              </Link>
              <Link
                href="/State_Board/TBSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Tripura Board (TBSE)
              </Link>
              <Link
                href="/State_Board/UPMSP"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Uttar Pradesh Board (UPMSP)
              </Link>
              <Link
                href="/State_Board/UBSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Uttarakhand Board (UBSE)
              </Link>
              <Link
                href="/State_Board/WBBSE"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                West Bengal Board (WBBSE)
              </Link>
              <Link
                href="/State_Board/BSE_Odi"
                className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              >
                Odisha Board (BSE Odisha)
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-1 md:gap-3 mt-2"></div>
          <div className="flex flex-col  m-2 gap-1 absolute bottom-0 md:relative md:gap-3">
            <div className="flex gap-1">
              <div>
                <Image
                  className="h-12 w-32 object-contain"
                  src={Istart}
                  alt="iStart Image "
                />
              </div>
              <div>
                <Image
                  className="h-16 w-32 object-contain"
                  src={naps}
                  alt="Naps Img"
                />
              </div>
              <div>
                <Image
                  className="h-16 w-32 object-contain"
                  src={skillindia}
                  alt="Skillindia Image"
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-wrap flex-col gap-2">
          <div className="flex flex-col  gap-1 md:gap-3">
            <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              Get Started
            </h3>
            <Link
              href="/Student" onClick={(e) => { e.stopPropagation(); handleFooterClick('Book educator', '/Student'); }}
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Book educator
            </Link>
            <Link
               href="/jobs-for-home-tutors" onClick={(e) => { e.stopPropagation(); handleFooterClick('Become educator', '/jobs-for-home-tutors'); }}
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Become educator
            </Link>
            <Link
              href="/Blogs"
              onClick={(e) => { e.stopPropagation(); handleFooterClick('Blogs', '/Blogs'); }}
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Blogs
            </Link>
            <Link
             href="/Careers"
                onClick={(e) => { e.stopPropagation(); handleFooterClick('Careers', '/Careers'); }}
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Careers
            </Link>
            <Link
             href="/live-one-to-one"
                onClick={(e) => { e.stopPropagation(); handleFooterClick('Live one to one Classes', '/live-one-to-one'); }}
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Live one to one Classes
            </Link>
          </div>

          <div className="flex flex-col gap-1 md:gap-3 md:pl-0 md:pt-3">
            <h2 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              Tutors Available
            </h2>
            <Link
              href="/CBSE/lkg"
              className="text-black text-[.7em] md:text-[.8em]capitalize  font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Best Tutor for class LKG to 3rd
            </Link>

            <Link
              href="/CBSE/Class-4"
              className="text-black text-[.7em] md:text-[.8em]capitalize  font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Best Tutor for class 4th to 7th
            </Link>
            <Link
              href="/CBSE/Class-8"
              className="text-black text-[.7em] md:text-[.8em]capitalize  font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Best Tutor for class 8th to 9th
            </Link>
            <Link
              href="/CBSE-10thsyllabus"
              className="text-black text-[.7em] md:text-[.8em]capitalize  font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Best Tutor for class 10th
            </Link>
            <Link
              href="/CBSE-11thsyllabus"
              className="text-black text-[.7em] md:text-[.8em]capitalize  font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Best Tutor for class 11th and 12th
            </Link>
            {
              // <Link
              //   href="/pages/iitjee"
              //   className="text-black text-[.7em] md:text-[.8em]capitalize  font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              // >
              //   Best Tutor for IIT-JEE & NEET
              // </Link>
            }
          </div>
          <div className="flex flex-col mt-3 gap-1 md:gap-3">
            <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              CBSE Sample Papers
            </h3>
            <Link
              href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-8-Maths"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Sample Papers For Class-8
            </Link>
            <Link
              href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-9-Maths"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Sample Papers For Class-9
            </Link>
            <Link
              href="/CBSE-Sample-Papers/CBSE-Class-10-Maths-Sample-Paper-Basic-and-Standard"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Sample Papers For Class-10
            </Link>
            <Link
              href="/CBSE-Sample-Papers/CBSE-Sample-Papers-for-Class-11-Maths"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Sample Papers For Class-11
            </Link>

            <Link
              href="/Class-12-Sample-ppr-CBSE"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Sample Papers For Class-12
            </Link>
          </div>
          <div className="flex flex-col mt-3 gap-1 md:gap-3">
            <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              ICSE Sample Papers
            </h3>
            <Link
              href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-8-Maths"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              ICSE Sample Papers For Class-8
            </Link>
            <Link
              href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-9-Maths"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              ICSE Sample Papers For Class-9
            </Link>
            <Link
              href="/icse-sample-papers/ICSE-Sample-Papers-for-Class-10-Maths"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              ICSE Sample Papers For Class-10
            </Link>
            <Link
              href="/icse-sample-papers/ISC-Sample-Papers-for-Class-11-Maths"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              ICSE Sample Papers For Class-11
            </Link>

            <Link
              href="/icse-sample-papers/ISC-Sample-Papers-for-Class-12-Maths"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              ICSE Sample Papers For Class-12
            </Link>
          </div>
          <div className="flex flex-col mt-3  w-64 gap-1 md:gap-3">
            <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              Exam Preparation For Class 10
            </h3>
            <Link
              href="/CBSE/Class-10-Math"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Mathematics
            </Link>
            <Link
              href="/CBSE/Class-10-Science"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Science
            </Link>
            <Link
              href="/CBSE/Class-10-SocialScience"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Social Science
            </Link>
            <Link
              href="/CBSE/Class-10-English"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              English
            </Link>
            <Link
              href="/CBSE/Class-10-Hindi"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Hindi
            </Link>
          </div>
          <div className="flex flex-col w-60  gap-1 md:gap-3 md:pl-0">
            <h2 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold mt-2 font-Poppins">
              Study material
            </h2>
            <Link
              href="/roman-numerals"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Roman Numerals
            </Link>
            <Link
              href="/CBSE"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE
            </Link>
            <Link
              href="/MathsFormula"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Math Formulas
            </Link>
            <Link
              href="/CBSE-Sample-Papers"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Sample Papers
            </Link>
            <Link
              href="/CBSE-Sample-Question-Paper"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Sample Question Papers
            </Link>
            <Link
              href="/Cbse-Previosyear-Questions"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Previous Year Questions
            </Link>
            <Link
              href="/CBSE-Previousyear-Question-Papers-"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Previous Year Question Papers
            </Link>
            <Link
              href="/icse-sample-papers"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              ICSE Sample Papers
            </Link>
            <Link
              href="/ICSE-Previousyear-Questions"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              ICSE Previous Year Questions
            </Link>
            <Link
              href="/ICSE-Previous-Question-Paper"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              ICSE Previous Year Question Papers
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap md:flex-col ">
          <div className="flex flex-col gap-1 md:gap-3">
            <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              Syllabus
            </h3>
            <Link
              href="/CBSE/Class-1"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 1
            </Link>
            <Link
              href="/CBSE/Class-2"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 2
            </Link>
            <Link
              href="/CBSE/Class-3"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 3
            </Link>
            <Link
              href="/CBSE/Class-4"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 4
            </Link>
            <Link
              href="/CBSE/Class-5"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 5
            </Link>
            <Link
              href="/CBSE/Class-6"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 6
            </Link>
            <Link
              href="/CBSE/Class-7"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 7
            </Link>
            <Link
              href="/CBSE/Class-8"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 8
            </Link>
            <Link
              href="/CBSE/Class-9"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 9
            </Link>
            <Link
              href="/CBSE-10thsyllabus"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 10
            </Link>
            <Link
              href="/CBSE-11thsyllabus"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 11
            </Link>
            <Link
              href="/CBSE-12thsyllabus"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Class - 12
            </Link>
            {
              // <Link
              //   href="/pages/iitjee"
              //   className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              // >
              //   IIT-JEE
              // </Link>
              // <Link
              //   href="/pages/iitneet"
              //   className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              // >
              //   NEET
              // </Link>
              // <Link
              //   href="/pages/upsc"
              //   className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              // >
              //   UPSC
              // </Link>
              // <Link
              //   href="/pages/ssc"
              //   className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              // >
              //   SSC
              // </Link>
              // <Link
              //   href="/pages/bank"
              //   className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
              // >
              //   Banking
              // </Link>
            }
          </div>

          <div className="flex flex-col w-60 gap-1 md:gap-3 md:pl-0 px-6">
            <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold mt-2 font-Poppins">
              Formula
            </h3>
            <Link
              href="/MathsFormula/Maths-Formulas-For-Class-6"
              className="text-black text-[.7em] md:text-[.8em]  font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Maths Formula For Class 6
            </Link>
            <Link
              href="/MathsFormula/Maths-Formulas-For-Class-7"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Maths Formula For Class 7
            </Link>
            <Link
              href="/MathsFormula/Maths-Formulas-For-Class-8"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Maths Formula For Class 8
            </Link>
            <Link
              href="/MathsFormula/Maths-Formulas-For-Class-9"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Maths Formula For Class 9
            </Link>
            <Link
              href="/MathsFormula/Maths-Formulas-For-Class-10"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Maths Formula For Class 10
            </Link>
            <Link
              href="/MathsFormula/Maths-Formulas-For-Class-11"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Maths Formula For Class 11
            </Link>
            <Link
              href="/MathsFormula/Maths-Formulas-For-Class-12"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Maths Formula For Class 12
            </Link>
          </div>
          <div className="flex flex-col w-60  gap-1 md:gap-3 md:pl-0">
            <h2 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold mt-4 font-Poppins">
              Courses
            </h2>
            <Link
              href="/Courses/class-12-pcm-6874f1d6a4298b45d8043a62"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 12 PCM
            </Link>
            <Link
              href="/Courses/class-12-pcb-68775159fbc9eb6a9b937530"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 12 PCB
            </Link>
            <Link
              href="/Courses/class-12-commerce-68775d2ffbc9eb6a9b9377e1"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 12 Commerce
            </Link>
            <Link
              href="/Courses/class-11-pcm-687760f4fbc9eb6a9b937914"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 11 PCM
            </Link>
            <Link
              href="/Courses/class-11-pcb-6877645efbc9eb6a9b93838c"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 11 PCB Foundation Course
            </Link>
            <Link
              href="/Courses/class-11-business-studies-accountancy-economics-6889d8cdc7f80001f3aa5654"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 11 Complete Course
            </Link>
            <Link
              href="/Courses/class-10-maths,science,social-science-68778960fbc9eb6a9b938bfc"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 10 Complete Course
            </Link>
            <Link
              href="/Courses/class-9-maths,science,social-science-68789610798291bd763ec46a"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 9 Complete Course
            </Link>
            <Link
              href="/Courses/children/class-8-maths,science,social-science-6878b4e982ff71d850fc4219"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 8 Complete Course
            </Link>
            <Link
              href="/Courses/children/class-7-maths,science,social-science-6878b5f182ff71d850fc426d"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 7 Complete Course
            </Link>
            <Link
              href="/Courses/children/class-6-maths,science,social-science-6878d67782ff71d850fc5fab"
              className="text-black text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Class 6 Complete Course
            </Link>
          </div>
          <div className="flex flex-col gap-1 md:gap-3 md:pl-0 md:pt-3">
            <h2 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              Our Products
            </h2>
            <a
              href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
              target="_blank"
              rel="noopener noreferrer"
                 onClick={(e) => { e.stopPropagation(); handleFooterClick('Learnosphere Learning App', 'https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main'); }}
              className="text-black text-[.8em] md:text-[.8em]capitalize  font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Learnosphere Learning App
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app"
              target="_blank"
              rel="noopener noreferrer"
               onClick={(e) => { e.stopPropagation(); handleFooterClick('Learnosphere Tutor App', 'https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app'); }}
              className="text-black text-[.8em] md:text-[.8em]capitalize  font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Learnosphere Tutor App
            </a>
          </div>
        </div>
        <div className="flex gap-2 mb-14 md:mb-0 flex-col">
          <div className="flex flex-col gap-1 md:gap-3">
            <h2 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              Services
            </h2>

            <Link
              href="/Student"
                 onClick={(e) => { e.stopPropagation(); handleFooterClick('Search nearby educators', '/Student'); }}
              className="text-black  font-Poppins text-[.7em] md:text-[.8em]font-light hover:text-orange-500 hover:font-semibold "
            >
              Search nearby educators{" "}
            </Link>
            <Link
              href="/CBSE-10thsyllabus"
                onClick={(e) => { e.stopPropagation(); handleFooterClick('Cbse Board Exams(10th & 12th)', '/CBSE-10thsyllabus'); }}
              className="text-black  font-Poppins text-[.7em] md:text-[.8em]font-light hover:text-orange-500 hover:font-semibold "
            >
              {" "}
              Cbse Board Exams(10th & 12th){" "}
            </Link>
            {
              // <Link
              //   href="/pages/olympiad"
              //   className="text-black  font-Poppins text-[.7em] md:text-[.8em]font-light hover:text-orange-500 hover:font-semibold "
              // >
              //   Olympiad Exams(All categories available){" "}
              // </Link>
              // <Link
              //   href="/pages/navodiya"
              //   className="text-black  font-Poppins text-[.7em] md:text-[.8em]font-light hover:text-orange-500 hover:font-semibold "
              // >
              //   {" "}
              //   Novodaya Vidyalaya Entrance Exam{" "}
              //   </Link>
              //   <Link
              //   href="/pages/sainik"
              //   className="text-black  font-Poppins text-[.7em] md:text-[.8em]font-light hover:text-orange-500 hover:font-semibold "
              //   >
              //   Sainik School Entrance Exam
              //   </Link>
              //   <div className="flex flex-col gap-1 md:gap-3">
              //   <h2 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              //     Join Our Campaign
              //   </h2>
              //   <Link
              //     href="https://sarvgyat.learnosphere.in/"
              //     target="0"
              //     className="text-orange-600 font-semibold  font-Poppins text-[.7em] md:text-[.8em]  hover:text-orange-500 hover:font-semibold "
              //   >
              //     {" "}
              //     Sarvgyat
              //   </Link>
              // </div>
            }
          </div>
          <div className="flex flex-col md:my-2 w-64 gap-1 md:gap-3">
            <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              ICSE Previous Year Question Papers
            </h3>
            <Link
              href="/ICSE-Previousyear-Questions/ICSE-Class-10-Maths-Previous-Year-Paper"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              ICSE Previous Year Question Papers For Class-10
            </Link>

            <Link
              href="/ICSE-Previousyear-Questions/ISC-Class-12-Maths-Previous-Year-Question-Papers"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              ISC Previous Year Question Papers For Class-12
            </Link>
          </div>
          <div className="flex flex-col md:my-2 w-64 gap-1 md:gap-3">
            <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold font-Poppins">
              CBSE Previous Year Question Papers
            </h3>
            <Link
              href="/Cbse-Previosyear-Questions/CBSE-Class-10-Maths-Previous-Year-Papers"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Previous Year Question Papers For Class-10
            </Link>

            <Link
              href="/Cbse-Previosyear-Questions/CBSE-Previous-Year-Question-Paper-for-Class-12-Maths"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              CBSE Previous Year Question Papers For Class-12
            </Link>
          </div>
          <div className="flex flex-col md:my-2 w-64 gap-1 md:gap-3">
            <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              Exam Preparation For Class 11
            </h3>
            <Link
              href="/CBSE/Class-11-Math"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Mathematics
            </Link>
            <Link
              href="/CBSE/Class-11-Physics"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Physics
            </Link>
            <Link
              href="/CBSE/Class-11-Chemistry"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Chemistry
            </Link>
            <Link
              href="/CBSE/Class-11-Biology"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Biology
            </Link>
            <Link
              href="/CBSE/Class-11-English"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              English
            </Link>
            <Link
              href="/CBSE/Class-11-Hindi"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Hindi
            </Link>
            <Link
              href="/CBSE/Class-11-BussinessStudies"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Bussiness Studies
            </Link>
            <Link
              href="/CBSE/Class-11-Accountancy"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Accountancy
            </Link>
            <Link
              href="/CBSE/Class-11-PoliticalScience"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Political Science
            </Link>
            <Link
              href="/CBSE/Class-11-Economics"
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Economics
            </Link>
          </div>
          <div className="flex flex-col md:my-2  w-64 gap-1 md:gap-3">
            <h3 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              Become Educator
            </h3>
            <Link
               href="/become-a-tutor" onClick={(e) => { e.stopPropagation(); handleFooterClick('Tutor Jobs', '/become-a-tutor'); }}
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Tutor Jobs
            </Link>
            <Link
              href="/part-time-tutor-jobs"
                onClick={(e) => { e.stopPropagation(); handleFooterClick('Part Time Jobs', '/part-time-tutor-jobs'); }}
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Part Time Jobs
            </Link>
            <Link
              href="/Refer&Earn"
                onClick={(e) => { e.stopPropagation(); handleFooterClick('Refer & Earn', '/Refer&Earn'); }}
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Refer & Earn
            </Link>
            <Link
              href="/SkillEnhancement"
               onClick={(e) => { e.stopPropagation(); handleFooterClick('Skill Enhancement', '/SkillEnhancement'); }}
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Skill Enhancement
            </Link>
            <Link
              href="/join-as-teacher"
               onClick={(e) => { e.stopPropagation(); handleFooterClick('Join as a Tutor', '/join-as-teacher'); }}
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Join as a Tutor
            </Link>
            <Link
              href="/earning-&-payouts"
              onClick={(e) => { e.stopPropagation(); handleFooterClick('Earn and Payouts', '/earning-&-payouts'); }}
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Earn and Payouts
            </Link>
            <Link
              href="/resource-&-support"
               onClick={(e) => { e.stopPropagation(); handleFooterClick('Resource & Support', '/resource-&-support'); }}
              className="text-black  text-[.7em] md:text-[.8em] font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Resource & Support
            </Link>
          </div>
          <div className="flex flex-col gap-1 md:gap-3 md:pl-0 md:pt-3">
            <h2 className="text-slate-700 text-[1em] md:text-[1.2em] font-bold  font-Poppins">
              Other Links
            </h2>
            <Link
              href="/middle-east"
               onClick={(e) => { e.stopPropagation(); handleFooterClick('Middle East', '/middle-east'); }}
              className="text-black text-[.8em] md:text-[.8em]capitalize  font-Poppins font-light hover:text-orange-500 hover:font-semibold "
            >
              Middle East
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer1;
