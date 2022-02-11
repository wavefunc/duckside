// ----- 沛珊 ----- //

import React, { Component } from 'react';
import { Link, Outlet } from 'react-router-dom';

class Header extends Component {
   state = {}
   
   render() {
      return (
         <React.Fragment>
            <div className="header">
               <div className="container-fluid">
                  <div className="row">
                     <div className="col-lg-12">
                        <div className="float-left">
                           <div className="hamburger sidebar-toggle">
                              <span className="line"></span>
                              <span className="line"></span>
                              <span className="line"></span>
                           </div>
                        </div>
                        <div className="float-right">
                           <div className="dropdown dib">
                              <div className="header-icon" data-toggle="dropdown">
                                 <i className="far fa-bell"></i>
                                 <div className="drop-down dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-content-heading">
                                       <span className="text-left">Recent Notifications</span>
                                    </div>
                                    <div className="dropdown-content-body">
                                       <ul>
                                          <li>
                                             <a href="#">
                                                <img className="pull-left m-r-10 avatar-img" src="#" alt="" />
                                                <div className="notification-content">
                                                   <small className="notification-timestamp pull-right">02:34
                                                      PM</small>
                                                   <div className="notification-heading">Mr. John</div>
                                                   <div className="notification-text">5 members joined today </div>
                                                </div>
                                             </a>
                                          </li>
                                          <li>
                                             <a href="#">
                                                <img className="pull-left m-r-10 avatar-img" src="#" alt="" />
                                                <div className="notification-content">
                                                   <small className="notification-timestamp pull-right">02:34
                                                      PM</small>
                                                   <div className="notification-heading">Mariam</div>
                                                   <div className="notification-text">likes a photo of you</div>
                                                </div>
                                             </a>
                                          </li>
                                          <li>
                                             <a href="#">
                                                <img className="pull-left m-r-10 avatar-img" src="#" alt="" />
                                                <div className="notification-content">
                                                   <small className="notification-timestamp pull-right">02:34
                                                      PM</small>
                                                   <div className="notification-heading">Tasnim</div>
                                                   <div className="notification-text">Hi Teddy, Just wanted to let you ...
                                                   </div>
                                                </div>
                                             </a>
                                          </li>
                                          <li>
                                             <a href="#">
                                                <img className="pull-left m-r-10 avatar-img" src="#" alt="" />
                                                <div className="notification-content">
                                                   <small className="notification-timestamp pull-right">02:34
                                                      PM</small>
                                                   <div className="notification-heading">Mr. John</div>
                                                   <div className="notification-text">Hi Teddy, Just wanted to let you ...
                                                   </div>
                                                </div>
                                             </a>
                                          </li>
                                          <li className="text-center">
                                             <a href="#" className="more-link">See All</a>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="dropdown dib">
                              <div className="header-icon" data-toggle="dropdown">
                                 <i className="far fa-comment"></i>
                                 <div className="drop-down dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-content-heading">
                                       <span className="text-left">2 New Messages</span>
                                       <a href="email.html">
                                          <i className="ti-pencil-alt pull-right"></i>
                                       </a>
                                    </div>
                                    <div className="dropdown-content-body">
                                       <ul>
                                          <li className="notification-unread">
                                             <a href="#">
                                                <img className="pull-left m-r-10 avatar-img" src="#" alt="" />
                                                <div className="notification-content">
                                                   <small className="notification-timestamp pull-right">02:34
                                                      PM</small>
                                                   <div className="notification-heading">Michael Qin</div>
                                                   <div className="notification-text">Hi Teddy, Just wanted to let you ...
                                                   </div>
                                                </div>
                                             </a>
                                          </li>
                                          <li className="notification-unread">
                                             <a href="#">
                                                <img className="pull-left m-r-10 avatar-img" src="#" alt="" />
                                                <div className="notification-content">
                                                   <small className="notification-timestamp pull-right">02:34
                                                      PM</small>
                                                   <div className="notification-heading">Mr. John</div>
                                                   <div className="notification-text">Hi Teddy, Just wanted to let you ...
                                                   </div>
                                                </div>
                                             </a>
                                          </li>
                                          <li>
                                             <a href="#">
                                                <img className="pull-left m-r-10 avatar-img" src="#" alt="" />
                                                <div className="notification-content">
                                                   <small className="notification-timestamp pull-right">02:34
                                                      PM</small>
                                                   <div className="notification-heading">Michael Qin</div>
                                                   <div className="notification-text">Hi Teddy, Just wanted to let you ...
                                                   </div>
                                                </div>
                                             </a>
                                          </li>
                                          <li>
                                             <a href="#">
                                                <img className="pull-left m-r-10 avatar-img" src="#" alt="" />
                                                <div className="notification-content">
                                                   <small className="notification-timestamp pull-right">02:34
                                                      PM</small>
                                                   <div className="notification-heading">Mr. John</div>
                                                   <div className="notification-text">Hi Teddy, Just wanted to let you ...
                                                   </div>
                                                </div>
                                             </a>
                                          </li>
                                          <li className="text-center">
                                             <a href="#" className="more-link">See All</a>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="dropdown dib">
                              <div className="header-icon" data-toggle="dropdown">
                                 <i className="far fa-user"></i>
                                 <div className="drop-down dropdown-profile dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-content-heading">
                                       <span className="text-left">Upgrade Now</span>
                                       <p className="trial-day">30 Days Trail</p>
                                    </div>
                                    <div className="dropdown-content-body">
                                       <ul>
                                          <li>
                                                <i className="ti-user"></i>
                                             <Link to="/test">
                                                <span>Profile</span>
                                             </Link>
                                          </li>

                                          <li>
                                             <a href="#">
                                                <i className="ti-email"></i>
                                                <span>Inbox</span>
                                             </a>
                                          </li>
                                          <li>
                                             <a href="#">
                                                <i className="ti-settings"></i>
                                                <span>Setting</span>
                                             </a>
                                          </li>

                                          <li>
                                             <a href="#">
                                                <i className="ti-lock"></i>
                                                <span>Lock Screen</span>
                                             </a>
                                          </li>
                                          <li>
                                             <a href="#">
                                                <i className="ti-power-off"></i>
                                                <span>Logout</span>
                                             </a>
                                          </li>
                                       </ul>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default Header;