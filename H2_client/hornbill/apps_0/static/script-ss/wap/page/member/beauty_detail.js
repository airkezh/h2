/*common*/

/**
 * @fileoverview 美丽值明细－会员中心
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-06-25
 */

var $ = require('wap/zepto');
var openApp = require('wap/app/openApp');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var checkLogin = require('circle/app/checkLogin');

var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

// 登陆成功后的回调函数
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var beautyDetail = {
    oParentNode: $('#j_pay_list'),

    init: function(){
        if (isFromShare || (navigator.userAgent.indexOf('MicroMessenger') != -1)) {
            openApp(window.location.href, '', '', true, 'member');
        }

        // 判断是否登陆
        /*if (!fml.vars.isLogin) {
            window.location.href = 'meilishuo://login.meilishuo/';
            return;
        }*/

        if (!fml.vars.isLogin) {
            setTimeout(function(){
                // 判断登录，包含app和wx
                checkLogin();
            }, 500);

            return;
        }

        this.initPage();                                                                    // 初始化页面
        this.bindEvent();                                                                   // 初始化事件绑定
    },

    initPage: function(){
        var self = this,
            tpl = shareTmp('j_detail_tpl', {'data': curUserBeautyList});

        self.oParentNode.append(tpl);

        $('#j_page_wrap').find('.pullUp').hide();
    },

    // 初始化事件绑定
    bindEvent: function(){
        var self = this;

        // 关闭弹窗
        $('body').on('click', '.know_btn', function(){
            self.removeLayer();
        });

        $('body').on('click', '.beauty_tips', function(){
            var tpl = shareTmp('j_layer_tpl');

            $('body').append(tpl);
        });

        $('body').on('click', '.more_content_btn', function(){
            var that = $(this),
                oMoreContent = $('.more_hidden_content'),
                flag = (oMoreContent.css('display') == 'block') ? true : false,
                html = flag ? '展开<img src="http://d03.res.meilishuo.net/pic/_o/dc/62/834138f19d9b75805c34e851dea8_22_12.cf.png" alt="">' : '收起<img src="http://d02.res.meilishuo.net/pic/_o/3a/f3/d12b743ff3792ed37f1ea6d90eca_22_12.cf.png" alt="">';

            that.html(html);
            oMoreContent.toggle();
        });
    },

    removeLayer: function(){
        $('.j_layer_shade').remove();
        $('.j_layer_main').remove();
    }
};

// 初始化页面
beautyDetail.init();
