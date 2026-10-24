"use client";
import { APP_BACKEND_URL } from "@/src/helper/appbackend_api";

import React, { useState, useEffect, useRef } from "react";

import { X, ArrowLeft, Loader2 } from "lucide-react";

// 👇 ADDED tutorId PROP HERE

const SlotBookPopup = ({ onClose, onSelect, tutorId }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const [availableSlots, setAvailableSlots] = useState([]);

  const [tempSelected, setTempSelected] = useState(null);

  const [loading, setLoading] = useState(false); // Added loading state for API

  // Store the raw API response so we don't fetch every time they click a different date

  const [allApiSlots, setAllApiSlots] = useState([]);

  const dateListRef = useRef(null);

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const [nextDays, setNextDays] = useState([]);

  // 1. Initial Setup: Set Days and Fetch API data ONCE

  useEffect(() => {
    // Generate the next 4 days (to match your backend logic)

    const days = [];

    for (let i = 0; i < 4; i++) {
      const date = new Date(today);

      date.setDate(today.getDate() + i);

      days.push(date);
    }

    setNextDays(days);

    // Fetch slots from API

    const fetchSlots = async () => {
      if (!tutorId) return;

      setLoading(true);

      try {
        const response = await fetch(
          `${APP_BACKEND_URL}/api/session/v1/get_tutor_available_slots?tutorId=${tutorId}`,
        );

        const data = await response.json();

        if (data.success) {
          setAllApiSlots(data.slots);

          // If we have days, auto-select the first day and filter its slots

          if (days.length > 0) {
            filterSlotsForDate(days[0], data.slots);
          }
        }
      } catch (error) {
        console.error("Failed to fetch tutor slots:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, [tutorId]);

  // 2. Filter the giant API array down to just the slots for the clicked date

  const filterSlotsForDate = (date, sourceSlots = allApiSlots) => {
    setSelectedDate(date);

    setTempSelected(null);

    if (!sourceSlots || sourceSlots.length === 0) {
      setAvailableSlots([]);

      return;
    }

    // Format the clicked date so we can compare it

    const targetDateStr = date.toLocaleDateString("en-CA"); // e.g., "YYYY-MM-DD"

    // Label helpers

    const fullDateStr = date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    const dayName = date
      .toLocaleDateString("en-US", { weekday: "short" })
      .toUpperCase();

    const monthName = date
      .toLocaleDateString("en-US", { month: "short" })
      .toUpperCase();

    const dateNum = date.getDate();

    const filteredSlots = [];

    sourceSlots.forEach((apiSlot) => {
      const slotDateObj = new Date(apiSlot.timeISO);

      const slotDateStr = slotDateObj.toLocaleDateString("en-CA");

      // Only grab slots that match the selected day

      if (slotDateStr === targetDateStr) {
        const timeStr = slotDateObj.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        });

        filteredSlots.push({
          id: apiSlot.timeISO,

          fullLabel: `${fullDateStr} • ${timeStr}`,

          dayLabel: dayName,

          monthLabel: monthName,

          dateNumLabel: dateNum,

          timeLabel: timeStr,

          isBooked: apiSlot.isBooked || apiSlot.isPast || !apiSlot.isAvailable, // Lock it if booked, past, or unavailable!
        });
      }
    });

    // Sort by time just in case

    filteredSlots.sort((a, b) => new Date(a.id) - new Date(b.id));

    setAvailableSlots(filteredSlots);
  };

  const handleDateClick = (date) => {
    filterSlotsForDate(date);
  };

  const handleConfirm = () => {
    if (tempSelected) {
      onSelect(tempSelected);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8 font-Poppins">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      <div className="bg-white w-full max-w-3xl rounded-t-[32px] md:rounded-[32px] shadow-2xl relative z-10 flex flex-col h-[85vh] md:h-[75vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-100 bg-white shrink-0">
          <button
            onClick={onClose}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors md:hidden"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 text-center flex-1 md:text-left">
            Pick a Slot
          </h2>

          <button
            onClick={onClose}
            className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden bg-slate-50/50">
          {/* HORIZONTAL DATE PICKER */}

          <div className="relative p-3 bg-white border-b border-gray-100 shrink-0">
            <div
              ref={dateListRef}
              className="flex gap-2.5 overflow-x-auto custom-scrollbar pb-2 px-2 snap-x"
            >
              {nextDays.map((date, index) => {
                const isSelected =
                  selectedDate && date.getTime() === selectedDate.getTime();

                const dayName = date.toLocaleDateString("en-US", {
                  weekday: "short",
                });

                const dateNum = date.getDate();

                return (
                  <button
                    key={index}
                    onClick={() => handleDateClick(date)}
                    className={`flex flex-col items-center justify-center w-14 h-16 md:w-16 md:h-20 rounded-xl md:rounded-2xl shrink-0 snap-center transition-all ${
                      isSelected
                        ? "bg-orange-500 text-white shadow-md shadow-orange-500/30 transform scale-105"
                        : "bg-white text-gray-700 border border-gray-100 hover:border-orange-300 hover:bg-orange-50"
                    }`}
                  >
                    <span
                      className={`text-[10px] md:text-xs font-medium mb-0.5 md:mb-1 ${isSelected ? "text-orange-100" : "text-gray-400"}`}
                    >
                      {dayName}
                    </span>

                    <span className="text-xl md:text-2xl font-bold">
                      {dateNum}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 md:p-5 custom-scrollbar relative">
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500 mb-2" />

                <p className="text-gray-400 font-medium text-sm">
                  Fetching real-time availability...
                </p>
              </div>
            ) : availableSlots.length === 0 ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 animate-in fade-in duration-300">
                <p className="text-gray-400 font-medium text-lg">
                  No available slots for this date
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
                {availableSlots.map((slot) => {
                  const isSelected = tempSelected === slot.fullLabel;

                  let buttonClasses =
                    "p-2 rounded-xl border transition-all flex flex-col items-center justify-center text-center gap-0.5 ";

                  if (slot.isBooked) {
                    buttonClasses +=
                      "bg-gray-50 border-gray-100 text-gray-400 cursor-not-allowed opacity-70";
                  } else if (isSelected) {
                    buttonClasses +=
                      "bg-orange-500 border-orange-500 text-white shadow-md shadow-orange-200 scale-[1.02]";
                  } else {
                    buttonClasses +=
                      "bg-white border-gray-200 text-gray-700 hover:border-orange-400 hover:shadow-sm cursor-pointer";
                  }

                  return (
                    <button
                      key={slot.id}
                      disabled={slot.isBooked}
                      onClick={() => setTempSelected(slot.fullLabel)}
                      className={buttonClasses}
                    >
                      <div
                        className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-orange-100" : "text-gray-400"}`}
                      >
                        {slot.dayLabel}, {slot.monthLabel} {slot.dateNumLabel}
                      </div>

                      <div className="text-sm md:text-base font-extrabold leading-tight">
                        {slot.timeLabel}
                      </div>

                      {slot.isBooked && (
                        <span className="text-[9px] font-bold uppercase text-gray-400 mt-0.5">
                          Unavailable
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 md:p-5 border-t border-gray-100 bg-white shrink-0 flex justify-center">
          <button
            onClick={handleConfirm}
            disabled={!tempSelected}
            className="w-full md:w-3/4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 md:py-3 rounded-xl shadow-md shadow-orange-100 transition-all text-sm md:text-base disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Confirm Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotBookPopup;
