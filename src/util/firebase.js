// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from "firebase/database";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgkxRf3jaQl8NzYEuFK2llTVzqMHrWREY",
  authDomain: "smart-todo-ffb67.firebaseapp.com",
  projectId: "smart-todo-ffb67",
  storageBucket: "smart-todo-ffb67.appspot.com",
  messagingSenderId: "996408600",
  appId: "1:996408600:web:e3578d7c582cd9a3e9b26d",
  measurementId: "G-BQHG9FB2C4",
};
const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export const auth = getAuth();

export default app;
