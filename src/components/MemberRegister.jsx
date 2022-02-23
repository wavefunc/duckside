// ----- 巧琳 ----- //

import React, { useState } from "react";
import Axios from "axios";
import "../css/member_style.css";
import Modal from "react-bootstrap/Modal";

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
    email: "none",
    emailtext: "請確認信箱是否正確",
    password: "none",
    passwordtext: "請輸入密碼",
    passwordcheck: "none",
    passwordchecktext: "請確認兩次密碼是否一致",
    registerfalse:"none", //contents
    registertrue:"none", //contents

  });

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
      ? setNoticeState({ ...noticeState, name: "none" })
      : setNoticeState({ ...noticeState, name: "contents" });
  };
  //信箱blur
  let checkMailBlur = () => {
    if (memberInfo.email) {
      let emailRule = /^([\w.]){1,64}@(yahoo|hotmail|gmail)(.com|.com.tw)$/;
      memberInfo.email.search(emailRule) !== -1
        ? setMemberState({ ...memberState, email: true })
        : setMemberState({ ...memberState, email: false });
      memberInfo.email.search(emailRule) !== -1
        ? setNoticeState({ ...noticeState, email: "none" })
        : setNoticeState({ ...noticeState, email: "contents" });
    } else {
      setNoticeState({ ...noticeState, email: "contents" });
    }
  };
  //密碼blur
  let checkPasswordBlur = () => {
    if (!memberInfo.password) {
      setNoticeState({
        ...noticeState,
        password: "contents",
        passwordcheck: "contents",
      });
      setMemberState({ ...memberState, password: false });
    } else {
      if (memberInfo.password === memberInfo.passwordcheck) {
        setMemberState({ ...memberState, password: true });
        setNoticeState({
          ...noticeState,
          password: "none",
          passwordcheck: "none",
        });
      } else {
        setMemberState({ ...memberState, password: false });
        setNoticeState({
          ...noticeState,
          password: "none",
          passwordcheck: "contents",
        });
      }
    }
  };
  //確認密碼blur
  let checkPasswordCheckBlur = () => {
    if (memberInfo.passwordcheck) {
      memberInfo.password === memberInfo.passwordcheck
        ? setMemberState({ ...memberState, password: true })
        : setMemberState({ ...memberState, password: false });
      memberInfo.password === memberInfo.passwordcheck
        ? setNoticeState({ ...noticeState, passwordcheck: "none" })
        : setNoticeState({ ...noticeState, passwordcheck: "contents" });
    } else {
      setNoticeState({ ...noticeState, passwordcheck: "contents" });
    }
  };
  //送出_button
  let memberRegisterHandler = async () => {
    if (memberState.name && memberState.email && memberState.password) {
      await Axios.post("http://localhost:5000/account/create", {
        acc_email: memberInfo.email,
        acc_password: memberInfo.password,
        acc_name: memberInfo.name,
      }).then((result) => {
        if (result.data === "Added successfully") {
          console.log("註冊成功!");
          setNoticeState({ ...noticeState, registertrue: "contents", registerfalse: "none" });
          // props.close();
        } else {
          console.log("註冊失敗!");
          setNoticeState({ ...noticeState, registertrue: "none", registerfalse: "contents" });
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
            <img src="/assets/images/member_testimg.png" alt="" />
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
                <span className="text-danger" style={{display:noticeState.registerfalse}}>註冊失敗!!!</span>
                <span className="text-success" style={{display:noticeState.registertrue}}>註冊成功!!!</span>

               </div>
                <button type="button" onClick={memberRegisterHandler}>
                  註 册
                </button>
              </section>
              <footer>
                <button
                  type="button"
                  className="registerBtn"
                  onClick={props.showtoggle}
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
