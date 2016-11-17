function draw(){
	return this;
}
var controlFns = {
	show : function(params){
		var mSelf = this;
		var php = {
			'url' : '/customactivity/CustomActivity_star_shareurl'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		var model = base.loadModel('wap/tools.js')
		if(!model.isNewest(this.req)){
			return this.redirectTo('/goto/download/')
		}
		this.listenOver(function(data){
			data._CSSLinks = ['activity/draw'];
			mSelf.render('activity/draw/show.html' , data);
		});
	},
	do: function(){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/draw'];
			mSelf.render('activity/draw/main.html' , data);
		});
	},
	main: function(){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/draw'];
			data.num = {};
			data.num.data = mSelf.readData('id',mSelf.req.__get, 0)
			mSelf.render('activity/draw/all.html' , data);
		});
	},
	'set' : function(args){
		var php = {
			'ajax_btn' : '/customactivity/CustomActivity_star_card'
		};
		this.ajaxTo(php[args]);
	}
}
exports.__create = controller.__create(draw , controlFns);
