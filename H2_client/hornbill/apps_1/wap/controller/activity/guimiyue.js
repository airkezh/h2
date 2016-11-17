function guimiyue(){
	return this;
}
var controlFns = {
	1 : function(){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '闺蜜月来袭';
			data._CSSLinks = ['activity/guimiyue'];
			mSelf.render('activity/guimiyue.html' , data);
		});
	}
};
exports.__create = controller.__create(guimiyue , controlFns);
