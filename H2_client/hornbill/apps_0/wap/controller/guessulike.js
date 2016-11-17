function guessulike() {
	return this;
}
var controlFns = {
	'index' : function(param){
		var php = {
			'datalist' : '/poster/recommended_poster_m?frame=0&limit=4',
			'usertag' : '/person/user_tag'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.use_rem_screen = true;
			data.isLogin = data.userInfo.user_id == 0 ? false : true;
			data._CSSLinks = ['guessulike'];
			data.pageTitle = '猜你喜欢';
			this.render('guessulike.html' , data);
		});
	},
	'aj': function(params){
		var php = {
			'recommended_poster_m': '/poster/recommended_poster_m'
		};
		this.ajaxTo(php[params]);
	}
}
exports.__create = controller.__create(guessulike, controlFns);
