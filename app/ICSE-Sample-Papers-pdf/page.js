"use client";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";

import Sociallinks2 from "@/components/Sociallinks2";

import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";

const DataTable = () => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [classLevel, setClassLevel] = useState(null);
  const [dataId, setDataId] = useState(null); // New state for ID
  const [searchQuery, setSearchQuery] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState({});

  const normalizeTitle = (title) => {
    if (!title) return '';
    const yearMatch = title.match(/\b(20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : '';
    const classMatch = title.match(/\b(?:class\s*|-)?(10|12)\b/i);
    const classNum = classMatch ? classMatch[1] : '';
    const semMatch = title.match(/\bsem(?:ester)?\s*(\d+)\b/i);
    const semNum = semMatch ? semMatch[1] : '';
    if (year && classNum) {
      return `class_${classNum}_${year}` + (semNum ? `_sem_${semNum}` : '');
    }
    return title.replace(/\s+/g, '').toLowerCase();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 10000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
    // Fetch available PDFs from local backend
    axios.get("https://learnospherebackend.learnosphere.in/api/ics-papers")
      .then(res => {
        let urlMap = {};
        if (res.data && res.data.data) {
          res.data.data.forEach(paper => {
            if (paper.title) urlMap[normalizeTitle(paper.title)] = paper.s3_url;
          });
        }
        
        // Fetch Class 8, 9, 11 ICSE papers
        axios.get("https://learnospherebackend.learnosphere.in/api/icse-papers")
          .then(res2 => {
            if (res2.data && res2.data.data) {
              res2.data.data.forEach(paper => {
                if (paper.title) urlMap[normalizeTitle(paper.title)] = paper.s3_url;
              });
            }
            setUploadedUrls(urlMap);
          })
          .catch(err => {
            console.error("Error fetching ICSE Class 8, 9, 11 papers:", err);
            setUploadedUrls(urlMap);
          });
      })
      .catch(err => console.error("Error fetching ICS papers:", err));
  }, []);

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
  useEffect(() => {
    // Check if we are in the browser before accessing window
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      setClassLevel(searchParams.get("classLevel"));
      setDataId(searchParams.get("id")); // Get ID from URL
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (classLevel && dataId) {
        // Ensure both parameters are present
        try {
          const response = await axios.get(
            `https://learnospherebackend.learnosphere.in/api/route/icsesamplepaperpdf?classLevel=${classLevel}&id=${dataId}`
          ); // Use query parameters
          console.log("Fetched Data:", response.data);
          setData(response.data);
        } catch (err) {
          console.error("Error Fetching Data:", err.message);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [classLevel, dataId]); // Trigger effect on changes to classLevel or dataId
  // Trigger effect on changes to classLevel or dataId

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
          <div className="flex flex-col gap-5 w-full md:w-[65%]">
            <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4">

            </div>
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="mb-4">
                  <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold">
                    {item.heading1}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para1}</p>
                  {item.heading2 && (
                    <h1 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                      {item.heading2}
                    </h1>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para2}</p>
                  {item.heading3 && (
                    <h1 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                      {item.heading3}
                    </h1>
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
                  {(item.pdfUrl || uploadedUrls[normalizeTitle(item.heading1)]) && (
                    <div className="mt-8 mb-8 text-center flex flex-col items-center">
                      <ToastContainer />
                      <h2 className="text-2xl font-semibold text-orange-700 mb-4">
                        Download Full Syllabus (PDF)
                      </h2>
                      <button
                        onClick={() => {
                          if (isLoggedIn) {
                            window.open(item.pdfUrl || uploadedUrls[normalizeTitle(item.heading1)], "_blank");
                          } else {
                            toast.info("Please log in as a student to continue", { position: "top-center", autoClose: 2000 });
                            setTimeout(() => router.push("/Student"), 2000);
                          }
                        }}
                        className="inline-block px-6 py-3 bg-orange-600 text-white font-semibold rounded-full shadow-md hover:bg-orange-700 transition relative z-10"
                      >
                        📄 View / Download PDF
                      </button>
                      
                      <div className="relative w-full h-[600px] border rounded-xl my-4 shadow-md bg-white overflow-hidden flex flex-col mt-4">
                        {isLoggedIn ? (
                          <iframe
                            src={`${item.pdfUrl || uploadedUrls[normalizeTitle(item.heading1)]}#toolbar=0&navpanes=0&scrollbar=0`}
                            width="100%"
                            height="100%"
                            style={{ border: "none" }}
                            title="PDF Viewer"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 p-6 relative">
                            <div className="w-3/4 space-y-4 blur-sm opacity-50 absolute top-10 left-10 right-10 bottom-10 pointer-events-none select-none">
                               <div className="h-4 bg-gray-400 rounded w-full"></div>
                               <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                               <div className="h-4 bg-gray-400 rounded w-4/6"></div>
                               <div className="h-8 bg-gray-400 rounded w-1/3 my-8"></div>
                               <div className="h-4 bg-gray-400 rounded w-full"></div>
                               <div className="h-4 bg-gray-400 rounded w-11/12"></div>
                               <div className="h-4 bg-gray-400 rounded w-full"></div>
                               <div className="h-4 bg-gray-400 rounded w-4/5"></div>
                            </div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-md z-20">
                              <p className="text-lg font-semibold text-gray-800 mb-2">
                                🔒 Please log in to view the full PDF
                              </p>
                              <p className="text-gray-600 mb-4 text-center max-w-md">
                                You are seeing a limited preview. Log in to access the complete document.
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
                    <h1 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                      {item.heading4}
                    </h1>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para4}</p>

                  {(item.heading8 ||
                    item.para9 ||
                    item.tableData?.length > 0 ||
                    item.anotherField?.length > 0) && (
                      <div className="rounded-xl bg-orange-100 grid border border-slate-800 mt-4">
                        {item.heading8 ? (
                          <h1 className="p-4 font-bold text-center border-black border-b text-[1.2em]">
                            {item.heading8}
                          </h1>
                        ) : null}

                        <p className="">{item.para9}</p>

                        {(item.tableData && item.tableData.length > 0) ||
                          (item.anotherField && item.anotherField.length > 0) ? (
                          <table className="rounded-xl min-w-full text-orange-600 text-[.9em] font-semibold bg-white">
                            <tbody className="rounded-xl">
                              <tr>
                                {item.tableData && item.tableData.length > 0 ? (
                                  <td className="">
                                    {item.tableData.map((dataItem, index) => (
                                      <div
                                        key={index}
                                        className={`py-2 px-4 border-slate-800 hover:bg-gray-100 ${index === item.tableData.length - 1
                                            ? ""
                                            : "border-b border-slate-800"
                                          }`}
                                      >
                                        {dataItem}
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

                                {item.anotherField &&
                                  item.anotherField.length > 0 && (
                                    <td className="border border-slate-800">
                                      {item.anotherField.map(
                                        (dataItem, index) => (
                                          <div
                                            key={index}
                                            className={`py-2 px-4 border-slate-800 hover:bg-gray-100 ${index ===
                                                item.anotherField.length - 1
                                                ? ""
                                                : "border-b"
                                              }`}
                                          >
                                            {dataItem}
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

                  {item.heading5 && (
                    <h1 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                      {item.heading5}
                    </h1>
                  )}
                  <p className="mb-2 mt-6">{item.para5}</p>

                  {item.heading7 && (
                    <h1 className="mb-2  text-[1.2em] mt-4  font-bold">
                      {item.heading7}
                    </h1>
                  )}
                  <p className="mb-2 mt-2">{item.para7}</p>

                  {item.list4 && item.list4.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list4.map((listItem, index) => (
                        <li key={index} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}

                  {item.heading9 && (
                    <h1 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                      {item.heading9}
                    </h1>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para10}</p>
                  {item.heading10 && (
                    <h1 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                      {item.heading10}
                    </h1>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para11}</p>
                  {item.heading11 && (
                    <h1 className="mb-2 p-4 text-white text-[1.2em] mt-4 bg-orange-600 font-bold">
                      {item.heading11}
                    </h1>
                  )}
                  <p className="mb-2 mt-4 text-gray-800">{item.para12}</p>

                  <p className="mb-2 mt-4 text-gray-800">{item.para8}</p>

                  <div className="flex flex-col text-[.8em] mt-5 border border-slate-800  rounded-lg p-1">
                    <h1 className=" font-semibold">{item.heading6}</h1>
                    <p className=" ">{item.para6}</p>
                    {item.list3 && item.list3.length > 0 && (
                      <ol className="  flex flex-wrap gap-2 w-full p-4 text-orange-600  mb-2">
                        {item.list3.map((listItem, index) => (
                          <li
                            key={index}
                            className="mb-1 w-[48%] p-4 bg-gray-200 rounded-lg font-semibold hover:bg-orange-600 hover:text-white hover:font-bold transition-all ease-in-out duration-150"
                          >
                            {listItem}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>
                No data found for Class {classLevel} with ID {dataId}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-5w-full md:w-[35%]">
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
