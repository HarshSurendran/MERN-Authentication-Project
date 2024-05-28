// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "my-e-diary-8ab19.firebaseapp.com",
  projectId: "my-e-diary-8ab19",
  storageBucket: "my-e-diary-8ab19.appspot.com",
  messagingSenderId: "121671404869",
  appId: "1:121671404869:web:b6321767ab05703fb9822c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);