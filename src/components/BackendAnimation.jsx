import "../css/GameRoomMain_style.css";
import React from "react";
import styled, { keyframes } from 'styled-components'
import { bounce, swing } from "react-animations";
// import { useSpring, animated } from 'react-spring';
import Draggable from 'react-draggable';

const bounceAnimation = keyframes`${bounce}`;
const BouncySvg = styled.svg`
   animation: 1s ${bounceAnimation} infinite;
`;

const wingAnimation = keyframes`${swing}`;
const WingAnimationPath = styled.path`
   animation: 1s ${wingAnimation} infinite;
`;

const BackendAnimation = () => {

   return (
      <Draggable>
         <svg width="174" height="166" viewBox="0 0 174 166" fill="none"
            style={{
               position: 'absolute',
               top: '50%',
               left: '50%',
            }}
         >
            <g id="DuckViewport">
               <g id="footRight">
                  <path id="Line 17" d="M72.482 141.408V152.139" stroke="#574809" stroke-width="10" stroke-linecap="round" />
                  <path id="Line 18" d="M71.79 151.447L65.213 156.639" stroke="#574809" stroke-width="10" stroke-linecap="round" />
                  <path id="Line 19" d="M72.482 149.976V160.101" stroke="#574809" stroke-width="10" stroke-linecap="round" />
                  <path id="Line 20" d="M73.175 151.447L79.752 155.947" stroke="#574809" stroke-width="10" stroke-linecap="round" />
               </g>
               <g id="footLeft">
                  <path id="Line 21" d="M102.252 141.754V152.485" stroke="#574809" stroke-width="10" stroke-linecap="round" />
                  <path id="Line 24" d="M101.56 151.793L94.983 156.985" stroke="#574809" stroke-width="10" stroke-linecap="round" />
                  <path id="Line 22" d="M102.252 150.322V160.447" stroke="#574809" stroke-width="10" stroke-linecap="round" />
                  <path id="Line 23" d="M102.945 151.793L109.522 156.293" stroke="#574809" stroke-width="10" stroke-linecap="round" />
               </g>
               <path id="head" d="M86.156 88.964C116.554 88.964 141.196 69.0487 141.196 44.482C141.196 19.9153 116.554 0 86.156 0C55.7582 0 31.116 19.9153 31.116 44.482C31.116 69.0487 55.7582 88.964 86.156 88.964Z" fill="#FFD230" />
               <path id="body" d="M86.329 144.351C120.455 144.351 148.119 122.033 148.119 94.503C148.119 66.9727 120.455 44.655 86.329 44.655C52.2033 44.655 24.539 66.9727 24.539 94.503C24.539 122.033 52.2033 144.351 86.329 144.351Z" fill="#FFD230" />
               <path id="eyesRight" d="M62.27 38.077C64.9464 38.077 67.116 35.8299 67.116 33.058C67.116 30.2861 64.9464 28.039 62.27 28.039C59.5936 28.039 57.424 30.2861 57.424 33.058C57.424 35.8299 59.5936 38.077 62.27 38.077Z" fill="black" />
               <path id="eyesLeft" d="M111.771 37.385C114.447 37.385 116.617 35.1379 116.617 32.366C116.617 29.5941 114.447 27.347 111.771 27.347C109.095 27.347 106.925 29.5941 106.925 32.366C106.925 35.1379 109.095 37.385 111.771 37.385Z" fill="black" />
               <path id="wingRight" d="M50.469 79.637C50.469 79.637 54.0083 93.4758 50.605 105.326C48.9708 111.016 45.1435 115.824 39.9649 118.692C34.7863 121.561 28.6804 122.255 22.99 120.622C11.138 117.218 3.39014 105.921 3.39014 105.921C3.39014 105.921 19.5531 97.6395 26.4566 93.8206C33.3602 90.0017 50.469 79.637 50.469 79.637Z" fill="#574809" />
               <path
                  id="wingLeft"
                  d="M123.938 78.197C123.938 78.197 120.113 91.962 123.272 103.882C124.789 109.605 128.517 114.491 133.637 117.466C138.756 120.441 144.847 121.261 150.571 119.746C162.492 116.586 170.472 105.449 170.472 105.449C170.472 105.449 154.481 96.8352 147.656 92.8744C140.832 88.9135 123.938 78.197 123.938 78.197Z"
                  fill="#574804"
                  transform-origin="123px 80px"
               // transform="rotate(270)"
               />
               <path id="nose" d="M86.156 30.462L102.772 45.693H69.54L86.156 30.462Z" fill="#FF7700" />
            </g>
         </svg>
      </Draggable>
   );
}


export default BackendAnimation;
