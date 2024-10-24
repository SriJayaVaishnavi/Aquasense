// Temp.js
import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "./firebase.js"; // Adjust your Firebase import path
import Graph from "./Pages/Graph.js"; // Import the existing Graph component

const Temp = () => {
    const [tdsData, setTdsData] = useState([]);
    const [turbidityData, setTurbidityData] = useState([]);

    useEffect(() => {
        const sensorRef = ref(database, "Sensors");

        // Listening to the Sensors node
        onValue(sensorRef, (snapshot) => {
            const data = snapshot.val();
            const tdsEntries = [];
            const turbidityEntries = [];

            // Loop through the sensor data to extract TDS and turbidity values
            for (const timestamp in data) {
                if (data.hasOwnProperty(timestamp)) {
                    const tdsValue = data[timestamp].TDS;
                    const turbidityValue = data[timestamp].Turbidity;

                    // Add to the TDS and turbidity entries
                    tdsEntries.push({ timestamp, value: tdsValue });
                    turbidityEntries.push({ timestamp, value: turbidityValue });
                }
            }

            // Update the state with formatted data
            
           
            setTdsData(tdsEntries);
            setTurbidityData(turbidityEntries);
        });
    }, []);

    return (
        <div className="App">
            <h1>Water Quality Monitor</h1>
            <Graph tdsData={tdsData} turbidityData={turbidityData} />
        </div>
    );
};

export default Temp;
