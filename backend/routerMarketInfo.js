// ----- 人豪 ----- //
// 本路由用來抓取某天的的全市場日成交資料, 
// 由於資料較大且常常會有被擋IP的問題,
// 集中管理以便於優化效能及減少抓取頻率
// *******************

var express = require('express');
var router = express.Router();
var { query, checkAccount } = require('./mysql.js');
var { getYahoo, getTwse } = require('./twstock.js');

// 抓取今天的市價資料, 如果請求日期相同, 就給這份資料,
// 目前用這方式減少頻繁請求以免被證交所擋IP
const dt = require('date-and-time');
var todayYmd = dt.format(new Date(), 'YYYYMMDD');
var todayMarketInfo = {};
getTwse(todayYmd).then((result) => {
   console.log(`抓取${todayYmd}市價: ${result.stat}`);
   todayMarketInfo = result;
}).catch((e) => {
   res.send('出現未預期的錯誤');
});

// *****************************************************
// 依 dateQuery 抓該天所有股票成交資料
// 打包成物件 各類資料以陣列形式存放在屬性裡
// *****************************************************
router.post('/marketInfo/all', function (req, res) {
   let Ymd = req.body.dateQuery.replace(/-/g, '');
   console.log(Ymd);
   console.log(todayYmd);
   console.log(Ymd === todayYmd);
   if (Ymd === todayYmd) {
      res.send(todayMarketInfo);
   } else {
      getTwse(Ymd).then((MI) => {
         console.log(`抓取${Ymd}市價: ${MI.stat}`)
         res.send(MI);
      }).catch((e) => {
         // console.log(e);
         res.send('Server Busy');
      });
   }
});

// *****************************************************
// 依 dateQuery(yyyy-mm-dd字串) 抓取股票成交資料
// 依 stockList(物件陣列)各物件的 sec_id 屬性查詢個股日成交資訊
// 將該股市價新增至 marketPrice 屬性
// 如有給 total 屬性, 並計算該部位市值新增至 marketValue 屬性
// *****************************************************
router.post('/marketInfo/stocks', function (req, res) {
   let Ymd = req.body.dateQuery.replace(/-/g, '');
   let rows = req.body.stockList;
   if (Ymd === todayYmd) {
      let rowsWithMI = rows.map((v) => {
         let p = todayMarketInfo.priceClose(v.sec_id);
         let pNetChange = todayMarketInfo.changeNet(v.sec_id);
         v.marketPrice = p;
         v.marketPriceChange = pNetChange;
         v.marketPriceChangePct = Math.round( pNetChange / (p - pNetChange) *10000) /100;
         if (v.total) {
            v.marketValue = p * v.total;
         }
         return v;
      });
      res.send(rowsWithMI);
   } else {
      console.log('到證交所抓市價資料');
      getTwse(Ymd).then((MI) => {
         let rowsWithMI = rows.map((v) => {
            let p = MI.priceClose(v.sec_id);
            let pNetChange = MI.changeNet(v.sec_id);
            v.marketPrice = p;
            v.marketPriceChange = pNetChange;
            v.marketPriceChangePct = Math.round( pNetChange / (p - pNetChange) *10000) /100;
            if (v.total) {
               v.marketValue = p * v.total;
            }
            return v;
         });
         res.send(rowsWithMI);
      });
   }
});


// ***************************************************************** 
// 依 acc_email 跟 dateQuery 兩個變數，查詢某用戶截至某天為止的庫存      
// 回傳各 securities 的合計數量、並附上市價及市值在 marketPrice marketValue 屬性
// 備忘: 之後可以試著將此api跟合併
// ***************************************************************** 
router.post('/dashboard/inventory', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery = `
      SELECT txn.sec_id, sec.sec_name, sec.sec_market, SUM(txn.txn_amount) total
      FROM transaction txn 
      INNER JOIN securities sec ON txn.sec_id = sec.sec_id
      WHERE txn.acc_id = ? AND txn.txn_date <= ?
      GROUP BY txn.sec_id HAVING total >0
   `
   query(strQuery, [acc_id, req.body.dateQuery], (err, rows) => {
      if (err) {
         res.send(err)
      } else {
         let Ymd = req.body.dateQuery.replace(/-/g, '');
         if (Ymd === todayYmd) {
            let rowsWithMI = rows.map((v) => {
               let p = todayMarketInfo.priceClose(v.sec_id);
               let pNetChange = todayMarketInfo.changeNet(v.sec_id);
               v.marketPrice = p;
               v.marketPriceChange = pNetChange;
               v.marketPriceChangePct = Math.round( pNetChange / (p - pNetChange) *10000) /100;
               v.marketValue = p * v.total;
               return v;
            });
            res.send(rowsWithMI);
         } else {
            console.log('到證交所抓市價資料');
            getTwse(Ymd).then((MI) => {
               let rowsWithMI = rows.map((v) => {
                  let p = MI.priceClose(v.sec_id);
                  let pNetChange = MI.changeNet(v.sec_id);
                  v.marketPrice = p;
                  v.marketPriceChange = pNetChange;
                  v.marketPriceChangePct = Math.round( pNetChange / (p - pNetChange) *10000) /100;
                  v.marketValue = p * v.total;
                  return v;
               });
               res.send(rowsWithMI);
            });
         }
      }
   })
});

