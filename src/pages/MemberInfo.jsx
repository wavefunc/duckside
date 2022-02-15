// ----- 巧琳 ----- //

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import $ from "jquery";
import "../css/member_style.css";
// import "../../public/css/member_style.css"

let MemberInfo = () => {
  //轉址
  let navigate = useNavigate();

  let [memberId, setCount] = useState([
    { account: "test", password: "test123" },
    { account: "test1", password: "test123" },
    { account: "test2", password: "test123" },
    { account: "test3", password: "test123" },
  ]);
  let [memberAccount, setAccount] = useState("test");
  let [memberPassword, setPassword] = useState();

  useEffect(() => {
    $(".forgotBtn").click(function () {
      $("#forgot").toggleClass("toggle");
    });

    $(".registerBtn").click(function () {
      $("#register, #formContainer").toggleClass("toggle");
    });
  });
  //帳號input
  let accountInpButton = async (e) => {
    await memberAccount(e.target.value);
    // console.log(e.target.value)
  };
  //登入_button
  let memberCheckHandler = async () => {
    await Axios.post("http://localhost:5000/member/add", "edward123").then(
      (result) => {
        console.log(result.data);
      }
    );

    // $.ajax({
    //   type: "post",
    //   url: "http://localhost:5000/member/add ",
    //   data: "edward123",
    //   success: function (data, status, xhr) {
    //     console.log(data);
    //     //轉址
    //     // navigate('/');
    //   },
    // });
  };

  return (
    <div>
      <div>
        {memberId.map((item, index) => {
          return <div key={index}>{item.account}</div>;
        })}
      </div>
      <div id="formContainer_body">
        <div id="formContainer" className="dwo">
          <div className="formLeft">
            <img src="/assets/images/member_testimg.png" />
          </div>
          <div className="formRight">
            {/* <!-- Forgot password form --> */}
            <form id="forgot" className="otherForm">
              <header>
                <h1>忘記密碼</h1>
                <p>輸入信箱找回密碼</p>
              </header>
              <section>
                <label>
                  <p>信箱</p>
                  <input type="email" placeholder=" " />
                  <div className="border"></div>
                </label>
                <label className="col-6">
                  <p>驗證碼</p>
                  <input type="password" placeholder=" " />
                  <div className="border"></div>
                </label>
                <button type="submit">發送信件</button>
              </section>
              <footer>
                <button type="button" className="forgotBtn">
                  返回
                </button>
              </footer>
            </form>

            {/* <!-- Login form --> */}
            <form id="login">
              <header>
                <h1>歡迎回來</h1>
                <p>請先登入</p>
              </header>
              <section>
                <label>
                  <p>帳號</p>
                  <input
                    type="text"
                    placeholder=" "
                    onChange={accountInpButton}
                  />
                  <div className="border"></div>
                </label>
                <label>
                  <p>密碼</p>
                  <input type="password" placeholder=" " />
                  <div className="border"></div>
                </label>
                <button type="button" onClick={memberCheckHandler}>
                  登 入
                </button>
              </section>
              <footer>
                <button type="button" className="forgotBtn">
                  忘記密碼?
                </button>
                <button type="button" className="registerBtn">
                  新用戶?
                </button>
              </footer>
            </form>

            {/* <!-- Register form --> */}
            <form id="register" className="otherForm">
              <header>
                <h1>用戶註冊</h1>
                <p>註冊後享受更多服務</p>
              </header>
              <section>
                <label>
                  <p>帳號</p>
                  <input type="text" placeholder=" " />
                  <div className="border"></div>
                </label>
                <label>
                  <p>信箱</p>
                  <input type="email" placeholder=" " />
                  <div className="border"></div>
                </label>
                <label>
                  <p>密碼</p>
                  <input type="password" placeholder=" " />
                  <div className="border"></div>
                </label>
                <label>
                  <p>重複密碼</p>
                  <input type="password" placeholder=" " />
                  <div className="border"></div>
                </label>
                <button type="submit">註 册</button>
              </section>
              <footer>
                <button type="button" className="registerBtn">
                  返回
                </button>
              </footer>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;

// // ******************************************
// //註冊_button轉址
// let registerClickHandle = async () => {
//   navigate("/register");
// };
// //忘記密碼_button轉址
// let changepassClickHandle = async () => {
//   navigate("/changePass");
// };
// //登入_button轉址
// let loginClickHandle = async () => {
//   navigate("/login");
// };

// // ******************************************

// //帳號input
// let accountInpButton = async (e) => {
//   await setEmail(e.target.value);
// };
// //密碼input
// let passwordInpButton = async (e) => {
//   await setPassword(e.target.value);
// };
// // 密碼檢查input
// let passwordCheckInpButton = async (e) => {
//   await setCheckPassword(e.target.value);
// };
// // ******************************************
