import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, getFirestore } from 'firebase/firestore';
import { Line } from 'react-chartjs-2';
import { app } from '../Firebase/firebaseConfig';
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
} from 'chart.js';

const db = getFirestore(app);

// Register the components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ReportTrends = () => {
    const [reports, setReports] = useState([]);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

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
            return onSnapshot(collection(db, `reports/${category}/reports`), (snapshot) => {
                const updateReports = snapshot.docs.map((doc) => ({ ...doc.data(), category }));
                setReports((prevReports) => [...prevReports, ...updateReports]);
            });
        });
        return () => {
            unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
        };
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    useEffect(() => {
        if (reports.length > 0) {
            const reportCounts = {};
            reports.forEach(report => {
                const date = new Date(report.report_date).toLocaleDateString();
                const category = report.category;

                if (!reportCounts[date]) {
                    reportCounts[date] = {};
                }
                reportCounts[date][category] = (reportCounts[date][category] || 0) + 1;
            });

            // Prepare data for the chart
            const labels = Object.keys(reportCounts);
            const datasets = [];

            // Create a dataset for each category
            const categories = [...new Set(reports.map(report => report.category))];
            categories.forEach(category => {
                const data = labels.map(date => reportCounts[date][category] || 0);
                datasets.push({
                    label: category,
                    data: data,
                    fill: false,
                    backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.4)`,
                    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                    tension: 0.1, // Smooth lines
                });
            });

            setChartData({
                labels: labels,
                datasets: datasets,
            });
        }
    }, [reports]);

    return (
        <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
            <h2>Report Trends</h2>
            <Line
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
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
                                text: 'Date',
                            },
                            grid: {
                                display: true,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Reports',
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