var controlFns = {
	'test' : function(){
		console.log(this.req.headers['user-agent'])
		this.render('test.html' , {});
	},
	'index' : function(args){
		var toid = this.req.__get.toid || 0
		var php = {
		}
		var mSelf = this

        this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.host = data.MAIN_SITE_DOMAIN 
			data.isH5 = true
			data.toid = toid

			data.pageTitle = '美丽说客服' 
			data._CSSLinks = ['im/im'];

			data.headTag = 'im';

			mSelf.render('client/im.html' , data);
		});
	}
};
exports.__create = controller.__create(new Function(), controlFns);
