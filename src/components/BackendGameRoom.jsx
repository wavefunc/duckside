import "../css/GameRoomMain_style.css";
import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import Furniture from "./BackendFurniture";


function GameRoom() {

   useEffect(() => {

      // console.log(objPos);
      gsap.to("#duck", { duration: 1, rotation: 360 });
   }, []);

   return (
      <div id="container">
         <svg width="100%" viewBox="0 0 1920 1080" fill="none">
            <path id="Vector" d="M1920 0H0V1080H1920V0Z" fill="#F5F5CC" />
            <Furniture />
         </svg>
      </div>
   );
}

export default GameRoom;