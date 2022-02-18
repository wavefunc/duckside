// ----- 冠樺 ----- //

var express = require('express');
var cors = require('cors');
var { query } = require('./mysql.js');
require('dotenv').config();

var app = express();
app.listen(process.env.BACKEND_PORT);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', function (req, res) {
   res.send('Welcome to backend');
})

app.get('/account', function (req, res) {
   query('SELECT * FROM account', [], function (err, rows) {
      res.send(rows);
   })
})

app.get('/member/list', function (req, res) {
    query('SELECT * FROM members', [], function (err, rows) {
        res.send(rows);
    })
});

app.post('/member/add', function (req, res) {
    conn.query('INSERT INTO members (name) VALUES (?)', [req.body.name], function (err, rows) {
        res.send('ok');
    })
    console.log(req.body);
})
