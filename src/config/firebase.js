import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBWB8j4uEyXaL-rscMxt_E268SBlOBwLSE",
    authDomain: "learning-firebase-f6d5a.firebaseapp.com",
    projectId: "learning-firebase-f6d5a",
    storageBucket: "learning-firebase-f6d5a.appspot.com",
    messagingSenderId: "128635307473",
    appId: "1:128635307473:web:c389c66dfafe777d9c4cf0",
    measurementId: "G-E4WHENG69F",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
