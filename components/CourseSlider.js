'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from "next/image";

const slides = [
    {
        id: 1,
        title: 'Master Your Concepts',
        description: 'Interactive video lessons that boost clarity and retention.',
        image: 'https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/1.jpg',
        link: '/Courses',
    },
    {
        id: 2,
        title: 'Track Your Progress',
        description: 'Smart analytics to help you improve faster.',
        image: 'https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/2.jpg',
        link: '/Courses',
    },
    {
        id: 3,
        title: 'Learn Anywhere',
        description: 'Study on the go with our mobile-friendly platform.',
        image: 'https://learnosphere.s3.ap-south-1.amazonaws.com/public_images/3.jpg',
        link: '/Courses',
    },

];
const Slider = () => {
    const [current, setCurrent] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // Tailwind's md breakpoint
        };

        checkScreenSize(); // Initial check
        window.addEventListener("resize", checkScreenSize);

        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);
    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(timer);
    }, [current]);

    // Get 3 visible slides: [left, center, right]
    const getSlideIndexes = () => {
        if (isMobile) {
            return [current]; // Only center slide
        }
        const center = current;
        const left = (current - 1 + slides.length) % slides.length;
        const right = (current + 1) % slides.length;
        return [left, center, right];
    };

    const visibleSlides = getSlideIndexes();

    return (
        <div className="relative w-full max-w-7xl mx-auto h-auto md:h-[500px] overflow-hidden px-4 m-3 mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">Featured Learn<b className="text-orange-600">O</b>sphere Courses</h2>
            <div className="flex items-center justify-center gap-4 h-auto md:h-80 transition-all duration-500">
                {visibleSlides.map((slideIndex, idx) => {
                    const slide = slides[slideIndex];
                    const isCenter = idx === 1;

                    return (
                        <Link
                            key={slide.id}
                            href={slide.link}
                            className={`relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 cursor-pointer ${isMobile
                                    ? 'w-full h-full scale-100 z-10'
                                    : isCenter
                                        ? 'w-[60%] h-full scale-100 z-10'
                                        : 'w-[20%] h-[80%] scale-90 opacity-70'
                                }`}
                        >
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                height={400}
                                width={700}
                                className="object-cover w-full h-full mb-10"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-orange-500 text-white p-4">
                                <h2 className="text-base md:text-lg font-semibold">{slide.title}</h2>
                                {isCenter && <p className="text-xs md:text-sm">{slide.description}</p>}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Prev Button */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Next Button */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 p-2 rounded-full backdrop-blur-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};
export default Slider;