// ----- 巧琳 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import MemberChangePass from '../pages/MemberChangePass';
import MemberInfo from '../pages/MemberInfo.jsx';


export default (
   <React.Fragment>
      <Route path='member/info' element={<MemberInfo />} />
      <Route path='member/changePass' element={<MemberChangePass />} />
   </React.Fragment>
)
