import "../css/GameRoomMain_style.css";
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import Furniture from "./BackendFurniture";
import Draggable from "react-draggable";
import { Container } from 'react-bootstrap';


function GameRoom() {
   const [pos, setPos] = useState({ x: '100', y: '100' });
   const [container, setContainer] = useState({});

   const eventDrag = (e, data) => {
      // console.log('Event: ', e.x);
      // console.log('Data: ', data);
      setPos({ x: e.x, y: e.y });
   };

   const getContainerPos = (e) => {

      // console.log('x: ', container.x);
      // console.log('y: ', container.y);
      // console.log('width: ', container.width);
      // console.log('height: ', container.height);
   }


   useEffect(() => {
      var ro = new ResizeObserver(entry => {
         setContainer(entry);
      });
      // .observe('container');
      // ro.observe(document.getElementById("container").getBoundingClientRect());
      console.log(container);
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
         <Draggable onDrag={eventDrag}>
            <div style={{ width: "15vw", height: "15vw" }}>
               <Furniture />
            </div>
         </Draggable>
      </Container>
   );
}

export default GameRoom;