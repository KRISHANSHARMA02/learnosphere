"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import DynamicFAQSection from "@/components/DynamicFAQSection";
import React, { useEffect, useState, use } from "react";
import Banner2 from "@/public/Banner2.jpeg";
import Link from "next/link";
import Banner1 from "@/public/Banner1.jpeg";
import Swal from "sweetalert2";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import WhatsappModal from "@/components/whatsappModal";
import Sociallinks2 from "@/components/Sociallinks2";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSession, signOut } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify"; // <-- Add this if not already
import "react-toastify/dist/ReactToastify.css"; // Also add this if not already
import FormSection from '@/components/FormGeneral';


const DataTable = ({ data, slug: propSlug }) => {
  const params = useParams();
  const currentSlug = propSlug || params?.slug;
  //const params = use(props.params);
  // const { slug } = params;
  //const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [Class, setClass] = useState(null);
  const [dataId, setDataId] = useState(null); // New state for ID

  const [searchQuery, setSearchQuery] = useState("");

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const handleDownloadClick = async (pdfUrl) => {
    if (!session) {
      toast.info("Please log in as a student to continue", {
        position: "top-center",
        autoClose: 2000,
      });

      setTimeout(() => {
        router.push("/Student");
      }, 2000);

      return;
    }

    // If logged in → allow download
    window.open(pdfUrl, "_blank");
  };

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 10000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
  }, []);

    const [cbsePapersList, setCbsePapersList] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res10 = await fetch(WEB_BACKEND_URL + '/api/route/cbse-sample-papers/class-10').then(r => r.json());
        const res12 = await fetch(WEB_BACKEND_URL + '/api/route/cbse-sample-papers/class-12').then(r => r.json());
        const list = [...(res10.data || []), ...(res12.data || [])];
        setCbsePapersList(list);
      } catch (err) {
        console.error("Error fetching cbse papers", err);
      }
    };
    fetchPapers();
  }, []);

  const handlePaperClick = (title) => {
    if(!title) return;
    const lowerTitle = title.toLowerCase();
    
    // 1. Try exact match
    let match = cbsePapersList.find(p => p.title && p.title.toLowerCase() === lowerTitle);
    
    // 2. If no exact match, fallback to logic:
    if (!match) {
      const isClass12 = lowerTitle.includes('class 12') || lowerTitle.includes('class 12th');
      const targetClass = isClass12 ? '12' : '10';
      
      let targetSubject = null;
      if (lowerTitle.includes('math')) targetSubject = 'math';
      else if (lowerTitle.includes('science')) targetSubject = 'science';
      else if (lowerTitle.includes('physics')) targetSubject = 'physics';
      else if (lowerTitle.includes('chemistry')) targetSubject = 'chemistry';
      
      let filtered = cbsePapersList.filter(p => String(p.class_level) === targetClass);
      if (targetSubject) {
        let subjectFiltered = filtered.filter(p => p.subject && p.subject.toLowerCase().includes(targetSubject));
        if (subjectFiltered.length > 0) filtered = subjectFiltered;
      }
      
      if (filtered.length > 0) match = filtered[0];
    }
    
    if (match && match.s3_url) {
      setSelectedPdfUrl(match.s3_url);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error("Paper not available yet.", { position: "top-center" });
    }
  };
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    // Trigger the redirect when the Enter key is pressed
    if (e.key === "Enter" && searchQuery) {
      // Redirect to ContentFound with the search query as a URL parameter
      window.location.href = `/SearchResult?query=${searchQuery}`;
    }
  };


  const router = useRouter();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             setLoading(true);
  //             setError('');

  //             const response = await axios.get(`${WEB_BACKEND_URL}/api/route/samplepaperspdf/${slug}`);
  //             console.log('API Response:', response.data);
  //             console.log('Slug from use:', slug);

  //             if (response.data && response.data.data) {
  //                 setData(response.data.data);
  //             } else {
  //                 setData([]); // No data found
  //             }
  //         } catch (err) {
  //             console.error('Error fetching data:', err);
  //             setError(err.response?.data?.message || 'Error fetching data.');
  //             setData([]);
  //         } finally {
  //             setLoading(false);
  //         }
  //     };

  //     if (slug) fetchData();
  // }, [slug]);

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Navbar />
     <div className='bg-gray-100 font-Poppins'>
      <div className='px-4 md:px-28 flex flex-col md:flex-row gap-6 bg-gray-100 container mx-auto pt-24'>
        <div className='flex flex-col gap-5 w-full md:w-[65%]'>
          <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">

          </div>
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={item.id} className="mb-4">
                {index === 0 ? (
                  <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold">
                    {item.heading1}
                  </h1>
                ) : (
                  <h2 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold">
                    {item.heading1}
                  </h2>
                )}
                <p className="mb-2 mt-4 text-gray-800">{item.para1}</p>
                {item.heading2 && (
                  <h2 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                    {item.heading2}
                  </h2>
                )}
                <p className="mb-2 mt-4 text-gray-800">{item.para2}</p>
                {item.heading3 && (
                  <h2 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                    {item.heading3}
                  </h2>
                )}
                <p className="mb-2 mt-4 text-gray-800">{item.para3}</p>

                {item.imageUrls && item.imageUrls.length > 0 && (
                  <div className="flex gap-4 mt-4">
                    {item.imageUrls.map((imageUrl, index) => (
                      <Image
                        key={index}
                        src={imageUrl}
                        alt={`Image ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}

                {/* Display PDF if available */}
                <ToastContainer />
                {(selectedPdfUrl || item.pdfUrl) && (
                  <div className="mb-8 text-center">
                    <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                      Download Full Syllabus (PDF)
                    </h2>
                    {isLoggedIn ? (
                      <button
                        onClick={() =>handleDownloadClick(selectedPdfUrl || item.pdfUrl)}
                        className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition"
                      >
                        📄 View / Download PDF
                      </button>
                    ) : (
                      <button
                        onClick={handleDownloadClick}
                        className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition"
                      >
                        📄 View / Download PDF
                      </button>
                    )}
                    <div className='my-4'>
                      {isLoggedIn ? (
                        // ✅ Logged-in user sees the full PDF
                        <iframe
                          src={`${selectedPdfUrl || item.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                          width="100%"
                          height="500px"
                          style={{
                            border: "none",
                            overflow: "hidden",
                          }}
                          title="PDF Viewer"
                        >
                          This browser does not support PDFs. Please download the PDF to view it:
                          <a href={selectedPdfUrl || item.pdfUrl}>Download PDF</a>
                        </iframe>
                      ) : (
                        // 🚫 Logged-out user sees only preview + login overlay
                        <div className="relative w-full h-[500px] border rounded-xl overflow-hidden">
                          {/* Preview (blurred 1st page) */}
                          <iframe
                            src={`${selectedPdfUrl || item.pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
                            width="100%"
                            height="100%"
                            style={{
                              border: "none",
                              pointerEvents: "none",
                            }}
                            title="PDF Preview"
                          />

                          {/* Overlay message */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm p-6 rounded-xl">
                            <p className="text-lg font-semibold text-gray-800 mb-2">
                              🔒 Please log in to view the full PDF
                            </p>
                            <p className="text-gray-600 mb-4 text-center max-w-md">
                              You’re seeing a limited preview. Log in to access the complete document.
                            </p>
                            <button
                              onClick={() => router.push("/Student")}
                              className="px-5 py-2 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition"
                            >
                              Log In
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                <p className="mb-2 mt-4 text-gray-800">{item.para13}</p>

                {item.heading4 && (
                  <h3 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                    {item.heading4}
                  </h3>
                )}
                <p className="mb-2 mt-4 text-gray-800">{item.para4}</p>

                <div className="rounded-xl bg-orange-100 grid border border-slate-800 mt-4">
                  {item.heading8 ? ( // Check if item.heading8 has a value
                    (<h3 className="p-4 font-bold text-center border-black border-b text-[1.2em]">
                      {item.heading8}
                    </h3>)
                  ) : null}
                  <p>{item.para9}</p>

                  {(item.tableData && item.tableData.length > 0) ||
                    (item.anotherField && item.anotherField.length > 0) ? (
                    <table className="rounded-xl min-w-full text-orange-600 text-[.9em] font-semibold bg-white">
                      <tbody className="rounded-xl">
                        <tr>
                          {/* Render the first column for tableData only if there is data */}
                          {item.tableData && item.tableData.length > 0 ? (
                            <td className="border border-slate-800">
                              {item.tableData.map((dataItem, index) => (
                                <div key={index} onClick={() => handlePaperClick(dataItem)} className={`py-2 px-4 cursor-pointer hover:bg-gray-100 ${index === item.tableData.length - 1 ? '' : 'border-b border-slate-800'
                                    }`}
                                >
                                  {dataItem}
                                </div>
                              ))}
                            </td>
                          ) : null} {/* Hide the column if no data */}

                          {/* Render the second column for anotherField only if there is data */}
                          {item.anotherField && item.anotherField.length > 0 ? (
                            <td className="border border-slate-800">
                              {item.anotherField.map((dataItem, index) => (
                                <div key={index} onClick={() => handlePaperClick(dataItem)} className={`py-2 px-4 cursor-pointer hover:bg-gray-100 ${index === item.anotherField.length - 1 ? '' : 'border-b'
                                    }`}
                                >
                                  {dataItem}
                                </div>
                              ))}
                            </td>
                          ) : null} {/* Hide the column if no data */}
                        </tr>
                      </tbody>
                    </table>
                  ) : null}
                </div>


                {item.heading5 && (
                  <h3 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                    {item.heading5}
                  </h3>
                )}
                <p className="mb-2 mt-4 text-gray-800">{item.para5}</p>

                {item.heading7 && (
                  <h3 className="mb-2  text-[1.2em] mt-4  font-bold">
                    {item.heading7}
                  </h3>
                )}
                <p className="mb-2 mt-4 text-gray-800">{item.para7}</p>

                {item.list4 && item.list4.length > 0 && (
                  <ol className="list-disc text-orange-600 pl-5 mb-2">
                    {item.list4.map((listItem, index) => (
                      <li key={index} className="mb-1">{listItem}</li>
                    ))}
                  </ol>
                )}

                {item.heading9 && (
                  <h3 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                    {item.heading9}
                  </h3>
                )}
                <p className="mb-2 mt-4 text-gray-800">{item.para10}</p>
                {item.heading10 && (
                  <h3 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                    {item.heading10}
                  </h3>
                )}
                <p className="mb-2 mt-4 text-gray-800">{item.para11}</p>
                {item.heading11 && (
                  <h3 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                    {item.heading11}
                  </h3>
                )}
                <p className="mb-2 mt-4 text-gray-800">{item.para12}</p>



                <p className="mb-2 mt-4 text-gray-800">{item.para8}</p>

                <div className='flex flex-col mt-5 border border-slate-800  rounded-lg p-1'>
                  <h3 className=' font-semibold text-[.9em] '>{item.heading6}</h3>
                  <p className=" ">{item.para6}</p>
                  {item.list3 && item.list3.length > 0 && (
                    <ol className="  flex flex-wrap gap-2 w-full p-4 text-orange-600  mb-2">
                      {item.list3.map((listItem, index) => (
                        <li key={index} className="mb-1 w-[48%] p-4 bg-gray-200 rounded-lg font-semibold text-[.8em]  hover:bg-orange-600 hover:text-white hover:font-bold transition-all ease-in-out duration-150">{listItem}</li>
                      ))}
                    </ol>
                  )}
                </div>

              </div>
            ))
          ) : (
            <p>No data found for Class {Class} with ID {dataId}</p>
          )}
        </div>

        <div className='flex flex-col gap-5 w-full md:w-[35%]'>
          <div className='w-full bg-white p-8 '>
            <input type='text' id='search' name='search' placeholder='Type To Search' value={searchQuery} onChange={handleInputChange} onKeyDown={handleKeyDown} className='placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400' />
          </div>





          <div className=' bg-white p-5  rounded-lg'>
              <FormSection />

          </div>

        </div>

      </div>
      <DynamicFAQSection slug={currentSlug} />
      <Sociallinks2 />
      <Footer1 />
      <Footer />
    </div>
    </>
  );
};

export default DataTable;
