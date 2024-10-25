import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";


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


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);


const getSensorsData = () => {
  return new Promise((resolve, reject) => {
    const sensorRef = ref(database, "Sensors");
    onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        resolve(data); 
      } else {
        reject("No sensor data found");
      }
    }, (error) => {
      reject(error); 
    });
  });
};
export { auth, database, ref, set, onValue, getSensorsData };
