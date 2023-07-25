// Import the functions you need from the SDKs you need
import { initializeApp,getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2IfjCHU3ERaF3LspkatwYBAoUtjiSev8",
  authDomain: "chatup-89581.firebaseapp.com",
  projectId: "chatup-89581",
  storageBucket: "chatup-89581.appspot.com",
  messagingSenderId: "560884948150",
  appId: "1:560884948150:web:679d8f2613c5753d2c1a17",
  measurementId: "G-M0KRXJ0V2V"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { db, auth, storage, provider };