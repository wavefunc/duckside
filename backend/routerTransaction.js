// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

// 列出資料表全部的資料
router.get('/transaction/all', function (req, res) {
   query('SELECT * FROM transaction', [], function (err, rows) {
      res.send(rows);
   })
})

// 新增一筆交易
router.post('/transaction/create', async (req, res) => {
   // 檢查前端的會員email帳號是否正確
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery =
      `INSERT INTO transaction (acc_id, sec_id, txn_round, txn_position,
         txn_date, txn_price, txn_amount, txn_note)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
   query(
      strQuery,
      [
         acc_id,
         req.body.sec_id,
         req.body.txn_round,
         req.body.txn_position,
         req.body.txn_date,
         req.body.txn_price,
         req.body.txn_amount,
         req.body.txn_note,
      ],
      (err) => {
         err ? res.send(err) : res.send('Successfully added a transaction!')
      })
});

module.exports = router;