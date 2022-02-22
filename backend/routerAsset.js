// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

// *******************
// 列出資料表全部的資料
// *******************
router.get('/asset/all', (req, res) => {
   query('SELECT * FROM asset', [], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});

// *********************************
// 依 acc_email，新增該會員的一筆資產
// *********************************
router.post('/asset/create', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery =
      `INSERT INTO asset (acc_id, ast_date, ast_securities, 
         ast_cash, ast_borrowing, ast_option, ast_others, ast_adjust) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
   query(
      strQuery,
      [
         acc_id,
         req.body.ast_date,
         req.body.ast_securities,
         req.body.ast_cash,
         req.body.ast_borrowing,
         req.body.ast_option,
         req.body.ast_others,
         req.body.ast_adjust
      ],
      (err) => {
         err ? res.send(err) : res.send('Successfully added an asset!')
      })
});

// ***********************************
// 依 acc_email，修改該會員的某一筆資產
// ***********************************
router.put('/asset/update', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery =
      `UPDATE asset SET ast_date = ?, ast_securities = ?, ast_cash = ?,
      ast_borrowing = ?, ast_option = ?, ast_others = ?, ast_adjust = ? 
         WHERE ast_id = ? AND acc_id = ?`;
   query(
      strQuery,
      [
         req.body.ast_date,
         req.body.ast_securities,
         req.body.ast_cash,
         req.body.ast_borrowing,
         req.body.ast_option,
         req.body.ast_others,
         req.body.ast_adjust,
         req.body.ast_id,
         acc_id
      ],
      (err) => {
         err ?
            res.send(err) :
            res.send(`Successfully updated asset which id is ${req.body.ast_id}`);
      })
});

// ************************
// 依照 ast_id 刪除一筆資產
// ************************
router.delete('/asset/delete', async (req, res) => {
   var strQuery = `DELETE FROM asset WHERE asset.ast_id = ?`
   query(strQuery, [req.body.ast_id], (err) => {
      err ?
         res.send(err) :
         res.send(`Successfully deleted asset which ast_id is ${req.body.ast_id}`);
   })
});

// ***********************************************
// 依日期 DESC 查詢最近資產紀錄，可利用 amount參數 自行設定要查幾筆
// 若 amount 為 null (即不傳值)，則依日期 ASC 排序，回傳所有資產紀錄
// ***********************************************
router.post('/asset/recent', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strLimit = (req.body.amount) ? `DESC LIMIT ${req.body.amount}` : ``;

   var strQuery = `SELECT * FROM asset WHERE acc_id = ?
      ORDER BY ast_date ${strLimit}`;

   query(strQuery, [acc_id], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});

// *********************************************************
// 依 acc_email 跟 dateQuery 兩個變數，查詢某用戶某天的資產現況
// *********************************************************
router.post('/asset/someday', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery = `SELECT * FROM asset WHERE acc_id = ? 
      AND ast_date <= ? ORDER BY ast_date DESC LIMIT 1`;

   query(strQuery, [acc_id, req.body.dateQuery], (err, rows) => {
      err ? res.send(err) : res.send(rows[0]);
   });
});


module.exports = router;