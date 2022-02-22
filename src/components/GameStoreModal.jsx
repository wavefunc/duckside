import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../css/GameStoreModal_style.css";

let GameRoomModal = () =>{
    const [modalShow, setModalShow] = useState(false);

    function showModal(){
        if(modalShow=="false"){
            setModalShow(true)
        }else{
            setModalShow(false)
        }
    }

    return(
    <div id="container">
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
     
      <Modal.Body>
      <svg  width="80%" viewBox="0 0 1262 796">
        <g id="modal" transform="translate(-378 -166)">
            <rect id="Rectangle_104" data-name="Rectangle 104" width="1221" height="739" rx="30" transform="translate(378 223)" fill="#faf3e2"/>
            <text id="確定購買燈串_" data-name="確定購買燈串？" transform="translate(652 526)" fill="#520707" font-size="100" font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600"><tspan x="0" y="0">確定購買燈串？</tspan></text>
            <g id="是_按鈕" data-name="是 按鈕" transform="translate(-47)">
            <rect id="Rectangle_106" data-name="Rectangle 106" width="325" height="142" rx="30" transform="translate(635 765)" fill="#3e88a8"/>
            <text id="是" transform="translate(748 865)" fill="#fff" font-size="100" font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600"><tspan x="0" y="0">是</tspan></text>
            </g>
            <g id="否_按鈕" data-name="否 按鈕" transform="translate(-56)">
            <rect id="Rectangle_105" data-name="Rectangle 105" width="325" height="142" rx="30" transform="translate(1109 765)" fill="#ac4c4c"/>
            <text id="否" transform="translate(1222 865)" fill="#fff" font-size="100" font-family="'\.PingFangTC-Semibold', '\.PingFang TC'" font-weight="600"><tspan x="0" y="0">否</tspan></text>
            </g>
            <g id="關閉按鈕" transform="translate(-248 137)">
            <g id="Ellipse_61" data-name="Ellipse 61" transform="translate(1742 29)" fill="#256170" stroke="#707070" stroke-width="1">
                <circle cx="73" cy="73" r="73" stroke="none"/>
                <circle cx="73" cy="73" r="72.5" fill="none"/>
            </g>
            <path id="Icon_ionic-md-close" data-name="Icon ionic-md-close" d="M93.023,16.073,84.474,7.523l-34.2,34.2-34.2-34.2L7.523,16.073l34.2,34.2-34.2,34.2,8.549,8.549,34.2-34.2,34.2,34.2,8.549-8.549-34.2-34.2Z" transform="translate(1764.727 51.727)" fill="#fff"/>
            </g>
        </g>
        </svg>

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={showModal}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
    );
}

  export default GameRoomModal;