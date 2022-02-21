// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

// 列出資料表全部的資料
router.get('/plan/all', function (req, res) {
   query('SELECT * FROM plan', [], function (err, rows) {
      res.send(rows);
   })
})

// 新增一個計劃
router.post('/plan/create', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery =
      `INSERT INTO plan (acc_id, sec_id, plan_date, plan_strategy, plan_param1,
         plan_param2, plan_anchor, plan_stoploss, plan_target,	plan_note)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
   query(
      strQuery,
      [
         acc_id,
         req.body.sec_id,
         req.body.plan_date,
         req.body.plan_strategy,
         req.body.plan_param1,
         req.body.plan_param2,
         req.body.plan_anchor,
         req.body.plan_stoploss,
         req.body.plan_target,
         req.body.plan_note
      ],
      (err) => {
         err ? res.send(err) : res.send('Successfully added a plan!')
      })
});

// 依照 plan_id 刪除一筆資產
router.delete('/plan/delete', async (req, res) => {
   var strQuery = `DELETE FROM plan WHERE plan.plan_id = ?`
   query(strQuery, [req.body.plan_id], (err) => {
      err ?
         res.send(err) :
         res.send(`Successfully deleted plan which plan_id is ${req.body.plan_id}`);
   })
});


module.exports = router;