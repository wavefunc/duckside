import React, { useState, useEffect } from 'react';
import Axios from "axios";

import Furniture from "./GsapFurniture";

function GameRoom() {
   const [furnList, setFurnList] = useState([]);

   useEffect(() => {
      Axios.post('http://localhost:5000/gsap/roomList', {
         acc_email: localStorage.getItem("loginState")
      }).then(result => {
         setFurnList(result.data);
      });
   }, []);

   return (
      <div id="container">
         <svg width="100%" viewBox="0 0 1920 1080" fill="none">
            <path id="Vector" d="M1920 0H0V1080H1920V0Z" fill="#F5F5CC" />
            <path id="horizon" d="M0 676H1920" stroke="#53480B" strokeWidth="6" />
            <Furniture key='duck' furn_id='duck' />
            {
               furnList.map(obj => <Furniture key={obj && obj.furn_id} {...obj} />)
            }
         </svg>
      </div>
   );
}

export default GameRoom;