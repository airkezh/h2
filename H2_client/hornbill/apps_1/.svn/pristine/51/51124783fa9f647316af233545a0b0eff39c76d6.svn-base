function questionnaire(){
	return this;	
}
var controlFns = {
	'index' : function(param){
		this.main(param);
	},
	'main' : function(param) {
		var mSelf = this;
		var php = {
			'isSurvey' : '/survey/check'
		};
		var tpls = {'app_shop':'questionnaire/app_shop.html', 'online_shop':'questionnaire/online_shop.html'};
		if (!(param in tpls)) param = 'online_shop';
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['questionnaire'];
			data.pageTitle = '问卷调查 - 美丽说';
			mSelf.render(tpls[param], data);	
		});
	}
};

exports.__create = controller.__create(questionnaire , controlFns);
