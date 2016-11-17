/*common*/

/**
 * @fileoverview 补签活动 － 每日签到
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2014-09-09
 */

require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var confirm = require('wap/ui/confirm');
var shareTmp = require('wap/component/shareTmp');

$.ajaxSettings.async = false;

/*window.onload = function() {
    setTimeout(function() {
        $('.load_shade').animate({'opacity': 0}, 1000);
        setTimeout(function() {
            $('.load_shade').hide();
        }, 100);
    }, 100);
};*/

// 登陆成功后的回调函数
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var initSignPatch = {
    'oCalanderWrap': $('.calanderWrap'),

    'init': function() {
        this.initPage();                                                                    // 初始化页面
        this.calander(curServerDateStr);                                                    // 初始化日历
        (fml.vars.isLogin == 1) && this.fillSignStatus(curSignedArr, curConvertedArr);      // 填充签到状态
        this.bindEvent();                                                                   // 初始化事件绑定
    },

    'initPage': function() {
        // 判断是否是从分享连接进入，如果是跳转到open连接
        if (window.location.search.indexOf('fromShare') >= 0) {
            window.location.href = '/goto/open/?appUrl=' + encodeURIComponent('/activity/signPatch/index/');
        }

        // 连续签到天数
        if (curConSignDays > 0) {
            $('#j_sign_days').text(curConSignDays);
            $('.date_box').find('.totals').show();
        }
    },

    // 初始化事件绑定
    'bindEvent': function() {
        var self = this;

        // 使用补签卡按钮绑定事件
        $('body').on('click', '.j_ret_btn', function() {
            // 登录
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var that = $(this);

            if (that.attr('loading') == 1) {
                return;
            }

            that.attr('loading', 1);

            // 请求补签接口
            $.ajax({
                url: '/aw/sign/patch',
                type: 'post',
                dataType: 'json',
                success: function(data) {
                    var tpl = shareTmp('j_ret_layer', {tContent: $('#j_ret_layer').html()});

                    $('body').append(tpl);

                    var sTip = data.tips || '补签失败！',
                        oMain = $('.j_layer_main'),
                        oTit = oMain.find('.tit'),
                        oSubTit = oMain.find('.sub_tit');

                    if (data.code == 0) {
                        oTit.text('补签成功！');

                        var sBtn = '',
                            sDesc = '',
                            subTit = '',
                            jsonData = data.data,
                            money = jsonData.bonus || 0,
                            chance = parseInt(jsonData.chance || 0),
                            missing = jsonData.missing || '';

                        if (chance <= 0) {
                            subTit = '';
                            sBtn = '<div class="btn_buy"><a href="javascript:;" class="yellow j_buy_btn"></a></div>';
                            sDesc = '<strong>你还没有补签卡~</strong><p class="no_ret">每成功支付1笔订单，可以获得1张补签卡<br>快去买东西吧~</p>';
                        } else {
                            if (missing == '') {
                                subTit = '你已经补完了所有的漏签记录！';
                                sBtn = '<div class="btn_again"><a href="javascript:;" class="yellow j_return_btn"></a></div>';
                                sDesc = '<p class="ret">你已经补完了所有的漏签记录！</p>';
                            } else {
                                subTit = '使用一张补签卡，补签' + missing + '的签到记录~<br>签到奖金恢复到' + money + '元';
                                sBtn = '<div class="btn_ret"><a href="javascript:;" class="yellow j_ret_btn"></a><a href="javascript:;" class="red j_later_btn"></a></div>';
                                sDesc = '<strong>补签成功~</strong><p>使用一张补签卡，补签' + missing + '的签到记录<br>签到奖金恢复到<b>' + money + '</b>元</p>';
                            }
                        }

                        oSubTit.html(subTit);
                        $('.j_btn_box').html(sBtn);
                        $('.j_ret_tips').html(sDesc);
                        $('.j_ret_num').html('<b>X</b>' + chance);
                        $('.ret_desc').html('你一共有<b>' + chance + '</b>张补签卡');
                    } else {
                        oTit.text('补签失败！');
                        oSubTit.html(sTip);
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
                curMonth = parseInt(strMonth);

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

                            self.oCalanderWrap.find('.month').text(txtDateStr);

                            if (curFlag == 'prev') {
                                that.attr('data-year', prevYear).attr('data-month', prevMonth);
                                self.oCalanderWrap.find('.next_btn').attr('data-year', nextYear).attr('data-month', nextMonth);
                            } else {
                                that.attr('data-year', nextYear).attr('data-month', nextMonth);
                                self.oCalanderWrap.find('.prev_btn').attr('data-year', prevYear).attr('data-month', prevMonth); 
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

        // 去买东西按钮绑定事件
        $('body').on('click', '.j_buy_btn', function() {
            window.location.href = 'http://m.meilishuo.com/tuan/?frm=qiandaosave';
        });

        // 返回按钮绑定事件
        $('body').on('click', '.j_return_btn', function() {
            window.location.href = '/activity/sign/sign_in/';
        });

        // 回到前一页按钮绑定事件
        $('body').on('click', '.j_later_btn', function() {
            window.history.go(-1);
            //window.history.back(-1);
        });

        $('body').on('click', '.j_again_btn', function() {
            window.history.go(-1);
            //window.history.back(-1);
        });

        // 关闭补签弹层按钮绑定事件
        $('body').on('click', '.ok_btn', function() {
            self.removeLayer();
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
    }
};

// 初始化页面
initSignPatch.init();

if (!isNewest && Meilishuo.config.os.iphone) {
    var c = new confirm({
        content: '你的版本太旧了，先升级再来补签吧！~',
        onSure: function() {
            window.location.href = '/download/latest/wap';
        }, 
        onCancel: function() {
            return;
        }
    });
}
