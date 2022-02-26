// ----- 巧琳 ----- //

import React, { useState } from "react";
import Axios from "axios";
import "../css/member_style.css";
import Modal from "react-bootstrap/Modal";

let MemberLogin = (props) => {
  //State
  //inp內容
  let [memberInfo, setMemberInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  //inp錯誤提示
  let [passwordfalse, setPasswordfalse] = useState("none"); //contents
  let [emailfalse, setEmailfalse] = useState("none"); //contents
  //登入成功state
  let [outsec, setOutsec] = useState(2);
  let [showsuccess, setShowsuccess] = useState("none");

  // function
  //信箱input
  let emailInpButton = async (e) => {
    await setMemberInfo({ ...memberInfo, email: e.target.value });
  };

  //登入_button
  let memberCheckHandler = async () => {
    await Axios.post("http://localhost:5000/account/login", {
      acc_email: memberInfo.email,
      acc_password: memberInfo.password,
    }).then((result) => {});
  };
  //清除提示字
  let noticeClear = async () => {
    setEmailfalse("none");
    setPasswordfalse("none");
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
            <img src="/assets/images/member_photo.png" alt="頭相" />
          </div>
          <div className="formRight">
            {/* <!-- Login form --> */}
            <form id="login">
              <header>
                <h1 className="mt-4">忘記密碼</h1>
                <p>請輸入信箱</p>
              </header>
              <section>
                <label>
                  <p>信箱</p>
                  <input
                    type="text"
                    placeholder=" "
                    onChange={emailInpButton}
                    onClick={noticeClear}
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
                    註冊成功!!! {outsec + 1}秒後跳轉...
                  </span>
                </div>
                <button type="button" onClick={memberCheckHandler}>
                  送 出
                </button>
              </section>
              <footer>
                <button
                  type="button"
                  className="registerBtn"
                  onClick={props.showForgetToggle}
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
