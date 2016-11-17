/*common*/

/**
 * @fileoverview 首页－会员福利日
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2016-01-06
 */

require('wap/zepto/touch');
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var signWX = require('wx/sign');
var shareWX = require('wx/share');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var appShare = require('wap/app/appShare');
var tracking = require('wap/app/tracking');
var pin = require('wap/component/wapfall');
var lazy = require('wap/component/lazzyLoad');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var scroll = require('wap/component/windowScroll');
var checkLogin = require('circle/app/checkLogin');

var oPullUp = $('.pullUp');
var oGoTopWrap = $('.gotop_wrap');
var windowWidth = $(window).width();
var windowHeight = $(window).height();
var ajaxRequestUrl = '/aj/member/interfaces/getBenefitGoods';

var urlData;
var pullUpAction;
var promptLayerTimeout;
var isPosterLoad = false;
var clickEventIsComplete = false;
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

// 客户端app回调函数
window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

// 客户端类型的分享（客户端右上角）
if (fml.vars.appShare) {
    appShare(fml.vars.params, ['weixin', 'weixin_timeline']);
}

function togglePromptLayer(text, cbk){
    var text = text || '服务器开小差，请稍后重试~',
        tpl = shareTmp('j_prompt_tpl', {'text': text});

    $('body').append(tpl);

    var oLayer = $('#j_prompt_layer');

    oLayer.animate({'opacity': 1}, 500, function(){
        if (promptLayerTimeout) {
            clearTimeout(promptLayerTimeout);

            promptLayerTimeout = null;
        }

        promptLayerTimeout = window.setTimeout(function(){
            oLayer.animate({'opacity': 0}, 500, function(){
                oLayer.remove();

                (typeof cbk === 'function') && cbk();
            });
        }, 1000);
    });
}

var posterWalls = {
    ajaxPoster: function(url){
        var self = this,
            paramObj = urlHandle.getParams(window.location.href.toString());

        isPosterLoad = false;
        oPullUp.attr('status', 'loading');
        $.extend(true, urlData, paramObj);

        $.get(url, urlData, function(res){
            self.loadPoster(urlData, res);
            fml.fireProxy('logPoster', res);
        }, 'json');
    },

    loadPoster: function(urlData, data){
        oPullUp.attr('status', 'tap');
        pin.append(shareTmp('posterWall', {'data': data, 'isLogin': fml.vars.isLogin}));
        urlData.page++;
        isPosterLoad = true;
    },

    scrollPoster: function(isscroll){
        function scrollPoster(pos, isDown){
            if (isDown) {
                var pullUp_top = oPullUp[0].getBoundingClientRect().top;

                if (isPosterLoad && (pullUp_top - 100 <= windowHeight)) {
                    pullUpAction();
                }
            }
        }

        scroll.bind(scrollPoster, 'scrollPoster');
    },

    testPoster0: function(data, action){
        var poster0 = Meilishuo.config.poster0;

        urlData = data;
        pullUpAction = action;

        if (poster0 && (poster0.tInfo.length > 0)) {
            urlData.page++;
            isPosterLoad = true;
        } else {
            pullUpAction(urlData);
        }
    }
};

