// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "react-best-ecommecs.firebaseapp.com",
  projectId: "projectId",
  storageBucket: " storageBucket",
  messagingSenderId: "296587338668",
  appId: " appId"
};


const app = initializeApp(firebaseConfig);
const auth =getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth,storage,db};
