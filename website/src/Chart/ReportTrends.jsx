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

// Register the components
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

// Define a color palette for each report category
const categoryColors = {
  fires: {
    backgroundColor: "rgba(255, 99, 132, 0.4)", // Pink
    borderColor: "rgba(255, 99, 132, 1)",
  },
  "street lights": {
    backgroundColor: "rgba(54, 162, 235, 0.4)", // Blue
    borderColor: "rgba(54, 162, 235, 1)",
  },
  potholes: {
    backgroundColor: "rgba(255, 206, 86, 0.4)", // Yellow
    borderColor: "rgba(255, 206, 86, 1)",
  },
  floods: {
    backgroundColor: "rgba(75, 192, 192, 0.4)", // Green
    borderColor: "rgba(75, 192, 192, 1)",
  },
  others: {
    backgroundColor: "rgba(153, 102, 255, 0.4)", // Purple
    borderColor: "rgba(153, 102, 255, 1)",
  },
  "road accident": {
    backgroundColor: "rgba(255, 159, 64, 0.4)", // Orange
    borderColor: "rgba(255, 159, 64, 1)",
  },
};

const ReportTrends = () => {
  const [reports, setReports] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
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
            category,
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

    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  useEffect(() => {
    if (reports.length > 0) {
      const reportCounts = {};
      reports.forEach((report) => {
        const date = new Date(report.report_date).toLocaleDateString(); // Ensure the date is in correct format
        const category = report.category;

        if (!reportCounts[date]) {
          reportCounts[date] = {};
        }
        reportCounts[date][category] = (reportCounts[date][category] || 0) + 1;
      });

      // Sort dates to ensure they're in chronological order
      const sortedLabels = Object.keys(reportCounts).sort(
        (a, b) => new Date(a) - new Date(b)
      );

      // Prepare data for the chart
      const datasets = [];
      const categories = [...new Set(reports.map((report) => report.category))];

      categories.forEach((category) => {
        const data = sortedLabels.map(
          (date) => reportCounts[date][category] || 0
        );

        // Use the specific color for each category
        const color = categoryColors[category];

        datasets.push({
          label: category,
          data: data,
          fill: false,
          backgroundColor: color.backgroundColor,
          borderColor: color.borderColor,
          tension: 0.1, // Smooth lines
        });
      });

      setChartData({
        labels: sortedLabels, // Use sorted dates as labels
        datasets: datasets,
      });
    }
  }, [reports]);

  return (
    <div className="w-4/5 flex-grow h-[400px] mt-8 ml-8">
      <div className="font-bold text-md text-main">Report Date Trends</div>
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
