// ----- 巧琳 ----- //

import React, { Component } from 'react';
import $ from 'jquery';

class MemberAdd extends Component {

   state = {};

   render() {
      return (
         <div>
            <hr />
            <h2>Add a member</h2>
            <label htmlFor="txtName">輸入暱稱：</label><br /><br />
            <input type="text" id="txtName" /><br /><br />
            <button onClick={() => { this.props.onAddMember($('#txtName').val()) }}>送出</button>
         </div >
      );
   }
}

export default MemberAdd;