import { collection, getDocs, getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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

const docRef = doc(db, "Websites", "Website List");
const docSnap = await getDoc(docRef);
const documentData = docSnap.data();
const websiteList = documentData.List;

websiteList.forEach(website => {
  console.log(website);
});
