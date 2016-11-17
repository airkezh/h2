function superMaster(){
	return this;
}
var controlFns = {
	index : function(testId){
		var php = {
			'superMaster':'/customactivity/CustomActivity_super_master?id=superMaster&cid=' + testId + '&__get_r=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data){
			data.XR = true;
			data.testId = testId;
			data.pageTitle = '通缉时尚范儿';
			data._CSSLinks = ['activity/superMaster'];
			this.render('activity/superMaster.html', data);
		});
	}
};

exports.__create = controller.__create(superMaster, controlFns);