/* * * * * 人豪 * * * * * 
 * 待辦
 * 1. 如輸入重複日期, 後端會擋掉, 要跳提示訊息提醒使用者先刪除舊資料或改以編輯方式進行

 * 備忘:
 * 加千分位逗號 .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
 * 
 * * * * * * * * * * * */

import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Popover, OverlayTrigger, Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import dt from 'date-and-time';
import { h } from "gridjs";

import { MyFormikObserver, MyInput, MyOkToastSlideUp } from '../components/MyFormComponent';
import MyCurrentPosition from '../components/ManageCurrent.jsx';
import ManageRecent from '../components/ManageRecent.jsx';
import Breadcrumb from '../components/Breadcrumb';

const acc_email = localStorage.getItem('loginState');
const urlPostRecent = 'http://localhost:5000/asset/recent';
const urlPostCreate = 'http://localhost:5000/asset/create';
const urlPutUpdate = 'http://localhost:5000/asset/update';
const urlDelete = 'http://localhost:5000/asset/delete';
const urlPostInventory = 'http://localhost:5000/transaction/inventory';
const urlPostMarketValue = 'http://localhost:5000/marketInfo/inventory';

// 表單設定
const initialValues = {
   ast_date: dt.format(new Date(), 'YYYY-MM-DD'),
   ast_cash: 1283500,
   ast_securities: "",
   ast_option: 600000,
   ast_others: 200000,
   ast_borrowing: 0,
   ast_adjust: 195000,
   ast_note: "",
};

const validate = (values) => {
   const errors = {};
   if (values.ast_cash < 0) {
      errors.ast_cash = "負現金請填寫於其他或調整項";
   }
   if (!values.ast_date) {
      errors.ast_date = "需填寫日期";
   }
   return errors;
}

