// ----- 沛珊 ----- //

import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Breadcrumb from '../components/Breadcrumb';
import PageTitle from '../components/PageTitle';

class Layout extends Component {
   state = {}

   render() {
      return (
         <React.Fragment>
            <Header />
            <Sidebar />
            <div className="content-wrap">
               <div className="main">
                  <div className="container-fluid">
                     <div className="row">
                        <PageTitle />
                        <Breadcrumb />
                     </div>
                     <section id="main-content">
                        <Outlet />
                        <div className="row">
                           <div className="col-lg-12">
                              <div className="footer">
                                 <p>2018 © Admin Board. - <a href="#">example.com</a></p>
                              </div>
                           </div>
                        </div>
                     </section>
                  </div>
               </div>
            </div>
         </React.Fragment>
      );
   }
}

export default Layout;