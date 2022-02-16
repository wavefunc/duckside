// ----- 晴暄----- //

import React, { useState, createContext } from "react";
import GameRoomHeader from "../components/GameRoomHeader";
import GameRoomFirstPage from "../components/GameRoomFirstPage";
import GameRoomSecondPage from "../components/GameRoomSecondPage";

let GameRoomPage = () => {
   const [showFirst, setshowFirst] = useState(true);
   const [showSecond, setshowSecond] = useState(false);
   function showtoggle(){
      setshowFirst(!showFirst);
      setshowSecond(!showSecond);
   }

   return(
      <React.Fragment>
         <GameRoomHeader></GameRoomHeader>
         <GameRoomFirstPage show={showFirst} showtoggle={showtoggle}></GameRoomFirstPage>
         <GameRoomSecondPage show={showSecond} showtoggle={showtoggle}></GameRoomSecondPage>
      </React.Fragment>
   );
}

export default GameRoomPage;