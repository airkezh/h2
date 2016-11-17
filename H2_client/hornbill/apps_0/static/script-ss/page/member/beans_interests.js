/*common*/

/**
 * @fileoverview 美美豆特权－美丽说
 * @requires jquery
 * @author kehuang@meilishuo.com
 * @date 2015-08-28
 */

//require('jquery');

var $ = require('jquery');
var Alert = require('ui/alert');
var checkLogin = require('app/checkLogin');

var ajaxRequestIsComplete = false;
var beansDetailAjaxUrl = '/aj/member/getBeansList';

var beans_interests = {
    'oPagingNode': $('.paging_panel'),
    'oParentNode': $('.member_beans_wrap').find('.beans_detail'),

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
                'url': beansDetailAjaxUrl,
                'data': {
                    'page': curPageNum,
                    'count': fml.vars.pageSize
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
            type: 'get',
            data: opts.data || null,
            dataType: 'json',
            success: function(data){
                var code = data.code;

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

        var dataArr = data.list || [],
            dataLen = dataArr.length || 0;

        if (dataLen > 0) {
            fml.vars.currentPage = parseInt(data.page) || 0;

            var html = [
                '<li class="title">',
                    '<div>&nbsp;</div>',
                    '<div class="left">美美豆来源</div>',
                    '<div>美美豆数量</div>',
                    '<div>获得时间</div>',
                    '<div>有效期</div>',
                '</li>'
            ].join('');

            for (var i = 0; i < dataLen; i++) {
                var data = dataArr[i] || {},
                    secondHtml = '',
                    type = data.type || '',
                    text = data.text || '无',
                    ctime = data.ctime || '无',
                    amount = data.amount || '无',
                    order_id = data.order_id || 0,
                    expire_time = data.expire_time || {},
                    expire_start_time = expire_time.start || '无',
                    expire_end_time = expire_time.end || '无',
                    pic = data.pic || 'http://d03.res.meilishuo.net/pic/_o/e5/b6/3acf5960c0822fb6b002adaa89d1_70_70.cf.png';

                if (order_id == 0) {
                    secondHtml = '<div class="left one">' + text + '</div>';
                } else {
                    secondHtml = '<div class="two">' + text + '<br>订单号：<a href="http://order.meilishuo.com/order/detail/?order_id=' + order_id + '" target="_blank">' + order_id + '</a></div>';
                }

                html += [
                    '<li>',
                        '<div><p class="icon" style="background:url(' + pic + ') no-repeat; background-size:100%;"></p></div>',
                        secondHtml,
                        '<div class="one">' + amount + '</div>',
                        '<div class="one">' + ctime  + '</div>',
                        '<div class="one">' + expire_start_time + '－' + expire_end_time + '</div>',
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
beans_interests.init();
