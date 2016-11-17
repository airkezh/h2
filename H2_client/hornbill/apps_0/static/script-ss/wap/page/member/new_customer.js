/*common*/

/**
 * @fileoverview 首页－新客
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-11-20
 */

require('wap/iscroll');
require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var bury = require('wap/component/paramR');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');
var getLink = require("wap/page/member/page_get_link");
var lazy = require('wap/component/lazzyLoad');
var WaterFall = require("wap/page/member/waterfall");

var oGoTopWrap = $('.gotop_wrap');
var oTipsLayer = $('.tips_layer');
var win_width = $(window).width();
var win_height = $(window).height();
var sign_layer_height = (win_height * 0.8) + (95 / 2) + 2;

var curCaptchaType;
var curCaptchaDomain;
var curCaptchaRuleId;
var signLayerTimeout;
var successLayerTimeout;
var promptLayerTimeout;
var beansTipsLayerTimeout;
var memberInterestsIscroll;
var isShowBeansTipsLayer = true;
var ajaxRequestIsComplete = false;
var signAjaxRequestIsComplete = false;
var remindAjaxRequestIsComplete = false;
var curAppNotificationEnabled = undefined;
var curAppOpenSettingsEnabled = undefined;
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;
var isManualSign = curUrlSearchParams.isManualSign;

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
            new_customer.removeLayer();

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
                        $('#j_sign_remind').addClass('active');

                        remindAjaxRequestIsComplete = !remindAjaxRequestIsComplete;
                    });
                } else {
                    togglePromptLayer('已关闭提醒', function(){
                        $('#j_sign_remind').removeClass('active');

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

$('a').attr('target', '');

var r = fml.vars.r;
var id = fml.vars.id;
var lazyLoad = lazy.init({xpath: '.pic_load'});

lazyLoad.load();
lazyLoad.scroll();

$('body').on('click', '.main a', function(e){
    e.preventDefault();

    var ohref = $(this).attr('href'),
        nhref = bury.editUrlParamR(ohref, {name: 'r', value: r, aid: id});

    $('body').append($('<img src="http://sense.meilishuo.com/jm_stat?refer=' + encodeURIComponent(window.location.href) + '&url=' + encodeURIComponent(ohref) + '" class="appendImg" style="display:none">'));

    $('.appendImg').eq(0).remove();

    window.location.href = nhref;
});

if (fml.vars.pid !== 'undefined') {
    // tab吸顶
    var tabBoxOffset,
        tabBox = $('#bannerWord').eq(0),
        oBannerWord = $('#bannerWord').find('.banner_word');

    if (tabBox.length) {
        tabBoxOffset = tabBox.offset().top;

        $(window).scroll(function() {
            var t = $(window).scrollTop();

            if (t > tabBoxOffset) {
                tabBox.css({
                    'position': 'fixed',
                    'left': 0,
                    "top": 0
                });

                oBannerWord.css({
                    'margin-top': 0
                });
            } else {
                tabBox.css({
                    'position': 'static'
                });

                oBannerWord.css({
                    'margin-top': '3.125%'
                });
            }
        });    
    }

    var waterFallInstance;
    var addposterTips = false;

    if (!addposterTips) {
        var firstPid = $('#page_nav div').eq(0).attr('data-pid');

        addPoster(fml.vars.cid, fml.vars.pid);
        //addShops(firstPid);

        addposterTips = true;
    }

    function addPoster(cid, pid) {
        waterFallInstance = WaterFall.init({
            el: '.goods_wall',
            url: '/aj/member/interfaces/promotion_poster_data?type=mob',
            dataFilter: function(data) {
                return data.data.data
            }, 
            data: {
                'cid': cid,
                'pid': pid,
                'aid': fml.vars.id,
                'category': fml.vars.category || '',
                'isFromShare': isFromShare,
                'sort': fml.vars.sort,
                'frame': 1,
                'limit': 30
            },
            hasSideGap: true,
            colNum: 2,
            colGap: 0,
            onFetchSuccess: function(data){
                lazyLoad.scroll();
                lazyLoad.load();

                if (data.length === 0) {
                    $('.pullUp').attr('status', 'stop');
                    this.lock();
                }
            },
            onFetchFinished: function(data){
                lazyLoad.load();
            }
        }).start();
    }

    function addShops(pid){
        var shopIndex,
            shopsMain = {},
            shops = fml.vars.pageDate.shops,
            shopMenu = fml.vars.pageDate.cate_list;

        if (shopMenu && shopMenu.length) {
            for (var i = 0; i < shopMenu.length; i++) {
                if (shopMenu[i].pid === pid) {
                    shopIndex = shopMenu[i].shop_extent.split('-');

                    for(var j = (shopIndex[0]-1); j < shopIndex[1]; j++){
                        if( shops[j] == null ){
                            continue;
                        } else {
                            shopsMain[j] = shops[j];
                        }
                    }
                }
            }

            $('#store_main').html(shareTmp('store_tpl', {'shopDate': shopsMain}));
        }
    }

    $('#page_nav div').on('click', function(){
        var thisPid = $(this).attr("data-pid");

        $(this).addClass('active').siblings().removeClass('active');
        $(this).find('span').css({'background-color': fml.vars.navCss.active_color || '#ff1361', 'color': fml.vars.navCss.active_text_color || '#fff'});
        $(this).siblings().find('span').css({'background-color': '#f5f5f5', 'color': '#666'});

        addShops(thisPid);

        waterFallInstance.destroy();

        $('.goods_wall').html('');

        if( tabBoxOffset && document.body.scrollTop > tabBoxOffset ){
            document.body.scrollTop = tabBoxOffset+2;
        }

        addPoster(fml.vars.cid, thisPid);
    });
}

// sort
fml.vars.sort = 'default';
fml.vars.changePid = fml.vars.pid;

$('.sort_main li').on('click', function(){
    var index = $(this).index(),
        $arrow = $(this).find('i');

    $(this).addClass('active').siblings().removeClass('active').find('i').attr('class', 'up_gray');

    if (index == 0) {
        fml.vars.sort = 'default';
    } else if (index == 1) {
        changeSort($arrow, 'discount_desc', 'discount_asc');
    } else if (index == 2) {
        changeSort($arrow, 'price_desc', 'price_asc');
    } else if (index == 3) {
        changeSort($arrow, 'sale_desc', 'sale_asc');
    }

    waterFallInstance.destroy();

    $('.goods_wall').html('');

    addPoster(fml.vars.cid, fml.vars.changePid);

    document.body.scrollTop = tabBoxOffset + 2;
});

function changeSort($arrow, descName, ascName){
    if ($arrow.hasClass('up_gray')) {
        $arrow.removeClass('up_gray').addClass('up_pink');
        fml.vars.sort = ascName;
    } else if ($arrow.hasClass('up_pink')) {
        $arrow.removeClass('up_pink').addClass('down_pink');
        fml.vars.sort = descName;
    } else if ($arrow.hasClass('down_pink')) {
        $arrow.removeClass('down_pink').addClass('up_pink');
        fml.vars.sort = ascName;
    }

    return fml.vars.sort;
}

$('body').on('click', '.nava', function(){
    $(".sidebar_shade").trigger('click');

    lazyLoad.load();
});

// get goods link
$('.goods_uid').each(function(index, data){
    var uid = $(this).attr('data-goodsid'),
        ca = getLink.changePageUrl(id, uid);

    $(this).attr('href', ca);
});


var new_customer = {
    oSignRemind: $('#j_sign_remind'),

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
        //this.toggleBeansTipsLayer();

        if (fml.vars.isNormalGetData != -1) {
            this.initEvent();
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
                                    self.oSignRemind.addClass('active');
                                } else {
                                    self.oSignRemind.removeClass('active');
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
                                        });
                                    });

                                    self.updateUserSignState({'needs': needs, 'beans': userTotalBeans, 'bonus': bonus, 'continues': continues});

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

                                            if (fml.vars.isShowAwardLayer) {
                                                var tpl = shareTmp('j_receive_beans_tpl');

                                                $('body').append(tpl);
                                            } else {
                                                /*if (fml.vars.isUpgrade) {
                                                    var upgradeTpl = shareTmp('j_upgrade_tpl');

                                                    $('body').append(upgradeTpl);

                                                    fml.vars.isUpgrade = 0;
                                                } else {
                                                    self.toggleBeansTipsLayer();
                                                }*/

                                                self.toggleBeansTipsLayer();
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
        var li_class = '',
            sign_text = '',
            con_sign_days = 5,
            sign_days_html = '',
            user_need_days = obj.needs || 0,
            user_total_beans = obj.beans || 0,
            extra_gain_beans = obj.bonus || 0,
            con_signed_days = obj.continues || 0,
            user_signed_days = con_sign_days - user_need_days,
            is_running_man = ($('.banner_man_wrap').length > 0) ? 1 : 0,
            sign_desc_text = (user_signed_days == 5) ? ('连续签到' + con_signed_days + '天，恭喜获得额外' + extra_gain_beans + '豆的连续签到奖励') : ('连续签到' + con_signed_days + '天，再签' + user_need_days + '天获得额外' + extra_gain_beans + '美美豆奖励');

        for (var i = 0; i < con_sign_days; i++) {
            var extra_add_html = (i == 4) ? '<div class="extra_add">+' + extra_gain_beans + '</div>' : '';

            if (i < user_signed_days) {
                li_class = 'active';
                sign_text = '已签到';
            } else {
                li_class = '';
                sign_text = '第' + (i + 1) + '天';
            }

            var sign_text_html = is_running_man ? '' : '<p class="text">' + sign_text + '</p>';

            sign_days_html += [
                '<li class="' + li_class + '">',
                    '<div class="icon_' + i + '">',
                        extra_add_html,
                    '</div>',
                    sign_text_html,
                '</li>'
            ].join('');
        }

        $('#j_sign_box').addClass('signed');

        (sign_days_html != '') && $('.sign_days_box').html(sign_days_html);
        (sign_desc_text != '') && $('.sign_desc_text').text(sign_desc_text);
        (user_total_beans != 0) && $('#user_available_beans').text(user_total_beans);
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
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

        $('body').on('click', '.comple_info_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();
            }

            var r = '_page_id=1100010:_page_area=new_customer:_pos_id=2:_pos_name=BeautifulArchives',
                href = '/member/complement_info/?step=1&frm=member_new_customer&r=' + r;

            window.location.href = href;
        });

        $('body').on('click', '.settings_btn', function(){
            //self.removeLayer();
            //sendRemindAjaxRequest();
            window.location.href = 'meilishuo://open_app_settings.meilishuo/';

            return;
        });

        $('body').on('click', '.user_beans', function(){
            // 发送数据统计请求
            tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100001:_page_area=profile:_pos_id=3:_pos_name=BeautifulBean'});

            window.location.href = '/member/detail/bean?frm=beans_paradise_member';
        });

        $('body').on('click', '.know_btn, .knows_btn', function(){
            self.removeLayer();
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

        $('body').on('click', '.close_layer_btn', function(){
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
            } else {
                self.closeBeansTipsLayer();
                self.signAnimation();
            }
        });

        $('body').on('click', '.recom_photos_box .item', function(){
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
new_customer.init();
