"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { FaTasks, FaCheckCircle } from "react-icons/fa";
import TeacherAppBanner from "@/components/TeacherAppBanner";

const TaskTable = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      const fetchTasks = async () => {
        try {
          const teacherEmail = session.user.email;
          const response = await axios.get(
            `https://learnospherebackend.learnosphere.in/api/route/gettaskforteacher/${teacherEmail}`
          );
          if (Array.isArray(response.data)) {
            setTasks(response.data);
          } else {
            setTasks([]);
          }
        } catch (err) {
          setError("No Task Found");
          setTasks([]);
        } finally {
          setLoading(false);
        }
      };

      fetchTasks();
    }
  }, [status, session]);

  const handleUpdateStatus = async (taskId) => {
    const currentTask = tasks.find((task) => task.id === taskId);
    if (!currentTask) return;
    const newStatus =
      currentTask.task_status === "pending" ? "completed" : "pending";

    try {
      const response = await axios.put(
        `https://learnospherebackend.learnosphere.in/api/route/updateTaskStatus/${taskId}`,
        {
          task_status: newStatus,
        }
      );
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, task_status: newStatus } : task
        )
      );
      alert(response.data.message || "Task updated successfully!");
    } catch (err) {
      console.error("Error updating task status:", err);
      setError("Failed to update task status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-slate-400">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-8 font-sans antialiased min-h-screen">
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex justify-between items-center bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
            <FaTasks size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Educator Task Board
            </h1>
            <p className="text-xs text-slate-500">
              Manage assigned syllabus tasks, content uploads, and milestone verification
            </p>
          </div>
        </div>
        <span className="px-3.5 py-1 bg-slate-100 text-slate-700 font-bold text-xs rounded-full">
          {tasks.length} Assigned
        </span>
      </div>

      {tasks.length > 0 ? (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-100">
              <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-left">
                <tr>
                  <th className="px-6 py-4">Task Description</th>
                  <th className="px-6 py-4">Deadline</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800 max-w-md">
                      {task.task_description}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(task.task_deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          task.task_status === "completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {task.task_status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleUpdateStatus(task.id)}
                        className={`py-2 px-4 rounded-xl text-xs font-bold text-white transition-all shadow-sm ${
                          task.task_status === "pending"
                            ? "bg-green-600 hover:bg-green-700"
                            : "bg-slate-600 hover:bg-slate-700"
                        }`}
                      >
                        {task.task_status === "pending" ? "Mark Done" : "Reopen"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <TeacherAppBanner
          title="Daily Educator Tasks & Missions Live on the Tutor App!"
          subtitle="All website tasks are currently up to date! Real-time student doubt-solving bounties, daily teaching missions, and extra cash rewards are updated daily on the Learnosphere Tutor Mobile App."
          badge="⚡ ZERO PENDING TASKS"
        />
      )}
    </div>
  );
};

export default TaskTable;
