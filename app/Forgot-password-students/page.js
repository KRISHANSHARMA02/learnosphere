"use client"
import { useState } from 'react';
import Swal from 'sweetalert2';
import { IoMdArrowRoundBack } from "react-icons/io";
import { trackEvent } from "@/src/lib/eventTracker";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://learnospherebackend.learnosphere.in/api/route/forgot-password-students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setSuccess("");
      } else {
        trackEvent("STUDENT_FORGOT_PASSWORD_SUBMITTED", {
          email,
          role: "student",
        });
        setSuccess("Password reset email sent successfully.");
        setError("");
      }

      Swal.fire({
        title: data.error ? 'Error' : 'Success',
        text: data.error || 'Check your email for the reset link.',
        icon: data.error ? 'error' : 'success',
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
      setSuccess("");
    }
  };

  return (
    <>
    <div className="max-w-md mt-4 mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
      <p className="text-sm text-gray-600 mb-4"> Enter your email address and we will send you a link to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-6 mt-6">
          <input
            type="email"
            id="email"
            name="email"
            className="peer w-full bg-transparent px-4 py-2 border outline-none rounded-lg text-base focus:border-blue-500 focus:ring-0 transition-all duration-150"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
          />
          <label
            htmlFor="email"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-Poppins font-semibold transition-all duration-150 ${
              email ? "top-[-10px] left-2 text-sm text-blue-500" : ""
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-500`}
          >
            Email Address<span className="text-red-500">*</span>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Send Reset Link
        </button>

        {error && (
          <div className="mt-4 text-red-500 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 text-green-500 text-sm">
            {success}
          </div>
        )}
      </form>
      
    </div>
    <div className='flex justify-center mt-5'>
        <button className='flex gap-3 bg-orange-400 text-white font-semibold rounded-lg shadow-md p-3 hover:bg-orange-500 transition' onClick={() => window.location.href = '/Student'}
         
        ><IoMdArrowRoundBack size={25}/>Back to login </button>
      </div>
    </>
  );
};

export default ForgotPassword;
