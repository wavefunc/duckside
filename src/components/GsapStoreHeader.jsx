// ----- 冠樺----- //

import React from 'react';
import "../css/GameStoreHeader_style.css";

function StoreHeader({
   pageDisplay = {},
   setPageDisplay = f => f,
   updatePage = false,
   setUpdatePage = f => f,
   totalPoints = 0,
}) {

   return (
      <div id="container" className="row" style={{ display: pageDisplay.storeHeader }}>
         <div className="col-lg-12">
            <nav>
               <ul>
                  <li id="flag" >
                     <svg width="232" height="64" viewBox="0 0 464.731 128">
                        <g transform="translate(0 -56)">
                           <path id="Path_12" data-name="Path 12" d="M0,0H464.731L420.605,67.636,464.731,128H0Z" transform="translate(0 56)" fill="#50b6c2" />
                           <path id="Icon_awesome-store" data-name="Icon awesome-store" d="M93.027,18.328,83,2.318A4.947,4.947,0,0,0,78.809,0H16.376a4.947,4.947,0,0,0-4.188,2.318L2.159,18.328c-5.177,8.268-.587,19.765,9.087,21.079a16.059,16.059,0,0,0,2.117.139,15.259,15.259,0,0,0,11.4-5.115,15.272,15.272,0,0,0,22.81,0,15.272,15.272,0,0,0,22.81,0,15.31,15.31,0,0,0,11.4,5.115,15.886,15.886,0,0,0,2.117-.139C93.614,38.109,98.219,26.611,93.027,18.328Zm-11.2,26.179a19.608,19.608,0,0,1-4.559-.587V59.342H17.922V43.919a20.472,20.472,0,0,1-4.559.587,20.851,20.851,0,0,1-2.782-.185,19.434,19.434,0,0,1-2.534-.556V74.178a4.94,4.94,0,0,0,4.945,4.945H82.225a4.94,4.94,0,0,0,4.945-4.945V43.765a15.778,15.778,0,0,1-2.534.556A21.491,21.491,0,0,1,81.823,44.507Z" transform="translate(16.996 80.438)" fill="#bc2121" />
                           <text id="積分商店" transform="translate(125 145)" fill="#faf3e2" fontSize="70" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">積分商店</tspan></text>
                        </g>
                     </svg>
                  </li>
                  <li id="centerSide"></li>
                  <li id="my_score" >
                     <svg width="174" height="44" viewBox="0 0 292 87">
                        <g id="lblPoints" transform="translate(-1355 -97)">
                           <rect id="Rectangle_117" data-name="Rectangle 117" width="292" height="87" rx="20" transform="translate(1355 97)" fill="#fff" />
                           <text id="_3000" data-name="3000" transform="translate(1493 163)" font-size="50" font-family="Helvetica-Bold, Helvetica" font-weight="700">
                              <tspan id="lblPointsTxt" x="0" y="0">{totalPoints}</tspan>
                           </text>
                           <path id="Icon_simple-cashapp" data-name="Icon simple-cashapp" d="M65.875,9.69a14.242,14.242,0,0,0-8.517-8.517C53.7,0,50.377,0,43.619,0H23.345c-6.7,0-10.081,0-13.683,1.117A14.242,14.242,0,0,0,1.145,9.662C0,13.292,0,16.643,0,23.345v20.3C0,50.377,0,53.7,1.117,57.33a14.242,14.242,0,0,0,8.517,8.517c3.63,1.145,6.981,1.145,13.683,1.145h20.33c6.73,0,10.081,0,13.683-1.117a14.242,14.242,0,0,0,8.545-8.545c1.145-3.63,1.145-6.981,1.145-13.683V23.4c0-6.73,0-10.081-1.145-13.711ZM48.646,22.619l-2.6,2.6a1.4,1.4,0,0,1-1.871.028,13.963,13.963,0,0,0-8.992-3.3c-2.709,0-5.417.894-5.417,3.379,0,2.513,2.9,3.351,6.255,4.608,5.864,1.955,10.723,4.412,10.723,10.165,0,6.255-4.859,10.556-12.79,11.03l-.726,3.351a1.368,1.368,0,0,1-1.34,1.089h-5l-.251-.028A1.4,1.4,0,0,1,25.579,53.9l.782-3.546a18.263,18.263,0,0,1-8.042-4.384v-.028a1.34,1.34,0,0,1,0-1.9l2.793-2.709a1.368,1.368,0,0,1,1.871,0,13.5,13.5,0,0,0,9.467,3.686c3.63,0,6.06-1.536,6.06-3.965s-2.457-3.072-7.093-4.8C26.5,34.488,21.837,32,21.837,26.194c0-6.758,5.613-10.053,12.259-10.36l.7-3.435a1.34,1.34,0,0,1,1.34-1.061h4.971l.279.028a1.337,1.337,0,0,1,1.033,1.592l-.754,3.826a20.958,20.958,0,0,1,6.925,3.882l.056.056a1.331,1.331,0,0,1,0,1.9Z" transform="translate(1379.98 107.008)" fill="#ffd230" />
                        </g>
                     </svg>

                  </li>
                  <li
                     id="closeBtn"
                     onClick={() => {
                        setPageDisplay(pageDisplay => ({
                           ...pageDisplay,
                           roomInterior: 'block',
                           storeHeader: 'none',
                           storeFirstPage: 'none'
                        }));
                     }}
                  >
                     <svg width="40" height="40" viewBox="0 0 84 84">
                        <a href="#">
                           <g id="關閉Btn" transform="translate(-1742 -29)">
                              <g id="Ellipse_61" data-name="Ellipse 61" transform="translate(1742 29)" fill="#256170" stroke="#707070" strokeWidth="1">
                                 <circle cx="42" cy="42" r="42" stroke="none" />
                                 <circle cx="42" cy="42" r="41.5" fill="none" />
                              </g>
                              <path id="Icon_ionic-md-close" data-name="Icon ionic-md-close" d="M56.715,12.442,51.8,7.523,32.119,27.2,12.442,7.523,7.523,12.442,27.2,32.119,7.523,51.8l4.919,4.919L32.119,37.038,51.8,56.715,56.715,51.8,37.038,32.119Z" transform="translate(1751.881 38.881)" fill="#fff" />
                           </g>
                        </a>
                     </svg>
                  </li>
               </ul>
            </nav>
         </div>
      </div>
   );
}

export default StoreHeader;