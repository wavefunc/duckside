// ----- 晴暄----- //

import React, { useState, createContext } from "react";
import GameRoomHeader from "../components/GameRoomHeader";
import GameRoomFirstPage from "../components/GameRoomFirstPage";
import GameRoomSecondPage from "../components/GameRoomSecondPage";

let GameRoomPage = () => {
   const [showFirst, setshowFirst] = useState("block");
   const [showSecond, setshowSecond] = useState("none");
   function showtoggle(){
      // setshowFirst("none");
      // setshowSecond("block");
      // if (showFirst == "none"){
      //    {setshowFirst == "block"}
      // }
      console.log("123");
      
      
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