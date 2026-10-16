"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaApple, FaShieldAlt, FaHeadset } from "react-icons/fa";
import playstore from "@/public/playstore.svg";

const DashboardFooter = ({ setShowAgreement }) => {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 py-8 px-6 mt-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand & Mission */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
          <Link href="/" className="text-xl font-bold text-white tracking-tight">
            Learn<span className="text-orange-500 font-extrabold">O</span>sphere{" "}
            <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-semibold ml-1 uppercase">
              Tutor Studio
            </span>
          </Link>
          <p className="text-xs text-slate-400 max-w-sm">
            Empowering passionate educators to teach live, share knowledge, and earn anywhere in India.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium">
          <button
            onClick={() => setShowAgreement && setShowAgreement(true)}
            className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
          >
            <FaShieldAlt className="text-orange-500" /> Terms of Use
          </button>
          <a
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-400 transition-colors"
          >
            Privacy Policy
          </a>
          <Link
            href="/contact"
            className="hover:text-orange-400 transition-colors flex items-center gap-1.5"
          >
            <FaHeadset className="text-orange-500" /> Tutor Support
          </Link>
        </div>

        {/* App CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl border border-slate-700 transition-all text-left"
          >
            <Image src={playstore} alt="Google Play" width={14} height={14} />
            <div className="leading-tight">
              <span className="text-[8px] text-slate-400 block uppercase">Get it on</span>
              <span className="text-[11px] font-bold block">Google Play</span>
            </div>
          </a>
          <a
            href="https://apps.apple.com/in/app/learnosphere/id6744967495"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl border border-slate-700 transition-all text-left"
          >
            <FaApple size={16} />
            <div className="leading-tight">
              <span className="text-[8px] text-slate-400 block uppercase">Download on</span>
              <span className="text-[11px] font-bold block">App Store</span>
            </div>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-500 gap-2">
        <p>&copy; {new Date().getFullYear()} Learnosphere Education Pvt. Ltd. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Made with <span className="text-red-500">❤️</span> for Educators across India
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;
