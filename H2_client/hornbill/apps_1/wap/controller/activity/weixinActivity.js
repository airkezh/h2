function weixinActivity(){
	return this;
}
var controlFns = {
	'tips' : function(params){
		var php = {'msg' : '/weixin/weixin_show_reply_m?reply_id=' + this.req.__get.reply_id}
		, mSelf = this

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '微信活动';
			data._CSSLinks = ['activity/weixinActivity'];
			mSelf.render('activity/weixinActivity.html' , data);
		});
	}
}
exports.__create = controller.__create(weixinActivity , controlFns);
