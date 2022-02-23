/* * * * * 人豪 * * * * * 
 * 1.副圖: 損益來源(圓餅圖)
 * 2.主圖: 資產變動圖
 * 3.圖表選項改以下拉式tab選單呈現
 * const acc_email = ... 要換成localStorage
 * 
 * * * * * * * * * * * */

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import dt from 'date-and-time';

import { MyFormikObserver, MyInput, MySelect } from '../components/MyFormComponent';
import ManageRecent from '../components/ManageRecent.jsx';

const acc_email = 'ggg@mail.com';
const nowTime = new Date();
const urlPostChartData = '';
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
// 副表使用
const col2 = [
   { id: 'sec_id', name: '代號' },
   { id: 'sec_name', name: '名稱' },
   { id: 'total', name: '庫存數量' },
];

function ManageCheck(props) {
   console.log('--ManageCheck--');
   const [refreshState, setRefresh] = useState(true);
   const refresh = () => {
      setRefresh(!refreshState);
   };
   const [inputValues, setInputValues] = useState({
      dateQuery1:dt.format(dt.addYears(nowTime,-1),'YYYY-MM-DD'),
      dateQuery2:dt.format(nowTime,'YYYY-MM-DD'),
   })
   console.log(JSON.stringify(inputValues))
   const [chartData, setChartData] = useState([]);

useEffect(() => {
   let dataToServer = {
      acc_email: acc_email,
      dateQuery1: inputValues.dateQuery1,
      dateQuery2: inputValues.dateQuery2,
   }
   console.log(`ManageCheck useEffect (post): ${JSON.stringify(dataToServer)}`);
   // axios.post(url, urlPostChartData).then((res) => {
   //    setChartData(res.data);
   // }
   // dateQuery預設為去年至今, 故第一次進戶畫面會先抓近一年資料來呈現
   // onSubmit呼叫setRefreshState再次觸發抓取資料
}, [refreshState])

return (
   <Container fluid>
      <Row>
         <Col lg={8}>
            <Formik
               initialValues={{
                  dateQuery1: inputValues.dateQuery1,
                  dateQuery2: inputValues.dateQuery2,
               }}
               validate={
                  (values) => {
                     const errors = {};
                     if (values.dateQuery1 || values.dateQuery1) {
                        return errors;
                     } else {
                        errors.dateQuery1 = "起訖日至少擇一輸入";
                        errors.dateQuery2 = "起訖日至少擇一輸入";
                        return errors;
                     }
                  }
               }
               onSubmit={(values, actions) => {
                  let dataToServer = {
                     acc_email: acc_email,
                     ...values
                  };
                  Window.alert(`dataToServer: ${JSON.stringify(dataToServer)}`);
                  refresh();
                  // axios.post(urlPostCreate, dataToServer).then((res) => {
                  //    console.log(res.data);
                  //    actions.resetForm();
                  // });
               }}
            >
               {(props) => (
                  <Form>
                     <MyInput
                        label="日期"
                        name="dateQuery1" id="dateQuery1"
                        type="date" inline="true"
                     />
                     <MyInput
                        label="日期"
                        name="dateQuery2" id="dateQuery2"
                        type="date" inline="true"
                     />
                     <MySelect
                        label="圖表"
                        name="chartType" id="chartType"
                        type="text" inline="true"
                     >
                        {['總資產', '累計資產報酬(元)', '累計資產報酬(%)',]}
                     </MySelect>
                     <MyFormikObserver
                        value={props.values}
                        onChange={setInputValues}>
                     </MyFormikObserver>
                     <br />
                  </Form>
               )}
            </Formik>
         </Col>
      </Row>
      <Row>
         <Col lg={12}>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" mountOnEnter={true}>
               <Nav variant="pills">
                  <Nav.Item>
                     <Nav.Link eventKey="first" bsPrefix='btn btn-light ml-1'>資產變動</Nav.Link>
                  </Nav.Item>
                  {/* <Nav.Item>
                     <Nav.Link eventKey="first" bsPrefix='btn btn-light ml-1'>損益來源</Nav.Link>
                  </Nav.Item> */}
               </Nav>
               <Tab.Content>
                  <Tab.Pane eventKey="first">
                     {/* 折線圖 */}
                  </Tab.Pane>
                  {/* <Tab.Pane eventKey="second">
                     折線圖
                  </Tab.Pane> */}
               </Tab.Content>
            </Tab.Container>
         </Col>

      </Row>
   </Container >
);
}

export default ManageCheck;