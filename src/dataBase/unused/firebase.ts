import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDYmyRT9uR8g_Bvu-RKfAvpHIpYv0qMDoE",
  authDomain: "pawbuddy-72b39.firebaseapp.com",
  projectId: "pawbuddy-72b39",
  storageBucket: "pawbuddy-72b39.appspot.com",
  messagingSenderId: "394103713393",
  appId: "1:394103713393:web:5bce9d3804caea8569b5d0",
  databaseURL: "https://pawbuddy-72b39-default-rtdb.firebaseio.com/",
};

const PawBuddyDB = firebase.initializeApp(firebaseConfig);
const CONNECT = PawBuddyDB.firestore();
const STORAGE = PawBuddyDB.storage();
const AUTH = PawBuddyDB.auth();

export { CONNECT, STORAGE, AUTH };
