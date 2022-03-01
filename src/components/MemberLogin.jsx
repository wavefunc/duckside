// ----- 巧琳 ----- //

import React, { useState } from "react";
import Axios from "axios";
import "../css/member_style.css";
import Modal from "react-bootstrap/Modal";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

let MemberLogin = (props) => {
  //********************
  //第三方支付
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBv_AqANc-x64mfqthUlcyBconPJIV7guU",
    authDomain: "test-d01b5.firebaseapp.com",
    projectId: "test-d01b5",
    storageBucket: "test-d01b5.appspot.com",
    messagingSenderId: "134583126754",
    appId: "1:134583126754:web:c04955091bdd770a006cbb",
    measurementId: "G-LVMTSM69PH",
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


  const provider = new app.auth.GoogleAuthProvider();
app.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var credential = result.credential;
    var token = credential.accessToken;
    var user = result.user;
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });

  //********************

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
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default MemberLogin;
