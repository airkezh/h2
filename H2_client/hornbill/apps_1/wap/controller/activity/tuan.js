function tuan() {
	return this;
}
var controlFns = {
	'special':function(event_id){
		var event_id = event_id||this.req.__get.event_id || 1065;
		var time = this.req.__get.time || '';
		var wapMod = base.loadModel('wap/tools.js'),
		shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/tuan/special/'+event_id) + '&bg='+ encodeURIComponent('/activity/tuan/special/'+event_id) + '&bg2='+encodeURIComponent('http://www.meilishuo.com/client/?frm=daeh');
		//this.debugSnake({'target':'pmlab1'});
		var php = {
			'b_banner' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=mob_tuan_jingximiaosha_top_banner',
			'remind_get':'/push/isSubscribedPush?actidfor8='+event_id,
			'special_list':'groupon::/groupon/groupon_qiang_info?event_id='+event_id+'&type=0&time='+time,
			'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel',
			'leadApp' : '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu',
			'preview_list' : 'groupon::/miaosha/miaosha_preview_goods_list?limit=20'
		};
		var channel = this.readData('channel',this.req.__get, ''); 
		var param = channel || param 
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}
		var locationUrl = this.req.headers.host + this.req.url 
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.locationUrl = locationUrl
			/*download*/
			if (data.os.iphone || data.os.ipad){
				data.appUrl =  'http://itunes.apple.com/cn/app/meilishuo/id431023686'
			} else {
				if (!param || (data.apks && !data.apks[param]) ) param = 'web'
				if (data.apks && data.apks[param] && data.apks[param].src) data.appUrl = data.apks[param].src
				
				else 
					data.appUrl = 'http://img.meilishuo.net/css/images/AndroidShare/Meilishuo_10008_4_3_1.apk'
			}

			/*置顶banner*/
			var showZhiDing = wapMod.showZhiDing(this.req,this.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;
			var os = wapMod.uaos(this.req)
			data.mlsApp = os.mlsApp
			/*share*/
			var params = {
				'title' : data.special_list.data.title || '',
				'text' : '抢8【1元秒杀】每晚8点，限量优品整点抢购。美丽说团购年度巨献！',
				'pic' : data.PICTURE_URL + "images/wap/activity/tuan/n_qiang8.jpg",
				'url' : shareURL
			};
			data.share = wapMod.shareTo(this.req , params , false);
			data.pageTitle = data.special_list.data.title||'1元秒杀';
			data._CSSLinks = ['tuan/activity/special_new2'];
			data.event_id=event_id;
			this.render('activity/tuan/special_new2.html' , data);
		});
	},
	'hd' : function(event_id){
		var event_id = event_id||this.req.__get.event_id || 1012;
		var curtab = this.req.__get.curtab || 1;
		var wapMod = base.loadModel('wap/tools.js'),
		shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/tuan/hd/' + event_id) + '&bg='+ encodeURIComponent('/activity/tuan/hd/' + event_id) + '&bg2='+encodeURIComponent('http://www.meilishuo.com/client/?frm=daeh');
		var php = {
	        'actinfo' : 'groupon::/groupon/groupon_extra_for_event_mob?event_id='+event_id
	    };
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){					
			if(!data.actinfo.error_code){
				var info = data.actinfo.data;
				data.isstart = info.time_status; //活动是否开始
				data.event_id = encodeURIComponent(event_id);
				data.curtab = curtab;
				data.pageTitle = info.pageTitle;
				var params = {
					'title' : info.share.shareText,
					'text' : '',
					'pic' : info.share.shareImage,
					'url' : shareURL
				};
				data.share = wapMod.shareTo(this.req , params, false);
				data._CSSLinks = ['tuan/activity/hd'];

				//临时hack 只1687活动出优惠劵
				var url = this.req.url;
				if(/\/1687($|\?)/.test(url)){
					data.coupon = 1;
				}
				
				this.render('activity/tuan/hd.html' , data);
			}else{
				return this.errorPage();
			}		
		});
	},
	'rushbuy' : function(event_id){
		var event_id = event_id||this.req.__get.event_id;
		if(!event_id) return this.errorPage();
		//var wapMod = base.loadModel('wap/tools.js'),
		//shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/tuan/rushbuy/' + event_id) + '&bg='+ encodeURIComponent('/activity/tuan/rushbuy/' + event_id) + '&bg2='+encodeURIComponent('http://www.meilishuo.com/client/?frm=daeh');
		var php = {
			'b_banner' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=mob_tuan_jpqx_banner',
			'pageData' : 'groupon::/groupon/groupon_qiangxian_mob?event_id=' + event_id
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.pageData || data.pageData.error_code) return mSelf.errorPage();
			data.pageTitle = '精品抢鲜';
			data._CSSLinks = ['tuan/activity/rushbuy'];
			mSelf.render('activity/tuan/rushbuy.html' , data);
		})
	},
	'seckill' : function(event_id){
		var event_id = event_id||this.req.__get.event_id;
		var curtab = this.req.__get.curtab || 1;
		if(!event_id) return this.errorPage();
		//var wapMod = base.loadModel('wap/tools.js'),
		//shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/tuan/rushbuy/' + event_id) + '&bg='+ encodeURIComponent('/activity/tuan/rushbuy/' + event_id) + '&bg2='+encodeURIComponent('http://www.meilishuo.com/client/?frm=daeh');
		var php = {
			'b_banner' : 'groupon::/groupon/groupon_get_banners_mob?locationKey=miaosha_new',
			'taginfo' : 'groupon::/groupon/groupon_qiang_events_mob?event_id='+ event_id
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.taginfo || data.taginfo.error_code) return mSelf.errorPage();
			data.event_id = event_id;
			data.curtab = curtab;
			data.pageTitle = '秒杀活动';
			data._CSSLinks = ['tuan/activity/seckill'];
			mSelf.render('activity/tuan/seckill.html' , data);
		})
	},
	'test' : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = 'test';
			mSelf.render('activity/tuan/test.html' , data);
		})
	},
	'forshow' : function(){
		this.ajaxTo('groupon::/miaosha/miaosha_preview_event_info')
	}
}
exports.__create = controller.__create(tuan, controlFns);