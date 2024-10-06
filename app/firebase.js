// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbVixoke3S2E39SupcT8JnAVgzjcXboME",
  authDomain: "react-notes-e0486.firebaseapp.com",
  projectId: "react-notes-e0486",
  storageBucket: "react-notes-e0486.appspot.com",
  messagingSenderId: "486796554451",
  appId: "1:486796554451:web:5219774a4d5e7fbda16426"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export const notes = collection(db, "notes");