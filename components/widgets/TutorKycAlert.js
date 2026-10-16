"use client";
import React from "react";
import Image from "next/image";
import { HiExclamationTriangle } from "react-icons/hi2";
import { RiShieldCheckFill } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import { FaApple, FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import playstore from "@/public/playstore.svg";
import tutorAppMockup from "@/public/tutor_kyc-app.jpg";
import tutorQr from "@/public/tutor_app_qr.png";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app";
const APP_STORE_URL =
  "https://apps.apple.com/in/app/learnosphere/id6744967495";

export default function KycRequiredPopup({ onLogout }) {
  const SUPPORT_WHATSAPP_NUMBER = "918769600449";

  const whatsappMessage = encodeURIComponent(
    "Hi Learnosphere Support 👋\n\nI need assistance regarding my KYC verification / dashboard access.\n\nThank you."
  );

  const whatsappLink = `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const handleSignOut = () => {
    if (onLogout) {
      onLogout();
    } else {
      signOut({ callbackUrl: "/Signin" });
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {/* Modal Container */}
      <div className="bg-white w-full max-w-2xl mx-auto rounded-3xl shadow-2xl overflow-hidden my-auto border border-orange-200 animate-in fade-in zoom-in-95 duration-200">
        {/* 🔴 ALERT HEADER */}
        <div className="flex items-center justify-between bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 text-white px-5 sm:px-6 py-4">
          <div className="flex items-center gap-2.5">
            <HiExclamationTriangle className="shrink-0 text-white" size={24} />
            <h2 className="text-base sm:text-lg font-bold leading-tight">
              Action Required: Complete Your Educator KYC
            </h2>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full text-white">
            Access Restricted
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-7 space-y-5 max-h-[85vh] overflow-y-auto">
          {/* MAIN MESSAGE */}
          <div className="space-y-1.5">
            <h3 className="text-slate-900 font-bold text-base sm:text-lg">
              Your Educator Dashboard is Locked
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              To unlock full teaching features, receive student booking inquiries, and withdraw earnings, government-compliant KYC verification is mandatory.
            </p>
          </div>

          {/* 🔐 ACCESS STATUS CALLOUT */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 sm:p-4 flex items-start gap-3 text-amber-900">
            <HiLockClosed className="mt-0.5 text-amber-600 shrink-0" size={20} />
            <div className="text-xs sm:text-sm">
              <span className="font-bold block text-amber-900">
                Web dashboard & student classes are locked
              </span>
              <span className="text-amber-800 text-xs">
                Verification takes only 2 minutes using the <b>Learnosphere Tutor App</b>.
              </span>
            </div>
          </div>

          {/* 🛡️ TRUST & SECURITY PILLS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
              <RiShieldCheckFill className="text-green-600 shrink-0" size={18} />
              <span className="text-xs font-semibold text-slate-700">
                100% Secure & Encrypted
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
              <MdVerifiedUser className="text-orange-600 shrink-0" size={18} />
              <span className="text-xs font-semibold text-slate-700">
                Govt-ID Compliance
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
              <HiLockClosed className="text-purple-600 shrink-0" size={18} />
              <span className="text-xs font-semibold text-slate-700">
                Instant Verification
              </span>
            </div>
          </div>

          {/* 📱 APP DOWNLOAD & QR SECTION */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-5">
            {/* QR Code */}
            <div className="flex flex-col items-center shrink-0">
              <div className="p-2 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <Image
                  src={tutorQr}
                  alt="Scan QR to download app"
                  width={100}
                  height={100}
                  className="rounded-lg"
                />
              </div>
              <span className="text-[10px] text-slate-500 font-semibold mt-1">
                Scan to Install
              </span>
            </div>

            {/* App Actions */}
            <div className="flex-1 w-full space-y-3 text-center sm:text-left">
              <div>
                <h4 className="font-bold text-sm text-slate-900">
                  Step 1: Open the Learnosphere Tutor App
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Complete your identity verification & face scan on your mobile device to automatically unlock this dashboard.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full">
                {/* Google Play */}
                <a
                  href={PLAY_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-black hover:bg-slate-800 text-white py-2.5 px-3 rounded-xl transition-all shadow-sm"
                >
                  <Image src={playstore} alt="Google Play" width={16} height={16} />
                  <div className="text-left leading-none">
                    <span className="text-[8px] text-slate-400 block uppercase">Get it on</span>
                    <span className="text-[11px] font-bold block">Google Play</span>
                  </div>
                </a>

                {/* App Store */}
                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-black hover:bg-slate-800 text-white py-2.5 px-3 rounded-xl transition-all shadow-sm"
                >
                  <FaApple size={18} />
                  <div className="text-left leading-none">
                    <span className="text-[8px] text-slate-400 block uppercase">Download on</span>
                    <span className="text-[11px] font-bold block">App Store</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* 💬 WHATSAPP SUPPORT */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="shrink-0 text-green-600"
              >
                <path d="M20.52 3.48A11.91 11.91 0 0012 0C5.37 0 .02 5.34.02 11.93c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.65a11.9 11.9 0 005.7 1.45h.01c6.63 0 11.98-5.34 11.98-11.93 0-3.18-1.24-6.17-3.47-8.39zM12 21.4a9.4 9.4 0 01-4.8-1.32l-.35-.2-3.74.98 1-3.64-.23-.37a9.36 9.36 0 01-1.45-5.02C2.43 6.5 6.74 2.2 12 2.2c2.51 0 4.87.98 6.64 2.75A9.3 9.3 0 0121.4 11.9c0 5.28-4.3 9.5-9.4 9.5zm5.17-6.87c-.28-.14-1.65-.81-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.74.9-.91 1.08-.17.19-.33.21-.61.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.46-.47-.64-.48h-.54c-.19 0-.49.07-.74.35-.26.28-.98.96-.98 2.35 0 1.38 1 2.72 1.14 2.91.14.19 1.97 3 4.78 4.2.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33z" />
              </svg>
              <span>Need Help? Contact WhatsApp Support</span>
            </a>

            <button
              onClick={handleSignOut}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-xs text-slate-500 hover:text-red-600 font-semibold px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <FaSignOutAlt size={13} /> Log out / Switch Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
