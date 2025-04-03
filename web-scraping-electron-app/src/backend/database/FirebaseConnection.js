/**
* @file FirebaseConnection.js
* @fileoverview Initializes the Firebase app and Firestore database connection.
*
* @module Database-FirebaseConnection
* @requires firebase/app
* @requires firebase/firestore
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

/**
* Firebase configuration for Group 8's Firestore instance.
* @constant {Object} firebaseConfig
* @memberof module:Database-FirebaseConnection
*/
const firebaseConfig = {
  apiKey: 'AIzaSyAhqRcDSUGoTiEka890A53u7cjS0J1IH48',
  authDomain: 'ser-401-group8-firebase.firebaseapp.com',
  projectId: 'ser-401-group8-firebase',
  storageBucket: 'ser-401-group8-firebase.firebasestorage.app',
  messagingSenderId: '346387119771',
  appId: '1:346387119771:web:71d09aec636a6b1c06503e',
  measurementId: 'G-QX3095X9GX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
