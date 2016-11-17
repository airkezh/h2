function newcoupon(){
	return this;	
}
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	'index' : function(args){
		// this.debugSnake({target : 'maoanli.rdlab'});
		var php = {
			'connect_weixin' : '/connect/weixin',
			'coupon' :  '/weixin/Weixin_mall_coupon'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectWX(this, data);
			data.tabShow = 1;
			data.tabIndex = 4;
			data.use_rem_screen = true;
			data.pageTitle = '优惠劵'
			data._CSSLinks = ['wx_new/newcoupon'];
			this.render('wx_new/newcoupon.html' , data);
		})
	}
};
exports.__create = controller.__create(newcoupon , controlFns);
