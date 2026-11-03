"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function Biology11th() {
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
            CBSE Class 11 Biology Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row pt-2">
          <div className=" w-full  text-center pt-6">
            <p className="p-4">
              The CBSE Class 11 Biology curriculum introduces students to the
              foundational concepts of biological sciences, focusing on cellular
              and molecular biology, plant and animal physiology, and ecological
              principles. It begins with an in-depth study of cell structure and
              function, including topics such as cell division, biomolecules,
              and genetics. The curriculum covers human physiology, detailing
              systems like digestion, respiration, and circulation, while also
              exploring the anatomy and functions of plants. Students learn
              about the classification of organisms, their evolutionary
              relationships, and ecological interactions, including topics on
              ecosystems, biodiversity, and environmental conservation. This
              curriculum provides a solid base for understanding complex
              biological systems and prepares students for advanced studies in
              the field.
            </p>
            <p className=" p-2">
              The CBSE Class 11 Biology curriculum provides a comprehensive
              introduction to the fundamental concepts of biology, focusing on
              the principles underlying life processes and the diversity of life
              forms. It begins with the study of the cell, exploring its
              structure, function, and the biochemical processes that sustain
              life, including cell division and genetics. The curriculum extends
              to human physiology, covering the major organ systems and their
              functions, as well as the principles of nutrition, respiration,
              and circulation. It also delves into the diversity of living
              organisms, classifying them based on evolutionary relationships
              and ecological roles. The study of plant biology includes the
              structure and function of plants, plant reproduction, and growth
              processes. Additionally, the curriculum introduces students to
              basic concepts in ecology and environment, highlighting the
              interactions between organisms and their environments, and the
              importance of conservation. The aim is to provide students with a
              solid foundation in biological sciences, fostering a deeper
              understanding of the living world and its complex processes, while
              preparing them for further studies in biology and related fields.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg text-center   w-full md:w-[54%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 11th Biology{" "}
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
            <div className=" flex flex-col gap-4  items-start w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Biology
              </p>

              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/The Living World.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>The
                Living World{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/The Living World.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                Biological Classification
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Biology/Plant Kingdom.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>Plant
                Kingdom{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Biology/Animal Kingdom.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Animal Kingdom{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Morphology of Flowering Plants.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Morphology of Flowering Plants{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Anatomy of Flowering Plants.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
                Anatomy of Flowering Plants{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Structural Organisation in Animals.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Structural Organisation in Animals{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Cell The Unit of Life.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>Cell
                The Unit of Life{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Biology/Biomolecules.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
                Biomolecules{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
            </div>
            <div className=" flex flex-col gap-4 items-start  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Cell Cycle and Cell Division.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>Cell
                Cycle and Cell Division{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Photosynthesis in Higher Plants.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>
                Photosynthesis in Higher Plants{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Respiration in Plants.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>
                Respiration in Plants{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Plant Growth and Development.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>{" "}
                Plant Growth and Development{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Breathing and Exchange of Gases.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>
                Breathing and Exchange of Gases{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Body Fluids and Circulation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span>{" "}
                Body Fluids and Circulation{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Excretory Products and their Elimination.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 16 :</span>
                Excretory Products and their Elimination{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Locomotion and Movement.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 17 :</span>
                Locomotion and Movement{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Neural Control and Coordination.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 18 :</span>
                Neural Control and Coordination{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </button>
              <button
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Biology/Chemical Coordination and Integration.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 19 :</span>
                Chemical Coordination and Integration{" "}
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
