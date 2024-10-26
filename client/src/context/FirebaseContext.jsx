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
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
  appId: "1:38889198484:web:5a2249c917c0f78978f581",
};


// Initialize Firebase
const firebasApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebasApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  // to check user is looged or signOut
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // logged in
        setUser(user);
      } else {
        // logged out
        setUser(null);
      }
    });
  }, []);

  const navigate = useNavigate();

  // Sign up using email and password with email verification
  const signupUserWithEmailandPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        if (user) {
          sendEmailVerification(user).then(async () => {
            await signOut(firebaseAuth);
            navigate("/Login");
            alert(
              "Email verification sent to your Email ,please verify then login"
            );
            console.log(user.uid);
          });
        }
      })

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        console.log(errorCode, errorMessage);
      });
  };

  // Sign in using email and password
  const signinUserWithEmailandPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        toast.success("Email is verified, proceed to app");
        navigate("/"); // Redirect to your main page
      } else {
        alert("Please verify your email address before logging in.");
        navigate("/Login");
        await firebaseAuth.signOut(); // Sign out if email is not verified
      }
    } catch (error) {
      toast.error(error.message)
      console.error("Error signing in:", error);
    }
  };

  // Sign up/in using Google
  const signupUserWithGoogle = () => {
    return signInWithPopup(firebaseAuth, GoogleProvider)
      .then(() => navigate("/"))
      .catch((e) => console.log(e));
  };
  // User
  const User = () => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
      } else {
        // User is signed out
        // ...
      }
    });
  };
  // Reset Password
  const ResetPassword = (email) => {
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorMessage)
        console.log(errorCode,errorMessage)
        // ..
      });
  };
  // log out
  const LogOut = async () => {
    try {
      await signOut(firebaseAuth);
      navigate("/login"); // Redirect to login page after logout
      toast.info("Log Out successfully")
    } catch (error) {
      toast.error("Error Logging Out", error);
      console.log(error)
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailandPassword,
        signupUserWithGoogle,
        signinUserWithEmailandPassword,
        user,
        LogOut,
        User,
        ResetPassword,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
