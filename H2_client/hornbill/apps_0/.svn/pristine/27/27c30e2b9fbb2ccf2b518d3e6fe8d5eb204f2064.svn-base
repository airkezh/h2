/*common*/

/**
 * @fileoverview 首页－美物详情
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2016-01-06
 */

require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var Swipe = require('wap/component/swipe');
var pin = require('wap/component/wapfall');
var istorage = require('component/iStorage');
var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');

var promptLayerTimeout;
var oPullUp = $('.pullUp');
var oGoTopWrap = $('.gotop_wrap');
var clickEventIsComplete = false;
var memberWelfareDayAddDayCount = 1;
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
            $('.activity_remind_btn').toggleClass('active');

            if (actionType == 'add') {
                /*var text = (result == 1) ? '会员福利日提醒设置成功' : '会员福利日提醒设置失败';

                togglePromptLayer(text, function(){
                    $('.j_layer_shade').remove();
                    $('.j_layer_main').remove();
                });*/

                $('.activity_remind_btn').text('取消提醒');

                istorage.setCookie('member_welfare_day_remind', 'member_welfare_day_remind_on', {'duration': memberWelfareDayAddDayCount * 3600 * 24 * 10});
            } else if (actionType == 'remove') {
                $('.activity_remind_btn').text('提醒我');

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

var welfare_goods_details = {
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
            // 初始化组图滑动
            this.imgSwipe('img_swipe_box');
            this.initRemindBtnStatus();
            this.initEvent();
            this.lazyer = lazy.init({'xpath': '.bs_load_img'});
            this.lazyer.scroll();
        }
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            // 初始化中奖名单 向上滚动
            self.initAutoScroll();
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

        $('body').on('click', '.more_detail_wrap, .swipe .swipe_pic', function(){
            var href = $(this).data('href') || '';

            (href != '') && (window.location.href = href);
        });

        $('body').on('click', '.goods_shop_title, .bottom_more_btn', function(){
            var that = $(this),
                pos = that.data('pos') || 0,
                href = that.data('href') || '';

            if (href != '') {
                var r = '_page_id=1100010:_page_area=member_day:_pos_id=' + pos + ':_pos_name=member_shop';

                if (href.indexOf('r=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':' + r;
                }

                window.location.href = href;
            }
        });

        $('body').on('click', '.use_cards_btn', function(){
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

            if (fml.vars.userLevel < 1) {
                togglePromptLayer('亲爱哒，本次活动仅供V1及以上会员参与~<br>快去加速升级吧~', function(){
                    clickEventIsComplete = !clickEventIsComplete;
                });

                return;
            }

            if (fml.vars.userAvailableCards < 1) {
                togglePromptLayer('哎呀，机会用完了！坐等今晚22点的好消息~', function(){
                    clickEventIsComplete = !clickEventIsComplete;
                });

                return;
            }

            var that = $(this),
                tid = that.data('tid') || '',
                date = that.data('date') || '';

            if ((tid != '') && (date != '')) {
                window.location.href = '/member/apply_info_confirm/?tid=' + tid + '&date=' + date;
            }
        });

        $('body').on('click', '.goods_wall figure', function(){
            var that = $(this),
                pos = that.data('pos') || 0,
                tid = that.data('tid') || '',
                href = that.data('href') || '',
                r = '_page_id=1100010:_page_area=member_day:_pos_id=' + pos + ':_pos_name=member_goods';

            if (href != '') {
                /*if (href.indexOf('r=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':' + r;
                }*/

                window.location.href = href;
            }
        });

        $('body').on('click', '.activity_remind_btn', function(){
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
    },

    initRemindBtnStatus: function(){
        var cookie_remind_value = istorage.getCookie('member_welfare_day_remind') || '';

        if (cookie_remind_value == 'member_welfare_day_remind_on') {
            $('.activity_remind_btn').addClass('active').text('取消提醒');
        } else {
            $('.activity_remind_btn').removeClass('active').text('提醒我');
        }
    },

    // 初始化中奖名单 向上滚动
    initAutoScroll: function(){
        if (fml.vars.goodsPrizeLength > 5) {
            var prizeList = $('.lucky_member_box');

            if (prizeList.length > 0) {
                var i = -1,
                    prizeListHeight = prizeList.height();

                setInterval(function(){
                    prizeList.css({
                        '-webkit-transform': 'translateY(' + i + 'px)',
                        'transform': 'translateY(' + i + 'px)'
                    });

                    i -= 1;

                    if (i < -prizeListHeight) {
                        i = 0;
                    }
                }, 30);
            }
        }
    },

    // 组图swipe
    imgSwipe: function(id){
        var obj = null,
            oLi = $('#' + id).children().eq(1).find('li');

        obj = new Swipe(document.getElementById(id), {
            startSlide: 0,
            //auto: 4000,
            speed: 300,
            //stopPropagation: true,
            callback: function(index, element){
                // 焦点图当前状态
                oLi.removeClass('active').eq(index).addClass('active');
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
                //tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=服务器开小差，请稍后重试~:_pos_id=500:_pos_name=服务器开小差，请稍后重试~:_ext_inter=/aj/member/getInfo'});
            }
        }
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    }
};

// 初始化页面
welfare_goods_details.init();
