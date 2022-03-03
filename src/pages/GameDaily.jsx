// ----- 晴暄、鎧洋 ----- //

import { Axios } from 'axios';
import React, { Component } from 'react';
import { Row, Modal } from 'react-bootstrap';
import {Link } from "react-router-dom"

function MyVerticallyCenteredModal(props) {
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
                        <tspan x="0" y="0">關卡條件:關卡1</tspan>
                     </text>
                     <line id="Line_41" data-name="Line 41" x2="1032" transform="translate(485 314.5)" fill="none" stroke="#707070"
                        stroke-width="5" />
                     <text id="時間:" transform="translate(493 517)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">時間</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">2019/01/02-2019/04/02</tspan>
                     </text>
                     <text id="交易天數:" transform="translate(493 712)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">交易天數</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">3 Month</tspan>
                     </text>

                     <Link to="/game/dailyrun">
                        <g id="進入關卡_按鈕" data-name="進入關卡 按鈕" transform="translate(-33 41)">
                           <rect id="Rectangle_106" data-name="Rectangle 106" width="463" height="142" rx="30"
                              transform="translate(583 765)" fill="#3e88a8" />
                           <text id="進入關卡" transform="translate(615 878)" fill="#fff" fontSize="100"
                              fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600">
                              <tspan x="0" y="0">進入關卡</tspan>
                           </text>
                        </g>
                     </Link>

                     <g>
                        <a href="javascript:void(0)" id="closebt" onClick={props.onHide}>
                           <g id="關閉_按鈕" data-name="關閉 按鈕" transform="translate(20 41)">
                              <rect id="Rectangle_105" data-name="Rectangle 105" width="325" height="142" rx="30"
                                 transform="translate(1109 765)" fill="#ac4c4c" />
                              <text id="關閉" transform="translate(1172 873)" fill="#fff" font-size="100"
                                 font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600">
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

function MyVerticallyCenteredModalTwo(e) {
   return (
      <Modal
         {...e}
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
                        <tspan x="0" y="0">關卡條件:關卡2</tspan>
                     </text>
                     <line id="Line_41" data-name="Line 41" x2="1032" transform="translate(485 314.5)" fill="none" stroke="#707070"
                        stroke-width="5" />
                     <text id="時間:" transform="translate(493 517)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">時間</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">2019/06/01-2020/08/01</tspan>
                     </text>
                     <text id="交易天數:" transform="translate(493 712)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">交易天數</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">2 Month</tspan>
                     </text>
                     
                        <g id="進入關卡_按鈕" data-name="進入關卡 按鈕" transform="translate(-33 41)">
                           <rect id="Rectangle_106" data-name="Rectangle 106" width="463" height="142" rx="30"
                              transform="translate(583 765)" fill="#3e88a8" />
                           <text id="進入關卡" transform="translate(615 878)" fill="#fff" fontSize="100"
                              fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600">
                              <tspan x="0" y="0">進入關卡</tspan>
                           </text>
                        </g>

                     <g>
                        <a href="javascript:void(0)" id="closebt" onClick={e.onHide}>
                           <g id="關閉_按鈕" data-name="關閉 按鈕" transform="translate(20 41)">
                              <rect id="Rectangle_105" data-name="Rectangle 105" width="325" height="142" rx="30"
                                 transform="translate(1109 765)" fill="#ac4c4c" />
                              <text id="關閉" transform="translate(1172 873)" fill="#fff" font-size="100"
                                 font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600">
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

function MyVerticallyCenteredModalThree(v) {
   return (
      <Modal
         {...v}
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
                        <tspan x="0" y="0">關卡條件:關卡3</tspan>
                     </text>
                     <line id="Line_41" data-name="Line 41" x2="1032" transform="translate(485 314.5)" fill="none" stroke="#707070"
                        stroke-width="5" />
                     <text id="時間:" transform="translate(493 517)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">時間</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">2019/09/01-2019/12/01</tspan>
                     </text>
                     <text id="交易天數:" transform="translate(493 712)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">交易天數</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">3 Month</tspan>
                     </text>

                        <g id="進入關卡_按鈕" data-name="進入關卡 按鈕" transform="translate(-33 41)">
                           <rect id="Rectangle_106" data-name="Rectangle 106" width="463" height="142" rx="30"
                              transform="translate(583 765)" fill="#3e88a8" />
                           <text id="進入關卡" transform="translate(615 878)" fill="#fff" fontSize="100"
                              fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600">
                              <tspan x="0" y="0">進入關卡</tspan>
                           </text>
                        </g>

                     <g>
                        <a href="javascript:void(0)" id="closebt" onClick={v.onHide}>
                           <g id="關閉_按鈕" data-name="關閉 按鈕" transform="translate(20 41)">
                              <rect id="Rectangle_105" data-name="Rectangle 105" width="325" height="142" rx="30"
                                 transform="translate(1109 765)" fill="#ac4c4c" />
                              <text id="關閉" transform="translate(1172 873)" fill="#fff" font-size="100"
                                 font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600">
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

function MyVerticallyCenteredModalFour(p) {
   return (
      <Modal
         {...p}
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
                        <tspan x="0" y="0">關卡條件:關卡4</tspan>
                     </text>
                     <line id="Line_41" data-name="Line 41" x2="1032" transform="translate(485 314.5)" fill="none" stroke="#707070"
                        stroke-width="5" />
                     <text id="時間:" transform="translate(493 517)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">時間</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">2020/01/02-2020/02/01</tspan>
                     </text>
                     <text id="交易天數:" transform="translate(493 712)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">交易天數</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">1 Month</tspan>
                     </text>
                     
                        <g id="進入關卡_按鈕" data-name="進入關卡 按鈕" transform="translate(-33 41)">
                           <rect id="Rectangle_106" data-name="Rectangle 106" width="463" height="142" rx="30"
                              transform="translate(583 765)" fill="#3e88a8" />
                           <text id="進入關卡" transform="translate(615 878)" fill="#fff" fontSize="100"
                              fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600">
                              <tspan x="0" y="0">進入關卡</tspan>
                           </text>
                        </g>

                     <g>
                        <a href="javascript:void(0)" id="closebt" onClick={p.onHide}>
                           <g id="關閉_按鈕" data-name="關閉 按鈕" transform="translate(20 41)">
                              <rect id="Rectangle_105" data-name="Rectangle 105" width="325" height="142" rx="30"
                                 transform="translate(1109 765)" fill="#ac4c4c" />
                              <text id="關閉" transform="translate(1172 873)" fill="#fff" font-size="100"
                                 font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600">
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

function MyVerticallyCenteredModalFive(a) {
   return (
      <Modal
         {...a}
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
                        <tspan x="0" y="0">關卡條件:關卡5</tspan>
                     </text>
                     <line id="Line_41" data-name="Line 41" x2="1032" transform="translate(485 314.5)" fill="none" stroke="#707070"
                        stroke-width="5" />
                     <text id="時間:" transform="translate(493 517)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">時間</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">2020/02/02-2020/03/01</tspan>
                     </text>
                     <text id="交易天數:" transform="translate(493 712)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">交易天數</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">1 Month</tspan>
                     </text>
                     
                        <g id="進入關卡_按鈕" data-name="進入關卡 按鈕" transform="translate(-33 41)">
                           <rect id="Rectangle_106" data-name="Rectangle 106" width="463" height="142" rx="30"
                              transform="translate(583 765)" fill="#3e88a8" />
                           <text id="進入關卡" transform="translate(615 878)" fill="#fff" fontSize="100"
                              fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600">
                              <tspan x="0" y="0">進入關卡</tspan>
                           </text>
                        </g>

                     <g>
                        <a href="javascript:void(0)" id="closebt" onClick={a.onHide}>
                           <g id="關閉_按鈕" data-name="關閉 按鈕" transform="translate(20 41)">
                              <rect id="Rectangle_105" data-name="Rectangle 105" width="325" height="142" rx="30"
                                 transform="translate(1109 765)" fill="#ac4c4c" />
                              <text id="關閉" transform="translate(1172 873)" fill="#fff" font-size="100"
                                 font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600">
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

function MyVerticallyCenteredModalSix(b) {
   return (
      <Modal
         {...b}
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
                        <tspan x="0" y="0">關卡條件:關卡6</tspan>
                     </text>
                     <line id="Line_41" data-name="Line 41" x2="1032" transform="translate(485 314.5)" fill="none" stroke="#707070"
                        stroke-width="5" />
                     <text id="時間:" transform="translate(493 517)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">時間</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">2020/04/01-2020/05/01</tspan>
                     </text>
                     <text id="交易天數:" transform="translate(493 712)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">交易天數</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">1 Month</tspan>
                     </text>

                        <g id="進入關卡_按鈕" data-name="進入關卡 按鈕" transform="translate(-33 41)">
                           <rect id="Rectangle_106" data-name="Rectangle 106" width="463" height="142" rx="30"
                              transform="translate(583 765)" fill="#3e88a8" />
                           <text id="進入關卡" transform="translate(615 878)" fill="#fff" fontSize="100"
                              fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600">
                              <tspan x="0" y="0">進入關卡</tspan>
                           </text>
                        </g>

                     <g>
                        <a href="javascript:void(0)" id="closebt" onClick={b.onHide}>
                           <g id="關閉_按鈕" data-name="關閉 按鈕" transform="translate(20 41)">
                              <rect id="Rectangle_105" data-name="Rectangle 105" width="325" height="142" rx="30"
                                 transform="translate(1109 765)" fill="#ac4c4c" />
                              <text id="關閉" transform="translate(1172 873)" fill="#fff" font-size="100"
                                 font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600">
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

function MyVerticallyCenteredModalSeven(c) {
   return (
      <Modal
         {...c}
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
                        <tspan x="0" y="0">關卡條件:關卡7</tspan>
                     </text>
                     <line id="Line_41" data-name="Line 41" x2="1032" transform="translate(485 314.5)" fill="none" stroke="#707070"
                        stroke-width="5" />
                     <text id="時間:" transform="translate(493 517)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">時間</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">2020/06/01-2020/08/01</tspan>
                     </text>
                     <text id="交易天數:" transform="translate(493 712)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">交易天數</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">2 Month</tspan>
                     </text>
                     
                        <g id="進入關卡_按鈕" data-name="進入關卡 按鈕" transform="translate(-33 41)">
                           <rect id="Rectangle_106" data-name="Rectangle 106" width="463" height="142" rx="30"
                              transform="translate(583 765)" fill="#3e88a8" />
                           <text id="進入關卡" transform="translate(615 878)" fill="#fff" fontSize="100"
                              fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600">
                              <tspan x="0" y="0">進入關卡</tspan>
                           </text>
                        </g>

                     <g>
                        <a href="javascript:void(0)" id="closebt" onClick={c.onHide}>
                           <g id="關閉_按鈕" data-name="關閉 按鈕" transform="translate(20 41)">
                              <rect id="Rectangle_105" data-name="Rectangle 105" width="325" height="142" rx="30"
                                 transform="translate(1109 765)" fill="#ac4c4c" />
                              <text id="關閉" transform="translate(1172 873)" fill="#fff" font-size="100"
                                 font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600">
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

function MyVerticallyCenteredModalEight(d) {
   return (
      <Modal
         {...d}
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
                        <tspan x="0" y="0">關卡條件:關卡8</tspan>
                     </text>
                     <line id="Line_41" data-name="Line 41" x2="1032" transform="translate(485 314.5)" fill="none" stroke="#707070"
                        stroke-width="5" />
                     <text id="時間:" transform="translate(493 517)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">時間</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">2020/09/01-2020/12/01</tspan>
                     </text>
                     <text id="交易天數:" transform="translate(493 712)" fill="#520707" fontSize="80"
                        fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">
                        <tspan x="0" y="0">交易天數</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">:</tspan>
                        <tspan y="0" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700">3 Month</tspan>
                     </text>
                     
                        <g id="進入關卡_按鈕" data-name="進入關卡 按鈕" transform="translate(-33 41)">
                           <rect id="Rectangle_106" data-name="Rectangle 106" width="463" height="142" rx="30"
                              transform="translate(583 765)" fill="#3e88a8" />
                           <text id="進入關卡" transform="translate(615 878)" fill="#fff" fontSize="100"
                              fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600">
                              <tspan x="0" y="0">進入關卡</tspan>
                           </text>
                        </g>

                     <g>
                        <a href="javascript:void(0)" id="closebt" onClick={d.onHide}>
                           <g id="關閉_按鈕" data-name="關閉 按鈕" transform="translate(20 41)">
                              <rect id="Rectangle_105" data-name="Rectangle 105" width="325" height="142" rx="30"
                                 transform="translate(1109 765)" fill="#ac4c4c" />
                              <text id="關閉" transform="translate(1172 873)" fill="#fff" font-size="100"
                                 font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600">
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
   const [modalShow, setModalShow] = React.useState(false);
   const [modalTwoShow, setModalTwoShow] = React.useState(false);
   const [modalThreeShow, setModalThreeShow] = React.useState(false);
   const [modalFourShow, setModalFourShow] = React.useState(false);
   const [modalFiveShow, setModalFiveShow] = React.useState(false);
   const [modalSixShow, setModalSixShow] = React.useState(false);
   const [modalSevenShow, setModalSevenShow] = React.useState(false);
   const [modalEightShow, setModalEightShow] = React.useState(false);

   return (
      <Row>
         <svg width="1020" height="500" viewBox="-33 0 1920 1080">
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
                  <text id="選擇關卡-2" data-name="選擇關卡" transform="translate(113 157)" fill="#fff" fontSize="100" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">選擇關卡</tspan></text>
               </g>

               <a variant="primary" onClick={() => setModalShow(true)}>
                  <g id="關卡1">
                     <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_107)">
                        <rect id="Rectangle_107-2" data-name="Rectangle 107" width="311" height="311" rx="30" transform="translate(227 265)" fill="#fff" />
                     </g>
                     <text id="_1" data-name="1" transform="translate(327 475)" fontSize="200" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700"><tspan x="0" y="0">1</tspan></text>
                  </g>

               </a>

               <a variant="primary" onClick={() => setModalTwoShow(true)}>
                  <g id="關卡2">
                     <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_108)">
                        <rect id="Rectangle_108-2" data-name="Rectangle 108" width="311" height="311" rx="30" transform="translate(605 265)" fill="#fff" />
                     </g>
                     <text id="_2" data-name="2" transform="translate(705 475)" fontSize="200" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700"><tspan x="0" y="0">2</tspan></text>
                  </g>
               </a>

               <a variant="primary" onClick={() => setModalThreeShow(true)}>
                  <g id="關卡3">
                     <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_109)">
                        <rect id="Rectangle_109-2" data-name="Rectangle 109" width="311" height="311" rx="30" transform="translate(983 265)" fill="#fff" />
                     </g>
                     <text id="_3" data-name="3" transform="translate(1083 475)" fontSize="200" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700"><tspan x="0" y="0">3</tspan></text>
                  </g>
               </a>
               <a variant="primary" onClick={() => setModalFourShow(true)}>
                  <g id="關卡4">
                     <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_110)">
                        <rect id="Rectangle_110-2" data-name="Rectangle 110" width="311" height="311" rx="30" transform="translate(1361 265)" fill="#fff" />
                     </g>
                     <text id="_4" data-name="4" transform="translate(1461 475)" fontSize="200" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700"><tspan x="0" y="0">4</tspan></text>
                  </g>
               </a>
               <a variant="primary" onClick={() => setModalFiveShow(true)}>
                  <g id="關卡5">
                     <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_111)">
                        <rect id="Rectangle_111-2" data-name="Rectangle 111" width="311" height="311" rx="30" transform="translate(227 650)" fill="#fff" />
                     </g>
                     <text id="_5" data-name="5" transform="translate(327 860)" fontSize="200" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700"><tspan x="0" y="0">5</tspan></text>
                  </g>
               </a>
               <a variant="primary" onClick={() => setModalSixShow(true)}>
                  <g id="關卡6">
                     <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_112)">
                        <rect id="Rectangle_112-2" data-name="Rectangle 112" width="311" height="311" rx="30" transform="translate(605 650)" fill="#fff" />
                     </g>
                     <text id="_6" data-name="6" transform="translate(705 860)" fontSize="200" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700"><tspan x="0" y="0">6</tspan></text>
                  </g>
               </a>
               <a variant="primary" onClick={() => setModalSevenShow(true)}>
                  <g id="關卡7">
                     <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_113)">
                        <rect id="Rectangle_113-2" data-name="Rectangle 113" width="311" height="311" rx="30" transform="translate(983 650)" fill="#fff" />
                     </g>
                     <text id="_7" data-name="7" transform="translate(1083 860)" fontSize="200" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700"><tspan x="0" y="0">7</tspan></text>
                  </g>
               </a>
               <a variant="primary" onClick={() => setModalEightShow(true)}>
                  <g id="關卡8">
                     <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_114)">
                        <rect id="Rectangle_114-2" data-name="Rectangle 114" width="311" height="311" rx="30" transform="translate(1361 650)" fill="#fff" />
                     </g>
                     <text id="_8" data-name="8" transform="translate(1461 860)" fontSize="200" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700"><tspan x="0" y="0">8</tspan></text>
                  </g>
               </a>
            </g>

            <MyVerticallyCenteredModal
               show={modalShow}
               onHide={() => setModalShow(false)}
            />

            <MyVerticallyCenteredModalTwo
               show={modalTwoShow}
               onHide={() => setModalTwoShow(false)}
            />

            <MyVerticallyCenteredModalThree
               show={modalThreeShow}
               onHide={() => setModalThreeShow(false)}
            />

            <MyVerticallyCenteredModalFour
               show={modalFourShow}
               onHide={() => setModalFourShow(false)}
            />

            <MyVerticallyCenteredModalFive
               show={modalFiveShow}
               onHide={() => setModalFiveShow(false)}
            />

            <MyVerticallyCenteredModalSix
               show={modalSixShow}
               onHide={() => setModalSixShow(false)}
            />

            <MyVerticallyCenteredModalSeven
               show={modalSevenShow}
               onHide={() => setModalSevenShow(false)}
            />

            <MyVerticallyCenteredModalEight
               show={modalEightShow}
               onHide={() => setModalEightShow(false)}
            />

         </svg>

      </Row >
   );
}

export default GameDaily;