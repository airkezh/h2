/*common*/

/**
 * @fileoverview 首页 － 签到领优惠券
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2014-12-18
 */

require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var confirm = require('wap/ui/confirm');
var openApp = require('wap/app/openApp');
var shareTmp = require('wap/component/shareTmp');

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

        self.oCouponWrap.append(shareTmp('j_coupon_tpl', fml.vars.coupons_data));
    },

    // 初始化事件
    'initEvent': function(){
        var self = this;

        var loadingCallBack = function(that){
            that.attr('loading', 0);
        };

        // 点击查看优惠券按钮
        $('body').on('click', '.view_coupon_btn', function(){
            self.removeLayer();
            window.location.href = 'meilishuo://coupons.meilishuo';
        });

        // 点击移除浮层按钮
        $('body').on('click', '.close_coupon_btn', function(){
            self.removeLayer();
            //window.location.reload();
        });

        // 领取优惠券
        $('.coupon_wrap').on('click', '.coupon', function(){
            var that = $(this),
                type = that.attr('data-type') || 1,
                price = that.attr('data-price') || 0;

            if (that.hasClass('robbed') || (price == 0)) {
                return;
            }

            var opts = {
                'url': '/aw/sign/redeem',
                'type': type,
                'price': price,
                'callback': loadingCallBack(that)
            };

            if (type == 1) {
                if (that.attr('loading') == 1) {
                    return;
                }

                that.attr('loading', 1);

                // 兑换优惠券
                self.sendAjaxRequest(opts);
            } else {
                var c = new confirm({
                    content: '兑换成功后将扣除' + price + '元奖金',
                    onSure: function(){
                        // 兑换优惠券
                        self.sendAjaxRequest(opts);
                    },
                    onCancel: function(){
                        return;
                    }
                });
            }
        });
    },

    'sendAjaxRequest': function(opts){
        var self = this,
            url = opts.url || '',
            type = opts.type || 1,
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
                if (type == 1) {
                    if (data.code == 0) {
                        self.reduceAward(price);
                        self.redeemSuccessCbk(price);
                    } else {
                        self.alertCbk(data.tips);
                    }
                } else {
                    self.alertCbk(data.tips);
                    (data.code == 0) && self.reduceAward(price);
                }

                (typeof opts.callback == 'function') && opts.callback();
            },
            error: function(){
                self.alertCbk('系统繁忙！');

                (typeof opts.callback == 'function') && opts.callback();
            }
        });
    },

    'reduceAward': function(price){
        var self = this,
            curAward = parseInt(self.oTotalAward.text() || 0),
            lastAward = curAward - price;

        (lastAward >= 0) && self.oTotalAward.text(lastAward);
    },

    'alertCbk': function(content){
        var alt = new Alert({
            content: content,
            onSure: function(){
                return;
            }
        });
    },

    'redeemSuccessCbk': function(price){
        var tpl = shareTmp('j_coupon_layer', {'coupon_price': price});
        $('body').append(tpl);
    },

    'removeLayer': function(){
        $('.layer_shade').remove();
        $('.layer_main').remove();
    }
};

// 初始化页面
initPage.init();
