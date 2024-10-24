import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { getSensorsData } from '../firebase.js';

 // Adjust the import according to your project structure

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
);

const Graph = () => {
    const [sensorData, setSensorData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getSensorsData(); // Fetch your data
                setSensorData(data || []); // Handle undefined
            } catch (error) {
                console.error("Error fetching sensor data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // If loading, show a loading indicator
    if (loading) {
        return <div>Loading...</div>;
    }

    // If there's no data, show a message
    if (!sensorData.length) {
        return <div>No data available for the graph.</div>;
    }

    // Prepare the data for the chart
    const data = {
        labels: sensorData.map(item => item.date), // Adjust according to your data structure
        datasets: [
            {
                label: 'TDS Values',
                data: sensorData.map(item => item.TDS), // Replace 'TDS' with your actual field name
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            },
            {
                label: 'Turbidity Values',
                data: sensorData.map(item => item.Turbidity), // Replace 'Turbidity' with your actual field name
                borderColor: 'rgba(153,102,255,1)',
                backgroundColor: 'rgba(153,102,255,0.2)',
            },
        ],
    };

    return (
        <div>
            <h2>Water Quality Charts</h2>
            <Line data={data} />
        </div>
    );
};

export default Graph;
