"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Navbar from "@/components/Navbar";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, use, useRef } from "react";
import Banner2 from "@/public/Banner2.jpeg";
import Link from "next/link";

import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import Sociallinks2 from "@/components/Sociallinks2";

import AOS from "aos";
import "aos/dist/aos.css";
import FormSection from "@/components/FormGeneral";

const DataTable = (props) => {
  const params = use(props.params);
  const { slug } = params;
  const [Class, setClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  

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
      setClass(searchParams.get("Class"));
    }
  }, []);

  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowButton((prev) => !prev);
    }, 10000); // Toggle every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const [uploadedUrls, setUploadedUrls] = useState({});

  const normalizeTitle = (title) => {
    if (!title) return '';
    
    // Extract 4 digit year
    const yearMatch = title.match(/\b(20\d{2})\b/);
    const year = yearMatch ? yearMatch[1] : '';
    
    // Extract class number (e.g. 10 or 12)
    const classMatch = title.match(/\b(?:class\s*|-)?(10|12)\b/i);
    const classNum = classMatch ? classMatch[1] : '';

    // Extract semester if present
    const semMatch = title.match(/\bsem(?:ester)?\s*(\d+)\b/i);
    const semNum = semMatch ? semMatch[1] : '';
    
    // If we can extract both class and year, use them as a robust key
    if (year && classNum) {
      return `class_${classNum}_${year}` + (semNum ? `_sem_${semNum}` : '');
    }
    
    // Fallback to exact match (ignoring whitespace and case)
    return title.replace(/\s+/g, '').toLowerCase();
  };

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" }); // Initialize AOS with smooth settings
    // Fetch available PDFs from local backend
    axios.get(`${WEB_BACKEND_URL}/api/ics-papers`)
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
  }, []);
  

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${WEB_BACKEND_URL}/api/route/IcsePreviousyearQuestions/${slug}`
        );
        console.log("API Response:", response.data);

        if (response.data && response.data.data) {
          setData(response.data.data); 
        } else {
          setData([]); // No data found
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.response?.data?.message || "Error fetching data.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

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
        <div className="px-4 md:px-28 flex flex-col lg:flex-row gap-6 bg-gray-100 container mx-auto pt-24">
          <div className="flex flex-col gap-5 w-full lg:w-[65%]">
            <div className="fixed right-8 top-[650px] md:top-[550px] flex flex-col items-center space-y-4"></div>
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className="mb-4">
                  <h1 className="mb-2 p-4 text-white text-[1.4em] bg-orange-600 font-bold">
                    {item.heading1}
                  </h1>

                  <p className="mb-2 mt-4 text-gray-800">{item.para1}</p>

                  <h1 className="mb-2 text-slate-800 text-[1.2em]">
                    {item.heading2}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para2}</p>

                  <Image src={Banner2} alt="" />
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
                    {item.heading3 ? ( // Check if item.heading24 has a value
                      <h1 className=" text-[1.2em]">{item.heading3}</h1>
                    ) : null}
                    <p className="mb-2 mt-4 text-gray-800">{item.para3}</p>

                    <div className="grid border border-slate-800 mt-4  ">
                      {item.heading4 ? ( // Check if item.heading24 has a value
                        <h1 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                          {item.heading4}
                        </h1>
                      ) : null}
                      <p>{item.para4}</p>
                      {(item.tableData && item.tableData.length > 0) ||
                        (item.anotherField && item.anotherField.length > 0) ? (
                        <table className="min-w-full bg-white ">
                          <tbody>
                            <tr>
                              {item.tableData && item.tableData.length > 0 ? (
                                <td className="border border-slate-800">
                                  {item.tableData.map((dataItem, index) => (
                                    <div
                                      key={dataItem.id || index} // Ensure you have a unique key
                                      className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.tableData.length - 1
                                        ? ""
                                        : "border-b border-slate-800"
                                        }`}
                                    >
                                      {dataItem && dataItem.title ? (
                                          (dataItem.pdfUrl || uploadedUrls[normalizeTitle(dataItem.title)]) ? (
                                            <a 
                                              className="w-full block text-center font-bold text-blue-600"
                                              href={dataItem.pdfUrl || uploadedUrls[normalizeTitle(dataItem.title)]}
                                              download
                                            >
                                              {dataItem.title}
                                            </a>
                                          ) : (
                                          <button
                                            className="w-full block text-center cursor-pointer"
                                            onClick={() => alert("PDF not uploaded yet for this paper.")}
                                          >
                                            {dataItem.title}
                                          </button>
                                        )
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

                              {item.anotherField &&
                                item.anotherField.length > 0 && (
                                  <td className="border border-slate-800">
                                    {item.anotherField.map(
                                      (dataItem, index) => (
                                        <div
                                          key={dataItem.id || index} // Ensure you have a unique key
                                          className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index ===
                                            item.anotherField.length - 1
                                            ? ""
                                            : "border-b"
                                            }`}
                                        >
                                          {dataItem && dataItem.title ? (
                                            (dataItem.pdfUrl || uploadedUrls[normalizeTitle(dataItem.title)]) ? (
                                              <a 
                                                className="w-full block text-center font-bold text-blue-600"
                                                href={dataItem.pdfUrl || uploadedUrls[normalizeTitle(dataItem.title)]}
                                                download
                                              >
                                                {dataItem.title}
                                              </a>
                                            ) : (
                                              <button
                                                className="w-full block text-center cursor-pointer"
                                                onClick={() => alert("PDF not uploaded yet for this paper.")}
                                              >
                                                {dataItem.title}
                                              </button>
                                            )
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
                  </div>
                  <h1 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                    {item.heading5}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para5}</p>
                  {item.list2 && item.list2.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list2.map((listItem, index) => (
                        <li key={index} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}

                  <h1 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                    {item.heading11}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para11}</p>
                  <div className="border mt-3 mb-5 border-slate-800">
                    {item.heading12 ? ( // Check if item.heading24 has a value
                      <h1 className="text-white bg-orange-600 p-4 font-bold text-center border border-slate-800 text-[1.2em]">
                        {item.heading12}
                      </h1>
                    ) : null}
                    <p className=" ">{item.para12}</p>

                    {item.anotherField1 && item.anotherField1.length > 0 && (
                      <div className="flex flex-col items-center justify-center gap-4">
                        <table className="min-w-full bg-white border border-gray-300">
                          <tbody className="text-center">
                            <tr>
                              <td className="border border-slate-800">
                                {item.anotherField1.map((dataItem, index) => (
                                  <div
                                    key={dataItem.id || index} // Ensure you have a unique key
                                    className={`py-2 px-4 border-slate-800 hover:bg-gray-100 w-full ${index === item.anotherField1.length - 1
                                      ? ""
                                      : "border-b"
                                      }`}
                                  >
                                    {dataItem && dataItem.title ? (
                                      (dataItem.pdfUrl || uploadedUrls[normalizeTitle(dataItem.title)]) ? (
                                        <a 
                                          className="w-full block text-center font-bold text-blue-600"
                                          href={dataItem.pdfUrl || uploadedUrls[normalizeTitle(dataItem.title)]}
                                          download
                                        >
                                          {dataItem.title}
                                        </a>
                                      ) : (
                                        <button
                                          className="w-full block text-center cursor-pointer"
                                          onClick={() => alert("PDF not uploaded yet for this paper.")}
                                        >
                                          {dataItem.title}
                                        </button>
                                      )
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
                  <h1 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                    {item.heading6}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para6}</p>
                  <h1 className="mb-2 text-slate-800 mt-3 text-[1.2em]">
                    {item.heading7}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para7}</p>
                  <h1 className="mb-2 text-orange-600 mt-3 text-[1.2em]">
                    {item.heading8}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para8}</p>
                  {item.list4 && item.list4.length > 0 && (
                    <ol className="list-disc text-orange-600 pl-5 mb-2">
                      {item.list4.map((listItem, index) => (
                        <li key={index} className="mb-1">
                          {listItem}
                        </li>
                      ))}
                    </ol>
                  )}
                  <h1 className="mb-2 text-orange-600 mt-3 text-[1.2em]">
                    {item.heading9}
                  </h1>
                  <p className="mb-2 mt-4 text-gray-800">{item.para9}</p>

                  <div className="flex flex-col text-[.8em] mt-5 border border-slate-800  rounded-lg p-1">
                    <h1 className=" font-semibold">{item.heading10}</h1>
                    <p className=" ">{item.para10}</p>
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
              <p>No data found for Class {Class}</p>
            )}
          </div>
          <div className="flex flex-col gap-5 w-full lg:w-[35%]">
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
            <FormSection />
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
