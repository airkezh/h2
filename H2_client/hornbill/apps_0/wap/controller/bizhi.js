function bizhi() {
	return this;
}

var controlFns = {
	index: function() {
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.pageTitle = '圣诞壁纸';
			data._CSSLinks = ['bizhi'];
			this.render('bizhi.html', data);
		});
	}
};


exports.__create = controller.__create(bizhi, controlFns);