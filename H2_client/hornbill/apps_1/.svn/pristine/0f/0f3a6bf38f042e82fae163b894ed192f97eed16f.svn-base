function pricoupon(){
	return this;
}
var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'downcou'
		this[args]()
	},
	downcou : function(){
		var sid = this.readData('id', this.req.__get, 0);
		var php = {
			'couponStatus': '/customactivity/CustomActivity_market_coupon_status?id='+sid
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.couponStatus) return mSelf.errorPage();
			data.sid = sid;
			data.pageTitle = '美丽说优惠券活动';
			data._CSSLinks = ['activity/downcou'];
			mSelf.render('activity/downcou.html' , data);
		});
	}
}
exports.__create = controller.__create(pricoupon, controlFns);
