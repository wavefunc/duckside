// ----- 巧琳 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import MemberChangePass from '../pages/MemberChangePass';
import MemberInfo from '../pages/MemberInfo.jsx';
import MemberLogin from '../pages/MemberLogin.jsx';
import MemberRegister from '../pages/MemberRegister.jsx';

export default (
   <React.Fragment>
      <Route path='member/info' element={<MemberInfo />} />
      <Route path='changePass' element={<MemberChangePass />} />
      <Route path='info' element={<MemberInfo />} />
      <Route path='login' element={<MemberLogin />} />
      <Route path='register' element={<MemberRegister />} />
   </React.Fragment>
)
