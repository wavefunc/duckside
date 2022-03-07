import React, { useState, useEffect } from 'react';
import Axios from "axios";

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
      <div id="gameStorage">
         <div id="closeBtn" style={{ cursor: "pointer" }}>
            <svg width="50" viewBox="0 0 146 146">
               <g transform="translate(-1742 -29)">
                  <g id="Ellipse_61" data-name="Ellipse 61" transform="translate(1742 29)" fill="#256170" stroke="#707070" strokeWidth="1">
                     <circle cx="73" cy="73" r="73" stroke="none" />
                     <circle cx="73" cy="73" r="72.5" fill="none" />
                  </g>
                  <path id="Icon_ionic-md-close" data-name="Icon ionic-md-close" d="M76.262,14.4,69.389,7.523l-27.5,27.5L14.4,7.523,7.523,14.4l27.5,27.5-27.5,27.5L14.4,76.262l27.5-27.5,27.5,27.5,6.873-6.873-27.5-27.5Z" transform="translate(1773.107 60.107)" fill="#fff" />
               </g>
            </svg>
         </div>
         <div id="cardBox">
            <div id="littleCardBox" >
               {
                  furnList[0] && furnList.map(obj => {
                     return (
                        <li id="storageCard1" style={{ cursor: "pointer", display: "block" }}>
                           <img src={`/assets/furniture/${obj.furn_id}.svg`} width='100px' height='100px' />
                        </li>
                     );
                  })
               }
            </div>
         </div>
      </div>
   );
}

export default GameRoom;