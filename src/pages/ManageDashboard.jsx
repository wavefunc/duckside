/* * * * * 人豪 * * * * * 
 * 
 * 備忘:
 * const acc_email = ... 要換成localStorage
 * 
 * * * * * * * * * * * */

import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { Search } from 'react-bootstrap-icons';
import axios from 'axios';
import dt from 'date-and-time';

import MyCurrentPosition, { MyCardDeck } from '../components/ManageCurrent.jsx';
import ManageRecent from '../components/ManageRecent.jsx';
import { MyChartPie } from '../components/MyChartComponent.jsx'
import { MyCandleLookup } from '../components/MyLookupComponent.jsx'

const acc_email = localStorage.getItem('loginState');
const dateQuery = dt.format(new Date(), 'YYYY-MM-DD');
const urlPostAsset = 'http://localhost:5000/asset/someday';
const urlPostInventory = 'http://localhost:5000/transaction/inventory';
const urlPostPlan = 'http://localhost:5000/plan/recent';
const urlPostMarketInfo = 'http://localhost:5000/securities/marketInfo';

// 主表使用
// 庫存現況 要加掛市價欄
const colInventory = [
   { id: 'sec_id', name: '代號' },
   { id: 'sec_name', name: '名稱' },
   { id: 'total', name: '庫存數量' },
];
// 最近計畫
const colPlan = [
   { id: 'plan_id', name: 'asd_id', hidden: true },
   {
      id: 'plan_date', name: '日期', width: '15%',
      formatter: (cell) => { let d = new Date(cell); return dt.format(d, 'YYYY-MM-DD'); },
   },
   { id: 'sec_id', name: '代號', width: '10%' },
   { id: 'sec_name', name: '名稱', width: '15%' },
   { id: 'plan_strategy', name: '類型', hidden: true },
   { id: 'plan_param1', name: '參數', hidden: true },
   { id: 'plan_param2', name: '參數', hidden: true },
   { id: 'plan_anchor', name: '參考價', width: '10%' },
   { id: 'plan_stoploss', name: '停損', width: '10%' },
   { id: 'plan_target', name: '目標', width: '10%' },
   // { id: '', name: '現價', width: '10%' },
   { id: 'plan_note', name: '筆記', width: '20%' },
];

function ManageDashboard(props) {
   const [dataCard, setDataCard] = useState([]);
   const [dataPie, setDataPie] = useState([]);
   const [marketInfo, setMarketInfo] = useState();

   useEffect(() => {
      let beingMounted = true;
      let dataToServer = {
         acc_email: acc_email,
         dateQuery: dateQuery,
      }
      axios.post(urlPostAsset, dataToServer).then((res) => {
         if (beingMounted) {
            let dataObj = res.data;
            let myAstSum = res.data.ast_sum;
            let myAstArr = [
               { title: "總資產", value: dataObj.ast_sum },
               { title: "現金", value: dataObj.ast_cash },
               { title: "證券", value: dataObj.ast_securities },
               { title: "資券", value: dataObj.ast_borrowing },
               { title: "期權", value: dataObj.ast_option },
               { title: "其他", value: dataObj.ast_others },
               { title: "調整", value: dataObj.ast_adjust },
            ];
            let myAstCards = myAstArr.map((v) => (
               {
                  weight: v.value / myAstSum,
                  ...v
               }
            ));
            console.log(myAstCards);
            setDataCard(myAstCards);
         }
      });
      axios.post(urlPostInventory, dataToServer).then((res) => {
         if (beingMounted) {
            console.log(res.data);
            setDataPie(res.data);
         }
      });
      axios.post(urlPostMarketInfo, dataToServer).then((res) => {
         if (beingMounted) {
            setMarketInfo(res.data);
            console.log(res.data);
         }
      });
      return () => { beingMounted = false };
   }, []);

   return (
      <Container fluid className="pt-3">
         <MyCardDeck data={dataCard} />
         <br />
         <Row>
            <Col lg={8}>
               <MyCurrentPosition col={colInventory} className={{ table: 'table table-sm' }}
                  url={urlPostInventory}
                  dataToServer={{ acc_email: acc_email, dateQuery: dateQuery }}
               ></MyCurrentPosition>
               <ManageRecent row={10} col={colPlan}
                  url={urlPostPlan} dataToServer={{ acc_email: acc_email, amount: 10 }}
               ></ManageRecent>
            </Col>
            <Col lg={4}>
               <MyCandleLookup></MyCandleLookup>
               {/* <MyChartPie></MyChartPie>
               <ManageCurrent col={col2} className={{ table: 'table table-sm' }}
                  url={urlPostInventory} dataToServer={{ acc_email: acc_email, dateQuery: dateQuery }}
               ></ManageCurrent> */}
            </Col>
         </Row>
         <Row>

         </Row>

      </Container >
   );
}

export default ManageDashboard;