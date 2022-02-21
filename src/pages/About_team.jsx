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
                           -投資管理介面及功能<br />
                           -抓取並整理股價資料的程式<br />
                           -規劃網站目標客群及需求<br />
                           -與圖表及表單相關套件應用
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
                           -會員專區動向規劃與介面設計<br />
                           -會員資訊的建立與維護<br />
                           -第三方會員登入
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
                           - 主視覺/外觀<br />
                           - 導覽列通知功能<br />
                           - 網站導覽頁
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
                           -使用React呈現遊戲跑關頁面
                           -從後段資料庫抓去資料
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