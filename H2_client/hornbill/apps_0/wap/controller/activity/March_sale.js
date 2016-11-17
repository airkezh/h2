function March_sale(){
	return this;	
}
var controlFns = {
	main : function(){
		var mSelf = this;
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/March_sale/main/')+'&bg='+encodeURIComponent('/goto/download/ ')+'&bg2='+encodeURIComponent('http://meilishuo.com/biz/March_sale/main/');
		var php = {
			"record" : "/customactivity/CustomActivity_cosmetic_promote_lottery_record",
			"promote_num" : "/customactivity/CustomActivity_cosmetic_promote_lottery_num?src=wap",
			"miaosha" : "/customactivity/CustomActivity_cosmetic_promote_secondkill",
			"mobUserInfo" : "/customactivity/CustomActivity_wap_user_info",
			"shortURL" : "/url/shorturl?url="+encodeURIComponent(shareURL)
		};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var isLogin = false;
			/*wap登陆客户端*/
			data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
			/*wap登录 
			data.userInfo.user_id > 0 ? data.isLogin = 1 : data.isLogin = 0;*/
			/*判断版本是否支持优惠券*/
			data.isNewest = wapMod.isNewest(mSelf.req , '4.1.0');
			/*share*/
			var params = {
				'title' : '美妆狂欢节，2月28日20:00，等你来high！',
				'text' : '爱美丽们，美妆狂欢节来喽！2月26日起即可提前将心水的美物收进购物车，并开启美丽魔盒，抽取惊喜大奖。',
				'pic' : {
					"weixin" : data.PICTURE_URL + "images/huodong/March_sale/weixin.jpg",
					"weixin_timeline" : data.PICTURE_URL + "images/huodong/March_sale/weixin.jpg",
					"default" : data.PICTURE_URL + "images/huodong/March_sale/weibo.jpg"
				},
				'url' : (data.shortURL && data.shortURL.url) || shareURL
			};
			data.share = wapMod.shareTo(mSelf.req , params);
			data._CSSLinks = ['activity/March_sale'];
			mSelf.render('activity/March_sale.html' , data);
		});
	},
	apparel : function(){
		var cid = this.readData('cid',this.req.__get, 0);
		var short_url = '/activity/March_sale/apparel/?cid='+cid;
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(short_url)+'&bg='+encodeURIComponent(short_url)+'&bg2='+encodeURIComponent('http://meilishuo.com/client/');
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_march_apparel'
			,'shortURL' : "/url/shorturl?url="+encodeURIComponent(shareURL)
			,"mobUserInfo" : "/customactivity/CustomActivity_wap_user_info"
			,'couponData' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=0&type=wap'
			,'coupon_100' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=1&type=wap'

		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
			/*倒计时状态*/
			if(cid == '759'){
				data.cur_time = new Date().getTime()/1000;
				data.start_time = 1397995200;
				data.end_time = 1398268800;
				if( data.cur_time < data.start_time ){
					data.status = 'nostart';
				}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
					data.status = 'saling';
				}else{ 
					data.status = 'end';    
				}
			}
			/*判断版本是否支持优惠券*/
			data.isNewest = wapMod.isNewest(mSelf.req , '4.1.0');
			if(!data.coupon_100 || !data.couponData){
				data.has_coupon = true;
			}

			var shareData = data.pageData.share;
			var params = {
				'title' : shareData.title,
				'text' : shareData.text,
				'pic' : {
					"weixin" : shareData.pic_weixin,
					"weixin_timeline" : shareData.pic_weixin,
					"default" : shareData.pic
				},
				'url' : (data.shortURL && data.shortURL.url) || shareURL
			};
			data.share = wapMod.shareTo(mSelf.req , params);
			if(cid == 705){
				data._CSSLinks = ['activity/March_sale'];
				data.has_coupon = true;
			}else if(cid == 759){
				data._CSSLinks = ['activity/fz420_sub'];	
			}else {
				data._CSSLinks = ['activity/March_apparel_sale'];
			}
			data.cid = cid;
			data.pageTitle = data.pageData.title;
			mSelf.render('activity/March_sale/March_apparel_sale.html' , data);
		});
	},
	apparel_clothing : function(){
		var cid = this.readData('cid',this.req.__get, 0);
		var short_url = '/activity/March_sale/apparel_clothing/?cid='+cid;
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(short_url)+'&bg='+encodeURIComponent(short_url)+'&bg2='+encodeURIComponent('http://meilishuo.com/client/');
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_march_apparel_clothing'
			,'shortURL' : "/url/shorturl?url="+encodeURIComponent(shareURL)
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.app_access_token = data.accessToken;
			/*倒计时*/
			/* if(cid == '775'){*/
				data.cur_time = new Date().getTime()/1000;
				data.start_time = 1397995200;
				data.end_time = 1398268800;
				if( data.cur_time < data.start_time ){
					data.status = 'nostart';
				}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
					data.status = 'saling';
				}else{ 
					data.status = 'end';    
				}
			/* } */
			data.cid = cid;
			var shareData = data.pageData.share;
			var params = {
				'title' : shareData.title,
				'text' : shareData.text,
				'pic' : {
					"weixin" : shareData.pic_weixin,
					"weixin_timeline" : shareData.pic_weixin,
					"default" : shareData.pic
				},
				'url' : (data.shortURL && data.shortURL.url) || shareURL
			};
			data.share = wapMod.shareTo(mSelf.req , params);

			data._CSSLinks = ['activity/March_apparel_sale_clothing'];
			data.pageTitle = '320春装狂欢节 - 美丽说';
			mSelf.render('activity/March_sale/March_apparel_sale_clothing.html' , data);
		});
	},
	apparel_shop : function(){
		var cid = this.readData('cid',this.req.__get, 0);
		var short_url = '/activity/March_sale/apparel_shop/?cid='+cid;
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(short_url)+'&bg='+encodeURIComponent(short_url)+'&bg2='+encodeURIComponent('http://meilishuo.com/client/');
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_march_apparel_shop'
			,'shortURL' : "/url/shorturl?url="+encodeURIComponent(shareURL)
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.pageData) return mSelf.errorPage();
			data.isNewest = wapMod.isNewest(mSelf.req , '4.1.0');
			var shareData = data.pageData.share;
			var params = {
				'title' : shareData.title,
				'text' : shareData.text,
				'pic' : {
					"weixin" : shareData.pic_weixin,
					"weixin_timeline" : shareData.pic_weixin,
					"default" : shareData.pic
				},
				'url' : (data.shortURL && data.shortURL.url) || shareURL
			};
			data.share = wapMod.shareTo(mSelf.req , params);
			data.share_wap = { 
				'img_url' : shareData.pic
				,'link'   : (data.shortURL && data.shortURL.url) || shareURL
				,'desc'   : shareData.text
				,'title'  : shareData.title
			}

			data._CSSLinks = ['activity/March_apparel_sale_shop'];
			data.pageTitle = data.pageData.pageControl.title;
			mSelf.render('activity/March_sale/March_apparel_sale_shop.html' , data);
		});
	},
	'guang' : function() {
		var wapMod = base.loadModel('wap/tools.js')
		var all_cid = this.readData('all_cid' , this.req.__get , '');
		var show_cid = this.readData('show_cid' , this.req.__get , '');
		var cid = this.readData('cid' , this.req.__get , '');
		if(cid){
			all_cid = cid;
			show_cid = cid;
		}
		delete this.req.__get.cid;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_march_apparel_guang&cid='+ show_cid
			,'pageData_all' : '/customactivity/CustomActivity_common_tool_single?id=m_march_apparel_guang&cid='+ all_cid
			//,'list' : '/customactivity/CustomActivity_wap_spring_carnival_list'
			,'channel_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_channel'
		};
		php['leadApp'] = '/customactivity/CustomActivity_common_tool_singleNew?id=wap_daoliu&cid=2331';
		var ua = this.req.headers['user-agent'];
		var platform = false;
		if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
			platform = true;
		}
		var channel = this.readData('channel',this.req.__get, ''); 
		var param = channel || param 
		this.req.__get.channel = param
		var ua = this.req.headers['user-agent'];
		if(/(Android)/i.test(ua)){
			php.apks = '/url/Package_get'
		}
		var mSelf = this;
		var locationUrl = this.req.headers.host + this.req.url
		this.setMDefault(php);
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
			var showZhiDing = wapMod.showZhiDing(mSelf.req,mSelf.res,data.channel_info.channel, channel)
			data.showZhiDing = showZhiDing;
			var os = wapMod.uaos(this.req)
			data.mlsApp = os.mlsApp

			if(!data.pageData) return mSelf.errorPage();
			//数据整合
			data.pageData.banner_word = data.pageData_all.banner_word;
			data.pageData.pageControl.pt = data.pageData_all.pageControl.pt;
			data.pageData.pageControl.start_time = data.pageData_all.pageControl.start_time;
			data.pageData.pageControl.end_time = data.pageData_all.pageControl.end_time;
			data.pageData.header = data.pageData_all.header;
			data.pageData.footer = data.pageData_all.footer;
			delete data.pageData_all;


			var timeSetting = data.pageData.pageControl;
            if(timeSetting.pt && timeSetting.start_time && timeSetting.end_time){
                data.pt = timeSetting.pt;
                var startTime = new Date(timeSetting.start_time).getTime();
                var endTime  = new Date(timeSetting.end_time).getTime();
                var currDate = new Date();
                var currTime = currDate.getTime();
                data.nowTime = parseInt(currTime/1000);
                if (currTime < startTime) {
                    data.bannerText = "距离返场结束还有";
                    data.endTime = parseInt(startTime/1000);
                } else if (currTime > endTime) {
                    data.bannerText = "活动结束";
                } else if (currTime >= startTime) {
                    data.bannerText = "距离活动结束还有";
                    data.endTime = parseInt(endTime/1000);
                }
            }


			data.pid = mSelf.readData('pid' , this.req.__get , '');
			data.isIphone = platform;
			data._CSSLinks = ['activity/March_apparel_sale_poster'];
			data.pageTitle = data.pageData.pageControl.title;
			mSelf.render('activity/March_sale/March_apparel_sale_poster.html' , data);
		});
	}
};
exports.__create = controller.__create(March_sale , controlFns);
