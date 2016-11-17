function mainapp() {
    return this
}

var controlFns   = {
    'index': function() {
        this.debugSnake( {
            target: 'pmlab1'
        } )
        var php = {
            circles: '/circle/get_circle_selected_list?circle_id=1&limit=10&is_after=1'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data._CSSLinks = [ 'mainapp/index' ]
            this.render( 'mainapp/index.html', data )
        } )
    },
    'detail': function( tid ) {
        // this.debugSnake( { target: 'pmlab1' } )
        var tid = tid || 1;
        var php = {
            detail: '/richmessage/richmessage_detail?msg_id=' + tid,
            banners: '/circle/msg_detail_banners',
            list: '/circle/get_repin_circle_poster?msg_id=' + tid + '&limit=10&offset=0'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = '美丽说';
            if ( data.detail ) {
                data._CSSLinks = [ 'mainapp/detail', 'mainapp/repin_list' ]
                this.render( 'mainapp/detail.html', data )
            } else {
                data._CSSLinks = [ 'mainapp/detail_remove' ]
                this.render( 'mainapp/detail_remove.html', data )
            }
        } )
    },

    'goods_manage': function() {
        // this.debugSnake( { target: 'pmlab1' } )
        var php = {
            'myshop': '/circle/get_shop_info'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = '商品管理'
            data._CSSLinks = [ 'mainapp/goods_manage' ]
            this.render( 'mainapp/goods_manage.html', data )
        } )
    },
    'recommend': function() {
        //this.debugSnake( { target: 'pmlab1' } )
        var php = {
            list: '/circle/recommend_follow_users'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = '推荐关注'
            data._CSSLinks = [ 'mainapp/recommend' ]
            this.render( 'mainapp/recommend.html', data )
        } )
    },

    'repin_list': function() {
        // this.debugSnake( { target: 'pmlab1' } )
        var php = {
            list: '/circle/get_repin_circle_poster?limit=10&offset=1'
        }

        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = '群'
            data.msg_id    = this.req.__get.msg_id
            data._CSSLinks = [ 'mainapp/repin_list' ]
            this.render( 'mainapp/repin_list.html', data )
        } )

    },
    'activity': function() {
        var php    = {
            'main': '/circle_activity/Sell_template'
        };
        var cid    = this.req.__get.cid;
        this.bindDefault( php )
        this.bridgeMuch( php )
        var wapMod = base.loadModel( 'wap/tools.js' );
        this.listenOver( function( data ) {
            var $main  = data.main;
            var $share = $main.data.share;
            if ( !$main ) return this.errorPage();
            var shareURL   = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent( '/mainapp/activity/?cid=' + cid ) + '&bg=' + encodeURIComponent( '/mainapp/activity/?cid=' + cid ) + '&bg2=' + encodeURIComponent( 'http://m.meilishuo.com/download/' );
            var params     = {
                'title': $share.share_title,
                'text': $share.share_text,
                'pic': $share.share_src,
                'url': shareURL
            };
            data.share     = wapMod.shareTo( this.req, params );
            data.pageTitle = $main.data.banner.title;
            data._CSSLinks = [ 'mainapp/qunquan' ];
            this.render( 'mainapp/qunquan.html', data );
        } )
    },

    'invite': function() {
        var php = {
            list: '/circle/recommend_bannner_category'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = '添加好友'
            data._CSSLinks = [ 'mainapp/recommend', 'mainapp/invite' ]
            this.render( 'mainapp/invite.html', data )
        } )
    },

    'contacts' : function () {
        //this.debugSnake({ target: 'mob.rdlab' })
        var status = this.req.__get.status
        var php = {
            'contact_friends_data' : '/user/User_contact_has_account_list'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.status = status
            var title
            if(status == 'authorized'){
                title = '通讯录好友'
            }else{
                title = '手机通讯录'
            }
            data.pageTitle = title
            data._CSSLinks = [ 'mainapp/contacts' ]
            this.render( 'mainapp/contacts.html', data )
        })
    },

    'springboard': function() {
        var php = {}
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            this.render( 'mainapp/springboard.html', data )
        } )
    },

    'discover': function() {
        var php = {
            list: '/circle/recommend_bannner_category'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = '推荐关注'
            data._CSSLinks = [ 'mainapp/discover' ]
            this.render( 'mainapp/discover.html', data )
        } )
    },

    'discover_list': function() {
        var cid = this.req.__get.cid || 1;
        var php = {
            cat_list: '/circle/recommend_bannner_category_user?cid=' + cid
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = data.cat_list.category.tag
            data.list      = data.cat_list.user
            data._CSSLinks = [ 'mainapp/discover' ]
            this.render( 'mainapp/discover_list.html', data )
        } )
    },

    'shop': function( id ) {
    	var shopName = this.req.__get.shop_name
        var shopId = this.req.__get.shop_id = id || 1
        var php     = {
            'shopInfo': '/shop/shop_info',
            'banner': '/circle/shop_index',
            'visit' : '/Weixin/Weixin_visit_collect?shop_id=' + shopId
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
        	if(shopName)data.shopInfo.shop_nick = decodeURIComponent(shopName)
            data.shopId    = shopId
            data.pageTitle = data.shopInfo.shop_nick
            data._CSSLinks = [ 'mainapp/shop' ]
            this.render( 'mainapp/shop.html', data )
        } )
    },

    'intro': function() {
        var php = {}
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = '我要上首页'
            data._CSSLinks = [ 'mainapp/intro' ]
            this.render( 'mainapp/intro.html', data )
        } )
    },

    'intro_wx': function() {
        var php = {}
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle = '微信商城商家教程'
            data._CSSLinks = [ 'mainapp/intro_wx' ]
            this.render( 'mainapp/intro_wx.html', data )
        } )
    },

    /*
     贴纸库
     */
    'sticker_list': function() {
        var _get     = this.req.__get,
            marketId = _get.market_id,
            circleId = _get.circle_id,
            source   = _get.source,
            php      = {
                'catalog': '/circle/chartlet_catalog'
            }

        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle      = '贴纸库'
            data.searchParam    = {
                source: source,
                marketId: marketId,
                circleId: circleId
            }
            data._CSSLinks      = [ 'mainapp/sticker_list' ]
            this.render( 'mainapp/sticker_list.html', data )
        } )
    },

    'sticker_share': function() {
        this.redirectTo( 'http://m.meilishuo.com/download/latest/' )
    },

    /*
     按地址分类
     */
    'group_by_address': function() {
        var php     = {},
            _get    = this.req.__get,
            keyword = decodeURIComponent( _get.keyword ),
            type    = _get.type || 'item'

        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle     = keyword
            data.searchKeyword = keyword
            data.tabType       = type
            data._CSSLinks     = [ 'mainapp/aggregation' ]
            this.render( 'mainapp/group_by_address.html', data )
        } )
    },

    /*
     按切词分类
     */
    'group_by_word': function() {
        var php     = {},
            keyword = decodeURIComponent( this.req.__get.keyword )

        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle     = keyword
            data.searchKeyword = keyword
            data._CSSLinks     = [ 'mainapp/aggregation' ]
            this.render( 'mainapp/group_by_word.html', data )
        } )
    },

    /*
     按用户标签分类
     */
    'group_by_tag': function() {
        var php     = {},
            keyword = decodeURIComponent( this.req.__get.keyword )

        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            data.pageTitle     = keyword
            data.searchKeyword = keyword
            data._CSSLinks     = [ 'mainapp/aggregation', 'mainapp/group_by_tag' ]
            this.render( 'mainapp/group_by_tag.html', data )
        } )
    }
}
exports.__create = controller.__create( mainapp, controlFns )
