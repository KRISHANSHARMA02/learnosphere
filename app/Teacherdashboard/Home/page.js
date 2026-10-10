"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import gif from "@/public/Teacher_gif_dashboard2.gif";
import {
  MdCurrencyRupee,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
 
import Aos from "aos";
import "aos/dist/aos.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { BsStopwatch } from "react-icons/bs";
import Money from "@/public/test.jpg";
import { RxCross1 } from "react-icons/rx";

import { useRouter } from "next/navigation";

import Link from "next/link";


const Home = () => {
  const { data: session, status } = useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todayTask, setTodayTask] = useState(false);
  const [active7, setActive7] = useState("Upcoming Class");
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingrequest, setBookingRequest] = useState(false);
  const [upcomingClass, setUpcomingClass] = useState(false);
  const [Upload, setUpload] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const calculateTimeRemaining = (bookingDate) => {
    const classDate = new Date(bookingDate);
    const now = new Date();
    const timeDiff = classDate - now;

    if (timeDiff > 0) {
      const hours = Math.floor(timeDiff / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

      return `${hours} hrs ${minutes} mins`;
    } else {
      return "Class has started or ended";
    }
  };

  useEffect(() => {
    Aos.init();
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < tasks.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handleViewMore = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const fetchBookings = async () => {
      if (profileData) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getAllRequests",
            {
              teacherId: profileData.RegistrationNumber,
              teacherEmail: profileData.email,
              teacherSubject: profileData.subject,
            }
          );
          setBookings(response.data);
        } catch (err) {
          setError(err.response?.data?.errors || "No bookings found");
        }
      }
    };

    fetchBookings();
  }, [profileData]);

  useEffect(() => {
    const fetchTeacherData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getTeacherByEmail",
            {
              gmail: session.user.email,
            }
          );
          setProfileData(response.data.data);
        } catch (error) {
          console.error("Error fetching teacher profile data:", error);
        }
      }
    };

    fetchTeacherData();
  }, [session, status]);
  const handleAcceptRequest = async (bookingId) => {
    if (!profileData) {
      setError("Teacher profile data is not available.");
      return;
    }

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/acceptBooking",
        {
          bookingId,
          teacherEmail: profileData.email,
          teacherDetails: {
            teacher_id: profileData.RegistrationNumber,
            name: profileData.name,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Booking Accepted",
        text: "The booking request has been accepted successfully!",
        confirmButtonText: "OK",
      });

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error(
        "Error accepting booking request:",
        error.response?.data.errors
      );
      setError("Could not accept the booking. Please try again.");
    }
  };
  const handleRejectRequest = async (bookingId) => {
    if (!profileData) {
      setError("Teacher profile data is not available.");
      return;
    }

    try {
      const response = await axios.post(
        "https://learnospherebackend.learnosphere.in/api/route/rejectBooking",
        {
          bookingId,
          teacherId: profileData.RegistrationNumber,
        }
      );

      Swal.fire({
        icon: "success",
        title: "Booking Rejected",
        text: "The booking request has been rejected successfully!",
        confirmButtonText: "OK",
      });

      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error(
        "Error rejecting booking request:",
        error.response?.data.errors
      );
      setError("Could not reject the booking. Please try again.");
    }
  };

  // Fetch tasks when the session is authenticated
  useEffect(() => {
    if (status === "authenticated") {
      const fetchTasks = async () => {
        try {
          const teacherEmail = session.user.email; // Teacher's email from session
          const response = await axios.get(
            `https://learnospherebackend.learnosphere.in/api/route/gettaskforteacher/${teacherEmail}`
          );
          setTasks(response.data);
        } catch (err) {
          setError("No Task Found");
        } finally {
          setLoading(false);
        }
      };

      fetchTasks();
    }
  }, [status, session]);

  const handleUpdateStatus = async (taskId) => {
    const currentTask = tasks.find((task) => task.id === taskId);
    const newStatus =
      currentTask.task_status === "pending" ? "completed" : "pending";

    try {
      const response = await axios.put(
        `https://learnospherebackend.learnosphere.in/api/route/updateTaskStatus/${taskId}`,
        {
          task_status: newStatus,
        }
      );
      // Update the local task state with the new status
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, task_status: newStatus } : task
        )
      );
      alert(response.data.message); // Display success message
    } catch (error) {
      console.error("Error updating task status:", error);
      setError("Failed to update task status");
    }
  };
  // Fetch upcoming classes when the session is authenticated
  useEffect(() => {
    const fetchClasses = async () => {
      if (status === "authenticated" && session?.user?.email) {
        const endpoint =
          "https://learnospherebackend.learnosphere.in/api/route/getbookingsforteacher";

        const params = new URLSearchParams();
        params.append("status", "upcoming"); // Only fetching upcoming classes
        params.append("teacherEmail", session.user.email);

        try {
          const response = await axios.get(endpoint, { params });

          if (response.status === 200) {
            setUpcomingClasses(response.data); // Set the upcoming classes state
          } else {
            throw new Error("Failed to fetch upcoming classes");
          }
        } catch (error) {
          console.error("Error fetching upcoming classes:", error);
          setError("Failed to fetch upcoming classes");
        }
      }
    };

    if (active7 === "Upcoming Class") {
      fetchClasses();
    }
  }, [active7, session, status]);

  const handleViewBookingRequest = () => {
   router.push("/Teacherdashboard/Booking/BookingRequests");
  };
  const handleViewAllUpcomingClass = () => {
    router.push("/Teacherdashboard/Booking");
  };
  const handleViewUploadContent = () => {
    router.push("/Teacherdashboard/UploadContent");
  };

  const handleSeeAll = () => {
    router.push("/Teacherdashboard/Booking/TodaysTask");
  };



  // Get the newest task (last task in the list)
  const newTask = tasks[tasks.length - 1];

  const UpcomingClass = () => (
    <div className="flex flex-col items-start w-full p-1 md:p-4 ">
      <div className="flex justify-between w-full">
        <h3 className="font-bold text-slate-700 text-[1.2em] md:text-[1.5em]">
          Upcoming Class
        </h3>
        <p
          className="bg-orange-50 hover:bg-orange-100 text-orange-500 cursor-pointer font-bold rounded-full p-2 text-[.8em]"
          onClick={handleViewAllUpcomingClass}
        >
          View All Request
        </p>
      </div>
      <div className="overflow-x-auto w-full">
        {upcomingClasses.length > 0 ? (
          <table className="min-w-full table-auto mt-4">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b bg-cyan-200 text-left text-sm text-gray-600">
                  Class Name
                </th>
                <th className="px-5 py-3 border-b bg-cyan-200 text-left text-sm text-gray-600">
                  Date & Time
                </th>
                <th className="px-5 py-3 border-b bg-cyan-200 text-left text-sm text-gray-600">
                  Subject
                </th>
                <th className="px-5 py-3 border-b bg-cyan-200 text-left text-sm text-gray-600">
                  Fee
                </th>
              </tr>
            </thead>
            <tbody>
              {upcomingClasses.slice(0, 2).map((classItem) => (
                <tr key={classItem.id}>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                    {classItem.name}
                  </td>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                    {classItem.date} at {classItem.time}
                  </td>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                    {classItem.subject}
                  </td>
                  <td className="px-5 py-5 border-b bg-white text-sm">
                    ₹{classItem.fees} /hr
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2>There are no upcoming classes</h2>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col md:flex-row gap-10 p-4 items-center justify-center border-b-2 border-gray-300">
        <div>
          <Image
            className="rounded-lg"
            src={gif}
            height={150}
            width={150}
            alt="Gif Of Teacher Dashboard"
          />
        </div>
        <div className="flex flex-col text-gray-700">
          <h2 className="text-[1.5em] md:text-[3em] text-center md:text-start font-bold">
            Welcome, {session?.user?.name || "Teacher"} 🎉
          </h2>
          <p className="text-[.8em] md:text-[1.2em] text-center md:text-start font-semibold">
            Ready to guide and inspire your personalized learning journey?
          </p>
        </div>
      </div>

      <div className="p-4 flex justify-between text-center ">
        <h3 className="text-[1.2em] md:text-[1.5em] font-bold text-slate-700 ">
          Today's Task
        </h3>
        <button
          className="bg-orange-50 hover:bg-orange-100 text-orange-500 font-bold rounded-full p-2 text-[.8em]"
          onClick={handleSeeAll}
        >
          View All Tasks
        </button>
      </div>

      {/* Tasks Section */}
      <div className="relative w-full border-b-2 border-gray-300 flex flex-col items-center">
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading tasks...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-10">{error}</p>
        ) : tasks.length > 0 ? (
          <div className="relative w-full flex  flex-col items-center">
            <div className="w-full relative flex justify-center items-center">
              {/* Task Card */}
              <div
                key={tasks[currentIndex].id}
                className="bg-white  rounded-lg p-2 md:p-6 shadow-2xl w-[80%] md:w-[60%] xl:w-[45%] h-auto xl:h-[30vh] flex flex-col justify-between items-start transform transition-transform duration-300"
                data-aos="fade-up"
              >
                <p
                  className="text-gray-600 overflow-hidden text-ellipsis"
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                  }}
                >
                  {tasks[currentIndex].task_description}
                </p>
                {tasks[currentIndex].task_description.length > 100 && (
                  <button
                    onClick={handleViewMore}
                    className="text-orange-500 mt-2 underline hover:text-blue-700"
                  >
                    View More
                  </button>
                )}
                {tasks.is_default ? <span>(Default Task)</span> : <span></span>}
                <div className="flex w-full gap-3">
  {/* Existing button to mark as completed or pending */}
  <button
    onClick={() => handleUpdateStatus(tasks[currentIndex].id)}
    className={`mt-4 mb-4 text-white font-bold py-2 px-4 rounded w-full ${
      tasks[currentIndex].task_status === "pending"
        ? "bg-red-500 hover:bg-red-600"
        : "bg-green-500 hover:bg-green-600"
    }`}
  >
    Mark as{" "}
    {tasks[currentIndex].task_status === "pending" ? "Completed" : "Pending"}
  </button>

  {/* Conditional button for uploading, only visible if task is "pending" */}
  {tasks[currentIndex].task_status === "pending" && (
    <Link href = "/Teacherdashboard/UploadContent"
      onClick={() => handleUpload(tasks[currentIndex].id)} // Handle upload logic here
      className="mt-4 mb-4 bg-blue-500  hover:bg-blue-600 text-center text-white font-bold py-2 px-4 rounded w-full"
    >
      Upload Task
    </Link>
  )}
</div>

              
                <p className="text-orange-600 font-bold mt-4 absolute text-[.8em]  bottom-1 right-2">
                  Issued at:{" "}
                  {new Date(
                    tasks[currentIndex].created_at
                  ).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between w-full mt-6 px-2 md:px-10">
              <button
                onClick={() => {
                  handlePrev();
                  Aos.refresh();
                }}
                className="bg-orange-100 hover:bg-orange-200 absolute left-0 md:left-10 top-20 text-orange-600 font-bold py-2 px-4 rounded-full disabled:opacity-50"
                disabled={currentIndex === 0}
              >
                <FaAngleLeft size={25} />
              </button>
              <button
                onClick={() => {
                  handleNext();
                  Aos.refresh();
                }}
                className="bg-orange-100 hover:bg-orange-200 absolute right-0 md:right-10 top-20  text-orange-600 font-bold py-2 px-4 rounded-full disabled:opacity-50"
                disabled={currentIndex === tasks.length - 1}
              >
                <FaAngleRight size={25} />
              </button>
            </div>

            {/* Modal for Full Description */}
            {isModalOpen && (
              <div className="fixed inset-0 bg-black p-8 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 relative shadow-lg w-full overflow-y-auto scrollbar-hide h-auto md:w-[70%] ">
                  <h2 className="text-lg font-bold mb-4">Task Details</h2>
                  <p className="text-gray-700 mb-6">
                    {tasks[currentIndex].task_description}
                  </p>
                  <button
                    onClick={closeModal}
                    className="bg-red-500 hover:bg-red-600 text-white absolute top-2 right-2 font-bold py-2 px-2 rounded-full"
                  >
                    <RxCross1 size={15} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">No tasks available.</p>
        )}
      </div>
      <div className="p-1 md:p-4 border-b-2 border-gray-300 mt-4 mb-4">
        <div className="overflow-x-auto  mt-4">
          {bookings.length > 0 ? (
            <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex justify-between">
                <h3 className="font-bold text-[1.2em] md:text-[1.5em] text-slate-700">
                  Pending Request
                </h3>
                <p
                  className="bg-orange-50 hover:bg-orange-100 cursor-pointer text-orange-500 font-bold rounded-full p-2 text-[.8em]"
                  onClick={handleViewBookingRequest}
                >
                  View All Request
                </p>
              </div>
              {bookings
                .sort(
                  (a, b) => new Date(b.issuedDate) - new Date(a.issuedDate) // Sort by issue date
                )
                .slice(0, 3) // Show the top 3 most recent issue dates
                .map((booking) => (
                  <div
                    key={booking.id}
                    className="bg-gradient-to-r relative  from-blue-50 to-cyan-50 shadow-lg rounded-xl p-6 border border-gray-300 hover:shadow-2xl transition duration-300"
                  >
                    <div className="mb-4 mt-3">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {booking.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {booking.grade} Grade
                      </p>
                    </div>
                    <div className="mb-4">
                      <p className="flex items-center text-sm text-gray-700">
                        <span className="font-semibold mr-2">Date:</span>{" "}
                        {booking.date}
                      </p>
                      <p className="flex items-center text-sm text-gray-700">
                        <span className="font-semibold mr-2">Time:</span>{" "}
                        {booking.time} {booking.timePeriod}
                      </p>
                      <p className="flex items-center text-sm text-gray-700">
                        <span className="font-semibold mr-2">Subject:</span>{" "}
                        {booking.subject}
                      </p>
                      {/* Add the created_at field here */}
                      <p className="flex items-center absolute  bottom-2 mt-4 text-[.8em] right-2 text-gray-700">
                        <span className="font-semibold   mr-2">
                          Request Date:
                        </span>
                        {new Date(booking.created_at).toLocaleString()}{" "}
                        {/* Format the created_at */}
                      </p>
                    </div>
                    <div className="mb-6">
                      <p className="flex items-center text-gray-800 text-lg font-bold">
                        <MdCurrencyRupee
                          size={20}
                          className="inline-block text-cyan-600 mr-1"
                        />
                        {booking.fees} /hr
                      </p>
                    </div>
                    <div>
                      <p className="flex items-center absolute top-2 right-2 text-[.8em] text-gray-700">
                        <span className="font-semibold mr-2">
                          <BsStopwatch size={20} />
                        </span>
                        {calculateTimeRemaining(booking.date)}
                      </p>
                    </div>
                    <div className="flex justify-between mb-4 gap-4">
                      <button
                        className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 shadow-md"
                        onClick={() => handleAcceptRequest(booking.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 shadow-md"
                        onClick={() => handleRejectRequest(booking.id)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              <h2 className="font-extrabold border-2 border-purple-500 p-1 md:p-4 mt-2 md:mt-14 rounded-lg  text-center  w-ful md:w-[70%] m-auto  text-lg md:text-2xl   bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent  from-purple-600 to-red-600">
                Turn Your Knowledge into Earnings and Rewards!
              </h2>
              <div className="col-span-full flex flex-col md:flex-row gap-8 mb-10 mt-4   font-bold  p-2 md:p-8 rounded-lg  ">
                <div>
                  <Image
                    src={Money}
                    height={160}
                    width={300}
                    alt="Earn Money"
                    className="rounded-xl shadow-xl"
                  />
                </div>
                <div className="flex flex-col gap-2 w-full md:w-[60%]">
                  <h2 className="text-black text-[1.2em] md:text-[1.5em]">
                    Earn Money and Get Exciting Rewards
                  </h2>
                  <p className="text-gray-600 text-[.8em] md:text-[.9em] font-semibold">
                    Earn money by uploading your study notes, sharing
                    educational videos, and teaching others. The more you
                    contribute, the more you can earn—unlock cash rewards, gift
                    cards, and exclusive offers! Start now and turn your
                    knowledge into exciting opportunities. Plus, you can boost
                    your earnings by referring friends and completing special
                    tasks. The platform is easy to use, and you can track your
                    progress in real-time. Don’t wait—begin your journey to
                    earning today!
                  </p>

                  <button
                    onClick={handleViewUploadContent}
                    className=" bg-gradient-to-r w-full md:w-[40%] mt-4 from-purple-500 to-red-500 text-white p-2 rounded-lg font-bold"
                  >
                    Upload Study Material
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Classes Section */}
      <UpcomingClass />

    </div>
  );
};

export default Home;
