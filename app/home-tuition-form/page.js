"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import React, { useState, useEffect } from "react";
import axios from "axios";
import background from "@/public/stbg.png";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/src/lib/eventTracker";
import { useSession } from "next-auth/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "@/components/Navbar";
import Footer1 from "@/components/Footer1";
import Footer from "@/components/Footer";

export default function StudentForm() {
    const { data: session, status } = useSession(); //get session data
    const router = useRouter();
    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    // State for API data
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [allCities, setAllCities] = useState([]);
    const [address, setAddress] = useState("");
    const [date, setDate] = useState("");
    const [timePeriod, setTimePeriod] = useState("AM");
    const [time, setTime] = useState("");
    const [bookingCount, setBookingCount] = useState(0);

    const [formData, setFormData] = useState({
        studentName: "",
        gmail: "",
        mobileNumber: "",
        grade: "",
        stream: "",
        subject: "",
        preferredDate: "",
        preferredTime: "",
        state: "",
        city: "",
        pincode: "",
        fullAddress: "",
        educationBoard: ""
    });
    // Fetch states and cities from API
    useEffect(() => {
        const fetchStateCityData = async () => {
            try {
                const response = await axios.get(
                    `${WEB_BACKEND_URL}/api/route/getLocationsFromStateCity`
                );
                const data = response.data.data;

                const uniqueStates = [...new Set(data.map((item) => item.state))];
                setStates(uniqueStates);
                setAllCities(data);
            } catch (error) {
                console.error("Error fetching state and city data:", error);
            }
        };

        fetchStateCityData();
    }, []);
    // Update cities when state changes
    useEffect(() => {
        if (formData.state) {
            const filteredCities = allCities
                .filter((item) => item.state === formData.state)
                .map((item) => item.city);
            setCities(filteredCities);
        } else {
            setCities([]);
        }
    }, [formData.state, allCities]);
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Allow only digits and limit to 6 characters
        if (name === "pincode") {
            if (!/^\d{0,6}$/.test(value)) return; // Prevent invalid characters
        }

        setFormData({
            ...formData,
            [name]: value,
        });

    };
    const handleContact = (e) => {
        const { value } = e.target;
        if (/^\d{0,10}$/.test(value)) {
            setFormData((prev) => ({
                ...prev,
                mobileNumber: value,
            }));
        }
    };



    useEffect(() => {
        if (status === "authenticated") {
            setFormData((prevData) => ({
                ...prevData,
                studentName: session.user.name || "",
                gmail: session.user.email || "",
            }));
        }
    }, [session, status]);

    // Handle state selection and filter cities
    const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setFormData({ ...formData, state: selectedState, city: "" });

        // Filter cities based on selected state
        const filteredCities = allCities
            .filter((item) => item.state === selectedState)
            .map((item) => item.city);
        setCities(filteredCities);
    };

    // Handle city selection
    const handleCityChange = (e) => {
        setFormData({ ...formData, city: e.target.value });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};

        if (!formData.name) errors.name = "Name is Required";
        if (!formData.gmail) errors.gmail = "Email is Required";
        if (!formData.mobileNumber) errors.mobileNumber = "Mobile Number is Required";
        if (!formData.grade) errors.grade = "Grade is Required";
        if (!formData.subject) errors.subject = "Subject is Required";
        if (!formData.state) errors.state = "State is Required";
        if (!formData.city) errors.city = "City is Required";

        // Use new variable names here
        if (!date) errors.date = "Date is Required";
        if (!time) errors.time = "Time is Required";
        if (!address) errors.address = "Address is Required";

        setErrors(errors);

        if (Object.keys(errors).length > 0) return;

        const finalData = {
            name: formData.name,
            gmail: formData.gmail,
            mobileNumber: formData.mobileNumber,
            grade: formData.grade,
            stream: formData.stream,
            subject: formData.subject,
            date: date,           // changed
            time: `${time} ${timePeriod}`, // changed
            state: formData.state,
            city: formData.city,
            address: address,     // changed
            educationBoard: formData.educationBoard || "",
        };

        try {
            const response = await axios.post(
                `${WEB_BACKEND_URL}/api/route/studentFormCityPageController`,
                finalData
            );

            if (response.status === 200) {
                trackEvent("HOME_TUITION_FORM_SUBMITTED", {
                    name: finalData.name,
                    email: finalData.gmail,
                    mobile_number: finalData.mobileNumber,
                    ...finalData,
                });

                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "We’ve reserved your class as requested. You’ll receive a confirmation email shortly. Thank you for connecting with us!",
                });
                router.push("/Courses");
            }
        } catch (error) {
            console.error("Submit error:", error);
            if (typeof error.response?.data?.errors === "string") {
                // 🔴 case: backend returned a string error (like demo class limit)
                setGeneralError(error.response.data.errors);
            } else if (typeof error.response?.data?.errors === "object") {
                // 🟠 case: backend returned field-level errors
                setErrors(error.response.data.errors);
            } else {
                setGeneralError("Unexpected error occurred. Please try again.");
            } if (typeof error.response?.data?.errors === "string") {
                // 🔴 case: backend returned a string error (like demo class limit)
                setGeneralError(error.response.data.errors);
            } else if (typeof error.response?.data?.errors === "object") {
                // 🟠 case: backend returned field-level errors
                setErrors(error.response.data.errors);
            } else {
                setGeneralError("Unexpected error occurred. Please try again.");
            }
        }
    };
    const educationBoards = [
        "CBSE (Central Board of Secondary Education)",
        "ICSE (Indian Certificate of Secondary Education)",
        "NIOS (National Institute of Open Schooling)",
        "RBSE (Rajasthan Board of Secondary Education)",
        "UPMSP (Uttar Pradesh Madhyamik Shiksha Parishad)",
        "MSBSHSE (Maharashtra State Board of Secondary & Higher Secondary Education)",
        "KSEEB (Karnataka Secondary Education Examination Board)",
        "TNBSE (Tamil Nadu Board of Secondary Education)",
        "WBBSE (West Bengal Board of Secondary Education)",
        "BSEB (Bihar School Examination Board)",
        "PSEB (Punjab School Education Board)",
        "HBSE (Haryana Board of School Education)",
        "GSEB (Gujarat Secondary and Higher Secondary Education Board)",
        "BSE Odisha (Board of Secondary Education, Odisha)",
        "CGBSE (Chhattisgarh Board of Secondary Education)",
        "MPBSE (Madhya Pradesh Board of Secondary Education)",
        "TBSE (Tripura Board of Secondary Education)",
        "SEBA (Board of Secondary Education, Assam)",
        "MBOSE (Meghalaya Board of School Education)",
        "NBSE (Nagaland Board of School Education)",
        "JAC (Jharkhand Academic Council)",
        "HPBOSE (Himachal Pradesh Board of School Education)",
        "Mizoram Board of School Education",
        "BOSEM (Board of Secondary Education, Manipur)",
        "BOSE (Jammu and Kashmir State Board of School Education)",
        "Goa Board of Secondary & Higher Secondary Education",
        "UBSE (Uttarakhand Board of School Education)",
        "Sikkim Board of Secondary Education",
        "APBSE (Andhra Pradesh Board of Secondary Education)",
        "TSSSC (Telangana State Secondary School Certificate Board)",
        "Arunachal Pradesh Board of Secondary Education",
        "Lakshadweep Board of Secondary Education",
        "Dadra and Nagar Haveli Board of Secondary Education",
    ];
    const handleTimeChange = (e) => {
        const timeValue = e.target.value;
        setTime(timeValue); // Update the time state

        // Split the time into hours and minutes
        const [hours] = timeValue.split(":");
        // Automatically select AM/PM based on the selected time
        if (hours >= 12) {
            setTimePeriod("PM");
        } else {
            setTimePeriod("AM");
        }
    };
    const validateTime = () => {
        if (!time || !date) return;

        const now = new Date(); // current datetime

        // Parse selected date
        const selectedDate = new Date(date);
        selectedDate.setHours(0, 0, 0, 0);

        // Parse user input time
        let [hours, minutes] = time.split(":").map(Number);
        if (timePeriod === "PM" && hours < 12) hours += 12;
        if (timePeriod === "AM" && hours === 12) hours = 0;

        // Combine date + time
        const userDateTime = new Date(selectedDate);
        userDateTime.setHours(hours, minutes, 0, 0);

        // Check if selected date is today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate.getTime() === today.getTime()) {
            // Minimum allowed time = now + 30 minutes
            const minTime = new Date();
            minTime.setMinutes(minTime.getMinutes() + 30);

            if (userDateTime < minTime) {
                // Auto adjust time
                setTime(`${String(minTime.getHours()).padStart(2, "0")}:${String(minTime.getMinutes()).padStart(2, "0")}`);
                setTimePeriod(minTime.getHours() >= 12 ? "PM" : "AM");
            }
        }
        // Else: tomorrow or later → keep user-selected time
    };
    return (
        <>
            <Navbar />
            <div
                className="w-full mt-20"
                style={{
                    backgroundImage: `url(${background.src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <h1 className="text-4xl font-bold font-Poppins text-white text-center mb-6 pt-6">
                    Unlock Your Learning Potential with Learnosphere
                </h1>
                <p className="text-white font-Poppins text-center mt-8">
                    At Learnosphere, we are dedicated to helping you find the perfect
                    tutor who meets your academic needs and preferences.
                </p>
                <p className="text-white font-Poppins text-center "> Fill out the form
                    below to get started.</p>

                <div className="w-[90vw] md:w-3/5 lg:w-2/4 mx-auto py-8">
                    <div className="bg-white shadow-lg rounded-lg p-6 md:p-8 shadow-orange-300">
                        <form className="space-y-6 font-Poppins" onSubmit={handleSubmit}>
                            {bookingCount >= 3 ? (
                                <p className="text-red-500">You can only book 3 demo classes.</p>
                            ) : (
                                <>
                                    <h2 className="text-lg font-semibold text-gray-700 text-start mb-6">
                                        Step Into a World of Smarter Learning
                                    </h2>
                                    <div className="relative mb-4">
                                        <label
                                            htmlFor="Name"
                                            className="block text-sm font-medium text-black"
                                        >
                                            Student Name<b className="text-orange-600">*</b>
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}

                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                                            placeholder="Enter your name"
                                        />
                                        {errors.name && (
                                            <p className="text-red-600 text-sm mt-1">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative mb-4">
                                        <label
                                            htmlFor="gmail"
                                            className="block text-sm font-medium text-black"
                                        >
                                            Email<b className="text-orange-600">*</b>
                                        </label>
                                        <input
                                            type="email"
                                            id="gmail"
                                            name="gmail"
                                            value={formData.gmail}

                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                                            placeholder="Enter your email"
                                        />
                                        {errors.gmail && (
                                            <p className="text-red-600 text-sm mt-1">{errors.gmail}</p>
                                        )}
                                    </div>

                                    <div className="relative mb-4">
                                        <label
                                            htmlFor="mobileNumber"
                                            className="block text-sm font-medium text-black"
                                        >
                                            Mobile Number<b className="text-orange-600">*</b>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="mobileNumber"
                                                name="mobileNumber"
                                                value={formData.mobileNumber}
                                                onChange={handleContact}

                                                pattern="[0-9]{10}"
                                                maxLength={10}
                                                className="mt-1 block w-full px-14 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                                                placeholder="Enter 10-digit mobile number"
                                            />
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-sm">
                                                +91
                                            </span>
                                        </div>
                                        {errors.mobileNumber && (
                                            <p className="text-red-600 text-sm mt-1">
                                                {errors.mobileNumber}
                                            </p>
                                        )}
                                    </div>

                                    <div className="relative mb-6">
                                        <label
                                            htmlFor="grade"
                                            className="block text-sm font-medium text-black mb-2"
                                        >
                                            Grade<b className="text-orange-600">*</b>
                                        </label>
                                        <select
                                            id="grade"
                                            name="grade"
                                            value={formData.grade}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                                        >
                                            <option value="">Select Grade</option>

                                            <option value="Grade 1">Grade 1</option>
                                            <option value="Grade 2">Grade 2</option>
                                            <option value="Grade 3">Grade 3</option>
                                            <option value="Grade 4">Grade 4</option>
                                            <option value="Grade 5">Grade 5</option>
                                            <option value="Grade 6">Grade 6</option>
                                            <option value="Grade 7">Grade 7</option>
                                            <option value="Grade 8">Grade 8</option>
                                            <option value="Grade 9">Grade 9</option>
                                            <option value="Grade 10">Grade 10</option>
                                            <option value="Grade 11">Grade 11</option>
                                            <option value="Grade 12">Grade 12</option>
                                        </select>
                                        {errors.grade && (
                                            <p className="text-red-600 text-sm mt-1">{errors.grade}</p>
                                        )}
                                    </div>
                                    {(formData.grade === "Grade 11" ||
                                        formData.grade === "Grade 12") && (
                                            <div>
                                                <label
                                                    htmlFor="stream"
                                                    className="block text-sm font-medium text-black"
                                                >
                                                    Stream<b className="text-orange-600">*</b>
                                                </label>
                                                <select
                                                    id="stream"
                                                    name="stream"
                                                    value={formData.stream}
                                                    onChange={handleChange}
                                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                                                >
                                                    <option value="" disabled>
                                                        Select Your Stream
                                                    </option>
                                                    <option value="PCM">Science(PCM)</option>
                                                    <option value="PCB">Science(PCB)</option>
                                                    <option value="Arts">Arts</option>
                                                    <option value="Commerce">Commerce</option>
                                                </select>
                                            </div>
                                        )}

                                    <div className="relative mb-4">
                                        <label
                                            htmlFor="subject"
                                            className="block text-sm font-medium text-black"
                                        >
                                            Subject<b className="text-orange-600">*</b>
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                                        >
                                            <option value="" disabled>
                                                Select a subject
                                            </option>

                                            {/* For Grade 1 to 10 */}
                                            {(formData.grade === "Grade 1" ||
                                                formData.grade === "Grade 2" ||
                                                formData.grade === "Grade 3" ||
                                                formData.grade === "Grade 4" ||
                                                formData.grade === "Grade 5" ||
                                                formData.grade === "Grade 6" ||
                                                formData.grade === "Grade 7" ||
                                                formData.grade === "Grade 8" ||
                                                formData.grade === "Grade 9" ||
                                                formData.grade === "Grade 10") && (
                                                    <>
                                                        <option value="Mathematics">Mathematics</option>
                                                        <option value="Science">Science</option>
                                                        <option value="English">English</option>
                                                        <option value="Social Science">Social Science</option>
                                                        <option value="Computer Science">Computer Science</option>
                                                        <option value="Evs">EVS</option>
                                                        <option value="Hindi">Hindi</option>
                                                        <option value="Sanskrit">Sanskrit</option>
                                                    </>
                                                )}

                                            {/* For Grade 11 or 12 based on Stream */}
                                            {(formData.grade === "Grade 11" ||
                                                formData.grade === "Grade 12") &&
                                                formData.stream === "PCM" && (
                                                    <>
                                                        <option value="Mathematics">Mathematics</option>
                                                        <option value="Physics">Physics</option>
                                                        <option value="Chemistry">Chemistry</option>
                                                    </>
                                                )}

                                            {(formData.grade === "Grade 11" ||
                                                formData.grade === "Grade 12") &&
                                                formData.stream === "PCB" && (
                                                    <>
                                                        <option value="Biology">Biology</option>
                                                        <option value="Physics">Physics</option>
                                                        <option value="Chemistry">Chemistry</option>
                                                    </>
                                                )}

                                            {(formData.grade === "Grade 11" ||
                                                formData.grade === "Grade 12") &&
                                                formData.stream === "Arts" && (
                                                    <>
                                                        <option value="History">History</option>
                                                        <option value="Geography">Geography</option>
                                                        <option value="Political Science">
                                                            Political Science
                                                        </option>
                                                        <option value="Sociology">Sociology</option>
                                                        <option value="Psychology">Psychology</option>
                                                    </>
                                                )}

                                            {(formData.grade === "Grade 11" ||
                                                formData.grade === "Grade 12") &&
                                                formData.stream === "Commerce" && (
                                                    <>
                                                        <option value="Accountancy">Accountancy</option>
                                                        <option value="Economics">Economics</option>
                                                        <option value="Business Studies">
                                                            Business Studies
                                                        </option>
                                                    </>
                                                )}
                                        </select>
                                        {errors.subject && (
                                            <p className="text-red-600 text-sm mt-1">{errors.subject}</p>
                                        )}
                                    </div>
                                    {/* Preferred Date Input */}
                                    <span className="flex flex-col gap-1">
                                        <label htmlFor="date" className="block text-sm font-medium text-black">
                                            Preferred Date<b className="text-orange-600">*</b>
                                        </label>
                                        <input
                                            type="date"
                                            value={date}
                                            onChange={(e) => {
                                                setDate(e.target.value);
                                                validateTime(); // ✅ Call validateTime when date changes
                                            }}
                                            name="date"
                                            id="date"
                                            min={new Date().toISOString().split("T")[0]} // Restrict past dates
                                            className="border p-2 w-full border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
                                        />
                                        {errors.date && (
                                            <p className="text-red-500 text-sm mb-4">{errors.date}</p>
                                        )}
                                    </span>

                                    {/* Preferred Time Input */}
                                    <span className="flex flex-col gap-1">
                                        <label htmlFor="time" className="block text-sm font-medium text-black">
                                            Preferred Time<b className="text-orange-600">*</b>
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="time"
                                                value={time}
                                                onChange={handleTimeChange}
                                                onBlur={validateTime} // ✅ Keep onBlur for extra safety
                                                name="time"
                                                id="time"
                                                className="border p-2 w-full border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
                                            />
                                            <select
                                                value={timePeriod}
                                                onChange={(e) => setTimePeriod(e.target.value)}
                                                name="timePeriod"
                                                id="timePeriod"
                                                className="border p-2 border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600"
                                            >
                                                <option value="AM">AM</option>
                                                <option value="PM">PM</option>
                                            </select>
                                        </div>
                                        {errors.time && (
                                            <p className="text-red-500 text-sm mb-4">{errors.time}</p>
                                        )}
                                    </span>
                                    <div>
                                        {/* State Dropdown */}
                                        <div>
                                            <label
                                                htmlFor="state"
                                                className="block text-sm font-medium text-black"
                                            >
                                                State<b className="text-orange-600">*</b>
                                            </label>
                                            <select
                                                id="state"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleStateChange}
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                                            >
                                                <option value="">Select State</option>
                                                {states.map((state, index) => (
                                                    <option key={index} value={state}>
                                                        {state}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.state && (
                                                <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                                            )}
                                        </div>

                                        {/* City Dropdown */}
                                        <div className="relative my-4 ">
                                            <label
                                                htmlFor="city"
                                                className="block text-sm font-medium text-black"
                                            >
                                                City<b className="text-orange-600">*</b>
                                            </label>
                                            <select
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleCityChange}
                                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                                                disabled={!formData.state} // Disable city dropdown until a state is selected
                                            >
                                                <option value="">Select City</option>
                                                {cities.map((city, index) => (
                                                    <option key={index} value={city}>
                                                        {city}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.city && (
                                                <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                                            )}

                                        </div>
                                        <div className="relative mb-4">
                                            <label
                                                htmlFor="address"
                                                className="block text-sm font-medium text-black"
                                            >
                                                Full Address (including house number, street)
                                                <b className="text-orange-600">*</b>
                                            </label>
                                            <input
                                                type="text"
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                                name="address"
                                                id="address"
                                                placeholder="Enter your full address"
                                                className="border p-2 w-full border-gray-300 bg-white rounded-md focus:outline-none focus:border-orange-600 placeholder:text-gray-600 placeholder:text-[.9em]"
                                            />
                                            {errors.address && (
                                                <span className="text-red-500 text-sm mb-4">
                                                    {errors.address}
                                                </span>)}
                                        </div>
                                    </div>

                                    <div className="relative mb-6">
                                        <label
                                            htmlFor="educationBoard"
                                            className="block text-sm font-medium text-black"
                                        >
                                            Education Board
                                        </label>
                                        <select
                                            id="educationBoard"
                                            name="educationBoard"
                                            value={formData.educationBoard}
                                            onChange={handleChange}
                                            className="mt-1 block w-full px-5 py-3 border border-gray-300 rounded-md shadow-sm transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:text-sm"
                                        >
                                            <option value="">Select Education Board</option>
                                            {educationBoards.map((board, index) => (
                                                <option key={index} value={board}>
                                                    {board}
                                                </option>
                                            ))}
                                        </select>

                                    </div>

                                    <div>
                                        <p className="text-sm text-slate-600">* Required fields</p>
                                    </div>

                                    <button
                                        type="submit"

                                        className="w-full py-3 px-6 bg-orange-600 text-white font-semibold rounded-md shadow-md hover:bg-orange-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                                    >
                                        Submit
                                    </button>
                                </>
                            )}
                        </form>
                        {generalError && (
                            <div className="mb-2 mt-4 p-4 bg-red-100 text-red-800 border border-red-300 rounded-md">
                                {generalError}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer1 />
            <Footer />
        </>
    );
}

