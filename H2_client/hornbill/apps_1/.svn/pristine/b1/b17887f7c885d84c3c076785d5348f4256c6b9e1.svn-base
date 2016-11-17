function reportGoods() {
	return this;
}
var controlFns = {
	"index": function(event_id) {
		var event_id = event_id||this.req.__get.event_id;
		var php = {
			'reportType':'/risk/risk_get_report_type?twitter_id='+event_id,
            'reportCheck':'/risk/risk_post_report_check?twitter_id='+event_id
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.pageTitle = '美丽说,发现、收藏、分享我的美丽点滴，让改变发生';
			data._CSSLinks = ["reportGoods"];
			data.event_id = event_id;
			this.render("reportGoods.html", data);
		});
	},
};
exports.__create = controller.__create(reportGoods, controlFns);