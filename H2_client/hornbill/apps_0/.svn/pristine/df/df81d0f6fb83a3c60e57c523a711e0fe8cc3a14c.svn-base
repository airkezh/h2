/*common*/
require('wap/zepto')
require('wap/zepto/fastclick');

var urlHandle = require("wap/component/urlHandle");
var openApp = require('wap/app/openApp');
var shareTmp = require('wap/component/shareTmp');
var cd = require("wap/app/countdown2");
var confirm = require('wap/ui/confirm');
var cookie = require('component/iStorage');
var signWX = require('wx/sign')
var shareWX = require('wx/share')

if (urlHandle.getParams(window.location.search).isFromShare) {
    openApp('http://' + window.location.host +  '/activity/sale_1503/wallet_act/');
}

signWX();
shareWX.bind(fml.vars.shareData);
initCountDown();


window.MLS = {
    didLogin : function() {
        // 成功登录，重新加载页面
        window.location.reload();
    }
};

$(".js_recharge").on("click", function() {
    if (urlHandle.getParams(window.location.search).isFromShare) {
        openApp('http://' + window.location.host +  '/activity/sale_1503/wallet_act/');
        return;
    }
    if (!fml.vars.isSupportVersion) {
        new confirm({
            content : '小主您的美丽说版本太低，无法使用钱包功能，点击确定下载最新版本！'
            , onSure : function(){
                window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo"
            }
            , onCancel : function(){
                return;
            }
        });
    } else if (fml.vars.isLogin == 0) {
        window.location.href = "meilishuo://login.meilishuo";
    } else if (fml.vars.wallet == 0) {
        if (fml.vars.isSetMobile != 1) {
            window.location.href = 'https://zhifu.meilishuo.com/security/#/bindmobile/activity';
        } else {
            window.location.href = 'https://zhifu.meilishuo.com/security/#/setpassword/activity';
        }
    } else {
        var url = 'meilishuo://purse.meilishuo' ;
        window.location.href = url;
    }

})

function initCountDown() {
    var currDate = new Date();
    var  currTime = currDate.getTime()/1000;
    var startTime = new Date("2015-03-05").setHours(10)/1000;
    var endTime = new Date("2015-03-10").setHours(0)/1000;

    var $cd = $(".timeStamp");
    var $bt = $(".cdText");
    if (currTime < startTime) { //活动预热
        $bt.text("距离活动开始");
        $cd.attr("end-date", startTime);
        $cd.attr("now", currTime);
        cd();

    } else if (currTime >= endTime) { //活动结束
        $bt.text("活动结束");
        $bt.css({"position":"absolute", "top":"2%", "width" : "100%", "text-align" : "center"});
        $(".timeStamp").hide();

    } else if (currTime >= startTime) { //活动开始
        $bt.text("充值送券活动仅剩");
        $cd.attr("end-date", endTime);
        $cd.attr("now", currTime);
        cd();
    }
}

var ruleData;
//活动规则数据
$.post("/aj/huodong/main_venue_rule",{"actid": 61}, function(data) {
    //console.log(JSON.stringify(data));
    if (data.code == 0) {
        ruleData = data.data;
    }
}, "json");

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

$(".my-coupon").on("click", function(e) {
    e.preventDefault();
    if (fml.vars.isLogin == 0) {
        window.location.href = "meilishuo://login.meilishuo";
    } else {
        window.location.href = "meilishuo://coupons.meilishuo";
    }
})

//remind({title : "可以使用美丽说优惠券啦", calendarStartTime : "2015-03-17 20:00:00", calendarEndTime : "2015-03-20 23:59:59"});
function remind (opt) {
    if (cookie.getCookie("remind") == 'on_01') {
        $(".remind_switch").addClass("remind_o");
    } else if (cookie.getCookie("remind") != "off_01") {
        cookie.setCookie("remind", "on_01", {"duration" : 3600*24*10});
        $(".remind_switch").addClass("remind_o");
        ios_calendar_event(true);
    }

    $(".remind_switch").on("click", function() {
        $(this).toggleClass("remind_o");
        if ($(this).hasClass("remind_o")) {
            cookie.setCookie("remind", "on_01", {"duration" : 3600*24*10});
            ios_calendar_event(true);
        } else {
            cookie.setCookie("remind", "off_01", {"duration" : 3600*24*10});
            ios_calendar_event(false);
        }
    });

    function ios_calendar_event (state) {
        var title = opt.calendarTitle;
        var sTime = opt.calendarStartTime;
        var eTime = opt.calendarEndTime;
        if (!title || !sTime || !eTime) {
            return;
        }
        var alarmOffset = 0;
        var recurrenceType = 0;
        if (state) {
            var jsonParams='{"actionType":"add","eventTitle":'+'"'+title+'"'+', "startTime":'+'"'+sTime+'"'+',"endTime":'+'"'+eTime+'"'+',"alarmOffset":'+'"'+alarmOffset+'"'+',"recurrenceType":'+'"'+recurrenceType+'"'+'}';
        } else {
            var jsonParams='{"actionType":"remove","eventTitle":'+'"'+title+'"'+'}';
        }

        window.location.href = 'meilishuo://calendar_event.meilishuo?json_params=' + encodeURIComponent(jsonParams);
    }
}





