"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function Math() {
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
      <div className=" p-0 md:p-12  flex flex-col font-Poppins justify-center mt-12">
        <div className="">
          <h1 className="p-4  text-2xl md:text-4xl mt-10 font-extrabold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Syllabus for Class 10 Maths{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row  gap-6 ">
          <div className=" pt-8 w-full md:w-2/5">
            <p className=" text-center md:text-start p-4 ">
              Looking for the updated{" "}
              <span className="  text-orange-500 font-bold text-[1.1em]">
                {" "}
                CBSE Class 10 Maths{" "}
              </span>{" "}
              syllabus for the academic year 2024-25? Look no further! The{" "}
              <span className="  text-orange-500 font-bold text-[1.1em]">
                {" "}
                NCERT Class 10 Maths
              </span>{" "}
              syllabus has been revised to offer a comprehensive and structured
              curriculum that aligns with the latest educational standards.{" "}
              <span className="  text-orange-500 font-bold text-[1.1em]">
                This new Class 10 Maths Syllabus 2024-25{" "}
              </span>
              covers essential topics and provides a strong foundation in
              mathematical concepts.
            </p>
            <p className=" text-center md:text-start p-4">
              With the{" "}
              <span className="  text-orange-500 font-bold text-[1.1em]">
                CBSE NCERT Class 10 Maths
              </span>{" "}
              syllabus, students can delve into various areas such as{" "}
              <span className="  text-orange-500 font-bold text-[1.1em]">
                algebra, geometry, trigonometry, statistics, and more
              </span>{" "}
              . To ensure a holistic learning experience, NCERT provides
              detailed solutions for the Class 10 Maths Syllabus 2024-25,
              allowing students to enhance their understanding and practice
              problem-solving effectively.
            </p>
          </div>
          <div className="pt-8 items-center font-Poppins justify-center md:ml-12">
            <table className="table-auto  border-collapse border border-gray-500">
              <thead>
                <tr className="bg-orange-500">
                  <th className="border  border-gray-500 p-2">units</th>
                  <th className="border  border-gray-500 p-2">units Name</th>
                  <th className="border  border-gray-500 p-2">Sections</th>
                </tr>
              </thead>
              <tbody className="text-center">
                <tr>
                  <td className="border border-gray-500 p-2">I</td>
                  <td className="border border-gray-500 p-2">Number Systems</td>
                  <td className="border border-gray-500 p-2">Real Number</td>
                </tr>

                <tr>
                  <td className="border border-gray-500 p-2">II</td>
                  <td className="border border-gray-500 p-2">Algebra</td>
                  <td className="border border-gray-500 p-2">
                    Polynomials <br />
                    Quadratic Equations
                    <br />
                    Arithmetic Progressions
                    <br />
                    Pair of Linear Equations in Two Variables
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2">III</td>
                  <td className="border border-gray-500 p-2">
                    Coordinate Geometry
                  </td>
                  <td className="border border-gray-500 p-2">
                    {" "}
                    Coordinate Geometry
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2">IV</td>
                  <td className="border border-gray-500 p-2">Geometry </td>
                  <td className="border border-gray-500 p-2">
                    Triangles <br />
                    Circles
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2">V</td>
                  <td className="border border-gray-500 p-2">Trigonometry</td>
                  <td className="border border-gray-500 p-2">
                    Introduction to Trigonometry
                    <br />
                    Trigonometric Identities
                    <br />
                    Heights and Distances
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2">VI</td>
                  <td className="border border-gray-500 p-2">Mensuration</td>
                  <td className="border border-gray-500 p-2">
                    Areas Related to Circles <br />
                    Surface Areas and Volumes
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-2">VII</td>
                  <td className="border border-gray-500 p-2">
                    Statistics and Probability{" "}
                  </td>
                  <td className="border border-gray-500 p-2">
                    Statistics <br />
                    Probability
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 px-7 md:px-20">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Mathematics
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Real Numbers.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>Real
              Numbers
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Polynomials.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
              Polynomials
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Pair of Linear Equations in Two Variables.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>Pair of
              Linear Equations in Two Variables
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Quadratic Equations.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
              Quadratic Equations
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Arithmetic Progressions.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Arithmetic Progressions
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Triangles.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>
              Triangles
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
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Coordinate Geometry.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>
              Coordinate Geometry
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Introduction to Trigonometry.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
              Introduction to Trigonometry
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Applications of Trigonometry.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 9 :</span>{" "}
              Applications of Trigonometry
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Circle.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 10 :</span>Circle
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Areas related to Circles.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 11 :</span>Areas
              related to Circles
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Surface Areas and Volumes.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 12 :</span>
              Surface Areas and Volumes
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Statistics.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 13 :</span>{" "}
              Statistics
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Mathematics/Probability.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 14 :</span>
              Probability
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col-reverse  md:flex-row gap-6 ">
          <div className="pt-6 items-center justify-center md:ml-4 px-11   w-full md:w-[50%]">
            <table className="table-auto  border-collapse border border-gray-500">
              <thead>
                <tr className="bg-orange-500">
                  <th className="border border-gray-500 p-3">sl no.</th>
                  <th className="border border-gray-500 p-3">unit</th>
                  <th className="border border-gray-500 p-3">marks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-500 p-3">I</td>
                  <td className="border border-gray-500 p-3">Number System</td>
                  <td className="border border-gray-500 p-3">6</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">II</td>
                  <td className="border border-gray-500 p-3">Algebra</td>
                  <td className="border border-gray-500 p-3">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">III</td>
                  <td className="border border-gray-500 p-3">
                    Coordinate Geometry
                  </td>
                  <td className="border border-gray-500 p-3">6</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">IV</td>
                  <td className="border border-gray-500 p-3">Geometry</td>
                  <td className="border border-gray-500 p-3">15</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">V</td>
                  <td className="border border-gray-500 p-3">Trigonometry</td>
                  <td className="border border-gray-500 p-3">12</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">VI</td>
                  <td className="border border-gray-500 p-3">Mensuration</td>
                  <td className="border border-gray-500 p-3">10</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">VII</td>
                  <td className="border border-gray-500 p-3">
                    Statistics & Probability
                  </td>
                  <td className="border border-gray-500 p-3">11</td>
                </tr>
                <tr>
                  <th className="border border-gray-500 p-3"></th>
                  <th className="border border-gray-500 p-3">TOTAL</th>
                  <th className="border border-gray-500 p-3">80</th>
                </tr>
                <tr>
                  <th className="border border-gray-500 p-3"></th>
                  <th className="border border-gray-500 p-3">
                    Internal Assessment
                  </th>
                  <th className="border border-gray-500 p-3">20</th>
                </tr>
                <tr>
                  <th className="border border-gray-500 p-3"></th>
                  <th className="border border-gray-500 p-3">Grand Total</th>
                  <th className="border border-gray-500 p-3">100</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="  text-center md:text-start p-4 w-[340px] md:w-[50%] mt-6 pt-8">
            <p className="">
              In the CBSE (Central Board of Secondary Education) system, the
              evaluation process for Class 10 includes both formative and
              summative assessments to ensure a comprehensive assessment of the
              students' learning. Here’s an outline of the marks distribution
              for Class 10 subjects, including Math:
            </p>
            <p className="font-bold mt-3 text-[1.2em]">
              Theory Examination (Board Exam)
            </p>
            <ol className=" flex flex-col gap-1  text-start  px-12 mt-3 list-disc md:mt-1 ">
              <li>Total Marks: 80</li>
              <li>Duration: 3 hours</li>
            </ol>
            <p className="font-bold mt-3 text-[1.2em]">Internal Assessment</p>
            <ol className=" flex flex-col gap-1  list-disc text-start px-12  mt-3 md:mt-1 ">
              <li>Total Marks: 20</li>
            </ol>
            <p className="font-bold mt-3 text-[1.2em]">
              The internal assessment is further divided into:
            </p>
            <ol className=" flex flex-col gap-1  list-disc text-start px-12 mt-3 md:mt-1">
              <li>Periodic Tests: 10 marks</li>
              <li>Notebook Submission: 5 marks</li>
              <li>
                Subject Enrichment Activities (Practical
                Work/Experiments/Projects): 5 marks
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
