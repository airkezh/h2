/**
 * Created by a2014 on 14/10/28.
 */
fml.define('page/csrobot/autoComplete',
    [
        'jquery',
        'page/csrobot/eventType',
        'page/csrobot/event',
        'page/csrobot/post',
        'page/csrobot/tc',
        'page/csrobot/help',

    ],
    function (require, exports) {
        var $ = require('jquery'),
            post = require('page/csrobot/post'),
            TC = require('page/csrobot/tc'),
            eventEmitter = require('page/csrobot/event'),
            et = require('page/csrobot/eventType'),
            help = require('page/csrobot/help'),
            keyCode = help.keyCode,
            subs = help.subs,
            createOverlay = help.overlay,
            strLen = help.strLen;

        function autoComplete(opt) {
            this.opt = opt;
            this.input = $(opt.input);
            this.index = -1;
            //延迟请求
            this.delay = opt.delay || 17;
            //推荐条数限制
            this.limit = opt.limit || 10;
            //推荐接口
            this.url = opt.url || '';
            //推荐接口参数
            this.params = opt.params || {};
            //推荐弹出窗位置
            this.bottom = opt.bottom || 100;
            //输入框默认文字
            this.initText = opt.initText || '清输入...';
            //搜索接口
            this.searchUrl = opt.searchUrl || '';
            //推荐数据
            this.data = [];
            //判断是否需要 是否有帮助btn
            //限制ajax请求
            this.canQuery = true;
            //限制ajax请求
            this.timeout = opt.timeout || 3000;
            //推荐请求队列
            this.queue = [];
            //弹出窗字数限制
            this.textLength = opt.textLength || 86;
            this.init();
        }

        autoComplete.prototype = {
            init: function () {
                var position = this.input.offset(),
                    left = position.left,
                    me = this;
                this.list = $('<ul class="auto-menu"></ul>');
                this.input.val(this.initText);
                this.input.parent().append(this.list);

                //recommended list item click handler
                eventEmitter
                    .sub(et.addRecmand, function (id) {
                        me.clearQueue();
                        me.opt.addRecmand(me.getQuestionAnswer(id));
                        me.reset();
                    }).sub(et.search, me.search);
                //global function for  handle popup list item click
                emit = function (id) {
                    eventEmitter.pub(et.addRecmand, me, [id]);
                }
                this.addEvent();
            },
            getQuestionAnswer: function (id) {
                var me = this;
                var answer = '';
                var question = '';
                for (var i = 0, len = me.data.length; i < len; i++) {
                    var item = me.data[i];
                    if (item.id == id) {
                        question = item.question;
                        answer = item;
                        break;
                    }
                }
                return {
                    q: question,
                    a: answer
                }
            },
            render: function () {
                var me = this;
                var html = '';
                $.each(me.data, function (index, item) {
                    if (item) {
                        var a = subs(item.question, me.textLength, true),
                            val = me.input.val();
                        //关键字标红
                        html += '<li data-id="' + item.id + '" onmousedown=emit(' + item.id + ') >' + a.replace(new RegExp('[' + val + ']', 'g'), function (v) {
                            return '<font color="#ff6699">' + v + '</font>'
                        }) + '</li>';
                    }
                });
                me.list.html(html);
                me.showMenu();
                return this;
            },
            addEvent: function () {
                var me = this;
                var input = this.opt.input && $(this.opt.input);
//
                this.list.delegate('li', 'hover', function () {
                    if (!$(this).hasClass('.item-selected')) {
                        $('.item-selected').removeClass('item-selected');
                        $(this).addClass('item-selected');
                    }
                });

                this.input.on('keydown', function (e) {
                    if (me.input.val() == me.initText) {
                        me.input.val('');
                    }
                    var code = e.keyCode;
                    switch (code) {
                        case keyCode.DOWN:
                            e.preventDefault();
                            if (me.data.length > 0) {
                                me.next();
                            }
                            break;
                        case keyCode.UP:
                            e.preventDefault();
                            if (me.data.length > 0) {
                                me.prev();
                            }
                            break;
                        case keyCode.ENTER:
                            e.preventDefault();
                            if ($('.item-selected').length == 0) {//走搜索接口
                                me.search();
                            } else {//如果在弹出框上下键，走推荐接口
                                emit($('.item-selected').attr('data-id'));
                            }
                            break;
                        case keyCode.BACKSPACE:
                            if (me.input.val().length <= 1) {
                                me.input.val('');
                                me.hideMenu();
                            } else {
                                changeText(me.input.val().substr(0, me.input.val().length - 1));
                            }
                            break;
                        default :

                            break;
                    }
                });

                function changeText(text) {
                    //推荐接口 请求前清除之前的队列
                    me.clearQueue();

                    //文字等于初始文字
                    if (text != me.initText) {
                        me.opt.textchange && me.opt.textchange.call(me, text);
                        var params = {
                            keywords: me.params.question
                        }

                        var xhr = me.getData(me.url, params, function (data) {
                            if (data.data.length > 0) {
                                //limit count
                                me.data = data.data.splice(0, me.limit);
                                me.render();
                            } else {
                                me.hideMenu();
                            }
                        });
                        me.queue.push(xhr);
                    }
                }

                new TC({
                    input: me.input,
                    holder: '请输入....',
                    warn: function (length) {
                        //文字超长,不能发送search
                        me.canQuery = false;
                        createOverlay($('.msg-toolbar .send'), '输入的内容过长...');
                    },
                    common: function () {
                        //可以发送search
                        me.canQuery = true;
                        //不加 机器人回到问题时的 有用没用按钮
                        changeText(me.input.val());
                    },
                    limit: 140
                })
            },
            clearQueue: function () {
                var me = this;
                if (me.queue.length == 0) {
                    return;
                }
                $.each(me.queue, function (index, qu) {
                    qu.abort();
                });
                me.queue.length = 0;
            },
            changeCanReq: function () {
                if (!this.lastTime) {
                    this.canReq = true;
                    this.lastTime = new Date().getTime();
                } else {
                    if (new Date().getTime() - this.lastTime > this.timeout) {
                        this.canReq = true;
                        this.lastTime = new Date().getTime();
                    } else {
                        this.canReq = false;
                    }
                }
            },
            search: function () {
                var me = this;
                var t = this.input.val().replace(/\s+/g, '');
                if (t == '' || t == this.initText) {
                    return;
                }

                //内容过长
                if (!me.canQuery) {
                    createOverlay($('.msg-toolbar .send'), '输入的内容过长...');
                    return;
                }
                //请求控制3秒一次
                this.changeCanReq();
                if (!this.canReq) {
                    return;
                }
                this.getData(me.searchUrl, me.params, function (data) {
                    me.opt.addList && me.opt.addList(data, me.params.question);
                    //缓存之前的推荐列表
                    me.rec_list = data.rec_list;
                    for (var j = 0, l = data.rec_list.length; j < l; j++) {
                        var it = data.rec_list[j];
                        var qus = it.question;
                        for (var i = 0, len = me.rec_list.length; i < len; i++) {
                            if (qus != me.rec_list[i].question) {
                                me.rec_list.push(it);
                            }
                        }
                    }
                    //Take care of things
                    me.reset();
                }, true);
            },
            getData: function (url, param, fn) {
                var xhr = post(url, param, function (result) {
                    if (result.error_code == 0) {
                        fn && fn(result);
                    }
                }, 'json');
                return xhr;
            },
            prev: function () {
                var index = this.index;
                if (index == 0 || index == -1) {
                    this.index = this.data.length - 1;
                } else {
                    this.index -= 1;
                }
                $('.item-selected').removeClass('item-selected');
                this.alterInputText($(this.list.find('li:eq(' + this.index + ')')).addClass('item-selected').text());
            },
            next: function () {
                if (this.index == this.data.length - 1) {
                    this.index = 0;
                } else {
                    this.index += 1;
                }
                $('.item-selected').removeClass('item-selected');
                this.alterInputText($(this.list.find('li:eq(' + this.index + ')')).addClass('item-selected').text());
            },
            showMenu: function () {
                var me = this;
                this.index = 0;
                this.list.show();
                $('.auto-cur').show()
            },
            hideMenu: function () {
                this.list.html('');
                this.list.hide();
                $('.auto-cur').hide()

            },
            alterInputText: function (text) {
                this.input.val(text);
                this.opt.textchange && this.opt.textchange.call(this, text);
            },
            reset: function () {
                this.input.val('');
                this.params.question = '';
                this.hideMenu();
            }

        }

        return autoComplete;
    });
