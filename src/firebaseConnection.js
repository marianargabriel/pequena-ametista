import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBUgUVLlTu4kdw5D8slJotWC2pJuuvonrE",
  authDomain: "pequena-ametista-pap.firebaseapp.com",
  projectId: "pequena-ametista-pap",
  storageBucket: "pequena-ametista-pap.appspot.com",
  messagingSenderId: "907093772320",
  appId: "1:907093772320:web:5332ef8fa655ace7fe9445"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth();

export { db, auth }