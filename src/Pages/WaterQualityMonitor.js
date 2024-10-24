import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "../firebase.js";
import { Line } from "react-chartjs-2"; // Import Chart.js for plotting
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js';

// Register the necessary components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const WaterQualityMonitor = () => {
    const [tdsData, setTdsData] = useState([]);
    const [turbidityData, setTurbidityData] = useState([]);
    const [timestamps, setTimestamps] = useState([]);

    useEffect(() => {
        const sensorsRef = ref(database, "Sensors");
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
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
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
                borderColor: "rgba(153, 102, 255, 1)",
                tension: 0.1,
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
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Value",
                },
            },
        },
    };

    return (
        <div className="App">
            <h1>Water Quality Monitor</h1>
            <div>
                <h2>TDS Levels</h2>
                <Line data={tdsChartData} options={chartOptions} />
            </div>
            <div>
                <h2>Turbidity Levels</h2>
                <Line data={turbidityChartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default WaterQualityMonitor;
