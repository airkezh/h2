/*common*/

/**
 * @fileoverview 金币收支明细－会员专区
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-03-11
 */

require('wap/zepto/fastclick');

var $ = require('wap/zepto');
var Alert = require('wap/ui/alert');
var shareTmp = require('wap/component/shareTmp');

var ajaxOpts = {
    'count': 5,
    'url': '/aj/doota/member_gold_list'
};

var ajaxRequestPage = 2;

$.ajaxSettings.async = false;

// 登陆成功后的回调函数
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

var initPayList = {
    'oParentNode': $('#j_pay_list'),

    'init': function() {
        this.initPage();                                                                    // 初始化页面
        this.bindEvent();                                                                   // 初始化事件绑定
    },

    'initPage': function() {
        var self = this,
            tpl = shareTmp('j_detail_tpl', {'data': curUserGoldData});

        self.oParentNode.append(tpl);
        $('#j_page_wrap').find('.pullUp').hide();
    },

    // 初始化事件绑定
    'bindEvent': function() {
        var self = this;

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
                url = ajaxOpts.url || '/aj/doota/member_gold_list';

            // 请求补签接口
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
                            var tpl = shareTmp('j_detail_tpl', {'data': jsonData});

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
initPayList.init();
