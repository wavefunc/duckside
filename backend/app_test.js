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

var pool = mysql.createPool({
   host: '184.168.115.208',
   user: 'duckside',
   password: 'iii23265860',
   database: 'duckside',
   port: 3306,
   // 無可用連線時是否等待pool連線釋放(預設為true)
   waitForConnections: true,
   // 連線池可建立的總連線數上限(預設最多為10個連線數)
   connectionLimit: 10
});

var query = function (strQuery, options, callback) {
   console.log(strQuery, options, callback);

   // 取得連線池的連線
   pool.getConnection(function (err, conn) {
      if (err) {
         console.log('db connection error!');

      } else {
         console.log('db connection ok!');
         conn.query(strQuery, options, function (err, rows) {
            callback(err, rows);

         })

         // release connection。
         conn.release();
      }
   });
}

app.get('/', function (req, res) {
   res.send('Welcome to backend');
})

app.get('/account', function (req, res) {
   query('SELECT * FROM account', [], function (err, rows) {
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
