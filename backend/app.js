// ----- 冠樺 ----- //

var express = require('express'); // 以 Express 建立 Web伺服器
var app = express();
var cors = require('cors'); // 引用 cors 解決跨域問題
var { query } = require('./mysql.js'); // 建立 MySQL 連線
require('dotenv').config(); // 使用環境變數

app.use(express.static('backend/build')); // 部署至 Heroku 會用到
app.use(cors());
app.use(express.urlencoded({ extended: true })); // 獲取前端的變數
app.use(express.static('./public'))
app.use(express.static('../node_modules'))
app.use(express.json());

// 引用各資料表的 router
var routers = [
    './routerAccount',
    './routerAsset',
    './routerPlan',
    './routerSecurities',
    './routerTransaction',
    './routerGameRoom',
    './routerGameDaily',
    './routerGsap',
    './routerMarketInfo'
]

routers.forEach(val => { app.use('/', require(val)); })

// 一切就緒，開始接受用戶端連線
app.listen(process.env.BACKEND_PORT || 5000);

query('UPDATE account SET acc_token = ""', [], (err) => {
    err ? console.log(err) : console.log('Clear all tokens');
});


