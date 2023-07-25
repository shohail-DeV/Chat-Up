
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDG9zspJra0F0eqK5tgLrjNLJSiZ5XPX7Q",
  authDomain: "fir-todo-5980e.firebaseapp.com",
  projectId: "fir-todo-5980e",
  storageBucket: "fir-todo-5980e.appspot.com",
  messagingSenderId: "163009970279",
  appId: "1:163009970279:web:df41622fd70bfa1740d4c2"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);