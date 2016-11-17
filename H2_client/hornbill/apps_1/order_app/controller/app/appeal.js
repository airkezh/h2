function appeal(){
	return this;
}
var controlFns = {
	'item' : function(args){
		var php = {
			'appeal_data' : 'doota::/wap/appeal/detail'
		};
		var mSelf = this;
		var wapMod = this.loadModel('tools.js');
		var os = wapMod.uaos(this.req);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isNewest = wapMod.isNewest(mSelf.req, '4.2.0');
			data.isApad = os.apad;
			data._CSSLinks = ['order_app/appeal/appeal'];
			if(data.appeal_data){
				if(!data.appeal_data.code){
					data.pageTitle = '要求美丽说介入';
					data.refundId = mSelf.readData('refund_id') || 0;
					return mSelf.render('appeal/appeal.html' , data);
				}
			}
			//data = data.refund_detail;
			mSelf.render('appeal/appeal.html', data);

		});
	}
};

exports.__create = controller.__create(appeal , controlFns);
