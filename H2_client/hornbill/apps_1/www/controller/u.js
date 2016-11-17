function u(){
	return this;	
}
var controlFns = { 
	'index' : function(args){
		//this.debugSnake({target : 'devlab1'});
		var php = {
			'link' : '/target/Get_base_info?url_u_r_l=' + args.split("@")[0]
		};
		if (args) {
			php.link += '&tid_t_i_d='+args.split("@")[1];
		};
		this.bridgeMuch(php);
		this.listenOver(function(data){
			this.render('footer/shortchain.html' , data);
		});
	}
}
exports.__create = controller.__create(u , controlFns);
