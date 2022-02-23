/* * * * * 人豪 * * * * * 
 * 


 * 備忘:
 * const acc_email = ... 要換成localStorage
 * 
 * * * * * * * * * * * */

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import dt from 'date-and-time';

import { MyFormikObserver, MyInput, MyButton } from '../components/MyFormComponent';
import ManageCurrent from '../components/ManageCurrent.jsx';
import ManageRecent from '../components/ManageRecent.jsx';

const acc_email = 'ggg@mail.com';
const urlPostRecent = 'http://localhost:5000/asset/recent';
const urlPostCreate = 'http://localhost:5000/asset/create';
// const urlPutUpdate = 'http://localhost:5000/asset/update';
// const urlDelete = 'http://localhost:5000/asset/delete';
const urlPostInventory = 'http://localhost:5000/transaction/inventory';
// const urlGetDatalist = 'http://localhost:5000/securities/datalist/';

// 主表使用
const col = [
   { id: 'ast_id', name: 'asd_id', hidden: 'true' },
   {
      id: 'ast_date', name: '日期',
      formatter: (cell) => { let d = new Date(cell); return dt.format(d, 'YYYY-MM-DD'); },
   },
   { id: 'ast_cash', name: '現金' },
   { id: 'ast_securities', name: '證券' },
   { id: 'ast_option', name: '期權' },
   { id: 'ast_others', name: '其他' },
   { id: 'ast_borrowing', name: '資券調整' },
   { id: 'ast_adjust', name: '其他調整' },
];
// 副表使用
const col2 = [
   { id: 'sec_id', name: '代號' },
   { id: 'sec_name', name: '名稱' },
   { id: 'total', name: '庫存數量' },
];

function ManageAsset(props) {
   console.log('--ManageAsset--');
   const [refreshState, setRefresh] = useState(true);
   const refresh = () => {
      setRefresh(!refreshState);
   };
   const [inputDate, setInputDate] = useState();
   console.log(inputDate);
   const [secValue, setSecValue] = useState(750683);
   useEffect(() => {
      // 抓取該日庫存市價
      let rand = Math.floor(Math.random() * 1000) + 740000;
      setSecValue(rand.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
   }, [inputDate])

   return (
      <Container fluid>
         <Row>
            <Col lg={8}>
               <Formik
                  initialValues={{
                     ast_date: dt.format(new Date(), 'YYYY-MM-DD'),
                     ast_cash: 453000,
                     ast_securities: 750000,
                     ast_option: 50000,
                     ast_others: 100000,
                     ast_borrowing: -7000,
                     ast_adjust: -50000,
                  }}
                  validate={
                     (values) => {
                        const errors = {};
                        if (values.ast_cash < 0) {
                           errors.sec_str = "負現金請填寫於其他或調整項";
                        }
                        return errors;
                     }
                  }
                  onSubmit={(values, actions) => {
                     let dataToServer = {
                        acc_email: acc_email,
                        ...values
                     };
                     console.log(`dataToServer: ${JSON.stringify(dataToServer)}`);
                     axios.post(urlPostCreate, dataToServer).then((res) => {
                        console.log(res.data);
                        actions.resetForm();
                        refresh();
                     });
                     actions.resetForm();
                  }}
               >
                  {(props) => (
                     <Form>
                        <MyInput
                           label="日期"
                           name="ast_date" id="ast_date"
                           type="date"
                           inline="true" size="sm"
                        />
                        <MyInput
                           label="現金"
                           name="ast_cash" id="ast_cash"
                           type="number" step="10000"
                           placeholder="包含未入帳交割款"
                           inline="true"
                        />
                        <MyInput
                           label="證券"
                           name="txn_round" id="txn_round"
                           type="number" step="10000"
                           placeholder="當時庫存現值"
                           inline="true"
                           helptext={`依${inputDate}紀錄及市價估計: ${secValue} 元`}
                        />
                        <MyFormikObserver
                           value={props.values.ast_date}
                           onChange={setInputDate}>
                        </MyFormikObserver>
                        <br />
                        <MyInput
                           label="期權"
                           name="ast_option" id="ast_option"
                           type="number" step="10000"
                           placeholder="如: 帳戶權益數"
                           inline="true"
                        />
                        <MyInput
                           label="其他資產"
                           name="ast_others" id="ast_others"
                           type="number" step="10000"
                           placeholder="如: 外幣基金債券"
                           inline="true"
                        />
                        <MyInput
                           label="資券調整"
                           name="ast_borrowing" id="ast_borrowing"
                           type="number" step="10000"
                           placeholder="如: 券賣時的市值 融資保證金 "
                           inline="true"
                        />
                        <MyInput
                           label="其他調整"
                           name="ast_adjust" id="ast_adjust"
                           type="number" step="10000"
                           placeholder=""
                           inline="true"
                        />
                        <br />
                        <Row>
                           <Col lg={8}>
                              <MyInput
                                 label="摘要備註"
                                 id="ast_note"
                                 name="ast_note"
                                 type="text"
                              />
                           </Col>
                           <Col lg={1} className="d-inline-flex flex-column-reverse input-group p-2">
                              <Button type="submit" variant="warning" size="sm">送出</Button>
                           </Col>
                        </Row>
                     </Form>
                  )}
               </Formik>
            </Col>
            <Col lg={4}>
               <ManageCurrent col={col2} className={{ table: 'table table-sm' }}
                  url={urlPostInventory} dataToServer={{ acc_email: acc_email, dateQuery: inputDate }}
               ></ManageCurrent>
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
                        <ManageRecent row={10} col={col} refreshState={refreshState}
                           url={urlPostRecent} dataToServer={{ acc_email: acc_email, amount: 200 }}
                        ></ManageRecent>
                     </Tab.Pane>
                  </Tab.Content>
               </Tab.Container>
            </Col>

         </Row>
      </Container >
   );
}

export default ManageAsset;