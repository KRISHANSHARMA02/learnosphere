"use client";
import React, { useEffect, useState } from "react";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ImBook } from "react-icons/im";
import { FaBook } from "react-icons/fa";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function Physics11th() {
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
            CBSE Class 11 Physics Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row pt-2">
          <div className=" w-full  text-center pt-6">
            <p className="p-4">
              The CBSE Class 11 curriculum is designed to provide students with
              a broad and balanced education, preparing them for advanced
              studies and laying the groundwork for a successful academic and
              professional career. It covers a range of subjects, including core
              disciplines like Physics, Chemistry, Biology, and Mathematics,
              along with Humanities and Commerce streams offering subjects such
              as Economics, History, Political Science, Business Studies, and
              Accountancy. The curriculum emphasizes a deep understanding of
              fundamental concepts, critical thinking, and analytical skills. It
              integrates practical knowledge through laboratory experiments,
              project work, and field studies, promoting experiential learning.
            </p>
            <p className=" p-2">
              The Class 11 Physics curriculum provides a comprehensive
              introduction to the fundamental principles of physics, exploring
              the nature and properties of matter, energy, and the forces
              governing the universe. It begins with physical world concepts,
              units, and measurements, emphasizing the precision and accuracy
              required in scientific observations. The study of kinematics and
              dynamics delves into the motion of objects, Newton's laws of
              motion, and the concepts of work, energy, and power, forming the
              basis for understanding mechanics. The curriculum also covers
              rotational motion, gravitation, and properties of bulk matter,
              including elasticity, fluid mechanics, and thermal properties.
              Waves and oscillations are explored in detail, explaining
              phenomena like simple harmonic motion and wave propagation.
              Thermodynamics introduces the laws governing heat and work, while
              the kinetic theory of gases provides a molecular-level explanation
              of temperature and pressure. The course also includes an
              introduction to electrostatics and current electricity,
              highlighting electric fields, potential, capacitors, and circuits.
              Finally, it touches on magnetism, electromagnetic waves, and
              optics, offering a glimpse into the electromagnetic spectrum and
              the behavior of light. This curriculum lays a strong foundation
              for advanced studies in physics, emphasizing both theoretical
              concepts and practical applications, and nurturing a scientific
              mindset essential for exploring the physical world.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg text-center   w-full md:w-[54%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 11th Physics{" "}
          </p>
          <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8 ">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Physics Part - I
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-1/Units and Measurements.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>{" "}
                Units and Measurements
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-1/Motion in a Straight Line.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                Motion in a Straight Line{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-1/Motion in a plane.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                Motion in a plane{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-1/Laws of motion.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>Laws
                of motion{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-1/Work Energy and power.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span> Work
                Energy and power{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-1/System of particles and Rotational Motion.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
                System of particles and Rotational Motion
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-1/Gravitation.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>
                Gravitation{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
            </div>
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Physics Part - II
              </p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-2/Mechanical Properties Of Solids.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                Mechanical Properties Of Solids{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-2/Mechanical Properties Of Fluids.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
                Mechanical Properties Of Fluids
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-2/Thermal Properties of matter.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>{" "}
                Thermal Properties of matter
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-2/Thermodynamics.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                Thermodynamics{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-2/Kinetic Theory.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>{" "}
                Kinetic Theory
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Physics/Part-2/Oscillations.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>
                Oscillations{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick("https://learnosphere.in/public_pdf/Class-11 Physics/Part-2/Waves.pdf")
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>Waves{" "}
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
