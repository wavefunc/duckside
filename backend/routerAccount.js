// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query } = require('./mysql.js');

router.get('/account/all', function (req, res) {
   query('SELECT * FROM account', [], function (err, rows) {
       res.send(rows);
   })
})

module.exports = router;