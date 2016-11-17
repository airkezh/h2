/*common*/

/**
 * @fileoverview 首页 － 签到商城
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2014-12-04
 */

require('wap/iscroll');
require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var cookie = require('component/iStorage');
var posLoad = require('wap/component/lazyLoad');
var shareTmp = require('wap/component/shareTmp');
var scroll = require('wap/component/windowScroll');

var pullup_top = 0;
var oPullUp = $('.pullUp');
var pin = $('.goods_wall');
var win_width = $(window).width();
var win_height = $(window).height();
var patch_miss = curUserPatchData.missing || '';                  // 可以补签的漏签记录(2014-09-10)
var patch_total = parseInt(curUserPatchData.total || 0);          // 漏签的总天数
var patch_chance = parseInt(curUserPatchData.chance || 0);        // 补签次数(补签卡数量)
var patch_status = parseInt(curUserPatchData.status || 0);        // 状态(0-今日尚未补签，1-今日已经补签)
var isShowSuperPatch = (fml.vars.isLogin && curUserSuperData && (curUserSuperData.status == 0)) ? 1 : 0;

var opts = {
    'page': 2,
    'size': 20,
    'url': '/aj/storeGoods/list'
};

// 登陆成功后的回调函数
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var myBannerScroll;
var calanderLayerTimer = null;
var recommendBannerLength = curPageData.recommend_one.length || 0;

var scrollPoster = function(opts){
    var url = opts.url,
        isPosterLoad = true,
        box = opts.box || $('.goods_wall'),
        data = {
            'size': opts.size,
            'page': opts.page
        };

    scroll.bind(function(pos, isDown){
        if (isDown) {
            pullup_top = oPullUp[0].getBoundingClientRect().top;

            if ((pullup_top - 100 <= win_height) && isPosterLoad) {
                isPosterLoad = false 
                oPullUp.attr('status', 'loading');

                $.get(url, data, function(res){
                    if (res.data.list.length == 0) {
                        oPullUp.attr('status', 'stop');
                        return;
                    }

                    oPullUp.attr('status', 'tap');

                    if (fml.vars.is_lazyload_poster) {
                        var posDom = $(shareTmp('posterWall', res));

                        posLoad.load(posDom.find('.lazy_pic'), 'asrc');
                        box.append(posDom);
                    } else {
                        box.append(shareTmp('posterWall', res));
                    }

                    fml.emit('posterFinsh');    //注册海报加载完成事件
                    data.page++;
                    isPosterLoad = true;
                }, 'json');
            }
        }
    }, 'scrollPoster');
};

