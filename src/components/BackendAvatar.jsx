// ----- 冠樺 ----- //

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
var fileReader = new FileReader();


function BackendAvatar() {
   const [avatar, setAvatar] = useState('');

   useEffect(() => {
      axios.post('http://localhost:5000/account/list',
         { acc_email: 'ggg@mail.com' }
         // { acc_email: 'edward.lee@blisswisdom.org' }
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
            <img src={avatar} />
            <br />
            <input type='file' onChange={uploadAvatar} />
         </Form>
      </div>
   );
}

function uploadAvatar(e) {
   // 檔案位置
   // console.log(e.target.files[0]);

   // 新增 formData
   const formData = new FormData();
   formData.append('image', e.target.files[0]);
   formData.append('acc_email', 'ggg@mail.com');

   // 傳送資料
   axios.put('http://localhost:5000/account/updateavatar', formData,
      {
         headers: {
            'Content-Type': 'multipart/form-data',
         }
      }
   ).then(res => {
      console.log(res.data);
   });

}

export default BackendAvatar;