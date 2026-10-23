"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';
import { useSession, signOut } from "next-auth/react";

export default function DeleteUserPage() {
  const router = useRouter();
  const { data: session } = useSession(); 
  
  const [step, setStep] = useState(1);
  const [isDeleteChecked, setIsDeleteChecked] = useState(false);
  
  const [selectedReasons, setSelectedReasons] = useState([]); 
  const [otherReasonText, setOtherReasonText] = useState(""); 
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); 

  const reasons = [
    "Found a better platform",
    "Privacy concerns",
    "Too many notifications",
    "Unsatisfactory experience",
    "Temporary break",
    "Other"
  ];

  const handleReasonToggle = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter((r) => r !== reason));
      if (reason === "Other") setOtherReasonText(""); 
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  // 🚀 BULLETPROOF DELETE & LOGOUT LOGIC
  const handleFinalDelete = async () => {
    if (!session?.user?.email) {
      alert("User email not found. Please log in again.");
      return;
    }

    setIsDeleting(true);
    
    const finalReasonsArray = selectedReasons.map(r => 
      r === "Other" ? `Other: ${otherReasonText}` : r
    );
    
    try {
      const payload = {
        userId: session.user.email, 
        reasons: finalReasonsArray 
      };

      // 1. Delete API Call
      const response = await axios.post( `${WEB_BACKEND_URL}/api/route/deleteStudentAccount`, payload);
     

      if (response.data.success || response.status === 200) {
        // 2. Show the backend success message
        alert(response.data.message || "Account marked as deleted. Can be reactivated within 30 days.");
        setShowConfirmModal(false);

        // 3. Try to record logout activity (Fire and Forget)
        try {
          await axios.post(`${WEB_BACKEND_URL}/api/route/record-logout-activity-student`, {
            studentEmail: session.user.email 
          });
        } catch (activityError) {
          console.log("Activity record failed, but continuing to logout.");
        }

        // 4. 🚀 GUARANTEED LOGOUT & REDIRECT
        await signOut({ callbackUrl: '/Student' }); 
        
      } else {
        alert(response.data.message || "Failed to delete account.");
        setShowConfirmModal(false);
        setIsDeleting(false);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(error.response?.data?.message || "Internal server error while deleting account");
      setShowConfirmModal(false);
      setIsDeleting(false);
    } 
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1); 
    } else {
      router.back(); 
    }
  };

  const isStep2Valid = selectedReasons.length > 0 && 
    (!selectedReasons.includes("Other") || otherReasonText.trim().length > 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-Poppins">
      
      {/* Container */}
      <div className="max-w-5xl mx-auto bg-white rounded-[24px] shadow-sm border border-gray-200 overflow-hidden flex flex-col min-h-[70vh]">
        
        {/* Header */}
        <div className="bg-[#FF5A22] text-white px-5 py-4 flex items-center gap-3 shadow-sm shrink-0">
          <button 
            onClick={handleBack} 
            className="p-2 -ml-2 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
          >
            <FaChevronLeft size={16} />
          </button>
          <h2 className="text-lg md:text-xl font-bold tracking-wide">Delete Account</h2>
        </div>

        {/* Dynamic Body Content */}
        <div className="p-6 md:p-10 overflow-y-auto flex-1 bg-white">
          
          {/* ================= STEP 1: INSTRUCTIONS ================= */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300 max-w-3xl">
              <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-3 leading-tight">
                Before You Delete Your Account
              </h3>
              <p className="text-gray-500 text-sm md:text-base mb-6">
                Please carefully review the following important information:
              </p>

              <ul className="space-y-4 text-gray-700 text-sm md:text-[15px] mb-8 list-disc pl-6 marker:text-gray-400">
                <li className="pl-1 leading-relaxed">
                  Once deleted, you will no longer be able to log in with this account or access any saved data.
                </li>
                <li className="pl-1 leading-relaxed">
                  Re-registration with the same email or phone number will not be allowed.
                </li>
                <li className="pl-1 leading-relaxed">
                  Your data will be retained for 30 days before it is permanently deleted from our system.
                </li>
                <li className="pl-1 leading-relaxed">
                  You may reactivate your account within 30 days by simply logging back in.
                </li>
              </ul>

              {/* Highlighted Checkbox Section */}
              <label className="flex items-start gap-3 cursor-pointer mb-6 group bg-gray-50 p-4 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors w-fit pr-6">
                <div className="relative flex items-center pt-0.5 shrink-0">
                  <input 
                    type="checkbox" 
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded-[5px] focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 checked:bg-[#FF5A22] checked:border-[#FF5A22] transition-colors cursor-pointer"
                    checked={isDeleteChecked}
                    onChange={(e) => setIsDeleteChecked(e.target.checked)}
                  />
                  <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-gray-700 text-sm font-semibold select-none group-hover:text-gray-900 transition-colors mt-[1px]">
                  I have read and understood all the instructions.
                </span>
              </label>
            </div>
          )}

          {/* ================= STEP 2: REASONS ================= */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl">
              <h3 className="text-xl md:text-2xl font-extrabold text-[#FF5A22] mb-6 leading-tight">
                Why are you deleting your account?
              </h3>
              
              <div className="space-y-3">
                {reasons.map((reason) => {
                  const isChecked = selectedReasons.includes(reason);

                  return (
                    <div key={reason} className="flex flex-col gap-2">
                      <label 
                        className={`flex items-center justify-between cursor-pointer group p-3.5 rounded-xl border-2 transition-all ${
                          isChecked 
                            ? 'border-[#FF5A22] bg-orange-50/50' 
                            : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <span className={`text-[15px] font-medium transition-colors ${isChecked ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                          {reason}
                        </span>
                        
                        <div className="relative flex items-center shrink-0">
                          <input 
                            type="checkbox" 
                            className="peer appearance-none w-5 h-5 border-2 border-gray-400 rounded-[4px] focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 checked:bg-[#FF5A22] checked:border-[#FF5A22] transition-colors cursor-pointer"
                            checked={isChecked}
                            onChange={() => handleReasonToggle(reason)}
                          />
                          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </label>

                      {/* Animated Text Area for "Other" */}
                      {reason === "Other" && isChecked && (
                        <div className="animate-in fade-in slide-in-from-top-2 duration-300 w-full mt-1">
                          <textarea 
                            placeholder="Please tell us more..."
                            className="w-full bg-white border-2 border-orange-200 rounded-xl p-3 text-gray-700 text-sm focus:outline-none focus:border-[#FF5A22] focus:ring-2 focus:ring-orange-100 transition-all resize-none shadow-sm"
                            rows="3"
                            value={otherReasonText}
                            onChange={(e) => setOtherReasonText(e.target.value)}
                            autoFocus
                          ></textarea>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="p-5 md:px-10 md:py-5 bg-gray-50 border-t border-gray-200 flex gap-3 shrink-0 justify-end">
          <button 
            onClick={handleBack}
            className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold text-sm hover:bg-white active:scale-95 transition-all w-full md:w-auto"
          >
            Back
          </button>

          {step === 1 ? (
            <button 
              disabled={!isDeleteChecked}
              onClick={() => setStep(2)}
              className="px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 disabled:opacity-60 w-full md:w-auto"
              style={isDeleteChecked 
                ? { backgroundColor: '#FF5A22', color: 'white', boxShadow: '0 4px 14px rgba(255, 90, 34, 0.3)' } 
                : { backgroundColor: '#E5E7EB', color: '#9CA3AF', cursor: 'not-allowed' }
              }
            >
              Continue
            </button>
          ) : (
            <button 
              disabled={!isStep2Valid} 
              onClick={() => setShowConfirmModal(true)} 
              className="px-8 py-3 rounded-xl font-bold text-sm transition-all duration-300 active:scale-95 disabled:opacity-60 w-full md:w-auto"
              style={isStep2Valid 
                ? { backgroundColor: '#FF5A22', color: 'white', boxShadow: '0 4px 14px rgba(255, 90, 34, 0.3)' } 
                : { backgroundColor: '#E5E7EB', color: '#9CA3AF', cursor: 'not-allowed' }
              }
            >
              Continue
            </button>
          )}
        </div>

        {/* ================= CONFIRMATION POPUP MODAL ================= */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-5 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-[320px] rounded-[24px] p-6 shadow-2xl animate-in zoom-in-95 duration-200">
              
              <div className="flex items-center gap-2.5 mb-3 text-[#ef4444]">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                <h3 className="text-lg font-bold tracking-tight">Confirm Deletion</h3>
              </div>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>

              <div className="flex flex-col items-end gap-2.5 w-full">
                <button 
                  onClick={() => !isDeleting && setShowConfirmModal(false)}
                  disabled={isDeleting}
                  className="flex items-center justify-center gap-1 text-gray-700 font-bold py-2.5 px-4 hover:bg-gray-100 rounded-xl transition-colors w-full border-2 border-transparent text-sm disabled:opacity-50"
                >
                  Cancel
                </button>
                
                <button 
                  onClick={handleFinalDelete}
                  disabled={isDeleting}
                  className="flex items-center justify-center gap-2 bg-[#ef4444] text-white font-bold py-3 px-5 rounded-[12px] w-full shadow-md hover:bg-red-600 active:scale-95 transition-all text-sm disabled:bg-red-300 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                      Yes, Delete
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}