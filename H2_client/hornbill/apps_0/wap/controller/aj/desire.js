function desire() {
	return this;
}
var controlFns = {
	index: function(params) {
		// this.debugSnake({
		// 	'target': 'maoanli.rdlab'
		// });
		var php = {
			'indexWaterfall': '/style/Style_new_buy_list',
			'detailWaterfall': '/style/Style_catalog_list'
		}
		this.ajaxTo(php[params])
	},
	search: function(params) {
		// this.debugSnake({
		// 	'target': 'maoanli.rdlab'
		// });
		var php = {
			'list': '/style/Style_search_list'
		}
		this.ajaxTo(php[params])
	}
}

exports.__create = controller.__create(desire, controlFns);