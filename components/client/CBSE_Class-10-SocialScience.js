"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function Socialscience() {
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

      <div className="p-0 md:p-12 font-Poppins flex flex-col justify-center mt-12">
        <div className=" mt-12">
          <h1 className="p-4  text-2xl md:text-4xl font-bold bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[60%] rounded-lg text-center m-auto">
            CBSE Syllabus for Class 10 Social Science{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row ">
          <div className=" pt-6 w-full md:w-2/5">
            <p className="text-center md:text-start p-2 md:p-4">
              The SST syllabus Class 10 CBSE 2024-25 has undergone a reduction
              of approximately 30% of its previous content. This revised
              syllabus has been specifically formulated for the upcoming Board
              Exams in 2024-25. It is essential for all CBSE Class 10 students
              to strictly follow the latest syllabus and guidelines while
              preparing for their year-end board exams.
            </p>
            <p className="text-center md:text-start p-2 md:p-4">
              The CBSE Class 10 Social Science syllabus is divided into four
              main units: History, Geography, Political Science (Civics), and
              Economics. Each unit covers various themes and chapters designed
              to provide students with a comprehensive understanding of social,
              economic, and political processes.
            </p>
            <p className="font-bold md:text-[1.2em] text-center md:text-start px-4">
              Detailed Mark Distribution:
            </p>
            <ol className="px-8 flex flex-col gap-2 text-center md:text-start   list-decimal">
              <li>History:20</li>
              <li> Geography:20</li>
              <li>Political Science:20</li>
              <li>Economics:20</li>
            </ol>
            {/* <p className='text-start p-4'>For those on the lookout for the Class 10 Science syllabus, it's readily available in a PDF format online. This document is not just a list of topics but a comprehensive guide that details the chapters, their weightage in the exam, and even includes the practicals, assignments, and projects that are part of the curriculum. Such detailed planning helps students understand what to expect and how to allocate their study time effectively.</p> */}
          </div>
          <div className="pt-6 items-center justify-center font-Poppins ml-0 md:ml-12  w-full md:w-3/5">
            <table className="table-auto  border-collapse border border-gray-500">
              <thead>
                <tr className="bg-orange-500">
                  {/* <th className="border  border-gray-500 p-2">units</th> */}
                  <th className="border  border-gray-500 p-2">units Name</th>
                  <th className="border  border-gray-500 p-2">Chapter Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  {/* <td className="border border-gray-500 p-2">I</td> */}
                  <td className="border border-gray-500 p-2">
                    History (India and the Contemporary World – II){" "}
                  </td>
                  <td className="border border-gray-500 p-2">
                    The Rise of Nationalism in Europe
                    <br />
                    Nationalism In India
                    <br />
                    The Making of a Global World
                    <br />
                    The Age of Industrialization
                    <br />
                    Print Culture and the Modern World{" "}
                  </td>
                </tr>

                <tr>
                  {/* <td className="border border-gray-500 p-2">II</td> */}
                  <td className="border border-gray-500 p-2">
                    {" "}
                    Geography (Contemporary India – II)
                  </td>
                  <td className="border border-gray-500 p-2">
                    Resources and Development
                    <br />
                    Forest and Wildlife Resources
                    <br />
                    Water Resources
                    <br />
                    Agriculture
                    <br />
                    Minerals and Energy Resources
                    <br />
                    Manufacturing Industries
                    <br />
                    Lifelines of National Economy
                  </td>
                </tr>
                <tr>
                  {/* <td className="border border-gray-500 p-2">III</td> */}
                  <td className="border border-gray-500 p-2">
                    Political Science (Democratic Politics – II){" "}
                  </td>
                  <td className="border border-gray-500 p-2">
                    {" "}
                    Power – sharing <br />
                    Federalism
                    <br />
                    Gender, Religion and Caste
                    <br />
                    Political Parties
                    <br />
                    Outcomes of Democracy
                  </td>
                </tr>
                <tr>
                  {/* <td className="border border-gray-500 p-2">IV</td> */}
                  <td className="border border-gray-500 p-2">
                    Understanding Economic Development{" "}
                  </td>
                  <td className="border border-gray-500 p-2">
                    Development <br />
                    Sectors of the Indian Economy
                    <br />
                    Money and Credit
                    <br />
                    Globalisation and The Indian Economy
                    <br />
                    Consumer Rights (Project Work)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 px-7 mb-10  md:px-20">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Geography – Contemporary India - II
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Resource and Development.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
              Resource and Development
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Forest and Wildlife Resources.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span> Forest
              and Wildlife Resources{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Water Resources.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>Water
              Resources{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Agriculture.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>
              Agriculture{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Minerals and Energy Resources.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Minerals and Energy Resources{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Manufacturing Industries.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>
              Manufacturing Industries{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-1/Lifelines of National Economy.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>
              Lifelines of National Economy{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>

            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Understanding Economic Development – II
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-2/Understanding Economic Development.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>
              Understanding Economic Development
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-2/Sectors of Indian Economy.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>Sectors
              of Indian Economy
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 Sst/Part-2/Money and Credit.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span> Money
              and Credit
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-2/Globalisation and the Indian Economy.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>
              Globalisation and the Indian Economy
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 Sst/Part-2/Consumer Rights.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>
              Consumer Rights
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              India and the Contemporary World - II
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-3/The Rise of Nationalism in Europe.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>The
              Rise of Nationalism in Europe
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-3/Nationalism in India.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
              Nationalism in India
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-3/The Making of Global World.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span> The
              Making of Global World
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-3/The Age of Industrialisation.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>The Age
              of Industrialisation
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-3/Print Culture and the Modern World.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>Print
              Culture and the Modern World
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>

            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} /> Civics –
              Democratic Politics - II
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 Sst/Part-4/Power Sharing.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>Power
              Sharing{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 Sst/Part-4/Federalism.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
              Federalism{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-4/Democracy and Diversity.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
              Democracy and Diversity{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-4/Gender Religion and Caste.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span>Gender
              Religion and Caste{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Sst/Part-4/Popular Struggles and Movements.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
              Popular Struggles and Movements
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 mt-4 md:mt-10">
          <div className="pt-6  mt-0 md:mt-4    md:w-[45%] ">
            <table className="table-auto  border-collapse border border-gray-500">
              <thead>
                <tr className="bg-orange-500">
                  <th className="border border-gray-500 p-3">sl no.</th>
                  <th className="border border-gray-500 p-3">unit</th>
                  <th className="border border-gray-500 p-3">
                    No. of Periods{" "}
                  </th>
                  <th className="border border-gray-500 p-3">marks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-500 p-3">I</td>
                  <td className="border border-gray-500 p-3">
                    India and the Contemporary World – II{" "}
                  </td>
                  <td className="border border-gray-500 p-3">60</td>
                  <td className="border border-gray-500 p-3">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">II</td>
                  <td className="border border-gray-500 p-3">
                    Contemporary India – II{" "}
                  </td>
                  <td className="border border-gray-500 p-3">55</td>
                  <td className="border border-gray-500 p-3">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">III</td>
                  <td className="border border-gray-500 p-3">
                    Democratic Politics – II{" "}
                  </td>
                  <td className="border border-gray-500 p-3">50</td>
                  <td className="border border-gray-500 p-3">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">IV</td>
                  <td className="border border-gray-500 p-3">
                    Understanding Economic Development{" "}
                  </td>
                  <td className="border border-gray-500 p-3">50</td>
                  <td className="border border-gray-500 p-3">20</td>
                </tr>

                <tr>
                  <th className="border border-gray-500 p-3"></th>
                  <th className="border border-gray-500 p-3">Total</th>
                  <td className="border border-gray-500 p-3">215</td>
                  <th className="border border-gray-500 p-3">80</th>
                </tr>
                {/* <tr>
                    <th className="border border-gray-500 p-3"></th>
                    <th className="border border-gray-500 p-3">Internal Assessment</th>
                    <th className="border border-gray-500 p-3">20</th>
                    </tr>
                    <tr>
                    <th className="border border-gray-500 p-3"></th>
                    <th className="border border-gray-500 p-3">Grand Total</th>
                    <th className="border border-gray-500 p-3">100</th>
                    </tr> */}
              </tbody>
            </table>
          </div>
          <div className=" w-[350px] md:w-[50%] p-6 ">
            <p className="">
              In the CBSE (Central Board of Secondary Education) system, the
              evaluation process for Class 10 includes both formative and
              summative assessments to ensure a comprehensive assessment of the
              students' learning. Here’s an outline of the marks distribution
              for Class 10 subjects, including Social Science:
            </p>
            <p className="font-bold mt-3 text-[1.2em]">
              Theory Examination (Board Exam)
            </p>
            <ol className=" flex flex-col gap-1  list-disc text-start px-12  mt-3 md:mt-1 ">
              <li>Total Marks: 80</li>
              <li>Duration: 3 hours</li>
            </ol>
            <p className="font-bold mt-3 text-[1.2em]">Internal Assessment</p>
            <ol className=" flex flex-col gap-1  list-disc text-start px-12  mt-3 md:mt-1">
              <li>Total Marks: 20</li>
            </ol>
            <p className="font-bold mt-3 text-[1.2em]">
              The internal assessment is further divided into:
            </p>
            <ol className=" flex flex-col gap-1  list-disc text-start px-12  mt-3 md:mt-1">
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
