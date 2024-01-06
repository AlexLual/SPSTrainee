// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore} from '@firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDemkgcgxBCImome1EOZZiGXBtjx8k2bH8",
  authDomain: "spstrainee.firebaseapp.com",
  projectId: "spstrainee",
  storageBucket: "spstrainee.appspot.com",
  messagingSenderId: "941161494936",
  appId: "1:941161494936:web:2075d04b31a91b5af113ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)