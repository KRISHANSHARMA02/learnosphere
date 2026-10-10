"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Assuming you're using next-auth for authentication
import Swal from "sweetalert2";
import Head from "next/head";
import { trackEvent } from "@/src/lib/eventTracker";

const Feedback = ({ onClose }) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");

  const [mobile, setMobile] = useState("");
  const [message, setMessage] = useState("");
  const [profileData, setProfileData] = useState({});

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
  
    const formData = {
      name,
      mobile,
      message,
      gmail: profileData?.gmail || session.user.email, // Ensure email is populated
    };

  
    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/studentfeedbackform",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        trackEvent("STUDENT_FEEDBACK_FORM_SUBMITTED", {
          name: formData.name,
          email: formData.gmail,
          mobile: formData.mobile,
          message: formData.message,
        });

        setSuccess("Feedback submitted successfully!");
        setName("");
        setMobile("");
        setMessage("");
  
        // Display SweetAlert2 success message
        Swal.fire({
          title: "Thank You!",
          text: "Thank you for your feedback. We will resolve your issue as soon as possible!",
          icon: "success",
          confirmButtonText: "Close",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          if (onClose) onClose();
        });
      } else {
        setErrors({ general: "Failed to submit the form. Please try again." });
      }
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred while submitting the form." });
      }
    }
  };
  

  return (
    <div>
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
      <div className="bg-orange-50 border border-gray-200 text-orange-900 text-xs rounded-md p-2 mt-2">
        <p>
          Please fill out this form to contact us and submit your doubts. We’ll
          work to address your issues as soon as possible. Your feedback is
          important to us!
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col mt-4 bg-white gap-2 rounded-lg p-3 w-full m-auto border-2 border-slate-200"
      >
        <span className="flex flex-col gap-1 mt-2 ">
          <label
            htmlFor="name"
            className="block text-gray-700 text-[.8em] font-bold"
          >
            Name<b className="text-orange-600">*</b>
          </label>
          <input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Your Fullname"
            className="border border-orange-200 placeholder:text-[.8em] placeholder:text-gray-800 w-full rounded-md focus:outline-none p-2 focus:placeholder:text-blue-600 focus:border-blue-600"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mb-1">{errors.name}</p>
          )}
        </span>

        {/* Mobile Number Field */}
        <span className="flex flex-col gap-1">
          <label
            htmlFor="mobile"
            className="block text-gray-700 text-[.8em] font-bold"
          >
            Mobile Number<b className="text-orange-600">*</b>
          </label>
          <input
            id="mobile"
            name="mobile"
            value={mobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Allow only digits
              setMobile(value.slice(0, 10)); // Limit to 10 digits
            }}
            placeholder="Enter Your Mobile Number"
            className="border border-orange-200 placeholder:text-[.8em] placeholder:text-gray-800 w-full rounded-md focus:outline-none p-2 focus:placeholder:text-blue-600 focus:border-blue-600"
          />
          {errors.mobile && (
            <p className="text-red-500 text-xs mb-1">{errors.mobile}</p>
          )}
        </span>


        <span className="flex flex-col gap-1">
          <label
            htmlFor="message"
            className="block text-gray-700 text-[.8em] font-bold"
          >
          Enter your query<b className="text-orange-600">*</b>
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Your query here.."
            rows="3"
            className="border border-orange-200 placeholder:text-[.8em] placeholder:text-gray-800 w-full rounded-md focus:outline-none p-2 focus:placeholder:text-blue-600 focus:border-blue-600"
          />
          {errors.message && (
            <p className="text-red-500 text-xs mb-1">{errors.message}</p>
          )}
        </span>

        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="font-bold text-white bg-orange-600 p-2 rounded-md w-32 mt-2 text-center text-sm"
          >
            Submit
          </button>
        </div>

        {errors.general && (
          <p className="text-red-500 text-xs mb-1">{errors.general}</p>
        )}
        {success && <p className="text-green-500 text-xs mb-1">{success}</p>}
      </form>
    </div>
  );
};

export default Feedback;
