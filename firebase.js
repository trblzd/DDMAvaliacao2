// Import the functions you need from the SDKs you need
//import * as firebase from "firebase
//import * as firebase from "firebase/app";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// cada produto do firebase deve ser importad separadamente
//por exemplo auth de autenticação
import "firebase/compat/auth";

import "firebase/compat/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMjKpNY10XOXfV0qQCyN5tGWnA2ObxfuI",
  authDomain: "poetico-e8aad.firebaseapp.com",
  projectId: "poetico-e8aad",
  storageBucket: "poetico-e8aad.appspot.com",
  messagingSenderId: "352014711630",
  appId: "1:352014711630:web:56e781e5aae0d150137c1f",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const firestore = firebase.firestore();
export { auth, firestore };
