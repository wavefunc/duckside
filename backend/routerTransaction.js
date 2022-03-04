// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');
var { getYahoo, getTwse } = require('./twstock.js');

// *******************
// 測試: 列出資料表全部的資料
// *******************
router.get('/transaction/all', function (req, res) {
   query('SELECT * FROM transaction', [], function (err, rows) {
      res.send(rows);
   })
});
// *******************
// 測試: 直接執行sql 
// *******************

router.get('/testtesttest888', function (req, res) {
   // 自己keysql
   let sql =
      `INSERT INTO asset 
         (acc_id, ast_date, ast_securities, ast_cash, ast_borrowing, ast_option, ast_others, ast_adjust, ast_note) values 
         (4, '2021-11-26', 1789600, 2489168, 0, 0, 50000, 210000,""),(4, '2021-10-25', 1804431, 1973078, 0, 100000, 0, 210000,""),(4, '2021-09-29', 3356146, 750933, 0, 377421, 0, 210000,""),(4, '2021-08-30', 3797865, 264368, 0, 500000, 0, 210000,""),(4, '2021-08-05', 4061500, 599040, 0, 0, 0, 210000,""),(4, '2021-06-30', 3501520, 873480, 0, 0, 0, 225000,""),(4, '2021-05-31', 2504910, 1487434, 0, 0, 0, 225000,""),(4, '2021-05-05', 788250, 2910522, 0, 0, 0, 225000,""),(4, '2021-04-07', 2834390, 380659, 0, 201184, 100000, 225000,""),(4, '2021-03-02', 3010700, 40030, 0, 0, 100000, 225000,""),(4, '2020-12-31', 0, 3000000, 0, 0, 0, 0,"")         `;
   query(sql, [], function (err, rows) {
      res.send(err ? err : rows);
   })
})

// ********************************
// 依 acc_email，新增該會員的一筆交易
// ********************************
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

// **********************************
// 依 acc_email，修改該會員的某一筆交易
// **********************************
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

// *************************
// 依照 txn_id 刪除一筆交易
// *************************
router.delete('/transaction/delete', async (req, res) => {
   var strQuery = `DELETE FROM transaction WHERE transaction.txn_id = ?`
   query(strQuery, [req.body.txn_id], (err) => {
      err ?
         res.send(err) :
         res.send(`Successfully deleted transaction which txn_id is ${req.body.txn_id}`);
   })
});

// ***************************************************************** 
// 依 acc_email 跟 dateQuery 兩個變數，查詢某用戶截至某天為止的庫存      
// 回傳各 securities 的合計數量，沒有市價資料
// ***************************************************************** 
router.post('/transaction/inventory', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery = `
      SELECT txn.sec_id, sec.sec_name, sec.sec_market, SUM(txn.txn_amount) total
      FROM transaction txn 
      INNER JOIN securities sec ON txn.sec_id = sec.sec_id
      WHERE txn.acc_id = ? AND txn.txn_date <= ?
      GROUP BY txn.sec_id HAVING total >0
   `
   query(strQuery, [acc_id, req.body.dateQuery], (err, rows) => {
      if (err) {
         res.send(err)
      } else {
         res.send(rows);
      };
   })
});

// ****************************************************
// 依日期 DESC 查詢最近交易紀錄，可利用 amount參數 自行設定要查幾筆
// 若 amount 為 null (即不傳值)，則依日期 ASC 排序，回傳所有交易紀錄
// ****************************************************
router.post('/transaction/recent', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strLimit = (req.body.amount) ? `DESC LIMIT ${req.body.amount}` : ``;

   var strQuery = `
      SELECT * FROM transaction txn
      INNER JOIN securities sec ON txn.sec_id = sec.sec_id
      WHERE acc_id = ?
      ORDER BY txn_date ${strLimit}
   `;

   query(strQuery, [acc_id], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});

// *****************************************************************
// 依 acc_email, dateQuery1, dateQuery2，查詢某會員某日期區間的交易紀錄
// 若 dateQuery1 無回傳值，則 send 該日期 dateQuery2 之前的所有紀錄；若 dateQuery2 無回傳值則反之
// 若 dateQuery1, dateQuery2 皆無回傳值，則 send 所有紀錄
// *****************************************************************
router.post('/transaction/daterange', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var paramsQuery = [acc_id];
   var strDateQuery1 = '';
   var strDateQuery2 = '';

   if (req.body.dateQuery1) {
      strDateQuery1 = ` AND ? <= txn_date `;
      paramsQuery.push(req.body.dateQuery1);
   }
   if (req.body.dateQuery2) {
      strDateQuery2 = ` AND txn_date <= ? `;
      paramsQuery.push(req.body.dateQuery2);
   }

   var strQuery = `
      SELECT * 
      FROM transaction txn 
      INNER JOIN securities sec
      ON txn.sec_id = sec.sec_id
      WHERE acc_id = ? ${strDateQuery1} ${strDateQuery2} 
      ORDER BY txn_date
   `;

   query(strQuery, paramsQuery, (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});


module.exports = router;