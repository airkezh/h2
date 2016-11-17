function redPaper(){
	return this;
}

var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'main'
		this[args]()
	},
	main : function(){
		this.debugSnake({'target':'lab3'});
		var host = this.req.headers.host;
		var user_id = this.req.__get.from_id || "";
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=redPaperList',
			'getUserInfo' : '/weixin/Weixin_redpacket_get_userinfo',
			'connect_weixin': '/connect/weixin?type=0'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			connectWX(this, data);
			data.mlsHost = host;
			data.from_id = user_id;

			var state = data.getUserInfo.code;

			if(state == -9 || state == -1) {
				data._CSSLinks = ['activity/paperIndex'];
				this.render('activity/redPaper/index.html' , data);
			} else if (state == -2) {
				this.redirectTo('/activity/redPaper/list/?from_id=' + user_id + '&from_weixin=1');		
				return;	
			} else if (state == -10) {
				this.redirectTo('/activity/redPaper/over/');
				return;
			} else {
				this.redirectTo('/activity/redPaper/coupon/?from_id=' + user_id + '&from_weixin=1');
				return;
			}
			
			data.headTag = 'redPaper';
			data.pageTitle = '新衣红包免费领';
			
		});
	},
	list : function(){
		this.debugSnake({'target':'lab3'});
		var host = this.req.headers.host;
		var from_id = this.req.__get.from_id || "";
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=redPaperList',
			'connect_weixin': '/connect/weixin?type=1',
			'getUserInfo' : '/weixin/Weixin_redpacket_get_userinfo',
			'wxInfo' : '/weixin/Weixin_wechat_info',
			'count' : '/weixin/Weixin_redpacket_get_redpacket_count'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			connectWX(this, data);

			data.from_id = from_id;
			data.mlsHost = host;

			data.pageTitle = '新衣红包免费领';
			data.headTag = 'redPaper';
			data._CSSLinks = ['activity/paperList'];
			this.render('activity/redPaper/list.html' , data);
		});
	},
	coupon : function(){
		this.debugSnake({'target':'lab3'});
		var host = this.req.headers.host;
		from_id = this.req.__get.from_id || ''
		var php = {
			'getUserInfo' : '/weixin/Weixin_redpacket_get_userinfo',
			'connect_weixin': '/connect/weixin?type=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			connectWX(this, data);	
			data.mlsHost = host;
			data.from_id = from_id;

			data.pageTitle = '新衣红包免费领';
			data.headTag = 'redPaper';
			data._CSSLinks = ['activity/paperCoupon'];
			this.render('activity/redPaper/coupon.html' , data);
		});
	},
	over : function(){
		this.debugSnake({'target':'lab3'});
		var host = this.req.headers.host;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=redPaperList',
			'getUserInfo' : '/weixin/Weixin_redpacket_get_userinfo'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	
			data.mlsHost = host;

			data.pageTitle = '新衣红包免费领';
			data.headTag = 'redPaper';
			data._CSSLinks = ['activity/paperIndex'];
			this.render('activity/redPaper/over.html' , data);
		});
	}
}


var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}

exports.__create = controller.__create(redPaper , controlFns);
