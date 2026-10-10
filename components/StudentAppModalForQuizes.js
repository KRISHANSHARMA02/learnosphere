"use client";

import Image from "next/image";
import { FaGooglePlay } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const DownloadAppModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 py-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg text-center max-h-[90vh] relative overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 transition text-lg"
            >
              ✖
            </button>

            {/* App Image */}
            <div className="mx-auto mb-5 w-32 h-32 sm:w-40 sm:h-40 relative drop-shadow-md">
              <Image
                src="https://learnosphere.s3.ap-south-1.amazonaws.com/student_app_slides/Student_App+(1).png"
                alt="App Preview"
                fill
                className="object-contain rounded-xl"
              />
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3">
              🎉 Take Your Learning to the Next Level!
            </h2>

            {/* Benefits List */}
            <ul className="text-left text-gray-700 mb-5 space-y-2 list-disc list-inside text-sm sm:text-base">
              <li>📜 Access all your <strong>certificates</strong></li>
              <li>🏆 Track <strong>achievements</strong> & progress</li>
              <li>📝 Explore more <strong>quizzes</strong> & earn credits</li>
              <li>🎥 Watch <strong>related videos</strong> to boost your score</li>
            </ul>

            {/* Account Info */}
            <p className="text-gray-600 mb-6 text-xs sm:text-sm">
              Already have an account? Just <strong>login</strong>.  
              New here? <strong>Register free</strong> in seconds!
            </p>

            {/* CTA Button */}
            <a
              href="https://learning.learnosphere.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold shadow-md hover:from-green-700 hover:to-green-800 transition w-full sm:w-auto"
            >
              <FaGooglePlay size={22} />
              <span className="text-sm sm:text-base">Download on Play Store</span>
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DownloadAppModal;
