import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAAojj_Otfl09Xz7m6oSNWO9JGXbHawt2U",
  authDomain: "portfolio-f02ed.firebaseapp.com",
  projectId: "portfolio-f02ed",
  storageBucket: "portfolio-f02ed.appspot.com",
  messagingSenderId: "36015186661",
  appId: "1:36015186661:web:13d8d3e9b182de015a6a0c",
  measurementId: "G-33XYZ4YXX7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage };
