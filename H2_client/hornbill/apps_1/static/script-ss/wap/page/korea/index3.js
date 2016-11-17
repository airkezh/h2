/*common*/

/**
 * @fileoverview 首页 － 韩国馆三期
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-02-04
 */

require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
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
        self.initEvent();
    },

    // 初始化事件
    'initEvent': function(){
        var self = this;

        /*$('html, body').on('scroll', function(e){
            e.preventDefault();
        });*/

        onscroll.bind(self.goToTop, 'gotop_wrap');

        $('.gotop').on('click', function(){
            $('html,body').scrollTo({
                endY: 0,
                updateRate: 5
            });
        });

        self.oParentNode.find('.js_reload').on('click', function(){
            //self.oParentNode.find('.error_msg').hide();
            //self.oParentNode.find('.pullUp').show();
            window.location.reload();
        });
    },

    'renderHtml': function(){
        var self = this;

        if (fml.vars.page_data) {
            var bannersTpl = shareTmp('rec_banner_tpl', {'data': fml.vars.page_data});

            self.oParentNode.find('.pullUp').before(bannersTpl);
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

        // 显示分享
        $('.starBox').show();
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
    }
};

// 初始化页面
initPage.init();
