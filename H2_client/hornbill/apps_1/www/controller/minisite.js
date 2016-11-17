function minisite(){
	return this; 
}
var controlFns = {
    index : function(){
	},
	lancome : function(){
		var php = {
			'main' : '/minisite/minisite_main/lancome'
		};	
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
	//		console.log(data.main)
			data.pageTitle = '兰蔻LANCOME的美丽说 - 美丽说';
		    data._CSSLinks = ['minisite/lancome'];
			mSelf.render('/minisite/lancome.html' , data);
		});
	}
}
exports.__create = controller.__create(minisite , controlFns);