var initPage = {
    // 初始化页面
    'init': function(){
        var self = this;

        if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
            openApp(window.location.href);
        }

        self.renderHtml();
        self.initEvent();
    },

    'renderHtml': function() {
        var tpl = shareTmp('j_recommend_html', {'data': curPageData});

        $('.mall_wrap').append(tpl);

        if (recommendBannerLength > 3) {
            //setTimeout(function(){
                myBannerScroll = new iScroll('wrapperIndexActivity', {
                    /*snap: true,*/
                    vScroll: false,
                    /*momentum: false,*/
                    hScrollbar: false,
                    vScrollbar: false
                    /*checkDOMChanges: true*/
                });

                var banner_width = (win_width > 320) ? 110 : 100;

                $('#scrollerActivity').css({
                    'width': (banner_width * recommendBannerLength) + 'px'
                });

                myBannerScroll.refresh();
            //}, 100);
        }
    },

    'renderPatchHtml': function() {
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

    // 初始化事件
    'initEvent': function(){
        var self = this;

        scroll.bind(self.goToTop, 'gotop_wrap');

        window.onload = function() {
            if (isShowSuperPatch) {
                var superPatchTpl = shareTmp('patch_card_layer', {'data': curUserSuperData});

                $('body').append(superPatchTpl);
            } else {
                if (!cookie.getCookie('is_show_calander_layer')) {
                    cookie.removeCookie('is_show_calander_layer');
                    // 标示签到日历弹层显示过
                    cookie.setCookie('is_show_calander_layer', 1, {'duration': 3600 * 24});

                    $('.icon_date').trigger('click');

                    calanderLayerTimer = window.setTimeout(function() {
                        var oShade = $('.j_layer_shade'),
                            oMain = $('.j_layer_main');

                        oMain.animate({'opacity': 0}, 100);
                        oShade.animate({'opacity': 0}, 100);
                        oMain.remove();
                        oShade.remove();

                        window.setTimeout(function(){
                            $('.icon_date').addClass('icon_animate');
                        }, 200);
                    }, 2500);
                }
            }
        };

        $('.gotop').on('click', function(){
            $('html,body').scrollTo({
                endY : 0,
                updateRate: 5
            });
        });

        // 关闭浮层
        $('body').on('click', '.j_know_btn', function(){
            self.removeLayer();

            window.location.reload();
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

        // 补签
        $('body').on('click', '.patch_btn', function(){
            window.location.href = (!fml.vars.isLogin) ? 'meilishuo://login.meilishuo/' : '/activity/signPatch/index/';
        });

        $('.dotted_line').on('click', function(){
            $('body').append($('#j_caption_layer').html());
        });

        // 关闭弹窗
        $('body').on('click', '.no_btn, .know_btn, .coupon_bg, .calendar_close, .j_layer_shade', function(){
            self.removeLayer();
        });

        // 显示日历
        $('body').on('click', '.icon_date', function(){
            var tpl = shareTmp('signin_calendar_layer', {'data': curLayerData});

            $('body').append(tpl);
            // 初始化日历
            self.calander(curServerDateStr);
            // 填充签到状态
            (fml.vars.isLogin == 1) && self.fillSignStatus(curSignedArr, curConvertedArr);
            self.renderPatchHtml();
        });

        // 点击查看当月签到状态
        $('body').on('click', '.j_calander_btn', function(){
            if (calanderLayerTimer) {
                clearTimeout(calanderLayerTimer);
                calanderLayerTimer = null;
            }

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

        $('body').on('click', '.ok_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var that = $(this);

            if (that.attr('loading') == 1) {
                return;
            }

            self.removeLayer();

            var code = that.attr('code'),
                url = that.attr('url'),
                shopurl = that.attr('shopurl'),
                title = that.attr('title'),
                avater = that.attr('avater'),
                credit = that.attr('credit'),
                threshold = that.attr('threshold'),
                start = that.attr('start'),
                end = that.attr('end');

            if (code == '') {
                return;
            }

            that.attr('loading', 1);

            $.ajax({
                url: '/aj/redeemStoreCoupon/get',
                data: {
                    'code': code
                },
                type: 'post',
                dataType: 'json',
                success: function(data){
                    self.removeLayer();
                    that.attr('loading', 0);

                    var code = data.code;

                    if (code == 0) {
                        var jsonData = {
                                'url': url,
                                'shopurl': shopurl,
                                'title': title,
                                'avater': avater,
                                'credit': credit,
                                'threshold': threshold,
                                'start': start,
                                'end': end
                            },
                            tpl = shareTmp('j_convert_layer', {'data': jsonData});

                        $('body').append(tpl);
                    } else if (code == 400403) {
                        window.MLS = {
                            didLogin : function() {
                                window.location.reload();
                            }
                        };

                        window.location.href = 'meilishuo://login.meilishuo/';
                    } else {
                        var alt = new Alert ({
                            content : data.tips,
                            onSure : function(){
                                return;
                            }
                        });
                    }
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

        // 优惠券领取
        $('.goods_wrap').on('click', '.coupon', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var that = $(this),
                code = that.attr('code') || '';

            if (that.hasClass('robbed') || (code == '')) {
                return;
            }

            var jsonData = {
                    'code': code,
                    'url': that.attr('url') || '',
                    'shopurl': that.attr('shopurl') || '',
                    'title': that.attr('title') || '',
                    'avater': that.attr('avater') || '',
                    'price': that.attr('price') || 0,
                    'credit': that.attr('credit') || 0,
                    'status': that.attr('status') || 0,
                    'threshold': that.attr('threshold') || 0,
                    'start': that.attr('start') || '',
                    'end': that.attr('end') || ''
                },
                tpl = shareTmp('j_coupon_layer', {'data': jsonData});
        
            $('body').append(tpl);
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

    'removeLayer': function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
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

    'goToTop': function(pos, isDown){
        var oGotopWrap = $('.gotop_wrap'),
            oGoodsBox = $('.goods_wrap').find('.new_box'),
            top = oGoodsBox.length ? oGoodsBox.offset().top : 10000;

        if (pos > top) {
            oGotopWrap.show();
        } else {
            oGotopWrap.hide();
        }
    }
};

if (Meilishuo.config.fallWall0 && Meilishuo.config.fallWall0.data && (Meilishuo.config.fallWall0.data.list.length > 0)) {
    if (fml.vars.is_lazyload_poster) {
        var posDom = $(shareTmp('posterWall', Meilishuo.config.fallWall0));

        posLoad.load(posDom.find('.lazy_pic'), 'asrc');
        pin.append(posDom);
    } else {
        pin.append(shareTmp('posterWall', Meilishuo.config.fallWall0));
    }

    // 注册海报加载完成事件
    window.setTimeout(function(){fml.emit('posterFinsh')}, 0);
    oPullUp.attr('status', 'tap');
    delete Meilishuo.config.fallWall0;
}

// 初始化页面滚动加载
scrollPoster(opts);
// 初始化页面
initPage.init();

/*fml.on('posterFinsh', function(){
    
});*/
