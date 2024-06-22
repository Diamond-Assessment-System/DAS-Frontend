// firebase.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmJRG3IrO-_IypKMLyUdL7B9sikgLe6dI",
  authDomain: "diamond-assessment-system.firebaseapp.com",
  projectId: "diamond-assessment-system",
  storageBucket: "diamond-assessment-system.appspot.com",
  messagingSenderId: "322740938511",
  appId: "1:322740938511:web:fc53146135af52ab73807a",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Export the auth and GoogleAuthProvider
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
