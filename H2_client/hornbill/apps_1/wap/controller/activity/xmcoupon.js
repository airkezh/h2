function xmcoupon(){
	return this;
}
var controlFns = {
	gcou: function(){
		var php = {
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美丽说优惠券活动';
			data._CSSLinks = ['activity/xmcou'];
			this.render('activity/xmcou.html' , data);
		});
	},

	gsucc: function(){
		var php = {
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美丽说优惠券活动';
			data._CSSLinks = ['activity/succcou'];
			this.render('activity/succcou.html' , data);
		});
	},

	exchange : function (){
		var php = {};
		var from = this.req.__get.from;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			data.from = from;
			data.pageTitle = '优惠券兑换';
			data._CSSLinks = ['activity/coupon_exchange'];
			this.render('activity/coupon_exchange.html', data);
		});
	},

	thousand : function(){
		var imei = this.readData('imei',this.req.__get, 0);
		var php = {
			'coupon' : '/coupon/judge_has_received?imei=' + imei
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			if(data.coupon && data.coupon.code == -1){

				mSelf.redirectTo('/activity/xmcoupon/result/1', false);
				return;
			}
			data.mlsApp = data.os.mlsApp;
			data.imei = imei;
			data.pageTitle = '新人专享';
			data._CSSLinks = ['activity/thousand_xm'];
			this.render('activity/thousand_xm.html' , data);
		});
	},
	result : function(result){
		var result = result||this.req.__get.result || 1;
		var php = {
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.mlsApp = data.os.mlsApp;
			data.result = result;
			data.pageTitle = '新人专享';
			data._CSSLinks = ['activity/thousand_xm'];
			this.render('activity/thousand_suc.html' , data);
		});
	}

};
exports.__create = controller.__create(xmcoupon, controlFns);
