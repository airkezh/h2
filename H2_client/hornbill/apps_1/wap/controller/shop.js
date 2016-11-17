function shop(){
	return this;
}
var controlFns = {
	'index' : function (spid){
		this.shop(spid);
	},
	'shop' : function(id){
		var wapMod = base.loadModel('wap/tools.js');
		var php = {
			
			'shopInfo' : '/shop/shop_info?shop_id=' + id,
			'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel',
			'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu'
		};
		var channel = this.readData('channel',this.req.__get, ''); 
		var frm = this.readData('frm',this.req.__get, '');
		var refer = this.req.headers.referer;
		var param = channel || param ;
		this.req.__get.channel = param;
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get';
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (data.os.iphone || data.os.ipad){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686';
			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web';
				if ( data.apks && data.apks[param] && data.apks[param].src ){ 
					data.appUrl = data.apks[param].src;
				}else {
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk';
				}
			}
			data.XR = true;
			data.refer = '/welcome';
			var showZhiDing = wapMod.showZhiDing(this.req,this.res,data.channel_info.channel, channel);
			data.showZhiDing = showZhiDing;
			var os = wapMod.uaos(this.req);
			data.mlsApp = os.mlsApp;
			data.frm = frm;
			data.shopId = parseInt(id);
			if(channel == '30930' || channel == '30931') data.isIqiyiApp = true;
			data._CSSLinks = ['shop/shop'];
			data.pageTitle = data.shopInfo.shop_nick;
			this.render('shop/shop.html' , data);
		});
	},
	'special' : function(id){
		//this.debugSnake({'target':'devlab2'});
		this.req.__get.id = id;
		var php  = {
			'info' : '/shop/shop_special?id=' + this.req.__get.id,
			'coupon' : '/shop/shop_special_coupon_apply?subject_id=' + this.req.__get.id
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if (!data.info) return this.errorPage();
			data._CSSLinks = ['activity/fwindow'];
			data.pageTitle = data.info.title+ '-美丽说';
			mSelf.render('shop/special.html' , data);
		});
	},
	'new' : function (id){
		var shopId = this.req.__get.shop_id,
			tId = this.req.__get.tid;
		var php = {
			'new_info' : '/shop/shop_new_detail?shop_id='+shopId+'&topic_id='+tId,
			'coupon' : '/shop/shop_special_coupon_apply?shop_id=' + shopId
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if (!data.new_info) return this.errorPage();
			data.topic_id = tId;
			data._CSSLinks = ['shop/new'];
			data.pageTitle = '新品到货';
			mSelf.render('shop/new.html', data);
		});
	},
	'activity' : function (cid){
		//this.debugSnake({'target':'devlab1'});
		this.req.__get.cid = cid || this.req.__get.cid;
		var php = {
			'act_info' : '/customactivity/CustomActivity_common_tool_singleNew?id=act&cid='+this.req.__get.cid,
			'coupons' : '/customactivity/CustomActivity_common_coupon_list_1022?type=mob'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			// console.log(data.coupons);
			data._CSSLinks = ['shop/activity'];
			data.pageTitle = data.act_info.page_title + '';
			mSelf.render('shop/activity.html', data);
		});
	}
};
exports.__create = controller.__create(shop , controlFns);
