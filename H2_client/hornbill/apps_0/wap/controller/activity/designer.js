function designer(){
	return this;
}


var controlFns = {
	index : function(){
		//this.debugSnake({target:"xiaochongchen.rdlab"})
		//http://snake.xiaochongchen.rdlab.meilishuo.com/customActivity/customActivity_designer_contest?cid=9381
		//var cid  = this.req.__get.cid;
		
		var php = {
			'main':'/customActivity/customActivity_designer_contest?season_id=1&project_id=3'
			,'connect_weixin': '/connect/weixin?type=1'
		};
		
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		var wapMod = base.loadModel( 'wap/tools.js' );
		this.listenOver(function(data){
			
			//是否微信，是否微信登录
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
        	if(weixinBrowser){
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.isWxLogin = '0';
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.isWxLogin = '1';
			};


			//接口数据
			var $main = data.main;
			var	$data = $main.data;
			var $share = data.main.data.share;
            if ( !$main ) return this.errorPage();
            
            var params     = {
                'title': $share.title,
                'text': $share.content,
                'pic': $share.icon,
                'url': $share.link
            };
            
            data.share     = wapMod.shareTo( this.req, params,['weixin_timeline','weixin']);
            data.pageTitle = $data.page.title;
			data._CSSLinks = ['activity/designer'];
			this.render('activity/designer.html' , data);
		});
	},
	vote : function(){
		var php = {
			'main':'/customactivity/CustomActivity_designer_contest3?cid=14495&project_id=3&season_id=3'
			,'connect_weixin': '/connect/weixin?type=1'
		};
		var wapMod = base.loadModel( 'wap/tools.js' );
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = 750;
			data.XR = true;

			//是否微信，是否微信登录
			var weixinBrowser = data.os.weixinBrowser;
        	if(weixinBrowser){
				connectWX(mSelf, data);
			}
		
			//接口数据
			var $main = data.main;
			var	$data = $main.data;
			var $share = data.main.data.share;
            if ( !$main ) return this.errorPage();
            
            var params     = {
                'title': $share.title,
                'text': $share.content,
                'pic': $share.icon,
                'url': $share.link
            };
            
            data.share     = wapMod.shareTo( this.req, params,['weixin_timeline','weixin']);
            data.pageTitle = $data.page.title;
			data._CSSLinks = ['activity/designer2'];
			this.render('activity/designer2.html' , data);
		});
	},
	vote_sub : function(did){
		var php = {
			'main':'/customactivity/CustomActivity_designer_contest3_2?cid='+did+'&season_id=3&project_id=3'
			,'connect_weixin': '/connect/weixin?type=1'
		};
		var wapMod = base.loadModel( 'wap/tools.js' );
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = 750;
			
			//是否微信，是否微信登录
			var weixinBrowser = data.os.weixinBrowser;
        	if(weixinBrowser){
				connectWX(mSelf, data);
			}
		
			//接口数据
			var $main = data.main;
			var	$data = $main.data;
			
            if ( !$main ) return this.errorPage();
               
            data.pageTitle = $data.page.title;
			data._CSSLinks = ['activity/designer2'];
			this.render('activity/designer2_sub.html' , data);
		});
	},
	pt : function(){
		//this.debugSnake({target:"xiaochongchen.rdlab"});
		var php = {
			'main':'/customActivity/customActivity_designer_contest?season_id=1&project_id=3'
			,'connect_weixin': '/connect/weixin?type=1'
		};
		
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			
			//是否微信，是否微信登录   
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
        	if(weixinBrowser){
				connectWX(mSelf, data);
			}
			data.isWx = weixinBrowser;
			data.isWxLogin = '0';
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.isWxLogin = '1';
			};

			data.pageTitle = '原创女装拼图';
			data._CSSLinks = ['activity/designer-pt'];
			this.render('activity/designer-pt.html' , data);
		});
	},
	clothing : function(){
		var mSelf = this;
		var wapMod = base.loadModel( 'wap/tools.js' );
		var host = this.req.headers.host;
		var php = {
			'main' : '/customactivity/customActivity_designer_contest2?cid=12495'
			,'connect_weixin': '/connect/weixin?type=1'
		};
		
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//是否微信，是否微信登录
			var weixinBrowser = data.os.weixinBrowser

        	if(weixinBrowser){
				connectWX(mSelf, data);
			}

			//接口数据
			var $main = data.main;
			var $data = $main.data;
            var $share = data.main.data.share;
            if ( !$main ) return this.errorPage();
            
            var params     = {
                'title': $share.title,
                'text': $share.content,
                'pic': $share.icon,
                'url': $share.link
            };
            
            data.share = wapMod.shareTo( this.req, params,['weixin_timeline','weixin']);
            data.pageTitle = $data.page.title;
			data._CSSLinks = ['activity/clothing'];
			this.render('activity/clothing.html' , data);
		});
	}
};

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}
exports.__create = controller.__create(designer , controlFns);
