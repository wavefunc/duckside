// ----- 晴暄、鎧洋 ----- //

import axios, { Axios } from 'axios';
import React, { Component, useRef, useState } from 'react';
import { Row, Modal, ModalBody, Col, Container } from 'react-bootstrap';
import "../css/GameDaily_style.css"
import { PlusCircle, Search, DashCircle, Gift } from "react-bootstrap-icons"
import { Bar, Chart } from 'react-chartjs-2';
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend,
} from 'chart.js';



ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);


axios.get('http://localhost:5000/point_record/all')
    .then( (response) => console.log(response.data))
    .catch( (error) => console.log(error))




function GameDailyRun() {

   const [FindShow, setFindShow] = useState(false); //查詢
   const [GiftShow, setGiftShow] = useState(false); //領取獎勵
   const [NextShow, setNextShow] = useState(false); //下一關
   const [chartData, setChartData] = useState([]);
   const [stockList, setStockList] = useState([]);
   const [dataChange, setDataChange] = useState("2019/01/02");

   const inputAmount = useRef();
   const inputStockId = useRef();

   //抓取股市資料
   const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
   const getPrice = () => {
      const fakedata = {
         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
         datasets: [
            {
               type: 'bar',
               label: 'Dataset 1',
               data: [100, 200, 30, 400, 500, 60, 700],
               backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
               type: 'line',
               label: 'Dataset 2',
               data: [20, 300, 40, 500, 60, 700, 80],
               backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
               type: 'bar',
               label: 'Dataset 2',
               data: [200, 30, 400, 50, 600, 700, 80],
               backgroundColor: 'rgb(53, 162, 235)',
            }
         ],
      };
      setChartData(fakedata);
      setFindShow(true);
      // axios.get().then((res) => {
      // setFindShow(res.data);

      // });
   }


   const options = {
      options: {
         scales: {
            x: {
               type: 'timeseries',
               display: 'auto',
               ticks: {
                  source: "labels",
                  callback: (v, i, arr) => {
                     if (i == 0) {
                        return v;
                     } else {
                        let currentYmdArr = v.split('/');
                        return `${currentYmdArr[1]}/${currentYmdArr[2]}`
                        //     let currentDate = new Date(arr[i].value);
                        //     let previousDate = new Date(arr[i-1].value);
                        //     return currentDate.getFullYear() !== previousDate.getFullYear() ? v:
                        //     Math.floor(currentDate.getDate()/10) !== Math.floor(previousDate.getDate()/10) ? `${currentYmdArr[1]}/${currentYmdArr[2]}`:"";
                     }
                  }
               },
               time: {
                  unit: 'day',
                  align: 'start',
                  displayFormats: {
                     day: "yyyy/M/d",
                  }
               }

            },
            y: {
               title: {
                  display: true,
                  text: '元',
               },
               // stacked: true,
               stack: 1,
               stackWeight: 3,
               position: 'right',
               beginAtZero: false,
               offset: true,
            },
            y2: {
               title: {
                  display: true,
                  text: '張數',
               },
               stacked: true,
               stack: 1,
               stackWeight: 1,
               position: 'right',
               min: true,
               ticks: {
                  callback: val => Math.floor(val / 1000),
               },
            }
         },
         interaction: {
            intersect: false,
            mode: 'index',
         },
         plugins: {
            legend: {
               display: false
            },
            tooltip: {
               callbacks: {
                  title: (i) => {
                     let tempIdx = i[0].label.lastIndexOf(',')
                     return i[0].label.slice(0, tempIdx);
                  },
                  label: (i) => {
                     return [i.dataset.label, i.raw];
                  }
               }
            }
         }
      }
   };



   const buyTwstock = () => {
      // console.log(inputStockId.current.value);   確認有沒有抓到值
      // console.log(inputAmount.current.value); 確認有沒有抓到值
      let buyStockId = inputStockId.current.value;
      let buyAmount = parseInt(inputAmount.current.value);
      // let newListChecked = stockList.filter((v) => buyStockId === inputStockId.current.value)
      let original = stockList.findIndex((obj) => (obj.inputStockId === buyStockId));
      let newList = stockList.map((v) => v);

      if (original === -1) {
         newList.push({ inputStockId: buyStockId, inputAmount: buyAmount });
      } else {
         newList[original].inputAmount += buyAmount;
      }
      setStockList(newList);
   }

   const sellTwstock = () => {
      let buyStockId = inputStockId.current.value;
      let buyAmount = - parseInt(inputAmount.current.value);

      let original = stockList.findIndex((obj) => (obj.inputStockId === buyStockId));
      let newList = stockList.map((v) => v);

      if (original === -1) {
         newList.push({ inputStockId: buyStockId, inputAmount: buyAmount });
      } else {
         newList[original].inputAmount += buyAmount;
      }
      setStockList(newList);
   }

   const nextLevels = () => {
      const levelsDate = "2019/01/03"
      setDataChange(levelsDate);
      setNextShow(false);
   }



   return (
      <>
         <div className="header">
            <Container>
               <Row>
                  <Col>
                     <span className="headerSide">{`${dataChange}交易建立`}</span>
                  </Col>
                  <Col>
                     <a href="http://localhost:3000/game/daily">
                        <button className="headerBack" ><span className="header-Back-text">返回關卡</span> </button>
                     </a>
                  </Col>
               </Row>
            </Container>
            <div>
               <ul>
                  <li className="testinputnew">
                     <span className="buyTitle">證券代號 / 名稱 :
                        <input type="text" className="testEnter" id="namBuy" ref={inputStockId} />

                        <button className="button-plus" onClick={getPrice}>

                           <Search className="button-plus-icon" />
                           <span className="button-plus-text">查詢</span>

                        </button>
                     </span>
                  </li>
                  <li className="testinputnew">
                     <span className="buyTitle">買進股數 :
                        <input type="text" className="testEnterOne" id="numBuy" ref={inputAmount} />
                        <button className="button-plus" onClick={buyTwstock}>
                           <PlusCircle className="button-plus-icon" />
                           <span className="button-plus-text">買進</span>
                        </button>
                        <button className="button-plus" onClick={sellTwstock}>
                           <DashCircle className="button-plus-icon" />
                           <span className="button-plus-text">賣出</span>
                        </button>

                        <span className="haveMoney">目前持有資產：</span>
                     </span>
                  </li>
               </ul>

               <Container>
                  <Row>
                     <Col>
                        <img src="/assets/images/duck.svg" className="duckPict" />
                     </Col>
                     <Col>
                        <div style={{ overflowY: "scroll" ,overflowX:"hidden" }} className="testInput">
                           <ul >
                              {stockList.map((v) => (<li>證券代號 / 名稱 :{v.inputStockId} 買進部位 :{v.inputAmount}</li>))}
                           </ul>
                        </div>
                        <div className="buttbar">
                           <button className="nextButton-plus" onClick={() => { setNextShow(true) }}>
                              <span >下一關</span>
                           </button>

                           <button className="getButton-plus" onClick={() => { setGiftShow(true) }}>
                              <span >領取獎勵</span>
                              <Gift className="getButton-gift-icon" />
                           </button>
                        </div>
                     </Col>
                  </Row>
               </Container>

               <span>

               </span>
            </div>



         </div>

         <Modal
            centered
            size="lg"
            show={FindShow}
            onHide={() => setFindShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
         >
            <Chart type='bar' options={options} data={chartData} />

         </Modal>

         <Modal
            size="md"
            show={NextShow}
            onHide={() => setNextShow(false)}
            aria-labelledby="example-modal-sizes-title-md"
            centered
            className="modalMove">

            <div className="jumpBody">
               <div className="jumpNextTitle"><span className="jumpTotle">今日結算</span></div>
               <div className="jumpNextGet">今日獲利％數： <span className="jumpScore">123</span></div>
               <div className="jumpNextGet">目前持有資產： <span className="jumpScore">123</span></div>
               <button className="jumpClose" onClick={nextLevels}>繼續</button>
            </div>
         </Modal>

         <Modal
            size="md"
            show={GiftShow}
            onHide={() => setGiftShow(false)}
            aria-labelledby="example-modal-sizes-title-md"
            centered
            className="modalMove"
         >
            <div className="jumpBody">
               <div className="jumpTitle"><span className="jumpTotle"> 結算版</span></div>
               <div className="jumpGet">總獲得％數： <span className="jumpScore">123</span></div>
               <div className="jumpGet">總獲得積分： <span className="jumpScore">123</span></div>
               <button className="jumpClose" onClick={() => { setGiftShow(false) }}>關閉</button>
            </div>
         </Modal>
      </>
   );
}


export default GameDailyRun;