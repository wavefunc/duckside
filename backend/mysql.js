// ----- 冠樺 ----- //

var mysql = require('mysql');

// 建立 mysql 連線池
var pool = mysql.createPool({
   host: '184.168.115.208',
   user: 'duckside',
   password: 'iii23265860',
   database: 'duckside',
   port: 3306,
   multipleStatements: true,
   // 無可用連線時是否等待pool連線釋放(預設為true)
   waitForConnections: true,
   // 連線池可建立的總連線數上限(預設最多為10個連線數)
   connectionLimit: 10
});

// // 清空所有的 acc_token
// pool.getConnection((err, conn) => {
//    if (err) {
//       console.log(err);
//    } else {
//       conn.query(`UPDATE account SET acc_token = ''`, [], (_err) => {
//          console.log('Delete all tokens');
//       });
//       conn.release();
//    }
// });

// 一般 sql query 使用的函式
exports.query = async function (strQuery, options, callback) {
   return new Promise((resolve, reject) => {

      // 取得連線池的連線
      pool.getConnection((err, conn) => {
         if (err) {
            reject(err);
         } else {
            conn.query(strQuery, options, callback);

            // release connection。
            conn.release();
         }
      });
   });
};

// 檢查前端的會員email帳號是否正確
// 回傳值：檢查到的 acc_id (type: string)；若錯誤則 res.send("無此帳號")
exports.checkAccount = async function (acc_email, res) {
   return new Promise((resolve, reject) => {
      pool.getConnection((err, conn) => {
         if (err) {
            reject(err);
         } else {
            conn.query('SELECT acc_id, acc_name FROM account WHERE acc_email = ?',
               [acc_email],
               (_err, rows) => {
                  if (_err) {
                     reject(_err);
                  } else {
                     rows[0] ? resolve(JSON.stringify(rows[0].acc_id)) : res.send('No such account');
                  }
               }
            )
            conn.release();
         }
      });
   });
};