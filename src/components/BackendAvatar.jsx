// ----- 冠樺 ----- //

import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
var fileReader = new FileReader();


function BackendAvatar() {
   const [avatar, setAvatar] = useState('');
   const [upToDate, setUpToDate] = useState(true);

   useEffect(() => {
      axios.post('http://localhost:5000/account/list',
         { acc_email: 'ggg@mail.com' }
         // { acc_email: 'edward.lee@blisswisdom.org' }
      )
         .then(res => {
            setAvatar(res.data.acc_avatar);
            setUpToDate(true);
         });
   }, [upToDate]);

   function uploadAvatar(e) {
      // 檔案位置
      // console.log(e.target.files[0]);

      // 新增 formData
      const formData = new FormData();
      e.target.files[0].acc_email = 4;
      formData.append('image', e.target.files[0]);
      formData.append('acc_email', 'ggg@mail.com');
      // console.log('hello' + formData.get('acc_email'));

      // 傳送資料
      // axios.put('http://localhost:5000/account/updateavatar', formData, {
      //    headers: {
      //       'Content-Type': 'multipart/form-data',
      //    }
      // }).then(res => {
      //    console.log(res.data);
      //    setUpToDate(false);
      // });

      axios({
         method: 'put',
         url: 'http://localhost:5000/account/updateavatar',
         data: formData,
         headers: {
            'Content-Type': 'multipart/form-data'
         },
         params: {
            acc_email: 4
         }
      }).then(res => {
         console.log(res.data);
         setUpToDate(false);
      });
   }

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

export default BackendAvatar;