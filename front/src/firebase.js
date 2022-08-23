import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmkSWi6ppGwzt3mCW5wy3x9YlEo_iwosM",
  authDomain: "itransition-a1be2.firebaseapp.com",
  projectId: "itransition-a1be2",
  storageBucket: "itransition-a1be2.appspot.com",
  messagingSenderId: "469165058221",
  appId: "1:469165058221:web:009bb29d4a8171df17fe24",
  measurementId: "G-HQEDMT04LV",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app)
