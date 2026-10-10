"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Banner from "@/public/WhatsApp Image 2024-10-14 at 11.44.36.jpeg";
import Link from "next/link";
import Banner1 from "@/public/Banner1.jpeg";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import { FaTimes, FaWhatsapp } from "react-icons/fa";
import WhatsappModal from "@/components/whatsappModal";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import Sociallinks2 from "@/components/Sociallinks2";
import FormSection from "@/components/FormGeneral";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DataTable = ({ data }) => {
//   const params = use(props.params);
//   const { slug } = params;
//  const [Class, setClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const [cbsePapersList, setCbsePapersList] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const [activePdfTitle, setActivePdfTitle] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const baseUrl = ((typeof window !== 'undefined' && window.location.hostname === 'localhost') ? 'http://localhost:5000' : 'https://learnospherebackend.learnosphere.in');

        // Class 10 papers — existing endpoint (DO NOT change)
        const res10 = await fetch(`${baseUrl}/api/route/cbse-sample-papers/class-10`).then(r => r.json());
        const class10List = res10.data || [];

        // Class 8, 9, 11 papers — new dedicated endpoint
        let extraList = [];
        try {
          const resExtra = await fetch(`${baseUrl}/api/cbse-extra-papers`).then(r => r.json());
          extraList = resExtra.data || [];
        } catch (extraErr) {
          console.error("Error fetching Class 8/9/11 CBSE papers:", extraErr);
        }

        // Merge: Class 10 first, then 8/9/11
        setCbsePapersList([...class10List, ...extraList]);
      } catch (err) {
        console.error("Error fetching cbse papers", err);
      }
    };
    fetchPapers();
  }, []);

  const handleDownloadClick = async (pdfUrl) => {
    if (!session) {
      toast.info("Please log in as a student to continue", { position: "top-center", autoClose: 2000 });
      setTimeout(() => { router.push("/Student"); }, 2000);
      return;
    }
    window.open(pdfUrl, "_blank");
  };

  const handlePaperClick = (e, title) => {
    e.preventDefault();
    if(!title) return;
    const lowerTitle = title.toLowerCase();
    
    const isClass12 = lowerTitle.includes('class 12') || lowerTitle.includes('class 12th');
    if (isClass12) {
      const slug = encodeURIComponent(
        title
          .toLowerCase()
          .replace(/\b\w/g, (char) => char.toUpperCase())
          .replace(/\s+/g, "-")
      );
      router.push(`/CBSE-Sample-Question-Paper/${slug}`);
      return;
    }
    
    let match = cbsePapersList.find(p => p.title && p.title.toLowerCase() === lowerTitle);
    
    if (!match) {
      // Extract class number from title — supports class 8, 9, 10, 11, 12
      const classMatch = lowerTitle.match(/class\s*(8|9|10|11|12)/i);
      const targetClass = classMatch ? classMatch[1] : '10'; // fallback to 10
      
      let targetSubject = null;
      if (lowerTitle.includes('math')) targetSubject = 'math';
      else if (lowerTitle.includes('science')) targetSubject = 'science';
      else if (lowerTitle.includes('physics')) targetSubject = 'physics';
      else if (lowerTitle.includes('chemistry')) targetSubject = 'chemistry';
      else if (lowerTitle.includes('english')) targetSubject = 'english';
      else if (lowerTitle.includes('biology')) targetSubject = 'biology';
      
      let filtered = cbsePapersList.filter(p => String(p.class_level) === String(targetClass));
      if (targetSubject) {
        let subjectFiltered = filtered.filter(p => p.subject && p.subject.toLowerCase().includes(targetSubject));
        if (subjectFiltered.length > 0) filtered = subjectFiltered;
      }
      if (filtered.length > 0) match = filtered[0];
    }
    
    if (match && match.s3_url) {
      if (activePdfTitle === title) {
        setActivePdfTitle(null);
      } else {
        setSelectedPdfUrl(match.s3_url);
        setActivePdfTitle(title);
      }
    } else {
      toast.error("Paper not available yet.", { position: "top-center" });
    }
  };

  
  const renderPdfViewer = (title) => {
    if (activePdfTitle !== title || !selectedPdfUrl) return null;
    return (
            <div className="my-6 text-center w-full p-4 border border-orange-200 rounded-lg bg-orange-50 mt-4 shadow-sm">
              <h2 className="text-xl font-semibold text-orange-700 mb-4">
                View / Download Full PDF
              </h2>
              {isLoggedIn ? (
                <button
                  onClick={() => handleDownloadClick(selectedPdfUrl)}
                  className="inline-block px-6 py-2 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition mb-4"
                >
                  View / Download PDF
                </button>
              ) : (
                <button
                  onClick={() => handleDownloadClick(selectedPdfUrl)}
                  className="inline-block px-6 py-2 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition mb-4"
                >
                  View / Download PDF
                </button>
              )}
              <div className="my-2">
                {isLoggedIn ? (
                  <iframe
                    src={`${selectedPdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    width="100%"
                    height="500px"
                    style={{ border: "none", overflow: "hidden" }}
                    title="PDF Viewer"
                  >
                    This browser does not support PDFs. <a href={selectedPdfUrl}>Download PDF</a>
                  </iframe>
                ) : (
                  <div className="relative w-full h-[500px] border rounded-xl overflow-hidden">
                    <iframe
                      src={`${selectedPdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
                      width="100%"
                      height="100%"
                      style={{ border: "none", filter: "blur(4px)", pointerEvents: "none" }}
                      title="PDF Viewer Preview"
                    ></iframe>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10 backdrop-blur-sm">
                      <div className="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Login Required</h3>
                        <p className="text-gray-600 mb-4">Please log in to view and download the full PDF.</p>
                        <button onClick={() => router.push("/Student")} className="px-6 py-2 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition">
                          Login Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
    );
  };

  const handleKeyDown = (e) => {
    // Trigger the redirect when the Enter key is pressed
    if (e.key === "Enter" && searchQuery) {
      // Redirect to ContentFound with the search query as a URL parameter
      window.location.href = `/SearchResult?query=${searchQuery}`;
    }
  };              

//   useEffect(() => {
//     // Check if we are in the browser before accessing window
//     if (typeof window !== "undefined") {
//       const searchParams = new URLSearchParams(window.location.search);
//       setClass(searchParams.get("Class"));
//     }
//   }, []);

  //const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await axios.get(
//           `https://learnospherebackend.learnosphere.in/api/route/SamplePapers/${slug}`
//         );
//         console.log("API Response:", response.data);

//         if (response.data && response.data.data) {
//           setData(response.data.data);
//         } else {
//           setData([]); // No data found
//         }
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.response?.data?.message || "Error fetching data.");
//         setData([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (slug) fetchData();
//   }, [slug]);

  if (loading) {
    return <div className="text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
  <Navbar />
      <div className="bg-gray-100 font-Poppins">
        <div className="px-4 md:px-28 flex flex-col md:flex-row gap-6 bg-gray-100 container mx-auto pt-24">
          <div className="flex flex-col gap-5w-full md:w-[65%]">
            <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">

            </div>
            
            {data && data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="mb-4">
                  <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold rounded-lg shadow-md">
                    {item.heading1}
                  </h1>
                  <Link href="https://sarvgyat.learnosphere.in/">
                    <Image className="mt-3 rounded-lg " src={Banner} alt="" />
                  </Link>
                  <p className="mb-2 mt-4 text-gray-800">{item.para1}</p>

                  <h2 className="mb-2 text-slate-800 text-[1.2em]">
                    {item.heading2}
                  </h2>
                  <p className="mb-2 mt-4 text-gray-800">{item.para2}</p>
                  {item.list1 && item.list1.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list1.map((listItem, index) => (
                        <li key={index} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                  <div>
                    <h2 className="text-[1.2em] font-bold">{item.heading14}</h2>
                    <p className=" ">{item.para14}</p>
                    {(item.heading3 ||
                      item.para3 ||
                      (item.tableData && item.tableData.length > 0) ||
                      (item.anotherField && item.anotherField.length > 0)) && (
                        <div className="grid border border-slate-800 mt-4">
                          {/* Display heading only if item.heading3 has a value */}
                          {item.heading3 && (
                            <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.4em]">
                              {item.heading3}
                            </h2>
                          )}

                          {/* Display paragraph if item.para3 has content */}
                          {item.para3 && <p className="">{item.para3}</p>}

                          {/* Display table only if either tableData or anotherField has content */}
                          {(item.tableData && item.tableData.length > 0) ||
                            (item.anotherField && item.anotherField.length > 0) ? (
                            <table className="min-w-full bg-white">
                              <tbody>
                                <tr>
                                  {/* Render tableData if it exists and has items */}
                                  {item.tableData && item.tableData.length > 0 ? (
                                    <td className="border border-slate-800">
                                      {item.tableData.map((dataItem, index) => (
                                        <div
                                          key={dataItem.id || index} // Fallback to index if id is not available
                                          className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.tableData.length - 1
                                              ? ""
                                              : "border-b border-slate-800"
                                            }`}
                                        >
                                          {dataItem && dataItem.title ? (
                                            <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                          ) : (
                                            <span>No title available</span>
                                          )}
                                        </div>
                                      ))}
                                    </td>
                                  ) : (
                                    <td className="border border-slate-800">
                                      <div className="py-2 px-4 text-gray-500">
                                        No data found
                                      </div>
                                    </td>
                                  )}

                                  {/* Render anotherField if it exists and has items */}
                                  {item.anotherField &&
                                    item.anotherField.length > 0 && (
                                      <td className="border border-slate-800">
                                        {item.anotherField.map(
                                          (dataItem, index) => (
                                            <div
                                              key={dataItem.id || index} // Fallback to index if id is not available
                                              className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index ===
                                                  item.anotherField.length - 1
                                                  ? ""
                                                  : "border-b"
                                                }`}
                                            >
                                              {dataItem && dataItem.title ? (
                                                <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                              ) : (
                                                <span>No title available</span>
                                              )}
                                            </div>
                                          )
                                        )}
                                      </td>
                                    )}
                                </tr>
                              </tbody>
                            </table>
                          ) : null}
                        </div>
                      )}
                  </div>
                  <h2 className="mb-2 font-bold text-slate-800 mt-3 text-[1.2em]">
                    {item.heading4}
                  </h2>
                  <p className="mb-2 mt-4 text-gray-800">{item.para4}</p>
                  {item.list2 && item.list2.length > 0 && (
                    <ol className="list-disc text-gray-800 pl-5 mb-2">
                      {item.list2.map((listItem, index) => (
                        <li key={index} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                 

                  {(item.heading5 ||
                    item.para5 ||
                    (item.anotherField1 && item.anotherField1.length > 0)) && (
                      <div className="border w-full mt-3 mb-5 border-slate-800">
                        {/* Display heading only if item.heading5 has a value */}
                        {item.heading5 && (
                          <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.4em]">
                            {item.heading5}
                          </h2>
                        )}

                        {/* Display paragraph if item.para5 has content */}
                        {item.para5 && <p className="">{item.para5}</p>}

                        {/* Display table only if anotherField1 has content */}
                        {item.anotherField1 && item.anotherField1.length > 0 && (
                          <div className="flex flex-col items-center justify-center gap-4">
                            <table className="min-w-full bg-white border border-gray-300">
                              <tbody className="text-center">
                                <tr>
                                  <td className="border border-slate-800">
                                    {item.anotherField1.map((dataItem, index) => (
                                      <div
                                        key={dataItem.id || index} // Ensure a unique key
                                        className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField1.length - 1
                                            ? ""
                                            : "border-b"
                                          }`}
                                      >
                                        {dataItem && dataItem.title ? (
                                          <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                        ) : (
                                          <span>No title available</span>
                                        )}
                                      </div>
                                    ))}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}


                  <h2 className="mb-2 text-slate-800 mt-3 font-bold text-[1.2em]">
                    {item.heading15}
                  </h2>
                  <p className="mb-2 mt-4 text-gray-800">{item.para15}</p>
                   {item.list4 && item.list4.length > 0 && (
                    <section className="mb-8 mt-2">
                      <div className="grid gap-2 ">
                        {item.list4.map((dataItem, index) => (
                          <div
                            key={dataItem.id || index}
                            className="p-3 bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-sm hover:scale-100 transition-transform duration-300 flex flex-row items-center text-left"
                          >
                            <div className="w-12 h-6 mb-1 flex items-center justify-center  text-orange-600 rounded-full text-2xl font-bold">
                              {dataItem.icon || "👉"}
                            </div>
                            <p className=" mb-2 text-gray-800">
                              {dataItem.title || "Untitled"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                  
                  {(item.heading6 ||
                    (item.anotherField2 && item.anotherField2.length > 0)) && (
                      <div className="border mt-3 border-slate-800">
                        {/* Display heading only if item.heading6 has a value */}
                        {item.heading6 && (
                          <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.4em]">
                            {item.heading6}
                          </h2>
                        )}

                        {/* Display table only if item.anotherField2 has content */}
                        {item.anotherField2 && item.anotherField2.length > 0 && (
                          <div className="flex flex-col items-center justify-center gap-4">
                            <table className="min-w-full bg-white border border-gray-300">
                              <tbody className="text-center">
                                <tr>
                                  <td className="border border-slate-800">
                                    {item.anotherField2.map((dataItem, index) => (
                                      <div
                                        key={dataItem.id || index} // Fallback to index if id is not available
                                        className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField2.length - 1
                                            ? ""
                                            : "border-b"
                                          }`}
                                      >
                                        {/* Display title only if dataItem and dataItem.title are available */}
                                        {dataItem && dataItem.title ? (
                                          <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                        ) : (
                                          <span>No title available</span>
                                        )}
                                      </div>
                                    ))}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}

                  <p className="mb-2 mt-4 text-gray-800">{item.para6}</p>
                  <Link href="https://sarvgyat.learnosphere.in/">
                    <Image className="mt-3" src={Banner1} alt="" />
                  </Link>
                  <div className="flex flex-col gap-3 mt-3">
                    {item.heading7 && item.para7 && (
                      <>
                        <h2 className="text-[1.2em] font-bold text-orange-600">
                          {item.heading7}
                        </h2>
                        <p>{item.para7}</p>
                      </>
                    )}

                    {item.heading8 && item.para8 && (
                      <>
                        <h2 className="font-bold text-[1em]">
                          {item.heading8}
                        </h2>
                        <p className="mb-2 mt-4 text-gray-800">{item.para8}</p>
                      </>
                    )}

                    {item.heading9 && item.para9 && (
                      <>
                        <h2 className="font-bold text-[1em]">
                          {item.heading9}
                        </h2>
                        <p className="mb-2 mt-4 text-gray-800">{item.para9}</p>
                      </>
                    )}

                    {item.heading10 && item.para10 && (
                      <>
                        <h2 className="font-bold text-[1em]">
                          {item.heading10}
                        </h2>
                        <p className="mb-2 mt-4 text-gray-800">{item.para10}</p>
                      </>
                    )}

                    {item.heading11 && item.para11 && (
                      <>
                        <h2 className="font-bold text-[1em]">
                          {item.heading11}
                        </h2>
                        <p className="mb-2 mt-4 text-gray-800">{item.para11}</p>
                      </>
                    )}

                    {item.heading12 && item.para12 && (
                      <>
                        <h2 className="font-bold text-[1em]">
                          {item.heading12}
                        </h2>
                        <p className="mb-2 mt-4 text-gray-800">
                          {" "}
                          {item.para12}
                        </p>
                      </>
                    )}
                  </div>

                  {(item.anotherField3 && item.anotherField3.length > 0) ||
                    (item.anotherField4 && item.anotherField4.length > 0) ||
                    (item.anotherField5 && item.anotherField5.length > 0) ? (
                    <div className="grid gap-4">
                      <table className="min-w-full bg-white border border-gray-300 ">
                        {item.heading26 ? ( // Check if item.heading24 has a value
                          <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                            {item.heading26}
                          </h2>
                        ) : null}
                        <tbody>
                          <tr className="align-top">
                            {item.anotherField3 &&
                              item.anotherField3.length > 0 && (
                                <td className="border border-slate-800 h-full">
                                  <div className="flex flex-col h-full justify-between">
                                    {item.anotherField3.map(
                                      (dataItem, index) => (
                                        <div
                                          key={dataItem.id || index} // Ensure you have a unique key
                                          className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index ===
                                              item.anotherField3.length - 1
                                              ? ""
                                              : "border-b"
                                            }`}
                                        >
                                          {dataItem && dataItem.title ? (
                                            <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                          ) : (
                                            <span>No title available</span>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </td>
                              )}

                            {item.anotherField4 &&
                              item.anotherField4.length > 0 && (
                                <td className="border border-slate-800 h-full">
                                  <div className="flex flex-col h-full justify-between">
                                    {item.anotherField4.map(
                                      (dataItem, index) => (
                                        <div
                                          key={dataItem.id || index} // Ensure you have a unique key
                                          className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index ===
                                              item.anotherField4.length - 1
                                              ? ""
                                              : "border-b"
                                            }`}
                                        >
                                          {dataItem && dataItem.title ? (
                                            <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                          ) : (
                                            <span>No title available</span>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </td>
                              )}

                            {item.anotherField5 &&
                              item.anotherField5.length > 0 && (
                                <td className="border border-slate-800 h-full">
                                  <div className="flex flex-col h-full justify-between">
                                    {item.anotherField5.map(
                                      (dataItem, index) => (
                                        <div
                                          key={dataItem.id || index} // Ensure you have a unique key
                                          className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index ===
                                              item.anotherField5.length - 1
                                              ? ""
                                              : "border-b"
                                            }`}
                                        >
                                          {dataItem && dataItem.title ? (
                                            <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                          ) : (
                                            <span>No title available</span>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </td>
                              )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                  <h2 className="font-bold text-[1.2em]">
                    {item.heading27}
                  </h2>
                  <p className="mb-2 mt-4 text-gray-800">{item.para16}</p>
                  <p className="mb-2 mt-4 text-gray-800">{item.para17}</p>

                  <div
                    className={`grid mt-4 ${item.heading16 ||
                        (item.anotherField6 && item.anotherField6.length > 0) ||
                        (item.anotherField7 && item.anotherField7.length > 0)
                        ? "border border-slate-800"
                        : ""
                      }`}
                  >
                    {item.heading16 ? (
                      <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                        {item.heading16}
                      </h2>
                    ) : null}
                    <p className="">{item.para18}</p>
                    {(item.anotherField6 && item.anotherField6.length > 0) ||
                      (item.anotherField7 && item.anotherField7.length > 0) ? (
                      <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                          <tr>
                            {item.anotherField6 &&
                              item.anotherField6.length > 0 ? (
                              <td className="border border-slate-800">
                                {item.anotherField6.map((dataItem, index) => (
                                  <div
                                    key={dataItem.id || index} // Ensure you have a unique key
                                    className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField6.length - 1
                                        ? ""
                                        : "border-b"
                                      }`}
                                  >
                                    {dataItem && dataItem.title ? (
                                      <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                    ) : (
                                      <span>No title available</span>
                                    )}
                                  </div>
                                ))}
                              </td>
                            ) : (
                              <td className="border border-slate-800">
                                <div className="py-2 px-4 text-gray-500">
                                  No data found
                                </div>
                              </td>
                            )}

                            {item.anotherField7 &&
                              item.anotherField7.length > 0 && (
                                <td className="border border-slate-800">
                                  {item.anotherField7.map((dataItem, index) => (
                                    <div
                                      key={dataItem.id || index} // Ensure you have a unique key
                                      className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField7.length - 1
                                          ? ""
                                          : "border-b"
                                        }`}
                                    >
                                      {dataItem && dataItem.title ? (
                                        <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                      ) : (
                                        <span>No title available</span>
                                      )}
                                    </div>
                                  ))}
                                </td>
                              )}
                          </tr>
                        </tbody>
                      </table>
                    ) : null}
                  </div>

                  <p className="mb-2 mt-4 text-gray-800">{item.para19}</p>

                  {item.heading17 && item.para20 && (
                    <>
                      <h2 className="font-semibold text-[1em]">
                        {item.heading17}
                      </h2>
                      <p>{item.para20}</p>
                    </>
                  )}

                  <div
                    className={`grid mt-4 ${item.heading18 ||
                        (item.anotherField8 && item.anotherField8.length > 0) ||
                        (item.anotherField9 && item.anotherField9.length > 0)
                        ? "border border-slate-800"
                        : ""
                      }`}
                  >
                    {item.heading18 ? (
                      <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.4em]">
                        {item.heading18}
                      </h2>
                    ) : null}
                    <p className="">{item.para21}</p>
                    {(item.anotherField8 && item.anotherField8.length > 0) ||
                      (item.anotherField9 && item.anotherField9.length > 0) ? (
                      <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                          <tr>
                            {item.anotherField8 &&
                              item.anotherField8.length > 0 ? (
                              <td className="border border-slate-800">
                                {item.anotherField8.map((dataItem, index) => (
                                  <div
                                    key={dataItem.id || index} // Ensure you have a unique key
                                    className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField8.length - 1
                                        ? ""
                                        : "border-b"
                                      }`}
                                  >
                                    {dataItem && dataItem.title ? (
                                      <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                    ) : (
                                      <span>No title available</span>
                                    )}
                                  </div>
                                ))}
                              </td>
                            ) : (
                              <td className="border border-slate-800">
                                <div className="py-2 px-4 text-gray-500">
                                  No data found
                                </div>
                              </td>
                            )}

                            {item.anotherField9 &&
                              item.anotherField9.length > 0 && (
                                <td className="border border-slate-800">
                                  {item.anotherField9.map((dataItem, index) => (
                                    <div
                                      key={dataItem.id || index} // Ensure you have a unique key
                                      className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField9.length - 1
                                          ? ""
                                          : "border-b"
                                        }`}
                                    >
                                      {dataItem && dataItem.title ? (
                                        <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                      ) : (
                                        <span>No title available</span>
                                      )}
                                    </div>
                                  ))}
                                </td>
                              )}
                          </tr>
                        </tbody>
                      </table>
                    ) : null}
                  </div>

                  <div
                    className={`grid mt-4 ${item.heading20 ||
                        (item.anotherField10 && item.anotherField10.length > 0) ||
                        (item.anotherField11 && item.anotherField11.length > 0)
                        ? "border border-slate-800"
                        : ""
                      }`}
                  >
                    {item.heading20 ? (
                      <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                        {item.heading20}
                      </h2>
                    ) : null}

                    <p className="">{item.para22}</p>

                    {(item.anotherField10 && item.anotherField10.length > 0) ||
                      (item.anotherField11 && item.anotherField11.length > 0) ? (
                      <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                          <tr>
                            {item.anotherField10 &&
                              item.anotherField10.length > 0 ? (
                              <td className="border border-slate-800">
                                {item.anotherField10.map((dataItem, index) => (
                                  <div
                                    key={dataItem.id || index} // Ensure you have a unique key
                                    className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField10.length - 1
                                        ? ""
                                        : "border-b"
                                      }`}
                                  >
                                    {dataItem && dataItem.title ? (
                                      <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                    ) : (
                                      <span>No title available</span>
                                    )}
                                  </div>
                                ))}
                              </td>
                            ) : (
                              <td className="border border-slate-800">
                                <div className="py-2 px-4 text-gray-500">
                                  No data found
                                </div>
                              </td>
                            )}

                            {item.anotherField11 &&
                              item.anotherField11.length > 0 && (
                                <td className="border border-slate-800">
                                  {item.anotherField11.map(
                                    (dataItem, index) => (
                                      <div
                                        key={dataItem.id || index} // Ensure you have a unique key
                                        className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index ===
                                            item.anotherField11.length - 1
                                            ? ""
                                            : "border-b"
                                          }`}
                                      >
                                        {dataItem && dataItem.title ? (
                                          <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                        ) : (
                                          <span>No title available</span>
                                        )}
                                      </div>
                                    )
                                  )}
                                </td>
                              )}
                          </tr>
                        </tbody>
                      </table>
                    ) : null}
                  </div>

                  <p className="mb-2 mt-4 text-gray-800"> {item.para23}</p>
                  {item.heading21 && item.para24 && (
                    <>
                      <h2 className="font-bold mt-2 text-[1em]">
                        {item.heading21}
                      </h2>
                      <p className="mb-2 mt-4 text-gray-800">{item.para24}</p>
                    </>
                  )}

                  <div
                    className={`grid mt-4 ${item.heading22 ||
                        (item.anotherField12 && item.anotherField12.length > 0) ||
                        (item.anotherField13 && item.anotherField13.length > 0)
                        ? "border border-slate-800"
                        : ""
                      }`}
                  >
                    {item.heading22 ? (
                      <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.4em]">
                        {item.heading22}
                      </h2>
                    ) : null}

                    <p className="">{item.para25}</p>

                    {(item.anotherField12 && item.anotherField12.length > 0) ||
                      (item.anotherField13 && item.anotherField13.length > 0) ? (
                      <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                          <tr>
                            {item.anotherField12 &&
                              item.anotherField12.length > 0 ? (
                              <td className="border border-slate-800">
                                {item.anotherField12.map((dataItem, index) => (
                                  <div
                                    key={dataItem.id || index} // Ensure you have a unique key
                                    className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField12.length - 1
                                        ? ""
                                        : "border-b"
                                      }`}
                                  >
                                    {dataItem && dataItem.title ? (
                                      <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                    ) : (
                                      <span>No title available</span>
                                    )}
                                  </div>
                                ))}
                              </td>
                            ) : (
                              <td className="border border-slate-800">
                                <div className="py-2 px-4 text-gray-500">
                                  No data found
                                </div>
                              </td>
                            )}

                            {item.anotherField13 &&
                              item.anotherField13.length > 0 && (
                                <td className="border border-slate-800">
                                  {item.anotherField13.map(
                                    (dataItem, index) => (
                                      <div
                                        key={dataItem.id || index} // Ensure you have a unique key
                                        className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index ===
                                            item.anotherField13.length - 1
                                            ? ""
                                            : "border-b"
                                          }`}
                                      >
                                        {dataItem && dataItem.title ? (
                                          <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                        ) : (
                                          <span>No title available</span>
                                        )}
                                      </div>
                                    )
                                  )}
                                </td>
                              )}
                          </tr>
                        </tbody>
                      </table>
                    ) : null}
                  </div>

                  <p className="mb-2 mt-4 text-gray-800">{item.para26}</p>
                  <p className="mb-2 mt-4 text-gray-800">{item.para27}</p>
                  {item.heading23 && item.para28 && (
                    <>
                      <h2 className="font-bold mt-3 text-[1em]">
                        {item.heading23}
                      </h2>
                      <p className="mb-2 mt-4 text-gray-800">{item.para28}</p>
                    </>
                  )}

                  <div
                    className={`grid mt-4 ${item.heading24 ||
                        (item.anotherField14 && item.anotherField14.length > 0) ||
                        (item.anotherField15 && item.anotherField15.length > 0)
                        ? "border border-slate-800"
                        : ""
                      }`}
                  >
                    {item.heading24 ? (
                      <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                        {item.heading24}
                      </h2>
                    ) : null}

                    <p className="">{item.para29}</p>

                    {(item.anotherField14 && item.anotherField14.length > 0) ||
                      (item.anotherField15 && item.anotherField15.length > 0) ? (
                      <table className="min-w-full bg-white border border-gray-300">
                        <tbody>
                          <tr>
                            {item.anotherField14 &&
                              item.anotherField14.length > 0 ? (
                              <td className="border border-slate-800">
                                {item.anotherField14.map((dataItem, index) => (
                                  <div
                                    key={dataItem.id || index} // Ensure you have a unique key
                                    className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField14.length - 1
                                        ? ""
                                        : "border-b"
                                      }`}
                                  >
                                    {dataItem && dataItem.title ? (
                                      <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                    ) : (
                                      <span>No title available</span>
                                    )}
                                  </div>
                                ))}
                              </td>
                            ) : (
                              <td className="border border-slate-800">
                                <div className="py-2 px-4 text-gray-500">
                                  No data found
                                </div>
                              </td>
                            )}

                            {item.anotherField15 &&
                              item.anotherField15.length > 0 && (
                                <td className="border border-slate-800">
                                  {item.anotherField15.map(
                                    (dataItem, index) => (
                                      <div
                                        key={dataItem.id || index} // Ensure you have a unique key
                                        className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index ===
                                            item.anotherField15.length - 1
                                            ? ""
                                            : "border-b"
                                          }`}
                                      >
                                        {dataItem && dataItem.title ? (
                                          <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                        ) : (
                                          <span>No title available</span>
                                        )}
                                      </div>
                                    )
                                  )}
                                </td>
                              )}
                          </tr>
                        </tbody>
                      </table>
                    ) : null}
                  </div>

                  <div
                    className={`mt-3 ${item.heading25 ||
                        (item.anotherField16 && item.anotherField16.length > 0)
                        ? "border border-slate-800"
                        : ""
                      }`}
                  >
                    {item.heading25 ? (
                      <h2 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.4em]">
                        {item.heading25}
                      </h2>
                    ) : null}

                    <p>{item.para30}</p>

                    {item.anotherField16 && item.anotherField16.length > 0 && (
                      <div className="flex flex-col items-center justify-center gap-4">
                        <table className="min-w-full bg-white border border-gray-300">
                          <tbody className="text-center">
                            <tr>
                              <td className="border border-slate-800">
                                {item.anotherField16.map((dataItem, index) => (
                                  <div
                                    key={dataItem.id || index} // Ensure you have a unique key
                                    className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField16.length - 1
                                        ? ""
                                        : "border-b"
                                      }`}
                                  >
                                    {dataItem && dataItem.title ? (
                                      <>
<a href="#" onClick={(e) => handlePaperClick(e, dataItem.title)} className="w-full block text-center text-blue-600 underline">{dataItem.title}</a>
{renderPdfViewer(dataItem.title)}
</>
                                    ) : (
                                      <span>No title available</span>
                                    )}
                                  </div>
                                ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  <div
                    key={item.id}
                    className="my-4 p-1 border border-slate-800 rounded-xl"
                  >
                    {item.heading13 && (
                      <h2 className="mb-2 p-4 text-black text-[.92m] font-bold">
                        {item.heading13}
                      </h2>
                    )}
                    <p>{item.para13}</p>
                    {item.list3 && item.list3.length > 0 && (
                      <ol className="flex flex-wrap gap-2 w-full text-orange-600 mb-2">
                        {item.list3.map((listItem, index) => {
                          // Check if route exists or provide a fallback
                          const hrefValue =
                            listItem.route ||
                            `/default-route/${encodeURIComponent(
                              listItem.value.toLowerCase().replace(/\s+/g, "-")
                            )}`;

                          return (
                            <li
                              key={listItem.id || index} // Ensure each item has a unique key
                              className="mb-1 w-[48%] p-4 rounded-lg font-semibold hover:bg-orange-600 hover:font-bold hover:text-white transition-all ease-in-out duration-150"
                            >
                              <div
                                className={`py-2 px-4 w-full ${index === item.list3.length - 1
                                    ? ""
                                    : " text-[.8em]"
                                  }`}
                              >
                                <Link
                                  className="w-full block text-center"
                                  href={hrefValue} // Use hrefValue, which has a fallback URL
                                >
                                  {listItem.value}
                                </Link>
                              </div>
                            </li>
                          );
                        })}
                      </ol>
                    )}
                  </div>

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
                </div>
              ))
            ) : (
              <p>No data found for Class={Class}</p>
            )}
          </div>
          <div className="flex flex-col gap-5 w-full md:w-[35%]">
            <div className="w-full bg-white p-8 ">
              <input
                type="text"
                id="search"
                name="search"
                placeholder="Type To Search"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="placeholder:text-gray-500 p-3 w-full  rounded-md border border-gray-400"
              />
            </div>

            <div className=" bg-white p-5  rounded-lg">
             <FormSection />
            </div>
          </div>
        </div>
        <Sociallinks2 />
        <Footer1 />
        <Footer />
      </div>
    </>
  );
};

export default DataTable;
