function merchants_bank() {
	return this;
}
var controlFns = {
	'index' : function(){
		this.main();
	},
	'main' : function(){
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '招行信用卡微信支付送红包';
			// data.headTag = 'merchants_bank';
			data._CSSLinks = ['activity/merchants_bank'];
			this.render('activity/merchants_bank.html',data);	
		});
	}
}
exports.__create = controller.__create(merchants_bank , controlFns);
