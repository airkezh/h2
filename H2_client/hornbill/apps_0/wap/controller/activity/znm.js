function znm(){
	return this;
}
var controlFns = {
	ok : function(params){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/znm'];
			mSelf.render('activity/znm/ok.html' , data);
		});
	},
	success : function(params){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/znm'];
			mSelf.render('activity/znm/back.html' , data);
		});
	},
	play : function(params){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

		    var aLuanXu=[];
		    for (var i = 0; i < 32; i++) {
		        aLuanXu[i] = {};
		        aLuanXu[i].num = i + 1;
		        if (i === 1 || i === 2 || i === 3 || i === 4 || i === 5 || i === 6 || i === 0 || i === 25 || i === 26 || i === 24 || i === 30) {
		        	aLuanXu[i].at = 1;
		        }else{
		        	aLuanXu[i].at = 0;
		        }
		    }
		    aLuanXu.sort(function(){return Math.random()>0.5?-1:1;})
		    data.pic = aLuanXu;
			data._CSSLinks = ['activity/znm'];
			mSelf.render('activity/znm/find.html' , data);
		});
	},
	show : function(params){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/znm'];
			mSelf.render('activity/znm/show.html' , data);
		});
	},
	begin : function(params){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/znm'];
			mSelf.render('activity/znm/start.html' , data);
		});
	},
	'set' : function(args){
		var php = {
			'ajax' : '/customactivity/CustomActivity_wap_game_znm'
		};
		this.ajaxTo(php[args]);
	}
}
exports.__create = controller.__create(znm , controlFns);
