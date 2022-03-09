// ----- 巧琳 ----- //

import React, { useState } from "react";
import Axios from "axios";
import "../css/member_style.css";
import Modal from "react-bootstrap/Modal";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

let MemberRegister = (props) => {
  //State
  //inp內容
  let [memberInfo, setMemberInfo] = useState({
    name: "",
    email: "",
    password: "",
    passwordcheck: "",
  });

  //送出狀態
  let [memberState, setMemberState] = useState({
    name: false,
    email: false,
    password: false,
  });

  //inp錯誤提示
  let [noticeState, setNoticeState] = useState({
    name: "none", //contents
    nametext: "請輸入暱稱",
    nameIcon: "none", //initial
    email: "none", //contents
    emailtext: "請確認信箱是否正確",
    emailover: "none",
    emailovertext: "此信箱已註冊",
    emailIcon: "none", //initial
    password: "none", //contents
    passwordtext: "請輸入密碼",
    passwordIcon: "none", //initial
    passwordcheck: "none", //contents
    passwordchecktext: "請確認密碼是否一致",
    passwordcheckIcon: "none", //initial
    registerfalse: "none", //contents
  });

  // RegisterButtonShow
  let [registerButShow, setRegisterButShow] = useState("block");

  //登入成功state
  let [outsec, setOutsec] = useState(2);
  let [showsuccess, setShowsuccess] = useState("none");

  //暱稱input
  let nameInputer = async (e) => {
    await setMemberInfo({ ...memberInfo, name: e.target.value });
  };
  //信箱input
  let emailInputer = async (e) => {
    await setMemberInfo({ ...memberInfo, email: e.target.value });
  };
  //密碼input
  let passwordInputer = async (e) => {
    await setMemberInfo({ ...memberInfo, password: e.target.value });
  };
  // 密碼檢查input
  let passwordCheckInputer = async (e) => {
    await setMemberInfo({ ...memberInfo, passwordcheck: e.target.value });
  };
  //暱稱blur
  let checkNameBlur = () => {
    memberInfo.name
      ? setMemberState({ ...memberState, name: true })
      : setMemberState({ ...memberState, name: false });
    memberInfo.name
      ? setNoticeState({ ...noticeState, name: "none", nameIcon: "initial" })
      : setNoticeState({ ...noticeState, name: "contents", nameIcon: "none" });
  };
  //信箱blur
  let checkMailBlur = async () => {
    if (memberInfo.email) {
      await Axios.get(
        "http://localhost:5000/account/check/" + memberInfo.email
      ).then((result) => {
        if (result.data === true) {
          setMemberState({ ...memberState, email: false });
          setNoticeState({
            ...noticeState,
            email: "none",
            emailIcon: "none",
            emailover: "contents",
          });
        } else {
          //正規表示法
          let emailRule = /^([\w.]){1,64}@(yahoo|hotmail|gmail)(.com|.com.tw)$/;
          memberInfo.email.search(emailRule) !== -1
            ? setMemberState({ ...memberState, email: true })
            : setMemberState({ ...memberState, email: false });
          memberInfo.email.search(emailRule) !== -1
            ? setNoticeState({
                ...noticeState,
                email: "none",
                emailIcon: "initial",
                emailover: "none",
              })
            : setNoticeState({
                ...noticeState,
                email: "contents",
                emailIcon: "none",
                emailover: "none",
              });
        }
      });
    } else {
      setNoticeState({
        ...noticeState,
        email: "contents",
        emailIcon: "none",
        emailover: "none",
      });
    }
  };
  //密碼blur
  let checkPasswordBlur = () => {
    if (!memberInfo.password) {
      setNoticeState({
        ...noticeState,
        password: "contents",
        passwordcheck: "contents",
        passwordIcon: "none",
        passwordcheckIcon: "none",
      });
      setMemberState({ ...memberState, password: false });
    } else {
      if (memberInfo.password === memberInfo.passwordcheck) {
        setMemberState({ ...memberState, password: true });
        setNoticeState({
          ...noticeState,
          password: "none",
          passwordcheck: "none",
          passwordIcon: "initial",
        });
      } else {
        setMemberState({ ...memberState, password: false });
        setNoticeState({
          ...noticeState,
          password: "none",
          passwordcheck: "contents",
          passwordIcon: "initial",
        });
      }
    }
  };
  //確認密碼blur
  let checkPasswordCheckBlur = () => {
    if (memberInfo.passwordcheck) {
      if (memberInfo.password === memberInfo.passwordcheck) {
        setMemberState({ ...memberState, password: true });
        setNoticeState({
          ...noticeState,
          passwordcheck: "none",
          passwordcheckIcon: "initial",
        });
      } else {
        setMemberState({ ...memberState, password: false });
        setNoticeState({
          ...noticeState,
          passwordcheck: "contents",
          passwordcheckIcon: "none",
        });
      }
    } else {
      setNoticeState({
        ...noticeState,
        passwordcheck: "contents",
        passwordcheckIcon: "none",
      });
    }
  };
  //送出_button

  let memberRegisterHandler = async (e) => {
    if (memberState.name && memberState.email && memberState.password) {
      await Axios.post("http://localhost:5000/account/create", {
        acc_email: memberInfo.email,
        acc_password: memberInfo.password,
        acc_name: memberInfo.name,
      }).then((result) => {
        console.log(result.data);
        if (result.data === "Added successfully") {
          // console.log("註冊成功!");
          setNoticeState({
            ...noticeState,
            registerfalse: "none",
          });
          setShowsuccess("contents");
          //註冊按鈕消失
          setRegisterButShow("none");
          //3秒後跳轉
          let settime = setInterval(() => {
            if (outsec > 0) {
              //關閉視窗
              setOutsec((outsec -= 1));
            } else {
              props.close();
              setOutsec((outsec = 2));
              clearInterval(settime);
              //clear all data
              setMemberInfo({
                ...memberInfo,
                name: "",
                email: "",
                password: "",
                passwordcheck: "",
              });
              setMemberState({
                ...memberState,
                name: false,
                email: false,
                password: false,
              });
              setNoticeState({
                ...noticeState,
                name: "none",
                nameIcon: "none",
                email: "none",
                emailIcon: "none",
                password: "none",
                passwordIcon: "none",
                passwordcheck: "none",
                passwordcheckIcon: "none",
                registerfalse: "none",
              });
              setShowsuccess("none");
              //clear all data
              //reload
              window.location.reload();
              //註冊按鈕出現
              setRegisterButShow("none");
            }
          }, 1000);
          //localStorage
          if (window.localStorage) {
            var local = window.localStorage;
            local.setItem("loginState", memberInfo.email);
            local.setItem("memberName", memberInfo.name);
          }
        } else {
          // console.log("註冊失敗!");
          setNoticeState({
            ...noticeState,
            registertrue: "none",
            registerfalse: "contents",
          });
        }
      });
    }
  };

  return (
    <Modal
      size="lg"
      show={props.show}
      keyboard={false}
      // animation={true}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal id="example-modal-sizes-title-lg"></Modal>
      <div id="formContainer_body">
        {/* 加toggle變長(註冊功能)，改高度用此選擇器 */}
        <div id="formContainer" className="dwo toggle">
          <div className="formLeft">
            <img src="/assets/images/member_photo.png" alt="" />
          </div>
          <div className="formRight">
            {/* <!-- Login form --> */}
            {/* CSS選擇器(不可刪除) */}
            <form id="login">
              <section></section>
            </form>
            {/* CSS選擇器(不可刪除) */}
            {/* <!-- Register form --> */}
            <form id="register" className="otherForm toggle">
              <header>
                <h1>用戶註冊</h1>
                <p>註冊後享受更多服務</p>
              </header>
              <section>
                <label>
                  <p>
                    暱稱{" "}
                    <span
                      className="text-danger"
                      style={{ display: noticeState.name }}
                    >
                      {noticeState.nametext}
                    </span>
                    <CheckCircleOutlineIcon
                      sx={{ color: "green" }}
                      style={{ display: noticeState.nameIcon }}
                    ></CheckCircleOutlineIcon>
                  </p>
                  <input
                    type="text"
                    placeholder=" "
                    onChange={nameInputer}
                    onBlur={checkNameBlur}
                  />
                  <div className="border"></div>
                </label>
                <label>
                  <p>
                    信箱{" "}
                    <span
                      className="text-danger"
                      style={{ display: noticeState.email }}
                    >
                      {noticeState.emailtext}
                    </span>
                    <span
                      className="text-danger"
                      style={{ display: noticeState.emailover }}
                    >
                      {noticeState.emailovertext}
                    </span>
                    <CheckCircleOutlineIcon
                      sx={{ color: "green" }}
                      style={{ display: noticeState.emailIcon }}
                    ></CheckCircleOutlineIcon>
                  </p>
                  <input
                    type="email"
                    placeholder=" "
                    onChange={emailInputer}
                    onBlur={checkMailBlur}
                  />
                  <div className="border"></div>
                </label>
                <label>
                  <p>
                    密碼{" "}
                    <span
                      className="text-danger"
                      style={{ display: noticeState.password }}
                    >
                      {noticeState.passwordtext}
                    </span>
                    <CheckCircleOutlineIcon
                      sx={{ color: "green" }}
                      style={{ display: noticeState.passwordIcon }}
                    ></CheckCircleOutlineIcon>
                  </p>
                  <input
                    type="password"
                    placeholder=" "
                    onChange={passwordInputer}
                    onBlur={checkPasswordBlur}
                  />
                  <div className="border"></div>
                </label>
                <label>
                  <p>
                    請再次輸入密碼{" "}
                    <span
                      className="text-danger"
                      style={{ display: noticeState.passwordcheck }}
                    >
                      {noticeState.passwordchecktext}
                    </span>
                    <CheckCircleOutlineIcon
                      sx={{ color: "green" }}
                      style={{ display: noticeState.passwordcheckIcon }}
                    ></CheckCircleOutlineIcon>
                  </p>
                  <input
                    type="password"
                    placeholder=" "
                    onChange={passwordCheckInputer}
                    onBlur={checkPasswordCheckBlur}
                  />
                  <div className="border"></div>
                </label>
                <div className="d-flex justify-content-center">
                  <span
                    className="text-danger"
                    style={{ display: noticeState.registerfalse }}
                  >
                    註冊失敗!!!
                  </span>
                  <span
                    className="text-success"
                    style={{ display: showsuccess }}
                  >
                    註冊成功!!! {outsec + 1}秒後跳轉...
                  </span>
                </div>
                <button
                  type="button"
                  onClick={memberRegisterHandler}
                  style={{ display: registerButShow }}
                >
                  註 册
                </button>
              </section>
              <footer>
                <button
                  type="button"
                  className="registerBtn"
                  onClick={props.showtoggle}
                  style={{ display: registerButShow }}
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

export default MemberRegister;
