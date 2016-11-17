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
        /*var self = this,
            platform = false,
            isNormalGetData = 0,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'signData': 'vip::/sign/getInfo',                                                               // 获取签到用户信息 接口
                'percentData': 'vip::/vip/getPercent',                                                          // 获取签到用户超过％数据 接口
                'upgradeData': 'vip::/vip/getFirstUpgrade',                                                     // 获取签到用户是否升级数据 接口
                'beansData': 'vip::/beans/getBeansInfo?is_index=index',                                         // 获取签到用户美美豆数据 接口
                'scoreData': 'vip::/vip/getDepletionScore',                                                     // 获取签到用户美丽值数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=member_center&cid=10887'      // 获取页面通用后台配置数据 接口
            };

        if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
            platform = true;
        }

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            //if (weixinBrowser) {
                //connectWX(self, data);
            //}

            if (!data.pageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if ((data.signData.error_code == 0) && (data.upgradeData.error_code == 0) && (data.percentData.error_code == 0)) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
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
                data.isNormalGetData = isNormalGetData;
                data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
                data.isNewest = wapMod.isNewest(self.req, '6.9.1');
                data.isUpgrade = (data.upgradeData.error_code == 0) ? (data.upgradeData.data.is_upgrade || 0) : 0;

                data._CSSLinks = ['member/main'];
                self.render('member/main.html', data);
            }
        });*/

        var self = this,
            platform = false,
            isNormalGetData = 0,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'signData': 'vip::/sign/getInfo',                                                                           // 获取签到用户信息 接口
                'taskData': 'vip::/task/getMenu',                                                                           // 获取签到用户做任务数据 接口
                'percentData': 'vip::/vip/getPercent',                                                                      // 获取签到用户超过％数据 接口
                'calendarData': 'vip::/sign/getCalendar',                                                                   // 获取签到日历数据 接口
                //'upgradeData': 'vip::/vip/getFirstUpgrade',                                                               // 获取签到用户是否升级数据 接口
                'beansData': 'vip::/beans/getBeansInfo?is_index=index',                                                     // 获取签到用户美美豆数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=beans_paradise_member&cid=15905',         // 获取页面通用后台配置数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=beans_paradise_member&cid=15225',       // 获取页面通用后台配置数据 接口
                'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15991'      // 获取页面通用后台配置数据 接口
                //'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15229'    // 获取页面通用后台配置数据 接口
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

            if (!data.signData || !data.taskData || !data.percentData || !data.calendarData || !data.beansData || !data.pageData || !data.giftPageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if ((data.signData.error_code == 0) && (data.taskData.error_code == 0) && (data.percentData.error_code == 0) && (data.calendarData.error_code == 0) && (data.beansData.error_code == 0)) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            var serverDate = new Date(),
                code = data.signData.error_code;

            if (code == 400402) {
                data.pageTitle = '内测提示';
                data._CSSLinks = ['member/niece_tips'];
                self.render('member/niece_tips.html', data);
            } else {
                data.isIos = platform;
                data.serverDate = serverDate;
                data.serverDay = serverDate.getDay();
                data.isNormalGetData = isNormalGetData;
                data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
                data.isNewest = wapMod.isNewest(self.req, '6.9.1');
                data.pageTitle = (data.pageData && data.pageData.title) ? data.pageData.title : '美美豆乐园';
                //data.isUpgrade = (data.upgradeData.error_code == 0) ? (data.upgradeData.data.is_upgrade || 0) : 0;
                data.isUpgrade = 0;

                data._CSSLinks = ['member/beans_paradise'];
                self.render('member/beans_paradise.html', data);
            }
        });
    },

    club: function(){
        var self = this,
            platform = false,
            isNormalGetData = 0,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'signData': 'vip::/sign/getInfo',                                                                           // 获取签到用户信息 接口
                'recordData':'vip::/vip/getGene',                                                                           // 获取签到用户美丽档案完成％数据 接口
                'percentData': 'vip::/vip/getPercent',                                                                      // 获取签到用户超过％数据 接口
                'giftData': 'vip::/gift/getIsHaveGift',                                                                     // 获取签到用户是否有可领取的礼包 接口
                //'welfareLayerData': 'vip::/benefit/getPop',                                                                 // 获取签到用户会员日弹层数据 接口
                //'welfareDayData': 'vip::/benefit/getBenefitDay',                                                            // 获取签到用户会员日数据 接口
                'footprintData': 'vip::/footprint/getInfo',                                                                 // 获取签到用户足迹数据 接口
                'scoreData': 'vip::/vip/getDepletionScore',                                                                 // 获取签到用户美丽值数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=club_member&cid=15799',                   // 获取页面通用后台配置数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=club_member&cid=15219',                 // 获取页面通用后台配置数据 接口
                'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15991'      // 获取页面通用后台配置数据 接口
                //'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15229'    // 获取页面通用后台配置数据 接口
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

            if (!data.signData || !data.recordData || !data.percentData || !data.giftData || !data.footprintData || !data.scoreData || !data.pageData || !data.giftPageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if ((data.signData.error_code == 0) && (data.recordData.error_code == 0) && (data.percentData.error_code == 0) && (data.giftData.error_code == 0) && (data.footprintData.error_code == 0) && (data.scoreData.error_code == 0)) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            data.isIos = platform;
            data.serverDate = new Date();
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = (data.pageData && data.pageData.title) ? data.pageData.title : '会员福利';

            data._CSSLinks = ['member/club'];
            self.render('member/club.html', data);
        });
    },

    subvenue: function(){
        var self = this,
            isNormalGetData = 0,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            aid = self.readData('aid', self.req.__get, 2678),
            cid = self.readData('cid', self.req.__get, 15237),
            mid = self.readData('mid', self.req.__get, 0),
            nid = self.readData('nid', self.req.__get, 0),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'signData': 'vip::/sign/getInfo',                                                                                // 获取签到用户信息 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=subvenue_member&cid=' + cid                    // 获取页面通用后台配置数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (!data.signData || !data.pageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if (data.signData.error_code == 0) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            data.aid = aid;
            data.mid = mid;
            data.nid = nid;
            data.serverDate = new Date();
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = (data.pageData && data.pageData.title) ? data.pageData.title : '会员阶梯价分会场';

            data._CSSLinks = ['member/subvenue'];
            self.render('member/subvenue.html', data);
        });
    },

    footprint: function(){
        var self = this,
            isNormalGetData = 0,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'footprintData': 'vip::/footprint/getInfo',                                                                 // 获取签到用户足迹数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=footprint_member&cid=16561',              // 获取页面通用后台配置数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=footprint_member&cid=15241',            // 获取页面通用后台配置数据 接口
                'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15991'      // 获取页面通用后台配置数据 接口
                //'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15229'    // 获取页面通用后台配置数据 接口
            };

        //share(php);

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (!data.footprintData || !data.pageData || !data.giftPageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if (data.footprintData.error_code == 0) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            setShare(data, this, wapMod);

            data.serverDate = new Date();
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = (data.pageData && data.pageData.title) ? data.pageData.title : '会员足迹';

            data._CSSLinks = ['member/footprint'];
            self.render('member/footprint.html', data);
        });
    },

    footprint_share: function(){
        var self = this,
            isNormalGetData = 0,
            wapMod = base.loadModel('wap/tools.js'),
            key = self.readData('key', self.req.__get, ''),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'footprintData': 'vip::/footprint/getInfo?key=' + key,                                                      // 获取签到用户足迹数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=footprint_member&cid=16561',              // 获取页面通用后台配置数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=footprint_member&cid=15241',            // 获取页面通用后台配置数据 接口
                'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15991'      // 获取页面通用后台配置数据 接口
                //'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15229'    // 获取页面通用后台配置数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (!data.footprintData || !data.pageData || !data.giftPageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if (data.footprintData.error_code == 0) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            var userKey = '',
                userGmv = 0,
                userLevel = 0;

            if (data.footprintData && data.footprintData.data) {
                var memberFootprintData = data.footprintData.data;

                userKey = memberFootprintData.key || key;
                userGmv = memberFootprintData.gmv_total || 0;
                userLevel = memberFootprintData.user_grade || 0;
            }

            var shareData = {
                'title': '【美丽说会员足迹】身为V' + userLevel + '会员的我已消费' + userGmv + '元~有人能超越我么！',
                'desc': '还有我的美丽说购物小秘密哦~快来看看你的足迹~',
                'imgUrl': 'http://d02.res.meilishuo.net/pic/_o/51/a1/305352190adef3a33c153cf33157_200_200.cj.png',
                'link': 'http://' + self.req.headers.host + '/member/footprint_share/?key=' + userKey
            };

            data.shareData = shareData;
            data.serverDate = new Date();
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = '会员足迹';

            data._CSSLinks = ['member/footprint_share'];
            self.render('member/footprint_share.html', data);
        });
    },

    beans_paradise: function(){
        var self = this,
            platform = false,
            isNormalGetData = 0,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'signData': 'vip::/sign/getInfo',                                                                           // 获取签到用户信息 接口
                'taskData': 'vip::/task/getMenu',                                                                           // 获取签到用户做任务数据 接口
                'percentData': 'vip::/vip/getPercent',                                                                      // 获取签到用户超过％数据 接口
                'calendarData': 'vip::/sign/getCalendar',                                                                   // 获取签到日历数据 接口
                //'upgradeData': 'vip::/vip/getFirstUpgrade',                                                               // 获取签到用户是否升级数据 接口
                'beansData': 'vip::/beans/getBeansInfo?is_index=index',                                                     // 获取签到用户美美豆数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=beans_paradise_member&cid=15905',         // 获取页面通用后台配置数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=beans_paradise_member&cid=15225',       // 获取页面通用后台配置数据 接口
                'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15991'      // 获取页面通用后台配置数据 接口
                //'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15229'    // 获取页面通用后台配置数据 接口
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

            if (!data.signData || !data.taskData || !data.percentData || !data.calendarData || !data.beansData || !data.pageData || !data.giftPageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if ((data.signData.error_code == 0) && (data.taskData.error_code == 0) && (data.percentData.error_code == 0) && (data.calendarData.error_code == 0) && (data.beansData.error_code == 0)) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            var serverDate = new Date(),
                code = data.signData.error_code;

            if (code == 400402) {
                data.pageTitle = '内测提示';
                data._CSSLinks = ['member/niece_tips'];
                self.render('member/niece_tips.html', data);
            } else {
                data.isIos = platform;
                data.serverDate = serverDate;
                data.serverDay = serverDate.getDay();
                data.isNormalGetData = isNormalGetData;
                data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
                data.isNewest = wapMod.isNewest(self.req, '6.9.1');
                data.pageTitle = (data.pageData && data.pageData.title) ? data.pageData.title : '美美豆乐园';
                //data.isUpgrade = (data.upgradeData.error_code == 0) ? (data.upgradeData.data.is_upgrade || 0) : 0;
                data.isUpgrade = 0;

                data._CSSLinks = ['member/beans_paradise'];
                self.render('member/beans_paradise.html', data);
            }
        });
    },

    task_center: function(){
        var self = this,
            isNormalGetData = 0,
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'bannerData': 'vip::/task/getTopInfo',                                                                           // 获取任务中心页面顶部banner数据 接口
                'goodsData': 'vip::/task/getOverviewList'                                                                        // 获取任务中心任务列表数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (!data.goodsData || !data.bannerData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if ((data.goodsData.error_code == 0) && (data.bannerData.error_code == 0)) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            data.serverDate = new Date();
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = '做任务赚美美豆';

            data._CSSLinks = ['member/task_center'];
            self.render('member/task_center.html', data);
        });
    },

    task_list: function(){
        var self = this,
            isNormalGetData = 0,
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1'
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            /*if (!data.pageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if (data.signData.error_code == 0) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }*/

            data.serverDate = new Date();
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = '评价商品赚美美豆';

            data._CSSLinks = ['member/task_list'];
            self.render('member/task_list.html', data);
        });
    },

    welfare_day: function(){
        var self = this,
            isNormalGetData = 0,
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'cardsData': 'vip::/benefit/getStickNum',                                                               // 获取会员抽礼卡数据 接口
                //'goodsData': 'vip::/benefit/getBenefitGoods',                                                         // 获取会员福利日免费商品数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=welfare_day_member&cid=17271'         // 获取页面通用后台配置数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=welfare_day_member&cid=17255'       // 获取页面通用后台配置数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (!data.pageData || !data.cardsData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if (data.cardsData.error_code == 0) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            var shareUrl = 'http://' + self.req.headers.host + 'member/welfare_day/?frm=share_page',
                params = {
                    'title': {
                        'weixin': '美丽说周五会员福利日V1-V4 会员福利大放送啦',
                        'weixin_timeline': '我正在美丽说周五会员福利日抽兑免费商品，你也快去试试吧',
                        'default': '美丽说周五会员福利日V1-V4 会员福利大放送啦'
                    },
                    'text': {
                        'weixin': '千件美物任你选，快来人品爆发一下吧！',
                        'weixin_timeline': '',
                        'default': '千件美物任你选，快来人品爆发一下吧！'
                    },
                    'pic': 'http://d03.res.meilishuo.net/pic/_o/1d/ff/8ab3f6c486e3ca416280a4fc7d5f_200_200.cj.jpg',
                    'url': shareUrl 
                },
                shareData = {
                    'title': '美丽说周五会员福利日V1-V4 会员福利大放送啦',
                    'desc': '千件美物任你选，快来人品爆发一下吧！',
                    'imgUrl': 'http://d03.res.meilishuo.net/pic/_o/1d/ff/8ab3f6c486e3ca416280a4fc7d5f_200_200.cj.jpg',
                    'link': shareUrl
                };

            // 分享类型
            if (wapMod.isNewest(self.req, '6.6.0')) {
                data.appShare = true;
                data.params = params;
            } else {
                data.appShare = false;
                data.share = wapMod.shareTo(self.req, params, ['weixin_timeline', 'weixin']);
            }

            data.shareData = shareData;
            data.serverDate = new Date();
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = (data.pageData && data.pageData.title) ? data.pageData.title : '评价商品赚美美豆';

            data._CSSLinks = ['member/welfare_day'];
            self.render('member/welfare_day.html', data);
        });
    },

    welfare_goods_details: function(){
        var self = this,
            platform = false,
            isNormalGetData = 0,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            tid = self.readData('tid', self.req.__get, ''),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'cardsData': 'vip::/benefit/getStickNum',                                                               // 获取会员抽礼卡数据 接口
                'goodsData': 'vip::/benefit/getGoodsInfo?tid=' + tid,                                                   // 获取美物详情数据 接口
                'prizeData': 'vip::/benefit/getAwardList?twitter_id=' + tid                                             // 获取中奖用户数据 接口
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

            if (!data.cardsData || !data.goodsData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if ((data.cardsData.error_code == 0) && (data.goodsData.error_code == 0)) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            data.isIos = platform;
            data.serverDate = new Date();
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = '美物详情';

            data._CSSLinks = ['member/welfare_goods_details'];
            self.render('member/welfare_goods_details.html', data);
        });
    },

    gift_card_records: function(){
        var self = this,
            isNormalGetData = 0,
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1'
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            /*if (!data.pageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if (data.cardsData.error_code == 0) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }*/

            data.serverDate = new Date();
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = '我的抽礼卡记录';

            data._CSSLinks = ['member/gift_card_records'];
            self.render('member/gift_card_records.html', data);
        });
    },

    apply_info_confirm: function(){
        var self = this,
            platform = false,
            isNormalGetData = 0,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            tid = self.readData('tid', self.req.__get, ''),
            date = self.readData('date', self.req.__get, ''),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'contactData': 'vip::/benefit/getUserAddress',                                                           // 获取用户联系方式数据 接口
                'goodsData': '/share/share_main?twitter_id=' + tid                                                       // 获取商品数据 接口
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

            if (!data.contactData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if (data.contactData.error_code == 0) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            data.isAndroid = platform;
            data.serverDate = new Date();
            data.goodsTwitterId = tid;
            data.goodsActivityDate = date;
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.isNewest = wapMod.isNewest(self.req, '6.9.1');
            data.pageTitle = '信息确认';

            data._CSSLinks = ['member/apply_info_confirm'];
            self.render('member/apply_info_confirm.html', data);
        });
    },

    new_customer: function(){
        var self = this,
            platform = false,
            isNormalGetData = 0,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),
            r = self.readData('r', self.req.__get,''),
            pid = self.readData('pid', self.req.__get, 7006),
            cid = self.readData('cid', self.req.__get, 16301),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'signData': 'vip::/sign/getInfo',                                                                           // 获取签到用户信息 接口
                'percentData': 'vip::/vip/getPercent',                                                                      // 获取签到用户超过％数据 接口
                //'upgradeData': 'vip::/vip/getFirstUpgrade',                                                               // 获取签到用户是否升级数据 接口
                'beansData': 'vip::/beans/getBeansInfo?is_index=index',                                                     // 获取签到用户美美豆数据 接口
                'pageData': 'promotion::/activity/page?id=' + cid,
                'navData': 'promotion::/hotel/hotelShop?id=promotion_subvenue&cid=' + cid,                                  // 获取大促疯狂星期五数据 接口
                'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15991'      // 获取页面通用后台配置数据 接口
                //'giftPageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15229'    // 获取页面通用后台配置数据 接口
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

            if (!data.signData || !data.percentData || !data.beansData || !data.giftPageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            } else {
                if ((data.signData.error_code == 0) && (data.percentData.error_code == 0) && (data.beansData.error_code == 0)) {
                    isNormalGetData = 0;
                } else {
                    isNormalGetData = 1;
                }
            }

            data.r = r;
            data.id = 795;
            data.pid = pid;
            data.cid = cid;
            data.isIos = platform;
            data.serverDate = new Date();
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.isNewest = wapMod.isNewest(self.req, '6.9.1');
            data.category = data.pageData.data.category || '';
            data.pageTitle = data.pageData.data.title || '美美豆乐园';
            //data.isUpgrade = (data.upgradeData.error_code == 0) ? (data.upgradeData.data.is_upgrade || 0) : 0;
            data.isUpgrade = 0;

            data._CSSLinks = ['member/new_customer'];
            self.render('member/new_customer.html', data);
        });
    },

    promotion_gift: function(){
        var self = this,
            isNormalGetData = 0,
            ua = self.req.headers['user-agent'],
            wapMod = base.loadModel('wap/tools.js'),

            php = {
                'signData': 'vip::/sign/getInfo',                                                                           // 获取签到用户信息 接口
                'giftData': 'vip::/gift/getIsHaveGift',                                                                     // 获取签到用户是否有可领取的礼包 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15991'          // 获取页面通用后台配置数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=promotion_gift_member&cid=15229'        // 获取页面通用后台配置数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            if (!data.pageData) {
                return self.errorPage();
            }

            data.serverDate = new Date();
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = (data.pageData && data.pageData.title) ? data.pageData.title : '会员晋级礼包';

            data._CSSLinks = ['member/promotion_gift'];
            self.render('member/promotion_gift.html', data);
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
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=turntable_member&cid=10499'  // 获取大转盘抽奖奖品（谢谢参与）数据 接口
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

    nine_lottery: function(){
        var self = this,
            wapMod = base.loadModel('wap/tools.js'),
            php = {
                'connect_weixin': '/connect/weixin?type=1',
                'getCoupons': 'vip::/exchange/getCoupons',                                                       // 获取优惠券数据 接口
                'getUserBeans': 'vip::/award/getUserInfo?act_code=beans_dial&mode=1',                            // 获取用户美美豆数据 接口
                'getAwardData': 'vip::/award/getActivityInfo?act_code=beans_dial',                               // 获取大转盘抽奖奖品数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=squared_draw&cid=14015',
                'prizeList': 'vip::/award/getScrollList?act_code=beans_dial&mock=1&code=squared_draw&cid=14015',
                'rule': '/customactivity/CustomActivity_common_tool_single?id=rule_turntable_member&cid=14161'
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            var weixinBrowser = data.os.weixinBrowser;

            if (weixinBrowser) {
                connectWX(self, data);
            }

            if (!data.pageData || !data.getCoupons || !data.getUserBeans || !data.getAwardData || !data.prizeList) {
                return self.errorPage();
            }

            var code = data.getUserBeans.error_code;  

            if (code == 400402) {
                data.pageTitle = '内测提示';
                data._CSSLinks = ['member/niece_tips'];
                self.render('member/niece_tips.html', data);
            } else {
                data.use_rem_screen = true;
                data.isNewest = wapMod.isNewest(self.req, '6.6.1');
                data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
                data.pageTitle = data.getAwardData.data.act_name || '美美豆抽大奖';

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

                data._CSSLinks = ['member/nine_lottery'];
                self.render('member/nine_lottery.html', data);
            }
        });
    },

    nine_lottery_v2: function(){
        // this.debugSnake({target : 'vip.mlapi.chunliu.rdlab.meilishuo.com'});
        var isNewCustomer = this.readData('isNewCustomer' , this.req.__get , 0);
        var self = this,
            wapMod = base.loadModel('wap/tools.js'),
            php = {
                'connect_weixin': '/connect/weixin?type=1',
                'getCoupons': 'vip::/exchange/getCoupons',                                                          // 获取优惠券数据 接口
                'getUserBeans': 'vip::/wheel/getUserInfo?mode=1&isNewCustomer='+ isNewCustomer,                                                   // /wheel/getUserInfo
                'getAwardData': 'vip::/wheel/getActivityInfo?mode=1',                                               // 获取大转盘抽奖奖品数据 接口  /wheel/getActivityInfo
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=squared_draw&cid=14015',
                'prizeList': 'vip::/wheel/getScrollList?mock=1&code=turntable_member&cid=11145',                    // /wheel/getScrollList
                'rule': '/customactivity/CustomActivity_common_tool_single?id=rule_turntable_member&cid=14161',
                'getPreviewAwards' : 'vip::/wheel/getPreviewAwards'
            };
        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            var weixinBrowser = data.os.weixinBrowser;

            if (weixinBrowser) {
                connectWX(self, data);
            }

            // if (!data.pageData || !data.getCoupons || !data.getUserBeans || !data.getAwardData || !data.prizeList || !data.getPreviewAwards) {
            //     return self.errorPage();
            // }

            var code = data.getUserBeans.error_code;  

            if (code == 400402) {
                data.pageTitle = '内测提示';
                data._CSSLinks = ['member/niece_tips'];
                self.render('member/niece_tips.html', data);
            } else {
                data.use_rem_screen = true;
                data.isNewest = wapMod.isNewest(self.req, '6.6.1');
                data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
                data.pageTitle = '美美豆抽大奖';
                data.isNewCustomer = isNewCustomer;

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

                data._CSSLinks = ['member/nine_lottery_v2'];
                self.render('member/nine_lottery_v2.html', data);
            }
        });
    },

    turntable_rule: function(){
        var self = this,
            php = {
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=rule_turntable_member&cid=11307'       // 大转盘抽奖活动规则数据 接口
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
                'beansData': 'vip::/beans/getBeansInfo',                            // 获取wap用户美美豆数据 接口
                'userAmount': 'doota::/coin/get_summary_beans',                     // 获取wap用户美美豆 接口
                'beansList': 'doota::/coin/get_list_beans?page=1&count=5'           // 获取wap用户美美豆收支明细 接口
            };
        } else if (args == 'beauty') {
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'beautyInfo': 'vip::/vip/getInfo',                                 // 获取wap用户信息（等级、美丽值）接口
                'beautyList': 'vip::/vip/getBeautyDetail',                         // 获取wap用户美丽值收支明细 接口
                'scoreData': 'vip::/vip/getDepletionScore',                        // 获取wap用户美丽值数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=beauty_detail_member&cid=15709'       // 美丽值明细页面配置 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=beauty_detail_member&cid=15209'     // 美丽值明细页面配置 接口
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

                pageTitle =  (data.pageData && data.pageData.title) ? data.pageData.title : '我的美丽值明细';
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
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=beans_caption_member&cid=12461'           // 会员中心美美豆数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=beans_caption_member&cid=11163'         // 会员中心美美豆数据 接口
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

    activity_caption: function(){
        var self = this,
            php = {
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=beans_paradise_member&cid=15905'          // 获取页面通用后台配置数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=beans_paradise_member&cid=15225'        // 获取页面通用后台配置数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            if (!data.pageData) {
                return self.errorPage();
            }

            data.pageTitle = '活动公告';

            data._CSSLinks = ['member/activity_caption'];
            self.render('member/activity_caption.html', data);
        });
    },

    ransom: function(){
        //this.debugSnake({'target': 'lab2'});
        var self = this,
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=exchange_member&cid=11017'               // 获取美美豆换好礼商品数据 接口
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

            data._CSSLinks = ['member/ransom2'];
            self.render('member/ransom2.html', data);
        });
    },

    trade: function(){
        //this.debugSnake({'target': 'lab2'});
        var self = this,
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=trade_member&cid=11019'               // 获取会员半价购商品数据 接口
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
        /*var self = this,
            wapMod = base.loadModel('wap/tools.js'),
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1,
            php = {
                //'connect_weixin': '/connect/weixin?type=1',
                'userInfoData': 'vip::/vip/getInfo',                                                                    // 获取签到用户数据 接口
                'percentData': 'vip::/vip/getPercent',                                                                  // 获取签到用户超过％数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=rule_interests_member&cid=11309'      // 如何提升美丽值数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=rule_interests_member&cid=10503'    // 如何提升美丽值数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            if (weixinBrowser) {
                connectWX(self, data);
            }

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
        });*/

        var self = this,
            wapMod = base.loadModel('wap/tools.js'),
            php = {
                'userInfoData': 'vip::/vip/getInfo',                                                                    // 获取签到用户数据 接口
                'percentData': 'vip::/vip/getPercent',                                                                  // 获取签到用户超过％数据 接口
                'pageData': '/customactivity/CustomActivity_common_tool_single?id=interests_member&cid=15721'           // 获取会员特权配置数据 接口
                //'pageData': '/customactivity/CustomActivity_common_tool_single?id=interests_member&cid=15211'         // 获取会员特权配置数据 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            if (!data.pageData || !data.userInfoData || !data.percentData) {
                return self.errorPage();
            }

            data.isNewest = wapMod.isNewest(self.req, '6.8.0');
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.serverDate = new Date();
            data.pageTitle = (data.pageData && data.pageData.title) ? data.pageData.title : '会员特权';
            data._CSSLinks = ['member/interests2'];
            self.render('member/interests2.html', data);
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
    },

    bind_mobile: function(args){
        var self = this,
            php = {
                'getUserInfo': 'vip::/improve/getInfo'                                                                   // 获取用户信息 接口
            };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            var pageTitle = (args == 'original') ? '验证原手机号' : '新手机号';

            data.pageTitle = pageTitle;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;

            data._CSSLinks = ['member/bind_mobile'];

            if (args == 'original') {
                self.render('member/original_mobile.html', data);
            } else {
                self.render('member/new_mobile.html', data);
            }
        });
    },

    complement_info: function(){
        var self = this,
            platform = false,
            ua = self.req.headers['user-agent'],
            php = {
                'getUserInfo': 'vip::/improve/getInfo'                                                                   // 获取用户信息 接口
            };

        if (/(Android)/i.test(ua)) {
            platform = true;
        }

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            data.isAndroid = platform;
            data.pageTitle = '完善信息奖励美美豆';
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.step = self.readData('step', self.req.__get, 0) || 0;

            data._CSSLinks = ['member/complement_info'];
            self.render('member/complement_info.html', data);
        });
    },

    beans_coupon: function(){
        //this.debugSnake({'target': 'devlab1'});
        var id = '',
            cid = '',
            self = this,
            isNormalGetData = 0,
            serverDate = new Date(),
            serverTime = serverDate.getTime(),
            promotionStartTime = new Date(2015,11,08,10,00,00).getTime(),
            promotionEndTime = new Date(2015,11,14,00,00,00).getTime();
            //weixinBrowser = self.req.headers['user-agent'].indexOf('MicroMessenger') > -1;

        if ((serverTime >= promotionStartTime) && (serverTime < promotionEndTime)) {
            id = 'beans_coupon_promotion';
            cid = 15835;
            //cid = 15221;
        } else {
            id = 'beans_coupon_member';
            cid = 14661;
        }

        var php = {
            //'connect_weixin': '/connect/weixin?type=1',
            'signData': 'vip::/sign/getInfo',                                                                     // 获取签到用户信息 接口
            'pageData': '/customactivity/CustomActivity_common_tool_single?id=' + id + '&cid=' + cid              // 获取用户中心商品数据 接口
        };

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data){
            /*if (weixinBrowser) {
                connectWX(self, data);
            }*/

            if (!data.signData || !data.pageData) {
                //return self.errorPage();
                isNormalGetData = -1;
            }

            data.serverDate = serverDate;
            data.isNormalGetData = isNormalGetData;
            data.isLogin = (data.userInfo.user_id == 0) ? 0 : 1;
            data.pageTitle = (data.pageData && data.pageData.title) ? data.pageData.title : '美美豆每日抢券';

            if ((serverTime >= promotionStartTime) && (serverTime < promotionEndTime)) {
                data._CSSLinks = ['member/beans_coupon_promotion'];
                self.render('member/beans_coupon_promotion.html', data);
            } else {
                data._CSSLinks = ['member/beans_coupon'];
                self.render('member/beans_coupon.html', data);
            }
        });
    }
}

