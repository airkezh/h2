/*common*/
require('wap/zepto')
require('wap/zepto/fastclick');
var shareTmp = require('wap/component/shareTmp');
var lazyLoad = require('wap/component/lazyLoad')
var urlHandle = require("wap/component/urlHandle");
var cd = require("wap/app/countdown2");
var sidebar = require("wap/page/activity/promotion/sidebar");
var urlHandle = require("wap/component/urlHandle");

clientJudge();
function clientJudge() {
    if (/android/i.test(navigator.userAgent)){
        //  $(".jigsaw").hide();
    }

    if (/ipad|iphone|mac/i.test(navigator.userAgent)){
        $(".jigsaw").show();
    }
}



var rootUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/11/meet/";

lazyLoad.load($('.bs_load_img'), 'asrc');

initCountDown();
function initCountDown() {
    var currDate = new Date();
    var  currTime = currDate.getTime()/1000;
    var startTime = new Date("2015-01-20").setHours(10)/1000;
    var endTime = new Date("2015-01-28").setHours(0)/1000;



    var $cd = $(".timeStamp");
    var $bt = $(".bannerText");
    if (currTime < startTime) { //活动预热
        $bt.text("距离活动开始");
        $cd.attr("end-date", startTime);
        $cd.attr("now", currTime);
        cd();

    } else if (currTime >= endTime) { //活动结束
        $bt.text("活动结束");
        $bt.css({"position":"absolute", "top":"2%", "width" : "100%", "text-align" : "center"});
        $(".timerArea").hide();

    } else if (currTime >= startTime) { //活动开始
        $bt.text("距离精品2折清仓结束");
        $cd.attr("end-date", endTime);
        $cd.attr("now", currTime);
        cd();
    }
}


/*sidebar.build({
 "picRootUrl" : Meilishuo.config.picture_url + "images/wap/activity/promotion/1220/sidebar/s",
 "sidebars" : sidebarData.data
 });*/

//侧边栏数据
$.post("/aj/huodong/navi_data", {"actid" : 59}, function(data) {
    sidebar.build({
        "picRootUrl" : Meilishuo.config.picture_url + "images/wap/activity/promotion/1220/sidebar/s",
        "sidebars" : data.data.navis,
        "sidebarBtn" : {"header" : data.data.header, "back" : data.data.back}
    });
}, "json");

var ruleData;
//活动规则数据
$.post("/aj/huodong/main_venue_rule",{"actid": 59}, function(data) {
    if (data.code == 0) {
        ruleData = data.data;
    }
}, "json");

//活动规则
//活动规则
$(".rule").on("click", function() {
    if (ruleData) {
        var tpl = shareTmp('rule_tpl',{"ruleData" : ruleData});
        $("body").append(tpl);
    }

});

$("body").on("click", ".rule_dialog_btn", function() {
    $(".rule_dialog").remove();
    $(".shade").remove();
});

$("body").on("click", ".rule_close_btn", function() {
    $(".rule_dialog").remove();
    $(".shade").remove();
});


var openApp = require('wap/app/openApp');
$('.intro_page').click(function(e){
    if (urlHandle.getParams(window.location.search).isFromShare) {
        openApp('http://m-promotion.meilishuo.com/promotion/sale_141212/coupon/');
    } else {
        window.location.href = "/promotion/sale_141212/coupon/";
    }
    e.preventDefault();
});





