import React, { useEffect, useState } from "react";
import { onSnapshot, collection, getFirestore } from "firebase/firestore";
import { Line } from "react-chartjs-2";
import { app } from "../Firebase/firebaseConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

const db = getFirestore(app);

// Register the necessary components from Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ReportTrends = () => {
  const [reports, setReports] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [], // Date labels (e.g., "2024-12-04", "2024-12-05", ...)
    datasets: [], // Dataset for the number of reports created on each date
  });

  const userId = localStorage.getItem("user_id"); // Get the current user ID from localStorage
  console.log("userId", userId);

  // Fetch reports from Firestore
  const fetchDocuments = async () => {
    const categories = [
      "fires",
      "street lights",
      "potholes",
      "floods",
      "others",
      "road accident",
    ];
    const unsubscribeFunctions = categories.map((category) => {
      return onSnapshot(
        collection(db, `reports/${category}/reports`),
        (snapshot) => {
          const updateReports = snapshot.docs
            .map((doc) => ({
              ...doc.data(),
              id: doc.id, // Track unique document ID
            }))
            .filter((report) => report.assigned_to_id == userId); // Filter reports by assigned_to_id

          setReports((prevReports) => {
            // Avoid duplicate reports by using the document ID
            const newReports = updateReports.filter(
              (newReport) =>
                !prevReports.some((report) => report.id === newReport.id)
            );
            return [...prevReports, ...newReports]; // Add only new reports
          });
        }
      );
    });

    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (reports.length > 0) {
      const reportCounts = {}; // To store the count of reports for each date

      // Count the number of reports for each day
      reports.forEach((report) => {
        const timestamp = new Date(report.report_date); // The timestamp from Firestore
        const dateString = timestamp.toISOString().split("T")[0]; // Get date in "YYYY-MM-DD" format

        // Count the reports by date
        if (!reportCounts[dateString]) {
          reportCounts[dateString] = 0;
        }
        reportCounts[dateString] += 1;
      });

      // Sort the dates to ensure they're in chronological order
      const sortedDates = Object.keys(reportCounts).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      // Prepare data for the chart
      const labels = sortedDates; // Use the sorted dates as labels
      const data = sortedDates.map((date) => reportCounts[date]);

      setChartData({
        labels: labels, // Date labels for x-axis
        datasets: [
          {
            label: "Number of Reports",
            data: data, // Number of reports for each date
            fill: false,
            backgroundColor: "rgba(75, 192, 192, 0.4)", // Light green color
            borderColor: "rgba(75, 192, 192, 1)", // Dark green color
            tension: 0.1, // Smooth lines
          },
        ],
      });
    }
  }, [reports]);

  return (
    <div className="w-[650px] flex-grow h-[400px] mt-8 ml-8">
      <div className="font-bold text-md text-main">
        Report Trends Based on Date
      </div>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  return `${context.dataset.label}: ${context.raw} reports`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
              grid: {
                display: true,
              },
              ticks: {
                maxRotation: 45,
                minRotation: 45,
                autoSkip: true, // Auto skip labels to prevent overlap
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Reports",
              },
              grid: {
                display: true,
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default ReportTrends;
