/**
 * Created by a2014 on 14/11/3.
 */
fml.define('page/csrobot/commentAlert',
    [
        'jquery',
        'page/csrobot/help',
        'page/csrobot/event',
        'page/csrobot/post',
        'page/csrobot/tc',
        'page/csrobot/alert',
        'page/csrobot/api'
    ], function (require, exports) {
        var $ = require('jquery'),
            alert = require('page/csrobot/alert'),
            commentApi = require('page/csrobot/api').comment,
            TC = require('page/csrobot/tc'),
            post = require('page/csrobot/post'),
            eventEmitter = require('page/csrobot/event'),
            help = require('page/csrobot/help'),
            trimLR = help.trimLR,
            createOverlay = help.overlay;

        function closeWin() {
            location.href = '/';
        }

        function commentAlert(opt) {
            this.opt = opt;
            this.init();
        }

        var isClose = false;
        commentAlert.prototype = {
            init: function () {
                var me = this;
                var html = '<div class="c-a-head"><div class="c-a-header"></div><div class="c-a-txt">感谢使用MIXI，请您对MIXI的服务给予评价</div><div class="c-a-close delegate"></div></div><div class="c-a-container"><div class="c-a-body"><div class="c-a-choice"><div class="flower delegate"><div class="radio rselect" data-val="1"></div><div class="radio-text">送鲜花</div></div><div class="zhuan delegate"><div class="radio" data-val="0"></div><div class="radio-text">挨板砖</div></div></div><div class="c-a-pai"><div class="c-a-unlike">你不喜欢我的原因是?</div><div class="c-a-unlike-cg"><div class="c-a-check delegate"><div class="checkbox" data-val="1"></div><div class="checkboxtext" >问题不能回答</div></div><div class="c-a-check delegate c-a-m30" ><div class="checkbox" data-val="2"></div><div class="checkboxtext" >答非所问</div></div><div class="c-a-check delegate c-a-m30"  ><div class="checkbox" data-val="3"></div><div class="checkboxtext" >回答方式不满意</div></div></div><textarea class="c-val">' + me.opt.initText + '</textarea><div class="c-t-calc c-common">您还可以输入100字</div></div></div><div class="c-a-ctl"><div class="send delegate">发送</div><div class="close delegate">关闭</div></div></div>';
                var opt = {
                    css: {
                        width: '460px',
                        height: '180px'
                    },
                    addEvent: me.addEvent,
                    html: html,
                    canSubmit: false,
                    initText: me.opt.initText
                };
                me.instance = new alert(opt);
            },
            addEvent: function () {
                var me = this,
                    el = this.el,
                    mask = this.mask,
                    body = el.find('.c-a-pai');

                function toggleShow(isShow) {
                    if (isShow) {
                        body.show();
                    } else {
                        body.hide();
                        el.find('.c-val').val('');
                        $('.check').removeClass('check');
                        if (!$('.flower .radio').hasClass('rselect')) {

                            $('.rselect').removeClass('rselect');
                            $('.flower .radio').addClass('rselect');
                        }

                    }
                }


                function send(btn) {
                    if (me.canSubmit) {
                        var flag = el.find('.c-a-choice .rselect').attr('data-val'),
                            para = {flag: flag};
                        if (flag == 0) {//拍砖
                            var type = '',
                                vl = trimLR(body.find('.c-val').val()),
                                comment = ( vl == me.opt.initText ? '' : vl);
                            if ($('.c-a-unlike-cg .check').length == 0 && ( comment == me.opt.initText || comment.length == 0)) {
                                createOverlay(btn, '请勾选原因或者给MIXI反馈...谢谢~~');
                                return;
                            }

                            $('.c-a-unlike-cg .check').each(function (index, item) {
                                type += item.getAttribute('data-val');
                            });

                            para.comment = comment;
                            para.type = type;
                        }
                        post(commentApi, para,
                            function (data) {
                                if (data.error_code == 0) {
                                    commentSuccess.call(me);
                                }
                            }, 'json');
                    }
                }

                function commentSuccess() {
                    var me = this;
                    me.canSubmit = false;
                    me.opt.canSubmit = false;
                    var html = '<div style="height:100px;"><div class="f12 mt50">感谢您的评价，MIXI会继续努力哒！</div><div class="t-to-close f12">1秒后自动关闭</div></div>';
                    el.find('.c-a-container').html(html);
                    setTimeout(function () {
                        if (isClose) {
                            closeWin();
                        }
                        el.remove();
                        mask.remove();
                    }, 1000);
                }

                function choose(el, isShow) {
                    var now = el,
                        curSel = $('.c-a-choice .rselect');
                    if (now[0] != curSel[0]) {
                        curSel.removeClass('rselect');
                        now.find('.radio').addClass('rselect');

                        toggleShow(isShow);
                    }
                }
                var countcalc = el.find('.c-t-calc');
                el.delegate('.delegate', 'click', function () {
                    var self = $(this),
                        cls = self.attr('class').replace('delegate', '').replace('c-a-m30', '').replace(/\s+/g, '');
                    switch (cls) {
                        case 'flower':
                            choose(self, false);
                            break;
                        case 'zhuan':
                            choose(self, true);
                            body.find('.c-val').val(me.opt.initText);
                            break;
                        case 'c-a-check':
                            self.find('.checkbox').toggleClass('check');
                            break;
                        case 'c-a-close':
                        case 'close':
                            toggleShow(false);
                            me.hide();
                            isClose = false;
                            //兼容ie8
                            me.canSubmit = true;
                            me.opt.canSubmit = true;
                            countcalc.html('您还可以输入100字');
                            break;
                        case 'send':
                            send($(this));
                            break;
                        default :
                            ;
                            break;
                    }
                });

                new TC({
                    input: el.find('.c-val'),
                    common: function (length) {
                        countcalc.html('您还可以输入' + length + '字');
                        !me.canSubmit && (me.canSubmit = true);
                    },
                    holder: '请输入...',
                    warn: function (length) {
                        if (length == 0) {
                            countcalc.html('您还可以输入' + length + '字');
                            !me.canSubmit && (me.canSubmit = true);
                        }
                        else {
                            countcalc.html('<font color="red">超出' + length + '字</font>');
                            me.canSubmit = false;
                        }
                    },
                    limit: 100
                })
            },
            render: function (isclose) {
                isclose && (isClose = true);
                $('body').append(this.instance.mask).append(this.instance.el);
                this.instance.show();
                return this.instance;
            }
        }
        return commentAlert;

    });