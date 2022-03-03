/* * * * * 人豪 * * * * * 
 * 
 * 備忘:
 * const acc_email = ... 要換成localStorage
 * 
 * * * * * * * * * * * */

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
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
// 庫存現況
const colInventory = [
   { id: 'sec_id', name: '代號', width: '10%' },
   { id: 'sec_name', name: '名稱', width: '20%' },
   {
      id: 'marketPrice', name: '現價', width: '10%',
      formatter: (cell, row) => {
         return row.cells[0].data
      }
   },
   {
      id: 'marketPriceChange', name: '漲跌', width: '10%',
      formatter: (cell, row) => {
         return row.cells[0].data
      }
   },
   { id: 'total', name: '庫存數量', width: '10%' },
   {
      id: 'marketValue', name: '市值', width: '10%',
      formatter: (cell, row) => {
         return row.cells[0].data
      }
   },
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
            // console.log(res.data.priceClose(2330));
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
               <Tab.Container id="left-tabs-example" defaultActiveKey="first" mountOnEnter={true}>
                  <Nav variant="pills">
                     <Nav.Item>
                        <Nav.Link eventKey="first" bsPrefix='btn btn-light ml-1'>庫存現況</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link eventKey="second" bsPrefix='btn btn-light ml-1'>最近計畫</Nav.Link>
                     </Nav.Item>
                     <Nav.Item className="flex-grow-1">
                        <Nav.Link eventKey="disabled" disabled bsPrefix='btn btn-basic ml-1'></Nav.Link>
                     </Nav.Item>
                     <Nav.Item className='pr-1'>
                        <MyCandleLookup></MyCandleLookup>
                     </Nav.Item>
                  </Nav>
                  <Tab.Content>
                     <Tab.Pane eventKey="first">
                        <MyCurrentPosition col={colInventory} className={{ table: 'table table-sm' }}
                           url={urlPostInventory}
                           dataToServer={{ acc_email: acc_email, dateQuery: dateQuery }}
                        ></MyCurrentPosition>
                     </Tab.Pane>
                     <Tab.Pane eventKey="second">
                        <ManageRecent row={10} col={colPlan}
                           url={urlPostPlan} dataToServer={{ acc_email: acc_email, amount: 10 }}
                        ></ManageRecent>
                     </Tab.Pane>
                  </Tab.Content>
               </Tab.Container>

            </Col>
            <Col lg={4}>
               <MyChartPie></MyChartPie>
            </Col>
         </Row>
         <Row>

         </Row>

      </Container >
   );
}

export default ManageDashboard;