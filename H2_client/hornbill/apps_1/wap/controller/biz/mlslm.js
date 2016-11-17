function mlslm(){
	return this;
}
var controlFns = {
	'activity' : function (){
		var php = {
			'poster0' : '/commerce/ka_poster_mob?limit=30'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if(!data.poster0) return this.errorPage();
			data.pageTitle = '美丽说热卖';
			data._CSSLinks = ['biz/mlslm/activity'];
			this.render('biz/mlslm/activity.html', data);
		});
	},
	'list' : function (){
		var cid = this.req.__get.cid
		var php = {
			'webCps':'/customactivity/customActivity_common_tool_singleNew?id=web_union_cps&cid='+ cid 
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			// if(!data.poster0) return this.errorPage();
			data.pageTitle = '美丽说热卖';
			data._CSSLinks = ['biz/mlslm/list'];
			this.render('biz/mlslm/list.html', data);
		});
	}
}
exports.__create = controller.__create(mlslm , controlFns);
