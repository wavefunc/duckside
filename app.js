var express = require('express');
var app = express();
app.listen(3000);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/about_site', function(req, res){
    res.render('about_site.ejs', {
        pageTitle: '關於本站',
        pageURL: '/about_site'
    });
})

app.get('/about_team', function(req, res){
    res.render('about_team.ejs', {
        pageTitle: '合作夥伴',
        pageURL: '/about_team'
    });
})

app.get('/chart_pie', function(req, res){
    res.render('chart_pie.ejs',{
        pageTitle: '圓餅圖: 部位配置',
        pageURL: '/chart_pie'
    });
})

app.get('/component', function(req, res){
    res.render('component.ejs');
})

app.get('/game_daily', function(req, res){
    res.render('game_daily.ejs',{
        pageTitle: '划水日記',
        pageURL: '/game_daily'
    });
})

app.get('/', function(req, res){
    res.render('index.ejs',{
        pageTitle: '首頁',
        pageURL: '/'
    });
})


app.get('/ma_asset', function(req, res){
    res.render('ma_asset.ejs',{
        pageTitle: '資產明細',
        pageURL: '/ma_asset'
    });
})

app.get('/ma_check', function(req, res){
    res.render('ma_check.ejs',{
        pageTitle: '投資結算',
        pageURL: '/ma_check'
    });
})

app.get('/ma_dashboard', function(req, res){
    res.render('ma_dashboard.ejs',{
        pageTitle: '總覽',
        pageURL: '/ma_dashboard'
    });
})

app.get('/ma_transaction', function(req, res){
    res.render('ma_transaction.ejs',{
        pageTitle: '交易紀錄',
        pageURL: '/ma_transaction'
    });
})

app.get('/ma_plan', function(req, res){
    res.render('ma_plan.ejs',{
        pageTitle: '進出策略',
        pageURL: '/ma_plan'
    });
})