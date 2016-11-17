function guessulike(){
	return this;	
}
/*猜你喜欢*/
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	'index' : function(param){
		var php = {
			'datalist' : '/poster/recommended_poster_m',
			'usertag' : '/person/user_tag',
			'connect_weixin' : '/connect/weixin'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectWX(this, data);
			data.XR = true;
			data.isWx = true;
			data.use_rem_screen = true;
			data.isLogin = data.userInfo.user_id == 0 ? false : true;
			data._CSSLinks = ['guessulike'];
			data.pageTitle = '猜你喜欢';
			this.render('guessulike.html' , data);
		});
	},

};
exports.__create = controller.__create(guessulike , controlFns);
