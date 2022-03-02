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

import { MyFormikObserver, MyInput, MyInputPlain } from '../components/MyFormComponent';
import ManageCurrent, { MyCardDeck } from '../components/ManageCurrent.jsx';
import { MyChartLine, MyChartPie } from '../components/MyChartComponent.jsx'
import ManageRecent from '../components/ManageRecent.jsx';

const acc_email = localStorage.getItem('loginState');
const dateQuery = dt.format(new Date(), 'YYYY-MM-DD');
const urlPostAsset = 'http://localhost:5000/asset/someday';
const urlPostInventory = 'http://localhost:5000/transaction/inventory';
const urlPostMarketInfo = 'http://localhost:5000/securities/marketInfo';
const urlGetDatalist = 'http://localhost:5000/securities/datalist/';

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

// 主表使用 庫存現況 加掛市價欄
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
   // const [inputDate, setInputDate] = useState();
   const [marketInfo, setMarketInfo] = useState();
   const [datalist, setDatalist] = useState([]);

   const [currentAsset, setCurrentAsset] = useState([]);
   const [currentInventory, setCurrentInventory] = useState([]);

   useEffect(() => {
      let beingMounted = true;
      console.log('ManageDashboard useEffect req (post)');
      let dataToServer = {
         acc_email: acc_email,
         dateQuery: dateQuery,
      }
      axios.post(urlPostAsset, dataToServer).then((res) => {
         if (beingMounted) {
            setCurrentAsset(res.data);
            console.log(res.data);
         }
      });
      axios.post(urlPostInventory, dataToServer).then((res) => {
         if (beingMounted) {
            setCurrentInventory(res.data);
            console.log(res.data);
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



   // useEffect(() => {
   //    keys.unshift('總資產');
   //    dataToShow.push({
   //       title: '總資產'
   //    })
   //    for (let i = 0; i < keys.length; i++) {
   //       dataToShow.push
   //    }
   //    setData()
   // }, [currentAsset])

   return (
      <Container fluid className="pt-3">
         <MyCardDeck data={currentAsset} />
         <br />
         <Row>
            <Col lg={8}>
               {/* <MyChartLine></MyChartLine> */}
            </Col>
            <Col lg={4}>
               {/* <MyChartPie></MyChartPie>
               <ManageCurrent col={col2} className={{ table: 'table table-sm' }}
                  url={urlPostInventory} dataToServer={{ acc_email: acc_email, dateQuery: dateQuery }}
               ></ManageCurrent> */}
            </Col>
         </Row>

         <Row>
            <MyInputPlain
               list={datalist}
               onChange={(e) => getDatalist(e.target.value, setDatalist)}
            />
         </Row>
      </Container >
   );
}

export default ManageDashboard;