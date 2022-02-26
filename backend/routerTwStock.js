// ----- 冠樺 ----- //

var express = require('express');
var router = express.Router();

var getYahoo = require('./twstock.js');

router.get('/twstock', function (req, res) {
   res.redirect('twstock.html');
});

router.post('/twstock/candlestick', function (req, res) {
   console.log(JSON.stringify(req.body));
   getYahoo(req.body.stockId, req.body.period1, req.body.period2)
       .then(function (MI) {
           console.log('MI sent');
           res.send(MI);
       });
});

module.exports = router;