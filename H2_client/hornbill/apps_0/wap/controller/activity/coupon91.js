function coupon91(){
	return this;
}
var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'a91'
		this[args]()
	},
	a91 : function(){
		var php = {
			'coupon91': '/customactivity/CustomActivity_common_tool_single?id=downapp_coupon',
			'couponStatus': '/customactivity/CustomActivity_coupon_status?id=downapp_coupon&cid=879&act_id=2'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '美丽说优惠券活动';
			data._CSSLinks = ['activity/a91'];
			mSelf.render('activity/a91.html' , data);
		});
	}
}
exports.__create = controller.__create(coupon91 , controlFns);
