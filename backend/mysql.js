var mysql = require('mysql');

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

exports.query = function (strQuery, options, callback) {
   // console.log(strQuery, options, callback);

   // 取得連線池的連線
   pool.getConnection(function (err, conn) {
      if (err) {
         console.log('db connection error!');

      } else {
         // console.log('db connection ok!');
         conn.query(strQuery, options, function (err, rows) {
            callback(err, rows);
         })

         // release connection。
         conn.release();
      }
   });
};