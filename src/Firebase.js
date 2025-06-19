import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATymCXK7eTMMYkiJQ6HMGKBFyysvBpsFI",
  authDomain: "nsto-92ab9.firebaseapp.com",
  projectId: "nsto-92ab9",
  storageBucket: "nsto-92ab9.appspot.com",
  messagingSenderId: "844390400500",
  appId: "1:844390400500:web:d50e5371f195de4b06b9a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
