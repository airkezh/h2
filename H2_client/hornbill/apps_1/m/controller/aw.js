function aw(){
	return this;
}
var controlFns = {
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
		var php = {
			'logon' : '/user/user_log_on'
		}
		this.ajaxTo(php[params])
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
        //this.debugSnake({target : 'devlab1'});

        var php = {
            "do_reg" : "/registration/Punch",
            "redeem" : "/registration/Redeem",
            "remind" : "/registration/ReqistPush?flag=set",
            "reset" : "/registration/Reset",
            "repair" : "/registration/Repair",
            "determ" : "/registration/Determ",
            "scroll" : "/registration/Scroll",
            "patch" : "/registration/PatchMissing",
            "red" : "/redpackage/Apply_red_package"
        }
        this.ajaxTo(php[params]);
    },
    'sale' : function(params) {
       this.debugSnake({target : 'devlab1'});
        var php = {
            "get916Coupon" : "/customactivity/CustomActivity_common_coupon_apply",
            "get820Coupon" : "/customactivity/CustomActivity_offer_coupon_apply",
            "shortUrl" : "/url/shorturl",
            "turntable" : "/customactivity/CustomActivity_lottery?activity_id=19",
            "getUserInfoById" : "/user/user_statistic",
            "fCoupon":"/customactivity/CustomActivity_fuide_coupon_apply"
        }
        this.ajaxTo(php[params]);
    }
}
exports.__create = controller.__create(aw , controlFns);
