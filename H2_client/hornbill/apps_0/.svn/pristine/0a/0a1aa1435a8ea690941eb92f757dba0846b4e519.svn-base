/**
 * @fileoverview 金币会场模版页
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-05-11
 */

function coin_venue_1505(){
    return this;
}

var cookie = require(config.path.base + 'cookie.js');

var controlFns = {
    index: function(){
        //this.debugSnake({'target': 'lab2'});
        var self = this,
            platform = false,
            ua = self.req.headers['user-agent'],
            cid = self.readData('cid', self.req.__get, 8777),
            pid = self.readData('pid', self.req.__get, ''),
            channel = self.readData('channel', self.req.__get, ''),
            locationUrl = 'http://' + this.req.headers.host + this.req.url,
            php = {
                'pageData': 'promotion::/hotel/hotelShop?id=promotion_subvenue&cid=' + cid
            };

        if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
            platform = true;
        }

        var param = channel || param;

        self.req.__get.channel = param;

        if (/(Android)/i.test(ua)) {
            php.apks = '/url/Package_get';
        }

        self.setMDefault(php);
        delete php.userInfo;
        delete php.log;
        self.bridgeMuch(php);

        self.listenOver(function(data){
            data.userInfo = {'avatar_c': '', 'nickname': '', 'user_id': 0};

            if (data.pageData.error_code == 0) {
                data.result = data.pageData.data;
            }

            data.pid = pid;
            data.cid = cid;
            data.isIphone = platform;
            data.serverDate = new Date();
            data.pageTitle = data.result.title || '金币0元购';
            data.pageUrl = locationUrl.substring(0, locationUrl.indexOf('?'));
            data.pageIndex = self.readData('pageIndex', self.req.__get, '') || 0;
            data._CSSLinks = ['activity/promotion/coin_venue_1505'];
            self.render('activity/promotion/coin_venue_1505.html', data);
        });
    }
}

exports.__create = controller.__create(coin_venue_1505, controlFns);
