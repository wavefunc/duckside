// ----- 晴暄----- //

import "../css/GameStoreSecondPage_style.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";;



let GameStoreSecondPage = (props) =>{
   const [modalShow, setModalShow] = useState("none");
   const [comfirmInfo, setcomfirmInfo] = useState("none");
   const [funiture, setfuniture] = useState("");
   const [furName, setfurName] = useState("")
   // const [upToDate, setupToDate] = useState(true);
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
      <div id="container" className="row" style={{display:props.show}} >
         <div className="col-lg-12">
            <div id="leftSide" onClick={props.showtoggle}>
            <svg width="63" height="63" viewBox="0 0 63 63">
            <g id="prevBtn" transform="translate(-1843 -597)">
               <a href="#">
               <circle id="Ellipse_64" dataname="Ellipse 64" cx="31.5" cy="31.5" r="31.5" transform="translate(1843 597)" fill="#fff"/>
               <path id="Icon_ionic-ios-arrow-forward" dataname="Icon ionic-ios-arrow-forward" d="M24.9,23.284,11.964,10.357a2.433,2.433,0,0,1,0-3.451,2.464,2.464,0,0,1,3.461,0L30.082,21.553a2.439,2.439,0,0,1,.071,3.369L15.435,39.671a2.444,2.444,0,1,1-3.461-3.451Z" transform="translate(1895.52 651.79) rotate(180)" fill="#d1cbcb"/>
               </a>
            </g>
            </svg>

            </div>
            <ul id="centerSide">
               <li id="licard21">
               <svg width="220" height="200" viewBox="0 0 373 336">
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
                  <text id="_400" dataname="400" transform="translate(594 579)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">400</tspan></text>
                  <text id="時鐘" transform="translate(529 350)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">時鐘</tspan></text>
                  <g id="時鐘" transform="translate(411)" data-furnid="clock" style={{cursor:"pointer" ,display:funitureBuy.clock}} onClick={buying}>
                     <a href="#">
                     <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                     <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                     </a>
                  </g>
                  {/* 時鐘 */}
                  <g id="時鐘-2" dataname="時鐘" transform="translate(1261 -3111.826)">
                     <circle id="Ellipse_57" dataname="Ellipse 57" cx="86" cy="86" r="86" transform="translate(-660 3471.826)" fill="#464444" opacity="0.88"/>
                     <line id="Line_30" dataname="Line 30" y1="48.63" x2="44.339" transform="translate(-574.54 3509.737)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="10"/>
                     <line id="Line_31" dataname="Line 31" y1="15.018" x2="43.624" transform="translate(-618.164 3558.366)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="10"/>
                  </g>

               </g>
               </svg>

               </li> 


               <li id="licard22">
               <svg width="220" height="200" viewBox="0 0 373 336">
               <defs>
                  <filter id="Path_750" x="0" y="0" width="373" height="336" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur"/>
                     <feFlood floodOpacity="0.161"/>
                     <feComposite operator="in" in2="blur"/>
                     <feComposite in="SourceGraphic"/>
                  </filter>
                  <filter id="Rectangle_84">
                     <feOffset dy="-30" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-2"/>
                     <feFlood floodColor="#262626" floodOpacity="0.059" result="color"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
                     <feComposite operator="in" in="color"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
                  <filter id="Rectangle_85">
                     <feOffset dy="-30" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-3"/>
                     <feFlood floodOpacity="0.102" result="color-2"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-3"/>
                     <feComposite operator="in" in="color-2"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
                  <filter id="Rectangle_86">
                     <feOffset dy="-30" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-4"/>
                     <feFlood floodOpacity="0.102" result="color-3"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-4"/>
                     <feComposite operator="in" in="color-3"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
                  <filter id="Rectangle_87">
                     <feOffset dy="-30" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-5"/>
                     <feFlood floodOpacity="0.102" result="color-4"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-5"/>
                     <feComposite operator="in" in="color-4"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
                  <filter id="Rectangle_88">
                     <feOffset dy="-30" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-6"/>
                     <feFlood floodOpacity="0.102" result="color-5"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-6"/>
                     <feComposite operator="in" in="color-5"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
                  <filter id="Rectangle_89">
                     <feOffset dy="-30" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-7"/>
                     <feFlood floodOpacity="0.102" result="color-6"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-7"/>
                     <feComposite operator="in" in="color-6"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
                  <filter id="Rectangle_90">
                     <feOffset dy="-30" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-8"/>
                     <feFlood floodOpacity="0.102" result="color-7"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-8"/>
                     <feComposite operator="in" in="color-7"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
                  <filter id="Rectangle_91">
                     <feOffset dy="-30" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-9"/>
                     <feFlood floodColor="#262626" floodOpacity="0.059" result="color-8"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-9"/>
                     <feComposite operator="in" in="color-8"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
                  <filter id="Rectangle_92">
                     <feOffset dy="-30" input="SourceAlpha"/>
                     <feGaussianBlur stdDeviation="3" result="blur-10"/>
                     <feFlood floodColor="#262626" floodOpacity="0.059" result="color-9"/>
                     <feComposite operator="out" in="SourceGraphic" in2="blur-10"/>
                     <feComposite operator="in" in="color-9"/>
                     <feComposite operator="in" in2="SourceGraphic"/>
                  </filter>
               </defs>
               <g id="card3" transform="translate(-1317 -287)">
                  <g transform="matrix(1, 0, 0, 1, 1317, 287)" filter="url(#Path_750)">
                     <path id="Path_750-2" dataname="Path 750" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <path id="Icon_simple-cashapp" dataname="Icon simple-cashapp" d="M35.385,5.2A7.65,7.65,0,0,0,30.81.63C28.845,0,27.06,0,23.43,0H12.54C8.94,0,7.125,0,5.19.6A7.65,7.65,0,0,0,.615,5.19C0,7.14,0,8.94,0,12.54v10.9c0,3.615,0,5.4.6,7.35A7.65,7.65,0,0,0,5.175,35.37c1.95.615,3.75.615,7.35.615h10.92c3.615,0,5.415,0,7.35-.6a7.65,7.65,0,0,0,4.59-4.59c.615-1.95.615-3.75.615-7.35V12.57c0-3.615,0-5.415-.615-7.365ZM26.13,12.15l-1.4,1.4a.75.75,0,0,1-1,.015,7.5,7.5,0,0,0-4.83-1.77c-1.455,0-2.91.48-2.91,1.815s1.56,1.8,3.36,2.475c3.15,1.05,5.76,2.37,5.76,5.46,0,3.36-2.61,5.67-6.87,5.925l-.39,1.8a.735.735,0,0,1-.72.585H14.445l-.135-.015a.75.75,0,0,1-.57-.885l.42-1.905A9.81,9.81,0,0,1,9.84,24.69v-.015a.72.72,0,0,1,0-1.02l1.5-1.455a.735.735,0,0,1,1.005,0,7.254,7.254,0,0,0,5.085,1.98c1.95,0,3.255-.825,3.255-2.13s-1.32-1.65-3.81-2.58c-2.64-.945-5.145-2.28-5.145-5.4,0-3.63,3.015-5.4,6.585-5.565L18.69,6.66a.72.72,0,0,1,.72-.57h2.67l.15.015a.718.718,0,0,1,.555.855L22.38,9.015A11.257,11.257,0,0,1,26.1,11.1l.03.03a.715.715,0,0,1,0,1.02Z" transform="translate(1355.365 546.007)" fill="#dec646"/>
                  <text id="_1200" dataname="1200" transform="translate(1404 579)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">1200</tspan></text>
                  <text id="舉重槓" transform="translate(1339 350)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC" opacity="0.83"><tspan x="0" y="0">舉重槓</tspan></text>
                  <g id="舉重槓" transform="translate(1221)" data-furnid="weight" style={{cursor:"pointer" ,display:funitureBuy.weight}} onClick={buying}>
                     <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                     <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                  </g>
                  <g id="舉重槓-2" dataname="舉重槓" transform="translate(3283 -3340.028)">
                     <g id="Group_28" dataname="Group 28" transform="translate(-1914 3730)">
                     <g datatype="innerShadowGroup">
                        <rect id="Rectangle_84-2" dataname="Rectangle 84" width="127" height="20" transform="translate(71 45.028)" fill="#aeaeae"/>
                        <g transform="matrix(1, 0, 0, 1, -52, -102.97)" filter="url(#Rectangle_84)">
                           <rect id="Rectangle_84-3" dataname="Rectangle 84" width="127" height="20" transform="translate(123 148)" fill="#fff"/>
                        </g>
                     </g>
                     <g datatype="innerShadowGroup">
                        <rect id="Rectangle_85-2" dataname="Rectangle 85" width="23" height="111" rx="11.5" transform="translate(48 0.028)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -52, -102.97)" filter="url(#Rectangle_85)">
                           <rect id="Rectangle_85-3" dataname="Rectangle 85" width="23" height="111" rx="11.5" transform="translate(100 103)" fill="#fff"/>
                        </g>
                     </g>
                     <g datatype="innerShadowGroup">
                        <rect id="Rectangle_86-2" dataname="Rectangle 86" width="23" height="111" rx="11.5" transform="translate(198 0.028)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -52, -102.97)" filter="url(#Rectangle_86)">
                           <rect id="Rectangle_86-3" dataname="Rectangle 86" width="23" height="111" rx="11.5" transform="translate(250 103)" fill="#fff"/>
                        </g>
                     </g>
                     <g datatype="innerShadowGroup">
                        <rect id="Rectangle_87-2" dataname="Rectangle 87" width="19" height="90" rx="9.5" transform="translate(221 10.028)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -52, -102.97)" filter="url(#Rectangle_87)">
                           <rect id="Rectangle_87-3" dataname="Rectangle 87" width="19" height="90" rx="9.5" transform="translate(273 113)" fill="#fff"/>
                        </g>
                     </g>
                     <g datatype="innerShadowGroup">
                        <rect id="Rectangle_88-2" dataname="Rectangle 88" width="19" height="90" rx="9.5" transform="translate(29 10.028)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -52, -102.97)" filter="url(#Rectangle_88)">
                           <rect id="Rectangle_88-3" dataname="Rectangle 88" width="19" height="90" rx="9.5" transform="translate(81 113)" fill="#fff"/>
                        </g>
                     </g>
                     <g datatype="innerShadowGroup">
                        <rect id="Rectangle_89-2" dataname="Rectangle 89" width="14" height="66" rx="7" transform="translate(240 22.028)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -52, -102.97)" filter="url(#Rectangle_89)">
                           <rect id="Rectangle_89-3" dataname="Rectangle 89" width="14" height="66" rx="7" transform="translate(292 125)" fill="#fff"/>
                        </g>
                     </g>
                     <g datatype="innerShadowGroup">
                        <rect id="Rectangle_90-2" dataname="Rectangle 90" width="13" height="66" rx="6.5" transform="translate(16 22.028)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -52, -102.97)" filter="url(#Rectangle_90)">
                           <rect id="Rectangle_90-3" dataname="Rectangle 90" width="13" height="66" rx="6.5" transform="translate(68 125)" fill="#fff"/>
                        </g>
                     </g>
                     <g datatype="innerShadowGroup">
                        <path id="Rectangle_91-2" dataname="Rectangle 91" d="M0,0H4.2A10.8,10.8,0,0,1,15,10.8v0A9.2,9.2,0,0,1,5.8,20H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(254 45.028)" fill="#aeaeae"/>
                        <g transform="matrix(1, 0, 0, 1, -52, -102.97)" filter="url(#Rectangle_91)">
                           <path id="Rectangle_91-3" dataname="Rectangle 91" d="M0,0H4.2A10.8,10.8,0,0,1,15,10.8v0A9.2,9.2,0,0,1,5.8,20H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(306 148)" fill="#fff"/>
                        </g>
                     </g>
                     <g datatype="innerShadowGroup">
                        <path id="Rectangle_92-2" dataname="Rectangle 92" d="M10.8,0H16a0,0,0,0,1,0,0V20a0,0,0,0,1,0,0H9.2A9.2,9.2,0,0,1,0,10.8v0A10.8,10.8,0,0,1,10.8,0Z" transform="translate(0 45.028)" fill="#aeaeae"/>
                        <g transform="matrix(1, 0, 0, 1, -52, -102.97)" filter="url(#Rectangle_92)">
                           <path id="Rectangle_92-3" dataname="Rectangle 92" d="M10.8,0H16a0,0,0,0,1,0,0V20a0,0,0,0,1,0,0H9.2A9.2,9.2,0,0,1,0,10.8v0A10.8,10.8,0,0,1,10.8,0Z" transform="translate(52 148)" fill="#fff"/>
                        </g>
                     </g>
                     </g>
                     <rect id="Rectangle_93" dataname="Rectangle 93" width="3" height="19" rx="1.5" transform="translate(-1863 3744.028)" fill="#8d8d8d"/>
                     <rect id="Rectangle_94" dataname="Rectangle 94" width="3" height="18" rx="1.5" transform="translate(-1882 3754.028)" fill="#8d8d8d"/>
                     <rect id="Rectangle_95" dataname="Rectangle 95" width="3" height="7" rx="1.5" transform="translate(-1863 3765.028)" fill="#8d8d8d"/>
                     <rect id="Rectangle_96" dataname="Rectangle 96" width="3" height="19" rx="1.5" transform="translate(-1698 3744.028)" fill="#8d8d8d"/>
                     <rect id="Rectangle_97" dataname="Rectangle 97" width="4" height="19" rx="2" transform="translate(-1680 3750.028)" fill="#8d8d8d"/>
                     <rect id="Rectangle_98" dataname="Rectangle 98" width="3" height="7" rx="1.5" transform="translate(-1698 3766.028)" fill="#8d8d8d"/>
                  </g>
               </g>
               </svg>


               </li>
               <li id="licard23">
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
                    {/* 畫像 */}
                    <g id="畫像" transform="translate(1149.529 263.316)">
                    <path id="Path_24" dataname="Path 24" d="M4.383,29.945,80.632-2.11" transform="translate(266.303 67.963)" fill="none" stroke="#ea9c42" strokeLinecap="round" strokeWidth="6"/>
                    <path id="Path_27" dataname="Path 27" d="M79.423,31.088,0,0" transform="translate(346.889 66.011)" fill="none" stroke="#ea9c42" strokeLinecap="round" strokeWidth="6"/>
                    <g id="Path_26" dataname="Path 26" transform="translate(267 94.74)" fill="#763505" strokeLinecap="round">
                        <path d="M 162.4256439208984 173.4447784423828 L 0.4999958872795105 173.4447784423828 L 0.4999958872795105 0.5000120401382446 L 162.4256439208984 0.5000120401382446 L 162.4256439208984 173.4447784423828 Z" stroke="none"/>
                        <path d="M 1 1 L 1 172.9447631835938 L 161.9256439208984 172.9447631835938 L 161.9256439208984 1 L 1 1 M 0 0 L 162.9256439208984 0 L 162.9256439208984 173.9447631835938 L 0 173.9447631835938 L 0 0 Z" stroke="none" fill="#707070"/>
                    </g>
                    <g id="Path_25" dataname="Path 25" transform="translate(277.232 106.546)" fill="#eddbbe" strokeLinecap="round">
                        <path d="M 141.1744689941406 150.6194305419922 L 0.4999944865703583 150.6194305419922 L 0.4999944865703583 0.4999952614307404 L 141.1744689941406 0.4999952614307404 L 141.1744689941406 150.6194305419922 Z" stroke="none"/>
                        <path d="M 1 1 L 1 150.1194305419922 L 140.6744689941406 150.1194305419922 L 140.6744689941406 1 L 1 1 M 0 0 L 141.6744689941406 0 L 141.6744689941406 151.1194305419922 L 0 151.1194305419922 L 0 0 Z" stroke="none" fill="#707070"/>
                    </g>
                    <ellipse id="Ellipse_39" dataname="Ellipse 39" cx="5.273" cy="6.232" rx="5.273" ry="6.232" transform="translate(341.78 59.684)" fill="#400202"/>
                    <g id="鴨子" transform="translate(278.696 116.366)">
                        <line id="Line_17" dataname="Line 17" y2="8.891" transform="translate(59.226 117.163)" fill="none" stroke="#574809" strokeWidth="4"/>
                        <line id="Line_21" dataname="Line 21" y2="8.891" transform="translate(83.892 117.163)" fill="none" stroke="#574809" strokeWidth="4"/>
                        <line id="Line_18" dataname="Line 18" x1="5.449" y2="4.302" transform="translate(53.203 125.48)" fill="none" stroke="#574809" strokeWidth="4"/>
                        <line id="Line_24" dataname="Line 24" x1="5.449" y2="4.302" transform="translate(77.869 125.48)" fill="none" stroke="#574809" strokeWidth="4"/>
                        <line id="Line_19" dataname="Line 19" y2="8.389" transform="translate(59.226 124.262)" fill="none" stroke="#574809" strokeWidth="4"/>
                        <line id="Line_22" dataname="Line 22" y2="8.389" transform="translate(83.892 124.262)" fill="none" stroke="#574809" strokeWidth="4"/>
                        <line id="Line_20" dataname="Line 20" x2="5.449" y2="3.729" transform="translate(59.8 125.48)" fill="none" stroke="#574809" strokeWidth="4"/>
                        <line id="Line_23" dataname="Line 23" x2="5.449" y2="3.729" transform="translate(84.466 125.48)" fill="none" stroke="#574809" strokeWidth="4"/>
                        <ellipse id="Ellipse_2" dataname="Ellipse 2" cx="45.603" cy="36.855" rx="45.603" ry="36.855" transform="translate(24.952 0)" fill="#ffd230"/>
                        <ellipse id="Ellipse_3" dataname="Ellipse 3" cx="51.196" cy="41.301" rx="51.196" ry="41.301" transform="translate(19.503 36.999)" fill="#ffd230"/>
                        <path id="Polygon_1" dataname="Polygon 1" d="M13.767,0,27.534,12.62H0Z" transform="translate(56.788 25.239)" fill="#f70"/>
                        <ellipse id="Ellipse_4" dataname="Ellipse 4" cx="4.015" cy="4.159" rx="4.015" ry="4.159" transform="translate(46.75 23.232)"/>
                        <ellipse id="Ellipse_5" dataname="Ellipse 5" cx="4.015" cy="4.159" rx="4.015" ry="4.159" transform="translate(87.764 23.232)"/>
                        <path id="Path_10" dataname="Path 10" d="M31.486,0s5.985,10.213,5.985,20.43a18.5,18.5,0,0,1-18.5,18.5C8.755,38.929,0,31.7,0,31.7S10.979,21.411,15.6,16.786,31.486,0,31.486,0Z" transform="matrix(0.961, 0.276, -0.276, 0.961, 10.73, 49.836)" fill="#574809"/>
                        <path id="Path_11" dataname="Path 11" d="M31.486,38.929s5.985-10.213,5.985-20.43A18.5,18.5,0,0,0,18.972,0C8.755,0,0,7.226,0,7.226S10.979,17.518,15.6,22.143,31.486,38.929,31.486,38.929Z" transform="translate(139.533 87.257) rotate(164)" fill="#574804"/>
                    </g>
                    </g>
                    <text id="畫" transform="translate(1350 345)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">畫</tspan></text>
                    <path id="Icon_simple-cashapp" dataname="Icon simple-cashapp" d="M35.385,5.2A7.65,7.65,0,0,0,30.81.63C28.845,0,27.06,0,23.43,0H12.54C8.94,0,7.125,0,5.19.6A7.65,7.65,0,0,0,.615,5.19C0,7.14,0,8.94,0,12.54v10.9c0,3.615,0,5.4.6,7.35A7.65,7.65,0,0,0,5.175,35.37c1.95.615,3.75.615,7.35.615h10.92c3.615,0,5.415,0,7.35-.6a7.65,7.65,0,0,0,4.59-4.59c.615-1.95.615-3.75.615-7.35V12.57c0-3.615,0-5.415-.615-7.365ZM26.13,12.15l-1.4,1.4a.75.75,0,0,1-1,.015,7.5,7.5,0,0,0-4.83-1.77c-1.455,0-2.91.48-2.91,1.815s1.56,1.8,3.36,2.475c3.15,1.05,5.76,2.37,5.76,5.46,0,3.36-2.61,5.67-6.87,5.925l-.39,1.8a.735.735,0,0,1-.72.585H14.445l-.135-.015a.75.75,0,0,1-.57-.885l.42-1.905A9.81,9.81,0,0,1,9.84,24.69v-.015a.72.72,0,0,1,0-1.02l1.5-1.455a.735.735,0,0,1,1.005,0,7.254,7.254,0,0,0,5.085,1.98c1.95,0,3.255-.825,3.255-2.13s-1.32-1.65-3.81-2.58c-2.64-.945-5.145-2.28-5.145-5.4,0-3.63,3.015-5.4,6.585-5.565L18.69,6.66a.72.72,0,0,1,.72-.57h2.67l.15.015a.718.718,0,0,1,.555.855L22.38,9.015A11.257,11.257,0,0,1,26.1,11.1l.03.03a.715.715,0,0,1,0,1.02Z" transform="translate(1363 555.007)" fill="#dec646"/>
                    <text id="_300" dataname="300" transform="translate(1411.635 588)" fill="#520707" fontSize="40" fontFamily="HelveticaNeue-Bold, Helvetica Neue" fontWeight="700"><tspan x="0" y="0">300</tspan></text>
                    <g id="畫像" transform="translate(1216.955)" data-furnid="protrait" style={{cursor:"pointer" ,display:funitureBuy.protrait}} onClick={buying}>
                    <rect id="Rectangle_119" dataname="Rectangle 119" width="111" height="54" rx="20" transform="translate(307 540)" fill="#bc2121"/>
                    <text id="購買" transform="translate(333 578)" fill="#faf3e2" fontSize="30" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">購買</tspan></text>
                    </g>
                </g>
                
                </svg>
               </li>
               <li id="licard24">
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
                  <text id="開發中..." transform="translate(1427 466)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">開發中</tspan><tspan y="0" fontFamily="Helvetica">...</tspan></text>
               </g>
               </svg>

               </li>   
               
               <li id="licard25">
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
               <g id="card5" transform="translate(-1317 -287)">
                  <g transform="matrix(1, 0, 0, 1, 1317, 287)" filter="url(#Path_750)">
                     <path id="Path_750-2" dataname="Path 750" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <text id="開發中..." transform="translate(1427 466)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">開發中</tspan><tspan y="0" fontFamily="Helvetica">...</tspan></text>
               </g>
               </svg>
               </li>
               <li id="licard26">
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
               <g id="card5" transform="translate(-1317 -287)">
                  <g transform="matrix(1, 0, 0, 1, 1317, 287)" filter="url(#Path_750)">
                     <path id="Path_750-2" dataname="Path 750" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <text id="開發中..." transform="translate(1427 466)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">開發中</tspan><tspan y="0" fontFamily="Helvetica">...</tspan></text>
               </g>
               </svg>
               </li>
               <li id="licard27">
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
               <g id="card5" transform="translate(-1317 -287)">
                  <g transform="matrix(1, 0, 0, 1, 1317, 287)" filter="url(#Path_750)">
                     <path id="Path_750-2" dataname="Path 750" d="M40,0H315a40,40,0,0,1,40,40V278a40,40,0,0,1-40,40H40A40,40,0,0,1,0,278V40A40,40,0,0,1,40,0Z" transform="translate(9 6)" fill="#f0f0f0"/>
                  </g>
                  <text id="開發中..." transform="translate(1427 466)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">開發中</tspan><tspan y="0" fontFamily="Helvetica">...</tspan></text>
               </g>
               </svg>
               </li>
               <li id="licard28">
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
                  <text id="開發中..." transform="translate(1427 466)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">開發中</tspan><tspan y="0" fontFamily="Helvetica">...</tspan></text>
               </g>
               </svg>

               </li>
            </ul>

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

      
   
export default GameStoreSecondPage;