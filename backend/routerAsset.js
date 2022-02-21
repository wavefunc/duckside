// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

// 列出資料表全部的資料
router.get('/asset/all', (req, res) => {
   query('SELECT * FROM asset', [], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});

// 新增一筆資產
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

// 依照 ast_id 刪除一筆資產
router.delete('/asset/delete', async (req, res) => {
   var strQuery = `DELETE FROM asset WHERE asset.ast_id = ?`
   query(strQuery, [req.body.ast_id], (err) => {
      err ?
         res.send(err) :
         res.send(`Successfully deleted asset which ast_id is ${req.body.ast_id}`);
   })
});

module.exports = router;