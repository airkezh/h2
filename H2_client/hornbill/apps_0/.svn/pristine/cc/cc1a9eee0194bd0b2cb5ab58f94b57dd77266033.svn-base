/*common*/

/**
 * @fileoverview 首页 － 每日签到
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-03-26
 */

require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var confirm = require('wap/ui/confirm');
var tracking = require('wap/app/tracking');
var shareTmp = require('wap/component/shareTmp');

var promotionStartTime = new Date(2015,4,8,23,59,59).getTime();
var promotionEndTime = new Date(2015,4,18,00,00,00).getTime();

$.ajaxSettings.async = false;

//登陆成功后的回掉函数
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var initSignOut = {
    'init': function() {
        this.calander(curServerDateStr);                                                    // 初始化日历
        (fml.vars.isLogin == 1) && this.fillSignStatus(curSignedArr, curFutureArr);         // 填充签到状态
        this.bindEvent();                                                                   // 初始化事件绑定
    },

    // 初始化事件绑定
    'bindEvent': function() {
        var self = this;

        window.onload = function(){
            // 发送数据统计请求
            tracking.cr('sign_pageshow', {'action': 'show', 'name': 'pigdie'});
        };

        // 查看签到规则
        $('body').on('click', '.p_rule_btn', function(){
            window.location.href = '/activity/sign/sign_rule/';
        });

        // 点击跳转到登陆或补签页面
        $('body').on('click', '.p_patch_btn', function() {
            window.location.href = (!fml.vars.isLogin) ? 'meilishuo://login.meilishuo/' : '/activity/signPatch/index/';
        });

        // 开始营救前放弃
        $('body').on('click', '.p_start_btn', function() {
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var c = new confirm({
                content: '将损失' + curUserTempCoin + '天签到记录，你确定吗？',
                onSure: function(){
                    $.ajax({
                        url: '/aw/sign/replay',
                        type: 'post',
                        dataType: 'json',
                        success: function(data){
                            if (data.code == 0) {
                                window.location.href = '/activity/sign/sign_in/';
                            } else {
                               var alt = new Alert ({
                                    content : data.message,
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
                }, 
                onCancel: function(){
                    return;
                }
            });
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
                oDateBox = $('.date_box');

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
                                futureArr = jsonData.future || [];

                            // 初始化日历
                            self.calander(curDateStr);
                            // 填充签到状态
                            self.fillSignStatus(signedArr, futureArr);

                            oDateBox.find('.month').text(txtDateStr);

                            if (curFlag == 'prev') {
                                that.attr('data-year', prevYear).attr('data-month', prevMonth);
                                oDateBox.find('.next_btn').attr('data-year', nextYear).attr('data-month', nextMonth);
                            } else {
                                that.attr('data-year', nextYear).attr('data-month', nextMonth);
                                oDateBox.find('.prev_btn').attr('data-year', prevYear).attr('data-month', prevMonth); 
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
    'fillSignStatus': function(signedArr, futureArr) {
        if ((curFirstSignDate == '') && (curLastSignDate == '')) {
            return;
        }

        var self = this,
            oQdStatus = $('.qdStatus'),
            qdStatusLen = oQdStatus.length,
            signedArrLen = signedArr.length,
            futureArrLen = futureArr.length,
            initSignDate = self.getDateObj(curUserInitDate),
            firstSignDate = self.getDateObj(curFirstSignDate),
            curServerDate = self.getDateObj(curServerDateStr);

        // 1、先填充未来可满5天的兑换日期
        for (var i = 0; i < futureArrLen; i++) {
            $('#' + futureArr[i]).find('.qdStatus').addClass('qdStatus_cq');
        }

        // 2、填充签到状态标记
        for (var j = 0; j < qdStatusLen; j++) {
            var curQdStatus = $(oQdStatus[j]),
                curDate = self.getDateObj(curQdStatus.parent().attr('id'));

            if (curDate > curServerDate) {
                // 填充未签到图标 所有日期 >= 最后一次签到日期
                !curQdStatus.hasClass('qdStatus_cq') && curQdStatus.addClass('qdStatus_wq');
            } else if (curDate < firstSignDate) {
                // 填充未签到图标 所有日期 <= 第一次签到日期
                curQdStatus.removeClass('qdStatus_cq').addClass('qdStatus_none');
            } else {
                // 填充漏签到图标
                if (curDate > initSignDate) {
                    curQdStatus.addClass('qdStatus_lq');
                } else {
                    curQdStatus.addClass('qdStatus_flq');
                }
            }
        }

        // 2.1填充已签到
        for (var k = 0; k < signedArrLen; k++) {
            var curSignDateStr = signedArr[k];

            // 如果用户当天已经签过到，需要移除上面添加的qdStatus_flq qdStatus_lq qdStatus_cq qdStatus_wq样式
            $('#' + curSignDateStr).find('.qdStatus').removeClass('qdStatus_flq qdStatus_lq qdStatus_cq qdStatus_wq').addClass('qdStatus_yq');
        }

        if ((curServerTime > promotionStartTime) && (curServerTime <= promotionEndTime)) {
            $('#2015-05-15').empty().addClass('icon515');
            $('#2015-05-16').empty().addClass('icon516');
            $('#2015-05-17').empty().addClass('icon517');
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
    }
};

// 初始化页面
initSignOut.init();

