/*common*/

/**
 * @fileoverview 会员信息补全－会员中心
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-09-07
 */

require('jquery');
//require('wap/zepto/fastclick');

//var $ = require('wap/zepto');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var checkLogin = require('circle/app/checkLogin');

var reback_timer = false;
var cur_pre_captcha = '';
var errorPromptLayerTimeout;
var ajaxRequestIsComplete = false;
var MOBILE_REG_EXP = /^\d{11}$/;
var CAPTCHA_REG_EXP = /^[0-9]{6}$/;
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

// 客户端app回调函数
window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

// 倒计时
var timeDown = function(times, cbk){
    if (!times) {
        return;
    } else if (reback_timer) {
        cbk(0);

        reback_timer = false;
    }else {
        times--;

        cbk(times);

        win_timer = setTimeout(function(){
            timeDown(times, cbk);
        }, 1000);
    }
};

var bind_mobile = {
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

        this.initEvent();
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            
        };

        $('body').on('click', '#send_captcha', function(){
            if ($(this).hasClass('disabled')) {
                return;
            }

            var mobile = $.trim($('#mobile_input').val());

            if (mobile == '') {
                self.togglePromptLayer('手机号码还没填写哦~');
                return;
            }

            if (!MOBILE_REG_EXP.test(mobile)) {
                self.togglePromptLayer('手机号码格式不正确，<br>请检查后重新填写哦~');
                return;
            }

            var url = '',
                data = null,
                flag = $(this).data('flag') || '';

            if (flag == 'new') {
                url = '/aj/sendcode/sCode2',
                data = {
                    'mobile': mobile,
                    'smsType': 'change_bind_mobile_captcha',
                    'frm': 'post_bind'
                };
            } else if (flag == 'original') {
                url = '/aj/sendcode/sCode';
                data = {
                    'smsType': 'change_bind_mobile_captcha',
                    'frm': 'post_bind'
                };
            }

            if (!data || (url == '')) {
                return;
            }

            self.sendCaptchaRequest(url, data);
        });

        $('body').on('click', '#confirm_btn', function(){
            if (ajaxRequestIsComplete) {
                return;
            }

            ajaxRequestIsComplete = !ajaxRequestIsComplete;

            var flag = $(this).data('flag') || '';

            self.verifyBindMobile(flag);
        });
    },

    sendCaptchaRequest: function(url, data){
        var self = this,
            time = 60,
            oBtn = $('#send_captcha');

        var start = function(){
            timeDown(time, function(times){
                if (!times) {
                    reback_timer = false;
                    oBtn.removeClass('disabled').text('发送验证码');
                } else {
                    oBtn.addClass('disabled').text(times + '秒');
                }
            });
        };

        start();

        $.ajax({
            url: url,
            timeout: 10000,
            type: 'get',
            data: data,
            dataType: 'json',
            success: function(data){
                var code = data.code;

                if (code == 0) {
                    
                } else {
                    reback_timer = true;

                    var errorText = (code == 4) ? '绑定失败，该手机号已被其他账户绑定，可使用该手机号登录后完善信息，或先解绑后才能绑定' : data.message;

                    self.togglePromptLayer(errorText);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                var errorText = (textStatus == 'timeout') ? '请求超时~' : '服务器开小差，请稍后重试~';

                self.togglePromptLayer(errorText);
            }
        });
    },

    verifyBindMobile: function(flag){
        var self = this,
            mobile = $.trim($('#mobile_input').val()),
            captcha = $.trim($('#captcha_input').val());

        var url = '',
            data = null;

        if (flag == 'new') {
            var pre_captcha = urlHandle.getParams(window.location.search).pre_captcha || '';

            url = '/aj/sendcode/changeBind';
            data = {
                'mobile': mobile,
                'captcha': captcha,
                'pre_captcha': pre_captcha,
                'smsType': 'change_bind_mobile_captcha'
            };
        } else if (flag == 'original') {
            cur_pre_captcha = captcha;

            url = '/aj/sendcode/sBind';
            data = {
                'captcha': captcha,
                'smsType': 'change_bind_mobile_captcha',
                'frm': 'bindok'
            };
        }

        if (!data || (url == '')) {
            return;
        }

        if (mobile == '') {
            self.togglePromptLayer('手机号码还没填写哦~');
            return;
        }

        if (!MOBILE_REG_EXP.test(mobile)) {
            self.togglePromptLayer('手机号码格式不正确，<br>请检查后重新填写哦~');
            return;
        }

        if (captcha == '') {
            self.togglePromptLayer('验证码还没填写哦~');
            return;
        }

        if (!CAPTCHA_REG_EXP.test(captcha)) {
            self.togglePromptLayer('验证码填写有误，<br>请检查后重新填写哦~');
            return;
        }

        $.ajax({
            url: url,
            timeout: 10000,
            type: 'post',
            data: data,
            dataType: 'json',
            success: function(data){
                var code = data.code;

                if (code == 0) {
                    if (flag == 'new') {
                        self.togglePromptLayer('手机号码更换成功~');

                        window.setTimeout(function(){
                            window.location.href = '/member/complement_info/?frm=huiyuanbanner#1';
                        }, 2000);
                    } else if (flag == 'original') {
                        self.togglePromptLayer('手机号码验证成功~');

                        window.setTimeout(function(){
                            window.location.href = '/member/bind_mobile/new?pre_captcha=' + cur_pre_captcha;
                        }, 2000);
                    }
                } else {
                    var errorText = data.message;

                    if ((flag == 'new') && (code == -4)) {
                        errorText = '绑定失败，该手机号已被其他账户绑定，可使用该手机号登录后完善信息';
                    }

                    self.togglePromptLayer(errorText);
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                var errorText = (textStatus == 'timeout') ? '请求超时~' : '服务器开小差，请稍后重试~';

                self.togglePromptLayer(errorText);
            }
        });
    },

    togglePromptLayer: function(text){
        var text = text || '服务器开小差，请重新保存~',
            tpl = shareTmp('j_error_prompt_tpl', {'text': text});

        $('body').append(tpl);

        var oLayer = $('#j_error_prompt_layer');

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
    }
};

// 初始化页面
bind_mobile.init();
