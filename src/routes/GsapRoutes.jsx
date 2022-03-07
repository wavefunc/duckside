// ----- 冠樺 ----- //
// ----- 測試用 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import GameRoom from '../components/GsapGameRoom';

export default (
   <React.Fragment>
      <Route path='gsap/gameroom' element={<GameRoom />} />
   </React.Fragment>
)
