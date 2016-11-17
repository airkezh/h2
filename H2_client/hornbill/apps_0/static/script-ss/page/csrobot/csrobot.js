/**
 * Created by a2014 on 14/10/28.
 */
fml.define('page/csrobot/csrobot',
    [
        'jquery',
        'page/csrobot/eventType',
        'page/csrobot/event' ,
        'page/csrobot/api',
        'page/csrobot/post',
        'app/checkLogin',
        'page/csrobot/autoComplete',
        'page/csrobot/trainingAlert',
        'page/csrobot/commentAlert',
        'page/csrobot/help'
    ], function (require, exports) {
        var $ = require('jquery'),
            AC = require('page/csrobot/autoComplete'),
            checkLogin = require('app/checkLogin'),
            eventEmitter = require('page/csrobot/event'),
            emit = eventEmitter.pub,
            iface = require('page/csrobot/api'),
            commit = $('.send'),
            right = $('.right'),
            trainingAlert = require('page/csrobot/trainingAlert'),
            commentAlert = require('page/csrobot/commentAlert'),
            trainingtCom,
            commentCom,
            head = $('.header'),
            msgCtl = $('.msg-control'),
            isComment = false,
            post = require('page/csrobot/post'),
            timeToGetData = 1000 * 60 * 1,
            et = require('page/csrobot/eventType'),
            msgContainer = $('.msg-container'),
            commendText = '抱歉，MIXI没有看懂您的问题，请您重新描述，如果MIXI仍然无法解决您的问题，建议您通过<a href="javascript:;" style="color:#f69;" class="feedback">在线客服联系小美哦!</a>';


        initLayout();
        subscribe();

        $('.body').show();
        //全局变量问了fix chrome(当中文输入的时候,点击推荐弹出窗不会触发click事件,只好把事件加载元素内)
        var $$ = new AC({
            //推荐列表限制条数
            limit: 10,
            input: '.msg',
            //推荐接口
            url: iface.recommend,
            //推荐弹出窗list 字体长度
            textLength: 86,
            //搜索接口
            searchUrl: iface.search,
            limit: 10,
            initText: '请输入....',
            params: {
                'question': ''
            },
            textchange: function (text) {//动态修改参数
                this.params.question = text.replace(/<[^>]+>/g, '');
            },
            //推荐列表点击
            addRecmand: function (obj, fn) {
                var question = obj.q,
                    answer = obj.a;
                eventEmitter
                    .pub(et.customerSendMsg, msgContainer, [question])
                    .pub(et.robotAnswer, msgContainer, [answer, false]);
                fn && fn();
            },
            //搜索
            addList: function (data, question) {
                //搜索接口
                emit(et.customerSendMsg, msgContainer, [question]);
                if (data.data.length > 0) {
                    if (data.is_revise == 1) {
                        emit(et.robotAnswer, msgContainer, [data.data[0], true]);
                    } else {
                        emit(et.robotAnswer, msgContainer, [data.data[0], false]);
                    }
                }
                else {
                    emit(et.robotRecommend, null, [data.rec_list]);
                }
            }
        });
        welcome();
        addEvent();
        pullData();


        function initLayout() {
            var height = $(window).height(),
                body = $('.body');

            var margin = parseInt(body.css('margin-top')) + parseInt(body.css('margin-bottom')),
                messageCtlH = msgCtl.height(),
                headH = head.height(),
                mh = height - (margin + messageCtlH + headH);
            var msgHeight = mh < 300 ? 300 : mh,
                rightHeight = msgHeight + messageCtlH - 25;

            msgContainer.height(msgHeight);

            $('.tab-content').height(rightHeight);

            if ($('.manual_reply div').length == 0) {
                $('.mes-info').hide();
            }
        }

        function subscribe() {
            eventEmitter
                //问答列表click
                .sub(et.listItemClick, function () {
                    //this is jquery object point the clicked li
                    if (this.parent().parent().hasClass('manual_reply')) {
                        if (!this.attr('ir')) {
                            post(iface.faq, {id: this.attr('data-id'), is_read: 1}, function (data) {
                                if (data.error_code == 1) {
                                    this.attr('ir', '1');
                                }
                            }, 'json');
                        }
                    }
                    if (this.hasClass('expand')) {
                        this.removeClass('expand').addClass('collapse').next().hide();
                    } else {
                        $('.expand').removeClass('expand').addClass('collapse').next().hide();
                        this.removeClass('collapse').addClass('expand').next().show();
                    }
                })
                //右边tab mouse hover
                .sub(et.tabSwitch, function () {
                    if (this[0] != $('.tab-selected')[0]) {
                        var info = $('.mes-info');
                        if (info.length > 0) {
                            info.hide();
                        }
                        $('.tab-selected').removeClass('tab-selected');
                        this.addClass('tab-selected');
                        $('.tab-content').hide();
                        $('.tab-content[data-index=' + this.attr("data-index") + ']').show();
                    }
                })
                //客服发送消息
                .sub(et.customerSendMsg, function (text) {
                    //this is msgcontainer
                    var date = new Date(),
                        time = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
                    var div = document.createElement('div');
                    var b = $('<div class="customer-msg">' +
                        '<div class="customer-msg-content ie-hack">' +
                        '<div class="rc left-top"></div>' +
                        '<div class="rc left-bottom"></div>' +
                        '<div class="rc right-top"></div>' +
                        '<div class="rc right-bottom"></div>' +
                        '<div class="rc left-gap"></div>' +
                        '<div class="rc right-gap"></div>' +
                        '<div class="cs-text"><pre>' + text + '</pre></div>' +
                        '</div>' +
                        '<img class="customer-msg-header" src="' + Meilishuo.config.avatar_c + '" width="50px" height="50px"/>' +
                        '</div>');
                    b.appendTo(msgContainer);
                    var height = b.find('.customer-msg-content').height() + 6;
                    b.find('.left-gap').height(height + 2);
                    b.find('.right-gap').height(height);
                })
                //机器人回答消息
                .sub(et.robotAnswer, function (data, need) {
                    var html = '';
                    if (need) {
                        html = data.answer + '<div class="revise"><div class="ishelp" data-index="' + data.index + '" data-id="' + data.id + '">以上信息对您是否有帮助</div><div class="btn yes" data-id="1">有</div><div class="btn no" data-id="0">无</div></div>';
                    } else {
                        html = data.answer;
                    }
                    robotAnswerBase(html);
                })
                //客户对机器人自动回答评价有用还是没用
                .sub(et.evaluation, function () {
                    var that = this,
                        cls = that.attr('class'),
                        isHelp = that.attr('data-id'),
                        target = this.parent().find('.ishelp'),
                        id = target.attr('data-id'),
                        index = target.attr('data-index');
                    post(iface.revise, {id: id, index: index, is_helpful: isHelp}, function (data) {
                        if (data.error_code == 0) {
                            var text = '感谢您的评价！';
                            if (isHelp == 0) {
                                text = '感谢您的评价,MIXI会努力改进的...';
                            }
                            that.parent().html('<font color="#ff6699">' + text + '</font>');
                        }
                    }, 'json')
                })
                //关闭
                .sub(et.closeWindow, function () {
                    if (!commentCom) {
                        commentFn(true);
                    } else if (commentCom.canSubmit) {
                        commentCom.show();
                    } else {
                        location.href = '/';
                    }
                })
                //机器人推荐回答
                .sub(et.robotRecommend, function (data, question) {
                    var html = '<div class="robot-answer">' + commendText + '</div>';
                    $.each(data, function (index, item) {
                        html += '<div class="click_div">' + (parseInt(index) + 1) + '. <font color="#ff6699">' + item.question + '</font></div>';
                    });
                    robotAnswerBase(html);
                    $('.feedback').click(function(){
                        window.open('http://im.meilishuo.com/www/buyer_platform_im/');
                    });
                })


                //客户点击机器人推荐的问题
                .sub(et.autoReplay, function (data, text) {
                    //this is msgcontainer
                    eventEmitter.pub(et.customerSendMsg, msgContainer, [text])
                    var a = '';
                    $.each(data, function (index, item) {
                        if (item.question == text) {
                            a = item;
                            return;
                        }
                    });
                    eventEmitter.pub(et.robotAnswer, msgContainer, [a, false]);
                })
                
        }

        //机器人欢迎语
        function welcome() {
            var uid = Meilishuo.config.user_id;
            var text = '';
            if (uid == 0) {
                text = '欢迎来到智能客服机器人...';
            }
            else {
                text = '欢迎 <font color="#ffc0cb">' + (Meilishuo.config.nickname || '') + '</font> 来到智能客服机器人...';
            }
            //welcome
            emit(et.robotAnswer, msgContainer, [
                {answer: text},
                false
            ]);
        }

        //添加页面事件
        function addEvent() {
            msgContainer.delegate('.click_div', 'click', function (e) {
                emit(et.autoReplay, null, [$$.rec_list, $(this).find('font').text()]);
            });
            right.delegate('.list-question', 'click', function (event) {
                    emit(et.listItemClick, $(this), [])
                }
            )
            $('.bar').hover(function () {
                emit(et.tabSwitch, $(this), []);
            })

            $('.msg-toolbar').delegate('.btn', 'click', function () {
                var cls = $(this)[0].className.replace('btn ', '');
                switch (cls) {
                    case 'comment':
                        commentFn();
                        break;
                    case 'training':
                        trainingFn();
                        break;
                    case 'send':
                        emit(et.search, $$, []);
                        break;
                    case 'close':
                        emit(et.closeWindow, null, []);
                        break;
                    default :
                        ;
                        break;
                }
            })

            msgContainer.delegate('.btn', 'click', function (e) {
                emit(et.evaluation, $(this), []);
            });

            $('.head-close').click(function () {
                emit(et.closeWindow, window, []);
            })
        }

        function robotAnswerBase(html) {
            var el = $('<div class="robot-msg">' +
                '<img class="robot-msg-header" src="' + Meilishuo.config.picture_url + 'images/robot/header.png" width="50px" height="50px"/>' +
                '<div class="robot-msg-content ie-hack">' +
                '<div class="rc left-top"></div>' +
                '<div class="rc left-bottom"></div>' +
                '<div class="rc right-top"></div>' +
                '<div class="rc right-bottom"></div>' +
                '<div class="rc left-gap"></div>' +
                '<div class="rc right-gap"></div>' +
                '<div class="robot-text"><pre>' + html + '</pre></div>' +
                '</div>' +
                '</div><div style="clear:both;height:20px;"></div>');
            el.appendTo(msgContainer);
            var height = el.find('.robot-msg-content').height() + 6;

            el.find('.left-gap').height(height);
            el.find('.right-gap').height(height);
            msgContainer.scrollTop(9999);
        }

        //评价事件
        function commentFn(isC) {
            if (!commentCom) {
                commentCom = new commentAlert({initText: '请输入...'}).render(isC);
                commentCom.show();
            } else {
                if (!commentCom.canSubmit || !commentCom.opt.canSubmit) {
                    emit(et.robotAnswer, msgContainer,
                        [
                            {answer: '谢谢，您已对本次服务做出过评价了'},
                            false
                        ]);
                } else {
                    commentCom.show();
                }
            }
        }

        //训练机器人事件
        function trainingFn() {
            if (!checkLogin({param: {
                'btn': '.training'
            }, need_captcha: 0})) {
                fml.on('login_success', function () {
                    $('.training').trigger('click');
                })
                return
            } else {
                if (!trainingtCom) {
                    trainingtCom = new trainingAlert().render();
                }
                trainingtCom.show();
            }
        }


        //定时拉数据
        setInterval(function () {
            pullData();
        }, timeToGetData);

        //拉取人工回复接口数据
        function pullData() {
            post(iface.manual_reply, {}, function (data) {
                var html = '';
                if (data.error_code == 0 && data.data.length > 0) {
                    $.each(data.data, function (index, item) {
                        html += '<div class="list-item"><div class="list-question collapse" data-id=' + item["id"] + ' ><pre>' + item['question'] + '</pre></div>' +
                            '<div class="list-answer"><pre>' + item["answer"] + '</pre></div></div>';
                    })
                    $('.manual_reply').html(html);
                    $('.mes-info').show();
                }
                else if (data.data.length == 0) {
                    var height = $('.manual_reply').height();
                    var html = '<div class="no-anwser" style="text-align:center;"><h2>暂无回复</h2><div>MIXI不能回答的，待人工回复后会出现在这...</div></div>';
                    $('.manual_reply').css('background', 'white').html(html);
                }
            }, 'json')
        }


    }
)
