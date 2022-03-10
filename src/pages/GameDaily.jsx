// ----- 晴暄、鎧洋、人豪 ----- //
import React, { useState } from 'react';
import "../css/GameDailySelect_style.css"
import { Row, Modal } from 'react-bootstrap';
import GameDailyRun from "../components/GameDailyRun.jsx";

const stages = [
   { number: '1', start: '2019-01-02', end: '2019-01-10', },
   { number: '2', start: '2019-07-01', end: '2019-12-31', },
   { number: '3', start: '2020-01-02', end: '2020-04-30', },
   { number: '4', start: '2021-01-02', end: '2021-06-30', },
];
const timeSpan = (dateStr1, dateStr2) => {
   let dateArr1 = dateStr1.split("-");
   let dateArr2 = dateStr2.split("-");
   let date1 = new Date(dateArr1[0] + '-' + dateArr1[1] + '-' + dateArr1[2]);
   let date2 = new Date(dateArr2[0] + '-' + dateArr2[1] + '-' + dateArr2[2]);
   let result = parseInt(Math.abs(date2 - date1) / 1000 / 60 / 60 / 24) // 把相差的毫秒數轉換為天數
   return result;
};
function StageModal({handlegamestart , ...props}) {
   return (
      <Modal
         {...props}
         centered
         size="sm"
      >
         <div id="light">
            <g>
               <svg width="700" height="345" viewBox="0 0 1033 845">
                  <g id="關卡條件" transform="translate(-824 -157)">
                     <rect id="Rectangle_118" data-name="Rectangle 118" width="1033" height="845" rx="10"
                        transform="translate(484 157)" fill="#faf3e2" />
                     <text id="關卡條件-2" data-name="關卡條件" transform="translate(526 274)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">
                           {`關卡條件:關卡${props.stage}`}
                        </tspan>
                     </text>
                     <line id="Line_41" data-name="Line 41" x2="1032" transform="translate(485 314.5)" fill="none" stroke="#707070"
                        strokeWidth="5" />
                     <text id="時間:" transform="translate(525 517)" fill="#520707" fontSize="60"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">時間</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">
                           {`${props.start} 至 ${props.end}`}
                        </tspan>
                     </text>
                     <text id="交易天數:" transform="translate(525 712)" fill="#520707" fontSize="60"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">期間</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">
                           {`約${timeSpan(props.start, props.end)}天`}
                        </tspan>
                     </text>

                     <a onClick={handlegamestart} >
                        <g id="進入關卡_按鈕" data-name="進入關卡 按鈕" transform="translate(-33 41)">
                           <rect id="Rectangle_106" data-name="Rectangle 106" width="463" height="142" rx="30"
                              transform="translate(583 765)" fill="#3e88a8" />
                           <text id="進入關卡" transform="translate(615 878)" fill="#fff" fontSize="100"
                              fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600">
                              <tspan x="0" y="0">進入關卡</tspan>
                           </text>
                        </g>
                     </a>

                     <g>
                        <a id="closebt" onClick={props.onHide}>
                           <g id="關閉_按鈕" data-name="關閉 按鈕" transform="translate(20 41)">
                              <rect id="Rectangle_105" data-name="Rectangle 105" width="325" height="142" rx="30"
                                 transform="translate(1109 765)" fill="#ac4c4c" />
                              <text id="關閉" transform="translate(1172 873)" fill="#fff" fontSize="100"
                                 fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600">
                                 <tspan x="0" y="0">關閉</tspan>
                              </text>
                           </g>
                        </a>
                     </g>

                  </g>
               </svg>
            </g>
         </div>
      </Modal>
   );
}
function GameDaily() {
   // 關卡資訊視窗
   const [modalShow, setModalShow] = React.useState(false);
   // 選取關卡
   const [stage, setStage] = useState({ number: '1', start: '2020-01-02', end: '2020-03-31', });
   // 進入關卡(true就改render出跑關元件)
   const [gameRun, setGameRun] = useState(false);
   const handleShowModal = (i) => {
      setStage(stages[i]);
      setModalShow(true);
   }
   const handleGameStart = () => {
      setGameRun(true);
      setModalShow(false);
   }
   const handleBack = () =>{
      setGameRun(false);
   }
   if (gameRun) {
      return (
         <GameDailyRun handleBack={handleBack} startDate={stage.start} endDate={stage.end}></GameDailyRun>
      )
   } else {
      return (
         <Row>
            <div className="selectLevel">
            <svg width="1020" height="500" viewBox="0 0 1920 1080">
               <defs>
                  <filter id="Rectangle_102" x="40" y="46" width="519" height="162" filterUnits="userSpaceOnUse">
                     <feOffset dy="6" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_107" x="218" y="259" width="329" height="329" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-2" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur-2" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_108" x="596" y="259" width="329" height="329" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-3" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur-3" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_109" x="974" y="259" width="329" height="329" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-4" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur-4" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_110" x="1352" y="259" width="329" height="329" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-5" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur-5" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_111" x="218" y="644" width="329" height="329" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-6" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur-6" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_112" x="596" y="644" width="329" height="329" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-7" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur-7" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_113" x="974" y="644" width="329" height="329" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-8" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur-8" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_114" x="1352" y="644" width="329" height="329" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-9" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur-9" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <clipPath id="clip-關卡">
                     <rect width="1920" height="1080" />
                  </clipPath>
               </defs>
               <g id="關卡" clipPath="url(#clip-關卡)">
                  <rect width="1920" height="1080" fill="#eddbbe" />
                  <g id="選擇關卡">
                     <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_102)">
                        <path id="Rectangle_102-2" data-name="Rectangle 102" d="M58,0H442a59,59,0,0,1,59,59V85a59,59,0,0,1-59,59H59A59,59,0,0,1,0,85V58A58,58,0,0,1,58,0Z" transform="translate(49 49)" fill="#3e88a8" />
                     </g>
                     <text id="選擇關卡-2" data-name="選擇關卡" transform="translate(113 157)" fill="#fff" fontSize="100" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">
                        選擇關卡
                     </tspan></text>
                  </g>
                  {stages.map((stage, i) => (
                     <a key={`stage_a${i+1}`} variant="primary" onClick={() => handleShowModal(i)}>
                        <g id={`btnStage${stage.number}`}>
                           <g transform="matrix(1, 0, 0, 1, 0, 0)">
                              <rect id={`rect${stage.number}`} data-name={`rect${stage.number}`}
                                 width="300" height="300" rx="30" transform={`translate(${200 + i * 400} 455)`} fill="#fff" />
                           </g>
                           <text id={`_${stage.number}`} data-name={`stage${stage.number}`}
                              transform={`translate(${300 + i * 400} 680)`} fontSize="200" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700"><tspan x="0" y="0">
                                 {stage.number}
                              </tspan></text>
                        </g>
                     </a>
                  ))};
                  <StageModal
                     show={modalShow}
                     onHide={() => setModalShow(false)}
                     stage={stage.number} start={stage.start} end={stage.end}
                     handlegamestart={handleGameStart}
                  />
               </g>
            </svg>
            </div>
         </Row >
      );
   }
}

export default GameDaily;