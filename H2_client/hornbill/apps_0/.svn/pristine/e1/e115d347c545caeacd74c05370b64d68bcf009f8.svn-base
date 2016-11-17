/*common*/

/**
 * @fileoverview 首页 － 每日签到
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-01-09
 */

require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var confirm = require('wap/ui/confirm');
var shareTo = require('wap/app/shareTo');
var encrypt = require('wap/app/encrypt');
var shareTmp = require('wap/component/shareTmp');
//var isHasNotice = parseInt(isShareQzone.qzone);                 // 签到分享到qzone的状态(0-未通知用户，1-已通知用户)
var patch_miss = curUserPatchData.missing || '';                  // 可以补签的漏签记录(2014-09-10)
var patch_total = parseInt(curUserPatchData.total || 0);          // 漏签的总天数
var patch_chance = parseInt(curUserPatchData.chance || 0);        // 补签次数(补签卡数量)
var patch_status = parseInt(curUserPatchData.status || 0);        // 状态(0-今日尚未补签，1-今日已经补签)
var isShowSuperPatch = (fml.vars.isLogin && curUserSuperData && (curUserSuperData.status == 0)) ? 1 : 0;
var isShowUpdateTip = (curUpgradeTipInfo && (curUpgradeTipInfo.code == 0) && (curUpgradeTipInfo.data.status == 0)) ? 1 : 0;

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

        // 判断是否是从分享连接进入，如果是跳转到open连接
        if (window.location.search.indexOf('fromShare') >= 0) {
            window.location.href = '/goto/open/?appUrl=' + encodeURIComponent('/activity/sign/sign_in/');
        }

        $('.signin_box').removeClass('up_down');

        if (isShowUpdateTip) {
            $('body').append($('#update_one_layer').html());
        } else {
            // 第一次签到，弹出说明弹层，打开开关 还要判断cookie
            firstView && $('body').append($('#signin_tips_layer').html());
        }

        if (isShowSuperPatch) {
            var superPatchTpl = shareTmp('patch_card_layer', {'data': curUserSuperData});

            $('body').append(superPatchTpl);
        }

        // 钱数清0动画
        if ((typeof resetMoney != 'undefined') && (window.location.hash.indexOf('cResetMoney') < 0)) {
            var oTotalMoney = $('#total_money'),
                ceilMoney = Math.ceil(resetMoney / 8);

            oTotalMoney.text(resetMoney);

            setTimeout(function() {
                resetMoney = resetMoney - ceilMoney;
                oTotalMoney.text(resetMoney);

                if (resetMoney > 0) {
                    setTimeout(arguments.callee, 100);
                } else if (resetMoney < 0) {
                    oTotalMoney.text(0);
                }
            }, 1000);

            // 还需要一个resetMoney过期的url参数，防止用户刷新
            window.location.hash = 'cResetMoney';
        }

        // 判断最后签到日是否等于当前服务器时间，等于说明今天已经签到
        if (curLastSignDate == curServerDateStr) {
            // 隐藏签到等按钮
            self.isToggleDom();
        }
    },

    'renderHtml': function() {
        var isShowTips = (patch_total <= 0) ? false : true;

        // 补签文案提示
        if (isShowTips) {
            var oPatchTip = $('.patch_tip'),
                oPatchTxt = oPatchTip.find('.txt'),
                patchTxt = '你已经补完了所有的漏签记录！';

            if (patch_chance <= 0) {
                patchTxt = '你累计漏签了' + patch_total + '天，快去补签吧！';
            } else {
                if (patch_miss != '') {
                    //patchTxt = (patch_status == 0) ? '今天' : '明天';
                    //patchTxt += '可以补签' + patch_miss + '的签到记录';
                    patchTxt = '今天可以补签' + patch_miss + '的签到记录';
                }
            }

            oPatchTxt.text(patchTxt);
            oPatchTip.show();
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

                self.initPersonBox();
            }, 100);

            setTimeout(function() {
                $('.icon_date').addClass('icon_animate');
            }, 1200);
        };

        // 点击立即签到，判断是否登陆 判断是否是兑换日
        $('#j_signin_btn').on('click', function() {
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var paramArr = [],
                reqData = {
                    'userid' : Meilishuo.config.user_id,
                    'time' : parseInt(new Date().getTime() / 1000),
                    'total' : +curUserTotalMoney,
                    'rand' : parseInt(Math.random() * 100000000)
                };

            for (var key in reqData) {
                paramArr.push(key + '=' + reqData[key]);
            }

            var md5Str = ((encrypt.MD5(paramArr.join('&')).toString()).toLowerCase()).toString();

            reqData.code = (encrypt.HmacSHA1(md5Str.substr(0, 16), md5Str.substr(16))).toString();

            // 发送请求
            $.post('/aw/sign/do_reg', reqData, function(data) {
                data = JSON.parse(data);

                if (data.message == 'success') {
                    // 第一次签到,打开提醒开关
                    if (curSignedArr == null || curSignedArr.length == 0) {
                        $.post('/aw/sign/remind', {'switch': 1}, function() {
                            $('.cont').addClass('open');
                        });
                    }

                    // 金额+1
                    curUserTotalMoney = (+curUserTotalMoney) + 1;

                    $('.coin').addClass('coin_animate');

                    setTimeout(function() {
                        var oTotalMoney = $('#total_money');

                        oTotalMoney.text(curUserTotalMoney);
                        oTotalMoney.addClass('modeCoinX moveCoin');

                        window.location.href = '/activity/sign/sign_mall/?hdtrc=tuan1300_qiandao';
                    }, 2000);

                    // 隐藏签到等按钮
                    self.isToggleDom();
                } else {
                    if (data.code == -1) {
                        $('body').append($('#signin_stroke_layer').html());
                    } else {
                        var alt = new Alert ({
                            content: data.tips,
                            onSure: function () {
                                return;
                            }
                        });
                    }
                }
            });
        });

        // 打开浮层
        $('.rule_btn').on('click', function(){
            self.removeLayer();

            $('body').append($('#update_one_layer').html());
        });

        // 关闭浮层
        $('body').on('click', '.j_know_btn', function(){
            self.removeLayer();

            window.location.reload();
        });

        // 关闭浮层
        $('body').on('click', '.p_update_btn1', function(){
            self.removeLayer();

            $('body').append($('#update_two_layer').html());
        });

        // 关闭浮层
        $('body').on('click', '.j_close_btn', function(){
            self.removeLayer();

            $.ajax({
                url: '/aw/sign/superPatch',
                type: 'post',
                dataType: 'json',
                success: function(data){
                },
                error: function(){
                }
            });
        });

        // 关闭浮层
        $('body').on('click', '.come_on, .know_btn, .calendar_close, .j_layer_shade, .p_update_btn2', function(){
            self.removeLayer();
        });

        // 补签
        $('body').on('click', '.patch_btn', function(){
            window.location.href = (!fml.vars.isLogin) ? 'meilishuo://login.meilishuo/' : '/activity/signPatch/index/';
        });

        // 超级补签卡补签
        $('body').on('click', '.j_patch_btn', function(){
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
                url: '/aw/sign/superPatch',
                data: {
                    'status': 1
                },
                type: 'post',
                dataType: 'json',
                success: function(data){
                    if (data.code == 0) {
                        var chance = data.data.chance || 0;

                        if (chance > 0) {
                            var patchTpl = shareTmp('patch_success_layer', {'chance': chance});

                            $('body').append(patchTpl);
                        } else {
                            var alt = new Alert ({
                                content : '补签成功！',
                                onSure : function(){
                                    window.location.reload();
                                    return;
                                }
                            });
                        }
                    } else {
                        window.location.reload();
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

        // 提醒开关
        $('body').on('click', '.remind_switch', function(event){
            event.preventDefault();

            // 登录
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var that = $(this),
                st = that.hasClass('open') ? 0 : 1;

            $.ajax({
                url: '/aw/sign/remind',
                data:{
                    'switch': st
                },
                type: 'post',
                dataType: 'json',
                success: function(data){
                    if (data == 0) {
                        that.removeClass('open');
                    } else if (data == 1) {
                        that.addClass('open');
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

        // 显示日历
        $('body').on('click', '.icon_date', function(){
            var tpl = shareTmp('signin_calendar_layer', {'data': curLayerData});

            $('body').append(tpl);
            // 初始化日历
            self.calander(curServerDateStr);
            // 填充签到状态
            (fml.vars.isLogin == 1) && self.fillSignStatus(curSignedArr, curConvertedArr);
            self.renderHtml();
        });

        // 点击查看当月签到状态
        $('body').on('click', '.j_calander_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var that = $(this);

            if (that.attr('loading') == 1) {
                return;
            }

            var prevYear = 2015,
                nextYear = 2015,
                prevMonth = 1,
                nextMonth = 1,
                curFlag = that.attr('data-flag'),
                curYear = parseInt(that.attr('data-year')),
                strMonth = that.attr('data-month'),
                curMonth = parseInt(strMonth),
                oCalanderWrap = $('.calanderWrap');

            if (curYear < 1) {
                return;
            }

            if (curMonth == 1) {
                prevYear = curYear - 1;
                nextYear = curYear;
                prevMonth = 12;
                nextMonth = curMonth + 1;
            } else if (curMonth == 12) {
                prevYear = curYear;
                nextYear = curYear + 1;
                prevMonth = curMonth - 1;
                nextMonth = 1;
            } else {
                prevYear = curYear;
                nextYear = curYear;
                prevMonth = curMonth - 1;
                nextMonth = curMonth + 1;
            }

            prevMonth = (prevMonth < 10) ? '0' + prevMonth : prevMonth;
            nextMonth = (nextMonth < 10) ? '0' + nextMonth : nextMonth;

            var txtDateStr = '',
                curDateStr = '';

            if ((curYear == curServerYear) && (curMonth == curServerMonth)) {
                txtDateStr = curServerDateStr;
                curDateStr = curServerDateStr;
            } else {
                txtDateStr = curYear + '-' + strMonth;
                curDateStr = curYear + '-' + strMonth + '-01';
            }

            that.attr('loading', 1);

            $.ajax({
                url: '/aw/sign/getSignDate',
                data:{
                    'year': curYear,
                    'month': curMonth
                },
                type: 'post',
                dataType: 'json',
                success: function(data){
                    if (data.code == 0) {
                        var jsonData = data.data || null;

                        if (jsonData) {
                            var signedArr = jsonData.signed || [],
                                convertedArr = jsonData.converted || [];

                            // 初始化日历
                            self.calander(curDateStr);
                            // 填充签到状态
                            self.fillSignStatus(signedArr, convertedArr);

                            oCalanderWrap.find('.month').text(txtDateStr);

                            if (curFlag == 'prev') {
                                that.attr('data-year', prevYear).attr('data-month', prevMonth);
                                oCalanderWrap.find('.next_btn').attr('data-year', nextYear).attr('data-month', nextMonth);
                            } else {
                                that.attr('data-year', nextYear).attr('data-month', nextMonth);
                                oCalanderWrap.find('.prev_btn').attr('data-year', prevYear).attr('data-month', prevMonth); 
                            }
                        }
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
    },

    // 初始化日历
    'calander': function(dateStr) {
        var self = this,
            flag = false,
            oCalander = $('.calander'),
            dateObj = self.getDateObj(dateStr);

        dateObj.setDate(1);                         // 日 Date

        var n = 1 - dateObj.getDay();               // 让1号 - 1号对应的星期 等于 面板的第一个格子的日子。

        if (n == 1) {                               // 周日index为0
            n = -6;
        }

        dateObj.setDate(n);

        var sHtml = '<div class="h">日 </div><div class="h">一</div><div class="h">二 </div><div class="h">三</div><div class="h">四</div><div class="h">五</div><div class="h" style="border-right: 0;">六</div>';

        for (var i = 1; i <= 42; i++) {             // 最多42个格子
            if ((i == 36) && (flag == false)) {
                break
            }

            var date = dateObj.getDate();

            if (date == 1) {
                flag = flag ? false : true;
            }

            var html = '';

            if (flag) {
                var divId = self.getDateStr(dateObj);

                html = '<div id="' + divId + '" class="h2"';

                if ((i !== 0) && ((i % 7) == 0)) {
                    html += ' style="border-right: 0px;" ';
                }

                html += '><span class="day">' + date + '</span><div class="qdStatus"></div><div class="dhStatus"></div></div>';
            } else {
                html = '<div class="h2"></div>';

                if ((i !== 0) && ((i % 7) == 0)) {
                    html = '<div class="h2" style="border-right: 0px;"></div>';
                }
            }

            sHtml += html;
            dateObj.setDate(1 + dateObj.getDate());
        }

        oCalander.html(sHtml);
    },

    // 填充签到状态
    'fillSignStatus': function(signedArr, convertedArr) {
        if ((curFirstSignDate == '') && (curLastSignDate == '')) {
            return;
        }

        var self = this,
            oQdStatus = $('.qdStatus'),
            qdStatusLen = oQdStatus.length,
            signedArrLen = signedArr.length,
            convertedArrLen = convertedArr.length,
            firstSignDate = self.getDateObj(curFirstSignDate),
            lastSignDate = self.getDateObj(curLastSignDate);

        // 1、先填充已兑换日期
        for (var i = 0; i < convertedArrLen; i++) {
            var curConvertedDateStr = convertedArr[i];

            $('#' + curConvertedDateStr).find('.dhStatus').addClass('dhStatus_ydh');
        }

        // 2、填充签到状态标记
        for (var j = 0; j < qdStatusLen; j++) {
            var curQdStatus = $(oQdStatus[j]),
                curDate = self.getDateObj(curQdStatus.parent().attr('id'));

            if (curDate >= lastSignDate) {
                // 填充未签到图标 所有日期 >= 最后一次签到日期
                curQdStatus.addClass('qdStatus_wq');
            } else if (curDate <= firstSignDate) {
                // 填充未签到图标 所有日期 <= 第一次签到日期
                curQdStatus.addClass('qdStatus_none');
            } else {
                // 填充漏签到图标
                curQdStatus.addClass('qdStatus_lq');
            }
        }

        // 2.1填充已签到
        for (var k = 0; k < signedArrLen; k++) {
            var curSignDateStr = signedArr[k];

            // 如果用户当天已经签过到，需要移除上面添加的qdStatus_lq qdStatus_wq样式
            $('#' + curSignDateStr).find('.qdStatus').removeClass('qdStatus_lq qdStatus_wq').addClass('qdStatus_yq');
        }
    },

    // 移除弹层
    'removeLayer': function() {
        $('.j_layer_main').remove();
        $('.j_layer_shade').remove();
    },

    // 根据年月日(YYYY-MM-dd)生成日期对象
    'getDateObj': function(dateStr) {
        dateStr += '';

        var date = new Date(),
            dateArr = dateStr.split('-');

        date.setFullYear(dateArr[0]);
        date.setMonth(dateArr[1] - 1);
        date.setDate(dateArr[2]);

        return date;
    },

    // 根据日期对象生成年月日(YYYY-MM-dd)
    'getDateStr': function(date) {
        var y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate();

        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;

        return y + '-' + m + '-' + d;
    },

    // 隐藏签到等按钮
    'isToggleDom': function() {
        $('.j_signin_btn').animate({'opacity': 0}, 200);
    },

    'initPersonBox': function() {
        var self = this;

        self.renderScrollHtml();
        self.initAutoScroll();

        var liLen = $('.person_box').find('li').length;

        setInterval(function(){
            self.initAutoScroll();
            liLen--;

            if (liLen == 1) {
                self.renderScrollHtml();
                liLen += $('.person_box').find('li').length;
            }
        }, 2000);
    },

    'initAutoScroll': function() {
        $('.person_box').animate({
            top: '-60px'
        }, 0, function () {
            var that = $(this);

            that.css({top: '0%'});
            pObj = that.find('li')[0];
            that.append(pObj);
        });
    },

    'renderScrollHtml': function(){
        $.post('/aw/sign/scroll', null, function(data) {
            data = JSON.parse(data);

            var html = '',
                award = data.award,
                awardLen = award.length || 0,
                oPersonBox = $('.person_box');

            if (award && awardLen) {
                for (var i = 0; i < awardLen; i++) {
                    var curAward = award[i];

                    html = '<li><img src=http://d04.res.meilishuo.net/' + curAward.avatar + ' class="top"><div class="text"><p class="t">' + curAward.nickname + '</p><p class="m">' + curAward.tips + '</p></div></li>';
                    oPersonBox.prepend(html);
                }
            } else {
                html = '<li><img src=http://d04.res.meilishuo.net/ap/c/f0/c9/03891e261ed6f78b16c6bffe8f1c_247_247.c1.jpg class="top"><div class="text"><p class="t">西大大</p><p class="m">损失了8元奖金</p></div></li>';
                oPersonBox.prepend(html);
            }
        });
    }
};

// 初始化页面
initSignIn.init();
    
if (!isNewest && Meilishuo.config.os.iphone) {
    var c = new confirm({
        content: '你的版本太旧了，先升级再签到吧！~',
        onSure: function(){
            window.location.href = '/download/latest/wap';
        },
        onCancel: function(){
            return;
        }
    });
}
