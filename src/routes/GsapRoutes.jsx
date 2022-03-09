// ----- 冠樺 ----- //

import React from 'react';
import { Route } from "react-router-dom";
import GameDailyRun from '../components/GameDailyRun.jsx'
import GameDaily from '../pages/GameDaily.jsx';
import GameRoom from '../pages/GsapGameRoom';

export default (
   <React.Fragment>
      <Route path='game/daily' element={<GameDaily />} />
      <Route path='game/dailyrun' element={<GameDailyRun />} />
      <Route path='game/room' element={<GameRoom />} />
   </React.Fragment>
)
