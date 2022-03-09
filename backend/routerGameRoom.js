// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount, queryTest } = require('./mysql.js');

// ************************
// 列出 furniture 全部的資料
// ************************
router.get('/furniture/all', (req, res) => {
   query('SELECT * FROM furniture', [], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});

// ************************
// 列出 acc_furn 全部的資料
// ************************
router.get('/acc_furn/all', (req, res) => {
   query('SELECT * FROM acc_furn', [], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});

// **********************************************************
// 商店購買家具時，會員的該家具設為已購買(true)，並扣除會員的積分
// 如果積分不夠買，會回傳 'Your money is not enough'
// 前端傳入 acc_email, furn_id
// **********************************************************
router.put('/acc_furn/buying', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQueryIsMoneyEnough = `
      SELECT 
         IF(
            (SELECT SUM(pt_scoring) total FROM point_record WHERE acc_id = ?)
            >= (SELECT furn_price FROM furniture WHERE furn_id = ?),
            true, false
         ) isEnough
   `;

   await query(strQueryIsMoneyEnough,
      [acc_id, req.body.furn_id],
      (err, rows) => {
         err ?
            res.send(err) :
            rows[0].isEnough ?
               updateFurnAndPoint(acc_id, req.body.furn_id, res) :
               res.send('Money is not enough');
      });
});

function updateFurnAndPoint(acc_id, furn_id, res) {
   let strQueryBought = `UPDATE acc_furn SET acc_furn_bought = 1 
      WHERE acc_id = ? AND furn_id = ?;`;

   let strQuerySetPoint = `
      INSERT INTO point_record (acc_id, pt_datetime, pt_scoring)
      VALUES (?, NOW(),
         -1 * (SELECT furn_price FROM furniture WHERE furn_id = ?)
      )`;

   query(
      strQueryBought + strQuerySetPoint,
      [acc_id, furn_id, acc_id, furn_id],
      err => {
         res.send(
            err ?
               err :
               `Successfully updated`
         );
      }
   );
}

// **********************************************************
// 房間擺放家具時，修改會員家具的 acc_furn_placed 為 1
// 前端傳入 acc_email, furn_id
// **********************************************************
router.put('/acc_furn/placing', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `UPDATE acc_furn SET acc_furn_placed = 1 
      WHERE acc_id = ? AND furn_id = ?`;
   query(strQuery, [acc_id, req.body.furn_id], (err) => {
      res.send(err ? err : 'Successfully update acc_furn_placed to 1');
   });
});

// **********************************************************
// 家具收回至倉庫時，修改會員家具的 acc_furn_placed 為 0
// 前端傳入 acc_email, furn_id
// **********************************************************
router.put('/acc_furn/takeBack', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `UPDATE acc_furn SET acc_furn_placed = 0 
      WHERE acc_id = ? AND furn_id = ?`;
   query(strQuery, [acc_id, req.body.furn_id], (err) => {
      res.send(err ? err : 'Successfully update acc_furn_placed to 0');
   });
});

// **********************************************************
// 商店頁面 - 列出會員的家具及其屬性 (已購買: none, 未購買: block)
// 前端傳入 acc_email
// **********************************************************
router.post('/acc_furn/storeList', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `
      SELECT af.furn_id, furn.furn_name, furn.furn_price,
         IF(af.acc_furn_bought = 1, 'none', 'block') display
      FROM acc_furn af 
      INNER JOIN furniture furn 
      ON af.furn_id = furn.furn_id 
      WHERE acc_id = ?
   `;

   var dataTransfer = {};
   query(strQuery, [acc_id], (err, rows) => {
      rows.forEach(e => {
         dataTransfer[e.furn_id] = e.display;
      });
      res.send(err ? err : dataTransfer);
   });
});

// **********************************************************************
// 倉庫頁面 - 列出會員已購買的家具及其屬性 (倉庫不顯示: none, 倉庫顯示: block)
// 前端傳入 acc_email
// **********************************************************************
router.post('/acc_furn/storageList', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `
      SELECT af.furn_id, furn.furn_name, 
         IF(af.acc_furn_placed = 1 OR af.acc_furn_bought = 0, 
            'none', 'block') display
      FROM acc_furn af 
      INNER JOIN furniture furn 
      ON af.furn_id = furn.furn_id 
      WHERE acc_id = ?
   `;

   var dataTransfer = {};
   query(strQuery, [acc_id], (err, rows) => {
      rows.forEach(e => {
         dataTransfer[e.furn_id] = e.display;
      });
      res.send(err ? err : dataTransfer);
   });
});

// *****************************************************************
// 房間頁面 - 列出會員的家具及其屬性 (擺在房間: block, 不擺在房間: none)
// 前端傳入 acc_email
// *****************************************************************
router.post('/acc_furn/roomList', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `
      SELECT af.furn_id, furn.furn_name, 
         IF(af.acc_furn_placed = 0 OR af.acc_furn_bought = 0, 
            'none', 'block') display
      FROM acc_furn af 
      INNER JOIN furniture furn 
      ON af.furn_id = furn.furn_id 
      WHERE acc_id = ?
   `;

   var dataTransfer = {};
   query(strQuery, [acc_id], (err, rows) => {
      rows.forEach(e => {
         dataTransfer[e.furn_id] = e.display;
      });
      res.send(err ? err : dataTransfer);
   });
});

module.exports = router;