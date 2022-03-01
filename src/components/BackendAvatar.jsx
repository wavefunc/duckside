// ----- 冠樺 ----- //

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
var fileReader = new FileReader();

function BackendAvatar() {
   const [avatar, setAvatar] = useState('');

   useEffect(() => {
      axios.post('http://localhost:5000/account/list',
         { acc_email: 'ggg@mail.com' }
      )
         .then(res => {
            setAvatar(res.data.acc_avatar);
         });
   }, []);

   return (
      <div>
         <h3>測試大頭照上傳</h3>
         <Form>
            <Form.Group>
               <Form.File />
               <br />
               <Button>確定上傳</Button>
            </Form.Group>
            <img src={avatar}></img>
         </Form>
      </div>
   );
}

// function uploadAvatar() {
//    console.log(avatar);
// }

export default BackendAvatar;