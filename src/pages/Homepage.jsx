// ----- 冠樺 ----- //

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BackendSearch from '../components/BackendSearch';

class Homepage extends Component {
   render() {
      return (
         <div className="row">
            <div className="col-lg-12">
               <h1>This is Homepage!</h1>
               <Link to="/backend/datatype">資料庫取得的資料型態</Link><br />
               <BackendSearch />
            </div>
         </div>
      );
   }
}

export default Homepage;