// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query } = require('./mysql.js');

// 列出資料表全部的資料
router.get('/account/all', function (req, res) {
   query('SELECT * FROM account', [], function (err, rows) {
       res.send(rows);
   })
})

module.exports = router;