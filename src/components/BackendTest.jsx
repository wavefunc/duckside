// ----- 冠樺 ----- //

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyAB1dis-KvEIutixhUL_qusP1pD8hjo3Dk",
   authDomain: "duckside-55952.firebaseapp.com",
   projectId: "duckside-55952",
   storageBucket: "duckside-55952.appspot.com",
   messagingSenderId: "937748556305",
   appId: "1:937748556305:web:fa33b11f2d8363c5849fb0",
   measurementId: "G-5Q3YKR831M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const providerGoogle = new GoogleAuthProvider();

function BackendTest() {
   const [userResult, setUserResult] = useState('');

   getRedirectResult(auth)
      .then((result) => {
         const credential = GoogleAuthProvider.credentialFromResult(result);
         const token = credential.accessToken;
         const user = result.user;
         setUserResult(result.user);
      }).catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         const email = error.email;
         const credential = GoogleAuthProvider.credentialFromError(error);
      });

   useEffect(() => {
      console.log('ok');
   }, []);

   return (
      <div>
         <button onClick={() => {
            signInWithRedirect(auth, providerGoogle);
         }}>第三方登入</button>
         <p>displayName: {userResult.displayName}</p>
         <p>email: {userResult.email}</p>
         <p>emailVerified: {userResult.emailVerified}</p>
         <p>photoURL: {userResult.photoURL}</p>
         <p>uid: {userResult.uid}</p>
      </div>
   );
}

export default BackendTest;