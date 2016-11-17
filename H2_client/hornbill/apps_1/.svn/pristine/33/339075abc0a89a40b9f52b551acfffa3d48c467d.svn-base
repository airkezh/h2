function desire() {
	return this;
}

var controlFns = {
	index: function() {
		// this.debugSnake({
		// 	'target': 'maoanli.rdlab'
		// });
		var page = this.readData('page', this.req.__get, 0) | 0;
		var php = {
			'poster0': '/style/Style_list_pc',
			'banner': '/style/Style_list_pc_banner?cid=13035'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//获取分页总数
			data.groupPg = {};
			data.groupPg.page_size = 220;
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page;
			data.pageTitle = 'Desire 潮流同款';
			data._CSSLinks = ['desire/index'];
			this.render('desire/index.html', data);
		});
	}
}

exports.__create = controller.__create(desire, controlFns);