import React from "react";
import Image from "next/image";
import app from "@/public/app.png";
import { IoRemoveOutline } from "react-icons/io5";

import playstore from "@/public/playstore.svg";
import Apple_Store_logo from "@/public/Apple_Store_logo.png";

const Brandapp = () => {
  return (
    <div className="flex justify-center item-center flex-col px-2 md:px-4 lg:px-0">
      <div className="flex flex-col items-center justify-center">
        <h2 className="font-Poppins text-xl sm:text-[1.5em] md:text-3xl uppercase pl-4 text-center text-black md:pl-0 font-bold ">
          Instant Learning Resources
        </h2>
        <IoRemoveOutline size={70} />
      </div>
      <div className="flex justify-center items-center  gap-1 flex-col md:flex-row">
        <div className="flex flex-col">
          <div className="">
            <h3 className="text-2xl font-Poppins p-2 pl-5 md:pl-0 md:text-4xl font-bold ">
              Learn<b className="text-orange-600">O</b>sphere.in
            </h3>
          </div>
          <div className="">
            <h3 className="text-xl md:text-4xl font-Poppins font-semibold uppercase pt-6">
              download the Learn<b className="text-orange-600">O</b>sphere app
              now
            </h3>
          </div>
          {/* <a 
          href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_app" 
          target="_blank" 
          rel="noopener noreferrer"
        > */}
          {/* <div className="flex gap-2 md:gap-0 justify-between md:justify-around pt-10 flex-start">
            <div className="flex flex-col md:item-center justify-center cursor-pointer bg-black p-3 rounded-xl text-white px-10">
              <div>
                <p className="text-xs font-Poppins">Get it on</p>
              </div>
              
              <div className="flex text-center flex-start">
                <Image src={playstore} height={20} width={20} alt="playstore" />
                <p className="text-sm md:text-lg p-1">Google Play</p>
              </div>
            </div>
          </div> */}
          <div className="flex justify-center md:justify-start pt-10">
            <div>
              <a
                href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main" // replace with your actual link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mr-4 gap-2 bg-[#000000] hover:bg-[#1a1a1a] transition-all duration-200 rounded-lg px-5 py-2 text-white"
              >
                <Image
                  src={playstore || "/PlaceholderImage.png"} // your playstore icon image
                  alt="Playstore"
                  width={24}
                  height={24}
                  quality={100}
                  priority
                />
                <div className="leading-tight ">
                  <p className="text-[10px] font-medium font-sans">GET IT ON</p>
                  <p className="text-sm font-bold font-sans">Google Play</p>
                </div>
              </a>
            </div>
            <div>
              <a
                href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882" // replace with your actual link
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center ml-4 gap-2 bg-[#000000] hover:bg-[#1a1a1a] transition-all duration-200 rounded-lg px-5 py-2 text-white"
              >
                <Image
                  src={Apple_Store_logo} // your playstore icon image
                  alt="Applestore"
                  width={30}
                  height={30}
                  quality={100}
                  priority
                />
                <div className="leading-tight">
                  <p className="text-[10px] font-medium font-sans">
                    GET IT ON
                  </p>
                  <p className="text-sm font-bold font-sans">App Store</p>
                </div>
              </a>
            </div>
          </div>


          {/* </a> */}
        </div>

        <div className="item-center">
          <Image
            src={app}
            height={300}
            width={300}
            alt="Get the LearnOSphere App Now"
            priority
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Brandapp;
