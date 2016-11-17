/*common*/
var cc = require('wap/page/activity/promotion/common_coupon');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');

var opt = {
    startTime : new Date("2014-12-22").setHours(20)/1000,
    endTime : new Date("2014-12-26").setHours(0)/1000,
    picRootUrl : "http://i.meilishuo.net/css/images/wap/activity/promotion/1220/coupon/",
    cdPreStartText : "距离1212年末犒劳节开抢",
    cdStartText : "距离活动结束",
    cdEndText : "活动结束",
    calendarTitle : "亲，你的美丽说圣诞狂欢优惠券可以用了，快去抢3折圣诞好礼吧！",
    calendarStartTime : "2014-12-22 20:00:00",
    calendarEndTime : "2014-12-26 00:00:00",
    promotionMark : "christmas_141220"
}
cc.launch(opt);



