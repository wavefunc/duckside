// ----- 晴暄 ----- //

import React, { useState } from 'react';
import Axios from 'axios';

function StoreFirstPage({
   furnList = [],
   pageDisplay = {},
   setPageDisplay = f => f,
   updatePage = false,
   setUpdatePage = f => f,
   resetTotalPoints = f => f
}) {
   // 用來在函式間傳遞的 furn 變數
   const [furnFuncPass, setFurnFuncPass] = useState({ name: '', id: '' });

   const buyFurniture = async furnId => {
      await Axios.put('http://localhost:5000/acc_furn/buying', {
         acc_email: localStorage.getItem("loginState"),
         furn_id: furnId
      }).then(result => {
         (result.data == 'Successfully updated') ?
            setPageDisplay(pageDisplay => (
               { ...pageDisplay, purchaseConfirm: 'none', purchaseSuccess: 'block' }
            )) :
            setPageDisplay(pageDisplay => (
               { ...pageDisplay, purchaseConfirm: 'none', purchaseFail: 'block' }
            ));
      });
      setUpdatePage(updatePage => !updatePage);
      resetTotalPoints();
   };

   const outputFurniture = () => {
      return (
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
                  <div className='row pl-2 pt-2'>
                     <div style={{fontFamily:"Helvetica" , color:"#520707", fontSize:"40"}}>
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
                  <div className='row pl-3 pt-1' style={{fontFamily:"Helvetica" , color:"#520707", fontSize:"40" ,fontWeight:"bold"}}>
                     <img src={`/assets/furniture/moneyIcon.svg`} width='30px' />
                     &nbsp;{obj.furn_price}
                     <img
                        src={`/assets/furniture/btnBuy.svg`}
                        style={{ cursor: 'pointer', display: obj.storeFurnDis, marginLeft:"10%" }}
                        onClick={() => {
                           setPageDisplay(pageDisplay => (
                              { ...pageDisplay, purchaseConfirm: 'block' }
                           ));
                           setFurnFuncPass(furnFuncPass => ({ id: obj.furn_id, name: obj.furn_name }))
                        }}
                        width='65px'
                     />
                  </div>
               </li>
            );
         })
      );
   };

   const outputPurchaseConfirm = () => {
      return (
         <div id="detectDiv" style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: pageDisplay.purchaseConfirm,
         }}>
            <svg width="600" viewBox="0 0 1221 739" fill="none">
               <g id="purchaseConfirm">
                  <path id="Rectangle 104" d="M1191 0H30C13.4315 0 0 13.4315 0 30V709C0 725.569 13.4315 739 30 739H1191C1207.57 739 1221 725.569 1221 709V30C1221 13.4315 1207.57 0 1191 0Z" fill="#FAF3E2" />
                  <text transform="translate(300 326)" fill="#520707" font-size="100" font-family="YuGothicUI-Bold, Yu Gothic UI" font-weight="700">
                     <tspan x="-70" y="0">確定要買{furnFuncPass.name}嗎？</tspan>
                  </text>
                  <g id="btnPurchaseYes" style={{ cursor: 'pointer' }} onClick={() => {
                     buyFurniture(furnFuncPass.id);
                  }}>
                     <path d="M505 542H240C223.431 542 210 555.431 210 572V654C210 670.569 223.431 684 240 684H505C521.569 684 535 670.569 535 654V572C535 555.431 521.569 542 505 542Z" fill="#3E88A8" />
                     <path d="M328.8 592.8V603.4H417.4V592.8H328.8ZM373.6 610.9V621.2H411V610.9H373.6ZM368 598.2V635.2H380.1V598.2H368ZM352.5 614.2L342.6 617.4C350.8 638.3 364.5 642.4 387.5 642.4H416.1C416.7 638.9 418.5 633.6 420.2 631C413 631.2 393.7 631.3 388.2 631.2C370.7 631.1 358 628.8 352.5 614.2ZM343.8 605.5C341.5 618.9 335.4 629.5 325.2 635.8C327.8 637.6 332.4 642 334.2 644.2C345.3 636.3 352.5 623.7 355.8 607.2L343.8 605.5ZM349.7 574.9H395.6V579.9H349.7V574.9ZM349.7 562H395.6V567H349.7V562ZM338.1 553.5V588.4H407.8V553.5H338.1Z" fill="white" />
                  </g>
                  <g id="btnPurchaseCancel" style={{ cursor: 'pointer' }} onClick={() => {
                     setPageDisplay(pageDisplay => (
                        { ...pageDisplay, purchaseConfirm: 'none' }
                     ));
                  }}>
                     <path d="M970 542H705C688.431 542 675 555.431 675 572V654C675 670.569 688.431 684 705 684H970C986.569 684 1000 670.569 1000 654V572C1000 555.431 986.569 542 970 542Z" fill="#AC4C4C" />
                     <path d="M811.3 629.9V640.3H864.2V629.9H811.3ZM804.4 604.4V643.9H816.8V614.7H859.3V643.9H872.5V604.4H804.4ZM793.9 555.1V566.3H881.9V555.1H793.9ZM839.9 559C829.4 572.9 809.9 583.8 789.9 589.6C792.5 592.1 796.6 597.7 798.4 600.5C818.5 593.1 839.3 580.6 851.9 564.2L839.9 559ZM846 581.4C856.6 586 869.6 593.7 876.6 599.3L885.4 590.3C878 585.1 865.3 577.8 854.6 573.4L846 581.4ZM831.6 577.2V601.5H843.9V565.2L843.7 565.1L831.6 577.2Z" fill="white" />
                  </g>
               </g>
            </svg>
         </div>
      );
   };

   const outputPurchaseSuccess = () => {
      return (
         <div style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: pageDisplay.purchaseSuccess,
         }}>
            <svg width="600" viewBox="0 0 1221 739" fill="none">
               <g id="purchaseSuccess" style={{ cursor: 'pointer' }} onClick={() => {
                  setUpdatePage(updatePage => !updatePage);
                  setPageDisplay(pageDisplay => (
                     { ...pageDisplay, purchaseSuccess: 'none' }
                  ));
               }}>
                  <path d="M1191 0H30C13.4315 0 0 13.4315 0 30V709C0 725.569 13.4315 739 30 739H1191C1207.57 739 1221 725.569 1221 709V30C1221 13.4315 1207.57 0 1191 0Z" fill="#FAF3E2" />
                  <text transform="translate(300 326)" fill="#520707" fontSize="100" fontFamily="YuGothicUI-Bold, Yu Gothic UI" fontWeight="700">
                     <tspan x="0" y="-70">{furnFuncPass.name}已購買囉！</tspan>
                     <tspan x="0" y="80">請到倉庫看看</tspan>
                  </text>

                  <g id="btnSuccessConfirm">
                     <path d="M740 515H475C458.431 515 445 528.431 445 545V627C445 643.569 458.431 657 475 657H740C756.569 657 770 643.569 770 627V545C770 528.431 756.569 515 740 515Z" fill="#3E88A8" />
                     <path id="yes" d="M564.8 583.7V592.4H602.3V583.7H564.8ZM564.8 599.5V608.3H602.3V599.5H564.8ZM564.6 615.3V625.2H606.9V615.3H564.6ZM549.9 544.4V562.7H560.1V554.5H595.8V562.7H606.4V544.4H549.9ZM578.4 575.3V620H589.4V575.3H578.4ZM568.5 567H567.4L557.3 577.4V629.1H568.5V577H604.5V567H568.5ZM573.8 535C569.6 553.7 560.7 568.9 547 577.9C549.4 579.9 553.5 584.6 555.1 586.9C569.8 576.1 579.8 558.8 585.2 537.1L573.8 535ZM584.5 556.9C583.4 561.3 581.1 567.4 579.1 571.5L588.1 573.8C590.3 570.1 593 564.7 595.6 559.2L584.5 556.9ZM514.7 541V551.9H550.8V541H514.7ZM526 570.4V580.8H539.1V606.7H526V617H549.2V570.4H526ZM525 546.8C523 565.1 519.1 582.4 511.3 593.4C513.4 596.1 516.6 602.2 517.7 605C527.9 591.4 533.3 570.2 536.3 548.6L525 546.8ZM521.3 570.4V624.7H531V570.4H521.3ZM669.8 543.1C668.3 555.6 665.3 569.4 649.1 577.1C651.5 579 654.6 582.9 655.9 585.6C674.3 575.9 678.7 559.4 680.6 543.1H669.8ZM652.5 560.2C662.3 563.3 674.2 569.2 680.7 573.9L686.4 564.7C679.7 560.4 668 554.9 658.1 551.9L652.5 560.2ZM692.6 539V540.8C691.9 561.8 691 569.4 689.4 571.3C688.6 572.3 687.7 572.6 686.4 572.5C684.9 572.5 681.9 572.5 678.5 572.2C680.1 575.1 681.3 579.6 681.4 582.9C685.8 583 689.9 583 692.3 582.6C695.2 582.2 697.1 581.3 699 578.8C701.7 575.6 702.7 566.2 703.7 543.4C703.8 542 703.8 539 703.8 539H692.6ZM663.5 592.9V615C663.5 625 665.4 628.3 674.7 628.3C676.6 628.3 681.2 628.3 683 628.3C690.2 628.3 693.1 624.9 694.2 611.7C691.2 610.9 686.5 609.2 684.4 607.4C684.1 616.7 683.7 617.9 681.8 617.9C680.8 617.9 677.5 617.9 676.6 617.9C674.7 617.9 674.5 617.6 674.5 614.8V592.9H663.5ZM653.3 596.8C652.4 605 650.4 613.3 646.3 618.3L655.1 623.7C659.9 617.8 661.8 608.3 662.7 599.3L653.3 596.8ZM665.7 586C672.1 589.7 679.7 595.4 683.2 599.5L690.6 591.7C686.9 587.5 679 582.3 672.6 579.1L665.7 586ZM687.8 598.4C692.7 606.1 696.8 616.7 697.9 623.7L708.4 619.4C707.1 612.3 702.7 602.1 697.5 594.5L687.8 598.4ZM653.8 539V549H697.7V539H653.8ZM617.5 565.8V574.8H646.8V565.8H617.5ZM617.8 538.2V547.3H646.5V538.2H617.8ZM617.5 579.4V588.5H646.8V579.4H617.5ZM612.9 551.7V561.2H649.5V551.7H612.9ZM622.7 593.3V602.8H636.9V614.2H622.7V623.7H646.9V593.3H622.7ZM617.3 593.3V627.7H627.1V593.3H617.3Z" fill="white" />
                  </g>
               </g>
            </svg>
         </div>
      );
   };

   const outputPurchaseFail = () => {
      return (
         <div style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: pageDisplay.purchaseFail,
         }}>
            <svg width="600" viewBox="0 0 1221 739" fill="none">
               <g id="purchaseFail" style={{ cursor: 'pointer' }} onClick={() => {
                  setUpdatePage(updatePage => !updatePage);
                  setPageDisplay(pageDisplay => (
                     { ...pageDisplay, purchaseFail: 'none' }
                  ));
               }}>
                  <path d="M1191 0H30C13.4315 0 0 13.4315 0 30V709C0 725.569 13.4315 739 30 739H1191C1207.57 739 1221 725.569 1221 709V30C1221 13.4315 1207.57 0 1191 0Z" fill="#FAF3E2" />
                  <text transform="translate(300 326)" fill="#520707" fontSize="100" fontFamily="YuGothicUI-Bold, Yu Gothic UI" fontWeight="700">
                     <tspan x="-70" y="-70">很抱歉</tspan>
                     <tspan x="-70" y="80">您的積分不足喔！</tspan>
                  </text>

                  <g id="btnSuccessFail">
                     <path d="M740 515H475C458.431 515 445 528.431 445 545V627C445 643.569 458.431 657 475 657H740C756.569 657 770 643.569 770 627V545C770 528.431 756.569 515 740 515Z" fill="#3E88A8" />
                     <path d="M564.8 583.7V592.4H602.3V583.7H564.8ZM564.8 599.5V608.3H602.3V599.5H564.8ZM564.6 615.3V625.2H606.9V615.3H564.6ZM549.9 544.4V562.7H560.1V554.5H595.8V562.7H606.4V544.4H549.9ZM578.4 575.3V620H589.4V575.3H578.4ZM568.5 567H567.4L557.3 577.4V629.1H568.5V577H604.5V567H568.5ZM573.8 535C569.6 553.7 560.7 568.9 547 577.9C549.4 579.9 553.5 584.6 555.1 586.9C569.8 576.1 579.8 558.8 585.2 537.1L573.8 535ZM584.5 556.9C583.4 561.3 581.1 567.4 579.1 571.5L588.1 573.8C590.3 570.1 593 564.7 595.6 559.2L584.5 556.9ZM514.7 541V551.9H550.8V541H514.7ZM526 570.4V580.8H539.1V606.7H526V617H549.2V570.4H526ZM525 546.8C523 565.1 519.1 582.4 511.3 593.4C513.4 596.1 516.6 602.2 517.7 605C527.9 591.4 533.3 570.2 536.3 548.6L525 546.8ZM521.3 570.4V624.7H531V570.4H521.3ZM669.8 543.1C668.3 555.6 665.3 569.4 649.1 577.1C651.5 579 654.6 582.9 655.9 585.6C674.3 575.9 678.7 559.4 680.6 543.1H669.8ZM652.5 560.2C662.3 563.3 674.2 569.2 680.7 573.9L686.4 564.7C679.7 560.4 668 554.9 658.1 551.9L652.5 560.2ZM692.6 539V540.8C691.9 561.8 691 569.4 689.4 571.3C688.6 572.3 687.7 572.6 686.4 572.5C684.9 572.5 681.9 572.5 678.5 572.2C680.1 575.1 681.3 579.6 681.4 582.9C685.8 583 689.9 583 692.3 582.6C695.2 582.2 697.1 581.3 699 578.8C701.7 575.6 702.7 566.2 703.7 543.4C703.8 542 703.8 539 703.8 539H692.6ZM663.5 592.9V615C663.5 625 665.4 628.3 674.7 628.3C676.6 628.3 681.2 628.3 683 628.3C690.2 628.3 693.1 624.9 694.2 611.7C691.2 610.9 686.5 609.2 684.4 607.4C684.1 616.7 683.7 617.9 681.8 617.9C680.8 617.9 677.5 617.9 676.6 617.9C674.7 617.9 674.5 617.6 674.5 614.8V592.9H663.5ZM653.3 596.8C652.4 605 650.4 613.3 646.3 618.3L655.1 623.7C659.9 617.8 661.8 608.3 662.7 599.3L653.3 596.8ZM665.7 586C672.1 589.7 679.7 595.4 683.2 599.5L690.6 591.7C686.9 587.5 679 582.3 672.6 579.1L665.7 586ZM687.8 598.4C692.7 606.1 696.8 616.7 697.9 623.7L708.4 619.4C707.1 612.3 702.7 602.1 697.5 594.5L687.8 598.4ZM653.8 539V549H697.7V539H653.8ZM617.5 565.8V574.8H646.8V565.8H617.5ZM617.8 538.2V547.3H646.5V538.2H617.8ZM617.5 579.4V588.5H646.8V579.4H617.5ZM612.9 551.7V561.2H649.5V551.7H612.9ZM622.7 593.3V602.8H636.9V614.2H622.7V623.7H646.9V593.3H622.7ZM617.3 593.3V627.7H627.1V593.3H617.3Z" fill="white" />
                  </g>
               </g>
            </svg>
         </div>
      );
   };

   return (
      <div
         id="container"
         className="row"
         style={{ display: pageDisplay.storeFirstPage, position: 'relative' }}
      >
         <div className="col-lg-12">
            <div id="centerSide">
               <ul>
                  {outputFurniture()}
               </ul>
            </div>
         </div>
         {outputPurchaseConfirm()}
         {outputPurchaseSuccess()}
         {outputPurchaseFail()}
      </div>
   );
}

export default StoreFirstPage;