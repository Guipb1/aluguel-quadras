import firebase from "firebase"
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAOpZiSpWEPCnvb-ejMd-ZvAN8E1sWH-cY",
  authDomain: "aluguel-quadras-8a0f2.firebaseapp.com",
  projectId: "aluguel-quadras-8a0f2",
  storageBucket: "aluguel-quadras-8a0f2.appspot.com",
  messagingSenderId: "134333850300",
  appId: "1:134333850300:web:c59cecf0d6a6cd187ce6b9"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase 