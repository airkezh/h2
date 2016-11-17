function demo(){
	return this;	
}
var demoList = [
	['banner', [['homeBanner','/banner/home_banner_m']]]
	, ['dialog']
	, ['posterWallPa', [['goods','/poster/latest_poster_m']]]
	, ['posterWallFall', [['goods','/poster/latest_poster_m']]]
]
var controlFns = {
	'index' : function(){
		var php = {}
			, mSelf = this

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '移动前端demo页 - 美丽说' 
			data._CSSLinks = ['demo/demo'];
			data.demoList = demoList
			mSelf.render('demo/demo.html' , data);
		});
	}
};
demoList.map(function(v,k){
	var tag = v[0]
		, apis = v[1]
	controlFns[tag] = function(){
		var php = {}
			, mSelf = this

		apis && apis.map(function(v, k){
			php[v[0]] = v[1]	
		})

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = tag + ' - 移动前端demo页 - 美丽说' 
			data._CSSLinks = ['demo/' + tag];

			mSelf.render('demo/' + tag + '.html' , data);
		});
	}
})

exports.__create = controller.__create(demo , controlFns);
