// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVhAliI3eSCFMM-QdPgVUEqohiPgAzG1c",
  authDomain: "habit-tracker-28f3a.firebaseapp.com",
  projectId: "habit-tracker-28f3a",
  storageBucket: "habit-tracker-28f3a.appspot.com",
  messagingSenderId: "619485381854",
  appId: "1:619485381854:web:638e3b2165584ca768ee4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
