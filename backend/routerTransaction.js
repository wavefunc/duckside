// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query } = require('./mysql.js');

router.get('/transaction/all', function (req, res) {
   query('SELECT * FROM transaction', [], function (err, rows) {
       res.send(rows);
   })
})

module.exports = router;