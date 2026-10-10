"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function Economics11th() {
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
          <h1 className="p-4  text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Class 11 Economics Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row pt-2">
          <div className=" w-full  text-center pt-6">
            <p className="p-4">
              The CBSE Class 11 Economics syllabus offers a detailed exploration
              of India’s economic development and the application of economic
              principles. It starts with an examination of the Indian economy on
              the eve of independence, highlighting the impacts of colonial
              policies and the pre-independence economic conditions. The course
              then traces the evolution of the economy from 1950 to 1990,
              covering significant planning efforts, growth trajectories, and
              challenges. Students study the effects of liberalization,
              privatization, and globalization since the 1990s, evaluating their
              impact on economic progress. The syllabus also includes key topics
              like human capital formation, rural development, employment
              issues, and environmental sustainability. Additionally, it
              provides a comparative analysis of India’s economic experiences
              with its neighboring countries, aiming to equip students with a
              comprehensive understanding of both historical and contemporary
              economic issues.
            </p>
            <p className=" p-2">
              The CBSE Class 11 Economics syllabus offers a comprehensive study
              of India’s economic landscape, both historically and in
              contemporary contexts. It begins with an analysis of the Indian
              economy just before independence, exploring the effects of
              colonial policies and the socio-economic conditions of the time.
              The syllabus then covers the evolution of the Indian economy from
              1950 to 1990, highlighting key developments in economic planning,
              growth, and challenges faced during this period. It examines the
              transformative impact of liberalization, privatization, and
              globalization since the 1990s, assessing their effects on economic
              growth and development. The course further delves into critical
              areas such as human capital formation, rural development,
              employment issues, and environmental sustainability. It concludes
              with a comparative analysis of India’s development experiences
              with its neighboring countries, providing a broader perspective on
              regional economic dynamics. This curriculum aims to equip students
              with a deep understanding of economic principles, historical
              developments, and contemporary economic issues.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg text-center   w-full md:w-[58%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 11th Economics{" "}
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Economics: Indian Economic Development
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-1/Indian Economy on the Eve of Independence.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Indian Economy on the Eve of Independence{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-1/Indian Economy 1950-1990.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                Indian Economy 1950-1990{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-1/Liberalisation, Privatisation and Globalisation -An Appraisal.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Liberalisation, Privatisation and Globalisation -An Appraisal{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-1/Human Capital Formation in India.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>Human
                Capital Formation in India{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-1/Rural Development.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
                Rural Development{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-1/Employment-Growth, Informalisation and Related Issues.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
                Employment-Growth, Informalisation and Related Issues{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-1/Environment Sustainable Development.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
                Environment Sustainable Development{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-1/Comparative Development Experience of India with its Neighbours.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
                Comparative Development Experience of India with its Neighbours
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Economics: Statistics for Economics
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-2/Introduction.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Introduction{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-2/Collection of Data.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                Collection of Data{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-2/Organisation of Data.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                Organisation of Data{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-2/Presentation of Data.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                Presentation of Data{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-2/Measures of Central Tendency.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
                Measures of Central Tendency{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-2/Correlation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Correlation{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-2/Index Numbers.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
                Index Numbers{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Economics/Part-2/Use of Statistical Tools.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span> Use
                of Statistical Tools{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
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
