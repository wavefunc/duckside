// ----- 晴暄----- //

import React, { useState, createContext } from "react";
import GameStoreHeader from "../components/GameStoreHeader";
import GameStoreFirstPage from "../components/GameStoreFirstPage";
import GameStoreSecondPage from "../components/GameStoreSecondPage";
import GameRoomMain from "../components/GameRoomMain";
import GameStorage from "../components/GameStorage";
import GameStoreModal from "../components/GameStoreModal";

let GameRoomPage = () => {
   const [showFirst, setshowFirst] = useState("block");
   const [showSecond, setshowSecond] = useState("none");
   const [showRoom, setShowRoom] = useState("block");
   const [showStore, setShowStore] = useState("none");
   const [showStorage, setshowStorage ]= useState("none");
   


   function showtoggle(){      
      if (showFirst == "none"){
         setshowFirst("block");
      }else{
         setshowFirst("none");
      }
   
      if(showSecond =="block"){
         setshowSecond("none");
      }else{
         setshowSecond("block");
      }      
   }

   function changePage(){
      if(showRoom =="block"){
        setShowRoom("none"); 
      }else{
         setShowRoom("block");
      }

      if(showStore =="none"){
         setShowStore("block");
         setshowStorage("none");
      }else{
         setShowStore("none");
      }
   }

   function showStoragePage(){
      if(showStorage == "none"){
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
         showFirst={showFirst}> 
         </GameRoomMain>
         </div>
         

         <div style={{display:showStore}}>
         <GameStoreHeader changePage={changePage}></GameStoreHeader>
         <GameStoreFirstPage show={showFirst} showtoggle={showtoggle}></GameStoreFirstPage>
         <GameStoreSecondPage show={showSecond} showtoggle={showtoggle}></GameStoreSecondPage>
         </div>
         <GameStoreModal></GameStoreModal>
      </React.Fragment>
   );
}

export default GameRoomPage;