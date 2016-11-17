/**
 * @fileoverview 首页 － 韩国馆
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2014-10-13
 */

fml.define('wap/page/korea/index', ['wap/zepto/touch', 'wap/component/swipe', 'wap/component/lazyLoad', 'wap/component/shareTmp', 'wap/component/windowScroll'], function(require, exports) {
    var pullUp_top = 0,
        swipeCounter = 0,
        pullUp = $('.pullUp'),
        pin = $('.goods_wall'),
        win_h = $(window).height(),
        Swipe = require('wap/component/swipe'),
        posLoad = require('wap/component/lazyLoad'),
        shareTmp = require('wap/component/shareTmp'),
        scroll = require('wap/component/windowScroll'),
        colFlag = pin.siblings('.colFlag').css('z-index');

    var scrollPoster = function(opts){
        var url = opts.url,
            isPosterLoad = true,
            box = opts.box || $('.goods_wall'),
            data = {
                frame: opts.frame
            };

        scroll.bind(function(pos, isDown){
            if (isDown) {
                pullUp_top = pullUp[0].getBoundingClientRect().top;

                if ((pullUp_top - 100 <= win_h) && isPosterLoad) {
                    isPosterLoad = false 
                    pullUp.attr('status', 'loading');

                    $.get(url, data, function(res){
                        if (res.tInfo.twitterInfo.length == 0) {
                            pullUp.attr('status', 'stop');
                            $('.starBox').show();
                            return;
                        }

                        pullUp.attr('status', 'tap');

                        if (fml.vars.is_lazyload_poster) {
                            var posDom = $(shareTmp('posterWall', res));

                            posLoad.load(posDom.find('.bs_load_img'), 'asrc');
                            box.append(posDom);
                        } else {
                            box.append(shareTmp('posterWall', res));
                        }

                        fml.emit('posterFinsh');    //注册海报加载完成事件
                        data.frame++;
                        isPosterLoad = true;
                    }, 'json');
                }
            }
        }, 'scrollPoster');
    };

    if (Meilishuo.config.fallWall0 && Meilishuo.config.fallWall0.tInfo && (Meilishuo.config.fallWall0.tInfo.twitterInfo.length > 0)) {
        if (fml.vars.is_lazyload_poster) {
            var posDom = $(shareTmp('posterWall', Meilishuo.config.fallWall0));

            posLoad.load(posDom.find('.bs_load_img'), 'asrc');
            pin.append(posDom);
        } else {
            pin.append(shareTmp('posterWall', Meilishuo.config.fallWall0));
        }

        setTimeout(function(){fml.emit('posterFinsh')}, 0);     //注册海报加载完成事件
        pullUp.attr('status', 'tap');
        delete Meilishuo.config.fallWall0;
    }

    var opts = {
        'url': '/aj/korea/list',
        'frame': 1
    };

    scrollPoster(opts);

    fml.on('posterFinsh', function(){
        var initPage = {
            'init': function(){
                this.initSwipe();       // 初始化组图swipe
            },

            // 初始化组图swipe
            'initSwipe': function(){
                var self = this,
                    oSwipes = $('.swipe').filter('.load'),
                    len = oSwipes.length;

                for (var i = 0; i < len; i++) {
                    swipeCounter += 1;

                    var id = 'j_img_swipe_' + swipeCounter;

                    oSwipes.eq(i).attr('id', id).removeClass('load');
                    self.imgSwipe(id);
                } 
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
                    //auto: 4000,
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
            }
        };

        // 初始化页面
        initPage.init();
    });
});
