function share(){
	return this;
}
var controlFns = {
	index : function(tid){
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
	'item' : function(tid){
		var wapMod = base.loadModel('wap/tools.js')
		var mSelf = this,
			page = this.readData('page',this.req.__get, 0);

		if(tid)
			this.req.__get.twitter_id = tid // 1784921633
		else if(this.req.__get.tid)
			this.req.__get.twitter_id = this.req.__get.tid;

		var php  = {
			'goods_info' : '/share/share_main'
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
				
			if (!data.goods_info) return this.errorPage()
			if (data.goods_info.is_jump) {
				this.req.__get.d_r = data.goods_info.d_r
				return this.redirectTo(data.goods_info.twitter_source_tid ,true)
				}
			var prop = data.goods_info.prop
			data.goods_info.prop = {
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
			data._serviceqq = data.goods_info.qq;
			data._shopid = data.goods_info.shop_id;
			data.goods_info.is_doota = '1' //后端接口没给，临时写死
			//base.var_dump(data.goods_info.prop, false , 5);
			//base.var_dump(data.goods_info, false , 5);
			data.isSale = true;
			data.SaleChannel = true;
			data.isTopcart = true;
			data.isM = true
			data._CSSLinks = ['share/item'];
			data.pageTitle = data.goods_info.goods_title +' - 美丽说';
			data.secondNavHold = true
			mSelf.render('share/item.html' , data);
		});
	}
}

exports.__create = controller.__create(share , controlFns);
