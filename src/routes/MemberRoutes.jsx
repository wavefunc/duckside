// ----- 巧琳 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import MemberChangePass from '../pages/MemberChangePass';
import MemberInfo from '../pages/MemberInfo.jsx';
// import MemberLogin from '../pages/MemberLoginPage.jsx';
// import MemberRegister from '../pages/MemberRegister.jsx';
import MemberLoginPage from "../pages/MemberLoginPage.jsx"

export default (
   <React.Fragment>
      <Route path='login' element={<MemberLoginPage />} />
      <Route path='member/info' element={<MemberInfo />} />
      <Route path='changePass' element={<MemberChangePass />} />
      {/* <Route path='info' element={<MemberLoginPage />} /> */}
      {/* <Route path='register' element={<MemberRegister />} /> */}
   </React.Fragment>
)
