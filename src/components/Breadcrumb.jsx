// ----- 沛珊 ----- //

import React, { useState } from 'react';
import PubSub from 'pubsub-js';
import { Link } from 'react-router-dom';

function Breadcrumb() {
   const [pathName, setPathName] = useState("/manage/dashboard");
   PubSub.subscribe('Path', (msg, data) => {
      setPathName(data)
   })


   return (
      <div style={{ marginTop: '-25px' }} className="col-lg-12 title-margin-left">
         <div className="page-header">
            <div className="page-title">
               <ol className="breadcrumb">
                  <li className="breadcrumb-item" style={{ fontSize: '17px', fontWeight: 'bold' }}>投資管理</li>
                  <li className="breadcrumb-item" style={{ fontSize: '17px', fontWeight: 'bold' }}>
                     <Link to={pathName}>
                        {
                           pathName === "/manage/dashboard" ?
                              "總覽" :
                              pathName === "/manage/plan" ?
                                 "我的計畫" :
                                 pathName === "/manage/transaction" ?
                                    "交易紀錄" :
                                    pathName === "/manage/asset" ?
                                       "資產明細" :
                                       pathName === "/manage/check" ?
                                          "投資成果" :
                                          ""
                        }
                     </Link>
                  </li>
               </ol>
            </div>
         </div>
      </div>
   );

}

export default Breadcrumb;
