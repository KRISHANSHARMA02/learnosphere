import React from "react";
import Image from "next/image";
import app from "@/public/Student_App.png";
import playstore from "@/public/playstore.svg";
import Apple_Store_logo from "@/public/Apple_Store_logo.png";

const AppPromoBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl my-2">
      {/* Decorative Background Elements */}

   
        <div className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl overflow-hidden shadow-2xl">
          {/* Internal Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -mr-20 -mt-20 blur-2xl" />

          <div className="flex flex-col lg:flex-row items-center justify-between px-8 py-12 lg:px-16 lg:py-0">
            
            {/* Left Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left z-10 lg:py-16">
              <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-orange-600 uppercase bg-white rounded-full shadow-sm">
                Get the best experience
              </span>
              
              <h2 className="text-xl md:text-3xl font-extrabold text-white mb-6 leading-tight">
                Learn on the go with <br />
                <span className="text-orange-100">LearnOSphere App</span>
              </h2>
              
              <p className="text-orange-50 text-lg mb-10 max-w-lg mx-auto lg:mx-0 font-light">
                Access your instant learning resources anytime, anywhere. Take 
                tests, watch videos, and track your progress right from your pocket.
              </p>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {/* Play Store Button */}
                <a
                  href="https://play.google.com/store/apps/details?id=com.karotaraj.learnosphere_main"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 rounded-xl px-6 py-3 text-white shadow-lg"
                >
                  <Image src={playstore} alt="Playstore" width={28} height={28} />
                  <div className="text-left">
                    <p className="text-[10px] uppercase opacity-80">Get it on</p>
                    <p className="text-base font-bold leading-none">Google Play</p>
                  </div>
                </a>

                {/* App Store Button */}
                <a
                  href="https://apps.apple.com/in/app/learnosphere-learning-app/id6748979882"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-black hover:bg-gray-900 transition-all duration-300 transform hover:-translate-y-1 rounded-xl px-6 py-3 text-white shadow-lg"
                >
                  <Image src={Apple_Store_logo} alt="App Store" width={28} height={28} />
                  <div className="text-left">
                    <p className="text-[10px] uppercase opacity-80">Download on the</p>
                    <p className="text-base font-bold leading-none">App Store</p>
                  </div>
                </a>
              </div>
            </div>

      
{/* Right Image */}
<div className="w-full lg:w-2/5 flex justify-center lg:justify-end relative lg:h-full [perspective:1500px]">

  <div
    className="
      relative lg:absolute

      /* MOBILE: start from top */
      top-0 md:top-0

      /* DESKTOP: hang from bottom */
      lg:top-auto lg:bottom-[-200px]

      w-[220px] md:w-[260px] lg:w-[200px]

      transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]

      [transform:rotateX(15deg)_rotateY(-25deg)_rotateZ(10deg)]
      group-hover:lg:bottom-[-20px]
      group-hover:[transform:rotateX(5deg)_rotateY(-5deg)_rotateZ(0deg)]
      group-hover:scale-110

      z-30
    "
  >
    <Image
      src={app}
      width={300}
      height={600}
      alt="LearnOSphere App"
      className="drop-shadow-[-20px_40px_50px_rgba(0,0,0,0.3)] select-none"
      priority
    />
  </div>

  {/* Glow */}
  <div className="absolute -bottom-10 w-64 h-32 bg-orange-400/40 rounded-full blur-[80px] group-hover:bg-orange-300/60 transition-all duration-700" />
</div>

          </div>
        </div>
    </section>
  );
};

export default AppPromoBanner;