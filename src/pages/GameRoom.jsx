// ----- 晴暄----- //

import React, { useState, createContext } from "react";
import GameStoreHeader from "../components/GameStoreHeader";
import GameStoreFirstPage from "../components/GameStoreFirstPage";
import GameStoreSecondPage from "../components/GameStoreSecondPage";
import GameRoomMain from "../components/GameRoomMain";

let GameRoomPage = () => {
   const [showFirst, setshowFirst] = useState("block");
   const [showSecond, setshowSecond] = useState("none");
   const [showRoom, setShowRoom] = useState("block");
   const [showStore, setShowStore] = useState("none");
   const [showStorage, setshowStorage ]= useState("none");
   const [funitureHave, setfunitureHave] = useState(
      {"light":"none",
       "basketball":"none",
      "bathTube":"none",
      "TV":"none",
      "cabinet":"none",
      "mirror":"none",
      "femaleDuck":"none",
      "glasses":"none",
      "clock":"none",
      "weight":"none",
      "protrait":"none"}
       )
   const [funitureUse, setfunitureUse] = useState(
      {"light":"block",
      "basketball":"block",
      "bathTube":"block",
      "TV":"block",
      "cabinet":"block",
      "mirror":"block",
      "femaleDuck":"block",
      "glasses":"block",
      "clock":"block",
      "weight":"block",
      "protrait":"block"}
       )

   


   function showtoggle(){      
      if (showFirst === "none"){
         setshowFirst("block");
      }else{
         setshowFirst("none");
      }
   
      if(showSecond === "block"){
         setshowSecond("none");
      }else{
         setshowSecond("block");
      }      
   }

   function changePage(){
      if(showRoom === "block"){
        setShowRoom("none"); 
      }else{
         setShowRoom("block");
      }

      if(showStore === "none"){
         setShowStore("block");
         setshowStorage("none");
      }else{
         setShowStore("none");
      }
   }

   function showStoragePage(){
      if(showStorage === "none"){
         setshowStorage("block");
      }else{
         setshowStorage("none")
      }
   }


   return(
      <React.Fragment>
         <div>
         <GameRoomMain 
         show={showRoom} 
         showStorage={showStorage} 
         changePage={changePage} 
         showStoragePage={showStoragePage}
         showFirst={showFirst}
         funitureUse={funitureUse}> 
         </GameRoomMain>
         </div>
         

         <div style={{display:showStore}}>
         <GameStoreHeader 
         changePage={changePage}></GameStoreHeader>

         <GameStoreFirstPage 
         show={showFirst} 
         showtoggle={showtoggle} 
         funitureHave={funitureHave}></GameStoreFirstPage>

         <GameStoreSecondPage 
         show={showSecond} 
         showtoggle={showtoggle} 
         funitureHave={funitureHave}></GameStoreSecondPage>
         </div>
      </React.Fragment>
   );
}

export default GameRoomPage;