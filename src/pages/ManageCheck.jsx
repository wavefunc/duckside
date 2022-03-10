/* * * * * 人豪 * * * * * 
 * 1.副圖: 損益來源(圓餅圖)
 * 2.主圖: 資產變動圖
 * 3.圖表選項改以下拉式tab選單呈現
 * const acc_email = ... 要換成localStorage
 * 
 * 待辦:
 * 1. 之後可以改成先抓資產明細回來，就不用每次查詢就發一次axios
 * * * * * * * * * * * */

import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';

import { Formik, Form } from 'formik';
import axios from 'axios';
import dt from 'date-and-time';

import { MyInput, MySelect } from '../components/MyFormComponent';
import { MyChartLine } from '../components/MyChartComponent.jsx';
import Breadcrumb from '../components/Breadcrumb';

const acc_email = localStorage.getItem('loginState');
const urlPostRecent = 'http://localhost:5000/asset/daterange';

const nowTime = new Date();
// const urlPostChartData = '';

// 主圖設定
const initialValues = {
   dateQuery1: dt.format(dt.addYears(nowTime, -1), 'YYYY-MM-DD'),
   dateQuery2: dt.format(nowTime, 'YYYY-MM-DD'),
   chartType: "總資產",
};
const options = {
   "總資產": { x: "ast_date", y: "ast_sum", yLabels: "總資產" },
   "證券": { x: "ast_date", y: "ast_securities", yLabels: "證券" },
   "現金": { x: "ast_date", y: "ast_cash", yLabels: "現金" },
   "資產分佈": {
      x: "ast_date",
      y: ["ast_cash", 'ast_securities', 'ast_option', 'ast_borrowing', 'ast_others', 'ast_adjust'],
      yLabels: ["現金", "證券", "期權", "資券", "其他", "調整項"]
   }
}

// 副表使用

function ManageCheck(props) {
   console.log('--ManageCheck--');

   const [chartData, setChartData] = useState([]);
   const [option, setOption] = useState({ x: "ast_date", y: "ast_sum", yLabels: "總資產" });
   const container = useRef();

   useEffect(() => {
      let dataToServer = { ...initialValues };
      let chartType = initialValues.chartType;
      dataToServer.acc_email = acc_email;
      console.log(`ManageCheck useEffect post ${JSON.stringify(dataToServer)}`);
      axios.post(urlPostRecent, dataToServer).then((res) => {
         setChartData(res.data);
         setOption(options[chartType]);
         console.log(res.data);
         console.log(options[chartType]);
      });
   }, [])
   const handleSubmit = (values, actions) => {
      let dataToServer = { ...values };
      dataToServer.acc_email = acc_email;
      console.log(`ManageCheck handleSubmit post ${JSON.stringify(dataToServer)}`);
      axios.post(urlPostRecent, dataToServer).then((res) => {
         console.log(res.data);
         setChartData(res.data);
         setOption(options[values.chartType]);
      })
   };

   return (
      <Container fluid className="pt-3" ref={container}>
         <Row>
            <Breadcrumb />
         </Row>
         <Row>
            <Col lg={12}>
               <Formik
                  initialValues={initialValues}
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
                  onSubmit={handleSubmit}
               >
                  <Form>
                     <MyInput
                        label="起日"
                        name="dateQuery1" id="dateQuery1"
                        type="date" inline="true"
                     />
                     <MyInput
                        label="迄日"
                        name="dateQuery2" id="dateQuery2"
                        type="date" inline="true"
                     />
                     <MySelect
                        label="圖表"
                        name="chartType" id="chartType"
                        type="text" inline="true"
                     >
                        {Object.keys(options)}
                     </MySelect>
                     <Button type="submit" variant="warning" className="mb-1">
                        <Search className="mb-1 mr-1" />
                        <span>查詢</span>
                     </Button>
                     <span className='text-muted font-weight-light ml-4' style={{ fontSize: '15px' }}>
                        *點選標籤顯示或隱藏資料
                     </span>
                  </Form>
               </Formik>
            </Col>
         </Row>
         <div style={{ position: 'relative', height: '60vh', width: '100%' }}>
            <MyChartLine data={chartData}
               {...option}
            ></MyChartLine>
         </div>
      </Container >
   );
}

export default ManageCheck;