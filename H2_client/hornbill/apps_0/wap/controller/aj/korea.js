function korea() {
	return this;
}
var controlFns = {
	waterFall: function(params) {
		// this.debugSnake({
		// 	'target': 'chonglishi.rdlab'
		// });
		var php = {
			'indexWaterFall': '/Koreahall/Korea_Waterfall_list',
			'listWaterFall': '/Koreahall/Korea_WaterfalClassification_list'
		}
		this.ajaxTo(php[params])
	}
}

exports.__create = controller.__create(korea, controlFns);