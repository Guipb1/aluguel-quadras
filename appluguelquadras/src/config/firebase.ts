import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from "firebase/auth/react-native";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBg5ld7aSLHIWdDVSoP6i2n3gD5DWvvnU",
  authDomain: "projeto-tcc-b0cdb.firebaseapp.com",
  projectId: "projeto-tcc-b0cdb",
  storageBucket: "projeto-tcc-b0cdb.appspot.com",
  messagingSenderId: "343563909212",
  appId: "1:343563909212:web:a5c483319c7ca132984e99",
};

// Initialize Firebase
const firebaseInstance = firebase.initializeApp(firebaseConfig);

const authInstance = initializeAuth(firebaseInstance, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const firestoreInstance = getFirestore(firebaseInstance);

export { firebaseInstance, authInstance, firestoreInstance, firebase };
