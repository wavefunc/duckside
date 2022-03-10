/* * * * * 人豪 * * * * * 
 * 備忘:
 * const acc_email = ... 要換成localStorage
 * dataToEdit['sec_str']=`${dataToEdit.sec_id} 台積電`; 改寫成活的
 * 要寫個總計欄位
 * * * * * * * * * * * */

import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { h } from "gridjs";
import axios from 'axios';
import dt from 'date-and-time';

import { MyInput, MySelect, MyOkToastSlideUp } from '../components/MyFormComponent';
import MyCurrentPosition from '../components/ManageCurrent.jsx';
import ManageRecent from '../components/ManageRecent.jsx';
import Breadcrumb from '../components/Breadcrumb'

const acc_email = localStorage.getItem('loginState');
const urlPostRecent = 'http://localhost:5000/transaction/recent';
const urlPostCreate = 'http://localhost:5000/transaction/create';
const urlPutUpdate = 'http://localhost:5000/transaction/update';
const urlDelete = 'http://localhost:5000/transaction/delete';
const urlPostInventory = 'http://localhost:5000/transaction/inventory';
const urlGetDatalist = 'http://localhost:5000/securities/datalist/';

// 表單設定
const initialValues = {
   txn_date: dt.format(new Date(), 'YYYY-MM-DD'),
   sec_str: "",
   txn_round: 1,
   txn_position: "建倉",
   txn_price: 630,
   txn_amount: 1000,
   txn_note: "朋友說的",
};


const resetInputs = (prevValues) => {
   let newValues = { ...prevValues };
   newValues['sec_str'] = "";
   newValues['txn_price'] = "";
   newValues['txn_amount'] = "";
   newValues['txn_note'] = "";
   return newValues;
}

let controller = new AbortController();
const getDatalist = (inputStr, callback) => {
   if (inputStr.length < 2 || inputStr.length > 6) {
      return
   } else {
      controller.abort();
      controller = new AbortController();
      axios(urlGetDatalist + inputStr, { signal: controller.signal }).then((result) => {
         let datalist = result.data.map((v) => {
            return `${v['sec_id']} ${v['sec_name']}`
         });
         callback(datalist);
      })
   }
}

