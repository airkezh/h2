function getCoupons() {
	return this;
}
var controlFns = {
	index: function() {
		// this.debugSnake({'target':'devlab1'});
		var php = {
			// 是否登陆及登陆信息
			"userInfo": "/customactivity/CustomActivity_wap_user_info"
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.isLogin = data.userInfo.user_id == 0 ? false : true;
			data.pageTitle = "领取优惠券";
			data._CSSLinks = ["activity/getCoupons"];
			this.render("activity/getCoupons.html", data);
		});
	}
};
exports.__create = controller.__create(getCoupons, controlFns);