function download318(){
	return this;	
}

var controlFns = {
	'index' : function(){
		var self = this
			, php = {
				'dataInfo' : '/customactivity/CustomActivity_common_tool_single?id=download318'
			};

		self.setMDefault(php);
		self.bridgeMuch(php);

		self.listenOver(function(data){
            data.pageTitle = data.dataInfo.title ? data.dataInfo.title : '318最美春装节';
            data._CSSLinks = ['activity/download318'];
            self.render('activity/download318.html', data);
		});
	}
};

exports.__create = controller.__create(download318, controlFns);
