/* * * * * 人豪 * * * * * 
 * 1.副表應該改成各個策略的說明, 包含必要參數及試算結果
 * 備忘:
 * const acc_email = ... 要換成localStorage
 * 
 * * * * * * * * * * * */

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import dt from 'date-and-time';

import { MyFormikObserver, MyInput, MySelect } from '../components/MyFormComponent';
import MyCurrentPosition from '../components/ManageCurrent.jsx';
import ManageRecent from '../components/ManageRecent.jsx';

const acc_email = 'ggg@mail.com';
const urlPostRecent = 'http://localhost:5000/plan/recent';
const urlPostCreate = 'http://localhost:5000/plan/create';
// const urlPutUpdate = 'http://localhost:5000/plan/update';
// const urlDelete = 'http://localhost:5000/plan/delete';
const urlPostInventory = 'http://localhost:5000/transaction/inventory';
const urlGetDatalist = 'http://localhost:5000/securities/datalist/';

// 主表使用
const col = [
   { id: 'plan_id', name: 'asd_id', hidden: 'true' },
   {
      id: 'plan_date', name: '日期',
      formatter: (cell) => { let d = new Date(cell); return dt.format(d, 'YYYY-MM-DD'); },
   },
   { id: 'sec_id', name: '代號' },
   { id: 'sec_name', name: '名稱' },
   { id: 'plan_strategy', name: '類型' },
   { id: 'plan_param1', name: '參數', hidden: true },
   { id: 'plan_param2', name: '參數', hidden: true },
   { id: 'plan_anchor', name: '參考價' },
   { id: 'plan_stoploss', name: '停損' },
   { id: 'plan_target', name: '目標' },
   { id: 'plan_note', name: '筆記' },
];

// 表單預設值
const initialValues = {
   plan_date: dt.format(new Date(), 'YYYY-MM-DD'),
   sec_str: "",
   plan_strategy: "",
   plan_param1: "",
   plan_param2: "",
   plan_anchor: "",
   plan_stoploss: "",
   plan_target: "",
}

// 副表使用
const col2 = [
   { id: 'sec_id', name: '代號' },
   { id: 'sec_name', name: '名稱' },
   { id: 'total', name: '庫存數量' },
];

function Manageplan(props) {
   console.log('--Manageplan--');
   const [refreshState, setRefresh] = useState(true);
   const refresh = () => {
      setRefresh(!refreshState);
   };
   const [inputValues, setInputValues] = useState();
   const [datalist, setDatalist] = useState([]);
   const planHelper = (values) => {
   }
   const handleEdit = (id) => {
      console.log(`editing ${id}`);
   };
   const handleDelete = (id) => {
      console.log(`deleting ${id}`);
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
   const handleSubmit = (values, actions) => {
      let dataToServer = {
         sec_id: values.sec_str.split(" ")[0],
         acc_email: acc_email,
         ...values
      };
      axios.post(urlPostCreate, dataToServer).then((res) => {
         console.log(dataToServer);
         console.log(res.data);
         actions.resetForm();
         refresh();
      });
   }
   // useEffect(() => {
   //    // console.log(`Manageplan useEffect: ${JSON.stringify(inputValues)}`);
   //    // 依照選取的類型, 自動計算參考值顯示在下方
   //    // 各種策略模型寫在其他檔案import進來

   // }, [inputValues])

   return (
      <Container fluid>
         <Row className='pr-2'>
            <Col lg={8}>
               <Formik
                  initialValues={initialValues}
                  validate={
                     (values) => {
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
                     }
                  }
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
                           getList={getDatalist}
                        />
                        <MySelect
                           label="類型"
                           name="plan_strategy" id="plan_strategy"
                           type="text"
                           inline="true"
                           size="sm">
                           {['自訂', '虧損相對總資本', '虧損絕對金額', '虧損百分比']}
                        </MySelect>
                        <br />
                        <MyInput
                           label="參數1"
                           name="plan_param1" id="plan_param1"
                           type="number" step="1"
                           placeholder=""
                           inline="true"
                        />
                        <MyInput
                           label="參數2"
                           name="plan_param2" id="plan_param2"
                           type="number" step="1"
                           placeholder=""
                           inline="true"
                        />
                        <MyInput
                           label="參考價"
                           name="plan_anchor" id="plan_anchor"
                           type="number" step="1"
                           placeholder=""
                           inline="true"
                        />
                        <MyInput
                           label="停損"
                           name="plan_stoploss" id="plan_stoploss"
                           type="number" step="1"
                           placeholder=""
                           inline="true"
                        />
                        <MyInput
                           label="目標"
                           name="plan_target" id="plan_target"
                           type="number" step="1"
                           placeholder=""
                           inline="true"
                        />
                        <MyFormikObserver
                           value={props.values}
                           onChange={setInputValues}>
                        </MyFormikObserver>
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
                        </Row>
                     </Form>
                  )}
               </Formik>
            </Col>
            <Col lg={4}>
               <MyCurrentPosition col={col2} className={{ table: 'table table-sm' }}
                  url={urlPostInventory} dataToServer={{ acc_email: acc_email, dateQuery: dt.format(new Date(), 'YYYY-MM-DD') }}
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
                  </Nav>
                  <Tab.Content>
                     <Tab.Pane eventKey="first">
                        <ManageRecent row={10} col={col} refreshState={refreshState}
                           edit={handleEdit} delete={handleDelete}
                           url={urlPostRecent} dataToServer={{ acc_email: acc_email, amount: 10 }}
                        ></ManageRecent>
                     </Tab.Pane>
                     <Tab.Pane eventKey="second">
                        <ManageRecent col={col} refreshState={refreshState}
                           edit={handleEdit} delete={handleDelete}
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