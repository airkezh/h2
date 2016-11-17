/*common*/

/**
 * @fileoverview 首页－会员俱乐部
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-10-20
 */

require('wap/iscroll');
require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var pin = require('wap/component/wapfall');
var istorage = require('component/iStorage');
var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');

var oPullUp = $('.pullUp');
var oGoTopWrap = $('.gotop_wrap');
var windowWidth = $(window).width();
var windowHeight = $(window).height();
var ajaxRequestUrl = '/aj/member/interfaces/getEventGoods';

var urlData;
var pullUpAction;
var promptLayerTimeout;
var memberLevelIscroll;
var memberInterestsIscroll;
var userMaxLevel = 4;
var isPosterLoad = false;
var clickEventIsComplete = false;
var ajaxRequestIsComplete = false;
var memberWelfareDayAddDayCount = 1;
var promotionStartTime = new Date(2015,10,7,00,00,00).getTime();
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

// 客户端app回调函数
window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    },

    onCalendarEventActionEnd: function(obj){
        var result = obj.result || 0,
            actionType = obj.actionType || '';

        if (result == 1) {
            $('.member_remind_btn').toggleClass('active');

            if (actionType == 'add') {
                /*var text = (result == 1) ? '会员福利日提醒设置成功' : '会员福利日提醒设置失败';

                togglePromptLayer(text, function(){
                    $('.j_layer_shade').remove();
                    $('.j_layer_main').remove();
                });*/

                $('.member_remind_btn').text('取消提醒');

                istorage.setCookie('member_welfare_day_remind', 'member_welfare_day_remind_on', {'duration': memberWelfareDayAddDayCount * 3600 * 24 * 10});
            } else if (actionType == 'remove') {
                $('.member_remind_btn').text('提醒我');

                istorage.setCookie('member_welfare_day_remind', 'member_welfare_day_remind_off', {'duration': memberWelfareDayAddDayCount * 3600 * 24 * 10});
            }

            clickEventIsComplete = !clickEventIsComplete;
        } else {
            togglePromptLayer('会员福利日提醒设置失败', function(){
                clickEventIsComplete = !clickEventIsComplete;
            });
        }
    }
};

function togglePromptLayer(text, cbk){
    var text = text || '服务器开小差，请稍后重试~',
        tpl = shareTmp('j_prompt_tpl', {'text': text});

    $('body').append(tpl);

    var oLayer = $('#j_prompt_layer');

    oLayer.animate({'opacity': 1}, 500, function(){
        if (promptLayerTimeout) {
            clearTimeout(promptLayerTimeout);

            promptLayerTimeout = null;
        }

        promptLayerTimeout = window.setTimeout(function(){
            oLayer.animate({'opacity': 0}, 500, function(){
                oLayer.remove();

                (typeof cbk === 'function') && cbk();
            });
        }, 1000);
    });
}

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

