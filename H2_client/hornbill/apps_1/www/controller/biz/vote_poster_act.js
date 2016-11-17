function vote_poster_act(){
	return this;
}

var controlFns = {
	index : function(p){
		switch(p){
			case 'obolai' :
				this.obolai();
				break;
			case 'wetcode' :
				this.wetcode();
				break;
			default : 
				this.errorPage();
		}
	},
	obolai : function(){
		var php = {
			'poster0' : '/customactivity/CustomActivity_haibao_wall',
			'my_poster' : '/customactivity/CustomActivity_oubolai_photo_user_info',
			'rank' : '/customactivity/CustomActivity_oubolai_photo_rank'
		};
		var page = this.readData('page',this.req.__get, 0)|0;
        var actName = this.readData('actName', this.req.__get, 'oubolai');
        this.req.__get.actName = actName;

		var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
		this.listenOver(function(data){
			data.poster0 = data.poster0.data || '';
			data.topbanner = false 
            //true 宽屏
            data.fluid = true;
			//是否登录
			var isLogin = 0;
			data.userInfo.user_id == 0 ? isLogin = 0 : isLogin = 1;
			data.isLogin = isLogin;
			//获取分页总数
            data.groupPg = {};
            data.groupPg.total_num = data.rank.data.totalNum;
            data.groupPg.current_page = page;

			data.pageTitle = '欧珀莱 珠光宝气过圣诞';
			data._CSSLinks = ['huodong/obolai'];
			mSelf.render('biz/huodong/vote/obolai.html' , data);
		});
	},
	obolai_share : function(){
		var php = {
			'my_poster' : '/customactivity/CustomActivity_oubolai_photo_user_info'	
		};
		var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
			data.my_poster = data.my_poster.data;
			//true 宽屏
			data.fluid = true;
			data.pageTitle = '欧珀莱 珠光宝气过圣诞';
            data._CSSLinks = ['huodong/obolai'];
            mSelf.render('biz/huodong/vote/obolai_share.html' , data);
		});
	},
	wetcode : function(){
		var php = {
			'poster0' : '/customactivity/CustomActivity_haibao_wall',
			'my_poster' : '/customactivity/CustomActivity_webcode_photo_user_info',
			'rank' : '/customactivity/CustomActivity_webcode_photo_rank'
		};
		var page = this.readData('page',this.req.__get, 0)|0;
        var actName = this.readData('actName', this.req.__get, 'webcode');
        this.req.__get.actName = actName;

		var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
        //this.debugSnake({target:'devlab1'});
		this.listenOver(function(data){
			data.poster0 = data.poster0.data || '';
			data.topbanner = false;
			data.apparel_alert =false;
            //true 宽屏
            data.fluid = true;
            data.notFluidPoster = 1;
			//是否登录
			var isLogin = 0;
			data.userInfo.user_id == 0 ? isLogin = 0 : isLogin = 1;
			data.isLogin = isLogin;
			//获取分页总数
            data.groupPg = {};
            data.groupPg.total_num = data.rank.data.totalNum;
            data.groupPg.current_page = page;

			data.pageTitle = '水密码舞动你的水润肌';
			data._CSSLinks = ['huodong/wetcode'];
			mSelf.render('biz/huodong/vote/wetcode.html' , data);
		});
	},
	wetcode_share : function(){
		var php = {
			'my_poster' : '/customactivity/CustomActivity_webcode_photo_user_info'	
		};
		var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
        //this.debugSnake({target:'devlab1'});
        this.listenOver(function(data){
			data.my_poster = data.my_poster.data;
			//true 宽屏
			data.fluid = true;
			data.pageTitle = '水密码舞动你的水润肌';
            data._CSSLinks = ['huodong/wetcode'];
            mSelf.render('biz/huodong/vote/wetcode_share.html' , data);
		});
	}
}
exports.__create = controller.__create(vote_poster_act, controlFns);
