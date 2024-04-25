import React from 'react';
import Link from 'next/link';

const about = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-orange-200 to-slate-200">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Join Us as a Educator
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Are you passionate about teaching? Join our platform and connect with students from all around the world. Whether you specialize in math, science, languages, or any other subject, we welcome you to apply and share your knowledge!
        </p>
        <div className="flex justify-center">
          <Link href="/contact" className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-full shadow-md transition duration-300">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default about;

