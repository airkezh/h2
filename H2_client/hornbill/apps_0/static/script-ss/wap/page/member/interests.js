/*common*/

/**
 * @fileoverview 会员权益 － 会员中心
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-07-03
 */

require('wap/iscroll');
require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var confirm = require('wap/ui/confirm');
var openApp = require('wap/app/openApp');
var Swipe = require('wap/component/swipe');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');

var memberInterestsIscroll;
var oGoTopWrap = $('.gotop_wrap');
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

// 登陆成功后的回调函数
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var interests = {
    oLevelSwipe: null,

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

        //this.initIscroll();
        this.initEvent();
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            // 初始化滑动
            self.initIscroll();
            self.levelSwipe('j_level_swipe');
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

        // 关闭弹窗
        $('body').on('click', '.know_btn,.close_btn', function(){
            self.removeLayer();
        });

        $('body').on('click', '.beauty_tips', function(){
            var tpl = shareTmp('j_layer_tpl', {'data': {'img_src': fml.vars.pageData.src, 'img_title': fml.vars.pageData.title}});

            $('body').append(tpl);
        });

        $('body').on('click', '.level_box li', function(){
            var index = $(this).data('index') || 0;

            self.oLevelSwipe.slide(index);
        });

        $('body').on('click', '.more_content_btn', function(){
            var that = $(this),
                oMoreContent = $('.more_hidden_content'),
                flag = (oMoreContent.css('display') == 'block') ? true : false,
                html = flag ? '展开<img src="http://d03.res.meilishuo.net/pic/_o/dc/62/834138f19d9b75805c34e851dea8_22_12.cf.png" alt="">' : '收起<img src="http://d02.res.meilishuo.net/pic/_o/3a/f3/d12b743ff3792ed37f1ea6d90eca_22_12.cf.png" alt="">';

            that.html(html);
            oMoreContent.toggle();
        });

        $('body').on('click', '.member_interests', function(){
            var type = $(this).data('type') || 0;

            switch (type) {
                case 1:
                    var tpl = shareTmp('j_layer_tpl', {'data': fml.vars.pageData.layer_1});

                    $('body').append(tpl);

                    break;
                case 2:
                    window.location.href = '/member/ransom/?frm=huiyuanquanyi&r=' + fml.vars.r;
                    return;

                    break;
                case 3:
                    window.location.href = '/member/nine_lottery_v2/?frm=huiyuanquanyi&r=' + fml.vars.r;
                    return;

                    break;
                case 4:
                    var tpl = shareTmp('j_layer_tpl', {'data': fml.vars.pageData.layer_4});

                    $('body').append(tpl);

                    break;
                case 5:
                    var tpl = shareTmp('j_scroll_tpl', {'data': fml.vars.pageData.layer_5});

                    $('body').append(tpl);

                    break;
                case 6:
                    window.location.href = '/member/beans_coupon/?frm=huiyuanquanyi&r=' + fml.vars.r;
                    return;

                    break;
                case 7:
                    var tpl = shareTmp('j_layer_tpl', {'data': fml.vars.pageData.layer_7});

                    $('body').append(tpl);

                    break;
                case 8:
                    if (fml.vars.isNewest) {
                        window.location.href = 'meilishuo://customer_service.meilishuo';
                    } else {
                        var c = new confirm({
                            content: '当前版本不支持调起客服页面，请升级最新版本。',
                            onSure: function(){
                                window.location.href = '/download/latest/wap';
                            },
                            onCancel: function(){
                                return;
                            }
                        });
                    }

                    break;
                case 9:
                    var tpl = shareTmp('j_layer_tpl', {'data': fml.vars.pageData.layer_9});

                    $('body').append(tpl);

                    break;
                case 10:
                    var tpl = shareTmp('j_layer_tpl', {'data': fml.vars.pageData.layer_10});

                    $('body').append(tpl);

                    break;
                case 11:
                    window.location.href = '/member/beans_paradise/?frm=huiyuanquanyi&r=' + fml.vars.r;
                    return;

                    break;
                default:
                    break;
            }
        });
    },

    initIscroll: function(){
        memberInterestsIscroll = new iScroll('interest_wrap', {
            vScroll: false,
            bounce: false,
            hScrollbar: false,
            vScrollbar: false,
            onBeforeScrollStart: function(e){
                if (this.absDistX > this.absDistY) {
                    e.preventDefault();
                }
            },
            //解决第一次无法滑动的问题
            onTouchEnd: function(){
                var self = this;

                if (self.touchEndTimeId) {
                   clearTimeout(self.touchEndTimeId);
                }

                self.touchEndTimeId = setTimeout(function(){
                    self.absDistX = 0;
                    self.absDistY = 0;
                }, 600);
            }
        });

        $('#interest_iscroll').css({
            'width': (75 * 11) + 'px'
        });

        memberInterestsIscroll.refresh();
    },

    levelSwipe: function(id){
        var self = this,
            oPoints = $('.level_box').find('div');

        self.oLevelSwipe = new Swipe(document.getElementById(id), {
            startSlide: fml.vars.userLevel,
            speed: 300,
            //stopPropagation: true,
            callback: function(index, element){
                oPoints.removeClass('active').eq(index).addClass('active'); // 焦点图当前状态
            }
        });
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    }
};

// 初始化页面
interests.init();
