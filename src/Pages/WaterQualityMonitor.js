import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebase.js";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const WaterQualityMonitor = () => {
    const [tdsData, setTdsData] = useState([]);
    const [turbidityData, setTurbidityData] = useState([]);
    const [timestamps, setTimestamps] = useState([]);

    useEffect(() => {
        const sensorsRef = ref(database, "Sensor_details"); 
        onValue(sensorsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tdsValues = [];
                const turbidityValues = [];
                const timeStamps = [];

                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const sensorEntry = data[key];
                        const tdsValue = sensorEntry.TDS;
                        const turbidityValue = sensorEntry.Turbidity;

                        if (tdsValue !== undefined) {
                            tdsValues.push(tdsValue);
                        }
                        if (turbidityValue !== undefined) {
                            turbidityValues.push(turbidityValue);
                        }
                        timeStamps.push(new Date(key).toLocaleString());
                    }
                }

                setTdsData(tdsValues);
                setTurbidityData(turbidityValues);
                setTimestamps(timeStamps);
            }
        });
    }, []);

    const tdsChartData = {
        labels: timestamps,
        datasets: [
            {
                label: "TDS (ppm)",
                data: tdsData,
                fill: false,
                borderColor: "rgba(255, 99, 132, 0.9)", 
                backgroundColor: "rgba(255, 99, 132, 0.3)", 
                pointBackgroundColor: "rgba(255, 99, 132, 1)", 
                pointBorderColor: "rgba(255, 255, 255, 0.8)",
                tension: 0.3,
            },
        ],
    };
    
    const turbidityChartData = {
        labels: timestamps,
        datasets: [
            {
                label: "Turbidity (NTU)",
                data: turbidityData,
                fill: false,
                borderColor: "rgba(255, 206, 86, 0.9)", 
                backgroundColor: "rgba(255, 206, 86, 0.3)", 
                pointBackgroundColor: "rgba(255, 206, 86, 1)", 
                pointBorderColor: "rgba(255, 255, 255, 0.8)", 
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Time",
                    color: "#333333", 
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    color: "#333333", 
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Value",
                    color: "#333333",
                    font: {
                        size: 14,
                        weight: 'bold'
                    }
                },
                ticks: {
                    color: "#333333", 
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: "#333333", 
                }
            },
            tooltip: {
                titleColor: "#333333", 
                bodyColor: "#333333", 
                backgroundColor: "rgba(255, 255, 255, 0.7)",
            }
        },
    };

    return (
        <div className="App">
            <h1 style={{ color: "#333333" }}>Water Quality Monitor</h1>
            <div>
                <h2 style={{ color: "#333333" }}>TDS Levels</h2>
                <Line data={tdsChartData} options={chartOptions} />
            </div>
            <div>
                <h2 style={{ color: "#333333" }}>Turbidity Levels</h2>
                <Line data={turbidityChartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default WaterQualityMonitor;
