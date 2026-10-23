"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import picture from "@/public/profile.png";
import { IoClose, IoCloseOutline } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSession } from "next-auth/react";
import axios from "axios";
import { MdVerified } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import Head from "next/head";
import { FiUploadCloud } from "react-icons/fi";
import Swal from "sweetalert2";
import { IoIosCloudUpload } from "react-icons/io";
import { BsPencilSquare } from "react-icons/bs";
import { TiPencil } from "react-icons/ti";


const Profileteacher = () => {
  const [isNewStudentPopupVisible, setIsNewStudentPopupVisible] =
    useState(false);
  const [isTotalStudentPopupVisible, setIsTotalStudentPopupVisible] =
    useState(false);
  // const [currentPasscode, setCurrentPasscode] = useState("");
  // const [showChangePasscodeForm, setShowChangePasscodeForm] = useState(false);
  // const [newPasscode, setNewPasscode] = useState("");
  // const [confirmNewPasscode, setConfirmNewPasscode] = useState("");
  // const [passcodeError, setPasscodeError] = useState("");

  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState(null);
 
  const[error,setError] = useState("");
  const fileInputRef = useRef(null);
  const [video, setVideo] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Video Select Function
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
      fileInputRef.current.value = "";
    }
  };

  // Upload Video Function
  const handleUpload = async () => {
    if (!video) {
      Swal.fire({
        icon: "warning",
        title: "No Video Selected",
        text: "Please select a video to upload.",
      });
      return;
    }

    if (status !== "authenticated" || !session?.user?.email) {
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "You must be logged in to upload a video.",
      });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("video", video);
    formData.append("email", session.user.email);

    try {
      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/UploadIntroVideo`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      Swal.fire({
        icon: "success",
        title: "Upload Successful",
        text: response.data.message,
        timer: 2000,
        showConfirmButton: false,
      });

      setVideo(null);
      setVideoPreview(null);
      fileInputRef.current.value = "";
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Upload Failed",
        text: "Error uploading video. Please try again.",
      });
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const [videoUrl, setVideoUrl] = useState(null);
 

  useEffect(() => {
    const fetchIntroVideo = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.get(
            `${WEB_BACKEND_URL}/api/route/getIntroVideo`,
            { params: { email: session.user.email } } // Send email as query param
          );

          setVideoUrl(response.data.videoUrl); // Store video URL in state
        } catch (error) {
          console.error("Error fetching intro video:", error);
          setMessage("No video found.");
        }
      }
    };

    fetchIntroVideo();
  }, [session, status]);
  

  

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRefImage = useRef(null);

  const triggerFileInput = () => {
    fileInputRefImage.current?.click();
  };

  // Image select hone par preview dikhane ka function
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file)); // Temporary preview ke liye
      setImageFile(file); // Actual file store karne ke liye
    }
  };

  // Image upload karne ka function
  const handleImageUpload = async () => {
    if (!imageFile) return;
  
    const formData = new FormData();
    formData.append("profileImage", imageFile);
    formData.append("email", session.user.email);
  
    try {
      const response = await axios.post(
        `${WEB_BACKEND_URL}/api/route/UpdateProfileImage`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      if (response.data.success) {
        setProfileData((prev) => ({
          ...prev,
          profileImage: response.data.imagePath, // Backend se updated image path set karna
        }));
        setSelectedImage(null); // Upload hone ke baad preview reset
        setImageFile(null); // File reset karna
  
        // SweetAlert2 Success Message
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile Picture Updated Successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while updating the profile picture!",
      });
    }
  };



  useEffect(() => {
    const fetchTeacherData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            `${WEB_BACKEND_URL}/api/route/getTeacherByEmail`,
            { gmail: session.user.email } // make sure you are sending the email correctly
          );

          setProfileData(response.data.data); // set profile data from response
          
        } catch (error) {
          console.error("Error fetching teacher profile data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [session, status]);

  // const handlePasscodeChange = (event) => {
  //   event.preventDefault();

  //   if (newPasscode !== confirmNewPasscode) {
  //     setPasscodeError("New passcodes do not match.");
  //     return;
  //   }

  //   if (newPasscode.length < 6) {
  //     setPasscodeError("New passcode must be at least 6 characters long.");
  //     return;
  //   }

  //   setPasscodeError("");
  //   alert("Passcode changed successfully!");
  //   setCurrentPasscode("");
  //   setNewPasscode("");
  //   setConfirmNewPasscode("");
  //   setShowChangePasscodeForm(false); // Hide form after successful change
  // };

  useEffect(() => {
    AOS.init({ duration: 600 });
  }, []);

  const newStudentClick = () => {
    setIsNewStudentPopupVisible(true);
  };

  const totalStudentClick = () => {
    setIsTotalStudentPopupVisible(true);
  };

  const newStudentClosePopup = () => {
    setIsNewStudentPopupVisible(false);
  };

  const totalStudentClosePopup = () => {
    setIsTotalStudentPopupVisible(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0]; // Extract only the date part
  };

  

  return (
    <>
  
    <div className="min-h-screen overflow-y-scroll">
    <Head>
    <meta name="robots" content="noindex, nofollow" />
  </Head>
      <div className="p-4 mx-2 md:mx-8 border-b-2 border-orange-800 w-60 font-bold text-[1.2em] bg-orange-500 rounded-full text-white">
        <p>Personal Information</p>
      </div>
      <div className=" flex flex-col md:flex-row gap-10 p-2 md:p-8">
      
        <div className="w-full 2xl:w-[40%]  h-auto xl:h-[75vh] 2xl:h-[50vh]  mt-4 md:mt-0 rounded-lg flex flex-col items-center justify-start relative overflow-hidden">
    
        <div className="w-full h-40 xl:h-48 2xl:h-56 relative">
        {/* Video Preview Box */}
        <div
          className="w-full h-full flex flex-col items-center justify-center border-2 border-gray-400 rounded-lg bg-gray-100 cursor-pointer"
          onClick={() => setIsPopupOpen(true)}
          style={{
            backgroundImage:
              !videoPreview && !profileData?.intro_video
                ? `url('/Grey Modern LinkedIn Article Cover Image.svg')`
                : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {videoPreview || profileData?.intro_video ? (
            <video className="w-full h-full object-cover" autoPlay loop muted>
              <source
                src={videoPreview || profileData?.intro_video}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex flex-col items-center bg-opacity-50 bg-gray-200 p-4 rounded-lg"></div>
          )}
        </div>
  
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          className="hidden"
        />
  
        {/* Upload Button */}
        <div className="absolute bottom-2 z-50 right-2 flex gap-2">
          {!video && (
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold shadow-md transition-all duration-300 ease-in-out flex items-center gap-2"
            >
              <BsPencilSquare size={20} />
            </button>
          )}
  
          {video && (
            <button
              onClick={handleUpload}
              className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow-md transition-all duration-300 ease-in-out flex items-center gap-2"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          )}
        </div>
  
        {/* Popup Modal */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="relative bg-white p-4 rounded-lg w-[90%] max-w-2xl">
              <button
                className="absolute top-2 right-2 z-50 text-white bg-red-500 text-2xl"
                onClick={() => setIsPopupOpen(false)}
              >
                <IoClose />
              </button>
              <video className="w-full h-auto" controls>
                <source
                  src={videoPreview || profileData?.intro_video}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </div>
  

      
          {/* Profile Section */}
          <div className="relative flex justify-around  w-full items-center mt-[-60px]">
            {/* Profile Image */}
      <div className="relative inline-block">
      <div
        className={`rounded-full bg-white border-4 ${
          profileData?.is_approved ? "border-green-500" : "border-red-500"
        }`}
      >
        <Image
          className="h-24 w-24 xl:h-28 xl:w-28 2xl:h-32 2xl:w-32 rounded-full object-top object-cover"
          src={selectedImage || profileData?.profileImage || picture} // Preview or actual image
          height={120}
          width={120}
          alt="Profile"
        />
      </div>

      {/* Edit Button (Dynamic) */}
      <button
        onClick={selectedImage ? handleImageUpload : triggerFileInput} // Agar image select ho chuki hai to upload, warna edit
        className={`absolute bottom-2 right-2 px-3 py-1 rounded-full text-sm shadow-md ${
          selectedImage
            ? "bg-green-500 text-white hover:bg-green-600" // Upload state
            : "bg-orange-500 text-white hover:bg-orange-600" // Edit state
        }`}
      >
        {selectedImage ? "Upload" : <TiPencil size={20} />} {/* Text change hona chahiye */}
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRefImage}
        className="hidden"
        onChange={handleFileChange} // Pehle preview ke liye
      />
    </div>


    
            {/* Status Badge */}
            <span className={`absolute top-2 left-28 bg-white px-1 py-1 rounded-full text-xs font-semibold shadow-lg ${profileData?.is_approved ? "text-green-600" : "text-red-600"}`}>
              {profileData?.is_approved ? <MdVerified size={25}/> : <AiOutlineClockCircle size={25}/> }
            </span>
    
            {/* User Details */}
            <div className="text-start mt-12">
              <p className="font-bold text-black text-lg">{profileData?.name || "Teacher Name"}</p>
              <p className="font-semibold text-gray-600 text-sm">Reg. No. {profileData?.RegistrationNumber || "Reg. No"}</p>
            </div>
          </div>
    
          {/* Video Modal Popup */}
       
    
        </div>
        <div className="w-full md:w-[60%] flex flex-col gap-6 mt-6">
          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            <span>
              <p className="text-[.8em] px-1">Name*</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="fullname"
                type="text"
                disabled
                name="fullname"
                onChange={(e) =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
                value={profileData?.name || ""}
                placeholder="fullname"
              />
            </span>
            <span>
              <p className="text-[.8em] px-1">Phone Number</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="Contact"
                disabled
                name="Contact"
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    mobilenumber: e.target.value,
                  })
                }
                value={profileData?.mobilenumber || ""}
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
                disabled
                id="email"
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                value={profileData?.email || ""}
                placeholder="E-mail"
              />
            </span>
            <span className="px-0 md:px-6">
              <p className="text-[.8em] px-1">DOB</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                type="date"
                id="dob"
                name="dob"
                disabled
                onChange={(e) =>
                  setProfileData({ ...profileData, dob: e.target.value })
                }
                min="1900-01-01"
                value={profileData?.dob ? formatDate(profileData.dob) : ""}
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
                disabled
                onChange={(e) =>
                  setProfileData({ ...profileData, gender: e.target.value })
                }
                value={profileData?.gender || ""}
                className="mt-1 block  w-full xl:w-[22vw] 2xl:w-[25vw] p-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
              >
                <option className="text-bold" value="">
                  Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
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
                onChange={(e) =>
                  setProfileData({ ...profileData, city: e.target.value })
                }
                value={profileData?.city || ""}
                className="mt-1 block w-full xl:w-[22vw] 2xl:w-[25vw] p-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
              >
                <option className="text-bold" value="">
                  Select City
                </option>
                <option value="Jaipur">Jaipur</option>
                {/* Other cities */}
              </select>
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-10">
            <span>
              <p className="text-[.8em] px-1">Subject</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="subject"
                required
                name="subject"
                onChange={(e) =>
                  setProfileData({ ...profileData, subject: e.target.value })
                }
                value={profileData?.subject || ""}
                placeholder="Subject"
              />
            </span>
            <span>
              <p className="text-[.8em] px-1">Experience</p>
              <input
                className="bg-gray-100 placeholder-black placeholder:text-[0.8em] border-none w-full xl:w-[22vw] 2xl:w-[25vw] p-2 rounded-lg"
                id="Experience"
                disabled
                name="Experience"
                onChange={(e) =>
                  setProfileData({
                    ...profileData,
                    yearsOfExperience: e.target.value,
                  })
                }
                value={profileData?.yearsOfExperience || "0"}
                placeholder="Your Experience"
              />
            </span>
          </div>
  

     

       
          <div className="mt-16">
            {/* {!showChangePasscodeForm && (
              <div className="mt-2 w-full xl:w-[22vw] 2xl:w-[25vw] shadow-2xl rounded-tr-lg tounded-lr-lg gap-2 border-b-2 p-6 border-orange-600 flex flex-col m-auto items-center text-white">
                <p className="text-orange-500 text-center p-2 rounded-full">
                  Current Psscode
                </p>
                <input
                  type="password"
                  className="text-black border border-gray-300 p-2"
                  id="currentPasscord"
                  name="currentPasscord"
                  value={currentPasscode}
                  onChange={(e) => setCurrentPasscode(e.target.value)}
                  placeholder="Enter Your Current Passcode"
                />
                <button
                  onClick={() => setShowChangePasscodeForm(true)}
                  className="mt-4 bg-orange-500 text-white p-2 rounded-lg w-full"
                >
                  Change Passcode
                </button>
              </div>
            )} */}
            {/* {showChangePasscodeForm && (
              <div className="mt-2  shadow-2xl rounded-tr-lg gap-2 rounded-tl-lg border-b-2 p-6 border-sky-700 w-full xl:w-[22vw] 2xl:w-[25vw]  flex flex-col items-center m-auto text-white">
                <p className="text-orange-500 text-center p-2 rounded-full">
                  Change Passcode
                </p>
                <form
                  onSubmit={handlePasscodeChange}
                  className="w-full flex flex-col gap-4"
                >
                  <div>
                    <label
                      htmlFor="newPasscode"
                      className="block text-[0.9em]  text-black"
                    >
                      New Passcode
                    </label>
                    <input
                      type="password"
                      id="newPasscode"
                      name="newPasscode"
                      className="w-full p-2 border text-black border-gray-300 rounded-md"
                      value={newPasscode}
                      onChange={(e) => setNewPasscode(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmNewPasscode"
                      className="block text-[0.9em]  text-black"
                    >
                      Confirm New Passcode
                    </label>
                    <input
                      type="password"
                      id="confirmNewPasscode"
                      name="confirmNewPasscode"
                      className="w-full p-2 border text-black border-gray-300 rounded-md"
                      value={confirmNewPasscode}
                      onChange={(e) => setConfirmNewPasscode(e.target.value)}
                      required
                    />
                  </div>
                  {passcodeError && (
                    <p className="text-red-500">{passcodeError}</p>
                  )}
                  <button
                    type="submit"
                    className="bg-orange-500 text-white p-2 rounded-lg w-full"
                  >
                    Change Passcode
                  </button>
                </form>
              </div>
            )} */}
          </div>
        </div>
      </div>

      {isNewStudentPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            data-aos="slide-down"
            className="relative bg-white p-6 rounded-lg w-64"
          >
            <button
              onClick={newStudentClosePopup}
              className="absolute top-2 right-2"
            >
              <IoCloseOutline size={24} />
            </button>
            <h2>New Students</h2>
            <div className="flex justify-around">
              <p>Sr.No</p> {/* Example count of total students */}
              <p>Name</p>
              <p>Address</p>
            </div>
          </div>
        </div>
      )}

      {isTotalStudentPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            data-aos="slide-down"
            className="relative bg-white p-6 rounded-lg w-64"
          >
            <button
              onClick={totalStudentClosePopup}
              className="absolute top-2 right-2"
            >
              <IoCloseOutline size={24} />
            </button>
            <h2>Total Students</h2>
            <div className="flex justify-around">
              <p>Sr.No</p> {/* Example count of total students */}
              <p>Name</p>
              <p>Address</p>
            </div>
          </div>
        </div>
      )}
    </div>
    
   
    </>
  );
};

export default Profileteacher;
