import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "AIzaSyCbBi_mCYKm2l2NHHScuDB7MdyG7VeVM34",
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "psicogestaojiparana-19699.firebaseapp.com",
  projectId: process.env.VITE_FIREBASE_PROJECT_ID || "psicogestaojiparana-19699",
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET || "psicogestaojiparana-19699.firebasestorage.app",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "107016573759",
  appId: process.env.VITE_FIREBASE_APP_ID || "1:107016573759:web:f21e00cde610aa8193398a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
