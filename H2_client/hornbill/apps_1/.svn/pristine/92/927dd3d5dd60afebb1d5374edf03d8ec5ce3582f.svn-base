function mua() {
	return this;
}
var controlFns = {
	index: function() {
		// this.debugSnake({'target':'devlab1'});
		//临时举措
		var cid = "";
		var date = new Date(),
			day = date.getDay();
		switch (day) {
			case 2:
			case 3:
				cid = 3927;
				break;
			case 4:
			case 5:
				cid = 4767;
				break;
			case 6:
			case 0:
			case 1:
				cid = 4769;
				break;
		}
		var php = {
			'tab': '/mua/getTabs',
			'coupons': '/mua/getCoupons?shop_id=171023',
			'pageData': '/customactivity/CustomActivity_common_tool_single?id=pcMua&cid=' + cid
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.tab || !data.coupons) {
				return this.errorPage();
			}
			data.onlyShowGoTop = true;
			data.pageTitle = 'MUA 卖场 - 美丽说';
			data.keywords = '美丽说,美丽,网购,MUA,潮流新款,首发';
			data.meta_description = 'MUA-美丽说旗下全新卖场品牌,提供全网首发的潮流新款与优质的购物体验,品牌含义:MUA为亲吻,集少女的甜美,热情,性感于一身,爱自己就来MUA一个吧!';
			data._CSSLinks = ["mua"];
			this.render("mua/mua.html", data);
		});
	},
	main: function() {
		this.index();
	}
};
exports.__create = controller.__create(mua, controlFns);