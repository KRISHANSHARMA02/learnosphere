"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use } from "react";
import Banner2 from "@/public/Banner2.jpeg";
import Link from "next/link";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Sociallinks2 from "@/components/Sociallinks2";
import FormSection from "@/components/FormGeneral";
import { FaqItem } from "@/components/Faqs";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const cbseSyllabusLinks = [
  "CBSE Class 12 Syllabus",
  "CBSE Class 11 Syllabus",
  "CBSE Class 10 Syllabus",
  "CBSE Class 9 Syllabus",
];

const normalizeTitle = (title) => {
  return title.replace(/\s+/g, '').toLowerCase();
};

const RelatedPage = (props) => {
  const params = use(props.params);
  const { slug } = params;
  const router = useRouter();
  
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadedUrls, setUploadedUrls] = useState({});
  const [selectedPdf, setSelectedPdf] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });

    // Fetch PDF map
    axios.get(`${WEB_BACKEND_URL}/api/cbse-papers`)
      .then(res => {
        if (res.data && res.data.data) {
          const urlMap = {};
          res.data.data.forEach(paper => {
            if (paper.title) urlMap[normalizeTitle(paper.title)] = paper.s3_url;
          });
          setUploadedUrls(urlMap);
        }
      })
      .catch(err => console.error("Error fetching ICS papers:", err));

    const fetchData = async () => {
      try {
        setLoading(true);
        const backendBase = (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))
          ? "https://learnospherebackend.learnosphere.in"
          : (WEB_BACKEND_URL || "https://learnospherebackend.learnosphere.in");
        const response = await axios.get(
          `${backendBase}/api/route/cbse-related/${slug}`
        );
        if (response.data && response.data.data) {
          setData(response.data.data);
        } else {
          const localRes = await axios.get(`https://learnospherebackend.learnosphere.in/api/route/cbse-related/${slug}`);
          if (localRes.data && localRes.data.data) {
              setData(localRes.data.data);
          } else {
              setError("Content not found");
          }
        }
      } catch (err) {
        try {
            const localRes = await axios.get(`https://learnospherebackend.learnosphere.in/api/route/cbse-related/${slug}`);
            if (localRes.data && localRes.data.data) {
                setData(localRes.data.data);
                setError(null);
            } else {
                setError("Error fetching content");
            }
        } catch(e) {
            console.error("Error fetching data:", err);
            setError("Error fetching content");
        }
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery) {
      window.location.href = `/SearchResult?query=${searchQuery}`;
    }
  };

  const renderResourceLink = (title) => {
    if (!title) return <span>No title available</span>;
    const finalPdfUrl = uploadedUrls[normalizeTitle(title)];
    
    return finalPdfUrl ? (
      <button 
        className="w-full block text-left cursor-pointer"
        onClick={() => {
          setSelectedPdf(finalPdfUrl);
          setTimeout(() => {
            document.getElementById('pdf-viewer')?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      >
        {title}
      </button>
    ) : (
      <button
        className="w-full block text-left cursor-pointer"
        onClick={() => alert("PDF not uploaded yet for this paper.")}
      >
        {title}
      </button>
    );
  };

  if (loading) return <div className="text-gray-600 p-20 text-center font-bold text-xl">Loading...</div>;
  if (error || !data) return <div className="text-red-500 p-20 text-center font-bold text-xl">{error || "Page not found"}</div>;

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 font-Poppins">
        <div className="px-4 md:px-28 flex flex-col lg:flex-row gap-6 bg-gray-100 container mx-auto pt-24 pb-20">
          
          {/* Left Side Content */}
          <div className="flex flex-col w-full lg:w-[65%]">
            
            <h1 className="mb-6 p-4 text-white text-[1.4em] bg-orange-600 font-bold">
              {data.title}
            </h1>

            <div className="mb-6 rounded-lg overflow-hidden shadow-sm">
                <Image src={Banner2} alt="Learnosphere Banner" className="w-full object-cover" />
            </div>

            {data.introPoints && data.introPoints.length > 0 && (
              <div className="mb-8">
                <ul className="list-disc text-gray-800 pl-6 space-y-2">
                  {data.introPoints.map((point, index) => (
                    <li key={index} className="text-[1.1em]">{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {data.syllabus && (
              <div className="mb-8 border border-slate-800 bg-white">
                <h2 className="text-white bg-orange-600 p-4 font-bold text-center text-[1.2em]">
                  {data.syllabus.title}
                </h2>
                <div className="p-4">
                  <ul className="list-disc pl-5 space-y-2 text-gray-800">
                    {data.syllabus.topics.map((topic, index) => (
                      <li key={index} className="border-b border-gray-200 pb-2 last:border-0">{topic}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {data.whyChooseUs && data.whyChooseUs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-slate-800 text-[1.3em] font-bold mb-4">
                  Why Choose Learnosphere?
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-800">
                  {data.whyChooseUs.map((point, index) => (
                    <li key={index} className="text-[1.1em]">{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {data.faqs && data.faqs.length > 0 && (
              <div className="mb-8">
                <h2 className="text-slate-800 text-[1.3em] font-bold mb-4">
                  Frequently Asked Questions (FAQs)
                </h2>
                <div>
                  {data.faqs.map((faq, index) => (
                    <FaqItem key={index} question={faq.question} answer={faq.answer} />
                  ))}
                </div>
              </div>
            )}

            {data.resources && data.resources.length > 0 && (
              <div className="mb-10 border border-slate-800 bg-white">
                 <table className="min-w-full">
                    <tbody>
                        {data.resources.map((resource, index) => (
                            <tr key={index}>
                                <td className={`py-3 px-5 hover:bg-gray-100 font-medium text-gray-800 cursor-pointer ${index !== data.resources.length - 1 ? "border-b border-slate-800" : ""}`}>
                                    {renderResourceLink(resource)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
              </div>
            )}

            {selectedPdf && (
              <div id="pdf-viewer" className="mt-8 mb-8 text-center flex flex-col items-center">
                <ToastContainer />
                <h2 className="text-2xl font-semibold text-orange-700 mb-4">View PDF</h2>
                <button
                  onClick={() => {
                    if (isLoggedIn) {
                      window.open(selectedPdf, "_blank");
                    } else {
                      toast.info("Please log in as a student to continue", { position: "top-center", autoClose: 2000 });
                      setTimeout(() => router.push("/Student"), 2000);
                    }
                  }}
                  className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition relative z-10"
                >
                  View / Download PDF
                </button>
                
                <div className="relative w-full h-[600px] border rounded-xl my-4 shadow-md bg-white overflow-hidden flex flex-col mt-4">
                  {isLoggedIn ? (
                    <iframe
                      src={`${selectedPdf}#toolbar=0&navpanes=0&scrollbar=0`}
                      width="100%"
                      height="100%"
                      style={{ border: "none" }}
                      title="PDF Viewer"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-6 relative">
                      <div className="w-3/4 space-y-4 blur-sm opacity-50 absolute top-10 left-10 right-10 bottom-10 pointer-events-none select-none">
                         <div className="h-4 bg-gray-400 rounded w-full"></div>
                         <div className="h-4 bg-gray-400 rounded w-full"></div>
                         <div className="h-4 bg-gray-400 rounded w-4/5"></div>
                      </div>
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md z-20">
                        <p className="text-lg font-semibold text-gray-800 mb-2">Please log in to view the full PDF</p>
                        <p className="text-gray-600 mb-4 text-center max-w-md">You are seeing a limited preview. Log in to access the complete document.</p>
                        <button
                          onClick={() => router.push("/Student")}
                          className="px-5 py-2 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition"
                        >
                          Login to View PDF
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {data.relatedLinks && data.relatedLinks.length > 0 && (
              <div className="mt-8 border border-slate-300 rounded-xl p-6 bg-white shadow-sm">
                <h2 className="font-bold text-[1.3em] text-slate-800 mb-6">
                  CBSE Important Links
                </h2>
                <ul className="flex flex-wrap gap-4 w-full">
                  {data.relatedLinks.map((link, index) => (
                    <li
                      key={index}
                      className="w-full md:w-[48%] p-4 bg-gray-200 rounded-lg font-semibold text-orange-600 hover:bg-orange-600 hover:text-white transition-all ease-in-out duration-150 shadow-sm flex items-center justify-center text-center cursor-pointer"
                    >
                      <Link href={`/Cbse-Notes/${link.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").toLowerCase()}`} className="w-full h-full flex items-center justify-center">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}



          </div>

          {/* Right Side Sidebar */}
          <div className="w-full lg:w-[35%] flex flex-col gap-6">
            
            <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
              <input
                type="text"
                placeholder="Type To Search"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Removed sticky top-24 so it doesn't scroll/stick */}
            {/* Removed extra heading to avoid duplicate Join Learnosphere text */}
            <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200">
              <FormSection />
            </div>

          </div>

        </div>
      </div>
      
      <Sociallinks2 />
      <Footer1 />
      <Footer />
    </>
  );
};

export default RelatedPage;


