/*common*/

/**
 * @fileoverview 美丽值收支明细 － 会员中心
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-06-25
 */

var $ = require('wap/zepto');
var openApp = require('wap/app/openApp');
var shareTmp = require('wap/component/shareTmp');
var checkLogin = require('circle/app/checkLogin');

// 登陆成功后的回调函数
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var beautyDetail = {
    oParentNode: $('#j_pay_list'),

    init: function() {
        if (navigator.userAgent.indexOf('MicroMessenger') != -1) {
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
        }

        this.initPage();                                                                    // 初始化页面
        //this.bindEvent();                                                                   // 初始化事件绑定
    },

    initPage: function() {
        var self = this,
            tpl = shareTmp('j_detail_tpl', {'data': curUserBeautyList});

        self.oParentNode.append(tpl);
        $('#j_page_wrap').find('.pullUp').hide();
    },

    // 初始化事件绑定
    bindEvent: function() {

    }
};

// 初始化页面
beautyDetail.init();
