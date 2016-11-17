function appeal(){
	return this;
}

var controlFns = {
	index : function(param){
		var php = {
			'refund_detail' : 'doota::/refund/refund_detail',
			'appeal_detail' : 'doota::/appeal/detail'
		}
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['order_pc/appeal/index'];
			if(data.appeal_detail && data.appeal_detail.code == 0){
				data.refund = data.refund_detail;
				data.refundId = mSelf.readData('refund_id') || 0;
				var render = '', pageTitle ='';
				pageTitle = '仲裁详情';
				render = 'appeal/appeal_buyer.html';
				data.pageTitle = pageTitle
				mSelf.render(render , data);
			} else {
				return mSelf.errorPage();
			}
		});

	}
};

exports.__create = controller.__create(appeal , controlFns);
