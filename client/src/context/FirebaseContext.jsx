import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"

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


export const useFirebase = () => useContext(FirebaseContext)

// Initialize Firebase
const firebasApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebasApp)

export const FirebaseProvider = (props) => {

  const signupUserWithEmailandPassword = (email,password) => 
    createUserWithEmailAndPassword(firebaseAuth,email,password)

  return ( <FirebaseContext.Provider value={{signupUserWithEmailandPassword}}>
    {props.children}
    </FirebaseContext.Provider>
  )
}