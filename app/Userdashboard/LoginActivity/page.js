"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import axios from "axios";
import { format } from "date-fns";

// Dynamically import ApexCharts
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const StudentLoginActivity = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: "login-activity-chart",
      type: "line",
      animations: { enabled: true, easing: "easeinout", speed: 800 },
      toolbar: { show: false },
    },
    xaxis: {
      categories: [],
      labels: {
        style: { colors: "#333", fontSize: "12px" },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => val,
      style: {
        colors: ["#FFA500"],
        fontSize: "10px",
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    markers: {
      size: 5,
      colors: ["#FF6347"],
    },
    colors: ["#FFA500"],
  });

  const [chartSeries, setChartSeries] = useState([
    { name: "Logins", data: [] },
  ]);
  const [loginData, setLoginData] = useState([]);
  const [loginSummary, setLoginSummary] = useState({
    totalLogins: 0,
    lastLogin: "N/A",
    activeDays: [],
  });
  const { data: session, status } = useSession();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchLoginData = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const studentResponse = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/getStudentByEmail",
            { gmail: session.user.email }
          );

          const registrationNumber = studentResponse.data.registrationNumber;

          const loginDataResponse = await axios.post(
            "https://learnospherebackend.learnosphere.in/api/route/show-login-activity-student",
            { registrationNumber }
          );

          // Process device_info to extract device name and version
          const processedLoginData = loginDataResponse.data.data.map(
            (entry) => {
              let deviceName = "Unknown Device";
              let deviceVersion = "Unknown Version";
              try {
                if (entry.device_info && entry.device_info !== "{}") {
                  // Check if device_info is already an object, and skip parsing if it is
                  const deviceInfo =
                    typeof entry.device_info === "string"
                      ? JSON.parse(entry.device_info)
                      : entry.device_info;

                  if (deviceInfo.osInfo) {
                    deviceName = deviceInfo.osInfo.name || "Unknown Device";
                    deviceVersion =
                      deviceInfo.osInfo.version || "Unknown Version";
                  }
                }
              } catch (error) {
                console.error("Error parsing device_info:", error);
              }
              return { ...entry, deviceName, deviceVersion };
            }
          );

          setLoginData(processedLoginData);
        } catch (error) {
          console.error("Error fetching login data:", error);
          // Optionally set some error state
        }
      }
    };

    fetchLoginData();
  }, [session, status]);

  useEffect(() => {
    if (Array.isArray(loginData) && loginData.length > 0) {
      let filteredDataForGraph = loginData;
      let filteredDataForCount = loginData;

      if (fromDate && toDate) {
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);

        filteredDataForGraph = loginData.filter((entry) => {
          const entryDate = new Date(entry.created_at);
          return entryDate >= startDate && entryDate <= endDate;
        });

        filteredDataForCount = loginData.filter((entry) => {
          const entryDate = new Date(entry.created_at);
          return entryDate >= startDate && entryDate <= endDate;
        });
      }

      const groupedByDate = filteredDataForGraph.reduce((acc, entry) => {
        const date = format(new Date(entry.created_at), "yyyy-MM-dd");
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      }, {});

      const dates = Object.keys(groupedByDate).sort();
      const logins = Object.values(groupedByDate);

      let cumulativeLogins = [];
      let cumulativeCount = 0;
      logins.forEach((count) => {
        cumulativeCount += count;
        cumulativeLogins.push(cumulativeCount);
      });

      const allDatesInRange = [];
      let currentDate = new Date(fromDate);
      while (currentDate <= new Date(toDate)) {
        allDatesInRange.push(format(currentDate, "yyyy-MM-dd"));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      allDatesInRange.forEach((date) => {
        if (!groupedByDate[date]) {
          groupedByDate[date] = 0;
        }
      });

      const finalDates = Object.keys(groupedByDate).sort();
      const finalLogins = finalDates.map((date) => groupedByDate[date]);

      cumulativeLogins = [];
      cumulativeCount = 0;
      finalLogins.forEach((count) => {
        cumulativeCount += count;
        cumulativeLogins.push(cumulativeCount);
      });

      setChartOptions((prev) => ({
        ...prev,
        xaxis: { ...prev.xaxis, categories: finalDates },
      }));

      setChartSeries([
        { name: "Logins", data: finalLogins },
        { name: "Cumulative Logins", data: cumulativeLogins },
      ]);

      const totalLogins = filteredDataForCount.length;
      const lastLogin = filteredDataForGraph.length
        ? format(
            new Date(
              filteredDataForGraph[filteredDataForGraph.length - 1].created_at
            ),
            "dd MMM yyyy HH:mm"
          )
        : "N/A";

      // Calculate distinct active days
      const activeDaysSet = new Set(
        filteredDataForGraph.map((entry) =>
          format(new Date(entry.created_at), "yyyy-MM-dd")
        )
      );

      const activeDays = Array.from(activeDaysSet);

      setLoginSummary({
        totalLogins,
        lastLogin,
        activeDays,
      });
    }
  }, [loginData, fromDate, toDate]);

  const handleFromDateChange = (e) => {
    setFromDate(e.target.value);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-orange-500 mb-6"
      >
        Login Activity Dashboard
      </motion.h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-4 rounded bg-white shadow-lg">
          <h3 className="text-lg font-medium text-gray-700">Total Logins</h3>
          <p className="text-xl font-bold text-gray-800">
            {loginSummary.totalLogins}
          </p>
        </div>
        <div className="p-4 rounded bg-white shadow-lg">
          <h3 className="text-lg font-medium text-gray-700">Last Login</h3>
          <p className="text-xl font-bold text-gray-800">
            {loginSummary.lastLogin}
          </p>
        </div>
        <div className="p-4 rounded bg-white shadow-lg">
          <h3 className="text-lg font-medium text-gray-700">Active Days</h3>
          <p className="text-xl font-bold text-gray-800">
            {loginSummary.activeDays.length}
          </p>
        </div>
      </div>

      {/* Graph */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mt-6">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="line"
          height={350}
        />
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 mt-6 flex-wrap">
        <div className="flex flex-col">
          <label
            htmlFor="fromDatePicker"
            className="text-gray-600 font-medium mb-2"
          >
            From Date
          </label>
          <input
            id="fromDatePicker"
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            value={fromDate}
            onChange={handleFromDateChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="toDatePicker"
            className="text-gray-600 font-medium mb-2"
          >
            To Date
          </label>
          <input
            id="toDatePicker"
            type="date"
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            value={toDate}
            onChange={handleToDateChange}
          />
        </div>
      </div>

      {/* Activity Table */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-4xl overflow-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Detailed Login History
        </h3>
        <table className="w-full text-left table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2">Date</th>
              <th className="border-b p-2">Login Time</th>
              <th className="border-b p-2">Device</th>
              {/* <th className="border-b p-2">IP Address</th> */}
            </tr>
          </thead>
          <tbody>
            {loginData
              .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sort by latest created_at
              .map((entry, index) => (
                <tr key={index}>
                  <td className="border-b p-2">
                    {format(new Date(entry.created_at), "dd MMM yyyy")}
                  </td>
                  <td className="border-b p-2">
                    {format(new Date(entry.created_at), "HH:mm")}
                  </td>
                  <td className="border-b p-2">
                    {entry.deviceName} - {entry.deviceVersion}
                  </td>
                  {/* <td className="border-b p-2">{entry.ip_address}</td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default StudentLoginActivity;
