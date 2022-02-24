// ----- 晴暄、鎧洋 ----- //

import { Axios } from 'axios';
import React, { Component, useState } from 'react';
import { Row, Modal } from 'react-bootstrap';
import "../css/GameDaily_style.css"
import { PlusCircle, Search, DashCircle, Gift } from "react-bootstrap-icons"

function GameDailyRun() {
   const [findShow, setfindShow] = useState(false);
   const [giftShow, setgiftShow] = useState(false);
   const [nextShow, setnextShow] = useState(false);
   const [imgPath, setImgPath] = useState();

   return (
      <>
         <div className="header">
            <span className="headerSide">2019/01/02 交易建立</span>
            <button className="headerBack"><span className="header-Back-text">返回關卡</span> </button>
            <div>
               <ul>
                  <li className="testinput">
                     <span className="buyTitle">證券代號 / 名稱 :
                        <input type="text" className="testEnter" />
                        <button className="button-plus">
                           <Search className="button-plus-icon" />
                           <span className="button-plus-text">查詢</span>
                        </button>
                     </span>
                  </li>
                  <li className="testinput">
                     <span className="buyTitle">買進股數 :
                        <input type="text" className="testEnterOne" />
                        <button className="button-plus">
                           <PlusCircle className="button-plus-icon" />
                           <span className="button-plus-text">買進</span>
                        </button>
                        <button className="button-plus">
                           <DashCircle className="button-plus-icon" />
                           <span className="button-plus-text">賣出</span>
                        </button>
                     </span>
                  </li>
               </ul>

              <span className="testInput">
                  <ul>
                      
                     <li>
                        <input type="text" className="haveInput" />
                     </li>
                   
                        <span className="haveUl">
                        <button className="nextButton-plus">
                           <span className="nextButton-plus-text">下一關</span>
                        </button>

                        <button className="getButton-plus">
                           <span className="getButton-plus-text">領取獎勵</span>
                           <Gift className="getButton-gift-icon" />
                        </button>
                        </span>
                    
                    
                  </ul>
                </span>

               <span>
                  <img src="/assets/images/duck.svg" className="duckPict" />
               </span>
            </div>



         </div>

         <Modal
            centered
            size="lg"
            show={findShow}
            onHide={() => setfindShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
         >

         </Modal>


         <Modal
            size="md"
            show={giftShow}
            onHide={() => setgiftShow(false)}
            aria-labelledby="example-modal-sizes-title-md"
            centered
         >


         </Modal>
      </>
   );
}


export default GameDailyRun;