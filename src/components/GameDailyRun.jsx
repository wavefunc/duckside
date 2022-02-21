// ----- 晴暄、鎧洋 ----- //

import { Axios } from 'axios';
import React, { Component } from 'react';
import { Row, Modal } from 'react-bootstrap';

function MyVerticallyCenteredModal(props) {
   return (
      <Modal
         {...props}
         centered
      >
         <svg  width="1220" height="380" viewBox="800 0 1920 1080">
        <defs>
          <filter id="Rectangle_68" x="969" y="895" width="194" height="114" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="Rectangle_68-2" x="660" y="895" width="265" height="114" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-2"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-2"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <filter id="Rectangle_72" x="731" y="43" width="389" height="149" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-3"/>
            <feFlood flood-opacity="0.161"/>
            <feComposite operator="in" in2="blur-3"/>
            <feComposite in="SourceGraphic"/>
          </filter>
          <clipPath id="clip-領取獎勵">
            <rect width="1920" height="1080"/>
          </clipPath>
        </defs>
        <g id="領取獎勵" clip-path="url(#clip-領取獎勵)">
          <rect width="1920" height="1080" fill="#eddbbe"/>
          <g id="結算">
            <g id="內容">
              <g id="note" transform="translate(44 61)">
                <path id="Rectangle_67" data-name="Rectangle 67" d="M0,0H1568a0,0,0,0,1,0,0V612a212,212,0,0,1-212,212H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(125 130)" fill="#dec646"/>
                <path id="Path_21" data-name="Path 21" d="M124.039,0s22.967,44.92,60.921,64.213S284.5,80.76,284.5,80.76s-65.419,60.622-136.544,60.622S0,80.76,0,80.76s26.575-2.353,59.746-21.647S124.039,0,124.039,0Z" transform="matrix(0.839, -0.545, 0.545, 0.839, 1406.035, 886.569)" fill="#cbb653"/>
              </g>
              <path id="Path_22" data-name="Path 22" d="M0,0H378L317.135,22.835l58.719,4.912L341.376,54.3l34.711,14.975L378,79H0S14.619,45.868,13.919,26.638C13.65,19.254-.33,11.941-.33,11.941Z" transform="translate(53.224 320.506) rotate(-34)" fill="#734d8b"/>
              <text id="獲得積分" transform="translate(317 383)" fill="#520707" font-size="100" font-family="PingFangTC-Semibold, PingFang TC" font-weight="600"><tspan x="0" y="0">獲得積分</tspan></text>
              <text id="獲利_數" data-name="獲利％數" transform="translate(481 579)" fill="#672424" font-size="70" font-family="PingFangTC-Semibold, PingFang TC" font-weight="600"><tspan x="0" y="0">獲利％數</tspan></text>
              <text id="可獲得積分" transform="translate(446 715)" fill="#672424" font-size="70" font-family="PingFangTC-Semibold, PingFang TC" font-weight="600"><tspan x="0" y="0">可獲得積分</tspan></text>
              <text id="_10_" data-name="10%" transform="translate(1016 564)" fill="#672424" font-size="70" font-family="Verdana-Bold, Verdana" font-weight="700"><tspan x="0" y="0">10%</tspan></text>
              <text id="_200" data-name="200" transform="translate(1016 718)" fill="#672424" font-size="70" font-family="Verdana-Bold, Verdana" font-weight="700"><tspan x="0" y="0">200</tspan></text>
            </g>



            <a href="javascript:void(0)" id="closebt" onClick={props.onHide}>
            <g id="關閉按鈕" transform="translate(218 18)">
              <g transform="matrix(1, 0, 0, 1, -218, -18)" filter="url(#Rectangle_68)">
                <rect id="Rectangle_68-3" data-name="Rectangle 68" width="176" height="96" rx="10" transform="translate(978 901)" fill="#50b6c2"/>
              </g>
              <text id="關閉" transform="translate(788 953)" fill="#fff" font-size="60" font-family="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">關閉</tspan></text>
            </g>
            </a>



            <g id="排行榜按鈕" transform="translate(-20 18)">
              <g transform="matrix(1, 0, 0, 1, 20, -18)" filter="url(#Rectangle_68-2)">
                <rect id="Rectangle_68-4" data-name="Rectangle 68" width="247" height="96" rx="10" transform="translate(669 901)" fill="#50b6c2"/>
              </g>
              <text id="排行榜" transform="translate(723 953)" fill="#fff" font-size="60" font-family="PingFangTC-Regular, PingFang TC"><tspan x="0" y="0">排行榜</tspan></text>
            </g>
            <g id="結算flag">
              <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Rectangle_72)">
                <rect id="Rectangle_72-2" data-name="Rectangle 72" width="371" height="131" rx="10" transform="translate(740 49)" fill="#3e88a8"/>
              </g>
              <text id="結算版" transform="translate(775 146)" fill="#f0f0f0" font-size="95" font-family="PingFangTC-Semibold, PingFang TC" font-weight="600"><tspan x="0" y="0">結算版</tspan></text>
            </g>
          </g>
        </g>
      </svg>

      </Modal>
   );
}

