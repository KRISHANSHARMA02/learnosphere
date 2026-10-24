"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import { useState, useContext } from "react";
import { FormContext } from "@/src/context/FormContext";
import Image from "next/image";
import { TiTick } from "react-icons/ti";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Form2 = ({ onContinue, onBack }) => {
  const { state: formData, dispatch } = useContext(FormContext);

  // Set initial filePreview, handle both Blob (file) and URL (string)
  const [filePreview, setFilePreview] = useState(
    formData.profileImage && typeof formData.profileImage === "string"
      ? formData.profileImage // If it's already a URL, use that directly
      : formData.profileImage instanceof Blob
      ? URL.createObjectURL(formData.profileImage)
      : null // Default to null if no profileImage is present
  );

  const uploadImage = async (file) => {
    const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];

    if (file && allowedFormats.includes(file.type)) {
      // Update the profileImage state with the file object
      dispatch({
        type: "UPDATE_FORM_DATA",
        payload: { profileImage: file },
      });

      // Update filePreview if a file is uploaded
      setFilePreview(URL.createObjectURL(file));

      // Create a new FormData object and append data for upload
      const formDataToSend = new FormData();
      formDataToSend.append("profileImage", file);
      formDataToSend.append("email", formData.email); // Add email to form data

      try {
        // Send the formDataToSend to the backend using axios
        const response = await axios.post(
          `${WEB_BACKEND_URL}/api/route/uploadProfileImage`,
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file upload
            },
          }
        );

        // Check if the response is OK
        if (response.status === 200) {
            toast.success("Image uploaded successfully!", {
            position: "top-center",
            autoClose: 3000,
            });
        } else {
          alert("Failed to upload image. Please try again.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("An error occurred while uploading the image. Please try again.");
      }
    } else {
      alert("Only JPG, JPEG, or PNG images are allowed.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    // Check if a new image is selected, if not, retain the existing URL
    if (file) {
      uploadImage(file); // Call the common uploadImage function
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    // Check if a new image is dropped, if not, retain the existing URL
    if (file) {
      uploadImage(file); // Call the common uploadImage function for drop
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-md mx-auto bg-[#fff] p-4 md:p-8 shadow-xl rounded-lg">
      <ToastContainer  />
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Profile Image</h2>
      <p className="mb-6 text-gray-600 text-center">
        Upload a profile image to complete your registration.
      </p>

      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <FiUpload className="text-4xl text-gray-400 mb-4" />
        <p className="text-gray-500 text-sm mb-2">Drag & drop your image here</p>
        <p className="text-gray-500 text-sm">or</p>
        <label className="mt-2 inline-block bg-orange-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-orange-500">
          Choose an Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange} // Uploads the image when chosen
            className="hidden"
          />
        </label>
      </div>

      {filePreview ? (
        <div className="mt-6 flex justify-center">
          <Image
            width={200}
            height={200}
            src={filePreview}
            alt="Profile Preview"
            className="rounded-full object-cover h-44 w-44 shadow-md border-2 border-orange-500"
          />
        </div>
      ) : null}

      <div>
        <ul className="flex flex-col gap-4 mt-6">
          <li className="flex gap-2">
            <TiTick className="text-green-600 text-[1.5em]" />
            You should be facing forward
          </li>
          <li className="flex gap-2">
            <TiTick className="text-green-600 text-[1.5em]" />
            Frame your head and shoulders
          </li>
          <li className="flex gap-2">
            <TiTick className="text-green-600 text-[1.5em]" />
            You should be centered and upright
          </li>
          <li className="flex gap-2">
            <TiTick className="text-green-600 text-[1.5em]" />
            Your face and eyes should be visible
          </li>
          <li className="flex gap-2">
            <TiTick className="text-green-600 text-[1.5em]" />
            You should be the only person in the photo
          </li>
          <li className="flex gap-2">
            <TiTick className="text-green-600 text-[1.5em]" />
            Use a color photo with high resolution and no filters
          </li>
        </ul>
      </div>

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="bg-gray-500 hover:bg-gray-400 text-white py-2 px-4 rounded-md"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded-md"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default Form2;

