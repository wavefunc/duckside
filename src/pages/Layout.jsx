import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Breadcrumb from '../components/Breadcrumb';
import PageTitle from '../components/PageTitle';

class Layout extends Component {
   state = {}

   // componentDidMount() {
   //    const strScripts = [
   //       // nanoscroller
   //       "/js/jquery.nanoscroller.min.js",

   //       // sidebar
   //       "/js/sidebar.js",
   //       "/js/pace.min.js",

   //       // other
   //       "/js/bootstrap.min.js",
   //       "/js/scripts.js",
   //       // "/js/chartist/chartist.min.js",
   //       // "/js/owl-carousel/owl.carousel.min.js",
   //       // "/js/owl-carousel/owl.carousel-init.js",
   //       // "/js/dashboard.js"
   //    ];

   //    strScripts.forEach(function (val) {
   //       let script = document.createElement('script');
   //       script.src = val;
   //       script.defer = true;
   //       document.body.appendChild(script);
   //    });
   // }

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