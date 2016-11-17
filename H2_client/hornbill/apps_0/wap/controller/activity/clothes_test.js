function clothes_test(){
	return this;	
}
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	'index' : function(){
		 this.debugSnake({target : 'qinzhewu.rdlab'});
		var php = {
			'select_infos' : '/user/Mob_dress_research?type=question'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = true;
			data.pageTitle = '定制你的专属穿搭—美丽说';
			data._CSSLinks = ['activity/clothes_test'];
			this.render('activity/clothes_test/answer.html' , data);
		})
	},
	'result' : function(){
		this.debugSnake({target : 'qinzhewu.rdlab'});
		var answer = this.req.__get.test;
		var php = {
			'select_result' : '/user/Mob_dress_research?type=answer&'+answer
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = true;
			data.pageTitle = '定制你的专属穿搭—美丽说';
			data._CSSLinks = ['activity/clothes_result'];
			this.render('activity/clothes_test/result.html', data);
		});

	}
};
exports.__create = controller.__create(clothes_test , controlFns);
