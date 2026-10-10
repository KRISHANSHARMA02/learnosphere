"use client";
import React from "react";
import Image from "next/image";
import IndiaMap from "@/public/India_Map.png";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";
import FaqState from "@/components/FaqState";
import DownloadFormPage from "@/components/downloadForm";


const StateBoard = () => {

  const boards = [
    {
      state: "Andhra Pradesh",
      board: "Board of Secondary Education, Andhra Pradesh (BSEAP)",
      slug: "APBSE",
    },
    {
      state: "Arunachal Pradesh",
      board: "Directorate of School Education, Arunachal Pradesh (DSEAP)",
      slug: "DSEAP",
    },
    {
      state: "Assam",
      board: "Board of Secondary Education, Assam (SEBA)",
      slug: "SEBA",
    },
    {
      state: "Bihar",
      board: "Bihar School Examination Board (BSEB)",
      slug: "BSEB",
    },
    {
      state: "Chhattisgarh",
      board: "Chhattisgarh Board of Secondary Education (CGBSE)",
      slug: "CGBSE",
    },
    {
      state: "Goa",
      board: "Goa Board of Secondary and Higher Secondary Education (GBSHSE)",
      slug: "GBSHSE",
    },
    {
      state: "Gujarat",
      board: "Gujarat Secondary and Higher Secondary Education Board (GSEB)",
      slug: "GSEB",
    },
    {
      state: "Haryana",
      board: "Board of School Education Haryana (BSEH)",
      slug: "BSEH",
    },
    {
      state: "Himachal Pradesh",
      board: "Himachal Pradesh Board of School Education (HPBOSE)",
      slug: "HPBOSE",
    },
    {
      state: "Jharkhand",
      board: "Jharkhand Academic Council (JAC)",
      slug: "JAC",
    },
    {
      state: "Karnataka",
      board: "Karnataka School Examination and Assessment Board (KSEAB)",
      slug: "KSEEB",
    },
    {
      state: "Kerala",
      board: "Kerala Board of Public Examinations (KBPE)",
      slug: "KBPE",
    },
    {
      state: "Madhya Pradesh",
      board: "Madhya Pradesh Board of Secondary Education (MPBSE)",
      slug: "MPBSE",
    },
    {
      state: "Maharashtra",
      board:
        "Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)",
      slug: "MSBSHSE",
    },
    {
      state: "Manipur",
      board: "Board of Secondary Education, Manipur (BSEM)",
      slug: "MANIPUR",
    },
    {
      state: "Meghalaya",
      board: "Meghalaya Board of School Education (MBOSE)",
      slug: "MBOSE",
    },
    {
      state: "Mizoram",
      board: "Mizoram Board of School Education (MBSE)",
      slug: "MBSE",
    },
    {
      state: "Nagaland",
      board: "Nagaland Board of School Education (NBSE)",
      slug: "NBSE",
    },
    {
      state: "Punjab",
      board: "Punjab School Education Board (PSEB)",
      slug: "PSEB",
    },
    {
      state: "Rajasthan",
      board: "Board of Secondary Education Rajasthan (RBSE)",
      slug: "RBSE",
    },
    {
      state: "Tamil Nadu",
      board: "Tamil Nadu State Board of School Examination (TNSB)",
      slug: "TNSB",
    },
    {
      state: "Telangana",
      board: "Telangana State Board of Secondary Education (BSE Telangana)",
      slug: "BSE_Telangana",
    },
    {
      state: "Tripura",
      board: "Tripura Board of Secondary Education (TBSE)",
      slug: "TBSE",
    },
    {
      state: "Uttar Pradesh",
      board: "Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)",
      slug: "UPMSP",
    },
    {
      state: "Uttarakhand",
      board: "Uttarakhand Board of School Education (UBSE)",
      slug: "UBSE",
    },
    {
      state: "West Bengal",
      board: "West Bengal Board of Secondary Education (WBBSE)",
      slug: "WBBSE",
    },
    {
      state: "Odisha",
      board: "Board of Secondary Education, Odisha (BSE Odisha)",
      slug: "BSE_Odi",
    },
    // Add more rows as needed
  ];
  
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 mt-20 ">
        <div className="flex flex-col md:flex-row  py-4 mb-6 mx-4  ">
          <div className="max-w-7xl mx-auto px-6 md:w-[60vw]">
            <h1 className="text-3xl font-bold text-center text-white mb-4 bg-orange-600 p-4 rounded-lg shadow-md">
              State Boards of Education - List of State Boards
            </h1>

            <div className="mb-6 text-gray-700 space-y-4 mt-10">
              <p className="text-lg leading-relaxed">
                A State Board of Education is the official organization in each
                state that looks after school education. It decides what
                students will study, which books will be used, and when exams
                will be held. It’s a government authority that manages and
                regulates school education within a particular state or union
                territory. It decides the syllabus, textbooks, exam schedule,
                and evaluation methods for schools affiliated with it.
              </p>

              <ul className="list-disc pl-5 space-y-2">
                <li>Setting educational standards</li>
                <li>Designing curriculum guidelines</li>
                <li>Deciding graduation requirements</li>
                <li>
                  Overseeing the daily operations of public schools within the
                  state
                </li>
              </ul>

              <p className="text-lg leading-relaxed">
                These schools are funded by state and local governments and are
                open to all students living in the state. They follow the rules
                and policies laid out by the state board of education, which may
                include:
              </p>

              <ul className="list-disc pl-5 space-y-2">
                <li>Teacher qualification requirements</li>
                <li>Maximum class sizes</li>
                <li>Standardized tests</li>
                <li>Academic performance goals</li>
              </ul>

              <p className="text-lg leading-relaxed">
                State board schools are a vital part of the public education
                system. They offer free education to every student, no matter
                their background or financial situation. The goal is to provide
                equal access to quality education and help every child get ready
                for college, careers, and life beyond school.
              </p>

              <h2 className="text-2xl font-semibold text-gray-800 mt-8">
                List of State Boards in India
              </h2>
              <p className="text-lg leading-relaxed">
                In India, State Boards are educational authorities established
                by individual state governments to manage and regulate school
                education within their respective states. Each state has its own
                board that sets guidelines, curriculum, and exam schedules
                tailored to local needs, languages, and policies.
              </p>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full table-auto text-gray-700">
                <thead className="bg-orange-200">
                  <tr>
                    <th className="px-4 py-3 border-b">State</th>
                    <th className="px-4 py-3 border-b">Board Name</th>
                  </tr>
                </thead>
                <tbody>
                  {boards.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border-b">{item.state}</td>
                      <td className="px-4 py-3 border-b">
                        {item.slug ? (
                          <Link
                            href={`/State_Board/${item.slug}`}
                            className="text-orange-600 hover:underline"
                          >
                            {item.board}
                          </Link>
                        ) : (
                          item.board
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center">
              <Image
                src={IndiaMap}
                height={400}
                width={500}
                alt="India Map"
                className="mb-14"
              />
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg h-full md:mr-10">
            
             <DownloadFormPage />
          </div>
        </div>
        <div>
          <FaqState />
        </div>
      </div>
      <Footer1 />
      <Footer />
    </>
  );
};

export default StateBoard;