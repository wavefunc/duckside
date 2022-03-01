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

       useEffect(() => {
         Axios.post('http://localhost:5000/acc_furn/storeList', {
            acc_email:localStorage.getItem("loginState"),

         })
         .then((result) => {
            console.log(result.data[0].display)
            setfunitureUse({...funitureUse, 
               "basketball":result.data[0].display,
               "bathTube":result.data[1].display,
               "light":result.data[2].display,
               "TV":result.data[3].display,
               "clock":result.data[4].display,
               "cabinet":result.data[5].display,
               "femaleDuck":result.data[6].display,
               "protrait":result.data[7].display,
               "glasses":result.data[8].display,
               "weight":result.data[9].display,
               "mirror":result.data[10].display               
             })
         })

       },[])

   


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
         <div>{funitureUse}</div>
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