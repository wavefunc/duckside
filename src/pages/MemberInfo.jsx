// ----- 巧琳 ----- //

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import $ from "jquery";
import "../css/member_style.css";
// import "../../public/css/member_style.css"

let MemberInfo = () => {
  return (
    <div className="container-xl px-4 mt-4">
      <div className="row">
        <div className="col-xl-4">
          {/* <!-- Profile picture card--> */}
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">會員頭像</div>
            <div className="card-body text-center">
              {/* <!-- Profile picture image--> */}
              <img
                className="img-account-profile rounded-circle mb-2 w-100"
                src="http://bootdey.com/img/Content/avatar/avatar1.png"
                alt=""
              />
              {/* <!-- Profile picture help block--> */}
              <div className="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              {/* <!-- Profile picture upload button--> */}
              <button className="btn btn-primary" type="button">
                上傳照片
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          {/* <!-- Account details card--> */}
          <div className="card mb-4">
            <div className="card-header">會員資訊</div>

            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    Email(帶入登入會員資料，不可更改!)
                  </label>
                  <p>123@gmail.com</p>
                </div>
                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    暱稱
                  </label>
                  <p>皮卡丘</p>
                </div>
              </form>
            </div>
            {/* Name change*/}
            <div className="card-header">更改暱稱</div>

            <div className="card-body">
              <form>
                <div className="row gx-3 mb-3">
                  <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    請輸入新暱稱
                  </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      value="Valerie"
                    />
                  </div>
                  <button className="btn btn-primary mb-3 ml-3 mt-4" type="button">
                    更改暱稱
                  </button>
                </div>
              </form>
            </div>

            {/* Password change */}
            <div className="card-header">更改密碼</div>

            <div className="card-body">
              <form>
       
                  <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    請輸入舊密碼
                  </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      value="Valerie"
                    />
                  </div>
                  <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    請輸入新密碼
                  </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      value="Valerie"
                    />
                  </div>
                  <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputUsername">
                    請再次輸入新密碼
                  </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder="Enter your first name"
                      value="Valerie"
                    />
                  </div>
                  <button className="btn btn-primary" type="button">
                    更改密碼
                  </button>
             
              </form>
            </div>
            {/* Password change */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberInfo;
