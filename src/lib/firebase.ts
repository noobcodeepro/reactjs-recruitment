// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA9dtchPFh4GUjhspAl5YwucbTB6TI0iqg",
	authDomain: "react-recruitment-b3124.firebaseapp.com",
	projectId: "react-recruitment-b3124",
	storageBucket: "react-recruitment-b3124.appspot.com",
	messagingSenderId: "221499861275",
	appId: "1:221499861275:web:4d6909a711558d0002cbbe",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
