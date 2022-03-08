// ----- 冠樺 ----- //
// ----- 後端測試專用語法 ----//

var express = require('express');
var router = express.Router();
var { query } = require('./mysql.js');
var { checkAccount } = require('./mysql');

// 為此 acc_id 增加 會員_家具 的預設資料
router.get('/account/defaultFurn/:acc_id', async (req, res) => {
   let aryFurnId = ['basketball', 'bath_tube', 'my_light', 'TV', '時鐘-2', '櫃子', '母鴨', '畫像', '眼鏡-2', '舉重槓-2', '鏡子-2']
   let strQuery = `INSERT INTO acc_furn (acc_furn_id, acc_id, furn_id) VALUES `;
   aryFurnId.forEach((val) => {
      strQuery += `(NULL, ${req.params.acc_id}, '${val}'),`;
   });
   strQuery = strQuery.slice(0, -1);

   console.log(strQuery);

   query(strQuery, [], (err) => {
      err ?
         res.send(err) :
         res.send('Successfully added default furniture with acc_id: ' + req.params.acc_id);
   });
});

// 幫會員增加積分
router.get('/addpoint/:acc_id/:point', async (req, res) => {
   let strQuery = `
      INSERT INTO point_record (pt_id, acc_id, pt_datetime, pt_scoring) 
      VALUES (NULL, ?, NOW(), ?)
   `
   query(strQuery, [req.params.acc_id, req.params.point], err => {
      err ?
         res.send(err) :
         res.send('ok');
   });
});

// ---------------------------------------------------------------- //

// *****************************************************************
// Gsap專用 - 列出會員的家具及其屬性，依各頁面需求讓家具顯示 none OR block
// 前端傳入 acc_email
// *****************************************************************
router.post('/gsap/roomList', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `
      SELECT af.furn_id, furn.furn_name, furn.furn_price, 
             acc_furn_x x, acc_furn_y y,
             IF(af.acc_furn_placed = 0 OR af.acc_furn_bought = 0, 
               'none', 'block') roomInteriorFurnDis, 
             IF(af.acc_furn_bought = 1, 'none', 'block') storeFurnDis,
             IF(af.acc_furn_placed = 1 OR af.acc_furn_bought = 0, 
               'none', 'block') storageFurnDis
      FROM acc_furn af 
      INNER JOIN furniture furn 
      ON af.furn_id = furn.furn_id 
      WHERE acc_id = ?
   `;

   query(strQuery, [acc_id], (err, rows) => {
      res.send(err ? err : rows);
   });
});

// *****************************************************************
// Gsap專用 - 家俱改變位置時，將 x, y 存入資料庫
// *****************************************************************
router.put('/gsap/updatePos', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `
      UPDATE acc_furn SET acc_furn_x = ?, acc_furn_y = ? WHERE acc_id = ? AND furn_id = ?
   `;

   query(strQuery, [req.body.x, req.body.y, acc_id, req.body.furn_id], err => {
      res.send(err ? err : 'Successfully updated');
   });
});

module.exports = router;