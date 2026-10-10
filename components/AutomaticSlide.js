"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function InfiniteSlider() {
    const originalCards = [
        { id: 1, color: "bg-orange-200", text: "Stop struggling. Start learning smart with India’s most personalised live classes." , link: "/live-one-to-one"},
        { id: 2, color: "bg-green-200", text: "Bring expert teachers home—without the travel, stress, or scheduling chaos.", link: "/home-tuition" },
        { id: 3, color: "bg-blue-200", text: "Explore the complete CBSE 2025–26 syllabus, smartly organised for easy learning.", link: "/CBSE_Syllabus" },
    ];

    // Duplicate for infinite loop
    const cards = [
        originalCards[originalCards.length - 1], // last
        ...originalCards,
        originalCards[0], // first
    ];

    const [index, setIndex] = useState(1);
    const [transition, setTransition] = useState(true);

    // AUTO SLIDE
    useEffect(() => {
        const timer = setInterval(() => {
            goRight();
        }, 3000);
        return () => clearInterval(timer);
    }, [index]);

    // MOVE RIGHT
    const goRight = () => {
        setIndex((prev) => prev + 1);
        setTransition(true);
    };

    // MOVE LEFT
    const goLeft = () => {
        setIndex((prev) => prev - 1);
        setTransition(true);
    };

    // LOOP HANDLING (instant jump without animation)
    useEffect(() => {
        if (index === cards.length - 1) {
            setTimeout(() => {
                setTransition(false);
                setIndex(1); // jump to first real slide
            }, 700);
        }
        if (index === 0) {
            setTimeout(() => {
                setTransition(false);
                setIndex(cards.length - 2); // jump to last real slide
            }, 700);
        }
    }, [index]);

    return (
        <div className="relative w-full h-30 md:h-20 overflow-hidden mt-20 ">

            {/* SLIDER */}
            <div
                className={`flex h-full ${transition ? "transition-all duration-700 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {cards.map((card, i) => (
                    <Link href={card.link}  key={i} className="min-w-full h-full ">
                        <div
                            key={i}
                            className={`min-w-full h-full ${card.color} 
              flex items-center justify-center text-xl p-4 `}
                        >
                            {card.text}
                        </div>
                </Link>
                ))}
            </div>

            {/* LEFT BUTTON */}
            <button
                onClick={goLeft}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full"
            >
                ◀
            </button>

            {/* RIGHT BUTTON */}
            <button
                onClick={goRight}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 text-white px-4 py-2 rounded-full"
            >
                ▶
            </button>
        </div>
    );
}