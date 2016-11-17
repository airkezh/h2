function fouryears(){
	return this;	
}
var controlFns = {
	'ranking' : function(args){
		var app_access_token = this.readData('app_access_token' , this.req.__get , '')
			, limit = 30
		var day = new Date();
		var m = day.getMonth()+1 
		var y_date = ''+day.getFullYear() + (day.getMonth()+1);
		var d_date = day.getDate();
		var d = d_date < 10 ? '0'+d_date : d_date
		y_date += d ;

		if(args == 'yesterday'){
			limit = 30
			day.setDate(day.getDate()-1);
			m = day.getMonth()+1
			y_date = ''+day.getFullYear() + m;
			d_date = day.getDate();
			d =  d_date < 10 ? '0'+d_date : d_date;
			y_date += d
		}
		this.req.__get.date = y_date
		
		var php = {
			"userInfo" : "/customactivity/CustomActivity_wap_user_info",
			ranking : '/customactivity/CustomActivity_open_buy_rank?type=mob&limit=' + limit
		}
		, mSelf = this
		var wapMod = base.loadModel('wap/tools.js');

		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			data.ranking = data.ranking.data;
			data.app_access_token = app_access_token;
			var wap_link = 'http://m.meilishuo.com/biz/fouryears/ranking/'
				, noclient_link = 'http://m.meilishuo.com/goto/download/'
				, pc_link = 'http://www.meilishuo.com/biz/fouryears/ranking/#main_content'
				, pic_small = 'http://i.meilishuo.net/css/images/activity/fouryears/0200.jpg'
				, pic_big = 'http://i.meilishuo.net/css/images/activity/fouryears/0640.jpg'
			//share
			var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(wap_link)+'&bg='+encodeURIComponent(noclient_link)+'&bg2='+encodeURIComponent(pc_link)
			var tit = "美丽说4周年，【无忧购】感恩登场，时尚买手专业挑选，时尚店铺精心供货，有买有赠，真情回馈。"
			var text = "美丽说4周年，【无忧购】感恩登场，时尚买手专业挑选，时尚店铺精心供货，有买有赠，真情回馈。"
			var params = {
				'title' : {
					'default' : tit
				},
				'text' : {
					'default' : text
				},
				'pic' : {
					'weixin' : pic_small, 
					'weixin_timeline' : pic_small,
					'default' : pic_big 
				},
				'url' : shareURL
			};
			var shares = wapMod.shareTo(mSelf.req , params);
			data.share = shares;

			data.headTag = ''
			if(args == 'yesterday'){
				data.headTag = 'yesterday'
				data.m = m
				data.d = d
			}
			data._CSSLinks = ['biz/fouryears/ranking'];
			mSelf.render('biz/fouryears/ranking.html' , data);
		});
	},

	'zero' : function(args){
		var app_access_token = this.readData('app_access_token' , this.req.__get , '');
		var php = {
			"userInfo" : "/customactivity/CustomActivity_wap_user_info",
			zero : '/customactivity/CustomActivity_open_change_buy_goods_list?type=mob'
		}
		, mSelf = this
		var wapMod = base.loadModel('wap/tools.js');

		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			return mSelf.errorPage();
			data.app_access_token = app_access_token;
			var wap_link = 'http://m.meilishuo.com/biz/fouryears/zero/'
				, noclient_link = 'http://m.meilishuo.com/goto/download/'
				, pc_link = 'http://www.meilishuo.com/biz/fouryears/zero/#welcome'
				, pic_small = 'http://i.meilishuo.net/css/images/activity/fouryears/0200.jpg'
				, pic_big = 'http://i.meilishuo.net/css/images/activity/fouryears/0640.jpg'
			//share
			var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(wap_link)+'&bg='+encodeURIComponent(noclient_link)+'&bg2='+encodeURIComponent(pc_link)
			var tit = "美丽说4周年，【无忧购】感恩登场，时尚买手专业挑选，时尚店铺精心供货，有买有赠，真情回馈。"
			var text = "美丽说4周年，【无忧购】感恩登场，时尚买手专业挑选，时尚店铺精心供货，有买有赠，真情回馈。"
			var params = {
				'title' : {
					'default' : tit
				},
				'text' : {
					'default' : text
				},
				'pic' : {
					'weixin' : pic_small, 
					'weixin_timeline' : pic_small,
					'default' : pic_big 
				},
				'url' : shareURL
			};
			var shares = wapMod.shareTo(mSelf.req , params);
			data.share = shares;

			data._CSSLinks = ['biz/fouryears/zero'];
			mSelf.render('biz/fouryears/zero.html' , data);
		});
	}
}
exports.__create = controller.__create(fouryears , controlFns);
