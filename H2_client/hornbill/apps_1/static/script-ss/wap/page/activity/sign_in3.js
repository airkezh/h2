/*common*/

/**
 * @fileoverview 首页 － 每日签到
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-03-27
 */

require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var tracking = require('wap/app/tracking');
var shareTmp = require('wap/component/shareTmp');

var oSignText = $('#sign_text');
var oTotalCoin = $('#total_coin');
var isNewcomer = fml.vars.isLogin && (curFirstSignDate == '') && toString.apply(curUserUpgradeData) === '[object Array]';
var isOldUser = fml.vars.isLogin && (curFirstSignDate == '') && toString.apply(curUserUpgradeData) === '[object Object]';
var signInAjaxUrl = isNewcomer ? '/aw/sign/init' : '/aw/sign/signIn';

$.ajaxSettings.async = false;

// 登陆成功后的回调函数
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var initSignIn = {
    'init': function() {
        this.initPage();    // 初始化页面
        this.bindEvent();   // 初始化事件绑定
    },

    'initPage': function() {
        var self = this;

        if (isOldUser) {
            $('body').append($('#signin_update_layer').html());
        } else if (isNewcomer) {
            $('body').append($('#signin_init_layer').html());
        } else {
            // 第一次签到，弹出说明弹层，打开开关 还要判断cookie
            //firstView && $('body').append($('#signin_tips_layer').html());
        }

        // 钱数清0动画
        if ((typeof resetMoney != 'undefined') && (window.location.hash.indexOf('cResetMoney') < 0)) {
            var ceilMoney = Math.ceil(resetMoney / 8);

            oTotalCoin.text(resetMoney);

            setTimeout(function() {
                resetMoney = resetMoney - ceilMoney;
                oTotalCoin.text(resetMoney);

                if (resetMoney > 0) {
                    setTimeout(arguments.callee, 100);
                } else if (resetMoney < 0) {
                    oTotalCoin.text(0);
                }
            }, 1000);

            // 还需要一个resetMoney过期的url参数，防止用户刷新
            window.location.hash = 'cResetMoney';
        }
    },

    // 初始化事件绑定
    'bindEvent': function() {
        var self = this;

        window.onload = function() {
            setTimeout(function() {
                var oLoadShade = $('.load_shade');

                oLoadShade.animate({'opacity': 0}, 1000);

                setTimeout(function(){
                    oLoadShade.hide();
                }, 100);

                $('.signin_box').addClass('up_down');
            }, 100);

            // 发送数据统计请求
            tracking.cr('sign_pageshow', {'action': 'show', 'name': 'pigalive'});
        };

        // 关闭浮层
        $('body').on('click', '.come_on, .know_btn, .p_charge_btn', function(){
            self.removeLayer();
        });

        // 升级
        $('body').on('click', '.p_update_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            self.removeLayer();

            var that = $(this);

            if (that.attr('loading') == 1) {
                return;
            }

            that.attr('loading', 1);

            $.ajax({
                url: '/aw/sign/upgrade',
                type: 'post',
                dataType: 'json',
                success: function(data){
                    var code = data.code;

                    if (code == 0) {
                        var alt = new Alert ({
                            content : '升级成功！',
                            onSure : function(){
                                return;
                            }
                        });

                        var coin = data.data.coin || 0,
                            temp = data.data.temp || 0;

                        oTotalCoin.text(coin);
                        oSignText.html('已签 <div>' + temp + '</div> 天，再签<span class="day"> ' + (5 - temp) + ' </span>天可得<span> 5 </span>金币');
                    } else if (code == 400900) {
                        $('body').append($('#signin_stroke_layer').html());
                    } else {
                        var alt = new Alert ({
                            content : '升级失败！',
                            onSure : function(){
                                return;
                            }
                        });
                    }

                    that.attr('loading', 0);
                },
                error: function(){
                    that.attr('loading', 0);

                    var alt = new Alert ({
                        content : '系统繁忙！',
                        onSure : function(){
                            return;
                        }
                    });
                }
            });
        });

        // 签到
        fml.vars.signOff = 0;
        $('body').on('click', '.p_signin_btn', function(){

            if (fml.vars.signOff) {
                return;
            };

            fml.vars.signOff = 1;

            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            // 发送签到请求
            $.ajax({
                url: signInAjaxUrl,
                type: 'post',
                dataType: 'json',
                success: function(data){
                    fml.vars.signOff = 0;
                    var code = data.code;

                    if (code == 0) {
                        $('.top_main').find('.coin').addClass('coin_animate');

                        /*if (isNewcomer) {
                            oSignText.html('<span>5 </span>元大钞入手');
                            oTotalCoin.text(5);

                            setTimeout(function() {
                                oSignText.html('已攒 <div>4</div> 元，再签<span class="day"> 1 </span>天可得<span> 5 </span>元');
                            }, 1000);
                        } else {
                            // 连续签到天数+1
                            curUserConDays = (+curUserConDays) + 1;

                            if (curUserConDays && ((curUserConDays % 5) == 0)) {
                                oSignText.html('<span>5 </span>元大钞入手');
                                oTotalCoin.text(curUserTotalCoin + 5);
                            } else {
                                oSignText.html('已攒 <div>' + curUserConDays + '</div> 元，再签<span class="day"> ' + (5 - curUserConDays) + ' </span>天可得<span> 5 </span>元');
                            }
                        }*/

                        // 连续签到天数+1
                        curUserConDays = (+curUserConDays) + 1;

                        if (curUserConDays && ((curUserConDays % 5) == 0)) {
                            oSignText.html('<span>5 </span>枚金币入手');
                            oTotalCoin.text(curUserTotalCoin + 5);
                        } else {
                            oSignText.html('已签 <div>' + curUserConDays + '</div> 天，再签<span class="day"> ' + (5 - curUserConDays) + ' </span>天可得<span> 5 </span>金币');
                        }

                        setTimeout(function() {
                            window.location.href = '/activity/sign/sign_mall/?hdtrc=tuan1300_qiandao';
                        }, 2500);
                    } else if (code == 400900) {
                        $('body').append($('#signin_stroke_layer').html());
                    } else {
                        var alt = new Alert ({
                            content : '签到失败！',
                            onSure : function(){
                                return;
                            }
                        });
                    }
                },
                error: function(){
                    var alt = new Alert ({
                        content : '系统繁忙！',
                        onSure : function(){
                            return;
                        }
                    });
                }
            });
        });
    },

    // 移除弹层
    'removeLayer': function() {
        $('.j_layer_main').remove();
        $('.j_layer_shade').remove();
    }
};

// 初始化页面
initSignIn.init();
