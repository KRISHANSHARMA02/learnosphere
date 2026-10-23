"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Socialloginstudent, doCredentialLogin } from "@/app/actions";
import Swal from "sweetalert2";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UAParser } from 'ua-parser-js';
import { signIn } from 'next-auth/react';
import { trackEvent, EVENT_NAMES } from '../src/lib/eventTracker';


const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isClient, setIsClient] = useState(false); // To check if we are in client-side
  const [userdata, setUserData] = useState({
    identifier: "",
    password: "",
  });
  const [isLoging, setIsLoging] = useState(false);

  const [callbackUrl, setCallbackUrl] = useState("/Userdashboard");

  // ✅ Fix: read callbackUrl only on client
  useEffect(() => {
    setIsClient(true);

    const params = new URLSearchParams(window.location.search);
    const url = params.get("callbackUrl");
    if (url) {
      setCallbackUrl(url);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userdata,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // Set true only when the component is rendered on the client
  }, []);

  const handleSubmit = async (e) => {
     if (isLoging) return;
    setIsLoging(true);

    e.preventDefault();
    try {
      const { identifier, password } = userdata;
  
      // Get device information using UAParser
      const parser = new UAParser();
      const result = parser.getResult();  // Extract details from userAgent string
  
      // Extract device details
      const deviceInfo = result.device; // This contains device type, model, etc.
      const osInfo = result.os;         // This contains OS information like name and version
      const browserInfo = result.browser; // This contains browser name and version
      const userAgent = navigator.userAgent; // Raw user agent string
  
      // You can use these details as per your requirement
      const deviceType = deviceInfo.type || "Unknown Device"; // If no specific device type, default to Unknown
      const deviceModel = deviceInfo.model || "Unknown Model"; // If model is not available, default to Unknown
      const osName = osInfo.name || "Unknown OS"; // If OS name is not available, default to Unknown
      const osVersion = osInfo.version || "Unknown Version"; // If OS version is not available, default to Unknown
      const browserName = browserInfo.name || "Unknown Browser"; // If browser name is not available, default to Unknown
      const browserVersion = browserInfo.version || "Unknown Version"; // If browser version is not available, default to Unknown
  
      // Send login data along with device info to the backend
      const response = await doCredentialLogin({
        identifier,
        password,
        role: "student",
        deviceInfo: {
          osInfo,
          userAgent,
          deviceType,
          deviceModel,
          osName,
          osVersion,
          browserName,
          browserVersion,
        },
        callbackUrl,
      });
  
      if (response.error) {
        setSuccessMessage("");
        setErrors([
          {
            message:
              "*Login failed. Please enter valid email, mobile number, or registration number.",
          },
        ]);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Login failed. Please enter valid email, mobile number, or registration number.",
        });
      } else {
        setErrors([]);
        setSuccessMessage("You have successfully logged in.");
  
        // Reset form fields
        setUserData({
          identifier: "",
          password: "",
        });
  
        Swal.fire({
          title: "Logged in successfully!",
          text: "You have successfully logged in.",
          icon: "success",
        });
  
        // Check if the user has completed the form
        const userResponse = await fetch(
          `${WEB_BACKEND_URL}/api/route/checkStudent`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${response.token}`,
            },
            body: JSON.stringify({ identifier }), // Send the identifier
          }
        );
  
        const userData = await userResponse.json();
  
          // Trigger Student Login event
          trackEvent(
            EVENT_NAMES.STUDENT_LOGIN,
            {
                identifier: identifier,
                source: "website",
                role: "student"
            },
            userData.student ? userData.student.id : userData.id
          );
        if (userData.formCompleted) {
          router.push(callbackUrl);
        } else {
          router.push("/StudentForm");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors([
        {
          message:
            "Login failed. Please enter valid email, mobile number, or registration number.",
        },
      ]);
    } finally {
      setIsLoging(false);
    }
  };
 

  return (
    <div>
     <form action={Socialloginstudent}>
        <button
          type="submit"
          name="action"
          value="google"
          className="w-full py-2 px-4 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-md flex items-center justify-center hover:bg-gray-200 transition"
        >
          <FcGoogle className="mr-2 text-2xl" />
          Continue with Google
        </button>
      </form>

      <div className="my-4 flex items-center">
        <hr className="flex-1 border-gray-300" />
        <span className="mx-4 text-gray-500">or</span>
        <hr className="flex-1 border-gray-300" />
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative mb-6">
          <input
            type="text"
            name="identifier"
            id="identifier" // Added id for label association
            className="peer w-full bg-transparent px-4 py-2 border outline-none rounded-lg text-base focus:border-blue-500 focus:ring-0 transition-all duration-150"
            value={userdata.identifier}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="identifier"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-Poppins font-semibold transition-all duration-150 ${
              userdata.identifier ||
              (isClient && document.activeElement === document.getElementById("identifier"))
                ? "top-[-10px] left-2 text-sm text-orange-500"
                : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-orange-500`}
          >
            Username (Email, Mobile, or Registration){" "}
            <span className="text-red-500">*</span>
          </label>
        </div>

        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            className="peer w-full bg-transparent outline-none px-4 py-2 border rounded-lg text-base focus:border-blue-500 focus:ring-0 transition-all duration-150"
            value={userdata.password}
            onChange={handleChange}
            required
          />
          <label
            htmlFor="password"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-Poppins font-semibold transition-all duration-150 ${
              userdata.password
                ? "top-[-10px] left-2 text-sm text-orange-500"
                : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-orange-500`}
          >
            Password <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3"
          >
            {showPassword ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoging}
          className={`w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition ${
            isLoging ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoging ? "Logging in..." : "Login"}
        </button>

        {errors.length > 0 && (
          <div className="mt-4 text-red-500 text-sm">
            {errors.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
        )}
        <div className="text-center mt-4">
          <Link
            href="/Forgot-password-students"
            className="text-orange-500 hover:text-orange-600 hover:underline font-medium transition-colors"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

