import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-p3TTOoz_gTT8wYGJsB1fGfms8P6oKC8",
  authDomain: "ticktackdiary.firebaseapp.com",
  projectId: "ticktackdiary",
  storageBucket: "ticktackdiary.firebasestorage.app",
  messagingSenderId: "838734934099",
  appId: "1:838734934099:web:16de37ad1ec05a702e56a6",
  measurementId: "G-JQ2CWPCTEJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099"); // Authのエミュレーターのポートを指定
}
