// ----- 沛珊 ----- //
// 假底圖: https://placeholder.com/#How_To_Use_Our_Placeholders


import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'


export const About_site = (props) => {
   return (
      <Carousel>
         <Carousel.Item interval={1000}>
            <img
               className="d-block w-100"
               src="https://via.placeholder.com/600x400"
               alt="First slide"
               height="100%"
            />
            <Carousel.Caption>
               <h3>First slide label</h3>
               <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item interval={500}>
            <img
               className="d-block w-100"
               src="https://via.placeholder.com/600x400"
               alt="Second slide"
            />
            <Carousel.Caption>
               <h3>Second slide label</h3>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
         </Carousel.Item>
         <Carousel.Item>
            <img
               className="d-block w-100"
               src="https://via.placeholder.com/600x400"
               alt="Third slide"
            />

            <Carousel.Caption>
               <h3>Third slide label</h3>
               <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
         </Carousel.Item>
      </Carousel>
   )
}