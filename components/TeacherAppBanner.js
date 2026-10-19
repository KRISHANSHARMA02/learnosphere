"use client";
import React from "react";
import Image from "next/image";
import { FaApple, FaStar, FaShieldAlt, FaBolt, FaGraduationCap } from "react-icons/fa";
import { MdCurrencyRupee, MdOutlineNotificationsActive } from "react-icons/md";
import playstore from "@/public/playstore.svg";
import tutorAppMockup from "@/public/tutor_kyc-app.jpg";
import tutorRewardsMockup from "@/public/tutor_rewards_app.jpg";
import tutorQr from "@/public/tutor_app_qr.png";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app";
const APP_STORE_URL =
  "https://apps.apple.com/in/app/learnosphere/id6744967495";

export default function TeacherAppBanner({
  title,
  subtitle,
  badge,
  variant = "full", // "full" | "compact" | "card"
  isVerified = true, // Defaults to true for active dashboard educators
}) {
  const isTeacherVerified = isVerified === true || isVerified === 1;

  // Dynamic titles and subtitles based on verified status
  const displayTitle =
    title ||
    (isTeacherVerified
      ? "Supercharge Your Teaching & Maximize Earnings on the Tutor App!"
      : "Complete Your Educator KYC & Start Earning Today!");

  const displaySubtitle =
    subtitle ||
    (isTeacherVerified
      ? "Experience instant student bookings, real-time push alerts, and direct live classes. Over 10,000+ students are looking for expert teachers right now."
      : "Verify your tutor credentials in 2 minutes on the Learnosphere Tutor App to unlock live classes and instant student bookings.");

  const displayBadge =
    badge ||
    (isTeacherVerified
      ? "🚀 EXCLUSIVE EDUCATOR HUB"
      : "🛡️ MANDATORY EDUCATOR KYC");

  if (variant === "compact") {
    return (
      <div className="w-full bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden my-4">
        <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-sm">
              <FaBolt className="text-yellow-300" /> {displayBadge}
            </span>
            <h3 className="text-xl md:text-2xl font-black tracking-tight">{displayTitle}</h3>
            <p className="text-white/90 text-sm max-w-xl">{displaySubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black/90 hover:bg-black text-white px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
            >
              <Image src={playstore} alt="Google Play" width={18} height={18} />
              <div className="text-left leading-tight">
                <span className="text-[9px] text-gray-300 block uppercase">Get it on</span>
                <span className="text-xs font-bold block">Google Play</span>
              </div>
            </a>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-black/90 hover:bg-black text-white px-4 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
            >
              <FaApple size={20} />
              <div className="text-left leading-tight">
                <span className="text-[9px] text-gray-300 block uppercase">Download on</span>
                <span className="text-xs font-bold block">App Store</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 via-zinc-900 to-orange-950 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 text-white shadow-2xl relative overflow-hidden my-4 sm:my-6 border border-orange-500/20">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
        {/* Left Column: Information & Value Props */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <FaBolt className="text-orange-400" />
            {displayBadge}
          </div>

          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold leading-tight text-white tracking-tight">
            {displayTitle}
          </h2>

          <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed">
            {displaySubtitle}
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 sm:p-2.5 rounded-xl bg-orange-500/20 text-orange-400 shrink-0">
                <MdOutlineNotificationsActive size={20} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">Instant Booking Alerts</h4>
                <p className="text-zinc-400 text-xs">Accept student inquiries within seconds via push notifications.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 sm:p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <MdCurrencyRupee size={20} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  {isTeacherVerified ? "Earn ₹500–₹1,500/hr" : "Unlock High Payouts"}
                </h4>
                <p className="text-zinc-400 text-xs">
                  {isTeacherVerified
                    ? "Live 1-on-1 classes, doubt-solving & study note royalties."
                    : "Earn ₹500–₹1,500/hr once your KYC identity is approved."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 sm:p-2.5 rounded-xl bg-yellow-500/20 text-yellow-400 shrink-0">
                <FaGraduationCap size={18} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">3x Student Reach</h4>
                <p className="text-zinc-400 text-xs">Featured tutor ranking across CBSE, ICSE, and state boards.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="p-2 sm:p-2.5 rounded-xl bg-green-500/20 text-green-400 shrink-0">
                <FaShieldAlt size={18} />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-sm text-white">
                  {isTeacherVerified ? "Instant Payouts & Rewards" : "Verified Tutor Badge"}
                </h4>
                <p className="text-zinc-400 text-xs">
                  {isTeacherVerified
                    ? "Direct bank transfers, zero commission fees & bonus milestones."
                    : "Instant 2-minute app KYC to receive official verified tutor badge."}
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof + CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold px-5 sm:px-6 py-3 rounded-2xl shadow-lg shadow-orange-600/30 transition-all hover:scale-105"
              >
                <Image src={playstore} alt="Google Play" width={20} height={20} />
                <div className="text-left leading-tight">
                  <span className="text-[10px] text-orange-200 block uppercase font-medium">Get it on</span>
                  <span className="text-xs sm:text-sm font-bold block">Google Play</span>
                </div>
              </a>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 text-white font-bold px-5 sm:px-6 py-3 rounded-2xl border border-white/20 transition-all hover:scale-105"
              >
                <FaApple size={22} />
                <div className="text-left leading-tight">
                  <span className="text-[10px] text-zinc-300 block uppercase font-medium">Download on</span>
                  <span className="text-xs sm:text-sm font-bold block">App Store</span>
                </div>
              </a>
            </div>

            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-semibold px-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} className="fill-amber-400" />
                ))}
              </div>
              <span className="text-zinc-300 ml-1">4.8/5 by Educators</span>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Mockup / QR */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-full max-w-sm rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl bg-zinc-950 group">
            <Image
              src={isTeacherVerified ? tutorRewardsMockup : tutorAppMockup}
              alt={isTeacherVerified ? "Learnosphere Tutor Rewards App" : "Learnosphere Tutor App"}
              width={500}
              height={400}
              priority
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-5">
              <span className="text-xs uppercase tracking-wider font-bold text-orange-400">
                {isTeacherVerified ? "Tutor Earnings & Rewards Suite" : "Educator KYC Suite"}
              </span>
              <p className="text-white font-semibold text-sm">
                {isTeacherVerified
                  ? "Real-time earnings, instant direct payouts & student booking alerts"
                  : "Complete KYC in 2 minutes & unlock full teaching features"}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3 bg-white/10 border border-white/15 px-4 py-2 rounded-2xl backdrop-blur-md">
            <Image
              src={tutorQr}
              alt="Scan QR to download"
              width={40}
              height={40}
              className="rounded-lg bg-white p-0.5"
            />
            <div className="text-left">
              <span className="text-[11px] font-bold text-white block">Scan to Install App</span>
              <span className="text-[10px] text-zinc-400 block">Available on Android & iOS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
