// ----- 巧琳 ----- //

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../css/member_style.css";
import Modal from "react-bootstrap/Modal";

let MemberRegister = (props) => {
  //render後執行
  useEffect(() => {
    setShow(props.register);
  });
  //model
  const [show, setShow] = useState(false);

  //State
  let [memberEmail, setEmail] = useState();
  let [memberPassword, setPassword] = useState();
  let [memberCheckPassword, setCheckPassword] = useState();

  //信箱input
  let emailInpButton = async (e) => {
    await setEmail(e.target.value);
  };
  //密碼input
  let passwordInpButton = async (e) => {
    await setPassword(e.target.value);
  };
  // 密碼檢查input
  let passwordCheckInpButton = async (e) => {
    await setCheckPassword(e.target.value);
  };
  //送出_button
  let memberRegisterHandler = async () => {
    await Axios.post("http://localhost:5000/member/add", {
      title: "123",
      name: "aaa",
    }).then((result) => {
      console.log(result);
    });
  };
  //註冊component_close
  let registerCloseHandle = async () => {
    props.registerSet(false);
  };

  return (
    <div>
      <div>
        {/* 完成後刪除 */}
        <h1>test</h1>
        <p>{memberEmail}</p>
        <p>
          {memberPassword}|{memberCheckPassword}
        </p>
        {/* 完成後刪除 */}
      </div>
      <Modal show={show} animation={true}>
        <div id="formContainer_body">
          {/* 加toggle變長(註冊功能)，改高度用此選擇器 */}
          <div id="formContainer" className="dwo toggle">
            <div className="formLeft">
              <img src="/assets/images/member_testimg.png" />
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
                    <p>信箱</p>
                    <input
                      type="email"
                      placeholder=" "
                      onChange={emailInpButton}
                    />
                    <div className="border"></div>
                  </label>
                  <label>
                    <p>密碼</p>
                    <input
                      type="password"
                      placeholder=" "
                      onChange={passwordInpButton}
                    />
                    <div className="border"></div>
                  </label>
                  <label>
                    <p>請再次輸入密碼</p>
                    <input
                      type="password"
                      placeholder=" "
                      onChange={passwordCheckInpButton}
                    />
                    <div className="border"></div>
                  </label>
                  <button type="button" onClick={memberRegisterHandler}>
                    註 册
                  </button>
                </section>
                <footer>
                  <button
                    type="button"
                    className="registerBtn"
                    onClick={registerCloseHandle}
                  >
                    返回
                  </button>
                </footer>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MemberRegister;