/* ----------
代抓股票資料的伺服器程式碼
人豪寫完再交冠樺整合進app.js
*/

var express = require('express');
var app = express();
app.listen(3000);
var { getYahoo, getTwse } = require('./twstock.js');

app.use(express.static('./public'))
app.use(express.static('../node_modules'))
app.use(express.json()); // 解析 JSON 資料
app.use(express.urlencoded({ extended: true })); //解析 Form Data
console.log("crawler start...")

app.get('/', function (req, res) {
    res.redirect('twstock.html');
})
app.get('/twstock', function (req, res) {
    res.redirect('twstock.html');
})
app.post('/candlestick', function (req, res) {
    console.log(JSON.stringify(req.body));
    getYahoo(req.body.stockId, req.body.period1, req.body.period2)
        .then(function (MI) {
            res.send(MI);
        });
})
app.post('/stockDay', function (req, res) {
    getYahoo(req.body.stockId, req.body.period1, req.body.period2)
        .then( (stockDay) => {
            res.send(stockDay);
        }).catch((e) => {
            res.send('Server Busy');
        });
});

app.post('/marketInfo', function (req, res) {
    getTwse(req.body.dateQuery).then((MI) => {
        res.send(MI);
    }).catch((e) => {
        res.send('Server Busy');
    });
});

