/**
 * @file SubCollectionEntry.mjs
 * @namespace Database
 * @description Initializes Firebase and adds documents to a Firestore subcollection.
 *
 * @requires firebase/app
 * @requires firebase/firestore
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhqRcDSUGoTiEka890A53u7cjS0J1IH48",
  authDomain: "ser-401-group8-firebase.firebaseapp.com",
  projectId: "ser-401-group8-firebase",
  storageBucket: "ser-401-group8-firebase.firebasestorage.app",
  messagingSenderId: "346387119771",
  appId: "1:346387119771:web:71d09aec636a6b1c06503e",
  measurementId: "G-QX3095X9GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const websiteRef = collection(db, 'SubCollection');

await Promise.all([
  addDoc(collection(websiteRef, 'website', 'info'), {
    name: 'Site 1',
    type: 'type 1'
  }),
  addDoc(collection(websiteRef, 'website', 'info'), {
    name: 'Site 2',
    type: 'type 2'
  })
]);
