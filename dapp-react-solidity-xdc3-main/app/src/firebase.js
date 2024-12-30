// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTF-FvUZKxmjXuFg3Kq0oidzv8RUwkngY",
  authDomain: "employee-rewards-f6e3a.firebaseapp.com",
  projectId: "employee-rewards-f6e3a",
  storageBucket: "employee-rewards-f6e3a.appspot.com",
  messagingSenderId: "39160169498",
  appId: "1:39160169498:web:f9a4ee768cc2e2035cfda3",
  measurementId: "G-P5N2R91PPE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);