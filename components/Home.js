"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Image from "next/image";

// Import the Sarvgyat logo image

import { trackEvent, EVENT_NAMES } from '../src/lib/eventTracker';
import Link from "next/link";

const Home = ({ initialSlides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollDirection, setScrollDirection] = useState("right");

  const [slides, setSlides] = useState(initialSlides || []);
  const [isLoading, setIsLoading] = useState(!initialSlides || initialSlides.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If we already have slides from SSR, don't show loading.
    // Optionally we could skip the fetch entirely, but fetching to update cache is fine.
    const fetchSlides = async () => {
      try {
        const cachedSlides = localStorage.getItem("homepage_slides");
        if (cachedSlides && !initialSlides) {
          setSlides(JSON.parse(cachedSlides));
          setIsLoading(false);
        }

        const response = await fetch(`${WEB_BACKEND_URL}/api/route/public`);
        if (!response.ok) {
          throw new Error("Failed to fetch slides");
        }
        const data = await response.json();
        if (data.success && data.slides) {
          const formattedSlides = data.slides
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((slide) => ({
              id: slide.id,
              image: slide.imageUrl,
              alt: slide.title,
              link: slide.redirectUrl,
            }));
          setSlides(formattedSlides);
          localStorage.setItem("homepage_slides", JSON.stringify(formattedSlides));
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        if (!localStorage.getItem("homepage_slides") && (!initialSlides || initialSlides.length === 0)) {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // We can run fetchSlides in background to keep data fresh, but we don't block the UI if initialSlides exist
    fetchSlides();
  }, [initialSlides]);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setScrollDirection("right");
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleSlideChange = (index) => {
    if (index > currentIndex) {
      setScrollDirection("right");
    } else {
      setScrollDirection("left");
    }
    setCurrentIndex(index);
  };

  return (
    <div name="home" className="mt-11 md:mt-[80px] bg-[#fff] relative w-full">
      <div className="relative  h-[34vh] sm:h-[60vh] md:h-[50vh] lg:h-[50vh] xl:h-[75vh] object-cover overflow-hidden  ">
        {isLoading && (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        )}
        {error && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-red-500">
            Error: {error}
          </div>
        )}
        {!isLoading && !error && slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute w-full h-full transition-transform duration-700 ease-in-out ${
              index === currentIndex
                ? "transform-none opacity-100 z-10"
                : "opacity-0 z-0"
            } ${
              scrollDirection === "left"
                ? "-translate-x-full"
                : "translate-x-full"
            }`}
            data-carousel-item
          >
            <div className="relative w-full h-full">
              <div className="w-full h-full absolute inset-0">
                {slide.link ? (
                  <Link
                    href={slide.link}
                    onClick={() => {
                      if (slide.alt === "Book Educator") trackEvent(EVENT_NAMES.BOOK_EDUCATOR_CLICK, { source: 'home_banner' });
                      if (slide.alt === "Become Educator") trackEvent(EVENT_NAMES.BECOME_EDUCATOR_CLICKED, { source: 'home_banner' });
                    }}
                    target={slide.id === 4 ? "_blank" : "_self"}
                  >
                    <Image
                      src={slide.image || "/PlaceholderImage.png"}
                      fill
                      priority={index === 0}
                      quality={100}
                      className="object-contain md:object-fill"
                      alt={slide.alt || "slider image"}
                    />
                  </Link>
                ) : (
                  <Image
                    src={slide.image || "/PlaceholderImage.png"}
                    fill
                    priority={index === 0}
                    quality={100}
                    className="object-contain md:object-fill"
                    alt={slide.alt || "slider image"}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isLoading && !error && slides.length > 0 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((slide, index) => (
            <button
              title="Used For Scroll"
              key={slide.id}
              className={`w-6 h-2 rounded-sm transition-colors duration-300 ${
                index === currentIndex ? "bg-orange-500" : "bg-gray-400"
              }`}
              aria-current={index === currentIndex}
              aria-label={`Slide ${index + 1}`}
              onClick={() => handleSlideChange(index)}
              data-carousel-slide-to={index}
            ></button>
          ))}
        </div>
      )}

      {!isLoading && !error && slides.length > 0 && (
        <>
          <button
            title="Go To Left"
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
            data-carousel-prev
            onClick={() =>
              setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? slides.length - 1 : prevIndex - 1
              )
            }
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:ring transition-all">
              <FaAngleLeft size={30} />
            </span>
          </button>
          <button
            title="Go To Right"
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer focus:outline-none"
            data-carousel-next
            onClick={() =>
              setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)
            }
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white focus:ring transition-all">
              <FaAngleRight size={30} />
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default Home;

