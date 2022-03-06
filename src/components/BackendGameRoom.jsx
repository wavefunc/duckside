import "../css/GameRoomMain_style.css";
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import Furniture from "./BackendFurniture";
import Draggable from "react-draggable";
import { Container } from 'react-bootstrap';


function GameRoom() {
   const [pos, setPos] = useState({ x: 0.5, y: 0.5 }); // 設定元件在 Container 內相對比例的x|y位置
   const [container, setContainer] = useState({}); // 用來讀取 Container tag 的 x, y, width, height
   const [objPos, setObjPos] = useState({ x: 100, y: 100 }); // 用來設定元件的位置
   var timeout = false;

   const eventDrag = (e, data) => {
      setPos({ x: e.x, y: e.y });
   };

   const getContainerPos = (e) => {

   };

   const getRelativePos = (posOrigin) => {
      // console.log(posOrigin.x);
      // (posOrigin.x - container.x)* newcontainer.width / container.width
   };

   const setPosition = () => {
      // setContainer(document.getElementById("container").getBoundingClientRect());
      const { x, y } = objPos;
      setObjPos({ x: x + 100, y: 100 });
   };

   // window size 改變時的 event
   window.addEventListener('resize', () => {
      // 利用 timeout 避免 resize 連續被觸發
      clearTimeout(timeout);
      timeout = setTimeout(setPosition, 250);
   });

   // setPosition();


   useEffect(() => {

      // console.log(objPos);
   }, []);

   return (
      <Container id="container" fluid
         style={{
            backgroundColor: '#f5f5cc',
            aspectRatio: '16/9',
         }}
         onClick={getContainerPos}
      >
         <label>{JSON.stringify(objPos)}</label>
         <button onClick={getContainerPos}>checkPos</button>
         <Draggable
            onDrag={eventDrag}
            // Position={{ x: (0.5 * container.width + container.x) || 300, y: (0.5 * container.height + container.y) || 300 }}
            Position={objPos}
         // defaultPosition={{ x: 300, y: 300 }}
         // bounds='#container'
         >

            <div style={{ width: "15vw", height: "15vw" }}>
               <Furniture />
            </div>

         </Draggable>
      </Container >
   );
}

export default GameRoom;