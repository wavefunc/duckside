// ----- 冠樺 ----- //
// ----- 測試用 ----- //

import React from 'react';
import { Route } from "react-router-dom";

import GameRoom from '../pages/GsapGameRoom';

export default (
   <React.Fragment>
      <Route path='gsap/GameRoom' element={<GameRoom />} />
   </React.Fragment>
)
