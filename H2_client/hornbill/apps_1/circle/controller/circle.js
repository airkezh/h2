/**
 * @name: 群圈
 * @author: zhidongsun
 */
function circle() {
    return this;
}

var controlFns   = {
    index: function( action ) {
        var method = this[ action ]
        method.call( this )
    },

    create: function() {
        //this.debugSnake({target:"lab1"})
        var php = {
            'mycircles': '/circle/get_my_admin_list',
            'services': '/circle/is_shop_service',
            'myshop': '/circle/get_shop_info'
        }

        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.onlyShowGoTop = true;
            data.pageTitle     = '开通群圈'
            data._CSSLinks     = [ 'create' ]
            this.render( 'create.html', data )
        } )
    },
    create_group: function() {
        var php    = {};
        this.bindDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.onlyShowGoTop = true;
            data.pageTitle     = '创建群';
            data._CSSLinks     = [ 'create_group' ];
            this.render( 'create_group.html', data );
        } )

    },

    create_shop: function() {
        //this.debugSnake({target:"lab1"})
        var req    = this.req,
            res    = this.res,
            php    = {
                'mycircles': '/circle/get_my_admin_list',
                'myshop': '/circle/get_shop_info'
            },
            wapMod = this.loadModel( 'tools.js' ),
            os     = wapMod.uaos( req, wapMod.getMobToken( req, res ) )

        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.mlsApp        = os.mlsApp
            data.onlyShowGoTop = true
            data.pageTitle     = '开通店铺'
            data._CSSLinks     = [ 'create_shop' ]
            this.render( 'create_shop.html', data )
        } )
    },

    list: function( params ) {
        var php = {
            'bannar': '/circle/get_list_banners',
            'userInfo': '/customactivity/CustomActivity_wap_user_info'
        };

        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.page_type     = params || 'hot';
            data.onlyShowGoTop = true;
            data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
            data.pageTitle = '买手圈';
            data._CSSLinks = [ 'list' ]
            this.render( 'list.html', data )
        } )
    },

    intro: function() {
        var php = {
            'mycircles': '/circle/get_my_admin_list'
        };
        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.onlyShowGoTop = true
            data._CSSLinks     = [ 'intro' ]
            this.render( 'intro.html', data )
        } )
    },

    success: function() {
        var php    = {};
        var wapMod = this.loadModel( 'tools.js' );
        var os     = wapMod.uaos( this.req, wapMod.getMobToken( this.req, this.res ) );
        var mlsApp = os.mlsApp;
        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.mlsApp        = mlsApp;
            data.onlyShowGoTop = true;
            data._CSSLinks     = [ 'success' ];
            this.render( 'success.html', data )
        } )
    },

    success2: function() {
        var php    = {};
        var wapMod = this.loadModel( 'tools.js' );
        var os     = wapMod.uaos( this.req, wapMod.getMobToken( this.req, this.res ) );
        var mlsApp = os.mlsApp;
        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.mlsApp        = mlsApp;
            data.onlyShowGoTop = true;
            data._CSSLinks     = [ 'success' ];
            this.render( 'success2.html', data )
        } )
    },
    share: function() {
        var circle_id = this.req.__get.circle_id || 1;
        var mSelf     = this;
        //var host = (this.req.headers && this.req.headers.host) || 'm.meilishuo.com';
        var php      = { 'cirInfo': '/Circle/get_simple_info?circle_id=' + circle_id };
        var wapMod   = this.loadModel( 'tools.js' );
        var shareURL = 'http://circle.meilishuo.com/circle/landing/?circle_id=' + circle_id;
        mSelf.setMDefault( php );
        mSelf.bridgeMuch( php );
        mSelf.listenOver( function( data ) {
            var shareTitle = '我在美丽说加入了' + data.cirInfo.data.name + '买手圈，邀请你一起来玩儿哦～';
            if ( data.userInfo.user_id == data.cirInfo.data.admin.user_id ) {
                shareTitle = '大家好，我在美丽说开通了' + data.cirInfo.data.name + '圈子，邀请大家一起来边聊边逛';
            }
            /*share*/
            var params     = {
                'title': shareTitle,
                'text': '',
                'pic': data.cirInfo.data.small_img,
                'url': shareURL
            };
            data.share     = wapMod.shareTo( this.req, params, [ 'weixin', 'weixin_timeline' ] );
            data._CSSLinks = [ 'share' ];
            this.render( 'share.html', data );
        } )
    },
    opencircle: function( circle_id ) {
        var circle_id = circle_id || 1;
        var php       = {};
        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.circle_id = circle_id;
            this.render( 'opencircle.html', data )
        } )
    },
    guide: function() {
        var php    = {};
        var wapMod = this.loadModel( 'tools.js' );
        var os     = wapMod.uaos( this.req, wapMod.getMobToken( this.req, this.res ) );
        var mlsApp = os.mlsApp;
        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.mlsApp        = mlsApp;
            data.onlyShowGoTop = true
            data._CSSLinks     = [ 'guide' ]
            this.render( 'guide.html', data )
        } )
    },

    /**
     * 群聊
     */
    chat: function() {
        var circleId = this.req.__get.circle_id,
            php      = {
                'circleInfo': '/circle/get_base_info?circle_id=' + circleId,
                'highlightNew': '/circle/get_highlight_new?circle_id=' + circleId,
                'userInfo': '/customactivity/CustomActivity_wap_user_info'
            }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.highlightNew  = data.highlightNew.highlight_new
            data.pageTitle     = data.circleInfo.data.name
            data.circleId      = circleId
            data.onlyShowGoTop = true
            data._CSSLinks     = [ 'chat' ]
            this.render( 'chat.html', data )
        } )
    },
    /* 跟 landing 一样，用于兼容 */
    wapcircle: function() {
        //this.debugSnake({target: 'pmlab1'});
        var circle_id = this.req.__get.circle_id || 1;
        var php       = {
            'cirInfo': '/Circle/get_simple_info?circle_id=' + circle_id,
            'users': '/circle/member_selected_list?circle_id=' + circle_id,
            'msgs': '/circle/richmsg_selectedtext_list?circle_id=' + circle_id
        };
        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.pageTitle = data.cirInfo.data.name;
            data._CSSLinks = [ 'landing', 'tagshow' ]
            this.render( 'landing.html', data )
        } )
    },
    landing: function() {
        //this.debugSnake({target: 'pmlab1'});
        var circle_id = this.req.__get.circle_id || 1;
        var php       = {
            'cirInfo': '/Circle/get_simple_info?circle_id=' + circle_id,
            'users': '/circle/member_selected_list?circle_id=' + circle_id,
            'msgs': '/circle/richmsg_selectedtext_list?circle_id=' + circle_id
        };
        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.pageTitle = data.cirInfo.data.name;
            data._CSSLinks = [ 'landing', 'tagshow' ]
            this.render( 'landing.html', data )
        } )
    },
    circle_highlight_list: function() {
        var circle_id = this.req.__get.circle_id || 1;
        var php       = {
            'cirInfo': '/Circle/get_simple_info?circle_id=' + circle_id,
            'banner': '/Circle/Get_highlight_list_banner'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = data.cirInfo.data.name || '美丽说'
            data.circle_id = circle_id
            data._CSSLinks = [ 'circle_list' ]
            this.render( 'circle_list.html', data )
        } )
    },
    textpic: function( tid ) {
        var wapMod = base.loadModel( 'wap/tools.js' )
        var mSelf  = this,
            page   = this.readData( 'page', this.req.__get, 0 );
        var tid    = tid || 1;

        var php = {
            'picInfo': '/richmessage/richmessage_detail?msg_id=' + tid,
            'cirInfo': '/circle/richmsg_circle_info?msg_id=' + tid,
            'circle_banner': '/circle/item_circle_banners'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = data.picInfo.msg_text;
            data._CSSLinks = [ 'textpic' ]
            this.render( 'textpic.html', data )
        } )
    },
    android_download: function() {
        var timeStamp = +new Date;
        this.redirectTo( 'http://i.meilishuo.net/css/images/mobile/weiquan/weiquan.apk?' + timeStamp );
    },
    circle_more: function() {
        var req       = this.req.__get;
        var cid       = req.cid;
        var type      = req.type;
        var pageTitle = decodeURIComponent( req.title )
        var php       = {}
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = pageTitle || '美丽说';
            data.cid       = cid;
            data.type      = type;
            data._CSSLinks = [ 'circle_more' ]
            this.render( 'circle_more.html', data )
        } )
    },

    tagshow: function() {
        var req       = this.req.__get;
        var circle_id = req.circle_id;
        var php       = {
            'cirInfo': '/Circle/get_simple_info?circle_id=' + circle_id,
            'users': '/circle/member_selected_list?circle_id=' + circle_id,
            'msgs': '/circle/richmsg_selectedtext_list?circle_id=' + circle_id
        };
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data._CSSLinks = [ 'tagshow' ]
            this.render( 'tagshow.html', data )
        } )
    }

}
exports.__create = controller.__create( circle, controlFns )
