function baidu(){
	return this;
}
var controlFns = {
	result : function(params){
		var php = {'act' : '/customactivity/CustomActivity_wap_privilege_user_award'}
		, mSelf = this
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '百度奖品名单';
			data.headTag = params;
			data.act = data.act.data;
			data._CSSLinks = ['activity/baidu'];
			mSelf.render('activity/baidu/result.html' , data);
		});
	}
}
exports.__create = controller.__create(baidu , controlFns);
