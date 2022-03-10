// ----- 冠樺、沛珊 ----- //

import React, { useEffect } from 'react';
import HomePageWord from '../components/HomepageWord';
import { gsap } from 'gsap/all';

function Homepage() {
   const idFadeOut = ['#homepageBasketball', '#homepagePortrait', '#homepageBathTub',
      '#homepageCabinet', '#homepageLight', '#homepageTV', '#homepageMirror',
      '#homepageFemaleDuck', '#homepageDuck', '#homepageWeight', '#homepageClock'];

   useEffect(() => {
      // 讓其他傢俱淡入
      var tl = gsap.timeline({ repeat: 0 });
      idFadeOut.forEach(val => gsap.from(val, { duration: 2, opacity: 0 }));

      // 小鴨由小變大、淡出、慢慢降落的動畫
      var tlDuck = gsap.timeline();
      tlDuck
         .from('#homepageDuck', { duration: 2, scale: 0.5, transformOrigin: 'center' }, 0) // 小鴨逐漸變大
         .set('#homepageWingLeft', { duration: 2, rotate: 110, x: 850, y: 490, transformOrigin: 'right bottom' }, 0) // 左翅舉高
         .set('#homepageWingRight', { duration: 2, rotate: 70, transformOrigin: 'right top' }, 0) // 右翅舉高
         .from('#homepageDuck', { duration: 2, y: -250, ease: "slow(0.7, 0.7, false)" }, 2) // 小鴨降落
         .fromTo('#homepageGlasses', { duration: 2, opacity: 0 }, { opacity: 1 }); // 眼鏡淡入

      // 左翅右翅邊降落邊揮動
      setTimeout(() => {
         var tlWingLeft = gsap.timeline({ repeat: 18 });
         tlWingLeft.fromTo('#homepageWingLeft', {
            duration: 1, rotate: 100,
            x: 850, y: 490,
            transformOrigin: 'right bottom',
            ease: 'bounce'
         }, { rotate: 160 }) // 左翅揮動
            .timeScale(5)

         var tlWingRight = gsap.timeline({ repeat: 18 });
         tlWingRight.fromTo('#homepageWingRight', {
            duration: 1, rotate: 0,
            transformOrigin: 'right top',
            ease: 'bounce'
         }, { rotate: 60 }) // 右翅揮動
            .timeScale(5)
            .set('#homepageWingRight', { rotate: 30 })
      }, 1700);

      // 籃球從空中掉落彈跳
      gsap.from('#homepageBasketball', { duration: 2, y: -500, ease: 'bounce' });

      // 歡迎回來對話框，在整體動畫淡出後，跟著淡出
      tl.from('#divDialogWelcome', { duration: 1, opacity: 0, delay: 2 })
         .set('#txtDialogWelcome', { className: 'typing' });
   });

   return (
      <div>
         <div style={{ background: '#F5F5CC' }}>
            <HomePageWord />
            <svg width="100%" height="61vh" viewBox="0 0 1920 1080">
               <defs>
                  <filter id="Ellipse_37" x="1730" y="632.743" width="31.86" height="30.474" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Ellipse_38" x="1730" y="733.918" width="31.86" height="31.86" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-2" />
                     <feFlood floodOpacity="0.161" />
                     <feComposite operator="in" in2="blur-2" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Path_751" x="452.748" y="310.047" width="84.886" height="117.953" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-3" />
                     <feFlood floodOpacity="0.259" />
                     <feComposite operator="in" in2="blur-3" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Path_752" x="149.905" y="215.671" width="92.017" height="123.964" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-4" />
                     <feFlood floodOpacity="0.259" />
                     <feComposite operator="in" in2="blur-4" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Subtraction_8" x="1675.137" y="264" width="139.192" height="99.276" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-5" />
                     <feFlood floodOpacity="0.259" />
                     <feComposite operator="in" in2="blur-5" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Subtraction_8-2" x="1675.137" y="264" width="139.192" height="99.276" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-6" />
                     <feFlood floodColor="#f1801e" result="color" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-6" />
                     <feComposite operator="in" in="color" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="Path_736" x="1628.679" y="323.586" width="233.115" height="290.682" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-7" />
                     <feFlood floodOpacity="0.259" />
                     <feComposite operator="in" in2="blur-7" />
                  </filter>
                  <filter id="Path_736-2" x="1628.679" y="323.586" width="233.115" height="290.682" filterUnits="userSpaceOnUse">
                     <feOffset dx="-30" dy="-10" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="25" result="blur-8" />
                     <feFlood floodColor="#13dbe2" floodOpacity="0.3" result="color-2" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-8" />
                     <feComposite operator="in" in="color-2" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="Path_737" x="1646.859" y="351.644" width="74.556" height="114.954" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-9" />
                     <feFlood floodOpacity="0.259" />
                     <feComposite operator="in" in2="blur-9" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Path_738" x="1660.085" y="358.877" width="70.709" height="119.05" filterUnits="userSpaceOnUse">
                     <feOffset dy="3" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-10" />
                     <feFlood floodOpacity="0.259" />
                     <feComposite operator="in" in2="blur-10" />
                     <feComposite in="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_84">
                     <feOffset dy="-30" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-11" />
                     <feFlood floodColor="#262626" floodOpacity="0.059" result="color-3" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-11" />
                     <feComposite operator="in" in="color-3" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_85">
                     <feOffset dy="-30" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-12" />
                     <feFlood floodOpacity="0.102" result="color-4" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-12" />
                     <feComposite operator="in" in="color-4" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_86">
                     <feOffset dy="-30" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-13" />
                     <feFlood floodOpacity="0.102" result="color-5" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-13" />
                     <feComposite operator="in" in="color-5" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_87">
                     <feOffset dy="-30" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-14" />
                     <feFlood floodOpacity="0.102" result="color-6" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-14" />
                     <feComposite operator="in" in="color-6" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_88">
                     <feOffset dy="-30" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-15" />
                     <feFlood floodOpacity="0.102" result="color-7" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-15" />
                     <feComposite operator="in" in="color-7" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_89">
                     <feOffset dy="-30" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-16" />
                     <feFlood floodOpacity="0.102" result="color-8" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-16" />
                     <feComposite operator="in" in="color-8" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_90">
                     <feOffset dy="-30" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-17" />
                     <feFlood floodOpacity="0.102" result="color-9" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-17" />
                     <feComposite operator="in" in="color-9" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_91">
                     <feOffset dy="-30" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-18" />
                     <feFlood floodColor="#262626" floodOpacity="0.059" result="color-10" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-18" />
                     <feComposite operator="in" in="color-10" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <filter id="Rectangle_92">
                     <feOffset dy="-30" input="SourceAlpha" />
                     <feGaussianBlur stdDeviation="3" result="blur-19" />
                     <feFlood floodColor="#262626" floodOpacity="0.059" result="color-11" />
                     <feComposite operator="out" in="SourceGraphic" in2="blur-19" />
                     <feComposite operator="in" in="color-11" />
                     <feComposite operator="in" in2="SourceGraphic" />
                  </filter>
                  <clipPath id="clip-我的房間_1">
                     <rect width="1920" height="1080" />
                  </clipPath>
               </defs>
               <g id="我的房間_1" data-name="我的房間 – 1" clipPath="url(#clip-我的房間_1)">
                  <rect width="1920" height="1080" fill="#f5f5cc" />
                  <line id="homepageHorizon" x2="1920" transform="translate(0 676)" fill="none" stroke="#53480b" strokeWidth="6" />
                  <g id="homepagePortrait" transform="translate(1112.415 210.318)">
                     <path id="Path_24" data-name="Path 24" d="M4.383,33.784,89.763-2.11" transform="translate(266.745 68.669)" fill="none" stroke="#ea9c42" strokeLinecap="round" strokeWidth="6" />
                     <path id="Path_27" data-name="Path 27" d="M88.935,34.811,0,0" transform="translate(356.456 66.736)" fill="none" stroke="#ea9c42" strokeLinecap="round" strokeWidth="6" />
                     <g id="Path_26" data-name="Path 26" transform="translate(267 98.905)" fill="#763505" strokeLinecap="round">
                        <path d="M 181.9374389648438 194.2761993408203 L 0.4999944865703583 194.2761993408203 L 0.4999944865703583 0.4999996721744537 L 181.9374389648438 0.4999996721744537 L 181.9374389648438 194.2761993408203 Z" stroke="none" />
                        <path d="M 1 1 L 1 193.7761993408203 L 181.4374389648438 193.7761993408203 L 181.4374389648438 1 L 1 1 M 0 0 L 182.4374389648438 0 L 182.4374389648438 194.7761993408203 L 0 194.7761993408203 L 0 0 Z" stroke="none" fill="#707070" />
                     </g>
                     <g id="Path_25" data-name="Path 25" transform="translate(278.457 112.125)" fill="#eddbbe" strokeLinecap="round">
                        <path d="M 158.1412506103516 168.7173461914062 L 0.4999948740005493 168.7173461914062 L 0.4999948740005493 0.5000132918357849 L 158.1412506103516 0.5000132918357849 L 158.1412506103516 168.7173461914062 Z" stroke="none" />
                        <path d="M 1 0.9999847412109375 L 1 168.2173156738281 L 157.6412506103516 168.2173156738281 L 157.6412506103516 0.9999847412109375 L 1 0.9999847412109375 M 0 -1.52587890625e-05 L 158.6412506103516 -1.52587890625e-05 L 158.6412506103516 169.2173156738281 L 0 169.2173156738281 L 0 -1.52587890625e-05 Z" stroke="none" fill="#707070" />
                     </g>
                     <ellipse id="Ellipse_39" data-name="Ellipse 39" cx="6" cy="7" rx="6" ry="7" transform="translate(351 59.681)" fill="#400202" />
                     <g transform="translate(280.097 123.122)">
                        <line id="Line_17" data-name="Line 17" y2="9.956" transform="translate(66.319 131.194)" fill="none" stroke="#574809" strokeWidth="4" />
                        <line id="Line_21" data-name="Line 21" y2="9.956" transform="translate(93.939 131.194)" fill="none" stroke="#574809" strokeWidth="4" />
                        <line id="Line_18" data-name="Line 18" x1="6.102" y2="4.817" transform="translate(59.575 140.508)" fill="none" stroke="#574809" strokeWidth="4" />
                        <line id="Line_24" data-name="Line 24" x1="6.102" y2="4.817" transform="translate(87.195 140.508)" fill="none" stroke="#574809" strokeWidth="4" />
                        <line id="Line_19" data-name="Line 19" y2="9.394" transform="translate(66.319 139.143)" fill="none" stroke="#574809" strokeWidth="4" />
                        <line id="Line_22" data-name="Line 22" y2="9.394" transform="translate(93.939 139.143)" fill="none" stroke="#574809" strokeWidth="4" />
                        <line id="Line_20" data-name="Line 20" x2="6.102" y2="4.175" transform="translate(66.961 140.508)" fill="none" stroke="#574809" strokeWidth="4" />
                        <line id="Line_23" data-name="Line 23" x2="6.102" y2="4.175" transform="translate(94.581 140.508)" fill="none" stroke="#574809" strokeWidth="4" />
                        <ellipse id="Ellipse_2" data-name="Ellipse 2" cx="51.065" cy="41.269" rx="51.065" ry="41.269" transform="translate(27.94)" fill="#ffd230" />
                        <ellipse id="Ellipse_3" data-name="Ellipse 3" cx="57.327" cy="46.247" rx="57.327" ry="46.247" transform="translate(21.838 41.43)" fill="#ffd230" />
                        <path id="Polygon_1" data-name="Polygon 1" d="M15.416,0,30.831,14.131H0Z" transform="translate(63.589 28.262)" fill="#f70" />
                        <ellipse id="Ellipse_4" data-name="Ellipse 4" cx="4.496" cy="4.657" rx="4.496" ry="4.657" transform="translate(52.349 26.014)" />
                        <ellipse id="Ellipse_5" data-name="Ellipse 5" cx="4.496" cy="4.657" rx="4.496" ry="4.657" transform="translate(98.275 26.014)" />
                        <path id="Path_10" data-name="Path 10" d="M35.257,0s6.7,11.436,6.7,22.876A20.715,20.715,0,0,1,21.244,43.591C9.8,43.591,0,35.5,0,35.5S12.294,23.975,17.472,18.8,35.257,0,35.257,0Z" transform="matrix(0.961, 0.276, -0.276, 0.961, 12.015, 55.804)" fill="#574809" />
                        <path id="Path_11" data-name="Path 11" d="M35.257,43.591s6.7-11.436,6.7-22.876A20.715,20.715,0,0,0,21.244,0C9.8,0,0,8.091,0,8.091S12.294,19.616,17.472,24.8,35.257,43.591,35.257,43.591Z" transform="translate(156.244 97.707) rotate(164)" fill="#574804" />
                     </g>
                  </g>
                  <g id="homepageBathTub" transform="translate(-1192.141 -19)">
                     <path id="Path_8" data-name="Path 8" d="M0,0H629.387V145.328c0,13.18-15.749,27.384-42.17,35.448,0,0-131.107,35.157-267.369,35.157S42.17,180.776,42.17,180.776c-21.881-6.711-38.755-26.616-38.755-39.8Z" transform="translate(1222 603.392)" fill="#b8dbdb" />
                     <g id="Path_9" data-name="Path 9" transform="translate(1222 523)" fill="#68709f">
                        <path d="M 315.7513122558594 155.0157928466797 C 126.3181304931641 155.0157928466797 10.00003910064697 112.784797668457 10.00003910064697 82.50788879394531 C 10.00003910064697 52.23097991943359 126.3181304931641 9.999979972839355 315.7513122558594 9.999979972839355 C 505.1845703125 9.999979972839355 621.502685546875 52.23097991943359 621.502685546875 82.50788879394531 C 621.502685546875 112.784797668457 505.1845703125 155.0157928466797 315.7513122558594 155.0157928466797 Z" stroke="none" />
                        <path d="M 315.7513122558594 19.99998474121094 C 120.6226196289062 19.99998474121094 20 63.81428527832031 20 82.50788879394531 C 20 101.2014923095703 120.6226196289062 145.0157928466797 315.7513122558594 145.0157928466797 C 510.8800048828125 145.0157928466797 611.5026245117188 101.2014923095703 611.5026245117188 82.50788879394531 C 611.5026245117188 63.81428527832031 510.8800048828125 19.99998474121094 315.7513122558594 19.99998474121094 M 315.7513122558594 -1.52587890625e-05 C 490.1360168457031 -1.52587890625e-05 631.5026245117188 36.94009399414062 631.5026245117188 82.50788879394531 C 631.5026245117188 128.07568359375 490.1360168457031 165.0157928466797 315.7513122558594 165.0157928466797 C 141.36669921875 165.0157928466797 0 128.07568359375 0 82.50788879394531 C 0 36.94009399414062 141.36669921875 -1.52587890625e-05 315.7513122558594 -1.52587890625e-05 Z" stroke="none" fill="#d9f2f2" />
                     </g>
                     <circle id="Ellipse_8" data-name="Ellipse 8" cx="13.751" cy="13.751" r="13.751" transform="translate(1337.3 572.716)" fill="#bba3c4" />
                     <circle id="Ellipse_27" data-name="Ellipse 27" cx="13.751" cy="13.751" r="13.751" transform="translate(1626.077 608.681)" fill="#bba3c4" />
                     <circle id="Ellipse_9" data-name="Ellipse 9" cx="16.925" cy="16.925" r="16.925" transform="translate(1378.553 588.583)" fill="#bba3c4" />
                     <circle id="Ellipse_31" data-name="Ellipse 31" cx="16.925" cy="16.925" r="16.925" transform="translate(1754.07 578.005)" fill="#bba3c4" />
                     <circle id="Ellipse_18" data-name="Ellipse 18" cx="16.925" cy="16.925" r="16.925" transform="translate(1645.117 569.543)" fill="#bba3c4" />
                     <circle id="Ellipse_10" data-name="Ellipse 10" cx="23.271" cy="23.271" r="23.271" transform="translate(1469.524 558.965)" fill="#bba3c4" />
                     <circle id="Ellipse_11" data-name="Ellipse 11" cx="14.809" cy="14.809" r="14.809" transform="translate(1683.198 580.121)" fill="#eda4a4" />
                     <circle id="Ellipse_12" data-name="Ellipse 12" cx="17.454" cy="17.454" r="17.454" transform="translate(1434.617 580.121)" fill="#eda4a4" />
                     <circle id="Ellipse_29" data-name="Ellipse 29" cx="17.454" cy="17.454" r="17.454" transform="translate(1347.877 593.872)" fill="#eda4a4" />
                     <circle id="Ellipse_13" data-name="Ellipse 13" cx="15.338" cy="15.338" r="15.338" transform="translate(1600.69 588.583)" fill="#eda4a4" />
                     <circle id="Ellipse_33" data-name="Ellipse 33" cx="15.338" cy="15.338" r="15.338" transform="translate(1506.546 546.272)" fill="#eda4a4" />
                     <circle id="Ellipse_17" data-name="Ellipse 17" cx="24.858" cy="24.858" r="24.858" transform="translate(1521.356 573.774)" fill="#eda4a4" />
                     <circle id="Ellipse_16" data-name="Ellipse 16" cx="14.809" cy="14.809" r="14.809" transform="translate(1388.074 558.965)" fill="#eda4a4" />
                     <circle id="Ellipse_14" data-name="Ellipse 14" cx="14.809" cy="14.809" r="14.809" transform="translate(1485.391 603.392)" fill="#eda4a4" />
                     <circle id="Ellipse_15" data-name="Ellipse 15" cx="14.809" cy="14.809" r="14.809" transform="translate(1272.774 580.121)" fill="#eda4a4" />
                     <circle id="Ellipse_19" data-name="Ellipse 19" cx="16.396" cy="16.396" r="16.396" transform="translate(1420.865 604.45)" fill="#fff" />
                     <circle id="Ellipse_28" data-name="Ellipse 28" cx="16.396" cy="16.396" r="16.396" transform="translate(1419.808 553.676)" fill="#fff" />
                     <circle id="Ellipse_21" data-name="Ellipse 21" cx="16.396" cy="16.396" r="16.396" transform="translate(1562.609 609.739)" fill="#fff" />
                     <circle id="Ellipse_26" data-name="Ellipse 26" cx="16.396" cy="16.396" r="16.396" transform="translate(1613.384 564.254)" fill="#fff" />
                     <circle id="Ellipse_25" data-name="Ellipse 25" cx="16.396" cy="16.396" r="16.396" transform="translate(1513.951 609.739)" fill="#fff" />
                     <circle id="Ellipse_22" data-name="Ellipse 22" cx="16.396" cy="16.396" r="16.396" transform="translate(1662.042 599.161)" fill="#fff" />
                     <circle id="Ellipse_23" data-name="Ellipse 23" cx="16.396" cy="16.396" r="16.396" transform="translate(1728.683 576.947)" fill="#fff" />
                     <circle id="Ellipse_24" data-name="Ellipse 24" cx="16.396" cy="16.396" r="16.396" transform="translate(1563.667 555.792)" fill="#fff" />
                     <circle id="Ellipse_30" data-name="Ellipse 30" cx="16.396" cy="16.396" r="16.396" transform="translate(1700.123 592.814)" fill="#fff" />
                     <circle id="Ellipse_20" data-name="Ellipse 20" cx="16.396" cy="16.396" r="16.396" transform="translate(1318.259 589.641)" fill="#fff" />
                     <circle id="Ellipse_32" data-name="Ellipse 32" cx="16.925" cy="16.925" r="16.925" transform="translate(1718.105 589.641)" fill="#bba3c4" />
                  </g>
                  <g id="homepageBasketball" transform="translate(-148.503 118.416)">
                     <circle id="Ellipse_6" data-name="Ellipse 6" cx="63.29" cy="63.29" r="63.29" transform="translate(169 737)" fill="#ef8d37" />
                     <line id="Line_25" data-name="Line 25" x2="126.579" transform="translate(169 800.29)" fill="none" stroke="#707070" strokeWidth="7" />
                     <path id="Path_6" data-name="Path 6" d="M0,0S17.577,24.346,18.345,48,3.072,94.627,3.072,94.627" transform="translate(188.97 754.512)" fill="none" stroke="#707070" strokeWidth="7" />
                     <path id="Path_7" data-name="Path 7" d="M18.371,0S.795,24.346.027,48,15.3,94.627,15.3,94.627" transform="translate(257.175 754.512)" fill="none" stroke="#707070" strokeWidth="7" opacity="0.8" />
                     <line id="Line_26" data-name="Line 26" y2="126.579" transform="translate(232.597 737.307)" fill="none" stroke="#707070" strokeWidth="7" />
                  </g>
                  <g id="homepageCabinet" transform="translate(1175.474 417.957)">
                     <path id="Path_13" data-name="Path 13" d="M8.323,0c7.427,0,10.083,76.528,10.083,76.528S16.484,79.064,9.9,79.064,0,76.528,0,76.528.9,0,8.323,0Z" transform="translate(483.222 484.886) rotate(180)" fill="#d6c298" />
                     <path id="Path_15" data-name="Path 15" d="M8.323,0c7.427,0,10.083,76.528,10.083,76.528S16.484,79.064,9.9,79.064,0,76.528,0,76.528.9,0,8.323,0Z" transform="translate(688.401 484.886) rotate(180)" fill="#d6c298" />
                     <rect id="Rectangle_50" data-name="Rectangle 50" width="303.526" height="221.754" rx="10" transform="translate(418 201.382)" fill="#d6c298" />
                     <rect id="Rectangle_53" data-name="Rectangle 53" width="281.351" height="99.789" transform="translate(429.088 212.47)" fill="#c18c57" />
                     <rect id="Rectangle_55" data-name="Rectangle 55" width="281.351" height="99.789" transform="translate(429.088 313.645)" fill="#c18c57" />
                     <rect id="Rectangle_51" data-name="Rectangle 51" width="271.649" height="92.86" transform="translate(434.632 216.627)" fill="#e0d5bf" />
                     <rect id="Rectangle_54" data-name="Rectangle 54" width="271.649" height="92.86" transform="translate(434.632 317.803)" fill="#e0d5bf" />
                     <g transform="matrix(1, 0, 0, 1, -1175.47, -417.96)" filter="url(#Ellipse_37)">
                        <ellipse id="Ellipse_37-2" data-name="Ellipse 37" cx="6.93" cy="6.237" rx="6.93" ry="6.237" transform="translate(1739 638.74)" fill="#760202" />
                     </g>
                     <g transform="matrix(1, 0, 0, 1, -1175.47, -417.96)" filter="url(#Ellipse_38)">
                        <circle id="Ellipse_38-2" data-name="Ellipse 38" cx="6.93" cy="6.93" r="6.93" transform="translate(1739 739.92)" fill="#760202" />
                     </g>
                  </g>
                  <g id="homepageLight" transform="translate(569.222 -103.5)">
                     <path id="Path_4" data-name="Path 4" d="M0,2.318S107.032,138.249,260.438,143.685C451.483,142.336,589.5,0,589.5,0" transform="translate(62.5 357.5)" fill="none" stroke="#707070" strokeWidth="4" />
                     <line id="Line_16" data-name="Line 16" y2="29.37" transform="translate(96.066 396.748)" fill="none" stroke="#707070" strokeWidth="4" />
                     <rect id="Rectangle_23" data-name="Rectangle 23" width="12.362" height="18.543" transform="translate(90.148 416.025)" fill="#363636" />
                     <path id="Path_5" data-name="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(110.621 461.936) rotate(180)" fill="#ffd230" />
                     <path id="Path_23" data-name="Path 23" d="M0,0V29.37" transform="translate(161.099 449.258)" fill="none" stroke="#707070" strokeWidth="4" />
                     <rect id="Rectangle_23-2" data-name="Rectangle 23" width="12.362" height="18.543" transform="translate(154.918 468.626)" fill="#363636" />
                     <path id="Path_5-2" data-name="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(175.392 514.537) rotate(180)" fill="#ffd230" />
                     <line id="Line_16-2" data-name="Line 16" y2="27.272" transform="translate(234.524 482.346)" fill="none" stroke="#707070" strokeWidth="4" />
                     <rect id="Rectangle_23-3" data-name="Rectangle 23" width="12.362" height="18.543" transform="translate(228.224 500.818)" fill="#363636" />
                     <path id="Path_5-3" data-name="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(248.698 546.729) rotate(180)" fill="#ffd230" />
                     <line id="Line_16-3" data-name="Line 16" y2="27.272" transform="translate(316.34 499.129)" fill="none" stroke="#707070" strokeWidth="4" />
                     <rect id="Rectangle_23-4" data-name="Rectangle 23" width="12.362" height="18.543" transform="translate(310.12 517.043)" fill="#363636" />
                     <path id="Path_5-4" data-name="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(330.594 562.954) rotate(180)" fill="#ffd230" />
                     <line id="Line_16-4" data-name="Line 16" y2="27.272" transform="translate(391.863 494.934)" fill="none" stroke="#707070" strokeWidth="4" />
                     <rect id="Rectangle_23-5" data-name="Rectangle 23" width="12.362" height="18.543" transform="translate(385.682 513.953)" fill="#363636" />
                     <path id="Path_5-5" data-name="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(406.156 559.864) rotate(180)" fill="#ffd230" />
                     <line id="Line_16-5" data-name="Line 16" x2="0.773" y2="27.814" transform="translate(468.117 475.931)" fill="none" stroke="#707070" strokeWidth="4" />
                     <rect id="Rectangle_23-6" data-name="Rectangle 23" width="12.362" height="18.543" transform="translate(463.095 494.474)" fill="#363636" />
                     <path id="Path_5-6" data-name="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(483.569 540.385) rotate(180)" fill="#ffd230" />
                     <line id="Line_16-6" data-name="Line 16" x2="0.773" y2="27.814" transform="translate(541.515 438.846)" fill="none" stroke="#707070" strokeWidth="4" />
                     <rect id="Rectangle_23-7" data-name="Rectangle 23" width="12.362" height="18.543" transform="translate(536.493 457.388)" fill="#363636" />
                     <path id="Path_5-7" data-name="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(556.967 503.299) rotate(180)" fill="#ffd230" />
                     <line id="Line_16-7" data-name="Line 16" x2="0.773" y2="27.814" transform="translate(618.775 387.854)" fill="none" stroke="#707070" strokeWidth="4" />
                     <rect id="Rectangle_23-8" data-name="Rectangle 23" width="12.362" height="18.543" transform="translate(613.753 406.396)" fill="#363636" />
                     <path id="Path_5-8" data-name="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(634.227 452.308) rotate(180)" fill="#ffd230" />
                  </g>
                  <g id="homepageTV" transform="translate(-314 -64.774)">
                     <g id="Rectangle_43" data-name="Rectangle 43" transform="translate(442 266.774)" fill="#464444" stroke="#707070" strokeWidth="1">
                        <rect width="436" height="226" stroke="none" />
                        <rect x="0.5" y="0.5" width="435" height="225" fill="none" />
                     </g>
                     <g id="Rectangle_44" data-name="Rectangle 44" transform="translate(455 277.774)" fill="#dbdbdb" stroke="#707070" strokeWidth="1">
                        <rect width="414" height="203" stroke="none" />
                        <rect x="0.5" y="0.5" width="413" height="202" fill="none" />
                     </g>
                     <g transform="matrix(1, 0, 0, 1, 314, 64.77)" filter="url(#Path_751)">
                        <path id="Path_751-2" data-name="Path 751" d="M28.59,0s-12.1,10.211-18.551,34.886S0,96.954,0,96.954" transform="translate(487.66 416) rotate(-155)" fill="#fff" opacity="0.25" />
                     </g>
                     <g transform="matrix(1, 0, 0, 1, 314, 64.77)" filter="url(#Path_752)">
                        <path id="Path_752-2" data-name="Path 752" d="M56.556,0s-23.933,10.211-36.7,34.886S0,96.954,0,96.954" transform="translate(177.4 221.67) rotate(11)" fill="#fff" opacity="0.25" />
                     </g>
                  </g>
                  <g id="homepageMirror" transform="translate(2252.679 -3053)">
                     <g data-type="innerShadowGroup">
                        <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Subtraction_8)">
                           <path id="Subtraction_8-3" data-name="Subtraction 8" d="M3.618,81.276h0A60.642,60.642,0,0,1,5.75,34.8L26.231,62.11l-8.69-44.153a60.438,60.438,0,0,1,17.892-12.5l13.925,45.93,8-51.3C58.436.028,59.525,0,60.6,0A61.194,61.194,0,0,1,71.368.954l7.866,50.43,12.9-42.547a61.032,61.032,0,0,1,10.249,7.875l-8.936,45.4,21.4-28.538a60.28,60.28,0,0,1,4.7,12.921,60.97,60.97,0,0,1-1.97,34.781C100.518,67.747,80.816,60.6,60.6,60.6S20.673,67.747,3.62,81.276Z" transform="translate(1684.14 270)" fill="#ffd230" />
                        </g>
                        <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Subtraction_8-2)">
                           <path id="Subtraction_8-4" data-name="Subtraction 8" d="M3.618,81.276h0A60.642,60.642,0,0,1,5.75,34.8L26.231,62.11l-8.69-44.153a60.438,60.438,0,0,1,17.892-12.5l13.925,45.93,8-51.3C58.436.028,59.525,0,60.6,0A61.194,61.194,0,0,1,71.368.954l7.866,50.43,12.9-42.547a61.032,61.032,0,0,1,10.249,7.875l-8.936,45.4,21.4-28.538a60.28,60.28,0,0,1,4.7,12.921,60.97,60.97,0,0,1-1.97,34.781C100.518,67.747,80.816,60.6,60.6,60.6S20.673,67.747,3.62,81.276Z" transform="translate(1684.14 270)" fill="#fff" />
                        </g>
                     </g>
                     <g data-type="innerShadowGroup">
                        <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Path_736)">
                           <g id="Path_736-3" data-name="Path 736" transform="translate(1637.68 329.59)" fill="rgba(102,229,255,0.86)">
                              <path d="M 107.5577926635742 262.681884765625 C 53.76424789428711 262.681884765625 10.00002002716064 206.0055694580078 10.00002002716064 136.3409271240234 C 10.00002002716064 66.67633819580078 53.76424789428711 10.00001811981201 107.5577926635742 10.00001811981201 C 161.3513336181641 10.00001811981201 205.1156158447266 66.67633819580078 205.1156158447266 136.3409271240234 C 205.1156158447266 206.0055694580078 161.3513336181641 262.681884765625 107.5577926635742 262.681884765625 Z" stroke="none" />
                              <path d="M 107.5577926635742 19.99998474121094 C 59.27825927734375 19.99998474121094 20 72.19029235839844 20 136.3409271240234 C 20 200.4915161132812 59.27825927734375 252.6818237304688 107.5577926635742 252.6818237304688 C 155.8373107910156 252.6818237304688 195.1155853271484 200.4915161132812 195.1155853271484 136.3409271240234 C 195.1155853271484 72.19029235839844 155.8373107910156 19.99998474121094 107.5577926635742 19.99998474121094 M 107.5577926635742 -3.0517578125e-05 C 166.9603271484375 -3.0517578125e-05 215.1155853271484 61.04193115234375 215.1155853271484 136.3409271240234 C 215.1155853271484 211.6399841308594 166.9603271484375 272.6818237304688 107.5577926635742 272.6818237304688 C 48.1552734375 272.6818237304688 0 211.6399841308594 0 136.3409271240234 C 0 61.04193115234375 48.1552734375 -3.0517578125e-05 107.5577926635742 -3.0517578125e-05 Z" stroke="none" fill="#3e88a8" />
                           </g>
                        </g>
                        <g id="Path_736-4" data-name="Path 736" transform="translate(-615 3382.586)" fill="rgba(102,229,255,0.86)">
                           <path d="M 107.5577926635742 262.681884765625 C 53.76424789428711 262.681884765625 10.00002002716064 206.0055694580078 10.00002002716064 136.3409271240234 C 10.00002002716064 66.67633819580078 53.76424789428711 10.00001811981201 107.5577926635742 10.00001811981201 C 161.3513336181641 10.00001811981201 205.1156158447266 66.67633819580078 205.1156158447266 136.3409271240234 C 205.1156158447266 206.0055694580078 161.3513336181641 262.681884765625 107.5577926635742 262.681884765625 Z" stroke="none" />
                           <path d="M 107.5577926635742 19.99998474121094 C 59.27825927734375 19.99998474121094 20 72.19029235839844 20 136.3409271240234 C 20 200.4915161132812 59.27825927734375 252.6818237304688 107.5577926635742 252.6818237304688 C 155.8373107910156 252.6818237304688 195.1155853271484 200.4915161132812 195.1155853271484 136.3409271240234 C 195.1155853271484 72.19029235839844 155.8373107910156 19.99998474121094 107.5577926635742 19.99998474121094 M 107.5577926635742 -3.0517578125e-05 C 166.9603271484375 -3.0517578125e-05 215.1155853271484 61.04193115234375 215.1155853271484 136.3409271240234 C 215.1155853271484 211.6399841308594 166.9603271484375 272.6818237304688 107.5577926635742 272.6818237304688 C 48.1552734375 272.6818237304688 0 211.6399841308594 0 136.3409271240234 C 0 61.04193115234375 48.1552734375 -3.0517578125e-05 107.5577926635742 -3.0517578125e-05 Z" stroke="none" />
                        </g>
                        <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Path_736-2)">
                           <g id="Path_736-5" data-name="Path 736" transform="translate(1637.68 329.59)" fill="#fff">
                              <path d="M 107.5577926635742 262.681884765625 C 53.76424789428711 262.681884765625 10.00002002716064 206.0055694580078 10.00002002716064 136.3409271240234 C 10.00002002716064 66.67633819580078 53.76424789428711 10.00001811981201 107.5577926635742 10.00001811981201 C 161.3513336181641 10.00001811981201 205.1156158447266 66.67633819580078 205.1156158447266 136.3409271240234 C 205.1156158447266 206.0055694580078 161.3513336181641 262.681884765625 107.5577926635742 262.681884765625 Z" stroke="none" />
                              <path d="M 107.5577926635742 19.99998474121094 C 59.27825927734375 19.99998474121094 20 72.19029235839844 20 136.3409271240234 C 20 200.4915161132812 59.27825927734375 252.6818237304688 107.5577926635742 252.6818237304688 C 155.8373107910156 252.6818237304688 195.1155853271484 200.4915161132812 195.1155853271484 136.3409271240234 C 195.1155853271484 72.19029235839844 155.8373107910156 19.99998474121094 107.5577926635742 19.99998474121094 M 107.5577926635742 -3.0517578125e-05 C 166.9603271484375 -3.0517578125e-05 215.1155853271484 61.04193115234375 215.1155853271484 136.3409271240234 C 215.1155853271484 211.6399841308594 166.9603271484375 272.6818237304688 107.5577926635742 272.6818237304688 C 48.1552734375 272.6818237304688 0 211.6399841308594 0 136.3409271240234 C 0 61.04193115234375 48.1552734375 -3.0517578125e-05 107.5577926635742 -3.0517578125e-05 Z" stroke="none" />
                           </g>
                        </g>
                        <g id="Path_736-6" data-name="Path 736" transform="translate(-615 3382.586)" fill="none">
                           <path d="M 107.5577926635742 262.681884765625 C 53.76424789428711 262.681884765625 10.00002002716064 206.0055694580078 10.00002002716064 136.3409271240234 C 10.00002002716064 66.67633819580078 53.76424789428711 10.00001811981201 107.5577926635742 10.00001811981201 C 161.3513336181641 10.00001811981201 205.1156158447266 66.67633819580078 205.1156158447266 136.3409271240234 C 205.1156158447266 206.0055694580078 161.3513336181641 262.681884765625 107.5577926635742 262.681884765625 Z" stroke="none" />
                           <path d="M 107.5577926635742 19.99998474121094 C 59.27825927734375 19.99998474121094 20 72.19029235839844 20 136.3409271240234 C 20 200.4915161132812 59.27825927734375 252.6818237304688 107.5577926635742 252.6818237304688 C 155.8373107910156 252.6818237304688 195.1155853271484 200.4915161132812 195.1155853271484 136.3409271240234 C 195.1155853271484 72.19029235839844 155.8373107910156 19.99998474121094 107.5577926635742 19.99998474121094 M 107.5577926635742 -3.0517578125e-05 C 166.9603271484375 -3.0517578125e-05 215.1155853271484 61.04193115234375 215.1155853271484 136.3409271240234 C 215.1155853271484 211.6399841308594 166.9603271484375 272.6818237304688 107.5577926635742 272.6818237304688 C 48.1552734375 272.6818237304688 0 211.6399841308594 0 136.3409271240234 C 0 61.04193115234375 48.1552734375 -3.0517578125e-05 107.5577926635742 -3.0517578125e-05 Z" stroke="none" fill="#3e88a8" />
                        </g>
                     </g>
                     <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Path_737)">
                        <path id="Path_737-2" data-name="Path 737" d="M56.556,0s-23.933,10.211-36.7,34.886S0,96.954,0,96.954" transform="translate(1655.86 357.64)" fill="#fff" opacity="0.25" />
                     </g>
                     <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Path_738)">
                        <path id="Path_738-2" data-name="Path 738" d="M28.59,0s-12.1,10.211-18.551,34.886S0,96.954,0,96.954" transform="matrix(-0.97, -0.26, 0.26, -0.97, 1696.7, 465.93)" fill="#fff" opacity="0.25" />
                     </g>
                  </g>
                  <g id="homepageClock" transform="translate(1493 -3374.358)">
                     <circle id="Ellipse_57" data-name="Ellipse 57" cx="72" cy="72" r="72" transform="translate(-660 3471.358)" fill="#939191" opacity="0.88" />
                     <line id="Line_30" data-name="Line 30" y1="40.581" x2="37" transform="translate(-588.685 3503.462)" fill="none" stroke="#ffcfa5" strokeLinecap="round" strokeWidth="7" />
                     <line id="Line_31" data-name="Line 31" y1="12.532" x2="36.404" transform="translate(-625.088 3544.043)" fill="none" stroke="#ffcfa5" strokeLinecap="round" strokeWidth="7" />
                  </g>

                  <g id="homepageDuck" data-name="鴨子" transform="translate(7.36 47.98)">
                     <line id="Line_17-2" data-name="Line 17" y2="31" transform="translate(860.5 832.5)" fill="none" stroke="#574809" strokeWidth="10" />
                     <line id="Line_21-2" data-name="Line 21" y2="31" transform="translate(946.5 832.5)" fill="none" stroke="#574809" strokeWidth="10" />
                     <line id="Line_18-2" data-name="Line 18" x1="19" y2="15" transform="translate(839.5 861.5)" fill="none" stroke="#574809" strokeWidth="10" />
                     <line id="Line_24-2" data-name="Line 24" x1="19" y2="15" transform="translate(925.5 861.5)" fill="none" stroke="#574809" strokeWidth="10" />
                     <line id="Line_19-2" data-name="Line 19" y2="29.25" transform="translate(860.5 857.25)" fill="none" stroke="#574809" strokeWidth="10" />
                     <line id="Line_22-2" data-name="Line 22" y2="29.25" transform="translate(946.5 857.25)" fill="none" stroke="#574809" strokeWidth="10" />
                     <line id="Line_20-2" data-name="Line 20" x2="19" y2="13" transform="translate(862.5 861.5)" fill="none" stroke="#574809" strokeWidth="10" />
                     <line id="Line_23-2" data-name="Line 23" x2="19" y2="13" transform="translate(948.5 861.5)" fill="none" stroke="#574809" strokeWidth="10" />
                     <ellipse id="Ellipse_2-2" data-name="Ellipse 2" cx="159" cy="128.5" rx="159" ry="128.5" transform="translate(741 424)" fill="#ffd230" />
                     <ellipse id="Ellipse_3-2" data-name="Ellipse 3" cx="178.5" cy="144" rx="178.5" ry="144" transform="translate(722 553)" fill="#ffd230" />
                     <path id="Polygon_1-2" data-name="Polygon 1" d="M48,0,96,44H0Z" transform="translate(852 512)" fill="#f70" />
                     <ellipse id="Ellipse_4-2" data-name="Ellipse 4" cx="14" cy="14.5" rx="14" ry="14.5" transform="translate(817 505)" />
                     <ellipse id="Ellipse_5-2" data-name="Ellipse 5" cx="14" cy="14.5" rx="14" ry="14.5" transform="translate(960 505)" />
                     <path id="homepageWingRight" data-name="Path 10" d="M108.133-6.73S129,28.878,129,64.5A64.5,64.5,0,0,1,64.5,129c-35.622,0-66.147-25.193-66.147-25.193S36.632,67.92,52.757,51.8,108.133-6.73,108.133-6.73Z" transform="matrix(0.961, 0.276, -0.276, 0.961, 691.142, 604.682)" fill="#574809" />
                     <path id="homepageWingLeft" data-name="Path 11" d="M109.78,135.73s20.867-35.607,20.867-71.23A64.5,64.5,0,0,0,66.147,0C30.525,0,0,25.193,0,25.193S38.279,61.08,54.4,77.2,109.78,135.73,109.78,135.73Z" transform="translate(1140.499 728.23)" fill="#574804" />
                     <path id="Polygon_11" data-name="Polygon 11" d="M48,0,96,44H0Z" transform="translate(852 512)" fill="#f70" />
                  </g>
                  <g id="homepageGlasses" transform="translate(19 178.78)">
                     <g id="Ellipse_41" data-name="Ellipse 41" transform="translate(840.435 361.22)" fill="#dbdbdb" stroke="#707070" strokeWidth="6">
                        <ellipse cx="18.981" cy="18.981" rx="18.981" ry="18.981" stroke="none" />
                        <ellipse cx="18.981" cy="18.981" rx="15.981" ry="15.981" fill="none" />
                     </g>
                     <g id="Ellipse_42" data-name="Ellipse 42" transform="translate(893.189 361.22)" fill="#dbdbdb" stroke="#707070" strokeWidth="6">
                        <ellipse cx="18.799" cy="18.981" rx="18.799" ry="18.981" stroke="none" />
                        <ellipse cx="18.799" cy="18.981" rx="15.799" ry="15.981" fill="none" />
                     </g>
                     <path id="Path_34" data-name="Path 34" d="M.186-15.792s4.6-3.474,8.8-3.474,7.941,3.474,7.941,3.474" transform="translate(876.265 395.993)" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="6" />
                  </g>
                  <g id="homepageFemaleDuck" transform="translate(3452.552 -5379.475)">
                     <g id="鴨子-3" data-name="鴨子" transform="translate(-2411.749 5900.052)">
                        <line id="Line_17-3" data-name="Line 17" y2="28.213" transform="translate(144.931 371.771)" fill="none" stroke="#574809" strokeWidth="7" />
                        <line id="Line_21-3" data-name="Line 21" y2="28.213" transform="translate(223.198 371.771)" fill="none" stroke="#574809" strokeWidth="7" />
                        <line id="Line_18-3" data-name="Line 18" x1="17.292" y2="13.651" transform="translate(125.819 398.164)" fill="none" stroke="#574809" strokeWidth="7" />
                        <line id="Line_24-3" data-name="Line 24" x1="17.292" y2="13.651" transform="translate(204.086 398.164)" fill="none" stroke="#574809" strokeWidth="7" />
                        <line id="Line_19-3" data-name="Line 19" y2="26.62" transform="translate(144.931 394.296)" fill="none" stroke="#574809" strokeWidth="7" />
                        <line id="Line_22-3" data-name="Line 22" y2="26.62" transform="translate(223.198 394.296)" fill="none" stroke="#574809" strokeWidth="7" />
                        <line id="Line_20-3" data-name="Line 20" x2="17.292" y2="11.831" transform="translate(146.751 398.164)" fill="none" stroke="#574809" strokeWidth="7" />
                        <line id="Line_23-3" data-name="Line 23" x2="17.292" y2="11.831" transform="translate(225.018 398.164)" fill="none" stroke="#574809" strokeWidth="7" />
                        <ellipse id="Ellipse_2-3" data-name="Ellipse 2" cx="144.704" cy="116.946" rx="144.704" ry="116.946" transform="translate(36.175 0)" fill="#ffd230" />
                        <ellipse id="Ellipse_3-3" data-name="Ellipse 3" cx="162.451" cy="131.053" rx="162.451" ry="131.053" transform="translate(18.883 117.402)" fill="#ffd230" />
                        <path id="Polygon_1-3" data-name="Polygon 1" d="M43.684,0,87.369,40.044H0Z" transform="translate(137.195 80.088)" fill="#f70" />
                        <ellipse id="Ellipse_4-3" data-name="Ellipse 4" cx="12.741" cy="13.196" rx="12.741" ry="13.196" transform="translate(105.342 73.717)" />
                        <ellipse id="Ellipse_5-3" data-name="Ellipse 5" cx="12.741" cy="13.196" rx="12.741" ry="13.196" transform="translate(235.484 73.717)" />
                        <path id="Path_10-3" data-name="Path 10" d="M99.91,0S118.9,32.406,118.9,64.826a58.7,58.7,0,0,1-58.7,58.7C27.78,123.526,0,100.6,0,100.6s34.837-32.66,49.512-47.335S99.91,0,99.91,0Z" transform="matrix(-0.454, 0.891, -0.891, -0.454, 164.042, 223.524)" fill="coral" />
                        <path id="Path_11-3" data-name="Path 11" d="M99.91,123.526S118.9,91.12,118.9,58.7A58.7,58.7,0,0,0,60.2,0C27.78,0,0,22.928,0,22.928s34.837,32.66,49.512,47.335S99.91,123.526,99.91,123.526Z" transform="translate(320.163 167.444) rotate(70)" fill="coral" />
                     </g>
                     <g id="Group_23" data-name="Group 23" transform="translate(-2186.699 5852.489) rotate(16)">
                        <g id="Group_22" data-name="Group 22" transform="translate(0 0)">
                           <path id="Union_1" data-name="Union 1" d="M76.987,92.013a23.466,23.466,0,0,1-5.611-1.65,33.4,33.4,0,0,1-5.829-3.24A40.574,40.574,0,0,1,59.9,82.4a41.586,41.586,0,0,1-3.211-3.6,37.853,37.853,0,0,1-2.61-3.739,32.514,32.514,0,0,1-1.98-3.766c-.364-.824-.682-1.647-.951-2.46-.268.812-.586,1.636-.951,2.46a32.53,32.53,0,0,1-1.98,3.766,37.871,37.871,0,0,1-2.61,3.739A41.59,41.59,0,0,1,42.4,82.4a40.49,40.49,0,0,1-5.794,4.82,33.036,33.036,0,0,1-5.972,3.261,22.819,22.819,0,0,1-5.723,1.585,13.6,13.6,0,0,1-5.045-.207L29.044,75.9,13.558,85.541a13.637,13.637,0,0,1-.2-5.043,22.862,22.862,0,0,1,1.589-5.717,33.056,33.056,0,0,1,3.26-5.964,40.49,40.49,0,0,1,4.815-5.785,41.558,41.558,0,0,1,3.6-3.211,37.869,37.869,0,0,1,3.739-2.61A33,33,0,0,1,33.546,55.5q-.022-.1-.043-.206a26.409,26.409,0,0,1-3.544.054,32.507,32.507,0,0,1-4.225-.5,37.864,37.864,0,0,1-4.426-1.1,41.569,41.569,0,0,1-4.516-1.706,40.618,40.618,0,0,1-6.343-3.521,33.6,33.6,0,0,1-5.068-4.2,23.867,23.867,0,0,1-3.56-4.569A14.674,14.674,0,0,1,0,35.135l20.14,3.157L3.89,26a14.255,14.255,0,0,1,4.647-1.835,23.467,23.467,0,0,1,5.83-.471,33.4,33.4,0,0,1,6.6.936,40.579,40.579,0,0,1,6.965,2.383,41.581,41.581,0,0,1,4.29,2.215A37.869,37.869,0,0,1,36,31.788q.872.672,1.681,1.382-.212-.73-.394-1.483a37.861,37.861,0,0,1-.8-4.489,41.576,41.576,0,0,1-.278-4.82,40.61,40.61,0,0,1,.636-7.226,33.6,33.6,0,0,1,1.779-6.339A23.861,23.861,0,0,1,41.352,3.7,14.672,14.672,0,0,1,44.829.16l5.308,19.683L54.751,0a14.256,14.256,0,0,1,3.567,3.5,23.476,23.476,0,0,1,2.8,5.134,33.393,33.393,0,0,1,1.831,6.412,40.576,40.576,0,0,1,.656,7.332,41.58,41.58,0,0,1-.278,4.82,37.862,37.862,0,0,1-.8,4.489q-.038.159-.078.317.6-.51,1.239-1a37.867,37.867,0,0,1,3.777-2.555,41.549,41.549,0,0,1,4.29-2.215,40.612,40.612,0,0,1,6.861-2.358,33.609,33.609,0,0,1,6.515-.953,23.87,23.87,0,0,1,5.778.411,14.673,14.673,0,0,1,4.649,1.736L79.736,37.924l20-3.855a14.253,14.253,0,0,1-1.746,4.681A23.469,23.469,0,0,1,94.444,43.4a33.386,33.386,0,0,1-5.113,4.281A40.565,40.565,0,0,1,82.9,51.259a41.56,41.56,0,0,1-4.516,1.706,37.837,37.837,0,0,1-4.426,1.1,32.51,32.51,0,0,1-4.225.5,26.675,26.675,0,0,1-3.281-.033l0,.011q.852.311,1.712.691a32.517,32.517,0,0,1,3.766,1.98,37.858,37.858,0,0,1,3.739,2.61,41.554,41.554,0,0,1,3.6,3.211,40.617,40.617,0,0,1,4.66,5.56,33.608,33.608,0,0,1,3.225,5.74,23.868,23.868,0,0,1,1.687,5.541,14.673,14.673,0,0,1,.045,4.962L71.215,74.671,81.983,91.965a12.564,12.564,0,0,1-2.52.244A16.431,16.431,0,0,1,76.987,92.013Z" transform="matrix(0.978, 0.208, -0.208, 0.978, 19.171, 0)" fill="#ffb8b8" />
                        </g>
                        <circle id="Ellipse_46" data-name="Ellipse 46" cx="16.837" cy="16.837" r="16.837" transform="translate(42.09 42.674)" fill="#fff" />
                     </g>
                     <ellipse id="Ellipse_49" data-name="Ellipse 49" cx="27.303" cy="14.561" rx="27.303" ry="14.561" transform="translate(-2186.73 6017.681)" fill="rgba(188,13,43,0.22)" opacity="0.57" />
                     <ellipse id="Ellipse_50" data-name="Ellipse 50" cx="27.303" cy="14.561" rx="27.303" ry="14.561" transform="translate(-2333.709 6017.681)" fill="rgba(188,13,43,0.22)" opacity="0.57" />
                  </g>
                  <g id="homepageWeight" transform="translate(2139 -2930.241)">
                     <g id="Group_28" data-name="Group 28" transform="translate(-1914 3730.343)">
                        <g data-type="innerShadowGroup">
                           <rect id="Rectangle_84-2" data-name="Rectangle 84" width="177" height="28" transform="translate(99 61.898)" fill="#aeaeae" />
                           <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_84)">
                              <rect id="Rectangle_84-3" data-name="Rectangle 84" width="177" height="28" transform="translate(324 862)" fill="#fff" />
                           </g>
                        </g>
                        <g data-type="innerShadowGroup">
                           <rect id="Rectangle_85-2" data-name="Rectangle 85" width="32" height="154" rx="16" transform="translate(67 -0.102)" fill="#5e5e5e" />
                           <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_85)">
                              <rect id="Rectangle_85-3" data-name="Rectangle 85" width="32" height="154" rx="16" transform="translate(292 800)" fill="#fff" />
                           </g>
                        </g>
                        <g data-type="innerShadowGroup">
                           <rect id="Rectangle_86-2" data-name="Rectangle 86" width="32" height="154" rx="16" transform="translate(276 -0.102)" fill="#5e5e5e" />
                           <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_86)">
                              <rect id="Rectangle_86-3" data-name="Rectangle 86" width="32" height="154" rx="16" transform="translate(501 800)" fill="#fff" />
                           </g>
                        </g>
                        <g data-type="innerShadowGroup">
                           <rect id="Rectangle_87-2" data-name="Rectangle 87" width="25" height="125" rx="12.5" transform="translate(308 13.898)" fill="#5e5e5e" />
                           <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_87)">
                              <rect id="Rectangle_87-3" data-name="Rectangle 87" width="25" height="125" rx="12.5" transform="translate(533 814)" fill="#fff" />
                           </g>
                        </g>
                        <g data-type="innerShadowGroup">
                           <rect id="Rectangle_88-2" data-name="Rectangle 88" width="27" height="125" rx="13.5" transform="translate(40 13.898)" fill="#5e5e5e" />
                           <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_88)">
                              <rect id="Rectangle_88-3" data-name="Rectangle 88" width="27" height="125" rx="13.5" transform="translate(265 814)" fill="#fff" />
                           </g>
                        </g>
                        <g data-type="innerShadowGroup">
                           <rect id="Rectangle_89-2" data-name="Rectangle 89" width="20" height="91" rx="10" transform="translate(333 30.898)" fill="#5e5e5e" />
                           <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_89)">
                              <rect id="Rectangle_89-3" data-name="Rectangle 89" width="20" height="91" rx="10" transform="translate(558 831)" fill="#fff" />
                           </g>
                        </g>
                        <g data-type="innerShadowGroup">
                           <rect id="Rectangle_90-2" data-name="Rectangle 90" width="18" height="91" rx="9" transform="translate(22 30.898)" fill="#5e5e5e" />
                           <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_90)">
                              <rect id="Rectangle_90-3" data-name="Rectangle 90" width="18" height="91" rx="9" transform="translate(247 831)" fill="#fff" />
                           </g>
                        </g>
                        <g data-type="innerShadowGroup">
                           <path id="Rectangle_91-2" data-name="Rectangle 91" d="M0,0H5.88A15.12,15.12,0,0,1,21,15.12v0A12.88,12.88,0,0,1,8.12,28H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(353 61.898)" fill="#aeaeae" />
                           <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_91)">
                              <path id="Rectangle_91-3" data-name="Rectangle 91" d="M0,0H5.88A15.12,15.12,0,0,1,21,15.12v0A12.88,12.88,0,0,1,8.12,28H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(578 862)" fill="#fff" />
                           </g>
                        </g>
                        <g data-type="innerShadowGroup">
                           <path id="Rectangle_92-2" data-name="Rectangle 92" d="M15.12,0H22a0,0,0,0,1,0,0V28a0,0,0,0,1,0,0H12.88A12.88,12.88,0,0,1,0,15.12v0A15.12,15.12,0,0,1,15.12,0Z" transform="translate(0 61.898)" fill="#aeaeae" />
                           <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_92)">
                              <path id="Rectangle_92-3" data-name="Rectangle 92" d="M15.12,0H22a0,0,0,0,1,0,0V28a0,0,0,0,1,0,0H12.88A12.88,12.88,0,0,1,0,15.12v0A15.12,15.12,0,0,1,15.12,0Z" transform="translate(225 862)" fill="#fff" />
                           </g>
                        </g>
                     </g>
                     <rect id="Rectangle_93" data-name="Rectangle 93" width="5" height="26" rx="2.5" transform="translate(-1843 3749.241)" fill="#8d8d8d" />
                     <rect id="Rectangle_94" data-name="Rectangle 94" width="4" height="25" rx="2" transform="translate(-1869 3763.241)" fill="#8d8d8d" />
                     <rect id="Rectangle_95" data-name="Rectangle 95" width="5" height="9" rx="2.5" transform="translate(-1843 3779.241)" fill="#8d8d8d" />
                     <rect id="Rectangle_96" data-name="Rectangle 96" width="4" height="26" rx="2" transform="translate(-1614 3749.241)" fill="#8d8d8d" />
                     <rect id="Rectangle_97" data-name="Rectangle 97" width="5" height="27" rx="2.5" transform="translate(-1588 3757.241)" fill="#8d8d8d" />
                     <rect id="Rectangle_98" data-name="Rectangle 98" width="4" height="9" rx="2" transform="translate(-1614 3780.241)" fill="#8d8d8d" />
                  </g>
               </g>
            </svg>

         </div>
      </div>
   );
}

export default Homepage;