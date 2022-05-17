// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCprS8DMIf8D-wqy_ty2dODtbZAz2DL5s8",
  authDomain: "smart-home-35115.firebaseapp.com",
  projectId: "smart-home-35115",
  storageBucket: "smart-home-35115.appspot.com",
  messagingSenderId: "640127846420",
  appId: "1:640127846420:web:994e9233c6548330da7f01",
  measurementId: "G-S50MT4VQT6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const analytics = getAnalytics(app);
//const auth = getAuth(app);
export default db;