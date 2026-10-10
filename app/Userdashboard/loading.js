import React from 'react';

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      {/* LearnOsphere Animated Loader */}
      <div className="flex items-center justify-center border-4 border-slate-500 rounded-xl animate-pulse">
        <span className="text-xl font-bold text-gray-600 p-3">
          Learn<span className="text-orange-600">O</span>sphere..
        </span>
      </div>
    </div>
  );
}