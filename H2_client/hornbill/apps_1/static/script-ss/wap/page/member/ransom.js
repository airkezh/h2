/*common*/

/**
 * @fileoverview 美美豆换好礼 － 会员中心
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-06-24
 */

require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var Swipe = require('wap/component/swipe');
var pin = require('wap/component/wapfall');
var lazy = require('wap/component/lazzyLoad');
var query = require('wap/component/urlHandle');
var shareTmp = require('wap/component/shareTmp');
var scroll = require('wap/component/windowScroll');

var oPullUp = $('.pullUp');
var oGoTopWrap = $('.gotop_wrap');
var win_width = $(window).width();
var win_height = $(window).height();
var ajaxRequestUrl = '/aj/member/getExchangeGoods';                         // 获取美美豆换好礼商品信息接口url

var urlData;
var pullUpAction;
var isPosterLoad = false;

// 登陆成功后的回调函数
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var posterWalls = {
    ajaxPoster: function(url){
        var self = this,
            paramObj = query.getParams(window.location.href.toString());

        isPosterLoad = false;
        oPullUp.attr('status', 'loading');
        $.extend(true, urlData, paramObj);

        $.get(url, urlData, function(res){
            self.loadPoster(urlData, res);
            fml.fireProxy('logPoster', res);
        }, 'json');
    },

    loadPoster: function(urlData, data){
        oPullUp.attr('status', 'tap');
        pin.append(shareTmp('posterWall', data));
        urlData.frame++;
        isPosterLoad = true;
    },

    scrollPoster: function(isscroll){
        function scrollPoster(pos, isDown){
            if (isDown) {
                var pullUp_top = oPullUp[0].getBoundingClientRect().top;

                if (isPosterLoad && ((pullUp_top - 100) <= win_height)) {
                    pullUpAction();
                }
            }
        }

        scroll.bind(scrollPoster, 'scrollPoster');
    },

    testPoster0: function(data, action){
        var poster0 = Meilishuo.config.poster0;

        urlData = data;
        pullUpAction = action;

        if (poster0 && (poster0.tInfo.length > 0)) {
            urlData.frame++;
            isPosterLoad = true;
        } else {
            pullUpAction(urlData);
        }
    }
};

var ransom = {
    // 初始化页面
    init: function(){
        if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
            openApp(window.location.href, '', '', true, 'member');
        }

        this.renderHtml();
        this.initEvent();
        this.posterWall(fml.vars.tid);
        this.lazyer = lazy.init({'xpath': '.bs_load_img'});
        this.lazyer.scroll();
    },

    renderHtml: function(){
        var tpl = shareTmp('j_swipe_tpl', {'data': curPageData});

        $('.mall_wrap').append(tpl);

        // 初始化组图滑动
        //this.imgSwipe('j_imgSwipe');
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            // 初始化组图滑动
            self.imgSwipe('j_imgSwipe');
        };

        scroll.yIn(60, function(){
            oGoTopWrap.show();
        },
        function(){
            oGoTopWrap.hide();
        });

        $('body').on('click', '.link_box', function(e){
            if (fml.vars.serverHours < fml.vars.activityHours) {
                var alt = new Alert ({
                    content : '每日' + fml.vars.activityHours + '点开放抢兑，先到先得，记得准时来哦～',
                    onSure : function(){
                        self.removeLayer();
                        return;
                    }
                });

                e.preventDefault();
            }
        });

        $('.gotop').on('click', function(){
            $('html,body').scrollTo({
                endY: 0,
                updateRate: 5
            });
        });

        // 关闭弹窗
        $('body').on('click', '.j_layer_shade', function(){
            self.removeLayer();
        });
    },

    posterWall: function(tid){
        var self = this,
            search = '',
            tid = tid || '';

        search = (ajaxRequestUrl.indexOf('?') >= 0 ? '&' : '?') + 'tid=' + tid + '&page=20';

        pin.init({
            containerId: '.goods_wall'
        });

        var ajaxData = {
                'frame': 1
            },
            pullUpFn = function() {
                posterWalls.ajaxPoster(ajaxRequestUrl + search);
            };

        Meilishuo.config.poster0 = '';
        posterWalls.testPoster0(ajaxData, pullUpFn);
        posterWalls.scrollPoster(true);

        fml.eventProxy('logPoster', function(res) {
            var jsonData = res.data;

            if (jsonData) {
                if (!jsonData.list.length) {
                    oPullUp.hide();
                } else {
                    oPullUp.show();
                }

                self.lazyer.load();
            }
        });
    },

    // 组图swipe
    imgSwipe: function(id){
        var obj = null,
            oSwipe = $('#' + id),
            oLi = oSwipe.children().eq(1).find('li'),
            oImg = oSwipe.children().eq(0).find('img'),

        obj = new Swipe(document.getElementById(id), {
            startSlide: 0,
            auto: 4000,
            speed: 300,
            //stopPropagation: true,
            callback: function(index, element){
                oLi.removeClass('active').eq(index).addClass('active');     // 焦点图当前状态
            }
        });
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    }
};

// 初始化页面
ransom.init();
