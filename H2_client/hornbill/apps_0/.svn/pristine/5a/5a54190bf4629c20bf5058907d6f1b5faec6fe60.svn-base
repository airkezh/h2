function qihu() {
	return this;
}
var controlFns = {
	'index' : function(param) {
		this.aboutus(param);
	},
	'tuan' : function(param) {
		var php = {'tuan' : '/qihoo/qihoo_tuaninfo'}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			this.render('api/qihu.html' , data);	
		});
	}
} 
exports.__create = controller.__create(qihu, controlFns);
