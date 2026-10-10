"use client";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function BusinessStudies11th() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");
  const [hasDownloaded, setHasDownloaded] = useState(false); // Track if a PDF has been downloaded

  useEffect(() => {
    // Check session storage to see if the form has been filled
    const hasFilledForm = sessionStorage.getItem("hasFilledForm") === "true";
    setHasDownloaded(hasFilledForm);
  }, []);

  const handleDownloadClick = async (pdfUrl) => {
    setSelectedPdf(pdfUrl);
    if (!hasDownloaded) {
      setIsModalOpen(true);
    } else {
      await downloadPdf(pdfUrl); // Download directly
    }
  };

  const downloadPdf = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = url.split("/").pop();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleFormSubmit = (formData) => {
    setIsModalOpen(false);
    setHasDownloaded(true); // Update state

    // Set session storage to indicate form has been filled
    sessionStorage.setItem("hasFilledForm", "true");

    // Trigger PDF download
    downloadPdf(selectedPdf);
  };

  return (
    <div>
      <Navbar />
      <div className="p-0 md:p-12 flex flex-col font-Poppins justify-center mt-12">
        <div>
          <h1 className="p-4 text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Class 11 Business Studies Syllabus
          </h1>
        </div>
        <div className="flex flex-col md:flex-row pt-2">
          <div className="w-full text-center pt-6">
            <p className="p-4">
              The CBSE Class 11 Business Studies syllabus provides a broad
              overview of fundamental business concepts and practices...
            </p>
            <p className="p-2">
              The CBSE Class 11 Business Studies syllabus provides a
              comprehensive exploration of core business principles...
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg text-center w-full md:w-[60%] m-auto text-2xl bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent from-orange-500 to-red-600">
            A Comprehensive Guide for Class 11th Business Studies
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8">
            <div className="flex flex-col gap-4 w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black flex items-center gap-1 text-[1.1em]">
                <FaBook className="text-orange-500" size={20} />
                Business Studies
              </p>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Bussiness/Business, Trade, And Commerce.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                Business, Trade, And Commerce
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Bussiness/Forms of Business Organisation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>Forms
                of Business Organisation
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Bussiness/Private, Public and Global Enterprises.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Private, Public and Global Enterprises
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Bussiness/Business Services.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Business Services
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Bussiness/Emerging Modes of Business.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Emerging Modes of Business
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
            </div>
            <div className="flex flex-col gap-4 w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Bussiness/Social Responsibilities of Business and Business Ethics.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Social Responsibilities of Business and Business Ethics
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Bussiness/Formation of a Company.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Formation of a Company
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Bussiness/Sources of Business Finance.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>
                Sources of Business Finance
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Bussiness/MSME and Business Entrepreneurship.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>MSME
                and Business Entrepreneurship
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Bussiness/Internal Trade.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>
                Internal Trade
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Bussiness/International Business.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                International Business
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer1 />
      <Footer />
      <DownloadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

// import React from 'react'
// import Footer1 from '@/components/Footer1';
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { ImBook } from 'react-icons/im';
// import { FaBook } from 'react-icons/fa';
// export default function BussinessStudies11th
//     () {
//     return (
//         <div>
//           <Navbar />
//             <div className="p-0 md:p-12  flex flex-col font-Poppins justify-center mt-12">
//                 <div className="">
//                     <h1 className='p-4  text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto'>CBSE Class 11 Bussiness Studies Syllabus </h1>
//                 </div>
//                 <div className='flex flex-col md:flex-row pt-2'>
//                 <div className=" w-full  text-center pt-6">

//                 <p className="p-4">
//                 The CBSE Class 11 Business Studies syllabus provides a broad overview of fundamental business concepts and practices. It introduces students to the nature and purpose of business, including types of business organizations, their management, and operations. The curriculum covers various aspects such as business environment, entrepreneurship, and the role of business in economic development. Topics like business ethics, social responsibility, and the impact of technology on business are explored. Students gain insights into management functions, marketing, finance, and human resource management, aiming to build a strong foundation for understanding how businesses operate and thrive in a dynamic environment.</p>
//                     <p className=' p-2'>

// The CBSE Class 11 Business Studies syllabus provides a comprehensive exploration of core business principles and practices, aimed at equipping students with a foundational understanding of the business world. It begins with an introduction to the nature and scope of business, emphasizing the roles and functions of various types of business organizations, including sole proprietorships, partnerships, and corporations. The curriculum delves into the business environment, highlighting the impact of economic, social, and legal factors on business operations. Students explore key concepts such as entrepreneurship, management functions, and organizational structure, gaining insights into planning, organizing, leading, and controlling business activities. The syllabus also covers marketing management, including strategies for product promotion, pricing, and distribution, as well as financial management, focusing on budgeting, accounting, and investment decisions. Additionally, the course addresses human resource management, emphasizing recruitment, training, and employee welfare, along with business ethics and social responsibility, stressing the importance of ethical practices and corporate governance. Through this broad spectrum of topics, the Class 11 Business Studies curriculum aims to provide students with a robust understanding of how businesses function and succeed in todays competitive and dynamic environment.</p>

//                 </div>
//               </div>
//               <div className='flex flex-col gap-5'>
//               <p className='font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg text-center   w-full md:w-[60%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  '>A Comprehensive Guide for Class 11th Bussiness Studies </p>
//               <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
//               <div className=' flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200'>
//               <p className='font-bold text-black  flex items-center gap-1 text-[1.1em] '>
//                 <FaBook className='text-orange-500 ' size={20} />Bussiness Studies</p>

//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs101.pdf" download='/kebs101.pdf'><span className='font-bold text-[1em]'>Chapter - 1 :</span>Bussiness,Trade And Commerce  </a>
//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs102.pdf" download='/kebs102.pdf'><span className='font-bold text-[1em]'>Chapter - 2 :</span> Forms of Business Organisation </a>
//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs103.pdf" download='/kebs103.pdf'><span className='font-bold text-[1em]'>Chapter - 3 :</span>Private, Public and Global Enterprises  </a>
//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs104.pdf" download='/kebs104.pdf'><span className='font-bold text-[1em]'>Chapter - 4 :</span> Business Services </a>
//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs105.pdf" download='/kebs105.pdf'><span className='font-bold text-[1em]'>Chapter - 5 :</span>Emerging Modes of Business  </a>
//               </div>
//               <div className=' flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200'>
//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs106.pdf" download='/kebs106.pdf'><span className='font-bold text-[1em]'>Chapter - 6 :</span> Social Responsibilities of Business and Business Ethics  </a>
//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs107.pdf" download='/kebs107.pdf'><span className='font-bold text-[1em]'>Chapter - 7 :</span> Formation of a Company </a>
//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs108.pdf" download='/kebs108.pdf'><span className='font-bold text-[1em]'>Chapter - 8 :</span>Sources of Business Finance  </a>
//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs109.pdf" download='/kebs109.pdf'><span className='font-bold text-[1em]'>Chapter - 9 :</span>MSME and Bussiness Entrepreneurship  </a>
//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs110.pdf" download='/kebs110.pdf'><span className='font-bold text-[1em]'>Chapter -  10 :</span>Internal Trade  </a>
//               <a className='text-[.9em]' href="https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs111.pdf" download='/kebs111.pdf'><span className='font-bold text-[1em]'>Chapter - 11 :</span>  International Business </a>
//               </div>

//               </div>
//               </div>

//             </div>
//             <Footer1 />
//             <Footer />

//         </div>
//     )
// }

// "use client"
// import React, { useState } from 'react';
// import Navbar from "@/components/Navbar";
// import Footer1 from '@/components/Footer1';
// import Footer from "@/components/Footer";
// import { FaBook } from 'react-icons/fa';
// import DownloadFormModal from '@/components/DownloadFormModal';

// export default function BussinessStudies11th() {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [selectedPdf, setSelectedPdf] = useState(null);

//   const handleDownloadClick = (pdf) => {
//     setSelectedPdf(pdf);
//     setModalOpen(true);
//   };

//   const handleFormSubmit = (formData) => {
//     setModalOpen(false);
//     // Trigger PDF download here
//     const link = document.createElement('a');
//     link.href = selectedPdf;
//     link.download = selectedPdf.split('/').pop();
//     link.click();
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="p-0 md:p-12 flex flex-col font-Poppins justify-center mt-12">
//         <div>
//           <h1 className='p-4 text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl w-full md:w-[55%] rounded-lg text-center m-auto'>
//             CBSE Class 11 Business Studies Syllabus
//           </h1>
//         </div>
//         <div className='flex flex-col md:flex-row pt-2'>
//           <div className="w-full text-center pt-6">
//             <p className="p-4">
//               The CBSE Class 11 Business Studies syllabus provides a broad overview of fundamental business concepts and practices...
//             </p>
//             <p className='p-2'>
//               The CBSE Class 11 Business Studies syllabus provides a comprehensive exploration of core business principles...
//             </p>
//           </div>
//         </div>
//         <div className='flex flex-col gap-5'>
//           <p className='font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg text-center w-full md:w-[60%] m-auto text-2xl bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent from-orange-500 to-red-600'>
//             A Comprehensive Guide for Class 11th Business Studies
//           </p>
//           <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8">
//             <div className='flex flex-col gap-4 w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200'>
//               <p className='font-bold text-black flex items-center gap-1 text-[1.1em]'>
//                 <FaBook className='text-orange-500' size={20} />Business Studies
//               </p>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs101.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 1 :</span>Business, Trade, And Commerce
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs102.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 2 :</span>Forms of Business Organisation
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs103.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 3 :</span>Private, Public and Global Enterprises
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs104.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 4 :</span>Business Services
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs105.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 5 :</span>Emerging Modes of Business
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//             </div>
//             <div className='flex flex-col gap-4 w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200'>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs106.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 6 :</span>Social Responsibilities of Business and Business Ethics
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs107.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 7 :</span>Formation of a Company
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs108.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 8 :</span>Sources of Business Finance
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs109.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 9 :</span>MSME and Business Entrepreneurship
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs110.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 10 :</span>Internal Trade
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//               <button className='text-[.9em]' onClick={() => handleDownloadClick('https://learnosphere.in/public_pdf/Class-11 Bussiness/kebs111.pdf')}>
//                 <span className='font-bold text-[1em]'>Chapter - 11 :</span>International Business
//               <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer1 />
//       <Footer />

//       <DownloadFormModal
//         isOpen={isModalOpen}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleFormSubmit}
//       />
//     </div>
//   );
// }
