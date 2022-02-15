// ----- 巧琳 ----- //

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../css/member_style.css";
// import "../../public/css/member_style.css"

let MemberLogin = () => {
  //轉址
  let navigate = useNavigate();

  let [memberEmail, setEmail] = useState({iD:1});
  let [memberPassword, setPassword] = useState();
  let [test, setTest] = useState({item1:"Juice"});

  //信箱input
  let emailInpButton = async (e) => {
    await setEmail(e.target.value);
  };
  //密碼input
  let passwordInpButton = async (e) => {
    await setPassword(e.target.value);
  };
  //登入_button
  let memberCheckHandler = async () => {
    await Axios.post("http://localhost:5000/member/add", "123").then(
      (result) => {
        console.log(result);
      }
    );
  };
  //註冊_button轉址
  let registerClickHandle = async () => {
    navigate("/register");
  };


  return (
    <div>
      <div>
        {/* 完成後刪除 */}
        <h1>test</h1>
        <p>{memberEmail}</p>
        <p>{memberPassword}|</p>
        {/* 完成後刪除 */}
      </div>
      <div id="formContainer_body">
        <div id="formContainer" className="dwo">
          <div className="formLeft">
            <img src="/assets/images/member_testimg.png" />
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
                <button type="button" onClick={memberCheckHandler}>
                  登 入
                </button>
              </section>
              <footer>
                {/* <button
                  type="button"
                  className="forgotBtn"
                 
                >
                  忘記密碼?
                </button> */}
                <button
                  type="button"
                  className="registerBtn"
                  onClick={registerClickHandle}
                >
                  新用戶?
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberLogin;
