// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt'); // 對密碼進行加密的套件
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
router.post('/account/create', async (req, res) => {
   let strQuery1 = `INSERT INTO account
   (acc_email, acc_password, acc_name) VALUES(?, ?, ?);`

   // 建立 會員_家俱 預設資料的 SQL 語法
   let aryFurnId = ['basketball', 'bath_tube', 'my_light', 'TV', '時鐘-2', '櫃子', '母鴨', '畫像', '眼鏡-2', '舉重槓-2', '鏡子-2']
   let strQuery2 = `INSERT INTO acc_furn (acc_furn_id, acc_id, furn_id) VALUES `;
   aryFurnId.forEach((val) => {
      strQuery2 += `(NULL, (SELECT acc_id from account where acc_email = '${req.body.acc_email}'), '${val}'),`;
   });
   strQuery2 = strQuery2.slice(0, -1);

   // 將密碼加密後再存入 DB
   var hashPassword;
   const encryptPassword = () => {
      return new Promise(resolve => {
         bcrypt.hash(req.body.acc_password, 10, function (err, hash) {
            if (err) {
               res.send(err);
            } else {
               hashPassword = hash;
               resolve();
            }
         });
      });
   };
   await encryptPassword();

   await query(strQuery1 + strQuery2,
      [req.body.acc_email, hashPassword, req.body.acc_name],
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
   await query(strQuery, [acc_id], (err, rows) => {
      if (err) {
         res.send(err);
      } else {
         // 確認密碼比對是否正確，第一個參數是前端傳來的 acc_password，第二個參數是 DB 取得的加密密碼
         bcrypt.compare(req.body.acc_password, rows[0].acc_password, (err, result) => {
            err ?
               res.send(err) :
               res.send(result ? 'Password correct' : 'Password error');
         });
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
router.put('/account/updatepassword', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var hashPassword;
   // 將密碼加密後再存入 DB
   const encryptPassword = () => {
      return new Promise(resolve => {
         bcrypt.hash(req.body.acc_password, 10, function (err, hash) {
            if (err) {
               res.send(err);
            } else {
               hashPassword = hash;
               resolve();
            }
         });
      });
   };
   await encryptPassword();

   let strQuery = `UPDATE account SET acc_password = ? WHERE account.acc_id = ?`;
   query(strQuery, [hashPassword, acc_id], (err) => {
      err ? res.send(err) : res.send(`Successfully updated account password`);
   });
});

// **********
// 更改大頭照
// **********
router.put('/account/updateavatar', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `UPDATE account SET acc_avatar = ? WHERE account.acc_id = ?`;
   query(strQuery, [req.body.acc_avatar, acc_id], (err) => {
      err ? res.send(err) : res.send(`Successfully updated account avatar`);
   });
});

module.exports = router;