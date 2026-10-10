"use client";
import React from 'react';


const DashboardFooter = ({setShowAgreement}) => {


  return (
    <footer className="bg-gray-200 w-full sticky bottom-0 text-gray-700 py-4">
      <div className="mx-auto px-6 flex flex-col lg:flex-row justify-between items-right space-y-4 lg:space-y-0">
        <div className="flex flex-col lg:flex-row items-center mb-2 md:mb-4 lg:mb-0">
          <button onClick={() => setShowAgreement(true)} className="text-sm md:text-lg mx-2 hover:text-orange-500">Terms of use</button>
          <a href="/privacy-policy" target='0' className="text-sm md:text-lg mx-2 hover:text-orange-500 p-1">Privacy Policy</a>
        </div>
        <div className="text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Learn<span className='font-bold text-orange-600'>O</span>sphere. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default DashboardFooter;
