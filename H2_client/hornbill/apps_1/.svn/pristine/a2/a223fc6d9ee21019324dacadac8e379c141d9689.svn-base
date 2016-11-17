fml.define('wap/page/activity/sign' , ['wap/ui/alert','wap/zepto','wap/zepto/touch','wap/app/countdown2', 'wap/ui/confirm', 'wap/app/shareTo', 'wap/component/shareTmp', 'wap/app/encrypt'] , function(require , exports){
    var shareTo = require('wap/app/shareTo');
    var a = require('wap/ui/alert');
    var confirm = require('wap/ui/confirm');
    var countdown = require('wap/app/countdown2');
    var shareTmp = require('wap/component/shareTmp');
    var encrypt = require('wap/app/encrypt');
    var rankA = rankNum.rank;                                       // 排名
    var percentA = rankNum.percent;                                 // 领先占比
    var isHasNotice = parseInt(isShareQzone.qzone);                 // 签到分享到qzone的状态(0-未通知用户，1-已通知用户)
    var patch_miss = signPatch.missing || '';                       // 可以补签的漏签记录(2014-09-10)
    var patch_total = parseInt(signPatch.total || 0);               // 漏签的总天数
    var patch_chance = parseInt(signPatch.chance || 0);             // 补签次数(补签卡数量)
    var patch_status = parseInt(signPatch.status || 0);             // 状态(0-今日尚未补签，1-今日已经补签)
    var actEndTime = new Date(2014,11,31,23,59,59).getTime();
    var con_sign_days = continousSign() || 0;

    $.ajaxSettings.async = false;
    $(".money").removeClass("in_down");
    $(".qd_box").removeClass("up_down");

    window.onload = function(){
        setTimeout(function(){
            $(".load_shade").animate({'opacity': 0}, 1000);
            setTimeout(function(){
                $(".load_shade").hide();
            }, 100);

            $(".money").addClass("in_down");
            $(".qd_box").addClass("up_down");
            personBox();
        }, 100);

        setTimeout(function(){
            $(".icon_date").addClass("icon_animate");
        }, 1200);
    }

    //登陆成功后的回掉函数
    window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };

    //还要判断cookie
    if (firstView) { //第一次签到，弹出说明弹层，打开开关
        $("body").append($("#qd_suc").html());
    }

    //判断是否是从分享连接进入，如果是跳转到open连接
    if (window.location.search.indexOf("fromShare") >= 0) {
        var href = '/activity/sign/sign_in/';
        window.location.href = '/goto/open/?appUrl='+encodeURIComponent(href);
    }

    //钱数清0动画
    if (typeof resetMoney != 'undefined' && window.location.hash.indexOf("cResetMoney") < 0) {
        var f = Math.ceil(resetMoney / 8);
        var tMoney = $("#totalMoney");

        tMoney.text(resetMoney);

        setTimeout(function() {
            resetMoney = resetMoney - f;
            tMoney.text(resetMoney);

            if (resetMoney > 0) {
                setTimeout(arguments.callee, 100);
            } else if (resetMoney < 0) {
                tMoney.text(0);
            }
        }, 1000);

        // 钱罐冻结提示和查看浮层钱数清零，隐藏钱罐冻结提示
        var oCapacity = $('.main .sub_title').find('em').eq(0);

        if (oCapacity.length > 0) {
            oCapacity.text(0);
        }

        //还需要一个resetMoney过期的url参数，防止用户刷新
        window.location.hash = "cResetMoney"
    }

    // 补签文案提示
    var oPatchTip = $('.ret_tip');

    if (oPatchTip.length > 0) {
        var txt = '',
            isShow = true,
            oTxt = oPatchTip.find('.txt');

        if (patch_total <= 0) {
            isShow = false;

            txt = '你已经补完了所有的漏签记录！';
        } else {
            isShow = true;

            if (patch_status == 1) {
                if (patch_miss != '') {
                    txt = '明天可以补签' + patch_miss + '的签到记录';
                } else {
                    txt = '你已经补完了所有的漏签记录！';
                }
            } else {
                if (patch_chance <= 0) {
                    txt = '你累计漏签了' + patch_total + '天，快去补签吧！';
                } else {
                    if (patch_miss != '') {
                        txt = '今天可以补签' + patch_miss + '的签到记录';
                    } else {
                        txt = '你已经补完了所有的漏签记录！';
                    }
                }
            }
        }

        oTxt.text(txt);
        isShow && oPatchTip.show();
    }

    //这里要改，增加体验度，需要在node层判断
    //判断最后签到日是否等于当前服务器时间，等于说明今天已经签到，显示兑换按钮
    if (regDateArr != null && regDateArr.length > 0) { //regDateArr为空要么第一次参与签到，要么没有登陆
        if (regDateArr[regDateArr.length - 1] == serverDateStr) {
            $(".qd_box,.pic_box,.icon_date,.money_box").removeClass("up_down").addClass("fadeout").css("display", "none");
            $(".top_main").css({'padding-top': '30%'});
            $(".top_main .gz_box").css({'padding-top': '14.8%'});

            if (!shareBtn) {
                $(".mark_box").addClass("fadein").css("display","block");
                $(".calanderWrap1").addClass("fadein").css("display","block");
            }

            // 显示兑换分享按钮
            showConAndShareBtn(sTime);
        }
    }

    // 连续签到天数
    if (con_sign_days > 0) {
        $('#j_sign_days').text(con_sign_days);
        $('.date_box').find('.totals').show();
    }

    //点击立即签到，判断是否登陆 将按钮换成兑换和分享 判断是否是兑换日
    $("#qd_btn").on("tap", function() {
        //fml.vars.isLogin = 1;

        //判断是否登陆
        if (!fml.vars.isLogin) {
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }

        var ec = [];
        var reqData = {
            "userid" : Meilishuo.config.user_id,
            "time" : parseInt(new Date().getTime()/1000),
            "total" : +totalMoney,
            "rand" : parseInt(Math.random()*100000000)
        };
        for (var key in reqData) {
            ec.push(key + "=" + reqData[key]);
        }
        var md5Str = ((encrypt.MD5(ec.join("&")).toString()).toLowerCase()).toString();
        reqData.code = (encrypt.HmacSHA1(md5Str.substr(0,16),md5Str.substr(16))).toString();

        // 显示兑换 分享按钮
        $.post("/aw/sign/do_reg", reqData, function(data) {
            data = JSON.parse(data);

            if (data.message == 'success') {
                if (regDateArr == null || regDateArr.length == 0) { //第一次签到,打开提醒开关
                    $.post("/aw/sign/remind", {"switch" : 1}, function() {
                        $(".cont").addClass("open");
                    });
                }

                // 金额+1
                totalMoney = (+totalMoney) + 1;
                capacitySize = parseInt(capacitySize);

                var oSignDesc = $('.mark_box .m');
                var curServerTime = parseInt(sTime);

                if (capacitySize >= totalMoney) {
                    // 签到成功时，剩余兑换天数减1
                    --lastDays;

                    var win = $("#dh_date").text();
                    var nums = $(".nums_my span").eq(0).text();

                    $(".nums_my span").eq(0).text((+nums) + 1);
                    $("#dh_date").text(Number(win) - 1);
                    $(".coin").addClass("coin_animate");

                    setTimeout(function(){
                        $(".plus").addClass("plus1");
                    }, 800);

                    setTimeout(function() {
                        var t = $(".total span");

                        t.text(+t.text() + 1);
                        t.addClass('modeCoinX moveCoin');
                    }, 2000);

                    /*if (new Date().getDate() < 12) {
                        oSignDesc.html('<p style="line-height: 24px"><span style="font-size:20px; color:#c35d41">距离12.12还有<span>' + (12 - new Date().getDate()) + '</span>天</span><br><span style="font-size:15px;color:#c35d41">记得兑换奖金，12.12给自己买件好的～</span></p><a href="javascript:;" class="share_button"></a>');
                    } else {
                        oSignDesc.html('<p style="line-height: 24px"><span style="font-size:20px; color:#c35d41">美丽说12.12火热进行中</span><br><span style="font-size:15px;color:#c35d41">记得兑换奖金，12.12给自己买件好的～</span></p><a href="javascript:;" class="share_button"></a>');
                    }
                    oSignDesc.html('<p>打败了全国<span>' + percentA + '%</span>的姑娘<br>排名第<span>' + rankA + '</span>名</p><a href="javascript:;" class="share_button"></a>');*/

                    var mall_text = '',
                        mall_html = '',
                        mall_style = '';

                    if ((curServerTime >= plotStartTime) && (curServerTime <= plotEndTime)) {
                        mall_style = 'background-image:url(http://i.meilishuo.net/css/images/wap/activity/may_sale/sign_mall_bg3.jpg);';
                        mall_text = '<span>新年<em>桃花运</em>特辑</span>';
                    } else {
                        mall_style = '';
                        mall_text = '<span>今日上新<em>' + newGoodsNum + '</em>件</span>';
                    }

                    mall_html = [
                        '<a href="/activity/sign/sign_mall/?hdtrc=tuan1300_qiandao">',
                            '<div class="sign_mall" style="' + mall_style + '">',
                                '<div class="mall_tip">' + mall_text + '<br>每日上新，<em>双倍</em>兑换！</div>',
                            '</div>',
                            '<div class="visit_button"></div>',
                        '</a>'
                    ].join('');

                    oSignDesc.html(mall_html);
                } else {
                    // 冻结金额+1
                    freezeMoney = (+freezeMoney) + 1;
                    oSignDesc.html('<p>你的小猪装满了<br>还有<span class="j_cap_size">' + freezeMoney + '</span>元塞不进去~</p><a href="javascript:;" class="tips_button"></a>');
                }

                //变更日历签到状态图标
                $('.date-' + serverDateStr + '-class').find('.qdStatus').removeClass('qdStatus_lq qdStatus_wq').addClass('qdStatus_yq');

                //连续签到天数+1
                conSignDays = Number(con_sign_days) + 1;
                $('#j_sign_days').text(conSignDays);

                //连续签到天数大于等于5，弹出红包浮层
                /*if (conSignDays >= 5) {
                    $.ajax({
                        url : "/aw/sign/red?game_id=5&val",
                        type : "post",
                        dataType : "json",
                        async : false,
                        success : function(data) {
                            //alert(data.code);
                            if (data.code == 0) {
                                window.setTimeout(function() {
                                    redPackageLogic();
                                }, 2200);
                            }
                        }
                    });

                }*/

                // 连续签到5天及5天以上并且有漏签记录的人，在当天签到成功后弹出分享到qzone浮层（每个用户只能看到一次弹窗，优先级低于微信红包弹窗，当有微信红包弹窗时不弹分享到qzone弹窗）
                if (((typeof Meilishuo.config.os.iphone == 'undefined') || !Meilishuo.config.os.iphone) && (isHasNotice == 0) && (patch_total > 0) && (conSignDays >= 5)) {
                    // 分享到qzone
                    window.setTimeout(function() {
                        shareToQzone();
                    }, 3000);
                }

                // 显示兑换分享按钮
                showConAndShareBtn(parseInt(data.time) * 1000);

                //前3次签到弹窗；
                setTimeout(function(){
                    if (curServerTime <= actEndTime) {
                        $("body").append($("#j_signin_layer").html());
                    } else {
                        if (conSignDays > 0 && conSignDays <=3) {
                            $("body").append($("#pointbox").html());
                        }
                    }
                }, 2500);

                if (data.award && data.award.coupon) {
                    setTimeout(function(){
                        $("body").append($("#820coupon").html());
                    }, 2500);
                }
            } else {
                var alt = new a({
                    content: data.tips,
                    onSure: function () {
                        return;
                    }
                });
            }
        });
    });

    //点击分享按钮
    $('body').on('tap', '.share_button', function(){
        window.location.href = "/activity/sign/sign_share/?totalMoney=" + totalMoney + "&continuousDay=" + $("#continuousSign").text() + "&headPic=" + headPic + "&rankA=" + rankA + "&percentA=" + percentA; 
    });

    //点击兑换按钮
    $('.dh_btn').on('tap', function() {
        var that = $(this);

        if (!that.hasClass('dh_no')) {
            /*if (that.attr('loading') == 1) {
                return;
            }

            that.attr('loading', 1);

            //访问接口获取优惠券面值及数量
            $.post('/aw/sign/getCoupons', null, function(data) {
                if (data.code == 0) {
                    //显示兑换弹层
                    var tpl = shareTmp('new_coupon_qr', {'coupons': data.data, 'totalMoney': totalMoney});
                    $('body').append(tpl);
                }

                that.attr('loading', 0);
            }, 'json');*/

            /*$("body").append($("#j_exchange_layer").html());*/

            window.location.href = '/activity/sign/sign_coupon/';
        } else {
            var oTip = $('.change_text');

            if (oTip.length > 0) {
                totalMoney = parseInt(totalMoney);
                capacitySize = parseInt(capacitySize);

                var txt = (capacitySize >= totalMoney) ? '你太心急了<br>还差<span id="dh_date">' + lastDays + '</span>天才能兑换哦' : '小猪装满了<br>买点东西提高容量吧';

                oTip.html(txt).show();

                setTimeout(function(){
                    oTip.hide();
                }, 2000);
            }   
        }
    });

    // 养肥点再杀
    $("body").on("tap", ".dj1_btn", function() {
        removeShade();
    });

    $("body").on("tap", ".new_coupon_qr_close", function() {
        $(".shade").remove();
        $(".new_dh").remove();
    });

    $("body").on("tap", ".canSel", function() {
        if ($(this).find("div").eq(1).css("display") == "block") {
            return;
        }
        fml.vars.getCouponPrice = +$(this).find("span").eq(0).text();
        $(this).addClass("currSel").siblings().removeClass("currSel");
        $(".coupon_tips .cp").text(fml.vars.getCouponPrice);
        $(".coupon_tips .lp").text(totalMoney - fml.vars.getCouponPrice);
    });

    // 兑换 我爱钱
    $("body").on("tap", ".new_dj_btn", function(){
        var that = $(this);

        if (that.hasClass('new_dj_btn_gray')) {
            window.location.href = '/activity/sign/sign_mall/?hdtrc=tuan1300_qiandao';
            return;
        }

        if (!fml.vars.getCouponPrice) {
            new a({
                content: '请选择要兑换的优惠券！',
                onSure: function () {
                    return;
                }
            });
            return;
        }

        if (that.attr('loading') == 1) {
            return;
        }

        that.attr('loading', 1);

        $('.shade').remove();
        $('.new_dh').remove();

        // 兑换成券
        $.ajax({
            url: '/aw/sign/redeem',
            data: {
                'price': fml.vars.getCouponPrice
            },
            type: 'post',
            dataType: 'json',
            success: function(data){
                if (data.message == 'success') {
                    var tpl = shareTmp('new_dh_succ', {'couponPrice' : fml.vars.getCouponPrice});
                    $('body').append(tpl);
                    // 兑换按钮变灰
                    $('.dh_btn').addClass('dh_no');
                } else {
                    var alt = new a({
                        content: data.tips,
                        onSure: function () {
                            return;
                        }
                    });
                }

                that.attr('loading', 0);
            },
            error: function(){
                that.attr('loading', 0);

                var alt = new a({
                    content: '系统繁忙！',
                    onSure: function(){
                        return;
                    }
                });
            }
        });
    });

    // 点击查看签到详情
    $("body").on("tap", ".j_look_btn", function() {
        removeShade();
        $('.main').remove();
        window.location.href = "/activity/sign/sign_explain/";
    });

    // 点击查看优惠券按钮，移除浮层
    $("body").on("tap", ".new_coupon_btn", function() {
        removeShade();
        window.location.href = "meilishuo://coupons.meilishuo";
    });

    $("body").on("tap", ".dh_succ_close", function() {
        window.location.reload();
        //$(".shade").remove();
        //$(".dh_succ").remove();
    });

    // 关闭温馨提示
    $("body").on("tap", ".come_on", function() {
        removeShade();
    });

    $('body').on('tap', '.tips_button', function(){
        $('body').append($('#capacity_layer').html());

        var oSpan = $('.j_cap_size').eq(0),
            oCapacity = $('.main .sub_title').find('em').eq(0);

        if (oSpan.length > 0) {
            var num = parseInt(oSpan.text() || 0);

            if (oCapacity.length > 0) {
                oCapacity.text(num);
            }
        }
    });

    $('body').on('tap', '.ok_btn', function(){
        removeShade();
        $('.main').remove();

        window.location.href = 'http://m.meilishuo.com/tuan/?frm=qiandaosave';
    });

    // 关闭分享到qzone浮层
    $('body').on('tap', '.close_btn', function(){
        removeShade();
        $('.main').remove();
    });

    // 查看916活动详情
    $('body').on('tap', '.j_916_activity', function(){
        $('body').append($('#activity_layer').html());
    });

    // 补签
    $('body').on('tap', '.ret_btn', function(){
        window.location.href = (!fml.vars.isLogin) ? 'meilishuo://login.meilishuo/' : '/activity/signPatch/index/';
    });

    // 活动规则
    $(".gz_btn").on("tap",function(){
        $("body").append($("#rule1").html());
    });

    $("body").on("tap", ".new_know", function(){
        removeShade();
        $(".main").remove();
    });

    $("body").on("tap", ".j_know_btn", function(){
        var that = $(this);

        removeShade();
        $(".main").remove();

        if (that.attr('loading') == 1) {
            return;
        }

        that.attr('loading', 1);

        //访问接口获取优惠券面值及数量
        $.post('/aw/sign/getCoupons', null, function(data) {
            if (data.code == 0) {
                //显示兑换弹层
                var tpl = shareTmp('new_coupon_qr', {'coupons': data.data, 'totalMoney': totalMoney});
                $('body').append(tpl);
            }

            that.attr('loading', 0);
        }, 'json');
    });

    $("body").on("tap", ".j_close_btn", function(){
        removeShade();
        $(".main").remove();
    });

    $("body").on("tap", ".point_btn", function(){
        removeShade();
        $(".main").remove();
    });

    // 初始化日历
    calander($('.calander'), serverDateStr);

    // 填充签到状态
    fillSignStatus($('.calander'), sYear, sMonthNum);

    // 初始化日历
    function calander(oCalander, dateStr) {
        var flag = false,
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

                html = '<div class="date-' + divId + '-class h2" data-id=" ' + divId + '"';

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

    /*$("#2014-12-12").empty().addClass("icon11");
    $("#2014-12-05").addClass("icon11Border1");
    $("#2014-12-11").addClass("icon11Border2");*/

    // 填充签到状态
    function fillSignStatus(oCalander, iYear, iMonth) {
        // 未签到过
        if (regDateArr == null || regDateArr.length == 0) {
            return;
        }

        var oQdStatus = oCalander.find('.qdStatus'),
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
                oCalander.find('.date-' + curConvertedDateStr + '-class .dhStatus').addClass('dhStatus_ydh');
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
                curDate = getDateObj(curQdStatus.parent().attr('data-id'));

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
                oCalander.find('.date-' + curSignDateStr + '-class .qdStatus').removeClass('qdStatus_lq qdStatus_wq').addClass('qdStatus_yq');
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

    // 根据年月日生成日期对象 YYYY-MM-dd
    function getDateObj(dateStr) {
        dateStr += "";
        var dArr = dateStr.split("-");
        var d = new Date();
        d.setFullYear(dArr[0]);
        d.setMonth(dArr[1] - 1);
        d.setDate(dArr[2]);
        return d;
    }

    // yyyy-mm-dd
    function getDateStr(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? "0" + m : m;
        var d = date.getDate();
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
    }

    // 计算日差
    function dateDiff(currDateObj, lastSignDateObj) {
        return parseInt((lastSignDateObj-currDateObj)/86400000);
    }

    // 显示兑换分享按钮
    function showConAndShareBtn(serverTime, endTime) {
        // 计算兑换相差日期和金额
        $(".qd_box").find("a").animate({"opacity":0}, 200);
        $(".money_box").animate({'opacity':0}, 200);

        setTimeout(function(){
            $(".qd_box,.pic_box,.icon_date,.money_box").removeClass("up_down").addClass("fadeout").css("display","none");
            $(".top_main").css({'padding-top':'30%'});
            $(".top_main .gz_box").css({'padding-top':'14.8%'});

            if (!shareBtn) {
                $(".mark_box").addClass("fadein").css("display","block");
                $(".calanderWrap1").addClass("fadein").css("display","block");
            }
        }, 2000);

        //判断兑换日日期
        var oExBtn = $('.dh_btn'),
            dhDateStr = redeemArr[0] || '';

        if (dhDateStr == '') {
            var totalAwardNum = parseInt($('.nums_my span').eq(0).text() || 0);

            if ((totalAwardNum > 0) && ((totalAwardNum % 5) == 0)) {
                oExBtn.removeClass('dh_no');
            } else {
                oExBtn.addClass('dh_no');
            }
        } else if (dhDateStr == serverDateStr) { //倒计时
            oExBtn.removeClass("dh_no");

            $("#dh_countTime").css("display", "block");
            $("#dh_countTime").append($("#commonCountdown").html());
            $("#timeStamp").attr("now", serverTime / 1000);

            if (endTime) {
                $("#timeStamp").attr("end-date", endTime/1000);
            } else {
                var sDateObj = getDateObj(serverDateStr);
                sDateObj.setHours(24,0,0);
                endTime = sDateObj.getTime();
                $("#timeStamp").attr("end-date", endTime/1000);
            }

            countdown(function() {
                oExBtn.addClass("dh_no");

                $("#timeStamp").remove();
                $("#dh_countTime").css("display", "none");
                $(".nextRedeemDay").css("display", "block");
                $(".nextRedeemDay span").text(redeemArr[1] || ""); //倒计时技术后，下次兑换日为第二个元素
            });
        } else if (dhDateStr) { //填充下次兑换日
            $(".nextRedeemDay").css("display", "block");
            $(".nextRedeemDay span").text(dhDateStr);
        }
    }

    function removeShade() {
        $(".shade").remove();
        $(".win_box").remove();
    }

    //提醒开关
    $('.cont').on('tap', function(event){
        event.preventDefault();
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

    function persondate(){
        $.post("/aw/sign/scroll", null, function(data) {
            data = JSON.parse(data);
            var award = data.award;
            if( award && award.length){
                for(var i=0;i<award.length;i++){
                    var add = '<li><img src=http://d04.res.meilishuo.net/' + award[i].avatar + ' class="top"><div class="text"><p class="t">' + award[i].nickname + '</p><p class="m">' + award[i].tips + '</p></div></li>';
                    $(".person_box").prepend(add);
                }
            }else{
                var add = '<li><img src=http://d04.res.meilishuo.net/ap/c/f0/c9/03891e261ed6f78b16c6bffe8f1c_247_247.c1.jpg class="top"><div class="text"><p class="t">西大大</p><p class="m">损失了8元奖金</p></div></li>';
                $(".person_box").prepend(add);
            }
        });
    }

    function personBox(){
        persondate();
        autoScroll();
        var personlis = $(".person_box").find("li").length;
        setInterval(function(){
            autoScroll();
            personlis--;
            if( personlis == 1){
                persondate();
                personlis += $(".person_box").find("li").length;
            }
        },2000)
    }

    function autoScroll() {
        $(".person_box").animate({
            top: "-60px"
        }, 0, function () {
            $(this).css({ top: "0%"});
            pObj = $(this).find("li")[0];
            $(this).append(pObj); 
        });
    }

    // 显示日历
    $(".icon_date").on("tap", function(){
        $("body").append($("#calendar").html());
        $(".calander_win").append($(".date_box").clone(true).removeClass("date_box").addClass("t"));
        var cl = $(".date_box").next(".calander").clone(true);
        var cll = $(".date_box").next(".calander").next(".cBottom").clone(true);
        $(".calander_win").append(cl).append(cll);
    });

    // 关闭日历弹窗
    $("body").on("tap",".calendar_close", function(){
        $(".shade").remove();
        $(".calendar_box").remove();
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
            curMonth = parseInt(strMonth),
            oCalanderWrap = that.parent().parent('.calanderWrap'),
            oCalander = oCalanderWrap.find('.calander');

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
        calander(oCalander, curDateStr);
        // 填充签到状态
        fillSignStatus(oCalander, curYear, curMonth - 1);
        oCalanderWrap.find('.month').text(txtDateStr);

        if (curFlag == 'prev') {
            that.attr('data-year', prevYear).attr('data-month', prevMonth);
            oCalanderWrap.find('.next_btn').attr('data-year', nextYear).attr('data-month', nextMonth);
        } else {
            that.attr('data-year', nextYear).attr('data-month', nextMonth);
            oCalanderWrap.find('.prev_btn').attr('data-year', prevYear).attr('data-month', prevMonth); 
        }
    });

    //日差
    function diff(sDate1, sDate2){  
       var  aDate,  oDate1,  oDate2,  iDays ;
       aDate  =  sDate1.split("-"); 
       oDate1  =  new Date(aDate[0] + "-" + aDate[1] + "-" + aDate[2]);    //转换为2014-08-25格式        
       aDate  =  sDate2.split("-"); 
       oDate2  =  new Date(aDate[0] + "-" + aDate[1] + "-" + aDate[2]);  
       iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数  
       return  iDays; 
    }
        
    if (!isNewest && Meilishuo.config.os.iphone) {
        var c = new confirm({
            content : '你的版本太旧了，先升级再签到吧！~'
            , onSure : function(){
                window.location.href = "/download/latest/wap";
            }
            , onCancel : function(){
                return;
            }
        });
    }

    //redPackageLogic(5);
    /*红包*/
    function redPackageLogic() {
        $.ajax({
            url : "/aj/coupon/get?coupon_apply_code=20141025181030d10e5b55b5",
            type : "post",
            dataType : "text",
            async : false,
            success : function(data) {
                //alert(JSON.stringify(data));
            },
            error : function(data) {
                // alert("error:" + JSON.stringify(data));
            }
        });

        var tpl = shareTmp('redFor11');
        $("body").append(tpl);

        $(".redShare").on("click",function() {
            $.post("/activity/sign/redPacket/?act=share", null, function(data) {
                //alert(data);
            });
            $.post("/aw/sign/red?game_id=5", null, function(data) {
                //alert("红包接口返回的数据：" + JSON.stringify(data));
                if (data.code == -1) {
                    alert("您已经领过了！");
                    return;
                }
                var params = {
                    'title' : {
                        'default' : data.shareData.weixin_timeline.title
                    },
                    'text' : {
                        'default' : data.shareData.weixin_timeline.text
                    },
                    'pic' : {
                        'default' : data.shareData.weixin_timeline.pic
                    },
                    'url' : data.shareData.weixin_timeline.url
                };

                shareTo.shareToPengYouQuan(params);
                $(".shade").remove();
                $(".redMain2").remove();

            }, "json");

        });

        $(".redClose").on("click", function() {
            $.post("/activity/sign/redPacket/?act=noShare", null, function(data) {
                //alert(data);
            });
            $(".shade").remove();
            $(".redMain2").remove();
        });
    }

    var shareQzoneTimer = null;
    // 分享到qzone回调函数
    function shareQzoneCallback() {
        if (shareQzoneTimer) {
            clearTimeout(shareQzoneTimer);
            shareQzoneTimer = null;
        }

        shareQzoneTimer = window.setTimeout(function() {
            var tpl = shareTmp('j_succ_layer', {tContent: $('#j_succ_layer').html()});

            $('body').append(tpl);

            // 关闭分享成功浮层并跳转到签到页
            $('.scan_btn').on('tap', function(){
                removeShade();
                $('.main').remove();
                // 跳转到补签页
                window.location.href = '/activity/signPatch/index/';
            });
        }, 8000);
    }

    // 分享到qzone
    function shareToQzone() {
        var tpl = shareTmp('j_qzone_layer', {tContent: $('#j_qzone_layer').html()});

        $('body').append(tpl);

        var params = {
            'title': {
                'default': '美丽说50元新手礼包'
            },
            'text': {
                'default': '我在美丽说给你送了一个价值50元的新手购物券礼包（应用宝下载专享）！快来领哦~'
            },
            'pic': {
                'default': 'http://i.meilishuo.net/css/images/wap/activity/may_sale/redPacket.jpg'
            },
            'url': 'http://qzs.qq.com/open/mobile/social_share/index.html?pkgName=com.meilishuo'
        };

        $('.share_btn').on('tap', function() {
            $.post('/aw/sign/share', {'share': 1}, function(data) {
                //console.log(data);

                if (data.code == 0) {
                    // 分享到qzone回调函数
                    shareQzoneCallback();
                }
            }, 'json');

            shareTo.shareToQzone(params);

            removeShade();
            $('.main').remove();
        });

        // 关闭分享到qzone浮层
        $('.close_btn').on('tap', function(){
            $.post('/aw/sign/share', {'share': 0}, function(data) {
                //console.log(data);
            }, 'json');

            removeShade();
            $('.main').remove();
        });
    }
});
