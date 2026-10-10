"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function Economics12() {
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
            CBSE Class 12 Economics Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="   text-center md:text-start pt-6">
            <p className=" p-4">
              The latest syllabus for Class 12 Economics in accordance with the
              CBSE has been unveiled for the academic year 2024-2025. This
              revised syllabus comprises eight units, encompassing essential
              subjects like national income, money and banking, income and
              employment determination, government budget and its impact on the
              economy, balance of payments, India's development experience, and
              an economics project.
            </p>
            <ul className="p-4 list-disc flex flex-col gap-2">
              <li>
                Increased focus on the application of economics to real-world
                problems
              </li>
              <li>
                Addition of new topics, such as financial inclusion and
                sustainable development
              </li>
              <li>Removal of some topics, such as public debt</li>
              <li>
                A greater emphasis on the role of government in the economy
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Macro Economics
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-1/Introduction to Macroeconomics and its Concepts.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
              Introduction to Macroeconomics and its Concepts
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-1/National Income Accounting.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>
              National Income Accounting
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-1/Money and Banking.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>Money
              and Banking
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-1/Determination of Income and Employment.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>
              Determination of Income and Employment
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-1/Government Budget and the Economy.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Government Budget and the Economy
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-1/Open Economy Macronomics.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>Open
              Economy Macronomics
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>

          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Micro Economics
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-2/Introduction to Economics.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
              Introduction to Economics
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-2/Theory oF Consumer Behaviour.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>Theory
              oF Consumer Behaviour
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-2/Production and Costs.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              Production and Costs
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-2/The Theory of the Firm Under Perfect Competition.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>The
              Theory of the Firm Under Perfect Competition
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Economics/Part-2/Market Equillibrium.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>Market
              Equillibrium
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="  flex flex-col  gap-4  text-start pt-6">
            <p className="font-bold">Project Work</p>
            <ol className="list-disc flex flex-col gap-2 ">
              <li className="font-bold ml-4 text-orange-500">
                Guidelines for Project Work in Economics (Class XII)
              </li>
              <li className="ml-10">
                The students may be encouraged to develop projects that have
                primary data and information
              </li>
              <li className="ml-10">
                The projects are to be developed in consultation with the
                subject teacher and can be discussed by the students in the
                class
              </li>
              <li className="ml-10">
                The students can present their research in the form of a report
                or a survey
              </li>
              <li className="ml-10">
                A list of suggested projects will be provided by the board
              </li>
            </ol>
            <p className="font-bold text-orange-500">
              Distribution of Marks for Project Work:
            </p>
            <ol className="list-disc flex flex-col gap-2 ">
              <li className="ml-10">
                Introduction, Statement of Purpose/Aims & Objectives,
                Methodology / Questionnaire, Data Collection - 5 marks
              </li>
              <li className="ml-10">Presentation - 5 marks</li>
              <li className="ml-10">
                Analysis/Explanation and Interpretation - 5 marks
              </li>
              <li className="ml-10">Conclusion - 2 marks</li>
              <li className="ml-10">Viva-Voce - 3 marks</li>
            </ol>
          </div>
        </div>
      </div>
      <Footer />
      <DownloadFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
