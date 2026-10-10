"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    { label: "Sample Papers", href: "https://learnosphere.in/CBSE-Sample-Papers", color: "bg-red-400" },
    { label: "Home tuition Near", href: "https://learnosphere.in/home-tuition", color: "bg-blue-400" },
    { label: "Study Material", href: "https://learnosphere.in/Cbse-Previosyear-Questions", color: "bg-green-400" },
    { label: "Quiz", href: "https://learnosphere.in/Online-Quiz", color: "bg-yellow-400" },
  ];

  // 🔹 Teaser effect: open briefly every 10s
  useEffect(() => {
    const teaser = setInterval(() => {
      setIsOpen(true);
      setTimeout(() => setIsOpen(false), 1500); // stay open for 1.5s
    }, 10000);

    return () => clearInterval(teaser);
  }, []);

  // 🔹 Auto-close when user clicks (after 5s)
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setIsOpen(false), 15000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-3">
      {/* Child buttons */}
      <AnimatePresence>
        {isOpen &&
          buttons.map((btn, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={btn.href}>
                <div
                  className={`px-4 py-2 rounded-full text-white font-medium shadow-lg cursor-pointer ${btn.color} hover:opacity-90`}
                >
                  {btn.label}
                </div>
              </Link>
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main Button */}
      <motion.div
        onClick={() => setIsOpen((prev) => !prev)}
        animate={{
          scale: [1, 1.1, 1],
          rotate: isOpen ? 45 : 0,
        }}
        transition={{
          duration: 0.6,
          repeat: isOpen ? 0 : Infinity,
          repeatType: "mirror",
          repeatDelay: 2,
        }}
        className="w-14 h-14 rounded-full bg-orange-500 shadow-lg cursor-pointer flex items-center justify-center"
      >
        <span className="text-white text-2xl font-bold">+</span>
      </motion.div>
    </div>
  );
}
