// ----- 冠樺 ----- //

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';


function BackendAvatar() {
   const [avatar, setAvatar] = useState('');
   const [upToDate, setUpToDate] = useState(true);

   useEffect(() => {
      axios.post('http://localhost:5000/account/list',
         { acc_email: 'ggg@mail.com' }
      )
         .then(res => {
            setAvatar(res.data.acc_avatar);
            setUpToDate(true);
         });
   }, [upToDate]);

   function uploadAvatar(e) {
      // 新增 formData
      const formData = new FormData();
      formData.append('image', e.target.files[0]);
      formData.append('acc_email', 'ggg@mail.com');

      axios({
         method: 'put',
         url: 'http://localhost:5000/account/updateavatar',
         data: formData,
         headers: {
            'Content-Type': 'multipart/form-data'
         }
      }).then(res => {
         setUpToDate(false);
      });
   }

   return (
      <div>
         <h3>測試大頭照上傳</h3>
         <Form>
            <img src={avatar} alt="avatar" />
            <br />
            <input type='file' onChange={uploadAvatar} />
         </Form>
      </div>
   );
}

export default BackendAvatar;