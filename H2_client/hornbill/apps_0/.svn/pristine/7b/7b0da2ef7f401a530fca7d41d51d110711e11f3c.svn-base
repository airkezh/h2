/*common*/

/**
 * @fileoverview 首页 － 韩国馆二期
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2014-11-06
 */

require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var api = require('wap/component/callApi');
var cookie = require('component/iStorage');
var openApp = require('wap/app/openApp');
var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var onscroll = require('wap/component/windowScroll');

var initPage = {
    'lazyPic': null,
    'oParentNode': $('.current_box'),

    // 初始化页面
    'init': function(){
        var self = this;

        if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
            openApp(window.location.href);
        }

        /* lazy load setting, 采用全屏扫点方式加载 */
        self.lazyPic = lazy.init({'xpath': '.lazy_pic'});
        self.lazyPic.scroll();
        self.renderHtml();

        if ((fml.vars.coupon_apply_code != '') && (cookie.getCookie('layer_coupon_apply_code') != '') && (cookie.getCookie('layer_coupon_apply_code') != fml.vars.coupon_apply_code)) {
            $('.act_info').show();

            cookie.removeCookie('layer_coupon_apply_code');
            // 标示优惠券弹层显示过
            cookie.setCookie('layer_coupon_apply_code', fml.vars.coupon_apply_code, {'duration': 3600 * 24 * 20});
        }

        self.initEvent();
    },

    // 初始化事件
    'initEvent': function(){
        var self = this;

        /*$('html, body').on('scroll', function(e){
            e.preventDefault();
        });*/

        onscroll.bind(self.goToTop, 'gotop_wrap');

        $('.act_info').find('.close').on('click', self.closeAct);

        $('.gotop').on('click', function(){
            $('html,body').scrollTo({
                endY : 0,
                updateRate: 5
            });
        });

        $('.scroll-btn-box').find('.hot-btn').on('click', function() {
            if ($('.hot-goods-title').offset()) {
                $('html,body').scrollTo({
                    endY: $('.hot-goods-title').offset().top,
                    updateRate: 10
                });
            }
        });

        self.oParentNode.find('.js_reload').on('click', function(){
            //self.oParentNode.find('.error_msg').hide();
            //self.oParentNode.find('.pullUp').show()
            window.location.reload();
        });

        // 优惠券领取
        $('.coupons').on('click', function(){
            self.checkApp();

            var that = $(this);

            if (that.hasClass('active')) {
                return;
            }

            var coupon_type = that.attr('type'),
                coupon_apply_code = that.attr('code');

            api.write({'url': '/coupon/coupon_apply'}, {'coupon_apply_code': coupon_apply_code}, function(res){
                if ((res.code == -1) && (res.message == '亲，你还没有登录哦～')) {
                    window.MLS = {
                        didLogin : function() {
                            window.location.reload();
                        }
                    };

                    window.location.href = 'meilishuo://login.meilishuo/';
                } else {
                    if (res.data && res.data.coupon_valid_time_range) {
                        var now = new Date();
                            time_range = res.data.coupon_valid_time_range,
                            curr_start = new Date(time_range.start_time.replace('-', '/').replace('-', '/')),
                            curr_end = new Date(time_range.expire_time.replace('-', '/').replace('-', '/')),
                            time = '有效期：'+ (curr_start.getMonth() + 1) + '/' + curr_start.getDate() + ' 10:00';

                        if ((curr_end - curr_start) > 24 * 3600 * 1000) {
                            if (curr_end.getHours() == 0) {
                                curr_end.setDate(curr_end.getDate() - 1);
                            }

                            time += ' - ' + (curr_end.getMonth() + 1) + '/' + curr_end.getDate() + ' 24:00';
                        } else {
                            time += ' - 24:00';
                        }

                        var tpl = shareTmp('coupon_alert', {'use_time': time, 'type': coupon_type});

                        $('body').append(tpl);
                        self.showMask();

                        that.addClass('active');
                        that.find('span').addClass('active').text('已领取');
                    } else {
                        if (res.message == '已经到达申领次数限制') {
                            res.message = '亲，您本场已领取过啦，一场只能领取一次哦';
                        }

                        var tpl = shareTmp('coupon_error', {'msg': res.message});
        
                        $('body').append(tpl);
                        self.showMask();
                    }
                }
            }, 'json');
        });

        if (!isNaN(fml.vars.act_time_diff) && (fml.vars.act_time_diff > 0)) {
            var offGoodsLink = function(e){
                e.preventDefault();
                return false;
            };

            $('.current_box').on('click', '.goods_units a', offGoodsLink);

            setTimeout(function(){
                $('.current_box').off('click', '.goods_units a', offGoodsLink);
            }, fml.vars.act_time_diff);
        }
    },

    'renderHtml': function(){
        var self = this;

        if (fml.vars.recommend_data) {
            var recommendTpl = shareTmp('nine_box', {'recommend': fml.vars.recommend_data, 'sale_time': fml.vars.sale_time});

            self.oParentNode.find('.pullUp').before(recommendTpl);
            self.lazyPic.load();

            self.oParentNode.find('.nine_box .goods').on('click', function(){
                var goods_id = $(this).data('id');

                if (!goods_id) {
                    return;
                }

                var oActiveBox = $(this).parents('.active_box');

                $('html,body').scrollTo({
                    endY : oActiveBox.find('.go_' + goods_id).offset().top - 5,
                    updateRate: 10
                });
            });
        }

        if (fml.vars.goods_data) {
            var goodsTpl = shareTmp('goods_units', {'goods': fml.vars.goods_data, 'global': fml.vars.global_data});

            self.oParentNode.find('.pullUp').before(goodsTpl);
        }

        if (fml.vars.hot_data) {
            var hotTpl = shareTmp('goods_hot', {'goods': fml.vars.hot_data});

            self.oParentNode.find('.pullUp').before(hotTpl);
        }

        self.oParentNode.find('.pullUp').hide();

        // 显示消保
        $('.xiaobao').show();
        // 显示分享
        $('.starBox').show();
    },

    'checkApp': function(){
        if (!Meilishuo.config.os.mlsApp) {
            return window.location.href = fml.vars.out_url;
        }
    },

    'closeAlert': function(){
        $('.mask').remove();
        $('.act_info').hide();
    },

    'closeAct': function(){
        $('.act_info').hide();
    },

    'goToTop': function(pos, isDown){
        var oGotopWrap = $('.gotop_wrap'),
            oGoodsUnits = $('.active_box').find('.goods_units'),
            top = oGoodsUnits.length ? oGoodsUnits.offset().top : 10000;

        if (pos > top) {
            oGotopWrap.show();
        } else {
            oGotopWrap.hide();
        }
    },

    'showMask': function(){
        var self = this;

        $('.close_btn').on('click', self.closeAlert);
        $('.mask').on('touchmove', function(e){
            e.preventDefault();
            return false;
        });
    }
};

// 初始化页面
initPage.init();
