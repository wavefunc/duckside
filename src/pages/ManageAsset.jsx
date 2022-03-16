/* * * * * 人豪 * * * * * 
 * 待辦
 * 1. 如輸入重複日期, 後端會擋掉, 要跳提示訊息提醒使用者先刪除舊資料或改以編輯方式進行

 * 備忘:
 * 加千分位逗號 .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
 * 
 * * * * * * * * * * * */

import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Popover, OverlayTrigger, Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import dt from 'date-and-time';
import { h } from "gridjs";

import { MyButton, MyFormikObserver, MyInput, MyOkToastSlideUp } from '../components/MyFormComponent';
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

const astSchema = yup.object().shape({
   ast_date: yup.date().typeError('日期格式為yyyy-mm-dd').required("日期不可空白"),
   ast_cash: yup.number().typeError("現金須為正整數").required("現金不可空白").positive('現金須為正整數'),
})

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

   const [showEdit, setShowEdit] = useState(false);
   const [showDelete, setShowDelete] = useState(false);
   const [showToast, setShowToast] = useState(false);

   const refresh = () => {
      setRefresh((refreshState) => (!refreshState));
   };
   const handleSubmit = (values, actions) => {
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
   };
   const handleUpload = () => {
      console.log('upload');
   };
   const setEditModal = (cells) => {
      let values = cells.map((v) => v.data);
      let dataToDelete = col.reduce((target, elm, idx) => {
         target[elm.id] = elm.formatter && typeof elm.formatter(values[idx]) !== 'object' ? elm.formatter(values[idx]) : values[idx];
         return target;
      }, {});
      setEditingValues(dataToDelete);
   };
   const handleShowEdit = (cells) => {
      setEditModal(cells);
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
      setEditModal(cells);
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
         <Row className='pr-2 pb-4'>
            <Col lg={8}>
               <Tab.Container id="tabsForm" defaultActiveKey="single" mountOnEnter={true}>
                  <Nav variant="pills">
                     <Nav.Item>
                        <Nav.Link eventKey="single" bsPrefix='btn btn-light ml-1'>
                           記錄單筆
                        </Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link eventKey="file" bsPrefix='btn btn-light ml-1'>
                           上傳excel
                        </Nav.Link>
                     </Nav.Item>
                  </Nav>
                  <Tab.Content className='pt-2'>
                     <Tab.Pane eventKey="single">
                        <Formik
                           initialValues={initialValues}
                           validationSchema={astSchema}
                           onSubmit={handleSubmit}
                        >
                           {(props) => (
                              <Form className='form-inline'>
                                 <MyInput
                                    label="日期"
                                    name="ast_date"
                                    type="date"
                                    flex='1 1 auto'
                                 />
                                 <MyInput
                                    label="現金"
                                    name="ast_cash"
                                    type="number"
                                    placeholder="包含未入帳交割款"
                                    flex='1 1 auto'
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
                                       name="ast_securities"
                                       type="number"
                                       placeholder="當時的庫存市值"
                                       flex='1 1 auto'
                                    />
                                 </OverlayTrigger>
                                 <MyFormikObserver
                                    value={props.values.ast_date}
                                    onChange={setInputDate}>
                                 </MyFormikObserver>
                                 <div style={{ width: '100%' }}></div>
                                 <MyInput
                                    label="期權"
                                    name="ast_option"
                                    type="number" step="10000"
                                    placeholder="如: 帳戶權益數"
                                    flex='1 1 auto'
                                 />
                                 <MyInput
                                    label="其他資產"
                                    name="ast_others"
                                    type="number" step="10000"
                                    placeholder="如: 外幣基金債券"
                                    flex='1 1 auto'
                                 />
                                 <MyInput
                                    label="資券調整"
                                    name="ast_borrowing"
                                    type="number" step="10000"
                                    placeholder="如: 券賣時的市值 融資保證金"
                                    flex='1 1 auto'
                                 />
                                 <MyInput
                                    label="其他調整"
                                    name="ast_adjust"
                                    type="number" step="10000"
                                    placeholder=""
                                    flex='1 1 auto'
                                 />
                                 <div style={{ width: '100%' }}></div>
                                 <MyInput
                                    label="摘要"
                                    name="ast_note"
                                    type="text"
                                    flex='2 1 auto'
                                    maxWidth='515px'
                                 />
                                 <MyButton
                                    type="submit"
                                    className="btn btn-warning"
                                    value="送出"
                                    flex='1 2 auto'
                                 />
                              </Form>
                           )}
                        </Formik>
                     </Tab.Pane>
                     <Tab.Pane eventKey="file">
                     </Tab.Pane>
                  </Tab.Content>
               </Tab.Container>
               <Modal show={showEdit} onHide={handleCloseEdit} backdrop='static'>
                  <Modal.Header closeButton>
                     <Modal.Title>編輯</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Formik
                        initialValues={editingValues}
                        validationSchema={astSchema}
                        onSubmit={handleEdit}
                     >
                        <Form className='form-inline'>
                           <MyInput
                              label="日期"
                              name="ast_date"
                              type="date"
                              flex='1 1 auto'
                           />
                           <div style={{ width: '100%' }}></div>
                           <MyInput
                              label="現金"
                              name="ast_cash"
                              type="number"
                              placeholder="包含未入帳交割款"
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <MyInput
                              label="證券"
                              name="ast_securities"
                              type="number"
                              placeholder="當時的庫存市值"
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <MyInput
                              label="期權"
                              name="ast_option"
                              type="number" step="10000"
                              placeholder="如: 帳戶權益數"
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <div style={{ width: '100%' }}></div>
                           <MyInput
                              label="其他資產"
                              name="ast_others"
                              type="number" step="10000"
                              placeholder="如: 外幣基金債券"
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <MyInput
                              label="資券調整"
                              name="ast_borrowing"
                              type="number" step="10000"
                              placeholder="如: 券賣時的市值 融資保證金"
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <MyInput
                              label="其他調整"
                              name="ast_adjust"
                              type="number" step="10000"
                              placeholder=""
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <div style={{ width: '100%' }}></div>
                           <MyInput
                              label="摘要"
                              name="ast_note"
                              type="text"
                              flex='2 1 auto'
                              maxWidth='515px'
                           />
                           <MyButton
                              type="submit"
                              className="btn btn-warning"
                              value="送出"
                           />
                           <MyButton
                              type="button"
                              className="btn btn-outline-secondary"
                              value="取消"
                              flex='1 2 auto'
                              onClick={handleCloseEdit}
                           />
                        </Form>
                     </Formik>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
               </Modal>
               <Modal show={showDelete} onHide={handleCloseDelete} backdrop='static'>
                  <Modal.Header closeButton>
                     <Modal.Title>刪除</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                     <Formik
                        initialValues={editingValues}
                        onSubmit={handleDelete}
                     >
                        <Form className='form-inline'>
                           <MyInput readOnly
                              label="日期"
                              name="ast_date"
                              type="date"
                              flex='1 1 auto'
                           />
                           <div style={{ width: '100%' }}></div>
                           <MyInput readOnly
                              label="現金"
                              name="ast_cash"
                              type="number"
                              placeholder="包含未入帳交割款"
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <MyInput readOnly
                              label="證券"
                              name="ast_securities"
                              type="number"
                              placeholder="當時的庫存市值"
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <MyInput readOnly
                              label="期權"
                              name="ast_option"
                              type="number" step="10000"
                              placeholder="如: 帳戶權益數"
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <div style={{ width: '100%' }}></div>
                           <MyInput readOnly
                              label="其他資產"
                              name="ast_others"
                              type="number" step="10000"
                              placeholder="如: 外幣基金債券"
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <MyInput readOnly
                              label="資券調整"
                              name="ast_borrowing"
                              type="number" step="10000"
                              placeholder="如: 券賣時的市值 融資保證金"
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <MyInput readOnly
                              label="其他調整"
                              name="ast_adjust"
                              type="number" step="10000"
                              placeholder=""
                              flex='1 1 auto'
                              maxWidth='28%'
                           />
                           <div style={{ width: '100%' }}></div>
                           <MyInput readOnly
                              label="摘要"
                              name="ast_note"
                              type="text"
                              flex='2 1 auto'
                              maxWidth='515px'
                           />
                           <MyButton
                              type="submit"
                              className="btn btn-danger"
                              value="確認"
                           />
                           <MyButton
                              type="button"
                              className="btn btn-outline-secondary"
                              value="取消"
                              flex='1 2 auto'
                              onClick={handleCloseDelete}
                           />
                        </Form>
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