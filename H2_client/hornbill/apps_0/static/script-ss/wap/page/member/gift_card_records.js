/*common*/

/**
 * @fileoverview 首页－我的抽礼卡记录
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2016-01-11
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
var ajaxRequestUrl = '/aj/member/interfaces/getUserApplyList';
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
        pin.append(shareTmp('records_item_tpl', {'data': data, 'isFirstLoad': isFirstLoad}));
        urlData.page++;
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
            urlData.page++;
            isPosterLoad = true;
        } else {
            pullUpAction(urlData);
        }
    }
};

var gift_card_records = {
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
            this.posterWall();
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

        $('body').on('click', '.records_list_box .icon_goods', function(){
            var href = $(this).data('href') || '';

            (href != '') && (window.location.href = href);
        });

        $('body').on('click', '.records_list_box .icon_title', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            var href = '',
                that = $(this),
                sid = that.data('sid') || '',
                tid = that.data('tid') || '',
                status = that.data('status') || 0;

            if (status == 2) {
                href = '/member/welfare_goods_details/?tid=' + tid + '&r=' + fml.vars.r + '#lucky_member_wrap';
            } else if (status == 1) {
                var paramsObj = {
                        'shop_id': sid,
                        'service_type': '3'
                    },
                    jsonParams = encodeURIComponent(JSON.stringify(paramsObj));

                href = 'meilishuo://im_shop_chat.meilishuo?json_params=' + jsonParams;
            }

            (href != '') && (window.location.href = href);
        });
    },

    posterWall: function(){
        var self = this,
            search = '';

        search = (ajaxRequestUrl.indexOf('?') >= 0 ? '&' : '?') + '&page_size=20';

        pin.init({
            containerId: '.records_list_box'
        });

        var ajaxData = {
                'page': 1
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
                var goodsList = jsonData.list || [],
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
gift_card_records.init();
