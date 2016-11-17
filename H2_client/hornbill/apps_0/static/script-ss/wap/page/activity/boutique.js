fml.use('wap/page/audio');
fml.define("wap/page/activity/boutique", ["wap/component/lazyLoad", "wap/zepto", 'wap/zepto/touch', "wap/app/countdown2"], function (require, exports) {
    var lazyLoad = require('wap/component/lazyLoad');
    lazyLoad.load($('.bs_load_img'), 'asrc');
});