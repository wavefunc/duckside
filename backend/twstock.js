/* * 抓取外部股票及價格資料 * *
 * 
 * class 物件類別
 * 1. twseMarketInfo
 * 透過getTwse取得的物件實體, 是依照twseMarketInfo物件類別所造, 
 * 其下有各種方法及屬性, 丟入股票名稱或代號字串作為參數, 將回傳該天該股票的資料
 *  stockId(IdStr) 回傳股號
 *  stockName(IdStr) 回傳股名
 *  volShare(IdStr) 回傳成交量
 *  volDeal(IdStr) 回傳成交筆數
 *  volDollar(IdStr) 回傳成交金額
 *  priceOpen(IdStr) 回傳開盤價
 *  priceHigh(IdStr) 回傳最高價
 *  priceLow(IdStr) 回傳最低價
 *  priceClose(IdStr) 回傳收盤價
 *  changeNet(IdStr) 回傳漲跌(浮點數)
 *  ratioPE(IdStr) 回傳本益比
 *  fields屬性 欄位名稱(表頭)(陣列)
 *  date屬性 資料日期(字串)
 * 
 * 2. yahooStockDay
 * 透過getYahoo取得的物件實體, yahooStockDay物件類別所造, 
 * 其下各種屬性存放有關於該股票在這區間的資料陣列
 *  data 原始資料轉陣列(一列存成一個element, 欄位間以逗號分開)
 *  fields 原始資料欄位名稱(表頭)
 *  Ymd 日期陣列(字串格式YYYYMMDD)
 *  dates 日期陣列(字串格式YYYY-MM-DD)
 *  priceOpen 開盤價
 *  priceHigh 最高價
 *  priceLow 最低價
 *  priceClose 收盤價
 *  priceCloseAdj 收盤價(還原)
 *  volShare 成交量
 *  priceCloseChangeNet 漲跌(正負數, 四捨五入到小數點後第二位)
 *  priceCloseChangeDir 當天收盤方向(0收平 1收漲 -1收跌)
 *  priceDaytimeMoveDir 盤中價格走向(0開盤=收盤 1走高 -1走低)
 *  candleShadow 畫技術線圖用, [最低價, 最高價]組成的二維陣列
 *  candleBody 畫技術線圖用, [開盤價, 收盤價]組成的二維陣列
 * 
 * 
 * Function 函式
 * 1. getYahoo(stockId [, period1, period2]) 抓取個股股價資料 
 * stockId 證券代號數值或字串
 * period1 period2 日期區間數值或字串(YYYYMMDD)
 *  如沒給 period2, 會抓取period1當天收盤資料, 盤中則抓取即時資料
 *  如沒給 period1, period2, 會抓取最新資料, 盤中則抓取即時資料
 *  如果查無資料, 會找最近一天收盤資料 (程式會往前抓一天, 重複請求直到有資料為止)
 * 註: 查詢某股票在某期間的所有股價資料, 期間長的情況下用這個方法較快
 * 
 * 2. 抓取某天全市場股價資料: getTwse([Ymd])
 * Ymd 字串格式 YYYYMMDD 傳入想要查詢的日期, 查詢當天全市場資料
 * 如沒給參數, 就查詢最近一日
 * 如果查無資料, stat屬性會存放"No Trading", 程式會往前抓一天, 重複請求直到有資料為止
 * 
 * 3. 抓取某股當月的股價日資料 getTwse([Ymd, stockId, periods])
 * Ymd 字串格式 YYYYMMDD 傳入查詢的日期
 * stockId 證券代號字串, 查詢該股在該月的成交日資料
 * perioeds 傳入數值是決定要調幾個月份資料
 * 註: 因為短時間頻繁請求會擋ip, 需設延遲, 所以此方法較慢
 * 
 * 模組
 * axios: 模擬 Client 訪問網站，並設定訪問時所攜帶的Header
 * date-and-time: a minimalist collection of functions for manipulating JS date and time module which is used to format the date according to a certain pattern. 
 * data-forge: JavaScript data wrangling, transformation and analysis toolkit
 * cheerio: node.js界的jQuery
 * 
 */

const axios = require("axios");
const dt = require('date-and-time');
const { json } = require("express");

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

