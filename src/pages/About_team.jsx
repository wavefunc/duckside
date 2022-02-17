// ----- 冠樺 ----- //

import React, { Component } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';

class About_team extends Component {
   state = {}
   render() {
      return (
         <Container>
            <Row>
               <Col>1 of 2</Col>
               <Col>2 of 2</Col>
               <Col>2 of 2</Col>
            </Row>
            <Row>
               <Col>1 of 3</Col>
               <Col>2 of 3</Col>
               <Col>3 of 3</Col>
            </Row>
         </Container>
      );
   }
}

export default About_team;