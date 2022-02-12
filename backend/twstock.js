/* ----------
抓取外部股票並整理成前端方便使用的格式
人豪寫完再交冠樺整合進app.js
*/

const axios = require("axios");
// axios可模擬 Client 訪問網站，並設定訪問時所攜帶的Header
const dt = require('date-and-time');
// The date-and-time.Date.format() is a minimalist collection of functions for manipulating JS date and time module which is used to format the date according to a certain pattern. 
// const forge = require("data-forge");
// JavaScript data wrangling, transformation and analysis toolkit
// const cheerio = require("cheerio");
// 像是node.js界的jQuery

function transpose(arr) {
    // 轉置處理
    // https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
    return Object.keys(arr[0]).map(function (c) {
        return arr.map(function (r) {
            return r[c];
        });
    });
}
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class twseMarketInfo {
    constructor(Ymd) {
        this._date = Ymd;
        this.url = `http://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&type=ALLBUT0999&date=${Ymd}`;
        this.responsePromise = axios(this.url);  // (default) responseType: 'json', method: 'get', 
        // https://bytearcher.com/articles/asynchronous-call-in-constructor/
        // Note: performing an asynchronous call to its completion in the constructor is not an option,
    }
    async initialize() {
        var res = await this.responsePromise;
        if (res.data.stat !== "OK") {
            throw 'No Trading';
        }
        var data = transpose(res.data.data9);
        // 資料量大, 只以字串存放, 不全部轉成數值
        this._stockId = data[0];
        this._stockName = data[1];
        this._volShare = data[2];
        this._volDeal = data[3];
        this._volDollar = data[4];
        this._priceOpen = data[5];
        this._priceHigh = data[6];
        this._priceLow = data[7];
        this._priceClose = data[8];
        this._changeDir = data[9];
        this._changeAbs = data[10];
        this._ratioPE = data[15];
        this._fields = res.data['fields9'];
    }
    stockId(IdStr) {
        IdStr = IdStr.toString();
        var lookupArr = this._stockId;
        var idx1 = this._stockName.indexOf(IdStr);
        var idx2 = this._stockId.indexOf(IdStr);
        var result = lookupArr[idx1] || lookupArr[idx2];
        if (result != undefined) {
            return result;
        } else {
            return 'No result.'
        }
    }
    stockName(IdStr) {
        IdStr = IdStr.toString();
        var lookupArr = this._stockName;
        var idx1 = this._stockId.indexOf(IdStr);
        var idx2 = this._stockName.indexOf(IdStr);
        var result = lookupArr[idx1] || lookupArr[idx2];
        if (result != undefined) {
            return result;
        } else {
            return 'No result.'
        }
    }
    volShare(IdStr) {
        IdStr = IdStr.toString();
        var lookupArr = this._volShare;
        var idx1 = this._stockId.indexOf(IdStr);
        var idx2 = this._stockName.indexOf(IdStr);
        var result = lookupArr[idx1] || lookupArr[idx2];
        try {
            return parseInt(result.replace(/,/g, ''));
        } catch (err) {
            console.log(err.message);
            return 'No result.'
        }
    }
    volDeal(IdStr) {
        IdStr = IdStr.toString();
        var lookupArr = this._volDeal;
        var idx1 = this._stockId.indexOf(IdStr);
        var idx2 = this._stockName.indexOf(IdStr);
        var result = lookupArr[idx1] || lookupArr[idx2];
        try {
            return parseInt(result.replace(/,/g, ''));
        } catch (err) {
            console.log(err.message);
            return 'No result.'
        }
    }
    volDollar(IdStr) {
        IdStr = IdStr.toString();
        var lookupArr = this._volDollar;
        var idx1 = this._stockId.indexOf(IdStr);
        var idx2 = this._stockName.indexOf(IdStr);
        var result = lookupArr[idx1] || lookupArr[idx2];
        try {
            return parseInt(result.replace(/,/g, ''));
        } catch (err) {
            console.log(err.message);
            return 'No result.'
        }
    }
    priceOpen(IdStr) {
        IdStr = IdStr.toString();
        var lookupArr = this._priceOpen;
        var idx1 = this._stockId.indexOf(IdStr);
        var idx2 = this._stockName.indexOf(IdStr);
        var result = lookupArr[idx1] || lookupArr[idx2];
        try {
            return parseFloat(result.replace(/,/g, ''));
        } catch (err) {
            console.log(err.message);
            return 'No result.'
        }
    }
    priceHigh(IdStr) {
        IdStr = IdStr.toString();
        var lookupArr = this._priceHigh;
        var idx1 = this._stockId.indexOf(IdStr);
        var idx2 = this._stockName.indexOf(IdStr);
        var result = lookupArr[idx1] || lookupArr[idx2];
        try {
            return parseFloat(result.replace(/,/g, ''));
        } catch (err) {
            console.log(err.message);
            return 'No result.'
        }
    }
    priceLow(IdStr) {
        IdStr = IdStr.toString();
        var lookupArr = this._priceLow;
        var idx1 = this._stockId.indexOf(IdStr);
        var idx2 = this._stockName.indexOf(IdStr);
        var result = lookupArr[idx1] || lookupArr[idx2];
        try {
            return parseFloat(result.replace(/,/g, ''));
        } catch (err) {
            console.log(err.message);
            return 'No result.'
        }
    }
    priceClose(IdStr) {
        IdStr = IdStr.toString();
        var lookupArr = this._priceClose;
        var idx1 = this._stockId.indexOf(IdStr);
        var idx2 = this._stockName.indexOf(IdStr);
        var result = lookupArr[idx1] || lookupArr[idx2];
        try {
            return parseFloat(result.replace(/,/g, ''));
        } catch (err) {
            console.log(err.message);
            return 'No result.'
        }
    }
    changeNet(IdStr) {
        IdStr = IdStr.toString();
        var arrDir = this._changeDir;
        var arrAbs = this._changeAbs;
        var idx1 = this._stockId.indexOf(IdStr);
        var idx2 = this._stockName.indexOf(IdStr);
        var changeDir = arrDir[idx1] || arrDir[idx2];
        var changeAbs = arrAbs[idx1] || arrAbs[idx2];
        switch (changeDir.slice(-5, -4)) {
            case undefined:
                return 'No result.';
            case "+":
                return parseFloat(changeAbs.replace(/,/g, ''));
            case "-":
                return -parseFloat(changeAbs.replace(/,/g, ''));
            case "X":
                return 'N/A';
            default:
                return 0;
        }
    }
    ratioPE(IdStr) {
        IdStr = IdStr.toString();
        var lookupArr = this._ratioPE;
        var idx1 = this._stockId.indexOf(IdStr);
        var idx2 = this._stockName.indexOf(IdStr);
        var result = lookupArr[idx1] || lookupArr[idx2];
        try {
            return parseFloat(result.replace(/,/g, ''));
        } catch (err) {
            console.log(err.message);
            return 'No result.'
        }
    }
    get fields() {
        return this._fields;
    }
    get date() {
        return this._date;
    }
}
class twseStockDay {
    constructor(Ymd, stockId, periods = 1) {
        this._stockId = stockId;
        this._periods = periods;
        this.url = `http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${Ymd}&stockNo=${stockId}`;
        var getUrl = (Ymd) => `http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${Ymd}&stockNo=${stockId}`;
        this.responsePromise = [];
        var period = dt.parse(Ymd, 'YYYYMMDD', true);
        var manyRequest = async function (ms) {
            for (var i = 0; i <= this._periods; i++) {
                console.log(`requestData${i + 1}: ${Ymd}`);
                this.responsePromise[i] = axios(getUrl(Ymd));
                period.setMonth(period.getMonth() - 1);
                Ymd = dt.format(period, "YYYYMMDD");
                await delay(ms);
            }
        }.bind(this);
        manyRequest(500);
    }
    async initialize() {
        this._dates = [];
        this._volShare = [];
        this._volDollar = [];
        this._priceOpen = [];
        this._priceHigh = [];
        this._priceLow = [];
        this._priceClose = [];
        this._changeNet = [];
        this._volDeal = [];
        this._changeAbs = [];
        this._ratioPE = [];

        var res = []
        for (var i = 0; i <= this._periods; i++) {
            res = await this.responsePromise[i];
            var data = transpose(res.data.data);

            var dateArr = data[0].map((x) => {
                let dateArr = x.split('/');
                dateArr[0] = parseInt(dateArr[0]) + 1911;
                return dateArr.join('');
            });
            this._dates = dateArr.concat(this._dates);
            this._volShare = data[1].map(str => parseInt(str.replace(/,/g, ''))).concat(this._volShare);
            this._volDollar = data[2].map(str => parseInt(str.replace(/,/g, ''))).concat(this._volDollar);
            this._priceOpen = data[3].map(str => parseFloat(str.replace(/,/g, ''))).concat(this._priceOpen);
            this._priceHigh = data[4].map(str => parseFloat(str.replace(/,/g, ''))).concat(this._priceHigh);
            this._priceLow = data[5].map(str => parseFloat(str.replace(/,/g, ''))).concat(this._priceLow);
            this._priceClose = data[6].map(str => parseFloat(str.replace(/,/g, ''))).concat(this._priceClose);
            this._changeNet = data[7].map(str => parseFloat(str.replace(/,/g, ''))).concat(this._changeNet);
            this._volDeal = data[8].map(str => parseInt(str.replace(/,/g, ''))).concat(this._volDeal);
        };
        this._stockName = res.data.title.split(' ')[2];
        this._fields = res.data.fields;

    }
    dates() {
        return this._dates;
    }
    priceClose(Ymd) {
        var lookupArr = this._priceClose;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    volShare(Ymd) {
        var lookupArr = this._volShare;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    volDeal(Ymd) {
        var lookupArr = this._volDeal;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    volDollar(Ymd) {
        var lookupArr = this._volDollar;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    priceOpen(Ymd) {
        var lookupArr = this._priceOpen;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    priceHigh(Ymd) {
        var lookupArr = this._priceHigh;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    priceLow(Ymd) {
        var lookupArr = this._priceLow;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    changeNet(Ymd) {
        var lookupArr = this._changeNet;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    get fields() {
        return this._fields;
    }
    get stockName() {
        return this._stockName;
    }
    get stockId() {
        return this._stockId;
    }

}
class yahooStockDay_v2 {
    constructor(stockId, period1, period2) {
        this._stockId = stockId;
        this._period1 = new Date(period1 * 1000);
        this._period2 = new Date(period2 * 1000);

        switch ('上市') {
            case '上市':
                stockId = `${stockId}.TW`;
                break;
            case '上櫃':
                stockId = `${stockId}.TWO`;
                break;
            default:
                return ('查無此股號');
        }
        this.url = `https://query1.finance.yahoo.com/v7/finance/download/${stockId}?period1=${period1.toString()}&period2=${period2.toString()}&interval=1d&events=history&includeAdjustedClose=true`;
        this.responsePromise = axios(this.url);

    }
    async initialize() {
        var res = await this.responsePromise;
        var rows = res.data.split('\n');
        this._fields = rows.shift().split(',');
        var data = transpose(rows.map(e => e.split(',')));

        this._dates = data[0].map(e => e.replace(/-/g, ""));
        this._priceOpen = data[1].map(e => Math.round(parseFloat(e) * 100) / 100);
        this._priceHigh = data[2].map(e => Math.round(parseFloat(e) * 100) / 100);
        this._priceLow = data[3].map(e => Math.round(parseFloat(e) * 100) / 100);
        this._priceClose = data[4].map(e => Math.round(parseFloat(e) * 100) / 100);
        this._priceCloseAdj = data[5].map(e => Math.round(parseFloat(e) * 100) / 100);
        this._volShare = data[6].map(e => parseInt(e));
        this._changeNet = [...this._priceClose].map(function (v, i) {
            return Math.round((v - this[i - 1]) * 100) / 100 || 0;
        }, [...this._priceClose]);
        // no data: volDollar volDeal
        // no this._stockName
        // console.log(this._priceOpen);
    }
    dates() {
        return this._dates;
    }
    priceClose(Ymd) {
        var lookupArr = this._priceClose;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    volShare(Ymd) {
        var lookupArr = this._volShare;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    priceOpen(Ymd) {
        var lookupArr = this._priceOpen;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    priceHigh(Ymd) {
        var lookupArr = this._priceHigh;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    priceLow(Ymd) {
        var lookupArr = this._priceLow;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    changeNet(Ymd) {
        var lookupArr = this._changeNet;
        if (Ymd == undefined) {
            return lookupArr;
        } else {
            Ymd = Ymd.toString();
            var idx = this._dates.indexOf(Ymd);
            try {
                return lookupArr[idx];
            } catch (err) {
                console.log(err.message);
                return 'No result.';
            }
        }
    }
    get fields() {
        return this._fields;
    }
    // 缺乏股名資料
    // get stockName() {
    //     return this._stockName;
    // }
    get stockId() {
        return this._stockId;
    }

}
class yahooStockDay {
    constructor(stockId, period1, period2) {
        this.stockId = stockId;
        this.period1 = new Date(period1 * 1000);
        this.period2 = new Date(period2 * 1000);

        switch ('上市') {
            case '上市':
                stockId = `${stockId}.TW`;
                break;
            case '上櫃':
                stockId = `${stockId}.TWO`;
                break;
            default:
                return ('查無此股號');
        }
        this.url = `https://query1.finance.yahoo.com/v7/finance/download/${stockId}?period1=${period1.toString()}&period2=${period2.toString()}&interval=1d&events=history&includeAdjustedClose=true`;
        this.responsePromise = axios(this.url);

    }
    async initialize() {
        var res = await this.responsePromise;
        var rows = res.data.split('\n');
        this.data = [...rows];
        this.fields = rows.shift().split(',');
        var data = transpose(rows.map(e => e.split(',')));
        this.Ymd = data[0].map(e => e.replace(/-/g, ""));
        this.dates = data[0];
        this.priceOpen = data[1].map(e => Math.round(parseFloat(e) * 100) / 100);
        this.priceHigh = data[2].map(e => Math.round(parseFloat(e) * 100) / 100);
        this.priceLow = data[3].map(e => Math.round(parseFloat(e) * 100) / 100);
        this.priceClose = data[4].map(e => Math.round(parseFloat(e) * 100) / 100);
        this.priceCloseAdj = data[5].map(e => Math.round(parseFloat(e) * 100) / 100);
        this.volShare = data[6].map(e => parseInt(e));
        this.priceCloseChangeNet = this.priceClose.map(function (v, i) {
            return Math.round((v - this[i - 1]) * 100) / 100 || 0;
        }, this.priceClose );
        this.priceCloseChangeDir = this.priceCloseChangeNet.map(e => Math.sign(e));
        this.priceDaytimeMoveDir = this.priceClose.map( (v, i) => Math.sign( v - this.priceOpen[i] ));
        this.candleShadow = this.priceHigh.map( (v,i) => [this.priceLow[i] , v] );
        this.candleBody = this.priceClose.map( (v,i) => [this.priceOpen[i] , v] );
    }
}

async function getTwse(Ymd, stockId, periods) {
    Ymd = (Ymd !== undefined) ? Ymd.toString() : dt.format(new Date(), 'YYYYMMDD');
    if (isNaN(dt.parse(Ymd, 'YYYYMMDD'))) {
        // console.log('Invalid Date');
        return 'Invalid Date'
    }
    if (stockId) {
        // stockDaysMI 有給id參數, 查詢個股成交資訊
        // perioeds傳入要調幾個月資料, 預設為當月
        stockId = stockId.toString();
        var MI = new twseStockDay(Ymd, stockId, periods);
        await MI.initialize();
        return MI;
    } else {
        // afterHoursMI 只給日期參數, 查詢該日整體市場行情
        // 完全沒給參數, 預設查詢今日或最近一日市場行情
        var MI = new twseMarketInfo(Ymd);
        await MI.initialize();
        return MI;
    }
}
async function getYahoo(stockId, period1, period2) {
    if (period1 == undefined) {
        period1 = Date.now() / 1000 - 86400;
        period2 = Date.now() / 1000;
    } else {
        period1 = dt.parse(period1.toString(), 'YYYYMMDD').getTime() / 1000;
        period2 = (period2 == undefined) ? period1 + 86400 : dt.parse(period2.toString(), 'YYYYMMDD').getTime() / 1000;
    }
    if (isNaN(period1) || isNaN(period2)) {
        console.log('Invalid Date...');
        return 'Invalid Date...';
    } else {
        var MI = new yahooStockDay(stockId.toString(), period1, period2);
        await MI.initialize();
        return MI;
    }

};
async function getRTQs(StockId) {
    // .TW .TWO
    // .TWN
    return;
}

// getYahoo(3003, 20220101, 20220129).then(function(MI) {
//     console.log(MI.dates());
//     console.log(MI.priceOpen());
//     console.log(MI.priceClose());
// });

// 待測試: daley要下幾毫秒?
// getTwse(20220101, 9933, 12).then(function (MI) {
//     console.log(MI.fields);
//     console.log(MI.priceClose());
// });

module.exports = getYahoo;


/*************** note ****************
 * 單日查詢, 判斷無效日期, 返還'Invalid Date'
 * {"stat":"很抱歉，沒有符合條件的資料!" 或 "stat":"OK"}
 * 判斷抓取到到的資料非交易日, 返還'No Trading'
// 
// 

// 模組輸出參考
// export { playWith, Animal }
// export default Dog

url
市場每日收盤行情
https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&type=ALLBUT0999&date=20220118
上市股票日成交資訊
http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&stockNo=2330&date=20211226
除權除息計算結果表
https://www.twse.com.tw/exchangeReport/TWT49U?response=html&strDate=20220101&endDate=20221201
奇摩個股日價格資訊
https://finance.yahoo.com/quote/2520.TW/history?period1=1643040000&period2=1643191200&interval=1d&filter=history&frequency=1d&includeAdjustedClose=true
https://query1.finance.yahoo.com/v7/finance/download/2520.TW?period1=1640966400&period2=1643385600&interval=1d&events=history&includeAdjustedClose=true
資料較簡略但方便大範圍查詢, 且可以查詢TW TWO TWN
    var myDate = new Date(2022,0,26,18,0,0,0);
    demo.innerText = myDate.getTime();
    // 查詢起訖日要轉換成1970時間戳記(單位:秒)
    // 2022/1/25 2022/1/26 1643040000 1643126400
    // 1643126400 是 2022/1/26 00:00:00 所以查不到2022/1/26收盤資料
    // 迄日索性自動+1天 2022/1/27

興櫃股票日成交資訊
http://www.gretai.org.tw/storage/emgstk/ch/new.csv

上市清單
https://isin.twse.com.tw/isin/C_public.jsp?strMode=2
上櫃清單
https://isin.twse.com.tw/isin/C_public.jsp?strMode=4
興櫃清單
https://isin.twse.com.tw/isin/C_public.jsp?strMode=5

setTimeout():
https://www.golinuxcloud.com/how-node-js-settimeout-works/#:~:text=The%20Node.js%20setTimeout%20function%20is%20built%20in%20the,delay%20argument%20is%20omitted%2C%20it%20defaults%20to%200.

// var urlStockNow = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?json=1&delay=0&ex_ch=tse_${stockId}.tw`
// https://mis.twse.com.tw/stock/api/getStockInfo.jsp?json=1&delay=0&ex_ch=tse_2330.tw|tse_0050.tw|

*************************************/