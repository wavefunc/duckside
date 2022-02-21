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
   


   function showtoggle(){      
      if (showFirst == "none"){
         setshowFirst("block")
      }else{
         setshowFirst("none");
      }
   
      if(showSecond =="block"){
         setshowSecond("none");
      }else{
         setshowSecond("block");
      }
      console.log("223");      
   }

   function changePage(){
      if(showRoom =="block"){
        setShowRoom("none"); 
      }else{
         setShowRoom("block");
      }
      

      if(showStore =="none"){
         setShowStore("block");
         console.log({showStore});
      }else{
         setShowStore("none");
         console.log({showStore});
      }
   }


   return(
      <React.Fragment>
         <div>
         <GameRoomMain show={showRoom} changePage={changePage}></GameRoomMain>
         </div>

         <div style={{display:showStore}}>
         <GameStoreHeader changePage={changePage}></GameStoreHeader>
         <GameStoreFirstPage show={showFirst} showtoggle={showtoggle}></GameStoreFirstPage>
         <GameStoreSecondPage show={showSecond} showtoggle={showtoggle}></GameStoreSecondPage>
         </div>
      </React.Fragment>
   );
}

export default GameRoomPage;