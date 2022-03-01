// ----- 沛珊 ----- //

import React, { Component } from 'react';
class PageTitle extends Component {
   state = {}
   render() {
      return (
         <div  style={{marginTop:'30px'}} className="col-lg-5 p-r-0 title-margin-right">
            <div className="page-header">
               <div className="page-title">
                  <h1>Hello, <span>Welcome Here</span></h1>
               </div>
            </div>
         </div>
      );
   }
}

export default PageTitle;
