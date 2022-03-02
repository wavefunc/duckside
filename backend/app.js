// ----- 冠樺 ----- //

// 以 Express 建立 Web伺服器
var express = require('express');
var app = express();

// 部署至 Heroku 會用到
app.use(express.static('backend/build'));

// 引用 cors 解決跨域問題
var cors = require('cors');
app.use(cors());

// 獲取前端的變數
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'))
app.use(express.static('../node_modules'))
app.use(express.json());

// 建立 MySQL 連線
var { query } = require('./mysql.js');

// 引用各資料表的 router
var routers = [
    './routerAccount',
    './routerAsset',
    './routerPlan',
    './routerSecurities',
    './routerTransaction',
    './routerGameRoom',
    './routerGameDaily',
    // './routerTwStock',
    './routerBackend'
]

routers.forEach(val => { app.use('/', require(val)); })

// 一切就緒，開始接受用戶端連線
app.listen(process.env.BACKEND_PORT || 5000);

query('UPDATE account SET acc_token = ""', [], (err) => {
    err ? console.log(err) : console.log('Clear all tokens');
});