// ***************************************************************** 
// 依 acc_email 跟 dateQuery 兩個變數
// 查詢某用戶截至某天為止的庫存市值
// ***************************************************************** 
router.post('/marketInfo/inventory', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   var strQuery = `
      SELECT txn.sec_id, sec.sec_market, SUM(txn.txn_amount) total
      FROM transaction txn 
      INNER JOIN securities sec ON txn.sec_id = sec.sec_id
      WHERE txn.acc_id = ? AND txn.txn_date <= ?
      GROUP BY txn.sec_id HAVING total >0
   `
   query(strQuery, [acc_id, req.body.dateQuery], (err, rows) => {
      if (err) {
         res.send(err)
      } else {
         let Ymd = req.body.dateQuery.replace(/-/g, '');
         if (Ymd === todayYmd) {
            let marketValues = rows.map((v) => {
               let marketPrice = todayMarketInfo.priceClose(v.sec_id);
               let marketValue = marketPrice * v.total;
               return marketValue;
            });
            let total = JSON.stringify(marketValues.reduce((a, b) => a + b));
            res.send(total);
         } else {
            console.log('到證交所抓市價資料, 注意控制請求頻率');
            getTwse(Ymd).then((MI) => {
               console.log(MI.stat);
               let marketValues = rows.map((v) => {
                  let marketPrice = MI.priceClose(v.sec_id);
                  let marketValue = marketPrice * v.total;
                  return marketValue;
               });
               let total = JSON.stringify(marketValues.reduce((a, b) => a + b));
               res.send(total);
            });
         }
      }
   })
});


// ***********************************************
// 注意：本方法因為sql版本過舊無法使用row_number()，故使用替代方案
// 查各股最新一筆交易計畫, 可利用 amount參數 自行設定要查幾筆
// 若 amount 為 null (即不傳值)，回傳所有計劃紀錄
// ***********************************************
router.post('/dashboard/plan', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   // var strLimit = (req.body.amount) ? `DESC LIMIT ${req.body.amount}` : ``;
   // var strQuery = `SELECT * FROM plan INNER JOIN securities sec 
   //    ON plan.sec_id = sec.sec_id WHERE acc_id = ? ORDER BY plan_date ${strLimit}`;

   var strQuery = `SELECT * FROM
         (SELECT plan_id, plan_date, sec_id, plan_anchor, plan_stoploss, plan_target, plan_note, acc_id, 
         @curRank := @curRank + 1 AS rank
         FROM plan, (SELECT @curRank := 0) rank
         WHERE acc_id = ? ORDER BY plan_date DESC) plan
         INNER JOIN securities sec
         ON sec.sec_id = plan.sec_id
         GROUP BY sec.sec_name`;

   query(strQuery, [acc_id], (err, rows) => {
      if (err) {
         res.send(err)
      } else {
         console.log('使用伺服器預抓市價資料');
         let rowsWithMI = rows.map((v) => {
            let p = todayMarketInfo.priceClose(v.sec_id);
            v.marketPrice = p;
            return v;
         });
         res.send(rowsWithMI);
      };
   });
});

// ***********************************************
// 注意：本方法因為sql版本過舊無法使用row_number()，故使用替代方案
// 查各股最新一筆交易計畫, 可利用 amount參數 自行設定要查幾筆
// 若 amount 為 null (即不傳值)，回傳所有計劃紀錄
// ***********************************************
router.post('/marketInfo/', async (req, res) => {
   // 透由前端傳過來的 acc_email 檢查帳號是否存在，並取得 acc_id
   var acc_id = await checkAccount(req.body.acc_email, res);

   // var strLimit = (req.body.amount) ? `DESC LIMIT ${req.body.amount}` : ``;
   // var strQuery = `SELECT * FROM plan INNER JOIN securities sec 
   //    ON plan.sec_id = sec.sec_id WHERE acc_id = ? ORDER BY plan_date ${strLimit}`;

   var strQuery = `SELECT * FROM
         (SELECT plan_id, plan_date, sec_id, plan_anchor, plan_stoploss, plan_target, plan_note, acc_id, 
         @curRank := @curRank + 1 AS rank
         FROM plan, (SELECT @curRank := 0) rank
         WHERE acc_id = ? ORDER BY plan_date DESC) plan
         INNER JOIN securities sec
         ON sec.sec_id = plan.sec_id
         GROUP BY sec.sec_name`;

   query(strQuery, [acc_id], (err, rows) => {
      if (err) {
         res.send(err)
      } else {
         console.log('使用伺服器預抓市價資料');
         let rowsWithMI = rows.map((v) => {
            let p = todayMarketInfo.priceClose(v.sec_id);
            v.marketPrice = p;
            return v;
         });
         res.send(rowsWithMI);
      };
   });
});

module.exports = router;