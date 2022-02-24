/* * * * * 人豪 * * * * * 
 * 


 * 備忘:
 * const acc_email = ... 要換成localStorage
 * 
 * * * * * * * * * * * */

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import axios from 'axios';
import dt from 'date-and-time';

import { MyFormikObserver, MyInput } from '../components/MyFormComponent';
import ManageCurrent, { MyCardDeck } from '../components/ManageCurrent.jsx';
import { MyChartLine, MyChartPie } from '../components/MyChartComponent.jsx'
import ManageRecent from '../components/ManageRecent.jsx';

const acc_email = 'ggg@mail.com';
const dateQuery = dt.format(new Date(), 'YYYY-MM-DD');
const urlPostRecent = 'http://localhost:5000/asset/recent';
const urlPostInventory = 'http://localhost:5000/transaction/inventory';
// const urlGetDatalist = 'http://localhost:5000/securities/datalist/';


// 主表使用
const col = [
   { id: 'ast_id', name: 'asd_id', hidden: 'true' },
   {
      id: 'ast_date', name: '日期',
      formatter: (cell) => { let d = new Date(cell); return dt.format(d, 'YYYY-MM-DD'); },
   },
   { id: 'ast_cash', name: '現金' },
   { id: 'ast_securities', name: '證券' },
   { id: 'ast_option', name: '期權' },
   { id: 'ast_others', name: '其他' },
   { id: 'ast_borrowing', name: '資券調整' },
   { id: 'ast_adjust', name: '其他調整' },
];


// 副圖庫存表使用
const col2 = [
   { id: 'sec_id', name: '代號' },
   { id: 'sec_name', name: '名稱' },
   { id: 'total', name: '庫存數量' },
];


function ManageDashboard(props) {
   console.log('--ManageDashboard--');
   const [refreshState, setRefresh] = useState(true);
   const refresh = () => {
      setRefresh(!refreshState);
   };
   const [inputDate, setInputDate] = useState();
   console.log(inputDate);
   const [secValue, setSecValue] = useState();


   /*
   const [data, setData] = useState([]);
   const [currentAsset, setCurrentAsset] = useState([]);
   console.log(`MyCurrentAsset: data*${data.length}`);

   useEffect(() => {
      let beingMounted = true;
      let currentAsset = {};
      console.log('MyCurrentAsset useEffect:');
      if (url) {
         console.log('MyCurrentAsset useEffect req (post)');
         axios.post(url, { amount: 1, ...dataToServer }).then((res) => {
            if (beingMounted) {
               currentAsset = res.data;
            }
         });
      } else {
         currentAsset = props.data;
      }
      setCurrentAsset(currentAsset);
      // if(num){
      // }
      return () => { beingMounted = false };
   }, [url, dataToServer.acc_email, props.refreshState, props.data]);

   useEffect(() => {

      keys.unshift('總資產');
      dataToShow.push({
         title: '總資產'
      })
      for (let i = 0; i < keys.length; i++) {
         dataToShow.push
      }

      setData()
   }, [currentAsset])
*/

   return (
      <Container fluid>
         <MyCardDeck>
         </MyCardDeck>
         <br />
         <Row>
            <Col lg={8}>
            <MyChartLine></MyChartLine>
            </Col>
            <Col lg={4}>
               <MyChartPie></MyChartPie>
               <ManageCurrent col={col2} className={{ table: 'table table-sm' }}
                  url={urlPostInventory} dataToServer={{ acc_email: acc_email, dateQuery: dateQuery }}
               ></ManageCurrent>
            </Col>
         </Row>

         <Row>
         </Row>
      </Container >
   );
}

export default ManageDashboard;