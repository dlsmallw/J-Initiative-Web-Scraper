/**
* @file DeleteEntry.js
* @fileoverview Initializes Firebase and deletes specific documents from Firestore based on query conditions.
*
* @module Database.DeleteEntry
* @requires firebase/app
* @requires firebase/firestore
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs, where, deleteDoc, query} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/**
* Firebase configuration for Group 8's Firestore instance.
* @constant {Object} firebaseConfig
* @memberof module:Database.DeleteEntry
*/
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

try {

  const querySnapshot = await getDocs(query(
    collection(db, "TestWebsite1"),
    where("url", "==", "website1.com")
  ));
  const docRef = querySnapshot.docs[0].ref;
  await deleteDoc(docRef);


  const querySnapshot2 = await getDocs(query(
    collection(db, "TestWebsite1"),
    where("title", "==", "title of a page in website1")
  ));
  const docRef2 = querySnapshot2.docs[0].ref;
  await deleteDoc(docRef2);

  console.log("Documents deleted");
} catch (e) {
  console.error("Error adding document: ", e);
}
process.exit(0);
