
"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, Star, Sparkles } from 'lucide-react';

const PackageSelectPopup = ({ onClose, onSelect, currency, basePrice, packages: apiPackages }) => {
  const [selectedPkg, setSelectedPkg] = useState(null);

  // Use your real API packages if available, otherwise use a safe fallback
  const packages = apiPackages?.length > 0 ? apiPackages : [
    { id: 'single', name: "Single Session", totalSessions: 1, freeSessions: 0, totalPrice: basePrice, discountPercent: 0 },
    { id: 'pack_5', name: "5 Hours Pack", totalSessions: 5, freeSessions: 0, totalPrice: basePrice * 5 * 0.95, discountPercent: 5, isRecommended: true },
    { id: 'pack_10', name: "10 Hours Pack", totalSessions: 10, freeSessions: 0, totalPrice: basePrice * 10 * 0.90, discountPercent: 10, isBestValue: true },
  ];

  const handleConfirm = () => {
    if (selectedPkg) {
      // Normalize the data so the next page can read it perfectly
      const formattedPackage = {
        ...selectedPkg,
        price: selectedPkg.totalPrice || selectedPkg.price, // Maps totalPrice to price
        hours: selectedPkg.totalSessions || selectedPkg.hours, // Maps totalSessions to hours
      };
      
      onSelect(formattedPackage); 
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Content */}
      <div className="bg-white w-full max-w-2xl rounded-t-3xl md:rounded-3xl shadow-2xl relative z-10 flex flex-col max-h-[85vh] animate-in slide-in-from-bottom-4 md:slide-in-from-bottom-8 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl md:text-2xl font-extrabold text-gray-900">Select a Package</h2>
            <p className="text-sm text-gray-500 mt-1">Choose a learning plan to proceed</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
          {packages.map((pkg) => {
            const isSelected = selectedPkg?.id === pkg.id;
            
            // DYNAMIC BASE STYLING
            let cardStyle = "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/50";
            if (isSelected) {
              cardStyle = "border-orange-500 bg-orange-50 shadow-md shadow-orange-100 transform scale-[1.01]";
            } else if (pkg.isBestValue) {
              cardStyle = "border-green-300 bg-green-50/40 hover:bg-green-50 hover:border-green-400";
            } else if (pkg.isRecommended) {
              cardStyle = "border-orange-200 bg-orange-50/30 hover:bg-orange-50 hover:border-orange-300";
            }

            // CALCULATE ORIGINAL PRICE FOR STRIKETHROUGH (Only used if discountPercent > 0)
            const originalPrice = pkg.originalPrice || (basePrice * pkg.totalSessions);

            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedPkg(pkg)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center justify-between group relative overflow-hidden ${cardStyle}`}
              >
                
                {/* DYNAMIC RIBBONS */}
                {pkg.isBestValue ? (
                   <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm z-10">
                     Best Value
                   </div>
                ) : pkg.isRecommended ? (
                   <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm z-10">
                     Recommended
                   </div>
                ) : null}

                <div className="flex flex-col pr-4">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-lg font-bold text-gray-900">{pkg.name}</span>

                    {/* DYNAMIC INLINE BADGES */}
                    {pkg.isRecommended && (
                      <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide flex items-center gap-1">
                        <Star className="w-3 h-3 fill-orange-500" /> Recommended
                      </span>
                    )}

                    {pkg.isBestValue && (
                      <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide flex items-center gap-1">
                        <Sparkles className="w-3 h-3 fill-green-600" /> Best Value
                      </span>
                    )}
                  </div>

                  {/* Sessions and Price Breakdown */}
                  <span className="text-sm text-gray-500 font-medium mt-1">
                    {pkg.totalSessions} {pkg.totalSessions > 1 ? 'Sessions' : 'Session'}
                    
                    {/* 🚀 ADDED FREE SESSIONS LOGIC HERE */}
                    {pkg.freeSessions > 0 && (
                      <span className="text-green-600 font-bold ml-1">
                        ({pkg.freeSessions} free included)
                      </span>
                    )}
                    
                    {pkg.perSessionPrice ? ` • ${pkg.currencySymbol || currency}${pkg.perSessionPrice}/session` : ''}
                  </span>
                  
                  {/* Dynamic Discount Tag */}
                  {pkg.discountPercent > 0 && (
                    <span className="mt-2 inline-block bg-red-100 text-red-600 text-[10px] font-extrabold px-2 py-1 rounded-md uppercase tracking-wider w-max">
                      Save {pkg.discountPercent}%
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* UPDATED PRICE SECTION WITH BACKEND DISCOUNT LOGIC */}
                  <div className="text-right flex flex-col items-end justify-center">
                    
                    {/* STRICTLY BASED ON BACKEND DISCOUNT PERCENTAGE */}
                    {pkg.discountPercent > 0 && (
                      <span className="text-xs md:text-sm font-bold text-gray-400 line-through mb-[-2px]">
                        {pkg.currencySymbol || currency}{originalPrice}
                      </span>
                    )}
                    
                    {/* Final Discounted Price */}
                    <span className="block text-xl font-extrabold text-orange-600">
                      {pkg.currencySymbol || currency}{pkg.totalPrice}
                    </span>
                  </div>

                  {/* Selection Indicator */}
                  <div className={`w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
                    isSelected ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-white"
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
          <button
            onClick={handleConfirm}
            disabled={!selectedPkg}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-xl shadow-orange-100 transition-all text-lg disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.99]"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageSelectPopup;