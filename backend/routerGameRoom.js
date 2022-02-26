// ----- 冠樺 ----- //

var express = require('express');
const { Rss } = require('react-bootstrap-icons');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

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
// **********************************************************
router.put('/acc_furn/buying', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var price = await query(
      `SELECT furn_price FROM furniture WHERE furn_id = ?`,
      [req.body.furn_id],
      (err, rows) => {
         err ? res.send(err) : res.send(JSON.stringify(rows[0].furn_price));
      }
   );

   console.log(typeof (price));
   // strQueryBuy = `UPDATE acc_furn SET acc_furn_bought = 1 
   //    WHERE acc_id = ? AND furn_id = ?`;
   // strQueryDeduction = `UPDATE point_record SET acc_id = ?, pt_datetime = ?, pt_scoring = 
   // `;
   // query(strQueryBuy, [acc_id, req.body.furn_id], (err) => {
   //    err ?
   //       res.send(err) :
   //       res.send(`Successfully updated acc_furn on 
   //          acc_id = ${acc_id} and furn_id = ${req.body.furn_id}`);
   // });
});


module.exports = router;