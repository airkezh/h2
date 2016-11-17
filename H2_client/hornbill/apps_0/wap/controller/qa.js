function qa(){
	return this;	
}
var controlFns = {
	'index': function(){
		var mSelf = this;
		var php = {
			list:'/customactivity/CustomActivity_common_tool_single?id=higo_qa&cid=6245'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = "HIGO时尚擂台";
			data._CSSLinks = ['qa'];
			mSelf.render('qa.html' , data);
		})	
	},
	'answer': function(){
		var mSelf = this;
		var php = {
			list:'/customactivity/CustomActivity_common_tool_single?id=higo_qa&cid=6245'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.goods_title = "HIGO时尚擂台";
			data.pageTitle = data.goods_title;
			data._CSSLinks = ['answer'];
			mSelf.render('answer.html' , data);
		})	
	},
	'timedown': function(){
		var mSelf = this;
		var php = {
			'main' : '/promote/promote_act_v2?type=main'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.goods_title = "美丽说--倒计时";
			data.pageTitle = data.goods_title;
			data._CSSLinks = ['timedown'];
			mSelf.render('timedown.html' , data);
		})	
	},
}
exports.__create = controller.__create(qa , controlFns);
