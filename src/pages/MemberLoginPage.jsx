// ----- 巧琳 ----- //

import React, { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import "../css/member_style.css";
import MemberLogin from "../components/MemberLogin";
import MemberRegister from "../components/MemberRegister";




let MemberLoginPage = () => {
  
  const [registerState, setRegisterState] = useState(false);

  return (
    <React.Fragment>
      <MemberLogin registerSet={setRegisterState}></MemberLogin>
      <MemberRegister register={registerState} registerSet={setRegisterState}></MemberRegister>
    </React.Fragment>
  );
};

export default MemberLoginPage;
