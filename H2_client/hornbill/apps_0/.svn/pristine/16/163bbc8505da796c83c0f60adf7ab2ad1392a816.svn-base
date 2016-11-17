function special(){
	return this;	
}

var controlFns = {
	'index' : function(){
		this.debugSnake({target : 'pmlab1'});
		var self = this,
			wapMod = base.loadModel('wap/tools.js'),
			php = {
				'poster0' : '/poster/Special_poster_m',
				'mobUserInfo': '/customactivity/CustomActivity_wap_user_info'  // 获取wap用户信息 接口
			};

		self.setMDefault(php);
		self.bridgeMuch(php);

		self.listenOver(function(data){
			data.isNewest = wapMod.isNewest(self.req, '4.1.1');
            data.isLogin = (data.mobUserInfo.data.user_id == 0) ? 0 : 1;
            data.pageTitle = '个性化推荐';
            data._CSSLinks = ['special'];
            self.render('special.html', data);
		});
	}
};

exports.__create = controller.__create(special, controlFns);
