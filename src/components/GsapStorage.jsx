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
         <ul>
            <li>
               <svg width="130" height="130" viewBox="0 0 130 130" >
                  <g id="lightcCard" transform="translate(-629 -445)">
                  </g>
               </svg>
            </li>
         </ul>
      </div>
   );
}

export default GameRoom;