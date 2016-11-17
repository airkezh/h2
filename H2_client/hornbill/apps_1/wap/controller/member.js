function member(){
    return this;
}

var controlFns = {
    index: function(args){
        if (args == 'main') {
            this.main();
        } else if (args == 'exchange') {
            this.exchange();
        } else {
            this.main();
        }
    },

    main: function(){
        //this.debugSnake({'target': 'devlab1'});
        var self = this,
            platform = false,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'signData': 'vip::/sign/getInfo',                                                               // 获取签到用户信息 接口
                'percentData': 'vip::/vip/getPercent',                                                          // 获取签到用户超过％数据 接口
                'upgradeData': 'vip::/vip/getFirstUpgrade',                                                     // 获取签到用户是否升级数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=member_center&cid=10887'      // 获取用户中心商品数据 接口
            };

        if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
            platform = true;
        }

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (!data.pageData || !data.signData || !data.upgradeData || !data.percentData) {
                return self.errorPage();
            }

            var code = data.signData.error_code;

            if (code == 400402) {
                data.pageTitle = '内测提示';
                data._CSSLinks = ['member/niece_tips'];
                self.render('member/niece_tips.html', data);
            } else {
                data.isIos = platform;
                data.pageTitle = '会员中心';
                data.serverDate = new Date();
                data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
                data.isNewest = wapMod.isNewest(self.req, '6.9.1');
                data.isUpgrade = (data.upgradeData.error_code == 0) ? (data.upgradeData.data.is_upgrade || 0) : 0;

                data._CSSLinks = ['member/main'];
                self.render('member/main.html', data);
            }
        });
    },

    turntable: function(){
        //this.debugSnake({target : 'devlab1'});
        var self = this,
            platform = false,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                'connect_weixin': '/connect/weixin?type=1',
                'getCoupons': 'vip::/exchange/getCoupons',                                                       // 获取优惠券数据 接口
                'getUserBeans': 'vip::/award/getUserInfo?act_code=beans_dial&mode=1',                            // 获取用户美美豆数据 接口
                'getAwardData': 'vip::/award/getActivityInfo?act_code=beans_dial',                               // 获取大转盘抽奖奖品数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=turntable_member&cid=11145'    // 获取大转盘抽奖奖品（谢谢参与）数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=turntable_member&cid=10499'    // 获取大转盘抽奖奖品（谢谢参与）数据 接口
            };

        if (/(Android)/i.test(ua)) {
            platform = true;
        }

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            var serverTime = new Date().getTime(),
                promotionStartTime = new Date(2015,7,11,00,00,00).getTime(),
                promotionEndTime = new Date(2015,7,21,00,00,00).getTime();

            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (weixinBrowser && (serverTime >= promotionStartTime) && (serverTime < promotionEndTime)) {
                connectWX(self, data);
            }

            if (!data.pageData || !data.getCoupons || !data.getUserBeans || !data.getAwardData) {
                return self.errorPage();
            }

            var code = data.getUserBeans.error_code;

            if (code == 400402) {
                data.pageTitle = '内测提示';
                data._CSSLinks = ['member/niece_tips'];
                self.render('member/niece_tips.html', data);
            } else {
                data.isAndroid = platform;
                data.isNewest = wapMod.isNewest(self.req, '6.6.1');
                data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
                data.pageTitle = data.getAwardData.data.act_name || '全民大转盘抽奖';

                if (!data.isLogin) {
                    var getUserBeans = {
                            'error_code': 0,
                            'message': 'success',
                            'data': {
                                'beans': 0,
                                'free_times': 0,
                                'free_times_total':0
                            }
                        };

                    data.getUserBeans = getUserBeans;
                }

                if ((serverTime >= promotionStartTime) && (serverTime < promotionEndTime)) {
                    data._CSSLinks = ['member/turntable2'];
                    self.render('member/turntable2.html', data);
                } else {
                    data._CSSLinks = ['member/turntable'];
                    self.render('member/turntable.html', data);
                }
            }
        });
    },

    turntable_rule: function(){
        var self = this,
            php = {
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=rule_turntable_member&cid=11307'     // 大转盘抽奖活动规则数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=rule_turntable_member&cid=10505'     // 大转盘抽奖活动规则数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            if (!data.pageData) {
                return self.errorPage();
            }

            data.pageTitle = '活动规则';

            data._CSSLinks = ['member/turntable_rule'];
            self.render('member/turntable_rule.html', data);
        });
    },

    turntable_prize: function(){
        var self = this,
            platform = false,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1'
            };

        if (/(Android)/i.test(ua)) {
            platform = true;
        }

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            data.isAndroid = platform;
            data.isNewest = wapMod.isNewest(self.req, '6.6.1');
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = '我的大转盘奖品';

            data._CSSLinks = ['member/turntable_prize'];
            self.render('member/turntable_prize.html', data);
        });
    },

    prefecture: function(args){
        //this.debugSnake({'target': 'lab4'});
        var php = {},
            self = this;

        if (args == 'list') {
            php = {
                'goldList': 'doota::/coin/get_list?page=1&count=5'                  // 获取wap用户金币收支明细 接口
            };
        } else if (args == 'guide') {
            php = {
                'userAmount': 'doota::/coin/get_summary'                            // 获取wap用户金币数 接口
            };
        } else {
            php = {
                'userAmount': 'doota::/coin/get_summary',                           // 获取wap用户金币数 接口
                'goldList': 'doota::/coin/get_list?page=1&count=2'                  // 获取wap用户金币收支明细 接口
            };
        }

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            var pageTitle = '';

            if (args == 'list') {
                pageTitle = '金币收支明细';
            } else if (args == 'guide') {
                pageTitle = '金币怎么花';
            } else {
                pageTitle = '会员专区';
            }

            data.pageTitle = pageTitle;
            data.headTag = 'member';
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;

            if (!data.isLogin) {
                var userAmount = {
                        'code': 0,
                        'tips': '',
                        'message': '',
                        'data': {
                            'is_enabled': 0,
                            'amount_available': 0
                        }
                    },
                    goldList = {
                        'code': 0,
                        'tips': '',
                        'message': '',
                        'data': {
                            'list': [],
                            'total': '0',
                            'page': '1',
                            'count': '0'
                        }
                    };

                data.goldList = goldList;
                data.userAmount = userAmount;
            }

            data._CSSLinks = ['member'];

            if (args == 'list') {
                data.pageTotal = Math.ceil(data.goldList.data.total / data.goldList.data.count) || 0;

                self.render('member/pay_list.html', data);
            } else if (args == 'guide') {
                self.render('member/gold_guide.html', data);
            } else {
                self.render('member/prefecture.html', data);
            }
        });
    },

    detail: function(args){
        //this.debugSnake({'target': 'lab4'});
        var php = {},
            self = this;
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1;

        if (args == 'bean') {
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'userAmount': 'doota::/coin/get_summary_beans',                     // 获取wap用户美美豆 接口
                'beansList': 'doota::/coin/get_list_beans?page=1&count=5'           // 获取wap用户美美豆收支明细 接口
            };
        } else if (args == 'beauty') {
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'beautyInfo': 'vip::/vip/getInfo',                                 // 获取wap用户信息（等级、美丽值）接口
                'beautyList': 'vip::/vip/getBeautyDetail'                          // 获取wap用户美丽值收支明细 接口
            };
        }

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            var pageTitle = '';

            if (args == 'bean') {
                if (!data.beansList || !data.userAmount) {
                    return self.errorPage();
                }

                pageTitle = '我的美美豆明细';
            } else if (args == 'beauty') {
                if (!data.beautyInfo || !data.beautyList) {
                    return self.errorPage();
                }

                pageTitle = '我的美丽值明细';
            }

            data.pageTitle = pageTitle;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;

            if (!data.isLogin) {
                if (args == 'bean') {
                    var userAmount = {
                            'code': 0,
                            'message': '',
                            'data': {
                                'is_enabled': 0,
                                'amount_available': 0
                            }
                        },
                        beansList = {
                            'code': 0,
                            'message': '',
                            'data': {
                                'list': [],
                                'total': '0',
                                'page': '1',
                                'count': '0'
                            }
                        };

                    data.beansList = beansList;
                    data.userAmount = userAmount;
                } else if (args == 'beauty') {
                    var beautyInfo = {
                            'error_code': 0,
                            'message': '',
                            'data': {
                                'grade': 0,
                                'score': 0
                            }
                        },
                        beautyList = {
                            'error_code': 0,
                            'message': '',
                            'data': []
                        };

                    data.beautyInfo = beautyInfo;
                    data.beautyList = beautyList;
                }
            }

            data._CSSLinks = ['member/detail'];

            if (args == 'bean') {
                data.pageTotal = Math.ceil(data.beansList.data.total / data.beansList.data.count) || 0;

                self.render('member/beans_detail.html', data);
            } else if (args == 'beauty') {
                self.render('member/beauty_detail.html', data);
            }
        });
    },

    beans_caption: function(){
        var self = this,
            php = {
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=beans_caption_member&cid=12461'     // 会员中心美美豆数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=beans_caption_member&cid=11163'     // 会员中心美美豆数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            if (!data.pageData) {
                return self.errorPage();
            }

            data.pageTitle = '美美豆说明';

            data._CSSLinks = ['member/beans_caption'];
            self.render('member/beans_caption.html', data);
        });
    },

    ransom: function(){
        //this.debugSnake({'target': 'lab2'});
        var self = this,
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=exchange_member&cid=11017'           // 获取美美豆换好礼商品数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=exchange_member&cid=10495'             // 获取美美豆换好礼商品数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (!data.pageData) {
                return self.errorPage();
            }

            data.serverDate = new Date();
            data.isNewest = wapMod.isNewest(self.req, '6.6.1');
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = data.pageData.title || '美美豆换好礼';

            data._CSSLinks = ['member/ransom'];
            self.render('member/ransom.html', data);
        });
    },

    trade: function(){
        //this.debugSnake({'target': 'lab2'});
        var self = this,
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=trade_member&cid=11019'           // 获取会员半价购商品数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=trade_member&cid=10497'             // 获取会员半价购商品数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (!data.pageData) {
                return self.errorPage();
            }

            data.serverDate = new Date();
            data.isNewest = wapMod.isNewest(self.req, '6.6.1');
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = data.pageData.title || '会员半价购';

            data._CSSLinks = ['member/trade2'];
            self.render('member/trade2.html', data);
        });
    },

    interests: function(){
        //this.debugSnake({'target': 'lab2'});
        var self = this,
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'userInfoData': 'vip::/vip/getInfo',                                                                  // 获取签到用户数据 接口
                'percentData': 'vip::/vip/getPercent',                                                                // 获取签到用户超过％数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=rule_interests_member&cid=11309'    // 如何提升美丽值数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=rule_interests_member&cid=10503'    // 如何提升美丽值数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (!data.pageData || !data.userInfoData || !data.percentData) {
                return self.errorPage();
            }

            var code = data.userInfoData.error_code;

            if (code == 400402) {
                data.pageTitle = '内测提示';
                data._CSSLinks = ['member/niece_tips'];
                self.render('member/niece_tips.html', data);
            } else {
                data.isNewest = wapMod.isNewest(self.req, '6.8.0');
                data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
                data.serverDate = new Date();
                data.pageTitle = '会员权益';
                data._CSSLinks = ['member/interests'];
                self.render('member/interests.html', data);
            }
        });
    },

    download: function(){
        var self = this,
            platform = false,
            ua = self.req.headers['user-agent'],
            php = {
                
            };

        if (/(Android)/i.test(ua)) {
            platform = true;
        }

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            data.isAndroid = platform;
            data.pageTitle = '下载美丽说';

            data._CSSLinks = ['member/download'];
            self.render('member/download.html', data);
        });
    }
}

var connectWX = function(mSelf, data){
    if (data.connect_weixin && data.connect_weixin.redirect) {
        return mSelf.redirectTo(data.connect_weixin.redirect, true);
    }
};

exports.__create = controller.__create(member, controlFns);