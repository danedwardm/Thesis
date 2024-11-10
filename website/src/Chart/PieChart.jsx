import React, { useEffect, useState } from 'react';
import { onSnapshot, collection, getFirestore } from 'firebase/firestore';
import { Pie } from 'react-chartjs-2';
import { app } from '../Firebase/firebaseConfig';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

const db = getFirestore(app);

// Register the components
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
    const [reportCounts, setReportCounts] = useState({});

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
                const count = snapshot.docs.length; // Count the number of documents in each category
                setReportCounts(prevCounts => ({
                    ...prevCounts,
                    [category]: (prevCounts[category] || 0) + count,
                }));
            });
        });
        
        return () => {
            unsubscribeFunctions.forEach(unsubscribe => unsubscribe());
        };
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    // Prepare data for the chart
    const chartData = {
        labels: Object.keys(reportCounts),
        datasets: [
            {
                data: Object.values(reportCounts),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)', // Fires
                    'rgba(54, 162, 235, 0.6)', // Street Lights
                    'rgba(255, 206, 86, 0.6)', // Potholes
                    'rgba(75, 192, 192, 0.6)', // Floods
                    'rgba(153, 102, 255, 0.6)', // Others
                    'rgba(255, 159, 64, 0.6)', // Road Accident
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)', // Fires
                    'rgba(54, 162, 235, 1)', // Street Lights
                    'rgba(255, 206, 86, 1)', // Potholes
                    'rgba(75, 192, 192, 1)', // Floods
                    'rgba(153, 102, 255, 1)', // Others
                    'rgba(255, 159, 64, 1)', // Road Accident
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div style={{ width: '80%', height: '400px', margin: '0 auto' }}>
            <h2>Distribution of Reports by Category</h2>
            <Pie
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const value = context.raw;
                                    const percentage = ((value / total) * 100).toFixed(2);
                                    return `${context.label}: ${percentage}% (${value} reports)`;
                                },
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default PieChart;