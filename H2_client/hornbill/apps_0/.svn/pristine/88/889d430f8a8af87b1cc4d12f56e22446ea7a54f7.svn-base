/*common*/

/**
 * @fileoverview 会员首页－美丽说
 * @requires jquery
 * @author kehuang@meilishuo.com
 * @date 2015-11-20
 */

//require('jquery');

var $ = require('jquery');
var banner = require('app/focus_banner');
var checkLogin = require('app/checkLogin');
var posterWalls = require('app/posterWalls');
var lazyLoad = require('component/lazyLoad');
var urlHandle = require('component/urlHandle');
var Swipe = require('wap/component/swipe');

var main = {
    oInterestsSwipe: null,

    // 初始化页面
    init: function(){
        if (!fml.vars.isLogin) {
            //setTimeout(function(){
                // 判断登录
                checkLogin();
            //}, 500);
        }

        this.bannerSwipe();
        this.interestsSwipe('j_interests_swipe');
        this.initPosterWalls();
        this.initEvent();

        lazyLoad('.ad_pic span.h270', 'asrc');
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            //self.bannerSwipe();
            //self.interestsSwipe('j_interests_swipe');
        };

        $('body').on('click', '.swipe_num li', function(){
            var index = $(this).data('index') || 0;

            self.oInterestsSwipe.slide(index);
        });
    },

    // 初始化轮播图
    bannerSwipe: function(){
        banner.bind({
            'unit': '.banner li',
            'btn': '.focus a',
            'transition': 'fade'
        });
    },

    // 初始化会员权益
    interestsSwipe: function(id){
        var self = this,
            oPoints = $('.swipe_num').find('li');

        self.oInterestsSwipe = new Swipe(document.getElementById(id), {
            startSlide: 0,
            speed: 300,
            //auto: 3000,
            //stopPropagation: true,
            callback: function(index, element){
                oPoints.removeClass('active').eq(index).addClass('active'); // 焦点图当前状态
            }
        });
    },

    initPosterWalls: function(){
        var query = urlHandle.getParams(window.location.href.toString()),
            urlData = {
                'frame': query.frame || 0,
                'page': query.page || 0
            },
            opts = $.extend({}, urlData, query);

        posterWalls(opts, '/aj/desire/getGoods');
    }
};

// 初始化页面
main.init();
