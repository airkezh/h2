function aw(){
	return this;
}
var controlFns = {
    textgame:function(params){
        var php = {
            'Graph_alloy' : '/graph/Graph_alloy'
        }
        this.ajaxTo(php[params])
    },
    proxy : function(){
        this.res.write('<script>')
        this.res.write('parent.' +this.req.__get['__callback'] + '('+ JSON.stringify(this.req.__get.data)+')')
        this.res.write('</script>')
        this.res.end()
        },
	'feedback' : function(p){
		var php = '/about/feedback_m'
		this.ajaxTo(php)
	}
	, user : function(params){
        //this.debugSnake({target : 'mob.rdlab'});
		var php = {
			'logon' : '/user/user_log_on',
            'follow' : '/user/relation_create',
            'newfollow' : '/user/relation_multi_create',
            'cancelFollow' : '/user/relation_destroy'
		}
		this.ajaxTo(php[params])
	}
	,'doota' : function(p){
		var php = {
			'addToCarts' : 'doota::/cart/add'
		}
		this.ajaxTo(php[p])
	}
	,'twitter' : function(params){
		var php = {
			'like' : '/twitter/like',
            'exoTicket' : "/customactivity/CustomActivity_exo_add_poster_puzzle",
            'exo_poster_pubble' : "/customactivity/CustomActivity_exo_poster_puzzle"
		}
		this.ajaxTo(php[params]);
	},
    'sign' : function(params) {
        //this.debugSnake({target : 'lab2'});
        var php = {
            "init": "/sign/init",
            "patch": "/sign/patch",
            "replay": "/sign/replay",
            "upgrade": "/sign/upgrade",
            "exchange": "/sign/exchange",
            "signIn": "/sign/signIn",
            "getGoods": "/sign/getGoods",
            "getSignDate": "/sign/getSignedDates",
            "do_reg" : "/registration/Punch",
            "redeem" : "/registration/Redeem",
            "remind" : "/registration/ReqistPush?flag=set",
            "reset" : "/registration/Reset",
            "repair" : "/registration/Repair",
            "determ" : "/registration/Determ",
            "scroll" : "/registration/Scroll",
            "superPatch" : "/registration/superPatch",
            "share" : "/registration/ShareQzone",
            "red" : "/redpackage/Apply_red_package",
            "getCoupons" : "/registration/getCoupons"
        }
        this.ajaxTo(php[params]);
    },
    'sale' : function(params) {
       //this.debugSnake({target : 'devlab1'});
        var php = {
            "get916Coupon" : "/customactivity/CustomActivity_common_coupon_apply",
            "get820Coupon" : "/customactivity/CustomActivity_offer_coupon_apply",
            "shortUrl" : "/url/shorturl",
            "turntable" : "/customactivity/CustomActivity_lottery?activity_id=19",
            "turntab" : "/customactivity/CustomActivity_lottery?activity_id=21",
            "getUserInfoById" : "/user/user_statistic",
            "fCoupon":"/customactivity/CustomActivity_fuide_coupon_apply",
            "wxChrim":"/weixin/Weixin_christmas_set_addr"
        }
        this.ajaxTo(php[params]);
    },

    /**
     * 2014 圣诞节弹幕
     * 发送弹幕信息
     */
    'danmu_message': function( params ) {
        //this.debugSnake({ target: 'xiaochongchen.rdlab' });
        var php = {
            'divergent' : '/customactivity/customActivity_barrage_push_otc',
            'interior': '/customactivity/CustomActivity_barrage_push_otc'
        }
        if ( php[ params ] ) {
            return this.ajaxTo( php[ params ] )
        }
        this.ajaxTo( '/customactivity/CustomActivity_barrage_push' )
    },

    'circle_create': function() {
        //this.debugSnake({target:"lab1"})
        this.ajaxTo( '/circle/apply' )
    },

    'shop_create': function() {
        //this.debugSnake({target:"lab1"})
        this.ajaxTo( '/circle/shop_create' )
    },
    /**
     * 『喜欢』接口
     * 验证 token 有效期，最长为 10 分钟
     */
    'msg_like': function( param ) {
        if ( !this.isTokenLive( 10 ) ) {
            return this.res.end('{"status":-21}')
        }

        var php = {
            'like': '/richmessage/richmessage_like',
            'unlike': '/richmessage/richmessage_unlike'
        }
        this.ajaxTo( php[ param ] )
    }
}
exports.__create = controller.__create(aw , controlFns);
