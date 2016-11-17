fml.define('wap/page/activity/sign_out' , ['wap/ui/alert','wap/zepto','wap/zepto/touch','wap/ui/confirm','wap/app/countdown2'] , function(require , exports) {
    var a = require('wap/ui/alert');
    var confirm = require('wap/ui/confirm');
    var countdown = require('wap/app/countdown2');
    var con_sign_days = continousSign() || 0;
    $.ajaxSettings.async = false;

    //登陆成功后的回掉函数
    window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };

    //判断是否在营救状态
    if (status == 2) {
        $("body").append($("#life").html());
        $(".enough_btn").removeClass("buy_btn");
        //倒计时 当前node时间 结束时间
        var cStartTime = parseInt(sTime/1000);
        var cEndTime = rescueETime;
        $("#timeStamp").attr("now", cStartTime);
        $("#timeStamp").attr("end-date", cEndTime);
        countdown(function() {
            removeShade();
            //弹出营救失败页面
            $("body").append($("#again").html());
        });
    }

    //判断是否抢救失败
    if (status == -2) {
        $("body").append($("#again").html());
    }

    //点击弹出营救小猪浮层
    //$(".save").one("tap", function () {
    $("body").on("tap", ".save", function() {
        /*$.post("/aw/sign/repair", null, function(data) {
            //alert(data);
            data = JSON.parse(data);
            if (data.message == "success") {
                $("body").append($("#life").html());
                //倒计时 当前node时间 结束时间
                var cStartTime = data.data.start;
                var cEndTime = data.data.end;
                $("#timeStamp").attr("now", cStartTime);
                $("#timeStamp").attr("end-date", cEndTime);
                countdown(function() {
                    removeShade();
                    //弹出营救失败页面
                    $("body").append($("#again").html());
                });
            }
        });*/

        window.location.href = (!fml.vars.isLogin) ? 'meilishuo://login.meilishuo/' : '/activity/signPatch/index/';
    });

    //去购买
    $("body").on("tap", ".buy_btn", function() {
        window.location.href = 'http://m.meilishuo.com/tuan/?frm=qiandaosave';
    });

    //买够了
    $("body").on("tap", ".enough_btn", function() {
        if (!$(this).hasClass("buy_btn")) {
            $.post("/aw/sign/determ", null, function(data) {
                //alert(data);
                data = JSON.parse(data);
                if (data.message == "success") {
                    removeShade();
                    $("body").append($("#resuce_suc").html());
                } else if (data.message == "fail") {
                    var alt = new a({
                        content : data.tips,
                        onSure : function () {
                            return;
                        }
                    });
                }
            })
        }

    });

    $("body").on("tap", ".fat_btn", function() {
        window.location.href = "/activity/sign/sign_in/";
    })

    //营救超时放弃
    $("body").on("tap", ".again_btn", function() {
        $(".other").trigger("tap");
    })

    //营救过程中自愿放弃
    $("body").on("tap", ".enough_no_btn", function() {
        $(".other").trigger("tap");
    })

    //开始营救前放弃
    $("body").on("tap", ".other", function() {
        var c = new confirm({
            content: '重新养一只后签到奖金会清零，你确定吗？',
            onSure: function(){
                $.post('/aw/sign/reset', null, function(data) {
                    //alert(data);
                    data = JSON.parse(data);
                    if (data.message == 'success') {
                       window.location.href = '/activity/sign/sign_in/?resetMoney=' + totalMoney;
                    }
                })
            }, 
            onCancel: function(){
                return;
            }
        });
    });

    //规则
    $(".gz_btn").on("tap",function(){
        $("body").append($("#rule1").html());
    });
    $("body").on("tap", ".new_know", function(){
        removeShade();
        $(".main").remove();
    });

    // 连续签到天数
    if (con_sign_days > 0) {
        $('#j_sign_days').text(con_sign_days);
        $('.date_box').find('.totals').show();
    }

    function removeShade() {
        $(".shade").remove();
        $(".win_box").remove();
    }

    //提醒开关
    $('.cont').on('tap', function(){
        /*登录*/
        if(!fml.vars.isLogin){
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }
        var self = $(this);
        var _switch = $(this).hasClass('open') ? 0 : 1;
        $.ajax({
            url:'/aw/sign/remind',
            data:{
                'switch':_switch
            },
            type:'post',
            dataType:'json',
            success: function(data){
                if (data == 0) {
                    self.removeClass('open');
                } else if (data == 1) {
                    self.addClass('open');
                }
            },
            error: function(){
                a('系统繁忙');
            }
        })
    });

    // 点击查看当月签到状态
    $('body').on('tap', '.j_calander_btn', function(){
        var that = $(this),
            prevYear = 2015,
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

        if ((curYear == sYear) && (curMonth == sMonth)) {
            txtDateStr = serverDateStr;
            curDateStr = serverDateStr;
        } else {
            txtDateStr = curYear + '-' + strMonth;
            curDateStr = curYear + '-' + strMonth + '-01';
        }

        // 初始化日历
        calander(curDateStr);
        // 填充签到状态
        fillSignStatus(curYear, curMonth - 1);

        var oDateBox = $('.date_box');

        oDateBox.find('.month').text(txtDateStr);

        if (curFlag == 'prev') {
            that.attr('data-year', prevYear).attr('data-month', prevMonth);
            oDateBox.find('.next_btn').attr('data-year', nextYear).attr('data-month', nextMonth);
        } else {
            that.attr('data-year', nextYear).attr('data-month', nextMonth);
            oDateBox.find('.prev_btn').attr('data-year', prevYear).attr('data-month', prevMonth); 
        }
    });

    // 初始化日历
    calander(serverDateStr);

    // 填充签到状态
    fillSignStatus(sYear, sMonthNum);

    // 初始化日历
    function calander(dateStr) {
        var flag = false,
            oCalander = $('.calander'),
            dateObj = getDateObj(dateStr);

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
                var divId = getDateStr(dateObj);

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
    }

    // 填充签到状态
    function fillSignStatus(iYear, iMonth) {
        // 未签到过
        if (regDateArr == null || regDateArr.length == 0) {
            return;
        }

        var oQdStatus = $('.qdStatus'),
            qdStatusLen = oQdStatus.length,
            regDateArrLen = regDateArr.length,
            convertedArrLen = convertedArr.length,
            firstSignDateStr = regDateArr[0],
            lastSignDateStr = regDateArr[regDateArrLen - 1],
            firstSignDate = getDateObj(firstSignDateStr),
            lastSignDate = getDateObj(lastSignDateStr);

        // 1、先填充已兑换日期
        for (var i = 0; i < convertedArrLen; i++) {
            var curConvertedDateStr = convertedArr[i],
                curConvertedDate = getDateObj(curConvertedDateStr),
                curConvertedMonth = curConvertedDate.getMonth(),
                curConvertedYear = curConvertedDate.getFullYear();

            if ((curConvertedYear == iYear) && (curConvertedMonth == iMonth)) {
                $('#' + curConvertedDateStr).find('.dhStatus').addClass('dhStatus_ydh');
            }
        }

        // 1.1未兑换日期标记
        /* var redeemArrLen = redeemArr.length;
        for (var v = 0; v < redeemArrLen; v++) {
            $('#'' + redeemArr[v]).find('.dhStatus').addClass('dhStatus_dhr');
        } */

        // 2、填充签到状态标记
        for (var j = 0; j < qdStatusLen; j++) {
            var curQdStatus = $(oQdStatus[j]),
                curDate = getDateObj(curQdStatus.parent().attr('id'));

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
        for (var k = 0; k < regDateArrLen; k++) {
            var curSignDateStr = regDateArr[k],
                curSignDate = getDateObj(curSignDateStr),
                curSignMonth = curSignDate.getMonth(),
                curSignYear = curSignDate.getFullYear();

            // 只看当前月的
            if ((curSignYear == iYear) && (curSignMonth == iMonth)) {
                // 如果用户当天已经签过到，需要移除上面添加的qdStatus_lq qdStatus_wq样式
                $('#' + curSignDateStr).find('.qdStatus').removeClass('qdStatus_lq qdStatus_wq').addClass('qdStatus_yq');
            }
        }
    }

    // 获取连续签到日
    function continousSign() {
        var len = regDateArr.length,
            lastSignDateStr = regDateArr[len - 1],
            lastSignDate = getDateObj(lastSignDateStr),
            // 判断是否连续
            sDateObj = getDateObj(serverDateStr);

        sDateObj.setDate(sDateObj.getDate() - 1);

        var factor,                     // 系数，如果当天已经签到，系数为0
            continuousSignNum = 0,      // 连续签到日变量
            sLastDateObj = sDateObj;

        if (serverDateStr == lastSignDateStr) {
            factor = 0;
        } else if (getDateStr(sLastDateObj) == lastSignDateStr) {
            factor = 1;
        } else {
            return 0;
        }

        var factorDateObj = getDateObj(serverDateStr); //当前天，用于连续签到判断

        if (factor == 1) {
            factorDateObj.setDate(factorDateObj.getDate() - factor);
        }

        for (var i = len - 1; i >= 0; i--) {
            var signDateStr = regDateArr[i],
                signDate = getDateObj(signDateStr);

            //判断连续签到日
            if (factorDateObj.getDate() - signDate.getDate() == 0) {
                continuousSignNum++;
                factorDateObj.setDate(factorDateObj.getDate() - 1);
            } else {
                break;
            }
        }

        return continuousSignNum;
    }

    //根据年月日生成日期对象 YYYY-MM-dd
    function getDateObj(dateStr) {
        dateStr += "";
        var dArr = dateStr.split("-");
        var d = new Date();
        d.setFullYear(dArr[0]);
        d.setMonth(dArr[1] - 1);
        d.setDate(dArr[2]);
        return d;
    }

    //yyyy-mm-dd
    function getDateStr(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
    }
});