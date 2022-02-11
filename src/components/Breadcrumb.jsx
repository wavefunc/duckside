// ----- 沛珊 ----- //

import React, { Component } from 'react';
class Breadcrumb extends Component {
   state = {}
   render() {
      return (
         <div className="col-lg-4 p-l-0 title-margin-left">
            <div className="page-header">
               <div className="page-title">
                  <ol className="breadcrumb">
                     <li className="breadcrumb-item">投資管理</li>
                     <li className="breadcrumb-item"><a href="/ma_dashboard">總覽</a></li>
                  </ol>
               </div>
            </div>
         </div>
      );
   }
}

export default Breadcrumb;
