import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
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
