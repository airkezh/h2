function help() {
    return this;
}
var controlFns = {
    'index': function (param) {
        if (!param) param = 'default';
        if (param == 'feedback') {
            this.feedback()
        } else if (param == 'faq') {
            this.faq(param);
        } else if (param == 'korea_shop') {
            this.korea_shop();
        } else if(param=='robot'){
            this.robot();
        } else {
            this.help();
        }
    },
    'help': function (param) {
        var select = this.readData('sl', this.req.__get, 'li');
        var page = this.readData('page', this.req.__get, 0) | 0;
        var mSelf = this;
        var php = {}
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data) {
            data.param = param;
            data.select = select;
            data._CSSLinks = ['aboutus'];
            data.pageTitle = '获取帮助 - 美丽说';
            mSelf.render('footer/help.html', data);
        });
    },
    'feedback': function (param) {
        var select = this.readData('sl', this.req.__get, 'li');
        var page = this.readData('page', this.req.__get, 0) | 0;
        var feedId = this.readData('feed_id', this.req.__get, '');
        var feedTag = this.readData('feedTag', this.req.__get, '1');
        var mSelf = this;
        var php = {};
        //www_feedback
        php.list = '/customactivity/CustomActivity_common_tool_single?id=www_feedback'
        if (feedId) {
            php['feedbackList'] = '/about/FeedBack_list?feed_id=' + feedId;
        }
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data) {
            data.show_list = 1;
            if (feedId) {
                data.show_list = 0;
            }
            ;
            data.param = param;
            data.select = select;
            data.feedId = feedId;
            data.feedTag = feedTag;
            data._CSSLinks = ['help/feedback'];
            data.pageTitle = '意见反馈 - 美丽说';
            mSelf.render('footer/feedback_new.html', data);
        });
    },
    'faq': function (param) {
        var mSelf = this;
        var php = {};
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data) {
            data._CSSLinks = ['aboutus'];
            data.pageTitle = '常见问题 - 美丽说';
            mSelf.render('footer/faq.html', data);
        });
    },
    /**
     * 韩国馆
     */
    'korea_shop': function () {
        var that = this;
        var php = {};
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data) {
            data._CSSLinks = ['aboutus'];
            data.pageTitle = '韩国馆服务保障说明 - 美丽说';
            that.render('footer/korea_shop.html', data);
        });
    },

    'return': function (param) {
        var mSelf = this;
        var php = {};
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data) {
            data._CSSLinks = ['aboutus'];
            data.pageTitle = '美丽无忧购消费者保障说明 - 美丽说';
            mSelf.render('footer/return.html', data);
        });
    },
    'userhelp': function (param) {
        var mSelf = this;
        var php = {
            'gouwubangzhu': '/partner/partner_post?id=163',
            'xinshoushanglu': '/partner/partner_post?id=161'
        };
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data) {
            data._CSSLinks = ['aboutus'];
            data.pageTitle = '美丽无忧购用户帮助中心 - 美丽说';
            mSelf.render('footer/user_help.html', data);
        });
    },
    robot: function (param) {
        if (param == 'terms') {
            this.terms();
        } else {
            this.r(param);
        }
    },
    'r': function (param) {
        this.debugSnake({ target: 'devlab1'});

        var mSelf = this;
        var php = {
            'top10': '/robot/top10',
            'manual_reply': '/robot/manual_reply'
        };
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function (data) {
            data._CSSLinks = ['csrobot/index'];
            //模拟接口
//            data.top10 = top10;
//            data.manual_reply = manual_reply;
            data.isBusiness = this.req.__get.source == 'pc_business' ? true : false;

            data.subString = function (str, len, hasDot) {
                var newLength = 0;
                var newStr = "";
                var chineseRegex = /[^\x00-\xff]/g;
                var singleChar = "";
                var strLength = str.replace(chineseRegex, "**").length;
                for (var i = 0; i < strLength; i++) {
                    singleChar = str.charAt(i).toString();
                    if (singleChar.match(chineseRegex) != null) {
                        newLength += 2;
                    }
                    else {
                        newLength++;
                    }
                    if (newLength > len) {
                        break;
                    }
                    newStr += singleChar;
                }

                if (hasDot && strLength > len) {
                    newStr += "...";
                }
                return newStr;
            }
            mSelf.render('csrobot/csrobot.html', data);
        });
    },
    'terms': function () {
        var php = {};
        var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);

        this.listenOver(function (data) {
            data._CSSLinks = ['csrobot/terms'];
            mSelf.render('csrobot/terms.html', data);
        });
    }
}
exports.__create = controller.__create(help, controlFns);
