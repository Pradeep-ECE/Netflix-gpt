// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBSrzNfU0sf9xLuIQaOa2pCpWadfeLW95E",
  authDomain: "netflix-gpt-ce20e.firebaseapp.com",
  projectId: "netflix-gpt-ce20e",
  storageBucket: "netflix-gpt-ce20e.firebasestorage.app",
  messagingSenderId: "754902614744",
  appId: "1:754902614744:web:b0ff9a83a760e051d3cdad",
  measurementId: "G-KR8Q26HPJ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);