var club = {
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
            this.initEvent();
            this.initProgressBar();
            this.welfareDayLayer();

            if (fml.vars.serverTime < promotionStartTime) {
                var tpl = shareTmp('j_stay_tuned_tpl');

                $('#container').html(tpl);
            } else {
                this.posterWall(fml.vars.eventId);
                this.lazyer = lazy.init({'xpath': '.bs_load_img'});
                this.lazyer.scroll();
            }
        }
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            self.initLevelIscroll();
            self.initInterestsIscroll();
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

        $('body').on('click', '.layer_close_btn', function(){
            self.removeLayer();
        });

        $('body').on('click', '.welfare_records_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            window.location.href = '/member/gift_card_records/?frm=member_center';
        });

        $('body').on('click', '.welfare_day_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            var flag = $(this).data('flag') || '',
                frm = (flag == 'page') ? 'member_center' : 'pop_layer';

            window.location.href = '/member/welfare_day/?frm=' + frm;
        });

        $('body').on('click', '.member_remind_btn', function(){
            if (!fml.vars.isIos) {
                return;
            }

            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            if (clickEventIsComplete) {
                return;
            }

            clickEventIsComplete = !clickEventIsComplete;

            var paramsObj = {};

            if ($(this).hasClass('active')) {
                paramsObj = {
                    'actionType': 'remove',
                    'eventTitle': '美丽说会员福利日提醒'
                };
            } else {
                var fridayDateStr = self.getFridayDateStr(),
                    startTime = fridayDateStr + ' 10:00:00',
                    endTime = fridayDateStr + ' 23:59:59';

                paramsObj = {
                    'actionType': 'add',
                    'eventTitle': '美丽说会员福利日提醒',
                    'startTime': startTime,
                    'endTime': endTime,
                    'alarmOffset': '-30',
                    'recurrenceType': '0'
                };
            }

            self.iosCalendarEvent(paramsObj);
        });

        $('body').on('click', '.member_promotion_gift', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            window.location.href = '/member/promotion_gift/?frm=club_member';
        });

        $('body').on('click', '.j_user_beuaty', function(){
            var r = '_page_id=1100010:_page_area=club:_pos_id=1:_pos_name=BeautifulValue',
                href = '/member/detail/beauty?frm=member_club&r=' + r;

            if ($('#beauty_tips_dot').length) {
                if (ajaxRequestIsComplete) {
                    return;
                }

                ajaxRequestIsComplete = !ajaxRequestIsComplete;

                $.ajax({
                    url: '/aj/member/getScoreData',
                    timeout: 10000,
                    type: 'post',
                    data: {
                        'is_click': 'click'
                    },
                    dataType: 'json',
                    success: function(data){
                        ajaxRequestIsComplete = !ajaxRequestIsComplete;

                        var code = data.error_code;

                        if (code == 0) {
                            window.location.href = href;
                        } else {
                            var message = data.message,
                                alt = new Alert({
                                    content: message,
                                    onSure: function(){
                                        return;
                                    }
                                });

                            // 发送数据统计请求
                            tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=' + message + ':_pos_id=' + code + ':_pos_name=' + message + ':_ext_inter=/aj/member/getScoreData'});
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown){
                        ajaxRequestIsComplete = !ajaxRequestIsComplete;

                        var message = '',
                            status = XMLHttpRequest.status,
                            errorText = (textStatus == 'timeout') ? '请求超时，接口请求失败<br>请刷新试试~' : '啊哦，系统出了点小问题<br>喝杯奶茶一会儿再来试试吧~';

                        var alt = new Alert({
                            content: errorText,
                            onSure: function(){
                                return;
                            }
                        });

                        switch (status) {
                            case 401:
                                message = '访问被拒绝';

                                break;
                            case 403:
                                message = '禁止访问';

                                break;
                            case 404:
                                message = '未找到';

                                break;
                            case 500:
                                message = '内部服务器错误';

                                break;
                            case 502:
                                message = ' Web服务器用作网关或代理服务器时收到了无效响应';

                                break;
                            case 503:
                                message = '服务不可用';

                                break;
                            case 504:
                                message = '网关超时';

                                break;
                            default:
                                message = '接口错误';

                                break;
                        }

                        // 发送数据统计请求
                        tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=' + message + ':_pos_id=' + status + ':_pos_name=' + message + ':_ext_inter=/aj/member/getScoreData'});
                    }
                });
            } else {
                window.location.href = href;
            }
        });

        $('body').on('click', '.j_member_interest', function(){
            var r = '_page_id=1100001:_page_area=profile:_pos_id=1:_pos_name=MemberRights',
                href = '/member/interests/?r=' + r;

            window.location.href = href;
        });

        $('body').on('click', '.j_user_record', function(){
            var step = $(this).data('step'),
                r = '_page_id=1100010:_page_area=club:_pos_id=2:_pos_name=BeautifulArchives',
                href = '/member/complement_info/?step=' + step + '&frm=member_club&r=' + r;

            window.location.href = href;
        });

        $('body').on('click', '.more_footprint, .member_footprint li', function(){
            var index = $(this).data('index') || 1,
                href = '/member/footprint/?frm=member_center&index=' + index;

            window.location.href = href;
        });

        $('body').on('click', '#interests_iscroll li', function(){
            var href = '',
                that = $(this),
                pos = that.data('pos') || 0,
                name = that.data('name') || '',
                flag = that.data('flag') || '',
                r = '_page_id=1100010:_page_area=rights:_pos_id=' + pos + ':_pos_name=' + name;

            if (flag == 'gift') {
                var oCanReceive = that.find('.can_receive');

                if (oCanReceive.length > 0) {
                    var level = oCanReceive.data('level') || 0,
                        giftTpl = shareTmp('j_gift_tpl', {'level': level, 'giftPageData': fml.vars.giftPageData});

                    $('body').append(giftTpl);

                    self.initLayerInterestsIscroll();

                    /*$('#j_gift_layer').animate({'opacity': 1}, 800, function(){
                        self.initLayerInterestsIscroll();
                    });*/
                } else {
                    window.location.href = '/member/promotion_gift/?r=' + r;
                }
            } else if (flag == 'interests') {
                window.location.href = '/member/interests/?r=' + r;
            }
        });

        $('body').on('click', '.receive_gift_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                //window.location.href = 'meilishuo://login.meilishuo/';
                //return;

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            var level = $(this).data('level') || 0;

            if (ajaxRequestIsComplete) {
                return;
            }

            ajaxRequestIsComplete = !ajaxRequestIsComplete;

            $.ajax({
                url: '/aj/member/interfaces/receiveGift',
                type: 'get',
                dataType: 'json',
                data: {
                    'grade_gift': level
                },
                success: function(data){
                    ajaxRequestIsComplete = !ajaxRequestIsComplete;

                    var code = data.error_code;

                    if (code == 0) {
                        var jsonData = data.data,
                            tips = (jsonData && jsonData.tips) ? jsonData.tips : '',
                            success = (jsonData && jsonData.success) ? jsonData.success : 0;

                        if (success == 1) {
                            $('#j_gift_layer').remove();

                            window.location.href = '/member/promotion_gift/?frm=club_member';
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

        $('body').on('click', '.goods_wall li', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            var that = $(this),
                tab_name = '全部',
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

    initProgressBar: function(){
        $('.inner_progress_bar').css({'width': fml.vars.userPercent});
    },

    initLevelIscroll: function(){
        if ($('#level_wrap').length) {
            var paddingLeft = (windowWidth / 2) - (20 + 4),
                iscrollWidth = 640 + ((20 + paddingLeft) * 2),
                iscrollXStart = -(630 / userMaxLevel) * fml.vars.userLevel;

            $('#level_wrap').css({
                'padding-left': paddingLeft + 'px'
            });

            $('#level_iscroll').css({
                'width': iscrollWidth + 'px'
            });

            memberLevelIscroll = new iScroll('level_wrap', {
                x: iscrollXStart,
                vScroll: false,
                bounce: false,
                hScrollbar: false,
                vScrollbar: false,
                onBeforeScrollStart: function(e){
                    if (this.absDistX > this.absDistY) {
                        e.preventDefault();
                    }
                },
                // 解决第一次无法滑动的问题
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

            memberLevelIscroll.refresh();
        }
    },

    initInterestsIscroll: function(){
        if ($('#interests_wrap').length) {
            memberInterestsIscroll = new iScroll('interests_wrap', {
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

            var iscroll_lis = $('#interests_iscroll').find('li'),
                iscroll_li_len = iscroll_lis.length || 0,
                iscroll_li_width = $(iscroll_lis[0]).width() || 0;

            $('#interests_iscroll').css({
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

    welfareDayLayer: function(){
        var welfareDayLayerIsShow = fml.vars.welfareLayerData.is_pop || 0;

        if (welfareDayLayerIsShow == 1) {
            var tpl = '',
                welfareDayLayerStatus = parseInt(fml.vars.welfareLayerData.type || 0);

            switch (welfareDayLayerStatus) {
                case 0:
                    tpl = shareTmp('j_prize_tpl');

                    break;
                case 1:
                    tpl = shareTmp('j_formal_tpl');

                    break;
                case 2:
                    var memberWelfareDayRemindIsOn = (istorage.getCookie('member_welfare_day_remind') == 'member_welfare_day_remind_on') ? true : false;

                    tpl = shareTmp('j_preheat_tpl', {'remindIsOn': memberWelfareDayRemindIsOn});

                    break;
            }

            (tpl != '') && $('body').append(tpl);
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
                tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=服务器开小差，请稍后重试~:_pos_id=500:_pos_name=服务器开小差，请稍后重试~:_ext_inter=/aj/member/getInfo'});
            }
        }
    },

    imgLoaded: function(el, callback){
        if (el) {
            if (el.complete) {
                callback();
            } else {
                el.onload = function() {
                    callback();
               }
            }
        } else {
            callback();
        }
    },

    posterWall: function(eventId){
        var self = this,
            search = '';

        search = (ajaxRequestUrl.indexOf('?') >= 0 ? '&' : '?') + 'event_id=' + eventId + '&page_size=20';

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
    },

    getFridayDateStr: function(){ 
        var dd = new Date(),
            week = dd.getDay();

        memberWelfareDayAddDayCount = (week == 6) ? week : (5 - week);

        dd.setDate(dd.getDate() + memberWelfareDayAddDayCount);

        var y = dd.getFullYear(),
            day = dd.getDate(),
            month = dd.getMonth() + 1,
            m = (month < 10) ? ('0' + month) : month,
            d = (day < 10) ? ('0' + day) : day;

        return y + '-' + m + '-' + d; 
    },

    iosCalendarEvent: function(opt){
        var actionType = opt.actionType || '';

        if ((actionType != 'add') && (actionType != 'remove')) {
            clickEventIsComplete = !clickEventIsComplete;

            return;
        }

        var jsonParams = {},
            eventTitle = opt.eventTitle || '',
            startTime = opt.startTime || '',
            endTime = opt.endTime || '',
            alarmOffset = opt.alarmOffset || '0',
            recurrenceType = opt.recurrenceType || '0';

        if (actionType == 'add') {
            if ((eventTitle == '') || (startTime == '') || (endTime == '')) {
                clickEventIsComplete = !clickEventIsComplete;

                return;
            }
        } else if (actionType == 'remove') {
            if (eventTitle == '') {
                clickEventIsComplete = !clickEventIsComplete;

                return;
            }
        }

        if (actionType == 'add') {
            jsonParams = {
                'actionType': actionType,
                'eventTitle': eventTitle,
                'startTime': startTime,
                'endTime': endTime,
                'alarmOffset': alarmOffset,
                'recurrenceType': recurrenceType
            };
        } else if (actionType == 'remove') {
            jsonParams = {
                'actionType': actionType,
                'eventTitle': eventTitle
            };
        }

        window.location.href = 'meilishuo://calendar_event.meilishuo?json_params=' + encodeURIComponent(JSON.stringify(jsonParams));
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    }
};

// 初始化页面
club.init();
