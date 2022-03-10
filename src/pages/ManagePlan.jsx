/* * * * * 人豪 * * * * * 
 * 
 * 
 * * * * * * * * * * * */

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button, Modal, Card } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import dt from 'date-and-time';
import { h } from "gridjs";

import { MyFormikObserver, MyInput, MySelect, MyOkToastSlideUp } from '../components/MyFormComponent';
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
   { id: 'plan_param1', name: '參數', hidden: true },
   { id: 'plan_param2', name: '參數', hidden: true },
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

   const validate = (values) => {
      const errors = {};
      if (values.plan_date < 0) {
         errors.plan_date = "日期不可空白";
      }
      if (!values.sec_str) {
         errors.sec_str = "代號及名稱不可空白";
      }
      if (datalist.indexOf(values.sec_str) < 0) {
         errors.sec_str = "查無此股, 請從選項填入";
      }
      return errors;
   };

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

   const handleShowEdit = (cells) => {
      let values = cells.map((v) => v.data);
      let dataToEdit = col.reduce((target, elm, idx) => {
         // console.log(elm.formatter && typeof elm.formatter(values[idx]) !== 'object' ? elm.formatter(values[idx]) : values[idx]);
         target[elm.id] = elm.formatter && typeof elm.formatter(values[idx]) !== 'object' ? elm.formatter(values[idx]) : values[idx];
         return target;
      }, {});
      dataToEdit['sec_str'] = `${dataToEdit.sec_id} ${dataToEdit.sec_name}`;
      setDatalist([dataToEdit['sec_str']]);
      setEditingValues(dataToEdit);
      setShowEdit(true);
   }
   const handleCloseEdit = () => {
      setShowEdit(false);
      setEditingValues();
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
      let values = cells.map((v) => v.data);
      let dataToDelete = col.reduce((target, elm, idx) => {
         target[elm.id] = elm.formatter && typeof elm.formatter(values[idx]) !== 'object' ? elm.formatter(values[idx]) : values[idx];
         return target;
      }, {});
      dataToDelete['sec_str'] = `${dataToDelete.sec_id} ${dataToDelete.sec_name}`;
      setDatalist([dataToDelete['sec_str']]);
      setEditingValues(dataToDelete);
      setShowDelete(true);
   }
   const handleCloseDelete = () => {
      setShowDelete(false);
      setEditingValues();
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
         <Row className='pr-2'>
            <Col lg={8}>
               <Formik
                  initialValues={initialValues}
                  validate={validate}
                  onSubmit={handleSubmit}
               >
                  {(props) => (
                     <Form>
                        <MyInput
                           label="日期"
                           name="plan_date" id="plan_date"
                           type="date"
                           inline="true" size="sm"
                        />
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
                        <MySelect
                           label="類型"
                           name="plan_strategy" id="plan_strategy"
                           type="text"
                           inline="true"
                           size="sm"
                        >
                           {myPlanHelper.list}
                        </MySelect>
                        <MyInput
                           label={strategy && strategy.param < 1 ? null : "參數1"}
                           name="plan_param1" id="plan_param1"
                           type="number" step="1"
                           placeholder=""
                           inline="true"
                           className={strategy && strategy.param < 1 ? "d-none" : null}
                        />
                        <MyInput
                           label={strategy && strategy.param < 2 ? null : "參數2"}
                           name="plan_param2" id="plan_param2"
                           type="number" step="1"
                           placeholder=""
                           inline="true"
                           className={strategy && strategy.param < 2 ? "d-none" : null}
                        />
                        <br />
                        <MyInput
                           label="參考價"
                           name="plan_anchor" id="plan_anchor"
                           type="number" step="1"
                           placeholder="心目中合理的進場價"
                           inline="true"
                        />
                        <MyInput
                           label="停損價"
                           name="plan_stoploss" id="plan_stoploss"
                           type="number" step="1"
                           placeholder=""
                           inline="true"
                        />
                        <MyInput
                           label="目標價"
                           name="plan_target" id="plan_target"
                           type="number" step="1"
                           placeholder=""
                           inline="true"
                        />
                        <br />
                        <Row>
                           <Col lg={8}>
                              <MyInput
                                 label="筆記"
                                 id="plan_note"
                                 name="plan_note"
                                 type="text"
                              />
                           </Col>
                           <Col lg={1} className="d-inline-flex flex-column-reverse text-nowrap  input-group p-2">
                              <Button type="submit" variant="warning" size="sm">送出</Button>
                           </Col>
                        </Row>
                        <MyFormikObserver
                           value={props.values}
                           onChange={setInputValues}>
                        </MyFormikObserver>
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
                                 name="plan_date" id="plan_date"
                                 type="date"
                                 inline="true" size="sm"
                              />
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
                              <MySelect
                                 label="類型"
                                 name="plan_strategy" id="plan_strategy"
                                 type="text"
                                 inline="true"
                                 size="sm"
                              >
                                 {myPlanHelper.list}
                              </MySelect>
                              <MyInput
                                 label={editingValues && myPlanHelper.findIndex(editingValues.plan_strategy).param < 1 ? null : "參數1"}
                                 name="plan_param1" id="plan_param1"
                                 type="number" step="1"
                                 placeholder=""
                                 inline="true"
                                 className={editingValues && myPlanHelper.findIndex(editingValues.plan_strategy).param < 1 ? "d-none" : null}
                              />
                              <MyInput
                                 label={editingValues && myPlanHelper.findIndex(editingValues.plan_strategy).param < 2 ? null : "參數2"}
                                 name="plan_param2" id="plan_param2"
                                 type="number" step="1"
                                 placeholder=""
                                 inline="true"
                                 className={editingValues && myPlanHelper.findIndex(editingValues.plan_strategy).param < 2 ? "d-none" : null}
                              />
                              <br />
                              <MyInput
                                 label="參考價"
                                 name="plan_anchor" id="plan_anchor"
                                 type="number" step="1"
                                 placeholder="心目中合理的進場價"
                                 inline="true"
                              />
                              <MyInput
                                 label="停損價"
                                 name="plan_stoploss" id="plan_stoploss"
                                 type="number" step="1"
                                 placeholder=""
                                 inline="true"
                              />
                              <MyInput
                                 label="目標價"
                                 name="plan_target" id="plan_target"
                                 type="number" step="1"
                                 placeholder=""
                                 inline="true"
                              />
                              <br />
                              <Row>
                                 <Col lg={8}>
                                    <MyInput
                                       label="筆記"
                                       id="plan_note"
                                       name="plan_note"
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
                              name="plan_date" id="plan_date"
                              type="date"
                              inline="true" size="sm"
                              readOnly
                           />
                           <MyInput
                              label="股票代號及名稱"
                              name="sec_str" id="sec_str"
                              type="text"
                              placeholder=""
                              inline="true"
                              list={datalist}
                              setList={setDatalist}
                              getList={getDatalist}
                              readOnly
                           />
                           <MySelect
                              label="類型"
                              name="plan_strategy" id="plan_strategy"
                              type="text"
                              inline="true"
                              size="sm"
                              readOnly
                           >
                              {myPlanHelper.list}
                           </MySelect>
                           <MyInput
                              label={editingValues && editingValues.plan_param1 ? "參數1" : null}
                              name="plan_param1" id="plan_param1"
                              type="number" step="1"
                              placeholder=""
                              inline="true"
                              className={editingValues && editingValues.plan_param1 ? null : "d-none"}
                              readOnly
                           />
                           <MyInput
                              label={editingValues && editingValues.plan_param1 ? "參數1" : null}
                              name="plan_param2" id="plan_param2"
                              type="number" step="1"
                              placeholder=""
                              inline="true"
                              className={editingValues && editingValues.plan_param1 ? null : "d-none"}
                              readOnly
                           />
                           <br />
                           <MyInput
                              label="參考價"
                              name="plan_anchor" id="plan_anchor"
                              type="number" step="1"
                              placeholder="心目中合理的進場價"
                              inline="true"
                              readOnly
                           />
                           <MyInput
                              label="停損價"
                              name="plan_stoploss" id="plan_stoploss"
                              type="number" step="1"
                              placeholder=""
                              inline="true"
                              readOnly
                           />
                           <MyInput
                              label="目標價"
                              name="plan_target" id="plan_target"
                              type="number" step="1"
                              placeholder=""
                              inline="true"
                              readOnly
                           />
                           <br />
                           <Row>
                              <Col lg={8}>
                                 <MyInput
                                    label="筆記"
                                    id="plan_note"
                                    name="plan_note"
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