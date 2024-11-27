import React, { useEffect, useState } from "react";
import { onSnapshot, collection, getFirestore } from "firebase/firestore";
import { Bar } from "react-chartjs-2";
import { app } from "../Firebase/firebaseConfig";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const db = getFirestore(app);

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportCategoryChart = () => {
  const [reportCounts, setReportCounts] = useState({});

  // Fetch documents from Firestore and update counts
  const fetchDocuments = async () => {
    const categories = [
      "fires",
      "street lights",
      "potholes",
      "floods",
      "others",
      "road accident",
    ];

    // Clear previous counts to avoid doubling
    const unsubscribeFunctions = categories.map((category) => {
      return onSnapshot(
        collection(db, `reports/${category}/reports`),
        (snapshot) => {
          const count = snapshot.docs.length; // Count the number of documents in each category
          setReportCounts((prevCounts) => ({
            ...prevCounts,
            [category]: count, // Overwrite the previous count with the latest count
          }));
        }
      );
    });

    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  };

  useEffect(() => {
    fetchDocuments();
  }, []); // Empty dependency array ensures fetchDocuments is called only once

  // Prepare data for the chart
  const chartData = {
    labels: Object.keys(reportCounts),
    datasets: [
      {
        label: "Number of Reports",
        data: Object.values(reportCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Fires
          "rgba(54, 162, 235, 0.6)", // Street Lights
          "rgba(255, 206, 86, 0.6)", // Potholes
          "rgba(75, 192, 192, 0.6)", // Floods
          "rgba(153, 102, 255, 0.6)", // Others
          "rgba(255, 159, 64, 0.6)", // Road Accident
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Fires
          "rgba(54, 162, 235, 1)", // Street Lights
          "rgba(255, 206, 86, 1)", // Potholes
          "rgba(75, 192, 192, 1)", // Floods
          "rgba(153, 102, 255, 1)", // Others
          "rgba(255, 159, 64, 1)", // Road Accident
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-4/5 flex-grow h-[400px] mt-8 ml-8">
      <div className="font-bold text-md text-main">
        Report Counts by Category
      </div>
      <Bar
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
                text: "Report Categories",
              },
            },
            y: {
              title: {
                display: true,
                text: "Number of Reports",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default ReportCategoryChart;
