function template(){
	return this;	
}
var controlFns = {
	index : function(){
		var mSelf = this;
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=pc_template'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = data.pageData.title || '美丽说';
			data._CSSLinks = ['activity/template'];
			mSelf.render('activity/template.html' , data);
		});
	}
};
exports.__create = controller.__create(template , controlFns);
