"use client";
import Image from "next/image";
import { IoRemoveOutline } from "react-icons/io5";

export default function IconMarquee() {
  const logos = [
    { id: 1, src: "/png-clipart-ministry-of-skill-development-and-entrepreneurship-skill-india-government-of-india-logistics-sector-skill-council-skill-india-logo-text-logo-thumbnail-removebg-preview.png", alt: "Skill India", link: null },
    { id: 2, src: "/naps_logo_final.png", alt: "NAPS", link: null },
    { id: 3, src: "/iStart-Logo_black.png", alt: "i Start", link: null },
    { id: 4, src: "/patrika-logo.png", alt: "Patrika", link: "https://learnosphere.in/Blog/youngsters-embrace-edtech-startups-transforming-education" }, // not clickable
    { id: 5, src: "/TOI-icon.jpg", alt: "Times of India", link: null },
  ];

  return (
     <div className="w-full overflow-hidden bg-white py-10">
      {/* Section Title */}
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl sm:text-[1.5em] md:text-3xl font-Poppins font-bold">
          Featured In
        </h2>
        <IoRemoveOutline size={70} className="text-orange-500" />
      </div>
      
      <div className="relative group cursor-pointer">
    {/* Marquee */}
      <div className="flex w-[200%] animate-marquee group-hover:[animation-play-state:paused]">
        {/* First row */}
        <div className="flex gap-16 w-1/2 justify-around">
          {logos.map((item) =>
            item.link ? (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform hover:scale-110"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={100}
                  height={50}
                  className="object-contain transition"
                />
              </a>
            ) : (
              <span key={item.id} className="flex items-center justify-center">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </span>
            )
          )}
        </div>

        {/* Second row (duplicate for seamless loop) */}
        <div className="flex gap-16 w-1/2 justify-around">
          {logos.map((item) =>
            item.link ? (
              <a
                key={`dup-${item.id}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center transition-transform hover:scale-110"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={100}
                  height={50}
                  className="object-contain transition"
                />
              </a>
            ) : (
              <span key={`dup-${item.id}`} className="flex items-center justify-center">
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={100}
                  height={50}
                  className="object-contain"
                />
              </span>
            )
          )}
        </div>
      </div>
      </div>


  
    </div>
  );
}
