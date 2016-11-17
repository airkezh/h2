/*common*/

/**
 * @fileoverview 首页 － 签到商城
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2014-12-04
 */

require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var posLoad = require('wap/component/lazyLoad');
var shareTmp = require('wap/component/shareTmp');
var scroll = require('wap/component/windowScroll');

var pullUp_top = 0;
var pullUp = $('.pullUp');
var pin = $('.goods_wall');
var win_h = $(window).height();

var opts = {
    'cid': fml.vars.cur_cid,
    'page': 2,
    'size': 20,
    'url': '/aj/storeGoods/list'
};

var scrollPoster = function(opts){
    var url = opts.url,
        isPosterLoad = true,
        box = opts.box || $('.goods_wall'),
        data = {
            'cid': opts.cid,
            'size': opts.size,
            'page': opts.page
        };

    scroll.bind(function(pos, isDown){
        if (isDown) {
            pullUp_top = pullUp[0].getBoundingClientRect().top;

            if ((pullUp_top - 100 <= win_h) && isPosterLoad) {
                isPosterLoad = false 
                pullUp.attr('status', 'loading');

                $.get(url, data, function(res){
                    if (res.data.list.length == 0) {
                        pullUp.attr('status', 'stop');
                        return;
                    }

                    pullUp.attr('status', 'tap');

                    if (fml.vars.is_lazyload_poster) {
                        var posDom = $(shareTmp('posterWall', res));

                        posLoad.load(posDom.find('.lazy_pic'), 'asrc');
                        box.append(posDom);
                    } else {
                        box.append(shareTmp('posterWall', res));
                    }

                    fml.emit('posterFinsh');    //注册海报加载完成事件
                    data.page++;
                    isPosterLoad = true;
                }, 'json');
            }
        }
    }, 'scrollPoster');
};

var initPage = {
    // 初始化页面
    'init': function(){
        var self = this;

        if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
            openApp(window.location.href);
        }

        self.initEvent();
    },

    // 初始化事件
    'initEvent': function(){
        var self = this;

        scroll.bind(self.goToTop, 'gotop_wrap');

        $('.gotop').on('click', function(){
            $('html,body').scrollTo({
                endY : 0,
                updateRate: 5
            });
        });

        $('body').on('click', '.no_btn, .coupon_bg, .j_layer_shade', function(){
            self.removeLayer();
        });

        $('body').on('click', '.ok_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var that = $(this);

            if (that.attr('loading') == 1) {
                return;
            }

            self.removeLayer();

            var code = that.attr('code'),
                url = that.attr('url'),
                shopurl = that.attr('shopurl'),
                title = that.attr('title'),
                avater = that.attr('avater'),
                credit = that.attr('credit'),
                threshold = that.attr('threshold'),
                start = that.attr('start'),
                end = that.attr('end');

            if (code == '') {
                return;
            }

            that.attr('loading', 1);

            $.ajax({
                url: '/aj/redeemStoreCoupon/get',
                data: {
                    'code': code
                },
                type: 'post',
                dataType: 'json',
                success: function(data){
                    self.removeLayer();
                    that.attr('loading', 0);

                    var code = data.code;

                    if (code == 0) {
                        var jsonData = {
                                'url': url,
                                'shopurl': shopurl,
                                'title': title,
                                'avater': avater,
                                'credit': credit,
                                'threshold': threshold,
                                'start': start,
                                'end': end
                            },
                            tpl = shareTmp('j_convert_layer', {'data': jsonData});

                        $('body').append(tpl);
                    } else if (code == 400403) {
                        window.MLS = {
                            didLogin : function() {
                                window.location.reload();
                            }
                        };

                        window.location.href = 'meilishuo://login.meilishuo/';
                    } else {
                        var alt = new Alert ({
                            content : data.tips,
                            onSure : function(){
                                return;
                            }
                        });
                    }
                },
                error: function(){
                    that.attr('loading', 0);

                    var alt = new Alert ({
                        content : '系统繁忙！',
                        onSure : function(){
                            return;
                        }
                    });
                }
            });
        });

        // 优惠券领取
        $('.goods_wrap').on('click', '.coupon', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var that = $(this),
                code = that.attr('code') || '';

            if (that.hasClass('robbed') || (code == '')) {
                return;
            }

            var jsonData = {
                    'code': code,
                    'url': that.attr('url') || '',
                    'shopurl': that.attr('shopurl') || '',
                    'title': that.attr('title') || '',
                    'avater': that.attr('avater') || '',
                    'price': that.attr('price') || 0,
                    'credit': that.attr('credit') || 0,
                    'status': that.attr('status') || 0,
                    'threshold': that.attr('threshold') || 0,
                    'start': that.attr('start') || '',
                    'end': that.attr('end') || ''
                },
                tpl = shareTmp('j_coupon_layer', {'data': jsonData});
        
            $('body').append(tpl);
        });
    },

    'removeLayer': function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    },

    'goToTop': function(pos, isDown){
        var oGotopWrap = $('.gotop_wrap'),
            oGoodsBox = $('.goods_wrap').find('.new_box'),
            top = oGoodsBox.length ? oGoodsBox.offset().top : 10000;

        if (pos > top) {
            oGotopWrap.show();
        } else {
            oGotopWrap.hide();
        }
    }
};

if (Meilishuo.config.fallWall0 && Meilishuo.config.fallWall0.data && (Meilishuo.config.fallWall0.data.list.length > 0)) {
    if (fml.vars.is_lazyload_poster) {
        var posDom = $(shareTmp('posterWall', Meilishuo.config.fallWall0));

        posLoad.load(posDom.find('.lazy_pic'), 'asrc');
        pin.append(posDom);
    } else {
        pin.append(shareTmp('posterWall', Meilishuo.config.fallWall0));
    }

    setTimeout(function(){fml.emit('posterFinsh')}, 0);     //注册海报加载完成事件
    pullUp.attr('status', 'tap');
    delete Meilishuo.config.fallWall0;
}

// 初始化页面滚动加载
scrollPoster(opts);
// 初始化页面
initPage.init();

/*fml.on('posterFinsh', function(){
    
});*/
