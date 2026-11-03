"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function BusinessStudies12() {
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
      <div className="p-0 md:p-12  flex flex-col font-Poppins justify-center mt-12">
        <div className="">
          <h1 className="p-4  text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Class 12 Business Studies Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className=" text-center md:text-start pt-6">
            <p className="p-4">
              The Business Studies in Class 12 NCERT syllabus provides a
              comprehensive framework for students to understand various
              business concepts and principles. The Central Board of Secondary
              Education (CBSE) has released the updated syllabus for CBSE Class
              12 Business Studies for the academic year 2024-25. The syllabus
              covers a wide range of topics, including business environment,
              management, marketing, and financial management.
            </p>
            <p className=" p-4">
              The CBSE (Central Board of Secondary Education) Class 12 Biology
              syllabus is divided into various units and sections. Here's an
              overview of the units and their key topics:
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} /> Principles and
              Functions of Management
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Nature and Significance of Management.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>Nature
              and Significance of Management
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Principles of Management.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>
              Principles of Management
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Business Environment.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              Business Environment
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Planning.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>
              Planning
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Organising.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Organising
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Staffing.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
              Staffing
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Directing.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>
              Directing
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-1/Controlling.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>
              Controlling
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} /> Business Finance
              and Marketing
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-2/Financial Management.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>
              Financial Management
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-2/Marketing.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>
              Marketing
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Bussiness/Part-2/Consumer Protection.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              Consumer Protection
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className=" pt-14 flex flex-col text-center md:text-start gap-5">
            <p className="font-bold">
              Business Studies in CBSE Class 12 is designed to introduce
              students to the principles and practices of business management
              and finance. The syllabus covers a wide range of topics that
              provide a comprehensive understanding of how businesses operate,
              manage resources, and navigate financial and market environments.
            </p>
            <p className="font-bold text-start  text-orange-500 flex flex-col gap-3 ">
              Project Work
            </p>
            <ol className="list-disc text-start  font-semibold">
              <li>Project File: 10 Marks</li>
              <li>Viva Voce: 10 Marks</li>
            </ol>
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
