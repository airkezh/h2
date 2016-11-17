/**
 * Created by a2014 on 14/11/3.
 */
fml.define('page/csrobot/trainingAlert', ['jquery', 'page/csrobot/post', 'page/csrobot/tc', 'page/csrobot/alert', 'page/csrobot/api'], function (require, exports) {
    var $ = require('jquery'),
        alert = require('page/csrobot/alert'),
        trainingApi = require('page/csrobot/api').training,
        uid = 0,
        TC = require('page/csrobot/tc'),
        post = require('page/csrobot/post');


    function trainingAlert() {
        this.canSubmit = true;
        this.init();
    }

    function trimLR(str) {
        return str.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "");
    }

    trainingAlert.prototype = {
        init: function () {
            var me = this;
            var html = '<div class="t-a-container"><div class="t-a-head"><div class="t-a-header"></div><div class="t-a-txt">哇，这么好玩，我也可以教MIXI说话了</div><div class="t-a-close"></div></div><div class="t-a-body"><div class="t-s-mask"></div><div class="t-a-question t-a-input"><img src="' + Meilishuo.config.picture_url + 'images/robot/header.png" width="30px" height="30px" style="background:#fb9ebd"/><input type="text" class="t-a-que" value="问题:" /></div><div class="count-calc t-common" id="t-a-question">剩余50字</div><div class="t-a-answer t-a-input"><img src="' + Meilishuo.config.avatar_c + '" width="30px" height="30px" style="background:#fb9ebd"/><input type="text" value="答案:" class="t-a-val"/></div><div class="count-calc t-common" id="t-a-answer">剩余50字</div><div class="t-a-ctl"><div class="btn send">发送</div><div class="btn close">关闭</div></div></div><div class="t-a-foot">调教请遵守 <a href="/help/robot/terms" target="_blank"><font color="#ff6699">《MIXI服务条款》</font></a></div></div>';
            var opt = {
                css: {
                    width: '460px',
                    height: '310px'
                },
                addEvent: me.addEvent,
                html: html
            };
            me.instance = new alert(opt);
        },
        addEvent: function () {
            var me = this;
            var mask = this.el.find('.t-s-mask'),
                body = this.el.find('.t-a-body');
            var que = this.el.find('.t-a-que'),
                ans = this.el.find('.t-a-val'),
                qc = que.parent().next(),
                ac = ans.parent().next();

            this.el.find('.send').click(function () {
                var question = trimLR($('.t-a-que').val()).replace(/<[^>]+>/g, ''),
                    answer = trimLR($('.t-a-val').val()).replace(/<[^>]+>/g, '');
                if (me.canSubmit) {
                    if (question == '' || question == '问题:') {
                        qc.html('<font color="red">问题不能为空</font>')
                        return;
                    }
                    if (answer == '' || answer == '答案:') {
                        ac.html('<font color="red">答案不能为空</font>')
                        return;
                    }

                    post(trainingApi, {question: question, answer: answer},
                        function (data) {
                            if (data.error_code == 0) {
                                ts();
                                mask.show();
                            }
                        }, 'json');
                }
            })
            this.el.find('.t-a-close').click(function () {
                me.el.find('input').val('');
                ts()
                me.hide();
            })
            this.el.find('.close').click(function () {
                me.el.find('input').val('');
                ts();
                me.hide();
            })


            //兼容ie
            if ($.browser.msie && $.browser.version == 7) {
                que.focus(function () {
                    $(this).css('border-color', '#ff6699');
                }).blur(function () {
                    $(this).css('border-color', '#dddddd');
                })
                ans.focus(function () {
                    $(this).css('border-color', '#ff6699');
                }).blur(function () {
                    $(this).css('border-color', '#dddddd');
                })
            }
            //添加文字限制检测
            new TC({
                input: que,
                common: function (length) {
                    qc.html('您还可以输入' + length + '字');
                    !me.canSubmit && (me.canSubmit = true);

                },
                holder: '问题:',
                warn: function (length) {
                    qc.html('<font color="red">超出' + length + '字</font>');
                    me.canSubmit = false;
                },
                limit: 50
            });
            new TC({
                input: ans,
                common: function (length) {
                    ac.html('您还可以输入' + length + '字');
                    !me.canSubmit && (me.canSubmit = true);

                },
                holder: '答案:',
                warn: function (length) {
                    ac.html('<font color="red">超出' + length + '字</font>');
                    me.canSubmit = false;
                },
                limit: 50
            })
            function ts() {
                setTimeout(function () {
                    mask.hide();
                    ans.val('答案:');
                    que.val('问题:');
                    qc.text('剩余50字');
                    ac.text('剩余50字');

                }, 1000)
            }
        },
        render: function () {
            $('body').append(this.instance.mask).append(this.instance.el);
            this.instance.show();
            return this.instance;
        }
    }
    return trainingAlert;
});
