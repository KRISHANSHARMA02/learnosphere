"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // Assuming you're using next-auth for authentication
import Swal from "sweetalert2";
import Head from "next/head";
import { trackEvent } from "@/src/lib/eventTracker";


const TeacherFeedback = ({ onClose }) => {
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [name, setName] = useState("");
  const [mobilenumber, setMobilenumber] = useState("");
  
  const [message, setMessage] = useState("");
  const [profileData, setProfileData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getTeacherByEmail`,
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

  const handleMobilenumberChange = (e) => {
    const input = e.target.value;

    // Check if the input contains only digits
    const onlyDigits = /^[0-9]*$/;

    // If the input is valid (only digits), and length <= 10, update state
    if (onlyDigits.test(input) && input.length <= 10) {
      setMobilenumber(input);

      // Clear any errors once the input is valid
      if (input.length === 10) {
        setErrors((prevErrors) => ({ ...prevErrors, mobilenumber: "" }));
      }
    }

    // If the length is less than 10, show error message
    if (input.length > 0 && input.length < 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobilenumber: "Mobile number must be exactly 10 digits",
      }));
    }
  };

  const handleSubmit = async (e) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    e.preventDefault();
    setErrors({});

    const formData = {
      name,
      mobilenumber,
      message,
      gmail: profileData?.gmail || session.user.email, // Ensure email is populated
    };

    try {
      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/teacherfeedbackform`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        trackEvent("TEACHER_FEEDBACK_FORM_SUBMITTED", {
          name: formData.name,
          email: formData.gmail,
          mobilenumber: formData.mobilenumber,
          message: formData.message,
        });

        setSuccess("Feedback submitted successfully!");
        setName("");
        setMobilenumber("");
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-lg"
      >
        <div className="bg-orange-50 border border-gray-200 text-orange-900 text-xs rounded-md p-2 mt-2">
        <p>
          Please fill out this form to contact us and submit your doubts. We’ll
          work to address your issues as soon as possible. Your feedback is
          important to us!
        </p>
      </div>

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
        <span className="flex flex-col gap-1">
          <label
            htmlFor="mobilenumber"
            className="block text-gray-700 text-[.8em] font-bold"
          >
            Mobilenumber<b className="text-orange-600">*</b>
          </label>
          <input
            id="mobilenumber"
            name="mobilenumber"
            value={mobilenumber}
            onChange={(e) => handleMobilenumberChange(e)}
            placeholder="Enter Your Mobilenumber"
            className="border border-orange-200 placeholder:text-[.8em] placeholder:text-gray-800 w-full rounded-md focus:outline-none p-2 focus:placeholder:text-blue-600 focus:border-blue-600"
            maxLength="10" // Limits input to 10 digits
          />
          {errors.mobilenumber && (
            <p className="text-red-500 text-xs mb-1">{errors.mobilenumber}</p>
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
            className={`bg-orange-500 text-white font-bold py-2 px-4 w-32 rounded-md mt-2 text-sm ${ isSubmitting ? "opacity-50 cursor-not-allowed" : "" }`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
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

export default TeacherFeedback;
