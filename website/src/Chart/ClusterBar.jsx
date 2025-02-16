import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  collection,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../Firebase/firebaseConfig";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const db = getFirestore(app);

const ReportAnalytics = () => {
  const categories = [
    "fire accident",
    "street light",
    "potholes",
    "floods",
    "others",
    "fallen tree",
    "road accident",
  ];

  const [averages, setAverages] = useState({});
  const [dateFilter, setDateFilter] = useState("month");

  useEffect(() => {
    const getStartDate = () => {
      const now = new Date();
      switch (dateFilter) {
        case "today":
          now.setHours(0, 0, 0, 0);
          return now;
        case "week":
          const startOfWeek = new Date(
            now.setDate(now.getDate() - now.getDay())
          );
          startOfWeek.setHours(0, 0, 0, 0);
          return startOfWeek;
        case "month":
          now.setDate(1); // Set to the first day of the current month
          now.setHours(0, 0, 0, 0);
          return now;
        case "year":
          now.setMonth(0, 1); // Set to the first day of the current year
          now.setHours(0, 0, 0, 0);
          return now;
        default:
          return null; // All-time (no filter)
      }
    };

    const startDate = getStartDate();

    const unsubscribeFunctions = categories.map((category) => {
      let q = collection(db, `reports/${category}/reports`);

      if (startDate) {
        q = query(q, where("report_date", ">=", startDate.toISOString())); // Assuming 'created_at' field exists
      }

      return onSnapshot(q, (snapshot) => {
        let totalValidationTime = 0;
        let totalReviewTime = 0;
        let totalClosedTime = 0;
        let validationCount = 0;
        let reviewCount = 0;
        let closedCount = 0;

        const parseTimeToMinutes = (timeStr) => {
          if (!timeStr) return 0;
          const [hours, minutes] = timeStr.split(":").map(Number);
          return hours * 60 + minutes;
        };

        snapshot.forEach((doc) => {
          const report = doc.data();

          // Only include if the field exists
          if (report.validation_time) {
            totalValidationTime += parseTimeToMinutes(report.validation_time);
            validationCount++;
          }
          if (report.review_elapsed_time) {
            totalReviewTime += parseTimeToMinutes(report.review_elapsed_time);
            reviewCount++;
          }
          if (report.report_closed_time) {
            totalClosedTime += parseTimeToMinutes(report.report_closed_time);
            closedCount++;
          }
        });

        setAverages((prev) => ({
          ...prev,
          [category]: {
            avgValidationTime: validationCount
              ? totalValidationTime / validationCount / 60 // Convert minutes to hours
              : 0,
            avgReviewTime: reviewCount
              ? totalReviewTime / reviewCount / 60 // Convert minutes to hours
              : 0,
            avgClosedTime: closedCount
              ? totalClosedTime / closedCount / 60 // Convert minutes to hours
              : 0,
          },
        }));
      });
    });

    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  }, [dateFilter]); // Add dateFilter as a dependency here

  // Prepare chart data
  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Validation Time (hours)",
        data: categories.map(
          (category) => averages[category]?.avgValidationTime.toFixed(2) || 0
        ),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
      },
      {
        label: "Response Time (hours)",
        data: categories.map(
          (category) => averages[category]?.avgReviewTime.toFixed(2) || 0
        ),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
      {
        label: "Report Close Time (hours)",
        data: categories.map(
          (category) => averages[category]?.avgClosedTime.toFixed(2) || 0
        ),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Average Report Processing Times" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <h2 className="font-bold text-md text-main">
        Report Processing Time Analysis
      </h2>
      <div className="mb-4">
        <label htmlFor="dateFilter" className="mr-2 font-semibold text-sm">
          Select Date Filter:{" "}
        </label>
        <select
          id="dateFilter"
          onChange={(e) => setDateFilter(e.target.value)}
          value={dateFilter}
          className="p-1 border rounded-md text-xs border-main"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
          <option value="all">All Time</option>
        </select>
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default ReportAnalytics;
