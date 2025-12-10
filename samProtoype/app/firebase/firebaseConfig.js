// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyAp02P9wlvpyqUfbEGDgTNPpJ5L_z4p6Qo",

  authDomain: "samdb-ceeb5.firebaseapp.com",

  projectId: "samdb-ceeb5",

  storageBucket: "samdb-ceeb5.firebasestorage.app",

  messagingSenderId: "2418083174",

  appId: "1:2418083174:web:3904d4e92981bcda4c74a7"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const auth = getAuth(app);