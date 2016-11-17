function five(){
		return this;
}
var controlFns = {
	index : function(){
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			data._CSSLinks = ['activity/five'];
			this.render('activity/five.html' , data);
		});
	},
	login : function(){
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.islogin = 0;
			if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
				data.islogin = 1;
			};
			data._CSSLinks = ['activity/fiveLogin'];
			this.render('activity/fiveLogin.html' , data);
		});
	}
};
exports.__create = controller.__create(five , controlFns);
