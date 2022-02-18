// ----- 冠樺 ----- //

import React, { Component } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';
import MysqlTest from '../components/MysqlTest';

class About_team extends Component {
   state = {}
   render() {
      return (
         <Container>
            <Row>
               <Col>
                  <MysqlTest />
               </Col>
            </Row>
            <Row>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img variant="top" src="\assets\about_team\pokemon01.png" />
                     <Card.Body>
                        <Card.Title>鄭人豪</Card.Title>
                        <Card.Text>
                           Some quick example text to build on the card title and make up the bulk of
                           the card's content.
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img variant="top" src="\assets\about_team\pokemon02.png" />
                     <Card.Body>
                        <Card.Title>李巧琳</Card.Title>
                        <Card.Text>
                           Some quick example text to build on the card title and make up the bulk of
                           the card's content.
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img variant="top" src="\assets\about_team\pokemon03.png" />
                     <Card.Body>
                        <Card.Title>蔡沛珊</Card.Title>
                        <Card.Text>
                           Some quick example text to build on the card title and make up the bulk of
                           the card's content.
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img variant="top" src="\assets\about_team\pokemon04.png" />
                     <Card.Body>
                        <Card.Title>陳鎧洋</Card.Title>
                        <Card.Text>
                           Some quick example text to build on the card title and make up the bulk of
                           the card's content.
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img variant="top" src="\assets\about_team\ChingHsuanLi.jpg" />
                     <Card.Body>
                        <Card.Title>李晴暄</Card.Title>
                        <Card.Text>
                           -遊戲動線規劃與畫面設計<br />
                           -以REACT渲染網頁畫面<br />
                           -從資料庫抓取資料調整物件狀態<br />
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img variant="top" src="\assets\about_team\pokemon06.jpg" />
                     <Card.Body>
                        <Card.Title>李冠樺</Card.Title>
                        <Card.Text>
                           -為專案導入 git<br />
                           -建立專案檔案架構<br />
                           -架設資料庫<br />
                           -資料庫銜接前端的程式
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
            </Row>
         </Container>
      );
   }
}

export default About_team;