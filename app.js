var express = require('express');
var app = express();
app.listen(3000);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/about_site', function(req, res){
    res.render('about_site.ejs');
})