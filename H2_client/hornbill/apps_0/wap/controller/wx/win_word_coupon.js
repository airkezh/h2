function win_word_coupon(){
	return this;	
}
/* 红包口令 */
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	'index' : function(args){
		var php = {
			'connect_weixin' : '/connect/weixin'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '奔跑吧美丽说';
			wapMod.connectWX(this, data);
			data.share = true;
			data._CSSLinks = ['wx_new/win_word_coupon'];
			this.render('wx_new/goto_word_coupon.html', data);
		});
	},
	'result' : function(args){
		var status = this.req.__get.page || 0;
		var php = {
			'connect_weixin' : '/connect/weixin'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectWX(this, data);
			data.status = status;
			data.share = true;
			data.pageTitle = '奔跑吧美丽说';
			data._CSSLinks = ['wx_new/win_word_coupon'];
			this.render('wx_new/win_word_coupon.html', data);
		});
	},
	'aj': function(params){
		var php = {
			'win_coupon':'/weixin/weixin_mall_campus_promotion'
		};
		this.ajaxTo(php[params]);
	}
};
exports.__create = controller.__create(win_word_coupon , controlFns);
