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
            'top_bnr' : '/welcome/banner_ads?key=web_welcome_top_banner_carousel'
            ,'sec_nav' : '/navigate/navigate_welcome'
            ,'ads_one' : '/welcome/banner_ads?key=web_welcome_promotion'
            ,'group' : '/welcome/recommend_group'
			,'bnr_ct' : '/welcome/banner_ads?key=web_welcome_horizon_banner_1'
			,'adm65' : '/adm/ad_Show?slot_id=65'
			,'adm67' : '/adm/ad_Show?slot_id=67'
			,'friendlink' : '/friendlink/bottom'
			,'debut' : '/welcome/Welcome_debut_banner'
			,'fashion_focus' : '/welcome/Welcome_fashion_focus'
			,'fashion_new' : '/welcome/Fashion_new_item'
			,'desire' : '/welcome/Desire_new_list'
			,'beauty' : '/welcome/Recommend_cosmetic'
			,'recommend_shop' : '/welcome/Recommend_shop'
			,'newshop' : '/welcome/new_shop_come?key=pc_new_shop_come'
		}

        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
			data._CSSLinks = ['welcome2015'];
            data.pageTitle = '美丽说首页 - 只做正确流行款; 独家冠名《奔跑吧兄弟3》';
            data.keywords = '美丽说,higo,衣服,鞋子,包包,配饰,家居,美妆,搭配,团购,美丽说higo';
			data.meta_description = '美丽说, 只做正确流行款. 独家冠名《奔跑吧兄弟》! 平台聚集强大的资深时尚买手团队, 每日推出正确新款, 传授最权威的穿衣经验, 全方位解读搭配技巧, 打造当季最前沿的正确流行款!'
            data.headTag = 'welcome';
            data.diffwelcome = true;
			data.hideBotBar = true;
			data.onlyShowGoTop = true;
            this.render('welcome/welcome2015.html' , data);
        });
	},
	'welcome1111' : function(nowTimestamp){
		//2015 双11首页会场
		nowTimestamp = nowTimestamp || (new Date()).getTime()
		var isSecond = this.req.__get.isSecond || 1
		var php = {
            'top_bnr' : '/welcome/banner_ads?key=web_welcome_top_banner_carousel'
            ,'sec_nav' : '/navigate/navigate_welcome'
            ,'ads_one' : '/welcome/banner_ads?key=web_welcome_promotion'
            ,'group' : '/welcome/recommend_group'
			,'bnr_ct' : '/welcome/banner_ads?key=web_welcome_horizon_banner_1'
			,'adm65' : '/adm/ad_Show?slot_id=65'
			,'adm67' : '/adm/ad_Show?slot_id=67'
			,'friendlink' : '/friendlink/bottom'
			,'debut' : '/welcome/Welcome_debut_banner'
			,'fashion_focus' : '/welcome/Welcome_fashion_focus'
			,'fashion_new' : '/welcome/Fashion_new_item'
			,'desire' : '/welcome/Desire_new_list'
			,'beauty' : '/welcome/Recommend_cosmetic'
			,'recommend_shop' : '/welcome/Recommend_shop'
		}

        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.pageTitle = '美丽说首页 - 只做正确流行款; 独家冠名《奔跑吧兄弟3》';
            data.keywords = '美丽说,higo,衣服,鞋子,包包,配饰,家居,美妆,搭配,团购,美丽说higo';
			data.meta_description = '美丽说, 只做正确流行款. 独家冠名《奔跑吧兄弟》! 平台聚集强大的资深时尚买手团队, 每日推出正确新款, 传授最权威的穿衣经验, 全方位解读搭配技巧, 打造当季最前沿的正确流行款!'
            data.headTag = 'welcome';
            data.diffwelcome = true;
			data.hideBotBar = true;
			data.onlyShowGoTop = true;
			if(isSecond==2 || nowTimestamp>1447156800000){
				data._CSSLinks = ['welcome1110'];
        	    this.render('welcome/welcome1110.html' , data);
			} else {
				data._CSSLinks = ['welcome1111'];
        	    this.render('welcome/welcome1111.html' , data);
			}
			
        });
	},
	'reload':function(){
		this.res.end('<script>window.parent.location.reload();</script>')
	}

}
exports.__create = controller.__create(welcome , controlFns);
