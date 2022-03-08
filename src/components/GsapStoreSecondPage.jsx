// ----- 冠樺----- //

import React, { useState, useEffect } from 'react';
import Axios from "axios";

function StoreSecondPage({ pageDisplay = {}, setPageDisplay = f => f }) {
   const [furnList, setFurnList] = useState([]);

   useEffect(() => {
      Axios.post('http://localhost:5000/gsap/roomList', {
         acc_email: localStorage.getItem("loginState")
      }).then(result => {
         setFurnList(result.data);
      });
   }, []);

   return (
      <div id="gameStorage">
         <h2>I am StoreSecondPage</h2>
      </div>
   );
}

export default StoreSecondPage;