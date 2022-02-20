// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query } = require('./mysql.js');

// 列出資料表全部的資料
router.get('/account/all', (req, res) => {
   query('SELECT * FROM account', [], (err, rows) => {
      res.send(rows);
   });
});

// 新增會員
router.post('/account/create', (req, res) => {
   let strQuery = `INSERT INTO account
        (acc_email, acc_password, acc_name) VALUES(?, ?, ?)`
   query(strQuery,
      [req.body.acc_email, req.body.acc_password, req.body.acc_name],
      (err) => {
         err ? res.send(err) : res.send('Added successfully');
      });
});

// 註冊會員時，檢查email帳號是否有重複
// 回傳 boolean 值：有重複回傳 true；沒有重複回傳 false
router.get('/account/check/:acc_email', (req, res) => {
   let strQuery = `SELECT acc_email FROM account WHERE acc_email = ?`
   query(strQuery, [req.params.acc_email], (err, rows) => {
      err ? res.send(err) : res.send(rows[0] ? true : false);
   });
});

module.exports = router;