// ----- 冠樺 ----- //

var express = require('express');
var cors = require('cors');
var mysql = require('mysql');
require('dotenv').config();

var app = express();
app.listen(process.env.BACKEND_PORT);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

var conn = mysql.createConnection({
    // host: 'localhost',
    host: '184.168.115.208',
    // host: 'duckside.com',
    // host: 'wavefunc.com',
    user: 'duckside',
    password: 'iii23265860',
    database: 'duckside',
    // user: 'root',
    // password: 'root',
    // database: 'duckside_react',
    port: 3306
    // ssl:true
});

conn.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log(`database duckside connection ok`);
    }
})

app.get('/', function (req, res) {
    res.send('Welcome to backend');
})

app.get('/account', function(req, res){
    conn.query('SELECT * FROM account', [], function (err, rows) {
        res.send(rows);
    })
})

// app.get('/member/list', function (req, res) {
//     console.log('get req');
//     conn.query('SELECT * FROM members', [], function (err, rows) {
//         res.send(rows);
//     })
// });

// app.post('/member/add', function (req, res) {
//     conn.query('INSERT INTO members (name) VALUES (?)', [req.body.name], function (err, rows) {
//         res.send('ok');
//     })
//     console.log(req.body);
// })

// app.get('/account')