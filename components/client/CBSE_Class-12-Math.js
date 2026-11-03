"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function Math12() {
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
      <div className=" p-0 md:p-12  flex flex-col  font-Poppins justify-center mt-12">
        <div className="">
          <h1 className="p-4  text-2xl md:text-4xl mt-10 font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Class 12 Maths Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-full">
          <div>
            <div className=" pt-8 text-center md:text-start ">
              <p className=" p-4">
                The Class 12 Maths NCERT syllabus has been revised for the
                academic year 2024-25, as per the guidelines set by the Central
                Board of Secondary Education (CBSE). The syllabus comprises six
                units, covering a wide range of topics including relations and
                functions, algebra, calculus, vectors and three-dimensional
                geometry, and linear programming.
              </p>

              <p className=" p-4">
                {" "}
                The updated syllabus reflects the evolving trends in mathematics
                education, emphasizing problem-solving and practical
                applications. It introduces new topics such as matrices,
                determinants, and inverse trigonometric functions, enhancing the
                breadth and depth of mathematical knowledge for Class 12
                students.
              </p>
              <p className=" p-4">
                The CBSE (Central Board of Secondary Education) Class 12
                Mathematics syllabus is divided into various units and sections.
                Here's an overview of the units and their key topics:
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Mathematics Part - I
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-1/Relations and Functions.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
              Relations and Functions
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-1/Inverse Trigonometric Functions.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>Inverse
              Trigonometric Functions
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-1/Matrices.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              Matrices
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-1/Determinants.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>
              Determinants
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-1/Continuity and Differentiability.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Continuity and Differentiability
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-1/Application of Derivatives.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
              Application of Derivatives
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Mathematics Part - II
            </p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-2/Integrals.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
              Integrals
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-2/Application of Integrals.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>
              Application of Integrals
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-2/Differential Equations.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              Differential Equations
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-2/Vector Algebra.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>Vector
              Algebra
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-2/Three Dimensional Geometry.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>Three
              Dimensional Geometry
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-2/Linear Programming.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span> Linear
              Programming
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-12 Mathematics/Part-2/Probability.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>
              Probability
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className=" flex flex-col mt-6 gap-2  text-center">
            <div className="  pt-2 ">
              <h2 className="text-start p-4 text-2xl font-semibold">
                Here are some of the key changes in the updated syllabus:
              </h2>
            </div>

            <div className="text-start pt-2 px-4 ">
              <ol className="list-disc">
                <li className="pt-1">
                  The number of units has been increased from five to six.
                </li>
                <li className="pt-1">
                  Increased focus on problem-solving skills
                </li>
                <li className="pt-1">
                  A number of new topics have been added, such as matrices,
                  determinants, and inverse trigonometric functions.
                </li>
                <li className="pt-1">
                  Removal of some topics, such as sets and relations
                </li>
                <li className="pt-1">
                  A greater emphasis on applications of mathematics
                </li>
              </ol>
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
