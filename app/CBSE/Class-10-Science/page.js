"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import science1 from "@/public/10thscience1.jpg";
import science2 from "@/public/10thscience2.jpg";
import science3 from "@/public/10thscience3.jpg";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function Science() {
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
      <div className=" p-0 md:p-12   flex flex-col justify-center font-Poppins mt-12">
        <div className="">
          <h1 className="p-4 md:text-4xl font-bold mt-8 bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Syllabus for Class 10 Science{" "}
          </h1>
        </div>
        <div className="flex  gap-6">
          <div className="flex flex-col md:flex-row w-full">
            <div className=" pt-8  w-full md:w-[50%]">
              <p className="text-start p-4 ">
                The CBSE Class 10 Science syllabus for the 2024-25 academic year
                is a vital tool for students gearing up for their board exams.
                Crafted in line with the CBSE Board's guidelines, this syllabus
                aims to provide a clear roadmap for mastering the essentials of
                Science, encompassing Physics, Chemistry, and Biology. The good
                news for students is that there haven't been significant changes
                from last year's syllabus, allowing for a smooth transition and
                focused preparation.
              </p>
              <p className="text-start p-4 ">
                This syllabus provides a comprehensive understanding of the
                fundamental principles of science and their applications in
                everyday life. If you need details on any specific topic or a
                particular concept, just let me know!
              </p>
            </div>

            <div className="pt-8 items-center justify-center font-Poppins md:ml-9 ">
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
                    <td className="border border-gray-500 p-2">
                      Chemical Substances – Nature and Behaviour
                    </td>
                    <td className="border border-gray-500 p-2">
                      Chemical Reactions <br />
                      Acids, Bases and Salts
                      <br />
                      Metals and Non-metals
                      <br />
                      Carbon Compounds
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-gray-500 p-2">II</td>
                    <td className="border border-gray-500 p-2">
                      {" "}
                      World of Living
                    </td>
                    <td className="border border-gray-500 p-2">
                      Life Processes
                      <br />
                      Control and Co-ordination in Animals and Plants
                      <br />
                      Reproduction
                      <br />
                      Heredity and Evolution
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 p-2">III</td>
                    <td className="border border-gray-500 p-2">
                      Natural Phenomena{" "}
                    </td>
                    <td className="border border-gray-500 p-2">
                      {" "}
                      Reflection of Light by Curved Surfaces
                      <br />
                      Refraction
                      <br />
                      Refraction of Light by Spherical Lens
                      <br />
                      Refraction of Light Through a Prism
                      <br />
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 p-2">IV</td>
                    <td className="border border-gray-500 p-2">
                      {" "}
                      Effects of Current{" "}
                    </td>
                    <td className="border border-gray-500 p-2">
                      Electric Current, Potential Difference and Electric
                      Current
                      <br />
                      Magnetic Effects of Current
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-500 p-2">V</td>
                    <td className="border border-gray-500 p-2">
                      Natural Resources{" "}
                    </td>
                    <td className="border border-gray-500 p-2">
                      Our Environment
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 px-7 md:px-20">
          <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
              <FaBook className="text-orange-500 " size={20} />
              Science
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Science/Chemical Reactions and Equations.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
              Chemical Reactions and Equations
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Science/Acids, Bases and Salts.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span> Acids,
              Bases and Salts{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Science/Metals and Non-metals.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>Metals
              and Non-metals{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Science/Carbon and Its Compounds.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span> Carbon
              and Its Compounds
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 Science/Life Processes.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>Life
              Processes{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Science/Control and Coordination .pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>Control
              and Coordination{" "}
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
                  "https://learnosphere.in/public_pdf/Class-10 Science/How do Organisms Reproduce?.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>How do
              Organisms Reproduce?
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Science/Heredity and Evolution.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>{" "}
              Heredity and Evolution{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Science/Light Reflection and Refraction.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 9 :</span> Light
              Reflection and Refraction{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Science/Human Eye and Colourful World.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 10 :</span> Human
              Eye and Colourful World{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 Science/Electricity.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 11 :</span>
              Electricity{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Science/Magnetic Effects of Electric Current.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 12 :</span>
              Magnetic Effects of Electric Current{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick("https://learnosphere.in/public_pdf/Class-10 Science/Our Environment.pdf")
              }
            >
              <span className="font-bold text-[1em]">Chapter - 13 :</span> Our
              Environment{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className=" pt-8 p-4  flex flex-col gap-20  ">
          <div className="flex flex-col md:flex-row gap-12">
            <Image
              className=" h-64 md:h-96 w-[320px] md:w-[550px] "
              src={science1}
              height={300}
              width={300}
              alt="science"
            />
            <ol className="flex flex-col gap-4 p-6 w-[300px] md:w-[600px] ">
              <li className="text-orange-600    font-bold text-[1.2em]">
                Physics
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Light:
                </span>{" "}
                Reflection and refraction, image formation by lenses and
                mirrors, dispersion.
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Human Eye and Colourful World:
                </span>{" "}
                Working of the human eye, defects of vision, and correction,
                dispersion of light, rainbow.
              </li>
              <li>
                <span className="text-orange-600  font-semibold">
                  Electricity:
                </span>{" "}
                Ohm’s law, resistors in series and parallel, heating effects of
                electric current, electric power.
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Magnetic Effects of Current:{" "}
                </span>
                Magnetic field due to current, electromagnets, electric motor.
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Sources of Energy:
                </span>{" "}
                Renewable and non-renewable sources of energy, conventional and
                non-conventional sources.
              </li>
            </ol>
          </div>
          <div className="flex  flex-col-reverse md:flex-row  gap-12">
            <ol className="flex flex-col gap-4 p-6  w-[300px] md:w-[600px] ">
              <li className="text-orange-600 font-bold text-[1.2em] ">
                Chemistry
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Chemical Reactions and Equations:
                </span>{" "}
                Types of chemical reactions, balancing of chemical equations.
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Acids, Bases, and Salts:
                </span>
                Properties, pH scale, neutralization reactions.
              </li>
              <li>
                <span className="text-orange-600  font-semibold">
                  Metals and Non-metals:
                </span>
                Properties, reactivity series, corrosion.
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Carbon and its Compounds:{" "}
                </span>
                Organic compounds, hydrocarbons, alcohols, ethers, and their
                uses.
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Periodic Classification of Elements:
                </span>{" "}
                Modern periodic table, periodic trends, and properties of
                elements.
              </li>
            </ol>
            <Image
              className="h-64 md:h-96 w-[320px] md:w-[550px] "
              src={science2}
              height={300}
              width={300}
              alt="science2"
            />
          </div>
          <div className="flex  flex-col md:flex-row  gap-12">
            <Image
              className="h-64 md:h-96 w-[320px] md:w-[550px] "
              src={science3}
              height={300}
              width={300}
              alt="science3"
            />
            <ol className="flex flex-col gap-4 p-6 w-[300px] md:w-[600px] ">
              <li className="text-orange-600 font-bold text-[1.2em]">
                Biology
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Life Processes:
                </span>
                Nutrition, respiration, transportation, and excretion in plants
                and animals.
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Control and Coordination:
                </span>{" "}
                Nervous system, endocrine system, hormones.
              </li>
              <li>
                <span className="text-orange-600  font-semibold">
                  Reproduction:{" "}
                </span>
                Human reproduction, reproductive health.
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Heredity and Evolution:{" "}
                </span>
                Principles of inheritance, evolution, and evidence of evolution.
              </li>
              <li>
                {" "}
                <span className="text-orange-600  font-semibold">
                  Our Environment:{" "}
                </span>{" "}
                Ecosystems, environmental problems, and conservation.
              </li>
            </ol>
          </div>
          <ol className="flex flex-col gap-3 shadow-2xl p-6 border-2 border-orange-200 transition-all ease-in- duration-300 hover:scale-95 ">
            <li className="text-orange-600 font-bold text-[1.2em]">
              Parctical Work
            </li>
            <li>
              {" "}
              <span className="text-orange-600  font-semibold">
                Experiments:
              </span>{" "}
              Conducting experiments related to the topics covered, including
              physical and chemical changes, measuring pH, and studying plant
              and animal tissues.
            </li>
            <li>
              {" "}
              <span className="text-orange-600  font-semibold">
                Project Work:
              </span>{" "}
              Application of concepts learned in real-life scenarios or
              investigative projects.
            </li>
          </ol>
        </div>
        <div className="flex flex-col md:flex-row gap-6 ">
          <div className="pt-6 items-center justify-center w-full  md:w-[50%] md:ml-12">
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
                  <td className="border border-gray-500 p-3">
                    Chemical Substances – Nature and Behaviour{" "}
                  </td>
                  <td className="border border-gray-500 p-3">25</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">II</td>
                  <td className="border border-gray-500 p-3">
                    World of Living{" "}
                  </td>
                  <td className="border border-gray-500 p-3">25</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">III</td>
                  <td className="border border-gray-500 p-3">
                    Natural Phenomena{" "}
                  </td>
                  <td className="border border-gray-500 p-3">12</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">IV</td>
                  <td className="border border-gray-500 p-3">
                    Effects of Current{" "}
                  </td>
                  <td className="border border-gray-500 p-3">13</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">V</td>
                  <td className="border border-gray-500 p-3">
                    Natural Resources{" "}
                  </td>
                  <td className="border border-gray-500 p-3">05</td>
                </tr>
                {/* <tr>
            <td className="border border-gray-500 p-3">VI</td>
            <td className="border border-gray-500 p-3">Mensuration</td>
            <td className="border border-gray-500 p-3">10</td>
            </tr>
        <tr>
        <td className="border border-gray-500 p-3">VII</td>
        <td className="border border-gray-500 p-3">Statistics & Probability</td>
        <td className="border border-gray-500 p-3">11</td>
        </tr> */}
                <tr>
                  <th className="border border-gray-500 p-3"></th>
                  <th className="border border-gray-500 p-3">Total</th>
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
          <div className=" w-[340px] md:w-[50%] text-center md:text-start mt-6">
            <p className="">
              In the CBSE (Central Board of Secondary Education) system, the
              evaluation process for Class 10 includes both formative and
              summative assessments to ensure a comprehensive assessment of the
              students' learning. Here’s an outline of the marks distribution
              for Class 10 subjects, including Science:
            </p>
            <p className="font-bold mt-3 text-[1.2em]">
              Theory Examination (Board Exam)
            </p>
            <ol className=" flex flex-col gap-1  list-disc text-start px-12  mt-3 md:mt-1  ">
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
            <ol className=" flex flex-col gap-1  list-disc text-start px-12  mt-3 md:mt-1 ">
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

// <div className="pt-8 items-center justify-center font-Poppins md:ml-12">
// <table className="table-auto  border-collapse border border-gray-500">
//     <thead>
//         <tr className='bg-orange-500'>
//             <th className="border  border-gray-500 p-2">units</th>
//             <th className="border  border-gray-500 p-2">units Name</th>
//             <th className="border  border-gray-500 p-2">Sections</th>
//         </tr>
//     </thead>
//     <tbody className='text-center'>

//         <tr>
//             <td className="border border-gray-500 p-2">I</td>
//             <td className="border border-gray-500 p-2">Chemical Substances – Nature and Behaviour</td>
//             <td className="border border-gray-500 p-2">Chemical Reactions <br />Acids, Bases and Salts<br />

//                 Metals and Non-metals<br />

//                 Carbon Compounds</td>

//         </tr>

//         <tr>
//             <td className="border border-gray-500 p-2">II</td>
//             <td className="border border-gray-500 p-2">	World of Living</td>
//             <td className="border border-gray-500 p-2">Life Processes<br />
//                 Control and Co-ordination in Animals and Plants<br />

//                 Reproduction<br />

//                 Heredity and Evolution</td>
//         </tr>
//         <tr>
//             <td className="border border-gray-500 p-2">III</td>
//             <td className="border border-gray-500 p-2">Natural Phenomena	</td>
//             <td className="border border-gray-500 p-2">		Reflection of Light by Curved Surfaces<br />
//                 Refraction<br />

//                 Refraction of Light by Spherical Lens<br />

//                 Refraction of Light Through a Prism<br />
//             </td>
//         </tr>
//         <tr>
//             <td className="border border-gray-500 p-2">IV</td>
//             <td className="border border-gray-500 p-2">	Effects of Current	</td>
//             <td className="border border-gray-500 p-2">Electric Current, Potential Difference and Electric Current<br />
// Magnetic Effects of Current</td>
//         </tr>
//         <tr>
//             <td className="border border-gray-500 p-2">V</td>
//             <td className="border border-gray-500 p-2">Natural Resources	</td>
//             <td className="border border-gray-500 p-2">Our Environment
// </td>
//         </tr>

//     </tbody>
// </table>
// </div>
