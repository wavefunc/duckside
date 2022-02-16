// ----- 巧琳 ----- //

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "../css/member_style.css";

let MemberChangePass = () => {
  //轉址
  let navigate = useNavigate();

  let [memberEmail, setEmail] = useState();
  let [memberPassword, setPassword] = useState();

  //信箱input
  let emailInpButton = async (e) => {
    //   await console.log(e.target.value)
    await setEmail(e.target.value);
    // console.log(e.target.value)
  };
  //登入_button
  let memberChangeHandler = () => {
    //  await Axios.post("http://localhost:5000/member/add", {title:'123'}).then(
    //    (result) => {
    //      console.log(result.data);
    //    }
    //  );
    let dataToServer = {
      name: 'Fred',
    }
    let url= "/member/add";
    Axios.post(url,dataToServer,{
      baseURL: 'http://localhost:5000'
    })
    // console.log(`req send: ${JSON.stringify(dataToServer)}`)
    // await $.ajax({
    //   type:"post",
    //   url:"http://localhost:5000/member/add",
    //   data:{name:"123"},
    //   success: function(){
    //     console.log("yes!")
    //   }
    // })
  };
  //登入_button轉址
  let loginClickHandle = async () => {
    navigate("/login");
  };

  return (
    <div>
      <div>
        {/* 完成後刪除 */}
        <h1>test</h1>
        <p>{memberEmail}</p>
        {/* 完成後刪除 */}
      </div>
      <div id="formContainer_body">
        {/* 加toggle變長(註冊功能)，改高度用此選擇器 */}
        <div id="formContainer" className="dwo">
          <div className="formLeft">
            <img src="/assets/images/member_testimg.png" />
          </div>
          <div className="formRight">
            {/* <!-- Forgot password form --> */}
            <form id="forgot" className="otherForm toggle">
              <header>
                <h1>變更密碼</h1>
                <p>輸入新密碼</p>
              </header>
              <section>
                <label>
                  <p>新密碼</p>
                  <input
                    type="password"
                    placeholder=" "
                    onChange={emailInpButton}
                  />
                  <div className="border"></div>
                </label>
                <label>
                  <p>請再次輸入密碼</p>
                  <input
                    type="password"
                    placeholder=" "
                    onChange={emailInpButton}
                  />
                  <div className="border"></div>
                </label>
                <button type="button" onClick={memberChangeHandler}>
                  發送信件
                </button>
              </section>
              <footer>
                <button
                  type="button"
                  className="forgotBtn"
                  onClick={loginClickHandle}
                >
                  返回
                </button>
              </footer>
            </form>

            {/* <!-- Login form --> */}
            <form id="login">
              <section></section>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberChangePass;

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
// let emailInpButton = async (e) => {
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
