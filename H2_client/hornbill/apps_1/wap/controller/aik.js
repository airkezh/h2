function aik(){
	return this;
}
var controlFns = {
	index : function(){
		return this.main();
	},
	main : function(){
		// this.debugSnake({'target':'devlab1'});
		var php  = {
			'tab': '/mua/getTabs?show_type=2',
			'shop': '/mua/getCoupons?shop_id=173471',
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=mua&cid=3411'
		};
		var mSelf = this;
		var wapMod = this.loadModel('tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(Object.getOwnPropertyNames(data.tab.data).length < 2 || !data.tab.data.next) return mSelf.errorPage();
			if(data.pageData.share){
				var shareData = data.pageData.share;
				var params = {
					'title' : shareData.title,
					'text' : shareData.text,
					'pic' : {
						"weixin" : shareData.pic_weixin,
						"weixin_timeline" : shareData.pic_weixin,
						"default" : shareData.pic
					},
					'url' : shareData.link
				};
				data.share = wapMod.shareTo(mSelf.req, params);
			} else {
				data.share = false;
			}
			if(data.shop.code!=0){
				alert(data.shop.message);
			}
			// data.shop = false;
			data.show_type = 2;
			data.isMua=false;
			data._CSSLinks = ['mua/main2'];
			data.pageTitle = 'aik' + ' - 美丽说';
			mSelf.render('mua/main.html', data);
		});
	}
};

exports.__create = controller.__create(aik, controlFns);
