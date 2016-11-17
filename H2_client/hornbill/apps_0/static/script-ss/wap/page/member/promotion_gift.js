/*common*/

/**
 * @fileoverview 首页－会员晋级礼包
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-11-02
 */

require('wap/iscroll');
require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');

var oGoTopWrap = $('.gotop_wrap');
var windowWidth = $(window).width();
var windowHeight = $(window).height();

var userMaxLevel = 4;
var receiveGiftBtn;
var topMarqueenInterval;
var memberInterestsIscroll;
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

var promotion_gift = {
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

        this.renderHtml();
        this.initEvent();
        //this.lazyer = lazy.init({'xpath': '.bs_load_img'});
        //this.lazyer.scroll();
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            //self.initInterestsIscroll();
            self.initTopNoticeMarqueen();
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

        $('body').on('click', '.j_login_box', function(){
            /*window.location.href = 'meilishuo://login.meilishuo/';
            return;*/

            // 判断登录，包含app和wx
            checkLogin();
        });

        $('body').on('click', '.coupon', function(){
            //openApp('meilishuo://coupons.meilishuo');

            window.location.href = 'meilishuo://coupons.meilishuo';
        });

        $('body').on('click', '.bottom_banner_btn', function(){
            var href = $(this).data('href') || '';

            if (href != '') {
                var r = '_page_code=promgift:_page_area=member_club';

                if (href.indexOf('r=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':' + r;
                }

                window.location.href = href;
            }
        });

        /*$('body').on('click', '.top_marqueen_wrap', function(){
            if (topMarqueenInterval) {
                clearInterval(topMarqueenInterval);
                topMarqueenInterval = null;
            }

            $(this).hide().remove();
        });*/

        /*$('body').on('click', '.receive_gift_btn', function(){
            var that = $(this),
                level = that.data('level') || 0,
                giftTpl = shareTmp('j_layer_gift_tpl', {'level': level, 'giftPageData': fml.vars.pageData});

            receiveGiftBtn = that;

            $('body').append(giftTpl);

            self.initLayerInterestsIscroll();
        });*/

        //$('body').on('click', '.layer_receive_btn', function(){
        $('body').on('click', '.receive_gift_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();
            }

            var that = $(this),
                level = that.data('level') || 0;

            if (ajaxRequestIsComplete) {
                return;
            }

            ajaxRequestIsComplete = !ajaxRequestIsComplete;

            $.ajax({
                url: '/aj/member/interfaces/receiveGift',
                type: 'get',
                dataType: 'json',
                data: {
                    'grade_gift': level,
                    'return_data': 1
                },
                success: function(data){
                    ajaxRequestIsComplete = !ajaxRequestIsComplete;

                    var code = data.error_code;

                    if (code == 0) {
                        var jsonData = data.data,
                            tips = (jsonData && jsonData.tips) ? jsonData.tips : '',
                            success = (jsonData && jsonData.success) ? jsonData.success : 0;

                        if (success == 1) {
                            /*if (receiveGiftBtn.length) {
                                var gifts = (jsonData && jsonData.gifts) ? jsonData.gifts : [],
                                    tpl = shareTmp('j_gift_list_tpl', {'data': gifts, 'level': level, 'pageData': fml.vars.pageData});

                                receiveGiftBtn.parent().html(tpl);

                                self.initRenderInterestsIscroll(level);
                            }*/

                            var gifts = (jsonData && jsonData.gifts) ? jsonData.gifts : [],
                                tpl = shareTmp('j_gift_list_tpl', {'data': gifts, 'level': level, 'pageData': fml.vars.pageData});

                            that.parent().html(tpl);

                            self.initRenderInterestsIscroll(level);
                        } else {
                            var alt = new Alert({
                                content: tips,
                                onSure: function(){
                                    $('#j_gift_layer').remove();
                                    return;
                                }
                            });
                        }
                    } else {
                        var alt = new Alert({
                            content: data.message,
                            onSure: function(){
                                $('#j_gift_layer').remove();
                                return;
                            }
                        });
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    ajaxRequestIsComplete = !ajaxRequestIsComplete;

                    var alt = new Alert({
                        content: '啊哦，系统出了点小问题<br>喝杯奶茶一会儿再来试试吧~',
                        onSure: function(){
                            $('#j_gift_layer').remove();
                            return;
                        }
                    });
                }
            });
        });

        $('body').on('click', '.shop_wrap', function(){
            var href = $(this).data('href') || '';

            if (href != '') {
                if (href.indexOf('r=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':_page_id=1100010:_page_area=promotion_gift';
                }

                window.location.href = href;
            }

            return;
        });

        $('body').on('click', '.interests_iscroll li', function(){
            var that = $(this),
                pos = that.data('pos') || 0,
                name = that.data('name') || '',
                r = '_page_id=1100010:_page_area=rights:_pos_id=' + pos + ':_pos_name=' + name,
                href = '/member/interests/?r=' + r;

            window.location.href = href;
        });
    },

    renderHtml: function(){
        var self = this;

        if (!fml.vars.isLogin || ajaxRequestIsComplete) {
            return;
        }

        ajaxRequestIsComplete = !ajaxRequestIsComplete;

        $.ajax({
            url: '/aj/member/interfaces/getGiftList',
            type: 'get',
            dataType: 'json',
            success: function(data){
                ajaxRequestIsComplete = !ajaxRequestIsComplete;

                var code = data.error_code,
                    jsonData = data.data;

                if (code == 0) {
                    var tpl = shareTmp('j_gift_tpl', {'data': jsonData, 'pageData': fml.vars.pageData, 'userLevel': fml.vars.userLevel});

                    $('#gift_list_container').html(tpl);

                    self.initInterestsIscroll();
                } else {
                    var alt = new Alert({
                        content: data.message,
                        onSure: function(){
                            return;
                        }
                    });
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                ajaxRequestIsComplete = !ajaxRequestIsComplete;

                var alt = new Alert({
                    content: '啊哦，系统出了点小问题<br>喝杯奶茶一会儿再来试试吧~',
                    onSure: function(){
                        return;
                    }
                });
            }
        });
    },

    initTopNoticeMarqueen: function(){
        /*var oTopMarqueen = $('.top_marqueen_wrap').find('p');

        if (oTopMarqueen.length > 0) {
            if (topMarqueenInterval) {
                clearInterval(topMarqueenInterval);
                topMarqueenInterval = null;
            }

            var i = -1,
                topMarqueenWidth = oTopMarqueen.width();

            topMarqueenInterval = setInterval(function(){
                oTopMarqueen.css({
                    '-webkit-transform': 'translateX(' + i + 'px)',
                    'transform': 'translateX(' + i + 'px)'
                });

                i -= 1;

                if (i < -topMarqueenWidth){
                    i = 0;
                }
            }, 30);
        }*/

        var oTopMarqueen = $('#top_marqueen_box');

        if (oTopMarqueen.length > 0) {
            var counter = 0;
                marqueen = function(obj){
                var tmp = (obj.scrollLeft)++;

                // 当滚动条到达右边顶端时
                if (obj.scrollLeft == tmp) {
                    ++counter;
                    obj.innerHTML += obj.innerHTML;
                }

                // 当滚动条滚动了初始内容的宽度时滚动条回到最左端
                if (obj.scrollLeft >= obj.firstChild.offsetWidth) {
                    obj.scrollLeft = 0;
                }

                if (obj.scrollLeft == (3 * 800 - 120)) {
                    if (topMarqueenInterval) {
                        clearInterval(topMarqueenInterval);
                        topMarqueenInterval = null;
                    }

                    $('.top_marqueen_wrap').hide().remove();
                }
            };

            if (topMarqueenInterval) {
                clearInterval(topMarqueenInterval);
                topMarqueenInterval = null;
            }

            topMarqueenInterval = setInterval(function(){
                marqueen(document.getElementById('top_marqueen_box'));
            }, 20);
        }
    },

    initInterestsIscroll: function(){
        for (var i = 0; i <= userMaxLevel; i++) {
            var interests_wrap_name = 'interests_wrap_' + i,
                oInterestsWrap = $('#' + interests_wrap_name);

            if (oInterestsWrap.length) {
                memberInterestsIscroll = new iScroll(interests_wrap_name, {
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

                var interests_iscroll_name = 'interests_iscroll_' + i,
                    iscroll_lis = $('#' + interests_iscroll_name).find('li'),
                    iscroll_li_len = iscroll_lis.length || 0,
                    iscroll_li_width = $(iscroll_lis[0]).width() || 0;

                $('#' + interests_iscroll_name).css({
                    'width': (iscroll_li_width * iscroll_li_len) + 'px'
                });

                memberInterestsIscroll.refresh();
            }
        }
    },

    initRenderInterestsIscroll: function(level){
        var interests_wrap_name = 'interests_wrap_' + level,
            oInterestsWrap = $('#' + interests_wrap_name);

        if (oInterestsWrap.length) {
            memberInterestsIscroll = new iScroll(interests_wrap_name, {
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

            var interests_iscroll_name = 'interests_iscroll_' + level,
                iscroll_lis = $('#' + interests_iscroll_name).find('li'),
                iscroll_li_len = iscroll_lis.length || 0,
                iscroll_li_width = $(iscroll_lis[0]).width() || 0;

            $('#' + interests_iscroll_name).css({
                'width': (iscroll_li_width * iscroll_li_len) + 'px'
            });

            memberInterestsIscroll.refresh();
        }
    },

    initLayerInterestsIscroll: function(){
        var oInterestsWrap = $('#layer_interests_wrap');

        if (oInterestsWrap.length) {
            memberInterestsIscroll = new iScroll('layer_interests_wrap', {
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

            var iscroll_lis = $('#layer_interests_iscroll').find('li'),
                iscroll_li_len = iscroll_lis.length || 0,
                iscroll_li_width = $(iscroll_lis[0]).width() || 0;

            $('#layer_interests_iscroll').css({
                'width': (iscroll_li_width * iscroll_li_len) + 'px'
            });

            memberInterestsIscroll.refresh();
        }
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    }
};

// 初始化页面
promotion_gift.init();
