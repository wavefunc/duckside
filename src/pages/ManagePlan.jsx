/* * * * * 人豪 * * * * * 
 * 
 * 
 * * * * * * * * * * * */

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Modal, Card } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import dt from 'date-and-time';
import { h } from "gridjs";

import { MyFormikObserver, MyInput, MyOkToastSlideUp, MyButton } from '../components/MyFormComponent';
import ManageRecent from '../components/ManageRecent.jsx';
import myPlanHelper from '../components/MyPlanHelper.jsx';
import Breadcrumb from '../components/Breadcrumb'

const acc_email = localStorage.getItem('loginState');
const urlPostRecent = 'http://localhost:5000/plan/recent';
const urlPostCreate = 'http://localhost:5000/plan/create';
const urlPutUpdate = 'http://localhost:5000/plan/update';
const urlDelete = 'http://localhost:5000/plan/delete';
const urlGetDatalist = 'http://localhost:5000/securities/datalist/';

// 表單設定
const initialValues = {
   plan_date: dt.format(new Date(), 'YYYY-MM-DD'),
   sec_str: "",
   plan_strategy: "自訂",
   plan_param1: "",
   plan_param2: "",
   plan_anchor: "",
   plan_stoploss: "",
   plan_target: "",
   plan_note: "",
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
   { id: 'plan_id', name: 'asd_id', hidden: true },
   {
      id: 'plan_date', name: '日期', width: '10%',
      formatter: (cell) => { let d = new Date(cell); return dt.format(d, 'YYYY-MM-DD'); },
   },
   { id: 'sec_id', name: '代號', width: '8%', },
   { id: 'sec_name', name: '名稱', width: '10%', },
   { id: 'plan_strategy', name: '類型', width: '18%', },
   { id: 'plan_param1', name: '參數1', hidden: true },
   { id: 'plan_param2', name: '參數2', hidden: true },
   {
      id: 'plan_anchor', name: h('b', { style: { 'float': 'right', } }, '參考'), width: '8%',
      formatter: (cell) => h('b', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   {
      id: 'plan_stoploss', name: h('b', { style: { 'float': 'right', } }, '停損'), width: '8%',
      formatter: (cell) => h('b', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   {
      id: 'plan_target', name: h('b', { style: { 'float': 'right', } }, '目標'), width: '8%',
      formatter: (cell) => h('b', { style: { 'float': 'right', } }, cell.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","))
   },
   { id: 'plan_note', name: '筆記', width: '15%', },
];

// 副表設定
// 無副表

function Manageplan(props) {
   console.log('--Manageplan--');
   const [refreshState, setRefresh] = useState(true);

   const [editingValues, setEditingValues] = useState({});
   const [datalist, setDatalist] = useState([]);
   const [inputValues, setInputValues] = useState({});
   const [strategy, setStrategy] = useState({});
   const [result, setResult] = useState();

   const [showEdit, setShowEdit] = useState(false);
   const [showDelete, setShowDelete] = useState(false);
   const [showToast, setShowToast] = useState(false);

   const refresh = () => {
      setRefresh(!refreshState);
   };

   const planSchema = yup.object().shape({
      plan_date: yup.date().typeError('日期格式為yyyy-mm-dd').required("日期不可空白"),
      sec_str: yup.string().typeError('查無此股, 請從選項填入').required("代號及名稱不可空白").test(
         'isListed',
         '查無此股, 請從選項填入',
         (value, testContext) => datalist.indexOf(value) > -1,
      ),
      plan_anchor: yup.number().typeError("價格須為正數").required("價格不可空白").positive('價格須為正數'),
      plan_stoploss: yup.number().typeError("價格須為正數").required("價格不可空白").positive('價格須為正數'),
      plan_target: yup.number().typeError("價格須為正數").required("價格不可空白").positive('價格須為正數'),
   });

   const handleSubmit = (values, actions) => {
      let dataToServer = {
         sec_id: values.sec_str.split(" ")[0],
         acc_email: acc_email,
         ...values
      };
      console.log('dataToServer:');
      console.log(dataToServer);

      switch (strategy.param) {
         case 0:
            dataToServer.plan_param1 = "";
            dataToServer.plan_param2 = "";
            break
         case 1:
            dataToServer.plan_param2 = "";
            break;
         default:
            break
      };
      axios.post(urlPostCreate, dataToServer).then((res) => {
         actions.resetForm();
         actions.setSubmitting(false);
         refresh();
         console.log(res.data);
      });
   };
   const setEditModal = (cells) => {
      let values = cells.map((v) => v.data);
      let dataToEdit = col.reduce((target, elm, idx) => {
         // console.log(elm.formatter && typeof elm.formatter(values[idx]) !== 'object' ? elm.formatter(values[idx]) : values[idx]);
         target[elm.id] = elm.formatter && typeof elm.formatter(values[idx]) !== 'object' ? elm.formatter(values[idx]) : values[idx];
         return target;
      }, {});
      dataToEdit['sec_str'] = `${dataToEdit.sec_id} ${dataToEdit.sec_name}`;
      setDatalist([dataToEdit['sec_str']]);
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
      console.log(values.sec_str.split(" ")[0]);
      let dataToServer = {
         acc_email: acc_email,
         ...values
      };
      dataToServer.sec_id = values.sec_str.split(" ")[0];
      dataToServer.sec_name = values.sec_str.split(" ")[1];

      switch (myPlanHelper.findIndex(dataToServer.plan_strategy).param) {
         case 0:
            dataToServer.plan_param1 = "";
            dataToServer.plan_param2 = "";
            break;
         case 1:
            dataToServer.plan_param2 = "";
            break;
         default:
            break;
      };
      console.log(dataToServer);
      axios.put(urlPutUpdate, dataToServer).then((res) => {
         console.log(res.data);
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
         plan_id: values.plan_id
      };
      axios.delete(urlDelete, { data: dataToServer }).then((res) => {
         console.log(res.data);
         actions.resetForm();
         handleCloseDelete();
         refresh();
         setShowToast(true);
      });
   }

   useEffect(() => {
      console.log('ManagePlan useEffect');
      let strategyName = inputValues.plan_strategy;
      if (strategyName) {
         let strategyKey = myPlanHelper.findIndex(strategyName).key;
         let helper = myPlanHelper.getFunction(strategyKey);
         setResult(helper(inputValues));
         setStrategy(myPlanHelper.findIndex(strategyName));
      }
   }, [inputValues])

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
                           validationSchema={planSchema}
                           onSubmit={handleSubmit}
                        >
                           {(props) => (
                              <Form className='form-inline'>
                                 <MyInput
                                    label="日期"
                                    name="plan_date"
                                    type="date"
                                    flex='1 1 auto'
                                 />
                                 <MyInput
                                    label="股票代號及名稱"
                                    name="sec_str"
                                    type="text"
                                    list={datalist}
                                    setList={setDatalist}
                                    getList={getDatalist}
                                    flex='1 1 auto'
                                 />
                                 <MyInput
                                    label="類型"
                                    name="plan_strategy"
                                    type="text"
                                    flex='1 1 auto'
                                 >
                                    {myPlanHelper.list}
                                 </MyInput>
                                 <MyInput
                                    label="參數1"
                                    name="plan_param1"
                                    type="number"
                                    hidden={strategy && strategy.param < 1}
                                    flex='1 1 auto'
                                 />
                                 <div style={{ width: '100%' }}></div>
                                 <MyInput
                                    label="參數2"
                                    name="plan_param2"
                                    type="number"
                                    hidden={strategy && strategy.param < 2}
                                    flex='1 1 auto'
                                 />
                                 <MyInput
                                    label="參考價"
                                    name="plan_anchor"
                                    type="number"
                                    placeholder="心目中合理的進場價"
                                    flex='1 1 auto'
                                 />
                                 <MyInput
                                    label="停損價"
                                    name="plan_stoploss"
                                    type="number"
                                    placeholder=""
                                    flex='1 1 auto'
                                 />
                                 <MyInput
                                    label="目標價"
                                    name="plan_target"
                                    type="number"
                                    placeholder=""
                                    flex='1 1 auto'
                                 />
                                 <div style={{ width: '100%' }}></div>
                                 <MyInput
                                    label="筆記"
                                    name="plan_note"
                                    type="text"
                                    maxWidth="515px"
                                    flex='2 1 auto'
                                 />
                                 <MyButton
                                    type="submit"
                                    value="送出"
                                    className="btn btn-warning"
                                    flex='1 2 auto'
                                 />
                                 <MyFormikObserver
                                    value={props.values}
                                    onChange={setInputValues}>
                                 </MyFormikObserver>
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
                        validationSchema={planSchema}
                        onSubmit={handleEdit}
                     >
                        {(props) => (
                           <Form className='form-inline'>
                              <MyInput
                                 label="日期"
                                 name="plan_date"
                                 type="date"
                                 flex='1 1 auto'
                                 maxWidth='43.5%'
                              />
                              <MyInput
                                 label="股票代號及名稱"
                                 name="sec_str"
                                 type="text"
                                 list={datalist}
                                 setList={setDatalist}
                                 getList={getDatalist}
                                 flex='1 1 auto'
                                 maxWidth='43.5%'
                              />
                              <MyInput
                                 label="類型"
                                 name="plan_strategy"
                                 type="text"
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              >
                                 {myPlanHelper.list}
                              </MyInput>
                              <MyInput
                                 label="參數1"
                                 name="plan_param1"
                                 type="number"
                                 hidden={editingValues && myPlanHelper.findIndex(editingValues.plan_strategy).param < 1}
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              />
                              <MyInput
                                 label="參數2"
                                 name="plan_param2"
                                 type="number"
                                 hidden={editingValues && myPlanHelper.findIndex(editingValues.plan_strategy).param < 2}
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              />
                              <div style={{ width: '100%' }}></div>
                              <MyInput
                                 label="參考價"
                                 name="plan_anchor"
                                 type="number"
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              />
                              <MyInput
                                 label="停損價"
                                 name="plan_stoploss"
                                 type="number"
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              />
                              <MyInput
                                 label="目標價"
                                 name="plan_target"
                                 type="number"
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              />
                              <div style={{ width: '100%' }}></div>
                              <MyInput
                                 label="筆記"
                                 name="plan_note"
                                 type="text"
                                 maxWidth="100%"
                                 flex='2 1 auto'
                              />
                              <MyButton
                                 type="submit"
                                 value="送出"
                                 className="btn btn-warning"
                              />
                              <MyButton
                                 type="button"
                                 value="取消"
                                 className="btn btn-outline-secondary"
                                 onClick={handleCloseEdit}
                                 flex='1 2 auto'
                              />
                              <MyFormikObserver
                                 value={props.values}
                                 onChange={setEditingValues}>
                              </MyFormikObserver>
                           </Form>
                        )}
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
                                 name="plan_date"
                                 type="date"
                                 flex='1 1 auto'
                                 maxWidth='43.5%'
                              />
                              <MyInput readOnly
                                 label="股票代號及名稱"
                                 name="sec_str"
                                 type="text"
                                 list={datalist}
                                 setList={setDatalist}
                                 getList={getDatalist}
                                 flex='1 1 auto'
                                 maxWidth='43.5%'
                              />
                              <MyInput readOnly
                                 label="類型"
                                 name="plan_strategy"
                                 type="text"
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              >
                                 {myPlanHelper.list}
                              </MyInput>
                              <MyInput readOnly
                                 label="參數1"
                                 name="plan_param1"
                                 type="number"
                                 hidden={editingValues && !editingValues.plan_param1}
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              />
                              <MyInput readOnly
                                 label="參數2"
                                 name="plan_param2"
                                 type="number"
                                 hidden={editingValues && !editingValues.plan_param2}
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              />
                              <div style={{ width: '100%' }}></div>
                              <MyInput readOnly
                                 label="參考價"
                                 name="plan_anchor"
                                 type="number"
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              />
                              <MyInput readOnly
                                 label="停損價"
                                 name="plan_stoploss"
                                 type="number"
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              />
                              <MyInput readOnly
                                 label="目標價"
                                 name="plan_target"
                                 type="number"
                                 flex='1 1 auto'
                                 maxWidth='28%'
                              />
                              <div style={{ width: '100%' }}></div>
                              <MyInput readOnly
                                 label="筆記"
                                 name="plan_note"
                                 type="text"
                                 maxWidth="100%"
                                 flex='2 1 auto'
                              />
                              <MyButton
                                 type="submit"
                                 value="送出"
                                 className="btn btn-danger"
                              />
                              <MyButton
                                 type="button"
                                 value="取消"
                                 className="btn btn-outline-secondary"
                                 onClick={handleCloseDelete}
                                 flex='1 2 auto'
                              />
                           </Form>
                     </Formik>
                  </Modal.Body>
                  <Modal.Footer>
                  </Modal.Footer>
               </Modal>
            </Col>
            <Col lg={4}>
               <Card>
                  <Card.Header>小幫手</Card.Header>
                  <Card.Body>
                     <Card.Text>
                        {strategy.directions}
                     </Card.Text>
                     <Card.Title>
                        {result ? `${strategy.result} ${result} 元` : null}
                     </Card.Title>
                  </Card.Body>
               </Card>
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

export default Manageplan;