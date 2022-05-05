import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDBg5ld7aSLHIWdDVSoP6i2n3gD5DWvvnU",
    authDomain: "projeto-tcc-b0cdb.firebaseapp.com",
    projectId: "projeto-tcc-b0cdb",
    storageBucket: "projeto-tcc-b0cdb.appspot.com",
    messagingSenderId: "343563909212",
    appId: "1:343563909212:web:a5c483319c7ca132984e99"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;