import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || process.env.REACT_APP_API_KEY || "demo_api_key",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || process.env.REACT_APP_AUTH_DOMAIN || "shopflow-2511.firebaseapp.com",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || process.env.REACT_APP_PROJECT_ID || "shopflow-2511",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || process.env.REACT_APP_STORAGE_BUCKET || "shopflow-2511.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || process.env.REACT_APP_MESSAGING_SENDER_ID || "687383759812",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || process.env.REACT_APP_APP_ID || "1:687383759812:web:471f75f71540210426b291"
};

let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  console.log('✅ Firebase configuration initialized successfully');
} catch (error) {
  console.warn('⚠️ Firebase initialization notice:', error.message);
  app = getApps().length ? getApp() : initializeApp({
    apiKey: "demo_api_key",
    authDomain: "demo.firebaseapp.com",
    projectId: "demo-project"
  });
}

export const auth = getAuth(app);
export const db = getFirestore(app);