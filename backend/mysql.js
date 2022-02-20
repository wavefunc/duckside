// ----- 冠樺 ----- //

var mysql = require('mysql');

// 建立 mysql 連線池
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
   // 取得連線池的連線
   pool.getConnection(function (err, conn) {
      if (err) {
         console.log('db connection error!');
         console.log(err);

      } else {
         console.log('db connection ok!');
         conn.query(strQuery, options, callback);

         // release connection。
         conn.release();
      }
   });
};

exports.checkAccount = async function (acc_email) {
   return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
         if (err) {
            reject(err);
         } else {
            conn.query('SELECT acc_id, acc_name FROM account WHERE acc_email = ?',
               [acc_email],
               (_err, rows) => {
                  err ? reject(err) : resolve(JSON.stringify(rows[0].acc_id));
               }
            )
            conn.release();
         }
      })
   })

   // console.log('queryResult: ', queryResult)
   // conn.release();
   // return 1;

   // console.log('beginning of checkAccount');
   // var e = 1;
   // await pool.getConnection(function (err, conn) {
   //    console.log('beginning of pool.getConnection');
   //    if (err) {
   //       console.log('db connection error!');
   //       console.log(err);
   //    } else {
   //       console.log('db connection ok!');
   //       conn.query('SELECT acc_id, acc_name FROM account WHERE acc_email = ?',
   //          [acc_email],
   //          (_err, rows) => {
   //             // console.log(rows[0].acc_id);
   //             // return rows[0].acc_id;
   //             e = 100;
   //             console.log('in conn.query, e: ' + e);
   //          }
   //       );
   //    }
   //    console.log('end of pool.getConnection');
   // })

   // console.log('end of checkAccount');
   // return e;
}