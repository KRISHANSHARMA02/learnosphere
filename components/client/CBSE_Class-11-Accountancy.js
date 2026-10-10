"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function Accountancy11th() {
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
            CBSE Class 11 Accountancy Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row pt-2">
          <div className=" w-full  text-center pt-6">
            <p className="p-4">
              The CBSE Class 11 Accounting syllabus introduces students to the
              fundamentals of financial accounting, focusing on the principles
              and practices essential for effective business management. It
              covers key topics such as the preparation of financial statements,
              understanding of basic accounting principles, and practical
              applications of journal entries, ledgers, and trial balances. The
              curriculum includes practical exercises and real-world examples to
              enhance students' grasp of accounting concepts and techniques. By
              integrating theoretical knowledge with hands-on practice, the
              syllabus aims to build a strong foundation in accounting,
              preparing students for advanced studies in commerce and finance
              while fostering analytical and decision-making skills crucial for
              future career success.
            </p>
            <p className=" p-2">
              The CBSE Class 11 Accounting syllabus covers essential topics such
              as the preparation of financial statements, including the balance
              sheet and profit & loss account. It introduces fundamental
              accounting concepts like journals, ledgers, and trial balances,
              and emphasizes the importance of accuracy in recording financial
              transactions. The syllabus includes practical exercises on
              recording business transactions and adjustments, and understanding
              concepts like depreciation, provisions, and reserves. Through
              detailed examples and hands-on activities, students gain practical
              skills in maintaining books of accounts, analyzing financial data,
              and preparing accurate financial reports, laying a solid
              foundation for advanced accounting and finance studies.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg text-center   w-full md:w-[54%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 11th Accountancy{" "}
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Financial Accounting
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Accountancy/Part-1/Introduction to Accounting.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Introduction to Accounting
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Accountancy/Part-1/Theory Base of Accounting.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Theory Base of Accounting
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Accountancy/Part-1/Recording of Transactions – I.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                Recording of Transactions – I
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Accountancy/Part-1/Recording of Transactions – II.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Recording of Transactions – II
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Accountancy/Part-1/Bank Reconciliation Statement.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>Bank
                Reconciliation Statement
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Accountancy/Part-1/Trial Balance and Rectification of Errors.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>Trial
                Balance and Rectification of Errors
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Accountancy/Part-1/Depreciation, Provisions and Reserves.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
                Depreciation, Provisions and Reserves
              </a>
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Financial Accounting
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Accountancy/Part-2/Financial Statements -I.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                Financial Statements -I
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Accountancy/Part-2/Financial Statements -II.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Financial Statements - II
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />{" "}
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
