/*common*/

/**
 * @fileoverview 首页－信息确认
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2016-01-12
 */

require('wap/zepto/touch');
//require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var confirm = require('wap/ui/confirm');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var istorage = require('component/iStorage');
//var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
//var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');

//var oPullUp = $('.pullUp');
//var oGoTopWrap = $('.gotop_wrap');
var promptLayerTimeout;
var clickEventIsComplete = false;
var ajaxRequestIsComplete = false;
var memberWelfareDayAddDayCount = 1;
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

// 客户端app回调函数
window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    },

    onPickAddress: function(data){
        var code = data.code;

        if (code == 0) {
            var data = (fml.vars.isAndroid ? data.info : $.parseJSON(data.info)) || {},
                aid = data.addr_id || '',
                phone = data.phone || '',
                address = data.address || '',
                nickname = data.nickname || '';

            $('#user_name').text(nickname);
            $('#user_phone').text(phone);
            $('#user_address').text(address);
            $('.bottom_confirm_btn').data('aid', aid);
        }
    },

    onCalendarEventActionEnd: function(obj){
        var result = obj.result || 0,
            actionType = obj.actionType || '';

        if (result == 1) {
            $('.layer_remind_btn').toggleClass('active');

            if (actionType == 'add') {
                /*var text = (result == 1) ? '会员福利日提醒设置成功' : '会员福利日提醒设置失败';

                togglePromptLayer(text, function(){
                    $('.j_layer_shade').remove();
                    $('.j_layer_main').remove();
                });*/

                $('.layer_remind_btn').text('取消提醒');

                istorage.setCookie('member_welfare_day_remind', 'member_welfare_day_remind_on', {'duration': memberWelfareDayAddDayCount * 3600 * 24 * 10});
            } else if (actionType == 'remove') {
                $('.layer_remind_btn').text('提醒我');

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

var apply_info_confirm = {
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

        this.errorTipsLayer();

        if (fml.vars.isNormalGetData != -1) {
            this.initEvent();
            //this.lazyer = lazy.init({'xpath': '.bs_load_img'});
            //this.lazyer.scroll();
        }
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            
        };

        /*scroll.yIn(60, function(){
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
        });*/

        $('body').on('click', '.layer_fail_btn', function(){
            self.removeLayer();
        });

        $('body').on('click', '.layer_success_btn', function(){
            self.removeLayer();

            window.location.href = '/member/gift_card_records/';
        });

        $('body').on('click', '.size_area .item_btn, .color_area .item_btn', function(){
            var that = $(this);

            if (that.hasClass('active')) {
                return;
            }

            that.addClass('active').siblings().removeClass('active');
        });

        $('body').on('click', '.pick_user_address', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            if (!fml.vars.isNewest && fml.vars.isAndroid) {
                var c = new confirm({
                    content: '当前版本不支持编辑地址，请升级最新版本后，继续填写地址。',
                    onSure: function(){
                        window.location.href = '/download/latest/wap';
                    },
                    onCancel: function(){
                        return;
                    }
                });
            } else {
                window.location.href = 'meilishuo://pick_address.meilishuo';
            }
        });

        $('body').on('click', '.layer_remind_btn', function(){
            if (fml.vars.isAndroid) {
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

        $('body').on('click', '.bottom_confirm_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            var that = $(this),
                goods_size_text = '',
                goods_color_text = '',
                addr_id = that.data('aid') || '',
                shop_id = that.data('sid') || '',
                goods_id = that.data('gid') || '',
                twitter_id = that.data('tid') || '',
                activity_date = that.data('date') || '',
                size_meta_id = $('.size_area').find('.active').data('mid') || '',
                color_meta_id = $('.color_area').find('.active').data('mid') || '',
                sku_data = fml.vars.goodsSkuData[color_meta_id + '_' + size_meta_id],
                sku_id = (sku_data && sku_data.sku_id) ? sku_data.sku_id : '',
                goods_size = (sku_data && sku_data.size) ? sku_data.size : '',
                goods_color = (sku_data && sku_data.color) ? sku_data.color : '',
                goods_size_name = (sku_data && sku_data.size_name) ? sku_data.size_name : '',
                goods_color_name = (sku_data && sku_data.color_name) ? sku_data.color_name : '';

            if (ajaxRequestIsComplete) {
                return;
            }

            ajaxRequestIsComplete = !ajaxRequestIsComplete;

            if ((addr_id == '') || (sku_id == '')) {
                togglePromptLayer('信息未填充完，不可提交哦~', function(){
                    ajaxRequestIsComplete = !ajaxRequestIsComplete;
                });

                return;
            }

            if ((goods_size != '') && (goods_size_name != '')) {
                goods_size_text = goods_size_name + '_' + goods_size;
            }

            if ((goods_color != '') && (goods_color_name != '')) {
                goods_color_text = goods_color_name + '_' + goods_color;
            }

            $.ajax({
                url: '/aj/member/interfaces/applyGoods',
                type: 'post',
                data: {
                    'sku_id': sku_id,
                    'addr_id': addr_id,
                    'shop_id': shop_id,
                    'goods_id': goods_id,
                    'twitter_id': twitter_id,
                    'size': goods_size_text,
                    'color': goods_color_text,
                    'activity_date': activity_date
                },
                dataType: 'json',
                success: function(data){
                    ajaxRequestIsComplete = !ajaxRequestIsComplete;

                    var code = data.error_code;

                    if (code == 0) {
                        var tpl = '',
                            jsonData = data.data,
                            status = jsonData.success || 0,
                            cardsNum = jsonData.ticket_num || 0,
                            memberWelfareDayRemindIsOn = (istorage.getCookie('member_welfare_day_remind') == 'member_welfare_day_remind_on') ? true : false;

                        tpl = (status == 1) ? shareTmp('j_success_tpl', {'cards': cardsNum}) : shareTmp('j_fail_tpl', {'remindIsOn': memberWelfareDayRemindIsOn});

                        $('body').append(tpl);
                    } else {
                        var alt = new Alert({
                            content: data.message,
                            onSure: function(){
                                //self.removeLayer();

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
                            //self.removeLayer();

                            return;
                        }
                    });
                }
            });
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
                tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=服务器开小差，请稍后重试~:_pos_id=500:_pos_name=服务器开小差，请稍后重试~:_ext_inter=/share/share_main?twitter_id='});
            }
        }
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    }
};

// 初始化页面
apply_info_confirm.init();
