// ----- 晴暄、鎧洋、人豪 ----- //

import React, { useRef, useState, createRef, useEffect } from 'react';
import { Row, Modal, Col, Container, InputGroup, Button, FormControl } from 'react-bootstrap';
import "../css/GameDaily_style.css"
import { PlusCircle, DashCircle, Gift } from "react-bootstrap-icons"
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
import { MyCandleLookupWithRef } from '../components/MyLookupComponent.jsx'
import axios from 'axios';

const urlPostStockDay = 'http://localhost:5000/securities/stockDay';
const urlPostMarketInfo = 'http://localhost:5000/marketInfo/stocks';

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);


function GameDailyRun(props) {
   const [currentDate, setCurrentDate] = useState(props.startDate);   //下一關天數加一
   const [endDate,] = useState(props.endDate);   //下一關天數加一
   const [tradingDates, setTradingDates] = useState(props.startDate);

   const inputStock = createRef(); //證券代號input取數值
   const inputAmount = useRef();  //證券數量input取數值
   const [invalid, setInvalid] = useState(false);
   const [stockList, setStockList] = useState([]);      //持有資產明細清單

   const [modalSubtotal, setModalSubtotal] = useState(false); //下一關
   const [asset, setAsset] = useState(10000000);   //現在持有總資產
   const [assetLastChange, setAssetLastChange] = useState(0);
   const [cash, setCash] = useState(10000000);   //現在持有現金

   const [modalReward, setModalReward] = useState(false); //領取獎勵
   const [profit, setProfit] = useState();  // 總資產報酬
   const [score, setScore] = useState(); //領取總分數 => (總獲得趴數*20)
   const [pct, setPct] = useState(); // 獲得總趴數 => (現在持有資產-初始資產100w)

   useEffect(() => {
      let dataToServer = {
         stockId: '2330',
         period1: currentDate.replace(/-/g, ""),
         period2: endDate.replace(/-/g, ""),
      };
      axios.post(urlPostStockDay, dataToServer).then((res) => {
         // console.log(res.data);
         setTradingDates(res.data.dates)
      })
   }, [])

   const handleTrade = (sign = 1) => {     //點選做多按鈕事件 (如做空則帶入參數-1)
      let inputStockId = (inputStock.current.value).split(' ')[0];   //抓取input輸入證券代號
      let InputStockName = inputStock.current.value.split(' ')[1];   //抓取input輸入證券名稱
      let amount = parseInt(inputAmount.current.value) * sign;  //抓取input輸入股票數量的值

      if (inputStockId && InputStockName && amount) {
         setInvalid(false);

         let originalIdx = stockList.findIndex((obj) => (obj.sec_id === inputStockId)); // 尋找原本的stockList是否已有庫存
         let newList = stockList.map((v) => v); // 複製原本的stockList
         let dataToServer = {
            stockId: inputStockId,
            period1: currentDate.replace(/-/g, ""),
         }
         axios.post(urlPostStockDay, dataToServer).then((res) => {
            let price = res.data.priceClose[0];
            setCash((org) => (org - amount * price));
            if (originalIdx === -1) {
               newList.push({
                  sec_id: inputStockId,
                  sec_name: InputStockName,
                  total: amount,
                  marketValue: amount * price,
               });
               setStockList(newList);
            } else {
               newList[originalIdx].total += amount;        //判斷抓取證券代號是否重複 重複將數量相加
               newList[originalIdx].marketValue += amount * price;
               setStockList(newList);
            }
         })
      } else {
         setInvalid(true);
      }
   }

   const nextLevels = () => {
      let nextTradingDate = tradingDates[tradingDates.indexOf(currentDate) + 1];
      let dataToServer = {
         dateQuery: nextTradingDate,
         stockList: stockList,
      };
      axios.post(urlPostMarketInfo, dataToServer).then((res) => {
         let newStockList = res.data.map((v) => {
            v.profitChange = v.total * v.marketPriceChange;
            return v;
         });
         setStockList(newStockList);

         let reduceObj = newStockList.reduce((a, b) => {
            return { profitChange: a.profitChange + b.profitChange };
         }, { profitChange: 0 });

         setAssetLastChange(reduceObj.profitChange);
         setAsset((org) => (org + reduceObj.profitChange));     //點選下一關按鈕取得新的持有資產數值 顯示在目前持有資產
      })
      setCurrentDate(nextTradingDate);
      setModalSubtotal(true);
   };

   const handleSumUp = (asset) => {
      let tempProfit = (asset - 10000000);
      let tempPct = (asset - 10000000) / 10000000 * 100;

      setProfit(Math.round(tempProfit * 10) / 10);
      setPct(Math.round(tempPct * 10) / 10);

      if (tempPct < 0.05) {
         setScore(0);
      } else {
         setScore(Math.round(tempPct * 20));
      }
      setModalReward(true)
   }

   return (
      <Container>
         <div className="header clearfix">
            <Row className="mt-2 clearfix">
               <Col lg={4}>
                  {/* 點選下一關按鈕日期天數加一 */}
                  <span className="headerSide">{`${currentDate}交易建立`}</span>
               </Col>
               <Col lg={4}>
               </Col>
               <Col lg={4}>
                  {/* 點選返回關卡回則關卡頁面 */}
                  <button className="headerBack float-right mr-4"
                     onClick={props.handleBack}>
                     <span className="header-Back-text">返回</span>
                  </button>
               </Col>
            </Row>
            <Row className='ml-2 mt-4'>
               <Col>
                  <MyCandleLookupWithRef
                     btnColor="info" className='mb-4'
                     currentDate={currentDate} rangeYear={3}
                     ref={inputStock} >
                  </MyCandleLookupWithRef>
                  <InputGroup className='mb-2' hasValidation>
                     <FormControl
                        placeholder="請輸入交易數量(股)"
                        aria-label="請輸入交易數量(股)"
                        aria-describedby="請輸入交易數量(股)"
                        ref={inputAmount}
                        required
                        isInvalid={invalid}
                     />
                     <InputGroup.Append>
                        <Button onClick={() => handleTrade(1)} size='sm' variant='danger'>
                           {/* 點選買進按鈕抓取input輸入的值 顯示在目前持有資產明細中 增加買進數量和證券代號名稱 */}
                           <PlusCircle className="button-plus-icon" key="1" />
                           <span className="button-plus-text">買多</span>
                        </Button>
                        <Button onClick={() => handleTrade(-1)} size='sm' variant='success'>
                           {/* 點選賣出按鈕抓取input輸入的值 顯示在目前持有資產明細中 減去賣出數量和顯示證券代號名稱 */}
                           <DashCircle className="button-plus-icon" key="2" />
                           <span className="button-plus-text">賣空</span>
                        </Button>
                     </InputGroup.Append>
                     <FormControl.Feedback type="invalid">
                        請選取完整代號 名稱 並輸入數量
                     </FormControl.Feedback>

                     {/* 抓取按下下一關獲得現擁有資產的值 顯示在持有資產上 */}
                  </InputGroup>
                  <img src="/assets/images/duck.svg" className="duckPict mt-2" alt="duckPict" />
               </Col>
               <Col>
                  <div style={{ overflowY: "scroll", overflowX: "hidden" }} className="testInputHave">
                     <Table bordered striped >
                        <thead >
                           <tr>
                              <td>股號名稱</td>
                              <td>部位股數</td>
                              <td>市值</td>
                           </tr>
                        </thead>
                        <tbody>
                           {/* 渲染資料在tbody內 */}
                           {stockList.map((v) => (
                              <tr key={`tr${v.sec_id}`}>
                                 <td>{`${v.sec_id} ${v.sec_name}`}</td>
                                 <td>{v.total}</td>
                                 <td>{parseInt(v.marketValue)}</td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </div>
                  <div className="clearfix">
                     <span className="asset mt-4 float-left" style={{ fontSize: '18px' ,paddingTop:'12px',fontFamily: 'PingFangTC-Semibold, PingFang TC'}}>
                        總資產{`${Math.round(asset / 1000) / 10}萬 (現金${Math.round(cash / 1000) / 10}萬)`}
                     </span>
                     {currentDate === endDate ? (
                        <button className="nextButton-plus float-right mt-4 mr-4" onClick={() => handleSumUp(asset)}>
                           {/* 點選領取獎勵按鈕 結算總獲得趴數及獲得積分  */}
                           <span>結算</span>
                           <Gift className="getButton-gift-icon" />
                        </button>
                     ) : (
                        <button className="nextButton-plus float-right mt-4 mr-4" onClick={nextLevels}>
                           {/* 點選下一關按鈕 發生結算當日趴數及總資產數值事件 */}
                           <span >下一關</span>
                        </button>
                     )}
                  </div>

               </Col>
            </Row>
         </div>

         <Modal
            size="md"
            show={modalSubtotal}
            onHide={() => setModalSubtotal(false)}
            aria-labelledby="example-modal-sizes-title-md"
            centered
            className="modalMove">
            <div className="jumpBody">
               <div style={{ overflowY: "scroll", overflowX: "hidden" }} className="testInput">
                  <Table bordered striped >
                     <thead >
                        <tr>
                           <td>股名</td>
                           <td>部位</td>
                           <td>市值</td>
                           <td>變動</td>
                        </tr>
                     </thead>
                     <tbody>
                        {/* 渲染資料在tbody內 */}
                        {stockList.map((v) => (
                           <tr key={`subtotal${v.sec_id}`}>
                              <td>{`${v.sec_id} ${v.sec_name}`}</td>
                              <td>{v.total}</td>
                              <td>{parseInt(v.marketValue)}</td>
                              <td>{v.profitChange}</td>
                           </tr>
                        ))}
                     </tbody>
                  </Table>
               </div>
               <div className="nextTotal">今日結算</div>
               <div className="nextTotal">獲利：{`${assetLastChange} (${Math.round(assetLastChange / (asset - assetLastChange) * 1000) / 10}%)`}</div>
               {/* //點擊下一關按鈕獲取值 */}
               <button className="jumpClose" onClick={() => setModalSubtotal(false)}>繼續</button>
               {/* 點擊繼續按鈕關閉跳窗modal */}
            </div>
         </Modal>

         <Modal
            size="md"
            show={modalReward}
            onHide={() => setModalReward(false)}
            aria-labelledby="example-modal-sizes-title-md"
            centered
            className="modalMove"
         >
            <div className="jumpBody">
               <div className="jumpTitle"><span className="jumpTotle">投資成果</span></div>
               <div className="jumpGet">原資產：1000萬</div>
               <div className="jumpGet">{`總資產：${Math.round(asset / 1000) / 10}萬`}</div>
               {/* 點擊領取獎勵按鈕獲得運算後趴數的值 */}
               <div className="jumpGet">
                  資產獲利：{`${profit}元 (${pct}%)`}</div>
               <div className="jumpGet">總得積分：{score}</div>
               {/* 點擊領取獎勵按鈕獲得運算後獲的趴數*20的值 */}
               <button className="jumpCloseGet" onClick={() => { setModalReward(false) }}><a href="http://localhost:3000/game/daily">領取</a></button>
               {/* 點選領去獎勵哪領取的值 關閉跳窗modal 並且關卡1結束獲得積分回到關卡選擇 */}

            </div>
         </Modal>

      </Container>
   );
}


export default GameDailyRun;