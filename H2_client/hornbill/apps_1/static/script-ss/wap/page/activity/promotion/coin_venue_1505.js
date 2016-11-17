/*common*/

/**
 * @fileoverview 首页 － 金币会场模版页
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-05-11
 */

require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var pin = require('wap/component/wapfall');
var lazy = require('wap/component/lazzyLoad');
var query = require('wap/component/urlHandle');
var shareTmp = require('wap/component/shareTmp');
var scroll = require('wap/component/windowScroll');

var urlData;
var pullUpAction;
var cur_tab_hours = 0;
var isPosterLoad = false;
var isLoadSeaviews = false;
var oPullUp = $('.pullUp');
var oTipsText = $('.tipsText');
var oGoTopWrap = $('.gotop_wrap');
var win_width = $(window).width();
var win_height = $(window).height();
var ajaxRequestUrl = '/aj/promotion/coin_venue';
var cur_nav_text_color = fml.vars.navCss.text_color || '#80737b';
var cur_nav_active_text_color = fml.vars.navCss.active_text_color || '#f69';
var coinVenueActivityStartTime = fml.vars.activityDate.stime || '';
var coinVenueActivityEndTime = fml.vars.activityDate.etime || '';

// 登陆成功后的回调函数
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
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

        if (!isLoadSeaviews) {
            pin.append(shareTmp('seaviewsWall', {'data': fml.vars.seaviews}));
            isLoadSeaviews = true;
        }

        pin.append(shareTmp('posterWall', {'data': data, 'tabHours': cur_tab_hours, 'serverHours': fml.vars.serverHours}));
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

        if (poster0 && (poster0.data.data.length > 0)) {
            urlData.frame++;
            isPosterLoad = true;
        } else {
            pullUpAction(urlData);
        }
    }
};

var coin_venue = {
    // 初始化页面
    'init': function(){
        if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
            openApp(window.location.href);
        }

        this.lazyer = lazy.init({'xpath': '.bs_load_img'});
        this.lazyer.scroll();
        this.initPage();
        this.initEvent();
    },

    'initPage': function(){
        var pageHash = window.location.hash,
            curPid = (pageHash.indexOf('#') == 0) ? pageHash.substring(1) : fml.vars.pid,
            oCurLi = $('#nav_box').find('li[data-pid="' + curPid + '"]');

        cur_tab_hours = oCurLi.attr('data-hour') || 0;

        if (fml.vars.navData.length > 1) {
            oCurLi.addClass('curr').css('border-bottom-color', cur_nav_active_text_color).find('a').css('color', cur_nav_active_text_color);
            oCurLi.siblings().removeClass('curr').css('border-bottom-color', '#fff').find('a').css('color', cur_nav_text_color);
        }

        this.posterWall(curPid);
    },

    'initEvent': function(){
        var self = this,
            oNavBox = $('#nav_box');
            oNavBar = oNavBox.find('.nav'),
            oImg = $('.main').find('img').last().get(0);        // 图片加载完成后再吸顶

        oNavBar.length && self.imgLoaded(oImg, self.navFixed);

        // 点击查看当前分类商品
        $('body').on('click', '.nav_box li', function(){
            var that = $(this);

            oTipsText.hide();
            isLoadSeaviews = false;

            self.getData(that);
        });

        // 返回顶部
        scroll.yIn(60, function(){
            oGoTopWrap.show();
        }, function(){
            oGoTopWrap.hide();
        });

        $('.gotop').on('click', function(){
            $('html,body').scrollTo({
                endY: 0,
                updateRate: 5
            });
        });
    },

    'getData': function(me){
        var $me = $(me),
            pid = $me.attr('data-pid') || '',
            oNavBar = $('#nav_box').find('.nav');

        $('.goods_wall').html('');

        cur_tab_hours = $me.attr('data-hour') || 0;

        if (fml.vars.navData.length > 1) {
            $me.addClass('curr').css('border-bottom-color', cur_nav_active_text_color).find('a').css('color', cur_nav_active_text_color);
            $me.siblings().removeClass('curr').css('border-bottom-color', '#fff').find('a').css('color', cur_nav_text_color);
        }

        coin_venue.posterWall(pid);

        window.location.hash = '#' + pid;
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

        scroll.yIn(oNavBar.position().top, function(){
            oNavBar.removeClass('scrollout').addClass('scrollin shadow');
        },
        function(){
            oNavBar.removeClass('scrollin shadow').addClass('scrollout');
        });
    },

    'posterWall': function(pid){
        if (!pid) {
            return;
        }

        var self = this,
            ajaxData = {
                pid: pid,
                frame: 1,
                page: 30,
                type: 'mob',
                theme: 'coin',
                stime: coinVenueActivityStartTime,
                etime: coinVenueActivityEndTime
            },
            pullUpFn = function() {
                posterWalls.ajaxPoster(ajaxRequestUrl);
            };

        pin.init({
            containerId: '.goods_wall'
        });

        Meilishuo.config.poster0 = '';
        posterWalls.testPoster0(ajaxData, pullUpFn);
        posterWalls.scrollPoster(true);

        fml.eventProxy('logPoster', function(res) {
            var jsonData = res.data;

            if (jsonData) {
                if (!jsonData.data.length) {
                    if (urlData.frame == 2) {
                        oPullUp.show();
                        oTipsText.show();
                    } else {
                        oPullUp.hide();
                    }
                } else {
                    oPullUp.show();
                    oTipsText.hide();
                }

                self.lazyer.load();
            }
        });
    }
};

// 初始化页面
coin_venue.init();
