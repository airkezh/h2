/*common*/

/**
 * @fileoverview 大促分会场－会员
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-11-25
 */

require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var pin = require('wap/component/wapfall');
var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');
var sidebar = require("wap/page/activity/promotion/sidebar");

var oPullUp = $('.pullUp');
//var oGoTopWrap = $('.gotop_wrap');
var windowWidth = $(window).width();
var windowHeight = $(window).height();
var ajaxRequestUrl = '/aj/member/interfaces/getEventGoods';

var urlData;
var pullUpAction;
var isPosterLoad = false;
var ajaxRequestIsComplete = false;
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
        pin.append(shareTmp('posterWall', {'data': data, 'isLogin': fml.vars.isLogin, 'userLevel': fml.vars.userLevel}));
        urlData.page++;
        isPosterLoad = true;
    },

    scrollPoster: function(isscroll){
        function scrollPoster(pos, isDown){
            if (isDown) {
                var pullUp_top = oPullUp[0].getBoundingClientRect().top;

                if (isPosterLoad && (pullUp_top - 100 <= windowHeight)) {
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

var subvenue = {
    // 初始化页面
    init: function(){
        if (isFromShare || (navigator.userAgent.indexOf('MicroMessenger') != -1)) {
            openApp(window.location.href, '', '', true, 'member');
        }

        // 判断是否登陆
        /*if (!fml.vars.isLogin) {
            window.location.href = 'meilishuo://login.meilishuo/';
            return;
        }

        if (!fml.vars.isLogin) {
            setTimeout(function(){
                // 判断登录，包含app和wx
                checkLogin();
            }, 500);

            return;
        }*/

        this.errorTipsLayer();

        if (fml.vars.isNormalGetData != -1) {
            this.renderSidebarNav();
            this.posterWall(fml.vars.aid);
            this.initEvent();
            this.lazyer = lazy.init({'xpath': '.bs_load_img'});
            this.lazyer.scroll();
        }
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            
        };

        /*scroll.yIn(60, function(){
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
        });*/

        $('body').on('click', '.j_login_box', function(){
            /*window.location.href = 'meilishuo://login.meilishuo/';
            return;*/

            // 判断登录，包含app和wx
            checkLogin();
        });

        $('body').on('click', '.goods_wall .detail', function(){
            // 判断是否登陆
            /*if (!fml.vars.isLogin) {
                //window.location.href = 'meilishuo://login.meilishuo/';
                //return;

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }*/

            var tab_name = '全部',
                that = $(this).parents('li'),
                pos = that.data('pos') || 0,
                tid = that.data('tid') || 0,
                href = that.data('href') || '';
                //r = '_page_id=1100010:_page_area=MemberGoods:_pos_id=' + pos + ':_pos_name=' + tid + ':_ext_tbname=' + tab_name;

            /*if (href != '') {
                if (href.indexOf('r=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':' + r;
                }

                window.location.href = href;
            }*/

            (href != '') && (window.location.href = href);
        });
    },

    renderSidebarNav: function(){
        // 侧边栏
        if (fml.vars.mid && fml.vars.nid) {
            $.post('/aj/huodong/navi_data', {'actid': fml.vars.mid}, function(data){
                if (data.data && data.data.navis) {
                    sidebar.build({
                        'sidebars': data.data.navis,
                        'sidebarBtn': {'header': data.data.header, 'back': data.data.back}
                    });
                }
            }, 'json');
        }
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
                var alt = new Alert({
                    content: errorText,
                    confirmTxt: confirmText,
                    onSure: function(){
                        (fml.vars.isNormalGetData == 1) && window.location.reload();
                        return;
                    }
                });

                // 发送数据统计请求
                tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=服务器开小差，请稍后重试~:_pos_id=500:_pos_name=服务器开小差，请稍后重试~:_ext_inter=/sign/getInfo'});
            }
        }
    },

    posterWall: function(aid){
        var self = this,
            search = '';

        search = (ajaxRequestUrl.indexOf('?') >= 0 ? '&' : '?') + 'event_id=' + aid + '&page_size=20';

        pin.init({
            containerId: '.goods_wall'
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
                var goodsList = jsonData.goods_list || [],
                    goodsListLen = goodsList.length || 0;

                if (goodsListLen) {
                    oPullUp.show();
                } else {
                    oPullUp.hide();
                }

                self.lazyer.load();
            }
        });
    }
};

// 初始化页面
subvenue.init();
