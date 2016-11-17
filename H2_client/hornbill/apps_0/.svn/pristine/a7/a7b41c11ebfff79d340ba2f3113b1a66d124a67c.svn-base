/**
 * @fileoverview 新人特供精选
 * @requires zepto
 * @author kehuang@meilishuo.com
 * @date 2015-01-22
 */

function special_choice(){
    return this;
}

var cookie = require(config.path.base + 'cookie.js');
var controlFns = {
    index : function(){
        //this.debugSnake({'target': 'devlab6'});

        var self = this,
            php = {
                'recStatusData': '/newcomer/getRecStatus',                      // 获取新人特供相关状态信息（如是否首次访问等） 接口
                'recGoodsData': '/newcomer/getRecGoods?page=1&size=20',         // 获取新客推荐商品 接口
                'mobUserInfo': '/customactivity/CustomActivity_wap_user_info'   // 获取wap用户信息 接口
            },
            wapMod = base.loadModel('wap/tools.js'),
            os = wapMod.uaos(this.req, wapMod.getMobToken(this.req, this.res)),
            mlsApp = os.mlsApp;

        self.setMDefault(php);
        self.bridgeMuch(php);

        self.listenOver(function(data) {
            data.mlsApp = mlsApp;
            data.isNewest = wapMod.isNewest(self.req, '4.1.1');
            data.isLogin = (data.mobUserInfo.data.user_id == 0) ? 0 : 1;
            data.isGuide = (data.mobUserInfo.data.load_status == 0) ? 1 : 0;
            data.serverDate = new Date();
            data.curUserRegTime = Date.parse(data.mobUserInfo.data.ctime) || data.serverDate.getTime();
            data.pageTitle = '新人特供精选';
            data._CSSLinks = ['activity/special_choice'];
            self.render('activity/special_choice.html', data);
        });
    }
}

exports.__create = controller.__create(special_choice, controlFns);
