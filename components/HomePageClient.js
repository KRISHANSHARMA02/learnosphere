"use client";
import React, { useEffect, Suspense, lazy, useState } from "react";

import Navbar from "@/components/Navbar";

const Home = lazy(() => import("@/components/Home"));
import About from "@/components/About";
import Benifits from "@/components/Benifits";

import Footer1 from "@/components/Footer1";
import Sociallinks2 from "@/components/Sociallinks2";
import Uparrow2 from "@/components/Uparrow";
import Guaranty from "@/components/Guaranty";
import Whyus from "@/components/Whyus";
import Buttoncard from "@/components/Buttoncard";
import Card1 from "@/components/Card1";
import Exam1 from "@/components/Exam1";
import Exam2 from "@/components/Exam2";
import Exam3 from "@/components/Exam3";
import Exam4 from "@/components/Exam4";
import Faqs from "@/components/Faqs";
import Brandapp from "@/components/Brandapp";
import Quizbutton from "@/components/Quizbutton";
import Trends from "@/components/Trends";
import QR from "@/components/QR";
import WhatsappModal from "@/components/whatsappModal";

import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "@/components/Footer";
import Slider from "@/components/CourseSlider";
import Popup from "@/components/Popup";
import IconMarquee from "@/components/IconsSlider";
import ParaCards from "@/components/Card2Para";
import OneToOneHomeSection from "@/components/OneToOne"
import Chatbot from "@/components/Chatbot";

// import Footer from "@/components/Footer";

const Page = ({ initialSlides }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 400,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Sociallinks2 />

      <Suspense>
        <Home initialSlides={initialSlides} />
      </Suspense>
      <div className="lg:max-w-[1400px] mx-auto">
        <div data-aos="fade-up">
          <About />
        </div>
        
      <div data-aos="fade-up">
        <OneToOneHomeSection />
      </div>
      
        {/* ✅ Insert Popup here */}
        <Popup />
        <div data-aos="fade-up">
          <Exam1 />
        </div>
        <div data-aos="fade-up">
          <Exam2 />
        </div>
        <div data-aos="fade-up">
          <Exam3 />
        </div>
        <div data-aos="fade-up">
          <Exam4 />
        </div>
        <div data-aos="fade-up">
          <Slider />
        </div>
        <div data-aos="fade-up">
          <Quizbutton />
        </div>
        <div data-aos="fade-up">
          <Buttoncard />
        </div>
        <div data-aos="fade-up">
          <Card1 />
        </div>

        <div data-aos="fade-up">
          <Whyus />
        </div>

        <div data-aos="fade-up">
          <Brandapp />
        </div>
        <div data-aos="fade-up">
          <Trends />
        </div>

        <div data-aos="fade-up">
          <Benifits />
        </div>
        <div data-aos="fade-up">
          <ParaCards />
        </div>
        <div data-aos="fade-up">
          <Guaranty />
        </div>
        <div data-aos="fade-up">
          <IconMarquee />
        </div>
        <div data-aos="fade-up">
          <Faqs />
        </div>
      </div>

       <Chatbot />
      {/* <Uparrow2 /> */}
      <div data-aos="fade-up">
        <Footer1 />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