var connectWX = function(mSelf, data){
    if (data.connect_weixin && data.connect_weixin.redirect) {
        return mSelf.redirectTo(data.connect_weixin.redirect, true);
    }
};

// 分享信息
function share(php){
    php['connect_weixin'] = '/connect/weixin?type=0';
    // php['share_info'] = '/customactivity/CustomActivity_common_tool_single?id=zulily_index';
}

function setShare(data, self, wapMod){
    /*var weixinBrowser = data.os.weixinBrowser;

    if (weixinBrowser) {
        connectWX(self, data);
    }*/

    var userKey = '',
        userGmv = 0,
        userLevel = 0;

    if (data.footprintData && data.footprintData.data) {
        var memberFootprintData = data.footprintData.data;

        userKey = memberFootprintData.key || '';
        userGmv = memberFootprintData.gmv_total || 0;
        userLevel = memberFootprintData.user_grade || 0;
    }

    var params = {
        'title': '【美丽说会员足迹】身为V' + userLevel + '会员的我已消费' + userGmv + '元~有人能超越我么！',
        'text': {
            'weixin': '还有我的美丽说购物小秘密哦~快来看看你的足迹~',
            'weixin_timeline': '',
            'default': '还有我的美丽说购物小秘密哦~快来看看你的足迹~'
        },
        'pic': 'http://d02.res.meilishuo.net/pic/_o/51/a1/305352190adef3a33c153cf33157_200_200.cj.png',
        'url': 'http://' + self.req.headers.host + '/member/footprint_share/?key=' + userKey 
    };

    // 分享类型
    if (wapMod.isNewest(self.req, '6.6.0')) {
        data.appShare = true;
        data.params = params;
    } else {
        data.appShare = false;
        data.share = wapMod.shareTo(self.req, params, ['weixin_timeline', 'weixin']);
    }
}

// 获取R参数
function getR(php){
    for (var i in php) {
        php[i] += ((php[i].indexOf('?') != -1) ? '&__get_r=1' : '?__get_r=1');

        // 不会把浏览器的参数带到PHP接口里面
        if (php[i].indexOf('&$') > 0) {
            php[i] = php[i].replace('&$', '') + '&$';
        }
    }

    php.common_r = '/statistics/referer?__get_r=1';
}

// 开启并设置R
function setR(data, php){
    data.XR = true;

    for (var i in php) {
        data[i + '_XR'] = (data[i] && data[i].r) || '';
    }
}

exports.__create = controller.__create(member, controlFns);