// 先定義好從證交所抓取資料時常使用的架構
// 抓股價資料時傳入必要參數做出物件實體存放資料查詢結果
class twseMarketInfo {
    // 查詢某日期的最近一日市場行情日資料
    constructor(Ymd) {
        this._date = Ymd;
        this.url = `http://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&type=ALLBUT0999&date=${Ymd}`;
        this.responsePromise = axios(this.url);  // (default) responseType: 'json', method: 'get', 
        // https://bytearcher.com/articles/asynchronous-call-in-constructor/
        // Note: performing an asynchronous call to its completion in the constructor is not an option,
    }
    async initialize() {
        try {
            var res = await this.responsePromise;
            if (res.data.stat !== "OK") {
                this.stat = "No Trading";
            } else {
                var data = transpose(res.data.data9);
                // 資料量大, 只以字串存放, 不全部轉成數值
                this.stat = res.data.stat;
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
        } catch {
            this.stat = "our IP is blocked";
        }
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
    // 查詢個股成交資訊
    constructor(Ymd, stockId, periods = 1) {
        this._stockId = stockId;
        this._periods = periods;
        this.url = `http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${Ymd}&stockNo=${stockId}`;
        var getUrl = (Ymd) => `http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${Ymd}&stockNo=${stockId}`;
        this.responsePromise = [];
        var period = dt.parse(Ymd, 'YYYYMMDD', true);
        var manyRequest = async function (ms) {
            for (var i = 0; i <= this._periods; i++) {
                // console.log(`requestData${i + 1}: ${Ymd}`);
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
        // console.log("init");
        try {
            var res = await this.responsePromise;
        } catch (e) {
            console.log(`this.data = error.response.data = ${e.response.data}`)
            this.data = e.response.data;
            return;
        }
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
        }, this.priceClose);
        this.priceCloseChangeDir = this.priceCloseChangeNet.map(e => Math.sign(e));
        this.priceDaytimeMoveDir = this.priceClose.map((v, i) => Math.sign(v - this.priceOpen[i]));
        this.candleShadow = this.priceHigh.map((v, i) => [this.priceLow[i], v]);
        this.candleBody = this.priceClose.map((v, i) => [this.priceOpen[i], v]);
    }
}

async function getTwse(Ymd, stockId, periods) {
    Ymd = (Ymd !== undefined) ? Ymd.toString() : dt.format(new Date(), 'YYYYMMDD');
    let MI = {};
    if (isNaN(dt.parse(Ymd, 'YYYYMMDD'))) {
        return 'Invalid Date'
    }
    if (stockId) {
        stockId = stockId.toString();
        MI = new twseStockDay(Ymd, stockId, periods);
        await MI.initialize();
        return MI;
    } else {
        do {
            MI = new twseMarketInfo(Ymd);
            await MI.initialize();
            Ymd = dt.format((dt.addDays(dt.parse(Ymd, 'YYYYMMDD'), -1)), 'YYYYMMDD');
        } while (MI.stat === "No Trading");
        console.log(`twstock.js: marketInfo資料抓取狀態: ${MI.stat}`);
        return MI;
    }
}
async function getYahoo(stockId, period1, period2) {
    var stockDay = {};
    if (period1 == undefined) {
        period1 = parseInt(Date.now() / 1000) - 86400;
        period2 = parseInt(Date.now() / 1000);
        // 1. 查詢起訖日需轉換成1970時間戳記(但單位是秒，不是毫秒)
        // 2. 如果在連假抓資料又不給日期參數, 會抓不到資料
    } else {
        period1 = dt.parse(period1.toString(), 'YYYYMMDD').getTime() / 1000;
        period2 =
            (period2 == undefined) ?
                period1 + 86400 :
                dt.parse(period2.toString(), 'YYYYMMDD').getTime() / 1000 + 86400;
        // 2. 如參數給 20220125 20220126 會因為迄時 2022/1/26 00:00:00 而查不到1/26資料
        // 處理方法: 自動將迄時加1天, 抓取至2022/1/27 00:00:00
    }
    do {
        // console.log(period1);
        // console.log(period2);
        if (isNaN(period1) || isNaN(period2)) {
            console.log('Invalid Date...');
            return 'Invalid Date...';
        } else {
            stockDay = new yahooStockDay(stockId.toString(), period1, period2);
            await stockDay.initialize();
        }
        period1 = period1 - 86400;
        console.log(stockDay.data === '404 Not Found: Timestamp data missing.');
    } while (stockDay.data === '404 Not Found: Timestamp data missing.');

    // 偶爾遇到此錯誤導致抓不到資料, 尚不知原因為何: 404 Not Found: No data found, symbol may be delisted

    return stockDay;
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



module.exports.getYahoo = getYahoo;
module.exports.getTwse = getTwse;


/*************** note ****************
 * 單日查詢, 判斷無效日期, 返還'Invalid Date'
 * {"stat":"很抱歉，沒有符合條件的資料!" 或 "stat":"OK"}
 * 判斷抓取到到的資料非交易日, 返還'No Trading'

// 待測試: 爬證交所查詢個股多個月股價日成交資料時, daley要下幾毫秒才不會被擋IP?
// getTwse(20220101, 9933, 12).then(function (MI) {
//     console.log(MI.fields);
//     console.log(MI.priceClose());
// });

// 模組輸出範例
// export { playWith, Animal }
// export default Dog

url
市場每日收盤行情
https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&type=ALLBUT0999&date=20220118
上市股票日成交資訊
http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&stockNo=2330&date=20211226
除權除息計算結果表
https://www.twse.com.tw/exchangeReport/TWT49U?response=html&strDate=20220101&endDate=20221201

奇摩個股歷史日成交資訊
https://finance.yahoo.com/quote/2520.TW/history?period1=1643040000&period2=1643191200&interval=1d&filter=history&frequency=1d&includeAdjustedClose=true
奇摩個股日價格資訊(可抓盤中)
https://finance.yahoo.com/quote/2520.TW/history?period1=1643040000&period2=1643191200&interval=1d&filter=history&frequency=1d&includeAdjustedClose=true
https://query1.finance.yahoo.com/v7/finance/download/2520.TW?period1=1640966400&period2=1643385600&interval=1d&events=history&includeAdjustedClose=true
資料較簡略但方便大範圍查詢, 且可以查詢TW TWO TWN

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