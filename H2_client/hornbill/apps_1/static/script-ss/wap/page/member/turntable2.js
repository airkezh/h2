/*common*/

/**
 * @fileoverview 大转盘抽奖－会员中心
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-08-07
 */

require('wap/zepto/touch');
require('wap/zepto/fastclick');
require('wap/component/awardRotate');

//var $ = require('jquery');
//var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var confirm = require('wap/ui/confirm');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
//var checkLogin = require('circle/app/checkLogin');

window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    },

    onPickAddress: function(res){
        var code = res.code;

        if (code == 0) {
            var data = (fml.vars.isAndroid ? res.info : $.parseJSON(res.info)) || {},
                addrId = data.addr_id || '',
                phone = data.phone || '',
                address = data.address || '',
                nickname = data.nickname || '',
                address = address.substr(0, 18) + '...',
                nicknameLen = nickname.length || 0,
                nickname = (nicknameLen <= 4) ? nickname : nickname.substr(0, 4) + '...',
                recordId = $('#j_prize_btn').data('recoid') || 0;

            $('#j_pic_bg').attr('src', 'http://d03.res.meilishuo.net/pic/_o/b7/d8/5ae55a413903ab25d883504e7633_640_824.cf.png');
            $('#j_prize_desc').html('<p class="address">商品将发往:<br>' + address + '<br>' + nickname + '&nbsp;&nbsp;' + phone + '</p>');
            $('#j_prize_btn').html('<div class="buttons"><div class="alter_btn"></div><div class="sure_btn" data-addrid="' + addrId + '" data-recoid="' + recordId + '"></div></div>');
        }
    }
};

var curCaptchaType;
var curCaptchaDomain;
var curCaptchaRuleId;
var saveAjaxRequestIsComplete = false;
var convertAjaxRequestIsComplete = false;
var curPageUrlFrmParam = urlHandle.queryString('frm', {'source': window.location.href.toString()});

var turnplate = {
    restaraunts: [],             // 大转盘奖品名称
    colors: [],                  // 大转盘奖品区块对应背景颜色
    outsideRadius: 192,          // 大转盘外圆的半径
    textRadius: 155,             // 大转盘奖品位置距离圆心的距离
    insideRadius: 48,            // 大转盘内圆的半径
    startAngle: 0,               // 开始角度
    bRotate: false               // false:停止;ture:旋转
};

// 动态添加大转盘的奖品与奖品区域背景颜色
turnplate.restaraunts = fml.vars.turntablePrizeData;
turnplate.colors = ['#fffdd2', '#ffefae', '#fffdd2', '#ffefae', '#fffdd2', '#ffefae', '#fffdd2', '#ffefae', '#fffdd2', '#ffefae'];

var rotateTimeOut = function(){
    $('#wheelcanvas').rotate({
        angle: 0,
        animateTo: 2160,
        duration: 8000,
        callback: function(){
            var alt = new Alert({
                content: '网络超时，请检查您的网络设置！',
                onSure: function(){
                    return;
                }
            });
        }
    });
};

