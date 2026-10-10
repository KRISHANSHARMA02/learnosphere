"use client";
import Navbar from "@/components/Navbar";
import React, { useEffect } from "react";
import Link from "next/link";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";

const relatedLinksData = [
  { name: "CBSE Books For Class 11", link: "/Cbse-Notes/cbse-books-for-class-11" },
  { name: "CBSE Syllabus For Class 10 Math", link: "/CBSE/Class-10-Math" },
  { name: "CBSE Previous Question Paper For Class 10", link: "/Cbse-Previosyear-Questions" },
  { name: "Extra Question For Class 9 Science", link: "/Cbse-Notes/extra-question-for-class-9-science" },
  { name: "Parabola", link: "/Cbse-Notes/parabola" },
  { name: "Coordination Compounds Class 12 Notes", link: "/Cbse-Notes/coordination-compounds-class-12-notes" },
  { name: "Class 6", link: "/CBSE/Class-6" },
  { name: "Maths Formula For Class 12", link: "/MathsFormula/class-12" },
  { name: "Combustion And Flame Class 8 Important Questions", link: "/Cbse-Notes/combustion-and-flame-class-8-important-questions" },
  { name: "CBSE Class 9 Exam Prep Tips", link: "/Cbse-Notes/cbse-class-9-exam-prep-tips" }
];

const CBSERelatedIndex = () => {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 font-Poppins min-h-screen">
        <div className="container mx-auto px-4 md:px-28 pt-32 pb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-8">
              CBSE Related Links
            </h1>
            
            <div className="flex flex-wrap gap-4 w-full mb-10">
              {relatedLinksData.map((item, index) => (
                <div
                  key={index}
                  className="w-full md:w-[48%] p-4 bg-gray-100 border border-gray-200 rounded-lg font-semibold text-orange-600 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-150 shadow-sm flex items-center cursor-pointer justify-center text-center"
                >
                  <Link 
                    href={item.link} 
                    className="w-full h-full block"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
      
      <Sociallinks2 />
      <Footer1 />
      <Footer />
    </>
  );
};

export default CBSERelatedIndex;

