// 上市收盤資料 https://www.twse.com.tw/exchangeReport/MI_INDEX?response=json&type=ALLBUT0999&date=20211202
// 上櫃收盤資料 https://www.tpex.org.tw/web/stock/aftertrading/otc_quotes_no1430/stk_wn1430_result.php?l=zh-tw&d=110/12/02&se=EW&s=0,asc,0&o=csv
// 興櫃收盤資料 http://www.gretai.org.tw/storage/emgstk/ch/new.csv"

(function($) {
    "use strict";

    $(function() {
        for (var nk = window.location, o = $(".nano-content li a").filter(function() {
                    return this.href == nk;
                })
                .addClass("active")
                .parent()
                .addClass("active");;) {
            if (!o.is("li")) break;
            o = o.parent()
                .addClass("d-block")
                .parent()
                .addClass("active");
        }
    });

    // Sidebar open close animated humberger icon
    $(".hamburger").on('click', function() {
        $(this).toggleClass("is-active");
    });


})(jQuery);