function minisite(){
	return this; 
}
var controlFns = {
    'index' : function(brand_name){
		var type = this.readData('type' , this.req.__get , '1');
		var page = this.readData('page' , this.req.__get , 0) | 0;
		var group_id = this.readData('group_id' , this.req.__get , '');
		var topic_id = this.readData('topic_id' , this.req.__get , '');
		var php = {
			'mini_userinfo' : '/minisite/minisite_userinfo/' + brand_name,
			'mini_main' : '/minisite/minisite_main/' + brand_name,
			'mini_fans' : '/minisite/minisite_follower/' + brand_name,
			'mini_magazine' : '/minisite/minisite_group/' + brand_name + '?group=side',
			'mini_main' : '/minisite/minisite_main/' + brand_name,
			'mini_twitter' : '/minisite/minisite_twitter/' + brand_name
		};
		if(type==2){
			php['mini_topic'] = '/minisite/minisite_topic/' + brand_name;	
			php['is_admin'] = '/group/is_admin';
			if(topic_id){
				php['mini_topiclist'] = '/minisite/minisite_topiclist/' + brand_name + '?topic_id=' + topic_id;
			}else{
				php['mini_topiclist'] = '/minisite/minisite_topiclist/' + brand_name;
			}
		}else if(type==3){
			php['mini_magazine'] = '/minisite/minisite_group/' + brand_name;
		}
		if(group_id){
			php['mini_twitter'] = '/minisite/minisite_twitter/' + brand_name + '?group_id=' + group_id;	
		}	
		var mSelf = this;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			data.type = type;
			data.group_id = group_id;
			data.brand_name = brand_name;
			console.log(data.is_admin)
			data.isAdmin = data.is_admin.is_admin || data.is_admin.is_superuser;
			data.pageTitle = data.mini_userinfo.nickname + '的美丽说 - 美丽说';
			data.headTag = 'minisite';
		    data._CSSLinks = ['minisite'];
			//获取分页
			data.groupPg = {};
			if(data.type == 1){
				data.groupPg.total_num = data.mini_twitter.totalNum;
			}else if(data.type == 2){
				data.groupPg.total_num = data.mini_topiclist.totalNum;
				data.groupPg.page_size = 20;
			}
			data.groupPg.current_page = page;
			mSelf.render('/minisite/minisite.html' , data);
		});
		
	}
}
exports.__create = controller.__create(minisite , controlFns);
