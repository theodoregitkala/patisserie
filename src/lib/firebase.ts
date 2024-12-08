import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAF-y9sNZdMry7Xu96r7liqZVM8VR-q4Gw",
  authDomain: "studentmarket-811d6.firebaseapp.com",
  projectId: "studentmarket-811d6",
  storageBucket: "studentmarket-811d6.firebasestorage.app",
  messagingSenderId: "965856703614",
  appId: "1:965856703614:web:f065e8545f7e6f54e5942f",
  measurementId: "G-3Z1NPJS4NJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);