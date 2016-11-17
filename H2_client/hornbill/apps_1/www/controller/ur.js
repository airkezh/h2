function ur(){
	return this;	
}
var controlFns = { 
	'index' : function(args){
		if ('index' != args && args in controlFns)
			return this[args](null,args);
		else
			return this.errorPage();
	}
	,'follow' : function(user_id){
		return this.fans(user_id,'follow');
	}
	,'like' : function(user_id){
		this.req.__get.user_id = user_id;
		var php = {
			'getmsg' : '/msg/getmsg/?likeSplit=1'
		};
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.getmsg && data.getmsg.recommend_num == 0 && data.getmsg.a_like_num > 0){
				mSelf.redirectTo('/club/liked/'+user_id);
			} else {
				mSelf.redirectTo('/ur/recommend/'+user_id);
			}
		});
	}
	,'recommend' : function(user_id){
		return this.fans(user_id,'recommend');
	}
	// ,'atme' : function(user_id){
	// 	return this.fans(user_id,'atme');
	// }
	,'fans': function(user_id , nexusType){
		var page = this.readData('page',this.req.__get, 0),
			userid = user_id || this.readData('user_id',this.req.__get, 0);

		if (!userid) return this.errorPage()
		if (219 == userid ) return this.redirectTo('/goods?frm=fans_219')
		this.req.__get.user_id = userid

		var php = {
				'user_list' : '/person/user_block',
				'user_medal' : '/person/medal',
				'user_label' : '/person/label',
				'all_label' : '/person/all_label'
		} , mSelf = this;
		switch(nexusType){
				case 'follow':
					php['_data']=  '/user/followed_list'
					break;
				case 'recommend':
					php['_data']=  '/user/heart_atme',
					php['getmsg']=  '/msg/getmsg/?likeSplit=1'
					break;
				default:
					php['_data']=  '/user/follower_list'
			}
		nexusType = nexusType ||'fans';
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(data.userInfo && !data.userInfo.user_id ){
				return mSelf.redirectTo('/user/login')
				}
			if (!data['_data']) return mSelf.errorPage()
			data._CSSLinks = ['nexus'];
			data['_data'].type = nexusType;
			var _str = ({'fans': data.user_list.nickname + '的粉丝' 
						,'follow': data.user_list.nickname + '的关注'
						,'recommend': '谁喜欢了她的分享'
						// ,'atme': '@我的（提到我的）'
						})[nexusType] || '';
			if(nexusType == 'recommend'){
				data['_data']._none = '还没有人喜欢过她的分享';
				if(data['_data'].self){
					_str = _str.replace('她','你');
					data['_data']._none = data['_data']._none.replace('她','你');
				}
			}
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
exports.__create = controller.__create(ur , controlFns);