function GameDailyRun() {
   const [modalShow, setModalShow] = React.useState(false);
   const [modalShowTwo, setModalShowTwo] = React.useState(false);

   return (
      <Row>

         <svg width="1020" height="500" viewBox="0 0 1920 1080">
            <defs>
               <filter id="Rectangle_66" x="1482" y="922" width="410" height="137" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur" />
                  <feComposite in="SourceGraphic" />
               </filter>
               <filter id="Path_33" x="1145" y="927" width="281" height="135" filterUnits="userSpaceOnUse">
                  <feOffset dy="6" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="3" result="blur-2" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-2" />
                  <feComposite in="SourceGraphic" />
               </filter>
               <filter id="Path_747" x="7" y="16" width="768" height="135" filterUnits="userSpaceOnUse">
                  <feOffset dy="6" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="3" result="blur-3" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-3" />
                  <feComposite in="SourceGraphic" />
               </filter>
               <filter id="Rectangle_80" x="788" y="256" width="181" height="88" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="3" result="blur-4" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-4" />
                  <feComposite in="SourceGraphic" />
               </filter>
               <filter id="Rectangle_58" x="788" y="158" width="181" height="88" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="3" result="blur-5" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-5" />
                  <feComposite in="SourceGraphic" />
               </filter>
               <filter id="Rectangle_59" x="982" y="158" width="181" height="88" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="3" result="blur-6" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-6" />
                  <feComposite in="SourceGraphic" />
               </filter>
               <filter id="Ellipse_37" x="213.763" y="593.293" width="31.86" height="30.474" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="3" result="blur-7" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-7" />
                  <feComposite in="SourceGraphic" />
               </filter>
               <filter id="Ellipse_38" x="213.763" y="694.469" width="31.86" height="31.86" filterUnits="userSpaceOnUse">
                  <feOffset dy="3" input="SourceAlpha" />
                  <feGaussianBlur stdDeviation="3" result="blur-8" />
                  <feFlood floodOpacity="0.161" />
                  <feComposite operator="in" in2="blur-8" />
                  <feComposite in="SourceGraphic" />
               </filter>
               <clipPath id="clip-划水日記">
                  <rect width="1920" height="1080" />
               </clipPath>
            </defs>
            <g id="划水日記" clipPath="url(#clip-划水日記)">
               <rect width="1920" height="1080" fill="#eddbbe" />
               <g id="明細" transform="translate(101 -247)">
                  <g id="Rectangle_73" data-name="Rectangle 73" transform="translate(1053 544)" fill="#fff" stroke="#707070" strokeWidth="1">
                     <rect width="729" height="585" stroke="none" />
                     <rect x="0.5" y="0.5" width="728" height="584" fill="none" />
                  </g>
                  <text id="現在所持有部位明細" transform="translate(1103 861)" fill="#520707" fontSize="70" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">現在所持有部位明細</tspan></text>
               </g>

               <a  onClick={() => setModalShow(true)}>
               <g id="領取獎勵按鈕" transform="translate(377 13)">
                  <g transform="matrix(1, 0, 0, 1, -377, -13)" filter="url(#Rectangle_66)">
                     <rect id="Rectangle_66-2" data-name="Rectangle 66" width="392" height="119" rx="59.5" transform="translate(1491 928)" fill="#3e88a8" />
                  </g>
                  <text id="領取獎勵" transform="translate(1145 997)" fill="#f0f0f0" fontSize="60" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">領取獎勵</tspan></text>
                  <g id="Icon_feather-gift" data-name="Icon feather-gift" transform="translate(1406.8 943.25)">
                     <path id="Path_16" data-name="Path 16" d="M52,18V46.75H6V18" transform="translate(2.75 13.75)" fill="none" stroke="#f0f0f0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                     <path id="Path_17" data-name="Path 17" d="M3,10.5H60.5V24.875H3Z" transform="translate(0 6.875)" fill="none" stroke="#f0f0f0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                     <path id="Path_18" data-name="Path 18" d="M18,53.625V10.5" transform="translate(13.75 6.875)" fill="none" stroke="#f0f0f0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                     <path id="Path_19" data-name="Path 19" d="M27.625,17.375H14.688A7.187,7.187,0,1,1,14.688,3C24.75,3,27.625,17.375,27.625,17.375Z" transform="translate(4.125 0)" fill="none" stroke="#f0f0f0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                     <path id="Path_20" data-name="Path 20" d="M18,17.375H30.938A7.187,7.187,0,1,0,30.938,3C20.875,3,18,17.375,18,17.375Z" transform="translate(13.75 0)" fill="none" stroke="#f0f0f0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
                  </g>
               </g>
               </a>

               <g id="下一關按鈕" transform="translate(64 -790)">
                  <g transform="matrix(1, 0, 0, 1, -64, 790)" filter="url(#Path_33)">
                     <path id="Path_33-2" data-name="Path 33" d="M58.5,0h146a58.5,58.5,0,0,1,0,117H58.5a58.5,58.5,0,0,1,0-117Z" transform="translate(1154 930)" fill="#3e88a8" />
                  </g>
                  <text id="下一關" transform="translate(1132 1801)" fill="#fff" fontSize="60" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">下一關</tspan></text>
               </g>
               <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Path_747)">
                  <path id="Path_747-2" data-name="Path 747" d="M57.508,0H691.5a58.5,58.5,0,0,1,0,117H58.5A58.5,58.5,0,0,1,0,58.5v-.992A57.508,57.508,0,0,1,57.508,0Z" transform="translate(16 19)" fill="#3e88a8" />
               </g>
               <text id="_2019_01_02_交易建立" data-name="2019/01/02 交易建立" transform="translate(94 94)" fill="#fff" fontSize="60" fontFamily="Helvetica-Bold, Helvetica" fontWeight="700" letterSpacing="0.05em"><tspan x="0" y="0">2019/01/02 </tspan><tspan y="0" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600">交易建立</tspan></text>
               <text id="證券代號 / 名稱" transform="translate(60 313)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">證券代號 / 名稱</tspan></text>
               <text id="買進股數" transform="translate(60 213)" fill="#520707" fontSize="40" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">買進股數</tspan></text>

               <a  onClick={() => setModalShowTwo(true)}>
                  <g id="查詢" transform="translate(-82 35)">
                     <g transform="matrix(1, 0, 0, 1, 82, -35)" filter="url(#Rectangle_80)">
                        <rect id="Rectangle_80-2" data-name="Rectangle 80" width="163" height="70" rx="10" transform="translate(797 262)" fill="#3e88a8" />
                     </g>
                     <path id="Icon_awesome-search" data-name="Icon awesome-search" d="M39.512,34.637l-7.8-7.8a1.876,1.876,0,0,0-1.33-.548H29.106a16.267,16.267,0,1,0-2.817,2.817v1.275a1.876,1.876,0,0,0,.548,1.33l7.8,7.8a1.87,1.87,0,0,0,2.652,0L39.5,37.3a1.887,1.887,0,0,0,.008-2.66ZM16.274,26.289A10.015,10.015,0,1,1,26.289,16.274,10.009,10.009,0,0,1,16.274,26.289Z" transform="translate(888.7 243.998)" fill="#fff" />
                     <text id="查詢-2" data-name="查詢" transform="translate(940 278)" fill="#fff" fontSize="40" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">查詢</tspan></text>
                  </g>
               </a>

               <g id="買進按鈕" transform="translate(-1469 -419)" opacity="0.93">
                  <g transform="matrix(1, 0, 0, 1, 1469, 419)" filter="url(#Rectangle_58)">
                     <rect id="Rectangle_58-2" data-name="Rectangle 58" width="163" height="70" rx="10" transform="translate(797 164)" fill="#3e88a8" />
                  </g>
                  <text id="買進" transform="translate(2324 632)" fill="#f0f0f0" fontSize="40" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">買進</tspan></text>
                  <path id="Icon_awesome-plus" data-name="Icon awesome-plus" d="M34.048,16.655H22.262V4.869A2.619,2.619,0,0,0,19.643,2.25H17.024A2.619,2.619,0,0,0,14.4,4.869V16.655H2.619A2.619,2.619,0,0,0,0,19.274v2.619a2.619,2.619,0,0,0,2.619,2.619H14.4V36.3a2.619,2.619,0,0,0,2.619,2.619h2.619A2.619,2.619,0,0,0,22.262,36.3V24.512H34.048a2.619,2.619,0,0,0,2.619-2.619V19.274A2.619,2.619,0,0,0,34.048,16.655Z" transform="translate(2287.667 597.417)" fill="#f0f0f0" />
               </g>
               <g id="賣出按鈕" transform="translate(457 -573)">
                  <g transform="matrix(1, 0, 0, 1, -457, 573)" filter="url(#Rectangle_59)">
                     <rect id="Rectangle_59-2" data-name="Rectangle 59" width="163" height="70" rx="10" transform="translate(991 164)" fill="#3e88a8" />
                  </g>
                  <path id="Icon_awesome-minus" data-name="Icon awesome-minus" d="M31.43,14.625H2.418A2.2,2.2,0,0,0,0,16.5v1.875A2.2,2.2,0,0,0,2.418,20.25H31.43a2.2,2.2,0,0,0,2.418-1.875V16.5A2.2,2.2,0,0,0,31.43,14.625Z" transform="translate(547.333 757.375)" fill="#f0f0f0" />
                  <text id="賣出" transform="translate(600 786)" fill="#f0f0f0" fontSize="40" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">賣出</tspan></text>
               </g>
               <g id="浴缸" transform="translate(481.249 540)">
                  <path id="Path_8" data-name="Path 8" d="M0,0H629.387V145.328c0,13.18-15.749,27.384-42.17,35.448,0,0-131.107,35.157-267.369,35.157S42.17,180.776,42.17,180.776c-21.881-6.711-38.755-26.616-38.755-39.8Z" transform="translate(0 80.392)" fill="#b8dbdb" />
                  <g id="Path_9" data-name="Path 9" transform="translate(0 0)" fill="#68709f">
                     <path d="M 315.7513122558594 155.0157928466797 C 126.3181304931641 155.0157928466797 10.00003910064697 112.784797668457 10.00003910064697 82.50788879394531 C 10.00003910064697 52.23097991943359 126.3181304931641 9.999979972839355 315.7513122558594 9.999979972839355 C 505.1845703125 9.999979972839355 621.502685546875 52.23097991943359 621.502685546875 82.50788879394531 C 621.502685546875 112.784797668457 505.1845703125 155.0157928466797 315.7513122558594 155.0157928466797 Z" stroke="none" />
                     <path d="M 315.7513122558594 19.99998474121094 C 120.6226196289062 19.99998474121094 20 63.81428527832031 20 82.50788879394531 C 20 101.2014923095703 120.6226196289062 145.0157928466797 315.7513122558594 145.0157928466797 C 510.8800048828125 145.0157928466797 611.5026245117188 101.2014923095703 611.5026245117188 82.50788879394531 C 611.5026245117188 63.81428527832031 510.8800048828125 19.99998474121094 315.7513122558594 19.99998474121094 M 315.7513122558594 -1.52587890625e-05 C 490.1360168457031 -1.52587890625e-05 631.5026245117188 36.94009399414062 631.5026245117188 82.50788879394531 C 631.5026245117188 128.07568359375 490.1360168457031 165.0157928466797 315.7513122558594 165.0157928466797 C 141.36669921875 165.0157928466797 0 128.07568359375 0 82.50788879394531 C 0 36.94009399414062 141.36669921875 -1.52587890625e-05 315.7513122558594 -1.52587890625e-05 Z" stroke="none" fill="#d9f2f2" />
                  </g>
                  <circle id="Ellipse_8" data-name="Ellipse 8" cx="13.751" cy="13.751" r="13.751" transform="translate(115.3 49.716)" fill="#bba3c4" />
                  <circle id="Ellipse_27" data-name="Ellipse 27" cx="13.751" cy="13.751" r="13.751" transform="translate(404.077 85.681)" fill="#bba3c4" />
                  <circle id="Ellipse_9" data-name="Ellipse 9" cx="16.925" cy="16.925" r="16.925" transform="translate(156.554 65.583)" fill="#bba3c4" />
                  <circle id="Ellipse_31" data-name="Ellipse 31" cx="16.925" cy="16.925" r="16.925" transform="translate(532.07 55.005)" fill="#bba3c4" />
                  <circle id="Ellipse_18" data-name="Ellipse 18" cx="16.925" cy="16.925" r="16.925" transform="translate(423.118 46.543)" fill="#bba3c4" />
                  <circle id="Ellipse_10" data-name="Ellipse 10" cx="23.271" cy="23.271" r="23.271" transform="translate(247.524 35.965)" fill="#bba3c4" />
                  <circle id="Ellipse_11" data-name="Ellipse 11" cx="14.809" cy="14.809" r="14.809" transform="translate(461.198 57.121)" fill="#eda4a4" />
                  <circle id="Ellipse_12" data-name="Ellipse 12" cx="17.454" cy="17.454" r="17.454" transform="translate(212.617 57.121)" fill="#eda4a4" />
                  <circle id="Ellipse_29" data-name="Ellipse 29" cx="17.454" cy="17.454" r="17.454" transform="translate(125.878 70.872)" fill="#eda4a4" />
                  <circle id="Ellipse_13" data-name="Ellipse 13" cx="15.338" cy="15.338" r="15.338" transform="translate(378.69 65.583)" fill="#eda4a4" />
                  <circle id="Ellipse_33" data-name="Ellipse 33" cx="15.338" cy="15.338" r="15.338" transform="translate(284.546 23.272)" fill="#eda4a4" />
                  <circle id="Ellipse_17" data-name="Ellipse 17" cx="24.858" cy="24.858" r="24.858" transform="translate(299.356 50.774)" fill="#eda4a4" />
                  <circle id="Ellipse_16" data-name="Ellipse 16" cx="14.809" cy="14.809" r="14.809" transform="translate(166.074 35.965)" fill="#eda4a4" />
                  <circle id="Ellipse_14" data-name="Ellipse 14" cx="14.809" cy="14.809" r="14.809" transform="translate(263.391 80.392)" fill="#eda4a4" />
                  <circle id="Ellipse_15" data-name="Ellipse 15" cx="14.809" cy="14.809" r="14.809" transform="translate(50.774 57.121)" fill="#eda4a4" />
                  <circle id="Ellipse_19" data-name="Ellipse 19" cx="16.396" cy="16.396" r="16.396" transform="translate(198.865 81.45)" fill="#fff" />
                  <circle id="Ellipse_28" data-name="Ellipse 28" cx="16.396" cy="16.396" r="16.396" transform="translate(197.808 30.676)" fill="#fff" />
                  <circle id="Ellipse_21" data-name="Ellipse 21" cx="16.396" cy="16.396" r="16.396" transform="translate(340.61 86.739)" fill="#fff" />
                  <circle id="Ellipse_26" data-name="Ellipse 26" cx="16.396" cy="16.396" r="16.396" transform="translate(391.384 41.254)" fill="#fff" />
                  <circle id="Ellipse_25" data-name="Ellipse 25" cx="16.396" cy="16.396" r="16.396" transform="translate(291.951 86.739)" fill="#fff" />
                  <circle id="Ellipse_22" data-name="Ellipse 22" cx="16.396" cy="16.396" r="16.396" transform="translate(440.042 76.161)" fill="#fff" />
                  <circle id="Ellipse_23" data-name="Ellipse 23" cx="16.396" cy="16.396" r="16.396" transform="translate(506.683 53.947)" fill="#fff" />
                  <circle id="Ellipse_24" data-name="Ellipse 24" cx="16.396" cy="16.396" r="16.396" transform="translate(341.667 32.792)" fill="#fff" />
                  <circle id="Ellipse_30" data-name="Ellipse 30" cx="16.396" cy="16.396" r="16.396" transform="translate(478.123 69.815)" fill="#fff" />
                  <circle id="Ellipse_20" data-name="Ellipse 20" cx="16.396" cy="16.396" r="16.396" transform="translate(96.26 66.641)" fill="#fff" />
                  <circle id="Ellipse_32" data-name="Ellipse 32" cx="16.925" cy="16.925" r="16.925" transform="translate(496.105 66.641)" fill="#bba3c4" />
               </g>
               <g id="鴨子" transform="translate(381.503 584.022)">
                  <line id="Line_17" data-name="Line 17" y2="31" transform="translate(206.498 408.5)" fill="none" stroke="#574809" strokeWidth="10" />
                  <line id="Line_21" data-name="Line 21" y2="31" transform="translate(292.498 408.5)" fill="none" stroke="#574809" strokeWidth="10" />
                  <line id="Line_18" data-name="Line 18" x1="19" y2="15" transform="translate(185.498 437.5)" fill="none" stroke="#574809" strokeWidth="10" />
                  <line id="Line_24" data-name="Line 24" x1="19" y2="15" transform="translate(271.498 437.5)" fill="none" stroke="#574809" strokeWidth="10" />
                  <line id="Line_19" data-name="Line 19" y2="29.25" transform="translate(206.498 433.25)" fill="none" stroke="#574809" strokeWidth="10" />
                  <line id="Line_22" data-name="Line 22" y2="29.25" transform="translate(292.498 433.25)" fill="none" stroke="#574809" strokeWidth="10" />
                  <line id="Line_20" data-name="Line 20" x2="19" y2="13" transform="translate(208.498 437.5)" fill="none" stroke="#574809" strokeWidth="10" />
                  <line id="Line_23" data-name="Line 23" x2="19" y2="13" transform="translate(294.498 437.5)" fill="none" stroke="#574809" strokeWidth="10" />
                  <ellipse id="Ellipse_2" data-name="Ellipse 2" cx="159" cy="128.5" rx="159" ry="128.5" transform="translate(86.998)" fill="#ffd230" />
                  <ellipse id="Ellipse_3" data-name="Ellipse 3" cx="178.5" cy="144" rx="178.5" ry="144" transform="translate(67.998 129)" fill="#ffd230" />
                  <path id="Polygon_1" data-name="Polygon 1" d="M48,0,96,44H0Z" transform="translate(197.998 88)" fill="#f70" />
                  <ellipse id="Ellipse_4" data-name="Ellipse 4" cx="14" cy="14.5" rx="14" ry="14.5" transform="translate(162.998 81)" />
                  <ellipse id="Ellipse_5" data-name="Ellipse 5" cx="14" cy="14.5" rx="14" ry="14.5" transform="translate(305.998 81)" />
                  <path id="Path_10" data-name="Path 10" d="M109.78,0s20.867,35.607,20.867,71.23a64.5,64.5,0,0,1-64.5,64.5C30.525,135.73,0,110.537,0,110.537S38.279,74.65,54.4,58.525,109.78,0,109.78,0Z" transform="matrix(0.961, 0.276, -0.276, 0.961, 37.412, 173.758)" fill="#574809" />
                  <path id="Path_11" data-name="Path 11" d="M109.78,135.73s20.867-35.607,20.867-71.23A64.5,64.5,0,0,0,66.147,0C30.525,0,0,25.193,0,25.193S38.279,61.08,54.4,77.2,109.78,135.73,109.78,135.73Z" transform="translate(486.497 304.23) rotate(164)" fill="#574804" />
               </g>
               <g id="櫃子" transform="translate(77.237 579.89)">
                  <path id="Path_13" data-name="Path 13" d="M8.323,0c7.427,0,10.083,76.528,10.083,76.528S16.484,79.064,9.9,79.064,0,76.528,0,76.528.9,0,8.323,0Z" transform="translate(65.222 283.504) rotate(180)" fill="#d6c298" />
                  <path id="Path_15" data-name="Path 15" d="M8.323,0c7.427,0,10.083,76.528,10.083,76.528S16.484,79.064,9.9,79.064,0,76.528,0,76.528.9,0,8.323,0Z" transform="translate(270.401 283.504) rotate(180)" fill="#d6c298" />
                  <rect id="Rectangle_50" data-name="Rectangle 50" width="303.526" height="221.754" rx="10" fill="#d6c298" />
                  <rect id="Rectangle_53" data-name="Rectangle 53" width="281.351" height="99.789" transform="translate(11.088 11.088)" fill="#c18c57" />
                  <rect id="Rectangle_55" data-name="Rectangle 55" width="281.351" height="99.789" transform="translate(11.088 112.263)" fill="#c18c57" />
                  <rect id="Rectangle_51" data-name="Rectangle 51" width="271.649" height="92.86" transform="translate(16.632 15.246)" fill="#e0d5bf" />
                  <rect id="Rectangle_54" data-name="Rectangle 54" width="271.649" height="92.86" transform="translate(16.632 116.421)" fill="#e0d5bf" />
                  <g transform="matrix(1, 0, 0, 1, -77.24, -579.89)" filter="url(#Ellipse_37)">
                     <ellipse id="Ellipse_37-2" data-name="Ellipse 37" cx="6.93" cy="6.237" rx="6.93" ry="6.237" transform="translate(222.76 599.29)" fill="#760202" />
                  </g>
                  <g transform="matrix(1, 0, 0, 1, -77.24, -579.89)" filter="url(#Ellipse_38)">
                     <circle id="Ellipse_38-2" data-name="Ellipse 38" cx="6.93" cy="6.93" r="6.93" transform="translate(222.76 700.47)" fill="#760202" />
                  </g>
               </g>
               <g id="籃球" transform="translate(126 850.386)">
                  <circle id="Ellipse_6" data-name="Ellipse 6" cx="103" cy="103" r="103" fill="#ef8d37" />
                  <line id="Line_25" data-name="Line 25" x2="206" transform="translate(0 103)" fill="none" stroke="#707070" strokeWidth="10" />
                  <path id="Path_6" data-name="Path 6" d="M0,0S28.6,39.621,29.855,78.121,5,154,5,154" transform="translate(32.5 28.5)" fill="none" stroke="#707070" strokeWidth="10" />
                  <path id="Path_7" data-name="Path 7" d="M29.9,0S1.293,39.621.043,78.121,24.9,154,24.9,154" transform="translate(143.5 28.5)" fill="none" stroke="#707070" strokeWidth="10" />
                  <line id="Line_26" data-name="Line 26" y2="206" transform="translate(103.5 0.228)" fill="none" stroke="#707070" strokeWidth="10" />
               </g>
            </g>
            <foreignObject x="380" y="172" width="585" height="100" fontSize="30px">
                  <input type="text"  style={{width:"400px",height:"55px"}}/>
            </foreignObject>

            <foreignObject x="380" y="271" width="585" height="100" fontSize="30px">
                  <input type="text"  style={{width:"400px",height:"55px"}}/>
            </foreignObject>
            <MyVerticallyCenteredModal
               show={modalShow}
               onHide={() => setModalShow(false)}
            />
         </svg>


      </Row>
   );
}
export default GameDailyRun;