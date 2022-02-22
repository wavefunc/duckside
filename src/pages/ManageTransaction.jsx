/* * * * * 人豪 * * * * * 
 * 


 * 備忘:
 * const acc_email = ... 要換成localStorage
 * 
 * * * * * * * * * * * */

import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import dt from 'date-and-time';

import { MyInput, MySelect } from '../components/MyFormComponent';
import ManageCurrent from '../components/ManageCurrent.jsx';
import ManageRecent from '../components/ManageRecent.jsx';

const acc_email = 'ggg@mail.com';
const urlPostRecent = 'http://localhost:5000/transaction/recent';
const urlPostCreate = 'http://localhost:5000/transaction/create';
// const urlPut = 'http://localhost:5000/transaction/update';
// const urlDelete = 'http://localhost:5000/transaction/edit';
const urlPostInventory = 'http://localhost:5000/transaction/inventory';
const urlGetDatalist = 'http://localhost:5000/securities/datalist/';
const col = [
   {
      id: 'txn_date', name: '日期',
      formatter: (cell) => { let d = new Date(cell); return dt.format(d, 'YYYY-MM-DD'); }
   },
   { id: 'txn_id', name: 'txn_id', hidden: true },
   { id: 'sec_id', name: '代號' },
   { id: 'txn_round', name: '編號' },
   { id: 'txn_position', name: '類型' },
   { id: 'txn_price', name: '價格' },
   { id: 'txn_amount', name: '數量' },
   { id: 'txn_note', name: '摘要' },
];
const colInventory = [
   { id: 'sec_id', name: '代號' },
   { id: 'sec_name', name: '名稱' },
   { id: 'total', name: '庫存數量' },
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
   const [datalist, setDatalist] = useState([]);
   const [refreshState, setRefresh] = useState(true);
   const refresh = () => {
      setRefresh(!refreshState);
   }

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

   return (
      <Container fluid>
         <Row>
            <Col lg={8}>
               <Row>
                  <Col lg={12}>
                     <Formik
                        initialValues={{
                           txn_date: dt.format(new Date(), 'YYYY-MM-DD'),
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
                           let dataToServer = {
                              sec_id: values.sec_str.split(" ")[0],
                              acc_email: acc_email,
                              ...values
                           };
                           console.log(`dataToServer: ${JSON.stringify(dataToServer)}`);
                           axios.post(urlPostCreate, dataToServer).then((res) => {
                              console.log(res);
                              let newInitValues = resetInputs({ ...values });
                              actions.resetForm({ values: newInitValues });
                              refresh();
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
                              step="1000"
                              placeholder="負數為賣出或放空"
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
                              <Nav.Link eventKey="second" bsPrefix='btn btn-light ml-1'>顯示更多</Nav.Link>
                           </Nav.Item>
                        </Nav>
                        <Tab.Content>
                           <Tab.Pane eventKey="first">
                              <ManageRecent row={10} col={col} refreshState={refreshState}
                                 url={urlPostRecent} dataToServer={{ acc_email: acc_email, amount: 10 }}
                              ></ManageRecent>
                           </Tab.Pane>
                           <Tab.Pane eventKey="second">
                              <ManageRecent col={col} refreshState={refreshState}
                                 url={urlPostRecent} dataToServer={{ acc_email: acc_email, amount: 200 }}
                              ></ManageRecent>
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
                        <ManageCurrent col={colInventory} 
                           url={urlPostInventory} dataToServer={{ acc_email: acc_email, dateQuery: dt.format(new Date(), 'YYYY-MM-DD') }}
                        ></ManageCurrent>
                     </Tab.Pane>
                  </Tab.Content>
               </Tab.Container>
            </Col>
         </Row>
      </Container >
   );
}

export default ManageTransaction;