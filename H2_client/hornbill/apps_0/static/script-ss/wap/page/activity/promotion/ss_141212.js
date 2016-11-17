fml.define("wap/page/activity/promotion/ss_141212", ['wap/app/countdown2'], function (require, exports) {
    var cd = require("wap/app/countdown2");
    initCountDown();
    function initCountDown() {
        var currDate = new Date();
        var  currTime = currDate.getTime()/1000;
        var startTime = new Date("2014-12-11").setHours(20)/1000;
        var endTime = new Date("2014-12-15").setHours(0)/1000;



        var $cd = $(".timeStamp");
        var $bt = $(".bannerText");
        if (currTime < startTime) { //活动预热
            $bt.text("距离1212年末犒劳节开抢");
            $cd.attr("end-date", startTime);
            $cd.attr("now", currTime);
            cd();

        } else if (currTime >= endTime) { //活动结束
            $bt.text("活动结束");
            $bt.css({"position":"absolute", "top":"2%", "width" : "100%", "text-align" : "center"});
            $(".timerArea").hide();

        } else if (currTime >= startTime) { //活动开始
            $bt.text("距离活动结束");
            $cd.attr("end-date", endTime);
            $cd.attr("now", currTime);
            cd();
        }
    }
});
