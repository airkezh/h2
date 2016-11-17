function fraud() {
	return this;
}
var controlFns = {
	'index' : function(){
        var php = {}
        this.bindDefault(php)
        this.bridgeMuch(php)
        this.listenOver(function(data){
             data._CSSLinks = [ 'fraud' ];
             data.pageTitle = '防诈骗';
             this.render('fraud/index.html', data);
        })
	 }
} 
exports.__create = controller.__create(fraud, controlFns);
