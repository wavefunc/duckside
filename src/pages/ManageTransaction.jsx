// ----- 人豪 ----- //

import React, { Component, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Tab, Nav } from 'react-bootstrap';

import ManageRecordTxn from '../components/ManageRecordTxn.jsx';
import ManageCurrentPosition from '../components/ManageCurrentPosition.jsx';
import ManageRecent from '../components/ManageRecent.jsx';

const urlGetTxn = 'http://localhost:5000/member/list';
const urlPutTxn = 'http://localhost:5000/member/list';
const urlGetPosition = 'http://localhost:5000/member/list';
// const urlGetSeclist = 'http://localhost:5000/member/list';
const acc_id = '';

function ManageTransaction(props) {
   console.log('function ManageTransaction');
   const [inputValues, setInputValues] = useState({});
   const [recentTxn, setrecentTxn] = useState([]);
   return (
      <Container fluid>
         <Row>
            <Col lg={8}>
               <Row>
                  <Col lg={12}>
                     <ManageRecordTxn url={urlPutTxn} acc_id={acc_id} ></ManageRecordTxn>
                  </Col>
               </Row>
               <Row>
                  <Col lg={12}>
                     <Tab.Container id="left-tabs-example" defaultActiveKey="first" mountOnEnter={true}>
                        <Nav variant="pills">
                           <Nav.Item>
                              <Nav.Link eventKey="first" bsPrefix='btn btn-light ml-1'>最近十筆</Nav.Link>
                           </Nav.Item>
                           <Nav.Item>
                              <Nav.Link eventKey="second" bsPrefix='btn btn-light ml-1'>最近一年</Nav.Link>
                           </Nav.Item>
                        </Nav>
                        <Tab.Content>
                           <Tab.Pane eventKey="first">
                              <ManageRecent url={urlGetTxn} acc_id={acc_id} row={10}></ManageRecent>
                           </Tab.Pane>
                           <Tab.Pane eventKey="second">
                              <ManageRecent url={urlGetTxn} acc_id={acc_id}></ManageRecent>
                           </Tab.Pane>
                        </Tab.Content>
                     </Tab.Container>
                  </Col>
               </Row>
            </Col>
            <Col lg={4}>
               <Tab.Container id="left-tabs-example" defaultActiveKey="first" mountOnEnter={true}>
                  <Nav variant="tabs" >
                     <Nav.Item>
                        <Nav.Link eventKey="first">庫存明細</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link eventKey="second">圓餅圖</Nav.Link>
                     </Nav.Item>
                  </Nav>
                  <Tab.Content>
                     <Tab.Pane eventKey="first">
                        <ManageCurrentPosition url={urlGetPosition} acc_id={acc_id}></ManageCurrentPosition>
                     </Tab.Pane>
                     <Tab.Pane eventKey="second">
                        <ManageCurrentPosition url={urlGetPosition} acc_id={acc_id}></ManageCurrentPosition>
                     </Tab.Pane>
                  </Tab.Content>
               </Tab.Container>
            </Col>
         </Row>
      </Container >
   );
}

export default ManageTransaction;