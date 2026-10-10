"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function LoginPopup() {
  const { data: session, status } = useSession();
  const [show, setShow] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkPopup = () => {
      // Wait until session state is known
      if (status === "loading") return;
      const token = localStorage.getItem("authToken");

      // 1️⃣ If user is authenticated → NEVER show popup
      if (status === "authenticated") {
        setShow(false);
        return;
      }

      const lastShown = localStorage.getItem("loginPopupLastShown");
      const now = Date.now();
      const delay = 5 * 60 * 1000; // 5 minutes

      // 2️⃣ Check if popup can be shown again
      if (!lastShown || now - parseInt(lastShown) >= delay) {
        setShow(true);
        localStorage.setItem("loginPopupLastShown", now.toString());
      }
    };

    // Run immediately when component loads
    checkPopup();

    // 3️⃣ Check every 30 seconds automatically (NO REFRESH NEEDED)
    const interval = setInterval(checkPopup, 30 * 1000);

    return () => clearInterval(interval);
  }, [status]);
  // ⛔ Do not render anything until session is resolved
  if (status === "loading" || !show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-white w-[90%] max-w-lg rounded-2xl p-8 relative shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-4 right-5 text-2xl text-gray-500"
          onClick={() => setShow(false)}
        >
          ✕
        </button>

        {/* Logo */}
        <h1 className="text-4xl font-bold text-center text-black my-10  ">
          Learn<b className="text-orange-600 font-Poppins text-4xl">O</b>sphere
        </h1>

        {/* Headline */}
        <h2 className="text-xl font-bold text-center my-4 text-gray-900">
          Free Access After Login
        </h2>
        <h2 className="text-xl font-bold text-center text-orange-600 mb-6">
          Get PDFs, Study Materials and Many More
        </h2>

        {/* Email Login */}
        <button
          onClick={() => router.push("/Student")}
          className="w-full flex items-center justify-center border border-gray-300 rounded-xl py-3 my-10 hover:bg-gray-100"
        >
          <span className="ml-2 font-medium">Continue with Email</span>
        </button>

        {/* Safety Note */}
        <p className="text-xs text-center text-gray-500 mt-4">
          🔒 100% SAFE & SECURE — We never post without your permission
        </p>
      </div>
    </div>
  );
}
