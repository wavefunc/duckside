// ----- 人豪 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import ManageAsset from '../pages/ManageAsset.jsx';
import ManageCheck from '../pages/ManageCheck.jsx';
import ManageDashboard from '../pages/ManageDashboard.jsx';
import ManagePlan from '../pages/ManagePlan.jsx';
import ManageTransaction from '../pages/ManageTransaction.jsx';

export default (
   <React.Fragment>
      <Route path='manage/plan' element={<ManagePlan />} />
      <Route path='manage/transaction' element={<ManageTransaction />} />
      <Route path='manage/asset' element={<ManageAsset />} />
      <Route path='manage/check' element={<ManageCheck />} />
      <Route path='*' element={<ManageDashboard />} />
   </React.Fragment>
)
