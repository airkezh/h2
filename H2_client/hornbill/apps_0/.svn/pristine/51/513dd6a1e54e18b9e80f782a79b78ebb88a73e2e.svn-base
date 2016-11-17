function prev() {
	return this;
}

var controlFns = {
	index: function(args) {
		args = (args in controlFns) ? args : 'main'
		this[args]()
	},
	main: function() {
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.XR = true;
			data.use_rem_screen = true;
			data.pageTitle = '往期回顾';
			data._CSSLinks = ['prev'];
			this.render('prev.html', data);
		});
	}
};

exports.__create = controller.__create(prev, controlFns);