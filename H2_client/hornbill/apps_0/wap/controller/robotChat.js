function robotChat(){
	return this;	
}
var controlFns = {
	'index': function(){
		var php = {};
        this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.userInfo.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
			data.use_rem_screen = true;
			data.pageTitle = 'MIXI智能机器人' 
			data._CSSLinks = ['robotChat'];
			this.render('robotChat.html', data);
		});
	}
};

exports.__create = controller.__create(robotChat , controlFns);