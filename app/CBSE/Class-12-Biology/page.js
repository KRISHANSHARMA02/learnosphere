"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function Biology12() {
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
            CBSE Class 12 Biology Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="   text-center md:text-start pt-6">
            <p className=" p-4">
              The NCERT Class 12 Biology syllabus covers a wide range of
              essential areas, including cell structure and function, genetics,
              ecology, biotechnology, and human physiology. In addition to
              theoretical knowledge, the syllabus also emphasises the
              significance of practical applications. It includes practical
              sessions that allow students to gain hands-on experience and
              develop essential laboratory skills. The NCERT Class 12 biology
              practical syllabus focuses on experiments, identification of
              specimens, and data analysis, providing students with a holistic
              learning experience.
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
              <FaBook className="text-orange-500 " size={20} />
              Biology
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Biology/Sexual Reproduction in Flowering Plants.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>Sexual
              Reproduction in Flowering Plants
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Biology/Human Reproduction.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span> Human
              Reproduction
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Biology/Reproductive Health.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              Reproductive Health
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Biology/Principles of Inheritance and Variation.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
              Principles of Inheritance and Variation
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Biology/Molecular Basis of Inheritance.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Molecular Basis of Inheritance
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Biology/Evolution.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>
              Evolution
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
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Biology/Human Health and Disease.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>Human
              Health and Disease
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Biology/Microbes in Human Welfare.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>
              Microbes in Human Welfare
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Biology/Biotechnology Principles And Processes.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 9 :</span>
              Biotechnology:Principles And Processes
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Biology/Biotechnology and its Applications.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 10 :</span>
              Biotechnology and its Applications
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Biology/Organisms and Populations.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 11 :</span>
              Organisms and Populations
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Biology/Ecosystem.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 12 :</span>{" "}
              Ecosystem
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Biology/Biodiversity and Conservation.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 13 :</span>
              Biodiversity and Conservation
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="mt-14 flex flex-col gap-3 w-full ml-4   ">
            <p className=" text-start p-4 font-bold  text-[1.1em]">
              Practical skills and experiments are an essential part of the
              Biology syllabus, and the practical exam carries 30 marks.
            </p>
            <p className=" text-start px-4 font-semibold  text-[1.1em]  text-orange-500">
              Practical (30 Marks)
            </p>
            <ol className=" list-disc text-start px-4 font-semibold  text-[1em]">
              <li className="text-start mt-2  text-[.9em]">
                One Major Experiment (from any one unit) - 5 Marks
              </li>
              <li className="text-start mt-2  text-[.9em]">
                One Minor Experiment (from any other unit) - 4 Marks
              </li>
              <li className="text-start mt-2   text-[.9em]">
                Slide Preparation - 5 Marks
              </li>
              <li className="text-start mt-2  text-[.9em]">
                Spotting - 7 Marks
              </li>
              <li className="text-start mt-2  text-[.9em]">
                Practical Record + Viva Voce - 4 Marks
              </li>
              <li className="text-start mt-2  text-[.9em]">
                Investigatory Project + Viva Voce - 5 Marks
              </li>
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
