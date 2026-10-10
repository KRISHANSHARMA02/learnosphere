"use client";
import Image from "next/image";
import { HiExclamationTriangle } from "react-icons/hi2";
import { RiShieldCheckFill } from "react-icons/ri";
import { MdVerifiedUser } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";

export default function KycRequiredPopup() {
  const SUPPORT_WHATSAPP_NUMBER = "918769600449"; // 🔁 replace with real number

  const whatsappMessage = encodeURIComponent(
    "Hi Learnosphere Support 👋\n\nI need assistance regarding my KYC verification / dashboard access.\n\nThank you."
  );

  const whatsappLink = `https://wa.me/${SUPPORT_WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center px-3 sm:px-4">
      {/* Scroll wrapper for small screens */}
      <div className="w-full max-h-[95vh] overflow-y-auto">
        <div className="bg-white w-full max-w-3xl mx-auto rounded-2xl shadow-2xl overflow-hidden">
          {/* 🔴 ALERT HEADER */}
          <div className="flex items-center gap-3 bg-orange-500 text-white px-4 sm:px-6 py-3 sm:py-4">
            <HiExclamationTriangle className="shrink-0" size={24} />
            <h2 className="text-base sm:text-lg md:text-xl font-bold leading-tight">
              Important Notice – KYC Required
            </h2>
          </div>

          {/* CONTENT */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* MAIN MESSAGE */}
            <div className="mb-5 sm:mb-6">
              <p className="text-gray-800 font-semibold text-base sm:text-lg mb-2">
                Your account access is currently restricted
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                To unlock full access to the <b>Learnosphere Tutor App</b> and
                <b> Web Dashboard</b>, completing your KYC verification is
                mandatory. This is required for platform security, compliance,
                and student safety.
              </p>
            </div>

            {/* 🔐 ACCESS STATUS */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4 mb-5 sm:mb-6">
              <div className="flex items-start gap-2 text-red-700 text-sm sm:text-base font-medium">
                <HiLockClosed className="mt-0.5 shrink-0" />
                <span>
                  Dashboard & teaching features are locked until KYC is approved
                </span>
              </div>
            </div>

            {/* 🛡️ TRUST & SECURITY */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <RiShieldCheckFill
                  className="text-green-600 shrink-0"
                  size={20}
                />
                <span className="text-sm font-medium text-gray-700">
                  Secure Verification
                </span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <MdVerifiedUser className="text-blue-600 shrink-0" size={20} />
                <span className="text-sm font-medium text-gray-700">
                  Govt-ID Compliance
                </span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <HiLockClosed className="text-purple-600 shrink-0" size={20} />
                <span className="text-sm font-medium text-gray-700">
                  Data Privacy Protected
                </span>
              </div>
            </div>

            {/* 📱 APP + QR SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-5 sm:mb-6">
              {/* APP IMAGE (hidden on very small heights) */}
              <div className="hidden sm:flex justify-center">
                <Image
                  src="/tutor_kyc-app.jpg"
                  alt="Learnosphere Teacher App KYC"
                  width={200}
                  height={420}
                  className="rounded-xl shadow-lg max-h-[420px] object-contain"
                />
              </div>

              {/* ACTION */}
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-xl p-3 bg-orange-600">
                  <Image
                    src="/tutor_app_qr.png"
                    alt="Download Learnosphere App"
                    width={110}
                    height={110}
                  />
                </div>

                <a
                  href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-6 py-3 rounded-xl font-semibold transition"
                >
                  Download Learnosphere Teacher App
                </a>

                <p className="text-xs text-gray-500 text-center max-w-xs">
                  Complete KYC using the mobile app to unlock full access
                </p>
              </div>
            </div>

            {/* 💬 WHATSAPP SUPPORT */}
            <div className="mt-5 sm:mt-6 mb-5 flex justify-center">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="
      flex items-center gap-3
      bg-green-500 hover:bg-green-600
      text-white
      px-5 py-3
      rounded-xl
      font-semibold
      text-sm sm:text-base
      transition
      shadow-md
    "
              >
                {/* WhatsApp Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="shrink-0"
                >
                  <path d="M20.52 3.48A11.91 11.91 0 0012 0C5.37 0 .02 5.34.02 11.93c0 2.1.55 4.15 1.6 5.97L0 24l6.3-1.65a11.9 11.9 0 005.7 1.45h.01c6.63 0 11.98-5.34 11.98-11.93 0-3.18-1.24-6.17-3.47-8.39zM12 21.4a9.4 9.4 0 01-4.8-1.32l-.35-.2-3.74.98 1-3.64-.23-.37a9.36 9.36 0 01-1.45-5.02C2.43 6.5 6.74 2.2 12 2.2c2.51 0 4.87.98 6.64 2.75A9.3 9.3 0 0121.4 11.9c0 5.28-4.3 9.5-9.4 9.5zm5.17-6.87c-.28-.14-1.65-.81-1.9-.9-.26-.1-.45-.14-.64.14-.19.28-.74.9-.91 1.08-.17.19-.33.21-.61.07-.28-.14-1.18-.43-2.25-1.37-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.33.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.64-1.54-.88-2.11-.23-.55-.46-.47-.64-.48h-.54c-.19 0-.49.07-.74.35-.26.28-.98.96-.98 2.35 0 1.38 1 2.72 1.14 2.91.14.19 1.97 3 4.78 4.2.67.29 1.19.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.26-.19-.54-.33z" />
                </svg>

                <span>Chat with Learnosphere Support</span>
              </a>
            </div>

            {/* FOOTER NOTE */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-3 sm:p-4 text-xs sm:text-sm text-orange-700">
              ℹ️ Once your KYC is verified and approved, full access to your
              tutor dashboard and teaching features will be enabled
              automatically.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
