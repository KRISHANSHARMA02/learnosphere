"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function PoliticalScience11th() {
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
            CBSE Class 11 Political Science Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row pt-2">
          <div className=" w-full  text-center pt-6">
            <p className="p-4">
              The CBSE Class 11 Political Science syllabus provides students
              with a foundational understanding of political structures and
              concepts. It covers the Indian Constitution, exploring its
              history, rights, and key institutions like the executive,
              legislature, and judiciary. The curriculum also addresses
              federalism, local governance, and electoral systems while
              introducing core political theories such as democracy, justice,
              and equality. Through this comprehensive approach, students gain
              insights into the functioning of political systems and the
              principles underpinning democratic governance.
            </p>
            <p className=" p-2">
              The CBSE Class 11 Political Science curriculum provides a detailed
              examination of both the theoretical foundations and practical
              workings of political systems. It begins with a comprehensive
              study of the Indian Constitution, exploring its historical
              context, foundational philosophy, and the processes involved in
              its formation. Students delve into the fundamental rights,
              directive principles, and duties enshrined in the Constitution,
              gaining an understanding of how these elements influence
              governance and civil liberties. The curriculum further explores
              the structure and function of key political institutions,
              including the executive (the President, Prime Minister, and
              Council of Ministers), the legislature (Parliament and State
              Legislatures), and the judiciary (Supreme Court and High Courts).
              It covers the principles of federalism, focusing on the
              distribution of powers between the central and state governments,
              and the role of local governments such as panchayats and
              municipalities. In addition, the course provides an introduction
              to political theory, covering core concepts such as freedom,
              equality, democracy, justice, rights,citizenship, nationalism, and
              secularism. This holistic approach aims to equip students with a
              deep understanding of political processes, institutional
              functions, and theoretical perspectives, fostering critical
              thinking about governance and democracy in both national and
              global contexts.{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg text-center   w-full md:w-[58%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 11th Political Science{" "}
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Political Science Political Theory
              </p>

              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-1/Political Theory An Introduction.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Political Theory: An Introduction{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Political Science/Part-1/Freedom.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                Freedom{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Political Science/Part-1/Equality.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                Equality{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-1/Social Justice.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                Social Justice{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Political Science/Part-1/Rights.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                Rights{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-1/Citizenship.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
                Citizenship{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-1/Nationalism.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
                Nationalism
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-1/Secularism.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
                Secularism
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Political Science Indian Constitution at Work
              </p>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-2/Constitution Why and How.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Constitution: Why and How?{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-2/Rights and Duties in the Indian Constitution.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Rights and Duties in the Indian Constitution{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-2/Election and Representation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                Election and Representation{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Political Science/Part-2/Executive.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                Executive{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-2/Legislature.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
                Legislature{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Political Science/Part-2/Judiciary.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Judiciary{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-2/Federalism.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Federalism{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-2/Local Governments.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
                Local Governments{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-2/Constitution as a Living Document.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span>
                Constitution as a Living Document{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
              <a
               className='text-[.9em] flex gap-2 hover:underline cursor-pointer'
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Political Science/Part-2/The Philosophy of the Constitution.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>The
                Philosophy of the Constitution{" "}
              <MdDownload className='text-orange-600 transition-all ease-in-out hover:scale-110 duration-300' size={22}/></a>
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
