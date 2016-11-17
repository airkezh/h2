/*common*/

/**
 * @fileoverview 首页－评价商品赚美美豆
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-12-28
 */

require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var pin = require('wap/component/wapfall');
//var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');

var urlData;
var pullUpAction;
var isFirstLoad = true;
var isPosterLoad = false;
var oPullUp = $('.pullUp');
var oGoTopWrap = $('.gotop_wrap');
var win_width = $(window).width();
var win_height = $(window).height();
var ajaxRequestUrl = '/aj/member/interfaces/getDetailList';
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

// 客户端app回调函数
window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var posterWalls = {
    ajaxPoster: function(url){
        var self = this,
            paramObj = urlHandle.getParams(window.location.href.toString());

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
        pin.append(shareTmp('goods_item_tpl', {'data': data, 'isFirstLoad': isFirstLoad}));
        urlData.frame++;
        isFirstLoad = false;
        isPosterLoad = true;
    },

    scrollPoster: function(isscroll){
        function scrollPoster(pos, isDown){
            if (isDown) {
                var pullUp_top = oPullUp[0].getBoundingClientRect().top;

                if (isPosterLoad && (pullUp_top - 100 <= win_height)) {
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

var task_list = {
    // 初始化页面
    init: function(){
        if (isFromShare || (navigator.userAgent.indexOf('MicroMessenger') != -1)) {
            openApp(window.location.href, '', '', true, 'member');
        }

        // 判断是否登陆
        /*if (!fml.vars.isLogin) {
            window.location.href = 'meilishuo://login.meilishuo/';
            return;
        }*/

        if (!fml.vars.isLogin) {
            setTimeout(function(){
                // 判断登录，包含app和wx
                checkLogin();
            }, 500);

            return;
        }

        this.errorTipsLayer();

        if (fml.vars.isNormalGetData != -1) {
            this.initEvent();
            this.posterWall('');
            //this.lazyer = lazy.init({'xpath': '.bs_load_img'});
            //this.lazyer.scroll();
        }
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            
        };

        scroll.yIn(60, function(){
            oGoTopWrap.show();
        },
        function(){
            oGoTopWrap.hide();
        });

        $('.gotop').on('click', function(){
            $('html,body').scrollTo({
                endY: 0,
                updateRate: 5
            });
        });

        // 点击查看当前分类任务
        $('body').on('click', '.top_nav_wrap li', function(){
            var that = $(this);

            if (that.hasClass('active')) {
                return;
            }

            self.getData(that);
        });

        $('body').on('click', '.evaluate_list_box .btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            var that = $(this),
                href = that.data('href') || '';

            if (!that.hasClass('receive_btn')) {
                return;
            }

            (href != '') && (window.location.href = href);
        });
    },

    getData: function(me){
        var that = $(me),
            status = that.data('status') || '';

        isFirstLoad = true;

        $('.evaluate_list_box').html('');

        that.addClass('active').siblings().removeClass('active');

        task_list.posterWall(status);
    },

    posterWall: function(status){
        var self = this,
            search = '',
            params = (status != '') ? ('&status=' + status) : '';

        search = ((ajaxRequestUrl.indexOf('?') < 0) ? '?' : '&') + 'type=comment&size=20' + params;

        pin.init({
            containerId: '.evaluate_list_box'
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

        fml.eventProxy('logPoster', function(res){
            var jsonData = res.data;

            if (jsonData) {
                var goodsList = jsonData.item || [],
                    goodsListLen = goodsList.length || 0;

                if (goodsListLen) {
                    oPullUp.show();
                    isPosterLoad = true;
                } else {
                    oPullUp.hide();
                    isPosterLoad = false;
                }

                //self.lazyer.load();
            }
        });
    },

    errorTipsLayer: function(){
        if (fml.vars.isLogin && fml.vars.isNormalGetData) {
            var errorText = '',
                confirmText = '';

            if (fml.vars.isNormalGetData == 1) {
                confirmText = '刷新刷新！';
                errorText = '矮油~好像卡住惹<br>刷新一下让我重新加载出来好咩~';
            } else if (fml.vars.isNormalGetData == -1) {
                confirmText = '好哒~';
                errorText = '啊哦，系统出了点小问题<br>喝杯奶茶一会儿再来试试吧~';
            }

            if (errorText != '') {
                var alt = new Alert ({
                    content: errorText,
                    confirmTxt: confirmText,
                    onSure: function(){
                        (fml.vars.isNormalGetData == 1) && window.location.reload();

                        return;
                    }
                });

                // 发送数据统计请求
                tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=服务器开小差，请稍后重试~:_pos_id=500:_pos_name=服务器开小差，请稍后重试~:_ext_inter=/aj/member/getInfo'});
            }
        }
    }
};

// 初始化页面
task_list.init();
