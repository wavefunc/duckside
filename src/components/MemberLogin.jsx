// ----- 巧琳 ----- //

import React, { useState } from "react";
import Axios from "axios";
import "../css/member_style.css";
import Modal from "react-bootstrap/Modal";
//********************
// Firebase
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "@firebase/auth";

let MemberLogin = (props) => {
  //********************
  // Firebase
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

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
  // LoginButtonShow&css
  let [loginButShow, setloginButShow] = useState("block");
  let [loginButHeight, setloginButHeight] = useState("580px");

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
      if (result.data === "Password error") {
        //失敗密碼錯誤
        setPasswordfalse("contents");
        setShowsuccess("none");
      } else if (result.data === "No such account") {
        //失敗找不到帳號
        setEmailfalse("contents");
      } else {
        //成功登入
        //登入按鈕消失
        setloginButShow("none");
        setloginButHeight("380px");
        setShowsuccess("contents");
        //localStorage
        if (window.localStorage) {
          var local = window.localStorage;
          local.setItem("loginState", memberInfo.email);
          local.setItem("memberName", result.data);
        }
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
            //登入按鈕出現
            setloginButShow("block");
            setloginButHeight("580px");
          }
        }, 1000);
      }
    });
  };

  // Firebase
  //google
  const provider = new GoogleAuthProvider();

  const auth = getAuth();

  let googoleButClick = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        //註冊
        Axios.post("http://localhost:5000/account/create", {
          acc_email: user.uid,
          acc_password: "",
          acc_name: user.displayName,
        }).then((result) => {
          //登入
          //localStorage
          if (window.localStorage) {
            var local = window.localStorage;
            local.setItem("loginState", user.uid);
            local.setItem("memberName", user.displayName);
          }
          props.close();
          //reload
          window.location.reload();
        });
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
  //FB
  //尚未驗證
  const providerFB = new FacebookAuthProvider();
  providerFB.addScope("user_birthday");

  auth.languageCode = "it";
  // To apply the default browser preference instead of explicitly setting it.
  // firebase.auth().useDeviceLanguage();

  providerFB.setCustomParameters({
    display: "popup",
  });

  let fbButClick = async () => {
    await signInWithPopup(auth, providerFB)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

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
        <div
          id="formContainer"
          className="dwo"
          style={{ height: loginButHeight }}
        >
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
                <button
                  type="button"
                  onClick={memberButClick}
                  style={{ display: loginButShow }}
                >
                  登 入
                </button>
              </section>
              <div style={{ display: loginButShow }}>
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
                  <div className="fb btn" onClick={fbButClick}>
                    <i className="fa fa-facebook fa-fw"></i> 使用 Facebook
                    帳號登入
                  </div>

                  <div className="google btn mt-2" onClick={googoleButClick}>
                    <i className="fa fa-google fa-fw"></i> 使用 Google 帳號登入
                  </div>
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
