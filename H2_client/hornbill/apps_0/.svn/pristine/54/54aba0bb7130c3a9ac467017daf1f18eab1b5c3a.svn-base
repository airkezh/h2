function activity(){
	return this;	
}
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	'index' : function(args){
		// this.debugSnake({target : 'longchi.rdlab'});
		var php = {
			'connect_weixin' : '/connect/weixin',
			'coupon' :  '/weixin/Weixin_818_couponStatus',
			'mainInfo' : '/weixin/Weixin_mall_818_main'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectWX(this, data);
			// data.mainInfo = data.mainInfo && (data.mainInfo.error_code == 0) && data.mainInfo.data || {}; 
			data.use_rem_screen = true;
			data.share = true; //控制分享的入口
			data.pageTitle = data.mainInfo.title || '美丽说-狂欢节'
			data._CSSLinks = ['activity/wxsqActivity'];
			this.render('activity/wxsqActivity.html' , data);
		})
	}
};
exports.__create = controller.__create(activity , controlFns);




