// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBadSp6qmr46kgf-ZH4l8U2Bevq938dSns",
  authDomain: "task-manager-api-8aaa3.firebaseapp.com",
  databaseURL: "https://task-manager-api-8aaa3-default-rtdb.firebaseio.com",
  projectId: "task-manager-api-8aaa3",
  storageBucket: "task-manager-api-8aaa3.appspot.com",
  messagingSenderId: "957977558234",
  appId: "1:957977558234:web:f54aa93abf97e9168db9e3",
  measurementId: "G-CKDHBZ2GB6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
export { auth };
