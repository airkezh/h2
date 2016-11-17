/*common*/

/**
 * @fileoverview 首页－美美豆乐园
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
var confirm = require('wap/ui/confirm');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var Swipe = require('wap/component/swipe');
var pin = require('wap/component/wapfall');
var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');

var oPullUp = $('.pullUp');
var oGoTopWrap = $('.gotop_wrap');
var oTipsLayer = $('.tips_layer');
var win_width = $(window).width();
var win_height = $(window).height();
var sign_layer_height = (win_height * 0.8) + (95 / 2) + 2;
var ajaxRequestUrl = '/aj/member/getGoods';                         // 获取签到商城的商品信息接口url

var urlData;
var pullUpAction;
var curNavScroll;
var curCaptchaType;
var curCaptchaDomain;
var curCaptchaRuleId;
var signLayerTimeout;
var successLayerTimeout;
var promptLayerTimeout;
var beansTipsLayerTimeout;
var memberInterestsIscroll;
var isPosterLoad = false;
var isShowBeansTipsLayer = true;
var ajaxRequestIsComplete = false;
var signAjaxRequestIsComplete = false;
var remindAjaxRequestIsComplete = false;
var curAppNotificationEnabled = undefined;
var curAppOpenSettingsEnabled = undefined;
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;
var isManualSign = curUrlSearchParams.isManualSign;
var isShowBeansExpiredRemind = fml.vars.userBeansData.is_show || 0;
var curUserExpiredBeans = fml.vars.userBeansData.beans_to_expire || 0;
var curUserBeansExpiredTime = fml.vars.userBeansData.expire_time || '';

// 客户端app回调函数
window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    },

    onAppNotificationEnabled: function(data){
        curAppNotificationEnabled = data;
    },

    onAppOpenSettingsEnabled: function(data){
        curAppOpenSettingsEnabled = data;

        isShowSettingsLayer();
    },

    onAppNotificationEnabledStatusChanged: function(data){
        if (data == 1) {
            beans_paradise.removeLayer();

            if (!$('#j_sign_remind').hasClass('active')) {
                sendRemindAjaxRequest();
            }
        }
    }
};

function isShowSettingsLayer(){
    if ((typeof curAppNotificationEnabled != 'undefined') && (typeof curAppOpenSettingsEnabled != 'undefined') && (curAppNotificationEnabled == 0)) {
        var tpl = (curAppOpenSettingsEnabled == 0) ? shareTmp('j_remind_tpl') : shareTmp('j_setting_tpl');

        //window.setTimeout(function(){
            $('body').append(tpl);
        //}, 200);
    } else {
        sendRemindAjaxRequest();
    }
}

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

function sendRemindAjaxRequest(){
    if (remindAjaxRequestIsComplete) {
        return;
    }

    remindAjaxRequestIsComplete = !remindAjaxRequestIsComplete;

    $.ajax({
        url: '/aj/member/setRemind',
        timeout: 10000,
        type: 'post',
        dataType: 'json',
        success: function(data){
            var code = data.error_code;

            if (code == 0) {
                var remind = data.data.remind || 0;

                if (remind == 1) {
                    togglePromptLayer('已开启，小美晚饭后提醒你', function(){
                        $('#j_sign_remind').addClass('active').text('点击关闭签到提醒');

                        remindAjaxRequestIsComplete = !remindAjaxRequestIsComplete;
                    });
                } else {
                    togglePromptLayer('已关闭提醒', function(){
                        $('#j_sign_remind').removeClass('active').text('点击打开签到提醒');

                        remindAjaxRequestIsComplete = !remindAjaxRequestIsComplete;
                    });
                }
            } else {
                remindAjaxRequestIsComplete = !remindAjaxRequestIsComplete;

                var message = data.message,
                    alt = new Alert ({
                        content: message,
                        onSure: function(){
                            return;
                        }
                    });

                // 发送数据统计请求
                tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=' + message + ':_pos_id=' + code + ':_pos_name=' + message + ':_ext_inter=/aj/member/setRemind'});
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
            remindAjaxRequestIsComplete = !remindAjaxRequestIsComplete;

            var message = '',
                status = XMLHttpRequest.status,
                errorText = (textStatus == 'timeout') ? '请求超时，接口请求失败<br>请刷新试试~' : '啊哦，系统出了点小问题<br>喝杯奶茶一会儿再来试试吧~';

            var alt = new Alert ({
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
            tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=' + message + ':_pos_id=' + status + ':_pos_name=' + message + ':_ext_inter=/aj/member/setRemind'});
        }
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
        pin.append(shareTmp('posterWall', data));
        urlData.frame++;
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

var beans_paradise = {
    oSignRemind: $('#j_sign_remind'),

    // 初始化页面
    init: function(){
        if (isFromShare || (navigator.userAgent.indexOf('MicroMessenger') != -1)) {
            openApp(window.location.href, '', '', true, 'member');
        }

        /*var tpl = shareTmp('j_receive_beans_tpl');
        //var tpl = shareTmp('j_receive_success_tpl');

        $('body').append(tpl);*/

        /*var oLayers,
            signTpl = shareTmp('j_sign_tpl', {'layer_height': sign_layer_height, 'win_height': win_height});

        $('body').append(signTpl);

        oLayers = $('#j_sign_layer .layer_shade, #j_sign_layer .layer_main');

        //$('#j_sign_layer').animate({'opacity': 1}, 700, function(){
        oLayers.animate({'top': 0}, 700, function(){
            $('#j_sign_layer').find('.blurry_shade').show();
        });*/

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
        //this.toggleBeansTipsLayer();

        if (fml.vars.isNormalGetData != -1) {
            this.initPage();
            this.initEvent();
            this.posterWall(fml.vars.cateId);
            //this.initNav();
            this.lazyer = lazy.init({'xpath': '.bs_load_img'});
            this.lazyer.scroll();
        }
    },

    signAnimation: function(){
        var self = this;

        if (!fml.vars.isLogin) {
            return;
        }

        if (!fml.vars.userSignStatus) {
            if (signAjaxRequestIsComplete) {
                return;
            }

            signAjaxRequestIsComplete = !signAjaxRequestIsComplete;

            $.ajax({
                url: '/aj/member/doSign',
                timeout: 10000,
                type: 'post',
                dataType: 'json',
                success: function(data){
                    signAjaxRequestIsComplete = !signAjaxRequestIsComplete;

                    var code = data.error_code,
                        jsonData = data.data || {};

                    switch (code) {
                        case 0:
                            fml.vars.userSignStatus = 1;

                            var oLayers,
                                signTpl = shareTmp('j_sign_tpl', {'layer_height': sign_layer_height, 'win_height': win_height});

                            $('body').append(signTpl);

                            oLayers = $('#j_sign_layer .layer_shade, #j_sign_layer .layer_main');

                            //$('#j_sign_layer').animate({'opacity': 1}, 700, function(){
                            oLayers.animate({'top': 0}, 700, function(){
                                var strSignDays = '',
                                    prefixSignDays = '',
                                    add = jsonData.add || 0,
                                    needs = jsonData.needs || 0,
                                    bonus = jsonData.bonus || 0,
                                    remind = jsonData.remind || 0,
                                    continues = jsonData.continues || 0,
                                    signDaysLen = (continues + '').length,
                                    oAddBeans = $('#j_add_beans'),
                                    oSignDays = $('#j_sign_days'),
                                    oAvaBeans = $('#j_available_beans'),
                                    userTotalBeans = parseInt(oAvaBeans.text()) + add;

                                $('#j_sign_layer').find('.blurry_shade').show();

                                for (var i = 0; i < (3 - signDaysLen); i++) {
                                    prefixSignDays += '0';
                                }

                                strSignDays = prefixSignDays + continues;

                                if (remind == 1) {
                                    self.oSignRemind.addClass('active').text('点击关闭签到提醒');
                                } else {
                                    self.oSignRemind.removeClass('active').text('点击打开签到提醒');
                                }

                                oAddBeans.text('+' + add).animate({
                                    'opacity': 1,
                                    '-webkit-transform': 'scale(1,1);',
                                    '-moz-transition': 'scale(1,1);',
                                    '-o-transform': 'scale(1,1);',
                                    '-ms-transform': 'scale(1,1);',
                                    'transform': 'scale(1,1);'
                                }, 500, function(){
                                    oAvaBeans.animate({
                                        '-webkit-transform': 'rotateX(-360deg);',
                                        '-moz-transition': 'rotateX(-360deg);',
                                        '-o-transform': 'rotateX(-360deg);',
                                        '-ms-transform': 'rotateX(-360deg);',
                                        'transform': 'rotateX(-360deg);'
                                    }, 800, function(){
                                        oAvaBeans.text(userTotalBeans);

                                        oSignDays.animate({
                                            '-webkit-transform': 'rotateX(-360deg);',
                                            '-moz-transition': 'rotateX(-360deg);',
                                            '-o-transform': 'rotateX(-360deg);',
                                            '-ms-transform': 'rotateX(-360deg);',
                                            'transform': 'rotateX(-360deg);'
                                        }, 800, function(){
                                            oSignDays.text(strSignDays);

                                            var layerSignDesc = (needs == 0) ? ('恭喜获得额外' + bonus + '豆的连续签到奖励') : ('再签<i class="days">' + needs + '</i>天就能额外获得<i>' + bonus + '</i>美美豆');

                                            $('#j_sign_desc').html(layerSignDesc);

                                            self.updateUserSignState({'needs': needs, 'beans': userTotalBeans, 'bonus': bonus, 'continues': continues});
                                        });
                                    });

                                    if (signLayerTimeout) {
                                        clearTimeout(signLayerTimeout);
                                        signLayerTimeout = null;
                                    }

                                    signLayerTimeout = window.setTimeout(function(){
                                        $('#j_sign_layer').find('.blurry_shade').hide();

                                        //$('#j_sign_layer').animate({'opacity': 0}, 700, function(){
                                        oLayers.animate({'top': '-' + win_height + 'px'}, 700, function(){
                                            //$('#j_sign_layer').remove();

                                            //$('#j_sign_layer').find('.close_layer_btn').removeClass('active');

                                            if ((fml.vars.serverMonth == 11) && (fml.vars.serverDay == 25) && isShowBeansExpiredRemind && (curUserExpiredBeans != 0)) {
                                                var text = (userTotalBeans < 2000) ? '去抽奖' : '去兑换礼品',
                                                    href = (userTotalBeans < 2000) ? '/member/nine_lottery_v2/?frm=bean_overdue_warn' : '/member/ransom/?frm=bean_overdue_warn',
                                                    c = new confirm({
                                                        content: '亲爱的用户，您有' + curUserExpiredBeans + '美美豆即将在' + curUserBeansExpiredTime + '过期，抓紧时间兑换福利吧～',
                                                        confirmTxt: '知道了',
                                                        cancelTxt: text,
                                                        onSure: function(){
                                                            self.showTipsLayer();
                                                            return;
                                                        },
                                                        onCancel: function(){
                                                            window.location.href = href;
                                                        }
                                                    });
                                            } else {
                                                self.showTipsLayer();
                                            }
                                        });
                                    }, 3000);
                                });
                            });

                            // 发送数据统计请求
                            tracking.cr('member_main_sign', {'name_type': 'normal', 'status': 1});

                            break;
                        case 400900:
                            $('body').append($('#j_stroke_tpl').html());

                            // 发送数据统计请求
                            tracking.cr('member_main_sign', {'name_type': 'wind_control', 'status': 0});

                            break;
                        case 400901:
                            curCaptchaType = jsonData.captcha_type || '';
                            curCaptchaRuleId = jsonData.rule_id || '';

                            self.smsCaptchaValidate();

                            // 发送数据统计请求
                            tracking.cr('member_main_sign', {'name_type': 'wind_control', 'status': 1});

                            break;
                        case 400902:
                        case 400903:
                        case 400904:
                            curCaptchaType = jsonData.captcha_type || '';
                            curCaptchaDomain = jsonData.captcha_domain || '';
                            curCaptchaRuleId = jsonData.rule_id || '';

                            self.imgCaptchaValidate();

                            // 发送数据统计请求
                            tracking.cr('member_main_sign', {'name_type': 'wind_control', 'status': 1});

                            break;
                        default:
                            var message = data.message,
                                alt = new Alert ({
                                    content: message,
                                    onSure: function(){
                                        self.removeLayer();
                                        return;
                                    }
                                });

                            // 发送数据统计请求
                            tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=' + message + ':_pos_id=' + code + ':_pos_name=' + message + ':_ext_inter=/aj/member/doSign'});

                            break;
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown){
                    signAjaxRequestIsComplete = !signAjaxRequestIsComplete;
                    
                    var message = '',
                        status = XMLHttpRequest.status,
                        errorText = (textStatus == 'timeout') ? '请求超时，接口请求失败<br>请刷新试试~' : '啊哦，系统出了点小问题<br>喝杯奶茶一会儿再来试试吧~';

                    var alt = new Alert ({
                        content: errorText,
                        onSure: function(){
                            self.removeLayer();
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
                    tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=' + message + ':_pos_id=' + status + ':_pos_name=' + message + ':_ext_inter=/aj/member/doSign'});
                }
            });
        /*} else if (fml.vars.isUpgrade) {
            var upgradeTpl = shareTmp('j_upgrade_tpl');

            $('body').append(upgradeTpl);

            fml.vars.isUpgrade = 0;*/
        } else {
            self.toggleBeansTipsLayer();
        }
    },

    updateUserSignState: function(obj){
        var con_sign_days = 5,
            sign_days_html = '',
            extra_add_html = '',
            sign_state_key = '',
            sign_state_style = '',
            user_need_days = obj.needs || 0,
            user_total_beans = obj.beans || 0,
            extra_gain_beans = obj.bonus || 0,
            con_signed_days = obj.continues || 0,
            user_signed_days = con_sign_days - user_need_days,
            reward_text_color = fml.vars.pageSkinData.reward_color || '#fff',
            reward_text_style = 'color:' + reward_text_color + ';',
            sign_desc_text = (user_signed_days == 5) ? ('连续签到' + con_signed_days + '天，恭喜获得额外' + extra_gain_beans + '豆的连续签到奖励') : ('连续签到' + con_signed_days + '天，再签' + user_need_days + '天可额外获得' + extra_gain_beans + '美美豆奖励');

        for (var i = 0; i < con_sign_days; i++) {
            extra_add_html = (i == 4) ? '<div class="extra_add" style="' + reward_text_style + '">+' + extra_gain_beans + '</div>' : '';
            sign_state_key = (i < user_signed_days) ? ('signed_icon_' + (i + 1)) : ('nosign_icon_' + (i + 1));
            sign_state_icon = fml.vars.pageSkinData[sign_state_key] || 'http://d05.res.meilishuo.net/pic/_o/78/5d/f2ba215e4b25dc61c4d8b485a654_100_124.cj.png';
            sign_state_style = 'padding-top:62px;background:url(' + sign_state_icon + ') no-repeat;background-size:50px auto;background-position:center;';

            sign_days_html += [
                '<li>',
                    '<div class="icon" style="' + sign_state_style + '">',
                       extra_add_html, 
                    '</div>',
                '</li>'
            ].join('');
        }

        $('#' + fml.vars.serverStrDate).append('<div class="icon_signed"></div>');

        $('#j_sign_box').addClass('signed').css({
            'background': 'url(' + fml.vars.signedMarkIcon + ') no-repeat;',
            'background-size': '100%;'
        });

        (sign_days_html != '') && $('.sign_days_box').html(sign_days_html);
        (sign_desc_text != '') && $('.sign_desc_text').text(sign_desc_text);
        (user_total_beans != 0) && $('#user_available_beans').text(user_total_beans);
    },

    initPage: function(){
        // 初始化组图滑动
        this.imgSwipe('img_swipe_box');

        var oNavWrap = $('#nav_wrap');

        if (oNavWrap.length > 0) {
            var nav_width = 73,
                nav_list_len = oNavWrap.find('li').length || 0;

            curNavScroll = new iScroll('nav_wrap', {
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

            $('#nav_iscroll').css({
                'width': (nav_width * nav_list_len) + 'px'
            });

            curNavScroll.refresh();
        }
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            // 初始化组图滑动
            //self.imgSwipe('img_swipe_box');

            // 初始化签到动画
            if (isManualSign) {
                self.toggleBeansTipsLayer();
            } else {
                if (fml.vars.userSignStatus && fml.vars.isShowAwardLayer) {
                    var tpl = shareTmp('j_receive_beans_tpl');

                    $('body').append(tpl);
                } else {
                    self.signAnimation();
                }
            }
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

        $('body').on('click', '.j_reload_box', function(){
            window.location.reload();
        });

        $('body').on('click', '.j_login_box', function(){
            /*window.location.href = 'meilishuo://login.meilishuo/';
            return;*/

            // 判断登录，包含app和wx
            checkLogin();
        });

        $('body').on('click', '.settings_btn', function(){
            //self.removeLayer();
            //sendRemindAjaxRequest();
            window.location.href = 'meilishuo://open_app_settings.meilishuo/';
        });

        $('body').on('click', '.user_beans', function(){
            // 发送数据统计请求
            tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100001:_page_area=profile:_pos_id=3:_pos_name=BeautifulBean'});

            window.location.href = '/member/detail/bean?frm=beans_paradise_member';
        });

        $('body').on('click', '.know_btn, .knows_btn', function(){
            self.removeLayer();
        });

        $('body').on('click', '.sign_calander_box .item', function(){
            var href = $(this).data('href') || '';

            (href != '') && (window.location.href = href);
        });

        $('body').on('click', '.sign_layer_tips', function(){
            var href = $(this).data('href') || '';

            if (href != '') {
                if (href.indexOf('frm=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'frm=member_calendar';
                }

                window.location.href = href;
            }
        });

        // 点击查看当前分类商品
        $('body').on('click', '#nav_wrap li', function(){
            var that = $(this);

            if (that.hasClass('curr')) {
                return;
            }

            self.getData(that);
        });

        $('body').on('click', '.layer_receive_btn', function(){
            $('#j_upgrade_layer').remove();

            var giftTpl = shareTmp('j_gift_tpl');

            $('body').append(giftTpl);

            self.initInterestsIscroll();

            /*$('#j_gift_layer').animate({'opacity': 1}, 800, function(){
                
            });*/
        });

        $('body').on('click', '.receive_beans_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            if (ajaxRequestIsComplete) {
                return;
            }

            ajaxRequestIsComplete = !ajaxRequestIsComplete;

            $.ajax({
                url: '/aj/member/interfaces/getRunningManBonus',
                type: 'get',
                dataType: 'json',
                success: function(data){
                    ajaxRequestIsComplete = !ajaxRequestIsComplete;

                    var code = data.error_code;

                    if (code == 0) {
                        fml.vars.isShowAwardLayer = 0;

                        var jsonData = data.data,
                            oUserBeans = $('#user_available_beans'),
                            awardBeans = (jsonData && jsonData.bonus) ? jsonData.bonus : 0,
                            userTotalBeans = parseInt(oUserBeans.text()) + awardBeans;

                        oUserBeans.text(userTotalBeans);

                        self.removeLayer();

                        var tpl = shareTmp('j_receive_success_tpl');

                        $('body').append(tpl);

                        if (successLayerTimeout) {
                            clearTimeout(successLayerTimeout);
                            successLayerTimeout = null;
                        }

                        successLayerTimeout = window.setTimeout(function(){
                            self.removeLayer();

                            /*if (fml.vars.isUpgrade) {
                                var upgradeTpl = shareTmp('j_upgrade_tpl');

                                $('body').append(upgradeTpl);

                                fml.vars.isUpgrade = 0;
                            } else {
                                self.toggleBeansTipsLayer();
                            }*/

                            self.toggleBeansTipsLayer();
                        }, 3000);
                    } else {
                        var alt = new Alert ({
                            content: data.message,
                            onSure: function(){
                                self.removeLayer();
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
                            self.removeLayer();
                            return;
                        }
                    });
                }
            });
        });

        $('body').on('click', '.receive_gift_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

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
                            window.location.href = '/member/promotion_gift/?frm=beans_paradise_member';
                        } else {
                            var alt = new Alert ({
                                content: tips,
                                onSure: function(){
                                    $('#j_gift_layer').remove();
                                    return;
                                }
                            });
                        }
                    } else {
                        var alt = new Alert ({
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

        $('body').on('click', '.close_layer_btn, .blurry_shade', function(){
            if (signLayerTimeout) {
                clearTimeout(signLayerTimeout);
                signLayerTimeout = null;
            }

            var oLayers = $('#j_sign_layer .layer_shade, #j_sign_layer .layer_main');

            $('#j_sign_layer').find('.blurry_shade').hide();

            oLayers.animate({'top': '-' + win_height + 'px'}, 700, function(){
                //$('#j_sign_layer').remove();

                //$('#j_sign_layer').find('.close_layer_btn').removeClass('active');

                /*if (fml.vars.isUpgrade) {
                    var upgradeTpl = shareTmp('j_upgrade_tpl');

                    $('body').append(upgradeTpl);

                    fml.vars.isUpgrade = 0;
                } else {
                    //self.toggleBeansTipsLayer();
                }*/
            });
        });

        $('body').on('click', '#j_sign_box', function(){
            if ($(this).hasClass('signed')) {
                var oLayers = $('#j_sign_layer .layer_shade, #j_sign_layer .layer_main');

                if (!oLayers.length) {
                    var signTpl = shareTmp('j_sign_tpl', {'layer_height': sign_layer_height, 'win_height': win_height});

                    $('body').append(signTpl);

                    //$('#j_sign_layer').find('.close_layer_btn').removeClass('active');

                    oLayers = $('#j_sign_layer .layer_shade, #j_sign_layer .layer_main');  
                }

                oLayers.animate({'top': 0}, 700, function(){
                    $('#j_sign_layer').find('.blurry_shade').show();
                });

                // 发送数据统计请求
                tracking.cr('sign_calendar', {'area': 'check', 'action': 'click'});
            } else {
                self.closeBeansTipsLayer();
                self.signAnimation();
            }
        });

        $('body').on('click', '.tracking', function(){
            var that = $(this),
                pos = that.data('pos') || 0,
                name = that.data('name') || '',
                href = that.data('href') || '',
                r = '_page_id=1100001:_page_area=banner:_pos_id=' + pos + ':_pos_name=' + name;

            // 发送数据统计请求
            tracking.cr('page_element', {'_action': 'click', 'r': r});

            if (href == '') {
                // 判断是否登陆
                if (!fml.vars.isLogin) {
                    /*window.location.href = 'meilishuo://login.meilishuo/';
                    return;*/

                    // 判断登录，包含app和wx
                    checkLogin();

                    return;
                }

                if (ajaxRequestIsComplete) {
                    return;
                }

                ajaxRequestIsComplete = !ajaxRequestIsComplete;

                $.ajax({
                    url: '/aj/member/getDuibaUrl',
                    timeout: 10000,
                    type: 'post',
                    dataType: 'json',
                    success: function(data){
                        ajaxRequestIsComplete = !ajaxRequestIsComplete;

                        var code = data.error_code;

                        if (code == 0) {
                            var link = data.data || '';

                            (link != '') && (window.location.href = link);
                        } else {
                            var message = data.message,
                                alt = new Alert ({
                                    content: message,
                                    onSure: function(){
                                        return;
                                    }
                                });

                            // 发送数据统计请求
                            tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=' + message + ':_pos_id=' + code + ':_pos_name=' + message + ':_ext_inter=/aj/member/getDuibaUrl'});
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
                        tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=' + message + ':_pos_id=' + status + ':_pos_name=' + message + ':_ext_inter=/aj/member/getDuibaUrl'});
                    }
                });
            } else {
                if (href.indexOf('r=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':' + r;
                }

                window.location.href = href;
            }
        });

        $('body').on('click', '.goods_wall li', function(){
            var that = $(this),
                pos = that.data('pos') || 0,
                tid = that.data('tid') || 0,
                href = that.data('href') || '',
                tab_name = $('#nav_iscroll').find('li.curr').text() || '';

            // 发送数据统计请求
            tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100001:_page_area=MemberGoods:_pos_id=' + pos + ':_pos_name=' + tid + ':_ext_tbname=' + tab_name});

            (href != '') && (window.location.href = href);
        });

        $('body').on('click', '.do_task_box .link', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            var href = $(this).data('href') || '',
                r = '_page_id=1100010:_page_area=task';

            if (href != '') {
                if (href.indexOf('r=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':' + r;
                }

                window.location.href = href;
            }
        });

        $('body').on('click', '.do_task_box li', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            var that = $(this),
                pos = that.data('pos') || 0,
                href = that.data('href') || '';

            if (href != '') {

                switch (pos) {
                    case 0:
                        if (href.indexOf('frm=') < 0) {
                            href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'frm=member_bean';
                        }

                        break;
                    case 1:
                        if (href.indexOf('r=') < 0) {
                            var r = '_page_id=1100010:_page_area=task';

                            href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':' + r;
                        }

                        break;
                }

                window.location.href = href;
            }
        });

        $('body').on('click', '.gallery_box li', function(){
            var that = $(this),
                pos = that.data('pos') || '',
                href = that.data('href') || '',
                name = that.data('name') || '',
                title = that.data('title') || '',
                r = '_page_id=1100001:_page_area=event:_pos_id=' + pos + ':_pos_name=' + name;

            // 发送数据统计请求
            tracking.cr('page_element', {'_action': 'click', 'r': r});

            if (href != '') {
                // 发送数据统计请求
                if (href.indexOf('r=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':' + r;
                }

                window.location.href = href;
            }
        });

        $('body').on('click', '#j_sign_remind', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            if (fml.vars.isIos && fml.vars.isNewest && !$(this).hasClass('active')) {
                self.getAppNoticeState();
            } else {
                sendRemindAjaxRequest();
            }
        });
    },

    initInterestsIscroll: function(){
        var oInterestsWrap = $('#interests_wrap');

        if (oInterestsWrap.length) {
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
    },

    getAppNoticeState: function(){
        window.location.href = 'meilishuo://app_notification_enabled.meilishuo';
        window.setTimeout(function(){
            window.location.href = 'meilishuo://open_app_settings_enabled.meilishuo';
        }, 10);
    },

    initNav: function(){
        var self = this,
            // 图片加载完成后再吸顶
            oImg = $('.mall_wrap').find('img').last().get(0);

        /*if ($('#nav_iscroll').length) {
            self.imgLoaded(oImg, self.navFixed);
        }*/
    },

    getData: function(me){
        var $me = $(me);

        $('.goods_wall').html('');
        $me.addClass('curr').siblings().removeClass('curr');

        beans_paradise.posterWall($me.data('cid'));

        document.body.scrollTop = document.body.scrollTop + 1;

        $('#nav_iscroll').hasClass('scrollin') && document.getElementById('tip_box').scrollIntoView();
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

    navFixed: function(){
        var oNavBar = $('#nav_iscroll');

        scroll.yIn(oNavBar.position().top - 60, function(){
            oNavBar.removeClass('scrollout').addClass('scrollin shadow');
        },
        function(){
            oNavBar.removeClass('scrollin shadow').addClass('scrollout');
        });
    },

    posterWall: function(cid){
        var self = this,
            search = '',
            cate_id = cid || '';

        search = (ajaxRequestUrl.indexOf('?') >= 0 ? '&' : '?') + 'cate_id=' + cate_id + '&page=20';

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
                    //oPullUp.attr('status', 'stop');
                } else {
                    oPullUp.show();
                    //oPullUp.attr('status', 'tap');
                }

                self.lazyer.load();
            }
        });
    },

    // 组图swipe
    imgSwipe: function(id){
        var obj = null,
            oLi = $('#' + id).children().eq(1).find('li');

        obj = new Swipe(document.getElementById(id), {
            startSlide: 0,
            auto: 4000,
            speed: 300,
            //stopPropagation: true,
            callback: function(index, element){
                // 焦点图当前状态
                oLi.removeClass('active').eq(index).addClass('active');
            }
        });
    },

    imgCaptchaValidate: function(){
        var self = this,
            imgCaptchaUrl = curCaptchaDomain + 'Captcha/Captcha?token=9adfc893s&type=' + curCaptchaType,
            tpl = shareTmp('img_captcha_tpl', {'picUrl': imgCaptchaUrl + '&timestamp=' + new Date().getTime()});

        $('body').append(tpl);

        // 更换图片
        $('.newImg').on('click', function(){
            $('.captchaImg').attr('src', imgCaptchaUrl + '&timestamp=' + new Date().getTime());
        });

        $('.imgCaptchaClose').on('click', function(){
            self.removeLayer();
        });

        // 验证图片
        $('.imgCaptchaCheck').on('click', function(){
            var captchaVal = $.trim($('.captchaInput').val()) || '';

            if (captchaVal == '') {
                return;
            }

            var imgCheckUrl = '/aj/captcha/picValidate',
                params = {
                    'expire_type': 'today',
                    'captcha': captchaVal,
                    'ruleid': curCaptchaRuleId
                };

            $.get(imgCheckUrl, params, function(data){
                if (data.code == 0) {
                    self.removeLayer();
                    self.signAnimation();
                } else {
                    $('.imgCenter').css('display', 'block');
                    $('.captchaImg').attr('src', imgCaptchaUrl + '&timestamp=' + new Date().getTime());
                }
            }, 'json');
        });
    },

    smsCaptchaValidate: function(){
        var self = this,
            tpl = shareTmp('sms_captcha_tpl', {'picUrl': '/aj/captcha/getSms?rule_id=' + curCaptchaRuleId + '&smstype=active_sm_captcha'});

        $('body').append(tpl);

        $('.smsClose').on('click', function(){
            self.removeLayer();
        });

        // 获取短信验证码
        var canGetSms = true,
            changeSmsStatus = function(that){
                that.text('60秒后重新发送');
                that.css({'border-color': '#ccc2c9', 'color': '#ccc2c9'});

                var countdownTimer = setInterval(function(){
                    if (that.smsTime == 0) {
                        clearInterval(countdownTimer);
                        canGetSms = true;
                        that.text('点击发送');
                        that.css({'border-color': '#ff94b7', 'color': '#ff95b6'});
                    } else {
                        that.text(that.smsTime + '秒后重新发送');
                        that.smsTime--;
                    }

                }, 1000);
            };

        $('.getSmsCaptcha').on('click', function(){
            if (!canGetSms) {
                return;
            }

            canGetSms = false;

            var that = $(this);

            that.smsTime = 59;
            changeSmsStatus(that);

            var getSmsUrl = '/aj/captcha/getSms',
                params = {
                    'smstype': 'active_sm_captcha',
                    'rule_id': curCaptchaRuleId
                };

            $.get(getSmsUrl, params, function(data){
                if (data.code == 0) {
                    // 验证短信
                    $('.captchaCheck').css('background-color', '#ff94b7');
                } else {
                    canGetSms = true;
                }
            }, 'json');
        });

        $('.captchaCheck').on('click', function(){
            var captchaVal = $.trim($('.captchaInput').val()) || '';

            if (captchaVal == '') {
                return;
            }

            var smsCheckUrl = '/aj/captcha/smsValidate',
                params = {
                    'expire_type': 'today',
                    'smstype': 'active_sm_captcha',
                    'captcha': captchaVal,
                    'ruleid': curCaptchaRuleId
                };

            $.get(smsCheckUrl, params, function(data){
                if (data.code == 0) {
                    self.removeLayer();
                    self.signAnimation();
                } else {
                    $('.smsCenter').css('display', 'block');
                }
            }, 'json');
        });
    },

    showTipsLayer: function(){
        if (fml.vars.isShowAwardLayer) {
            var tpl = shareTmp('j_receive_beans_tpl');

            $('body').append(tpl);
        } else {
            /*if (fml.vars.isUpgrade) {
                var upgradeTpl = shareTmp('j_upgrade_tpl');

                $('body').append(upgradeTpl);

                fml.vars.isUpgrade = 0;
            } else {
                this.toggleBeansTipsLayer();
            }*/

            this.toggleBeansTipsLayer();
        }
    },

    closeBeansTipsLayer: function(){
        var oLayer = $('#beans_tips_wrap');

        if (oLayer.length) {
            isShowBeansTipsLayer = false;

            if (beansTipsLayerTimeout) {
                clearTimeout(beansTipsLayerTimeout);
                beansTipsLayerTimeout = null;
            }

            oLayer.animate({'opacity': 0}, 500, function(){
                oLayer.remove();
            });
        }
    },

    toggleBeansTipsLayer: function(){
        var oLayer = $('#beans_tips_wrap');

        if (isShowBeansTipsLayer && oLayer.length) {
            if (beansTipsLayerTimeout) {
                clearTimeout(beansTipsLayerTimeout);
                beansTipsLayerTimeout = null;
            }

            beansTipsLayerTimeout = window.setTimeout(function(){
                oLayer.animate({'opacity': 0}, 500, function(){
                    oLayer.remove();
                });
            }, 5000);
        }
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    }
};

// 初始化页面
beans_paradise.init();
