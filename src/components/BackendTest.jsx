// ----- 冠樺 ----- //

import React, { useState, useEffect } from 'react';

function BackendTest() {
   const [result, setResult] = useState([]);

   useEffect(() => {
      console.log('ok');
   }, []);

   return (
      <div>
         <h3>I'm BackendTest</h3>
      </div>
   );
}

export default BackendTest;