function agreement(){
	return this;
}
var controlFns = {
	'notice' : function(){
		var ua = this.req.headers['user-agent'];
		var platform = 'androrid';
		if(/(iPad)/i.test(ua)){
			platform = 'iPad';
		} else if (/(iPhone|iPod|iOS)/i.test(ua)){
			platform = 'iPhone';
		}
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.ios = platform;
			mSelf.render('com/notice.html' , data);
		});
	},
	'new' : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			mSelf.render('com/notice_new_down.html' , data);
		});
	},
	'index' : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['agreement'];
			mSelf.render('agreement.html' , data);
		});
	},
	'wuyougou' : function(){
		 var php = {
			'know_center':'/robot/knowledge_search?cate_id=289&channel=1'
		 };
		 var mSelf = this;
		 this.setMDefault(php);
		 this.bridgeMuch(php);
		 this.listenOver(function(data){
			 data._CSSLinks = ['help/center'];
			 data.pageTitle = '帮助中心';
			 mSelf.render('help/center.html' , data);
		 }); 
	},
	'userhelp' : function(){
		var php = {
		 	'gouwubangzhu': '/partner/partner_post?id=163',
		 	'xinshoushanglu': '/partner/partner_post?id=161'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		 this.listenOver(function(data){
			 data._CSSLinks = ['userhelp'];
			 mSelf.render('userhelp.html' , data);
		 });
	}
};

exports.__create = controller.__create(agreement , controlFns);
