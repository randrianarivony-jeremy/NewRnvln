// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {connectStorageEmulator, getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBAjSyTuiWLCeplAKdzXnqZ-ip6uU_eX5U",
    authDomain: "rnvln-611b7.firebaseapp.com",
    projectId: "rnvln-611b7",
    storageBucket: "rnvln-611b7.appspot.com",
    messagingSenderId: "166268309712",
    appId: "1:166268309712:web:a518fe9d46d116952bced5",
    measurementId: "G-1HYQPNLHJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

//for emulator suite
// connectStorageEmulator(storage, "localhost", 9199);