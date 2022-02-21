/* * * * * 人豪 * * * * * 
 * 1. 記得修改axios(urlGet)方法加入param(acc_email)
 * 2. const acc_id = 只能來自localStorage;
 * 
 * * * * * * * * * * * */

import React, { useState, useMemo, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { MyInput, MySelect } from '../components/MyFormComponent';
import dt from 'date-and-time';

import ManageCurrentPosition from '../components/ManageCurrentPosition.jsx';
import ManageRecent from '../components/ManageRecent.jsx';

import axios from 'axios';

const acc_email = 'ggg@mail.com';
const urlGet = 'http://localhost:5000/transaction/all';
const urlPost = 'http://localhost:5000/transaction/create';
const urlPut = 'http://localhost:5000/transaction/update';
const urlDelete = 'http://localhost:5000/transaction/edit';
const urlGetPosition = 'http://localhost:5000/transaction/inventory';
const urlGetDatalist = 'http://localhost:5000/securities/datalist/';
const col = [
   {
      id: 'txn_date', name: '日期', formatter: (cell) => {
         let d = new Date(cell);
         return dt.format(d, 'YYYY-MM-DD');
      }
   },
   { id: 'txn_id', name: '代號', hidden: true },
   { id: 'sec_id', name: '代號' },
   { id: 'txn_round', name: '編號' },
   { id: 'txn_position', name: '類型' },
   { id: 'txn_price', name: '價格' },
   { id: 'txn_amount', name: '數量' },
   { id: 'txn_note', name: '摘要' },
];
const resetInputs = (prevValues) => {
   let newValues = { ...prevValues };
   newValues['sec_str'] = "";
   newValues['txn_price'] = "";
   newValues['txn_amount'] = "";
   newValues['txn_note'] = "";
   return newValues;
}

function ManageTransaction(props) {
   console.log('--ManageTransaction--');
   const [recentData, setRecentData] = useState([]);
   const [currentPosition, setCurrentPosition] = useState([]);
   const [datalist, setDatalist] = useState([]);

   const getRecentData = () => {
      let beingMounted = true;
      console.log('ManageTransaction getRecentData');
      axios(urlGet).then((res) => {
         if (beingMounted) {
            setRecentData(res.data);
            console.log(res.data);
         }
      });
      axios.post(urlGetPosition, {
         data: {
            'dateQuery': Date.now(),
            'acc_email': acc_email,
         }
      }).then((res) => {
         if (beingMounted) {
            // setCurrentPosition(res.data);
            console.log(res);
         }
      });
      return () => { beingMounted = false };
   };

   let controller = new AbortController();
   const getDatalist = (inputStr) => {
      if (inputStr.length < 2 || inputStr.length > 4) {
         return
      } else {
         controller.abort();
         controller = new AbortController();
         axios(urlGetDatalist + inputStr, { signal: controller.signal }).then((result) => {
            let datalist = result.data.map((v) => {
               return `${v['sec_id']} ${v['sec_name']}`
            });
            setDatalist(datalist);
         })
      }
   }
   useEffect(getRecentData, []);

   return (
      <Container fluid>
         <Row>
            <Col lg={8}>
               <Row>
                  <Col lg={12}>
                     <Formik
                        initialValues={{
                           txn_date: (new Date()).toISOString().split('T')[0],
                           sec_str: "",
                           txn_round: 1,
                           txn_position: "建倉",
                           txn_price: '630',
                           txn_amount: '',
                           txn_note: "老師說的",
                        }}
                        validate={
                           (values) => {
                              const errors = {};
                              if (!values.sec_str) {
                                 errors.sec_str = "代號及名稱不可空白";
                              }
                              if (!values.txn_price) {
                                 errors.txn_price = "價格不可空白";
                              }
                              if (!values.txn_amount) {
                                 errors.txn_amount = "數量不可空白";
                              }
                              return errors;
                           }
                        }
                        onSubmit={(values, actions) => {
                           // 新增交易紀錄, 重新抓取資料讓元件re-render, 接著依預先定義重置部分輸入框
                           let dataToServer = {
                              sec_id: values.sec_str.split(" ")[0],
                              acc_email: acc_email,
                              ...values
                           };
                           console.log(dataToServer);
                           axios.post(urlPost, dataToServer).then((res) => {
                              console.log(res);
                              getRecentData();
                              let newInitValues = resetInputs({ ...values });
                              actions.resetForm({ values: newInitValues });
                           });
                        }}
                     >
                        <Form>
                           <MyInput
                              label="日期"
                              name="txn_date"
                              id="txn_date"
                              type="date"
                              inline="true"
                              size="sm"
                           />

                           <MyInput
                              label="自訂編號"
                              name="txn_round"
                              id="txn_round"
                              type="number"
                              placeholder="編號以分批追蹤"
                              inline="true"
                           />
                           <MySelect
                              label="類型"
                              name="txn_position"
                              id="txn_position"
                              type="text"
                              inline="true"
                              size="sm">
                              {['建倉', '加碼', '減碼', '停利', '停損']}
                           </MySelect>

                           <br />
                           <MyInput
                              label="股票代號及名稱"
                              name="sec_str"
                              id="sec_str"
                              type="text"
                              placeholder=""
                              inline="true"
                              list={datalist}
                              getList={getDatalist}
                           />
                           <MyInput
                              label="均價"
                              name="txn_price"
                              id="txn_price"
                              type="number"
                              placeholder="單位: 新台幣"
                              inline="true"
                           />
                           <MyInput
                              label="數量"
                              name="txn_amount"
                              id="txn_amount"
                              type="number"
                              placeholder="ex. 1000股"
                              inline="true"
                           />
                           <MyInput
                              label="摘要備註"
                              id="txn_note"
                              name="txn_note"
                              type="text"
                              placeholder=""
                              inline="true"
                           />

                           <Button type="submit" variant="warning" size="sm">送出</Button>
                        </Form>
                     </Formik>
                  </Col>
               </Row>
               <br />
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
                              <ManageRecent data={recentData} row={10} col={col}></ManageRecent>
                           </Tab.Pane>
                           <Tab.Pane eventKey="second">
                              <ManageRecent data={recentData} col={col}></ManageRecent>
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
                  </Nav>
                  <Tab.Content>
                     <Tab.Pane eventKey="first">
                        <ManageCurrentPosition data={currentPosition}></ManageCurrentPosition>
                     </Tab.Pane>
                  </Tab.Content>
               </Tab.Container>
            </Col>
         </Row>
      </Container >
   );
}

export default ManageTransaction;