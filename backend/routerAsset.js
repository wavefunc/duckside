// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

// 檢查前端的會員email帳號是否正確
// async function checkAccount(acc_email) {
//    var accId = 0;
//    console.log('-----------------');
//    console.log('before query acc_email: ' + acc_email);
//    query('SELECT acc_id, acc_name FROM account WHERE acc_email = ?',
//       [acc_email],
//       function (err, rows) {
//          // err ? res.send(err) : res.send(rows[0] ? rows[0] : null);
//          console.log('in query callback, rows[0].acc_id: ' + rows[0].acc_id);
//          accId = rows[0].acc_id;
//          console.log('after query, accId: ' + accId);
//          return accId;
//       });
// }

// 列出資料表全部的資料
router.get('/asset/all', (req, res) => {
   query('SELECT * FROM asset', [], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});

// 新增一筆資產
router.post('/asset/create', async (req, res) => {
   // var e = checkAccount(req.body.acc_email);
   // console.log('in router.post, return: ' + await checkAccount(req.body.acc_email));
   // var e;
   // new Promise(async (resolve, reject) => {
   //    e = await checkAccount(req.body.acc_email);

   //    resolve();
   // }).then(() => {
   //    console.log('Promise after then, checkAccount(): ' + e);
   // });
   var temp = await checkAccount(req.body.acc_email);
   // .then((e) => {
   //    temp = e
   // });
   res.send(temp);
   // .then(function(e){
   //    console.log('in then, e: ', e);
   // });
   // console.log('after checkAccount.then, e: ', e);
});

module.exports = router;