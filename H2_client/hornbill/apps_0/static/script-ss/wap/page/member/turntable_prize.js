/*common*/

/**
 * @fileoverview 我的大转盘奖品 － 会员中心
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-07-01
 */

require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var pin = require('wap/component/wapfall');
var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');

var oPullUp = $('.pullUp');
var oGoTopWrap = $('.gotop_wrap');
var win_width = $(window).width();
var win_height = $(window).height();
var ajaxRequestUrl = '/aj/member/interfaces/getMyAwards';

var urlData;
var pullUpAction;
var curPickAddressBtn;
var isPosterLoad = false;
var isFirstAjaxRequest = true;
var ajaxRequestIsComplete = false;
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    },

    onPickAddress: function(res){
        var code = res.code;

        if ((code == 0) && curPickAddressBtn) {
            var data = (fml.vars.isAndroid ? res.info : $.parseJSON(res.info)) || {},
                addrId = data.addr_id || '',
                phone = data.phone || '',
                address = data.address || '',
                nickname = data.nickname || '',
                address = address.substr(0, 18) + '...',
                nicknameLen = nickname.length || 0,
                nickname = (nicknameLen <= 4) ? nickname : nickname.substr(0, 4) + '...',
                recordId = curPickAddressBtn.data('recoid') || 0;

            if (ajaxRequestIsComplete) {
                return;
            }

            ajaxRequestIsComplete = !ajaxRequestIsComplete;

            $.ajax({
                url: '/aj/member/interfaces/saveContactInfo',
                type: 'post',
                data: {
                    'addr_id': addrId,
                    'record_id': recordId
                },
                dataType: 'json',
                success: function(data){
                    var code = data.error_code;

                    if (code == 0) {
                        curPickAddressBtn.hide().siblings('.state').text('商品准备中');
                    } else {
                        var alt = new Alert ({
                            content : '保存失败！',
                            onSure : function(){
                                return;
                            }
                        });
                    }

                    ajaxRequestIsComplete = !ajaxRequestIsComplete;
                },
                error: function(){
                    var alt = new Alert ({
                        content : '服务器开小差中...请稍后再试~',
                        onSure : function(){
                            return;
                        }
                    });

                    ajaxRequestIsComplete = !ajaxRequestIsComplete;
                }
            });
        }
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
        var jsonData = data.data || [],
            dataLen = jsonData.length;

        if ((dataLen > 0) || (isFirstAjaxRequest && (dataLen == 0))) {
            oPullUp.attr('status', 'tap');
            pin.append(shareTmp('posterWall', data));
            urlData.frame++;
            isPosterLoad = true;
        }

        isFirstAjaxRequest = false;
    },

    scrollPoster: function(isscroll){
        function scrollPoster(pos, isDown){
            if (isDown) {
                var pullUpTop = oPullUp[0].getBoundingClientRect().top;

                if (isPosterLoad && ((pullUpTop - 100) <= win_height)) {
                    pullUpAction();
                }
            }
        }

        scroll.bind(scrollPoster, 'scrollPoster');
    },

    testPoster0: function(data, action){
        urlData = data;
        pullUpAction = action;

        pullUpAction(urlData);
    }
};

var turntablePrize = {
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

		this.bindEvent();
        this.posterWall();
        this.lazyer = lazy.init({'xpath': '.bs_load_img'});
        this.lazyer.scroll();
	},

	bindEvent: function(){
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

        $('body').on('click', '.j_beans_btn', function(){
            window.location.href = '/member/beans_paradise/?frm=my_turntable_prize&r=' + fml.vars.r;
        });

        $('body').on('click', '.j_coupons_btn', function(){
            window.location.href = 'meilishuo://coupons.meilishuo';
        });

        $('body').on('click', '.j_add_address', function(){
            if (!fml.vars.isNewest && fml.vars.isAndroid) {
                var c = new confirm({
                    content: '当前版本不支持编辑地址，请升级最新版本后，在“会员签到－抽奖大转盘－我的奖品”中继续填写地址。',
                    onSure: function(){
                        window.location.href = '/download/latest/wap';
                    },
                    onCancel: function(){
                        return;
                    }
                });
            } else {
                curPickAddressBtn = $(this);

                window.location.href = 'meilishuo://pick_address.meilishuo';
            }
        });
	},

    posterWall: function(){
        var self = this;

        pin.init({
            containerId: '.goods_wall'
        });

        var ajaxData = {
                'frame': 1,
                'page': 20,
                'now': 0,
                'act_code': fml.vars.code
            },
            pullUpFn = function(){
                posterWalls.ajaxPoster(ajaxRequestUrl);
            };

        Meilishuo.config.poster0 = '';
        posterWalls.testPoster0(ajaxData, pullUpFn);
        posterWalls.scrollPoster(true);

        fml.eventProxy('logPoster', function(res){
            var jsonData = res.data || [];

            if (jsonData) {
                if (!jsonData.length) {
                    oPullUp.hide();
                    isPosterLoad = false;
                } else {
                    oPullUp.show();
                }

                self.lazyer.load();
            }
        });
    }
}

turntablePrize.init();
