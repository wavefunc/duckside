// ----- 沛珊 ----- //

import React, { Component } from 'react';
import { Image } from 'react-bootstrap';

class Homepage extends Component {
   render() {
      return (
         <div className="row">
            <div className="col-lg-12">
               <Image src='/assets/images/homepage.jpg' fluid/>
            </div>
         </div>
      );
   }
}

export default Homepage;