import "../css/GameRoomMain_style.css";
import Axios from "axios";
import React, { useState, useEffect } from 'react';
import Furniture from "./BackendFurniture";
import Draggable from "react-draggable";
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';


function GameRoom() {
   return (
      <Container fluid style={{
         backgroundColor: '#f5f5cc',
         aspectRatio: '16/9'
      }}>
         <Draggable>
            <div style={{ width: "15vw", height: "15vw" }}>
               <Furniture />
            </div>
         </Draggable>
      </Container>
   );
}

export default GameRoom;