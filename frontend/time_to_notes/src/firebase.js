import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRESTORE_API,
  authDomain: "women-6655c.firebaseapp.com",
  projectId: "women-6655c",
  storageBucket: "women-6655c.firebasestorage.app",
  messagingSenderId: "137659163517",
  appId: "1:137659163517:web:7544ed038dcdfb0519a214",
  measurementId: "G-3Y3XR1JFN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, getDocs };