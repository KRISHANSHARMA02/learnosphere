"use client"
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";

import React, { useState , useEffect } from 'react';
import Swal from 'sweetalert2';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { trackEvent } from "@/src/lib/eventTracker";




const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [token, setToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      setToken(urlParams.get('token'));
    }
  }, []);


  
const handleSubmit = async (e) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    setError('Passwords do not match.');
    setSuccess('');
    return;
  }

  if (!token) {
    setError('Reset token is missing.');
    return;
  }

  try {
    const response = await fetch(`${WEB_BACKEND_URL}/api/route/reset-password-teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      trackEvent("TEACHER_PASSWORD_RESET_SUCCESS", {
        role: "teacher",
      });
      Swal.fire({
        title: 'Success!',
        text: 'Your password has been reset.',
        icon: 'success',
      });
      setSuccess('Your password has been reset.');
      setError('');
      router.push('/Signin');
    } else {
      // Assume `data.errors` is an array of error objects
      if (Array.isArray(data.errors)) {
        const errorMessages = data.errors.map(err => err.msg).join(', ');
        setError(errorMessages);
      } else {
        setError('An error occurred.');
      }
      setSuccess('');
    }
  } catch (error) {
    console.error('Error:', error);
    setError('Failed to reset password.');
    setSuccess('');
  }
};




  return (
    <div className="max-w-md mt-4 mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="relative mb-6 mt-6">
          <input
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            name="newPassword"
            className="peer w-full bg-transparent px-4 py-2 border outline-none rounded-lg text-base focus:border-blue-500 focus:ring-0 transition-all duration-150"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
           
          />
          <label
            htmlFor="newPassword"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-Poppins font-semibold transition-all duration-150 ${
              newPassword ? 'top-[-10px] left-2 text-sm text-blue-500' : ''
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-500`}
          >
            New Password<span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </button>
        </div>

        <div className="relative mb-6 mt-6">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            className="peer w-full bg-transparent px-4 py-2 border outline-none rounded-lg text-base focus:border-blue-500 focus:ring-0 transition-all duration-150"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
           
          />
          <label
            htmlFor="confirmPassword"
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 px-2 bg-white text-gray-700 text-sm font-Poppins font-semibold transition-all duration-150 ${
              confirmPassword ? 'top-[-10px] left-2 text-sm text-blue-500' : ''
            } peer-focus:-top-2 peer-focus:left-2 peer-focus:text-sm peer-focus:text-blue-500`}
          >
            Confirm Password<span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          Reset Password
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
  );
};

export default ResetPassword;
