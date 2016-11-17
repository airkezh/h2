function friendApp(){
	return this;
}
var controlFns = {
	index : function(params){
		var mSelf = this;
		var php = {
			'pageDate' : '/customactivity/CustomActivity_common_tool_singleNew?id=recommend'
			,'adm_banner' : '/adm/Ad_Show?slot_id=69'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '发现 - 美丽说';
			data._CSSLinks = ['friendApp'];
			mSelf.render('friendApp.html', data);
		});
	}
}
exports.__create = controller.__create(friendApp , controlFns);
