function welcome(){
	return this;	
}
var controlFns = {
	'_index' : function(p) {
		this.index()
		//return this.redirectTo('/welcome' , true);
		/*
		var mSelf = this, reqParams = this.req.__get;
		//this.bridgeMuch({'userInfo': '/user/headinfo'});
		var php = {}
		this.setDefaultData(php)
		this.bridgeMuch(php)
		this.listenOver(function(data){
			if (data.userInfo && data.userInfo.user_id) 
				mSelf.redirectTo('/ihome' ,true );
			else
				mSelf.redirectTo('/welcome' , true);
		});
		*/
	},
	'index' : function(){
		var php = {
			'clothes' : '/welcome/section_shelf?section_id=1'
            ,'shoes' : '/welcome/section_shelf?section_id=3'
            ,'bags' : '/welcome/section_shelf?section_id=5'
            ,'access' : '/welcome/section_shelf?section_id=7'
            ,'jiaju' : '/welcome/section_shelf?section_id=9'
            ,'top_bnr' : '/welcome/banner_ads?key=web_welcome_top_banner_carousel'
			,'attrs' : '/welcome/cms/left_comm_recommend'
            ,'rec_sku' : '/welcome/recommend_single_product'
            ,'tuan_sku' : '/welcome/recommend_groupon_single_product'
            ,'group' : '/welcome/recommend_group'	
			,'bnr_right' : '/welcome/banner_ads?key=web_welcome_vertical_banner_1'
			,'bnr_ct' : '/welcome/banner_ads?key=web_welcome_horizon_banner_1'
			,'ads_one' : '/welcome/banner_ads?key=web_welcome_promotion'
			,'adm65' : '/adm/ad_Show?slot_id=65'
			,'adm67' : '/adm/ad_Show?slot_id=67'
			,'friendlink' : '/friendlink/bottom'
			,'sec_nav' : '/navigate/navigate_welcome'
			//,'userinfo' : '/user/headinfo'
			}

		var frm = this.readData('frm',this.req.__get, '');

        var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
			data._CSSLinks = ['welcome_new'];
            data.pageTitle = '美丽说，开启全新时尚发现之旅';
            data.keywords = '美丽说,higo,衣服,鞋子,包包,配饰,家居,美妆,搭配,团购,美丽说higo';
			data.meta_description = '来美丽说开启属于你的发现之旅，感受全新的购买体验吧！这里有百万粉丝的时尚大咖、热爱发现美物的生活家、一边旅行一边挖掘好货的higo海淘达人...而他们都将成为你的专属挑款师！还等什么？加入我们，发现流行，占有世界！'
            data.headTag = 'welcome';
            data.diffwelcome = true;
			data.hideBotBar = true;
			data.onlyShowGoTop = true;
            //base.var_dump(data.sec_nav, false , 5);
            mSelf.render('welcome/welcome.html' , data);
        });

	}
}
exports.__create = controller.__create(welcome , controlFns);
