// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');

// ************************
// 列出 furniture 全部的資料
// ************************
router.get('/furniture/all', (req, res) => {
   query('SELECT * FROM furniture', [], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});

// ************************
// 列出 acc_furn 全部的資料
// ************************
router.get('/acc_furn/all', (req, res) => {
   query('SELECT * FROM acc_furn', [], (err, rows) => {
      err ? res.send(err) : res.send(rows);
   });
});


module.exports = router;