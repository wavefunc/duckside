// ----- 晴暄、鎧洋 ----- //

import axios, { Axios } from 'axios';
import React, { Component, useRef, useState } from 'react';
import { Row, Modal, ModalBody, Col, Container } from 'react-bootstrap';
import "../css/GameDaily_style.css"
import { PlusCircle, Search, DashCircle, Gift } from "react-bootstrap-icons"
import { Bar, Chart } from 'react-chartjs-2';
import { Link } from "react-router-dom"
import Table from 'react-bootstrap/Table'
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


function GameDailyRun() {

   const [findDisplay, setFindDisplay] = useState(false); //查詢
   const [giftDisplay, setGiftDisplay] = useState(false); //領取獎勵
   const [modalDisplay, setModalDisplay] = useState(false); //下一關
   const [chartData, setChartData] = useState([]);
   const [stockList, setStockList] = useState([]);
   const [currentDate, setCurrentData] = useState(2);
   const [haveMoney, setHaveMoney] = useState("100");
   const moneyYesterday = useRef("100");
   const [getPercentage, setGetPercentage] = useState("");
   const [getTotalPoint, setGetTotalPoint] = useState(0);
   const [getTotalPercentage, setGetTotalPercentage] = useState(30);

   const inputAmount = useRef();
   const inputStockId = useRef();


   //抓取股市資料
   let labels = ['2018/12/22', '2018/12/24', '2018/12/25', '2018/12/26', '2018/12/27', '2018/12/28', '2019/01/02'];
   const getPrice = () => {
      const fakedata = {
         labels: ['2018/12/22', '2018/12/24', '2018/12/25', '2018/12/26', '2018/12/27', '2018/12/28', '2019/01/02'],
         datasets: [
            {
               type: 'bar',
               label: '買價',
               data: labels.map(() => Math.floor((3 - Math.random()) * 100)),
               backgroundColor: 'rgba(255, 30, 32)',
            },
            {
               type: 'line',
               label: '走勢',
               data: labels.map(() => Math.floor((0.5 - Math.random()) * 300)),
               backgroundColor: 'rgba(53, 30, 235)',
            },
            {
               type: 'bar',
               label: '賣價',
               data: labels.map(() => Math.floor((2 - Math.random()) * 150)),
               backgroundColor: 'rgb(53, 136, 20)',
            }
         ],
      };
      setChartData(fakedata);
      setFindDisplay(true);
      // axios.get().then((res) => {
      // setFindDisplay(res.data);

      // });
   }


   // const searchStock = () =>{
   //    do {
   //       data + 1;
   //    }
   //    while([] === 0);
   // }


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

   const continueLevels = () => {
      setModalDisplay(false);
   }

   let testValue = 100 - Math.floor((-Math.random()) * 100);
   const nextLevels = () => {
      let newValue = testValue;
      moneyYesterday.current = haveMoney;
      let pct = (testValue / moneyYesterday.current - 1) * 100;
      setCurrentData((currentDate) => currentDate + 1);
      setGetPercentage(Math.round(pct).toString());
      setHaveMoney(newValue);
      setModalDisplay(true);

   }

   const getTotalScore = () => {
      setGetTotalPercentage((haveMoney - 100))
      setGetTotalPoint((haveMoney - 100) * 20)
      setGiftDisplay(true)
   }

   // const backToSelect =() => {
   //    window.location = "/game/daily";
   // }

   return (
      <>
         <div className="header">
            <Container>
               <Row>
                  <Col>
                     <span className="headerSide">{`2019/1/${currentDate}交易建立`}</span>
                  </Col>
                  <Col>
                     <Link to="/game/daily">
                        <button className="headerBack" ><span className="header-Back-text">返回關卡</span> </button>
                     </Link>
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

                        <span className="haveMoney">目前持有現金資產：{`${haveMoney}W`}</span>
                     </span>
                  </li>
               </ul>

               <Container>
                  <Row>
                     <Col>
                        <img src="/assets/images/duck.svg" className="duckPict" />
                     </Col>
                     <Col>
                        <div style={{ overflowY: "scroll", overflowX: "hidden" }} className="testInput">
                           <Table
                              bordered
                              striped

                           >
                              <thead className="thdPost">
                                 <tr>
                                    <th>證券代號/名稱</th>
                                    <th>買進部位</th>

                                 </tr>
                              </thead>
                              <tbody>
                                 {stockList.map((v) => (<tr><td>{v.inputStockId}</td><td>{v.inputAmount}</td></tr>))}
                              </tbody>
                           </Table>
                        </div>
                        <div className="buttbar">
                           <button className="nextButton-plus" onClick={nextLevels}>
                              <span >下一關</span>
                           </button>

                           <button className="getButton-plus" onClick={getTotalScore}>
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
            show={findDisplay}
            onHide={() => setFindDisplay(false)}
            aria-labelledby="example-modal-sizes-title-lg"
         >
            <Chart type='bar' options={options} data={chartData} />

         </Modal>

         <Modal
            size="md"
            show={modalDisplay}
            onHide={() => setModalDisplay(false)}
            aria-labelledby="example-modal-sizes-title-md"
            centered
            className="modalMove">

            <div className="jumpBody">
               <div className="jumpNextTitle"><span className="jumpTotle">今日結算</span></div>
               <div className="jumpNextGet">今日獲利％數：{`${getPercentage}%`}</div>
               <div className="jumpNextGet">目前持有資產：{`${haveMoney}W`} </div>
               <button className="jumpClose" onClick={continueLevels}>繼續</button>
            </div>
         </Modal>

         <Modal
            size="md"
            show={giftDisplay}
            onHide={() => setGiftDisplay(false)}
            aria-labelledby="example-modal-sizes-title-md"
            centered
            className="modalMove"
         >
            <div className="jumpBody">
               <div className="jumpTitle"><span className="jumpTotle"> 結算版</span></div>
               <div className="jumpGet">總獲得％數：{`${getTotalPercentage}%`}</div>
               <div className="jumpGet">總獲得積分：{`${getTotalPoint}`}</div>
               <button className="jumpClose" onClick={() => { setGiftDisplay(false) }}><Link to="/game/daily">領取</Link></button>
            </div>
         </Modal>
      </>
   );
}


export default GameDailyRun;