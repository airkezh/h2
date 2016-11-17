function gettaobao(){
	return this;	
}
var controlFns = {
	'index' : function(args){
		var url_a = this.readData('url_a', this.req.__get,'')
			, url_b = this.readData('url_b', this.req.__get,'')
			, url = url_a + '?' + url_b

		var php = {
			'gettaobao' : '/systems/systems_gettaobao?url=' +encodeURIComponent(url) 
		};

		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// console.log(data.gettaobao)
			data._CSSLinks = [];
			mSelf.render('gettaobao.html' , data);
		});	
	}
};

exports.__create = controller.__create(gettaobao , controlFns);
