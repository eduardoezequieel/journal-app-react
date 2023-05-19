// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-AGFO035G6XtmtU3qgplH1xvbWwfftX0",
  authDomain: "react-cursos-a2519.firebaseapp.com",
  projectId: "react-cursos-a2519",
  storageBucket: "react-cursos-a2519.appspot.com",
  messagingSenderId: "303682511374",
  appId: "1:303682511374:web:a5121ef27d9971151dd25f",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
