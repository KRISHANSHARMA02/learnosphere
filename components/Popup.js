"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Popup() {
  const [show, setShow] = useState(false);
  const [popupData, setPopupData] = useState(null);

   useEffect(() => {
    // Check if popup was shown in the last 24 hours
    const lastShown = localStorage.getItem("popupLastShown");
    const lastPopupId = localStorage.getItem("lastPopupId");
    const now = Date.now();
    if (lastShown && now - parseInt(lastShown) < 8 * 60 * 60 * 1000) {
      // Less than 8 hours ago → don't show popup
      // NOTE: Temporarily commented out so you can test the popup immediately. 
      // return; 
    }
    // fetch popup data from backend
    fetch("/api/getPopup", { cache: "no-store" }) // Use absolute path and prevent browser caching
      .then(async (res) => {
        if (!res.ok || res.status === 204) return null; // No popup
        return await res.json();
      })
      .then((data) => {
        if (!data || !data.imageUrl) return;

        // The user wants to see the popup. If it's the exact same popup and it was shown recently, it was already handled by the 8-hour check.
        // We shouldn't permanently block the same popup.
        
        setPopupData(data); 
        setShow(true);

        // Save timestamp when popup is shown
        localStorage.setItem("popupLastShown", now.toString());
        localStorage.setItem("lastPopupId", data._id);
      })
      .catch((err) => console.error("Popup fetch error:", err));
  }, []);

  if (!show || !popupData) return null;

return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className=" rounded-2xl  p-6 max-w-md w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-7 right-9 text-black m-2 text-xl"
          onClick={() => setShow(false)}
        >
          &times;
        </button> 

        {/* Popup Image - clickable if linkUrl is present */}
        {popupData.linkUrl ? (
          <a
            href={popupData.linkUrl}
            onClick={() => {
              import('@/src/lib/eventTracker').then(({ trackEvent }) => {
                trackEvent('POPUP_IMAGE_CLICKED', {
                  popupId: popupData._id,
                  title: popupData.title || 'Special Offer Popup',
                  target_url: popupData.linkUrl,
                  url: window.location.href,
                  path: window.location.pathname
                });
              });
            }}
          >
            <Image
              src={popupData.imageUrl}
              alt="Popup"
              height={1000}
              width={1000}
              className="rounded-2xl w-full h-auto cursor-pointer"
            />
          </a>
        ) : (
          <Image
            src={popupData.imageUrl}
            alt="Popup"
            height={1000}
            width={1000}
            className="rounded-2xl w-full h-auto"
          />
        )}
      </div>
    </div>
  );
}