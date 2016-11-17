/*common*/

/**
 * @fileoverview 分享－会员足迹
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-12-01
 */

require('wap/zepto/touch');
require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var signWX = require('wx/sign');
var shareWX = require('wx/share');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var urlHandle = require('wap/component/urlHandle');
var checkLogin = require('circle/app/checkLogin');

var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

// 客户端app回调函数
window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var footprint_share = {
    // 初始化页面
    init: function(){
        /*if (isFromShare || (navigator.userAgent.indexOf('MicroMessenger') != -1)) {
            openApp(window.location.href, '', '', true, 'member');
        }*/

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

        $('body').on('click', '.footprint_btn', function(){
            var href = '/member/footprint/?frm=share_page&isFromShare=1';

            window.location.href = href;
        });
    },

    errorTipsLayer: function(){
        if (fml.vars.isNormalGetData) {
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
                tracking.cr('page_element', {'_action': 'click', 'r': '_page_id=1100005:_page_area=服务器开小差，请稍后重试~:_pos_id=500:_pos_name=服务器开小差，请稍后重试~:_ext_inter=/footprint/getInfo'});
            }
        }
    }
};

// 初始化页面
footprint_share.init();
