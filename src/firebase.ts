import firebase from "firebase/app";
import "firebase/firestore";
// import { firebaseConfig } from "./firebaseConfig";

const env = process.env;

var firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_API_KEY,
  authDomain: env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_MSG_SENDER_ID,
  appId: env.REACT_APP_FIREBASE_APP_ID,
  measurementId: env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();

if (window.location.hostname === "localhost"){
  db.useEmulator("localhost", 8080);
}
