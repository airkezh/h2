function magazine(){
	return this; 
}
var controlFns = {
    index : function(magid){
		if (magid) {
			var type = this.readData('type', this.res.__get, '');
			if(type) return this.members(magid);
			var topicId = this.readData('topic_id', this.res.__get, 0);
			if (topicId > 0) return this.magTopic(magid, topicId);
			/*<%{ 418
			var poster = this.readData('poster', this.res.__get, 1);
			if (poster == 0) 
				return this.magList(magid);
			else if (poster == 1)
			}*%> */
				return this.magDetail(magid);
		}
		//this.res.end('group'); 
		var tabNow = this.readData('tab' ,this.res.__get ,0) - 0 ;

		var mSelf = this;
		var php =  tabNow ? {
				'group' : '/group/groupcatalog'
			} :{ 
				'group' : '/group/groupmaincatalog',
				'newcoming' : '/group/newcoming',
				'top10' : '/group/topgroup'
			};
		php['adm5'] = '/adm/ad_Show?slot_id=55';
		this.setDefaultData(php);
		this.bridgeMuch(php);


		this.listenOver(function(data) {
			data.lang = {window:{login:'登录后，关注杂志，每天看到最新分享！'}};
			data._CSSLinks = ['page_group'];
			data.headTag = 'magazine';
			data.tabNow = tabNow;
			data.onlyShowGoTop = true;
			data.pageTitle = '翻杂志 - 美丽说';
			data.keywords = '美丽说,杂志,图片,购物分享,淘宝网购物';
			data.meta_description = '美丽说杂志是风格的小世界，欧美、甜美、森女、朋克，应有尽有！兴趣相投的MM聚焦在这里分享时尚生活，创办属于自己的个性杂志';
			mSelf.render('group/magazine.html' , data);
		});
		return;
	},
	magDetail:function(magid){
		if (! magid|0) 
			return this.errorPage();
		var mSelf = this;
		var page = this.readData('page' ,this.res.__get ,0);
		this.req.__get.group_id = magid;
		this.req.__get.frame = 0;
		var php = {
			'totalNum' : '/group/group_poster_number',
			'group_header' : '/group/group_header',
			'poster0' : '/group/group_poster'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (data.group_header.show_collection)
				data.isMagFavor_mag = true;
			if (data.group_header.header_show_collection)		//#2856 请将这个杂志的头图增加点击后的收藏功能
				data.header_show_collection = 1;
			if (data.group_header &&  data.group_header.redirectUrl) return mSelf.redirectTo( data.group_header.redirectUrl)  
			if (! data.group_header.group_info) return mSelf.errorPage();
			if(data.group_header.group_info.show_poster == 0  && mSelf.readData('poster') != 1) {
				if (this.req.__get.poster != 0 && this.req.__get.elite != 0) {
					return mSelf.redirectTo('/group/' + magid + '?poster=0&elite=0');
				}
			}
			data.lang = {window:{login:'登录后，关注杂志，每天看到最新分享！'}};
			data._CSSLinks = ['group_con'];
			data.headTag = 'magazine';
			data.magid = magid;
			data.poster = mSelf.readData('poster', mSelf.res.__get, 1);
			data.fluid = true;
			data.pageTitle = '【多图】'+ data.group_header.group_info.name +'杂志 - 美丽说';
			data.keywords = data.group_header.group_info.name;
			if(data.group_header.group_admins == ''){
				data.author = '';
			} else {
				data.author = data.group_header.group_admins[0].nickname;
			}
			data.meta_description = data.group_header.group_info.name + '由' + data.author + '发布';
			data['_mobileAgent'] = '/group/' + magid;
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.totalNum.totalNum;
			data.groupPg.current_page = page;
			//分页是否有小花
			data.PGStyle_Flower = false;
			data.onlyShowGoTop = true;
			mSelf.render('group/magazine_con.html' , data);
		});
	},
	magList : function(magid){
		if (! magid|0) 
			return this.errorPage();
		var mSelf = this;
		var page = this.readData('page', this.res.__get, 0);
		var elite = this.readData('elite', this.res.__get, 0);
		this.req.__get.group_id = magid;
		var php = {
			'group_header' : '/group/group_header',
			'group_topics' : '/group/new_topics',
			'group_rec' : '/group/recommend_group',
			'group_others' : '/group/Group_topic_recommend',
			'group_editors' : '/group/Editor_top_list',
			'is_admin' : '/group/is_admin',
			'group_list' : '/group/group_list'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
	//		base.var_dump(data.group_list, false, 5);
			if (! data.group_header.group_info) return mSelf.errorPage();
			data.lang = {window:{login:'登录后，关注杂志，每天看到最新分享！'}};
			data._CSSLinks = ['group_con'];
			data.headTag = 'magazine';
			data.elite = elite;
			data.magid = magid;
			data.isAdmin = data.is_admin.is_admin || data.is_admin.is_superuser;
			data.pageTitle = '【多图】'+ data.group_header.group_info.name +'杂志 - 美丽说';
			data.keywords = '美丽说,杂志,图片,购物分享,淘宝网购物';
			data.meta_description = '美丽说杂志是风格的小世界，欧美、甜美、森女、朋克，应有尽有！兴趣相投的MM聚焦在这里分享时尚生活，创办属于自己的个性杂志';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.group_list ? data.group_list.totalNum : 0;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			mSelf.render('group/magazine_list.html' , data);
		});
	},
	magTopic : function(magid, topicId) {
		if (! magid|0) return this.errorPage();
		var mSelf = this;
		var page = this.readData('page', this.res.__get, 0);
		this.req.__get.group_id = magid;
		var php = {
			'group_header' : '/group/group_header',
			'group_topics' : '/group/new_topics?orderby=1',
			'is_admin' : '/group/is_admin',
			'topic_info' : '/group/Group_topic_orig',
			'group_list' : '/group/group_list'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (! data.group_header.group_info) return mSelf.errorPage();
			data.lang = {window:{login:'登录后，关注杂志，每天看到最新分享！'}};
			data._CSSLinks = ['group_con'];
			data.headTag = 'magazine';
			data.magid = magid;
			data.isAdmin = data.is_admin.is_admin || data.is_admin.is_superuser;
			data.pageTitle = '【多图】'+ data.group_header.group_info.name +'杂志 - 美丽说';
			data.keywords = '美丽说,杂志,图片,购物分享,淘宝网购物';
			data.meta_description = '美丽说杂志是风格的小世界，欧美、甜美、森女、朋克，应有尽有！兴趣相投的MM聚焦在这里分享时尚生活，创办属于自己的个性杂志';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.group_list.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 20;
			mSelf.render('group/magazine_topic.html' , data);
		});
	},
	members : function(magid){
		if (! magid|0) return this.errorPage();
		var type = this.readData('type', this.res.__get, 'members');
		if (type == 'set_avatar') return this.setAvatar(magid);
		var page = this.readData('page', this.res.__get, 0);
		var mSelf = this;
		var maps = {
			'php' : {
				'members' : 'editor_list',
				'followerlist' : 'group_follower',
				'applyinglist' : 'apply_list',
				'blacklist' : 'black_list'
			},
			'title' : {
				'members':'成员列表', 
				'followerlist':'关注者列表', 
				'applyinglist':'申请列表', 
				'blacklist':'黑名单'
			}
		}
		var php = {
			'mg_members' : '/group/' + maps.php[type],
			'group_header' : '/group/group_header',
			'is_admin' : '/group/is_admin'
		};
		this.req.__get.group_id = magid;
		if (type === 'members') php['admins'] = '/group/admin_list';
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (! data.group_header.group_info) return mSelf.errorPage();
			data._CSSLinks = ['group_con'];
			data.headTag = 'magazine';
			data.magid = magid;
			data.type = type;
			data.isAdmin = data.is_admin.is_admin || data.is_admin.is_superuser;
			data.isSuper = data.is_admin.is_superuser;
			data.pageTitle = data.group_header.group_info.name + '杂志 - ' + maps.title[type] + ' - 美丽说';
			data.keywords = '美丽说,杂志,图片,购物分享,淘宝网购物';
			data.meta_description = '美丽说杂志是风格的小世界，欧美、甜美、森女、朋克，应有尽有！兴趣相投的MM聚焦在这里分享时尚生活，创办属于自己的个性杂志';
			//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = data.mg_members.total_num;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 35;
			data.groupPg.page_num = 4;	
			mSelf.render('group/magmember.html' , data);
		});
	},
    changerelation : function(){
        this.ajaxTo('/group/changerelation');
    },
	edit : function(magid , upData){
		var mSelf = this;
		var php = {
			'group_header' : '/group/group_info?group_id=' + magid
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if(data.group_header && data.group_header.length == 0 ) return mSelf.redirectTo('/magazine/' + magid ,true);
			data.update_group = upData;
			data._CSSLinks = ['group_con'];
			data.headTag = 'magazine';
			data.fluid = true;
			data.pageTitle = '编辑杂志 - 美丽说'
			data.group_header.getName = mSelf.req.__get.name || data.group_header.name;	
			data.group_header.getDesc = mSelf.req.__get.description || data.group_header.description;	
			mSelf.render('group/edit.html' , data);
		});
	},
	updateMagazine : function(magaId){
		var mSelf = this;
		var php = {
			'update_group' : '/group/update_group'
		};
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if(data.update_group.code){
				mSelf.edit(mSelf.req.__get.group_id , data.update_group)
			}else{
				mSelf.redirectTo('/magazine/' + mSelf.req.__get.group_id);
			}
		});		
	},
	deleteMagazine : function(magaId){
		var mSelf = this;
		this.req.method = 'POST';
		this.req.__post = {'group_id': magaId};
		var php = {
			'delete_group' : '/group/delete_group'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			mSelf.redirectTo('/person/u/' + data.userInfo.user_id + '?type=editor');
		});		
	},
	setAvatar : function(magid) {
		var mSelf = this;
		this.req.__get.group_id = magid;
		var php = {
			'is_admin' : '/group/is_admin',
			'group_header' : '/group/group_header'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.is_admin.is_superuser && !data.is_admin.is_admin)
				mSelf.redirectTo('/group/'+magid);
			data._CSSLinks = ['group_con'];
			data.headTag = 'magazine';
			data.magid = magid;	
			data.pageTitle = '美丽说，发现、收藏、分享我的美丽点滴，让改变发生';
			data.keywords = '美丽说,杂志,图片,购物分享,淘宝网购物';
			data.meta_description = '美丽说杂志是风格的小世界，欧美、甜美、森女、朋克，应有尽有！兴趣相投的MM聚焦在这里分享时尚生活，创办属于自己的个性杂志';
			mSelf.render('group/magavatar.html', data);
		});
	}
}
exports.__create = controller.__create(magazine , controlFns);
