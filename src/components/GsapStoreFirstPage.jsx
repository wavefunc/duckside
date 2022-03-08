// ----- 冠樺----- //

import React from 'react';

function StoreFirstPage({ furnList = [], pageDisplay = {} }) {

   return (
      <div id="container" className="row" style={{ display: pageDisplay.storeFirstPage }}>
         <div className="col-lg-12">
            <div id="centerSide">
               <ul>
                  {
                     furnList[0] && furnList.map(obj => {
                        return (
                           <li
                              key={obj.furn_id}
                              className="pt-2 pl-4 pr-4"
                              style={{
                                 backgroundImage: "url('/assets/furniture/liBackground.svg')",
                                 backgroundRepeat: 'no-repeat',
                                 backgroundSize: 'contain',
                                 width: '220px',
                                 height: '220px',
                              }}>
                              <div className='row'>
                                 <div>
                                    {obj.furn_name}
                                 </div>
                              </div>
                              <div className='row justify-content-md-center pb-2'>
                                 <img
                                    src={`/assets/furniture/${obj.furn_id}.svg`}
                                    width='85px'
                                    height='85px'
                                 />
                              </div>
                              <div className='row'>
                                 <img src={`/assets/furniture/moneyIcon.svg`} width='30px' />
                                 &nbsp;{obj.furn_price}&nbsp;&nbsp;&nbsp;
                                 <img src={`/assets/furniture/btnBuy.svg`} width='65px' />
                              </div>
                           </li>
                        );
                     })
                  }
               </ul>
            </div>
         </div>
      </div>
   );
}

export default StoreFirstPage;