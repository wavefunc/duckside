/* * * * * 人豪 * * * * * 
 * 
 * 
 * 
 * * * * * * * * * * * */

import React, { useState } from 'react';
import { Container, Row, Col, Tab, Nav, Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import { h } from "gridjs";
import axios from 'axios';
import dt from 'date-and-time';
import * as xlsx from "xlsx"

import { MyButton, MyInput, MyUpload, MyOkToastSlideUp, MyFilePreview, MyFileExample } from '../components/MyFormComponent';
import MyCurrentPosition from '../components/ManageCurrent.jsx';
import ManageRecent from '../components/ManageRecent.jsx';
import Breadcrumb from '../components/Breadcrumb'

const acc_email = localStorage.getItem('loginState');
const urlPostRecent = 'http://localhost:5000/transaction/recent';
const urlPostCreate = 'http://localhost:5000/transaction/create';
const urlPostUpload = 'http://localhost:5000/transaction/upload';
const urlPutUpdate = 'http://localhost:5000/transaction/update';
const urlDelete = 'http://localhost:5000/transaction/delete';
const urlPostInventory = 'http://localhost:5000/transaction/inventory';
const urlGetDatalist = 'http://localhost:5000/securities/datalist/';

// 表單設定
const initialValues = {
   txn_date: dt.format(new Date(), 'YYYY-MM-DD'),
   sec_str: "",
   txn_round: "",
   txn_position: "建倉",
   txn_price: "",
   txn_amount: "",
   txn_note: "",
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
   { id: 'sec_id', name: '代號', width: '25%' },
   { id: 'sec_name', name: '名稱', width: '25%' },
   {
      id: 'total', name: '庫存數量', width: '40%',
      formatter: (cell) => h('b', { style: { 'float': 'right', 'margin-right': '5px' } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   { id: 'sec_market', name: '市場別', hidden: true },
];

function ManageTransaction(props) {
   console.log('--ManageTransaction--');
   const [refreshState, setRefresh] = useState(true);

   const [datalist, setDatalist] = useState([]);
   const [editingValues, setEditingValues] = useState({});

   const [showEdit, setShowEdit] = useState(false);
   const [showDelete, setShowDelete] = useState(false);
   const [showToast, setShowToast] = useState(false);

   const refresh = () => {
      setRefresh((refreshState) => (!refreshState));
   }
   const txnSchema = yup.object().shape({
      txn_date: yup.date().typeError('日期格式為yyyy-mm-dd').required("日期不可空白"),
      txn_round: yup.number().typeError('編號須為正整數').integer('編號須為正整數').positive('編號須為正整數'),
      sec_str: yup.string().typeError('查無此股, 請從選項填入').required("代號及名稱不可空白").test(
         'isListed', '查無此股, 請從選項填入',
         (value) => datalist.indexOf(value) > -1,
      ),
      txn_price: yup.number().typeError("價格須為正數").required("價格不可空白").positive('價格須為正數'),
      txn_amount: yup.number().typeError("數量須為整數").required("數量不可空白").integer('數量須為整數'),
   });


   const handleSubmit = (values, actions) => {
      let dataToServer = {
         sec_id: values.sec_str.split(" ")[0],
         acc_email: acc_email,
         ...values
      };
      console.log(dataToServer);
      axios.post(urlPostCreate, dataToServer).then((res) => {
         console.log(JSON.stringify(res.data));
         let newInitValues = resetInputs({ ...values });
         actions.resetForm({ values: newInitValues });
         actions.setSubmitting(false);
         refresh();
      });
   };
   const handleUpload = (values, actions) => {
      let reader = new FileReader();
      reader.onloadend = () => {
         let arrayBuffer = reader.result;
         let workbook = xlsx.read(arrayBuffer, { type: 'base64', cellDates: true, cellText: false });
         let aoa = xlsx.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header: 1, raw: false, dateNF: "YYYY-MM-DD" });
         let headerRow = aoa[0];
         let aoaDataRows = aoa.slice(1,);

         let colIds = headerRow.map((colName) => {
            let idx = col.findIndex((obj) => {
               let boolean = false;
               if (typeof obj.name === 'string' && obj.name === colName) { boolean = true };
               if (typeof obj.name !== 'string' && obj.name.props.children === colName) { boolean = true };
               return boolean;
            });
            return col[idx].id;
         });

         // 刪除後端不需要的欄位
         let idxToRemove = colIds.indexOf("sec_name");
         colIds = colIds.filter((v, i) => i !== idxToRemove);
         aoaDataRows = aoaDataRows.map((arr) => arr.filter((v, i) => i !== idxToRemove));

         let dataToServer = {
            acc_email: acc_email,
            cols: colIds,
            vals: aoaDataRows,
         }
         console.log(dataToServer);
         axios.post(urlPostUpload, dataToServer).then((res) => {
            console.log(JSON.stringify(res.data));
            actions.resetForm();
            actions.setSubmitting(false);
            window.setTimeout(refresh, 1000);
         });
      }
      reader.readAsArrayBuffer(values.uploadFile);
   }
   const setEditModal = (cells) => {
      let values = cells.map((v) => v.data);
      let dataToEdit = col.reduce((target, elm, idx) => {
         target[elm.id] = elm.formatter && typeof elm.formatter(values[idx]) !== 'object' ? elm.formatter(values[idx]) : values[idx];
         return target;
      }, {});
      dataToEdit['sec_str'] = `${dataToEdit.sec_id} ${dataToEdit.sec_name}`;
      setDatalist([`${dataToEdit.sec_id} ${dataToEdit.sec_name}`]);
      setEditingValues(dataToEdit);
   }
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
      setEditModal(cells);
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
                           上傳檔案
                        </Nav.Link>
                     </Nav.Item>
                     <MyFileExample
                        col={col}
                        className='ml-1' value="下載範本" variant="light"
                     />
                  </Nav>
                  <Tab.Content className='pt-2'>
                     <Tab.Pane eventKey="single">
                        <Formik
                           initialValues={initialValues}
                           validationSchema={txnSchema}
                           onSubmit={handleSubmit}
                        >
                           <Form className='form-inline'>
                              <MyInput
                                 label="日期"
                                 name="txn_date"
                                 type="date"
                                 flex='3 2 auto'
                              />
                              <MyInput
                                 label="編號"
                                 name="txn_round"
                                 type="text"
                                 placeholder="方便分批追蹤"
                                 flex='2 3 auto'
                              />
                              <MyInput
                                 label="類型"
                                 name="txn_position"
                                 type="select"
                                 flex='2 3 auto'
                              >
                                 {['建倉', '加碼', '減碼', '停利', '停損']}
                              </MyInput>
                              <div style={{ width: '100%' }}></div>
                              <MyInput
                                 label="股號及名稱"
                                 name="sec_str"
                                 type="text"
                                 list={datalist}
                                 setList={setDatalist}
                                 getList={getDatalist}
                                 flex='3 2 auto'
                              />
                              <MyInput
                                 label="均價"
                                 name="txn_price"
                                 type="number"
                                 placeholder="單位: 新台幣"
                                 flex='2 3 auto'
                              />
                              <MyInput
                                 label="數量"
                                 name="txn_amount"
                                 type="number"
                                 step="1000"
                                 placeholder="負數為賣出或放空"
                                 flex='2 3 auto'
                              />
                              <div style={{ width: '100%' }}></div>
                              <MyInput
                                 label="摘要"
                                 name="txn_note"
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
                        </Formik>
                     </Tab.Pane>
                     <Tab.Pane eventKey="file">
                        <Formik
                           initialValues={{ uploadFile: null, uploadPreview: "" }}
                           onSubmit={handleUpload}
                        >
                           {({ setFieldValue, values }) => (
                              <Form className='form-inline align-items-start'>
                                 <MyUpload
                                    label="接受 .xls .xlsx .csv 格式"
                                    name="uploadFile"
                                    id="uploadFile"
                                    type="file"
                                    flex='1 1 auto'
                                    maxWidth="515px"
                                    setFieldValue={setFieldValue}
                                 />
                                 <div style={{ width: '100%' }}></div>
                                 <MyFilePreview
                                    flex='1 1 auto'
                                    maxWidth="800px"
                                    minHeight="75px"
                                    maxHeight="300px"
                                    file={values.uploadFile}
                                    placeholder={<>
                                       檔案欄位說明:<br />
                                       1.股票將以代號欄為準, 名稱欄將被忽略<br />
                                       2.日期欄以excel日期值輸入即可, csv檔須存為'yyyy-mm-dd'格式<br />
                                       3.<br />
                                    </>}
                                 />
                                 <MyButton
                                    label=""
                                    type="submit"
                                    className="btn btn-warning"
                                    value="送出"
                                    flex='0 1 auto'
                                 />
                              </Form>
                           )
                           }
                        </Formik>
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
                        validationSchema={txnSchema}
                        onSubmit={handleEdit}
                     >
                        <Form className='form-inline'>
                           <MyInput
                              label="日期"
                              name="txn_date"
                              type="date"
                              flex='1 1 auto'
                              maxWidth='40%'
                           />
                           <MyInput
                              label="編號"
                              type="text"
                              name="txn_round"
                              placeholder="方便分批追蹤"
                              flex='1 1 auto'
                              maxWidth='24%'
                           />
                           <MyInput
                              label="類型"
                              name="txn_position"
                              type="select"
                              flex='1 1 auto'
                              maxWidth='24%'
                           >
                              {['建倉', '加碼', '減碼', '停利', '停損']}
                           </MyInput>
                           <div style={{ width: '100%' }}></div>
                           <MyInput
                              label="股號及名稱"
                              name="sec_str"
                              type="text"
                              list={datalist}
                              setList={setDatalist}
                              getList={getDatalist}
                              flex='1 1 auto'
                              maxWidth='40%'
                           />
                           <MyInput
                              label="均價"
                              name="txn_price"
                              type="number"
                              placeholder="單位: 新台幣"
                              flex='1 1 auto'
                              maxWidth='24%'
                           />
                           <MyInput
                              label="數量"
                              name="txn_amount"
                              type="number"
                              step="1000"
                              placeholder="負數為賣出或放空"
                              flex='1 1 auto'
                              maxWidth='24%'
                           />
                           <div style={{ width: '100%' }}></div>
                           <MyInput
                              label="摘要"
                              name="txn_note"
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
                              flex='0 1 auto'
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
                              name="txn_date"
                              type="date"
                              flex='1 1 auto'
                              maxWidth='40%'
                           />
                           <MyInput readOnly
                              label="編號"
                              name="txn_round"
                              placeholder="方便分批追蹤"
                              flex='1 1 auto'
                              maxWidth='24%'
                           />
                           <MyInput readOnly
                              label="類型"
                              name="txn_position"
                              type="select"
                              flex='1 1 auto'
                              maxWidth='24%'
                           >
                              {['建倉', '加碼', '減碼', '停利', '停損']}
                           </MyInput>
                           <div style={{ width: '100%' }}></div>
                           <MyInput readOnly
                              label="股號及名稱"
                              name="sec_str"
                              type="text"
                              placeholder=""
                              list={datalist}
                              setList={setDatalist}
                              getList={getDatalist}
                              flex='1 1 auto'
                              maxWidth='40%'
                           />
                           <MyInput readOnly
                              label="均價"
                              name="txn_price"
                              type="number"
                              placeholder="單位: 新台幣"
                              flex='1 1 auto'
                              maxWidth='24%'
                           />
                           <MyInput readOnly
                              label="數量"
                              name="txn_amount"
                              type="number"
                              step="1000"
                              placeholder="負數為賣出或放空"
                              flex='1 1 auto'
                              maxWidth='24%'
                           />
                           <div style={{ width: '100%' }}></div>
                           <MyInput readOnly
                              label="摘要"
                              name="txn_note"
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
                              flex='0 1 auto'
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
               <MyCurrentPosition col={colInventory} className={{ table: 'table table-sm' }}
                  refreshState={refreshState} url={urlPostInventory}
                  dataToServer={{ acc_email: acc_email, dateQuery: dt.format(new Date(), 'YYYY-MM-DD') }}
               ></MyCurrentPosition>
            </Col>
         </Row>
         <Row>
            <Col lg={12}>
               <Tab.Container id="tabsGrid" defaultActiveKey="first" mountOnEnter={true}>
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