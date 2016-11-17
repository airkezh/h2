/*common*/

/**
 * @fileoverview 首页 － 签到商城
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-03-27
 */

require('wap/iscroll');
require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var Swipe = require('wap/component/swipe');
var pin = require('wap/component/wapfall');
var lazy = require('wap/component/lazzyLoad');
var query = require('wap/component/urlHandle');
var shareTmp = require('wap/component/shareTmp');
var scroll = require('wap/component/windowScroll');

var oPullUp = $('.pullUp');
var oMoreBtn = $('.more_bar');
var oGoTopWrap = $('.gotop_wrap');
var win_width = $(window).width();
var win_height = $(window).height();
var ajaxRequestUrl = '/aw/sign/getGoods';                         // 获取签到商城的商品信息接口url
var curUserPatchStatus = curUserPatchData.status || 0;
var curUserPatchMissing = curUserPatchData.missing || '';         // 可以补签的漏签记录(2014-09-10)
var curUserPatchChance = parseInt(curUserPatchData.chance || 0);  // 补签次数(补签卡数量)

var urlData;
var pullUpAction;
var isPosterLoad = false;
var myRecommendOneScroll;
var sold_out_commodity_count = 0;
var category_commodity_count = 0;
var promotionStartTime = new Date(2015,4,8,23,59,59).getTime();
var promotionEndTime = new Date(2015,4,18,00,00,00).getTime();
var curRecommendOneLength = curPageData.recommend_one.length || 0;

// 登陆成功后的回调函数
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var renderPinHtml = function(data){
    var html = '',
        jsonData = data.data.list || [],
        dataLen = jsonData.length;

    for (var i = 0; i < dataLen; i++) {
        category_commodity_count++;

        var data = jsonData[i],
            img = data.img || '',
            coin = data.coin || 0,
            price = data.price || 0,
            stock = data.stock || 0,
            title = data.title || '',
            href = data.url || 'javascript:void(0);',
            soldout_html = '',
            stock_html = ((stock > 0) && (stock < 10)) ? '<p class="lave">仅剩' + stock + '件</p><span class="progress rpbgc"></span>' : '',
            img_html = fml.vars.is_lazyload_poster ? ((i < 2) ? '<span class="df_show_img" style="opacity: 1;background-image: url(' + img + ');"></span>' : '<span class="bs_load_img" asrc="' + img + '"></span>') : '<img src="' + img + '" alt="">';


        if (stock < 1) {
            if (((sold_out_commodity_count > 2) && (category_commodity_count <= 50)) || (sold_out_commodity_count > 5)) {
                continue;
            } else {
                sold_out_commodity_count++;
            }

            soldout_html = '<div class="soldout"></div>';
        }

        html += [
            '<li>',       
                '<a class="link_box" href="' + href + '">',
                    '<figure>',
                        soldout_html,
                        img_html,
                        stock_html,
                    '</figure>',
                    '<figcaption>',
                        '<div class="proTitle">' + title + '</div>',
                        '<div class="proPrice">',
                            '<span class="word">抵扣价</span><i>￥</i>' + price + '  <span class="discount">' + coin + '金币</span>',
                        '</div>',
                    '</figcaption>',
                '</a>',
            '</li>'
        ].join('');
    }

    return html;
};

var posterWalls = {
    'ajaxPoster': function(url){
        var self = this,
            paramObj = query.getParams(window.location.href.toString());

        isPosterLoad = false;
        oPullUp.attr('status', 'loading');
        $.extend(true, urlData, paramObj);

        $.get(url, urlData, function(res){
            self.loadPoster(urlData, res);
            fml.fireProxy('logPoster', res);
        }, 'json');
    },

    'loadPoster': function(urlData, data){
        oPullUp.attr('status', 'tap');
        //pin.append(shareTmp('posterWall', data));
        pin.append(renderPinHtml(data));
        urlData.frame++;
        isPosterLoad = true;
    },

    'scrollPoster': function(isscroll){
        function scrollPoster(pos, isDown){
            if (isDown) {
                var pullUp_top = oPullUp[0].getBoundingClientRect().top;

                if (isPosterLoad && (pullUp_top - 100 <= win_height)) {
                    pullUpAction();
                }
            }
        }

        scroll.bind(scrollPoster, 'scrollPoster');
    },

    'testPoster0': function(data, action){
        var poster0 = Meilishuo.config.poster0;

        urlData = data;
        pullUpAction = action;

        if (poster0 && (poster0.tInfo.length > 0)) {
            urlData.frame++;
            isPosterLoad = true;
        } else {
            pullUpAction(urlData);
        }
    }
};

