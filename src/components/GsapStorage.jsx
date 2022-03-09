// ----- 晴暄 ----- //

import React from 'react';
import Axios from 'axios';

function Storage({
   furnList = [],
   pageDisplay = {},
   setPageDisplay = f => f,
   updatePage = false,
   setUpdatePage = f => f
}) {

   const placeFurniture = async furnId => {
      await Axios.put('http://localhost:5000/acc_furn/placing', {
         acc_email: localStorage.getItem("loginState"),
         furn_id: furnId
      });
      setUpdatePage(updatePage => !updatePage);
   };

   return (
      <div id="gameStorage" style={{ display: pageDisplay.storage }}>
         <div
            id="closeBtn"
            style={{ cursor: "pointer" }}
            onClick={() => {
               setPageDisplay(pageDisplay => (
                  { ...pageDisplay, storage: 'none' }
               ));
            }}
         >
            <svg width="50" viewBox="0 0 146 146">
               <g transform="translate(-1742 -29)">
                  <g id="Ellipse_61" data-name="Ellipse 61" transform="translate(1742 29)" fill="#256170" stroke="#707070" strokeWidth="1">
                     <circle cx="73" cy="73" r="73" stroke="none" />
                     <circle cx="73" cy="73" r="72.5" fill="none" />
                  </g>
                  <path id="Icon_ionic-md-close" data-name="Icon ionic-md-close" d="M76.262,14.4,69.389,7.523l-27.5,27.5L14.4,7.523,7.523,14.4l27.5,27.5-27.5,27.5L14.4,76.262l27.5-27.5,27.5,27.5,6.873-6.873-27.5-27.5Z" transform="translate(1773.107 60.107)" fill="#fff" />
               </g>
            </svg>
         </div>
         <div id="cardBox">
            <div id="littleCardBox" >
               {
                  furnList[0] && furnList.map(obj => {
                     return (
                        <li
                           key={obj.furn_id}
                           id="storageCard1"
                           style={{ cursor: "pointer", display: obj.storageFurnDis }}
                           onClick={() => { placeFurniture(obj.furn_id) }}
                        >
                           <img src={`/assets/furniture/${obj.furn_id}.svg`} width='100px' height='100px' />
                        </li>
                     );
                  })
               }
            </div>
         </div>
      </div>
   );
}

export default Storage;