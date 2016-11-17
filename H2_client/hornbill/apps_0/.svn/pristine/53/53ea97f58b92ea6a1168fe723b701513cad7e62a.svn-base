function exchange_coupon(){
	return this;	
}
var controlFns = {
	page : function(){
		// this.debugSnake({'target':'devlab1'});
		var mSelf = this;
		var php = {
			'exchange_coupon' : '/coupon/Get_a_coupon_by_xiaomi'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			
			data.pageTitle = '兑换优惠券';
			data._CSSLinks = ['activity/exchange_coupon'];
			mSelf.render('activity/exchange_coupon.html' , data);
		});
	}
};
exports.__create = controller.__create(exchange_coupon , controlFns);
