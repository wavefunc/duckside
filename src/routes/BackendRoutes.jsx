// ----- 冠樺 ----- //
// ----- 測試用 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import BackendAvatar from '../components/BackendAvatar';


export default (
   <React.Fragment>
      <Route path='backend' element={<BackendAvatar />} />
   </React.Fragment>
)
