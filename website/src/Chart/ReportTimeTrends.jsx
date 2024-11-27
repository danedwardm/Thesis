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

const ReportTimeTrends = () => {
  const [reports, setReports] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [], // Hour labels (e.g., "0:00", "1:00", ..., "23:00")
    datasets: [], // Dataset for the number of reports created at each hour
  });

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
          const updateReports = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id, // Track unique document ID
          }));

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

    return () => unsubscribe();
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (reports.length > 0) {
      const reportCounts = Array(24).fill(0); // Initialize an array with 24 slots (for each hour)

      // Count the number of reports for each hour of the day
      reports.forEach((report) => {
        const timestamp = new Date(report.report_date); // Assuming report_date is a Firebase Timestamp
        const hour = timestamp.getHours(); // Extract the hour from the report's timestamp

        reportCounts[hour] += 1; // Increment the count for that hour
      });

      // Prepare data for the chart
      const labels = Array.from({ length: 24 }, (_, index) => `${index}:00`); // ["0:00", "1:00", ..., "23:00"]

      setChartData({
        labels: labels, // Hour labels for x-axis
        datasets: [
          {
            label: "Number of Reports",
            data: reportCounts, // Number of reports for each hour
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
    <div className="w-4/5 flex-grow h-[400px] mt-8 ml-8">
      <div className="font-bold text-md text-main">
        Report Trends Based on Time of the Day
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
                text: "Time of Day (Hour)",
              },
              grid: {
                display: true,
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

export default ReportTimeTrends;