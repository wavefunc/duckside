// ----- 人豪 ----- //
var express = require('express');
var router = express.Router();
var { query } = require('./mysql.js');
var { getYahoo, getTwse } = require('./twstock.js');

// *******************
// 列出資料表全部的資料
// *******************
router.get('/securities/all', (req, res) => {
    query('SELECT * FROM securities',
        [], (err, rows) => res.send(rows)
    );
});

// *********************
// 依關鍵字找出相關的股票
// *********************
router.get('/securities/search/:key', (req, res) => {
    query(`SELECT * FROM securities WHERE sec_id 
            LIKE "%${req.params.key}%" OR sec_name LIKE "%${req.params.key}%"`,
        [], (err, rows) => res.send(rows)
    );
});

// *****************************************************
// 依關鍵字找出相關的股票: input onchange使用, 降低lag情形
// *****************************************************
router.get('/securities/datalist/:key', (req, res) => {
    query(`SELECT * FROM securities WHERE sec_id 
            LIKE "${req.params.key}%" OR sec_name LIKE "%${req.params.key}%"
            ORDER BY sec_id DESC LIMIT 100`,
        [], (err, rows) => res.send(rows)
    );
});

// *****************************************************
// 依stockId及日期區間(起日period1 迄日period2 格式YYYYMMDD) 
// 抓取股票日成交資料, 整理成繪製技術線圖所需格式
// *****************************************************
router.post('/securities/candlestick', function (req, res) {
    getYahoo(req.body.stockId, req.body.period1, req.body.period2)
        .then(function (stockDay) {
            res.send(stockDay);
        });
})
// *****************************************************
// 依stockId及日期區間(起日period1 迄日period2 格式YYYYMMDD) 
// 抓該股票在這期間的日成交資料, 整理成方便呈現在圖表的格式
// *****************************************************
router.post('/securities/stockDay', function (req, res) {
    console.log(req.body.period2);
    getYahoo(req.body.stockId, req.body.period1, req.body.period2)
        .then((stockDay) => {
            res.send(stockDay);
        }).catch((e) => {
            res.send('Server Busy');
        });
});

module.exports = router;