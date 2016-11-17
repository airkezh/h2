/*common*/

/**
 * @fileoverview 首页 － 签到领优惠券
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-05-08
 */

require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var confirm = require('wap/ui/confirm');
var openApp = require('wap/app/openApp');
var shareTmp = require('wap/component/shareTmp');

// 登陆成功后的回调函数
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var initPage = {
    'oCouponWrap': $('.coupon_wrap'),
    'oTotalAward': $('#j_total_award'),

    // 初始化页面
    'init': function(){
        var self = this;

        if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
            openApp(window.location.href);
        }

        self.renderHtml();
        self.initEvent();
    },

    'renderHtml': function(){
        var self = this;

        self.oCouponWrap.append(shareTmp('j_coupon_tpl', fml.vars.couponsData));
    },

    // 初始化事件
    'initEvent': function(){
        var self = this;

        // 领取优惠券
        $('.coupon_wrap').on('click', '.coupon', function(){
            var that = $(this),
                type = that.attr('data-type') || 2,
                price = that.attr('data-price') || 0,
                curTotalAward = parseInt(self.oTotalAward.text() || 0);

            if (that.hasClass('robbed') || (price == 0) || (that.attr('loading') == 1)) {
                return;
            }

            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            if (curTotalAward < price) {
                self.alertCbk('你的金币不够哦，快去签到赚金币吧！');
                return;
            }

            that.attr('loading', 1);

            var opts = {
                'url': '/aw/sign/exchange',
                'type': type,
                'price': price,
                'callback': self.loadingCallBack(that)
            };

            var c = new confirm({
                content: '兑换成功后将扣除' + price + '元金币',
                onSure: function(){
                    // 兑换优惠券
                    self.sendAjaxRequest(opts);
                },
                onCancel: function(){
                    return;
                }
            });
        });
    },

    'sendAjaxRequest': function(opts){
        var self = this,
            url = opts.url || '',
            type = opts.type || 2,
            price = opts.price || 0;

        if (url == '') {
            (typeof opts.callback == 'function') && opts.callback();
            return;
        }

        // 兑换优惠券
        $.ajax({
            url: url,
            data: {
                'type': type,
                'price': price
            },
            type: 'post',
            dataType: 'json',
            success: function(data){
                if (data.code == 0) {
                    self.reduceAward(price);
                    self.alertCbk('兑换成功！');
                } else {
                    self.alertCbk(data.message);
                }

                (typeof opts.callback == 'function') && opts.callback();
            },
            error: function(){
                self.alertCbk('服务器开小差中...请稍后再试~');

                (typeof opts.callback == 'function') && opts.callback();
            }
        });
    },

    'reduceAward': function(price){
        var self = this,
            curTotalAward = parseInt(self.oTotalAward.text() || 0),
            lastTotalAward = curTotalAward - price;

        (lastTotalAward >= 0) && self.oTotalAward.html('&nbsp;&nbsp;&nbsp;' + lastTotalAward);
    },

    'alertCbk': function(content){
        var alt = new Alert({
            content: content,
            onSure: function(){
                return;
            }
        });
    },

    'loadingCallBack': function(that){
        that.attr('loading', 0);
    }
};

// 初始化页面
initPage.init();
