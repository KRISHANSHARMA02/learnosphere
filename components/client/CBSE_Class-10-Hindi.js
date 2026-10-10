"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import { ImBook } from "react-icons/im";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";

export default function Hindi() {
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
      <div className="  p-0 md:p-12 flex flex-col justify-center font-Poppins mt-12">
        <div className="">
          <h1 className="p-4 md:text-4xl font-bold mt-8 bg-black text-orange-500 shadow-orange-900 shadow-2xl  w-full md:w-[55%] rounded-lg text-center m-auto">
            CBSE Syllabus for Class 10 Hindi{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row gap-10 ">
          <div className=" flex flex-col gap-4 pt-6 text-center md:text-start w-[340px] md:w-[45%]">
            <p className=" p-4">
              The Class 10 Hindi syllabus has been meticulously designed to
              cater to the diverse linguistic skills of students, ensuring a
              comprehensive understanding of literature, grammar, and writing
              skills. As we step into the academic year 2024-25, it's crucial
              for students and educators alike to get acquainted with the
              syllabus details to strategize their study and teaching plans
              effectively.
            </p>
            <p className=" p-4">
              कक्षा 10वीं हिंदी का पाठ्यक्रम छात्रों की विविध भाषाई क्षमताओं को
              ध्यान में रखते हुए, साहित्य, व्याकरण और लेखन कौशल की व्यापक समझ
              सुनिश्चित करने के लिए सावधानीपूर्वक तैयार किया गया है। जैसे ही हम
              शैक्षणिक वर्ष 2024-25 में प्रवेश कर रहे हैं, छात्रों और शिक्षकों
              दोनों के लिए यह महत्वपूर्ण है कि वे पाठ्यक्रम के विवरण से परिचित
              हों, ताकि अपनी अध्ययन और शिक्षण योजनाओं को प्रभावी ढंग से रणनीतिक
              बना सकें।
            </p>
          </div>

          <div className="overflow-x-auto pt-10 w-full md:w-[55%]">
            <table className="min-w-full border-collapse font-Poppins border border-gray-300">
              <thead>
                <tr>
                  <th
                    className="border border-orange-300 p-2 bg-orange-500 text-center"
                    colSpan="3"
                  >
                    परीक्षा भार विभाजन प्रथम सत्र
                  </th>
                </tr>
                <tr className=" bg-orange-400 border-orange-400">
                  <th className="border border-gray-300 p-2 text-center">
                    विषयवस्तु
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    उपभार
                  </th>
                  <th className="border border-gray-300 p-2 text-center">
                    कुलभार
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2" rowSpan="2">
                    1. अपठित गद्यांश (तर्क क्षमता एवं अभिव्यक्ति कौशल पर
                    बहुविकल्पीय प्रश्न पूछे जाएँगे)
                  </td>
                  <td className="border border-gray-300 p-2 text-center">10</td>
                  <td
                    className="border border-gray-300 p-2 text-center"
                    rowSpan="2"
                  >
                    10
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    अ. चार अपठित गद्यांशों में से कोई दो गद्यांश करने होंगे।
                    (200-250 शब्दों के 2 गद्यांश) (अंक 1 x 5 प्रश्न)
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    2. व्याकरण: पाठ्यपुस्तक में दिए गए भाषा-अध्ययन के आधार पर
                    बहुविकल्पीय प्रश्न (1 अंक x 16 प्रश्न)
                  </td>
                  <td
                    className="border border-gray-300 p-2 text-center"
                    colSpan="2"
                  >
                    16
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    1. पदबंध (5 में से किसी 4 के उत्तर)
                  </td>
                  <td className="border border-gray-300 p-2 text-center">4</td>
                  <td
                    className="border border-gray-300 p-2 text-center"
                    rowSpan="4"
                  >
                    16
                  </td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    2. रचना के आधार पर वाक्य रूपांतरण (5 में से किसी 4 के उत्तर)
                  </td>
                  <td className="border border-gray-300 p-2 text-center">4</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    3. समास (5 में से किसी 4 के उत्तर)
                  </td>
                  <td className="border border-gray-300 p-2 text-center">4</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-2">
                    4. मुहावरे (केवल 4 प्रश्न, सभी अनिवार्य)
                  </td>
                  <td className="border border-gray-300 p-2 text-center">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-wrap gap-8 px-7 md:px-20 mt-8">
          <div className="list-disc text-[.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
              <ImBook className="text-orange-600" />
              Kshitij
            </p>

            <p className="font-bold  ml-6">[काव्य – खंड]</p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/पद.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>पद{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/राम-लक्ष्मण-परशुराम संवाद.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>
              राम-लक्ष्मण-परशुराम संवाद{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/आत्मकथ्य.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              आत्मकथ्य{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/उत्साह और अट नहीं रही.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span> उत्साह
              और अट नहीं रही
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/यह दंतुरहित मुस्कान और फसल.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span> यह
              दंतुरहित मुस्कान और फसल
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/संगतकार.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span>{" "}
              संगतकार{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>

            <p className="font-bold  ml-6">[गद्य – खंड]</p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/नेताजी का चश्मा.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span> नेताजी
              का चश्मा{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/बालगोबिन भगत.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>
              बालगोबिन भगत{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/लखनवी अंदाज़.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 9 :</span> लखनवी
              अंदाज़{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/एक कहानी यह भी.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 10 :</span>एक
              कहानी यह भी{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/नौबतखाने में इबादत.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 11 :</span>{" "}
              नौबतखाने में इबादत{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-1/संस्कृति.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 12 :</span>{" "}
              संस्कृति{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>

            <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
              <ImBook className="text-orange-600" /> Sparsh
            </p>

            <p className="font-bold  ml-6">[काव्य – खंड]</p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/साखी.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span> साखी
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/पद.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>पद{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/मनुष्यता.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>
              मनुष्यता{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/पर्वत प्रदेश में पावस.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 4 :</span> पर्वत
              प्रदेश में पावस
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
          <div className="list-disc text-[.9em] flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/तोप.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 5 :</span>तोप{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/कर चले हम फ़िदा.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 6 :</span> कर चले
              हम फ़िदा{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/आत्मत्राण.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 7 :</span>{" "}
              आत्मत्राण{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>

            <p className="font-bold  ml-6">[गद्य – खंड]</p>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/बड़े भाई साहब.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 8 :</span>बड़े
              भाई साहब{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/डायरी का एक पन्ना.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 9 :</span>डायरी
              का एक पन्ना{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/तताँरा-वामीरो कथा.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 10 :</span>{" "}
              तताँरा-वामीरो कथा
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/तीसरी कसम के शिल्पकार शैलेंद्र.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 11 :</span>तीसरी
              कसम के शिल्पकार शैलेंद्र{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/अब कहाँ दूसरे के दुख से दुखी होने वाले.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 12 :</span> अब
              कहाँ दूसरे के दुख से दुखी होने वाले{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/पतझर में टूटी पत्तियाँ.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 13 :</span>पतझर
              में टूटी पत्तियाँ{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-2/कारतूस.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 14 :</span>{" "}
              कारतूस{" "}
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>

            <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
              <ImBook className="text-orange-600" /> Kritika
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-3/माता का आँचल.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>माता का
              आँचल
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-3/साना-साना हाथ जोड़ि.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span>{" "}
              साना-साना हाथ जोड़ि
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-3/मैं क्यों लिखता हूँ?.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span>मैं
              क्यों लिखता हूँ?
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <p className="font-bold text-[1.1em] flex items-center gap-2  ml-6 text-slate-800 text-center  ">
              <ImBook className="text-orange-600" /> Sanchayan{" "}
            </p>

            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-4/हरिहर काका.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 1 :</span>हरिहर
              काका
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-4/सपनों के-से दिन.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 2 :</span> सपनों
              के-से दिन
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
            <a
              className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
              onClick={() =>
                handleDownloadClick(
                  "https://learnosphere.in/public_pdf/Class-10 Hindi/Part-4/टोपी शुक्ला.pdf"
                )
              }
            >
              <span className="font-bold text-[1em]">Chapter - 3 :</span> टोपी
              शुक्ला
              <MdDownload
                className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                size={22}
              />
            </a>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row mt-10">
          <div className="w-full md:w-[45%]">
            <p className="text-start p-4">
              The CBSE Class 10 Hindi syllabus for the academic year 2024-25
              includes detailed content for both Hindi Course A and Course B.
            </p>
            <p className="text-start px-4 font-bold  text-orange-500 text-[1.3em]">
              Hindi Course A:
            </p>
            <ol className="text-start px-6 ml-5 mt-2 list-disc">
              <li className="font-semibold text-[1.2em] text-orange-400">
                Textbooks:
              </li>
              <li className="ml-8 mt-1">Kshitij</li>
              <li className="ml-8 mt-1">Kritika</li>
            </ol>

            <p className="text-start px-4 font-bold mt-4  text-orange-500 text-[1.3em]">
              व्याकरण के विषय:(Grammar Topics)
            </p>
            <ol className="text-start px-6 ml-5 mt-2 list-disc">
              <li className="ml-8 mt-1">Sandhi (संधि)</li>
              <li className="ml-8 mt-1">Samas (समास)</li>
              <li className="ml-8 mt-1">
                One Word Substitution (अनेक शब्दों के लिए एक शब्द)
              </li>
              <li className="ml-8 mt-1">Synonyms (पर्यायवाची)</li>
              <li className="ml-8 mt-1">Antonyms (विलोम)</li>
              <li className="ml-8 mt-1">Sentence Correction (वाक्य संशोधन)</li>
            </ol>
          </div>
          <div className="pt-6 items-center justify-center w-full  md:w-[55%] md:ml-12">
            <table className="table-auto  border-collapse border border-gray-500">
              <thead>
                <tr className="bg-orange-500">
                  <th className="border border-gray-500 p-3">sl no.</th>
                  <th className="border border-gray-500 p-3">Name</th>
                  <th className="border border-gray-500 p-3">marks</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-500 p-3">I</td>
                  <td className="border border-gray-500 p-3">
                    Reading Comprehension{" "}
                  </td>
                  <td className="border border-gray-500 p-3">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">II</td>
                  <td className="border border-gray-500 p-3">
                    Writing Skills{" "}
                  </td>
                  <td className="border border-gray-500 p-3">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">III</td>
                  <td className="border border-gray-500 p-3">Grammar </td>
                  <td className="border border-gray-500 p-3">10</td>
                </tr>
                <tr>
                  <td className="border border-gray-500 p-3">IV</td>
                  <td className="border border-gray-500 p-3">
                    क्षितिज(Kshitij ){" "}
                  </td>
                  <td className="border border-gray-500 p-3">30</td>
                </tr>

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
          <div></div>
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
