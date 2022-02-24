// ----- 冠樺 ----- //

import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import { Image } from 'react-bootstrap';

class Homepage extends Component {
   render() {
      return (
         <div className="row">
            <div className="col-lg-12">
               <Image src='/assets/images/homepage.jpg' fluid/>
               {/* <Link to="/backend/datatype">資料庫取得的資料型態</Link><br /> */}
            </div>
         </div>
      );
   }
}

export default Homepage;