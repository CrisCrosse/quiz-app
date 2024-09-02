// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB7BCmnyYdQ55rC8esIN62kVD1R0k8Q4cw",
    authDomain: "puzzle-club-db.firebaseapp.com",
    projectId: "puzzle-club-db",
    storageBucket: "puzzle-club-db.appspot.com",
    messagingSenderId: "138998680967",
    appId: "1:138998680967:web:7c19aeb96e3bec58165722",
    measurementId: "G-1PMWDV7Y7F"
};

// Initialize Firebase
const fireUp = initializeApp(firebaseConfig);

export default fireUp;