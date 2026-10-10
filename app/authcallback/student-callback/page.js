"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function StudentCallback() {
  const router = useRouter();

  useEffect(() => {
    const processLogin = async () => {
      try {
        const session = await getSession();

        if (!session?.user?.email) {
          router.push("/StudentSignin");
          return;
        }

         const params = new URLSearchParams(
          window.location.search
        );

        const callbackUrl =
          params.get("callbackUrl") ||
          "/Userdashboard";

        const res = await fetch(
          "https://learnospherebackend.learnosphere.in/api/route/checkStudent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              identifier: session.user.email,
            }),
          },
        );

        const data = await res.json();

        if (data.formCompleted) {
          router.push(callbackUrl);
        } else {
          router.push("/StudentForm");
        }
      } catch (error) {
        console.error(error);
        router.push("/Student");
      }
    };

    processLogin();
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4">
      {/* Background Blur Effects */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-300 rounded-full blur-3xl opacity-20"></div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-8">
         
    
          {/* Heading */}
          <h1 className="text-2xl font-bold text-center text-gray-800">
            Welcome to Learnosphere
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Verifying your account...
          </p>

          {/* Animated Loader */}
          <div className="flex justify-center mt-8">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-orange-200 rounded-full"></div>

              <div className="absolute top-0 left-0 w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-green-500"></div>
              <span className="text-sm text-gray-700">
                Authentication completed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-orange-500 animate-pulse"></div>
              <span className="text-sm text-gray-700">
                Verifying profile information
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-gray-300"></div>
              <span className="text-sm text-gray-400">
                Redirecting to page...
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              Please wait while we securely sign you in.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
