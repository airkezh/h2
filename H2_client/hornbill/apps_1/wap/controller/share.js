function share(){
	return this;
}
var controlFns = {
	index : function(tid){
		return this.new(tid);
		var wapMod = base.loadModel('wap/tools.js')
		var mSelf = this;
		var php = {
			'goods_info' : '/item/item_single_m'
			,'goods_like' : '/item/item_like_maybe_m'
			,'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
		}
		var channel = this.readData('channel',this.req.__get, '');
		var frm = this.readData('frm',this.req.__get, '');
		var refer = this.req.headers.referer;
		var param = channel || param
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}
		if(tid)
			this.req.__get.tid = tid;
		else if(this.req.__get.twitter_id)
			this.req.__get.tid = this.req.__get.twitter_id;

		this.setMDefault(php);
		this.bridgeMuch(php);

		this.listenOver(function(data){
			if (data.os.iphone || data.os.ipad){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686'
			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src

				else
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk'
			}
			data.refer = '/welcome';//refer;

			var showZhiDing = wapMod.showZhiDing(mSelf.req,mSelf.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;

			data.frm = frm;
			if(data.goods_info.is_doota == '1')
				return this.redirectTo('/share/item/' + this.req.__get.tid ,true)

			delete this.req.__get.tid
			if(!data.goods_info || data.goods_info.show404 || !data.goods_info.uInfo) return mSelf.errorPage();
			var twitter_show_type = data.goods_info.twitter_show_type
			if (data.goods_info.twitter_source_tid && ('4' == twitter_show_type || '9' == twitter_show_type)) return this.redirectTo(data.goods_info.twitter_source_tid, true)
			data.pageTitle = data.goods_info.gInfo.title + ' - 美丽说';
			data.meta_description = data.goods_info.gInfo.title + '由' + data.goods_info.uInfo.nickname +'推荐';
		//	data.cache = true;
			data._CSSLinks = ['share'];
			mSelf.render('share/share.html' , data);
		});
	},
	'new' : function(tid){
		var wapMod = base.loadModel('wap/tools.js')
		var mSelf = this;
		var php = {
			'goods_info' : '/item/item_single_m'
			, 'attr_rec' : '/goods/share_attr_lite'
		}
		var refer = this.req.headers.referer;

		if(tid)
			this.req.__get.tid = tid;
		else if(this.req.__get.twitter_id)
			this.req.__get.tid = this.req.__get.twitter_id;

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.refer = '/welcome';//refer;
			data.ptype = 'new';

			if(data.goods_info.is_doota == '1')
				return this.redirectTo('/share/item/' + this.req.__get.tid ,true)

			delete this.req.__get.tid

			if(!data.goods_info || data.goods_info.show404 || !data.goods_info.uInfo) return mSelf.errorPage();
			var twitter_show_type = data.goods_info.twitter_show_type
			if (data.goods_info.twitter_source_tid && ('4' == twitter_show_type || '9' == twitter_show_type)) return this.redirectTo(data.goods_info.twitter_source_tid, true)
			data.pageTitle = data.goods_info.gInfo.title.replace('-淘宝网', '') + ' - 美丽说';
			data.meta_description = data.goods_info.gInfo.title.replace('-淘宝网', '') + '由' + data.goods_info.uInfo.nickname +'推荐';

			data.tid = tid;
			data.use_rem_screen = '640';
			data.show_carticon = true;

			data._CSSLinks = ['share'];
			mSelf.render('share/share.html' , data);
		});
	},
	'item' : function(tid){
		
		var wapMod = base.loadModel('wap/tools.js')
		var os = wapMod.uaos(this.req)
		/*微信|手Q浏览器打开跳微信|手Q单品*/
		if(os.weixinBrowser){
			this.redirectTo('/wx/detail/' + tid, true);
		} else if(os.mobileQQ){
			this.redirectTo('/sq/detail/' + tid, true);
		}
		var mSelf = this,
			page = this.readData('page',this.req.__get, 0);

		if(tid)
			{this.req.__get.twitter_id = tid;
 				this.req.__get.tid = tid
			} // 1784921633
		else if(this.req.__get.tid)
			this.req.__get.twitter_id = this.req.__get.tid;

		var php  = {
			'goods_info' : '/share/share_main?__get_r=1&from=wap'
			,'format' : '/share/goods_specifications?__get_r=1'
			,'details' : '/share/goods_details?size_type=wap&__get_r=1'
			,'service' : '/share/service_guarantee?__get_r=1'
			,'shop_in' : '/shop/shop_intro?__get_r=1'
			,'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
			, 'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
			, 'goods_comments': '/goods/comment_list?wxmall=1&__get_r=1' // 取4/5星的评论
			, 'goods_koubei': '/goods/koubei_list?__get_r=1'
            , 'circle': '/circle/item_circle_info?__get_r=1'
            , 'circle_banner': '/circle/item_circle_banners?__get_r=1'
            , 'single_promotion' : '/coupon/item_single_promotion?twitter_id=' + tid + '&__get_r=1'
		}
		var channel = this.readData('channel',this.req.__get, '');
		var frm = this.readData('frm',this.req.__get, '');
		var refer = this.req.headers.referer;
		var param = channel || param
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;

			if (data.os.iphone || data.os.ipad){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686'
			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src

				else
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk'
			}
			var service_format = data.service.data;
			if (data.service.data && data.service.data.is_haitao == 1){
				data.service.data = service_format.data.data;
			}
			data.refer = '/welcome';//refer;

			var showZhiDing = wapMod.showZhiDing(mSelf.req,mSelf.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;

			if (!data.goods_info.data) return this.errorPage()
			if (data.goods_info.data.is_jump) {
				this.req.__get.d_r = data.goods_info.d_r
				return this.redirectTo(data.goods_info.data.twitter_source_tid ,true)
				}
			var prop = data.goods_info.data.prop
			data.goods_info.data.prop = {
				'size': prop[1]
				,'color':  prop[0]
			}
			prop = null
			data.frm = frm;
			if (data.frm) {
				data.source = 'wapdanbao-' + data.frm
			} else {
				data.source = 'wapdanbao'
			}
			data._serviceqq = data.goods_info.data.qq;
			data._shopid = data.goods_info.data.shop_id;
			data.goods_info.data.is_doota = '1' //后端接口没给，临时写死
			//base.var_dump(data.goods_info.data.prop, false , 5);
			//base.var_dump(data.goods_info.data, false , 5);
			data.isSale = true;
			data.SaleChannel = true;
			data.isTopcart = true;
			data.isM = true
			data.pageTitle = data.goods_info.data.goods_title +'，评价晒单购买-美丽说';
			data.keywords = data.goods_info.data.keyword;
			var description = data.goods_info.data.goods_comment.description;
			if(description){
				data.meta_description =data.goods_info.data.goods_title+'的推荐理由：'+description;
			}else{
				data.meta_description =data.goods_info.data.goods_title;
			}
			data.secondNavHold = true

            //微圈单品
            if ( data.goods_info.data.platform_type == 3 ) {
                data._CSSLinks = ['share/item_circle', 'share/tagshow'];
                mSelf.render('share/item_circle.html' , data);
            } else {
            //普通单品
                data.show_carticon = true;
                data._CSSLinks = ['share/item'];
                mSelf.render('share/item.html' , data);
            }
		});
	}
}

exports.__create = controller.__create(share , controlFns);
