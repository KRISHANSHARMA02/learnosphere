"use client";
import { WEB_BACKEND_URL } from "@/src/helper/webbackend_api";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { LiaComments } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import { BsTrash } from "react-icons/bs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import TrashBin from "@/public/Trashbin_animate.gif";
import axios from "axios";
import { formatDistanceToNow, format, set } from "date-fns"; // Import date-fns for time formatting
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs"; // For success icon
import { ImBlocked } from "react-icons/im";
import { RiQuestionnaireLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import QueryMsgAnime from "@/public/QueryMsg.gif";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [deletedNotifications, setDeletedNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState("All");
  const [showTrash, setShowTrash] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState([]); // Track selected notifications
  const [successMessage, setSuccessMessage] = useState("");
  const [showQueryMessage, setShowQueryMessage] = useState(false);
  const [showQueries, setShowQueries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const { data: session } = useSession();

  // Function to show success message
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000); // Clear message after 3 seconds
  };

  // Helper function to format the notification time
  const formatNotificationTime = (timestamp) => {
    const now = new Date();
    const notificationDate = new Date(timestamp);
    const distance = formatDistanceToNow(notificationDate, { addSuffix: true });

    if (new Date() - notificationDate > 3 * 24 * 60 * 60 * 1000) {
      // If older than 3 days, show the exact date
      return format(notificationDate, "dd MMM yyyy, HH:mm");
    }

    return distance;
  };

  // Fetch notifications from the backend
  useEffect(() => {
    const fetchNotifications = async () => {
      if (!session?.user?.email) return;
      const teacherEmail = session.user.email;

      try {
        const response = await axios.get(
          `${WEB_BACKEND_URL}/api/route/getTeacherNotifications`,
          {
            params: { filter: activeTab.toLowerCase(), teacherEmail },
          }
        );
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (!showTrash) fetchNotifications();
  }, [activeTab, session?.user?.email, showTrash]);

  useEffect(() => {
    const fetchQueries = async () => {
      if (!session?.user?.email) return;
      setLoading(true);
      const teacherEmail = session.user.email;

      try {
        const response = await axios.post(
          `${WEB_BACKEND_URL}/api/route/getTeacherQueryData`,
          { gmail: teacherEmail }
        );

        // Safely handle the API response to ensure it sets an array
        const queries = Array.isArray(response.data) ? response.data : [];

        setShowQueries(queries); // Ensure showQueries is always an array
      } catch (error) {
        console.error("Error fetching queries:", error);
        setShowQueries([]); // Set an empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (showQueryMessage) fetchQueries();
  }, [showQueryMessage, session?.user?.email]);

  // Mark notification as read when clicked
  const handleNotificationClick = async (notificationId) => {
    try {
      await axios.post(
        `${WEB_BACKEND_URL}/api/route/markasReadTeacherNotifications`,
        { notificationId }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Delete notification
  const deleteNotification = async (notificationId) => {
    try {
      // Mark as read before deleting
      await handleNotificationClick(notificationId);

      // Proceed to delete
      await axios.post(
        `${WEB_BACKEND_URL}/api/route/moveToTrashTeacherNotifications`,
        { notificationId }
      );

      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

      // Show success message
      showSuccessMessage("Notification moved into trash bin successfully");
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Delete selected notifications
  const deleteSelectedNotifications = async () => {
    try {
      // Mark all selected notifications as read
      await Promise.all(
        selectedNotifications.map((notificationId) =>
          handleNotificationClick(notificationId)
        )
      );

      // Proceed to delete
      await axios.post(
        `${WEB_BACKEND_URL}/api/route/deleteSelectedTeacherNotifications`,
        { notificationIds: selectedNotifications }
      );

      setNotifications((prev) =>
        prev.filter((n) => !selectedNotifications.includes(n.id))
      );
      showSuccessMessage("Notifications moved into trash bin successfully");
      setSelectedNotifications([]);
      setSelectAll(false);
    } catch (error) {
      console.error("Error deleting selected notifications:", error);
    }
  };

  useEffect(() => {
    if (showTrash) {
      const fetchDeletedNotifications = async () => {
        try {
          const teacherEmail = session?.user?.email;
          const response = await axios.get(
            `${WEB_BACKEND_URL}/api/route/getTrashTeacherNotifications`,
            {
              params: { teacherEmail },
            }
          );
          setDeletedNotifications(response.data.notifications);
        } catch (error) {
          console.error("Error fetching deleted notifications:", error);
        }
      };
      fetchDeletedNotifications();
    }
  }, [showTrash, session?.user?.email]);

  // Handle selecting/deselecting individual notifications
  const handleSelectNotification = (notificationId) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId)
        ? prev.filter((id) => id !== notificationId)
        : [...prev, notificationId]
    );
  };

  const filteredNotifications = () => {
    if (activeTab === "Unread") {
      return notifications.filter((n) => !n.is_read);
    } else if (activeTab === "Read") {
      return notifications.filter((n) => n.is_read);
    }
    return notifications;
  };

  return (
    <div className="p-4 font-Poppins w-full h-screen">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex justify-between items-center mb-4 flex-wrap border-b-2 border-gray-200 pb-2">
        <div className="relative">
          {/* For larger screens */}
          <div className="hidden md:flex gap-2 md:gap-4">
            <button
              className={`px-4 py-2 rounded-full font-semibold ${
                activeTab === "All"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => {
                setActiveTab("All");
                setShowTrash(false);
                setShowQueryMessage(false);
              }}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold ${
                activeTab === "Unread"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => {
                setActiveTab("Unread");
                setShowTrash(false);
                setShowQueryMessage(false);
              }}
            >
              Unread
            </button>
            <button
              className={`px-4 py-2 rounded-full font-semibold ${
                activeTab === "Read"
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => {
                setActiveTab("Read");
                setShowTrash(false);
                setShowQueryMessage(false);
              }}
            >
              Read
            </button>
          </div>

          {/* For smaller screens */}
          <div className="md:hidden">
            <Menu as="div" className="relative inline-block text-center z-30">
              <MenuButton className="inline-flex w-full justify-center items-center gap-2 rounded-md border border-gray-300 bg-gray-200 px-4 py-2 font-semibold text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500">
                {activeTab} <MdOutlineKeyboardArrowDown size={20} />
              </MenuButton>

              <MenuItems className="absolute right-0 left-1 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    {({ selected }) => (
                      <button
                        className={`${
                          selected
                            ? "bg-orange-100 text-orange-500"
                            : "text-gray-700"
                        } block w-full px-4 py-2 text-left`}
                        onClick={() => {
                          setActiveTab("All");
                          setShowTrash(false);
                          setShowQueryMessage(false);
                        }}
                      >
                        All
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ selected }) => (
                      <button
                        className={`${
                          selected
                            ? "bg-orange-100 text-orange-500"
                            : "text-gray-700"
                        } block w-full px-4 py-2 text-left`}
                        onClick={() => {
                          setActiveTab("Unread");
                          setShowTrash(false);
                          setShowQueryMessage(false);
                        }}
                      >
                        Unread
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ selected }) => (
                      <button
                        className={`${
                          selected
                            ? "bg-orange-100 text-orange-500"
                            : "text-gray-700"
                        } block w-full px-4 py-2 text-left`}
                        onClick={() => {
                          setActiveTab("Read");
                          setShowTrash(false);
                          setShowQueryMessage(false);
                        }}
                      >
                        Read
                      </button>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className={`flex items-center gap-2 font-Poppins py-1 px-2 rounded-lg border border-gray-200 
              ${showQueryMessage ? "bg-orange-400 shadow-lg" : "bg-white"}`}
            onClick={() => {
              setShowQueryMessage(true);
              setShowTrash(false);
              setActiveTab("");
            }}
          >
            <Image
              src={QueryMsgAnime} // Replace with the actual path to your GIF
              alt="Query Icon"
              width={40} // Adjust the width as needed
              height={40} // Adjust the height as needed
              className="h-10 w-10" // Additional styling if needed
            />
          </button>
          <button
            className={`flex items-center gap-2 font-Poppins py-2 px-4 rounded-lg ${
              showTrash
                ? "bg-orange-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-red-500"
            }`}
            onClick={() => {
              setShowTrash(true);
              setShowQueryMessage(false);
              setActiveTab("");
            }}
          >
            <BsTrash size={24} />
            <span className="text-sm font-medium hidden md:block">Bin</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-2">
        {/* Info Message about automatic deletion */}
        {showTrash && (
          <div className="bg-gray-100 text-blue-800 p-4 rounded-md mb-8 flex items-center space-x-4">
            <div className="flex-shrink-0">
              <AiOutlineInfoCircle className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-sm">
              <strong>Notice:</strong> Notifications in Trash for more than{" "}
              <strong>30 days</strong> will be automatically deleted.
            </p>
          </div>
        )}

        {/* Main Notification Section */}
        <div className="max-h-[70vh] md:max-h-[90vh] overflow-y-auto relative">
          {/* Show Query Message Only */}
          {showQueryMessage && (
            <div>
              {loading && <p className="text-gray-500">Loading queries...</p>}
              {showQueries.length > 0 ? (
                <div className="space-y-4">
                  {showQueries.map((query) => (
                    <div
                      key={query.id}
                      className="flex items-center justify-between p-4 bg-gray-100 rounded-md shadow hover:shadow-md cursor-pointer"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          <span className="font-bold">Q.</span> {query.message}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(query.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {query.status === "new" ? (
                        <span className="text-yellow-600 text-[10px] md:text-sm font-semibold">
                          Pending..
                        </span>
                      ) : (
                        <button
                          className="text-green-500 bg-white border border-green-500 hover:shadow-lg hover:border-none hover:text-white hover:bg-green-500 px-2 md:px-3 py-1 md:py-2 font-semibold text-[8px] md:text-sm rounded-lg"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuery(query); // Replace with your actual function
                          }}
                        >
                          Show Answer
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600">
                  <LiaComments className="text-orange-500 mx-auto" size={100} />
                  <p className="font-bold text-xl mt-2">No Queries Found!</p>
                </div>
              )}
            </div>
          )}

          {/* Main Notifications (Hide if Query Message is Shown) */}
          {!showQueryMessage &&
            (showTrash ? (
              deletedNotifications.length > 0 ? (
                <div className="space-y-4">
                  {deletedNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="relative flex items-center p-3 bg-gray-100 rounded-md shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        {notification.type === "alert" && (
                          <ImBlocked className="text-red-500 h-5 w-5 font-bold" />
                        )}
                        {notification.type === "success" && (
                          <BsCheckCircle className="text-green-500 h-5 w-5 font-bold" />
                        )}
                        <p className="text-sm font-medium text-gray-700 ml-3">
                          {notification.message}
                        </p>
                      </div>
                      <span className="absolute bottom-1 right-2 text-xs text-slate-800">
                        {formatNotificationTime(notification.created_at)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600">
                  <div className="flex flex-col items-center">
                    <Image
                      src={TrashBin}
                      alt="No notifications"
                      width={150}
                      height={150}
                      className="mb-4"
                    />
                    <p className="font-bold text-xl mt-2">
                      No Deleted Notifications!
                    </p>
                  </div>
                </div>
              )
            ) : filteredNotifications().length > 0 ? (
              <div>
                {selectedNotifications.length > 0 && (
                  <button
                    onClick={deleteSelectedNotifications}
                    className="bg-white border border-red-500 text-red-500 p-2 rounded-full text-sm mb-4"
                  >
                    Delete Selected
                  </button>
                )}
                <div className="space-y-4">
                  {filteredNotifications().map((notification) => (
                    <div
                      key={notification.id}
                      className={`relative flex justify-between items-center p-3 rounded-md shadow-md hover:shadow-lg cursor-pointer ${
                        notification.is_read ? "bg-gray-100" : "bg-blue-100"
                      }`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.includes(
                            notification.id
                          )}
                          onChange={() =>
                            handleSelectNotification(notification.id)
                          }
                          className="mr-2"
                        />
                        {notification.type === "alert" && (
                          <ImBlocked className="text-red-500 font-bold h-10 w-10 md:h-5 md:w-5" />
                        )}
                        {notification.type === "success" && (
                          <BsCheckCircle className="text-green-500 h-10 w-10 md:h-5 md:w-5 font-bold" />
                        )}
                        <p
                          className={`text-sm font-medium ${
                            notification.is_read
                              ? "text-gray-500"
                              : "text-gray-900 font-bold"
                          }`}
                        >
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="absolute top-1 right-2 text-gray-400 hover:text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notification.id);
                          }}
                        >
                          <RxCross2 size={24} />
                        </button>
                        <span className="absolute bottom-0 right-2 text-xs text-slate-800">
                          {formatNotificationTime(notification.created_at)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-600">
                <LiaComments className="text-orange-500 mx-auto" size={100} />
                <p className="font-bold text-xl mt-2">
                  No Notifications Found!
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Popup Modal for Selected Query */}
      {selectedQuery && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative m-2">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              onClick={() => setSelectedQuery(null)}
            >
              <RxCross2 size={24} />
            </button>
            <h2 className="text-xl font-bold mb-4">Query Details</h2>

            <p className="mb-2">
              <strong>Query: </strong> {selectedQuery.message}
            </p>
            <p className="mb-2">
              <strong>Reply: </strong>
              {selectedQuery.reply}
            </p>
            <p className="mt-4 text-end text-gray-500 text-[11px]">
              Replied At:  
              {selectedQuery.replied_at
                ? new Date(selectedQuery.replied_at).toLocaleString()
                : "Not Replied"}
            </p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default Notification;
