// ----- 冠樺----- //

import React, { useState, createContext, useEffect } from "react";
import RoomInterior from "../components/GsapRoomInterior";
import Storage from "../components/GsapStorage";
import StoreHeader from "../components/GsapStoreHeader";
import StoreFirstPage from "../components/GsapStoreFirstPage"
import StoreSecondPage from "../components/GsapStoreSecondPage"

import Axios from "axios";

let GameRoom = () => {

   // 控制各頁面的 display，以及偵測頁面的更新
   const [pageDisplay, setPageDisplay] = useState({
      roomInterior: 'block',
      storage: 'none',
      storeHeader: 'none',
      storeFirstPage: 'none',
      storeSecondPage: 'none',
   });

   const [updatePage, setUpdatePage] = useState(false);

   const pageHandler = {
      pageDisplay: pageDisplay,
      setPageDisplay: e => setPageDisplay(e),
      updatePage: updatePage,
      setUpdatePage: e => setUpdatePage(e)

   };

   // 列出傢俱的屬性
   const [furnList, setFurnList] = useState([]);

   useEffect(() => {
      Axios.post('http://localhost:5000/gsap/roomList', {
         acc_email: localStorage.getItem("loginState")
      }).then(result => {
         setFurnList(result.data);
      });
   }, [updatePage]);


   return (
      <React.Fragment>
         <div>
            <RoomInterior furnList={furnList} {...pageHandler} />
            <Storage furnList={furnList} {...pageHandler} />
            <StoreHeader {...pageHandler} />

            <StoreFirstPage furnList={furnList} {...pageHandler} />
            {/* <StoreSecondPage {...pageHandler} /> */}
         </div>
      </React.Fragment>
   );
}

export default GameRoom;