// ----- 巧琳 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import MemberInfo from '../pages/MemberInfo.jsx';


export default (
   <React.Fragment>
      <Route path='member/info' element={<MemberInfo />} />
      <Route path='resetPass/:params' element={<MemberInfo />} />
   </React.Fragment>
)
