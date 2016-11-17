function aj() {
    return this;
}
var controlFns   = {
    circle: function( params ) {
        this.debugSnake({'target': 'pmlab1'});
        var php = {
            'get_all_list': '/circle/get_all_list',
            'get_newest_list': '/circle/get_newest_list',
            'get_promote_list': '/circle/get_promote_list',
            'get_my_join_list': '/circle/get_my_join_list',
            'get_goods_list': '/circle/circle_goods_list',
            'fresh': '/circle/get_highlight_list',
            'hot': '/circle/get_highlight_list_hot',
            'get_suggest_item_list': '/circle/recommend_poster_m',
            'get_category': '/circle/get_category_list',
            /**
             * 格式转换
             */
            'convert_audio': '/circle/get_audio_info'
        }
        this.ajaxTo( php[ params ] )
    },

    wx : function(params){
        var php = {
            'normal_goods' : '/weixin/weixin_mall_normal_goods'
            , 'ordercreate' : 'doota::/order/add_weixin_goods'
            , 'wxpay' : 'doota::/order/wechat_store_fetch'
            , 'order_list' : 'doota::/order/list_info'
            , 'release' : '/connect/release'
            , 'change_bind' : '/connect/change_bind'
            , 'coupon_list' : '/coupon/home_list'
            , 'coupon_change' : 'doota::/order/weixin_init'

//new wx
            , 'connect' : '/connect/weixin?type=1' //拉用户信息
            , 'sign' : '/weixin/Weixin_wap_share_sign' //js jdk 分享

        }
        this.ajaxTo(php[params])
    }
}
exports.__create = controller.__create( aj, controlFns );
