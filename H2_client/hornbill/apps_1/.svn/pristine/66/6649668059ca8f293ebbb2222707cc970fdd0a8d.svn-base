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
			data.pageTitle = '听说招行信用卡和微信勾搭上了，生了好多小红包';
			data._CSSLinks = ['activity/merchants_bank'];
			this.render('activity/merchants_bank.html',data);	
		});
	}
}
exports.__create = controller.__create(merchants_bank , controlFns);
