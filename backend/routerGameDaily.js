// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

// ***************************
// 列出 point_record 的全部資料
// ***************************
router.get('/point_record/all', (req, res) => {
   query('SELECT * FROM point_record', [], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});

// ***************************
// 列出某會員 point_record 的全部資料
// ***************************
router.post('/point_record/list', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   query('SELECT * FROM point_record WHERE acc_id = ?',
      [acc_id],
      (err, rows) => {
         err ? res.send(err) : res.send(rows);
      }
   );
});

// ***************************
// 回傳某會員目前總積分
// ***************************
router.post('/point_record/total', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   query(`SELECT SUM(pt_scoring) total FROM point_record WHERE acc_id = ?`,
      [acc_id],
      (err, rows) => {
         res.send(err ? err : rows[0]);
      }
   )
});

// *********************************
// 關卡破關時，紀錄該會員該次的加分紀錄
// *********************************
router.post('/point_record/insertRecord', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   let strQuery = `INSERT INTO point_record (acc_id, pt_datetime, pt_scoring) 
      VALUES(?, NOW() , ?)`
   query(strQuery, [acc_id, req.body.pt_scoring], err => {
      res.send(err ? err : 'Successfully added point record');
   });
});

module.exports = router;