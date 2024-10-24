import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPpVQaONRe8WcXIDqFwDFv2EYX9FjvPoM",
  authDomain: "aquasense-4334c.firebaseapp.com",
  databaseURL: "https://aquasense-4334c-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "aquasense-4334c",
  storageBucket: "aquasense-4334c.appspot.com",
  messagingSenderId: "545893772673",
  appId: "1:545893772673:web:37eee7d91bf098fc268c80",
  measurementId: "G-MWZ89TFCBH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

// Function to get sensor data from Firebase
const getSensorsData = () => {
  return new Promise((resolve, reject) => {
    const sensorRef = ref(database, "Sensors");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        resolve(data); // Resolve the promise with the fetched data
      } else {
        reject("No sensor data found");
      }
    }, (error) => {
      reject(error); // Reject the promise if there's an error
    });
  });
};

// Export the necessary functions and database
export { auth, database, ref, set, onValue, getSensorsData };
