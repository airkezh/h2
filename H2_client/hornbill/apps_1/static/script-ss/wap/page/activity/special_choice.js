/*common*/

/**
 * @fileoverview 新人特供精选
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-01-22
 */

require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var funPage = require('h5/app/funPage');
var tracking = require('wap/app/tracking');
var shareTmp = require('wap/component/shareTmp');

window.funPage = funPage;

$.ajaxSettings.async = false;

var ajaxRequestPage = 2;
var ajaxOpts = {
    'size': 20,
    'url': '/aj/newcomer/list'
};
var USER_REG_VALIDITY_TIME = 7 * 24 * 60 * 60 * 1000;

// 登陆成功后的回调函数
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var initSpecialChoice = {
    'touchMoveTimer': null,
    'slideFlopCounter': 0,       // 滑动翻牌计数
    'curRecGoodsAmount': 0,      // 当前推荐商品数量
    'clickGuideLock': false,

    'init': function() {
        this.initPage();         // 初始化页面
        this.initEvent();        // 初始化事件绑定
    },

    'initPage': function() {
        var self = this;

        self.curRecGoodsAmount = curRecGoodsData.length;

        fml.vars.isGuide && $('body').append($('#j_guide_tpl').html());

        (self.curRecGoodsAmount > 0) && self.renderTpl(curRecGoodsData);
    },

    // 初始化事件绑定
    'initEvent': function() {
        var self = this;

        $('body').on('click', '.j_close_btn', function(){
            self.removeLayer();
        });

        $('body').on('click', '.swipe_pic', function(){
            var that = $(this),
                href = that.attr('data-link') || '',
                goods_id = that.attr('data-tid') || '';

            if ((href != '') && (goods_id != '')) {
                tracking.cr('draw_twitter_click', {'name': 'single_pic', 'goods_id': goods_id});

                window.location.href = href;
            }
        });

        $('body').on('click', '.j_shop_link', function(){
            var that = $(this),
                href = that.attr('data-link') || '',
                shop_id = that.attr('data-sid') || '',
                goods_id = that.attr('data-tid') || '';

            if ((href != '') && (shop_id != '') && (goods_id != '')) {
                tracking.cr('draw_shop_click', {'area': 'single_twitter', 'shop_id': shop_id, 'goods_id': goods_id});

                window.location.href = href;
            }
        });

        $('body').on('click', '.j_get_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var that = $(this),
                coupon_status = that.attr('data-status');

            if (coupon_status == 1) {
                if ((curServerTime - curUserRegTime) > USER_REG_VALIDITY_TIME) {
                    self.removeLayer();

                    $('body').append($('#j_failure_tpl').html());
                } else {
                    if (that.attr('loading') == 1) {
                        return;
                    }

                    that.attr('loading', 1);

                    var coupon_desc = '无门槛限制',
                        coupon_code = that.attr('data-code'),
                        shop_title = that.attr('data-title'),
                        coupon_credit = that.attr('data-credit'),
                        coupon_threshold = parseInt(that.attr('data-threshold') || 0);

                    if (coupon_threshold > 0) {
                        coupon_desc = '消费满' + coupon_threshold + '元可用';
                    }

                    $.ajax({
                        url: '/aj/newcomer/coupon',
                        data: {
                            'coupon_apply_code': coupon_code
                        },
                        type: 'post',
                        dataType: 'json',
                        success: function(data){
                            if (data.error_code == 0) {
                                self.removeLayer();

                                var curCouponData = {
                                        'shop_title': shop_title,
                                        'coupon_desc': coupon_desc,
                                        'coupon_credit': coupon_credit
                                    },
                                    couponTpl = $(shareTmp('j_success_tpl', {'couponData': curCouponData}));

                                self.removeLayer();

                                $('body').append(couponTpl);
                            } else if (data.error_code == 3) {
                                self.removeLayer();

                                $('body').append($('#j_limit_tpl').html());
                            } else {
                                var alt = new Alert ({
                                    content: data.message,
                                    onSure: function(){
                                        return;
                                    }
                                });
                            }

                            that.attr('loading', 0);
                        },
                        error: function(){
                            that.attr('loading', 0);

                            var alt = new Alert ({
                                content: '系统繁忙！',
                                onSure: function(){
                                    return;
                                }
                            });
                        }
                    });
                }
            } else {
                self.removeLayer();

                $('body').append($('#j_failure_tpl').html());
            }
        });

        $('body').on('click', '.guide_btn_box', function(){
            if (self.clickGuideLock) {
                return;
            }

            self.clickGuideLock = true;

            var that = $(this),
                oImg = that.siblings('img');

            if (that.hasClass('guide_end')) {
                var oLayerMain = $('.j_layer_main'),
                    oLayerShade = $('.j_layer_shade');

                oLayerMain.animate({'opacity': 0}, 500, function(){
                    $(this).hide().remove();
                });

                oLayerShade.animate({'opacity': 0}, 500, function(){
                    $(this).hide().remove();
                    self.clickGuideLock = false;
                });
            } else {
                oImg.animate({'opacity': 0}, 500, function(){
                    $(this).attr('src', curPictureUrlStr + 'images/wap/activity/special_choice/guide2.jpg').animate({'opacity': 1}, 1000, function(){
                        that.addClass('guide_end');
                        self.clickGuideLock = false;
                    });
                });
            }
        });

        $('body').on('click', '.like_btn', function(){
            var oCurFlop = funPage.get();

            if (oCurFlop.length > 0) {
                var oCurSwipe = oCurFlop.find('.swipe_pic');

                if (oCurSwipe.length > 0) {
                    var goods_id = oCurSwipe.attr('data-tid') || '';

                    oCurFlop.find('.swipe_dislike').animate({'opacity': 0}, 50);
                    oCurFlop.find('.swipe_like').animate({'opacity': 1}, 50);

                    oCurFlop.attr('status', 'clickdrop').css({'-webkit-transform':'translate(400%, 10%) translateZ(0)'});
                    self.initSlideFlop($('.swipe').eq(-(++self.slideFlopCounter)));

                    self.showCouponLayer(oCurSwipe);

                    if (self.slideFlopCounter > self.curRecGoodsAmount) {
                        self.getNextPageData();
                    }

                    tracking.cr('draw_like', {'action': 'click', 'name': 'like', 'goods_id': goods_id});

                    // 判断是否登陆
                    if (fml.vars.isLogin) {
                        $.post('/aw/twitter/like', {'stid': oCurSwipe.attr('data-gid')}, function(res){}, 'json');
                    }

                    var index = parseInt(oCurFlop.attr('data-index') || 0);

                    if (index > 1) {
                        var next_index = index - 2;

                        if (next_index > -1) {
                            var oNextSwipe = $('.swipe[data-index="' + next_index + '"]').find('.swipe_pic');

                            self.getExtGoodsData(oNextSwipe);
                        }
                    }
                }
            }
        });

        $('body').on('click', '.dislike_btn', function(){
            var oCurFlop = funPage.get();

            if (oCurFlop.length > 0) {
                var oCurSwipe = oCurFlop.find('.swipe_pic');

                if (oCurSwipe.length > 0) {
                    var goods_id = oCurSwipe.attr('data-tid') || '';

                    oCurFlop.find('.swipe_dislike').animate({'opacity': 1}, 50);
                    oCurFlop.find('.swipe_like').animate({'opacity': 0}, 50);

                    oCurFlop.attr('status', 'clickdrop').css({'-webkit-transform':'translate(-400%, 10%) translateZ(0)'});
                    self.initSlideFlop($('.swipe').eq(-(++self.slideFlopCounter)));

                    if (self.slideFlopCounter > self.curRecGoodsAmount) {
                        self.getNextPageData();
                    }

                    tracking.cr('draw_like', {'action': 'click', 'name': 'unlike', 'goods_id': goods_id});
                }

                var index = parseInt(oCurFlop.attr('data-index') || 0);

                if (index > 1) {
                    var next_index = index - 2;

                    if (next_index > -1) {
                        var oNextSwipe = $('.swipe[data-index="' + next_index + '"]').find('.swipe_pic');

                        self.getExtGoodsData(oNextSwipe);
                    }
                }
            }
        });
    },

    'getExtGoodsData': function(oSwipe) {
        var self = this,
            ajax_url = '/aj/newcomer/get',
            goods_id = oSwipe.attr('data-tid') || '';

        $.ajax({
            url: ajax_url,
            data: {
                'goods_id': goods_id
            },
            type: 'get',
            dataType: 'json',
            success: function(data){
                if (data.error_code == 0) {
                    var jsonData = data.data || null;

                    if (jsonData) {
                        var goods_rate = jsonData.rate || '－';

                        oSwipe.parents('.swipe').find('.j_goods_rate').text(goods_rate);
                    }
                }
            },
            error: function(){
                var alt = new Alert ({
                    content: '系统繁忙！',
                    onSure: function(){
                        return;
                    }
                });
            }
        });
    },

    'renderTpl': function(jsonRecData) {
        var self = this,
            goodsRateArr = [],
            ajax_url = '/aj/newcomer/get',
            first_goods_id = jsonRecData[0].twitter_goods_id || '',
            second_goods_id = jsonRecData[1].twitter_goods_id || '';

        $.ajax({
            url: ajax_url,
            data: {
                'goods_id': first_goods_id
            },
            type: 'get',
            dataType: 'json',
            success: function(data){
                if (data.error_code == 0) {
                    var jsonData = data.data || null;

                    if (jsonData) {
                        goodsRateArr.push(jsonData.rate || '－');

                        $.ajax({
                            url: ajax_url,
                            data: {
                                'goods_id': second_goods_id
                            },
                            type: 'get',
                            dataType: 'json',
                            success: function(data){
                                if (data.error_code == 0) {
                                    var jsonData = data.data || null;

                                    if (jsonData) {
                                        goodsRateArr.push(jsonData.rate || '－');

                                        var swipeTpl = $(shareTmp('j_swipe_tpl', {'goodsData': jsonRecData, 'extData': goodsRateArr}));

                                        $('.flop_wrap').html(swipeTpl);
                                        self.initSlideFlop($('.swipe').eq(-(++self.slideFlopCounter)));
                                        $('.pullUp').hide();
                                    }
                                }
                            },
                            error: function(){
                                var alt = new Alert ({
                                    content: '系统繁忙！',
                                    onSure: function(){
                                        return;
                                    }
                                });
                            }
                        });
                    }
                }
            },
            error: function(){
                var alt = new Alert ({
                    content: '系统繁忙！',
                    onSure: function(){
                        return;
                    }
                });
            }
        });
    },

    'initSlideFlop': function($outer) {
        var self = this;

        funPage.set($outer);

        var oSwipeLike = $outer.find('.swipe_like'),
            oSwipeDisLike = $outer.find('.swipe_dislike');

        funPage.moving(function(e, offset) {
            /*if (self.touchMoveTimer) {
                clearTimeout(self.touchMoveTimer);
            }*/

            //self.touchMoveTimer = window.setTimeout(function(){
                if (offset.xOri < 0) {
                    oSwipeLike.animate({'opacity': 0}, 100);
                    oSwipeDisLike.animate({'opacity': 1}, 100);
                } else {
                    oSwipeLike.animate({'opacity': 1}, 100);
                    oSwipeDisLike.animate({'opacity': 0}, 100);
                }
            //}, 10);
        });

        funPage.flyLeft(function() {
            var oCurFlop = funPage.get();

            if (oCurFlop.length > 0) {
                var oCurSwipe = oCurFlop.find('.swipe_pic');

                if (oCurSwipe.length > 0) {
                    var goods_id = oCurSwipe.attr('data-tid') || '';

                    self.initSlideFlop($('.swipe').eq(-(++self.slideFlopCounter)));

                    if (self.slideFlopCounter > self.curRecGoodsAmount) {
                        self.getNextPageData();
                    }

                    tracking.cr('draw_like', {'action': 'slither', 'name': 'unlike', 'goods_id': goods_id});
                }

                var index = parseInt(oCurFlop.attr('data-index') || 0);

                if (index > 1) {
                    var next_index = index - 2;

                    if (next_index > -1) {
                        var oNextSwipe = $('.swipe[data-index="' + next_index + '"]').find('.swipe_pic');

                        setTimeout(function(){
                            self.getExtGoodsData(oNextSwipe);
                        }, 16);
                    }
                }
            }
        });

        funPage.flyRight(function() {
            var oCurFlop = funPage.get();

            if (oCurFlop.length > 0) {
                var oCurSwipe = oCurFlop.find('.swipe_pic');

                if (oCurSwipe.length > 0) {
                    var goods_id = oCurSwipe.attr('data-tid') || '';

                    self.showCouponLayer(oCurSwipe);

                    self.initSlideFlop($('.swipe').eq(-(++self.slideFlopCounter)));

                    if (self.slideFlopCounter > self.curRecGoodsAmount) {
                        self.getNextPageData();
                    }

                    tracking.cr('draw_like', {'action': 'slither', 'name': 'like', 'goods_id': goods_id});
                }

                var index = parseInt(oCurFlop.attr('data-index') || 0);

                if (index > 1) {
                    var next_index = index - 2;

                    if (next_index > -1) {
                        var oNextSwipe = $('.swipe[data-index="' + next_index + '"]').find('.swipe_pic');

                        setTimeout(function(){
                            self.getExtGoodsData(oNextSwipe);
                        }, 16);
                    }
                }
            }
        });
    },

    'getNextPageData': function() {
        var self = this;

        $('.pullUp').show();
        $('.flop_wrap').html('');

        self.slideFlopCounter = 0;
        self.curRecGoodsAmount = 0;
        self.sendAjaxRequest(ajaxOpts);
    },

    'sendAjaxRequest': function(opts) {
        var self = this,
            page = ajaxRequestPage,
            size = opts.size || 20,
            url = opts.url || '/aj/newcomer/list';

        $.ajax({
            url: url,
            data: {
                'page': page,
                'size': size
            },
            type: 'post',
            dataType: 'json',
            success: function(data){
                if (data.error_code == 0) {
                    var jsonRecData = data.data || [];

                    self.curRecGoodsAmount = jsonRecData.length;

                    if (self.curRecGoodsAmount > 0) {
                        self.renderTpl(jsonRecData);
                    } else {
                        self.showDefaultLayer();
                    }

                    ajaxRequestPage++;
                }
            },
            error: function(){
                var alt = new Alert ({
                    content: '系统繁忙！',
                    onSure: function(){
                        return;
                    }
                });
            }
        });
    },

    'showDefaultLayer': function() {
        var self = this;

        self.removeLayer();

        $('.pullUp').hide();
        $('.flop_wrap').html('');
        $('body').append($('#j_default_tpl').html());
    },

    'showCouponLayer': function(oElement) {
        var self = this,
            coupon_status = oElement.attr('data-coustatus');

        if (coupon_status == 1) {
            var curCouponData = {
                    'goods_link': oElement.attr('data-link'),
                    'goods_price': oElement.attr('data-price'),
                    'goods_src': oElement.attr('data-src'),
                    'shop_title': oElement.attr('data-shoptitle'),
                    'coupon_code': oElement.attr('data-coucode'),
                    'coupon_status': coupon_status,
                    'coupon_credit': oElement.attr('data-coucredit'),
                    'coupon_threshold': oElement.attr('data-couthreshold')
                },
                couponTpl = $(shareTmp('j_coupon_tpl', {'couponData': curCouponData}));

            self.removeLayer();

            $('body').append(couponTpl);
        }
    },

    // 移除弹层
    'removeLayer': function() {
        $('.j_layer_main').remove();
        $('.j_layer_shade').remove();
    }
};

// 初始化页面
initSpecialChoice.init();
