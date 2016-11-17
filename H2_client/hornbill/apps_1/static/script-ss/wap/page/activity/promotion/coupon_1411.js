fml.define("wap/page/activity/promotion/coupon_1411", ['wap/page/activity/promotion/common_coupon'], function (require, exports) {
    var cc = require('wap/page/activity/promotion/common_coupon');

    var opt = {
            startTime : new Date("2014-11-11").setHours(0)/1000,
            endTime : new Date("2014-11-12").setHours(0)/1000,
            picRootUrl : "http://i.meilishuo.net/css/images/wap/activity/promotion/11/coupon/",
            cdPreStartText : "距离活动开始",
            cdStartText : "距离活动结束",
            cdEndText : "活动结束",
            promotionMark : "rd_test"
        }

    cc.launch(opt);
});
