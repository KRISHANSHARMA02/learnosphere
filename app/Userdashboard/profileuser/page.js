"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Profile from "@/public/profile.png";
import axios from "axios";
import { useSession } from "next-auth/react";
import { MdVerified } from "react-icons/md";
import Head from "next/head";



export default function Profileuser() {
  const [profileData, setProfileData] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getStudentByEmail`,
            { gmail: session.user.email }
          );
          setProfileData(response.data);
        } catch (error) {
          console.error("Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [session, status]);

  function formatDate(dateTimeString) {
    if (!dateTimeString) return "";

    const date = new Date(dateTimeString);

    // Extract the date in YYYY-MM-DD format
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }


  return (
    <>

    <div className="font-Poppins h-screen">
      {/* Personal Information Section */}
      <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
      <p className="text-white bg-orange-500 text-lg w-56 rounded-full border-b-2 border-orange-800 p-2 text-center">
        Personal Information
      </p>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
        {/* Profile Information */}
        <div className="mt-8 border border-gray-300  pt-2 md:pt-6 w-full md:w-[40%] rounded-lg">
          <div className="flex flex-col items-center mt-10">
            <div className="relative">
              {/* Dynamic border based on approval status */}
              <div
                className={`rounded-full border-8 transition-all duration-300 ${
                  profileData?.is_approved
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                <Image
                  className="rounded-full h-32 md:h-44 w-32 md:w-44 object-cover"
                  src={Profile}
                  alt="Profile"
                />
              </div>

              {/* Status Badge */}
              <span
                className={`absolute top-0 right-3 bg-white px-2 py-1 rounded-full text-xs font-semibold flex items-center ${
                  profileData?.is_approved ? "text-green-600" : "text-red-600"
                }`}
              >
                {profileData?.is_approved ? (
                  <>
                    <MdVerified size={20} className="mr-1" />
                    Verified
                  </>
                ) : (
                  "Pending"
                )}
              </span>
            </div>

            <p className="font-bold px-10 text-lg">
              {profileData?.studentName || "Loading..."}
            </p>
            <p className="text-black text-sm">
             ID: {profileData?.registrationNumber || "Id Loading..."}
            </p>
            {/* Uncomment if you want to add an edit profile button */}
            {/* <button className="px-10 text-orange-500 hover:border-b">
    Edit Profile
  </button> */}
          </div>
          <div className="bg-orange-200 mb-4 md:mb-12 mt-4 shadow-2xl rounded-tr-lg gap-2 rounded-tl-lg border-b-2 p-3 md:p-6 border-orange-700 w-[95%] flex flex-col items-center m-auto text-white">
            <p className="text-orange-500 text-center p-2 rounded-full">
              Active Subscription
            </p>
            <p className="text-center bg-white text-black font-semibold p-2 text-[0.8em] rounded-full">
              {" "}
              {profileData?.grade || "Loading.."}
            </p>
            <button className="px-4 pt-2 cursor-not-allowed bg-orange-500 text-white pb-2 rounded-lg">
              View All Subscriptions
            </button>
          </div>
        </div>

        {/* Other Information */}
        <div className="w-full md:w-[60%]  p-4 rounded-lg flex flex-col gap-3 md:gap-6 mt-1 md:mt-7">
          {/* Input Fields */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            <span>
              <p className="text-[.8em] px-1">Name*</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="fullname"
                required
                name="fullname"
                value={profileData?.studentName || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    studentName: e.target.value,
                  })
                }
                placeholder="fullname"
              />
            </span>
            <span>
              <p className="text-[.8em] px-1">Phone Number</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="Contact"
                required
                name="Contact"
                value={profileData?.mobileNumber || ""}
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    mobileNumber: e.target.value,
                  })
                }
                placeholder="Contact"
              />
            </span>
          </div>
          {/* More Input Fields */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <span>
              <p className="text-[.8em] px-1">E-mail</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                name="email"
                required
                id="email"
                value={profileData?.gmail || ""}
                onChange={(e) =>
                  setProfileData({ ...profileData, gmail: e.target.value })
                }
                placeholder="E-mail"
              />
            </span>
            <span className="px-0 md:px-6">
              <p className="text-[.8em] px-1">DOB</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                type="text"
                id="dob"
                name="dob"
                value={formatDate(profileData?.dob)}
                onChange={(e) =>
                  setProfileData({ ...profileData, dob: e.target.value })
                }
              />
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <span>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-[.8em] px-1 text-black"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={profileData?.gender || ""}
                onChange={(e) =>
                  setProfileData({ ...profileData, gender: e.target.value })
                }
                className="mt-1 block  w-full xl:w-[22vw] 2xl:w-[25vw] p-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
              >
                <option className="text-bold">Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </span>
            <span className="px-0 md:px-6">
              <label
                htmlFor="city"
                className="block text-sm font-medium text-black text-[.8em] px-1"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                value={profileData?.city || ""}
                onChange={(e) =>
                  setProfileData({ ...profileData, city: e.target.value })
                }
                className="mt-1 block w-full xl:w-[22vw] 2xl:w-[25vw] p-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
              >
                <option className="text-bold">City</option>
                <option>Jaipur</option>
                {/* Other cities */}
              </select>
            </span>
          </div>
          <button
            disabled
            className="bg-orange-600 cursor-not-allowed p-2 w-[20vw] md:w-[10vw] mt-2 rounded-lg text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
      
    </>
  );
}