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
   // 檢查前端的會員email帳號是否正確
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

module.exports = router;