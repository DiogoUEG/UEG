// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
//import firebase from 'firebase/compat/app';
//import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyDTYA80NtKkO3BWO8zIGZbrqriv43NuP0s",
  authDomain: "ponto-7d182.firebaseapp.com",
  projectId: "ponto-7d182",
  storageBucket: "ponto-7d182.appspot.com",
  messagingSenderId: "187342028964",
  appId: "1:187342028964:web:79e9f8c6e1169a34c7e631"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;