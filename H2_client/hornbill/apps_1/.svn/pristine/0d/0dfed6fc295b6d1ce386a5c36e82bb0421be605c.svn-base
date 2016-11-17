function atme(){
	return this;
}

var controlFns = {
	'index' : function(args){
		this.atme();
	}
	,'atme': function(){
		var php = {
				'user_list' : '/person/user_block',
				'user_medal' : '/person/medal',
				'user_label' : '/person/label',
				'all_label' : '/person/all_label'
		} , mSelf = this;
		
		php['_data']=  '/user/atme';
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.userInfo && !data.userInfo.user_id){
				return mSelf.redirectTo('/user/login')
				}
			if (!data['_data']) return mSelf.errorPage()
			data._CSSLinks = ['nexus'];
			data['_data'].type = 'atme';
			var _str = '@我的（提到我的）';
			data.pageTitle =  _str + ' - 美丽说';
			data['_data']._str = _str;
			//获取分页总数
			data.groupPg = {}; 
			if (data['_data'].data) {
				data.groupPg.total_num = data['_data'].data.total;
				data.groupPg.current_page = data['_data'].data.current; 
			}else{
				data.groupPg.total_num = data['_data'].total;
				data.groupPg.current_page = data['_data'].current; 
			}
			data.groupPg.page_size = 20;
			mSelf.render('nexus/nexus.html' , data);
		});
	}
}

exports.__create = controller.__create(atme , controlFns);
