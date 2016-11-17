function clothes_test(){
	return this;	
}
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	'index' : function(){
		 //this.debugSnake({target : 'longchi.rdlab'});
		var wx_from = this.req.__get.wx_from || '';
		var php = {
			'connect_weixin' : '/connect/weixin'
			,'select_infos':'/weixin/weixin_mall_dress_research?type=question'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectWX(this, data);
			data.use_rem_screen = true;
			data.wx_from = wx_from;
			data.pageTitle = '定制你的专属穿搭—美丽说';
			data.share = true;
			data._CSSLinks = ['wx_new/clothes_test'];
			this.render('wx_new/clothes_test.html' , data);
		})
	},
	'result' : function(){
		// this.debugSnake({target : 'longchi.rdlab'});
		var answer = this.req.__get.test;
		var php = {
			'connect_weixin' : '/connect/weixin'
			,'select_result':'/weixin/weixin_mall_dress_research?type=answer&'+answer
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectWX(this, data);
			data.use_rem_screen = true;
			data.share = true;
			data.pageTitle = '定制你的专属穿搭—美丽说';
			data._CSSLinks = ['wx_new/clothes_test_result'];
			this.render('wx_new/clothes_test_result.html', data);
		});

	}
};
exports.__create = controller.__create(clothes_test , controlFns);
