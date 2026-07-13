import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC-E-KxJVqFj24ZiL1WeI6gQ4DYtyGNVRo",
  authDomain: "psicogestaojiparana.firebaseapp.com",
  projectId: "psicogestaojiparana",
  storageBucket: "psicogestaojiparana.firebasestorage.app",
  messagingSenderId: "1000359944279",
  appId: "1:1000359944279:web:f26315865f561f536d4312"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code == 'failed-precondition') {
    console.warn('Persistence failed: Multiple tabs open');
  } else if (err.code == 'unimplemented') {
    console.warn('Persistence failed: Browser not supported');
  }
});

export default app;
