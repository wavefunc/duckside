/* * * * * 人豪 * * * * * 
 * 1.副圖: 損益來源(圓餅圖)
 * 2.主圖: 資產變動圖
 * 3.圖表選項改以下拉式tab選單呈現
 * const acc_email = ... 要換成localStorage
 * 
 * * * * * * * * * * * */

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

import { Formik, Form } from 'formik';
import axios from 'axios';
import dt from 'date-and-time';

import { MyInput, MySelect } from '../components/MyFormComponent';
import { MyChartLine } from '../components/MyChartComponent.jsx';

console.log(`login: ${localStorage.getItem('loginState')}`);
const acc_email = localStorage.getItem('loginState');

const urlPostRecent = 'http://localhost:5000/asset/recent';

const nowTime = new Date();
// const urlPostChartData = '';

// 主圖使用


// 副表使用

function ManageCheck(props) {
   console.log('--ManageCheck--');
   // const [refreshState, setRefresh] = useState(true);
   // const refresh = () => {
   //    setRefresh(!refreshState);
   // };
   const [inputValues, setInputValues] = useState({
      dateQuery1: dt.format(dt.addYears(nowTime, -1), 'YYYY-MM-DD'),
      dateQuery2: dt.format(nowTime, 'YYYY-MM-DD'),
      chartType: "總資產"
   })

   const [chartData, setChartData] = useState([]);

   useEffect(() => {
      console.log("ManageCheck useEffect (post)");
      let dataToServer = {
         acc_email: acc_email,
         dateQuery1: inputValues.dateQuery1,
         dateQuery2: inputValues.dateQuery2,
      }
      axios.post(urlPostRecent, dataToServer).then((res) => {
         setChartData(res.data);
      })
      // dateQuery預設為去年至今, 故第一次進戶畫面會先抓近一年資料來呈現
      // onSubmit呼叫setRefreshState再次觸發抓取資料
   }, [inputValues])

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
                     setInputValues(values);
                  }}
               >
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
                     <Button type="submit" variant="warning" className="mb-1">
                        <Search className="mb-1 mr-1" />
                        <span>查詢</span>
                     </Button>
                     <br />
                  </Form>
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
                        <MyChartLine></MyChartLine>
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