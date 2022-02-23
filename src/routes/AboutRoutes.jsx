// ----- 沛珊 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import { About_site } from '../pages/About_site.jsx';
import About_team from '../pages/About_team.jsx';

export default (
   <React.Fragment>
      <Route path='about_site' element={<About_site />} />
      <Route path='about_team' element={<About_team />} />
   </React.Fragment>
)
