// ----- 人豪 ----- //

import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Card from 'react-bootstrap/Card'

import ManageRecordTxn from '../components/ManageRecordTxn.jsx';
import ManageRecentTxn from '../components/ManageRecentTxn.jsx';
import ManageCurrentPosition from '../components/ManageCurrentPosition.jsx';
import ManageHistoryTxn from '../components/ManageHistoryTxn.jsx';

class ManageTransaction extends Component {
   state = {
      urlGetTxn: 'http://localhost:5000/member/list',
      urlPushTxn: 'http://localhost:5000/member/list',
      urlGetPosition: 'http://localhost:5000/member/list',
      dataToServer: '',
   }
   render() {
      return (
         <Container fluid>
            <Row>
               <Col lg={8}>
                  <Row>
                     <Col lg={12}>
                        <ManageRecordTxn url={this.state.urlPushTxn} dataToServer={this.state.dataToServer}></ManageRecordTxn>
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
                                 <Nav.Link eventKey="second" bsPrefix='btn btn-light ml-1'>顯示全部</Nav.Link>
                              </Nav.Item>
                           </Nav>
                           <Tab.Content>
                              <Tab.Pane eventKey="first">
                                 <ManageRecentTxn url={this.state.urlGetTxn} dataToServer={this.state.dataToServer}></ManageRecentTxn>
                              </Tab.Pane>
                              <Tab.Pane eventKey="second">
                                 <ManageHistoryTxn url={this.state.urlGetTxn} dataToServer={this.state.dataToServer}></ManageHistoryTxn>
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
                           <ManageCurrentPosition url={this.state.urlGetPosition} dataToServer={this.state.dataToServer}></ManageCurrentPosition>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                           <ManageCurrentPosition url={this.state.urlGetPosition} dataToServer={this.state.dataToServer}></ManageCurrentPosition>
                        </Tab.Pane>
                     </Tab.Content>
                  </Tab.Container>
               </Col>
            </Row>
         </Container >
      );
   }
}

export default ManageTransaction;