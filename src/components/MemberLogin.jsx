// ----- 巧琳 ----- //

import React, { useState } from "react";
import Axios from "axios";
import "../css/member_style.css";
import Modal from "react-bootstrap/Modal";
//********************
// Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";

let MemberLogin = (props) => {
  //********************
  // Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyAB1dis-KvEIutixhUL_qusP1pD8hjo3Dk",
    authDomain: "duckside-55952.firebaseapp.com",
    projectId: "duckside-55952",
    storageBucket: "duckside-55952.appspot.com",
    messagingSenderId: "937748556305",
    appId: "1:937748556305:web:fa33b11f2d8363c5849fb0",
    measurementId: "G-5Q3YKR831M",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  //********************
  //State
  //memberInfo
  let [memberInfo, setMemberInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  // errorNotice
  let [passwordfalse, setPasswordfalse] = useState("none"); //contents
  let [emailfalse, setEmailfalse] = useState("none"); //contents
  //LoginSuccessState
  let [outsec, setOutsec] = useState(2);
  let [showsuccess, setShowsuccess] = useState("none");

  //********************
  // function
  //信箱input
  let emailInpChange = async (e) => {
    await setMemberInfo({ ...memberInfo, email: e.target.value });
  };
  //密碼input
  let passwordInpChange = async (e) => {
    await setMemberInfo({ ...memberInfo, password: e.target.value });
  };
  //清除提示字
  let noticeClearInpClick = async () => {
    setEmailfalse("none");
    setPasswordfalse("none");
  };

  //登入button
  let memberButClick = async () => {
    await Axios.post("http://localhost:5000/account/login", {
      acc_email: memberInfo.email,
      acc_password: memberInfo.password,
    }).then((result) => {
      if (result.data === "Password correct") {
        //成功登入
        setShowsuccess("contents");
        //3秒後跳轉
        let settime = setInterval(() => {
          if (outsec > 0) {
            setOutsec((outsec -= 1));
          } else {
            //關閉視窗
            props.close();
            setOutsec((outsec = 2));
            clearInterval(settime);
            //clear all data
            setMemberInfo({ ...memberInfo, name: "", email: "", password: "" });
            setShowsuccess("none");
            //clear all data
            //reload
            window.location.reload();
          }
        }, 1000);
        //localStorage
        if (window.localStorage) {
          var local = window.localStorage;
          local.setItem("loginState", memberInfo.email);
        }
      } else if (result.data === "Password error") {
        //失敗密碼錯誤
        setPasswordfalse("contents");
      } else if (result.data === "No such account") {
        //失敗找不到帳號
        setEmailfalse("contents");
      }
    });
  };

  // Firebase
  let googoleButClick = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(user.uid);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <Modal
      size="sm"
      show={props.show}
      animation={true}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal id="example-modal-sizes-title-lg"></Modal>
      <div id="formContainer_body">
        <div id="formContainer" className="dwo">
          <div className="formLeft">
            <img src="/assets/images/member_photo.png" alt="頭像" />
          </div>
          <div className="formRight">
            {/* <!-- Login form --> */}
            <form id="login">
              <header>
                <h1>歡迎回來</h1>
                <p>請先登入</p>
              </header>
              <section>
                <label>
                  <p>信箱</p>
                  <input
                    type="text"
                    placeholder=" "
                    onChange={emailInpChange}
                    onClick={noticeClearInpClick}
                  />
                  <div className="border"></div>
                </label>
                <label>
                  <p>密碼</p>
                  <input
                    type="password"
                    placeholder=" "
                    onChange={passwordInpChange}
                    onClick={noticeClearInpClick}
                  />
                  <div className="border"></div>
                </label>

                <div className="d-flex justify-content-center">
                  <span
                    className="text-danger"
                    style={{ display: passwordfalse }}
                  >
                    密碼錯誤，登入失敗...
                  </span>
                  <span className="text-danger" style={{ display: emailfalse }}>
                    查無此帳號，登入失敗...
                  </span>
                  <span
                    className="text-success"
                    style={{ display: showsuccess }}
                  >
                    登入成功!!! {outsec + 1}秒後跳轉...
                  </span>
                </div>
                <button type="button" onClick={memberButClick}>
                  登 入
                </button>
              </section>
              <footer>
                <button
                  type="button"
                  className="forgotBtn"
                  onClick={props.showForgetToggle}
                >
                  忘記密碼?
                </button>
                <button
                  type="button"
                  className="registerBtn"
                  onClick={props.showtoggle}
                >
                  註冊?
                </button>
                <button
                  type="button"
                  className="registerBtn"
                  onClick={() => {
                    window.location = "/";
                  }}
                >
                  返回
                </button>
              </footer>
              <hr />
              <div className="d-flex flex-column mt-2 mb-3">
                <div className="fb btn">
                  <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                </div>
                  
                <div className="google btn mt-2" onClick={googoleButClick}>
                  <i className="fa fa-google fa-fw"></i> Login with Google
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MemberLogin;
