// ----- 晴暄----- //

import React, { useState, createContext, useEffect } from "react";
import GameStoreHeader from "../components/GameStoreHeader";
import GameStoreFirstPage from "../components/GameStoreFirstPage";
import GameStoreSecondPage from "../components/GameStoreSecondPage";
import GameRoomMain from "../components/GameRoomMain";
import Axios from "axios";

let GameRoomPage = () => {
   const [showFirst, setshowFirst] = useState("block");
   const [showSecond, setshowSecond] = useState("none");
   const [showRoom, setShowRoom] = useState("block");
   const [showStore, setShowStore] = useState("none");
   const [showStorage, setshowStorage ]= useState("none");
   const [upToDate, setUpToDate] = useState(false);
  

   let valueUpToDate = () => {
      console.log(upToDate);
   }

       


   


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
       
         {/* 主房間 */}
         <div>
         <GameRoomMain 
         show={showRoom} 
         showStorage={showStorage} 
         changePage={changePage} 
         showStoragePage={showStoragePage}
         showFirst={showFirst}
         setUpToDate={setUpToDate}
         upToDate={upToDate}
         > 
         </GameRoomMain>
         </div>
         
         {/* 商店 */}
         <div style={{display:showStore}}>
         <GameStoreHeader 
         changePage={changePage}></GameStoreHeader>

         <GameStoreFirstPage 
         show={showFirst} 
         showtoggle={showtoggle} 
         setUpToDate={setUpToDate}
         upToDate={upToDate}
         ></GameStoreFirstPage>

         <GameStoreSecondPage 
         show={showSecond} 
         showtoggle={showtoggle}
         setUpToDate={setUpToDate}
         upToDate={upToDate} 
         ></GameStoreSecondPage>
         </div>
      </React.Fragment>
   );
}

export default GameRoomPage;