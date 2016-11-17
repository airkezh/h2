/*common*/

/**
 * @fileoverview 首页－会员专区
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-03-09
 */

require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var shareTmp = require('wap/component/shareTmp');

$.ajaxSettings.async = false;

// 登陆成功后的回调函数
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var initPrefecture = {
    'oParentNode': $('#j_page_wrap'),

    'init': function() {
        this.initPage();                                                                    // 初始化页面
        this.bindEvent();                                                                   // 初始化事件绑定
    },

    'initPage': function() {
        var self = this,
            tpl = shareTmp('j_detail_tpl', {'data': curUserGoldData});

        self.oParentNode.find('.pullUp').before(tpl);
        self.oParentNode.find('.pullUp').hide();
    },

    // 初始化事件绑定
    'bindEvent': function() {
        // 查看更多绑定事件
        $('body').on('click', '.view_more', function() {
            // 登录
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
            } else {
                window.location.href = '/member/prefecture/list';
            }
        });
    }
};

// 初始化页面
initPrefecture.init();