// 主表設定
const col = [
   { id: 'txn_id', name: 'txn_id', hidden: true },
   {
      id: 'txn_date', name: '日期', width: '10%',
      formatter: (cell) => { let d = new Date(cell); return dt.format(d, 'YYYY-MM-DD'); }
   },
   { id: 'sec_id', name: '代號', width: '8%', },
   { id: 'sec_name', name: '名稱', width: '10%', },
   {
      id: 'txn_round', name: '編號', width: '6%',
      formatter: (cell) => h('b', { style: { 'margin-left': '10px', } }, cell)
   },
   { id: 'txn_position', name: '類型', width: '8%', },
   {
      id: 'txn_price', name: h('b', { style: { 'float': 'right', } }, '價格'), width: '8%',
      formatter: (cell) => h('b', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   {
      id: 'txn_amount', name: h('b', { style: { 'float': 'right', } }, '數量'), width: '8%',
      formatter: (cell) => h('b', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   { id: 'txn_note', name: '摘要' },
];

// 副表設定
const colInventory = [
   { id: 'sec_id', name: '代號' },
   { id: 'sec_name', name: '名稱' },
   {
      id: 'total', name: '庫存數量',
      formatter: (cell) => h('b', { style: { 'float': 'right', 'margin-right': '5px' } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   { id: 'sec_market', name: '市場別', hidden: true },
];

function ManageTransaction(props) {
   console.log('--ManageTransaction--');
   const [refreshState, setRefresh] = useState(true);

   const [editingValues, setEditingValues] = useState({});
   const [datalist, setDatalist] = useState([]);

   const [showEdit, setShowEdit] = useState(false);
   const [showDelete, setShowDelete] = useState(false);
   const [showToast, setShowToast] = useState(false);

   const refresh = () => {
      setRefresh((refreshState) => (!refreshState));
   }

   const validate = (values) => {
      const errors = {};
      if (!values.sec_str) {
         errors.sec_str = "代號及名稱不可空白";
      }
      if (datalist.indexOf(values.sec_str) < 0) {
         errors.sec_str = "查無此股, 請從選項填入";
      }
      if (!values.txn_price) {
         errors.txn_price = "價格不可空白";
      }
      if (!values.txn_amount) {
         errors.txn_amount = "數量不可空白";
      }
      return errors;
   };

   const handleSubmit = (values, actions) => {
      let dataToServer = {
         sec_id: values.sec_str.split(" ")[0],
         acc_email: acc_email,
         ...values
      };
      axios.post(urlPostCreate, dataToServer).then((res) => {
         console.log(JSON.stringify(res.data));
         let newInitValues = resetInputs({ ...values });
         actions.resetForm({ values: newInitValues });
         actions.setSubmitting(false);
         refresh();
      });
   };

   const handleShowEdit = (cells) => {
      let values = cells.map((v) => v.data);
      let dataToEdit = col.reduce((target, elm, idx) => {
         target[elm.id] = elm.formatter && typeof elm.formatter(values[idx]) !== 'object' ? elm.formatter(values[idx]) : values[idx];
         return target;
      }, {});
      dataToEdit['sec_str'] = `${dataToEdit.sec_id} ${dataToEdit.sec_name}`;
      setDatalist([`${dataToEdit.sec_id} ${dataToEdit.sec_name}`]);
      setEditingValues(dataToEdit);
      setShowEdit(true);
   }
   const handleCloseEdit = () => {
      setEditingValues();
      setShowEdit(false);
   }
   const handleEdit = (values, actions) => {
      let dataToServer = {
         sec_id: values.sec_str.split(" ")[0],
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
      dataToDelete['sec_str'] = `${dataToDelete.sec_id} 台積電`;
      setDatalist([`${dataToDelete.sec_id} 台積電`]);
      setEditingValues(dataToDelete);
      setShowDelete(true);
   }
   const handleCloseDelete = () => {
      setEditingValues();
      setShowDelete(false);
   }
   const handleDelete = (values, actions) => {
      let dataToServer = {
         txn_id: values.txn_id
      };
      axios.delete(urlDelete, { data: dataToServer }).then((res) => {
         console.log(res);
         actions.resetForm();
         handleCloseDelete();
         refresh();
         setShowToast(true);
      });
   }

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
                  onSubmit={handleSubmit}
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
                        name="sec_str" id="sec_str"
                        type="text"
                        placeholder=""
                        inline="true"
                        list={datalist}
                        setList={setDatalist}
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
                     <Row>
                        <Col lg={8}>
                           <MyInput
                              label="摘要"
                              id="txn_note"
                              name="txn_note"
                              type="text"
                           />
                        </Col>
                        <Col lg={1} className="d-inline-flex flex-column-reverse text-nowrap  input-group p-2">
                           <Button type="submit" variant="warning" size="sm">送出</Button>
                        </Col>
                     </Row>
                  </Form>
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
                              label="編號"
                              name="txn_round"
                              id="txn_round"
                              type="number"
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
                           <MyInput
                              name="txn_id"
                              id="txn_id"
                              type="number"
                              inline="true"
                              className="d-none"
                           />
                           <br />
                           <MyInput
                              label="股票代號及名稱"
                              name="sec_str" id="sec_str"
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
                           <Row>
                              <Col lg={8}>
                                 <MyInput
                                    label="摘要"
                                    id="txn_note"
                                    name="txn_note"
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
                        <Form>
                           <MyInput
                              label="日期"
                              name="txn_date"
                              id="txn_date"
                              type="date"
                              inline="true"
                              size="sm"
                              readOnly
                           />
                           <MyInput
                              name="txn_id"
                              id="txn_id"
                              type="number"
                              inline="true"
                              className="d-none"
                              readOnly
                           />
                           <MyInput
                              label="編號"
                              name="txn_round"
                              id="txn_round"
                              type="number"
                              inline="true"
                              readOnly
                           />
                           <MySelect
                              label="類型"
                              name="txn_position"
                              id="txn_position"
                              type="text"
                              inline="true"
                              size="sm"
                              readOnly>
                              {[
                                 '建倉', '加碼', '減碼', '停利', '停損'
                              ]}
                           </MySelect>
                           <br />
                           <MyInput
                              label="股票代號及名稱"
                              name="sec_str" id="sec_str"
                              type="text"
                              placeholder=""
                              inline="true"
                              list={datalist}
                              getList={getDatalist}
                              readOnly
                           />
                           <MyInput
                              label="均價"
                              name="txn_price"
                              id="txn_price"
                              type="number"
                              placeholder="單位: 新台幣"
                              inline="true"
                              readOnly
                           />
                           <MyInput
                              label="數量"
                              name="txn_amount"
                              id="txn_amount"
                              type="number"
                              step="1000"
                              placeholder="負數為賣出或放空"
                              inline="true"
                              readOnly
                           />
                           <Row>
                              <Col lg={8}>
                                 <MyInput
                                    label="摘要"
                                    id="txn_note"
                                    name="txn_note"
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
                     </Formik>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
               </Modal>
            </Col>
            <Col lg={4}>
               <MyCurrentPosition col={colInventory} className={{ table: 'table table-sm' }}
                  refreshState={refreshState} url={urlPostInventory}
                  dataToServer={{ acc_email: acc_email, dateQuery: dt.format(new Date(), 'YYYY-MM-DD') }}
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
                     <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled bsPrefix='btn btn-basic ml-1'>按住shift點選欄位可多重排序</Nav.Link>
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

export default ManageTransaction;