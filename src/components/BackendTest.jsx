// ----- 冠樺 ----- //

import React, { useState, useEffect } from 'react';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, getRedirectResult, GoogleAuthProvider, signInWithRedirect, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: process.env.REACT_APP_API_KEY,
   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
   projectId: process.env.REACT_APP_PROJECT_ID,
   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
   appId: process.env.REACT_APP_APP_ID,
   measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();
const providerGoogle = new GoogleAuthProvider();

function BackendTest() {
   const [userResult, setUserResult] = useState('');
   const [logoutResult, setLogoutResult] = useState('');

   getRedirectResult(auth)
      .then((result) => {
         const credential = GoogleAuthProvider.credentialFromResult(result);
         const token = credential.accessToken;
         const user = result.user;
         setUserResult(result.user);
         setLogoutResult('登入中');
      }).catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         const email = error.email;
         const credential = GoogleAuthProvider.credentialFromError(error);
      });


   useEffect(() => {
      console.log('env: ', process.env.REACT_APP_TEST);
   }, []);

   return (
      <div>
         <button onClick={() => {
            signInWithRedirect(auth, providerGoogle);
         }}>第三方登入 </button>
         <p>displayName: {userResult.displayName}</p>
         <p>email: {userResult.email}</p>
         <p>emailVerified: {userResult.emailVerified}</p>
         <p>photoURL: {userResult.photoURL}</p>
         <p>uid: {userResult.uid}</p>
         <br />
         <button onClick={() => {
            signOut().then(() => {
               // 登出成功
               setLogoutResult('登出成功');
            }).catch((error) => {
               // 有錯誤
               setLogoutResult('登出失敗');
            });
         }}>登出</button>
         <p>{logoutResult}</p>
      </div>
   );
}

export default BackendTest;