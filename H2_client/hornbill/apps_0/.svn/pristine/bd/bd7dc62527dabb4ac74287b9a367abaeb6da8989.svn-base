function crest() {
	return this;
}
var controlFns = {
	"index": function() {
		// this.debugSnake({'target':'devlab1'});
		var php = {
			// 是否登陆及登陆信息
			"userInfo": "/customactivity/CustomActivity_wap_user_info",
			// 分享的数据，有title，text，url和pic
			"shareData": "/customactivity/CustomActivity_wap_zhenpin_share",
			// 商品列表
			"list": "/customactivity/CustomActivity_common_tool_singleNew?id=achieve_zhenpinbaifumei",
			// 剩余的抽奖次数
			"num": "/customactivity/CustomActivity_wap_zhenpin_lottery?countOnly=1"
		}
		var self = this;
		var wapMod = base.loadModel("wap/tools.js");
		self.setMDefault(php);
		self.bridgeMuch(php);
		self.listenOver(function(data) {
			var crestShareTitle = data.shareData.shareData.weixin_timeline.title,
				crestShareText = data.shareData.shareData.weixin_timeline.text;
			var params = {
				"title": {
					"weixin_timeline": crestShareTitle,
					"weixin": crestShareTitle,
					"default": data.shareData.shareData.qzone.title
				},
				"text": {
					"weixin_timeline": crestShareText,
					"weixin": crestShareText,
					"default": data.shareData.shareData.qzone.text
				},
				"pic": data.shareData.shareData.weixin_timeline.pic,
				"url": data.shareData.shareData.weixin_timeline.url
			};
			data.share = wapMod.shareTo(self.req, params);
			data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
			data.pageTitle = "成就臻品白富美 美白神器0元起";
			data._CSSLinks = ["activity/crest"];
			self.render("activity/crest.html", data);
		});
	}
};
exports.__create = controller.__create(crest, controlFns);