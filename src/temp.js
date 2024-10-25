import React, { useState, useEffect } from "react";
import { database, ref, onValue } from "./firebase.js";

// Function to make predictions based on TDS and turbidity
const predictNext = (x, y, n) => {
    let a = 0.0, b = 0.0, alpha = 0.01, iter = 50;
    n = parseInt(n);

    // Ensure y values are parsed as floats
    y = y.map(parseFloat);

    for (let k = 0; k < iter; k++) {
        for (let i = 0; i < x.length; i++) {
            const tmp = a + b * x[i];
            const error = tmp - y[i];
            a -= alpha * error;
            b -= alpha * error * x[i];
        }
    }

    return a + b * x[n % x.length]; // Return predicted value
};

const makePredictions = (tds, turbidity) => {
   
    const dateArray = Array.from({ length: 30 }, (_, i) => i);
    const currentIndex = dateArray.length - 1; // Current date index

    //Linear Regression
    const predictedTDS = predictNext(dateArray, Array.from({ length: 30 }, (_, i) => tds + i * 5), currentIndex); // Sample TDS data
    const predictedTurbidity = predictNext(dateArray, Array.from({ length: 30 }, (_, i) => turbidity + i), currentIndex); // Sample turbidity data

    return {
        overallQuality: (predictedTDS < 500 && predictedTurbidity < 1) ? "Good" :
                        (predictedTDS < 1000 && predictedTurbidity < 5) ? "Needs Attention" : "Bad"
    };
};

const Temp = () => {
    const [tds, setTds] = useState(null);
    const [turbidity, setTurbidity] = useState(null);
    const [waterQuality, setWaterQuality] = useState("");
    const [isSafe, setIsSafe] = useState("");

    useEffect(() => {
        // Reference to TDS sensor data in Firebase
        const tdsRef = ref(database, "currSensors/TDS");
        onValue(tdsRef, (snapshot) => {
            const tdsValue = snapshot.val();
            setTds(tdsValue);
            // Predict water quality whenever TDS updates
            if (turbidity !== null) {
                const predictedQuality = makePredictions(tdsValue, turbidity);
                setWaterQuality(predictedQuality.overallQuality);
                assessWaterSafety(tdsValue, turbidity);
            }
        });

        // Reference to turbidity sensor data in Firebase
        const turbidityRef = ref(database, "currSensors/Turbidity");
        onValue(turbidityRef, (snapshot) => {
            const turbidityValue = snapshot.val();
            setTurbidity(turbidityValue);
            // Predict water quality whenever turbidity updates
            if (tds !== null) {
                const predictedQuality = makePredictions(tds, turbidityValue);
                setWaterQuality(predictedQuality.overallQuality);
                assessWaterSafety(tds, turbidityValue);
            }
        });
    }, [tds, turbidity]);

    const assessWaterSafety = (tdsValue, turbidityValue) => {
        if (tdsValue < 500 && turbidityValue < 1) {
            setIsSafe("The water is safe to drink.");
        } else {
            setIsSafe("The water is NOT safe to drink.");
        }
    };

    return (
        <div className="App">
            <h1>Water Quality Monitor</h1>
            <div>
                <h2>Turbidity:</h2>
                {turbidity !== null ? (
                    <p>{turbidity < 20 ? "Clear" : turbidity < 50 ? "Cloudy" : "Dirty"} ({turbidity} NTU)</p>
                ) : (
                    <p>Loading turbidity data...</p>
                )}
            </div>
            <div>
                <h2>TDS:</h2>
                {tds !== null ? (
                    <p>{tds} ppm</p>
                ) : (
                    <p>Loading TDS data...</p>
                )}
            </div>
            <div>
                <h2>Overall Water Quality:</h2>
                <p>{waterQuality || "Assessing water quality..."}</p>
            </div>
           
        </div>
    );
};

export default Temp;
