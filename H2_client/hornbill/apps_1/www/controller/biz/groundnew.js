function groundnew() {
	return this;
}
var controlFns = {
	'index' : function(){
		return this.ground();
	},
	'ground': function(req){
		var _t = this.req.__get.type;
		(_t >= 0 || _t < 6) ? _t = parseInt(_t) : _t = 0;
		var _type = ['dress','skirt','pants','shoes','bag','other'][_t];
		_t = this.req.__get.type;
		delete this.req.__get.type;
		var php = {
			'service' : '/share/service_guarantee',
			'list0' : '/customactivity/CustomActivity_promote_dress_new?type=dress',
			'list1' : '/customactivity/CustomActivity_promote_dress_new?type=skirt',
			'list2' : '/customactivity/CustomActivity_promote_dress_new?type=pants',
			'list3' : '/customactivity/CustomActivity_promote_dress_new?type=shoes',
			'list4' : '/customactivity/CustomActivity_promote_dress_new?type=bag',
			'list5' : '/customactivity/CustomActivity_promote_dress_new?type=other'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.type = _t || 0;
			data.secondNavHold = 1;
			data.pageTitle = '2014春夏服饰新品发布-美丽说';
			data._CSSLinks = ['huodong/groundnew'];
			data.headTag = 'groundnew'
			data.topbanner = false
			this.render('huodong/groundnew.html' , data);
		});
	}
}
exports.__create = controller.__create(groundnew, controlFns);
