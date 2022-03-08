// ----- 冠樺----- //

import React, { useState, createContext, useEffect } from "react";
import RoomInterior from "../components/GsapRoomInterior";
import Storage from "../components/GsapStorage";
import StoreHeader from "../components/GsapStoreHeader";
import StoreFirstPage from "../components/GsapStoreFirstPage"
import StoreSecondPage from "../components/GsapStoreSecondPage"

import Axios from "axios";

let GameRoom = () => {

   const [pageDisplay, setPageDisplay] = useState({
      roomInterior: 'block',
      storage: 'none',
      storeHeader: 'none',
      storeFirstPage: 'none',
      storeSecondPage: 'none',
   });

   const displayHandler = {
      pageDisplay: pageDisplay,
      setPageDisplay: e => setPageDisplay(e)
   };

   const [furnList, setFurnList] = useState([]);

   useEffect(() => {
      Axios.post('http://localhost:5000/gsap/roomList', {
         acc_email: localStorage.getItem("loginState")
      }).then(result => {
         setFurnList(result.data);
      });
   }, []);



   return (
      <React.Fragment>
         <div>
            <RoomInterior furnList={furnList} {...displayHandler} />
            <Storage furnList={furnList} {...displayHandler} />
            <StoreHeader {...displayHandler} />

            <StoreFirstPage furnList={furnList} {...displayHandler} />
            {/* <StoreSecondPage {...displayHandler} /> */}
         </div>
      </React.Fragment>
   );
}

export default GameRoom;