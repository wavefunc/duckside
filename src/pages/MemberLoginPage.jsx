// ----- 巧琳 ----- //

import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/member_style.css";
import MemberLogin from "../components/MemberLogin";
import MemberRegister from "../components/MemberRegister";




let MemberLoginPage = () => {
  //MemberLoginPage***start
  const [showLogin, setShowLogin] = useState(true);
  const [showregister, setShowRegister] = useState(false);
  function showtoggle() {
    setShowLogin(!showLogin);
    setShowRegister(!showregister);
  }
  function showClose() {
    setShowLogin(false);
    setShowRegister(false);
  }
  //MemberLoginPage***end


  return (
    <React.Fragment>
      <MemberLogin show={showLogin} showtoggle={showtoggle} close={showClose}></MemberLogin>
      <MemberRegister show={showregister} showtoggle={showtoggle}></MemberRegister>
    </React.Fragment>
  );
};

export default MemberLoginPage;
