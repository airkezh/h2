/*common*/

/**
 * @fileoverview 会员特权－美丽说
 * @requires jquery
 * @author kehuang@meilishuo.com
 * @date 2015-08-28
 */

//require('jquery');

var $ = require('jquery');
var Alert = require('ui/alert');
var checkLogin = require('app/checkLogin');

var ajaxRequestIsComplete = false;
var beautyDetailAjaxUrl = '/aj/member/getBeautyList';

var interests = {
    'oPagingNode': $('.paging_panel'),
    'oParentNode': $('.member_table_wrap').find('.beauty_detail'),

    // 初始化页面
    init: function(){
        if (!fml.vars.isLogin) {
            //setTimeout(function(){
                // 判断登录
                checkLogin();
            //}, 500);
        }

        this.initEvent();
    },

    // 初始化事件
    initEvent: function(){
        var self = this;

        window.onload = function(){
            
        };

        $('body').on('click', '.paging_panel a', function(){
            if (!fml.vars.isLogin) {
                checkLogin();
            }

            var that = $(this);

            if (that.hasClass('currentpage')) {
                return;
            }

            var curPageNum = 0;

            if (that.hasClass('pagePrev')) {
                curPageNum = (fml.vars.currentPage < 2) ? 1 : (fml.vars.currentPage - 1);
            } else if (that.hasClass('pageNext')) {
                curPageNum = (fml.vars.currentPage < 1) ? 2 : (fml.vars.currentPage + 1);
            } else {
                curPageNum = parseInt(that.text()) || 0;
            }

            var opts = {
                'url': beautyDetailAjaxUrl,
                'data': {
                    'page': curPageNum,
                    'page_size': fml.vars.pageSize
                }
            };

            self.sendAjaxRequest(opts);
        });
    },

    sendAjaxRequest: function(opts){
        var self = this;

        if (!opts) {
            return;
        }

        var url = opts.url || '';

        if (ajaxRequestIsComplete || (url == '')) {
            return;
        }

        ajaxRequestIsComplete = !ajaxRequestIsComplete;

        $.ajax({
            url: url,
            type: 'post',
            data: opts.data || null,
            dataType: 'json',
            success: function(data){
                var code = data.error_code;

                if (code == 0) {
                    self.renderHtml(data.data);
                } else {
                    var alt = new Alert({
                        content: '服务器开小差中...请稍后再试~',
                        onSure: function(){
                            return;
                        }
                    });
                }

                ajaxRequestIsComplete = !ajaxRequestIsComplete;
            },
            error: function(){
                var alt = new Alert({
                    content: '服务器开小差中...请稍后再试~',
                    onSure: function(){
                        return;
                    }
                });

                ajaxRequestIsComplete = !ajaxRequestIsComplete;
            }
        });
    },

    renderHtml: function(data){
        var self = this;

        if (!data) {
            return;
        }

        var dataArr = data.data || [],
            dataLen = dataArr.length || 0;

        if (dataLen > 0) {
            fml.vars.currentPage = parseInt(data.page) || 0;

            var html = [
                '<li class="title">',
                    '<div><p>&nbsp;</p></div>',
                    '<div><p class="left">美丽值来源</p></div>',
                    '<div><p>实付款（元）</p></div>',
                    '<div><p>美丽值数量</p></div>',
                    '<div><p>获得时间</p></div>',
                '</li>'
            ].join('');

            for (var i = 0; i < dataLen; i++) {
                var data = dataArr[i] || {},
                    descHtml = '',
                    iconClass = '',
                    type = parseInt(data.type) || 1,
                    score = data.score || '无',
                    price = data.price || '无',
                    ctime = data.ctime || '无',
                    remark = data.remark || '无',
                    order_id = data.order_id || 0;

                if (order_id == 0) {
                    if ((type == 8) || (type == 9) || (type == 10)) {
                        descHtml = '<div class="two left"><p>' + remark + '</p><p>当月购物超过2天</p></div>';
                    } else {
                        descHtml = '<div><p class="left">' + remark + '</p></div>';
                    }
                } else {
                    descHtml = '<div class="two left"><p>' + remark + '</p><p>订单号：<a href="http://order.meilishuo.com/order/detail/?order_id=' + order_id + '" target="_blank">' + order_id + '</a></p></div>';
                }

                switch (type) {
                    case 1:
                    case 9:
                    case 10:
                        iconClass = 'icon_7';

                        break;
                    case 2:
                        iconClass = 'icon_3';

                        break;
                    case 3:
                        iconClass = 'icon_6';

                        break;
                    case 4:
                        iconClass = 'icon_2';

                        break;
                    case 5:
                        iconClass = 'icon_1';

                        break;
                    case 6:
                    case 11:
                        iconClass = 'icon_4';

                        break;
                    case 7:
                    case 12:
                        iconClass = 'icon_5';

                        break;
                    case 8:
                        iconClass = 'icon_8';

                        break;
                }

                html += [
                    '<li>',
                        '<div><p class="icon ' + iconClass + '"></p></div>',
                        descHtml,
                        '<div><p>' + price + '</p></div>',
                        '<div><p>' + score + '</p></div>',
                        '<div><p>' + ctime + '</p></div>',
                    '</li>'
                ].join('');
            }

            self.oParentNode.html(html);

            self.renderPagingHtml();
        }
    },

    renderPagingHtml: function(){
        var html = '',
            self = this;
            pageNum = fml.vars.pageNum,
            curPage = fml.vars.currentPage - 1,
            totalNum = Math.ceil((fml.vars.totalNum || 0) / (fml.vars.pageSize || 20));

        if (totalNum > 1) {
            var froHtml = '',
                midHtml = '',
                hinHtml = '',
                leftNum = (curPage > pageNum) ? (curPage - pageNum) : 0,
                rightNum = leftNum + pageNum * 2,
                prevPageStyle = (curPage > 0) ? '' : 'display:none;',
                nextPageStyle = (curPage < (totalNum - 1)) ? '' : 'display:none;';

            if (rightNum > totalNum) {
                rightNum = totalNum;
            }

            froHtml = (leftNum >= 1) ? '<a href="javascript:;">1</a><i>...</i>' : '';

            for (var i = leftNum; i < rightNum; i++) {
                var curClass = (curPage == i) ? 'currentpage' : '';

                midHtml += '<a class="' + curClass + '" href="javascript:;">' + (i + 1) + '</a>';
            }

            hinHtml = (rightNum < totalNum) ? '<i>...</i><a href="javascript:;">' + totalNum + '</a>' : '';


            html = [
                '<div class="pageNav">',
                    '<a class="pagePrev" style="' + prevPageStyle + '" href="javascript:;">&lt;上一页</a>',
                    froHtml,
                    midHtml,
                    hinHtml,
                    '<a class="pageNext" style="' + nextPageStyle + '" href="javascript:;">下一页&gt;</a>',
                '</div>'
            ].join('');

            self.oPagingNode.html(html);
        }
    }
};

// 初始化页面
interests.init();
