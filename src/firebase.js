// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDY-BzDSOB7B-PPQ2iC3EeKRWuB6jrB23w",
  authDomain: "react-best-ecommecs.firebaseapp.com",
  projectId: "react-best-ecommecs",
  storageBucket: "react-best-ecommecs.appspot.com",
  messagingSenderId: "296587338668",
  appId: "1:296587338668:web:4bee277f4ee54bf642d009"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,storage,db};