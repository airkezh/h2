/*common*/

/**
 * @fileoverview 美丽豆收支明细 － 会员中心
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-06-25
 */

require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var openApp = require('wap/app/openApp');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var checkLogin = require('circle/app/checkLogin');

var ajaxOpts = {
    count: 5,
    url: '/aj/member/getBeansList'
};

var ajaxRequestPage = 2;
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

$.ajaxSettings.async = false;

// 登陆成功后的回调函数
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var beansDetail = {
    oParentNode: $('#j_pay_list'),

    init: function() {
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

    initPage: function() {
        var tpl = '',
            self = this,
            userBeansListLen = (curUserBeansList || []).length;

        if (userBeansListLen < 1) {
            tpl = '<li class="no_beans_detail"><div class="sign_box"></div></li>';
        } else {
            tpl = shareTmp('j_detail_tpl', {'data': curUserBeansList});
        }

        self.oParentNode.append(tpl);

        $('#j_page_wrap').find('.pullUp').hide();
    },

    // 初始化事件绑定
    bindEvent: function() {
        var self = this;

        $('body').on('click', '.sign_box', function(){
            window.location.href = '/member/beans_paradise/?frm=beans_detail';
        });

        // 美美豆说明
        $('body').on('click', '.beans_caption', function(){
            window.location.href = '/member/beans_caption/';
        });

        // 点击加载更多
        $('body').on('click', '.load_more_btn', function() {
            // 登录
            if (!fml.vars.isLogin) {
                window.location.href = 'meilishuo://login.meilishuo/';
                return;
            }

            var that = $(this);

            if (that.attr('loading') == 1) {
                return;
            }

            that.show().text('正在加载...').attr('loading', 1);

            var page = ajaxRequestPage || 2,
                count = ajaxOpts.count || 5,
                url = ajaxOpts.url || '/aj/member/getBeansList';

            // 请求数据接口
            $.ajax({
                url: url,
                data: {
                    'page': page,
                    'count': count
                },
                type: 'get',
                dataType: 'json',
                success: function(data) {
                    if (data.code == 0) {
                        var jsonData = data.data;

                        if (jsonData) {
                            var tpl = shareTmp('j_detail_tpl', {'data': jsonData.list});

                            self.oParentNode.append(tpl);
                        }

                        ajaxRequestPage++;
                    }

                    if (ajaxRequestPage >= curPageTotal) {
                        that.hide();
                    } else {
                        that.show();
                    }

                    that.text('加载更多...').attr('loading', 0);
                },
                error: function(){
                    that.show().text('加载更多...').attr('loading', 0);

                    var alt = new Alert ({
                        content : '服务器开小差中...请稍后再试~',
                        onSure : function(){
                            return;
                        }
                    });
                }
            });
        });
    }
};

// 初始化页面
beansDetail.init();
