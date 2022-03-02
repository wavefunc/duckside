// ----- 巧琳 ----- //

import React, { useState } from "react";
import Axios from "axios";
import "../css/member_style.css";
import Modal from "react-bootstrap/Modal";

let MemberLogin = (props) => {
  //********************
  //State
  //memberInfo
  let [memberInfo, setMemberInfo] = useState({
    email: "",
    name: "",
  });
  // noticeState
  let [forgetNoticeState, setForgetNoticeState] = useState({
    show: "none", //block/none
    text: "",
    color: "", //text-danger/text-success
  });
  // function
  //信箱input
  let emailInpChange = async (e) => {
    setForgetNoticeState({
      ...forgetNoticeState,
      show: "none",
    });
    await setMemberInfo({ ...memberInfo, email: e.target.value });
  };

  //登入button
  let memberButClick = async () => {
    await Axios.post("http://localhost:5000/account/emailValidation", {
      acc_email: memberInfo.email,
    }).then((result) => {
      if (result.data === "No such account") {
        //失敗無此帳號
        setForgetNoticeState({
          ...forgetNoticeState,
          show: "block",
          text: "查無此帳號，驗證信發送失敗!",
          color: "text-danger",
        });
      }else{
        //成功寄送驗證信
        setForgetNoticeState({
          ...forgetNoticeState,
          show: "block",
          text: "驗證信已寄送至帳號信箱中!",
          color: "text-success",
        });
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
        <div id="formContainer" className="dwo forget">
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
                    onChange={emailInpChange}
                  />
                  <div className="border"></div>
                </label>

                <div className="d-flex justify-content-center">
                  <span
                    className={forgetNoticeState.color}
                    style={{ display: forgetNoticeState.show }}
                  >
                    {forgetNoticeState.text}
                  </span>
                </div>
                <button type="button" onClick={memberButClick}>
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
