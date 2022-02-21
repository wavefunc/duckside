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

// 依 acc_email，新增該會員的一筆交易
router.post('/transaction/create', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
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

// 依 acc_email，修改該會員的某一筆交易
router.put('/transaction/update', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery =
      `UPDATE transaction SET sec_id = ?, txn_round = ?, txn_position = ?,
         txn_date = ?, txn_price = ?, txn_amount = ?, txn_note = ? 
         WHERE txn_id = ? AND acc_id = ?`;
   query(
      strQuery,
      [
         req.body.sec_id,
         req.body.txn_round,
         req.body.txn_position,
         req.body.txn_date,
         req.body.txn_price,
         req.body.txn_amount,
         req.body.txn_note,
         req.body.txn_id,
         acc_id
      ],
      (err) => {
         err ?
            res.send(err) :
            res.send(`Successfully updated transaction which id is ${req.body.txn_id}`);
      })
});

// 依照 txn_id 刪除一筆資產
router.delete('/transaction/delete', async (req, res) => {
   var strQuery = `DELETE FROM transaction WHERE transaction.txn_id = ?`
   query(strQuery, [req.body.txn_id], (err) => {
      err ?
         res.send(err) :
         res.send(`Successfully deleted transaction which txn_id is ${req.body.txn_id}`);
   })
});

// 依 acc_email 跟 dateQuery 兩個變數，查詢某用戶截至某天為止的庫存
// 回傳各 securities 的合計數量
router.get('/transaction/inventory', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery = `
      SELECT txn.sec_id, sec.sec_name, sec.sec_market, SUM(txn.txn_amount) total
      FROM transaction txn 
      INNER JOIN securities sec ON txn.sec_id = sec.sec_id
      WHERE txn.acc_id = ? AND txn.txn_date < ?
      GROUP BY txn.sec_id
   `
   query(strQuery, [acc_id, req.body.dateQuery], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});

module.exports = router;