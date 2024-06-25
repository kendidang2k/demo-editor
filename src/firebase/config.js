// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxN7ZiSL4Qp1asgucMbf18QBxkA1MzPo4",
    authDomain: "upload-demo-2ebb1.firebaseapp.com",
    projectId: "upload-demo-2ebb1",
    storageBucket: "upload-demo-2ebb1.appspot.com",
    messagingSenderId: "28706457648",
    appId: "1:28706457648:web:7d451c3c2c68809682c5f5",
    measurementId: "G-QJPN16SX3M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export { auth, db, storage };