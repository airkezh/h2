function self() {
	return this;
}
var controlFns = {
	index: function(params) {
		var php = {
			'coupon': '/coupon/apply'
		}
		this.ajaxTo(php[params]);
	}
}

exports.__create = controller.__create(self, controlFns);