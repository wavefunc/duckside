// ----- 晴暄、鎧洋 ----- //

import React, { useRef, useState } from 'react';
import { Row, Modal, Col, Container } from 'react-bootstrap';
import "../css/GameDaily_style.css"
import { PlusCircle, Search, DashCircle, Gift } from "react-bootstrap-icons"
import { Chart } from 'react-chartjs-2';
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
import { propTypes } from 'react-bootstrap/esm/Image';



ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);


function GameDailyRun(props) {

   const [findDisplay, setFindDisplay] = useState(false); //查詢
   const [giftDisplay, setGiftDisplay] = useState(false); //領取獎勵
   const [modalDisplay, setModalDisplay] = useState(false); //下一關
   const [chartData, setChartData] = useState([]);      //股數長條折線圖
   const [stockList, setStockList] = useState([]);      //持有資產明細清單
   const [currentDate, setCurrentData] = useState(2);   //下一關天數加一
   const [haveMoney, setHaveMoney] = useState("100");   //現在持有總資產
   const moneyYesterday = useRef("100");
   const [getPercentage, setGetPercentage] = useState("");  //今日獲得趴數
   const [getTotalPoint, setGetTotalPoint] = useState();    //領取總分數 => (總獲得趴數*20)
   const [getTotalPercentage, setGetTotalPercentage] = useState(); //獲得總趴數 => (現在持有資產-初始資產100w)

   const inputAmount = useRef();  //證券代號input取數值
   const inputStockId = useRef(); //證券數量input取數值

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
      setFindDisplay(true);  //查詢跳窗modal
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
                     if (i === 0) {
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



   const buyTwstock = () => {     //點選買進按鈕事件
      // console.log(inputStockId.current.value);   確認有沒有抓到值
      // console.log(inputAmount.current.value); 確認有沒有抓到值
      let buyStockId = inputStockId.current.value;   //抓取input輸入證券代號的值
      let buyAmount = parseInt(inputAmount.current.value);  //抓取input輸入股票數量的值
      // let newListChecked = stockList.filter((v) => buyStockId === inputStockId.current.value)
      let original = stockList.findIndex((obj) => (obj.inputStockId === buyStockId)); 
      let newList = stockList.map((v) => v);

      if (original === -1) {
         newList.push({ inputStockId: buyStockId, inputAmount: buyAmount });
      } else {
         newList[original].inputAmount += buyAmount;        //判斷抓取證券代號是否重複 重複將數量相加
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
      setStockList(newList);  //設定新的stockList值 到<tr> <td>
   }

   const continueLevels = () => {  //點擊下一關裡面的繼續按鈕關閉modal
      setModalDisplay(false);
   }

   let testValue = 100 - Math.floor((-Math.random()) * 100); //亂數假資料
   const nextLevels = () => {
      let newValue = testValue;
      moneyYesterday.current = haveMoney;
      let pct = (testValue / moneyYesterday.current - 1) * 100;
      setCurrentData((currentDate) => currentDate + 1);  //點選下一關按鈕日期天數加一
      setGetPercentage(Math.round(pct).toString());      //點選下一關按鈕獲得今日獲得趴數值
      setHaveMoney(newValue);     //點選下一關按鈕取得新的持有資產數值 顯示在目前持有資產
      setModalDisplay(true);      //關閉跳窗modal

   }

   const getTotalScore = () => {
      setGetTotalPercentage((haveMoney - 100))   //取現在持有資產的值 減去 最初持有資產100W = 總獲得趴數
      setGetTotalPoint((haveMoney - 100) * 20)   //總獲得趴數*20 換算= 獲得總積分
      setGiftDisplay(true)   //關閉跳窗modal
   }

   return (
      <>
         <div className="header">
            <Container>
               <Row>
                  <Col>
                                                      {/* 點選下一關按鈕日期天數加一 */}
                     <span className="headerSide">{`2019/1/${currentDate}交易建立`}</span>  
                  </Col>
                  <Col>
                                                         {/* 點選返回關卡回則關卡頁面 */}
                     <button className="headerBack" onClick={props.handleBack}><span className="header-Back-text">返回關卡</span> </button>
                  </Col>
               </Row>
            </Container>
            <div>
               <ul>
                  <li className="testinputnew">
                     <span className="buyTitle">證券代號 / 名稱 :
                        <input type="text" className="testEnter" id="namBuy" ref={inputStockId} />

                        <button className="button-plus" onClick={getPrice}>  
                        {/* 點選查詢按鈕可以查詢股票走勢圖 */}

                           <Search className="button-plus-icon" />
                           <span className="button-plus-text">查詢</span>

                        </button>
                     </span>
                  </li>
                  <li className="testinputnew">
                     <span className="buyTitle">買進股數 :
                        <input type="text" className="testEnterOne" id="numBuy" ref={inputAmount} />
                        <button className="button-plus" onClick={buyTwstock}>
                           {/* 點選買進按鈕抓取input輸入的值 顯示在目前持有資產明細中 增加買進數量和證券代號名稱 */}
                           <PlusCircle className="button-plus-icon" key="1" />
                           <span className="button-plus-text">買進</span>
                        </button>

                        <button className="button-plus" onClick={sellTwstock}>
                           {/* 點選賣出按鈕抓取input輸入的值 顯示在目前持有資產明細中 減去賣出數量和顯示證券代號名稱 */}
                           <DashCircle className="button-plus-icon" key="2" />
                           <span className="button-plus-text">賣出</span>
                        </button>

                        <span className="haveMoney">目前持有資產：{`${haveMoney}W`}</span> 
                        {/* 抓取按下下一關獲得現擁有資產的值 顯示在持有資產上 */}
                     </span>
                  </li>
               </ul>

               <Container>
                  <Row>
                     <Col>
                        <img src="/assets/images/duck.svg" className="duckPict" alt="duckPict" />
                     </Col>
                     <Col>
                        <div style={{ overflowY: "scroll", overflowX: "hidden" }} className="testInput">
                           <Table
                              bordered
                              striped
                           >
                              <thead >
                                 <tr>
                                    <td>證券代號/名稱</td>
                                    <td>買進股數</td>
                                 </tr>
                              </thead>
                              <tbody>
                                 {stockList.map((v) => (<tr><td>{v.inputStockId}</td><td>{v.inputAmount}</td></tr>))}
                                 {/* 渲染陣列進入<tr><td> 顯示在持有資產方格內 */}
                                     
                              </tbody>
                           </Table>
                        </div>
                        <div className="buttbar">
                           <button className="nextButton-plus" onClick={nextLevels}>
                              {/* 點選下一關按鈕 發生結算當日趴數及總資產數值事件 */}
                              <span >下一關</span>
                           </button>

                           <button className="getButton-plus" onClick={getTotalScore}>
                              {/* 點選領取獎勵按鈕 結算總獲得趴數及獲得積分  */}
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
            show={findDisplay} //顯示const findDisplay的值
            onHide={() => setFindDisplay(false)}
            aria-labelledby="example-modal-sizes-title-lg"
         >
            <Chart type='bar' options={options} data={chartData} key="3" />

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
               {/* //點擊下一關按鈕獲取值 */}

               <div className="jumpNextGet">目前持有資產：{`${haveMoney}W`} </div>
               {/* //點擊下一關按鈕獲取值 */}

               <button className="jumpClose" onClick={continueLevels}>繼續</button>
                  {/* 點擊繼續按鈕關閉跳窗modal */}

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
               {/* 點擊領取獎勵按鈕獲得運算後趴數的值 */}

               <div className="jumpGet">總獲得積分：{`${getTotalPoint}`}</div>
               {/* 點擊領取獎勵按鈕獲得運算後獲的趴數*20的值 */}

               <button className="jumpClose" onClick={() => { setGiftDisplay(false) }}><Link to="/game/daily">領取</Link></button>
               {/* 點選領去獎勵哪領取的值 關閉跳窗modal 並且關卡1結束獲得積分回到關卡選擇 */}

            </div>
         </Modal>
      </>
   );
}


export default GameDailyRun;