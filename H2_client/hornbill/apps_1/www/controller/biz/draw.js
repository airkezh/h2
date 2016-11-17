function draw() {
	return this;
}
var controlFns = {
	download: function(){
		var mSelf = this;
		var php = {};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var _ua = mSelf.req.headers['user-agent'].toLowerCase();
			if (/(iPhone|iPad|iPod|iOS)|(Android)/i.test(_ua)) {
				mSelf.redirectTo('http://wap.meilishuo.com/activity/draw/do/');
			}else{
				data._CSSLinks = ['draw'];
				mSelf.render('activity/detail.html' , data);
			}
		});
	}
}
exports.__create = controller.__create(draw, controlFns);
