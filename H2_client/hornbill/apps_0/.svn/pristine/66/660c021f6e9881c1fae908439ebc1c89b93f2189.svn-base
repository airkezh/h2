/**
 * @name: 群圈
 * @author: zhidongsun
 */
function circle() {
	return this;
}

var controlFns = {
    index: function( action ) {
        var method = this[ action ]
        method.call( this )
	},

    create: function() {
        // this.debugSnake({target:"lab1"})
        var php = {
            'mycircles': '/circle/get_my_admin_list',
            'services': '/circle/is_shop_service',
            'myshop': '/circle/get_shop_info'
        }

        this.setMDefault(php)
        this.bridgeMuch(php)
        this.listenOver(function(data) {
            data.onlyShowGoTop = true;
            data.pageTitle = '开通群圈'
            data._CSSLinks = [ 'circle/create' ]
            this.render( 'circle/create.html', data )
        })
    },

    create_shop: function() {
        //this.debugSnake({target:"lab1"})
        var req = this.req,
            res = this.res,
            php = {
                'mycircles': '/circle/get_my_admin_list',
                'myshop': '/circle/get_shop_info'
            },
            wapMod = base.loadModel( 'wap/tools.js' ),
            os     = wapMod.uaos( req, wapMod.getMobToken( req, res ) )

        this.setMDefault(php)
        this.bridgeMuch(php)
        this.listenOver(function(data) {
            data.mlsApp = os.mlsApp
            data.onlyShowGoTop = true
            data.pageTitle = '开通店铺'
            data._CSSLinks = [ 'circle/create_shop' ]
            this.render( 'circle/create_shop.html', data )
        })
    },

    list: function(params) {
        // this.debugSnake({target:"pmlab1"})
        var php = {
            'bannar' : '/circle/get_list_banners',
            'userInfo': '/customactivity/CustomActivity_wap_user_info'
        };

        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data) {
            data.page_type = params || 'all';
            data.onlyShowGoTop = true;
            data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
            data.pageTitle = '买手圈';
            data._CSSLinks = [ 'circle/list' ]
            data.paramR = this.req.__get.r;
            this.render( 'circle/list.html', data )
        })
    },

    intro: function() {
        var php = {
            'mycircles': '/circle/get_my_admin_list'
        };
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data) {
            data.onlyShowGoTop = true
            data._CSSLinks = [ 'circle/intro' ]
            this.render( 'circle/intro.html', data )
        })
    },

    success: function() {
        var php = {};
        var wapMod = base.loadModel('wap/tools.js');
        var os = wapMod.uaos(this.req, wapMod.getMobToken(this.req,this.res));
        var mlsApp = os.mlsApp;
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data) {
            data.mlsApp = mlsApp;
            data.onlyShowGoTop = true;
            data._CSSLinks = [ 'circle/success' ];
            this.render( 'circle/success.html', data )
        })
    },

    success2: function() {
        var php = {};
        var wapMod = base.loadModel('wap/tools.js');
        var os = wapMod.uaos(this.req, wapMod.getMobToken(this.req,this.res));
        var mlsApp = os.mlsApp;
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data) {
            data.mlsApp = mlsApp;
            data.onlyShowGoTop = true;
            data._CSSLinks = [ 'circle/success' ];
            this.render( 'circle/success2.html', data )
        })
    },
    share: function(){
        var circle_id = this.req.__get.circle_id || 1;
        var mSelf = this;
        //var host = (this.req.headers && this.req.headers.host) || 'm.meilishuo.com';
        var php = {
            'cirInfo' : '/Circle/get_simple_info?circle_id=' + circle_id 
        };
        var wapMod = base.loadModel('wap/tools.js');
        var shareURL = 'http://m.meilishuo.com/circle/opencircle/' + circle_id;
        mSelf.setMDefault(php);
        mSelf.bridgeMuch(php);
        mSelf.listenOver(function(data) {
            if(data.userInfo.user_id == 0) 
                return mSelf.redirectTo('meilishuo://login.meilishuo/' ,true);
            var shareTitle = '我在美丽说加入了' + data.cirInfo.data.name+ '买手圈，邀请你一起来玩儿哦～';
            if(data.userInfo.user_id == data.cirInfo.data.admin.user_id){
                shareTitle = '大家好，我在美丽说开通了' + data.cirInfo.data.name + '圈子，邀请大家一起来边聊边逛';
            }
            /*share*/
            var params = {
                'title' : shareTitle,
                'text' : '',
                'pic' : data.cirInfo.data.small_img,
                'url' : shareURL
            };
            data.share = wapMod.shareTo(this.req , params,['weixin','weixin_timeline']);
            // console.log("share数据是"+data.share);
            data._CSSLinks = [ 'circle/share' ];
            this.render( 'circle/share.html', data);
        })
    },
    opencircle: function(circle_id){
        var circle_id = circle_id || 1;
        this.redirectTo( 'http://circle.meilishuo.com/circle/wapcircle?circle_id=' + circle_id )
    },
    guide: function() {
        var php = {};
        var wapMod = base.loadModel('wap/tools.js');
        var os = wapMod.uaos(this.req, wapMod.getMobToken(this.req,this.res));
        var mlsApp = os.mlsApp;
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data) {
            data.mlsApp = mlsApp;
            data.onlyShowGoTop = true
            data._CSSLinks = [ 'circle/guide' ]
            this.render( 'circle/guide.html', data )
        })
    },

    test: function(params) {
        // this.debugSnake({target:"pmlab1"})
        var php = {
            'bannar' : '/circle/get_list_banners',
            'userInfo': '/customactivity/CustomActivity_wap_user_info'
        };

        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data) {
            data.page_type = params || 'all';
            data.onlyShowGoTop = true;
            data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
            data.pageTitle = '买手圈';
            data._CSSLinks = [ 'circle/list' ]
            data.paramR = this.req.__get.r;
            this.render( 'circle/test.html', data )
        })
    }

}

exports.__create = controller.__create( circle, controlFns )