var signMall = {
    // 初始化页面
    'init': function(){
        if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
            openApp(window.location.href);
        }

        this.lazyer = lazy.init({'xpath': '.bs_load_img'});
        this.lazyer.scroll();
        this.renderHtml();
        this.initEvent();
        this.posterWall();
        this.initNav();
    },

    'renderHtml': function(){
        var tpl = shareTmp('j_recommend_html', {'data': curPageData});

        $('.mall_wrap').append(tpl);

        if (curRecommendOneLength > 3) {
            //setTimeout(function(){
                myRecommendOneScroll = new iScroll('wrapperIndexActivity', {
                    vScroll: false,
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

                var banner_width = (win_width > 320) ? 110 : 100;

                $('#scrollerActivity').css({
                    'width': (banner_width * curRecommendOneLength) + 'px'
                });

                myRecommendOneScroll.refresh();
            //}, 100);
        }
    },

    'renderPatchHtml': function(){
        // 补签文案提示
        if (curUserPatchMissing != '') {
            var oPatchTip = $('.calanderWrap').find('.patch_tip'),
                oPatchTxt = oPatchTip.find('.txt'),
                patchTxt = '你已经补完了所有的漏签记录！';

            if (curUserPatchChance < 1) {
                patchTxt = '你' + curUserPatchMissing + '漏签了，快去补签吧！';
            } else {
                patchTxt = (curUserPatchStatus == 0) ? '今天' : '明天';
                patchTxt += '可以补签' + curUserPatchMissing + '的签到记录';
            }

            oPatchTxt.text(patchTxt);
            oPatchTip.show();
        }
    },

    // 初始化事件
    'initEvent': function(){
        var self = this;

        window.onload = function(){
            window.setTimeout(function(){
                $('.icon_date').addClass('icon_animate');
            }, 200);

            // 初始化组图滑动
            self.imgSwipe('j_imgSwipe');

            // 发送数据统计请求
            tracking.cr('sign_pageshow', {'action': 'show', 'name': 'signindex'});
        };

        // 点击跳app升级页面
        $('.update_tips').on('click', function(){
            window.location.href = '/download/latest/wap';
        });

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

        $('body').on('click', '.more_bar', function(){
            var href = $(this).attr('data-href') || '';

            window.location.href = href;
        });

        $('body').on('click', '.tracking', function(){
            var that = $(this),
                pos = that.attr('data-pos') || 0,
                name = that.attr('data-name') || '',
                href = that.attr('data-href') || '';

            // 发送数据统计请求
            tracking.cr('sign_in', {'action': 'click', 'name': name, 'pos': pos});

            window.location.href = href;
        });

        // 补签
        $('body').on('click', '.patch_btn', function(){
            window.location.href = (!fml.vars.isLogin) ? 'meilishuo://login.meilishuo/' : '/activity/signPatch/index/';
        });

        // 关闭弹窗
        $('body').on('click', '.calendar_close, .j_layer_shade', function(){
            self.removeLayer();
        });

        // 显示日历
        $('body').on('click', '.icon_date', function(){
            var tpl = shareTmp('signin_calendar_layer', {'data': curLayerData});

            $('body').append(tpl);
            // 初始化日历
            self.calander(curServerDateStr);
            // 填充签到状态
            (fml.vars.isLogin == 1) && self.fillSignStatus(curSignedArr, curFutureArr);
            //self.renderPatchHtml();
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
                                futureArr = jsonData.future || [];

                            // 初始化日历
                            self.calander(curDateStr);
                            // 填充签到状态
                            self.fillSignStatus(signedArr, futureArr);

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

    'initNav': function(){
        var self = this,
            oNavBox = $('#nav_box');
            oNavBar = oNavBox.find('.nav'),
            /* 图片加载完成后再吸顶 */
            oImg = $('.mall_wrap').find('img').last().get(0);

        if (oNavBar.length) {
            self.imgLoaded(oImg, self.navFixed);
        }

        // 点击查看当前分类商品
        $('body').on('click', '.nav_box li', function(){
            var that = $(this);

            if (that.hasClass('curr')) {
                return;
            }

            sold_out_commodity_count = 0;
            category_commodity_count = 0;

            self.getData(that);
        });
    },

    'getData': function(me){
        var $me = $(me),
            oNavBar = $('#nav_box').find('.nav');

        oMoreBtn.hide();
        $('.goods_wall').html('');
        $me.addClass('curr').siblings().removeClass('curr');

        signMall.posterWall($me.attr('data-category'));

        document.body.scrollTop = document.body.scrollTop + 1;

        oNavBar.hasClass('scrollin') && document.getElementById('tip_box').scrollIntoView();
    },

    'imgLoaded': function(el, callback){
        if (el) {
            if (el.complete) {
                callback();
            } else {
                el.onload = function() {
                    callback();
               }
            }
        } else {
            callback();
        }
    },

    'navFixed': function(){
        var oNavBar = $('#nav_box').find('.nav');

        scroll.yIn(oNavBar.position().top - 60, function(){
            oNavBar.removeClass('scrollout').addClass('scrollin shadow');
        },
        function(){
            oNavBar.removeClass('scrollin shadow').addClass('scrollout');
        });
    },

    'posterWall': function(category){
        var self = this,
            search = '',
            category = category || 'all';

        search = (ajaxRequestUrl.indexOf('?') >= 0 ? '&' : '?') + 'category=' + category + '&page=20';

        pin.init({
            containerId: '.goods_wall'
        });

        var ajaxData = {
                'frame': 1
            },
            pullUpFn = function() {
                posterWalls.ajaxPoster(ajaxRequestUrl + search);
            };

        Meilishuo.config.poster0 = '';
        posterWalls.testPoster0(ajaxData, pullUpFn);
        posterWalls.scrollPoster(true);

        fml.eventProxy('logPoster', function(res) {
            var jsonData = res.data;

            if (jsonData) {
                var href = jsonData.url || '/activity/sign/sign_mall/?hdtrc=tuan1300_qiandao';

                oMoreBtn.attr('data-href', href);

                if (!jsonData.list.length) {
                    oPullUp.hide();
                    oMoreBtn.show();
                } else {
                    oPullUp.show();
                    oMoreBtn.hide();
                }

                self.lazyer.load();
            }
        });
    },

    // 组图swipe
    'imgSwipe': function(id){
        var obj = null,
            oSwipe = $('#' + id),
            oImg = oSwipe.children().eq(0).find('img'),
            oLi = oSwipe.children().eq(1).find('li'),
            len = oImg.length,
            maxCount = len - 2,     //加载结束量
            count = 1;              //加载开始量

        obj = new Swipe(document.getElementById(id), {
            startSlide: 0,
            auto: 4000,
            speed: 300,
            //stopPropagation: true,
            callback: function(index, element){
                oLi.removeClass('active').eq(index).addClass('active'); //焦点图当前状态
    
                //控制图片延迟加载的次数
                /*if (count <= maxCount) {    
                    if ((index >= 1) && (index <= maxCount)) {  //判断加载范围
                        var currImg = oImg.eq(index + 1);

                        if (currImg.length > 0) {
                            var src = currImg.attr('data-src');
                            (src != '') && currImg.attr('src', src);
                        }
                    }

                    count++;
                }*/
            }
        });
    },

    // 初始化日历
    'calander': function(dateStr){
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
    'fillSignStatus': function(signedArr, futureArr){
        if ((curFirstSignDate == '') && (curLastSignDate == '')) {
            return;
        }

        var self = this,
            oQdStatus = $('.calander').find('.qdStatus'),
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

    'removeLayer': function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    },

    // 根据年月日(YYYY-MM-dd)生成日期对象
    'getDateObj': function(dateStr){
        dateStr += '';

        var date = new Date(),
            dateArr = dateStr.split('-');

        date.setFullYear(dateArr[0]);
        date.setMonth(dateArr[1] - 1);
        date.setDate(dateArr[2]);

        return date;
    },

    // 根据日期对象生成年月日(YYYY-MM-dd)
    'getDateStr': function(date){
        var y = date.getFullYear(),
            m = date.getMonth() + 1,
            d = date.getDate();

        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;

        return y + '-' + m + '-' + d;
    }
};

// 初始化页面
signMall.init();
