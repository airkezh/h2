function im() {
	return this;
}
var controlFns = {
	im: function(params) {
		var php = {
			'open_msg_num': 'im::/im/open_msg_num'
		};
		this.ajaxTo(php[params]);
	}
};

exports.__create = controller.__create(im, controlFns);
