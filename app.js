var express = require('express');
var app = express();
app.listen(3000);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/about_site', function(req, res){
    res.render('about_site.ejs');
})
app.get('/about_team', function(req, res){
    res.render('about_team.ejs');
})
app.get('/chart_pie', function(req, res){
    res.render('chart_pie.ejs');
})
app.get('/component', function(req, res){
    res.render('component.ejs');
})
app.get('/game_daily', function(req, res){
    res.render('game_daily.ejs');
})
app.get('/', function(req, res){
    res.render('index.ejs');
})
app.get('/index', function(req, res){
    res.render('index.ejs');
})
app.get('/ma_asset', function(req, res){
    res.render('ma_asset.ejs');
})
app.get('/ma_check', function(req, res){
    res.render('ma_check.ejs');
})
app.get('/ma_dashboard', function(req, res){
    res.render('ma_dashboard.ejs');
})
app.get('/ma_transaction', function(req, res){
    res.render('ma_transaction.ejs');
})
app.get('/ma_plan', function(req, res){
    res.render('ma_plan.ejs');
})