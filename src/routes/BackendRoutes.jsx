// ----- 冠樺 ----- //
// ----- 測試用 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import BackendAvatar from '../components/BackendAvatar';
// import BackendTest from '../components/BackendTest';


export default (
   <React.Fragment>
      <Route path='backend/avatar' element={<BackendAvatar />} />
      {/* <Route path='backend/test' element={<BackendTest />} /> */}
   </React.Fragment>
)
