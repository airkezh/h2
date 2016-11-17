/**
 * @fileoverview 补签活动 － 每日签到
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2014-09-09
 */

function signPatch() {
    return this;
}

var cookie = require(config.path.base + 'cookie.js');
var controlFns = {
    index: function() {
        //this.debugSnake({target: 'lab2'});
        var self = this,
            php = {
                'signUserInfo': '/sign/getUserInfo',                            // 获取用户签到信息 接口
                'signDateInfo': '/sign/getSignedDates',                         // 获取用户签到日期信息 接口
                'mobUserInfo': '/customactivity/CustomActivity_wap_user_info'   // 获取wap用户信息 接口
            },
            wapMod = base.loadModel('wap/tools.js'),
            cookieHandle = cookie.getHandler(self.req, self.res);

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data) {
            data.isNewest = wapMod.isNewest(self.req, '5.5.0');
            data.isLogin = (data.mobUserInfo.data.user_id == 0) ? 0 : 1;
            data.serverDate = new Date();
            data.pageTitle = '每日签到补签活动';

            if (!data.isLogin) {
                var signDateInfo = {
                        'code': 0,
                        'message': '',
                        'data': {
                            'signed': [],
                            'future': []
                        }
                    },
                    signUserInfo = {
                        'code': 0,
                        'message': '',
                        'data': {
                            'status': 0,
                            'temp': 0,
                            'firstSignDate': '',
                            'lastSignDate': '',
                            'initDate': '',
                            'coin': 0,
                            'upgrade': {
                                'coin': 0
                            },
                            'patch': {
                                'chance': 0,
                                'spend': 0,
                                'gain': 0,
                                'missing': ''
                            }
                        }
                    };

                data.signDateInfo = signDateInfo;
                data.signUserInfo = signUserInfo;
            }

            // userSignStatus: 签到状态（0：今日未签到；1：今日已签到；-1：昨天漏签猪死了）
            data.userSignStatus = data.signUserInfo.data.status || 0;

            data._CSSLinks = ['activity/signPatch2'];
            self.render('activity/signPatch2.html', data);
        });
    }
};

exports.__create = controller.__create(signPatch, controlFns);