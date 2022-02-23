// ----- 巧琳 ----- //

import React, { useState } from "react";
import Axios from "axios";
import "../css/member_style.css";
import Modal from "react-bootstrap/Modal";

let MemberLogin = (props) => {
  //State
  let [memberEmail, setEmail] = useState();
  let [memberPassword, setPassword] = useState();

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
    // await Axios.post("/account/create", {"acc_email":"123", "acc_password":"456", "acc_name":"789"}).then(
    //   (result) => {
    //     console.log(result);
    //   }
    // );
  };

  return (
    <Modal
      size="lg"
      show={props.show}
      animation={true}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal id="example-modal-sizes-title-lg"></Modal>
      <div id="formContainer_body">
        <div id="formContainer" className="dwo">
          <div className="formLeft">
            <img src="/assets/images/member_testimg.png" alt="頭相"/>
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
                  onClick={props.showtoggle}
                >
                  新用戶?
                </button>
                <button
                  type="button"
                  className="registerBtn"
                  onClick={props.close}
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
