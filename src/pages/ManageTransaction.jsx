// ----- 人豪 ----- //

import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'

import ManageRecordTxn from '../components/ManageRecordTxn.jsx';
import ManageRecentTxn from '../components/ManageRecentTxn.jsx';
import ManageCurrentPosition from '../components/ManageCurrentPosition.jsx';
import ManageHistoryTxn from '../components/ManageHistoryTxn.jsx';

class ManageTransaction extends Component {
   state = {}
   render() {
      return (
         <Container fluid>
            <Row>
               <Col lg={8}>
                  <ManageRecordTxn></ManageRecordTxn>
               </Col>
               <Col lg={4}>
                  <ManageCurrentPosition></ManageCurrentPosition>
               </Col>
            </Row>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
               <Row>
                  <Nav variant="pills">
                     <Nav.Item>
                        <Nav.Link eventKey="first">最近十筆</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link eventKey="second">顯示全部</Nav.Link>
                     </Nav.Item>
                  </Nav>
               </Row>
               <div>
                  <Tab.Content>
                     <Tab.Pane eventKey="first">
                        <ManageRecentTxn></ManageRecentTxn>
                     </Tab.Pane>
                     <Tab.Pane eventKey="second">
                        <ManageHistoryTxn></ManageHistoryTxn>
                     </Tab.Pane>
                  </Tab.Content>
               </div>
            </Tab.Container>
         </Container>
      );
   }
}

export default ManageTransaction;