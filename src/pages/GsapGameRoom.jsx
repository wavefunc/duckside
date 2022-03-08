// ----- 冠樺----- //

import React, { useState, createContext, useEffect } from "react";
import RoomInterior from "../components/GsapRoomInterior";
import Storage from "../components/GsapStorage";
import StoreHeader from "../components/GsapStoreHeader";
import StoreFirstPage from "../components/GsapStoreFirstPage"

import Axios from "axios";

export const TotalPointsContext = createContext();

let GameRoom = () => {

   // 控制各頁面的 display，以及偵測頁面的更新
   const [pageDisplay, setPageDisplay] = useState({
      roomInterior: 'block',
      storage: 'none',
      storeHeader: 'none',
      storeFirstPage: 'none',
      purchaseConfirm: 'none',
      purchaseSuccess: 'none'
   });

   const [updatePage, setUpdatePage] = useState(0);

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
      }).then(result => setFurnList(result.data));
   }, [updatePage]);

   // 用來修改、偵測總積分
   const [totalPoints, setTotalpoints] = useState(0);

   return (
      <React.Fragment>
         <div>
            <RoomInterior furnList={furnList} {...pageHandler} />
            <Storage furnList={furnList} {...pageHandler} />
            <TotalPointsContext.Provider value="500">
               <StoreHeader {...pageHandler} />
               <StoreFirstPage furnList={furnList} {...pageHandler} />
            </TotalPointsContext.Provider>
         </div>
      </React.Fragment>
   );
}

export default GameRoom;