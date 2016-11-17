function list91(){
	return this;
}
var controlFns = {
	award : function(params){
		//this.req.__get.banner_id = '73868a0c63722bb27c23136784e3d1be';
		var php = {
			'list' : '/customactivity/CustomActivity_wap_privilege_user_award'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '91获奖名单';
			data._CSSLinks = ['activity/list91'];
			mSelf.render('activity/list91/award.html' , data);
		});
	}
}
exports.__create = controller.__create(list91 , controlFns);
