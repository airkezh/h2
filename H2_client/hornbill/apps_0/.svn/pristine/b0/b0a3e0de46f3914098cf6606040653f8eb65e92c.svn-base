function collocation() {
	return this;
}
var controlFns = {
	'detail' : function(param){
		var tag_word = this.readData('tag_word',this.req.__get, '');
		var dress_id = this.readData('dress_id',this.req.__get, 0);
		if(!tag_word.length || !dress_id) return this.errorPage();
		var php = {
			'detail' : '/search/search_collocation?tag_word=' + tag_word + '&dress_id=' + dress_id + '&__get_r=1'
		};
		this.bindDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.detail.data) return this.errorPage();
			data.XR = true;
			data.dress_id = dress_id;
			data.use_rem_screen = 750;
			data._CSSLinks = ['collocation/detail'];
			data.pageTitle = '搭配详情';
			this.render('collocation/detail.html' , data);
		});
	},
	'aw': function(params){
		var php = {
			'batchlike': '/twitter/batch_like'
		};
		console.log(4444444)
		this.ajaxTo(php[params]);
	}
}
exports.__create = controller.__create(collocation, controlFns);
