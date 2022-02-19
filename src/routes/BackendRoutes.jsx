// ----- 冠樺 ----- //
// ----- 測試用 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import BackendDatatype from '../components/BackendDatatype';


export default (
   <React.Fragment>
      <Route path='backend/datatype' element={<BackendDatatype />} />
   </React.Fragment>
)
