"use client";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Sociallinks2 from "@/components/Sociallinks2";
import Link from "next/link";

const relatedLinksData = [
  { name: "Class 8 ICSE Maths Worksheets", link: "/ICSE-Related/class-8-icse-maths-worksheets" },
  { name: "ISC Physics Previous Question Papers", link: "/ICSE-Related/isc-physics-previous-question-papers" },
  { name: "ICSE 2017 Question Paper", link: "/ICSE-Related/icse-2017-question-paper" },
  { name: "Concise Physics Class 10 ICSE Pdf", link: "/ICSE-Related/concise-physics-class-10-icse-pdf" },
  { name: "ICSE Sample Papers", link: "/ICSE-Sample-Papers-Page" },
  { name: "Concise Mathematics Class 9 ICSE Guide Pdf", link: "/ICSE-Related/concise-mathematics-class-9-icse-guide-pdf" },
  { name: "ICSE Class 10 Physics Syllabus", link: "/ICSE-Related/icse-class-10-physics-syllabus" },
  { name: "ICSE Class 10 Maths Selina Solutions", link: "/ICSE-Related/icse-class-10-maths-selina-solutions" },
  { name: "ICSE Solved Question Papers Last Ten Years", link: "/ICSE-Related/icse-solved-question-papers-last-ten-years" },
  { name: "ICSE VS CBSE", link: "/ICSE-Related/icse-vs-cbse" },
  { name: "ICSE New Syllabus", link: "/ICSE-Related/icse-new-syllabus" }
];

const ICSERelatedIndex = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 font-Poppins min-h-screen">
        <div className="container mx-auto px-4 md:px-28 pt-32 pb-20">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-8">
              ICSE Related Links
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

export default ICSERelatedIndex;
