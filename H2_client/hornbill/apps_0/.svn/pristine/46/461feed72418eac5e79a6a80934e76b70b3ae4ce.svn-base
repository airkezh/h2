function medal(){
	return this;	
}
var controlFns = {
	'index' : function(){
		this.list();
		
	},
	'list' : function(user_id){
		var php = {
			'user_info':'/person/user_info?user_id='+user_id,
			'list0' : '/medal/mlist?type=0',
			'list1' : '/medal/mlist?type=1',
			'list2' : '/medal/mlist?type=2',
			'list3' : '/medal/mlist?type=3',
			'list4' : '/medal/mlist?type=5'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isU = this.req.url.match(/medal\/u/g);
			data.user_id_in = user_id;
			data._CSSLinks = ['medal','medal-common'];
			data.pageTitle = '所有勋章-美丽说';
			data.headTag = 'medal';
			this.render('medal/list.html' , data);
		});

	},
	'detail' : function(medal_id) {
		var mSelf = this;
		var php = {
			'user_info':'/person/user_info',
			'medal_message' : '/medal/item?medal_id=' + medal_id,
			'user_list' : '/medal/user_list?medal_id=' + medal_id
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isU = this.req.url.match(/medal\/u/g);
			data.user_id_in = 0;
			data.headTag = 'medal';
			data.pageTitle = '勋章－美丽说';
			data._CSSLinks = ['medal/main','medal-common'];
			mSelf.render('medal/main.html', data);
		});
	},
	'u' : function(user_id){
		var mSelf = this;
		var php = {
			'user_info':'/person/user_info?user_id=' + user_id,
			'person' : '/person/medal?user_id=' + user_id
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isU = this.req.url.match(/medal\/u/g);
			data.user_id_in = user_id;
			data.headTag = 'medal';
			data.pageTitle = '勋章－美丽说';
			data._CSSLinks = ['medal/my_medal','medal-common'];
			mSelf.render('medal/my_medal.html', data);
		})
	}
}

exports.__create = controller.__create(medal , controlFns);
