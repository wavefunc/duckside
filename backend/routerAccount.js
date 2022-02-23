// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

// *******************
// 列出資料表全部的資料
// *******************
router.get('/account/all', (req, res) => {
   query(`SELECT * FROM account`,
   [],
   (err, rows) => res.send(rows)
   );
});

// ********
// 新增會員
// ********
router.post('/account/create', (req, res) => {
   let strQuery = `INSERT INTO account
        (acc_email, acc_password, acc_name) VALUES(?, ?, ?)`
   query(strQuery,
      [req.body.acc_email, req.body.acc_password, req.body.acc_name],
      (err) => err ? res.send(err) : res.send('Added successfully')
   );
});

// **************************************************
// 註冊會員時，檢查email帳號是否有重複
// 回傳 boolean 值：有重複回傳 true；沒有重複回傳 false
// **************************************************
router.get('/account/check/:acc_email', (req, res) => {
   let strQuery = `SELECT acc_email FROM account WHERE acc_email = ?`
   query(strQuery, [req.params.acc_email], (err, rows) => {
      err ? res.send(err) : res.send(rows[0] ? true : false);
   });
});

// *******************
// 列出某會員的會員資料
// *******************
router.post('/account/list', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `SELECT * FROM account WHERE acc_id = ?`;
   query(strQuery, [acc_id], (err, rows) => {
      err ? res.send(err) : res.send(rows[0]);
   });
});

// ************************
// 會員登入，檢查密碼是否正確
// ************************
router.post('/account/login', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `SELECT acc_email, acc_password FROM account WHERE acc_id = ?`;
   query(strQuery, [acc_id], (err, rows) => {
      if (err) {
         res.send(err);
      } else {
         (req.body.acc_password === rows[0].acc_password) ?
            res.send('Password correct') : res.send('Password error');
      }
   });
});

// ********
// 更改暱稱
// ********
router.put('/account/updatename', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `UPDATE account SET acc_name = ? WHERE account.acc_id = ?`;
   query(strQuery, [req.body.acc_name, acc_id], (err) => {
      err ? res.send(err) : res.send(`Successfully updated account name to '${req.body.acc_name}'`);
   });
});

// ********
// 更改密碼
// ********
router.put('/account/updatepassword', async(req, res)=>{
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `UPDATE account SET acc_password = ? WHERE account.acc_id = ?`;
   query(strQuery, [req.body.acc_password, acc_id], (err) => {
      err ? res.send(err) : res.send(`Successfully updated account password`);
   });
});

// **********
// 更改大頭照
// **********
router.put('/account/updateavatar', async(req, res)=>{
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `UPDATE account SET acc_avatar = ? WHERE account.acc_id = ?`;
   query(strQuery, [req.body.acc_avatar, acc_id], (err) => {
      err ? res.send(err) : res.send(`Successfully updated account avatar`);
   });
});


module.exports = router;