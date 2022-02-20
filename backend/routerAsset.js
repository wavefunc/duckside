// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query } = require('./mysql.js');

// 列出資料表全部的資料
router.get('/asset/all', (req, res) => {
    query('SELECT * FROM asset', [], (err, rows) => {
        err ? res.send(err) : res.send(rows);
    });
});

// 新增一筆資產
// router.post('/asset/create', (req, res) => {
//     let strQuery = `INSERT INTO asset
//         (acc_email, acc_password, acc_name) VALUES(?, ?, ?)`
//     query(strQuery, [req.body.acc_email, req.body.acc_password, req.body.acc_name], (err) => {
//         err ? res.send(err) : res.send('Added successfully');
//     });
// });

module.exports = router;