function uploadDemo() {
	return this;
}
var controlFns = {
	index: function() {
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data._CSSLinks = ['uploadDemo/demo'];
			data.pageTitle = 'uploadDemo' + ' - 美丽说';
			this.render('uploadDemo/index.html', data);
		});
	}
};

exports.__create = controller.__create(uploadDemo, controlFns);