var welfare_day = {
    // 初始化页面
    init: function(){
        if (isFromShare || (navigator.userAgent.indexOf('MicroMessenger') != -1)) {
            openApp(window.location.href, '', '', true, 'member');
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

            return;
        }*/

        this.errorTipsLayer();

        if (fml.vars.isNormalGetData != -1) {
            this.initEvent();
            this.posterWall();
            this.lazyer = lazy.init({'xpath': '.bs_load_img'});
            this.lazyer.scroll();
        }
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            
        };

        if (Meilishuo.config.os.weixinBrowser) {
            signWX();

            shareWX.bind({
                'desc': fml.vars.shareData.desc,
                'imgUrl': fml.vars.shareData.imgUrl,
                'title': fml.vars.shareData.title,
                'link': fml.vars.shareData.link,
                'success': function(res, name, eventName){
                    
                }
            });
        }

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

        $('body').on('click', '.top_login_btn', function(){
            /*window.location.href = 'meilishuo://login.meilishuo/';
            return;*/

            // 判断登录，包含app和wx
            checkLogin();
        });

        $('body').on('click', '.layer_close_btn', function(){
            self.removeLayer();
        });

        $('body').on('click', '.top_activity_rule', function(){
            var tpl = shareTmp('j_layer_tpl', {data: {img_src: '', img_title: ''}});

            $('body').append(tpl);
        });

        $('body').on('click', '.member_day_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            window.location.href = '/member/welfare_day/?frm=pop_layer';
        });

        $('body').on('click', '.top_cards_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            if (clickEventIsComplete) {
                return;
            }

            clickEventIsComplete = !clickEventIsComplete;

            if (fml.vars.userLevel < 1) {
                togglePromptLayer('亲爱哒，本次活动仅供V1及以上会员参与~<br>快去加速升级吧~', function(){
                    clickEventIsComplete = !clickEventIsComplete;
                });

                return;
            }

            window.location.href = '/member/gift_card_records/';
        });

        $('body').on('click', '.use_cards_btn', function(){
            // 判断是否登陆
            if (!fml.vars.isLogin) {
                /*window.location.href = 'meilishuo://login.meilishuo/';
                return;*/

                // 判断登录，包含app和wx
                checkLogin();

                return;
            }

            if (clickEventIsComplete) {
                return;
            }

            clickEventIsComplete = !clickEventIsComplete;

            if (fml.vars.userLevel < 1) {
                togglePromptLayer('亲爱哒，本次活动仅供V1及以上会员参与~<br>快去加速升级吧~', function(){
                    clickEventIsComplete = !clickEventIsComplete;
                });

                return;
            }

            var userAvailableCards = parseInt($('#user_available_cards').text()) || 0;

            if (userAvailableCards < 1) {
                togglePromptLayer('哎呀，机会用完了！坐等今晚22点的好消息~', function(){
                    clickEventIsComplete = !clickEventIsComplete;
                });

                return;
            }

            var that = $(this),
                tid = that.data('tid') || '',
                date = that.data('date') || '';

            if ((tid != '') && (date != '')) {
                window.location.href = '/member/apply_info_confirm/?tid=' + tid + '&date=' + date;
            }
        });

        $('body').on('click', '.goods_wall figure', function(){
            var that = $(this),
                pos = that.data('pos') || 0,
                tid = that.data('tid') || '',
                //href = that.data('href') || '',
                r = '_page_id=1100010:_page_area=member_day:_pos_id=' + pos + ':_pos_name=' + tid;

            /*if (href != '') {
                if (href.indexOf('r=') < 0) {
                    href += ((href.indexOf('?') >= 0) ? '&' : '?') + 'r=' + fml.vars.r + ':' + r;
                }

                window.location.href = href;
            }*/

            (tid != '') && (window.location.href = '/member/welfare_goods_details/?tid=' + tid + '&r=' + fml.vars.r + ':' + r);
        });
    },

    errorTipsLayer: function(){
        if (fml.vars.isLogin && fml.vars.isNormalGetData) {
            var errorText = '',
                confirmText = '';

            if (fml.vars.isNormalGetData == 1) {
                confirmText = '刷新刷新！';
                errorText = '矮油~好像卡住惹<br>刷新一下让我重新加载出来好咩~';
            } else if (fml.vars.isNormalGetData == -1) {
                confirmText = '好哒~';
                errorText = '啊哦，系统出了点小问题<br>喝杯奶茶一会儿再来试试吧~';
            }

            if (errorText != '') {
                var alt = new Alert({
                    content: errorText,
                    confirmTxt: confirmText,
                    onSure: function(){
                        (fml.vars.isNormalGetData == 1) && window.location.reload();
                        return;
                    }
                });

                // 发送数据统计请求
                //tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=服务器开小差，请稍后重试~:_pos_id=500:_pos_name=服务器开小差，请稍后重试~:_ext_inter=/aj/member/getInfo'});
            }
        }
    },

    posterWall: function(){
        var self = this,
            search = '';

        search = (ajaxRequestUrl.indexOf('?') >= 0 ? '&' : '?') + '&page_size=20';

        pin.init({
            containerId: '.goods_wall'
        });

        var ajaxData = {
                'page': 1
            },
            pullUpFn = function() {
                posterWalls.ajaxPoster(ajaxRequestUrl + search);
            };

        Meilishuo.config.poster0 = '';
        posterWalls.testPoster0(ajaxData, pullUpFn);
        posterWalls.scrollPoster(true);

        fml.eventProxy('logPoster', function(res){
            var jsonData = res.data;

            if (jsonData) {
                var goodsList = jsonData.list || [],
                    goodsListLen = goodsList.length || 0;

                if (goodsListLen) {
                    oPullUp.show();

                    isPosterLoad = true;
                } else {
                    oPullUp.hide();

                    isPosterLoad = false;

                    $('.look_forward_text').show();
                }

                self.lazyer.load();
            }
        });
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    }
};

// 初始化页面
welfare_day.init();
