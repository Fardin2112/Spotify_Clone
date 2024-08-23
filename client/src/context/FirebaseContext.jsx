import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const GoogleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZQyjEeGtxZD-7DzODD7t3oFs6DkTne0I",
  authDomain: "spotify-clone-fcb24.firebaseapp.com",
  databaseURL: "https://spotify-clone-fcb24-default-rtdb.firebaseio.com",
  projectId: "spotify-clone-fcb24",
  storageBucket: "spotify-clone-fcb24.appspot.com",
  messagingSenderId: "38889198484",
  appId: "1:38889198484:web:5a2249c917c0f78978f581"
};

// Initialize Firebase
const firebasApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebasApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {

  // to check user is looged or signOut
  const [user, setUser] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(firebaseAuth, (user)=>{
      if (user){
        // logged in
        setUser(user)
      } else {
        // logged out
        setUser(null) 
      }
    })
  },[])

  const navigate = useNavigate();

  // Sign up using email and password
  const signupUserWithEmailandPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  // sign up using email and password
  const signinUserWithEmailandPassword = (email,password) => {
    signInWithEmailAndPassword(firebaseAuth,email,password);
  }

  // Sign up/in using Google
  const signupUserWithGoogle = () => {
    return signInWithPopup(firebaseAuth, GoogleProvider)
      .then(() => navigate("/"))
      .catch((e) => console.log(e));
  };
  // log out
  const LogOut = () => {
    return console.log("logout working")
  }

  return (
    <FirebaseContext.Provider
      value={{ signupUserWithEmailandPassword, signupUserWithGoogle, signinUserWithEmailandPassword,user,LogOut }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
