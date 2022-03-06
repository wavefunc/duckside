import "../css/GameRoomMain_style.css";
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import Furniture from "./BackendFurniture";
import Draggable, { DraggableCore } from "react-draggable";
import { Container } from 'react-bootstrap';


function GameRoom() {
   const [pos, setPos] = useState({ x: 0.5, y: 0.5 }); // 設定元件在 Container 內相對比例的x|y位置
   const [container, setContainer] = useState({}); // 用來讀取 Container tag 的 x, y, width, height

   const eventDrag = (e, data) => {
      setPos({ x: e.x, y: e.y });
   };

   const getContainerPos = (e) => {

      // console.log('x: ', container.x);
      // console.log('y: ', container.y);
      // console.log('width: ', container.width);
      // console.log('height: ', container.height);
   };

   const getRelativePos = (posOrigin) => {
      console.log(posOrigin.x);
      // (posOrigin.x - container.x)* newcontainer.width / container.width
   };

   var temp = 300;

   useEffect(() => {

      // window size 改變時的 event
      window.addEventListener('resize', () => {
         setContainer(document.getElementById("container").getBoundingClientRect());
         // setPos({x: , y:})
         getRelativePos(pos);
      });


   }, []);

   return (
      <Container id="container" fluid
         style={{
            backgroundColor: '#f5f5cc',
            aspectRatio: '16/9',
         }}
         onClick={getContainerPos}
      >
         <label>{JSON.stringify(container)}</label>
         <button onClick={getContainerPos}>checkPos</button>
         <Draggable
            onDrag={eventDrag}
            // defaultPosition={{ x: (0.5 * container.width + container.x), y: (0.5 * container.height + container.y) }}
            defaultPosition={{ x: container.width , y: 300 }}
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