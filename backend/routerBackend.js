// ----- 冠樺 ----- //
// ----- 後端專用語法 ----//

var express = require('express');
var router = express.Router();
var { query } = require('./mysql.js');

// 為此 acc_id 增加 會員_家具 的預設資料
router.get('/account/defaultFurn/:acc_id', async (req, res) => {
   let aryFurnId = ['basketball', 'bath_tube', 'my_light', 'TV', '時鐘-2', '櫃子', '母鴨', '畫像', '眼鏡-2', '舉重槓-2', '鏡子-2']
   let strQuery = `INSERT INTO acc_furn (acc_furn_id, acc_id, furn_id) VALUES `;
   aryFurnId.forEach((val) => {
      strQuery += `(NULL, ${req.params.acc_id}, '${val}'),`;
   });
   strQuery = strQuery.slice(0, -1);

   console.log(strQuery);

   query(strQuery, [], (err) => {
      err ?
      res.send(err) :
      res.send('Successfully added default furniture with acc_id: ' + req.params.acc_id);
   });
});

module.exports = router;