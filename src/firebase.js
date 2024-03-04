// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5lTnTPfU9vxj3HJSz0G8MQqbyfMq2TlI",
  authDomain: "smart-todo-9d096.firebaseapp.com",
  projectId: "smart-todo-9d096",
  storageBucket: "smart-todo-9d096.appspot.com",
  messagingSenderId: "1051588587804",
  appId: "1:1051588587804:web:8482d9cc0731ffd3388ad9",
  measurementId: "G-VCJP4DGWFH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

export default app;
