// ----- 冠樺 ----- //

import React from 'react';
import { Form, Button } from 'react-bootstrap';

function BackendAvatar() {

   return (
      <div>
         <h3>測試大頭照上傳</h3>
         <Form>
            <Form.Group>
               <Form.File />
               <br />
               <Button>確定上傳</Button>
            </Form.Group>
         </Form>
      </div>
   );
}

// function uploadAvatar() {
//    console.log(avatar);
// }

export default BackendAvatar;