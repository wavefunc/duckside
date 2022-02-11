// ----- 冠樺 ----- //

var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
require('dotenv').config();

var app = express();
app.listen(process.env.BACKEND_PORT);

app.use(express.urlencoded({ extended: true }));
app.use(cors());

var conn = mysql.createConnection({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: 3306
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`database "${process.env.DATABASE_NAME}" connection ok`);
    }
})

app.get('/', function (req, res) {
    res.send('Welcome to backend');
})

app.get('/member/list', function (req, res) {
    conn.query('SELECT * FROM members', [], function (err, rows) {
        res.send(rows);
    })
});

app.post('/member/add', function (req, res) {
    conn.query('INSERT INTO members (name) VALUES (?)', [req.body.name], function (err, rows) {
        res.send('ok');
    })
    // console.log(req.body.name);
})