function voice(){
	return this;	
}
var controlFns = {
	index : function(){
		var mSelf = this;
		var php = {
			'goods' : 'cosmetic::/wapactivity/Pehchaolin_activity'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '用中国好草本，看中国好声音';
			data._CSSLinks = ['activity/voice'];
			mSelf.render('activity/voice.html' , data);
		});
	}
};
exports.__create = controller.__create(voice , controlFns);
