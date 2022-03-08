// ----- 冠樺----- //

import React, { useState, useEffect } from "react";
import Axios from "axios";
import RoomInterior from "../components/GsapRoomInterior";
import Storage from "../components/GsapStorage";
import StoreHeader from "../components/GsapStoreHeader";
import StoreFirstPage from "../components/GsapStoreFirstPage"

let GameRoom = () => {

   // 控制各頁面的 display，以及偵測頁面的更新
   const [pageDisplay, setPageDisplay] = useState({
      roomInterior: 'block',
      storage: 'none',
      storeHeader: 'none',
      storeFirstPage: 'none',
      purchaseConfirm: 'none',
      purchaseSuccess: 'none',
      purchaseFail: 'none'
   });
   const [updatePage, setUpdatePage] = useState(false);

   const pageHandler = {
      pageDisplay: pageDisplay,
      setPageDisplay: e => setPageDisplay(e),
      updatePage: updatePage,
      setUpdatePage: e => setUpdatePage(e)
   };

   // 控制總積分的顯示
   const [totalPoints, setTotalPoints] = useState();
   const resetTotalPoints = () => {
      Axios.post('http://localhost:5000/point_record/total', {
         acc_email: localStorage.getItem("loginState")
      }).then(result => {
         setTotalPoints(result.data.total);
      });
   };

   // 列出傢俱的屬性
   const [furnList, setFurnList] = useState([]);
   useEffect(() => {
      Axios.post('http://localhost:5000/gsap/roomList', {
         acc_email: localStorage.getItem("loginState")
      }).then(result => setFurnList(result.data));
      resetTotalPoints();
   }, [updatePage]);

   return (
      <React.Fragment>
         <div>
            <RoomInterior furnList={furnList} {...pageHandler} />
            <Storage furnList={furnList} {...pageHandler} />
            <StoreHeader totalPoints={totalPoints} {...pageHandler} />
            <StoreFirstPage
               furnList={furnList}
               resetTotalPoints={resetTotalPoints}
               {...pageHandler}
            />
         </div>
      </React.Fragment>
   );
}

export default GameRoom;