// 主表欄位
const col = [
   { id: 'ast_id', name: 'asd_id', hidden: true },
   {
      id: 'ast_date', name: '日期', width: '10%',
      formatter: (cell) => { let d = new Date(cell); return dt.format(d, 'YYYY-MM-DD'); },
   },
   {
      id: 'ast_cash', name: h('b', { style: { 'float': 'right', } }, '現金'), width: '10%',
      formatter: (cell) => h('span', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   {
      id: 'ast_securities', name: h('b', { style: { 'float': 'right', } }, '證券'), width: '10%',
      formatter: (cell) => h('span', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   {
      id: 'ast_option', name: h('b', { style: { 'float': 'right', } }, '期權'), width: '8%',
      formatter: (cell) => h('span', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   {
      id: 'ast_others', name: h('b', { style: { 'float': 'right', } }, '其他'), width: '8%',
      formatter: (cell) => h('span', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   {
      id: 'ast_borrowing', name: h('b', { style: { 'float': 'right', } }, '資券'), width: '8%',
      formatter: (cell) => h('span', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   {
      id: 'ast_adjust', name: h('b', { style: { 'float': 'right', } }, '調整'), width: '8%',
      formatter: (cell) => h('span', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   {
      id: 'ast_sum', name: h('b', { style: { 'float': 'right', } }, '總計'), width: '10%',
      formatter: (cell) => h('b', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   { id: 'ast_note', name: '摘要', width: '12%', },
];

// 副表欄位
const col2 = [
   { id: 'sec_id', name: '代號' },
   { id: 'sec_name', name: '名稱' },
   {
      id: 'total', name: '庫存數量',
      formatter: (cell) => h('b', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   { id: 'sec_market', name: '市場別', hidden: true },
];

function ManageAsset(props) {
   console.log('--ManageAsset--');
   const [refreshState, setRefresh] = useState(true);

   const [inputDate, setInputDate] = useState('');
   const [secValue, setSecValue] = useState("(loading...)");
   const [editingValues, setEditingValues] = useState({});

   const [showDelete, setShowDelete] = useState(false);
   const [showEdit, setShowEdit] = useState(false);
   const [showToast, setShowToast] = useState(false);

   const refresh = () => {
      setRefresh((refreshState) => (!refreshState));
   };

   const handleShowEdit = (cells) => {
      console.log('handleShowEdit');
      let values = cells.map((v) => v.data);
      let dataToEdit = col.reduce((target, elm, idx) => {
         target[elm.id] = elm.formatter && typeof elm.formatter(values[idx]) !== 'object' ? elm.formatter(values[idx]) : values[idx];
         return target;
      }, {});
      setEditingValues(dataToEdit);
      setShowEdit(true);
   }
   const handleCloseEdit = () => {
      setEditingValues();
      setShowEdit(false);
   }
   const handleEdit = (values, actions) => {
      let dataToServer = {
         acc_email: acc_email,
         ...values
      };
      console.log(dataToServer);
      axios.put(urlPutUpdate, dataToServer).then((res) => {
         console.log(res);
         actions.resetForm();
         handleCloseEdit()
         refresh();
         setShowToast(true);
      });
   }
   const handleShowDelete = (cells) => {
      let values = cells.map((v) => v.data);
      let dataToDelete = col.reduce((target, elm, idx) => {
         target[elm.id] = elm.formatter && typeof elm.formatter(values[idx]) !== 'object' ? elm.formatter(values[idx]) : values[idx];
         return target;
      }, {});
      setEditingValues(dataToDelete);
      setShowDelete(true);
   }
   const handleCloseDelete = () => {
      setEditingValues();
      setShowDelete(false);
   }
   const handleDelete = (values, actions) => {
      let dataToServer = {
         ast_id: values.ast_id
      };
      axios.delete(urlDelete, { data: dataToServer }).then((res) => {
         console.log(res);
         actions.resetForm();
         handleCloseDelete();
         refresh();
         setShowToast(true);
      });
   }

   const getPopoverData = () => {
      let dataToServer = {
         dateQuery: inputDate,
         acc_email: acc_email
      };
      console.log(dataToServer);
      axios.post(urlPostMarketValue, dataToServer).then((res) => {
         console.log(res.data);
         setSecValue(res.data.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","));
      });
   };
   const resetPopoverData = () => {
      setSecValue("(loading...)");
   }

   const popover = (
      <Popover id='secValuePopover'>
         <Popover.Title as="h3">{`${inputDate}`}</Popover.Title>
         <Popover.Content>
            庫存依市價估計<strong>{secValue}</strong>元
         </Popover.Content>
      </Popover>
   );

   return (
      <Container fluid className="pt-3">
         <Row>
            <Breadcrumb />
         </Row>
         <Row className='pr-2'>
            <Col lg={8}>
               <Formik
                  initialValues={initialValues}
                  validate={validate}
                  onSubmit={(values, actions) => {
                     let dataToServer = {
                        acc_email: acc_email,
                        ...values
                     };
                     console.log(`dataToServer: ${JSON.stringify(dataToServer)}`);
                     axios.post(urlPostCreate, dataToServer).then((res) => {
                        actions.resetForm();
                        actions.setSubmitting(false);
                        console.log(res.data);
                        refresh();
                     });
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
                        <OverlayTrigger
                           overlay={popover}
                           placement="right-end"
                           delay={{ show: 200, hide: 200 }}
                           trigger={['focus']}
                           onEnter={getPopoverData}
                           onExit={resetPopoverData}
                        >
                           <MyInput
                              label="證券"
                              name="ast_securities" id="ast_securities"
                              type="number" step="10000"
                              placeholder="當時的庫存市值"
                              inline="true"
                           />
                        </OverlayTrigger>
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
                           <Col lg={7}>
                              <MyInput
                                 label="摘要"
                                 id="ast_note"
                                 name="ast_note"
                                 type="text"
                              />
                           </Col>
                           <Col lg={1} className="d-inline-flex flex-column-reverse text-nowrap input-group pl-2 pb-2">
                              <Button type="submit" variant="warning" size="sm">送出</Button>
                           </Col>
                        </Row>
                     </Form>
                  )}
               </Formik>
               <Modal show={showEdit} onHide={handleCloseEdit} centered={true} size='lg'>
                  <Modal.Header closeButton>
                     <Modal.Title>編輯</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Formik
                        initialValues={editingValues}
                        validate={validate}
                        onSubmit={handleEdit}
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
                                 inline="true"
                              />
                              <MyInput
                                 label="證券"
                                 name="ast_securities" id="ast_securities"
                                 type="number" step="10000"
                                 inline="true"
                              />
                              <MyInput
                                 name="ast_id"
                                 id="ast_id"
                                 type="number"
                                 inline="true"
                                 className="d-none"
                              />
                              <br />
                              <MyInput
                                 label="期權"
                                 name="ast_option" id="ast_option"
                                 type="number" step="10000"
                                 inline="true"
                              />
                              <MyInput
                                 label="其他資產"
                                 name="ast_others" id="ast_others"
                                 type="number" step="10000"
                                 inline="true"
                              />
                              <MyInput
                                 label="資券調整"
                                 name="ast_borrowing" id="ast_borrowing"
                                 type="number" step="10000"
                                 inline="true"
                              />
                              <MyInput
                                 label="其他調整"
                                 name="ast_adjust" id="ast_adjust"
                                 type="number" step="10000"
                                 inline="true"
                              />
                              <br />
                              <Row>
                                 <Col lg={8}>
                                    <MyInput
                                       label="摘要"
                                       id="ast_note"
                                       name="ast_note"
                                       type="text"
                                    />
                                 </Col>
                                 <Col lg={1} className="d-inline-flex flex-column-reverse input-group p-2">
                                    <Button type="submit" variant="warning" size="sm">送出</Button>
                                 </Col>
                                 <Col lg={1} className="d-inline-flex flex-column-reverse input-group p-2">
                                    <Button variant="outline-secondary" onClick={handleCloseEdit} size="sm">
                                       取消
                                    </Button>
                                 </Col>
                              </Row>
                           </Form>
                        )}
                     </Formik>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
               </Modal>
               <Modal show={showDelete} onHide={handleCloseDelete} centered={true} size='lg'>
                  <Modal.Header closeButton>
                     <Modal.Title>刪除</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Formik
                        initialValues={editingValues}
                        onSubmit={handleDelete}
                     >
                        {(props) => (
                           <Form>
                              <MyInput
                                 label="日期"
                                 name="ast_date" id="ast_date"
                                 type="date"
                                 inline="true" size="sm"
                                 readOnly
                              />
                              <MyInput
                                 label="現金"
                                 name="ast_cash" id="ast_cash"
                                 type="number" step="10000"
                                 inline="true"
                                 readOnly
                              />
                              <MyInput
                                 label="證券"
                                 name="ast_securities" id="ast_securities"
                                 type="number" step="10000"
                                 inline="true"
                                 readOnly
                              />
                              <MyInput
                                 name="ast_id"
                                 id="ast_id"
                                 type="number"
                                 inline="true"
                                 className="d-none"
                                 readOnly
                              />
                              <br />
                              <MyInput
                                 label="期權"
                                 name="ast_option" id="ast_option"
                                 type="number" step="10000"
                                 inline="true"
                                 readOnly
                              />
                              <MyInput
                                 label="其他資產"
                                 name="ast_others" id="ast_others"
                                 type="number" step="10000"
                                 inline="true"
                                 readOnly
                              />
                              <MyInput
                                 label="資券調整"
                                 name="ast_borrowing" id="ast_borrowing"
                                 type="number" step="10000"
                                 inline="true"
                                 readOnly
                              />
                              <MyInput
                                 label="其他調整"
                                 name="ast_adjust" id="ast_adjust"
                                 type="number" step="10000"
                                 inline="true"
                                 readOnly
                              />
                              <br />
                              <Row>
                                 <Col lg={8}>
                                    <MyInput
                                       label="摘要"
                                       id="ast_note"
                                       name="ast_note"
                                       type="text"
                                       readOnly
                                    />
                                 </Col>
                                 <Col lg={1} className="d-inline-flex flex-column-reverse input-group p-2">
                                    <Button type="submit" variant="warning" size="sm">確認</Button>
                                 </Col>
                                 <Col lg={1} className="d-inline-flex flex-column-reverse input-group p-2">
                                    <Button variant="outline-secondary" onClick={handleCloseDelete} size="sm">
                                       取消
                                    </Button>
                                 </Col>
                              </Row>
                           </Form>
                        )}

                     </Formik>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
               </Modal>
            </Col>
            <Col lg={4}>
               <MyCurrentPosition col={col2} className={{ table: 'table table-sm' }}
                  url={urlPostInventory} dataToServer={{ acc_email: acc_email, dateQuery: inputDate }}
               ></MyCurrentPosition>
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
                     <MyOkToastSlideUp show={showToast} className="mr-3" width="300px" closeToast={() => { setShowToast(false) }} />
                  </Nav>
                  <Tab.Content>
                     <Tab.Pane eventKey="first">
                        <ManageRecent row={10} col={col} refreshState={refreshState}
                           edit={handleShowEdit} delete={handleShowDelete}
                           url={urlPostRecent} dataToServer={{ acc_email: acc_email, amount: 10 }}
                        ></ManageRecent>
                     </Tab.Pane>
                     <Tab.Pane eventKey="second">
                        <ManageRecent col={col} refreshState={refreshState}
                           edit={handleShowEdit} delete={handleShowDelete}
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