// ----- 冠樺 ----- //
// ----- 測試用 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import BackendAnimation from '../components/BackendAnimation';
import BackendAvatar from '../components/BackendAvatar';
import BackendTest from '../components/BackendTest';
import BackendGameRoom from '../components/BackendGameRoom';

export default (
   <React.Fragment>
      <Route path='backend/avatar' element={<BackendAvatar />} />
      <Route path='backend/test' element={<BackendTest />} />
      <Route path='backend/animation' element={<BackendAnimation />} />
      <Route path='backend/gameroom' element={<BackendGameRoom />} />
   </React.Fragment>
)
