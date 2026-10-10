"use client";
import Footer1 from "@/components/Footer1";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ImBook } from "react-icons/im";
import { FaAddressBook, FaBook } from "react-icons/fa";
import { useEffect, useState } from "react";
import DownloadFormModal from "@/components/DownloadFormModal";
import { MdDownload } from "react-icons/md";
export default function Hindi11th() {
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
            CBSE Class 11 Hindi Syllabus{" "}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row pt-2">
          <div className=" w-full  text-center pt-6">
            <p className="p-4">
              The CBSE Class 11 Hindi syllabus aims to enhance students'
              understanding and appreciation of Hindi language and literature.
              It includes studying various literary genres such as prose,
              poetry, and drama, authored by renowned Indian writers. The
              curriculum emphasizes reading comprehension, critical analysis,
              and interpretation of texts. It also focuses on developing writing
              skills through essays, reports, and creative compositions. Grammar
              and vocabulary are integral parts of the syllabus, aiding in the
              refinement of language skills. The course encourages students to
              engage with cultural and linguistic heritage, fostering a deeper
              connection with the Hindi language.
            </p>
            <p className=" p-2">
              The CBSE Class 11 Hindi syllabus offers an in-depth exploration of
              the language's rich literary heritage, aiming to cultivate a
              profound understanding and appreciation of Hindi literature. The
              curriculum is structured to include a diverse range of literary
              forms such as prose, poetry, and drama, representing various
              periods and styles in Indian literature. Students engage with
              works by prominent authors and poets, analyzing themes, styles,
              and cultural contexts. The syllabus also emphasizes the
              development of advanced language skills, including grammar,
              vocabulary, and composition. Through essays, reports, and creative
              writing exercises, students are encouraged to express their
              thoughts and ideas effectively in Hindi. Additionally, the course
              covers the study of significant literary movements and their
              impact on society, providing a comprehensive understanding of the
              evolution of Hindi literature. The curriculum also incorporates
              lessons on linguistic structure and usage, enhancing students'
              command over the language. Overall, the Class 11 Hindi syllabus is
              designed to deepen students' knowledge of Hindi, foster critical
              thinking, and encourage a greater appreciation for India's
              linguistic and cultural diversity.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <p className="font-extrabold border-2 border-orange-500 p-4 mt-14 rounded-lg text-center   w-full md:w-[60%] m-auto  text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-orange-500 to-red-600  ">
            A Comprehensive Guide for Class 11th Hindi{" "}
          </p>
          <div className="flex flex-wrap gap-8 mb-10 md:mb-0 px-7 md:px-20">
            <div className=" flex flex-col gap-4  w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Aroh
              </p>
              <p className="font-bold  ml-6">[गद्य – खंड]</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/नमक का दारोगा.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>नमक
                का दारोगा{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/मियाँ नसीरुद्दीन.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>मियाँ
                नसीरुद्दीन{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/अपू के साथ ढाई साल.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span> अपू
                के साथ ढाई साल{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/विदाई-संभाषण.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>{" "}
                विदाई-संभाषण{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/गलता लोहा.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>गलता
                लोहा{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/रजनी.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 6 :</span>रजनी{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/जामुन का पेड़.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 7 :</span>जामुन
                का पेड़{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/भारत माता.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 8 :</span>भारत
                माता{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <p className="font-bold  ml-6">[काव्य – खंड]</p>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/हम तौ एक एक करि जांनां, संतों देखत जग बौराना.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 9 :</span> हम
                तौ एक एक करि जांनां, संतों देखत जग बौराना
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/मेरे तो गिरधर गोपाल दूसरो न कोई, पग घुँघरू बाधि मीरां नाची.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 10 :</span>{" "}
                मेरे तो गिरधर गोपाल दूसरो न कोई, पग घुँघरू बाधि मीरां नाची
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/घर की याद.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 11 :</span>घर
                की याद{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/चंपा काले-काले अच्छर नहीं चीन्हती.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 12 :</span>{" "}
                चंपा काले-काले अच्छर नहीं चीन्हती{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/गजल.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 13 :</span>गजल{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/हे भूख! मत मचल, हे मेरे जूही के फूल जैसे ईश्वर.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 14 :</span>हे
                भूख! मत मचल, हे मेरे जूही के फूल जैसे ईश्वर{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/सबसे खतरनाक.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 15 :</span>सबसे
                खतरनाक{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-1/आओ, मिलकर बचाएँ.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 16 :</span>आओ,
                मिलकर बचाएँ{" "}
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="font-bold text-black  flex items-center gap-1 text-[1.1em] ">
                <FaBook className="text-orange-500 " size={20} />
                Vitan
              </p>

              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-3/भारतीय गायिकाओं में बेजोड़ लता मंगेशकर.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 1 :</span>
                भारतीय गायिकाओं में बेजोड़ : लता मंगेशकर
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-3/राजस्थान की रजत बूँदें.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 2 :</span>
                राजस्थान की रजत बूँदें
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-3/आलो-आँधारि.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 3 :</span>
                आलो-आँधारि
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-3/भारतीय कलाएँ.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 4 :</span>
                भारतीय कलाएँ
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>
              <a
                className="text-[.9em] flex gap-2 hover:underline cursor-pointer"
                onClick={() =>
                  handleDownloadClick(
                    "https://learnosphere.in/public_pdf/Class-11 Hindi/Part-3/लेखकों के बारे में.pdf"
                  )
                }
              >
                <span className="font-bold text-[1em]">Chapter - 5 :</span>
                लेखकों के बारे में
                <MdDownload
                  className="text-orange-600 transition-all ease-in-out hover:scale-110 duration-300"
                  size={22}
                />
              </a>

              <p className="ml-6 font-bold text-orange-600">हिंदी व्याकरण</p>
              <p className="ml-10 font-bold">वर्णमाला और उनका प्रयोग</p>
              <li className="ml-14 ">
                Understanding and usage of the Hindi alphabet, including vowels
                (स्वर) and consonants (व्यंजन).
              </li>
            </div>

            <ol className="list-disc flex flex-col gap-4 text-[.9em] w-[300px] md:w-[500px] p-6 border-2 border-gray-200 rounded-xl shadow-2xl shadow-orange-200">
              <p className="ml-10 font-bold">संज्ञा (Nouns):</p>
              <li className="ml-14 ">
                <span className="font-semibold ">प्रकार: </span>Proper nouns
                (विशेषण), common nouns (साधारण संज्ञा), and collective nouns
                (संगठक संज्ञा).
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">विभक्ति: </span>Different cases
                and their usage in sentences.
              </li>

              <p className="ml-10 font-bold">सर्वनाम (Pronouns)</p>
              <li className="ml-14 ">
                <span className="font-semibold ">प्रकार:</span> Personal
                pronouns (व्यक्तिवाचक सर्वनाम), possessive pronouns (स्वत्ववाचक
                सर्वनाम), and demonstrative pronouns (संकेतवाचक सर्वनाम).
              </li>
              <p className="ml-10 font-bold">क्रिया (Verbs)</p>
              <li className="ml-14 ">
                <span className="font-semibold ">काल (Tenses):</span> Present,
                past, and future tenses.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">रूप (Forms): </span>Simple,
                continuous, and perfect forms.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">
                  परिवर्तनीयता (Conjugation):
                </span>{" "}
                Conjugation of verbs based on tense, number, and person.
              </li>
              <p className="ml-10 font-bold">विशेषण (Adjectives)</p>
              <li className="ml-14 ">
                <span className="font-semibold ">प्रकार:</span> Descriptive
                adjectives (गुणवाचक विशेषण), quantitative adjectives (मात्रावाचक
                विशेषण), and demonstrative adjectives (संकेतवाचक विशेषण).
              </li>
              <p className="ml-10 font-bold">क्रियाविशेषण (Adverbs)</p>
              <li className="ml-14 ">
                <span className="font-semibold ">प्रकार: </span>Adverbs of
                manner (विधि), time (काल), place (स्थान), and frequency
                (आवृत्ति).
              </li>
              <p className="ml-10 font-bold">संबंधसूचक शब्द (Prepositions)</p>
              <li className="ml-14 ">
                <span className="font-semibold ">प्रकार:</span> Prepositions
                showing relationships between nouns and other words (e.g., में,
                पर, के लिए).
              </li>
              <p className="ml-10 font-bold">संयोजन (Conjunctions)</p>
              <li className="ml-14 ">
                <span className="font-semibold ">प्रकार:</span> Coordinating
                conjunctions (संयोजक), subordinating conjunctions (उपसर्ग).
              </li>
              <p className="ml-10 font-bold">
                वाक्य निर्माण (Sentence Construction)
              </p>
              <li className="ml-14 ">
                <span className="font-semibold ">विधि:</span> Formation of
                sentences using proper word order and structure.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">वाक्य के प्रकार:</span> Simple,
                compound, and complex sentences.
              </li>
              <p className="ml-10 font-bold">
                उपसर्ग और प्रत्यय (Prefixes and Suffixes
              </p>
              <li className="ml-14 ">
                <span className="font-semibold ">उपसर्ग: </span>Prefixes used to
                modify meanings of words.
              </li>
              <li className="ml-14 ">
                <span className="font-semibold ">प्रत्यय: </span>Suffixes used
                to form different grammatical categories.
              </li>
              <p className="ml-10 font-bold">अलंकरण (Figures of Speech)</p>
              <li className="ml-14 ">
                Basic figures of speech used in Hindi literature and
                composition.
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
