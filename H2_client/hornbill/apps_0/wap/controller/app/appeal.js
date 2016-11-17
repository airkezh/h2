function appeal(){
	return this;
}
var controlFns = {
	'item' : function(args){
		var php = {
			'refund_detail' : 'doota::/wap/refund/refund_detail2'
			,'appeal_data' : 'doota::/wap/appeal/detail'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		var wapMod = base.loadModel('wap/tools.js');
		this.listenOver(function(data){
			data.isNewest = wapMod.isNewest(mSelf.req, '4.2.0');
			data._CSSLinks = ['doota/appeal'];
			// data.access_token = access_token;
			if(data.appeal_data){
				if(!data.appeal_data.code){
					data.pageTitle = '要求美丽说介入';
					data.refundId = mSelf.readData('refund_id') || 0;
					return mSelf.render('app/appeal.html' , data);
				}
			}
			return mSelf.errorPage();
		});
	}
};

exports.__create = controller.__create(appeal , controlFns);
