function refund(){
	return this;
}
var controlFns = {
	'apply' : function(args){
		var php = {
			"refund":"doota::/wap/refund/refund_init"
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		var wapMod = base.loadModel('wap/tools.js');
		this.listenOver(function(data){
 			data.isNewest = wapMod.isNewest(mSelf.req, '4.2.0');
			data.pageTitle = '退款/退货申请';
			if(data.refund === false){
				return mSelf.errorPage();
			}
			if(data.refund.code){
				data.tipMsg = data.refund.msg;
				return mSelf.render('tips_page.html' , data);
			}
			//console.log(JSON.stringify(data.pre_refund))
			data._CSSLinks = ['doota/refund_detail'];
			data.order_id = mSelf.req.__get.order_id;
			data.mid = mSelf.req.__get.mid;
			data.refund_money = mSelf.req.__get.refund_money || '';
			data.refund_goods = mSelf.req.__get.refund_goods || '';
			mSelf.render('app/refund_apply.html' , data);
		});
	},
	'detail' : function(args){
		var php = {
			'refund': 'doota::/wap/refund/refund_detail'
			,'company_list' : 'doota::/wap/express/company_list'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		var wapMod = base.loadModel('wap/tools.js');
		this.listenOver(function(data){
			if(data.refund === false){
				return mSelf.errorPage();
			}
 			data.isNewest = wapMod.isNewest(mSelf.req, '4.2.0');
			data.refund_id = mSelf.req.__get.refund_id;
			data.is_send = mSelf.req.__get.is_send || 0;
			data._CSSLinks = ['doota/refund_detail'];
			data.pageTitle = '退款/退货详情';
			mSelf.render('app/refund_detail.html' , data);
		});
	}
};

exports.__create = controller.__create(refund , controlFns);
