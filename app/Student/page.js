"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Footer1 from "@/components/Footer1";
import Studentloginextra from "@/components/Studentloginextra";
import Uparrow2 from "@/components/Uparrow";
import StudentLogin from "@/components/StudentLogin";
import StudentSignup from "@/components/StudentSignup";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Student = () => {
  const [isSignup, setIsSignup] = useState(false);

  const features = [
    "Sign up with your email or Google account as student.",
    "Complete your student profile with preferences and interests.",
    "Explore and connect with tutors who match your learning goals.",
    "Access your personalized dashboard to track progress and manage sessions.",
  ];

  return (
    <>
      <Navbar />

      {/* Modern Hero Section with enhanced visuals */}
      <div className="relative min-h-[600px] mt-16 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-amber-50 to-red-50" />

        {/* Decorative blurred elements */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-20 left-0 w-96 h-96 bg-red-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        <div className="relative z-10 flex flex-col lg:flex-row w-full h-full justify-center items-center px-4 py-12">
          {/* Left side - Modern description section */}
          <div className="hidden lg:flex lg:w-1/2 h-full flex-col justify-center pr-8">
            <div className="max-w-xl">
              {/* 🔽 Reduced Font Size for Main Heading (was 6xl/7xl) */}
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-red-600">
                  Join Learn
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                  O
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-red-600">
                  sphere
                </span>
              </h2>

              {/* 🔽 Reduced Font Size for Subheading (was xl) */}
              <p className="text-base lg:text-lg text-gray-700 mb-8 leading-relaxed font-light max-w-lg">
                Discover and connect with top tutors to enhance your learning
                experience. Start your journey today.
              </p>

              {/* Features list with enhanced styling */}
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 group cursor-pointer transition-all duration-300"
                  >
                    <div className="flex-shrink-0 mt-0.5 p-1.5 rounded-lg bg-gradient-to-br from-orange-100 to-amber-100 group-hover:from-orange-200 group-hover:to-amber-200 transition-all duration-300">
                      <AiOutlineCheckCircle
                        size={18}
                        className="text-orange-600"
                      />
                    </div>
                    {/* 🔽 Reduced Font Size for List items */}
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                      {feature}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - Modern form card */}
          <div className="w-full lg:w-1/2 max-w-md">
            <div className="relative">
              {/* Card background with glass effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl" />

              {/* Form content */}
              <div className="relative p-6 md:p-8">
                {/* Header with animated underline */}
                <div className="mb-6">
                  {/* 🔽 Reduced Font Size for Form Heading (was 3xl/4xl) */}
                  <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 mb-2">
                    {isSignup ? "Create Account" : "Welcome Back"}
                  </h1>
                  {/* 🔽 Reduced Font Size for Form Subtext */}
                  <p className="text-gray-500 text-xs md:text-sm font-medium">
                    {isSignup
                      ? "Join thousands of students learning with us"
                      : "Login to continue your learning journey"}
                  </p>
                  <div className="h-1 w-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-3" />
                </div>

                {/* Form rendering */}
                <div className="mb-6">
                  {isSignup ? <StudentSignup /> : <StudentLogin />}
                </div>

                {/* Toggle button - simple text link */}
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsSignup(!isSignup)}
                    className="text-sm text-orange-600 hover:underline font-medium transition-colors duration-200"
                  >
                    {isSignup
                      ? "Already have an account? Login"
                      : "New User? Sign Up"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <Studentloginextra />
      <Uparrow2 />
      <Footer1 />
      <Footer />
    </>
  );
};

export default Student;
