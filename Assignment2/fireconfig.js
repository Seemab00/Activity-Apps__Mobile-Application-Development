import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaSNmPCvdKslAM4tAE65ab4AruOz6AZYc",
  authDomain: "fir-assignment2025.firebaseapp.com",
  projectId: "fir-assignment2025",
  storageBucket: "fir-assignment2025.firebasestorage.app",
  messagingSenderId: "381276491902",
  appId: "1:381276491902:web:61269cebe4d38def9fc82f",
  measurementId: "G-K4NELZR2G3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);