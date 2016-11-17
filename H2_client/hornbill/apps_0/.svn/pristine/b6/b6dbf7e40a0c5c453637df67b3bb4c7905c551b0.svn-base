function couponShare(){
		return this;
}
var controlFns = {
	index : function(args){
		var php = {'pic':'/note/coupon_qr_code?shop_id=' + args};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			return this.render('activity/couponShare.html' , data);
		});
	},
	qr : function(args){
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var _args = 'meilishuo://shop.meilishuo/?json_params=%7B%22shop_id%22%3A%22' + args + '%22%7D'
			_args = encodeURIComponent(_args);
			return this.redirectTo('/goto/open/?url=' + _args + '&bg=%2Fdownload%2F');
		});
	}
};
exports.__create = controller.__create(couponShare , controlFns);
