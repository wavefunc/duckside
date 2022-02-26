// ----- 冠樺 ----- //

require('dotenv').config();

//引用 nodemailer
var nodemailer = require('nodemailer');

//宣告發信物件
var transporter = nodemailer.createTransport({
   service: 'Gmail',
   auth: {
      user: 'dickside.react@gmail.com',
      pass: 'ispanmfee21'
   }
});

var options = {
   //寄件者
   from: 'dickside.react@gmail.com',
   //收件者
   to: 'wavefunc@gmail.com',
   //主旨
   subject: '這是 node.js 發送的測試信件', // Subject line
   //純文字
   text: 'Hello world2', // plaintext body
   //嵌入 html 的內文
   html: '<h2>Why and How</h2>',
};

//發送信件方法
transporter.sendMail(options, function (error, info) {
   if (error) {
      console.log(error);
   } else {
      console.log('訊息發送: ' + info.response);
   }
});