var turntable = {
    init: function(){
        if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
            //openApp(window.location.href, '', '', true, 'member');
            openApp(window.location.href, '', '', true);
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
        }*/

        this.initEvent();
    },

    initEvent: function(){
        var self = this;

        window.onload = function(){
            // 页面所有元素加载完毕后执行drawRouletteWheel()方法对转盘进行渲染
            self.drawRouletteWheel();
        };

        // 关闭弹窗
        $('body').on('click', '.know_btn', function(){
            self.removeLayer();
        });

        // 关闭弹窗
        $('body').on('click', '.close_btn', function(){
            var that = $(this),
                type = that.data('type') || 1;

            self.removeLayer();

            if (type == 3) {
                var oAddBeans = $('#j_add_beans'),
                    beans = that.data('beans') || 0;

                oAddBeans.animate({
                //oAddBeans.text('+' + beans).animate({
                    //'opacity': 0,
                    '-webkit-transform': 'scale(1,1);',
                    '-moz-transition': 'scale(1,1);',
                    '-o-transform': 'scale(1,1);',
                    '-ms-transform': 'scale(1,1);',
                    'transform': 'scale(1,1);'
                }, 500, function(){
                    oAddBeans.css({'opacity': 0});

                    var oTotalBeans = $('#j_total_beans'),
                        curUserTotalBeans = parseInt(oTotalBeans.text()) + beans;

                    oTotalBeans.text(curUserTotalBeans);

                    self.updateTurntablePointer();
                });
            }
        });

        $('body').on('click', '.login_tips', function(){
            window.location.href = 'meilishuo://login.meilishuo/';
            return;
        });

        $('body').on('click', '.sure_btn', function(){
            var that = $(this),
                addrId = that.data('addrid'),
                recordId = that.data('recoid');

            if (saveAjaxRequestIsComplete) {
                return;
            }

            saveAjaxRequestIsComplete = !saveAjaxRequestIsComplete;

            $.ajax({
                url: '/aj/member/saveContactInfo',
                type: 'post',
                data: {
                    'addr_id': addrId,
                    'record_id': recordId,
                    'act_code': 'beans_dial'
                },
                dataType: 'json',
                success: function(data){
                    var code = data.error_code;

                    if (code == 0) {
                        self.removeLayer();
                    } else {
                        var alt = new Alert ({
                            content : '保存失败！',
                            onSure : function(){
                                return;
                            }
                        });
                    }

                    saveAjaxRequestIsComplete = !saveAjaxRequestIsComplete;
                },
                error: function(){
                    var alt = new Alert ({
                        content : '服务器开小差中...请稍后再试~',
                        onSure : function(){
                            return;
                        }
                    });

                    saveAjaxRequestIsComplete = !saveAjaxRequestIsComplete;
                }
            });
        });

        $('body').on('click', '.alter_btn,.write_btn', function(){
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
                window.location.href = 'meilishuo://pick_address.meilishuo';
            }
        });

        // 我的奖品
        $('body').on('click', '.my_prize,.looks_btn', function(){
            // 发送数据统计请求
            tracking.cr('member_center_prize', {'area': 'myprize'});

            window.location.href = '/member/turntable_prize/';
        });

        // 活动规则
        $('body').on('click', '.activity_rule', function(){
            window.location.href = '/member/turntable_rule/';
        });

        // 点击抽奖
        $('body').on('click', '#pointer', function(){
            var that = $(this);

            // 判断是否登陆
            if (!fml.vars.isLogin || that.hasClass('login')) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            if (that.hasClass('inactive')) {
                return;
            }

            self.sendDrawAjax();
        });

        // 点击兑券
        $('body').on('click', '.coupon_wall .coupon', function(){
            var that = $(this);

            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var code = that.data('code') || '',
                status = that.data('status') || 0,
                beans = parseInt(that.data('beans')) || 0,
                totalBeans = parseInt($('#j_total_beans').text()) || 0;

            if (code == '') {
                return;
            }

            if (status == 0) {
                if (totalBeans < beans) {
                    var alt = new Alert ({
                        content : '你的美美豆不够哦，快去签到赚美美豆吧！',
                        onSure : function(){
                            return;
                        }
                    });

                    return;
                }

                var c = new confirm({
                    content: '使用' + beans + '美美豆兑换优惠劵？',
                    onSure: function(){
                        // 兑换优惠券
                        self.sendCouponAjax(that);
                    },
                    onCancel: function(){
                        return;
                    }
                });
            }
        });

        // 跳转到主会场
        $('body').on('click', '.link_box', function(){
            var href = $(this).data('href') || '';

            // 判断是否登陆
            if (href != '') {
                // 发送数据统计请求
                tracking.cr('member_turntable', {'area': 'gopromotion_line', 'frm': curPageUrlFrmParam || 'turntable'});

                window.location.href = href;
            }
        });
    },

    sendDrawAjax: function(){
        var self = this;

        if (turnplate.bRotate) {
            return;
        }

        turnplate.bRotate = !turnplate.bRotate;

        $.ajax({
            url: '/aj/member/doDraw',
            type: 'post',
            data: {
                'act_code': 'beans_dial'
            },
            dataType: 'json',
            success: function(data){
                var code = data.error_code,
                    jsonData = data.data || {};

                switch (code) {
                    case 0:
                        var isFree = (fml.vars.LotteryFreeTimes < 1) ? 1 : 0;
                        // 发送数据统计请求
                        tracking.cr('member_turntable', {'area': 'luckdraw_button', 'isfree': isFree, 'frm': curPageUrlFrmParam || 'turntable'});
                        fml.vars.LotteryFreeTimes = fml.vars.LotteryFreeTimes - 1;

                        self.updateTurntableState();

                        // 获取随机数(奖品个数范围内)
                        //var index = self.getRandom(1, turnplate.restaraunts.length);
                        var index = self.getPrizeIndex(jsonData);

                        // 奖品数量等于10,指针落在对应奖品区域的中心角度[252, 216, 180, 144, 108, 72, 36, 360, 324, 288]
                        //self.rotateFn(index, turnplate.restaraunts[index - 1]);
                        self.rotateFn(index + 1, jsonData);

                        break;
                    case 400901:
                        curCaptchaType = jsonData.captcha_type || '';
                        curCaptchaRuleId = jsonData.rule_id || '';

                        self.smsCaptchaValidate();

                        break;
                    case 400902:
                    case 400903:
                    case 400904:
                        curCaptchaType = jsonData.captcha_type || '';
                        curCaptchaDomain = jsonData.captcha_domain || '';
                        curCaptchaRuleId = jsonData.rule_id || '';

                        self.imgCaptchaValidate();

                        break;
                    default:
                        /*var alt = new Alert ({
                            content : '抽奖失败！',
                            onSure : function(){
                                self.removeLayer();
                                return;
                            }
                        });*/

                        break;
                }
            },
            error: function(){
                var alt = new Alert ({
                    content : '服务器开小差中...请稍后再试~',
                    onSure : function(){
                        self.removeLayer();
                        return;
                    }
                });

                turnplate.bRotate = !turnplate.bRotate;
            }
        });
    },

    sendCouponAjax: function(that){
        var self = this,
            code = that.data('code') || '',
            beans = parseInt(that.data('beans')) || 0;

        if ((code == '') || convertAjaxRequestIsComplete) {
            return;
        }

        convertAjaxRequestIsComplete = !convertAjaxRequestIsComplete;

        $.ajax({
            url: '/aj/member/exchangeCoupon',
            type: 'post',
            data: {
                'code': code
            },
            dataType: 'json',
            success: function(data){
                var code = data.error_code,
                    jsonData = data.data || {};

                switch (code) {
                    case 0:
                        self.updateTurntableState(beans);

                        self.updateCouponState(that, jsonData);

                        var alt = new Alert ({
                            content : '优惠劵已领取成功，请在大促期间使用！',
                            onSure : function(){
                                return;
                            }
                        });

                        break;
                    case 400900:
                        var alt = new Alert ({
                            content : '对不起，此次兑换失败，请联系<br>客服<a href="tel:1400-080-0577" style="display:inline;color:#f69;">400-080-0577</a>。',
                            onSure : function(){
                                return;
                            }
                        });

                        break;
                    case 400901:
                        curCaptchaType = jsonData.captcha_type || '';
                        curCaptchaRuleId = jsonData.rule_id || '';

                        self.smsCaptchaValidate();

                        break;
                    case 400902:
                    case 400903:
                    case 400904:
                        curCaptchaType = jsonData.captcha_type || '';
                        curCaptchaDomain = jsonData.captcha_domain || '';
                        curCaptchaRuleId = jsonData.rule_id || '';

                        self.imgCaptchaValidate();

                        break;
                    default:
                        var alt = new Alert ({
                            content : data.message,
                            onSure : function(){
                                return;
                            }
                        });

                        break;
                }

                convertAjaxRequestIsComplete = !convertAjaxRequestIsComplete;
            },
            error: function(){
                var alt = new Alert ({
                    content : '服务器开小差中...请稍后再试~',
                    onSure : function(){
                        return;
                    }
                });

                convertAjaxRequestIsComplete = !convertAjaxRequestIsComplete;
            }
        });
    },

    updateCouponState: function(oThat, data){
        var pic = data.pic || '',
            code = data.code || '';

        if ((pic != '') && (code != '')) {
            var beans = data.beans || 0,
                status = data.status || 0,
                style = 'background-image: url(' + pic + ');',
                html = '<div class="coupon" data-code="' + code + '" data-beans="' + beans + '" data-status="' + status + '" style="' + style + '"></div>';

            oThat.parent().html(html);
        }
    },

    updateTurntableState: function(threshold){
        var self = this,
            oTotalBeans = $('#j_total_beans'),
            thresholdBeans = threshold || fml.vars.turntableThreshold,
            curUserTotalBeans = parseInt(oTotalBeans.text());

        if (fml.vars.LotteryFreeTimes < 0) {
            curUserTotalBeans = parseInt(oTotalBeans.text()) - thresholdBeans;
            oTotalBeans.text(curUserTotalBeans);
        }

        self.updateTurntablePointer();
    },

    updateTurntablePointer: function(){
        var oPointer = $('#pointer'),
            curUserTotalBeans = parseInt($('#j_total_beans').text());

        if (fml.vars.isLogin) {
            if (fml.vars.LotteryFreeTimes > 0) {
                oPointer.removeClass('login inactive').addClass('free');

                if (fml.vars.freePointerImg != '') {
                    oPointer.css('background-image', 'url(' + fml.vars.freePointerImg + ')');
                }
            } else {
                if (curUserTotalBeans < fml.vars.turntableThreshold) {
                    oPointer.removeClass('free login').addClass('inactive');

                    if (fml.vars.unavailablePointerImg != '') {
                        oPointer.css('background-image', 'url(' + fml.vars.unavailablePointerImg + ')');
                    }
                } else {
                    oPointer.removeClass('free login inactive');

                    if (fml.vars.availablePointerImg != '') {
                        oPointer.css('background-image', 'url(' + fml.vars.availablePointerImg + ')');
                    }
                }
            }
        } else {
            oPointer.removeClass('free inactive').addClass('login');

            if (fml.vars.notLoginPointerImg != '') {
                oPointer.css('background-image', 'url(' + fml.vars.notLoginPointerImg + ')');
            }
        }
    },

    drawRouletteWheel: function(){
        var canvas = document.getElementById('wheelcanvas');

        if (canvas.getContext) {
            var ctx = canvas.getContext('2d'),
                // 根据奖品个数计算圆周角度
                arc = Math.PI / (turnplate.restaraunts.length / 2);

            // 在给定矩形内清空一个矩形
            ctx.clearRect(0, 0, 422, 422);
            // strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式
            ctx.strokeStyle = '#fff';
            // font 属性设置或返回画布上文本内容的当前字体属性
            ctx.font = '16px Microsoft YaHei';

            for (var i = 0; i < turnplate.restaraunts.length; i++) {
                var line_height = 17,
                    data = turnplate.restaraunts[i],
                    id = data.id || '',
                    text = data.name,
                    angle = turnplate.startAngle + i * arc;

                ctx.fillStyle = turnplate.colors[i];
                ctx.beginPath();
                // arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）    
                ctx.arc(211, 211, turnplate.outsideRadius, angle, angle + arc, false);    
                ctx.arc(211, 211, turnplate.insideRadius, angle + arc, angle, true);
                ctx.stroke();  
                ctx.fill();
                //锁画布(为了保存之前的画布状态)
                ctx.save();   

                // 绘制奖品开始
                // 设置或返回用于填充绘画的颜色、渐变或模式(设置字颜色)
                ctx.fillStyle = '#ffa600';
                // translate方法重新映射画布上的 (0,0) 位置
                ctx.translate(211 + Math.cos(angle + arc / 2) * turnplate.textRadius, 211 + Math.sin(angle + arc / 2) * turnplate.textRadius);
                // rotate方法旋转当前的绘图
                ctx.rotate(angle + arc / 2 + Math.PI / 2);

                // 下面代码根据奖品类型、奖品名称长度渲染不同效果，如字体、颜色、图片效果。(具体根据实际情况改变)
                if (text.length > 12) {  // 奖品名称长度超过一定范围 
                    text = text.substring(0, 12) + '||' + text.substring(12);

                    var texts = text.split('||');

                    for (var j = 0; j < texts.length; j++) {
                        ctx.fillText(texts[j], -ctx.measureText(texts[j]).width / 2, j * line_height);
                    }
                } else {
                    // 在画布上绘制填色的文本。文本的默认颜色是黑色
                    // measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                    ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
                }

                // 添加对应图标
                var img = document.getElementById('turntable_prize_' + id);

                if (img.complete) {
                    ctx.drawImage(img, -26, 15);
                } else {
                    img.onload = function(){
                        ctx.drawImage(img, -26, 15);
                        img.onload = null;
                    };
                }

                ctx.drawImage(img, -26, 15);

                /*img.onload = function(){
                    ctx.drawImage(img, -26, 15);
                    img.onload = null;
                };

                ctx.drawImage(img, -26, 15);*/

                // 添加对应图标
                /*var img = new Image();

                img.src = 'http://d03.res.meilishuo.net/pic/_o/bd/73/5cfee91ccf88dc1b25a779f1be17_53_57.cf.png';

                img.onload = function(){
                    ctx.drawImage(img, -25, 15);
                };

                ctx.drawImage(img, -25, 15);*/

                // 把当前画布返回（调整）到上一个save()状态之前 
                ctx.restore();
                // 绘制奖品结束
            }
        }
    },

    // 旋转转盘 index:奖品位置; item:奖品;
    rotateFn: function(index, item){
        var prizeType = item.type || 0,
            angles = index * (360 / turnplate.restaraunts.length) - (360 / (turnplate.restaraunts.length * 2));

        if (angles < 270) {
            angles = 270 - angles; 
        } else {
            angles = 360 - angles + 270;
        }

        $('#wheelcanvas').stopRotate();
        $('#wheelcanvas').rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 8000,
            callback: function(){
                var tpl = shareTmp('j_prize_tpl', {'data': item});

                $('body').append(tpl);

                if (prizeType == 3) {
                    var beans = item.extra.beans || 0;

                    $('#j_add_beans').text('+' + beans).css({'opacity': 1});
                }

                turnplate.bRotate = !turnplate.bRotate;
            }
        });
    },

    getRandom: function(n, m){
        var random = Math.floor(Math.random() * (m - n + 1) + n);
        return random;
    },

    getPrizeIndex: function(item){
        var index = 0,
            itemId = item.id || 0,
            curPrizeLen = turnplate.restaraunts.length || 0;

        for (i = 0; i < curPrizeLen; i++) {
            var curItem = turnplate.restaraunts[i],
                curItemId = curItem.id || 0;

            if (curItemId == itemId) {
                index = i;
                break;
            }
        }

        return index;
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
                    self.sendDrawAjax();
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
                    self.sendDrawAjax();
                } else {
                    $('.smsCenter').css('display', 'block');
                }
            }, 'json');
        });
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    }
};

// 初始化页面
turntable.init();
