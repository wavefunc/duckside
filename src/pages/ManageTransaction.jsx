// ----- 人豪 ----- //

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import {Row,Col,Tab,Nav} from 'react-bootstrap';
// import Col from 'react-bootstrap/Col'
// import Tab from 'react-bootstrap/Tab'
// import Nav from 'react-bootstrap/Nav'

import ManageRecord from '../components/ManageRecord.jsx';
import ManageCurrentPosition from '../components/ManageCurrentPosition.jsx';
import ManageHistory from '../components/ManageHistory.jsx';

class ManageTransaction extends Component {
   state = {
      urlGetTxn: 'http://localhost:5000/member/list',
      urlPutTxn: 'http://localhost:5000/member/list',
      urlGetPosition: 'http://localhost:5000/member/list',
      urlGetDatalist: 'http://localhost:5000/',
      acc_id: '', // sessions資料
   }
   render() {
      return (
         <Container fluid>
            <Row>
               <Col lg={8}>
                  <Row>
                     <Col lg={12}>
                        {/* <ManageRecord url={this.state.urlGetTxn} acc_id={this.state.acc_id} row={10}></ManageRecord>
                        <ManageRecordTxn url={this.state.urlPutTxn} acc_id={this.state.acc_id}></ManageRecordTxn> */}
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
                                 <ManageHistory url={this.state.urlGetTxn} acc_id={this.state.acc_id} row={10}></ManageHistory>
                              </Tab.Pane>
                              <Tab.Pane eventKey="second">
                                 <ManageHistory url={this.state.urlGetTxn} acc_id={this.state.acc_id}></ManageHistory>
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