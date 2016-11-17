/*common*/

/**
 * @fileoverview 美美豆每日抢券－会员中心
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-09-18
 */

require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var confirm = require('wap/ui/confirm');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');

var curCaptchaType;
var curCaptchaDomain;
var curCaptchaRuleId;
var errorPromptLayerTimeout;
var ajaxRequestIsComplete = false;
var oGoTopWrap = $('.gotop_wrap');
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

// 客户端app回调函数
window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var beans_coupon = {
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
        this.renderCouponHtml('plat');
        this.renderCouponHtml('shop');
        this.initEvent();
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

        $('body').on('click', '.j_login_box', function(){
            //window.location.href = 'meilishuo://login.meilishuo/';
            //return;

            // 判断登录，包含app和wx
            checkLogin();
        });

        $('body').on('click', '.j_main_box', function(){
            // 发送数据统计请求
            //tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100001:_page_area=profile:_pos_id=1:_pos_name=MemberRights'});

            window.location.href = '/member/beans_paradise/?frm=beans_coupon';
            return;
        });

        $('body').on('click', '.shop_wrap', function(){
            var href = $(this).data('href') || '';

            if (href != '') {
                if (href.indexOf('r=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':_page_id=1100006:_page_area=coupon.Shopcoupon';
                }

                window.location.href = href;
            }

            return;
        });

        // 点击兑券
        $('body').on('click', '.coupon_wrap .coupon', function(){
            var that = $(this),
                flag = that.data('flag') || '',
                r = (flag == 'plat') ? '_page_id=1100006:_page_area=coupon' : '_page_id=1100006:_page_area=coupon.Shopcoupon';

            // 发送数据统计请求
            tracking.cr('page_element', {'_action': 'click', 'r': r});

            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            if (ajaxRequestIsComplete) {
                return;
            }

            ajaxRequestIsComplete = !ajaxRequestIsComplete;

            var code = that.data('code') || '',
                state = that.data('state') || '',
                level = parseInt(that.data('level')) || 0,
                beans = parseInt(that.data('beans')) || 0,
                userBeans = parseInt($('#j_user_beans').text()) || 0,
                userLevel = parseInt($('#j_user_level').data('level')) || 0;

            if (code == '') {
                return;
            }

            if ((state == 'can_apply') || (state == 'apply_once_more')) {
                if (userLevel < level) {
                    self.togglePromptLayer('会员等级不够，加油升级吧~');

                    return;
                }

                if (userBeans < beans) {
                    self.togglePromptLayer('美美豆不足，坚持每日签到领美美豆吧！');

                    return;
                }

                var c = new confirm({
                    content: '确定要使用' + beans + '美美豆兑换？',
                    confirmTxt: '确定',
                    onSure: function(){
                        // 兑换优惠券
                        self.sendCouponAjax(that);

                        ajaxRequestIsComplete = !ajaxRequestIsComplete;

                        return;
                    },
                    onCancel: function(){
                        ajaxRequestIsComplete = !ajaxRequestIsComplete;

                        return;
                    }
                });
            } else if (state == 'grade_not_enough') {
                if (userLevel < level) {
                    self.togglePromptLayer('会员等级不够，加油升级吧~');

                    return;
                }
            } else {
                ajaxRequestIsComplete = !ajaxRequestIsComplete;
            }
        });
    },

    sendCouponAjax: function(that){
        var self = this,
            sid = that.data('sid') || '',
            code = that.data('code') || '',
            type = that.data('type') || '',
            flag = that.data('flag') || '',
            beans = parseInt(that.data('beans')) || 0;

        if ((code == '') || (type == '') || (sid == '')) {
            return;
        }

        var name = (flag == 'plat') ? 'platform_coupon' : 'shop_coupon';

        $.ajax({
            url: '/aj/member/interfaces/applyCoupon',
            type: 'post',
            data: {
                'code': code,
                'type': type,
                'name': name,
                'shop_id': sid
            },
            dataType: 'json',
            success: function(data){
                var code = data.error_code,
                    jsonData = data.data || {};

                switch (code) {
                    case 0:
                        var success = jsonData.success || 0;

                        if (success == 1) {
                            self.updateUserState(beans);

                            self.updateCouponState(that, jsonData);

                            var beans_text = '',
                                convert_text = '',
                                state = jsonData.state || '',
                                url = that.data('url') || '',
                                href = (flag == 'plat') ? '/member/beans_paradise/?frm=beans_coupon' : url,
                                r = (flag == 'plat') ? '_page_id=1100006:_page_area=coupon' : '_page_id=1100006:_page_area=coupon.Shopcoupon';

                            if ((href != '') && (href.indexOf('r=') < 0)) {
                                href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':' + r;
                            }

                            switch (state) {
                                case 'can_apply':
                                case 'apply_once_more':
                                case 'grade_not_enough':
                                    beans_text = beans + '美美豆';
                                    convert_text = '立即兑换';

                                    break;
                                case 'not_start':
                                    beans_text = '未开始';
                                    convert_text = '敬请期待';

                                    break;
                                case 'applied':
                                    beans_text = '明日再来';
                                    convert_text = '已兑换';

                                    break;
                                case 'tomorrow':
                                    beans_text = '明日再来';
                                    convert_text = '已抢光';

                                    break;
                                case 'empty':
                                    beans_text = '明日再来';
                                    convert_text = '已抢光';

                                    break;
                                default:
                                    var str = Number(state);

                                    if (!isNaN(str)) {
                                        var hours = parseInt(str) || 0,
                                            day_text = (hours < fml.vars.hours) ? '明日' : '今日';

                                        beans_text = day_text + hours + ':00';
                                        convert_text = '再来兑换';
                                    } else {
                                        beans_text = beans + '美美豆';
                                        convert_text = '立即兑换';
                                    }

                                    break;
                            }

                            that.find('.beans_text').text(beans_text);
                            that.find('.convert_text').text(convert_text);

                            var c = new confirm({
                                content: '恭喜，兑换成功！<br>优惠券已经放入你的账户',
                                confirmTxt: '立即使用',
                                cancelTxt: '知道了',
                                onSure: function(){
                                    ajaxRequestIsComplete = !ajaxRequestIsComplete;

                                    (href != '') && (window.location.href = href);

                                    return;
                                },
                                onCancel: function(){
                                    ajaxRequestIsComplete = !ajaxRequestIsComplete;

                                    return;
                                }
                            });
                        } else {
                            self.togglePromptLayer(jsonData.tips);
                        }

                        break;
                    case 400900:
                        self.togglePromptLayer('账户异常，请联系客服400-080-0577确认，感谢支持！');

                        break;
                    case 400901:
                        curCaptchaType = jsonData.captcha_type || '';
                        curCaptchaRuleId = jsonData.rule_id || '';

                        self.smsCaptchaValidate();

                        break;
                    case 400902:
                    case 400903:
                    case 400904:
                        curCaptchaType = jsonData.captcha_type || '';
                        curCaptchaDomain = jsonData.captcha_domain || '';
                        curCaptchaRuleId = jsonData.rule_id || '';

                        self.imgCaptchaValidate();

                        break;
                    default:
                        self.togglePromptLayer(data.message);

                        break;
                }

                ajaxRequestIsComplete = !ajaxRequestIsComplete;
            },
            error: function(){
                self.togglePromptLayer('兑换失败，美美豆不会扣除，请重新兑换');

                ajaxRequestIsComplete = !ajaxRequestIsComplete;
            }
        });
    },

    updateUserState: function(threshold){
        var oUserBeans = $('#j_user_beans'),
            thresholdBeans = threshold || 0,
            curUserBeans = parseInt(oUserBeans.text()) || 0,
            tempUserBeans = ((curUserBeans - thresholdBeans) > 0) ? (curUserBeans - thresholdBeans) : 0;

        oUserBeans.text(tempUserBeans);
    },

    updateCouponState: function(oThat, data){
        var img = data.coupon_img || '',
            oCoupon = oThat.find('.lave_coupon_amount');

        if (img != '') {
            var state = data.state || '';

            //oThat.data('state', state);
            oThat.data('state', state).css({'background': 'url(' + img + ') no-repeat','background-size': '100%'});
        }

        if (oCoupon.length > 0) {
            var curAmount = parseInt(oCoupon.text()) || 0,
                tempAmount = ((curAmount - 1) > 0) ? (curAmount - 1) : 0;

            oCoupon.text(tempAmount);
        }
    },

    renderCouponHtml: function(type){
        var type = type || '';

        if (type == '') {
            return;
        }

        var name = (type == 'plat') ? 'platform_coupon' : 'shop_coupon';

        $.ajax({
            url: '/aj/member/interfaces/getCoupon',
            timeout: 10000,
            type: 'get',
            data: {
                'type': 'mob',
                'name': name
            },
            dataType: 'json',
            success: function(data){
                var code = data.error_code;

                if (code == 0) {
                    var jsonData = data.data;

                    if (jsonData) {
                        if (type == 'plat') {
                            var couponData = jsonData.self_coupon || [],
                                tpl = shareTmp('plat_coupon_tpl', {'couponData': couponData, 'hours': fml.vars.hours});

                            $('#plat_coupon_box').html(tpl);
                        } else if (type == 'shop') {
                            var couponData = jsonData.shop_coupon || [],
                                tpl = shareTmp('shop_coupon_tpl', {'couponData': couponData, 'hours': fml.vars.hours, 'ruleData': fml.vars.couponRuleTextArr});

                            $('#shop_coupon_box').html(tpl);
                        }
                    }
                } else {
                    var alt = new Alert ({
                        content: data.message,
                        confirmTxt: '确定',
                        onSure: function(){
                            return;
                        }
                    });
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                var status = XMLHttpRequest.status,
                    errorText = (textStatus == 'timeout') ? '请求超时，接口请求失败<br>请刷新试试~' : '啊哦，系统出了点小问题<br>喝杯奶茶一会儿再来试试吧~';

                var alt = new Alert ({
                    content: errorText,
                    confirmTxt: '好哒~',
                    onSure: function(){
                        return;
                    }
                });
            }
        });
    },

    errorTipsLayer: function(){
        if (fml.vars.isLogin && (fml.vars.isNormalGetData == -1)) {
            var errorText = '啊哦，系统出了点小问题<br>喝杯奶茶一会儿再来试试吧~';

            if (errorText != '') {
                var alt = new Alert ({
                    content: errorText,
                    confirmTxt: '好哒~',
                    onSure: function(){
                        return;
                    }
                });

                // 发送数据统计请求
                //tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=服务器开小差，请稍后重试~:_pos_id=500:_pos_name=服务器开小差，请稍后重试~:_ext_inter=/sign/getInfo'});
            }
        }
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

    togglePromptLayer: function(text){
        var text = text || '服务器开小差，请重新保存~',
            tpl = shareTmp('error_prompt_tpl', {'text': text});

        $('body').append(tpl);

        var oLayer = $('#error_prompt_layer');

        oLayer.animate({'opacity': 1}, 500, function(){
            if (errorPromptLayerTimeout) {
                clearTimeout(errorPromptLayerTimeout);
                errorPromptLayerTimeout = null;
            }

            errorPromptLayerTimeout = window.setTimeout(function(){
                oLayer.animate({'opacity': 0}, 500, function(){
                    oLayer.remove();

                    ajaxRequestIsComplete = !ajaxRequestIsComplete;
                });
            }, 1000);
        });
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();

        ajaxRequestIsComplete = !ajaxRequestIsComplete;
    }
};

// 初始化页面
beans_coupon.init();
