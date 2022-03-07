import "../css/GameRoomMain_style.css";
import Axios from "axios";
import React, { useState, useEffect } from "react";


let GameRoomMain = (props) => {
    const funiture = {
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
    };

    const [funitureHave, setfunitureHave] = useState(funiture);
    const [funitureUse, setfunitureUse] = useState(funiture);
    // const [upToDate, setupToDate] = useState(true);

    let putInRoom = async(e) => {
        // console.log(e.currentTarget.dataset.furnid);
        await Axios.put('http://localhost:5000/acc_furn/placing',{
            acc_email:localStorage.getItem("loginState"),
            furn_id: e.currentTarget.dataset.furnid
        })
        // setupToDate(false)f
        props.setUpToDate(true);

    }

    let putInStorage = async(e) => {
        console.log(e.currentTarget.dataset.furnid);
        await Axios.put('http://localhost:5000/acc_furn/takeBack',{
            acc_email:localStorage.getItem("loginState"),
            furn_id: e.currentTarget.dataset.furnid
        })
        // setupToDate(false)
        props.setUpToDate(true);
        // console.log(props);

    }
    

    useEffect( () => {
        Axios.post('http://localhost:5000/acc_furn/storageList', {
           acc_email:localStorage.getItem("loginState"),

        }).then( (result) => {
           setfunitureHave(result.data);
        })
       
        Axios.post('http://localhost:5000/acc_furn/roomList', {
           acc_email:localStorage.getItem("loginState"),

        }).then( (result) => {
           setfunitureUse(result.data);
        //    console.log(result.data)
        })
        // setupToDate(true)
        props.setUpToDate(false);

      },[props.upToDate])


    return(
        <div id="container">
        <svg width="100%" viewBox="0 0 1920 1080" style={{display:props.show}}>
        <defs>
            <filter id="Ellipse_37" x="1730" y="632.743" width="31.86" height="30.474" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feFlood floodOpacity="0.161"/>
            <feComposite operator="in" in2="blur"/>
            <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Ellipse_38" x="1730" y="733.918" width="31.86" height="31.86" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-2"/>
            <feFlood floodOpacity="0.161"/>
            <feComposite operator="in" in2="blur-2"/>
            <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Path_751" x="452.748" y="310.047" width="84.886" height="117.953" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-3"/>
            <feFlood floodOpacity="0.259"/>
            <feComposite operator="in" in2="blur-3"/>
            <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Path_752" x="149.905" y="215.671" width="92.017" height="123.964" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-4"/>
            <feFlood  floodOpacity="0.259"/>
            <feComposite operator="in" in2="blur-4"/>
            <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Subtraction_8" x="1675.137" y="264" width="139.192" height="99.276" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-5"/>
            <feFlood  floodOpacity="0.259"/>
            <feComposite operator="in" in2="blur-5"/>
            <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Subtraction_8-2" x="1675.137" y="264" width="139.192" height="99.276" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-6"/>
            <feFlood floodColor="#f1801e" result="color"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-6"/>
            <feComposite operator="in" in="color"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="Path_736" x="1628.679" y="323.586" width="233.116" height="290.682" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-7"/>
            <feFlood  floodOpacity="0.259"/>
            <feComposite operator="in" in2="blur-7"/>
            </filter>
            <filter id="Path_736-2" x="1628.679" y="323.586" width="233.116" height="290.682" filterUnits="userSpaceOnUse">
            <feOffset dx="-30" dy="-10" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="25" result="blur-8"/>
            <feFlood floodColor="#13dbe2"  floodOpacity="0.3" result="color-2"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-8"/>
            <feComposite operator="in" in="color-2"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="Path_737" x="1646.859" y="351.644" width="74.556" height="114.954" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-9"/>
            <feFlood  floodOpacity="0.259"/>
            <feComposite operator="in" in2="blur-9"/>
            <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Path_738" x="1660.085" y="358.877" width="70.709" height="119.05" filterUnits="userSpaceOnUse">
            <feOffset dy="3" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-10"/>
            <feFlood  floodOpacity="0.259"/>
            <feComposite operator="in" in2="blur-10"/>
            <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Rectangle_84">
            <feOffset dy="-30" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-11"/>
            <feFlood floodColor="#262626"  floodOpacity="0.059" result="color-3"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-11"/>
            <feComposite operator="in" in="color-3"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="Rectangle_85">
            <feOffset dy="-30" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-12"/>
            <feFlood  floodOpacity="0.102" result="color-4"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-12"/>
            <feComposite operator="in" in="color-4"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="Rectangle_86">
            <feOffset dy="-30" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-13"/>
            <feFlood  floodOpacity="0.102" result="color-5"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-13"/>
            <feComposite operator="in" in="color-5"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="Rectangle_87">
            <feOffset dy="-30" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-14"/>
            <feFlood  floodOpacity="0.102" result="color-6"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-14"/>
            <feComposite operator="in" in="color-6"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="Rectangle_88">
            <feOffset dy="-30" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-15"/>
            <feFlood  floodOpacity="0.102" result="color-7"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-15"/>
            <feComposite operator="in" in="color-7"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="Rectangle_89">
            <feOffset dy="-30" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-16"/>
            <feFlood  floodOpacity="0.102" result="color-8"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-16"/>
            <feComposite operator="in" in="color-8"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="Rectangle_90">
            <feOffset dy="-30" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-17"/>
            <feFlood  floodOpacity="0.102" result="color-9"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-17"/>
            <feComposite operator="in" in="color-9"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="Rectangle_91">
            <feOffset dy="-30" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-18"/>
            <feFlood floodColor="#262626"  floodOpacity="0.059" result="color-10"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-18"/>
            <feComposite operator="in" in="color-10"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <filter id="Rectangle_92">
            <feOffset dy="-30" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="3" result="blur-19"/>
            <feFlood floodColor="#262626"  floodOpacity="0.059" result="color-11"/>
            <feComposite operator="out" in="SourceGraphic" in2="blur-19"/>
            <feComposite operator="in" in="color-11"/>
            <feComposite operator="in" in2="SourceGraphic"/>
            </filter>
            <clipPath id="clip-我的房間">
            <rect width="1920" height="1080"/>
            </clipPath>
        </defs>
        <g id="我的房間" clipPath="url(#clip-我的房間)">
            <rect width="1920" height="1080" fill="#f5f5cc"/>
            <line id="地平線" x2="1920" transform="translate(0 676)" fill="none" stroke="#53480b" strokeWidth="6"/>
            <g id="籃球" transform="translate(-148.503 118.416)" data-furnid="basketball" style={{cursor:"pointer" ,display:funitureUse.basketball}} onClick={putInStorage}>
            <circle id="Ellipse_6" dataname="Ellipse 6" cx="63.29" cy="63.29" r="63.29" transform="translate(169 737)" fill="#ef8d37"/>
            <line id="Line_25" dataname="Line 25" x2="126.579" transform="translate(169 800.29)" fill="none" stroke="#707070" strokeWidth="7"/>
            <path id="Path_6" dataname="Path 6" d="M0,0S17.577,24.346,18.345,48,3.072,94.627,3.072,94.627" transform="translate(188.97 754.512)" fill="none" stroke="#707070" strokeWidth="7"/>
            <path id="Path_7" dataname="Path 7" d="M18.371,0S.795,24.346.027,48,15.3,94.627,15.3,94.627" transform="translate(257.175 754.512)" fill="none" stroke="#707070" strokeWidth="7" opacity="0.8"/>
            <line id="Line_26" dataname="Line 26" y2="126.579" transform="translate(232.597 737.307)" fill="none" stroke="#707070" strokeWidth="7"/>
            </g>
            
            <g id="畫像" transform="translate(1112.415 210.318)" data-furnid="protrait" style={{cursor:"pointer" ,display:funitureUse.protrait}} onClick={putInStorage}>
            <path id="Path_24" dataname="Path 24" d="M4.383,33.784,89.763-2.11" transform="translate(266.745 68.669)" fill="none" stroke="#ea9c42" strokeLinecap="round" strokeWidth="6"/>
            <path id="Path_27" dataname="Path 27" d="M88.935,34.811,0,0" transform="translate(356.456 66.736)" fill="none" stroke="#ea9c42" strokeLinecap="round" strokeWidth="6"/>
            <g id="Path_26" dataname="Path 26" transform="translate(267 98.905)" fill="#763505" strokeLinecap="round">
                <path d="M 181.9374389648438 194.2761993408203 L 0.4999944865703583 194.2761993408203 L 0.4999944865703583 0.4999996721744537 L 181.9374389648438 0.4999996721744537 L 181.9374389648438 194.2761993408203 Z" stroke="none"/>
                <path d="M 1 1 L 1 193.7761993408203 L 181.4374389648438 193.7761993408203 L 181.4374389648438 1 L 1 1 M 0 0 L 182.4374389648438 0 L 182.4374389648438 194.7761993408203 L 0 194.7761993408203 L 0 0 Z" stroke="none" fill="#707070"/>
            </g>
            <g id="Path_25" dataname="Path 25" transform="translate(278.457 112.125)" fill="#eddbbe" strokeLinecap="round">
                <path d="M 158.1412506103516 168.7173461914062 L 0.4999948740005493 168.7173461914062 L 0.4999948740005493 0.5000132918357849 L 158.1412506103516 0.5000132918357849 L 158.1412506103516 168.7173461914062 Z" stroke="none"/>
                <path d="M 1 0.9999847412109375 L 1 168.2173156738281 L 157.6412506103516 168.2173156738281 L 157.6412506103516 0.9999847412109375 L 1 0.9999847412109375 M 0 -1.52587890625e-05 L 158.6412506103516 -1.52587890625e-05 L 158.6412506103516 169.2173156738281 L 0 169.2173156738281 L 0 -1.52587890625e-05 Z" stroke="none" fill="#707070"/>
            </g>
            <ellipse id="Ellipse_39" dataname="Ellipse 39" cx="6" cy="7" rx="6" ry="7" transform="translate(351 59.681)" fill="#400202"/>
            <g id="鴨子" transform="translate(280.097 123.122)">
                <line id="Line_17" dataname="Line 17" y2="9.956" transform="translate(66.319 131.194)" fill="none" stroke="#574809" strokeWidth="4"/>
                <line id="Line_21" dataname="Line 21" y2="9.956" transform="translate(93.939 131.194)" fill="none" stroke="#574809" strokeWidth="4"/>
                <line id="Line_18" dataname="Line 18" x1="6.102" y2="4.817" transform="translate(59.575 140.508)" fill="none" stroke="#574809" strokeWidth="4"/>
                <line id="Line_24" dataname="Line 24" x1="6.102" y2="4.817" transform="translate(87.195 140.508)" fill="none" stroke="#574809" strokeWidth="4"/>
                <line id="Line_19" dataname="Line 19" y2="9.394" transform="translate(66.319 139.143)" fill="none" stroke="#574809" strokeWidth="4"/>
                <line id="Line_22" dataname="Line 22" y2="9.394" transform="translate(93.939 139.143)" fill="none" stroke="#574809" strokeWidth="4"/>
                <line id="Line_20" dataname="Line 20" x2="6.102" y2="4.175" transform="translate(66.961 140.508)" fill="none" stroke="#574809" strokeWidth="4"/>
                <line id="Line_23" dataname="Line 23" x2="6.102" y2="4.175" transform="translate(94.581 140.508)" fill="none" stroke="#574809" strokeWidth="4"/>
                <ellipse id="Ellipse_2" dataname="Ellipse 2" cx="51.065" cy="41.269" rx="51.065" ry="41.269" transform="translate(27.94)" fill="#ffd230"/>
                <ellipse id="Ellipse_3" dataname="Ellipse 3" cx="57.327" cy="46.247" rx="57.327" ry="46.247" transform="translate(21.838 41.43)" fill="#ffd230"/>
                <path id="Polygon_1" dataname="Polygon 1" d="M15.416,0,30.831,14.131H0Z" transform="translate(63.589 28.262)" fill="#f70"/>
                <ellipse id="Ellipse_4" dataname="Ellipse 4" cx="4.496" cy="4.657" rx="4.496" ry="4.657" transform="translate(52.349 26.014)"/>
                <ellipse id="Ellipse_5" dataname="Ellipse 5" cx="4.496" cy="4.657" rx="4.496" ry="4.657" transform="translate(98.275 26.014)"/>
                <path id="Path_10" dataname="Path 10" d="M35.257,0s6.7,11.436,6.7,22.876A20.715,20.715,0,0,1,21.244,43.591C9.8,43.591,0,35.5,0,35.5S12.294,23.975,17.472,18.8,35.257,0,35.257,0Z" transform="matrix(0.961, 0.276, -0.276, 0.961, 12.015, 55.804)" fill="#574809"/>
                <path id="Path_11" dataname="Path 11" d="M35.257,43.591s6.7-11.436,6.7-22.876A20.715,20.715,0,0,0,21.244,0C9.8,0,0,8.091,0,8.091S12.294,19.616,17.472,24.8,35.257,43.591,35.257,43.591Z" transform="translate(156.244 97.707) rotate(164)" fill="#574804"/>
            </g>
            </g>
            
            <g id="商店按鈕" transform="translate(138.171)" onClick={props.changePage} style={{cursor:"pointer"}}>
            <rect id="Rectangle_71" dataname="Rectangle 71" width="265" height="69" rx="34.5" transform="translate(1493.829 28)" fill="#50b6c2"/>
            <path id="Icon_awesome-store" dataname="Icon awesome-store" d="M56.368,11.105,50.291,1.4A3,3,0,0,0,47.753,0H9.924A3,3,0,0,0,7.387,1.4l-6.077,9.7c-3.137,5.01-.356,11.976,5.506,12.772a9.731,9.731,0,0,0,1.283.084,9.246,9.246,0,0,0,6.91-3.1,9.253,9.253,0,0,0,13.821,0,9.253,9.253,0,0,0,13.821,0,9.276,9.276,0,0,0,6.91,3.1,9.626,9.626,0,0,0,1.283-.084C56.723,23.091,59.514,16.124,56.368,11.105ZM49.579,26.967a11.881,11.881,0,0,1-2.762-.356v9.345H10.86V26.611a12.4,12.4,0,0,1-2.762.356,12.634,12.634,0,0,1-1.685-.112,11.775,11.775,0,0,1-1.536-.337V44.945a2.993,2.993,0,0,0,3,3H49.822a2.993,2.993,0,0,0,3-3V26.518a9.56,9.56,0,0,1-1.536.337A13.022,13.022,0,0,1,49.579,26.967Z" transform="translate(1679.968 38.858)" fill="#bc2121"/>
            <text id="積分商店" transform="translate(1515.829 76)" fill="#faf3e2" fontSize="39" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">積分商店</tspan></text>
            </g>
            
            <g id="商店按鈕-2" dataname="商店按鈕" transform="translate(138 84)" onClick={props.showStoragePage} style={{cursor:"pointer"}}>            
            <rect id="Rectangle_71-2" dataname="Rectangle 71" width="265" height="69" rx="34.5" transform="translate(1494 28)" fill="#50b6c2"/>
            <path id="Icon_awesome-store-2" dataname="Icon awesome-store" d="M56.4,11.112,50.323,1.405A3,3,0,0,0,47.784,0H9.931A3,3,0,0,0,7.391,1.405L1.31,11.112C-1.828,16.125.954,23.1,6.82,23.893a9.737,9.737,0,0,0,1.284.084,9.252,9.252,0,0,0,6.915-3.1,9.259,9.259,0,0,0,13.83,0,9.259,9.259,0,0,0,13.83,0,9.282,9.282,0,0,0,6.915,3.1,9.632,9.632,0,0,0,1.284-.084C56.76,23.106,59.552,16.135,56.4,11.112ZM49.611,26.985a11.888,11.888,0,0,1-2.764-.356V35.98H10.867V26.629a12.412,12.412,0,0,1-2.764.356,12.642,12.642,0,0,1-1.687-.112,11.783,11.783,0,0,1-1.537-.337v18.44a3,3,0,0,0,3,3H49.855a3,3,0,0,0,3-3V26.535a9.566,9.566,0,0,1-1.537.337A13.03,13.03,0,0,1,49.611,26.985Z" transform="translate(1680.088 38.865)" fill="#227939"/>
            <text id="我的傢俱" transform="translate(1516 76)" fill="#faf3e2" fontSize="39" fontFamily="PingFangTC-Semibold, PingFang TC" fontWeight="600"><tspan x="0" y="0">我的傢俱</tspan></text>
            </g>
            <g id="浴缸" transform="translate(-1192.141 -19)" data-furnid="bathTube" style={{cursor:"pointer" ,display:funitureUse.bathTube}} onClick={putInStorage}>
            <path id="Path_8" dataname="Path 8" d="M0,0H629.387V145.328c0,13.18-15.749,27.384-42.17,35.448,0,0-131.107,35.157-267.369,35.157S42.17,180.776,42.17,180.776c-21.881-6.711-38.755-26.616-38.755-39.8Z" transform="translate(1222 603.392)" fill="#b8dbdb"/>
            <g id="Path_9" dataname="Path 9" transform="translate(1222 523)" fill="#68709f">
                <path d="M 315.7513122558594 155.0157928466797 C 126.3181304931641 155.0157928466797 10.00003910064697 112.784797668457 10.00003910064697 82.50788879394531 C 10.00003910064697 52.23097991943359 126.3181304931641 9.999979972839355 315.7513122558594 9.999979972839355 C 505.1845703125 9.999979972839355 621.502685546875 52.23097991943359 621.502685546875 82.50788879394531 C 621.502685546875 112.784797668457 505.1845703125 155.0157928466797 315.7513122558594 155.0157928466797 Z" stroke="none"/>
                <path d="M 315.7513122558594 19.99998474121094 C 120.6226196289062 19.99998474121094 20 63.81428527832031 20 82.50788879394531 C 20 101.2014923095703 120.6226196289062 145.0157928466797 315.7513122558594 145.0157928466797 C 510.8800048828125 145.0157928466797 611.5026245117188 101.2014923095703 611.5026245117188 82.50788879394531 C 611.5026245117188 63.81428527832031 510.8800048828125 19.99998474121094 315.7513122558594 19.99998474121094 M 315.7513122558594 -1.52587890625e-05 C 490.1360168457031 -1.52587890625e-05 631.5026245117188 36.94009399414062 631.5026245117188 82.50788879394531 C 631.5026245117188 128.07568359375 490.1360168457031 165.0157928466797 315.7513122558594 165.0157928466797 C 141.36669921875 165.0157928466797 0 128.07568359375 0 82.50788879394531 C 0 36.94009399414062 141.36669921875 -1.52587890625e-05 315.7513122558594 -1.52587890625e-05 Z" stroke="none" fill="#d9f2f2"/>
            </g>
            <circle id="Ellipse_8" dataname="Ellipse 8" cx="13.751" cy="13.751" r="13.751" transform="translate(1337.3 572.716)" fill="#bba3c4"/>
            <circle id="Ellipse_27" dataname="Ellipse 27" cx="13.751" cy="13.751" r="13.751" transform="translate(1626.077 608.681)" fill="#bba3c4"/>
            <circle id="Ellipse_9" dataname="Ellipse 9" cx="16.925" cy="16.925" r="16.925" transform="translate(1378.553 588.583)" fill="#bba3c4"/>
            <circle id="Ellipse_31" dataname="Ellipse 31" cx="16.925" cy="16.925" r="16.925" transform="translate(1754.07 578.005)" fill="#bba3c4"/>
            <circle id="Ellipse_18" dataname="Ellipse 18" cx="16.925" cy="16.925" r="16.925" transform="translate(1645.117 569.543)" fill="#bba3c4"/>
            <circle id="Ellipse_10" dataname="Ellipse 10" cx="23.271" cy="23.271" r="23.271" transform="translate(1469.524 558.965)" fill="#bba3c4"/>
            <circle id="Ellipse_11" dataname="Ellipse 11" cx="14.809" cy="14.809" r="14.809" transform="translate(1683.198 580.121)" fill="#eda4a4"/>
            <circle id="Ellipse_12" dataname="Ellipse 12" cx="17.454" cy="17.454" r="17.454" transform="translate(1434.617 580.121)" fill="#eda4a4"/>
            <circle id="Ellipse_29" dataname="Ellipse 29" cx="17.454" cy="17.454" r="17.454" transform="translate(1347.877 593.872)" fill="#eda4a4"/>
            <circle id="Ellipse_13" dataname="Ellipse 13" cx="15.338" cy="15.338" r="15.338" transform="translate(1600.69 588.583)" fill="#eda4a4"/>
            <circle id="Ellipse_33" dataname="Ellipse 33" cx="15.338" cy="15.338" r="15.338" transform="translate(1506.546 546.272)" fill="#eda4a4"/>
            <circle id="Ellipse_17" dataname="Ellipse 17" cx="24.858" cy="24.858" r="24.858" transform="translate(1521.356 573.774)" fill="#eda4a4"/>
            <circle id="Ellipse_16" dataname="Ellipse 16" cx="14.809" cy="14.809" r="14.809" transform="translate(1388.074 558.965)" fill="#eda4a4"/>
            <circle id="Ellipse_14" dataname="Ellipse 14" cx="14.809" cy="14.809" r="14.809" transform="translate(1485.391 603.392)" fill="#eda4a4"/>
            <circle id="Ellipse_15" dataname="Ellipse 15" cx="14.809" cy="14.809" r="14.809" transform="translate(1272.774 580.121)" fill="#eda4a4"/>
            <circle id="Ellipse_19" dataname="Ellipse 19" cx="16.396" cy="16.396" r="16.396" transform="translate(1420.865 604.45)" fill="#fff"/>
            <circle id="Ellipse_28" dataname="Ellipse 28" cx="16.396" cy="16.396" r="16.396" transform="translate(1419.808 553.676)" fill="#fff"/>
            <circle id="Ellipse_21" dataname="Ellipse 21" cx="16.396" cy="16.396" r="16.396" transform="translate(1562.609 609.739)" fill="#fff"/>
            <circle id="Ellipse_26" dataname="Ellipse 26" cx="16.396" cy="16.396" r="16.396" transform="translate(1613.384 564.254)" fill="#fff"/>
            <circle id="Ellipse_25" dataname="Ellipse 25" cx="16.396" cy="16.396" r="16.396" transform="translate(1513.951 609.739)" fill="#fff"/>
            <circle id="Ellipse_22" dataname="Ellipse 22" cx="16.396" cy="16.396" r="16.396" transform="translate(1662.042 599.161)" fill="#fff"/>
            <circle id="Ellipse_23" dataname="Ellipse 23" cx="16.396" cy="16.396" r="16.396" transform="translate(1728.683 576.947)" fill="#fff"/>
            <circle id="Ellipse_24" dataname="Ellipse 24" cx="16.396" cy="16.396" r="16.396" transform="translate(1563.667 555.792)" fill="#fff"/>
            <circle id="Ellipse_30" dataname="Ellipse 30" cx="16.396" cy="16.396" r="16.396" transform="translate(1700.123 592.814)" fill="#fff"/>
            <circle id="Ellipse_20" dataname="Ellipse 20" cx="16.396" cy="16.396" r="16.396" transform="translate(1318.259 589.641)" fill="#fff"/>
            <circle id="Ellipse_32" dataname="Ellipse 32" cx="16.925" cy="16.925" r="16.925" transform="translate(1718.105 589.641)" fill="#bba3c4"/>
            </g>
            <g id="櫃子" transform="translate(1175.474 417.957)" data-furnid="cabinet" style={{cursor:"pointer" ,display:funitureUse.cabinet}} onClick={putInStorage}>
            <path id="Path_13" dataname="Path 13" d="M8.323,0c7.427,0,10.083,76.528,10.083,76.528S16.484,79.064,9.9,79.064,0,76.528,0,76.528.9,0,8.323,0Z" transform="translate(483.222 484.886) rotate(180)" fill="#d6c298"/>
            <path id="Path_15" dataname="Path 15" d="M8.323,0c7.427,0,10.083,76.528,10.083,76.528S16.484,79.064,9.9,79.064,0,76.528,0,76.528.9,0,8.323,0Z" transform="translate(688.401 484.886) rotate(180)" fill="#d6c298"/>
            <rect id="Rectangle_50" dataname="Rectangle 50" width="303.526" height="221.754" rx="10" transform="translate(418 201.382)" fill="#d6c298"/>
            <rect id="Rectangle_53" dataname="Rectangle 53" width="281.351" height="99.789" transform="translate(429.088 212.47)" fill="#c18c57"/>
            <rect id="Rectangle_55" dataname="Rectangle 55" width="281.351" height="99.789" transform="translate(429.088 313.645)" fill="#c18c57"/>
            <rect id="Rectangle_51" dataname="Rectangle 51" width="271.649" height="92.86" transform="translate(434.632 216.627)" fill="#e0d5bf"/>
            <rect id="Rectangle_54" dataname="Rectangle 54" width="271.649" height="92.86" transform="translate(434.632 317.803)" fill="#e0d5bf"/>
            <g transform="matrix(1, 0, 0, 1, -1175.47, -417.96)" filter="url(#Ellipse_37)">
                <ellipse id="Ellipse_37-2" dataname="Ellipse 37" cx="6.93" cy="6.237" rx="6.93" ry="6.237" transform="translate(1739 638.74)" fill="#760202"/>
            </g>
            <g transform="matrix(1, 0, 0, 1, -1175.47, -417.96)" filter="url(#Ellipse_38)">
                <circle id="Ellipse_38-2" dataname="Ellipse 38" cx="6.93" cy="6.93" r="6.93" transform="translate(1739 739.92)" fill="#760202"/>
            </g>
            </g>
            <g id="light" transform="translate(569.222 -103.5)" data-furnid="light" style={{cursor:"pointer" ,display:funitureUse.light}} onClick={putInStorage}>
            <path id="Path_4" dataname="Path 4" d="M0,2.318S107.032,138.249,260.438,143.685C451.483,142.336,589.5,0,589.5,0" transform="translate(62.5 357.5)" fill="none" stroke="#707070" strokeWidth="4"/>
            <line id="Line_16" dataname="Line 16" y2="29.37" transform="translate(96.066 396.748)" fill="none" stroke="#707070" strokeWidth="4"/>
            <rect id="Rectangle_23" dataname="Rectangle 23" width="12.362" height="18.543" transform="translate(90.148 416.025)" fill="#363636"/>
            <path id="Path_5" dataname="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(110.621 461.936) rotate(180)" fill="#ffd230"/>
            <path id="Path_23" dataname="Path 23" d="M0,0V29.37" transform="translate(161.099 449.258)" fill="none" stroke="#707070" strokeWidth="4"/>
            <rect id="Rectangle_23-2" dataname="Rectangle 23" width="12.362" height="18.543" transform="translate(154.918 468.626)" fill="#363636"/>
            <path id="Path_5-2" dataname="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(175.392 514.537) rotate(180)" fill="#ffd230"/>
            <line id="Line_16-2" dataname="Line 16" y2="27.272" transform="translate(234.524 482.346)" fill="none" stroke="#707070" strokeWidth="4"/>
            <rect id="Rectangle_23-3" dataname="Rectangle 23" width="12.362" height="18.543" transform="translate(228.224 500.818)" fill="#363636"/>
            <path id="Path_5-3" dataname="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(248.698 546.729) rotate(180)" fill="#ffd230"/>
            <line id="Line_16-3" dataname="Line 16" y2="27.272" transform="translate(316.34 499.129)" fill="none" stroke="#707070" strokeWidth="4"/>
            <rect id="Rectangle_23-4" dataname="Rectangle 23" width="12.362" height="18.543" transform="translate(310.12 517.043)" fill="#363636"/>
            <path id="Path_5-4" dataname="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(330.594 562.954) rotate(180)" fill="#ffd230"/>
            <line id="Line_16-4" dataname="Line 16" y2="27.272" transform="translate(391.863 494.934)" fill="none" stroke="#707070" strokeWidth="4"/>
            <rect id="Rectangle_23-5" dataname="Rectangle 23" width="12.362" height="18.543" transform="translate(385.682 513.953)" fill="#363636"/>
            <path id="Path_5-5" dataname="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(406.156 559.864) rotate(180)" fill="#ffd230"/>
            <line id="Line_16-5" dataname="Line 16" x2="0.773" y2="27.814" transform="translate(468.117 475.931)" fill="none" stroke="#707070" strokeWidth="4"/>
            <rect id="Rectangle_23-6" dataname="Rectangle 23" width="12.362" height="18.543" transform="translate(463.095 494.474)" fill="#363636"/>
            <path id="Path_5-6" dataname="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(483.569 540.385) rotate(180)" fill="#ffd230"/>
            <line id="Line_16-6" dataname="Line 16" x2="0.773" y2="27.814" transform="translate(541.515 438.846)" fill="none" stroke="#707070" strokeWidth="4"/>
            <rect id="Rectangle_23-7" dataname="Rectangle 23" width="12.362" height="18.543" transform="translate(536.493 457.388)" fill="#363636"/>
            <path id="Path_5-7" dataname="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(556.967 503.299) rotate(180)" fill="#ffd230"/>
            <line id="Line_16-7" dataname="Line 16" x2="0.773" y2="27.814" transform="translate(618.775 387.854)" fill="none" stroke="#707070" strokeWidth="4"/>
            <rect id="Rectangle_23-8" dataname="Rectangle 23" width="12.362" height="18.543" transform="translate(613.753 406.396)" fill="#363636"/>
            <path id="Path_5-8" dataname="Path 5" d="M14.293,0c7.894,0,14.293,8.129,14.293,18.156,0,5.184-1.026,11.869-3.92,15.357-2.412,2.912-6.561,2.8-10.374,2.8-3.521,0-6.438,1.739-10.011-2.8S0,23.711,0,18.156C0,8.129,6.4,0,14.293,0Z" transform="translate(634.227 452.308) rotate(180)" fill="#ffd230"/>
            </g>
            <g id="TV" transform="translate(-314 -64.774)" data-furnid="TV" style={{cursor:"pointer" ,display:funitureUse.TV}} onClick={putInStorage}>
            <g id="Rectangle_43" dataname="Rectangle 43" transform="translate(442 266.774)" fill="#464444" stroke="#707070" strokeWidth="1">
                <rect width="436" height="226" stroke="none"/>
                <rect x="0.5" y="0.5" width="435" height="225" fill="none"/>
            </g>
            <g id="Rectangle_44" dataname="Rectangle 44" transform="translate(455 277.774)" fill="#dbdbdb" stroke="#707070" strokeWidth="1">
                <rect width="414" height="203" stroke="none"/>
                <rect x="0.5" y="0.5" width="413" height="202" fill="none"/>
            </g>
            <g transform="matrix(1, 0, 0, 1, 314, 64.77)" filter="url(#Path_751)">
                <path id="Path_751-2" dataname="Path 751" d="M28.59,0s-12.1,10.211-18.551,34.886S0,96.954,0,96.954" transform="translate(487.66 416) rotate(-155)" fill="#fff" opacity="0.25"/>
            </g>
            <g transform="matrix(1, 0, 0, 1, 314, 64.77)" filter="url(#Path_752)">
                <path id="Path_752-2" dataname="Path 752" d="M56.556,0s-23.933,10.211-36.7,34.886S0,96.954,0,96.954" transform="translate(177.4 221.67) rotate(11)" fill="#fff" opacity="0.25"/>
            </g>
            </g>
            <g id="鏡子" transform="translate(2252.679 -3053)" data-furnid="mirror" style={{cursor:"pointer" ,display:funitureUse.mirror}} onClick={putInStorage}>
            <g data-type="innerShadowGroup">
                <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Subtraction_8)">
                <path id="Subtraction_8-3" dataname="Subtraction 8" d="M3.618,81.276h0A60.642,60.642,0,0,1,5.75,34.8L26.231,62.11l-8.69-44.153a60.438,60.438,0,0,1,17.892-12.5l13.925,45.93,8-51.3C58.436.028,59.525,0,60.6,0A61.194,61.194,0,0,1,71.368.954l7.866,50.43,12.9-42.547a61.032,61.032,0,0,1,10.249,7.875l-8.936,45.4,21.4-28.538a60.28,60.28,0,0,1,4.7,12.921,60.97,60.97,0,0,1-1.97,34.781C100.518,67.747,80.816,60.6,60.6,60.6S20.673,67.747,3.62,81.276Z" transform="translate(1684.14 270)" fill="#ffd230"/>
                </g>
                <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Subtraction_8-2)">
                <path id="Subtraction_8-4" dataname="Subtraction 8" d="M3.618,81.276h0A60.642,60.642,0,0,1,5.75,34.8L26.231,62.11l-8.69-44.153a60.438,60.438,0,0,1,17.892-12.5l13.925,45.93,8-51.3C58.436.028,59.525,0,60.6,0A61.194,61.194,0,0,1,71.368.954l7.866,50.43,12.9-42.547a61.032,61.032,0,0,1,10.249,7.875l-8.936,45.4,21.4-28.538a60.28,60.28,0,0,1,4.7,12.921,60.97,60.97,0,0,1-1.97,34.781C100.518,67.747,80.816,60.6,60.6,60.6S20.673,67.747,3.62,81.276Z" transform="translate(1684.14 270)" fill="#fff"/>
                </g>
            </g>
            <g data-type="innerShadowGroup">
                <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Path_736)">
                <g id="Path_736-3" dataname="Path 736" transform="translate(1637.68 329.59)" fill="rgba(102,229,255,0.86)">
                    <path d="M 107.5577926635742 262.681884765625 C 53.76424789428711 262.681884765625 10.00002002716064 206.0055694580078 10.00002002716064 136.3409271240234 C 10.00002002716064 66.67633819580078 53.76424789428711 10.00001811981201 107.5577926635742 10.00001811981201 C 161.3513336181641 10.00001811981201 205.1156158447266 66.67633819580078 205.1156158447266 136.3409271240234 C 205.1156158447266 206.0055694580078 161.3513336181641 262.681884765625 107.5577926635742 262.681884765625 Z" stroke="none"/>
                    <path d="M 107.5577926635742 19.99998474121094 C 59.27825927734375 19.99998474121094 20 72.19029235839844 20 136.3409271240234 C 20 200.4915161132812 59.27825927734375 252.6818237304688 107.5577926635742 252.6818237304688 C 155.8373107910156 252.6818237304688 195.1155853271484 200.4915161132812 195.1155853271484 136.3409271240234 C 195.1155853271484 72.19029235839844 155.8373107910156 19.99998474121094 107.5577926635742 19.99998474121094 M 107.5577926635742 -3.0517578125e-05 C 166.9603271484375 -3.0517578125e-05 215.1155853271484 61.04193115234375 215.1155853271484 136.3409271240234 C 215.1155853271484 211.6399841308594 166.9603271484375 272.6818237304688 107.5577926635742 272.6818237304688 C 48.1552734375 272.6818237304688 0 211.6399841308594 0 136.3409271240234 C 0 61.04193115234375 48.1552734375 -3.0517578125e-05 107.5577926635742 -3.0517578125e-05 Z" stroke="none" fill="#3e88a8"/>
                </g>
                </g>
                <g id="Path_736-4" dataname="Path 736" transform="translate(-615 3382.586)" fill="rgba(102,229,255,0.86)">
                <path d="M 107.5577926635742 262.681884765625 C 53.76424789428711 262.681884765625 10.00002002716064 206.0055694580078 10.00002002716064 136.3409271240234 C 10.00002002716064 66.67633819580078 53.76424789428711 10.00001811981201 107.5577926635742 10.00001811981201 C 161.3513336181641 10.00001811981201 205.1156158447266 66.67633819580078 205.1156158447266 136.3409271240234 C 205.1156158447266 206.0055694580078 161.3513336181641 262.681884765625 107.5577926635742 262.681884765625 Z" stroke="none"/>
                <path d="M 107.5577926635742 19.99998474121094 C 59.27825927734375 19.99998474121094 20 72.19029235839844 20 136.3409271240234 C 20 200.4915161132812 59.27825927734375 252.6818237304688 107.5577926635742 252.6818237304688 C 155.8373107910156 252.6818237304688 195.1155853271484 200.4915161132812 195.1155853271484 136.3409271240234 C 195.1155853271484 72.19029235839844 155.8373107910156 19.99998474121094 107.5577926635742 19.99998474121094 M 107.5577926635742 -3.0517578125e-05 C 166.9603271484375 -3.0517578125e-05 215.1155853271484 61.04193115234375 215.1155853271484 136.3409271240234 C 215.1155853271484 211.6399841308594 166.9603271484375 272.6818237304688 107.5577926635742 272.6818237304688 C 48.1552734375 272.6818237304688 0 211.6399841308594 0 136.3409271240234 C 0 61.04193115234375 48.1552734375 -3.0517578125e-05 107.5577926635742 -3.0517578125e-05 Z" stroke="none"/>
                </g>
                <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Path_736-2)">
                <g id="Path_736-5" dataname="Path 736" transform="translate(1637.68 329.59)" fill="#fff">
                    <path d="M 107.5577926635742 262.681884765625 C 53.76424789428711 262.681884765625 10.00002002716064 206.0055694580078 10.00002002716064 136.3409271240234 C 10.00002002716064 66.67633819580078 53.76424789428711 10.00001811981201 107.5577926635742 10.00001811981201 C 161.3513336181641 10.00001811981201 205.1156158447266 66.67633819580078 205.1156158447266 136.3409271240234 C 205.1156158447266 206.0055694580078 161.3513336181641 262.681884765625 107.5577926635742 262.681884765625 Z" stroke="none"/>
                    <path d="M 107.5577926635742 19.99998474121094 C 59.27825927734375 19.99998474121094 20 72.19029235839844 20 136.3409271240234 C 20 200.4915161132812 59.27825927734375 252.6818237304688 107.5577926635742 252.6818237304688 C 155.8373107910156 252.6818237304688 195.1155853271484 200.4915161132812 195.1155853271484 136.3409271240234 C 195.1155853271484 72.19029235839844 155.8373107910156 19.99998474121094 107.5577926635742 19.99998474121094 M 107.5577926635742 -3.0517578125e-05 C 166.9603271484375 -3.0517578125e-05 215.1155853271484 61.04193115234375 215.1155853271484 136.3409271240234 C 215.1155853271484 211.6399841308594 166.9603271484375 272.6818237304688 107.5577926635742 272.6818237304688 C 48.1552734375 272.6818237304688 0 211.6399841308594 0 136.3409271240234 C 0 61.04193115234375 48.1552734375 -3.0517578125e-05 107.5577926635742 -3.0517578125e-05 Z" stroke="none"/>
                </g>
                </g>
                <g id="Path_736-6" dataname="Path 736" transform="translate(-615 3382.586)" fill="none">
                <path d="M 107.5577926635742 262.681884765625 C 53.76424789428711 262.681884765625 10.00002002716064 206.0055694580078 10.00002002716064 136.3409271240234 C 10.00002002716064 66.67633819580078 53.76424789428711 10.00001811981201 107.5577926635742 10.00001811981201 C 161.3513336181641 10.00001811981201 205.1156158447266 66.67633819580078 205.1156158447266 136.3409271240234 C 205.1156158447266 206.0055694580078 161.3513336181641 262.681884765625 107.5577926635742 262.681884765625 Z" stroke="none"/>
                <path d="M 107.5577926635742 19.99998474121094 C 59.27825927734375 19.99998474121094 20 72.19029235839844 20 136.3409271240234 C 20 200.4915161132812 59.27825927734375 252.6818237304688 107.5577926635742 252.6818237304688 C 155.8373107910156 252.6818237304688 195.1155853271484 200.4915161132812 195.1155853271484 136.3409271240234 C 195.1155853271484 72.19029235839844 155.8373107910156 19.99998474121094 107.5577926635742 19.99998474121094 M 107.5577926635742 -3.0517578125e-05 C 166.9603271484375 -3.0517578125e-05 215.1155853271484 61.04193115234375 215.1155853271484 136.3409271240234 C 215.1155853271484 211.6399841308594 166.9603271484375 272.6818237304688 107.5577926635742 272.6818237304688 C 48.1552734375 272.6818237304688 0 211.6399841308594 0 136.3409271240234 C 0 61.04193115234375 48.1552734375 -3.0517578125e-05 107.5577926635742 -3.0517578125e-05 Z" stroke="none" fill="#3e88a8"/>
                </g>
            </g>
            <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Path_737)">
                <path id="Path_737-2" dataname="Path 737" d="M56.556,0s-23.933,10.211-36.7,34.886S0,96.954,0,96.954" transform="translate(1655.86 357.64)" fill="#fff" opacity="0.25"/>
            </g>
            <g transform="matrix(1, 0, 0, 1, -2252.68, 3053)" filter="url(#Path_738)">
                <path id="Path_738-2" dataname="Path 738" d="M28.59,0s-12.1,10.211-18.551,34.886S0,96.954,0,96.954" transform="matrix(-0.97, -0.26, 0.26, -0.97, 1696.7, 465.93)" fill="#fff" opacity="0.25"/>
            </g>
            </g>
            <g id="鴨子-2" dataname="鴨子" transform="translate(7.36 47.98)">
            <line id="Line_17-2" dataname="Line 17" y2="31" transform="translate(860.5 832.5)" fill="none" stroke="#574809" strokeWidth="10"/>
            <line id="Line_21-2" dataname="Line 21" y2="31" transform="translate(946.5 832.5)" fill="none" stroke="#574809" strokeWidth="10"/>
            <line id="Line_18-2" dataname="Line 18" x1="19" y2="15" transform="translate(839.5 861.5)" fill="none" stroke="#574809" strokeWidth="10"/>
            <line id="Line_24-2" dataname="Line 24" x1="19" y2="15" transform="translate(925.5 861.5)" fill="none" stroke="#574809" strokeWidth="10"/>
            <line id="Line_19-2" dataname="Line 19" y2="29.25" transform="translate(860.5 857.25)" fill="none" stroke="#574809" strokeWidth="10"/>
            <line id="Line_22-2" dataname="Line 22" y2="29.25" transform="translate(946.5 857.25)" fill="none" stroke="#574809" strokeWidth="10"/>
            <line id="Line_20-2" dataname="Line 20" x2="19" y2="13" transform="translate(862.5 861.5)" fill="none" stroke="#574809" strokeWidth="10"/>
            <line id="Line_23-2" dataname="Line 23" x2="19" y2="13" transform="translate(948.5 861.5)" fill="none" stroke="#574809" strokeWidth="10"/>
            <ellipse id="Ellipse_2-2" dataname="Ellipse 2" cx="159" cy="128.5" rx="159" ry="128.5" transform="translate(741 424)" fill="#ffd230"/>
            <ellipse id="Ellipse_3-2" dataname="Ellipse 3" cx="178.5" cy="144" rx="178.5" ry="144" transform="translate(722 553)" fill="#ffd230"/>
            <path id="Polygon_1-2" dataname="Polygon 1" d="M48,0,96,44H0Z" transform="translate(852 512)" fill="#f70"/>
            <ellipse id="Ellipse_4-2" dataname="Ellipse 4" cx="14" cy="14.5" rx="14" ry="14.5" transform="translate(817 505)"/>
            <ellipse id="Ellipse_5-2" dataname="Ellipse 5" cx="14" cy="14.5" rx="14" ry="14.5" transform="translate(960 505)"/>
            <path id="Path_10-2" dataname="Path 10" d="M108.133-6.73S129,28.878,129,64.5A64.5,64.5,0,0,1,64.5,129c-35.622,0-66.147-25.193-66.147-25.193S36.632,67.92,52.757,51.8,108.133-6.73,108.133-6.73Z" transform="matrix(0.961, 0.276, -0.276, 0.961, 691.142, 604.682)" fill="#574809"/>
            <path id="Path_11-2" dataname="Path 11" d="M109.78,135.73s20.867-35.607,20.867-71.23A64.5,64.5,0,0,0,66.147,0C30.525,0,0,25.193,0,25.193S38.279,61.08,54.4,77.2,109.78,135.73,109.78,135.73Z" transform="translate(1140.499 728.23) rotate(164)" fill="#574804"/>
            <path id="Polygon_11" dataname="Polygon 11" d="M48,0,96,44H0Z" transform="translate(852 512)" fill="#f70"/>
            </g>
            <g id="眼鏡" transform="translate(19 178.78)" data-furnid="glasses" style={{cursor:"pointer" ,display:funitureUse.glasses}} onClick={putInStorage}>
            <g id="Ellipse_41" dataname="Ellipse 41" transform="translate(840.435 361.22)" fill="#dbdbdb" stroke="#707070" strokeWidth="6">
                <ellipse cx="18.981" cy="18.981" rx="18.981" ry="18.981" stroke="none"/>
                <ellipse cx="18.981" cy="18.981" rx="15.981" ry="15.981" fill="none"/>
            </g>
            <g id="Ellipse_42" dataname="Ellipse 42" transform="translate(893.189 361.22)" fill="#dbdbdb" stroke="#707070" strokeWidth="6">
                <ellipse cx="18.799" cy="18.981" rx="18.799" ry="18.981" stroke="none"/>
                <ellipse cx="18.799" cy="18.981" rx="15.799" ry="15.981" fill="none"/>
            </g>
            <path id="Path_34" dataname="Path 34" d="M.186-15.792s4.6-3.474,8.8-3.474,7.941,3.474,7.941,3.474" transform="translate(876.265 395.993)" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="6"/>
            </g>
            <g id="母鴨" transform="translate(3452.552 -5379.475)" data-furnid="femaleDuck" style={{cursor:"pointer" ,display:funitureUse.femaleDuck}} onClick={putInStorage}>
            <g id="鴨子-3" dataname="鴨子" transform="translate(-2411.749 5900.052)">
                <line id="Line_17-3" dataname="Line 17" y2="28.213" transform="translate(144.931 371.771)" fill="none" stroke="#574809" strokeWidth="7"/>
                <line id="Line_21-3" dataname="Line 21" y2="28.213" transform="translate(223.198 371.771)" fill="none" stroke="#574809" strokeWidth="7"/>
                <line id="Line_18-3" dataname="Line 18" x1="17.292" y2="13.651" transform="translate(125.819 398.164)" fill="none" stroke="#574809" strokeWidth="7"/>
                <line id="Line_24-3" dataname="Line 24" x1="17.292" y2="13.651" transform="translate(204.086 398.164)" fill="none" stroke="#574809" strokeWidth="7"/>
                <line id="Line_19-3" dataname="Line 19" y2="26.62" transform="translate(144.931 394.296)" fill="none" stroke="#574809" strokeWidth="7"/>
                <line id="Line_22-3" dataname="Line 22" y2="26.62" transform="translate(223.198 394.296)" fill="none" stroke="#574809" strokeWidth="7"/>
                <line id="Line_20-3" dataname="Line 20" x2="17.292" y2="11.831" transform="translate(146.751 398.164)" fill="none" stroke="#574809" strokeWidth="7"/>
                <line id="Line_23-3" dataname="Line 23" x2="17.292" y2="11.831" transform="translate(225.018 398.164)" fill="none" stroke="#574809" strokeWidth="7"/>
                <ellipse id="Ellipse_2-3" dataname="Ellipse 2" cx="144.704" cy="116.946" rx="144.704" ry="116.946" transform="translate(36.175 0)" fill="#ffd230"/>
                <ellipse id="Ellipse_3-3" dataname="Ellipse 3" cx="162.451" cy="131.053" rx="162.451" ry="131.053" transform="translate(18.883 117.402)" fill="#ffd230"/>
                <path id="Polygon_1-3" dataname="Polygon 1" d="M43.684,0,87.369,40.044H0Z" transform="translate(137.195 80.088)" fill="#f70"/>
                <ellipse id="Ellipse_4-3" dataname="Ellipse 4" cx="12.741" cy="13.196" rx="12.741" ry="13.196" transform="translate(105.342 73.717)"/>
                <ellipse id="Ellipse_5-3" dataname="Ellipse 5" cx="12.741" cy="13.196" rx="12.741" ry="13.196" transform="translate(235.484 73.717)"/>
                <path id="Path_10-3" dataname="Path 10" d="M99.91,0S118.9,32.406,118.9,64.826a58.7,58.7,0,0,1-58.7,58.7C27.78,123.526,0,100.6,0,100.6s34.837-32.66,49.512-47.335S99.91,0,99.91,0Z" transform="matrix(-0.454, 0.891, -0.891, -0.454, 164.042, 223.524)" fill="coral"/>
                <path id="Path_11-3" dataname="Path 11" d="M99.91,123.526S118.9,91.12,118.9,58.7A58.7,58.7,0,0,0,60.2,0C27.78,0,0,22.928,0,22.928s34.837,32.66,49.512,47.335S99.91,123.526,99.91,123.526Z" transform="translate(320.163 167.444) rotate(70)" fill="coral"/>
            </g>
            <g id="Group_23" dataname="Group 23" transform="translate(-2186.699 5852.489) rotate(16)">
                <g id="Group_22" dataname="Group 22" transform="translate(0 0)">
                <path id="Union_1" dataname="Union 1" d="M76.987,92.013a23.466,23.466,0,0,1-5.611-1.65,33.4,33.4,0,0,1-5.829-3.24A40.574,40.574,0,0,1,59.9,82.4a41.586,41.586,0,0,1-3.211-3.6,37.853,37.853,0,0,1-2.61-3.739,32.514,32.514,0,0,1-1.98-3.766c-.364-.824-.682-1.647-.951-2.46-.268.812-.586,1.636-.951,2.46a32.53,32.53,0,0,1-1.98,3.766,37.871,37.871,0,0,1-2.61,3.739A41.59,41.59,0,0,1,42.4,82.4a40.49,40.49,0,0,1-5.794,4.82,33.036,33.036,0,0,1-5.972,3.261,22.819,22.819,0,0,1-5.723,1.585,13.6,13.6,0,0,1-5.045-.207L29.044,75.9,13.558,85.541a13.637,13.637,0,0,1-.2-5.043,22.862,22.862,0,0,1,1.589-5.717,33.056,33.056,0,0,1,3.26-5.964,40.49,40.49,0,0,1,4.815-5.785,41.558,41.558,0,0,1,3.6-3.211,37.869,37.869,0,0,1,3.739-2.61A33,33,0,0,1,33.546,55.5q-.022-.1-.043-.206a26.409,26.409,0,0,1-3.544.054,32.507,32.507,0,0,1-4.225-.5,37.864,37.864,0,0,1-4.426-1.1,41.569,41.569,0,0,1-4.516-1.706,40.618,40.618,0,0,1-6.343-3.521,33.6,33.6,0,0,1-5.068-4.2,23.867,23.867,0,0,1-3.56-4.569A14.674,14.674,0,0,1,0,35.135l20.14,3.157L3.89,26a14.255,14.255,0,0,1,4.647-1.835,23.467,23.467,0,0,1,5.83-.471,33.4,33.4,0,0,1,6.6.936,40.579,40.579,0,0,1,6.965,2.383,41.581,41.581,0,0,1,4.29,2.215A37.869,37.869,0,0,1,36,31.788q.872.672,1.681,1.382-.212-.73-.394-1.483a37.861,37.861,0,0,1-.8-4.489,41.576,41.576,0,0,1-.278-4.82,40.61,40.61,0,0,1,.636-7.226,33.6,33.6,0,0,1,1.779-6.339A23.861,23.861,0,0,1,41.352,3.7,14.672,14.672,0,0,1,44.829.16l5.308,19.683L54.751,0a14.256,14.256,0,0,1,3.567,3.5,23.476,23.476,0,0,1,2.8,5.134,33.393,33.393,0,0,1,1.831,6.412,40.576,40.576,0,0,1,.656,7.332,41.58,41.58,0,0,1-.278,4.82,37.862,37.862,0,0,1-.8,4.489q-.038.159-.078.317.6-.51,1.239-1a37.867,37.867,0,0,1,3.777-2.555,41.549,41.549,0,0,1,4.29-2.215,40.612,40.612,0,0,1,6.861-2.358,33.609,33.609,0,0,1,6.515-.953,23.87,23.87,0,0,1,5.778.411,14.673,14.673,0,0,1,4.649,1.736L79.736,37.924l20-3.855a14.253,14.253,0,0,1-1.746,4.681A23.469,23.469,0,0,1,94.444,43.4a33.386,33.386,0,0,1-5.113,4.281A40.565,40.565,0,0,1,82.9,51.259a41.56,41.56,0,0,1-4.516,1.706,37.837,37.837,0,0,1-4.426,1.1,32.51,32.51,0,0,1-4.225.5,26.675,26.675,0,0,1-3.281-.033l0,.011q.852.311,1.712.691a32.517,32.517,0,0,1,3.766,1.98,37.858,37.858,0,0,1,3.739,2.61,41.554,41.554,0,0,1,3.6,3.211,40.617,40.617,0,0,1,4.66,5.56,33.608,33.608,0,0,1,3.225,5.74,23.868,23.868,0,0,1,1.687,5.541,14.673,14.673,0,0,1,.045,4.962L71.215,74.671,81.983,91.965a12.564,12.564,0,0,1-2.52.244A16.431,16.431,0,0,1,76.987,92.013Z" transform="matrix(0.978, 0.208, -0.208, 0.978, 19.171, 0)" fill="#ffb8b8"/>
                </g>
                <circle id="Ellipse_46" dataname="Ellipse 46" cx="16.837" cy="16.837" r="16.837" transform="translate(42.09 42.674)" fill="#fff"/>
            </g>
            <ellipse id="Ellipse_49" dataname="Ellipse 49" cx="27.303" cy="14.561" rx="27.303" ry="14.561" transform="translate(-2186.73 6017.681)" fill="rgba(188,13,43,0.22)" opacity="0.57"/>
            <ellipse id="Ellipse_50" dataname="Ellipse 50" cx="27.303" cy="14.561" rx="27.303" ry="14.561" transform="translate(-2333.709 6017.681)" fill="rgba(188,13,43,0.22)" opacity="0.57"/>
            </g>
            <g id="舉重槓" transform="translate(2139 -2930.241)" data-furnid="weight" style={{cursor:"pointer" ,display:funitureUse.weight}} onClick={putInStorage}>
            <g id="Group_28" dataname="Group 28" transform="translate(-1914 3730.343)">
                <g data-type="innerShadowGroup">
                <rect id="Rectangle_84-2" dataname="Rectangle 84" width="177" height="28" transform="translate(99 61.898)" fill="#aeaeae"/>
                <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_84)">
                    <rect id="Rectangle_84-3" dataname="Rectangle 84" width="177" height="28" transform="translate(324 862)" fill="#fff"/>
                </g>
                </g>
                <g data-type="innerShadowGroup">
                <rect id="Rectangle_85-2" dataname="Rectangle 85" width="32" height="154" rx="16" transform="translate(67 -0.102)" fill="#5e5e5e"/>
                <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_85)">
                    <rect id="Rectangle_85-3" dataname="Rectangle 85" width="32" height="154" rx="16" transform="translate(292 800)" fill="#fff"/>
                </g>
                </g>
                <g data-type="innerShadowGroup">
                <rect id="Rectangle_86-2" dataname="Rectangle 86" width="32" height="154" rx="16" transform="translate(276 -0.102)" fill="#5e5e5e"/>
                <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_86)">
                    <rect id="Rectangle_86-3" dataname="Rectangle 86" width="32" height="154" rx="16" transform="translate(501 800)" fill="#fff"/>
                </g>
                </g>
                <g data-type="innerShadowGroup">
                <rect id="Rectangle_87-2" dataname="Rectangle 87" width="25" height="125" rx="12.5" transform="translate(308 13.898)" fill="#5e5e5e"/>
                <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_87)">
                    <rect id="Rectangle_87-3" dataname="Rectangle 87" width="25" height="125" rx="12.5" transform="translate(533 814)" fill="#fff"/>
                </g>
                </g>
                <g data-type="innerShadowGroup">
                <rect id="Rectangle_88-2" dataname="Rectangle 88" width="27" height="125" rx="13.5" transform="translate(40 13.898)" fill="#5e5e5e"/>
                <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_88)">
                    <rect id="Rectangle_88-3" dataname="Rectangle 88" width="27" height="125" rx="13.5" transform="translate(265 814)" fill="#fff"/>
                </g>
                </g>
                <g data-type="innerShadowGroup">
                <rect id="Rectangle_89-2" dataname="Rectangle 89" width="20" height="91" rx="10" transform="translate(333 30.898)" fill="#5e5e5e"/>
                <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_89)">
                    <rect id="Rectangle_89-3" dataname="Rectangle 89" width="20" height="91" rx="10" transform="translate(558 831)" fill="#fff"/>
                </g>
                </g>
                <g data-type="innerShadowGroup">
                <rect id="Rectangle_90-2" dataname="Rectangle 90" width="18" height="91" rx="9" transform="translate(22 30.898)" fill="#5e5e5e"/>
                <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_90)">
                    <rect id="Rectangle_90-3" dataname="Rectangle 90" width="18" height="91" rx="9" transform="translate(247 831)" fill="#fff"/>
                </g>
                </g>
                <g data-type="innerShadowGroup">
                <path id="Rectangle_91-2" dataname="Rectangle 91" d="M0,0H5.88A15.12,15.12,0,0,1,21,15.12v0A12.88,12.88,0,0,1,8.12,28H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(353 61.898)" fill="#aeaeae"/>
                <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_91)">
                    <path id="Rectangle_91-3" dataname="Rectangle 91" d="M0,0H5.88A15.12,15.12,0,0,1,21,15.12v0A12.88,12.88,0,0,1,8.12,28H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(578 862)" fill="#fff"/>
                </g>
                </g>
                <g data-type="innerShadowGroup">
                <path id="Rectangle_92-2" dataname="Rectangle 92" d="M15.12,0H22a0,0,0,0,1,0,0V28a0,0,0,0,1,0,0H12.88A12.88,12.88,0,0,1,0,15.12v0A15.12,15.12,0,0,1,15.12,0Z" transform="translate(0 61.898)" fill="#aeaeae"/>
                <g transform="matrix(1, 0, 0, 1, -225, -800.1)" filter="url(#Rectangle_92)">
                    <path id="Rectangle_92-3" dataname="Rectangle 92" d="M15.12,0H22a0,0,0,0,1,0,0V28a0,0,0,0,1,0,0H12.88A12.88,12.88,0,0,1,0,15.12v0A15.12,15.12,0,0,1,15.12,0Z" transform="translate(225 862)" fill="#fff"/>
                </g>
                </g>
            </g>
            <rect id="Rectangle_93" dataname="Rectangle 93" width="5" height="26" rx="2.5" transform="translate(-1843 3749.241)" fill="#8d8d8d"/>
            <rect id="Rectangle_94" dataname="Rectangle 94" width="4" height="25" rx="2" transform="translate(-1869 3763.241)" fill="#8d8d8d"/>
            <rect id="Rectangle_95" dataname="Rectangle 95" width="5" height="9" rx="2.5" transform="translate(-1843 3779.241)" fill="#8d8d8d"/>
            <rect id="Rectangle_96" dataname="Rectangle 96" width="4" height="26" rx="2" transform="translate(-1614 3749.241)" fill="#8d8d8d"/>
            <rect id="Rectangle_97" dataname="Rectangle 97" width="5" height="27" rx="2.5" transform="translate(-1588 3757.241)" fill="#8d8d8d"/>
            <rect id="Rectangle_98" dataname="Rectangle 98" width="4" height="9" rx="2" transform="translate(-1614 3780.241)" fill="#8d8d8d"/>
            </g>
            <g id="時鐘" transform="translate(1493 -3374.358)" data-furnid="clock" style={{cursor:"pointer" ,display:funitureUse.clock}} onClick={putInStorage}>
            <circle id="Ellipse_57" dataname="Ellipse 57" cx="72" cy="72" r="72" transform="translate(-660 3471.358)" fill="#939191" opacity="0.88"/>
            <line id="Line_30" dataname="Line 30" y1="40.581" x2="37" transform="translate(-588.685 3503.462)" fill="none" stroke="#ffcfa5" strokeLinecap="round" strokeWidth="7"/>
            <line id="Line_31" dataname="Line 31" y1="12.532" x2="36.404" transform="translate(-625.088 3544.043)" fill="none" stroke="#ffcfa5" strokeLinecap="round" strokeWidth="7"/>
            </g>
        </g>
        </svg>
        
        <div id="gameStorage" style={{display:props.showStorage}}>
        <div id="closeBtn" onClick={props.showStoragePage} style={{cursor:"pointer"}}>
            <svg width="50" viewBox="0 0 146 146">
            <g id="關閉按鈕" transform="translate(-1742 -29)">
                <g id="Ellipse_61" dataname="Ellipse 61" transform="translate(1742 29)" fill="#256170" stroke="#707070" strokeWidth="1">
                <circle cx="73" cy="73" r="73" stroke="none"/>
                <circle cx="73" cy="73" r="72.5" fill="none"/>
                </g>
                <path id="Icon_ionic-md-close" dataname="Icon ionic-md-close" d="M76.262,14.4,69.389,7.523l-27.5,27.5L14.4,7.523,7.523,14.4l27.5,27.5-27.5,27.5L14.4,76.262l27.5-27.5,27.5,27.5,6.873-6.873-27.5-27.5Z" transform="translate(1773.107 60.107)" fill="#fff"/>
            </g>
            </svg>
        </div>

            <ul>
                {/* <li id="leftArrow">
                <svg width="25" viewBox="0 0 46.206 80.822">
                <path id="Icon_ionic-ios-arrow-back" dataname="Icon ionic-ios-arrow-back" d="M25.18,46.594,55.76,16.037A5.776,5.776,0,1,0,47.58,7.881L12.933,42.5a5.765,5.765,0,0,0-.168,7.964L47.556,85.331a5.776,5.776,0,1,0,8.181-8.156Z" transform="translate(-11.251 -6.194)" fill="#464545"/>
                </svg>

                </li> */}
                
                <div id="cardBox">
                <div id="littleCardBox" >
                <li id="storageCard1" data-furnid="light" style={{cursor:"pointer" ,display:funitureHave.light}} onClick={putInRoom}>
                <svg width="130" height="130" viewBox="0 0 130 130" >
                <g id="lightcCard" transform="translate(-629 -445)">
                    <rect id="Rectangle_125" dataname="Rectangle 125" width="130" height="130" transform="translate(629 445)" fill="#fff"/>
                    <g id="my_light" transform="translate(570.764 131.332)">
                    <path id="Path_4" dataname="Path 4" d="M0,.478s22.055,28.01,53.666,29.13C93.033,29.33,121.472,0,121.472,0" transform="translate(62.5 357.5)" fill="none" stroke="#707070" strokeWidth="2"/>
                    <g id="Group_14" dataname="Group 14" transform="translate(66.525 365.587)">
                        <line id="Line_16" dataname="Line 16" y2="6.052" transform="translate(2.891 0)" fill="none" stroke="#707070" strokeWidth="2"/>
                        <rect id="Rectangle_23" dataname="Rectangle 23" width="2.547" height="3.821" transform="translate(1.672 3.972)" fill="#363636"/>
                        <path id="Path_5" dataname="Path 5" d="M2.945,0C4.572,0,5.891,1.675,5.891,3.741a5.467,5.467,0,0,1-.808,3.164,2.616,2.616,0,0,1-2.138.577c-.725,0-1.327.358-2.063-.577A4.843,4.843,0,0,1,0,3.741C0,1.675,1.319,0,2.945,0Z" transform="translate(5.891 13.433) rotate(180)" fill="#ffd230"/>
                    </g>
                    <g id="Group_15" dataname="Group 15" transform="translate(79.872 376.408)">
                        <path id="Path_23" dataname="Path 23" d="M0,0V6.052" transform="translate(2.945 0)" fill="none" stroke="#707070" strokeWidth="2"/>
                        <rect id="Rectangle_23-2" dataname="Rectangle 23" width="2.547" height="3.821" transform="translate(1.672 3.991)" fill="#363636"/>
                        <path id="Path_5-2" dataname="Path 5" d="M2.945,0C4.572,0,5.891,1.675,5.891,3.741a5.467,5.467,0,0,1-.808,3.164,2.616,2.616,0,0,1-2.138.577c-.725,0-1.327.358-2.063-.577A4.843,4.843,0,0,1,0,3.741C0,1.675,1.319,0,2.945,0Z" transform="translate(5.891 13.452) rotate(180)" fill="#ffd230"/>
                    </g>
                    <g id="Group_16" dataname="Group 16" transform="translate(94.978 383.226)">
                        <line id="Line_16-2" dataname="Line 16" y2="5.62" transform="translate(2.97 0)" fill="none" stroke="#707070" strokeWidth="2"/>
                        <rect id="Rectangle_23-3" dataname="Rectangle 23" width="2.547" height="3.821" transform="translate(1.672 3.806)" fill="#363636"/>
                        <path id="Path_5-3" dataname="Path 5" d="M2.945,0C4.572,0,5.891,1.675,5.891,3.741a5.467,5.467,0,0,1-.808,3.164,2.616,2.616,0,0,1-2.138.577c-.725,0-1.327.358-2.063-.577A4.843,4.843,0,0,1,0,3.741C0,1.675,1.319,0,2.945,0Z" transform="translate(5.891 13.267) rotate(180)" fill="#ffd230"/>
                    </g>
                    <g id="Group_17" dataname="Group 17" transform="translate(111.853 386.684)">
                        <line id="Line_16-3" dataname="Line 16" y2="5.62" transform="translate(2.953 0)" fill="none" stroke="#707070" strokeWidth="2"/>
                        <rect id="Rectangle_23-4" dataname="Rectangle 23" width="2.547" height="3.821" transform="translate(1.672 3.691)" fill="#363636"/>
                        <path id="Path_5-4" dataname="Path 5" d="M2.945,0C4.572,0,5.891,1.675,5.891,3.741a5.467,5.467,0,0,1-.808,3.164,2.616,2.616,0,0,1-2.138.577c-.725,0-1.327.358-2.063-.577A4.843,4.843,0,0,1,0,3.741C0,1.675,1.319,0,2.945,0Z" transform="translate(5.891 13.152) rotate(180)" fill="#ffd230"/>
                    </g>
                    <g id="Group_18" dataname="Group 18" transform="translate(127.424 385.82)">
                        <line id="Line_16-4" dataname="Line 16" y2="5.62" transform="translate(2.945 0)" fill="none" stroke="#707070" strokeWidth="2"/>
                        <rect id="Rectangle_23-5" dataname="Rectangle 23" width="2.547" height="3.821" transform="translate(1.672 3.919)" fill="#363636"/>
                        <path id="Path_5-5" dataname="Path 5" d="M2.945,0C4.572,0,5.891,1.675,5.891,3.741a5.467,5.467,0,0,1-.808,3.164,2.616,2.616,0,0,1-2.138.577c-.725,0-1.327.358-2.063-.577A4.843,4.843,0,0,1,0,3.741C0,1.675,1.319,0,2.945,0Z" transform="translate(5.891 13.38) rotate(180)" fill="#ffd230"/>
                    </g>
                    <g id="Group_19" dataname="Group 19" transform="translate(143.375 381.904)">
                        <line id="Line_16-5" dataname="Line 16" x2="0.159" y2="5.731" transform="translate(2.706)" fill="none" stroke="#707070" strokeWidth="2"/>
                        <rect id="Rectangle_23-6" dataname="Rectangle 23" width="2.547" height="3.821" transform="translate(1.672 3.821)" fill="#363636"/>
                        <path id="Path_5-6" dataname="Path 5" d="M2.945,0C4.572,0,5.891,1.675,5.891,3.741a5.467,5.467,0,0,1-.808,3.164,2.616,2.616,0,0,1-2.138.577c-.725,0-1.327.358-2.063-.577A4.843,4.843,0,0,1,0,3.741C0,1.675,1.319,0,2.945,0Z" transform="translate(5.891 13.281) rotate(180)" fill="#ffd230"/>
                    </g>
                    <g id="Group_20" dataname="Group 20" transform="translate(158.5 374.262)">
                        <line id="Line_16-6" dataname="Line 16" x2="0.159" y2="5.731" transform="translate(2.706)" fill="none" stroke="#707070" strokeWidth="2"/>
                        <rect id="Rectangle_23-7" dataname="Rectangle 23" width="2.547" height="3.821" transform="translate(1.672 3.821)" fill="#363636"/>
                        <path id="Path_5-7" dataname="Path 5" d="M2.945,0C4.572,0,5.891,1.675,5.891,3.741a5.467,5.467,0,0,1-.808,3.164,2.616,2.616,0,0,1-2.138.577c-.725,0-1.327.358-2.063-.577A4.843,4.843,0,0,1,0,3.741C0,1.675,1.319,0,2.945,0Z" transform="translate(5.891 13.281) rotate(180)" fill="#ffd230"/>
                    </g>
                    <g id="Group_21" dataname="Group 21" transform="translate(174.42 363.755)">
                        <line id="Line_16-7" dataname="Line 16" x2="0.159" y2="5.731" transform="translate(2.706)" fill="none" stroke="#707070" strokeWidth="2"/>
                        <rect id="Rectangle_23-8" dataname="Rectangle 23" width="2.547" height="3.821" transform="translate(1.672 3.821)" fill="#363636"/>
                        <path id="Path_5-8" dataname="Path 5" d="M2.945,0C4.572,0,5.891,1.675,5.891,3.741a5.467,5.467,0,0,1-.808,3.164,2.616,2.616,0,0,1-2.138.577c-.725,0-1.327.358-2.063-.577A4.843,4.843,0,0,1,0,3.741C0,1.675,1.319,0,2.945,0Z" transform="translate(5.891 13.281) rotate(180)" fill="#ffd230"/>
                    </g>
                    </g>
                </g>
                </svg>


                </li>
                <li id="storageCard2" data-furnid="basketball" style={{cursor:"pointer" ,display:funitureHave.basketball}} onClick={putInRoom}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                <g id="basketballCard" transform="translate(-798 -445)">
                    <rect id="Rectangle_122" dataname="Rectangle 122" width="130" height="130" transform="translate(798 445)" fill="#fff"/>
                    <g id="basketball" transform="translate(652.925 -268.174)">
                    <circle id="Ellipse_6" dataname="Ellipse 6" cx="41.075" cy="41.075" r="41.075" transform="translate(169 737)" fill="#ef8d37"/>
                    <path id="Path_761" dataname="Path 761" d="M0,0H82.149" transform="translate(169 778.075)" fill="none" stroke="#707070" strokeWidth="4"/>
                    <path id="Path_6" dataname="Path 6" d="M0,0S11.407,15.8,11.906,31.153,1.994,61.413,1.994,61.413" transform="translate(181.96 748.365)" fill="none" stroke="#707070" strokeWidth="4"/>
                    <path id="Path_7" dataname="Path 7" d="M11.923,0S.516,15.8.017,31.153,9.929,61.413,9.929,61.413" transform="translate(226.225 748.365)" fill="none" stroke="#707070" strokeWidth="4"/>
                    <path id="Path_760" dataname="Path 760" d="M0,0V82.149" transform="translate(210.274 737.199)" fill="none" stroke="#707070" strokeWidth="4"/>
                    </g>
                </g>
                </svg>


                </li>
                <li id="storageCard3" data-furnid="bathTube" style={{cursor:"pointer" ,display:funitureHave.bathTube}} onClick={putInRoom}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                <g id="bathCard" transform="translate(-967 -445)">
                    <rect id="Rectangle_123" dataname="Rectangle 123" width="130" height="130" transform="translate(967 445)" fill="#fff"/>
                    <g id="bath_tube" dataname="bath tube" transform="translate(-248.823 -34.168)">
                    <path id="Path_8" dataname="Path 8" d="M0,0H117.252V27.074c0,2.455-2.934,5.1-7.856,6.6,0,0-24.425,6.549-49.809,6.549s-51.73-6.549-51.73-6.549C3.78,32.427.636,28.719.636,26.264Z" transform="translate(1222 537.977)" fill="#b8dbdb"/>
                    <g id="Path_9" dataname="Path 9" transform="translate(1222 523)" fill="#68709f">
                        <path d="M 58.82281112670898 27.7415657043457 C 50.99144744873047 27.7415657043457 43.39884567260742 27.34127616882324 36.25588226318359 26.55182075500488 C 29.39552116394043 25.7935848236084 23.24906539916992 24.71196746826172 17.98726654052734 23.33702087402344 C 12.94602966308594 22.01972961425781 8.869829177856445 20.45138549804688 6.199356555938721 18.80156707763672 C 4.196029186248779 17.56391143798828 3.000011205673218 16.28138542175293 3.000011205673218 15.37078475952148 C 3.000011205673218 14.46018505096436 4.196029186248779 13.17765712738037 6.199356555938721 11.94000339508057 C 8.869829177856445 10.29018497467041 12.94602966308594 8.72183895111084 17.98726654052734 7.404548168182373 C 23.24906539916992 6.029603004455566 29.39552116394043 4.94798469543457 36.25588226318359 4.189748287200928 C 43.39884567260742 3.400293827056885 50.99144744873047 3.000002861022949 58.82281112670898 3.000002861022949 C 66.6541748046875 3.000002861022949 74.24677276611328 3.400293827056885 81.38973999023438 4.189748287200928 C 88.25009918212891 4.94798469543457 94.39655303955078 6.029603004455566 99.65837097167969 7.404548168182373 C 104.6996078491211 8.72183895111084 108.7758102416992 10.29018497467041 111.4462814331055 11.94000339508057 C 113.4496078491211 13.17765712738037 114.6456298828125 14.46018505096436 114.6456298828125 15.37078475952148 C 114.6456298828125 16.28138542175293 113.4496078491211 17.56391143798828 111.4462814331055 18.80156707763672 C 108.7758102416992 20.45138549804688 104.6996078491211 22.01972961425781 99.65837097167969 23.33702087402344 C 94.39655303955078 24.71196746826172 88.25009918212891 25.7935848236084 81.38973999023438 26.55182075500488 C 74.24677276611328 27.34127616882324 66.6541748046875 27.7415657043457 58.82281112670898 27.7415657043457 Z" stroke="none"/>
                        <path d="M 58.82281112670898 5.999992370605469 C 29.36061096191406 5.999992370605469 10.37217712402344 11.68829536437988 6.432075500488281 15.37078475952148 C 10.37217712402344 19.05327415466309 29.36061096191406 24.7415771484375 58.82281112670898 24.7415771484375 C 88.28501892089844 24.7415771484375 107.2734451293945 19.05327415466309 111.2135467529297 15.37078475952148 C 107.2734451293945 11.68829536437988 88.28501892089844 5.999992370605469 58.82281112670898 5.999992370605469 M 58.82281112670898 -7.62939453125e-06 C 91.30974578857422 -7.62939453125e-06 117.645622253418 6.881742477416992 117.645622253418 15.37078475952148 C 117.645622253418 23.85982704162598 91.30974578857422 30.7415771484375 58.82281112670898 30.7415771484375 C 26.33587646484375 30.7415771484375 0 23.85982704162598 0 15.37078475952148 C 0 6.881742477416992 26.33587646484375 -7.62939453125e-06 58.82281112670898 -7.62939453125e-06 Z" stroke="none" fill="#d9f2f2"/>
                    </g>
                    <circle id="Ellipse_8" dataname="Ellipse 8" cx="2.562" cy="2.562" r="2.562" transform="translate(1243.48 532.262)" fill="#bba3c4"/>
                    <circle id="Ellipse_27" dataname="Ellipse 27" cx="2.562" cy="2.562" r="2.562" transform="translate(1297.277 538.962)" fill="#bba3c4"/>
                    <circle id="Ellipse_9" dataname="Ellipse 9" cx="3.153" cy="3.153" r="3.153" transform="translate(1251.165 535.218)" fill="#bba3c4"/>
                    <circle id="Ellipse_31" dataname="Ellipse 31" cx="3.153" cy="3.153" r="3.153" transform="translate(1321.122 533.247)" fill="#bba3c4"/>
                    <circle id="Ellipse_18" dataname="Ellipse 18" cx="3.153" cy="3.153" r="3.153" transform="translate(1300.824 531.671)" fill="#bba3c4"/>
                    <circle id="Ellipse_10" dataname="Ellipse 10" cx="4.335" cy="4.335" r="4.335" transform="translate(1268.112 529.7)" fill="#bba3c4"/>
                    <circle id="Ellipse_11" dataname="Ellipse 11" cx="2.759" cy="2.759" r="2.759" transform="translate(1307.919 533.641)" fill="#eda4a4"/>
                    <circle id="Ellipse_12" dataname="Ellipse 12" cx="3.252" cy="3.252" r="3.252" transform="translate(1261.609 533.641)" fill="#eda4a4"/>
                    <circle id="Ellipse_29" dataname="Ellipse 29" cx="3.252" cy="3.252" r="3.252" transform="translate(1245.45 536.203)" fill="#eda4a4"/>
                    <circle id="Ellipse_13" dataname="Ellipse 13" cx="2.857" cy="2.857" r="2.857" transform="translate(1292.548 535.218)" fill="#eda4a4"/>
                    <circle id="Ellipse_33" dataname="Ellipse 33" cx="2.857" cy="2.857" r="2.857" transform="translate(1275.01 527.335)" fill="#eda4a4"/>
                    <circle id="Ellipse_17" dataname="Ellipse 17" cx="4.631" cy="4.631" r="4.631" transform="translate(1277.768 532.459)" fill="#eda4a4"/>
                    <circle id="Ellipse_16" dataname="Ellipse 16" cx="2.759" cy="2.759" r="2.759" transform="translate(1252.939 529.7)" fill="#eda4a4"/>
                    <circle id="Ellipse_14" dataname="Ellipse 14" cx="2.759" cy="2.759" r="2.759" transform="translate(1271.068 537.977)" fill="#eda4a4"/>
                    <circle id="Ellipse_15" dataname="Ellipse 15" cx="2.759" cy="2.759" r="2.759" transform="translate(1231.459 533.641)" fill="#eda4a4"/>
                    <circle id="Ellipse_19" dataname="Ellipse 19" cx="3.054" cy="3.054" r="3.054" transform="translate(1259.048 538.174)" fill="#fff"/>
                    <circle id="Ellipse_28" dataname="Ellipse 28" cx="3.054" cy="3.054" r="3.054" transform="translate(1258.851 528.715)" fill="#fff"/>
                    <circle id="Ellipse_21" dataname="Ellipse 21" cx="3.054" cy="3.054" r="3.054" transform="translate(1285.454 539.159)" fill="#fff"/>
                    <circle id="Ellipse_26" dataname="Ellipse 26" cx="3.054" cy="3.054" r="3.054" transform="translate(1294.913 530.685)" fill="#fff"/>
                    <circle id="Ellipse_25" dataname="Ellipse 25" cx="3.054" cy="3.054" r="3.054" transform="translate(1276.389 539.159)" fill="#fff"/>
                    <circle id="Ellipse_22" dataname="Ellipse 22" cx="3.054" cy="3.054" r="3.054" transform="translate(1303.978 537.188)" fill="#fff"/>
                    <circle id="Ellipse_23" dataname="Ellipse 23" cx="3.054" cy="3.054" r="3.054" transform="translate(1316.392 533.05)" fill="#fff"/>
                    <circle id="Ellipse_24" dataname="Ellipse 24" cx="3.054" cy="3.054" r="3.054" transform="translate(1285.651 529.109)" fill="#fff"/>
                    <circle id="Ellipse_30" dataname="Ellipse 30" cx="3.054" cy="3.054" r="3.054" transform="translate(1311.072 536.006)" fill="#fff"/>
                    <circle id="Ellipse_20" dataname="Ellipse 20" cx="3.054" cy="3.054" r="3.054" transform="translate(1239.933 535.415)" fill="#fff"/>
                    <circle id="Ellipse_32" dataname="Ellipse 32" cx="3.153" cy="3.153" r="3.153" transform="translate(1314.422 535.415)" fill="#bba3c4"/>
                    </g>
                </g>
                </svg>


                </li>
                <li id="storageCard4" data-furnid="TV" style={{cursor:"pointer" ,display:funitureHave.TV}} onClick={putInRoom}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                <g id="tvCard" transform="translate(-1136 -445)">
                    <rect id="Rectangle_124" dataname="Rectangle 124" width="130" height="130" transform="translate(1136 445)" fill="#fff"/>
                    <g id="TV" transform="translate(711 218.23)">
                    <g id="Rectangle_43" dataname="Rectangle 43" transform="translate(442 266.77)" fill="#464444" stroke="#707070" strokeWidth="1">
                        <rect width="96" height="50" stroke="none"/>
                        <rect x="0.5" y="0.5" width="95" height="49" fill="none"/>
                    </g>
                    <g id="Rectangle_44" dataname="Rectangle 44" transform="translate(445 269.77)" fill="#dbdbdb" stroke="#707070" strokeWidth="1">
                        <rect width="91" height="44" stroke="none"/>
                        <rect x="0.5" y="0.5" width="90" height="43" fill="none"/>
                    </g>
                    <rect id="Rectangle_45" dataname="Rectangle 45" width="6" height="9" transform="translate(487 316.77)" fill="#464444"/>
                    <ellipse id="Ellipse_36" dataname="Ellipse 36" cx="28" cy="3" rx="28" ry="3" transform="translate(462 323.77)" fill="#464444"/>
                    </g>
                </g>
                </svg>

                </li>
                <li id="storageCard5" data-furnid="cabinet" style={{cursor:"pointer" ,display:funitureHave.cabinet}} onClick={putInRoom}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                <defs>
                    <filter id="Ellipse_37" x="54.102" y="21.768" width="22.218" height="21.796" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feFlood  floodOpacity="0.161"/>
                    <feComposite operator="in" in2="blur"/>
                    <feComposite in="SourceGraphic"/>
                    </filter>
                    <filter id="Ellipse_38" x="54.102" y="52.557" width="22.218" height="22.218" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-2"/>
                    <feFlood  floodOpacity="0.161"/>
                    <feComposite operator="in" in2="blur-2"/>
                    <feComposite in="SourceGraphic"/>
                    </filter>
                </defs>
                <g id="cabinetCard" transform="translate(-629 -630)">
                    <rect id="Rectangle_126" dataname="Rectangle 126" width="130" height="130" transform="translate(629 630)" fill="#fff"/>
                    <g id="櫃子" transform="translate(229.817 450.481)">
                    <path id="Path_13" dataname="Path 13" d="M2.533,0C4.793,0,5.6,23.288,5.6,23.288s-.585.772-2.589.772A5.2,5.2,0,0,1,0,23.288S.273,0,2.533,0Z" transform="translate(437.848 287.655) rotate(180)" fill="#d6c298"/>
                    <path id="Path_15" dataname="Path 15" d="M2.533,0C4.793,0,5.6,23.288,5.6,23.288s-.585.772-2.589.772A5.2,5.2,0,0,1,0,23.288S.273,0,2.533,0Z" transform="translate(500.286 287.655) rotate(180)" fill="#d6c298"/>
                    <rect id="Rectangle_50" dataname="Rectangle 50" width="92.366" height="67.482" rx="10" transform="translate(418 201.382)" fill="#d6c298"/>
                    <rect id="Rectangle_53" dataname="Rectangle 53" width="85.618" height="30.367" transform="translate(421.374 204.756)" fill="#c18c57"/>
                    <rect id="Rectangle_55" dataname="Rectangle 55" width="85.618" height="30.367" transform="translate(421.374 235.545)" fill="#c18c57"/>
                    <rect id="Rectangle_51" dataname="Rectangle 51" width="82.666" height="28.258" transform="translate(423.061 206.021)" fill="#e0d5bf"/>
                    <rect id="Rectangle_54" dataname="Rectangle 54" width="82.666" height="28.258" transform="translate(423.061 236.81)" fill="#e0d5bf"/>
                    <g transform="matrix(1, 0, 0, 1, 399.18, 179.52)" filter="url(#Ellipse_37)">
                        <ellipse id="Ellipse_37-2" dataname="Ellipse 37" cx="2.109" cy="1.898" rx="2.109" ry="1.898" transform="translate(63.1 27.77)" fill="#760202"/>
                    </g>
                    <g transform="matrix(1, 0, 0, 1, 399.18, 179.52)" filter="url(#Ellipse_38)">
                        <circle id="Ellipse_38-2" dataname="Ellipse 38" cx="2.109" cy="2.109" r="2.109" transform="translate(63.1 58.56)" fill="#760202"/>
                    </g>
                    </g>
                </g>
                </svg>


                </li>
                <li id="storageCard6" data-furnid="mirror" style={{cursor:"pointer" ,display:funitureHave.mirror}} onClick={putInRoom}>
                <svg width="130" height="130.262" viewBox="0 0 130 130.262">
                <defs>
                    <filter id="Subtraction_8" x="36.412" y="5.739" width="56.853" height="44.057" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feFlood  floodOpacity="0.259"/>
                    <feComposite operator="in" in2="blur"/>
                    <feComposite in="SourceGraphic"/>
                    </filter>
                    <filter id="Subtraction_8-2" x="36.412" y="5.739" width="56.853" height="44.057" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-2"/>
                    <feFlood floodColor="#f1801e" result="color"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
                    <feComposite operator="in" in="color"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                    <filter id="Path_736" x="21.518" y="24.841" width="86.965" height="105.42" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-3"/>
                    <feFlood  floodOpacity="0.259"/>
                    <feComposite operator="in" in2="blur-3"/>
                    </filter>
                    <filter id="Path_736-2" x="21.518" y="24.841" width="86.965" height="105.42" filterUnits="userSpaceOnUse">
                    <feOffset dx="-30" dy="-10" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="25" result="blur-4"/>
                    <feFlood floodColor="#13dbe2"  floodOpacity="0.3" result="color-2"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur-4"/>
                    <feComposite operator="in" in="color-2"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                    <filter id="Path_737" x="29.877" y="34.081" width="36.132" height="49.083" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-5"/>
                    <feFlood  floodOpacity="0.259"/>
                    <feComposite operator="in" in2="blur-5"/>
                    <feComposite in="SourceGraphic"/>
                    </filter>
                    <filter id="Path_738" x="32.868" y="38.444" width="34.898" height="50.396" filterUnits="userSpaceOnUse">
                    <feOffset dy="3" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-6"/>
                    <feFlood  floodOpacity="0.259"/>
                    <feComposite operator="in" in2="blur-6"/>
                    <feComposite in="SourceGraphic"/>
                    </filter>
                </defs>
                <g id="mirrorCard" transform="translate(-798 -630)">
                    <rect id="Rectangle_127" dataname="Rectangle 127" width="130" height="130" transform="translate(798 630)" fill="#fff"/>
                    <g id="鏡子" transform="translate(1443.518 -2681.261)">
                    <g data-type="innerShadowGroup">
                        <g transform="matrix(1, 0, 0, 1, -645.52, 3311.26)" filter="url(#Subtraction_8)">
                        <path id="Subtraction_8-3" dataname="Subtraction 8" d="M1.16,26.057h0a19.441,19.441,0,0,1,.684-14.9L8.41,19.912,5.623,5.757A19.376,19.376,0,0,1,11.36,1.749l4.464,14.725L18.389.027C18.734.009,19.083,0,19.427,0A19.618,19.618,0,0,1,22.88.306L25.4,16.473l4.135-13.64a19.567,19.567,0,0,1,3.286,2.525L29.958,19.912l6.861-9.149a19.325,19.325,0,0,1,1.505,4.143,19.547,19.547,0,0,1-.631,11.151,29.277,29.277,0,0,0-18.266-6.629A29.274,29.274,0,0,0,1.16,26.056Z" transform="translate(45.41 11.74)" fill="#ffd230"/>
                        </g>
                        <g transform="matrix(1, 0, 0, 1, -645.52, 3311.26)" filter="url(#Subtraction_8-2)">
                        <path id="Subtraction_8-4" dataname="Subtraction 8" d="M1.16,26.057h0a19.441,19.441,0,0,1,.684-14.9L8.41,19.912,5.623,5.757A19.376,19.376,0,0,1,11.36,1.749l4.464,14.725L18.389.027C18.734.009,19.083,0,19.427,0A19.618,19.618,0,0,1,22.88.306L25.4,16.473l4.135-13.64a19.567,19.567,0,0,1,3.286,2.525L29.958,19.912l6.861-9.149a19.325,19.325,0,0,1,1.505,4.143,19.547,19.547,0,0,1-.631,11.151,29.277,29.277,0,0,0-18.266-6.629A29.274,29.274,0,0,0,1.16,26.056Z" transform="translate(45.41 11.74)" fill="#fff"/>
                        </g>
                    </g>
                    <g data-type="innerShadowGroup">
                        <g transform="matrix(1, 0, 0, 1, -645.52, 3311.26)" filter="url(#Path_736)">
                        <g id="Path_736-3" dataname="Path 736" transform="translate(30.52 30.84)" fill="rgba(102,229,255,0.86)">
                            <path d="M 34.48241424560547 83.42024230957031 C 30.49396896362305 83.42024230957031 26.61402893066406 82.42427825927734 22.95038414001465 80.46001434326172 C 19.33149147033691 78.51973724365234 16.06447601318359 75.72061157226562 13.24009132385254 72.14039611816406 C 10.36044502258301 68.49015045166016 8.094152450561523 64.22318267822266 6.504152774810791 59.45801162719727 C 4.842522144317627 54.47818374633789 3.999998807907104 49.17981338500977 3.999998807907104 43.71012115478516 C 3.999998807907104 38.24042892456055 4.842522144317627 32.94207382202148 6.504152774810791 27.96224403381348 C 8.094152450561523 23.19707489013672 10.36044502258301 18.93008995056152 13.24009132385254 15.27984428405762 C 16.06447601318359 11.69962882995605 19.33149147033691 8.900506019592285 22.95038414001465 6.96022891998291 C 26.61402893066406 4.995967388153076 30.49396896362305 3.999998092651367 34.48241424560547 3.999998092651367 C 38.47087478637695 3.999998092651367 42.35079956054688 4.995967388153076 46.01444625854492 6.96022891998291 C 49.63333892822266 8.900506019592285 52.90035247802734 11.69962882995605 55.72473907470703 15.27984428405762 C 58.60438537597656 18.93008995056152 60.87067413330078 23.19707489013672 62.46068954467773 27.96222877502441 C 64.12230682373047 32.94207382202148 64.96482849121094 38.24042892456055 64.96482849121094 43.71012115478516 C 64.96482849121094 49.17981338500977 64.12230682373047 54.47818374633789 62.46068954467773 59.45801162719727 C 60.87068939208984 64.22318267822266 58.60438537597656 68.49015045166016 55.72473907470703 72.14039611816406 C 52.90035247802734 75.72061157226562 49.63333892822266 78.51973724365234 46.01444625854492 80.46001434326172 C 42.35081481933594 82.42427825927734 38.47087478637695 83.42024230957031 34.48241424560547 83.42024230957031 Z" stroke="none"/>
                            <path d="M 34.48241424560547 8 C 19.87995529174805 8 7.999992370605469 24.01950073242188 7.999992370605469 43.71012115478516 C 7.999992370605469 63.40074157714844 19.87995529174805 79.42024230957031 34.48241424560547 79.42024230957031 C 49.08487701416016 79.42024230957031 60.96483612060547 63.40074157714844 60.96483612060547 43.71012115478516 C 60.96483612060547 24.01950073242188 49.08487701416016 8 34.48241424560547 8 M 34.48241424560547 0 C 53.52653503417969 0 68.96483612060547 19.5697021484375 68.96483612060547 43.71012115478516 C 68.96483612060547 67.85056304931641 53.52653503417969 87.42024230957031 34.48241424560547 87.42024230957031 C 15.43829345703125 87.42024230957031 -7.62939453125e-06 67.85056304931641 -7.62939453125e-06 43.71012115478516 C -7.62939453125e-06 19.5697021484375 15.43829345703125 0 34.48241424560547 0 Z" stroke="none" fill="#3e88a8"/>
                        </g>
                        </g>
                        <g id="Path_736-4" dataname="Path 736" transform="translate(-615 3342.103)" fill="rgba(102,229,255,0.86)">
                        <path d="M 34.48241424560547 83.42024230957031 C 30.49396896362305 83.42024230957031 26.61402893066406 82.42427825927734 22.95038414001465 80.46001434326172 C 19.33149147033691 78.51973724365234 16.06447601318359 75.72061157226562 13.24009132385254 72.14039611816406 C 10.36044502258301 68.49015045166016 8.094152450561523 64.22318267822266 6.504152774810791 59.45801162719727 C 4.842522144317627 54.47818374633789 3.999998807907104 49.17981338500977 3.999998807907104 43.71012115478516 C 3.999998807907104 38.24042892456055 4.842522144317627 32.94207382202148 6.504152774810791 27.96224403381348 C 8.094152450561523 23.19707489013672 10.36044502258301 18.93008995056152 13.24009132385254 15.27984428405762 C 16.06447601318359 11.69962882995605 19.33149147033691 8.900506019592285 22.95038414001465 6.96022891998291 C 26.61402893066406 4.995967388153076 30.49396896362305 3.999998092651367 34.48241424560547 3.999998092651367 C 38.47087478637695 3.999998092651367 42.35079956054688 4.995967388153076 46.01444625854492 6.96022891998291 C 49.63333892822266 8.900506019592285 52.90035247802734 11.69962882995605 55.72473907470703 15.27984428405762 C 58.60438537597656 18.93008995056152 60.87067413330078 23.19707489013672 62.46068954467773 27.96222877502441 C 64.12230682373047 32.94207382202148 64.96482849121094 38.24042892456055 64.96482849121094 43.71012115478516 C 64.96482849121094 49.17981338500977 64.12230682373047 54.47818374633789 62.46068954467773 59.45801162719727 C 60.87068939208984 64.22318267822266 58.60438537597656 68.49015045166016 55.72473907470703 72.14039611816406 C 52.90035247802734 75.72061157226562 49.63333892822266 78.51973724365234 46.01444625854492 80.46001434326172 C 42.35081481933594 82.42427825927734 38.47087478637695 83.42024230957031 34.48241424560547 83.42024230957031 Z" stroke="none"/>
                        <path d="M 34.48241424560547 8 C 19.87995529174805 8 7.999992370605469 24.01950073242188 7.999992370605469 43.71012115478516 C 7.999992370605469 63.40074157714844 19.87995529174805 79.42024230957031 34.48241424560547 79.42024230957031 C 49.08487701416016 79.42024230957031 60.96483612060547 63.40074157714844 60.96483612060547 43.71012115478516 C 60.96483612060547 24.01950073242188 49.08487701416016 8 34.48241424560547 8 M 34.48241424560547 0 C 53.52653503417969 0 68.96483612060547 19.5697021484375 68.96483612060547 43.71012115478516 C 68.96483612060547 67.85056304931641 53.52653503417969 87.42024230957031 34.48241424560547 87.42024230957031 C 15.43829345703125 87.42024230957031 -7.62939453125e-06 67.85056304931641 -7.62939453125e-06 43.71012115478516 C -7.62939453125e-06 19.5697021484375 15.43829345703125 0 34.48241424560547 0 Z" stroke="none"/>
                        </g>
                        <g transform="matrix(1, 0, 0, 1, -645.52, 3311.26)" filter="url(#Path_736-2)">
                        <g id="Path_736-5" dataname="Path 736" transform="translate(30.52 30.84)" fill="#fff">
                            <path d="M 34.48241424560547 83.42024230957031 C 30.49396896362305 83.42024230957031 26.61402893066406 82.42427825927734 22.95038414001465 80.46001434326172 C 19.33149147033691 78.51973724365234 16.06447601318359 75.72061157226562 13.24009132385254 72.14039611816406 C 10.36044502258301 68.49015045166016 8.094152450561523 64.22318267822266 6.504152774810791 59.45801162719727 C 4.842522144317627 54.47818374633789 3.999998807907104 49.17981338500977 3.999998807907104 43.71012115478516 C 3.999998807907104 38.24042892456055 4.842522144317627 32.94207382202148 6.504152774810791 27.96224403381348 C 8.094152450561523 23.19707489013672 10.36044502258301 18.93008995056152 13.24009132385254 15.27984428405762 C 16.06447601318359 11.69962882995605 19.33149147033691 8.900506019592285 22.95038414001465 6.96022891998291 C 26.61402893066406 4.995967388153076 30.49396896362305 3.999998092651367 34.48241424560547 3.999998092651367 C 38.47087478637695 3.999998092651367 42.35079956054688 4.995967388153076 46.01444625854492 6.96022891998291 C 49.63333892822266 8.900506019592285 52.90035247802734 11.69962882995605 55.72473907470703 15.27984428405762 C 58.60438537597656 18.93008995056152 60.87067413330078 23.19707489013672 62.46068954467773 27.96222877502441 C 64.12230682373047 32.94207382202148 64.96482849121094 38.24042892456055 64.96482849121094 43.71012115478516 C 64.96482849121094 49.17981338500977 64.12230682373047 54.47818374633789 62.46068954467773 59.45801162719727 C 60.87068939208984 64.22318267822266 58.60438537597656 68.49015045166016 55.72473907470703 72.14039611816406 C 52.90035247802734 75.72061157226562 49.63333892822266 78.51973724365234 46.01444625854492 80.46001434326172 C 42.35081481933594 82.42427825927734 38.47087478637695 83.42024230957031 34.48241424560547 83.42024230957031 Z" stroke="none"/>
                            <path d="M 34.48241424560547 8 C 19.87995529174805 8 7.999992370605469 24.01950073242188 7.999992370605469 43.71012115478516 C 7.999992370605469 63.40074157714844 19.87995529174805 79.42024230957031 34.48241424560547 79.42024230957031 C 49.08487701416016 79.42024230957031 60.96483612060547 63.40074157714844 60.96483612060547 43.71012115478516 C 60.96483612060547 24.01950073242188 49.08487701416016 8 34.48241424560547 8 M 34.48241424560547 0 C 53.52653503417969 0 68.96483612060547 19.5697021484375 68.96483612060547 43.71012115478516 C 68.96483612060547 67.85056304931641 53.52653503417969 87.42024230957031 34.48241424560547 87.42024230957031 C 15.43829345703125 87.42024230957031 -7.62939453125e-06 67.85056304931641 -7.62939453125e-06 43.71012115478516 C -7.62939453125e-06 19.5697021484375 15.43829345703125 0 34.48241424560547 0 Z" stroke="none"/>
                        </g>
                        </g>
                        <g id="Path_736-6" dataname="Path 736" transform="translate(-615 3342.103)" fill="none">
                        <path d="M 34.48241424560547 83.42024230957031 C 30.49396896362305 83.42024230957031 26.61402893066406 82.42427825927734 22.95038414001465 80.46001434326172 C 19.33149147033691 78.51973724365234 16.06447601318359 75.72061157226562 13.24009132385254 72.14039611816406 C 10.36044502258301 68.49015045166016 8.094152450561523 64.22318267822266 6.504152774810791 59.45801162719727 C 4.842522144317627 54.47818374633789 3.999998807907104 49.17981338500977 3.999998807907104 43.71012115478516 C 3.999998807907104 38.24042892456055 4.842522144317627 32.94207382202148 6.504152774810791 27.96224403381348 C 8.094152450561523 23.19707489013672 10.36044502258301 18.93008995056152 13.24009132385254 15.27984428405762 C 16.06447601318359 11.69962882995605 19.33149147033691 8.900506019592285 22.95038414001465 6.96022891998291 C 26.61402893066406 4.995967388153076 30.49396896362305 3.999998092651367 34.48241424560547 3.999998092651367 C 38.47087478637695 3.999998092651367 42.35079956054688 4.995967388153076 46.01444625854492 6.96022891998291 C 49.63333892822266 8.900506019592285 52.90035247802734 11.69962882995605 55.72473907470703 15.27984428405762 C 58.60438537597656 18.93008995056152 60.87067413330078 23.19707489013672 62.46068954467773 27.96222877502441 C 64.12230682373047 32.94207382202148 64.96482849121094 38.24042892456055 64.96482849121094 43.71012115478516 C 64.96482849121094 49.17981338500977 64.12230682373047 54.47818374633789 62.46068954467773 59.45801162719727 C 60.87068939208984 64.22318267822266 58.60438537597656 68.49015045166016 55.72473907470703 72.14039611816406 C 52.90035247802734 75.72061157226562 49.63333892822266 78.51973724365234 46.01444625854492 80.46001434326172 C 42.35081481933594 82.42427825927734 38.47087478637695 83.42024230957031 34.48241424560547 83.42024230957031 Z" stroke="none"/>
                        <path d="M 34.48241424560547 8 C 19.87995529174805 8 7.999992370605469 24.01950073242188 7.999992370605469 43.71012115478516 C 7.999992370605469 63.40074157714844 19.87995529174805 79.42024230957031 34.48241424560547 79.42024230957031 C 49.08487701416016 79.42024230957031 60.96483612060547 63.40074157714844 60.96483612060547 43.71012115478516 C 60.96483612060547 24.01950073242188 49.08487701416016 8 34.48241424560547 8 M 34.48241424560547 0 C 53.52653503417969 0 68.96483612060547 19.5697021484375 68.96483612060547 43.71012115478516 C 68.96483612060547 67.85056304931641 53.52653503417969 87.42024230957031 34.48241424560547 87.42024230957031 C 15.43829345703125 87.42024230957031 -7.62939453125e-06 67.85056304931641 -7.62939453125e-06 43.71012115478516 C -7.62939453125e-06 19.5697021484375 15.43829345703125 0 34.48241424560547 0 Z" stroke="none" fill="#3e88a8"/>
                        </g>
                    </g>
                    <g transform="matrix(1, 0, 0, 1, -645.52, 3311.26)" filter="url(#Path_737)">
                        <path id="Path_737-2" dataname="Path 737" d="M18.132,0A26.32,26.32,0,0,0,6.367,11.184C2.275,19.1,0,31.083,0,31.083" transform="translate(38.88 40.08)" fill="#fff" opacity="0.25"/>
                    </g>
                    <g transform="matrix(1, 0, 0, 1, -645.52, 3311.26)" filter="url(#Path_738)">
                        <path id="Path_738-2" dataname="Path 738" d="M9.166,0S5.287,3.274,3.218,11.184,0,31.083,0,31.083" transform="matrix(-0.97, -0.26, 0.26, -0.97, 50.72, 76.84)" fill="#fff" opacity="0.25"/>
                    </g>
                    </g>
                </g>
                </svg>


                </li>
                <li id="storageCard7" data-furnid="femaleDuck" style={{cursor:"pointer" ,display:funitureHave.femaleDuck}} onClick={putInRoom}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                <g id="duckCard" transform="translate(-967 -630)">
                    <rect id="Rectangle_128" dataname="Rectangle 128" width="130" height="130" transform="translate(967 630)" fill="#fff"/>
                    <g id="鴨子" transform="translate(984.978 646.346)">
                    <line id="Line_17" dataname="Line 17" y2="7.353" transform="translate(37.774 96.896)" fill="none" stroke="#574809" strokeWidth="3"/>
                    <line id="Line_21" dataname="Line 21" y2="7.353" transform="translate(58.173 96.896)" fill="none" stroke="#574809" strokeWidth="3"/>
                    <line id="Line_18" dataname="Line 18" x1="4.507" y2="3.558" transform="translate(32.792 103.775)" fill="none" stroke="#574809" strokeWidth="3"/>
                    <line id="Line_24" dataname="Line 24" x1="4.507" y2="3.558" transform="translate(53.192 103.775)" fill="none" stroke="#574809" strokeWidth="3"/>
                    <line id="Line_19" dataname="Line 19" y2="6.938" transform="translate(37.774 102.767)" fill="none" stroke="#574809" strokeWidth="3"/>
                    <line id="Line_22" dataname="Line 22" y2="6.938" transform="translate(58.173 102.767)" fill="none" stroke="#574809" strokeWidth="3"/>
                    <line id="Line_20" dataname="Line 20" x2="4.507" y2="3.084" transform="translate(38.248 103.775)" fill="none" stroke="#574809" strokeWidth="3"/>
                    <line id="Line_23" dataname="Line 23" x2="4.507" y2="3.084" transform="translate(58.647 103.775)" fill="none" stroke="#574809" strokeWidth="3"/>
                    <ellipse id="Ellipse_2" dataname="Ellipse 2" cx="37.715" cy="30.48" rx="37.715" ry="30.48" transform="translate(9.428 0)" fill="#ffd230"/>
                    <ellipse id="Ellipse_3" dataname="Ellipse 3" cx="42.34" cy="34.157" rx="42.34" ry="34.157" transform="translate(4.922 30.599)" fill="#ffd230"/>
                    <path id="Polygon_1" dataname="Polygon 1" d="M11.386,0,22.771,10.437H0Z" transform="translate(35.757 20.874)" fill="#f70"/>
                    <ellipse id="Ellipse_4" dataname="Ellipse 4" cx="3.321" cy="3.439" rx="3.321" ry="3.439" transform="translate(27.456 19.213)"/>
                    <ellipse id="Ellipse_5" dataname="Ellipse 5" cx="3.321" cy="3.439" rx="3.321" ry="3.439" transform="translate(61.375 19.213)"/>
                    <path id="Path_10" dataname="Path 10" d="M26.04,0s4.95,8.446,4.95,16.9a15.3,15.3,0,0,1-15.3,15.3C7.24,32.2,0,26.219,0,26.219s9.08-8.512,12.9-12.337S26.04,0,26.04,0Z" transform="matrix(-0.454, 0.891, -0.891, -0.454, 42.755, 58.258)" fill="coral"/>
                    <path id="Path_11" dataname="Path 11" d="M26.04,32.2s4.95-8.446,4.95-16.9A15.3,15.3,0,0,0,15.69,0C7.24,0,0,5.976,0,5.976s9.08,8.512,12.9,12.337S26.04,32.2,26.04,32.2Z" transform="translate(83.445 43.641) rotate(70)" fill="coral"/>
                    </g>
                    <g id="母鴨" transform="translate(3396.727 -5218.539)">
                    <g id="Group_23" dataname="Group 23" transform="translate(-2353.093 5852.489) rotate(16)">
                        <g id="Group_22" dataname="Group 22" transform="translate(0 0)">
                        <path id="Union_1" dataname="Union 1" d="M20.065,23.982a6.116,6.116,0,0,1-1.462-.43,8.7,8.7,0,0,1-1.519-.844,10.575,10.575,0,0,1-1.472-1.23,10.839,10.839,0,0,1-.837-.94,9.866,9.866,0,0,1-.68-.974,8.474,8.474,0,0,1-.516-.981c-.095-.215-.178-.429-.248-.641-.07.212-.153.426-.248.641a8.478,8.478,0,0,1-.516.981,9.871,9.871,0,0,1-.68.974,10.84,10.84,0,0,1-.837.94,10.553,10.553,0,0,1-1.51,1.256,8.61,8.61,0,0,1-1.557.85A5.947,5.947,0,0,1,6.491,24a3.544,3.544,0,0,1-1.315-.054L7.57,19.782,3.534,22.295a3.554,3.554,0,0,1-.051-1.314A5.959,5.959,0,0,1,3.9,19.49a8.615,8.615,0,0,1,.85-1.555A10.553,10.553,0,0,1,6,16.428a10.832,10.832,0,0,1,.94-.837,9.87,9.87,0,0,1,.974-.68,8.6,8.6,0,0,1,.828-.446l-.011-.054a6.883,6.883,0,0,1-.924.014,8.473,8.473,0,0,1-1.1-.13,9.868,9.868,0,0,1-1.154-.286,10.834,10.834,0,0,1-1.177-.445,10.587,10.587,0,0,1-1.653-.918,8.758,8.758,0,0,1-1.321-1.1A6.221,6.221,0,0,1,.475,10.36,3.825,3.825,0,0,1,0,9.157l5.249.823-4.235-3.2A3.715,3.715,0,0,1,2.225,6.3a6.116,6.116,0,0,1,1.519-.123,8.7,8.7,0,0,1,1.721.244,10.576,10.576,0,0,1,1.815.621A10.837,10.837,0,0,1,8.4,7.619a9.87,9.87,0,0,1,.984.666q.227.175.438.36-.055-.19-.1-.386a9.868,9.868,0,0,1-.208-1.17,10.836,10.836,0,0,1-.073-1.256A10.584,10.584,0,0,1,9.6,3.949,8.758,8.758,0,0,1,10.067,2.3a6.219,6.219,0,0,1,.71-1.332,3.824,3.824,0,0,1,.906-.923l1.383,5.13L14.27,0a3.716,3.716,0,0,1,.93.912,6.119,6.119,0,0,1,.73,1.338,8.7,8.7,0,0,1,.477,1.671,10.575,10.575,0,0,1,.171,1.911,10.837,10.837,0,0,1-.073,1.256,9.869,9.869,0,0,1-.208,1.17l-.02.083q.157-.133.323-.261a9.87,9.87,0,0,1,.984-.666A10.829,10.829,0,0,1,18.7,6.837a10.585,10.585,0,0,1,1.788-.615,8.76,8.76,0,0,1,1.7-.248,6.221,6.221,0,0,1,1.506.107,3.824,3.824,0,0,1,1.212.452l-4.124,3.35,5.214-1a3.715,3.715,0,0,1-.455,1.22,6.117,6.117,0,0,1-.926,1.211,8.7,8.7,0,0,1-1.333,1.116,10.572,10.572,0,0,1-1.676.933,10.832,10.832,0,0,1-1.177.445,9.861,9.861,0,0,1-1.154.286,8.473,8.473,0,0,1-1.1.13,6.952,6.952,0,0,1-.855-.009v0q.222.081.446.18a8.475,8.475,0,0,1,.981.516,9.867,9.867,0,0,1,.974.68,10.83,10.83,0,0,1,.94.837,10.587,10.587,0,0,1,1.215,1.449,8.76,8.76,0,0,1,.84,1.5,6.221,6.221,0,0,1,.44,1.444,3.824,3.824,0,0,1,.012,1.293l-4.606-2.649,2.807,4.507a3.275,3.275,0,0,1-.657.063A4.283,4.283,0,0,1,20.065,23.982Z" transform="matrix(0.978, 0.208, -0.208, 0.978, 4.997, 0)" fill="#ffb8b8"/>
                        </g>
                        <circle id="Ellipse_46" dataname="Ellipse 46" cx="4.388" cy="4.388" r="4.388" transform="translate(10.97 11.122)" fill="#fff"/>
                    </g>
                    <ellipse id="Ellipse_49" dataname="Ellipse 49" cx="7.116" cy="3.795" rx="7.116" ry="3.795" transform="translate(-2353.101 5895.543)" fill="rgba(188,13,43,0.22)" opacity="0.57"/>
                    <ellipse id="Ellipse_50" dataname="Ellipse 50" cx="7.116" cy="3.795" rx="7.116" ry="3.795" transform="translate(-2391.409 5895.543)" fill="rgba(188,13,43,0.22)" opacity="0.57"/>
                    </g>
                </g>
                </svg>

                </li>
                <li id="storageCard8" data-furnid="glasses" style={{cursor:"pointer" ,display:funitureHave.glasses}} onClick={putInRoom}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                <g id="glassCard" transform="translate(-1136 -630)">
                    <rect id="Rectangle_129" dataname="Rectangle 129" width="130" height="130" transform="translate(1136 630)" fill="#fff"/>
                    <g id="眼鏡" transform="translate(297.629 307.895)">
                    <g id="Path_762" dataname="Path 762" transform="translate(840.435 361.22)" fill="#dbdbdb">
                        <path d="M 25.88545608520508 48.7708625793457 C 22.79461669921875 48.7708625793457 19.79782676696777 48.16619491577148 16.97832679748535 46.9736442565918 C 14.25349617004395 45.82114410400391 11.80572605133057 44.17060470581055 9.702996253967285 42.06787490844727 C 7.600265979766846 39.96515274047852 5.949726104736328 37.51737213134766 4.797225952148438 34.79255294799805 C 3.604676008224487 31.97305297851562 3.000006198883057 28.97627258300781 3.000006198883057 25.88543319702148 C 3.000006198883057 22.79459381103516 3.604676008224487 19.79781341552734 4.797225952148438 16.97831344604492 C 5.949726104736328 14.253493309021 7.600265979766846 11.80571365356445 9.702996253967285 9.702993392944336 C 11.80572605133057 7.600263118743896 14.25349617004395 5.949723243713379 16.97832679748535 4.797223091125488 C 19.79782676696777 3.604673147201538 22.79461669921875 3.000003099441528 25.88545608520508 3.000003099441528 C 28.97629547119141 3.000003099441528 31.97308540344238 3.604673147201538 34.79258728027344 4.797223091125488 C 37.51741790771484 5.949723243713379 39.96518707275391 7.600263118743896 42.06791687011719 9.702993392944336 C 44.17064666748047 11.80571365356445 45.82118606567383 14.253493309021 46.97369766235352 16.97831344604492 C 48.16624450683594 19.79781341552734 48.77091598510742 22.79460334777832 48.77091598510742 25.88543319702148 C 48.77091598510742 28.97626304626465 48.16624450683594 31.97305297851562 46.97369766235352 34.79255294799805 C 45.82118606567383 37.51737213134766 44.17064666748047 39.96515274047852 42.06791687011719 42.06787490844727 C 39.96518707275391 44.17060470581055 37.51741790771484 45.82114410400391 34.79258728027344 46.9736442565918 C 31.97308540344238 48.16619491577148 28.97629547119141 48.7708625793457 25.88545608520508 48.7708625793457 Z" stroke="none"/>
                        <path d="M 25.88545608520508 5.999996185302734 C 14.92058181762695 5.999996185302734 5.999992370605469 14.92057037353516 5.999992370605469 25.88543319702148 C 5.999992370605469 36.85029602050781 14.92058181762695 45.77087020874023 25.88545608520508 45.77087020874023 C 36.8503303527832 45.77087020874023 45.77090454101562 36.85029602050781 45.77090454101562 25.88543319702148 C 45.77090454101562 14.92057037353516 36.8503303527832 5.999996185302734 25.88545608520508 5.999996185302734 M 25.88545608520508 -3.814697265625e-06 C 40.18159484863281 -3.814697265625e-06 51.77090454101562 11.58929443359375 51.77090454101562 25.88543319702148 C 51.77090454101562 40.18155670166016 40.18159484863281 51.77087020874023 25.88545608520508 51.77087020874023 C 11.58931732177734 51.77087020874023 -7.62939453125e-06 40.18155670166016 -7.62939453125e-06 25.88543319702148 C -7.62939453125e-06 11.58929443359375 11.58931732177734 -3.814697265625e-06 25.88545608520508 -3.814697265625e-06 Z" stroke="none" fill="#707070"/>
                    </g>
                    <g id="Ellipse_42" dataname="Ellipse 42" transform="translate(915.033 361.22)" fill="#dbdbdb" stroke="#707070" strokeWidth="6">
                        <ellipse cx="25.637" cy="25.885" rx="25.637" ry="25.885" stroke="none"/>
                        <ellipse cx="25.637" cy="25.885" rx="22.637" ry="22.885" fill="none"/>
                    </g>
                    <path id="Path_34" dataname="Path 34" d="M.186-14.528s6.279-4.738,12-4.738,10.829,4.738,10.829,4.738" transform="translate(892.021 401.633)" fill="none" stroke="#707070" strokeLinecap="round" strokeWidth="6"/>
                    </g>
                </g>
                </svg>

                </li>
                <li id="storageCard9" data-furnid="protrait" style={{cursor:"pointer" ,display:funitureHave.protrait}} onClick={putInRoom}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                <g id="protraitCard" transform="translate(-629 -799)">
                    <rect id="Rectangle_130" dataname="Rectangle 130" width="130" height="130" transform="translate(629 799)" fill="#fff"/>
                    <g id="畫像" transform="translate(385.377 750.921)">
                    <path id="Path_24" dataname="Path 24" d="M4.383,14.269,43.342-2.11" transform="translate(264.5 64.946)" fill="none" stroke="#ea9c42" strokeLinecap="round" strokeWidth="3"/>
                    <path id="Path_27" dataname="Path 27" d="M40.581,15.884,0,0" transform="translate(307.819 62.917)" fill="none" stroke="#ea9c42" strokeLinecap="round" strokeWidth="3"/>
                    <g id="Path_26" dataname="Path 26" transform="translate(267 77.596)" fill="#763505" strokeLinecap="round">
                        <path d="M 82.74681854248047 88.37703704833984 L 0.5000054836273193 88.37703704833984 L 0.5000054836273193 0.5000008940696716 L 82.74681854248047 0.5000008940696716 L 82.74681854248047 88.37703704833984 Z" stroke="none"/>
                        <path d="M 0.9999923706054688 1 L 0.9999923706054688 87.87703704833984 L 82.24680328369141 87.87703704833984 L 82.24680328369141 1 L 0.9999923706054688 1 M -7.62939453125e-06 0 L 83.24680328369141 0 L 83.24680328369141 88.87703704833984 L -7.62939453125e-06 88.87703704833984 L -7.62939453125e-06 0 Z" stroke="none" fill="#707070"/>
                    </g>
                    <g id="Path_25" dataname="Path 25" transform="translate(272.228 83.628)" fill="#eddbbe" strokeLinecap="round">
                        <path d="M 71.88854217529297 76.71443939208984 L 0.500001072883606 76.71443939208984 L 0.500001072883606 0.4999997019767761 L 71.88854217529297 0.4999997019767761 L 71.88854217529297 76.71443939208984 Z" stroke="none"/>
                        <path d="M 0.9999923706054688 1 L 0.9999923706054688 76.21443939208984 L 71.38853454589844 76.21443939208984 L 71.38853454589844 1 L 0.9999923706054688 1 M -7.62939453125e-06 0 L 72.38853454589844 0 L 72.38853454589844 77.21443939208984 L -7.62939453125e-06 77.21443939208984 L -7.62939453125e-06 0 Z" stroke="none" fill="#707070"/>
                    </g>
                    <ellipse id="Ellipse_39" dataname="Ellipse 39" cx="2.694" cy="3.184" rx="2.694" ry="3.184" transform="translate(305.209 59.684)" fill="#400202"/>
                    <g id="鴨子" transform="translate(272.976 88.646)">
                        <line id="Line_17" dataname="Line 17" y2="4.543" transform="translate(30.262 59.864)" fill="none" stroke="#574809" strokeWidth="2"/>
                        <line id="Line_21" dataname="Line 21" y2="4.543" transform="translate(42.865 59.864)" fill="none" stroke="#574809" strokeWidth="2"/>
                        <line id="Line_18" dataname="Line 18" x1="2.784" y2="2.198" transform="translate(27.184 64.114)" fill="none" stroke="#574809" strokeWidth="2"/>
                        <line id="Line_24" dataname="Line 24" x1="2.784" y2="2.198" transform="translate(39.787 64.114)" fill="none" stroke="#574809" strokeWidth="2"/>
                        <line id="Line_19" dataname="Line 19" y2="4.286" transform="translate(30.262 63.491)" fill="none" stroke="#574809" strokeWidth="2"/>
                        <line id="Line_22" dataname="Line 22" y2="4.286" transform="translate(42.865 63.491)" fill="none" stroke="#574809" strokeWidth="2"/>
                        <line id="Line_20" dataname="Line 20" x2="2.784" y2="1.905" transform="translate(30.555 64.114)" fill="none" stroke="#574809" strokeWidth="2"/>
                        <line id="Line_23" dataname="Line 23" x2="2.784" y2="1.905" transform="translate(43.158 64.114)" fill="none" stroke="#574809" strokeWidth="2"/>
                        <ellipse id="Ellipse_2" dataname="Ellipse 2" cx="23.301" cy="18.831" rx="23.301" ry="18.831" transform="translate(12.749 0)" fill="#ffd230"/>
                        <ellipse id="Ellipse_3" dataname="Ellipse 3" cx="26.159" cy="21.103" rx="26.159" ry="21.103" transform="translate(9.965 18.905)" fill="#ffd230"/>
                        <path id="Polygon_1" dataname="Polygon 1" d="M7.034,0l7.034,6.448H0Z" transform="translate(29.016 12.896)" fill="#f70"/>
                        <ellipse id="Ellipse_4" dataname="Ellipse 4" cx="2.052" cy="2.125" rx="2.052" ry="2.125" transform="translate(23.887 11.87)"/>
                        <ellipse id="Ellipse_5" dataname="Ellipse 5" cx="2.052" cy="2.125" rx="2.052" ry="2.125" transform="translate(44.843 11.87)"/>
                        <path id="Path_10" dataname="Path 10" d="M16.088,0s3.058,5.218,3.058,10.439a9.452,9.452,0,0,1-9.452,9.452C4.473,19.891,0,16.2,0,16.2S5.61,10.94,7.973,8.577,16.088,0,16.088,0Z" transform="matrix(0.961, 0.276, -0.276, 0.961, 5.483, 25.464)" fill="#574809"/>
                        <path id="Path_11" dataname="Path 11" d="M16.088,19.891s3.058-5.218,3.058-10.438A9.452,9.452,0,0,0,9.694,0C4.473,0,0,3.692,0,3.692s5.61,5.259,7.973,7.622S16.088,19.891,16.088,19.891Z" transform="translate(71.295 44.584) rotate(164)" fill="#574804"/>
                    </g>
                    </g>
                </g>
                </svg>

                </li>
                <li id="storageCard10" data-furnid="clock" style={{cursor:"pointer" ,display:funitureHave.clock}} onClick={putInRoom}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                <g id="clockCard" transform="translate(-798 -799)">
                    <rect id="Rectangle_131" dataname="Rectangle 131" width="130" height="130" transform="translate(798 799)" fill="#fff"/>
                    <g id="時鐘" transform="translate(1479 -2651.966)">
                    <circle id="Ellipse_57" dataname="Ellipse 57" cx="44" cy="44" r="44" transform="translate(-660 3471.966)" fill="#939191" opacity="0.88"/>
                    <path id="Path_763" dataname="Path 763" d="M0,24.915,22.716,0" transform="translate(-616.216 3491.267)" fill="none" stroke="#ffcfa5" strokeLinecap="round" strokeWidth="5"/>
                    <line id="Line_31" dataname="Line 31" y1="7.694" x2="22.35" transform="translate(-638.566 3516.182)" fill="none" stroke="#ffcfa5" strokeLinecap="round" strokeWidth="5"/>
                    </g>
                </g>
                </svg>

                </li>
                <li id="storageCard11" data-furnid="weight" style={{cursor:"pointer" ,display:funitureHave.weight}} onClick={putInRoom}>
                <svg width="130" height="130" viewBox="0 0 130 130">
                <defs>
                    <filter id="Rectangle_84">
                    <feOffset dy="-30" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur"/>
                    <feFlood floodColor="#262626"  floodOpacity="0.059" result="color"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur"/>
                    <feComposite operator="in" in="color"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                    <filter id="Rectangle_85">
                    <feOffset dy="-30" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-2"/>
                    <feFlood  floodOpacity="0.102" result="color-2"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur-2"/>
                    <feComposite operator="in" in="color-2"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                    <filter id="Rectangle_86">
                    <feOffset dy="-30" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-3"/>
                    <feFlood  floodOpacity="0.102" result="color-3"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur-3"/>
                    <feComposite operator="in" in="color-3"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                    <filter id="Rectangle_87">
                    <feOffset dy="-30" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-4"/>
                    <feFlood  floodOpacity="0.102" result="color-4"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur-4"/>
                    <feComposite operator="in" in="color-4"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                    <filter id="Rectangle_88">
                    <feOffset dy="-30" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-5"/>
                    <feFlood  floodOpacity="0.102" result="color-5"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur-5"/>
                    <feComposite operator="in" in="color-5"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                    <filter id="Rectangle_89">
                    <feOffset dy="-30" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-6"/>
                    <feFlood  floodOpacity="0.102" result="color-6"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur-6"/>
                    <feComposite operator="in" in="color-6"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                    <filter id="Rectangle_90">
                    <feOffset dy="-30" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-7"/>
                    <feFlood  floodOpacity="0.102" result="color-7"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur-7"/>
                    <feComposite operator="in" in="color-7"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                    <filter id="Rectangle_91">
                    <feOffset dy="-30" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-8"/>
                    <feFlood floodColor="#262626"  floodOpacity="0.059" result="color-8"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur-8"/>
                    <feComposite operator="in" in="color-8"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                    <filter id="Rectangle_92">
                    <feOffset dy="-30" input="SourceAlpha"/>
                    <feGaussianBlur stdDeviation="3" result="blur-9"/>
                    <feFlood floodColor="#262626"  floodOpacity="0.059" result="color-9"/>
                    <feComposite operator="out" in="SourceGraphic" in2="blur-9"/>
                    <feComposite operator="in" in="color-9"/>
                    <feComposite operator="in" in2="SourceGraphic"/>
                    </filter>
                </defs>
                <g id="weightCard" transform="translate(-1138 -799)">
                    <rect id="Rectangle_133" dataname="Rectangle 133" width="130" height="130" transform="translate(1138 799)" fill="#fff"/>
                    <g id="舉重槓" transform="translate(3060 -2888.702)">
                    <g id="Group_28" dataname="Group 28" transform="translate(-1914 3729.704)">
                        <g data-type="innerShadowGroup">
                        <rect id="Rectangle_84-2" dataname="Rectangle 84" width="53" height="8" transform="translate(29 18.998)" fill="#aeaeae"/>
                        <g transform="matrix(1, 0, 0, 1, -8, -42)" filter="url(#Rectangle_84)">
                            <rect id="Rectangle_84-3" dataname="Rectangle 84" width="53" height="8" transform="translate(37 61)" fill="#fff"/>
                        </g>
                        </g>
                        <g data-type="innerShadowGroup">
                        <rect id="Rectangle_85-2" dataname="Rectangle 85" width="9" height="46" rx="4.5" transform="translate(20 -0.002)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -8, -42)" filter="url(#Rectangle_85)">
                            <rect id="Rectangle_85-3" dataname="Rectangle 85" width="9" height="46" rx="4.5" transform="translate(28 42)" fill="#fff"/>
                        </g>
                        </g>
                        <g data-type="innerShadowGroup">
                        <rect id="Rectangle_86-2" dataname="Rectangle 86" width="9" height="46" rx="4.5" transform="translate(82 -0.002)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -8, -42)" filter="url(#Rectangle_86)">
                            <rect id="Rectangle_86-3" dataname="Rectangle 86" width="9" height="46" rx="4.5" transform="translate(90 42)" fill="#fff"/>
                        </g>
                        </g>
                        <g data-type="innerShadowGroup">
                        <rect id="Rectangle_87-2" dataname="Rectangle 87" width="8" height="36" rx="4" transform="translate(91 4.998)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -8, -42)" filter="url(#Rectangle_87)">
                            <rect id="Rectangle_87-3" dataname="Rectangle 87" width="8" height="36" rx="4" transform="translate(99 47)" fill="#fff"/>
                        </g>
                        </g>
                        <g data-type="innerShadowGroup">
                        <rect id="Rectangle_88-2" dataname="Rectangle 88" width="8" height="36" rx="4" transform="translate(12 4.998)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -8, -42)" filter="url(#Rectangle_88)">
                            <rect id="Rectangle_88-3" dataname="Rectangle 88" width="8" height="36" rx="4" transform="translate(20 47)" fill="#fff"/>
                        </g>
                        </g>
                        <g data-type="innerShadowGroup">
                        <rect id="Rectangle_89-2" dataname="Rectangle 89" width="6" height="26" rx="3" transform="translate(99 9.998)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -8, -42)" filter="url(#Rectangle_89)">
                            <rect id="Rectangle_89-3" dataname="Rectangle 89" width="6" height="26" rx="3" transform="translate(107 52)" fill="#fff"/>
                        </g>
                        </g>
                        <g data-type="innerShadowGroup">
                        <rect id="Rectangle_90-2" dataname="Rectangle 90" width="6" height="26" rx="3" transform="translate(6 9.998)" fill="#5e5e5e"/>
                        <g transform="matrix(1, 0, 0, 1, -8, -42)" filter="url(#Rectangle_90)">
                            <rect id="Rectangle_90-3" dataname="Rectangle 90" width="6" height="26" rx="3" transform="translate(14 52)" fill="#fff"/>
                        </g>
                        </g>
                        <g data-type="innerShadowGroup">
                        <path id="Rectangle_91-2" dataname="Rectangle 91" d="M0,0H1.68A4.32,4.32,0,0,1,6,4.32v0A3.68,3.68,0,0,1,2.32,8H0A0,0,0,0,1,0,8V0A0,0,0,0,1,0,0Z" transform="translate(105 18.998)" fill="#aeaeae"/>
                        <g transform="matrix(1, 0, 0, 1, -8, -42)" filter="url(#Rectangle_91)">
                            <path id="Rectangle_91-3" dataname="Rectangle 91" d="M0,0H1.68A4.32,4.32,0,0,1,6,4.32v0A3.68,3.68,0,0,1,2.32,8H0A0,0,0,0,1,0,8V0A0,0,0,0,1,0,0Z" transform="translate(113 61)" fill="#fff"/>
                        </g>
                        </g>
                        <g data-type="innerShadowGroup">
                        <path id="Rectangle_92-2" dataname="Rectangle 92" d="M4.32,0H6A0,0,0,0,1,6,0V8A0,0,0,0,1,6,8H3.68A3.68,3.68,0,0,1,0,4.32v0A4.32,4.32,0,0,1,4.32,0Z" transform="translate(0 18.998)" fill="#aeaeae"/>
                        <g transform="matrix(1, 0, 0, 1, -8, -42)" filter="url(#Rectangle_92)">
                            <path id="Rectangle_92-3" dataname="Rectangle 92" d="M4.32,0H6A0,0,0,0,1,6,0V8A0,0,0,0,1,6,8H3.68A3.68,3.68,0,0,1,0,4.32v0A4.32,4.32,0,0,1,4.32,0Z" transform="translate(8 61)" fill="#fff"/>
                        </g>
                        </g>
                    </g>
                    <rect id="Rectangle_93" dataname="Rectangle 93" width="1" height="7" rx="0.5" transform="translate(-1893 3735.702)" fill="#8d8d8d"/>
                    <rect id="Rectangle_94" dataname="Rectangle 94" width="1" height="7" rx="0.5" transform="translate(-1901 3739.702)" fill="#8d8d8d"/>
                    <rect id="Rectangle_95" dataname="Rectangle 95" width="1" height="2" rx="0.5" transform="translate(-1893 3744.702)" fill="#8d8d8d"/>
                    <rect id="Rectangle_96" dataname="Rectangle 96" width="1" height="7" rx="0.5" transform="translate(-1825 3735.702)" fill="#8d8d8d"/>
                    <rect id="Rectangle_97" dataname="Rectangle 97" width="1" height="8" rx="0.5" transform="translate(-1817 3738.702)" fill="#8d8d8d"/>
                    <rect id="Rectangle_98" dataname="Rectangle 98" width="1" height="3" rx="0.5" transform="translate(-1825 3744.702)" fill="#8d8d8d"/>
                    </g>
                </g>
                </svg>

                </li>
                </div>
                </div>

                {/* <li id="rightArrow">
                <svg width="25" viewBox="0 0 46.206 80.822">
                <path id="Icon_ionic-ios-arrow-back" dataname="Icon ionic-ios-arrow-back" d="M43.528,46.594,12.947,16.037a5.776,5.776,0,0,1,8.181-8.156L55.774,42.5a5.764,5.764,0,0,1,.168,7.964L21.151,85.331a5.776,5.776,0,0,1-8.181-8.156Z" transform="translate(-11.251 -6.194)" fill="#464545"/>
                </svg>

                </li> */}
            </ul>
        </div>



        
        </div>

        



    );
}

export default GameRoomMain;
