// ----- 冠樺 ----- //

import React, { Component } from 'react';
import { Row, Col, Container, Card } from 'react-bootstrap';

class About_team extends Component {
   state = {}
   render() {
      return (
         <Container>
            <Row>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img style={{ height: '35vh', width: '100%', objectFit: 'contain' }} variant="top" src="\assets\about_team\Ren.jpg" />
                     <Card.Body>
                        <Card.Title style={{ fontSize: '6vh', textAlign: 'center', textAlign: 'center' }}>鄭人豪</Card.Title>
                        <Card.Text style={{ fontSize: '4vh', textAlign: 'center' }}>
                           -投資管理<br />
                           -股價爬蟲<br />
                           -網站規劃
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img style={{ height: '35vh', width: '100%', objectFit: 'contain' }} variant="top" src="\assets\about_team\lin.jpg" />
                     <Card.Body>
                        <Card.Title style={{ fontSize: '6vh', textAlign: 'center' }}>李巧琳</Card.Title>
                        <Card.Text style={{ fontSize: '4vh', textAlign: 'center' }}>
                           -會員系統<br />
                           -第三方登入<br />
                           -Email 驗證
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img style={{ height: '35vh', width: '100%', objectFit: 'contain' }} variant="top" src="\assets\about_team\pei.png" />
                     <Card.Body>
                        <Card.Title style={{ fontSize: '6vh', textAlign: 'center' }}>蔡沛珊</Card.Title>
                        <Card.Text style={{ fontSize: '4vh', textAlign: 'center' }}>
                           -視覺外觀<br />
                           -首頁設計<br />
                           -功能面板
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img style={{ height: '35vh', width: '100%', objectFit: 'contain' }} variant="top" src="\assets\about_team\kai.jpg" />
                     <Card.Body>
                        <Card.Title style={{ fontSize: '6vh', textAlign: 'center' }}>陳鎧洋</Card.Title>
                        <Card.Text style={{ fontSize: '4vh', textAlign: 'center' }}>
                           -遊戲面板<br />
                           -遊戲流程<br />
                           &nbsp;
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img style={{ height: '35vh', width: '100%', objectFit: 'contain' }} variant="top" src="\assets\about_team\ChingHsuanLi.jpg" />
                     <Card.Body>
                        <Card.Title style={{ fontSize: '6vh', textAlign: 'center' }}>李晴暄</Card.Title>
                        <Card.Text style={{ fontSize: '4vh', textAlign: 'center' }}>
                           -小鴨房間<br />
                           -Logo設計<br />
                           -遊戲流程
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img style={{ height: '35vh', width: '100%', objectFit: 'contain' }} variant="top" src="\assets\about_team\wavefunc.jpg" />
                     <Card.Body>
                        <Card.Title style={{ fontSize: '6vh', textAlign: 'center' }}>李冠樺</Card.Title>
                        <Card.Text style={{ fontSize: '4vh', textAlign: 'center' }}>
                           -資料庫API<br />
                           -版本控制<br />
                           -檔案架構
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