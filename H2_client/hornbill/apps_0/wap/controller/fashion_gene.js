var controlFns = {
	index: function(){
		this.mine()
	}
	,mine: function(){
		var wapMod = base.loadModel('wap/tools.js')
			,os = wapMod.uaos(this.req, wapMod.getMobToken(this.req, this.res))
		var	php = {
			'gene_index':'/fashiongene/Fashion_gene_index?__get_r=1'
		};
		if(os.weixinBrowser){
			php.connect_weixin = '/connect/weixin?type=1'
		}
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			if(os.weixinBrowser && data.connect_weixin && data.connect_weixin.redirect){
				return this.redirectTo(data.connect_weixin.redirect ,true)
			}
			if(data.gene_index.error_code==-1){
				//没有时尚基因，需要先进行小游戏
				return this.redirectTo('/fashion_gene/game/')
			}
			var shareHost = 'http://' + this.req.headers.host;
			var user_profile = data.gene_index.data.user_profile || {};
			var params = {
				'title': '天下没有'+user_profile.nickname+'不能驾驭的风格！也来测测你的时尚基因～',
				'text': '天下没有'+user_profile.nickname+'不能驾驭的风格！也来测测你的时尚基因～',
				'pic': 'http://d05.res.meilishuo.net/pic/_o/e1/75/cdf746d89e05e9e499364dee1ea5_300_300.cj.jpg',
				'url': shareHost + '/fashion_gene/other/?user_id='+user_profile.user_id
			};
			//分享类型
			data.params = params;
			if (wapMod.isNewest(this.req, '6.6.0')) {
				data.appShare = true;
			} else {
				data.appShare = false;
				data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
			}
			data.pageTitle = '我的时尚基因';
			data.isMine = true; //和分享页使用了一个模板，用来区分是不是看自己的基因
			data.use_rem_screen = 750;
			data._CSSLinks = ['fashion_gene/mine'];
			this.render('fashion_gene/mine.html' , data);
		});
	}
	,other:function(){
		var wapMod = base.loadModel('wap/tools.js')
			,os = wapMod.uaos(this.req, wapMod.getMobToken(this.req, this.res))
		var	php = {
			'gene_index':'/fashiongene/Fashion_gene_index?__get_r=1'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			if(data.gene_index.error_code){
				//没有时尚基因，404
				return this.errorPage()
			}
			var shareHost = 'http://' + this.req.headers.host;
			var user_profile = data.gene_index.data.user_profile || {};
			var params = {
				'title': '天下没有'+user_profile.nickname+'不能驾驭的风格！也来测测你的时尚基因～',
				'text': '天下没有'+user_profile.nickname+'不能驾驭的风格！也来测测你的时尚基因～',
				'pic': 'http://d05.res.meilishuo.net/pic/_o/e1/75/cdf746d89e05e9e499364dee1ea5_300_300.cj.jpg',
				'url': shareHost + '/fashion_gene/other/?user_id='+user_profile.user_id
			};
			//分享类型
			data.params = params;
			if (wapMod.isNewest(this.req, '6.6.0')) {
				data.appShare = true;
			} else {
				data.appShare = false;
				data.share = wapMod.shareTo(this.req, params, ['weixin_timeline', 'weixin']);
			}
			data.pageTitle = user_profile.nickname+'的时尚基因';
			data.use_rem_screen = 750;
			data._CSSLinks = ['fashion_gene/mine'];
			this.render('fashion_gene/mine.html' , data);
		});
	}
	,'fashionGene': function(args) {
		// this.debugSnake({'target': 'maoanli.rdlab'});
		var uid = this.readData('user_id',this.req.__get);
		var php = {
			'gene' : '/fashiongene/User_goods_list?geneid='+args +'&__get_r=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.uid = uid;
			data.use_rem_screen = 750;
			data.pageTitle = '我的时尚基因';
			data._CSSLinks = ['fashion_gene/fashionGene'];
			data.geneid = args;
			this.render('fashion_gene/fashionGene.html', data);
		})
	}
	,'game': function(args) {
		this.debugSnake({'target': 'maoanli.rdlab'});

		var php = {
			'game' : '/fashiongene/Test_goods_list?__get_r=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true ;
			data.pageTitle = '完善时尚基因';
			data._CSSLinks = ['fashion_gene/game'];
			this.render('fashion_gene/game.html', data);
		})
	}
	,'aj' : function(params){
		// this.debugSnake({'target': 'maoanli.rdlab'});
		var php = {
			'other' : '/fashiongene/Other_goods_list'
			,'save' : '/fashiongene/Save_test_result'
			,'game' : '/fashiongene/Test_goods_list'
		};
		this.ajaxTo(php[params]);
	}
}
exports.__create = controller.__create(new Function() , controlFns);
