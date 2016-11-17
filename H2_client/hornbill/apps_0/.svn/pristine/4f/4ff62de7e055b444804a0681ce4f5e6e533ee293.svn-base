/*common*/

/**
 * @fileoverview 下载页 － 会员中心
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-08-06
 */

require('wap/zepto/touch');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');

// 登陆成功后的回调函数
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var download = {
    // 初始化页面
    init: function(){
        this.initEvent();
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        // 关闭弹窗
        $('body').on('click', '.page_bg', function(){
            var href = fml.vars.isAndroid ? 'http://a.app.qq.com/o/simple.jsp?pkgname=com.meilishuo' : '/download/latest/wap';

            window.location.href = href;
        });
    }
};

// 初始化页面
download.init();
