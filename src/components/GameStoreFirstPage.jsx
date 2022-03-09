// ----- 晴暄----- //

// import React, { Component } from 'react';
import "../css/GameStoreFirstPage_style.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";

let GameStoreFirstPage = (props) => {

   const [modalShow, setModalShow] = useState("none");
   const [comfirmInfo, setcomfirmInfo] = useState("none");
   const [funiture, setfuniture] = useState("");
   const [furName, setfurName] = useState("")
   const [funitureBuy, setfunitureBuy] = useState({
         light:"",
        basketball:"",
        bathTube:"",
        TV:"",
        clock:"",
        cabinet:"",
        femaleDuck:"",
        protrait:"",
        glasses:"",
        weight:"",
        mirror:""
   });
   


   let buying = (e) => {
      props.setUpToDate(true);
      setfuniture(e.currentTarget.dataset.furnid);

      if(modalShow=="none"){
         setModalShow("block")
     }else{
         setModalShow("none")
     }

     setfurName(e.currentTarget.id)
      
   }

   let comfirmBuying = () =>{
      console.log(funiture)
      Axios.put("http://localhost:5000/acc_furn/buying",{
         acc_email:localStorage.getItem("loginState"),
         furn_id: funiture
      }).then(() => {
         setModalShow("none")
         setcomfirmInfo("block")

      })
   }

   useEffect(() => {
      Axios.post("http://localhost:5000/acc_furn/storeList",{
      acc_email:localStorage.getItem("loginState"),
   }).then( (result) => {
      setfunitureBuy(result.data)
      // setupToDate(true);
      props.setUpToDate(false);

   })
   },[props.upToDate])

   
   
   return (
      <div id="container" className="row" style={{display:props.show}}>
         <div className="col-lg-12">
            <div id="centerSide">
               <ul>
               <li id="licard1">
               <svg width="220" height="200" viewBox="0 0 373 336">
               <defs>
                  <filter id="Path_28" x="0" y="0" width="373" height="336" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
               </defs>
               <g id="card1" transform="translate(-96 -287)">
                  <g transform="matrix(1, 0, 0, 1, 96, 287)" filter="url(#Path_28)">
                     <path id="Path_28-2" dataname="Path 28" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <path id="Icon_simple-cashapp" dataname="Icon simple-cashapp" d="M35.385,5.2A7.65,7.65,0,0,0,30.81.63C28.845,0,27.06,0,23.43,0H12.54C8.94,0,7.125,0,5.19.6A7.65,7.65,0,0,0,.615,5.19C0,7.14,0,8.94,0,12.54v10.9c0,3.615,0,5.4.6,7.35A7.65,7.65,0,0,0,5.175,35.37c1.95.615,3.75.615,7.35.615h10.92c3.615,0,5.415,0,7.35-.6a7.65,7.65,0,0,0,4.59-4.59c.615-1.95.615-3.75.615-7.35V12.57c0-3.615,0-5.415-.615-7.365ZM26.13,12.15l-1.4,1.4a.75.75,0,0,1-1,.015,7.5,7.5,0,0,0-4.83-1.77c-1.455,0-2.91.48-2.91,1.815s1.56,1.8,3.36,2.475c3.15,1.05,5.76,2.37,5.76,5.46,0,3.36-2.61,5.67-6.87,5.925l-.39,1.8a.735.735,0,0,1-.72.585H14.445l-.135-.015a.75.75,0,0,1-.57-.885l.42-1.905A9.81,9.81,0,0,1,9.84,24.69v-.015a.72.72,0,0,1,0-1.02l1.5-1.455a.735.735,0,0,1,1.005,0,7.254,7.254,0,0,0,5.085,1.98c1.95,0,3.255-.825,3.255-2.13s-1.32-1.65-3.81-2.58c-2.64-.945-5.145-2.28-5.145-5.4,0-3.63,3.015-5.4,6.585-5.565L18.69,6.66a.72.72,0,0,1,.72-.57h2.67l.15.015a.718.718,0,0,1,.555.855L22.38,9.015A11.257,11.257,0,0,1,26.1,11.1l.03.03a.715.715,0,0,1,0,1.02Z" transform="translate(134.365 546.007)" fill="#dec646"/>
                  <text id="_500" dataname="500" transform="translate(183 579)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">500</tspan></text>
                  <text id="燈串" transform="translate(118 350)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">燈串</tspan></text>
                  {/* 燈串 */}
                  <g id="my_light" transform="translate(79.5 31.989)">
                     <path id="Path_4" dataname="Path 4" d="M0,1.1S51.02,65.9,124.145,68.491C215.212,67.848,281,0,281,0" transform="translate(62.5 357.5)" fill="none" stroke="#707070" strokeWidth="4"/>
                     <g id="Group_14" dataname="Group 14" transform="translate(71.812 376.559)">
                     <line id="Line_16" dataname="Line 16" y2="14" transform="translate(6.688 -0.35)" fill="none" stroke="#707070" strokeWidth="4"/>
                     <rect id="Rectangle_23" dataname="Rectangle 23" width="5.893" height="8.839" transform="translate(3.867 8.839)" fill="#363636"/>
                     <path id="Path_5" dataname="Path 5" d="M6.813,0c3.763,0,6.813,3.875,6.813,8.655,0,2.471-.489,5.658-1.868,7.32-1.15,1.388-3.127,1.335-4.945,1.335-1.678,0-3.069.829-4.772-1.335S0,11.3,0,8.655C0,3.875,3.05,0,6.813,0Z" transform="translate(13.626 30.724) rotate(180)" fill="#ffd230"/>
                     </g>
                     <g id="Group_15" dataname="Group 15" transform="translate(103.116 401.633)">
                     <path id="Path_23" dataname="Path 23" d="M0,0V14" transform="translate(6.384 -0.394)" fill="none" stroke="#707070" strokeWidth="4"/>
                     <rect id="Rectangle_23-2" dataname="Rectangle 23" width="5.893" height="8.839" transform="translate(3.438 8.839)" fill="#363636"/>
                     <path id="Path_5-2" dataname="Path 5" d="M6.813,0c3.763,0,6.813,3.875,6.813,8.655,0,2.471-.489,5.658-1.868,7.32-1.15,1.388-3.127,1.335-4.945,1.335-1.678,0-3.069.829-4.772-1.335S0,11.3,0,8.655C0,3.875,3.05,0,6.813,0Z" transform="translate(13.197 30.724) rotate(180)" fill="#ffd230"/>
                     </g>
                     <g id="Group_16" dataname="Group 16" transform="translate(137.63 416.978)">
                     <line id="Line_16-2" dataname="Line 16" y2="13" transform="translate(6.87 0.034)" fill="none" stroke="#707070" strokeWidth="4"/>
                     <rect id="Rectangle_23-3" dataname="Rectangle 23" width="5.893" height="8.839" transform="translate(3.867 8.839)" fill="#363636"/>
                     <path id="Path_5-3" dataname="Path 5" d="M6.813,0c3.763,0,6.813,3.875,6.813,8.655,0,2.471-.489,5.658-1.868,7.32-1.15,1.388-3.127,1.335-4.945,1.335-1.678,0-3.069.829-4.772-1.335S0,11.3,0,8.655C0,3.875,3.05,0,6.813,0Z" transform="translate(13.626 30.724) rotate(180)" fill="#ffd230"/>
                     </g>
                     <g id="Group_17" dataname="Group 17" transform="translate(176.668 424.712)">
                     <line id="Line_16-3" dataname="Line 16" y2="13" transform="translate(6.832 0.3)" fill="none" stroke="#707070" strokeWidth="4"/>
                     <rect id="Rectangle_23-4" dataname="Rectangle 23" width="5.893" height="8.839" transform="translate(3.867 8.839)" fill="#363636"/>
                     <path id="Path_5-4" dataname="Path 5" d="M6.813,0c3.763,0,6.813,3.875,6.813,8.655,0,2.471-.489,5.658-1.868,7.32-1.15,1.388-3.127,1.335-4.945,1.335-1.678,0-3.069.829-4.772-1.335S0,11.3,0,8.655C0,3.875,3.05,0,6.813,0Z" transform="translate(13.626 30.724) rotate(180)" fill="#ffd230"/>
                     </g>
                     <g id="Group_18" dataname="Group 18" transform="translate(213.128 423.239)">
                     <line id="Line_16-4" dataname="Line 16" y2="13" transform="translate(6.372 -0.227)" fill="none" stroke="#707070" strokeWidth="4"/>
                     <rect id="Rectangle_23-5" dataname="Rectangle 23" width="5.893" height="8.839" transform="translate(3.426 8.839)" fill="#363636"/>
                     <path id="Path_5-5" dataname="Path 5" d="M6.813,0c3.763,0,6.813,3.875,6.813,8.655,0,2.471-.489,5.658-1.868,7.32-1.15,1.388-3.127,1.335-4.945,1.335-1.678,0-3.069.829-4.772-1.335S0,11.3,0,8.655C0,3.875,3.05,0,6.813,0Z" transform="translate(13.185 30.724) rotate(180)" fill="#ffd230"/>
                     </g>
                     <g id="Group_19" dataname="Group 19" transform="translate(249.588 413.953)">
                     <line id="Line_16-5" dataname="Line 16" x2="0.368" y2="13.258" transform="translate(6.261)" fill="none" stroke="#707070" strokeWidth="4"/>
                     <rect id="Rectangle_23-6" dataname="Rectangle 23" width="5.893" height="8.839" transform="translate(3.867 8.839)" fill="#363636"/>
                     <path id="Path_5-6" dataname="Path 5" d="M6.813,0c3.763,0,6.813,3.875,6.813,8.655,0,2.471-.489,5.658-1.868,7.32-1.15,1.388-3.127,1.335-4.945,1.335-1.678,0-3.069.829-4.772-1.335S0,11.3,0,8.655C0,3.875,3.05,0,6.813,0Z" transform="translate(13.626 30.724) rotate(180)" fill="#ffd230"/>
                     </g>
                     <g id="Group_20" dataname="Group 20" transform="translate(284.575 396.276)">
                     <line id="Line_16-6" dataname="Line 16" x2="0.368" y2="13.258" transform="translate(6.261)" fill="none" stroke="#707070" strokeWidth="4"/>
                     <rect id="Rectangle_23-7" dataname="Rectangle 23" width="5.893" height="8.839" transform="translate(3.867 8.839)" fill="#363636"/>
                     <path id="Path_5-7" dataname="Path 5" d="M6.813,0c3.763,0,6.813,3.875,6.813,8.655,0,2.471-.489,5.658-1.868,7.32-1.15,1.388-3.127,1.335-4.945,1.335-1.678,0-3.069.829-4.772-1.335S0,11.3,0,8.655C0,3.875,3.05,0,6.813,0Z" transform="translate(13.626 30.724) rotate(180)" fill="#ffd230"/>
                     </g>
                     <g id="Group_21" dataname="Group 21" transform="translate(321.403 371.969)">
                     <line id="Line_16-7" dataname="Line 16" x2="0.368" y2="13.258" transform="translate(6.261)" fill="none" stroke="#707070" strokeWidth="4"/>
                     <rect id="Rectangle_23-8" dataname="Rectangle 23" width="5.893" height="8.839" transform="translate(3.867 8.839)" fill="#363636"/>
                     <path id="Path_5-8" dataname="Path 5" d="M6.813,0c3.763,0,6.813,3.875,6.813,8.655,0,2.471-.489,5.658-1.868,7.32-1.15,1.388-3.127,1.335-4.945,1.335-1.678,0-3.069.829-4.772-1.335S0,11.3,0,8.655C0,3.875,3.05,0,6.813,0Z" transform="translate(13.626 30.724) rotate(180)" fill="#ffd230"/>
                     </g>
                  </g>


                  <g id="燈串" data-furnid="light" style={{cursor:"pointer" ,display:funitureBuy.light}} onClick={buying}>
                 
                     <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                     <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                  </g>
                  
               </g>
               </svg>
               </li>

               <li id="licard2">
               <svg  width="220" height="200" viewBox="0 0 373 336">
               <defs>
                  <filter id="Path_749" x="0" y="0" width="373" height="336" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
               </defs>
               <g id="card2" transform="translate(-507 -287)">
                  <g transform="matrix(1, 0, 0, 1, 507, 287)" filter="url(#Path_749)">
                     <path id="Path_749-2" dataname="Path 749" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <path id="Icon_simple-cashapp" dataname="Icon simple-cashapp" d="M35.385,5.2A7.65,7.65,0,0,0,30.81.63C28.845,0,27.06,0,23.43,0H12.54C8.94,0,7.125,0,5.19.6A7.65,7.65,0,0,0,.615,5.19C0,7.14,0,8.94,0,12.54v10.9c0,3.615,0,5.4.6,7.35A7.65,7.65,0,0,0,5.175,35.37c1.95.615,3.75.615,7.35.615h10.92c3.615,0,5.415,0,7.35-.6a7.65,7.65,0,0,0,4.59-4.59c.615-1.95.615-3.75.615-7.35V12.57c0-3.615,0-5.415-.615-7.365ZM26.13,12.15l-1.4,1.4a.75.75,0,0,1-1,.015,7.5,7.5,0,0,0-4.83-1.77c-1.455,0-2.91.48-2.91,1.815s1.56,1.8,3.36,2.475c3.15,1.05,5.76,2.37,5.76,5.46,0,3.36-2.61,5.67-6.87,5.925l-.39,1.8a.735.735,0,0,1-.72.585H14.445l-.135-.015a.75.75,0,0,1-.57-.885l.42-1.905A9.81,9.81,0,0,1,9.84,24.69v-.015a.72.72,0,0,1,0-1.02l1.5-1.455a.735.735,0,0,1,1.005,0,7.254,7.254,0,0,0,5.085,1.98c1.95,0,3.255-.825,3.255-2.13s-1.32-1.65-3.81-2.58c-2.64-.945-5.145-2.28-5.145-5.4,0-3.63,3.015-5.4,6.585-5.565L18.69,6.66a.72.72,0,0,1,.72-.57h2.67l.15.015a.718.718,0,0,1,.555.855L22.38,9.015A11.257,11.257,0,0,1,26.1,11.1l.03.03a.715.715,0,0,1,0,1.02Z" transform="translate(545.365 546.007)" fill="#dec646"/>
                  <text id="_300" dataname="300" transform="translate(594 579)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">300</tspan></text>
                  <text id="籃球" transform="translate(529 350)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">籃球</tspan></text>
                  <g id="籃球" transform="translate(411)" data-furnid="basketball" style={{cursor:"pointer" ,display:funitureBuy.basketball}} onClick={buying}>
                  {/* // ,display:props.funitureHave.basketball ==="block"?"none":"block"}} */}
                     <a href="#">
                     <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                     <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                     </a>
                  </g>
                  {/* 籃球 */}
                  <g id="basketball" transform="translate(436.026 -392.066)">
                     <circle id="Ellipse_6" dataname="Ellipse 6" cx="88.474" cy="88.474" r="88.474" transform="translate(169 737)" fill="#ef8d37"/>
                     <line id="Line_25" dataname="Line 25" x2="176.948" transform="translate(169 825.474)" fill="none" stroke="#707070" strokeWidth="10"/>
                     <path id="Path_6" dataname="Path 6" d="M0,0S24.571,34.034,25.645,67.1s-21.35,65.178-21.35,65.178" transform="translate(196.917 761.481)" fill="none" stroke="#707070" strokeWidth="10"/>
                     <path id="Path_7" dataname="Path 7" d="M25.682,0S1.111,34.034.037,67.1s21.35,65.178,21.35,65.178" transform="translate(292.262 761.481)" fill="none" stroke="#707070" strokeWidth="10"/>
                     <line id="Line_26" dataname="Line 26" y2="176.948" transform="translate(257.903 737.429)" fill="none" stroke="#707070" strokeWidth="10"/>
                  </g>

               </g>
               </svg>
               </li>

               <li id="licard3">
               <svg width="220" height="200" viewBox="0 0 373 336">
               <defs>
                  <filter id="Path_750" x="0" y="0" width="373" height="336" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
               </defs>
               <g id="card3" transform="translate(-1317 -287)">
                  <g transform="matrix(1, 0, 0, 1, 1317, 287)" filter="url(#Path_750)">
                     <path id="Path_750-2" dataname="Path 750" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <path id="Icon_simple-cashapp" dataname="Icon simple-cashapp" d="M35.385,5.2A7.65,7.65,0,0,0,30.81.63C28.845,0,27.06,0,23.43,0H12.54C8.94,0,7.125,0,5.19.6A7.65,7.65,0,0,0,.615,5.19C0,7.14,0,8.94,0,12.54v10.9c0,3.615,0,5.4.6,7.35A7.65,7.65,0,0,0,5.175,35.37c1.95.615,3.75.615,7.35.615h10.92c3.615,0,5.415,0,7.35-.6a7.65,7.65,0,0,0,4.59-4.59c.615-1.95.615-3.75.615-7.35V12.57c0-3.615,0-5.415-.615-7.365ZM26.13,12.15l-1.4,1.4a.75.75,0,0,1-1,.015,7.5,7.5,0,0,0-4.83-1.77c-1.455,0-2.91.48-2.91,1.815s1.56,1.8,3.36,2.475c3.15,1.05,5.76,2.37,5.76,5.46,0,3.36-2.61,5.67-6.87,5.925l-.39,1.8a.735.735,0,0,1-.72.585H14.445l-.135-.015a.75.75,0,0,1-.57-.885l.42-1.905A9.81,9.81,0,0,1,9.84,24.69v-.015a.72.72,0,0,1,0-1.02l1.5-1.455a.735.735,0,0,1,1.005,0,7.254,7.254,0,0,0,5.085,1.98c1.95,0,3.255-.825,3.255-2.13s-1.32-1.65-3.81-2.58c-2.64-.945-5.145-2.28-5.145-5.4,0-3.63,3.015-5.4,6.585-5.565L18.69,6.66a.72.72,0,0,1,.72-.57h2.67l.15.015a.718.718,0,0,1,.555.855L22.38,9.015A11.257,11.257,0,0,1,26.1,11.1l.03.03a.715.715,0,0,1,0,1.02Z" transform="translate(1355.365 546.007)" fill="#dec646"/>
                  <text id="_1200" dataname="1200" transform="translate(1404 579)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">1200</tspan></text>
                  <text id="球池" transform="translate(1339 350)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">球池</tspan></text>
                  <g id="球池" transform="translate(1221)" data-furnid="bathTube" style={{cursor:"pointer" ,display:funitureBuy.bathTube}} onClick={buying}>
                     <a href="#">
                     <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                     <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                     </a>
                  </g>
                  {/* 浴池 */}
                  <g id="bath_tube" dataname="bath tube" transform="translate(158.625 -140.035)">
                     <path id="Path_8" dataname="Path 8" d="M0,0H244.926V56.554c0,5.129-6.129,10.656-16.41,13.795,0,0-51.021,13.681-104.047,13.681S16.41,70.349,16.41,70.349C7.9,67.737,1.329,59.991,1.329,54.862Z" transform="translate(1222 554.285)" fill="#b8dbdb"/>
                     <g id="Path_9" dataname="Path 9" transform="translate(1222 523)" fill="#68709f">
                     <path d="M 122.8748168945312 57.21599578857422 C 47.89981842041016 57.21599578857422 7.000009059906006 40.62968826293945 7.000009059906006 32.10799407958984 C 7.000009059906006 23.58630180358887 47.89981842041016 6.999994277954102 122.8748168945312 6.999994277954102 C 197.8498229980469 6.999994277954102 238.7496185302734 23.58630180358887 238.7496185302734 32.10799407958984 C 238.7496185302734 40.62968826293945 197.8498229980469 57.21599578857422 122.8748168945312 57.21599578857422 Z" stroke="none"/>
                     <path d="M 122.8748168945312 13.99999237060547 C 62.69670104980469 13.99999237060547 25.91731262207031 24.92253494262695 15.83195495605469 32.10798645019531 C 25.91738891601562 39.2934684753418 62.69674682617188 50.21599578857422 122.8748168945312 50.21599578857422 C 183.0529327392578 50.21599578857422 219.8322601318359 39.29347229003906 229.9176788330078 32.10798645019531 C 219.8323211669922 24.92253494262695 183.0529327392578 13.99999237060547 122.8748168945312 13.99999237060547 M 122.8748168945312 -7.62939453125e-06 C 190.7367248535156 -7.62939453125e-06 245.7496337890625 14.37522125244141 245.7496337890625 32.10799407958984 C 245.7496337890625 49.84072113037109 190.7367248535156 64.21599578857422 122.8748168945312 64.21599578857422 C 55.01295471191406 64.21599578857422 0 49.84072113037109 0 32.10799407958984 C 0 14.37522125244141 55.01295471191406 -7.62939453125e-06 122.8748168945312 -7.62939453125e-06 Z" stroke="none" fill="#d9f2f2"/>
                     </g>
                     <circle id="Ellipse_8" dataname="Ellipse 8" cx="5.351" cy="5.351" r="5.351" transform="translate(1266.869 542.347)" fill="#bba3c4"/>
                     <circle id="Ellipse_27" dataname="Ellipse 27" cx="5.351" cy="5.351" r="5.351" transform="translate(1379.247 556.343)" fill="#bba3c4"/>
                     <circle id="Ellipse_9" dataname="Ellipse 9" cx="6.586" cy="6.586" r="6.586" transform="translate(1282.923 548.522)" fill="#bba3c4"/>
                     <circle id="Ellipse_31" dataname="Ellipse 31" cx="6.586" cy="6.586" r="6.586" transform="translate(1429.055 544.405)" fill="#bba3c4"/>
                     <circle id="Ellipse_18" dataname="Ellipse 18" cx="6.586" cy="6.586" r="6.586" transform="translate(1386.656 541.112)" fill="#bba3c4"/>
                     <circle id="Ellipse_10" dataname="Ellipse 10" cx="9.056" cy="9.056" r="9.056" transform="translate(1318.324 536.996)" fill="#bba3c4"/>
                     <circle id="Ellipse_11" dataname="Ellipse 11" cx="5.763" cy="5.763" r="5.763" transform="translate(1401.475 545.229)" fill="#eda4a4"/>
                     <circle id="Ellipse_12" dataname="Ellipse 12" cx="6.792" cy="6.792" r="6.792" transform="translate(1304.74 545.229)" fill="#eda4a4"/>
                     <circle id="Ellipse_29" dataname="Ellipse 29" cx="6.792" cy="6.792" r="6.792" transform="translate(1270.985 550.58)" fill="#eda4a4"/>
                     <circle id="Ellipse_13" dataname="Ellipse 13" cx="5.969" cy="5.969" r="5.969" transform="translate(1369.368 548.522)" fill="#eda4a4"/>
                     <circle id="Ellipse_33" dataname="Ellipse 33" cx="5.969" cy="5.969" r="5.969" transform="translate(1332.731 532.056)" fill="#eda4a4"/>
                     <circle id="Ellipse_17" dataname="Ellipse 17" cx="9.674" cy="9.674" r="9.674" transform="translate(1338.494 542.759)" fill="#eda4a4"/>
                     <circle id="Ellipse_16" dataname="Ellipse 16" cx="5.763" cy="5.763" r="5.763" transform="translate(1286.628 536.996)" fill="#eda4a4"/>
                     <circle id="Ellipse_14" dataname="Ellipse 14" cx="5.763" cy="5.763" r="5.763" transform="translate(1324.499 554.285)" fill="#eda4a4"/>
                     <circle id="Ellipse_15" dataname="Ellipse 15" cx="5.763" cy="5.763" r="5.763" transform="translate(1241.759 545.229)" fill="#eda4a4"/>
                     <circle id="Ellipse_19" dataname="Ellipse 19" cx="6.38" cy="6.38" r="6.38" transform="translate(1299.389 554.696)" fill="#fff"/>
                     <circle id="Ellipse_28" dataname="Ellipse 28" cx="6.38" cy="6.38" r="6.38" transform="translate(1298.977 534.938)" fill="#fff"/>
                     <circle id="Ellipse_21" dataname="Ellipse 21" cx="6.38" cy="6.38" r="6.38" transform="translate(1354.548 556.755)" fill="#fff"/>
                     <circle id="Ellipse_26" dataname="Ellipse 26" cx="6.38" cy="6.38" r="6.38" transform="translate(1374.307 539.054)" fill="#fff"/>
                     <circle id="Ellipse_25" dataname="Ellipse 25" cx="6.38" cy="6.38" r="6.38" transform="translate(1335.613 556.755)" fill="#fff"/>
                     <circle id="Ellipse_22" dataname="Ellipse 22" cx="6.38" cy="6.38" r="6.38" transform="translate(1393.243 552.638)" fill="#fff"/>
                     <circle id="Ellipse_23" dataname="Ellipse 23" cx="6.38" cy="6.38" r="6.38" transform="translate(1419.176 543.994)" fill="#fff"/>
                     <circle id="Ellipse_24" dataname="Ellipse 24" cx="6.38" cy="6.38" r="6.38" transform="translate(1354.96 535.761)" fill="#fff"/>
                     <circle id="Ellipse_30" dataname="Ellipse 30" cx="6.38" cy="6.38" r="6.38" transform="translate(1408.062 550.168)" fill="#fff"/>
                     <circle id="Ellipse_20" dataname="Ellipse 20" cx="6.38" cy="6.38" r="6.38" transform="translate(1259.459 548.933)" fill="#fff"/>
                     <circle id="Ellipse_32" dataname="Ellipse 32" cx="6.586" cy="6.586" r="6.586" transform="translate(1415.06 548.933)" fill="#bba3c4"/>
                  </g>

               </g>
               </svg>
               </li>

               <li id="licard4">
               <svg width="220" height="200" viewBox="0 0 373 336">
               <defs>
                  <filter id="Path_750" x="0" y="0" width="373" height="336" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
               </defs>
               <g id="card4" transform="translate(-1317 -287)">
                  <g transform="matrix(1, 0, 0, 1, 1317, 287)" filter="url(#Path_750)">
                     <path id="Path_750-2" dataname="Path 750" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <path id="Icon_simple-cashapp" dataname="Icon simple-cashapp" d="M35.385,5.2A7.65,7.65,0,0,0,30.81.63C28.845,0,27.06,0,23.43,0H12.54C8.94,0,7.125,0,5.19.6A7.65,7.65,0,0,0,.615,5.19C0,7.14,0,8.94,0,12.54v10.9c0,3.615,0,5.4.6,7.35A7.65,7.65,0,0,0,5.175,35.37c1.95.615,3.75.615,7.35.615h10.92c3.615,0,5.415,0,7.35-.6a7.65,7.65,0,0,0,4.59-4.59c.615-1.95.615-3.75.615-7.35V12.57c0-3.615,0-5.415-.615-7.365ZM26.13,12.15l-1.4,1.4a.75.75,0,0,1-1,.015,7.5,7.5,0,0,0-4.83-1.77c-1.455,0-2.91.48-2.91,1.815s1.56,1.8,3.36,2.475c3.15,1.05,5.76,2.37,5.76,5.46,0,3.36-2.61,5.67-6.87,5.925l-.39,1.8a.735.735,0,0,1-.72.585H14.445l-.135-.015a.75.75,0,0,1-.57-.885l.42-1.905A9.81,9.81,0,0,1,9.84,24.69v-.015a.72.72,0,0,1,0-1.02l1.5-1.455a.735.735,0,0,1,1.005,0,7.254,7.254,0,0,0,5.085,1.98c1.95,0,3.255-.825,3.255-2.13s-1.32-1.65-3.81-2.58c-2.64-.945-5.145-2.28-5.145-5.4,0-3.63,3.015-5.4,6.585-5.565L18.69,6.66a.72.72,0,0,1,.72-.57h2.67l.15.015a.718.718,0,0,1,.555.855L22.38,9.015A11.257,11.257,0,0,1,26.1,11.1l.03.03a.715.715,0,0,1,0,1.02Z" transform="translate(1355.365 546.007)" fill="#dec646"/>
                  <text id="_400" dataname="400" transform="translate(1404 579)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">400</tspan></text>
                  <text id="電視" transform="translate(1339 350)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">電視</tspan></text>
                  <g id="電視" transform="translate(1221)" data-furnid="TV" style={{cursor:"pointer" ,display:funitureBuy.TV}} onClick={buying}>
                     <a href="#">
                     <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                     <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                     </a>
                  </g>
                  {/* 電視 */}
                  <g id="TV" transform="translate(945 108.167)">
                     <g id="Rectangle_43" dataname="Rectangle 43" transform="translate(442 266.833)" fill="#464444" stroke="#707070" strokeWidth="1">
                     <rect width="234" height="121" stroke="none"/>
                     <rect x="0.5" y="0.5" width="233" height="120" fill="none"/>
                     </g>
                     <g id="Rectangle_44" dataname="Rectangle 44" transform="translate(449 272.833)" fill="#dbdbdb" stroke="#707070" strokeWidth="1">
                     <rect width="222" height="109" stroke="none"/>
                     <rect x="0.5" y="0.5" width="221" height="108" fill="none"/>
                     </g>
                     <rect id="Rectangle_45" dataname="Rectangle 45" width="13" height="24" transform="translate(553 387.833)" fill="#464444"/>
                     <ellipse id="Ellipse_36" dataname="Ellipse 36" cx="67.5" cy="7.5" rx="67.5" ry="7.5" transform="translate(492 405.833)" fill="#464444"/>
                  </g>

               </g>
               </svg>
               </li>
                        
               <li id="licard5">
               <svg width="220" height="200" viewBox="0 0 373 336">
               <defs>
                  <filter id="Path_750" x="0" y="0" width="373" height="336" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
                  <filter id="Ellipse_37" x="173.812" y="86.646" width="26.196" height="25.377" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-2"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur-2"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
                  <filter id="Ellipse_38" x="173.812" y="146.479" width="26.196" height="26.196" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-3"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur-3"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
               </defs>
               <g id="card5" transform="translate(-1317 -287)">
                  <g transform="matrix(1, 0, 0, 1, 1317, 287)" filter="url(#Path_750)">
                     <path id="Path_750-2" dataname="Path 750" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <path id="Icon_simple-cashapp" dataname="Icon simple-cashapp" d="M35.385,5.2A7.65,7.65,0,0,0,30.81.63C28.845,0,27.06,0,23.43,0H12.54C8.94,0,7.125,0,5.19.6A7.65,7.65,0,0,0,.615,5.19C0,7.14,0,8.94,0,12.54v10.9c0,3.615,0,5.4.6,7.35A7.65,7.65,0,0,0,5.175,35.37c1.95.615,3.75.615,7.35.615h10.92c3.615,0,5.415,0,7.35-.6a7.65,7.65,0,0,0,4.59-4.59c.615-1.95.615-3.75.615-7.35V12.57c0-3.615,0-5.415-.615-7.365ZM26.13,12.15l-1.4,1.4a.75.75,0,0,1-1,.015,7.5,7.5,0,0,0-4.83-1.77c-1.455,0-2.91.48-2.91,1.815s1.56,1.8,3.36,2.475c3.15,1.05,5.76,2.37,5.76,5.46,0,3.36-2.61,5.67-6.87,5.925l-.39,1.8a.735.735,0,0,1-.72.585H14.445l-.135-.015a.75.75,0,0,1-.57-.885l.42-1.905A9.81,9.81,0,0,1,9.84,24.69v-.015a.72.72,0,0,1,0-1.02l1.5-1.455a.735.735,0,0,1,1.005,0,7.254,7.254,0,0,0,5.085,1.98c1.95,0,3.255-.825,3.255-2.13s-1.32-1.65-3.81-2.58c-2.64-.945-5.145-2.28-5.145-5.4,0-3.63,3.015-5.4,6.585-5.565L18.69,6.66a.72.72,0,0,1,.72-.57h2.67l.15.015a.718.718,0,0,1,.555.855L22.38,9.015A11.257,11.257,0,0,1,26.1,11.1l.03.03a.715.715,0,0,1,0,1.02Z" transform="translate(1355.365 546.007)" fill="#dec646"/>
                  <text id="_300" dataname="300" transform="translate(1404 579)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">300</tspan></text>
                  <text id="床頭櫃" transform="translate(1339 350)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">床頭櫃</tspan></text>
                  <g id="床頭櫃" transform="translate(1221)" data-furnid="cabinet" style={{cursor:"pointer" ,display:funitureBuy.cabinet}} onClick={buying}>
                     <a href="#">
                     <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                     <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                     </a>
                  </g>
                  {/* 櫃子 */}
                  <g id="櫃子" transform="translate(995.75 166.789)">
                     <path id="Path_13" dataname="Path 13" d="M4.922,0c4.392,0,5.963,45.257,5.963,45.257s-1.136,1.5-5.031,1.5A10.11,10.11,0,0,1,0,45.257S.53,0,4.922,0Z" transform="translate(456.571 369.041) rotate(180)" fill="#d6c298"/>
                     <path id="Path_15" dataname="Path 15" d="M4.922,0c4.392,0,5.963,45.257,5.963,45.257s-1.136,1.5-5.031,1.5A10.11,10.11,0,0,1,0,45.257S.53,0,4.922,0Z" transform="translate(577.91 369.041) rotate(180)" fill="#d6c298"/>
                     <rect id="Rectangle_50" dataname="Rectangle 50" width="179.5" height="131.142" rx="10" transform="translate(418 201.382)" fill="#d6c298"/>
                     <rect id="Rectangle_53" dataname="Rectangle 53" width="166.386" height="59.014" transform="translate(424.557 207.939)" fill="#c18c57"/>
                     <rect id="Rectangle_55" dataname="Rectangle 55" width="166.386" height="59.014" transform="translate(424.557 267.772)" fill="#c18c57"/>
                     <rect id="Rectangle_51" dataname="Rectangle 51" width="160.648" height="54.916" transform="translate(427.836 210.398)" fill="#e0d5bf"/>
                     <rect id="Rectangle_54" dataname="Rectangle 54" width="160.648" height="54.916" transform="translate(427.836 270.231)" fill="#e0d5bf"/>
                     <g transform="matrix(1, 0, 0, 1, 321.25, 120.21)" filter="url(#Ellipse_37)">
                     <ellipse id="Ellipse_37-2" dataname="Ellipse 37" cx="4.098" cy="3.688" rx="4.098" ry="3.688" transform="translate(182.81 92.65)" fill="#760202"/>
                     </g>
                     <g transform="matrix(1, 0, 0, 1, 321.25, 120.21)" filter="url(#Ellipse_38)">
                     <circle id="Ellipse_38-2" dataname="Ellipse 38" cx="4.098" cy="4.098" r="4.098" transform="translate(182.81 152.48)" fill="#760202"/>
                     </g>
                  </g>

               </g>
               </svg>
               </li>
            
               <li id="licard6">
               <svg width="220" height="200" viewBox="0 0 373 336">
               <defs>
                  <filter id="Path_750" x="0" y="0" width="373" height="336" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
                  <filter id="Subtraction_8" x="137.779" y="21" width="96.787" height="70.838" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-2"/>
                     <feFlood floodOpacity="0.259"/>
                     <feComposite operator="in" in2="blur-2"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
                  <filter id="Subtraction_8-2" x="137.779" y="21" width="96.787" height="70.838" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-3"/>
                     <feFlood floodColor="#f1801e" result="color"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-3"/>
                     <feComposite operator="in" in="color"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
                  <filter id="Path_736" x="107.577" y="59.737" width="157.847" height="195.271" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-4"/>
                     <feFlood floodOpacity="0.259"/>
                     <feComposite operator="in" in2="blur-4"/>
                  </filter>
                  <filter id="Path_736-2" x="107.577" y="59.737" width="157.847" height="195.271" filterUnits="userSpaceOnUse">
                     <feOffset dx="-30" dy="-10" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="25" result="blur-5"/>
                     <feFlood floodColor="#13dbe2" floodOpacity="0.3" result="color-2"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-5"/>
                     <feComposite operator="in" in="color-2"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
                  <filter id="Path_737" x="128.093" y="82.528" width="54.767" height="81.03" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-6"/>
                     <feFlood floodOpacity="0.259"/>
                     <feComposite operator="in" in2="blur-6"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
                  <filter id="Path_738" x="130.594" y="87.319" width="52.266" height="83.693" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-7"/>
                     <feFlood floodOpacity="0.259"/>
                     <feComposite operator="in" in2="blur-7"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
               </defs>
               <g id="card6" transform="translate(-1317 -287)">
                  <g transform="matrix(1, 0, 0, 1, 1317, 287)" filter="url(#Path_750)">
                     <path id="Path_750-2" dataname="Path 750" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <path id="Icon_simple-cashapp" dataname="Icon simple-cashapp" d="M35.385,5.2A7.65,7.65,0,0,0,30.81.63C28.845,0,27.06,0,23.43,0H12.54C8.94,0,7.125,0,5.19.6A7.65,7.65,0,0,0,.615,5.19C0,7.14,0,8.94,0,12.54v10.9c0,3.615,0,5.4.6,7.35A7.65,7.65,0,0,0,5.175,35.37c1.95.615,3.75.615,7.35.615h10.92c3.615,0,5.415,0,7.35-.6a7.65,7.65,0,0,0,4.59-4.59c.615-1.95.615-3.75.615-7.35V12.57c0-3.615,0-5.415-.615-7.365ZM26.13,12.15l-1.4,1.4a.75.75,0,0,1-1,.015,7.5,7.5,0,0,0-4.83-1.77c-1.455,0-2.91.48-2.91,1.815s1.56,1.8,3.36,2.475c3.15,1.05,5.76,2.37,5.76,5.46,0,3.36-2.61,5.67-6.87,5.925l-.39,1.8a.735.735,0,0,1-.72.585H14.445l-.135-.015a.75.75,0,0,1-.57-.885l.42-1.905A9.81,9.81,0,0,1,9.84,24.69v-.015a.72.72,0,0,1,0-1.02l1.5-1.455a.735.735,0,0,1,1.005,0,7.254,7.254,0,0,0,5.085,1.98c1.95,0,3.255-.825,3.255-2.13s-1.32-1.65-3.81-2.58c-2.64-.945-5.145-2.28-5.145-5.4,0-3.63,3.015-5.4,6.585-5.565L18.69,6.66a.72.72,0,0,1,.72-.57h2.67l.15.015a.718.718,0,0,1,.555.855L22.38,9.015A11.257,11.257,0,0,1,26.1,11.1l.03.03a.715.715,0,0,1,0,1.02Z" transform="translate(1355.365 546.007)" fill="#dec646"/>
                  <text id="_600" dataname="600" transform="translate(1404 579)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">600</tspan></text>
                  <text id="鏡子" transform="translate(1339 350)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">鏡子</tspan></text>
                  <g id="鏡子" transform="translate(1221)" data-furnid="mirror" style={{cursor:"pointer" ,display:funitureBuy.mirror}} onClick={buying}>
                     <a href="#">
                     <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                     <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                     </a>
                  </g>
                  {/* 鏡子 */}
                  <g id="鏡子-2" dataname="鏡子" transform="translate(2048.577 -3009)">
                     <g data-type="innerShadowGroup">
                     <g transform="matrix(1, 0, 0, 1, -731.58, 3296)" filter="url(#Subtraction_8)">
                        <path id="Subtraction_8-3" dataname="Subtraction 8" d="M2.352,52.838h0A39.423,39.423,0,0,1,3.738,22.622L17.053,40.378l-5.65-28.7A39.29,39.29,0,0,1,23.035,3.546L32.088,33.4l5.2-33.35C37.99.018,38.7,0,39.394,0a39.782,39.782,0,0,1,7,.62L51.51,33.4,59.9,5.745a39.677,39.677,0,0,1,6.663,5.12L60.749,40.378,74.662,21.825a39.188,39.188,0,0,1,3.053,8.4,39.637,39.637,0,0,1-1.28,22.611c-11.087-8.794-23.9-13.443-37.041-13.443S13.44,44.042,2.353,52.837Z" transform="translate(146.78 27)" fill="#ffd230"/>
                     </g>
                     <g transform="matrix(1, 0, 0, 1, -731.58, 3296)" filter="url(#Subtraction_8-2)">
                        <path id="Subtraction_8-4" dataname="Subtraction 8" d="M2.352,52.838h0A39.423,39.423,0,0,1,3.738,22.622L17.053,40.378l-5.65-28.7A39.29,39.29,0,0,1,23.035,3.546L32.088,33.4l5.2-33.35C37.99.018,38.7,0,39.394,0a39.782,39.782,0,0,1,7,.62L51.51,33.4,59.9,5.745a39.677,39.677,0,0,1,6.663,5.12L60.749,40.378,74.662,21.825a39.188,39.188,0,0,1,3.053,8.4,39.637,39.637,0,0,1-1.28,22.611c-11.087-8.794-23.9-13.443-37.041-13.443S13.44,44.042,2.353,52.837Z" transform="translate(146.78 27)" fill="#fff"/>
                     </g>
                     </g>
                     <g data-type="innerShadowGroup">
                     <g transform="matrix(1, 0, 0, 1, -731.58, 3296)" filter="url(#Path_736)">
                        <g id="Path_736-3" dataname="Path 736" transform="translate(116.58 65.74)" fill="rgba(102,229,255,0.86)">
                           <path d="M 69.92337799072266 167.2706146240234 C 36.88151168823242 167.2706146240234 10.0000114440918 131.9949798583984 10.0000114440918 88.63530731201172 C 10.0000114440918 45.27564239501953 36.88151168823242 10.00000762939453 69.92337799072266 10.00000762939453 C 102.9652481079102 10.00000762939453 129.8467407226562 45.27564239501953 129.8467407226562 88.63530731201172 C 129.8467407226562 131.9949798583984 102.9652481079102 167.2706146240234 69.92337799072266 167.2706146240234 Z" stroke="none"/>
                           <path d="M 69.92337799072266 19.99996948242188 C 42.86212921142578 19.99996948242188 20 51.43109893798828 20 88.63530731201172 C 20 125.8394775390625 42.86212921142578 157.2705993652344 69.92337799072266 157.2705993652344 C 96.98462677001953 157.2705993652344 119.8467559814453 125.8394775390625 119.8467559814453 88.63530731201172 C 119.8467559814453 51.43109893798828 96.98462677001953 19.99996948242188 69.92337799072266 19.99996948242188 M 69.92337799072266 -3.0517578125e-05 C 108.5410003662109 -3.0517578125e-05 139.8467559814453 39.68339538574219 139.8467559814453 88.63530731201172 C 139.8467559814453 137.5872650146484 108.5410003662109 177.2705993652344 69.92337799072266 177.2705993652344 C 31.30575561523438 177.2705993652344 0 137.5872650146484 0 88.63530731201172 C 0 39.68339538574219 31.30575561523438 -3.0517578125e-05 69.92337799072266 -3.0517578125e-05 Z" stroke="none" fill="#3e88a8"/>
                        </g>
                     </g>
                     <g id="Path_736-4" dataname="Path 736" transform="translate(-615 3361.737)" fill="rgba(102,229,255,0.86)">
                        <path d="M 69.92337799072266 167.2706146240234 C 36.88151168823242 167.2706146240234 10.0000114440918 131.9949798583984 10.0000114440918 88.63530731201172 C 10.0000114440918 45.27564239501953 36.88151168823242 10.00000762939453 69.92337799072266 10.00000762939453 C 102.9652481079102 10.00000762939453 129.8467407226562 45.27564239501953 129.8467407226562 88.63530731201172 C 129.8467407226562 131.9949798583984 102.9652481079102 167.2706146240234 69.92337799072266 167.2706146240234 Z" stroke="none"/>
                        <path d="M 69.92337799072266 19.99996948242188 C 42.86212921142578 19.99996948242188 20 51.43109893798828 20 88.63530731201172 C 20 125.8394775390625 42.86212921142578 157.2705993652344 69.92337799072266 157.2705993652344 C 96.98462677001953 157.2705993652344 119.8467559814453 125.8394775390625 119.8467559814453 88.63530731201172 C 119.8467559814453 51.43109893798828 96.98462677001953 19.99996948242188 69.92337799072266 19.99996948242188 M 69.92337799072266 -3.0517578125e-05 C 108.5410003662109 -3.0517578125e-05 139.8467559814453 39.68339538574219 139.8467559814453 88.63530731201172 C 139.8467559814453 137.5872650146484 108.5410003662109 177.2705993652344 69.92337799072266 177.2705993652344 C 31.30575561523438 177.2705993652344 0 137.5872650146484 0 88.63530731201172 C 0 39.68339538574219 31.30575561523438 -3.0517578125e-05 69.92337799072266 -3.0517578125e-05 Z" stroke="none"/>
                     </g>
                     <g transform="matrix(1, 0, 0, 1, -731.58, 3296)" filter="url(#Path_736-2)">
                        <g id="Path_736-5" dataname="Path 736" transform="translate(116.58 65.74)" fill="#fff">
                           <path d="M 69.92337799072266 167.2706146240234 C 36.88151168823242 167.2706146240234 10.0000114440918 131.9949798583984 10.0000114440918 88.63530731201172 C 10.0000114440918 45.27564239501953 36.88151168823242 10.00000762939453 69.92337799072266 10.00000762939453 C 102.9652481079102 10.00000762939453 129.8467407226562 45.27564239501953 129.8467407226562 88.63530731201172 C 129.8467407226562 131.9949798583984 102.9652481079102 167.2706146240234 69.92337799072266 167.2706146240234 Z" stroke="none"/>
                           <path d="M 69.92337799072266 19.99996948242188 C 42.86212921142578 19.99996948242188 20 51.43109893798828 20 88.63530731201172 C 20 125.8394775390625 42.86212921142578 157.2705993652344 69.92337799072266 157.2705993652344 C 96.98462677001953 157.2705993652344 119.8467559814453 125.8394775390625 119.8467559814453 88.63530731201172 C 119.8467559814453 51.43109893798828 96.98462677001953 19.99996948242188 69.92337799072266 19.99996948242188 M 69.92337799072266 -3.0517578125e-05 C 108.5410003662109 -3.0517578125e-05 139.8467559814453 39.68339538574219 139.8467559814453 88.63530731201172 C 139.8467559814453 137.5872650146484 108.5410003662109 177.2705993652344 69.92337799072266 177.2705993652344 C 31.30575561523438 177.2705993652344 0 137.5872650146484 0 88.63530731201172 C 0 39.68339538574219 31.30575561523438 -3.0517578125e-05 69.92337799072266 -3.0517578125e-05 Z" stroke="none"/>
                        </g>
                     </g>
                     <g id="Path_736-6" dataname="Path 736" transform="translate(-615 3361.737)" fill="none">
                        <path d="M 69.92337799072266 167.2706146240234 C 36.88151168823242 167.2706146240234 10.0000114440918 131.9949798583984 10.0000114440918 88.63530731201172 C 10.0000114440918 45.27564239501953 36.88151168823242 10.00000762939453 69.92337799072266 10.00000762939453 C 102.9652481079102 10.00000762939453 129.8467407226562 45.27564239501953 129.8467407226562 88.63530731201172 C 129.8467407226562 131.9949798583984 102.9652481079102 167.2706146240234 69.92337799072266 167.2706146240234 Z" stroke="none"/>
                        <path d="M 69.92337799072266 19.99996948242188 C 42.86212921142578 19.99996948242188 20 51.43109893798828 20 88.63530731201172 C 20 125.8394775390625 42.86212921142578 157.2705993652344 69.92337799072266 157.2705993652344 C 96.98462677001953 157.2705993652344 119.8467559814453 125.8394775390625 119.8467559814453 88.63530731201172 C 119.8467559814453 51.43109893798828 96.98462677001953 19.99996948242188 69.92337799072266 19.99996948242188 M 69.92337799072266 -3.0517578125e-05 C 108.5410003662109 -3.0517578125e-05 139.8467559814453 39.68339538574219 139.8467559814453 88.63530731201172 C 139.8467559814453 137.5872650146484 108.5410003662109 177.2705993652344 69.92337799072266 177.2705993652344 C 31.30575561523438 177.2705993652344 0 137.5872650146484 0 88.63530731201172 C 0 39.68339538574219 31.30575561523438 -3.0517578125e-05 69.92337799072266 -3.0517578125e-05 Z" stroke="none" fill="#3e88a8"/>
                     </g>
                     </g>
                     <g transform="matrix(1, 0, 0, 1, -731.58, 3296)" filter="url(#Path_737)">
                     <path id="Path_737-2" dataname="Path 737" d="M36.767,0S21.208,6.638,12.911,22.68,0,63.03,0,63.03" transform="translate(137.09 88.53)" fill="#fff" opacity="0.25"/>
                     </g>
                     <g transform="matrix(1, 0, 0, 1, -731.58, 3296)" filter="url(#Path_738)">
                     <path id="Path_738-2" dataname="Path 738" d="M18.586,0S10.721,6.638,6.526,22.68,0,63.03,0,63.03" transform="matrix(-0.97, -0.26, 0.26, -0.97, 157.55, 159.01)" fill="#fff" opacity="0.25"/>
                     </g>
                  </g>

               </g>
               </svg>

               </li>

               <li id="licard7">
               <svg width="220" height="200" viewBox="0 0 373 336">
               <defs>
                  <filter id="Path_750" x="0" y="0" width="373" height="336" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
               </defs>
               <g id="card7" transform="translate(-1317 -287)">
                  <g transform="matrix(1, 0, 0, 1, 1317, 287)" filter="url(#Path_750)">
                     <path id="Path_750-2" dataname="Path 750" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <path id="Icon_simple-cashapp" dataname="Icon simple-cashapp" d="M35.385,5.2A7.65,7.65,0,0,0,30.81.63C28.845,0,27.06,0,23.43,0H12.54C8.94,0,7.125,0,5.19.6A7.65,7.65,0,0,0,.615,5.19C0,7.14,0,8.94,0,12.54v10.9c0,3.615,0,5.4.6,7.35A7.65,7.65,0,0,0,5.175,35.37c1.95.615,3.75.615,7.35.615h10.92c3.615,0,5.415,0,7.35-.6a7.65,7.65,0,0,0,4.59-4.59c.615-1.95.615-3.75.615-7.35V12.57c0-3.615,0-5.415-.615-7.365ZM26.13,12.15l-1.4,1.4a.75.75,0,0,1-1,.015,7.5,7.5,0,0,0-4.83-1.77c-1.455,0-2.91.48-2.91,1.815s1.56,1.8,3.36,2.475c3.15,1.05,5.76,2.37,5.76,5.46,0,3.36-2.61,5.67-6.87,5.925l-.39,1.8a.735.735,0,0,1-.72.585H14.445l-.135-.015a.75.75,0,0,1-.57-.885l.42-1.905A9.81,9.81,0,0,1,9.84,24.69v-.015a.72.72,0,0,1,0-1.02l1.5-1.455a.735.735,0,0,1,1.005,0,7.254,7.254,0,0,0,5.085,1.98c1.95,0,3.255-.825,3.255-2.13s-1.32-1.65-3.81-2.58c-2.64-.945-5.145-2.28-5.145-5.4,0-3.63,3.015-5.4,6.585-5.565L18.69,6.66a.72.72,0,0,1,.72-.57h2.67l.15.015a.718.718,0,0,1,.555.855L22.38,9.015A11.257,11.257,0,0,1,26.1,11.1l.03.03a.715.715,0,0,1,0,1.02Z" transform="translate(1355.365 546.007)" fill="#dec646"/>
                  <text id="_600" dataname="600" transform="translate(1404 579)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">600</tspan></text>
                  <text id="小母鴨" transform="translate(1339 350)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">小母鴨</tspan></text>
                  <g id="小母鴨" transform="translate(1221)" data-furnid="femaleDuck" style={{cursor:"pointer" ,display:funitureBuy.femaleDuck}} onClick={buying}>
                     <a href="#">
                     <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                     <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                     </a>
                  </g>
                  {/* 母鴨 */}
                  <g id="母鴨" transform="translate(3841.322 -5516.489)">
                     <g id="鴨子" transform="translate(-2411.749 5871.979)">
                     <line id="Line_17" dataname="Line 17" y2="11.56" transform="translate(59.387 152.337)" fill="none" stroke="#574809" strokeWidth="7"/>
                     <line id="Line_21" dataname="Line 21" y2="11.56" transform="translate(91.458 152.337)" fill="none" stroke="#574809" strokeWidth="7"/>
                     <line id="Line_18" dataname="Line 18" x1="7.085" y2="5.594" transform="translate(51.555 163.152)" fill="none" stroke="#574809" strokeWidth="7"/>
                     <line id="Line_24" dataname="Line 24" x1="7.085" y2="5.594" transform="translate(83.626 163.152)" fill="none" stroke="#574809" strokeWidth="7"/>
                     <line id="Line_19" dataname="Line 19" y2="10.908" transform="translate(59.387 161.567)" fill="none" stroke="#574809" strokeWidth="7"/>
                     <line id="Line_22" dataname="Line 22" y2="10.908" transform="translate(91.458 161.567)" fill="none" stroke="#574809" strokeWidth="7"/>
                     <line id="Line_20" dataname="Line 20" x2="7.085" y2="4.848" transform="translate(60.133 163.152)" fill="none" stroke="#574809" strokeWidth="7"/>
                     <line id="Line_23" dataname="Line 23" x2="7.085" y2="4.848" transform="translate(92.203 163.152)" fill="none" stroke="#574809" strokeWidth="7"/>
                     <ellipse id="Ellipse_2" dataname="Ellipse 2" cx="59.294" cy="47.92" rx="59.294" ry="47.92" transform="translate(14.823 0)" fill="#ffd230"/>
                     <ellipse id="Ellipse_3" dataname="Ellipse 3" cx="66.566" cy="53.7" rx="66.566" ry="53.7" transform="translate(7.738 48.106)" fill="#ffd230"/>
                     <path id="Polygon_1" dataname="Polygon 1" d="M17.9,0,35.8,16.408H0Z" transform="translate(56.217 32.817)" fill="#f70"/>
                     <ellipse id="Ellipse_4" dataname="Ellipse 4" cx="5.221" cy="5.407" rx="5.221" ry="5.407" transform="translate(43.165 30.206)"/>
                     <ellipse id="Ellipse_5" dataname="Ellipse 5" cx="5.221" cy="5.407" rx="5.221" ry="5.407" transform="translate(96.492 30.206)"/>
                     <path id="Path_10" dataname="Path 10" d="M40.939,0s7.782,13.279,7.782,26.563A24.053,24.053,0,0,1,24.667,50.616C11.383,50.616,0,41.221,0,41.221s14.275-13.383,20.288-19.4S40.939,0,40.939,0Z" transform="matrix(-0.454, 0.891, -0.891, -0.454, 67.218, 91.591)" fill="coral"/>
                     <path id="Path_11" dataname="Path 11" d="M40.939,50.616s7.782-13.279,7.782-26.563A24.053,24.053,0,0,0,24.667,0C11.383,0,0,9.395,0,9.395s14.275,13.383,20.288,19.4S40.939,50.616,40.939,50.616Z" transform="translate(131.19 68.612) rotate(70)" fill="coral"/>
                     </g>
                     <g id="Group_23" dataname="Group 23" transform="translate(-2319.532 5852.489) rotate(16)">
                     <g id="Group_22" dataname="Group 22" transform="translate(0 0)">
                        <path id="Union_1" dataname="Union 1" d="M31.546,37.7a9.615,9.615,0,0,1-2.3-.676A13.684,13.684,0,0,1,26.859,35.7a16.626,16.626,0,0,1-2.315-1.935,17.04,17.04,0,0,1-1.316-1.477,15.51,15.51,0,0,1-1.069-1.532,13.323,13.323,0,0,1-.811-1.543c-.149-.338-.28-.675-.39-1.008-.11.333-.24.67-.39,1.008a13.329,13.329,0,0,1-.811,1.543,15.518,15.518,0,0,1-1.069,1.532,17.041,17.041,0,0,1-1.316,1.477A16.591,16.591,0,0,1,15,35.74a13.537,13.537,0,0,1-2.447,1.336,9.35,9.35,0,0,1-2.345.65,5.572,5.572,0,0,1-2.067-.085L11.9,31.1,5.555,35.051a5.588,5.588,0,0,1-.081-2.066,9.368,9.368,0,0,1,.651-2.343A13.545,13.545,0,0,1,7.462,28.2a16.591,16.591,0,0,1,1.973-2.371,17.029,17.029,0,0,1,1.477-1.316,15.517,15.517,0,0,1,1.532-1.069,13.521,13.521,0,0,1,1.3-.7l-.018-.084a10.821,10.821,0,0,1-1.452.022,13.32,13.32,0,0,1-1.731-.2,15.515,15.515,0,0,1-1.814-.449,17.033,17.033,0,0,1-1.851-.7,16.644,16.644,0,0,1-2.6-1.443A13.769,13.769,0,0,1,2.2,18.161,9.78,9.78,0,0,1,.746,16.288,6.013,6.013,0,0,1,0,14.4L8.253,15.69,1.594,10.656A5.841,5.841,0,0,1,3.5,9.9a9.616,9.616,0,0,1,2.389-.193,13.684,13.684,0,0,1,2.705.383,16.628,16.628,0,0,1,2.854.977,17.038,17.038,0,0,1,1.758.907,15.517,15.517,0,0,1,1.547,1.047q.357.275.689.566-.087-.3-.162-.608a15.514,15.514,0,0,1-.327-1.84,17.036,17.036,0,0,1-.114-1.975A16.64,16.64,0,0,1,15.1,6.208a13.768,13.768,0,0,1,.729-2.6,9.777,9.777,0,0,1,1.117-2.094A6.012,6.012,0,0,1,18.369.066l2.175,8.065L22.435,0A5.842,5.842,0,0,1,23.9,1.434a9.62,9.62,0,0,1,1.148,2.1,13.683,13.683,0,0,1,.75,2.627,16.626,16.626,0,0,1,.269,3,17.038,17.038,0,0,1-.114,1.975,15.514,15.514,0,0,1-.327,1.84l-.032.13q.247-.209.508-.41a15.516,15.516,0,0,1,1.547-1.047,17.025,17.025,0,0,1,1.758-.907,16.641,16.641,0,0,1,2.811-.966,13.772,13.772,0,0,1,2.67-.391,9.781,9.781,0,0,1,2.367.169,6.012,6.012,0,0,1,1.9.711L32.673,15.54l8.2-1.58a5.84,5.84,0,0,1-.715,1.918,9.617,9.617,0,0,1-1.455,1.9,13.68,13.68,0,0,1-2.1,1.754A16.622,16.622,0,0,1,33.969,21a17.03,17.03,0,0,1-1.851.7,15.5,15.5,0,0,1-1.814.449,13.321,13.321,0,0,1-1.731.2,10.93,10.93,0,0,1-1.345-.014v0q.349.127.7.283a13.324,13.324,0,0,1,1.543.811A15.513,15.513,0,0,1,31,24.512a17.027,17.027,0,0,1,1.477,1.316,16.644,16.644,0,0,1,1.909,2.278,13.771,13.771,0,0,1,1.321,2.352,9.78,9.78,0,0,1,.691,2.271,6.012,6.012,0,0,1,.019,2.033L29.181,30.6l4.412,7.087a5.148,5.148,0,0,1-1.033.1A6.733,6.733,0,0,1,31.546,37.7Z" transform="matrix(0.978, 0.208, -0.208, 0.978, 7.856, 0)" fill="#ffb8b8"/>
                     </g>
                     <circle id="Ellipse_46" dataname="Ellipse 46" cx="6.899" cy="6.899" r="6.899" transform="translate(17.247 17.486)" fill="#fff"/>
                     </g>
                     <ellipse id="Ellipse_49" dataname="Ellipse 49" cx="11.188" cy="5.967" rx="11.188" ry="5.967" transform="translate(-2319.545 5920.178)" fill="rgba(188,13,43,0.22)" opacity="0.57"/>
                     <ellipse id="Ellipse_50" dataname="Ellipse 50" cx="11.188" cy="5.967" rx="11.188" ry="5.967" transform="translate(-2379.771 5920.178)" fill="rgba(188,13,43,0.22)" opacity="0.57"/>
                  </g>

               </g>
               </svg>

               </li>
               
               <li id="licard8">
               <svg width="220" height="200" viewBox="0 0 373 336">
               <defs>
                  <filter id="Path_750" x="0" y="0" width="373" height="336" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
               </defs>
               <g id="card8" transform="translate(-1317 -287)">
                  <g transform="matrix(1, 0, 0, 1, 1317, 287)" filter="url(#Path_750)">
                     <path id="Path_750-2" dataname="Path 750" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <path id="Icon_simple-cashapp" dataname="Icon simple-cashapp" d="M35.385,5.2A7.65,7.65,0,0,0,30.81.63C28.845,0,27.06,0,23.43,0H12.54C8.94,0,7.125,0,5.19.6A7.65,7.65,0,0,0,.615,5.19C0,7.14,0,8.94,0,12.54v10.9c0,3.615,0,5.4.6,7.35A7.65,7.65,0,0,0,5.175,35.37c1.95.615,3.75.615,7.35.615h10.92c3.615,0,5.415,0,7.35-.6a7.65,7.65,0,0,0,4.59-4.59c.615-1.95.615-3.75.615-7.35V12.57c0-3.615,0-5.415-.615-7.365ZM26.13,12.15l-1.4,1.4a.75.75,0,0,1-1,.015,7.5,7.5,0,0,0-4.83-1.77c-1.455,0-2.91.48-2.91,1.815s1.56,1.8,3.36,2.475c3.15,1.05,5.76,2.37,5.76,5.46,0,3.36-2.61,5.67-6.87,5.925l-.39,1.8a.735.735,0,0,1-.72.585H14.445l-.135-.015a.75.75,0,0,1-.57-.885l.42-1.905A9.81,9.81,0,0,1,9.84,24.69v-.015a.72.72,0,0,1,0-1.02l1.5-1.455a.735.735,0,0,1,1.005,0,7.254,7.254,0,0,0,5.085,1.98c1.95,0,3.255-.825,3.255-2.13s-1.32-1.65-3.81-2.58c-2.64-.945-5.145-2.28-5.145-5.4,0-3.63,3.015-5.4,6.585-5.565L18.69,6.66a.72.72,0,0,1,.72-.57h2.67l.15.015a.718.718,0,0,1,.555.855L22.38,9.015A11.257,11.257,0,0,1,26.1,11.1l.03.03a.715.715,0,0,1,0,1.02Z" transform="translate(1355.365 546.007)" fill="#dec646"/>
                  <text id="_300" dataname="300" transform="translate(1404 579)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">300</tspan></text>
                  <text id="眼鏡" transform="translate(1339 350)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">眼鏡</tspan></text>
                  <g id="眼鏡" transform="translate(1221)" data-furnid="glasses" style={{cursor:"pointer" ,display:funitureBuy.glasses}} onClick={buying}>
                     <a href="#">
                     <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                     <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                     </a>
                  </g>
                  {/* 眼鏡 */}
                  <g id="眼鏡-2" dataname="眼鏡" transform="translate(537.204 20.359)">
                     <g id="Ellipse_41" dataname="Ellipse 41" transform="translate(840.435 361.22)" fill="#dbdbdb" stroke="#707070" strokeWidth="10">
                     <ellipse cx="51.767" cy="51.767" rx="51.767" ry="51.767" stroke="none"/>
                     <ellipse cx="51.767" cy="51.767" rx="46.767" ry="46.767" fill="none"/>
                     </g>
                     <g id="Ellipse_42" dataname="Ellipse 42" transform="translate(989.618 361.22)" fill="#dbdbdb" stroke="#707070" strokeWidth="10">
                     <ellipse cx="51.269" cy="51.767" rx="51.269" ry="51.767" stroke="none"/>
                     <ellipse cx="51.269" cy="51.767" rx="46.269" ry="46.767" fill="none"/>
                     </g>
                     <path id="Path_34" dataname="Path 34" d="M.186-9.79s12.558-9.476,23.993-9.476S45.835-9.79,45.835-9.79" transform="translate(943.783 422.777)" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="10"/>
                  </g>
                  
               </g>
               </svg>

               </li>
            </ul>
            </div> 

            <div id="rightSide" onClick={props.showtoggle}>
               <div id="nextBtns">
               <svg width="63" height="63" viewBox="0 0 63 63">
               <g id="nextBtn" transform="translate(-1843 -597)">
               <a href="#">
                  <circle id="Ellipse_64" dataname="Ellipse 64" cx="31.5" cy="31.5" r="31.5" transform="translate(1843 597)" fill="#fff"/>
                  <path id="Icon_ionic-ios-arrow-forward" dataname="Icon ionic-ios-arrow-forward" d="M24.9,23.284,11.964,10.357a2.433,2.433,0,0,1,0-3.451,2.464,2.464,0,0,1,3.461,0L30.082,21.553a2.439,2.439,0,0,1,.071,3.369L15.435,39.671a2.444,2.444,0,1,1-3.461-3.451Z" transform="translate(1853.48 605.21)" fill="#d1cbcb"/>
               </a>
               </g>
               </svg>
               </div>
            </div>  
            
            <div id="storeModal" style={{display:modalShow}}>


            <svg width="100%" viewBox="0 0 1271 808">
            <defs>
               <filter id="Rectangle_104" x="0" y="51" width="1239" height="757" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha"/>
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feFlood floodOpacity="0.161"/>
                  <feComposite operator="in" in2="blur"/>
                  <feComposite in="SourceGraphic"/>
               </filter>
               <filter id="Rectangle_104-2" x="0" y="51" width="1239" height="757" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha"/>
                  <feGaussianBlur stdDeviation="3" result="blur-2"/>
                  <feFlood floodOpacity="0.161" result="color"/>
                  <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
                  <feComposite operator="in" in="color"/>
                  <feComposite operator="in" in2="SourceGraphic"/>
               </filter>
            </defs>
            <g id="modal" transform="translate(-369 -166)">
               <g data-type="innerShadowGroup">
                  <g transform="matrix(1, 0, 0, 1, 369, 166)" filter="url(#Rectangle_104)">
                  <rect id="Rectangle_104-3" dataname="Rectangle 104" width="1221" height="739" rx="30" transform="translate(9 57)" fill="#faf3e2"/>
                  </g>
                  <g transform="matrix(1, 0, 0, 1, 369, 166)" filter="url(#Rectangle_104-2)">
                  <rect id="Rectangle_104-4" dataname="Rectangle 104" width="1221" height="739" rx="30" transform="translate(9 57)" fill="#fff"/>
                  </g>
               </g>
               <text id="確定購買燈串_" dataname="確定購買燈串？" transform="translate(652 526)" fill="#520707" fontSize="100" fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600"><tspan x="0" y="0">確定購買{furName}？</tspan></text>
               <g id="是_按鈕" dataname="是 按鈕" transform="translate(-47)" style={{cursor:"pointer"}} onClick={comfirmBuying}>
                  <rect id="Rectangle_106" dataname="Rectangle 106" width="325" height="142" rx="30" transform="translate(635 765)" fill="#3e88a8"/>
                  <text id="是" transform="translate(748 865)" fill="#fff" fontSize="100" fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600"><tspan x="0" y="0">是</tspan></text>
               </g>
               <g id="否_按鈕" dataname="否 按鈕" transform="translate(-56)" style={{cursor:"pointer"}} onClick={()=>{setModalShow("none")}}>
                  <rect id="Rectangle_105" dataname="Rectangle 105" width="325" height="142" rx="30" transform="translate(1109 765)" fill="#ac4c4c"/>
                  <text id="否" transform="translate(1222 865)" fill="#fff" fontSize="100" fontFamily="'\.PingFangTC-Semibold', '\.PingFang TC'" fontWeight="600"><tspan x="0" y="0">否</tspan></text>
               </g>
               <g id="關閉按鈕" transform="translate(-248 137)" style={{cursor:"pointer"}} onClick={()=>{setModalShow("none")}}>
                  <g id="Ellipse_61" dataname="Ellipse 61" transform="translate(1742 29)" fill="#256170" stroke="#707070" strokeWidth="1">
                  <circle cx="73" cy="73" r="73" stroke="none"/>
                  <circle cx="73" cy="73" r="72.5" fill="none"/>
                  </g>
                  <path id="Icon_ionic-md-close" dataname="Icon ionic-md-close" d="M93.023,16.073,84.474,7.523l-34.2,34.2-34.2-34.2L7.523,16.073l34.2,34.2-34.2,34.2,8.549,8.549,34.2-34.2,34.2,34.2,8.549-8.549-34.2-34.2Z" transform="translate(1764.727 51.727)" fill="#fff"/>
               </g>
            </g>
            </svg>


            </div>


            <div id="comfirmInfoModal" style={{display:comfirmInfo}}>
            <svg width="100%" viewBox="0 0 1271 808">
            <defs>
               <filter id="Rectangle_104" x="0" y="51" width="1239" height="757" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha"/>
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feFlood flood-opacity="0.161"/>
                  <feComposite operator="in" in2="blur"/>
                  <feComposite in="SourceGraphic"/>
               </filter>
               <filter id="Rectangle_104-2" x="0" y="51" width="1239" height="757" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha"/>
                  <feGaussianBlur stdDeviation="3" result="blur-2"/>
                  <feFlood flood-opacity="0.161" result="color"/>
                  <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
                  <feComposite operator="in" in="color"/>
                  <feComposite operator="in" in2="SourceGraphic"/>
               </filter>
            </defs>
            <g id="modal" transform="translate(-369 -166)">
               <g data-type="innerShadowGroup">
                  <g transform="matrix(1, 0, 0, 1, 369, 166)" filter="url(#Rectangle_104)">
                  <rect id="Rectangle_104-3" data-name="Rectangle 104" width="1221" height="739" rx="30" transform="translate(9 57)" fill="#faf3e2"/>
                  </g>
                  <g transform="matrix(1, 0, 0, 1, 369, 166)" filter="url(#Rectangle_104-2)">
                  <rect id="Rectangle_104-4" data-name="Rectangle 104" width="1221" height="739" rx="30" transform="translate(9 57)" fill="#fff"/>
                  </g>
               </g>
               <text id="已成功購買" transform="translate(738 558)" fill="#520707" font-size="100" font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600"><tspan x="0" y="0">已成功購買</tspan></text>
               <path id="Icon_awesome-check" data-name="Icon awesome-check" d="M52.81,118.248,2.277,67.715a7.775,7.775,0,0,1,0-10.995L13.271,45.726a7.774,7.774,0,0,1,10.995,0L58.307,79.767,131.221,6.854a7.775,7.775,0,0,1,10.995,0L153.21,17.849a7.775,7.775,0,0,1,0,10.995L63.8,118.249A7.774,7.774,0,0,1,52.81,118.248Z" transform="translate(913 682.475)" fill="#50b6c2"/>
               <g id="關閉按鈕" transform="translate(-248 137)" style={{display:comfirmInfo, cursor:"pointer"}} onClick={()=>{setcomfirmInfo("none");window.location.reload()}}>
                  <g id="Ellipse_61" data-name="Ellipse 61" transform="translate(1742 29)" fill="#256170" stroke="#707070" stroke-width="1">
                  <circle cx="73" cy="73" r="73" stroke="none"/>
                  <circle cx="73" cy="73" r="72.5" fill="none"/>
                  </g>
                  <path id="Icon_ionic-md-close" data-name="Icon ionic-md-close" d="M93.023,16.073,84.474,7.523l-34.2,34.2-34.2-34.2L7.523,16.073l34.2,34.2-34.2,34.2,8.549,8.549,34.2-34.2,34.2,34.2,8.549-8.549-34.2-34.2Z" transform="translate(1764.727 51.727)" fill="#fff"/>
               </g>
            </g>
            </svg>

            </div>
            

          
            

         </div>
         

         
      </div>
   
   
   );
} 

      
   
export default GameStoreFirstPage;