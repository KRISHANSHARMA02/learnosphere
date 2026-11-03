"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function Politicalscience12() {
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
            CBSE Class 12 Political Science Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className=" text-center md:text-start pt-6">
            <p className=" p-4">
              The Central Board of Secondary Education has released the revised
              Class 12 Political Science Syllabus for the 2024-25 session. This
              CBSE Class 12 Political Science Syllabus is applicable for the
              academic year 2024-25 and can be used by the students of Class 12
              while preparing for their board examination.{" "}
            </p>
            <p className=" p-4">
              For CBSE Class 12th Political Science, the syllabus typically
              covers key areas in Indian politics and global politics. Here are
              some lines summarizing the syllabus:
            </p>
            <ol className=" px-8 flex flex-col gap-4">
              <li className="">
                <span className="font-bold text-orange-500">
                  1. Contemporary World Politics:
                </span>{" "}
                This part explores the Cold War era, the disintegration of the
                Soviet Union, and the emergence of the US as the sole
                superpower. It also discusses globalization, international
                organizations, security in the contemporary world, environment
                and natural resources, and global economic issues.
              </li>
              <li>
                <span className="font-bold text-orange-500">
                  2. Politics in India Since Independence:
                </span>{" "}
                This section covers the challenges of nation-building, the era
                of one-party dominance, politics of planned development, India's
                external relations, challenges to the Congress system, crisis of
                the democratic order, rise of new social movements, regional
                aspirations, and the recent developments in Indian politics.
              </li>
            </ol>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Contemporary World Politics
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-1/End of Bipolarity.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span> The
              End of Bipolarity
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-1/Alternative Centres of Power.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>
              Alternative Centres of Power
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-1/Contemporary South Asia.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              Contemporary South Asia
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-1/International Organisations.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>
              International Organisations
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-1/Security in the Contemporary World.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Security in the Contemporary World
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-1/Environment and Natural Resources.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
              Environment and Natural Resources
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-1/Globalisation.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>
              Globalisation
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>

          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} /> Politics In
              India Since Independence
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-2/Challenges of Nation Building.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>
              Challenges of Nation Building
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-2/One Party Dominance.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>Era of
              One Party Dominance
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-2/Politics of Planned Development.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              Politics of Planned Development
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-2/External Relations.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>India’s
              External Relations
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-2/Challenges to and Restoration of Congress System.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Challenges to and Restoration of Congress System
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-2/Crisis of Democratic Order.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>The
              Crisis of Democratic Order
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-2/Regional Aspirations.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>
              Regional Aspirations
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Political Science/Part-2/Developments in Indian Politics.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>Recent
              Developments in Indian Politics
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="  flex flex-col  gap-4 text-center md:text-start pt-16">
            <p className="p-4">
              The theory section covers topics like political theories and
              ideologies, political institutions, democracy, and international
              relations. Students should focus on understanding concepts,
              analyzing political systems, and studying key political figures
              and events.
            </p>
            <p className="p-4">
              The project involves researching a political topic of choice,
              conducting a detailed analysis, and presenting findings. It should
              demonstrate an understanding of political concepts, use data
              effectively, and offer insightful conclusions based on research.
            </p>
            <p className="font-bold text-start p-4 md:p-0">Project Work</p>
            <p className="font-bold text-orange-500 text-start">
              Distribution of Marks for Project Work:
            </p>
            <ol className="list-disc flex flex-col gap-2 text-start ">
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
