"use client";
import Image from "next/image";
import AppPic from "@/public/AppPic.jpg";
import playstore from "@/public/playstore.svg";

const AppPopup = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 font-Poppins animate-popupFade">

            {/* POPUP CARD */}
            <div className="relative bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] 
                  w-[95%] max-w-3xl p-6 md:p-10 overflow-hidden animate-popupSlide">

                {/* BACKGROUND DECORATION */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-200 rounded-full opacity-40 blur-2xl"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-300 rounded-full opacity-40 blur-3xl"></div>

                {/* CLOSE BUTTON */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-5 text-gray-600 text-3xl 
                     hover:text-orange-500 hover:scale-110 transition-all duration-200"
                >
                    ✖
                </button>

                {/* MAIN CONTENT */}
                <div className="flex flex-col md:flex-row items-center gap-10 relative">

                    {/* LEFT TEXT SECTION */}
                    <div className="flex-1 text-gray-800 animate-leftFloat">

                        <h2 className="text-xl md:text-3xl font-extrabold text-orange-600 leading-snug">
                            🏆 Want Better Marks This Year?
                        </h2>

                        <p className="mt-4 text-gray-700 leading-relaxed">
                            <b>Learn<b className="text-orange-600">O</b>sphere Can Help</b>
                        </p>

                        <p className="mt-3 md:text-lg">
                            Download the <b className="text-orange-600">LearnOsphere App</b> now
                        </p>

                        {/* BUTTONS */}
                        <div className="flex justify-start flex-wrap gap-4 pt-8">

                            {/* Google Play */}
                            <a
                                href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-black hover:bg-[#1d1d1d] 
                                 transition-all duration-200 rounded-xl px-5 py-2 text-white shadow-md"
                            >
                                <Image
                                    src={playstore}
                                    alt="Playstore"
                                    width={26}
                                    height={26}
                                    className="rounded"
                                />
                                <div className="leading-tight">
                                    <p className="text-[9px] font-medium">GET IT ON</p>
                                    <p className="text-[12px] font-semibold">Google Play</p>
                                </div>
                            </a>

                            {/* App Store */}
                            <a
                                href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-black hover:bg-[#1d1d1d] 
                                 transition-all duration-200 rounded-xl px-5 py-2 text-white shadow-md"
                            >
                                <Image
                                    src="/Apple_Store_logo.png"
                                    alt="App Store"
                                    width={26}
                                    height={26}
                                />
                                <div className="leading-tight">
                                    <p className="text-[9px] font-medium">DOWNLOAD ON</p>
                                    <p className="text-[12px] font-semibold whitespace-nowrap">App Store</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* RIGHT IMAGE SECTION */}
                    <div className="flex-1 md:flex w-full md:w-auto justify-center">
                        <div className="relative animate-imageTilt">
                            <Image
                                src={AppPic}
                                alt="Learnosphere App"
                                className="rounded-2xl w-full h-auto max-h-80 object-contain 
                                duration-500 
            md:-translate-x-3 md:rotate-12 md:hover:rotate-0"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppPopup;