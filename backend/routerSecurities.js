// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();
var { query } = require('./mysql.js');

// 列出資料表全部的資料
router.get('/securities/all', (req, res) => {
    query('SELECT * FROM securities',
        [], (err, rows) => res.send(rows)
    )
})

// 依關鍵字找出相關的股票
router.get('/securities/search/:key', (req, res) => {
    query(`SELECT * FROM securities WHERE sec_id 
            LIKE "%${req.params.key}%" OR sec_name LIKE "%${req.params.key}%"`,
        [], (err, rows) => res.send(rows)
    )
})
// 依關鍵字找出相關的股票: input onchange使用, 降低lag情形
router.get('/securities/datalist/:key', (req, res) => {
    query(`SELECT * FROM securities WHERE sec_id 
            LIKE "${req.params.key}%" OR sec_name LIKE "%${req.params.key}%"
            ORDER BY sec_id DESC LIMIT 100`,
        [], (err, rows) => res.send(rows)
    )
})

module.exports = router;