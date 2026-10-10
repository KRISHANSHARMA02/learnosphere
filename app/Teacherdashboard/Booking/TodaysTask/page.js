"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";


const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Check if session is loaded and user is authenticated
    if (status === "authenticated") {
      const fetchTasks = async () => {
        try {
          const teacherEmail = session.user.email; // Get the teacher's email from session
          const response = await axios.get(
            `https://learnospherebackend.learnosphere.in/api/route/gettaskforteacher/${teacherEmail}`
          );
          setTasks(response.data);
          setLoading(false);
        } catch (err) {
          setError("No Task Found");
          setLoading(false);
        }
      };

      fetchTasks();
    }
  }, [status, session]);

  // Function to update task status
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

  if (loading) return <div>Loading tasks...</div>;
  if (error)
    return (
      <div className="flex items-center justify-center h-[20vh] bg-blue-50 shadow-lg rounded-xl p-4 font-bold font-Poppins text-blue-700 text-2xl">
        {error}
      </div>
    );

  return (
    <>
      <div className="container mx-auto px-4 sm:px-8 h-screen">
        <Head>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="py-8">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold leading-tight">Task List</h2>
          </div>
          <div className="mt-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Task Description
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Deadline
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {task.task_description}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {new Date(task.task_deadline).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <span
                          className={`relative inline-block px-3 py-1 font-semibold leading-tight ${
                            task.task_status === "completed"
                              ? "text-green-900"
                              : "text-yellow-900"
                          }`}
                        >
                          <span
                            aria-hidden="true"
                            className={`absolute inset-0 ${
                              task.task_status === "completed"
                                ? "bg-green-200"
                                : "bg-yellow-200"
                            } opacity-50 rounded-full`}
                          ></span>
                          <span className="relative">
                            {task.task_status.charAt(0).toUpperCase() +
                              task.task_status.slice(1)}
                          </span>
                        </span>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleUpdateStatus(task.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Mark as{" "}
                          {task.task_status === "pending"
                            ? "Completed"
                            : "Pending"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default TaskTable;
