import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
   state = {}

   render() {
      return (
         <React.Fragment>
            <div className="sidebar sidebar-hide-to-small sidebar-shrink sidebar-gestures">
               <div className="nano">
                  <div className="nano-content">
                     <ul>
                        <div className="logo">
                           <Link to="/">
                              <img src="/assets/images/duck_right.png" alt="" />
                              <span>Duckside</span>
                           </Link>
                        </div>

                        <li>
                           <Link to="/member/info">
                              會員
                           </Link>
                        </li>
                        <li className="label">投資管理</li>
                        <li>
                           <Link to="/manage/dashboard">
                              <i className="fa fa-pie-chart"></i> 總覽
                           </Link>
                        </li>
                        <li>
                           <Link to="/manage/plan">
                              <i className="fa fa-anchor"></i> 進出策略
                           </Link>
                        </li>
                        <li>
                           <Link to="/manage/transaction">
                              <i className="fa fa-table"></i> 交易紀錄
                           </Link>
                        </li>
                        <li>
                           <Link to="/manage/asset">
                              <i className="fa fa-bank"></i> 資產明細</Link>
                        </li>
                        <li>
                           <Link to="/manage/check">
                              <i className="fa fa-line-chart"></i> 投資結算
                           </Link>
                        </li>
                        <li className="label">其他常用</li>
                        <li>
                           <a className="sidebar-sub-toggle">
                              <i className="fa fa-briefcase"></i> 小工具
                              <span className="sidebar-collapse-icon fa fa-angle-down"></span>
                           </a>
                           <ul>
                              <li>
                                 <Link to="/tools/chart_pie">圓餅圖: 部位配置</Link>
                              </li>
                              <li>
                                 <Link to="#">計算機: 風險報酬</Link>
                              </li>
                           </ul>
                        </li>
                        <li>
                           <a className="sidebar-sub-toggle">
                              <i className="fa fa-gamepad"></i> 模擬投資
                              <span className="sidebar-collapse-icon fa fa-angle-down"></span>
                           </a>
                           <ul>
                              <li>
                                 <Link to="/game/daily">划水日記</Link>
                              </li>
                              <li>
                                 <Link to="/game/room">小鴨房間</Link>
                              </li>
                           </ul>
                        </li>
                        <li>
                           <Link to="/about_site">
                              <i className="fa fa-home"></i> 關於本站
                           </Link>
                        </li>
                        <li>
                           <Link to="/about_team">
                              <i className="fa fa-user"></i> 合作夥伴
                           </Link>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>
         </React.Fragment>

      );
   }
}

export default Sidebar;