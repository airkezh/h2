function aj(){
	return this;
}
var controlFns = {
	ax : function (){
		var ajax = 'POST' == this.req.method ? this.req.__post : this.req.__get;
		this.req.method = 'GET';
		this.ajaxTo(ajax);
		//this.res.end(ajax.toString());
		},
	forcemail : function(){
		this.ajaxTo('/spam/forcemail');
	},
	changerelation : function(){
		this.ajaxTo('/group/changerelation');
	},
    /**
     * 获取运费
     */
    getFreight : function() {
        var param = this.req.__get;
        this.ajaxTo('/freight/get_freight?cid=' + param.cid + '&goods_id=' + param.goods_id);
    },

    /**
     * 获取城市列表
     */
    getAllCities: function() {
        this.ajaxTo('/freight/get_all_cities');
    },

	getComment : function(args){
		var backend = {
			'newShare' : '/item/item_reply_all'
			,'fame'  : '/goods/koubei_list'
			,'shop'  : '/goods/comment_list'

            /*
                http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Goodscomment_info_sku
                追评的订单信息
             */
            ,'comment': '/goods/comment_info_sku'

            /*
                http://redmine.meilishuo.com/projects/meilishuo-web/wiki/Goodscomment_filter_total
                商品评价的筛选分类总数
             */
            ,'filter': '/goods/comment_filter_total'
			,'deal'  : '/goods/sale_record_list'
			,'shopping': '/club/goods_show_list'
		};
		var php = backend[args] || '/goods/share_comments'
		this.ajaxTo(php)
	},

    /**
     * 获取优惠券
     * http://redmine.meilishuo.com/projects/doota/wiki/Hostcouponcoupon_share
     */
    findCoupon: function() {
        this.ajaxTo('doota::/coupon/coupon_share');
    },

    /**
     * 领取优惠券
     */
    getCoupon: function() {
        this.ajaxTo('/coupon/apply');
    },

	ground : function(){
		this.ajaxTo('/customactivity/CustomActivity_promote_dress_new');
	},
	setEmail : function(){
		this.ajaxTo('/setting/setting_set_email');
	},
	sendCode : function(){
		this.ajaxTo('/setting/setting_send_mob_active');
	},
	sendBind : function(){
		this.ajaxTo('/setting/setting_bind_mobile');
	},
	search : function(){
		this.ajaxTo('/goods/search_autocomplete');
	},
	magazine : function(params){
		var php = {
			'quit' : '/group/quit',
			'follow' : '/group/follow',
			'user_groups' : '/group/user_groups',
			'twitter_elite' : '/group/Group_twitter_elite',
			'change_role' : '/group/change_role',
			'group_style' : '/group/group_style',
			'delete_avatar' : '/group/group_avatar_delete',
			'Add_editor' : '/group/Add_editor'
		}
		this.ajaxTo(php[params]);
	},
	user : function(params){
		var php = {
			'sync_wb' : '/user/Sync_follow_weibo'
		}
		this.ajaxTo(php[params]);
	},
	getGoods : function(params){
		var php = {
			'magazinePoster' : '/group/group_poster',
			'attr' : '/goods/attribute_poster',
			'attr2' : '/goods/attribute_poster_ex',
			'attr_landing' : '/goods/attribute_landing_poster',
			'goods' : '/goods/attribute_poster',
			'home' : '/home/home_poster',
			'report' : '/goods/dressing_match_poster',
			'daren' : '/famous/main_view',
			'latest_num' : '/goods/newest_view_trace_num',
			'commercePost' : '/commerceapp/commerce_post',
			'commerce_oppo' : '/commerceapp/Commerce_post_oppo',
			'commerce_garnier' : '/huodong/Garnier_group_view',
			'catalog' : '/goods/catalog_poster',
			'catalog2' : '/goods/Catalog_poster_navigate_mode',
			'time_discount' : '/commerceapp/time_discount',
			'volume_poster' : '/goods/volume_poster',
			'customactivity' : '/customactivity/CustomActivity_maybelline'
		}
		if ( 'ads_poster' == params){
			//var php = 'catalog' == params ? {'catalog' : '/goods/catalog_poster'} : {};
			var php = {};
			var get = this.req.__get
			if (!get.frame || 0 == get.frame) {
				php.cpt = '/commerce/ads_hot'
				if (0 == get.page) php.commerce = ' /commerce/ads_mall'
			}

			this.ajaxTo(php)
		}else
			this.ajaxTo(php[params]);
	},
	minisite : function(params){
		var php =  '/minisite/minisite_twitter/'+params;
		this.ajaxTo(php);
	},
	getTwitterGoods : function(args){
		if(args == 'newShare')
			this.ajaxTo('/item/item_share_goods');
		else
			this.ajaxTo('/goods/share_self');
	},
	getNick : function(){
		this.ajaxTo('/user/get_default_atnick');
	},
	getMagazine : function(params){
		var pageSize = 20;
		var pageFrame = 8;
		var get = this.req.__get;
		var frame = get.frame;
		var php = {};
		if(get.type == 'book' || !get.type){
			var magazineCount = Math.ceil(get.totalNum / pageSize);
			magazineCount -= get.page * pageFrame;
			if(magazineCount < 0) magazineCount = 0;
			if(magazineCount > frame){
				if(get.totalNum < pageSize){
					get.group = 'editor';
					php['magazine'] = '/person/poster_group';
					get.twitter = 'share';
					//get.frame = frame - magazineCount;
					php['goods'] = '/person/poster_twitter';
				}else{
					get.group = 'editor';
					php['magazine'] = '/person/poster_group';
				}
			}else{
				get.twitter = 'share';
				get.frame = frame - magazineCount + (+get.isFrame || 0);
				get.page -= Math.floor(get.totalNum / 120);
				if(get.page < 0 ) get.page = 0;
				php['goods'] = '/person/poster_twitter';
			}
		}
		if(get.type == 'share' || get.type == 'like'){
			get.twitter = get.type;
			php['goods'] = '/person/poster_twitter';
		}
		if(get.type == 'editor' || get.type == 'follow'){
			get.group = get.type;
			php['magazine'] = '/person/poster_group';
		}
		if (get.type == 'shop'){
			get.shop = 'shop' // get.type;
			php[get.shop] = '/shop/shop_following_list'
			}
		this.ajaxTo(php);
	},
	recommend : function(params){
		var php = {
			'daren_home' : '/recommend/recommend_user',
			'group_home' : '/recommend/recommend_group',
			'clear_alert' : '/recommend/clearRecommend',
			'group_recommend' : '/group/recommend_group',
			'rec_block' : '/person/rec_block'
		}
		this.ajaxTo(php[params]);
	},
	home : function(params){
		var php = {
			'repin' : '/home/home_repin',
			'message' : '/home/home_message',
			'msg_num' : '/home/home_message_num'
		};
		this.ajaxTo(php[params]);
	},
	msg : function(params){
		var php = {
			'del_msg' : ' /msg/delete_msg',
			'send_msg' : '/msg/sendmsg',
			'clear_msg' : '/msg/clear_alert',
			'setzero' : '/msg/setmsg_zero'
		}
		this.ajaxTo(php[params]);
	},
	getUser : function(){
		this.ajaxTo('/user/user_statistic');
	},
	getUserLabel : function(){
		this.ajaxTo('/person/label');
	},
	getQzoneMsg : function(){
		this.ajaxTo('/msg/getweibopush');
	},
	getMsg : function(params){
		 var php = {
				'msg' : '/msg/getmsg',
				'newshare' : '/msg/getnewsharenotice'
				}
		 params === '' ? this.ajaxTo(php) : this.ajaxTo(php[params]);
	},
	feedback : function(){
		this.ajaxTo('/about/feedback');
	},
	gettimepush: function() {
		this.ajaxTo('/msg/gettimepush');
	},
	checkIp : function() {
		var ip = this.req.headers.clientIp;
		this.req.__get.ip = ip;
		this.ajaxTo('/ip/check_ip');
	},
	getPaipaiCata : function(){
		this.ajaxTo('/goods/paipai_catalog_get');
	},
	getPaipaiKeywords : function() {
		this.ajaxTo('/goods/paipai_keywords');
	},
	survey : function(params) {
		var php = {
			'add' : '/survey/add',
			'question' : '/question/Questionnaire_info',
			'answer' : '/question/Questionnaire_answer'
		};
		this.ajaxTo(php[params]);
	},
	huodong : function(params) {
		var php = {
			'love_wall_twit' : '/customactivity/CustomActivity_lovers_confessions_add_user',
			'May_sale_coupon_get':'/customactivity/CustomActivity_spring_carnival_add',
			'May_sale_love_wall' : '/customactivity/CustomActivity_lovers_confessions_rank_pc',
			// 'June_sale_coupon_get':'customactivity/CustomActivity_spring_carnival_add',
			'origins_addnum' : '/customactivity/Origins_party?op=w',
			'christ_ran' : '/huodong/christmas_lottery',
			'christ_addr' : '/huodong/christmas_address',
			'spring_share' : '/huodong/Share_list',
			'spring_init' : '/huodong/Spring_init',
			'spring_addr' : '/huodong/Spring_address',
			'is_share' : '/huodong/Spring_share',
			'sign_info' : '/huodong/sign_info', //for #3373签到活动
			'sign_in' : '/huodong/sign_in',
			'sign_lottery' : '/huodong/sign_lottery',
			'join_sloggi' : '/customactivity/CustomActivity_sloggi?op=w',
			'create_lenovo' : '/customactivity/CustomActivity_create_lenovo',
			'create_disney' : '/customactivity/CustomActivity_create_disney',
			'single_haibao' : '/customactivity/CustomActivity_single_haibao',
			'haibao_wall' : '/customactivity/CustomActivity_haibao_wall',
			'cus_create_twitter' : '/customactivity/CustomActivity_create_twitter',
			'kiss_twitter' : '/customactivity/CustomActivity_create_twitter',
			'kiss_vote' : '/customactivity/CustomActivity_huodong_vote',
			'xilijie' : '/Customactivity/CustomActivity_create_lenovo_xilijie',
			'songxia_tui' : '/customactivity/CustomActivity_create_songxia',
			'mbl_user' : '/customactivity/CustomActivity_add_user',
			'mbl_tui' : '/customactivity/CustomActivity_create_nmnfs5',
			'mbl_pic' : '/customactivity/CustomActivity_meibaolian_pic_handle',
			'origins_marry_tui' : '/customactivity/CustomActivity_create_origins_marry',
			'oubolai_tui' : '/customactivity/CustomActivity_create_oubolai',
			'vote_haibao_wall' : '/customactivity/CustomActivity_oubolai_photo_rank',
			'obolai_vote' : '/customactivity/CustomActivity_oubolai_photo_vote',
			'March_vote' : '/customactivity/CustomActivity_cosmetic_promote_lottery',
			'airAsia_rank' : '/customactivity/CustomActivity_yahang_photo_rank',
			'airAsia_vote' : '/customactivity/CustomActivity_yahang_photo_vote',
			'airAsia_create' : '/customactivity/CustomActivity_create_yahang',
			'airAsia_myposter' : '/customactivity/CustomActivity_yahang_photo_user_info',

			'webcode_rank' : '/customactivity/CustomActivity_webcode_photo_rank',
			'webcode_vote' : '/customactivity/CustomActivity_webcode_photo_vote',
			'webcode_create' : '/customactivity/CustomActivity_create_webcode',
			'webcode_myposter' : '/customactivity/CustomActivity_webcode_photo_user_info',
			'webcode_haibao_wall' : '/customactivity/CustomActivity_webcode_photo_rank',

			'lenovo_rank' : '/customactivity/CustomActivity_lenovos850_photo_rank',
			'lenovo_vote' : '/customactivity/CustomActivity_lenovos850_photo_vote',
			'lenovo_create' : '/customactivity/CustomActivity_create_lenovos850',

			'nike_submit' : '/customactivity/CustomActivity_nike',
			'spring_carnival_add' : '/customactivity/CustomActivity_spring_carnival_add',
			'user_mark' : '/customactivity/CustomActivity_user_mark',
			'joinus' : '/customactivity/CustomActivity_exo_join_info?act=set',
			'fight' : '/customactivity/CustomActivity_exo_fighting_info',
			'exo_draw_lottery' : '/customactivity/CustomActivity_exo_lottery',
			'join' : '/customactivity/CustomActivity_exo_join_info',
			'oubolai_signin': '/customactivity/CustomActivity_oubolai_signin',
			'bcoupon':'/customactivity/CustomActivity_biduke_apply_coupon',
			'oubolai_lottery':'/customactivity/CustomActivity_oubolai_lottery',
			'post_twitter':'/customactivity/CustomActivity_create_twitter',
			'jlupload':' /customactivity/CustomActivity_create_jianling',
			'jlcpic':'/customactivity/CustomActivity_twitter_pic',
			'jlmgz':'/group/Add_editor',
			'Candy':'/customactivity/CustomActivity_create_candycrush'

		};
		this.ajaxTo(php[params]);
	},
	welfare : function(params) {
		var php = {
			'apply_info' : '/welfare/welfare_activity_check',
			'apply' : '/welfare/welfare_activity_apply'
		};
		this.ajaxTo(php[params]);
	},
	upNt : function(){
		return
	},
	twitter : function(params) {
		var php = {
			'fetch' : '/twitter/fetch',
			'pick' : '/twitter/pick',
			'verify' : '/twitter/verify',
			'create' : '/twitter/create'
		};
		this.ajaxTo(php[params]);
	},
	adm : function(params) {
		var php = {
			'ad_show' : '/adm/ad_Show'
		}
		this.ajaxTo(php[params])
	},
	setting : function(params) {
		var php = {
			'sync_button' : '/setting/sync_button'
		}
		this.ajaxTo(php[params])
	},
	eshop : function(params) {
		var php = {
			'poster' : '/cpc/get_cpc_eshop'
		}
		this.ajaxTo(php[params])
	},
	order : function(params) {
		var php = {
			'extend_receive' : 'doota::/order/Extend_recv',
			'add':'doota::/order/add'
		}
		this.ajaxTo(php[params])
	},
	doota : function(params){
		var php = {
			'address_add' : 'doota::/address/addr_add'
			, 'address_delete' : 'doota::/address/addr_delete'
			, 'address_select' : 'doota::/address/addr_select'
			, 'address_validate' : 'doota::/address/addr_validate'
			, 'address_default' : 'doota::/address/addr_default'
	        , 'update_card_number' : 'doota::/address/update_card_number'
			, 'order_close' : 'doota::/order/close'
            , 'order_close_multi' : 'doota::/order/close_multi'
			, 'order_recv' : 'doota::/order/recv_confirm'
			, 'cart_number' : 'doota::/cart/number'
			, 'goods_prop' : 'doota::/cart/goods_prop'
			, 'update_prop' : 'doota::/cart/update_prop'
			, 'shop_info' : 'doota::/shop/shop_list'
			, 'shop_info_b' : '/shop/shop_list'
			, 'appeal_initiate' : 'doota::/appeal/initiate'
			, 'refund_apply':'doota::/refund/refund_apply'
			, 'shop_collection' : '/shop/shop_following_list'
			, 'shop_save' : '/shop/shop_follow'
			, 'shop_cancel' : '/shop/shop_unfollow'
			, 'refund_cancel':'doota::/refund/refund_cancel'
			, 'refund_edit':'doota::/refund/refund_edit'
			, 'qr_close' : 'doota::/order/qr_close'
			, 'feedback_add' : 'doota::/order/feedback_add'
			, 'refund_reapply' : 'doota::/refund/refund_reapply'
			, "add_express":"doota::/refund/refund_express"
		}
		this.ajaxTo(php[params])
	},
	tuan : function(params){
		var php = {
			'list' : '/groupon/Groupon_poster',
			'mob' : '/groupon/groupon_poster_mob',
			'rushlist' : '/groupon/grouponEventPoster'
		}
		this.ajaxTo(php[params]);
	},
	connect : function(params){
		var php = {
			'appeal_taobao' : '/connect/taobao_account_appeal'
			, 'is_ta_accout' : '/connect/is_valid_tb_nickname'
		}
		this.ajaxTo(php[params])
	},
	fouryears : function(params){
		var php = {
			'change_goods' : '/customactivity/CustomActivity_open_add_change_goods'
		}
		this.ajaxTo(php[params])
	},
	shop_list : function(params){
		var php = {
			'goods' : '/shop/goods_list'
		}
		this.ajaxTo(php[params])
	},
	comment_new : function(params){
		var php = {
			'new' : '/goods/comment_new',
			'list' : 'doota::/goods/comment_list',
			'save' : 'doota::/shop/shop_comment',
			'append' : 'doota::/shop/shop_comment_append'
		}
		this.ajaxTo(php[params])
	},
	express: function(params){
		var php = {
			'refund_update' : 'doota::/express/refund_express_update'
		}
		this.ajaxTo(php[params])
	},
	coupon: function(params){
		var php = {
			'get' : 'doota::/coupon/coupon_apply'
			,'activate' : '/coupon/activate'
			,'register_apply' : '/note/register_apply_coupon'
			,'close_coupon_float_tips' : '/note/close_coupon_float_tips'
		}
		this.ajaxTo(php[params])
	},
	note: function(params){
		var php = {
			'register_apply' : '/note/register_apply_coupon'
			,'close_coupon_float_tips' : '/note/close_coupon_float_tips'
			,'promotion_apply_coupon' : '/note/promotion_apply_coupon'
		}
		this.ajaxTo(php[params])
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
	im : function(params){
		this.debugSnake({target : 'devlab1'});
		var php = {
			'history' : '/im/history'
			, 'init' : '/im/init'
		}
		this.ajaxTo(php[params])
	},
	spam_complain : function(params){
		var php = {
			'complain' : '/spam/Spam_complain'
		}
		this.ajaxTo(php[params])
	},
	wx_pay : function(params){
		var php = {
			'ispay' : 'doota::/mpay/mpay_wechat_pc_notify'
		}
		this.ajaxTo(php[params])
	},
	lmCatalog : function(params){
		var php = {
			'hot' : '/alliance/alliance_poster'
		}
		this.ajaxTo(php[params])
	},
	club : function(params){
		var php = {
			'buy_goods_list' : '/club/user_buy_goods_list'
		}
		this.ajaxTo(php[params])
	},
	cache : function(params){
		var php = {
			'register_redirect_cache' : '/register/register_redirect_cache'
		}
		this.ajaxTo(php[params])
	},
	coupon820 : function(params){
		var php = {
			'coupon_apply' : '/customactivity/CustomActivity_offer_coupon_apply'
		}
		this.ajaxTo(php[params])
	},
	sale : function(params){
		// this.debugSnake({target : 'devlab1'});
		var php = {
			'coupon_apply916' : '/customactivity/CustomActivity_common_coupon_apply'
		}
		this.ajaxTo(php[params])
	}
}
exports.__create = controller.__create(aj , controlFns);
