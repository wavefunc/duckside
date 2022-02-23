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
                     <Card.Img variant="top" src="\assets\about_team\Ren.jpg" />
                     <Card.Body>
                        <Card.Title>鄭人豪</Card.Title>
                        <Card.Text>
                           -投資管理功能<br />
                           -股價爬蟲程式<br />
                           -規劃網站目標<br />
                           -圖表套件應用
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img variant="top" src="\assets\about_team\lin.jpg" />
                     <Card.Body>
                        <Card.Title>李巧琳</Card.Title>
                        <Card.Text>
                           -會員登入<br />
                           -會員註冊<br />
                           -會員資料維護<br />
                           -第三方登入
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img variant="top" src="\assets\about_team\pei.jpg" />
                     <Card.Body>
                        <Card.Title>蔡沛珊</Card.Title>
                        <Card.Text>
                           -主視覺/外觀<br />
                           -導覽列通知功能<br />
                           -網站導覽頁
                        </Card.Text>
                     </Card.Body>
                  </Card>
               </Col>
               <Col xs={12} md={6} lg={4}>
                  <Card>
                     <Card.Img variant="top" src="\assets\about_team\kai.jpg" />
                     <Card.Body>
                        <Card.Title>陳鎧洋</Card.Title>
                        <Card.Text>
                           -選擇關卡畫面<br />
                           -模擬投資遊戲<br />
                           -遊戲積分結算
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
                     <Card.Img variant="top" src="\assets\about_team\wavefunc.jpg" />
                     <Card.Body>
                        <Card.Title>李冠樺</Card.Title>
                        <Card.Text>
                           -導入 git<br />
                           -建立檔案架構<br />
                           -架設資料庫<br />
                           -後端 API
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