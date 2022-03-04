// ----- 冠樺 ----- //

const express = require('express');
const router = express.Router();
const { query, checkAccount } = require('./mysql.js');
const bcrypt = require('bcrypt'); // 對密碼進行加密的套件
const nodemailer = require('nodemailer'); // 引用 nodemailer
const crypto = require('crypto'); // 用來生成 token 的套件
const multer = require('multer'); // 處理大頭照上傳
require('dotenv').config();   // 使用環境變數

// *******************
// 列出資料表全部的資料
// *******************
router.get('/account/all', (req, res) => {
   query(`SELECT * FROM account`,
      [],
      (err, rows) => res.send(rows)
   );
});

// **************************
// 新增會員，並建立家具預設資料
// **************************
router.post('/account/create', async (req, res) => {
   let strQuery1 = `INSERT INTO account
   (acc_email, acc_password, acc_name) VALUES(?, ?, ?);`

   // 建立 會員_家俱 預設資料的 SQL 語法
   let aryFurnId = ['basketball', 'bathTube', 'light', 'TV', 'clock', 'cabinet', 'femaleDuck', 'protrait', 'glasses', 'weight', 'mirror']
   let strQuery2 = `INSERT INTO acc_furn (acc_furn_id, acc_id, furn_id) VALUES `;
   aryFurnId.forEach((val) => {
      strQuery2 += `(NULL, (SELECT acc_id from account where acc_email = '${req.body.acc_email}'), '${val}'),`;
   });
   strQuery2 = strQuery2.slice(0, -1) + ';';

   // 建立會員就給預設的積分 1000
   let strQuery3 = `INSERT INTO point_record (acc_id, pt_datetime, pt_scoring) VALUES 
      ((SELECT acc_id from account where acc_email = '${req.body.acc_email}'), NOW(), 1000)
   `;

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

   await query(strQuery1 + strQuery2 + strQuery3,
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
      if (err) {
         res.send(err);
      } else {
         if (rows[0].acc_avatar) {
            var mime = 'image/(png|jpg)';
            var encoding = 'base64';
            var data = rows[0].acc_avatar.toString(encoding);
            var uri = `data:${mime};${encoding},${data}`;
            rows[0].acc_avatar = uri;
         } else {
            rows[0].acc_avatar = '/assets/images/duck-favicon.jpg';
         }
         res.send(rows[0]);
      }
   });
});

// ************************
// 會員登入，檢查密碼是否正確
// ************************
router.post('/account/login', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `SELECT acc_email, acc_password, acc_name FROM account WHERE acc_id = ?`;
   await query(strQuery, [acc_id], (err, rows) => {
      if (err) {
         res.send(err);
      } else {
         // 確認密碼比對是否正確，第一個參數是前端傳來的 acc_password，第二個參數是 DB 取得的加密密碼
         bcrypt.compare(req.body.acc_password, rows[0].acc_password, (err, result) => {
            err ?
               res.send(err) :
               res.send(result ? rows[0].acc_name : 'Password error');
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


// **********
// 更改大頭照
// **********

// 初始化設定
const upload = multer({
   storage: multer.memoryStorage(),
   limits: {
      fileSize: 5 * 1024 * 1024, // 限制 5MB
   },
   fileFilter(req, file, callback) { // 限制檔案格式為 image
      if (!file.mimetype.match(/^image/)) {
         callback(new Error().message = '檔案格式錯誤');
      } else {
         callback(null, true);
      }
   }
});

router.put('/account/updateavatar', upload.single('image'), async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `UPDATE account SET acc_avatar = ? WHERE account.acc_id = ?`;
   query(strQuery, [req.file.buffer, acc_id], (err) => {
      err ? res.send(err) : res.send(`Successfully updated account avatar`);
   });
});


// ********************************************************
// 【忘記密碼】生成隨機的 token，並寄出包含 token 連結的 email
// 前端送來使用者輸入的 acc_email 即可
// ********************************************************
router.post('/account/emailValidation', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   // 生成 token
   const acc_token = crypto.randomBytes(20).toString('hex');

   let strQueryStoreToken = `UPDATE account SET acc_token = ? WHERE acc_id = ?`;
   query(strQueryStoreToken, [acc_token, acc_id], (err) => {
      err ? res.send(err) : res.send(acc_token);
   });

   // 設定 5分鐘後刪掉該 token
   const tokenTimeout = setTimeout(() => {
      let strQueryDeleteToken = `UPDATE account SET acc_token = '' WHERE acc_id = ?`;
      query(strQueryDeleteToken, [acc_id], (err) => {
         err ? console.log(err) : console.log(`Token for ${req.body.acc_email} has deleted`);
      });
   }, 300000);

   //宣告發信物件
   var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
         user: `${process.env.MAIL_USER}`,
         pass: `${process.env.MAIL_PASS}`
      }
   });

   var options = {
      from: `duckside <${process.env.MAIL_USER}>`, // 寄件者
      to: req.body.acc_email, // 收件者
      subject: '這是 duckside 投資管理網站發送的更改密碼信件', // 主旨
      html: `<h2>請點擊網址來更改密碼</h2><p><a href="http://localhost:3000/resetPass/${acc_token}">
         http://localhost:3000/resetPass/${acc_token}</a></p>` // 嵌入 html 的內文
   };

   //發送信件方法
   transporter.sendMail(options, function (error, info) {
      if (error) {
         console.log(error);
      } else {
         console.log('訊息發送: ' + info.response);
      }
   });
});

// ********************************************************
// 【忘記密碼】前端給 acc_token，後端回傳是哪一個 acc_email
// ********************************************************
router.post('/account/whoResetPass', (req, res) => {
   let strQuery = `SELECT acc_email FROM account WHERE acc_token = ?`;
   query(strQuery, [req.body.acc_token], (err, rows) => {
      if (err) {
         res.send(err);
      } else {
         rows[0] ?
            res.send(rows[0].acc_email) :
            res.send('此 token 過期或不存在');
      }
   });
});

// *********************************************************
// 【忘記密碼】更改密碼。前端送 acc_email, acc_password(新密碼)
// *********************************************************
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


module.exports = router;