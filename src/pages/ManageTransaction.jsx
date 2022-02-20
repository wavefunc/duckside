// ----- 人豪 ----- //

import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { MyInput, MySelect } from '../components/MyFormComponent';

import ManageCurrentPosition from '../components/ManageCurrentPosition.jsx';
import ManageRecent from '../components/ManageRecent.jsx';

import axios from 'axios';

const urlGetTxn = 'http://localhost:5000/transaction/all';
const urlPutTxn = 'http://localhost:5000/member/list';
const urlGetPosition = 'http://localhost:5000/member/list';
const urlGetDatalist = 'http://localhost:5000/securities/search/';

const acc_id = '';

function ManageTransaction(props) {
   console.log('ManageTransaction');
   const [recentTxn, setRecentTxn] = useState([
      { '頁面資料加載中': '請稍候' }
   ]);
   const [recentPosition, setRecentPosition] = useState([
      { '頁面資料加載中': '請稍候' }
   ]);
   const [inputValues, setInputValues] = useState({
      acc_id: 1,
      txn_date: "",
      sec_id: "", txn_round: 1, txn_position: "",
      txn_price: 600, txn_amount: 1000, txn_note: "",
   });
   const [datalist, setDatalist] = useState([]);
   const getDatalist = (inputStr) => {
      if(inputStr.length < 2 || inputStr.length > 3 ) {
         return
      } else {
      axios(urlGetDatalist+inputStr).then((result) => {
         let datalist = result.data.map((v)=>{
            return `${v['sec_id']} ${v['sec_name']}`
         })
         console.log(datalist);
         setDatalist(datalist);
      })
      }
   }
   useEffect(() => {
      let beingMounted = true;
      console.log('ManageTransaction req Txn');
      axios(urlGetTxn, acc_id).then((res) => {
         if (beingMounted) {
            setRecentTxn(res.data);
         }
      });
      return () => { beingMounted = false };
   }, []);

   useEffect(() => {
      let beingMounted = true;
      console.log('ManageTransaction req Position');
      axios(urlGetPosition, acc_id).then((res) => {
         if (beingMounted) {
            setRecentPosition(res.data);
         }
      });
      return () => { beingMounted = false };
   }, []);

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
                           txn_price: 600,
                           txn_amount: 1000,
                           txn_note: "",
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
                        onSubmit={(values, formikBag) => {
                           setTimeout(() => {
                              alert(JSON.stringify(values, null, 2));
                           }, 400);
                           let resetValues = { ...values };
                           resetValues['sec_str'] = "";
                           resetValues['txn_price'] = "";
                           resetValues['txn_amount'] = "";
                           resetValues['txn_note'] = "";
                           formikBag.setValues({ ...resetValues }, false);
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
                              <ManageRecent data={recentTxn} row={10}></ManageRecent>
                           </Tab.Pane>
                           <Tab.Pane eventKey="second">
                              <ManageRecent data={recentTxn}></ManageRecent>
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
                        <ManageCurrentPosition data={recentPosition}></ManageCurrentPosition>
                     </Tab.Pane>
                  </Tab.Content>
               </Tab.Container>
            </Col>
         </Row>
      </Container >
   );
}

export default ManageTransaction;