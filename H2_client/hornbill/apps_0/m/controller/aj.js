function aj(){
	return this;
}
var controlFns = {
	getExchangeList : function(params){
		var php = {
			'list' : '/customactivity/CustomActivity_user_point_list'
		}
		this.ajaxTo(php[params]);
	},
	getComment : function(args){
        var backend = {
            'newShare' : '/item/item_reply_all'
            ,'shop' : '/goods/comment_list'
            ,'deal' : '/goods/sale_record_list'
			, 'koubei' : '/goods/koubei_list'
		}
        var php = backend[args] || '/goods/share_comments'
        this.ajaxTo(php)
    },
	getGoods : function(params){
		var php = {
			'new' : '/poster/latest_poster_m'
			, 'hot' : '/poster/popular_poster_m'
			, 'selected' : '/poster/selected_poster_m'
			, 'catalog' : '/poster/navigation_poster_m'
			, 'attr' : '/poster/attribute_poster_m'
			, 'search' : '/poster/search_poster_m'
			, 'group' : '/poster/group_poster_m'
		}
		this.ajaxTo(php[params]);
	},
	wapActivityRecord : function(){
	    this.ajaxTo('/wapactivity/Activity_record');
	},
	groundWap : function(){
		this.ajaxTo('/customactivity/CustomActivity_wap_promote_dress_new');
	},
	act : function(params){
		var wapMod = base.loadModel('wap/tools.js');
		var access_token = wapMod.getMobToken(this.req ,this.res);
		this.req.__get.app_access_token = access_token;
		var php = {
			'picshow_add' : '/customactivity/CustomActivity_wap_share_photo_add_user'	
			, 'picshow_vote' : '/customactivity/CustomActivity_wap_share_photo_vote'
			, 'picshow_rank' : '/customactivity/CustomActivity_wap_share_photo_rank'
			, 'bdapp' : '/customactivity/CustomActivity_wap_privilege_add_user'
		}
		this.ajaxTo(php[params]);
	},
	activity : function(params){
        //this.debugSnake({target : 'devlab1'});
		var php = {
			'girls_add' : '/customactivity/CustomActivity_girlfriend_add_user',
			'girls_vote' : '/customactivity/CustomActivity_girlfriend_vote',
			'girls_rank' : '/customactivity/CustomActivity_girlfriend_rank',
			'sale_vote_haibao' : '/customactivity/CustomActivity_wap_guimi_haibao',
			'sale_vote' : '/customactivity/CustomActivity_wap_guimi_vote',
			'sale_voted_haibao' : '/customactivity/CustomActivity_wap_guimi_voted_list',
			'do_punch' : '/customactivity/CustomActivity_wap_user_punch',
			'wakeup' : '/customactivity/CustomActivity_wap_user_mark',
			'March_vote' : '/customactivity/CustomActivity_cosmetic_promote_lottery',
			'spring_carnival_add' : '/customactivity/CustomActivity_spring_carnival_add',
			'carnival_list' : '/customactivity/CustomActivity_wap_spring_carnival_list',
			'bedook' : '/customactivity/CustomActivity_biduke_apply_coupon',
			'couponAdd':'/customactivity/CustomActivity_coupon_add',
			'couponAdd2':'/customactivity/CustomActivity_market_coupon_add',
            'redpackage_coupon' : '/redpackage/Apply_red_package'
		};
		this.ajaxTo(php[params]);
	},
	biz : function(params){
		var php = {
			'zero_add' : '/customactivity/CustomActivity_open_add_change_goods',
			'girls_rank' : '/customactivity/CustomActivity_wap_share_photo_rank',
			'girls_vote' : '/customactivity/CustomActivity_wap_share_photo_vote',
			'girls_add' : '/customactivity/CustomActivity_wap_share_photo_add_user'
		}
		this.ajaxTo(php[params]);
	},
	summer_match: function(params){
		var php = {
			'match' : '/Wapactivity/Activity_goods'
		}
		this.ajaxTo(php[params])
	},
	wx : function(params){
		this.debugSnake({target : 'devlab3'});
		var php = {
			'normal_goods' : '/weixin/weixin_mall_normal_goods'
			, 'release' : '/connect/release'
			, 'change_bind' : '/connect/change_bind'
			, 'coupon_list' : '/coupon/home_list'
		}
		this.ajaxTo(php[params])
	},
	wx_coupon : function(params){
		var php = {
			'coupon_list' : '/coupon/home_list'
		}
		this.ajaxTo(php[params])
	},
	tuan : function(params){
		var php = {
			'list' : '/groupon/groupon_poster_mob'
		}
		this.ajaxTo(php[params]);
	},
	coupon : function(params){
		var php = {
			'activate' : '/coupon/activate'
			,'register_apply' : '/note/register_apply_coupon'
		}
		this.ajaxTo(php[params]);
	},
	member_exchange: function(params){
		var php = {
			'add' : '/customactivity/CustomActivity_user_point_exchange_add'
		}
		this.ajaxTo(php[params])
	},
	get_exchange: function(params){
		var php = {
			'get' : '/customactivity/CustomActivity_user_point_update_status'
		}
		this.ajaxTo(php[params])
	},
	point_exchange: function(params){
		var php = {
			'point' : '/customactivity/CustomActivity_user_point_status'
		}
		this.ajaxTo(php[params])
	},
	single: function(params){
		var php = {
			'reply' : '/club/article_reply_list'
		}
		this.ajaxTo(php[params])
	},
	im : function(params){
		this.debugSnake({target : 'devlab1'});
		var php = {
			'history' : '/im/history'
			, 'init' : '/im/init'
		}
		this.ajaxTo(php[params])
	},
	huodong : function(params){
		var php = {
			'fight' : '/customactivity/CustomActivity_exo_fighting_infomob',
			'join' : '/customactivity/CustomActivity_exo_join_infomob'

		};
		this.ajaxTo(php[params]);
	},
	md : function(params){
		var php = {
			'normal_goods' : 'midian::/goods/get_list'
		};
		this.ajaxTo(php[params]);
	},
	beautysale : function(params){
		var php = {
			'list' : '/Wapactivity/Promote_act',
			'goods' : '/Cosmetic/Cosmetic_wap_goods'
		};
		this.ajaxTo(php[params]);
	},
	may_sale : function(params){
		var php = {
			'goods' : '/customactivity/CustomActivity_lovers_confessions_rank',
			'add_love' : '/customactivity/CustomActivity_lovers_confessions_add_user'
		};
		this.ajaxTo(php[params]);
	},
	niuniu: function(params){
		var php = {
			'push' : '/customactivity/CustomActivity_mob_push?flag=set',
			'get' : '/customactivity/CustomActivity_mob_signin?act=set',

		};
		this.ajaxTo(php[params]);
	}
}
exports.__create = controller.__create(aj , controlFns);
