// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
