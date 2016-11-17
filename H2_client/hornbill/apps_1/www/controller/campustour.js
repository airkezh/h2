function campustour() {
	return this;
}
var controlFns = {
	"index": function() {
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.onlyShowGoTop = true;
			data.pageTitle = '美丽说,发现、收藏、分享我的美丽点滴，让改变发生';
			data._CSSLinks = ["campustour"];
			this.render("campustour.html", data);
		});
	},
};
exports.__create = controller.__create(campustour, controlFns);