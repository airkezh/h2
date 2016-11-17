function shop(){
	return this;
}
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	/* 店铺首页 */
	'index' : function(args){
		// this.debugSnake({target : 'maoanli.rdlab'});
		var shop_id = this.req.__get.shop_id||0;
		var php = {
			'connect_weixin' : '/connect/weixin',
			'basic' : '/weixin/Weixin_mall_shop_info' // @require shop_id
			,'hot' : '/weixin/Weixin_mall_shop_hot' // @require shop_id
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectWX(this, data);
			data.tabType = this.req.__get.tab || 'base';
			data.use_rem_screen = true;
			data.share = true;
			data.shop_id = shop_id;
			data.pageTitle = '商家店铺'
			data._CSSLinks = ['wx_new/shop'];
			this.render('wx_new/shop.html' , data);
		})
	}
};
exports.__create = controller.__create(shop , controlFns);
